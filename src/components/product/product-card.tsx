

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppPreferences } from "@/components/layout/app-preferences-provider";
import { product } from "@/Interface/Product.t";
import NumberFormatComp from "./NumberFormatComp";
import AddProductBtn from "./AddProductBtn";



type ProductCardProps = {
  product: product;
  categoryLabel?: string;
  onAddToCart?: (product: product) => void;
};

export function ProductCard({ product, categoryLabel, onAddToCart }: ProductCardProps) {

  const productHref = `/products/${product.id}`;


  return (
    <Card className="product-card">
      <CardHeader className="product-card-media">
        <Link href={productHref} className="product-art" >
          {/* {hasDiscount && <Badge className="sale-badge">-{discount}%</Badge>} */}
          <Image src={product.imageCover} alt={product.title} fill sizes="(max-width: 560px) 50vw, (max-width: 900px) 50vw, 25vw" className="product-photo  object-top" />
        </Link>
        <div className="product-card-actions" aria-label={`${product.title} actions`}>
          <Link href="/wishlist" ><Heart size={19} /></Link>
          <button type="button" ><RefreshCw size={18} /></button>
          <Link href={productHref} ><Eye size={19} /></Link>
        </div>
      </CardHeader>
      <CardContent className="product-info">
        <span className="product-category">{categoryLabel ?? product.category.name}</span>
        <CardTitle className="product-title"><Link href={productHref}>{product.title}</Link></CardTitle>
        <div className="product-buy">
          <NumberFormatComp product={product} />
          <AddProductBtn id={product.id}/>
        </div>
      </CardContent>
    </Card>
  );
}
