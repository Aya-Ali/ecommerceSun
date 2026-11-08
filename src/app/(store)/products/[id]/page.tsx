import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ProductDetailsView } from "@/components/product/product-details-view";
import { HandleGetSingleProduct } from "@/services/Api.servcies";

export default async function ProductDetailsPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;

  // Product details are fetched and rendered for each request, not at build time.
  await connection();
  const product = await HandleGetSingleProduct(id);

  if (!product) notFound();

  return <ProductDetailsView product={product} />;
}
