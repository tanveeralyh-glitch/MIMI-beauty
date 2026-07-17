import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
          />
          <img
            src={product.hoverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <button
            aria-label="Wishlist"
            onClick={(e) => { e.preventDefault(); }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80 opacity-0 backdrop-blur transition group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); add(product); }}
            className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center justify-center gap-2 rounded-full bg-background/95 py-3 text-xs font-medium uppercase tracking-[0.2em] opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to bag
          </button>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
            <h3 className="mt-1 truncate font-display text-xl">{product.name}</h3>
            <p className="mt-1 truncate text-xs text-muted-foreground">{product.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">${product.price}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3 w-3 fill-gold text-gold" /> {product.rating}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
