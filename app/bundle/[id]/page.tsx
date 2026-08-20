"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ChevronDown, Minus, Plus, Check } from "lucide-react";
import { bundles } from "@/components/site/bundle-card";
import { findProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

function Accordion({ title, open, onClick, children }: { title: string; open: boolean; onClick: () => void; children: React.ReactNode }) {
  return <div className="border-b border-white/10"><button type="button" onClick={onClick} aria-expanded={open} className="flex min-h-16 w-full items-center justify-between py-5 text-left font-display text-lg">{title}<ChevronDown className={`size-5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} /></button>{open && <div className="pb-6 text-sm leading-7 text-white/65">{children}</div>}</div>;
}

export default function BundleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const bundle = bundles.find((item) => item.id === use(params).id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [packaging, setPackaging] = useState<"only" | "gift">("only");
  const [oil, setOil] = useState("halo");
  const [open, setOpen] = useState("directions");
  const [added, setAdded] = useState(false);
  if (!bundle) return <div className="grid min-h-screen place-items-center bg-background text-foreground"><p>Bundle not found. <Link className="underline" href="/bundles">Back to bundles</Link></p></div>;
  const containsOil = bundle.products.includes("halo");
  const total = bundle.price + (packaging === "gift" ? 300 : 0);
  const oilNames = [{ id: "halo", name: "Halò" }, { id: "pearl", name: "Pearl" }, { id: "amalfi", name: "Amalfi" }, { id: "santorini", name: "Santorini" }];
  const addBundle = () => {
    const base = findProduct(bundle.products[0]);
    if (!base) return;
    add({ ...base, slug: `${bundle.id}-${packaging}-${oil}`, name: bundle.name, tagline: bundle.description, category: "BUNDLE", collection: "Mimi Sets", price: total, size: packaging === "gift" ? "Bundle · Gift Packaging" : "Bundle", image: bundle.image, hoverImage: bundle.image, gallery: [bundle.image], description: bundle.description }, qty, true, total, { giftPackaging: packaging === "gift" });
    setAdded(true); window.setTimeout(() => setAdded(false), 1800);
  };
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground"><div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pt-36"><Link href="/bundles" className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.28em] text-white/50 hover:text-white"><ArrowLeft className="size-4" /> Back to bundles</Link><main className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] lg:gap-20"><div className="contents lg:block"><h1 className="order-1 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[.92] lg:hidden">{bundle.name}</h1><div className="order-2 flex min-h-[52vh] items-center justify-center border border-gold/15 bg-black/20 p-5 sm:min-h-[620px] sm:p-12 lg:order-none"><img src={bundle.image} alt={bundle.name} className="max-h-[620px] w-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,.6)]" /></div><div className="order-3 lg:hidden"><BundleDetails open={open} setOpen={setOpen} /></div></div><section className="order-4 lg:order-none lg:pt-8"><p className="text-[10px] uppercase tracking-[.35em] text-gold">Mimi Sets · Curated ritual</p><h1 className="mt-5 hidden font-display text-[clamp(3rem,6vw,6rem)] leading-[.92] lg:block">{bundle.name}</h1><p className="mt-4 text-lg text-white/60">{bundle.description}</p><div className="mt-8 inline-flex items-baseline gap-5 border border-gold/40 bg-gold/5 px-5 py-4"><span className="font-display text-2xl">PKR {total.toLocaleString()}</span><span className="text-[11px] uppercase tracking-[.2em] text-white/50">Bundle</span></div><div className="mt-8 flex flex-col gap-4"><p className="text-[10px] uppercase tracking-[.25em] text-white/50">Set options</p><div className="flex gap-2"><button type="button" onClick={() => setPackaging("only")} className={`border px-4 py-3 text-xs uppercase tracking-[.15em] ${packaging === "only" ? "border-gold text-gold" : "border-white/15 text-white/60"}`}>Only set</button><button type="button" onClick={() => setPackaging("gift")} className={`border px-4 py-3 text-xs uppercase tracking-[.15em] ${packaging === "gift" ? "border-gold text-gold" : "border-white/15 text-white/60"}`}>Gift wrapping +300</button></div>{containsOil && <div className="flex flex-col gap-3"><p className="text-[10px] uppercase tracking-[.25em] text-white/50">Choose body oil</p><div className="grid grid-cols-2 gap-2">{oilNames.map((item) => <button type="button" key={item.id} onClick={() => setOil(item.id)} className={`border px-3 py-3 text-left text-sm ${oil === item.id ? "border-gold text-gold" : "border-white/15 text-white/70"}`}>{item.name}</button>)}</div></div>}</div><div className="mt-7 flex flex-wrap items-center gap-4"><div className="inline-flex h-12 items-center gap-5 border border-gold/40 px-4"><button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="size-4" /></button><span className="min-w-5 text-center text-sm">{qty}</span><button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)}><Plus className="size-4" /></button></div><button type="button" onClick={addBundle} className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-gold px-7 text-xs font-semibold uppercase tracking-[.2em] text-background sm:flex-none">{added ? <><Check className="size-4" /> Added</> : "Add to bag"}</button></div><div className="mt-10 hidden lg:block"><BundleDetails open={open} setOpen={setOpen} /></div></section></main></div></div>;
}

function BundleDetails({ open, setOpen }: { open: string; setOpen: (value: string) => void }) { return <div>{[["directions", "Directions", "Use each product in your set as directed on its individual product page."], ["ingredients", "Ingredients", "See the ingredient list on each product included in this curated set."], ["how", "How to use", "Build your ritual from the products included in your set, then enjoy the formulas in sequence."], ["details", "Bundle details", "A thoughtful Mimi Beauty edit designed to work beautifully together."]].map(([id, title, text]) => <Accordion key={id} title={title} open={open === id} onClick={() => setOpen(open === id ? "" : id)}><p>{text}</p></Accordion>)}</div>; }

