import { SiteHeader } from "@/components/layout/site-header";
import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>

    <SiteHeader/>
      {children}
    </>
  );
}
