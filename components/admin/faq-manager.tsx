"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Plus, Search, Trash2, X } from "lucide-react";
import type { Faq } from "@/lib/db/schema";
import {
  createFaqAction,
  deleteFaqAction,
  updateFaqAction,
} from "@/app/hidden-admin/dashboard/actions";
import { AdminPager, paginateAdminItems } from "@/components/admin/admin-pagination";

type PlainFaq = Omit<Faq, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const initialActionState = {
  ok: false,
  message: "",
};

export function FaqManager({ faqs }: { faqs: PlainFaq[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<PlainFaq | null>(null);
  const [deleting, setDeleting] = useState<PlainFaq | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return faqs
      .filter(
        (item) =>
          !needle ||
          item.question.toLowerCase().includes(needle) ||
          item.answer.toLowerCase().includes(needle),
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [faqs, query]);
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
            placeholder="Search FAQ"
          />
        </div>
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
      <div className="divide-y divide-black/10 rounded-lg border border-black/10">
        {pageData.items.map((item) => (
          <article key={item.id} className="grid gap-3 p-4 md:grid-cols-[1fr_100px_96px] md:items-center">
            <div>
              <h2 className="font-bold">{item.question}</h2>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#667066]">{item.answer}</p>
            </div>
            <span className="text-sm font-semibold text-[#667066]">{item.isPublished ? "Live" : "Draft"}</span>
            <div className="flex gap-2">
              <button className="rounded-lg border border-black/10 p-2 hover:bg-[#f4f4ef]" onClick={() => { setEditing(item); setIsFormOpen(true); }} type="button">
                <Edit3 className="size-4" />
              </button>
              <button className="rounded-lg border border-black/10 p-2 text-[var(--regent-red)] hover:bg-[var(--regent-red-soft)]" onClick={() => setDeleting(item)} type="button">
                <Trash2 className="size-4" />
              </button>
            </div>
          </article>
        ))}
        {!filtered.length ? (
          <div className="p-6 text-sm font-semibold text-[#667066]">
            No FAQ entries match this search.
          </div>
        ) : null}
      </div>
      <AdminPager
        currentPage={pageData.safePage}
        totalItems={filtered.length}
        totalPages={pageData.totalPages}
        onPageChange={setPage}
      />
      {isFormOpen ? <FaqForm faq={editing} onClose={() => { setEditing(null); setIsFormOpen(false); }} /> : null}
      {deleting ? <DeleteFaqDialog faq={deleting} onClose={() => setDeleting(null)} /> : null}
    </div>
  );
}

function FaqForm({ faq, onClose }: { faq: PlainFaq | null; onClose: () => void }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    faq ? updateFaqAction : createFaqAction,
    initialActionState,
  );

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 px-4 py-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">{faq ? "Edit FAQ" : "Add FAQ"}</h2>
          <button className="rounded-lg border border-black/10 p-2" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>
        <form action={formAction} className="flex flex-col gap-4">
          {faq ? <input type="hidden" name="id" value={faq.id} /> : null}
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Question
            <input className="rounded-lg border border-black/10 px-3 py-2 font-normal" name="question" defaultValue={faq?.question} required />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Answer
            <textarea className="min-h-32 rounded-lg border border-black/10 px-3 py-2 font-normal" name="answer" defaultValue={faq?.answer} required />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Sort order
            <input className="rounded-lg border border-black/10 px-3 py-2 font-normal" name="sortOrder" type="number" min="0" defaultValue={faq?.sortOrder ?? 100} />
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-semibold">
            <input name="isPublished" type="checkbox" defaultChecked={faq?.isPublished ?? true} />
            Published
          </label>
          {state.message ? (
            <p className={`text-sm font-semibold ${state.ok ? "text-[#596359]" : "text-[var(--regent-red)]"}`}>
              {state.message}
            </p>
          ) : null}
          <div className="flex justify-end gap-2">
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold" onClick={onClose} type="button">Cancel</button>
            <button
              className="rounded-full bg-[var(--regent-blue-900)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={pending}
              type="submit"
            >
              {pending ? "Saving..." : "Save FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteFaqDialog({ faq, onClose }: { faq: PlainFaq; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold">Delete FAQ</h2>
        <p className="mt-2 text-sm leading-6 text-[#667066]">{faq.question}</p>
        <form action={deleteFaqAction} className="mt-5 flex justify-end gap-2">
          <input type="hidden" name="id" value={faq.id} />
          <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold" onClick={onClose} type="button">Cancel</button>
          <button className="rounded-full bg-[var(--regent-red)] px-5 py-3 text-sm font-semibold text-white" type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}
