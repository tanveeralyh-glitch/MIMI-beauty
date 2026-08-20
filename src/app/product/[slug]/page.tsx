"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { findProduct, products } from "@/lib/products";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  Share2,
  Check,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/site/product-card";
import { SmartImage } from "@/components/site/smart-image";

function Accordion({
  title,
  open,
  onClick,
  children,
}: {
  title: string;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="flex min-h-16 w-full items-center justify-between py-5 text-left font-display text-[15px] uppercase tracking-[0.14em] text-white sm:text-lg"
      >
        {title}
        <ChevronDown className={`h-4 w-4 shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-6 text-[14px] leading-relaxed text-white/75">{children}</div>}
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = findProduct(slug);
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [open, setOpen] = useState("");
  const [shareNote, setShareNote] = useState(false);

  if (!product) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-background text-foreground">
        <p>
          Product not found.{" "}
          <Link href="/shop" className="text-gold underline">
            Back to shop
          </Link>
        </p>
      </div>
    );
  }

  const wishlisted = has(product.slug);
  const related = products.filter((p) => p.slug !== product.slug);
  const mainImage = product.image;

  const handleAddToCart = () => {
    add(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleBuyNow = () => {
    add(product, qty, false, undefined, { openCart: false });
    router.push("/checkout");
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShareNote(true);
        setTimeout(() => setShareNote(false), 1500);
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="min-w-0">
            <Link
              href="/shop"
              className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55 transition hover:text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              Back to Shop
            </Link>

            <h1 className="font-display text-[clamp(2.4rem,8vw,3.4rem)] uppercase leading-none tracking-tight text-white lg:hidden">
              {product.name}
            </h1>
            <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-white/55 lg:hidden">
              {product.collection} — Collection
            </p>

            <div className="relative mt-5 overflow-hidden rounded-2xl bg-[#C4B49A] lg:mt-0">
              <div className="relative aspect-[4/3] w-full sm:aspect-[3/2]">
                <SmartImage
                  src={mainImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:pt-10">
            <h1 className="hidden font-display text-[clamp(2.8rem,5vw,4.2rem)] uppercase leading-none tracking-tight text-white lg:block">
              {product.name}
            </h1>
            <p className="mt-3 hidden text-[11px] uppercase tracking-[0.28em] text-white/55 lg:block">
              {product.collection} — Collection
            </p>

            <p className="mt-5 text-lg font-medium text-white sm:text-xl">{product.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/80 sm:text-base">
              {product.description}
            </p>

            <div className="mt-10 border-t border-white/15">
              <Accordion
                title="STORAGE & CAUTION"
                open={open === "storage"}
                onClick={() => setOpen(open === "storage" ? "" : "storage")}
              >
                <p className="whitespace-pre-line">
                  {product.storageCaution || "Store in a cool, dry place. For external use only. Avoid direct eye contact."}
                </p>
              </Accordion>
              <Accordion
                title="INGREDIENTS"
                open={open === "ingredients"}
                onClick={() => setOpen(open === "ingredients" ? "" : "ingredients")}
              >
                <ul className="space-y-2">
                  {product.ingredients.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                  Clean · Vegan · Cruelty-Free
                </p>
              </Accordion>
              <Accordion
                title="DIRECTIONS"
                open={open === "directions"}
                onClick={() => setOpen(open === "directions" ? "" : "directions")}
              >
                <p>{product.directions}</p>
              </Accordion>
              <Accordion
                title="BENEFITS"
                open={open === "benefits"}
                onClick={() => setOpen(open === "benefits" ? "" : "benefits")}
              >
                <ul className="space-y-2">
                  {product.benefits.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>

            {product.category === "BODY" && (
              <div className="mt-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                  Choose Your Body Oil
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {products
                    .filter((p) => p.category === "BODY")
                    .map((oil) => (
                      <button
                        type="button"
                        key={oil.slug}
                        onClick={() => {
                          if (oil.slug !== product.slug) router.push(`/product/${oil.slug}`);
                        }}
                        className={`border px-3 py-3 text-left text-sm ${
                          oil.slug === product.slug ? "border-gold text-gold" : "border-white/15 text-white/70"
                        }`}
                      >
                        {oil.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex h-12 w-full items-center justify-between rounded-full border border-white/15 bg-white/[0.04] px-6">
              <span className="text-[15px] font-semibold text-white">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="h-5 w-px bg-white/20" />
              <span className="text-[12px] uppercase tracking-[0.18em] text-white/70">
                {product.size}
              </span>
            </div>

            <div className="mt-4 flex h-12 w-full items-center justify-between rounded-full border border-white/15 bg-white/[0.04] px-5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="grid size-8 place-items-center text-white/80"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((n) => n + 1)}
                className="grid size-8 place-items-center text-white/80"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                justAdded
                  ? "bg-[oklch(0.55_0.16_145)] text-white"
                  : "bg-gold text-[#050505] hover:brightness-110"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-full border border-[#F5F2EC]/80 bg-transparent px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#F5F2EC] hover:text-background"
            >
              Buy Now
            </button>

            <div className="mt-6 flex gap-8 text-[10px] uppercase tracking-[0.22em] text-white/50">
              <button
                type="button"
                onClick={() => toggle(product.slug)}
                className={`inline-flex items-center gap-2 ${wishlisted ? "text-gold" : "hover:text-white"}`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-gold" : ""}`} />
                {wishlisted ? "Saved" : "Add to Wishlist"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Share2 className="h-4 w-4" />
                {shareNote ? "Copied" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Explore</p>
              <h2 className="mt-2 font-display text-3xl">Complete your collection</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white">
              View Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
