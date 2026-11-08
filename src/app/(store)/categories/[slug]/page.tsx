import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  return <PagePlaceholder title="Category" description={`Product listing for ${slug}.`} />;
}
