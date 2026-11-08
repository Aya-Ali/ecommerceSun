"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useAppPreferences } from "@/components/layout/app-preferences-provider";

const slides = [
  { kicker: "freshnessKicker", title: "freshnessTitle", message: "freshnessMessage", produce: ["🥬", "🥑", "🍊"] },
  { kicker: "offerKicker", title: "offerTitle", message: "offerMessage", produce: ["🍎", "🥕", "🥦"] },
  { kicker: "farmKicker", title: "farmTitle", message: "farmMessage", produce: ["🍅", "🥒", "🍋"] },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const { t } = useAppPreferences();
  const slide = slides[active];
  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <div className="hero-banner" aria-roledescription="carousel" aria-label={t("heroOffers")}>
      <div className="hero-copy" aria-live="polite">
        <span className="hero-kicker"><Sparkles size={15} /> {t(slide.kicker)}</span>
        <h1>{t(slide.title)}</h1>
        <p>{t(slide.message)}</p>
        <Link href="/products" className="hero-cta">{t("shopNow")} <ArrowRight size={17} /></Link>
      </div>
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-produce" aria-hidden="true">{slide.produce.map((item, index) => <span key={`${active}-${index}`}>{item}</span>)}</div>
      <div className="hero-arrows" aria-label={t("bannerControls")}>
        <button type="button" aria-label={t("previousBanner")} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
        <button type="button" aria-label={t("nextBanner")} onClick={() => move(1)}><ChevronRight size={20} /></button>
      </div>
      <div className="hero-dots" aria-label={t("chooseBanner")}>
        {slides.map((item, index) => <button key={item.kicker} type="button" className={index === active ? "active" : ""} aria-label={`${t("showBanner")} ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}
      </div>
    </div>
  );
}
