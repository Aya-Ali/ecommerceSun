'use client';

import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { useAppPreferences } from "@/components/layout/app-preferences-provider";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const { t } = useAppPreferences();

  return (
    <>
      <SiteHeader />
      {children}
      <footer className="site-footer">
        <div className="site-container footer-inner">
          <Link href="/" className="brand-mark footer-brand"><span className="brand-icon">🛒</span><span>Fresh<span>Cart</span></span></Link>
          <p>{t("footerTagline")}</p>
          <span>© 2026 FreshCart</span>
        </div>
      </footer>
    </>
  );
}
