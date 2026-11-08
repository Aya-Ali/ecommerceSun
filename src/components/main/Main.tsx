'use client'
import React from 'react'
import type { CSSProperties } from "react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import Link from "next/link";
import { useAppPreferences } from '../layout/app-preferences-provider';
import { ArrowRight } from 'lucide-react';
const categories = [
  { nameKey: "vegetables", detailKey: "freshFromFarm", icon: "🥬", tone: "#e9f7e9" },
  { nameKey: "freshFruits", detailKey: "sweetSeasonal", icon: "🍊", tone: "#fff2df" },
  { nameKey: "dairyEggs", detailKey: "everydayEssentials", icon: "🥚", tone: "#f2efff" },
  { nameKey: "meatSeafood", detailKey: "qualityCuts", icon: "🥩", tone: "#fff0ed" },
  { nameKey: "bakery", detailKey: "bakedDaily", icon: "🥖", tone: "#fff5dc" },
];
export default function Main() {
      const { t } = useAppPreferences();
  return (
    <>
        <section className="site-container hero-section" aria-label={t("heroOffers")}>
        <HeroCarousel />
      </section>

      <section className="site-container home-section">
        <div className="section-heading">
          <div><span className="eyebrow">{t("categoryEyebrow")}</span><h2>{t("shopByCategoryTitle")}</h2></div>
          <Link href="/categories" className="text-link">{t("viewAllCategories")} <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.nameKey} href="/categories" className="category-card" style={{ "--category-tone": category.tone } as CSSProperties}>
              <span className="category-emoji" aria-hidden="true">{category.icon}</span>
              <span className="category-name">{t(category.nameKey)}</span>
              <span className="category-detail">{t(category.detailKey)}</span>
            </Link>
          ))}
        </div>
      </section>
      </>
  )
}
