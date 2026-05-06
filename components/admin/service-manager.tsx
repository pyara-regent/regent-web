"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Plus, Search, Trash2, X } from "lucide-react";
import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction,
} from "@/app/hidden-admin/dashboard/actions";
import { AdminPager, paginateAdminItems } from "@/components/admin/admin-pagination";
import type { Service } from "@/lib/db/schema";

type PlainService = Omit<Service, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const initialActionState = {
  ok: false,
  message: "",
};

export function ServiceManager({ services }: { services: PlainService[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "title">("featured");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<PlainService | null>(null);
  const [deleting, setDeleting] = useState<PlainService | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = needle
      ? services.filter(
          (item) =>
            item.title.toLowerCase().includes(needle) ||
            item.slug.toLowerCase().includes(needle) ||
            item.description.toLowerCase().includes(needle) ||
            item.bestFor.toLowerCase().includes(needle) ||
            item.details.some((detail) => detail.toLowerCase().includes(needle)),
        )
      : services;

    return [...list].sort((a, b) =>
      sort === "title" ? a.title.localeCompare(b.title) : a.sortOrder - b.sortOrder,
    );
  }, [services, query, sort]);
  const { items: paged, safePage, totalPages } = paginateAdminItems(filtered, page);

  function openCreateForm() {
    setEditing(null);
    setIsFormOpen(true);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-black/10 px-3 py-2">
          <Search className="size-4 text-[#667066]" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search services"
            value={query}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold outline-none"
            onChange={(event) => {
              setSort(event.target.value as "featured" | "title");
              setPage(1);
            }}
            value={sort}
          >
            <option value="featured">Featured</option>
            <option value="title">Title</option>
          </select>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--regent-blue-900)] px-4 py-2 text-sm font-semibold text-white"
            onClick={openCreateForm}
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
          <span>Service</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-black/10">
          {paged.map((item) => (
            <article
              className="grid grid-cols-[88px_minmax(180px,1fr)_120px_112px] items-center px-4 py-3"
              key={item.id}
            >
              <ServiceThumb service={item} />
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">{item.title}</h2>
                <p className="truncate text-sm text-[#667066]">/{item.slug}</p>
              </div>
              <span className="text-sm font-semibold text-[#667066]">
                {item.isPublished ? "Live" : "Draft"}
              </span>
              <div className="flex gap-2">
                <button
                  aria-label={`Edit ${item.title}`}
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
                  aria-label={`Delete ${item.title}`}
                  className="rounded-lg border border-black/10 p-2 text-[var(--regent-red)] hover:bg-[var(--regent-red-soft)]"
                  onClick={() => setDeleting(item)}
                  type="button"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}
          {!paged.length ? (
            <div className="p-6 text-sm font-semibold text-[#667066]">
              No services match this search.
            </div>
          ) : null}
        </div>
      </div>

      <AdminPager
        currentPage={safePage}
        totalItems={filtered.length}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {isFormOpen ? (
        <ServiceForm
          service={editing}
          onClose={() => {
            setEditing(null);
            setIsFormOpen(false);
          }}
        />
      ) : null}

      {deleting ? (
        <DeleteServiceDialog service={deleting} onClose={() => setDeleting(null)} />
      ) : null}
    </div>
  );
}

function ServiceThumb({ service }: { service: PlainService }) {
  return (
    <div className="relative size-14 overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
      <Image src={service.image} alt="" fill sizes="56px" className="object-contain p-2" />
    </div>
  );
}

function ServiceForm({
  service,
  onClose,
}: {
  service: PlainService | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    service ? updateServiceAction : createServiceAction,
    initialActionState,
  );
  const [image, setImage] = useState(service?.image || "");
  const [detailsText, setDetailsText] = useState(service?.details.join("\n") || "");
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  async function uploadImage(file: File | undefined) {
    if (!file) {
      return;
    }

    setUploadMessage("Uploading...");
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

    setImage(data.publicUrl);
    setUploadMessage("Image ready.");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 px-4 py-6">
      <div className="mx-auto max-h-[calc(100vh-3rem)] max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">
            {service ? "Edit service" : "Add service"}
          </h2>
          <button
            aria-label="Close service form"
            className="rounded-lg border border-black/10 p-2"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-4"
        >
          {service ? <input name="id" type="hidden" value={service.id} /> : null}
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Title
            <input
              className="rounded-lg border border-black/10 px-3 py-2 font-normal"
              defaultValue={service?.title}
              maxLength={120}
              minLength={3}
              name="title"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            URL slug
            <input
              className="rounded-lg border border-black/10 px-3 py-2 font-normal"
              defaultValue={service?.slug}
              maxLength={120}
              name="slug"
              placeholder="auto-from-title"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Short description
            <textarea
              className="min-h-24 rounded-lg border border-black/10 px-3 py-2 font-normal"
              defaultValue={service?.description}
              maxLength={700}
              minLength={20}
              name="description"
              required
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold">
              CTA label
              <input
                className="rounded-lg border border-black/10 px-3 py-2 font-normal"
                defaultValue={service?.cta}
                maxLength={80}
                minLength={3}
                name="cta"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Sort order
              <input
                className="rounded-lg border border-black/10 px-3 py-2 font-normal"
                defaultValue={service?.sortOrder ?? 100}
                min="0"
                name="sortOrder"
                type="number"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Image
            <input
              className="rounded-lg border border-black/10 px-3 py-2 font-normal"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => uploadImage(event.currentTarget.files?.[0])}
            />
            {uploadMessage ? (
              <span className="text-xs font-semibold text-[#667066]">
                {uploadMessage}
              </span>
            ) : null}
            <input
              className="rounded-lg border border-black/10 px-3 py-2 font-normal"
              name="image"
              onChange={(event) => setImage(event.target.value)}
              placeholder="/regent/service-sharpening.png"
              required
              value={image}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Modal intro
            <textarea
              className="min-h-24 rounded-lg border border-black/10 px-3 py-2 font-normal"
              defaultValue={service?.modalIntro}
              maxLength={700}
              minLength={20}
              name="modalIntro"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Details
            <textarea
              className="min-h-32 rounded-lg border border-black/10 px-3 py-2 font-normal"
              name="detailsText"
              onChange={(event) => setDetailsText(event.target.value)}
              placeholder="One service detail per line"
              required
              value={detailsText}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Best for
            <textarea
              className="min-h-24 rounded-lg border border-black/10 px-3 py-2 font-normal"
              defaultValue={service?.bestFor}
              maxLength={500}
              minLength={20}
              name="bestFor"
              required
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-semibold">
            <input name="isPublished" type="checkbox" defaultChecked={service?.isPublished ?? true} />
            Published
          </label>
          {state.message ? (
            <p className={`text-sm font-semibold ${state.ok ? "text-[#596359]" : "text-[var(--regent-red)]"}`}>
              {state.message}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-2">
            <button
              className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-[var(--regent-blue-900)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={pending}
              type="submit"
            >
              {pending ? "Saving..." : "Save service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteServiceDialog({
  service,
  onClose,
}: {
  service: PlainService;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold">Delete service</h2>
        <p className="mt-2 text-sm leading-6 text-[#667066]">
          {service.title} will be removed from public service sections.
        </p>
        <form action={deleteServiceAction} className="mt-5 flex justify-end gap-2">
          <input name="id" type="hidden" value={service.id} />
          <button
            className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-[var(--regent-red)] px-5 py-3 text-sm font-semibold text-white"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
