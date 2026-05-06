import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/admin/session";
import { privateRouteRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: privateRouteRobots,
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return <AdminShell email={session.user.email}>{children}</AdminShell>;
}
