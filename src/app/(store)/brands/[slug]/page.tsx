import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  return <PagePlaceholder title="Brand" description={`Brand collection for ${slug}.`} />;
}
