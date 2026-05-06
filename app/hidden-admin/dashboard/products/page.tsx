import { AdminPanel } from "@/components/admin/admin-shell";
import { ProductManager } from "@/components/admin/product-manager";
import { listProducts } from "@/lib/products/queries";

export default async function Page() {
  const firstPage = await listProducts({ pageSize: 24, includeDrafts: true });
  const remainingPages =
    firstPage.totalPages > 1
      ? await Promise.all(
          Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
            listProducts({ page: index + 2, pageSize: 24, includeDrafts: true }),
          ),
        )
      : [];
  const products = [
    ...firstPage.items,
    ...remainingPages.flatMap((page) => page.items),
  ].map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <AdminPanel title="Products" description="Add, edit, publish, and reorder catalog items.">
      <ProductManager products={products} />
    </AdminPanel>
  );
}
