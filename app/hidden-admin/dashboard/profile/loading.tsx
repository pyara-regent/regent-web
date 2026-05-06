import { AdminPanel } from "@/components/admin/admin-shell";

export default function Loading() {
  return (
    <AdminPanel title="Profile" description="Loading admin profile.">
      <div className="max-w-xl space-y-4">
        <div className="h-10 rounded-lg bg-[#f4f4ef]" />
        <div className="h-10 rounded-lg bg-[#f4f4ef]" />
        <div className="h-12 w-36 rounded-full bg-[var(--regent-blue-900)]/20" />
      </div>
    </AdminPanel>
  );
}
