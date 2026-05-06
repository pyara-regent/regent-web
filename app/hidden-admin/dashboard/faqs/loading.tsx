import { AdminPanel } from "@/components/admin/admin-shell";

export default function Loading() {
  return (
    <AdminPanel title="FAQ" description="Loading FAQ records.">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="h-10 flex-1 rounded-lg bg-[#f4f4ef]" />
          <div className="h-10 w-20 rounded-lg bg-[var(--regent-blue-900)]/20" />
        </div>
        <div className="divide-y divide-black/10 rounded-lg border border-black/10">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="grid gap-3 p-4 md:grid-cols-[1fr_100px_96px] md:items-center">
              <div className="space-y-2">
                <div className="h-5 max-w-[420px] rounded-full bg-[#ecece5]" />
                <div className="h-4 max-w-[620px] rounded-full bg-[#ecece5]" />
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
