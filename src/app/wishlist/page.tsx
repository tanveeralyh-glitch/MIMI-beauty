"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";
import { useWishlist } from "@/lib/wishlist";

export default function WishlistPage() {
  const { items } = useWishlist();
  const list = products.filter((p) => items.includes(p.slug));

  return (
    <div className="mx-auto min-h-screen max-w-[1800px] px-6 pb-24 pt-28 lg:px-12 xl:px-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Saved</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">Wishlist</h1>
      {list.length === 0 ? (
        <p className="mt-8 text-white/60">
          Nothing saved yet.{" "}
          <Link href="/shop" className="text-gold underline">
            Browse products
          </Link>
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
