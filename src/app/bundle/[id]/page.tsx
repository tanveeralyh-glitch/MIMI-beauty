"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ChevronDown, Minus, Plus, Check } from "lucide-react";
import { bundles, GIFT_PACKAGING_FEE, defaultSelectedSlugs, selectionMax, showsBodyOilSelector, toBundleProduct, toggleUnique } from "@/lib/sets";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/site/smart-image";
import { SetProductOptions } from "@/components/site/set-options";

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
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="flex min-h-16 w-full items-center justify-between py-5 text-left font-display text-lg uppercase tracking-[0.08em]"
      >
        {title}
        <ChevronDown className={`size-5 shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-6 text-sm leading-7 text-white/65">{children}</div>}
    </div>
  );
}

export default function BundleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const bundle = bundles.find((item) => item.id === use(params).id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [packaging, setPackaging] = useState<"only" | "gift">("only");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() =>
    bundle ? defaultSelectedSlugs(bundle) : [],
  );
  const [open, setOpen] = useState("");
  const [added, setAdded] = useState(false);

  if (!bundle) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <p>
          Set not found.{" "}
          <Link className="underline" href="/bundles">
            Back to sets
          </Link>
        </p>
      </div>
    );
  }

  const needsOilChoice = showsBodyOilSelector(bundle);
  const maxSelections = selectionMax(bundle);
  const selectionReady = needsOilChoice
    ? selectedSlugs.length === bundle.bodyOilSlots
    : selectedSlugs.length > 0;
  const total = bundle.price + (packaging === "gift" ? GIFT_PACKAGING_FEE : 0);

  const addBundle = () => {
    if (!selectionReady) return;
    const product = toBundleProduct(bundle, packaging === "gift", total, selectedSlugs);
    add(product, qty, true, total, {
      giftPackaging: packaging === "gift",
      selectedOptions: selectedSlugs,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <Link
          href="/bundles"
          className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.28em] text-white/50 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to sets
        </Link>

        <main className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] lg:gap-20">
          <div className="contents lg:block">
            <h1 className="order-1 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[.92] lg:hidden">
              {bundle.name}
            </h1>

            <div className="relative order-2 min-h-[52vh] border border-gold/15 bg-black/20 p-5 sm:min-h-[620px] sm:p-12 lg:order-none">
              <SmartImage
                src={bundle.image}
                alt={bundle.name}
                width={900}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="mx-auto h-auto max-h-[620px] w-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,.6)]"
              />
            </div>

            <div className="order-3 lg:hidden">
              <BundleDetails open={open} setOpen={setOpen} />
            </div>
          </div>

          <section className="order-4 min-w-0 lg:order-none lg:pt-8">
            <p className="text-[10px] uppercase tracking-[.35em] text-gold">Mimi Sets · Curated ritual</p>
            <h1 className="mt-5 hidden font-display text-[clamp(3rem,6vw,6rem)] leading-[.92] lg:block">
              {bundle.name}
            </h1>
            <p className="mt-4 text-lg text-white/60">{bundle.description}</p>

            <div className="mt-8 inline-flex items-baseline gap-5 border border-gold/40 bg-gold/5 px-5 py-4">
              <span className="font-display text-2xl">PKR {total.toLocaleString()}</span>
              <span className="text-[11px] uppercase tracking-[.2em] text-white/50">Set</span>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-[.25em] text-white/50">Set options</p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPackaging("only")}
                  className={`border px-4 py-3 text-xs uppercase tracking-[.15em] ${
                    packaging === "only" ? "border-gold text-gold" : "border-white/15 text-white/60"
                  }`}
                >
                  Only set
                </button>
                <button
                  type="button"
                  onClick={() => setPackaging("gift")}
                  className={`border px-4 py-3 text-xs uppercase tracking-[.15em] ${
                    packaging === "gift" ? "border-gold text-gold" : "border-white/15 text-white/60"
                  }`}
                >
                  Gift wrapping +300
                </button>
              </div>

              <SetProductOptions
                bundle={bundle}
                selectedSlugs={selectedSlugs}
                onToggle={(slug) => setSelectedSlugs((prev) => toggleUnique(prev, slug, maxSelections))}
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="inline-flex h-12 items-center gap-5 border border-gold/40 px-4">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="size-4" />
                </button>
                <span className="min-w-5 text-center text-sm">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={addBundle}
                disabled={!selectionReady}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-gold px-7 text-xs font-semibold uppercase tracking-[.2em] text-background disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                {added ? (
                  <>
                    <Check className="size-4" /> Added
                  </>
                ) : needsOilChoice && !selectionReady ? (
                  `Select ${bundle.bodyOilSlots} oils`
                ) : (
                  "Add to bag"
                )}
              </button>
            </div>

            <div className="mt-10 hidden lg:block">
              <BundleDetails open={open} setOpen={setOpen} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function BundleDetails({ open, setOpen }: { open: string; setOpen: (value: string) => void }) {
  return (
    <div>
      {(
        [
          ["directions", "Directions", "Use each product in your set as directed on its individual product page."],
          ["ingredients", "INGREDIENTS", "See the ingredient list on each product included in this curated set."],
          ["details", "Set details", "A thoughtful Mimi Beauty edit designed to work beautifully together."],
        ] as const
      ).map(([id, title, text]) => (
        <Accordion
          key={id}
          title={title}
          open={open === id}
          onClick={() => setOpen(open === id ? "" : id)}
        >
          <p>{text}</p>
        </Accordion>
      ))}
    </div>
  );
}
