"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import {
  ChevronDown,
  Gift,
  Heart,
  MapPin,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sun,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { useAppPreferences } from "@/components/layout/app-preferences-provider";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContextProvider";

const navigation = [
  { labelKey: "home", href: "/" },
  { labelKey: "shop", href: "/products" },
  { labelKey: "categories", href: "/categories" },
  { labelKey: "brands", href: "/brands" },
  { labelKey: "newArrivals", href: "/search?sort=newest" },
  // { labelKey: "signUp", href: "/signup" },
  // { labelKey: "login", href: "/login" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {numCartItem} = useContext(CartContext)
  const { locale, isDark, t, toggleLocale, toggleTheme } = useAppPreferences();

  const { status,data } = useSession()
  console.log(data);


  function handleLogout() {
    signOut({callbackUrl:"/login",redirect:true})
  }
  return (
    <header className="site-header  top-0 left-0 z-40 w-full bg-white">
      <div className="announcement-bar">
        <div className="site-container announcement-inner">
          <span><Truck size={15} strokeWidth={2.2} /> {t("shipping")}</span>
          <Link href="/products" className="announcement-link"><Gift size={15} /> {t("newArrivals")} <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="site-container header-main">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? t("closeNavigation") : t("openNavigation")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="brand-mark" aria-label="FreshCart home">
          <span className="brand-icon"><ShoppingCart size={23} strokeWidth={2.5} /></span>
          <span>Fresh<span>Cart</span></span>
        </Link>

        <form action="/search" className="header-search" role="search">
          <label className="sr-only" htmlFor="site-search">{t("searchProducts")}</label>
          <input id="site-search" name="q" placeholder={t("searchProducts")} />
          <button type="submit" aria-label={t("search")}><Search size={20} /></button>
        </form>

        <div className="header-actions">
          <Link href="/profile/settings" className="header-action account-action">
            <UserRound size={21} strokeWidth={1.8} />
            <span><small>{t("account")}</small><strong>{t("signIn")}</strong></span>
          </Link>
          <Link href="/wishlist" className="icon-action" aria-label={t("wishlist")}><Heart size={22} strokeWidth={1.8} /></Link>
          <Link href="/cart" className="icon-action cart-action" aria-label={t("cart")}>
            <ShoppingBag size={22} strokeWidth={1.8} /><span className="cart-count">{numCartItem}</span>
          </Link>
          <button type="button" className="preference-toggle" onClick={toggleLocale} aria-label={t("language")} title={t("language")}>
            <span>{locale === "en" ? "عربي" : "EN"}</span>
          </button>
          <button type="button" className="preference-toggle" onClick={toggleTheme} aria-label={t("theme")} title={t("theme")}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <nav className={`site-container primary-nav${menuOpen ? " is-open" : ""}`} aria-label={t("mainNavigation")}>
        <Link href="/categories" className="all-categories"><Menu size={17} /> {t("shopByCategory")} <ChevronDown size={15} /></Link>
        <div className="nav-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{t(item.labelKey)}</Link>
          ))}
        </div>
        {status === 'authenticated' ? <span onClick={handleLogout}>Logout {data.user?.name}</span> : <>
          <Link href='/signup' onClick={() => setMenuOpen(false)}>signUp</Link>
          <Link href='/login' onClick={() => setMenuOpen(false)}>login</Link>
        </>}



        <Link href="/profile/addresses" className="delivery-link"><MapPin size={17} /> {t("deliverTo")} <strong>{t("yourAddress")}</strong></Link>
      </nav>
    </header>
  );
}
