
import { ProductCard, type product } from "@/components/product/product-card";

import Main from "@/components/main/Main";
import { HandleGetProduct } from "@/services/Api.servcies";
import { getServerSession } from "next-auth";
import { getMyToken } from "@/lib/getMyToken";



export default async function HomePage() {
  const productList = await HandleGetProduct()

//  const data = await getServerSession()

//  console.log(data);
 
  return (
    <main>

      <Main />
      <section className="site-container home-section popular-section">
        {/* <div className="section-heading">
          <div><span className="eyebrow">{t("productEyebrow")}</span><h2>{t("popularProducts")}</h2></div>
          <Link href="/products" className="text-link">{t("shopAllProducts")} <ArrowRight size={16} /></Link>
        </div> */}
        <div className="product-grid">

            {productList.map((product) => {
              return <ProductCard key={product._id || product.id} product={product} />
            })}
 
        </div>
      </section>
    </main>
  );
}
