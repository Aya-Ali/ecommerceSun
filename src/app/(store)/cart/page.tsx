"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ArrowRight, Check, ChevronRight, Minus, Plus, ShoppingCart, Trash2, Truck } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContextProvider";
import type { Cart, ProductElement } from "@/Interface/Cart.t";
import { ClearCart, DeleteProductItemFromCart, GetAllCartItem, UpdateCartProductCount } from "@/services/Cart.services";

const money = (value: number) => `${new Intl.NumberFormat("en-US").format(value)} EGP`;

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { setNumCartItem } = useContext(CartContext);

  useEffect(() => {
    GetAllCartItem()
      .then((result: Cart) => setCart(result))
      .catch(() => toast.error("Could not load your cart. Please sign in and try again."))
      .finally(() => setLoading(false));
  }, []);

  async function updateCount(item: ProductElement, delta: number) {
    const nextCount = Math.max(1, item.count + delta);
    if (nextCount === item.count) return;
    const id = item.product.id || item.product._id;
    setBusyId(id);
    try {
      const result: Cart = await UpdateCartProductCount(nextCount, id);
      if (result.status === "success") {
        setCart(result);
        setNumCartItem(result.numOfCartItems);
      } else toast.error("Could not update the quantity.");
    } catch {
      toast.error("Could not update the quantity.");
    } finally {
      setBusyId(null);
    }
  }

  async function removeItem(id: string) {
    setBusyId(id);
    try {
      const result: Cart = await DeleteProductItemFromCart(id);
      if (result.status === "success") {
        setCart(result);
        setNumCartItem(result.numOfCartItems);
        toast.success("Item removed from your cart");
      }
    } catch {
      toast.error("Could not remove this item.");
    } finally {
      setBusyId(null);
    }
  }

  async function clearCart() {
    try {
      const result: Cart = await ClearCart();
      if (result.status === "success") {
        setCart(result);
        setNumCartItem(0);
        toast.success("Your cart is clear");
      }
    } catch {
      toast.error("Could not clear your cart.");
    }
  }

  const items = cart?.data?.products ?? [];
  const subtotal = cart?.data?.totalCartPrice ?? 0;
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 35;

  return (
    <main className="store-page cart-page site-container">
      <nav className="store-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><ChevronRight size={15} /><span aria-current="page">Shopping Cart</span>
      </nav>
      <header className="store-page-heading">
        <span className="store-heading-icon"><ShoppingCart size={28} fill="currentColor" /></span>
        <div><h1>Shopping Cart</h1><p>You have <strong>{cart?.numOfCartItems ?? 0} items</strong> in your cart</p></div>
      </header>

      {loading ? <div className="cart-loading" aria-live="polite">Loading your cart…</div> : items.length === 0 ? (
        <section className="cart-empty">
          <ShoppingCart size={42} />
          <h2>Your cart is empty</h2>
          <p>Discover fresh picks and add something you love.</p>
          <Link className="store-primary-button" href="/products">Continue Shopping <ArrowRight size={17} /></Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {items.map((item) => {
              const id = item.product.id || item.product._id;
              return <article className="cart-product" key={item._id}>
                <div className="cart-product-image">
                  <Image src={item.product.imageCover} alt={item.product.title} fill sizes="(max-width: 700px) 34vw, 130px" />
                  <span className="cart-stock"><Check size={12} /> In Stock</span>
                </div>
                <div className="cart-product-info">
                  <div className="cart-product-topline">
                    <div>
                      <h2>{item.product.title}</h2>
                      <div className="cart-product-meta"><span>{item.product.category?.name}</span><i /> <span>SKU: {item.product._id.slice(-8).toUpperCase()}</span></div>
                    </div>
                    <button className="cart-remove" type="button" onClick={() => removeItem(id)} disabled={busyId === id} aria-label={`Remove ${item.product.title}`}><Trash2 size={18} /></button>
                  </div>
                  <div className="cart-product-bottomline">
                    <p className="cart-product-price"><strong>{money(item.price)}</strong><span>per unit</span></p>
                    <div className="cart-quantity" aria-label={`Quantity for ${item.product.title}`}>
                      <button type="button" aria-label="Decrease quantity" disabled={busyId === id || item.count <= 1} onClick={() => updateCount(item, -1)}><Minus size={16} /></button>
                      <output>{item.count}</output>
                      <button type="button" aria-label="Increase quantity" disabled={busyId === id} onClick={() => updateCount(item, 1)}><Plus size={16} /></button>
                    </div>
                  </div>
                  <div className="cart-line-total">Item total <strong>{money(item.price * item.count)}</strong></div>
                </div>
              </article>;
            })}
            <div className="cart-list-actions"><Link href="/products"><ArrowRight size={16} /> Continue Shopping</Link><button type="button" onClick={clearCart}>Clear Cart</button></div>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row"><span>Subtotal ({cart?.numOfCartItems ?? 0} items)</span><strong>{money(subtotal)}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>{shipping === 0 ? "Free" : money(shipping)}</strong></div>
            <p className="cart-shipping-note"><Truck size={16} /> {subtotal >= 500 ? "You qualify for free shipping!" : "Free shipping on orders over 500 EGP"}</p>
            <div className="summary-total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div>
            <Link href={`/checkout/${cart?.cartId}`} className="store-primary-button cart-checkout-button">Proceed to Checkout <ArrowRight size={17} /></Link>
            <div className="cart-secure"><span>🔒</span> Secure checkout · Easy returns</div>
          </aside>
        </div>
      )}
    </main>
  );
}
