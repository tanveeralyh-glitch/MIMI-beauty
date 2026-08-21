"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import {
  GIFT_PACKAGING_FEE,
  customSetBuilder,
  customSetDiscountAmount,
  customSetDiscountedProductsTotal,
  customSetLabel,
  customSetSubtotal,
  selectedEntries,
  toCustomSetProduct,
  totalSelectedQuantity,
  type QuantityMap,
} from "@/lib/sets";
import { SmartImage } from "@/components/site/smart-image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString()}`;
}

export default function BuildYourSetPage() {
  const router = useRouter();
  const { add } = useCart();
  const [quantities, setQuantities] = useState<QuantityMap>({});
  const [packaging, setPackaging] = useState<"only" | "gift">("only");

  const giftSelected = packaging === "gift";
  const totalUnits = totalSelectedQuantity(quantities);
  const productTotal = customSetSubtotal(quantities);
  const discountAmount = customSetDiscountAmount(productTotal);
  const discountedProducts = customSetDiscountedProductsTotal(quantities);
  const totalPrice = discountedProducts + (giftSelected ? GIFT_PACKAGING_FEE : 0);
  const summary = selectedEntries(quantities);
  const canCheckout = summary.length > 0;

  const changeQty = (slug: string, next: number) => {
    const qty = Math.max(0, next);
    setQuantities((prev) => {
      const nextMap = { ...prev };
      if (qty <= 0) delete nextMap[slug];
      else nextMap[slug] = qty;
      return nextMap;
    });
  };

  const addSet = (intent: "cart" | "buy") => {
    if (!canCheckout) return;
    const product = toCustomSetProduct(giftSelected, quantities);
    add(product, 1, true, totalPrice, {
      openCart: intent === "cart",
      giftPackaging: giftSelected,
      selectedOptions: summary.map(({ product: item, qty }) => `${item.slug}:${qty}`),
      selectedQuantities: { ...quantities },
    });
    if (intent === "buy") router.push("/checkout");
  };

  const headingCount = useMemo(() => {
    if (totalUnits === 0) return "0 PRODUCTS";
    return `${totalUnits} PRODUCT${totalUnits === 1 ? "" : "S"}`;
  }, [totalUnits]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 sm:px-8 lg:px-12">
        <Link
          href="/bundles"
          className="mb-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/50 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to sets
        </Link>

        <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Mimi’s Edit</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">Build Your Set</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
          Choose the essentials that make you feel most like yourself. Select any combination, then set a quantity for each product.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:gap-14">
          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                {products.length} products
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{headingCount}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {products.map((product) => {
                const qty = quantities[product.slug] ?? 0;
                const selected = qty > 0;

                return (
                  <div
                    key={product.slug}
                    className={`flex min-w-0 flex-col gap-3 rounded-sm border px-3 py-3 sm:px-4 sm:py-4 ${
                      selected ? "border-gold bg-gold/10" : "border-gold/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => changeQty(product.slug, qty > 0 ? 0 : 1)}
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-[#0A100C] sm:h-[4.5rem] sm:w-[4.5rem]">
                        <SmartImage src={product.image} alt={product.name} fill sizes="72px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="font-display block truncate text-sm tracking-wide text-[#F5F2EC]">
                          {product.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-[#D8D2C8]/80">
                          {product.tagline}
                        </span>
                        <span className="mt-1 block text-[12px] text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                          {formatPkr(product.price)}
                        </span>
                      </span>
                    </button>

                    <div className="flex h-11 w-full items-center justify-between border border-gold/40 px-2">
                      <button
                        type="button"
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => changeQty(product.slug, qty - 1)}
                        disabled={qty <= 0}
                        className="grid h-11 w-11 place-items-center text-[#F5F2EC] disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center text-sm text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => changeQty(product.slug, qty + 1)}
                        className="grid h-11 w-11 place-items-center text-[#F5F2EC]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="border border-gold/20 bg-[#0D1C14] p-5 sm:p-6 lg:sticky lg:top-28">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
              Your Set
            </p>

            {summary.length === 0 ? (
              <p className="mt-4 text-sm text-white/50">Select products and quantities to build your set.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {summary.map(({ product, qty }) => (
                  <li key={product.slug} className="flex items-center justify-between gap-3 text-sm text-[#F5F2EC]">
                    <span className="truncate">{product.name}</span>
                    <span className="shrink-0 text-white/70">× {qty}</span>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-gold">{headingCount}</p>

            <RadioGroup
              value={packaging}
              onValueChange={(value) => setPackaging(value as "only" | "gift")}
              className="mt-6 gap-3"
            >
              <Label
                htmlFor="custom-only"
                className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-4 transition-colors ${
                  packaging === "only" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem id="custom-only" value="only" className="border-gold text-gold" />
                  <div>
                    <p className="text-sm font-medium tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                      Only Set
                    </p>
                    <p className="mt-1 text-xs text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                      {formatPkr(discountedProducts)}
                    </p>
                  </div>
                </div>
              </Label>

              <Label
                htmlFor="custom-gift"
                className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-4 transition-colors ${
                  packaging === "gift" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem id="custom-gift" value="gift" className="border-gold text-gold" />
                  <div>
                    <p className="text-sm font-medium tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                      Gift Packaging
                    </p>
                    <p className="mt-1 text-xs text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                      + {formatPkr(GIFT_PACKAGING_FEE)}
                    </p>
                  </div>
                </div>
              </Label>
            </RadioGroup>

            <div className="mt-5 space-y-2 border-t border-gold/15 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                  Subtotal
                </span>
                <span className="text-sm text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                  {formatPkr(productTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-gold" style={{ fontFamily: "Montserrat" }}>
                  Build Your Set Discount — {customSetBuilder.discountPercent}%
                </span>
                <span className="text-sm text-gold" style={{ fontFamily: "Montserrat" }}>
                  − {formatPkr(discountAmount)}
                </span>
              </div>
              {giftSelected && (
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                    Gift Packaging
                  </span>
                  <span className="text-sm text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                    {formatPkr(GIFT_PACKAGING_FEE)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs uppercase tracking-[0.18em] text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                  Total
                </span>
                <span className="text-sm font-semibold text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                  {formatPkr(totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addSet("buy")}
              disabled={!canCheckout}
              className="mt-4 w-full border border-[#F5F2EC]/80 bg-transparent px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F5F2EC] transition-all duration-300 hover:bg-[#F5F2EC] hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
              style={{ fontFamily: "Montserrat", fontWeight: "500" }}
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => addSet("cart")}
              disabled={!canCheckout}
              className="mt-2 w-full border border-gold bg-gold px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
              style={{ fontFamily: "Montserrat", fontWeight: "500" }}
            >
              Add to Cart
            </button>
            {!canCheckout && (
              <p className="mt-3 text-center text-[11px] text-white/40">Select at least one product to continue.</p>
            )}
            <p className="sr-only">{customSetLabel(quantities)}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
