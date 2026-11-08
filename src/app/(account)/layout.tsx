import { StorefrontShell } from "@/components/layout/storefront-shell";

export default function AccountLayout({ children }: LayoutProps<"/">) {
  return <StorefrontShell>{children}</StorefrontShell>;
}
