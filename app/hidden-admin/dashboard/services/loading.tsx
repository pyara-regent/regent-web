import { AdminPanel } from "@/components/admin/admin-shell";

export default function Loading() {
  return (
    <AdminPanel title="Services" description="Loading service records.">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="h-10 flex-1 rounded-lg bg-[#f4f4ef]" />
          <div className="flex gap-2">
            <div className="h-10 w-28 rounded-lg bg-[#f4f4ef]" />
            <div className="h-10 w-20 rounded-lg bg-[var(--regent-blue-900)]/20" />
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-black/10">
          <div className="h-11 bg-[#f4f4ef]" />
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="grid grid-cols-[88px_minmax(180px,1fr)_120px_112px] items-center border-t border-black/10 px-4 py-3">
              <div className="size-14 rounded-lg bg-[#ecece5]" />
              <div className="space-y-2">
                <div className="h-4 max-w-[260px] rounded-full bg-[#ecece5]" />
                <div className="h-4 max-w-[170px] rounded-full bg-[#ecece5]" />
              </div>
              <div className="h-5 w-14 rounded-full bg-[#ecece5]" />
              <div className="h-9 w-20 rounded-lg bg-[#ecece5]" />
            </div>
          ))}
        </div>
      </div>
    </AdminPanel>
  );
}
