import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return <StorefrontShell>{children}</StorefrontShell>;
}
