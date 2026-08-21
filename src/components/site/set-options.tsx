"use client";

import { bodyOilProducts, includedProducts, selectionMax, showsBodyOilSelector, showsProductOptions, type Bundle } from "@/lib/sets";
import type { Product } from "@/lib/products";
import { SmartImage } from "@/components/site/smart-image";

function OptionTile({
  product,
  selected,
  onClick,
  disabled,
}: {
  product: Product;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex w-full min-w-0 items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-colors ${
        selected ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
      } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
    >
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-[#0A100C]">
        <SmartImage src={product.image} alt={product.name} fill sizes="48px" className="object-cover" />
      </span>
      <span className="min-w-0">
        <span className="font-display block truncate text-sm tracking-wide text-[#F5F2EC]">
          {product.name}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-[#D8D2C8]/80">
          {product.tagline}
        </span>
      </span>
    </button>
  );
}

export function SetProductOptions({
  bundle,
  selectedSlugs,
  onToggle,
}: {
  bundle: Bundle;
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
}) {
  const oilMode = showsBodyOilSelector(bundle);
  const options = oilMode ? bodyOilProducts() : includedProducts(bundle);
  const max = selectionMax(bundle);
  const exclusive = !oilMode && max <= 1;

  if (!showsProductOptions(bundle) || options.length === 0) return null;

  return (
    <div className="mt-6">
      <p
        className={`${oilMode ? "mb-1" : "mb-3"} text-[11px] font-normal uppercase tracking-[0.2em] text-[#D8D2C8]`}
      >
        {oilMode ? "Choose Your Body Oil" : options.length === 1 ? "Included product" : `${options.length} Products in This Set`}
      </p>
      {oilMode && (
        <p className="mb-3 text-[12px] text-[#D8D2C8]/80">
          Select {max} unique body oils
          {selectedSlugs.length > 0 ? ` · ${selectedSlugs.length}/${max}` : ""}
        </p>
      )}
      <div className="hide-scrollbar grid max-h-[min(50vh,20rem)] grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden sm:grid-cols-2">
        {options.map((product) => {
          const selected = selectedSlugs.includes(product.slug);
          const atMax = selectedSlugs.length >= max;
          return (
            <OptionTile
              key={product.slug}
              product={product}
              selected={selected}
              disabled={!selected && atMax && !exclusive}
              onClick={() => onToggle(product.slug)}
            />
          );
        })}
      </div>
    </div>
  );
}
