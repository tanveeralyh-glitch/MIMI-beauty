"use client";

import Link from "next/link";
import { use, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Heart, Minus, Plus, Share2, Check } from "lucide-react";
import { findProduct, products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/site/product-card";

function DetailAccordion({ title, open, onClick, children, accent }: { title: string; open: boolean; onClick: () => void; children: React.ReactNode; accent: string }) {
  return (
    <div className="border-b border-white/10">
      <button type="button" onClick={onClick} aria-expanded={open} className="flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left">
        <span className="font-display text-lg tracking-wide" style={{ color: open ? accent : "rgba(255,255,255,.9)" }}>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: .25 }}><ChevronDown className="size-5 text-white/50" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 text-sm leading-7 text-white/65 md:text-base">{children}</div></motion.div>}
      </AnimatePresence>
    </div>
  );
}

function Quantity({ qty, setQty, accent }: { qty: number; setQty: (value: number) => void; accent: string }) {
  return <div className="inline-flex h-12 items-center gap-5 border border-white/15 px-4" style={{ borderColor: `${accent}55` }}>
    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-8 place-items-center text-white/70 transition hover:text-white"><Minus className="size-4" /></button>
    <span className="min-w-5 text-center text-sm">{qty}</span>
    <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="grid size-8 place-items-center text-white/70 transition hover:text-white"><Plus className="size-4" /></button>
  </div>;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = findProduct(use(params).slug);
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState("directions");
  const [status, setStatus] = useState(false);

  if (!product) return <div className="grid min-h-screen place-items-center bg-background text-foreground"><p>Product not found. <Link className="underline" href="/shop">Back to shop</Link></p></div>;
  const { theme } = product;
  const saved = has(product.slug);
  const toggleAccordion = (name: string) => setOpen(open === name ? "" : name);
  const addToBag = () => { add(product, qty); setStatus(true); window.setTimeout(() => setStatus(false), 1800); };

  return <div className="min-h-screen overflow-x-hidden text-white" style={{ backgroundColor: theme.bg }}>
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pt-36">
      <Link href="/shop" className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.28em] text-white/50 transition hover:text-white"><ArrowLeft className="size-4" /> Back to shop</Link>
      <main className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] lg:items-start lg:gap-20">
        <div className="contents lg:block">
          <h1 className="order-1 font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[.92] tracking-tight lg:hidden">{product.name}</h1>
          <div className="order-2 lg:order-none">
            <div className="relative flex min-h-[52vh] items-center justify-center overflow-hidden border border-white/10 bg-black/20 p-5 sm:min-h-[620px] sm:p-12" style={{ boxShadow: `0 30px 90px ${theme.glow}` }}>
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${theme.glow}, transparent 68%)` }} />
              <img src={product.image} alt={product.name} className="relative z-10 max-h-[620px] w-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,.6)]" />
            </div>
            <div className="mt-5 grid grid-cols-4 gap-3">{product.gallery.slice(0, 4).map((image) => <div key={image} className="border border-white/10 bg-black/10 p-2"><img src={image} alt="" className="aspect-square w-full object-contain" /></div>)}</div>
          </div>
          <div className="order-3 lg:hidden">
            <ProductDetails product={product} open={open} toggle={toggleAccordion} accent={theme.accent} />
          </div>
        </div>

        <section className="order-4 lg:order-none lg:pt-8">
          <p className="text-[10px] uppercase tracking-[.35em]" style={{ color: theme.accent }}>{product.category} · {product.collection}</p>
          <h1 className="mt-5 hidden font-display text-[clamp(3rem,6vw,6rem)] leading-[.92] tracking-tight lg:block">{product.name}</h1>
          <p className="mt-4 text-lg text-white/60">{product.tagline}</p>
          <p className="mt-8 whitespace-pre-wrap text-base leading-7 text-white/70">{product.description}</p>
          <div className="mt-8 inline-flex items-baseline gap-5 border px-5 py-4" style={{ borderColor: `${theme.accent}66`, backgroundColor: theme.surface }}><span className="font-display text-2xl">Rs. {product.price.toLocaleString()}</span><span className="text-[11px] uppercase tracking-[.2em] text-white/50">{product.size}</span></div>
          <div className="mt-7 flex flex-wrap items-center gap-4"><Quantity qty={qty} setQty={setQty} accent={theme.accent} /><button type="button" onClick={addToBag} className="flex min-h-12 flex-1 items-center justify-center gap-2 px-7 text-xs font-semibold uppercase tracking-[.2em] transition hover:brightness-110 sm:flex-none" style={{ backgroundColor: theme.accent, color: theme.bg }}>{status ? <><Check className="size-4" /> Added</> : "Add to bag"}</button></div>
          <div className="mt-6 flex gap-7 text-[10px] uppercase tracking-[.2em] text-white/50"><button type="button" onClick={() => toggle(product.slug)} className="inline-flex items-center gap-2 hover:text-white"><Heart className="size-4" style={{ color: saved ? theme.accent : undefined, fill: saved ? theme.accent : "transparent" }} /> {saved ? "Saved" : "Wishlist"}</button><button type="button" onClick={() => navigator.share?.({ title: product.name, url: window.location.href })} className="inline-flex items-center gap-2 hover:text-white"><Share2 className="size-4" /> Share</button></div>
          <div className="mt-10 hidden lg:block"><ProductDetails product={product} open={open} toggle={toggleAccordion} accent={theme.accent} /></div>
        </section>
      </main>
    </div>
    <section className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-[10px] uppercase tracking-[.3em]" style={{ color: theme.accent }}>Explore more</p><h2 className="mt-4 font-display text-4xl">Complete your collection</h2><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.filter((item) => item.slug !== product.slug).slice(0, 4).map((item, index) => <ProductCard key={item.slug} product={item} index={index} />)}</div></div></section>
  </div>;
}

function ProductDetails({ product, open, toggle, accent }: { product: Product; open: string; toggle: (name: string) => void; accent: string }) {
  return <div>{[
    ["directions", "Directions", <p key="directions" className="whitespace-pre-wrap">{product.directions}</p>],
    ["ingredients", "Ingredients", <div key="ingredients" className="flex flex-wrap gap-2">{product.ingredients.map((item) => <span key={item} className="border border-white/10 px-3 py-2 text-xs text-white/70">{item}</span>)}</div>],
    ["how", "How to use", <p key="how">{product.directions}</p>],
    ["benefits", "Benefits", <ul key="benefits" className="flex flex-col gap-3">{product.benefits.map((item) => <li key={item}>— {item}</li>)}</ul>],
    ["storage", "Storage & caution", <p key="storage" className="whitespace-pre-wrap">{product.storageCaution}</p>],
  ].map(([id, title, content]) => <DetailAccordion key={id as string} title={title as string} open={open === id} onClick={() => toggle(id as string)} accent={accent}>{content}</DetailAccordion>)}</div>;
}

