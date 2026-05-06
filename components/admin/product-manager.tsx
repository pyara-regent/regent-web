"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Plus, Search, Trash2, X } from "lucide-react";
import type { Product } from "@/lib/db/schema";
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "@/app/hidden-admin/dashboard/actions";
import { AdminPager, paginateAdminItems } from "@/components/admin/admin-pagination";

type PlainProduct = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const initialActionState = {
  ok: false,
  message: "",
};

export function ProductManager({ products }: { products: PlainProduct[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "name">("featured");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<PlainProduct | null>(null);
  const [deleting, setDeleting] = useState<PlainProduct | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = needle
      ? products.filter(
          (item) =>
            item.name.toLowerCase().includes(needle) ||
            item.slug.toLowerCase().includes(needle) ||
            item.description.toLowerCase().includes(needle),
        )
      : products;

    return [...list].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a.sortOrder - b.sortOrder,
    );
  }, [products, query, sort]);
  const pageData = paginateAdminItems(filtered, page);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-black/10 px-3 py-2">
          <Search className="size-4 text-[#667066]" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search products"
          />
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold outline-none"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as "featured" | "name");
              setPage(1);
            }}
          >
            <option value="featured">Featured</option>
            <option value="name">Name</option>
          </select>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--regent-blue-900)] px-4 py-2 text-sm font-semibold text-white"
            onClick={() => {
              setEditing(null);
              setIsFormOpen(true);
            }}
            type="button"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-black/10">
        <div className="grid grid-cols-[88px_minmax(180px,1fr)_120px_112px] bg-[#f4f4ef] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#667066]">
          <span>Image</span>
          <span>Product</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-black/10">
          {pageData.items.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-[88px_minmax(180px,1fr)_120px_112px] items-center px-4 py-3"
            >
              <ProductThumb product={item} />
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">{item.name}</h2>
                <p className="truncate text-sm text-[#667066]">/{item.slug}</p>
              </div>
              <span className="text-sm font-semibold text-[#667066]">
                {item.isPublished ? "Live" : "Draft"}
              </span>
              <div className="flex gap-2">
                <button
                  aria-label={`Edit ${item.name}`}
                  className="rounded-lg border border-black/10 p-2 hover:bg-[#f4f4ef]"
                  onClick={() => {
                    setEditing(item);
                    setIsFormOpen(true);
                  }}
                  type="button"
                >
                  <Edit3 className="size-4" />
                </button>
                <button
                  aria-label={`Delete ${item.name}`}
                  className="rounded-lg border border-black/10 p-2 text-[var(--regent-red)] hover:bg-[var(--regent-red-soft)]"
                  onClick={() => setDeleting(item)}
                  type="button"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}
          {!filtered.length ? (
            <div className="p-6 text-sm font-semibold text-[#667066]">
              No products match this search.
            </div>
          ) : null}
        </div>
      </div>

      <AdminPager
        currentPage={pageData.safePage}
        totalItems={filtered.length}
        totalPages={pageData.totalPages}
        onPageChange={setPage}
      />

      {isFormOpen ? (
        <ProductForm
          product={editing}
          onClose={() => {
            setEditing(null);
            setIsFormOpen(false);
          }}
        />
      ) : null}

      {deleting ? (
        <DeleteProductDialog product={deleting} onClose={() => setDeleting(null)} />
      ) : null}
    </div>
  );
}

function ProductThumb({ product }: { product: PlainProduct }) {
  const image = product.images[0];

  if (!image) {
    return (
      <div className="flex size-14 items-center justify-center rounded-lg bg-[#ecece5] text-xs font-bold text-[#667066]">
        No image
      </div>
    );
  }

  return (
    <div className="relative size-14 overflow-hidden rounded-lg bg-[#ecece5]">
      <Image src={image} alt="" fill sizes="56px" className="object-contain p-2" />
    </div>
  );
}

