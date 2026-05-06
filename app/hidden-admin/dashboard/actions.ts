"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { faqs, products, services, user } from "@/lib/db/schema";
import { requireAdminSession } from "@/lib/admin/session";
import {
  faqInputSchema,
  productInputSchema,
  profileInputSchema,
  serviceInputSchema,
} from "@/lib/validation/admin";

export type AdminActionState = {
  ok: boolean;
  message: string;
};

const initialErrorMessage = "Check the form values and try again.";

function imageListFromForm(formData: FormData) {
  const combined = [
    ...formData.getAll("images").map(String),
    ...String(formData.get("imageText") || "").split(/\r?\n/),
  ];

  return [...new Set(combined.map((item) => item.trim()).filter(Boolean))].slice(0, 3);
}

function detailsListFromForm(formData: FormData) {
  return String(formData.get("detailsText") || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function actionState(ok: boolean, message: string): AdminActionState {
  return { ok, message };
}

function isUniqueViolation(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: unknown }).code === "23505",
  );
}

export async function createProductAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();
  const input = productInputSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
    images: imageListFromForm(formData),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") || 100,
  });

  if (!input.success) {
    return actionState(false, initialErrorMessage);
  }

  try {
    await getDb().insert(products).values(input.data);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return actionState(false, "That product slug already exists.");
    }

    throw error;
  }

  revalidatePath("/products");
  revalidatePath(`/products/${input.data.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/");
  revalidatePath("/hidden-admin/dashboard/products");

  return actionState(true, "Product saved.");
}

export async function updateProductAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const input = productInputSchema.safeParse({
    id,
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
    images: imageListFromForm(formData),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") || 100,
  });

  if (!id || !input.success) {
    return actionState(false, initialErrorMessage);
  }

  const [existing] = await getDb()
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  try {
    await getDb()
      .update(products)
      .set({ ...input.data, updatedAt: new Date() })
      .where(eq(products.id, id));
  } catch (error) {
    if (isUniqueViolation(error)) {
      return actionState(false, "That product slug already exists.");
    }

    throw error;
  }

  revalidatePath("/products");
  if (existing?.slug && existing.slug !== input.data.slug) {
    revalidatePath(`/products/${existing.slug}`);
  }
  revalidatePath(`/products/${input.data.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/");
  revalidatePath("/hidden-admin/dashboard/products");

  return actionState(true, "Product saved.");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");

  if (!id) {
    return;
  }

  await getDb().delete(products).where(eq(products.id, id));
  revalidatePath("/products");
  revalidatePath("/sitemap.xml");
  revalidatePath("/");
  revalidatePath("/hidden-admin/dashboard/products");
}

export async function createServiceAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();
  const input = serviceInputSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    image: formData.get("image"),
    cta: formData.get("cta"),
    modalIntro: formData.get("modalIntro"),
    details: detailsListFromForm(formData),
    bestFor: formData.get("bestFor"),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") || 100,
  });

  if (!input.success) {
    return actionState(false, initialErrorMessage);
  }

  try {
    await getDb().insert(services).values(input.data);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return actionState(false, "That service slug already exists.");
    }

    throw error;
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/sitemap.xml");
  revalidatePath("/hidden-admin/dashboard");
  revalidatePath("/hidden-admin/dashboard/services");

  return actionState(true, "Service saved.");
}

export async function updateServiceAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const input = serviceInputSchema.safeParse({
    id,
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    image: formData.get("image"),
    cta: formData.get("cta"),
    modalIntro: formData.get("modalIntro"),
    details: detailsListFromForm(formData),
    bestFor: formData.get("bestFor"),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") || 100,
  });

  if (!id || !input.success) {
    return actionState(false, initialErrorMessage);
  }

  try {
    await getDb()
      .update(services)
      .set({ ...input.data, updatedAt: new Date() })
      .where(eq(services.id, id));
  } catch (error) {
    if (isUniqueViolation(error)) {
      return actionState(false, "That service slug already exists.");
    }

    throw error;
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/sitemap.xml");
  revalidatePath("/hidden-admin/dashboard");
  revalidatePath("/hidden-admin/dashboard/services");

  return actionState(true, "Service saved.");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");

  if (!id) {
    return;
  }

  await getDb().delete(services).where(eq(services.id, id));
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/sitemap.xml");
  revalidatePath("/hidden-admin/dashboard");
  revalidatePath("/hidden-admin/dashboard/services");
}

export async function createFaqAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();
  const input = faqInputSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") || 100,
  });

  if (!input.success) {
    return actionState(false, initialErrorMessage);
  }

  await getDb().insert(faqs).values(input.data);
  revalidatePath("/faq");
  revalidatePath("/sitemap.xml");
  revalidatePath("/hidden-admin/dashboard/faqs");

  return actionState(true, "FAQ saved.");
}

export async function updateFaqAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  const input = faqInputSchema.safeParse({
    id,
    question: formData.get("question"),
    answer: formData.get("answer"),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: formData.get("sortOrder") || 100,
  });

  if (!id || !input.success) {
    return actionState(false, initialErrorMessage);
  }

  await getDb()
    .update(faqs)
    .set({ ...input.data, updatedAt: new Date() })
    .where(eq(faqs.id, id));
  revalidatePath("/faq");
  revalidatePath("/sitemap.xml");
  revalidatePath("/hidden-admin/dashboard/faqs");

  return actionState(true, "FAQ saved.");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");

  if (!id) {
    return;
  }

  await getDb().delete(faqs).where(eq(faqs.id, id));
  revalidatePath("/faq");
  revalidatePath("/sitemap.xml");
  revalidatePath("/hidden-admin/dashboard/faqs");
}

export async function updateProfileAction(formData: FormData) {
  const session = await requireAdminSession();
  const input = profileInputSchema.parse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  await getDb()
    .update(user)
    .set({
      name: input.name,
      image: input.image || null,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));
  revalidatePath("/hidden-admin/dashboard/profile");
}
