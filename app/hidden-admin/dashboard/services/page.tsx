import { AdminPanel } from "@/components/admin/admin-shell";
import { ServiceManager } from "@/components/admin/service-manager";
import { listServices } from "@/lib/products/queries";

export default async function Page() {
  const data = await listServices(true);
  const services = data.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <AdminPanel title="Services" description="Add, edit, publish, and reorder service cards.">
      <ServiceManager services={services} />
    </AdminPanel>
  );
}
