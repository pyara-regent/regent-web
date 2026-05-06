import Link from "next/link";
import { CircleHelp, Package, Settings, ShieldCheck, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SignOutButton } from "@/components/admin/sign-out-button";

const adminNav = [
  { href: "/hidden-admin/dashboard", label: "Overview", icon: ShieldCheck },
  { href: "/hidden-admin/dashboard/products", label: "Products", icon: Package },
  { href: "/hidden-admin/dashboard/services", label: "Services", icon: Wrench },
  { href: "/hidden-admin/dashboard/faqs", label: "FAQ", icon: CircleHelp },
  { href: "/hidden-admin/dashboard/profile", label: "Profile", icon: Settings },
] as const;

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#1f2320]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/hidden-admin/dashboard" className="flex flex-col">
            <span className="text-base font-bold uppercase tracking-[0.08em]">
              {siteConfig.name}
            </span>
            <span className="text-sm text-[#667066]">Admin</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-black/10 px-3 py-2 text-sm text-[#667066]">
              {email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {adminNav.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#485048] transition-colors hover:bg-white"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}

export function AdminPanel({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          {description ? <p className="mt-1 text-sm leading-6 text-[#667066]">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
