"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import type { product } from "@/Interface/Product.t";
import { useAppPreferences } from "@/components/layout/app-preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddProductToCart } from "@/services/Cart.services";
import toast from "react-hot-toast";

export function ProductDetailsView({ product }: { product: product }) {
  const { locale, t } = useAppPreferences();
  const images = Array.from(new Set([product.imageCover, ...(product.images ?? [])].filter(Boolean)));
  const [selectedImage, setSelectedImage] = useState(images[0] ?? product.imageCover);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const formatNumber = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG");
  const formatRating = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const hasDiscount = product.priceAfterDiscount != null && product.priceAfterDiscount < product.price;
  const price = hasDiscount ? product.priceAfterDiscount! : product.price;
  const category = product.category?.name ?? t("products");
  const subcategory = product.subcategory?.[0]?.name;


  async function handleAddToCart() {
    const response = await AddProductToCart(product._id)
    if (response.status == 'success') {
      toast.success(response.message)
    }
  }
  return (
    <main className="product-details-page site-container">
      <nav className="product-breadcrumb" aria-label={t("breadcrumb")}>
        <Link href="/">{t("home")}</Link>
        <ChevronRight aria-hidden="true" size={15} />
        <Link href="/categories">{category}</Link>
        {subcategory && <>
          <ChevronRight aria-hidden="true" size={15} />
          <Link href="/categories">{subcategory}</Link>
        </>}
        <ChevronRight aria-hidden="true" size={15} />
        <span aria-current="page">{product.title}</span>
      </nav>

      <section className="product-detail-main" aria-labelledby="product-title">
        <div className="product-gallery">
          <div className="product-gallery-featured">
            {hasDiscount && <Badge className="product-detail-sale">-{Math.round((1 - price / product.price) * 100)}%</Badge>}
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              className="product-gallery-image"
            />
          </div>
          <div className="product-gallery-thumbnails" aria-label={t("productImages")}>
            {images.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={`product-gallery-thumbnail${selectedImage === image ? " is-selected" : ""}`}
                onClick={() => setSelectedImage(image)}
                aria-label={`${t("showProductImage")} ${index + 1}`}
                aria-pressed={selectedImage === image}
              >
                <Image src={image} alt="" fill sizes="110px" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-copy">
          <Link href="/categories" className="product-detail-category">{category}</Link>
          <h1 id="product-title">{product.title}</h1>
          <div className="product-detail-rating">
            <span className="product-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={17} fill={index < Math.floor(product.ratingsAverage) ? "currentColor" : "none"} />
              ))}
            </span>
            <span>{formatRating.format(product.ratingsAverage)}</span>
            <span className="product-detail-review-count">({formatNumber.format(product.ratingsQuantity)} {t("reviews")})</span>
          </div>

          <div className="product-detail-price">
            <strong>{formatNumber.format(price)} {t("currency")}</strong>
            {hasDiscount && <del>{formatNumber.format(product.price)} {t("currency")}</del>}
          </div>
          <p className="product-detail-description">{product.description}</p>

          <div className={`product-stock${product.quantity > 0 ? " is-available" : " is-unavailable"}`}>
            <span aria-hidden="true" />
            {product.quantity > 0 ? t("inStock") : t("outOfStock")}
            {product.quantity > 0 && <small>{formatNumber.format(product.quantity)} {t("availableUnits")}</small>}
          </div>

          <div className="product-detail-purchase">
            <div className="product-quantity" aria-label={t("quantity")}>
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label={t("decreaseQuantity")}>
                <Minus size={16} />
              </button>
              <output aria-live="polite">{formatNumber.format(quantity)}</output>
              <button type="button" onClick={() => setQuantity((current) => Math.min(product.quantity || 1, current + 1))} aria-label={t("increaseQuantity")} disabled={product.quantity < 1 || quantity >= product.quantity}>
                <Plus size={16} />
              </button>
            </div>
            <Button onClick={handleAddToCart} className="product-detail-add" size="lg" disabled={product.quantity < 1}>
              <ShoppingCart size={18} /> {t("addToCart")}
            </Button>
            <Button className="product-detail-wishlist" variant="outline" size="icon-lg" aria-label={t("saveProduct")}>
              <Heart size={18} />
            </Button>
          </div>

          <div className="product-detail-meta">
            <p><span>{t("brandLabel")}</span><Link href="/brands">{product.brand?.name ?? "—"}</Link></p>
            <p><span>{t("categoryLabel")}</span><Link href="/categories">{category}</Link></p>
            <p><span>{t("productCode")}</span><span>{product._id}</span></p>
          </div>

          <div className="product-detail-promises">
            <div><Truck size={19} /><span><strong>{t("deliveryPromise")}</strong><small>{t("deliveryPromiseDetails")}</small></span></div>
            <div><ShieldCheck size={19} /><span><strong>{t("secureShopping")}</strong><small>{t("secureShoppingDetails")}</small></span></div>
          </div>
        </div>
      </section>

      <section className="product-information" aria-label={t("productInformation")}>
        <div className="product-information-tabs" role="tablist" aria-label={t("productInformation")}>
          <button
            type="button"
            role="tab"
            id="product-details-tab"
            aria-selected={activeTab === "details"}
            aria-controls="product-information-panel"
            onClick={() => setActiveTab("details")}
          >
            {t("productDetails")}
          </button>
          <button
            type="button"
            role="tab"
            id="product-reviews-tab"
            aria-selected={activeTab === "reviews"}
            aria-controls="product-information-panel"
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={16} /> {t("reviews")} ({formatNumber.format(product.ratingsQuantity)})
          </button>
        </div>
        <div
          className="product-information-panel"
          id="product-information-panel"
          role="tabpanel"
          aria-labelledby={activeTab === "details" ? "product-details-tab" : "product-reviews-tab"}
        >
          {activeTab === "details" ? (
            <>
              <h2>{t("aboutThisProduct")}</h2>
              <p className="product-about-copy">{product.description}</p>
              <div className="product-attributes">
                <h3>{t("productInformation")}</h3>
                <dl>
                  <div><dt>{t("categoryLabel")}</dt><dd>{category}</dd></div>
                  <div><dt>{t("subcategoryLabel")}</dt><dd>{subcategory ?? "—"}</dd></div>
                  <div><dt>{t("brandLabel")}</dt><dd>{product.brand?.name ?? "—"}</dd></div>
                  <div><dt>{t("unitsSold")}</dt><dd>{formatNumber.format(product.sold)}</dd></div>
                </dl>
              </div>
            </>
          ) : (
            <>
              <div className="product-reviews-summary">
                <div className="product-review-score">{formatRating.format(product.ratingsAverage)}<span>/ 5</span></div>
                <div>
                  <div className="product-stars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill={index < Math.floor(product.ratingsAverage) ? "currentColor" : "none"} />)}
                  </div>
                  <p>{formatNumber.format(product.ratingsQuantity)} {t("reviews")}</p>
                </div>
              </div>
              <div className="product-review-list">
                {(product.reviews ?? []).slice(0, showAllReviews ? undefined : 6).map((review) => (
                  <article className="product-review" key={review._id}>
                    <div className="product-review-heading">
                      <strong>{review.user?.name || t("customer")}</strong>
                      {review.createdAt && <time dateTime={String(review.createdAt)}>{new Date(String(review.createdAt)).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-EG", { year: "numeric", month: "short", day: "numeric" })}</time>}
                    </div>
                    <div className="product-stars" aria-label={`${formatRating.format(review.rating)} / 5`}>
                      {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < Math.floor(review.rating) ? "currentColor" : "none"} />)}
                    </div>
                    {review.review && <p>{review.review}</p>}
                  </article>
                ))}
                {(product.reviews?.length ?? 0) > 6 && (
                  <button type="button" className="product-reviews-more" onClick={() => setShowAllReviews((current) => !current)}>
                    {showAllReviews ? t("showFewerReviews") : t("showAllReviews")}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
