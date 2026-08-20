"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;
export const GIFT_PACKAGING_FEE = 300;

export type Bundle = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  products: string[];
  image: string;
};

const bundleTheme = {
  bg: "#121A15",
  accent: "#C9A86A",
  accentMuted: "rgba(201,168,106,0.15)",
  surface: "rgba(255,255,255,0.03)",
  glow: "rgba(201,168,106,0.06)",
};

export const bundles: Bundle[] = [
  {
    id: "bundle-1",
    name: "Luna Glow Duo",
    description: "Face and body, your daily glow.",
    price: 7650,
    originalPrice: 8500,
    discountPercent: 10,
    products: ["dew", "halo"],
    image: "/02_luna_glow_duo.PNG",
  },
  {
    id: "bundle-2",
    name: "Root to Radiance",
    description: "Nourish your roots. Shine through.",
    price: 7200,
    originalPrice: 8000,
    discountPercent: 10,
    products: ["veil", "herbe"],
    image: "/03_root_to_radiance.PNG",
  },
  {
    id: "bundle-3",
    name: "Radiant You",
    description: "For skin that glows and hair that flows.",
    price: 10350,
    originalPrice: 11500,
    discountPercent: 10,
    products: ["dew", "veil", "halo"],
    image: "/04_radiant_you.PNG",
  },
  {
    id: "bundle-4",
    name: "The Complete Glow",
    description: "All the essentials. All for you.",
    price: 14850,
    originalPrice: 16500,
    discountPercent: 10,
    products: ["dew", "veil", "herbe", "halo"],
    image: "/05_complete_glow.PNG",
  },
  {
    id: "bundle-5",
    name: "Halo Duo",
    description: "Double the glow, double the glow.",
    price: 9000,
    originalPrice: 10000,
    discountPercent: 10,
    products: ["halo"],
    image: "/06_halo_duo.PNG",
  },
  {
    id: "bundle-6",
    name: "Halo Quartet",
    description: "Four shades. Endless luminosity.",
    price: 18000,
    originalPrice: 20000,
    discountPercent: 10,
    products: ["halo"],
    image: "/07_halo_quartet.PNG",
  },
  {
    id: "bundle-7",
    name: "The Everything Set",
    description: "Seven essentials. One complete you.",
    price: 25200,
    originalPrice: 31500,
    discountPercent: 20,
    products: ["dew", "veil", "herbe", "halo"],
    image: "/08_everything_set.PNG",
  },
];

function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString()}`;
}

function toBundleProduct(bundle: Bundle, giftPackaging: boolean, totalPrice: number): Product {
  return {
    slug: giftPackaging ? `${bundle.id}-gift` : bundle.id,
    name: bundle.name,
    tagline: giftPackaging ? "Gift packaging included" : bundle.description,
    category: "BUNDLE",
    collection: "Mimi Sets",
    price: totalPrice,
    originalPrice: bundle.originalPrice,
    size: giftPackaging ? "Bundle · Gift Packaging" : "Bundle",
    image: bundle.image,
    hoverImage: bundle.image,
    rating: 5.0,
    reviews: 0,
    benefits: [],
    ingredients: [],
    directions: "",
    skinType: [],
    description: bundle.description,
    gallery: [bundle.image],
    theme: bundleTheme,
  };
}

export function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Link href={`/bundle/${bundle.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-gold/15 bg-[#121A15] text-center transition-all duration-300 hover:border-gold/45 hover:shadow-[0_18px_50px_-28px_rgba(201,168,106,0.45)]"
      >
        <div className="relative aspect-square overflow-hidden bg-[#0A100C]">
          <img
            src={bundle.image}
            alt={bundle.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-[#0A100C]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
            {bundle.discountPercent}% OFF
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
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
            <span
              className="text-[12px] text-[#D8D2C8]/55 line-through"
              style={{ fontFamily: "Montserrat" }}
            >
              {formatPkr(bundle.originalPrice)}
            </span>
            <span
              className="text-[15px] font-semibold tracking-wide text-[#F5F2EC]"
              style={{ fontFamily: "Montserrat" }}
            >
              {formatPkr(bundle.price)}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
