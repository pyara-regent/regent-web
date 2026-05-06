import Link from "next/link";
import { CircleHelp, Package, Settings, Wrench } from "lucide-react";
import { AdminPanel } from "@/components/admin/admin-shell";
import { listFaqs, listProducts, listServices } from "@/lib/products/queries";

export default async function Page() {
  const [productData, services, faqs] = await Promise.all([
    listProducts({ pageSize: 1, includeDrafts: true }),
    listServices(true),
    listFaqs(true),
  ]);
  const cards = [
    {
      label: "Products",
      value: productData.totalItems,
      href: "/hidden-admin/dashboard/products",
      icon: Package,
    },
    {
      label: "Services",
      value: services.length,
      href: "/hidden-admin/dashboard/services",
      icon: Wrench,
    },
    {
      label: "FAQ",
      value: faqs.length,
      href: "/hidden-admin/dashboard/faqs",
      icon: CircleHelp,
    },
    {
      label: "Profile",
      value: "Admin",
      href: "/hidden-admin/dashboard/profile",
      icon: Settings,
    },
  ];

  return (
    <AdminPanel title="Overview" description="Manage the editable parts of the site.">
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              className="rounded-lg border border-black/10 p-5 transition-colors hover:bg-[#f7f7f4]"
              href={card.href}
            >
              <Icon className="size-5 text-[var(--regent-red)]" />
              <p className="mt-4 text-3xl font-bold">{card.value}</p>
              <p className="mt-1 text-sm font-semibold text-[#667066]">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </AdminPanel>
  );
}
