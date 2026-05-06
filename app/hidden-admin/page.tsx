import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-auth";
import { getAdminSession } from "@/lib/admin/session";
import { privateRouteRobots } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: privateRouteRobots,
};

export default async function Page() {
  const session = await getAdminSession();

  if (session) {
    redirect("/hidden-admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-4 py-10 text-[#1f2320]">
      <section className="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--regent-red)]">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-bold">{siteConfig.name}</h1>
        <p className="mb-6 mt-2 text-sm leading-6 text-[#667066]">
          Sign in to manage products and FAQ.
        </p>
        <AdminLoginForm turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
      </section>
    </main>
  );
}
