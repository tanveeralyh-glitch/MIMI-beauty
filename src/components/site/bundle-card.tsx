"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import {
  GIFT_PACKAGING_FEE,
  bundles,
  defaultSelectedSlugs,
  selectionMax,
  showsBodyOilSelector,
  toBundleProduct,
  toggleUnique,
  type Bundle,
} from "@/lib/sets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SetProductOptions } from "@/components/site/set-options";
import { SmartImage } from "@/components/site/smart-image";

export { bundles, GIFT_PACKAGING_FEE };
export type { Bundle };

const ease = [0.22, 1, 0.36, 1] as const;

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString()}`;
}

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const { add } = useCart();
  const router = useRouter();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [intent, setIntent] = useState<"cart" | "buy">("cart");
  const [packaging, setPackaging] = useState<"only" | "gift">("only");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const giftSelected = packaging === "gift";
  const totalPrice = bundle.price + (giftSelected ? GIFT_PACKAGING_FEE : 0);
  const needsOilChoice = showsBodyOilSelector(bundle);
  const maxSelections = selectionMax(bundle);
  const selectionReady = needsOilChoice
    ? selectedSlugs.length === bundle.bodyOilSlots
    : selectedSlugs.length > 0 && selectedSlugs.length <= maxSelections;

  const openPicker = (nextIntent: "cart" | "buy") => {
    setIntent(nextIntent);
    setPackaging("only");
    setSelectedSlugs(defaultSelectedSlugs(bundle));
    setPickerOpen(true);
  };

  const handleConfirm = () => {
    if (!selectionReady) return;
    setPickerOpen(false);

    const product = toBundleProduct(bundle, giftSelected, totalPrice, selectedSlugs);
    add(product, 1, true, totalPrice, {
      openCart: intent === "cart",
      giftPackaging: giftSelected,
      selectedOptions: selectedSlugs,
    });

    if (intent === "buy") router.push("/checkout");
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-gold/15 bg-[#121A15] text-center transition-all duration-300 hover:border-gold/45 hover:shadow-[0_18px_50px_-28px_rgba(201,168,106,0.45)]"
      >
        <Link href={`/bundle/${bundle.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-[#0A100C]">
            <SmartImage
              src={bundle.image}
              alt={bundle.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-[#0A100C]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
              {bundle.discountPercent}% OFF
            </span>
          </div>

          <div className="px-5 pt-6">
            <h3
              className="text-[1.35rem] leading-tight tracking-wide text-[#F5F2EC]"
              style={{ fontFamily: "Cinzel", fontWeight: "500" }}
            >
              {bundle.name}
            </h3>
            <p
              className="mx-auto mt-3 max-w-[16rem] text-[13px] leading-relaxed text-[#D8D2C8]/85"
              style={{ fontFamily: "Montserrat", fontWeight: "400" }}
            >
              {bundle.description}
            </p>

            <div className="mt-5 mb-6 flex flex-col items-center gap-1.5">
              <span className="text-[12px] text-[#D8D2C8]/55 line-through" style={{ fontFamily: "Montserrat" }}>
                {formatPkr(bundle.originalPrice)}
              </span>
              <span className="text-[15px] font-semibold tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                {formatPkr(bundle.price)}
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-auto flex flex-col gap-2.5 px-5 pb-6">
          <button
            type="button"
            onClick={() => openPicker("buy")}
            className="w-full border border-[#F5F2EC]/80 bg-transparent px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F5F2EC] transition-all duration-300 hover:bg-[#F5F2EC] hover:text-background"
            style={{ fontFamily: "Montserrat", fontWeight: "500" }}
          >
            BUY NOW
          </button>
          <button
            type="button"
            onClick={() => openPicker("cart")}
            className="w-full border border-gold bg-transparent px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-background"
            style={{ fontFamily: "Montserrat", fontWeight: "500" }}
          >
            ADD TO CART
          </button>
        </div>
      </motion.article>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="hide-scrollbar max-h-[90vh] overflow-y-auto max-w-md border-gold/20 bg-[#0D1C14] text-[#F5F2EC] sm:rounded-sm">
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="font-display text-2xl tracking-wide" style={{ fontFamily: "Cinzel" }}>
              {bundle.name}
            </DialogTitle>
            <DialogDescription className="text-[#D8D2C8]">
              Choose how you'd like to receive your set.
            </DialogDescription>
          </DialogHeader>

          <RadioGroup
            value={packaging}
            onValueChange={(value) => setPackaging(value as "only" | "gift")}
            className="mt-2 gap-3"
          >
            <Label
              htmlFor={`${bundle.id}-only`}
              className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-4 transition-colors ${
                packaging === "only" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem id={`${bundle.id}-only`} value="only" className="border-gold text-gold" />
                <div>
                  <p className="text-sm font-medium tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                    Only Set
                  </p>
                  <p className="mt-1 text-xs text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                    {formatPkr(bundle.price)}
                  </p>
                </div>
              </div>
            </Label>

            <Label
              htmlFor={`${bundle.id}-gift`}
              className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-4 transition-colors ${
                packaging === "gift" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem id={`${bundle.id}-gift`} value="gift" className="border-gold text-gold" />
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

          <SetProductOptions
            bundle={bundle}
            selectedSlugs={selectedSlugs}
            onToggle={(slug) => setSelectedSlugs((prev) => toggleUnique(prev, slug, maxSelections))}
          />

          <div className="mt-2 flex items-center justify-between border-t border-gold/15 pt-4">
            <span className="text-xs uppercase tracking-[0.18em] text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
              Total
            </span>
            <span className="text-sm font-semibold text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
              {formatPkr(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectionReady}
            className="mt-1 w-full border border-gold bg-gold px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
            style={{ fontFamily: "Montserrat", fontWeight: "500" }}
          >
            {needsOilChoice && !selectionReady
              ? `Select ${bundle.bodyOilSlots} body oils`
              : intent === "buy"
                ? "BUY NOW"
                : "ADD TO CART"}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
