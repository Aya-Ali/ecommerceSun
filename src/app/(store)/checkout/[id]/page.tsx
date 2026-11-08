"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Banknote, Check, ChevronRight, CreditCard, Home, LockKeyhole, MapPin, PackageCheck, Truck } from "lucide-react";
import toast from "react-hot-toast";
import type { Cart } from "@/Interface/Cart.t";
import { GetAllCartItem, PaymentOrder } from "@/services/Cart.services";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";

const money = (value: number) => `${new Intl.NumberFormat("en-US").format(value)} EGP`;

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const subtotal = cart?.data?.totalCartPrice ?? 0;
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 35;
  const { id } = useParams()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      city: "",
      phone: "",
      details: ""
    },

  })
  useEffect(() => {
    GetAllCartItem()
      .then((result: Cart) => setCart(result))
      .catch(() => toast.error("Could not load your order summary."))
      .finally(() => setLoading(false));
  }, []);



  async function handlePayment(value) {
   if(paymentMethod == 'cash'){

   }else{
     const res = await PaymentOrder(value, id)
    console.log(res);
    if (res.status == 'success') {
      window.open(res.session.url)
    }
   }
  }
  return (
    <main className="store-page checkout-page site-container">
      <nav className="store-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><ChevronRight size={15} /><Link href="/cart">Cart</Link><ChevronRight size={15} /><span aria-current="page">Checkout</span>
      </nav>
      <header className="store-page-heading checkout-heading">
        <span className="store-heading-icon"><PackageCheck size={28} /></span>
        <div><h1>Complete Your Order</h1><p>Review your items and complete your purchase</p></div>
      </header>

      {cart && cart.numOfCartItems === 0 && !loading ? (
        <section className="cart-empty checkout-empty"><PackageCheck size={42} /><h2>Your cart is empty</h2><p>Add items to your cart before checking out.</p><Link className="store-primary-button" href="/products">Continue Shopping</Link></section>
      ) : (
        <form className="checkout-layout" onSubmit={handleSubmit(handlePayment)}>
          <div className="checkout-main-column">
            <section className="checkout-section">
              <div className="checkout-section-heading"><span className="checkout-section-icon"><Home size={20} fill="currentColor" /></span><div><h2>Shipping Address</h2><p>Where should we deliver your order?</p></div></div>
              <div className="checkout-section-content">
                <div className="checkout-subheading"><MapPin size={17} /><h3>Saved Addresses</h3></div>
                <p className="checkout-help">Select a saved address or enter a new one below.</p>
                <div className="checkout-no-address"><span className="checkout-pin"><MapPin size={19} /></span><span><strong>No saved addresses yet</strong><small>Add your delivery details below or manage your addresses.</small></span><Link href="/profile/addresses">Manage addresses</Link></div>
                <div className="checkout-address-form">
                  <h3><Home size={16} /> Delivery details</h3>
                  <div className="checkout-fields">
                    <label>Phone Number<input {...register('phone')} name="phone" type="tel" autoComplete="tel" placeholder="01X XXX XXXX" required /></label>
                    <label className="checkout-field-wide">details<input {...register('details')} name="details" autoComplete="details" placeholder="Building, street, apartment" required /></label>
                    <label>City<input {...register('city')} name="city" autoComplete="address-level2" placeholder="City" required /></label>
                  </div>
                </div>
              </div>
            </section>

            <section className="checkout-section checkout-payment-section">
              <div className="checkout-section-heading"><span className="checkout-section-icon"><CreditCard size={20} /></span><div><h2>Payment Method</h2><p>Choose how you would like to pay</p></div></div>
              <div className="checkout-section-content checkout-payment-options">
                <label className={`checkout-payment-option ${paymentMethod === "cash" ? "is-selected" : ""}`}>
                  <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
                  <span className="checkout-payment-icon"><Banknote size={21} /></span><span className="checkout-payment-copy"><strong>Cash on Delivery</strong><small>Pay when your order arrives</small></span>{paymentMethod === "cash" && <Check className="checkout-payment-check" size={19} />}
                </label>
                <label className={`checkout-payment-option ${paymentMethod === "card" ? "is-selected" : ""}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  <span className="checkout-payment-icon"><CreditCard size={21} /></span><span className="checkout-payment-copy"><strong>Pay by Card</strong><small>Credit or debit card</small></span>{paymentMethod === "card" && <Check className="checkout-payment-check" size={19} />}
                </label>
                {paymentMethod === "card" && <div className="checkout-card-note"><LockKeyhole size={16} /> Card details will be collected securely on the next step.</div>}
              </div>
            </section>

            <div className="checkout-delivery-note"><Truck size={19} /><span><strong>Fast, careful delivery</strong><small>We’ll keep you updated as your order makes its way to you.</small></span></div>
          </div>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <p className="checkout-summary-count">{loading ? "Loading items…" : `${cart?.numOfCartItems ?? 0} items in your cart`}</p>
            <div className="checkout-summary-items">
              {(cart?.data?.products ?? []).map((item) => <div className="checkout-summary-item" key={item._id}>
                <div className="checkout-summary-image"><Image src={item.product.imageCover} alt={item.product.title} fill sizes="54px" /></div>
                <div className="checkout-summary-item-copy"><strong>{item.product.title}</strong><small>Qty: {item.count}</small></div><strong className="checkout-summary-price">{money(item.price * item.count)}</strong>
              </div>)}
              {!loading && !cart?.data?.products?.length && <Link href="/cart" className="checkout-back-cart">Your cart is empty — go to cart</Link>}
            </div>
            <div className="checkout-summary-totals"><div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{shipping === 0 ? "Free" : money(shipping)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div></div>
            <button className="store-primary-button checkout-place-order" type="submit" disabled={!cart?.numOfCartItems || loading}>Place Order <ChevronRight size={18} /></button>
            <div className="checkout-safe"><LockKeyhole size={15} /> Your information is safe and secure</div>
            <div className="checkout-secure-badge"><Check size={16} /> Safe &amp; secure checkout</div>
          </aside>
        </form>
      )}
    </main>
  );
}
