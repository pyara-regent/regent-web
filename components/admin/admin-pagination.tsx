"use client";

export const adminPageSize = 10;

export function paginateAdminItems<T>(items: T[], page: number) {
  const totalPages = Math.max(Math.ceil(items.length / adminPageSize), 1);
  const safePage = Math.min(page, totalPages);

  return {
    items: items.slice((safePage - 1) * adminPageSize, safePage * adminPageSize),
    safePage,
    totalPages,
  };
}

export function AdminPager({
  currentPage,
  totalItems,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return (
      <p className="text-sm font-semibold text-[#667066]">
        Showing {totalItems} {totalItems === 1 ? "item" : "items"}.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-[#667066]">
        Page {currentPage} of {totalPages}, {totalItems} total.
      </p>
      <div className="flex gap-2">
        <button
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold disabled:opacity-40"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          type="button"
        >
          Previous
        </button>
        <button
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold disabled:opacity-40"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
