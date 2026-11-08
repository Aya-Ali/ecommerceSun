'use client'
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";

import { useAppPreferences } from "@/components/layout/app-preferences-provider";
export default function NumberFormatComp({ product }) {
  const { locale, t } = useAppPreferences();
  const productHref = `/products/${product.id}`;
  const hasDiscount = product.priceAfterDiscount != null && product.priceAfterDiscount < product.price;
  const discount = hasDiscount ? Math.round((1 - product.priceAfterDiscount! / product.price) * 100) : 0;
  const displayPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const numberFormat = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG");
  const ratingFormat = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return (
        <>
              <span className="product-buy-copy">
            <span className="product-rating" aria-label={`${ratingFormat.format(product.ratingsAverage)} / 5, ${numberFormat.format(product.ratingsQuantity)} ${t("reviews")}`}>
              <span className="product-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill={index < Math.floor(product.ratingsAverage) ? "currentColor" : "none"} />)}</span>
              <span>{ratingFormat.format(product.ratingsAverage)} ({numberFormat.format(product.ratingsQuantity)})</span>
            </span>
            <span className="product-prices">
              <strong>{numberFormat.format(displayPrice)} {t("currency")}</strong>
              {hasDiscount && <del>{numberFormat.format(product.price)} {t("currency")}</del>}
            </span>
          </span>
          </>
    )
}
