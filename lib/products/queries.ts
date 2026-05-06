import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/lib/db";
import { faqs, products, type Faq, type Product } from "@/lib/db/schema";
import { productSearchKeywordsBySlug } from "@/lib/products/catalog-metadata";
import { initialFaqs, initialProducts } from "@/lib/products/seed-data";

export type ProductListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  sort?: "featured" | "name-asc" | "name-desc" | "newest";
  includeDrafts?: boolean;
};

export type ProductListResult = {
  items: Product[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

function fallbackProducts(): Product[] {
  const now = new Date();

  return initialProducts.map((item) => ({
    id: item.slug,
    name: item.name,
    slug: item.slug,
    description: item.description,
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,
    images: [...item.images],
    isPublished: true,
    sortOrder: item.sortOrder,
    createdAt: now,
    updatedAt: now,
  }));
}

function fallbackFaqs(): Faq[] {
  const now = new Date();

  return initialFaqs.map((item) => ({
    id: item.question,
    question: item.question,
    answer: item.answer,
    isPublished: item.isPublished,
    sortOrder: item.sortOrder,
    createdAt: now,
    updatedAt: now,
  }));
}

export async function listProducts(params: ProductListParams = {}): Promise<ProductListResult> {
  const pageSize = Math.min(Math.max(params.pageSize ?? 6, 1), 24);
  const page = Math.max(params.page ?? 1, 1);
  const query = params.query?.trim();
  const sort = params.sort ?? "featured";

  if (!hasDatabase) {
    return listFallbackProducts({ ...params, page, pageSize, query, sort });
  }

  try {
    const db = getDb();
    const terms = query ? searchTerms(query) : [];
    const filters = [
      params.includeDrafts ? undefined : eq(products.isPublished, true),
      ...terms.map((term) =>
        or(
          ilike(products.name, `%${term}%`),
          ilike(products.description, `%${term}%`),
          ilike(products.slug, `%${term}%`),
        ),
      ),
    ].filter(Boolean);
    const where = filters.length ? and(...filters) : undefined;
    const orderBy =
      sort === "name-asc"
        ? [asc(products.name)]
        : sort === "name-desc"
          ? [desc(products.name)]
          : sort === "newest"
            ? [desc(products.createdAt)]
            : [asc(products.sortOrder), asc(products.name)];
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(products)
      .where(where);
    const items = await db
      .select()
      .from(products)
      .where(where)
      .orderBy(...orderBy)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return {
      items,
      page,
      pageSize,
      totalItems: count,
      totalPages: Math.max(Math.ceil(count / pageSize), 1),
    };
  } catch (error) {
    if (!params.includeDrafts && isMissingContentTableError(error)) {
      return listFallbackProducts({ ...params, page, pageSize, query, sort });
    }

    throw error;
  }
}

export async function getProductBySlug(slug: string, includeDrafts = false) {
  if (!hasDatabase) {
    return fallbackProducts().find(
      (item) => item.slug === slug && (includeDrafts || item.isPublished),
    );
  }

  try {
    const db = getDb();
    const [item] = await db
      .select()
      .from(products)
      .where(
        includeDrafts
          ? eq(products.slug, slug)
          : and(eq(products.slug, slug), eq(products.isPublished, true)),
      )
      .limit(1);

    return item;
  } catch (error) {
    if (!includeDrafts && isMissingContentTableError(error)) {
      return fallbackProducts().find(
        (item) => item.slug === slug && (includeDrafts || item.isPublished),
      );
    }

    throw error;
  }
}

export async function listFaqs(includeDrafts = false) {
  if (!hasDatabase) {
    return fallbackFaqs().filter((item) => includeDrafts || item.isPublished);
  }

  try {
    const db = getDb();

    return await db
      .select()
      .from(faqs)
      .where(includeDrafts ? undefined : eq(faqs.isPublished, true))
      .orderBy(asc(faqs.sortOrder), asc(faqs.question));
  } catch (error) {
    if (!includeDrafts && isMissingContentTableError(error)) {
      return fallbackFaqs().filter((item) => includeDrafts || item.isPublished);
    }

    throw error;
  }
}

function listFallbackProducts({
  page,
  pageSize,
  query,
  sort,
  includeDrafts,
}: ProductListParams & {
  page: number;
  pageSize: number;
  sort: NonNullable<ProductListParams["sort"]>;
}) {
  let items = fallbackProducts();

  if (!includeDrafts) {
    items = items.filter((item) => item.isPublished);
  }

  if (query) {
    const terms = searchTerms(query);
    items = items.filter((item) => {
      const haystack = [
        item.name,
        item.description,
        item.slug.replaceAll("-", " "),
        productSearchKeywordsBySlug[item.slug] ?? "",
      ].join(" ").toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });
  }

  return paginateProducts(sortProducts(items, sort), page, pageSize);
}

function isMissingContentTableError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const value = error as {
    cause?: unknown;
    code?: unknown;
    routine?: unknown;
    message?: unknown;
  };
  const message = typeof value.message === "string" ? value.message : "";

  return (
    value.code === "42P01" ||
    value.routine === "parserOpenTable" ||
    /relation "(products|faqs)" does not exist/i.test(message) ||
    isMissingContentTableError(value.cause)
  );
}

function paginateProducts(items: Product[], page: number, pageSize: number): ProductListResult {
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const safePage = Math.min(page, totalPages);

  return {
    items: items.slice((safePage - 1) * pageSize, safePage * pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
}

function sortProducts(items: Product[], sort: NonNullable<ProductListParams["sort"]>) {
  return [...items].sort((a, b) => {
    if (sort === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (sort === "name-desc") {
      return b.name.localeCompare(a.name);
    }

    if (sort === "newest") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }

    return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);
  });
}

function searchTerms(query: string) {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}