function ProductForm({
  product,
  onClose,
}: {
  product: PlainProduct | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    product ? updateProductAction : createProductAction,
    initialActionState,
  );
  const [imageText, setImageText] = useState(product?.images.join("\n") || "");
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  async function uploadImages(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setUploadMessage("Uploading...");
    const uploaded: string[] = [];

    for (const file of Array.from(files).slice(0, 3)) {
      const presign = await fetch("/api/admin/uploads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!presign.ok) {
        const data = (await presign.json()) as { error?: string };
        setUploadMessage(data.error || "Upload is not configured.");
        return;
      }

      const data = (await presign.json()) as { uploadUrl: string; publicUrl: string };
      const upload = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: { "content-type": file.type },
        body: file,
      });

      if (!upload.ok) {
        setUploadMessage("Upload failed.");
        return;
      }

      uploaded.push(data.publicUrl);
    }

    setImageText((current) =>
      [...current.split(/\r?\n/).filter(Boolean), ...uploaded].slice(0, 3).join("\n"),
    );
    setUploadMessage("Image ready.");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 px-4 py-6">
      <div className="mx-auto max-h-[calc(100vh-3rem)] max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">{product ? "Edit product" : "Add product"}</h2>
          <button className="rounded-lg border border-black/10 p-2" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>
        <form action={formAction} className="flex flex-col gap-4">
          {product ? <input type="hidden" name="id" value={product.id} /> : null}
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Name
            <input className="rounded-lg border border-black/10 px-3 py-2 font-normal" name="name" defaultValue={product?.name} required />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            URL slug
            <input className="rounded-lg border border-black/10 px-3 py-2 font-normal" name="slug" defaultValue={product?.slug} placeholder="auto-from-name" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Description
            <textarea className="min-h-28 rounded-lg border border-black/10 px-3 py-2 font-normal" name="description" defaultValue={product?.description} required />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Meta title
              <input className="rounded-lg border border-black/10 px-3 py-2 font-normal" name="metaTitle" defaultValue={product?.metaTitle} placeholder="auto-from-name" maxLength={70} />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Sort order
              <input className="rounded-lg border border-black/10 px-3 py-2 font-normal" name="sortOrder" type="number" min="0" defaultValue={product?.sortOrder ?? 100} />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Meta description
            <textarea className="min-h-20 rounded-lg border border-black/10 px-3 py-2 font-normal" name="metaDescription" defaultValue={product?.metaDescription} placeholder="auto-from-description" maxLength={165} />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Images
            <input
              className="rounded-lg border border-black/10 px-3 py-2 font-normal"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={(event) => uploadImages(event.currentTarget.files)}
            />
            {uploadMessage ? <span className="text-xs font-semibold text-[#667066]">{uploadMessage}</span> : null}
            <textarea
              className="min-h-20 rounded-lg border border-black/10 px-3 py-2 font-normal"
              name="imageText"
              value={imageText}
              onChange={(event) => setImageText(event.target.value)}
              placeholder="One image URL per line, up to 3"
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-semibold">
            <input name="isPublished" type="checkbox" defaultChecked={product?.isPublished ?? true} />
            Published
          </label>
          {state.message ? (
            <p className={`text-sm font-semibold ${state.ok ? "text-[#596359]" : "text-[var(--regent-red)]"}`}>
              {state.message}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-2">
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold" onClick={onClose} type="button">
              Cancel
            </button>
            <button
              className="rounded-full bg-[var(--regent-blue-900)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={pending}
              type="submit"
            >
              {pending ? "Saving..." : "Save product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteProductDialog({
  product,
  onClose,
}: {
  product: PlainProduct;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold">Delete product</h2>
        <p className="mt-2 text-sm leading-6 text-[#667066]">{product.name} will be removed from the catalog.</p>
        <form action={deleteProductAction} className="mt-5 flex justify-end gap-2">
          <input type="hidden" name="id" value={product.id} />
          <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="rounded-full bg-[var(--regent-red)] px-5 py-3 text-sm font-semibold text-white" type="submit">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
