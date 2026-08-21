"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { SmartImage } from "./smart-image";

export function ProductCard({
  product,
  index = 0,
  variant = "compact",
}: {
  product: Product;
  index?: number;
  variant?: "compact" | "shop";
}) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = has(product.slug);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.slug);
  };

  if (variant === "shop") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
        className="group relative min-w-0"
      >
        <Link href={`/product/${product.slug}`} className="flex flex-col text-left">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] bg-[#1a1a1a]">
            <SmartImage
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 4}
              className="object-cover object-center transition-transform duration-[450ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md ${
                  wishlisted
                    ? "bg-[oklch(0.55_0.22_15)] text-white"
                    : "bg-white/70 text-neutral-700"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md ${
                  justAdded ? "bg-[oklch(0.55_0.16_145)] text-white" : "bg-white/70 text-neutral-700"
                }`}
                aria-label="Add to cart"
              >
                {justAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <span className="mt-5 block h-px w-8 bg-gold/70" />

          <h3
            className="mt-3 font-display text-[28px] uppercase leading-none tracking-tight text-white sm:text-[30px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.name}
          </h3>

          <p className="mt-2 text-[13px] font-light leading-snug text-white/80">{product.tagline}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[14px] text-gold">Rs. {product.price.toLocaleString()}</span>
            <span className="flex items-center gap-1 text-[14px] text-gold">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={0} />
              {product.rating?.toFixed(1) || "5.0"}
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative min-w-0 rounded-[24px] border border-transparent transition-all duration-[500ms] ease-out hover:-translate-y-2 hover:border-gold/40 hover:bg-white/5 hover:shadow-[0_0_50px_rgba(201,168,106,0.15)]"
    >
      <Link href={`/product/${product.slug}`} className="flex flex-col p-4">
        <p className="order-2 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80 md:order-2 md:mt-6 md:block">
          {product.category}
        </p>

        <h3
          className="order-1 font-display text-[28px] leading-none text-[#F5F2EC] break-words md:order-3 md:mt-1 sm:text-[34px]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {product.name}
        </h3>

        <div className="relative order-2 mt-4 aspect-[4/5] overflow-hidden rounded-xl bg-[#F3EBDC] md:order-1 md:mt-0">
          <SmartImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={index < 2}
            className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.05]"
          />

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleToggleWishlist}
              className={`flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full backdrop-blur-md transition-colors duration-200 ${
                wishlisted
                  ? "bg-[oklch(0.55_0.22_15)] text-white shadow-lg shadow-[oklch(0.55_0.22_15/0.3)]"
                  : "bg-white/70 text-neutral-700 hover:bg-white hover:text-[oklch(0.55_0.22_15)]"
              }`}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleAddToCart}
              className={`flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 ${
                justAdded
                  ? "bg-[oklch(0.55_0.16_145)] text-white shadow-lg shadow-[oklch(0.55_0.16_145/0.3)]"
                  : "bg-white/70 text-neutral-700 hover:bg-white hover:text-gold"
              }`}
              aria-label="Add to cart"
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="bag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <p className="order-3 mt-3 text-[17px] text-[#A3A3A3] md:order-4 md:mt-1">{product.tagline}</p>

        <div className="order-4 mt-5 flex items-center justify-between border-t border-white/10 pt-4 md:order-5">
          <span className="text-[16px] font-semibold text-gold">Rs. {product.price.toLocaleString()}</span>
          <div className="hidden items-center gap-1.5 text-[14px] text-white md:flex">
            <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />{" "}
            {product.rating?.toFixed(1) || "5.0"}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
