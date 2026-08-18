"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { products, assets } from "@/lib/products";
import { ShoppingBag, Star } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Exact bundle data from reference
const bundles = [
  {
    id: "bundle-1",
    name: "Luna Glow Duo",
    description: "Face and body, your daily glow.",
    price: 16950,
    products: ["dew", "halo"],
    image: "/02_luna_glow_duo.jpg",
  },
  {
    id: "bundle-2",
    name: "Root to Radiance",
    description: "Nourish your roots. Shine through.",
    price: 15950,
    products: ["veil", "herbe"],
    image: "/03_root_to_radiance.jpg",
  },
  {
    id: "bundle-3",
    name: "Radiant You",
    description: "For skin that glows and hair that flows.",
    price: 20950,
    products: ["dew", "veil", "halo"],
    image: "/04_radiant_you.jpg",
  },
  {
    id: "bundle-4",
    name: "The Complete Glow",
    description: "All the essentials. All for you.",
    price: 27950,
    products: ["dew", "veil", "herbe", "halo"],
    image: "/05_complete_glow.jpg",
  },
  {
    id: "bundle-5",
    name: "Halò Duo",
    description: "Double the glow, double the glow.",
    price: 16950,
    products: ["halo"],
    image: "/06_halo_duo.jpg",
  },
  {
    id: "bundle-6",
    name: "Halò Quartet",
    description: "Four shades. Endless luminosity.",
    price: 27950,
    products: ["halo"],
    image: "/07_halo_quartet.jpg",
  },
  {
    id: "bundle-7",
    name: "The Everything Set",
    description: "Seven essentials. One complete you.",
    price: 36950,
    products: ["dew", "veil", "herbe", "halo"],
    image: "/08_everything_set.jpg",
  },
];

function BundleCard({ bundle }: { bundle: typeof bundles[0] }) {
  const { add } = useCart();

  const handleAddToBag = () => {
    // Create a product-like object for the bundle
    const bundleProduct = {
      slug: bundle.id,
      name: bundle.name,
      tagline: bundle.description,
      category: "BUNDLE",
      collection: "Mimi Sets",
      price: bundle.price,
      originalPrice: bundle.price,
      size: "Bundle",
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
      theme: {
        bg: "#121A15",
        accent: "#C9A86A",
        accentMuted: "rgba(201,168,106,0.15)",
        surface: "rgba(255,255,255,0.03)",
        glow: "rgba(201,168,106,0.06)",
      },
    };
    
    // Add the bundle as a single item with its bundle price
    add(bundleProduct as any, 1, true, bundle.price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="group flex flex-col bg-[#121A15] border border-gold/20 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gold/50"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0A100C]">
        <img
          src={bundle.image}
          alt={bundle.name}
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5 flex-1">
        <h3 className="text-xl text-[#F5F2EC] mb-2" style={{ fontFamily: "Cinzel", fontWeight: "500" }}>
          {bundle.name}
        </h3>
        <p className="text-sm text-[#D8D2C8] mb-4 leading-relaxed" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
          {bundle.description}
        </p>

        {/* Price */}
        <div className="mt-auto mb-4">
          <span className="text-lg font-medium text-[#F5F2EC]" style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
            PKR {bundle.price.toLocaleString()}
          </span>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={handleAddToBag}
          className="w-full border border-gold bg-transparent px-4 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-background"
          style={{ fontFamily: "Montserrat", fontWeight: "500" }}
        >
          ADD TO BAG
        </button>
      </div>
    </motion.div>
  );
}

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Back to Home Button */}
      <div className="mx-auto max-w-[1400px] px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section - Mimi Sets */}
      <section className="relative overflow-hidden bg-background">
        <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-[#F5F2EC] mb-8" style={{ fontFamily: "Cinzel", fontWeight: "500", fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: "0.9" }}>
                Mimi Sets
              </h1>
              <p className="text-xl md:text-2xl text-[#D8D2C8] mb-6 leading-relaxed max-w-lg" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
                Curated combinations for your skin, hair, and body.
              </p>
              <p className="text-lg text-[#D8D2C8] mb-10 leading-relaxed max-w-md" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
                Thoughtfully paired. Effortlessly essential.<br />
                Everything you need, in harmony.
              </p>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-3 border-2 border-gold bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-background"
              >
                SHOP SETS
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Right - Product Composition */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-square bg-[#0A100C] rounded-lg overflow-hidden">
                <img
                  src="/01_hero_mimi_sets.jpg.png"
                  alt="Mimi Beauty Products"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Bundles Section */}
      <section id="bundles" className="relative py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <h2 className="text-[#F5F2EC] mb-3" style={{ fontFamily: "Cinzel", fontWeight: "500", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: "0.95" }}>
              Our Bundles
            </h2>
            <p className="text-lg md:text-xl text-[#D8D2C8] mb-6" style={{ fontFamily: "Montserrat", fontWeight: "400" }}>
              Care, simplified. Results, amplified.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-[#C9A86A]/50" />
              <Star className="h-4 w-4 text-[#C9A86A] fill-[#C9A86A]" />
              <div className="h-px w-12 bg-[#C9A86A]/50" />
            </div>
          </motion.div>

          {/* Bundle Cards Grid - 4 per row desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* Make Your Own Bundle CTA */}
      <section className="px-6 pb-16 md:pb-24" aria-labelledby="custom-bundle-title">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="relative min-h-[400px] overflow-hidden bg-[#EDE6DA] bg-cover bg-center bg-no-repeat md:min-h-[500px]"
            style={{
              backgroundImage:
                "url(/make-your-own-bundle-bg.png)",
            }}
          >
            <div className="flex min-h-[400px] items-center justify-end px-8 py-12 sm:px-16 md:min-h-[500px] md:px-24 md:py-16">
              <div className="max-w-md text-center text-[#2C2C2C] sm:text-left">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8A755B]">
                  Your ritual, your way
                </p>
                <h2
                  id="custom-bundle-title"
                  className="text-3xl leading-tight sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "Cinzel", fontWeight: "500" }}
                >
                  MIMI's Edits
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#5C5C5C]" style={{ fontFamily: "Montserrat" }}>
                  Choose the essentials that make you feel most like yourself.
                </p>
                <Link
                  href="/shop"
                  className="mt-5 inline-flex border border-[#2C2C2C] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2C2C2C] transition-colors hover:bg-[#2C2C2C] hover:text-[#FAF8F3]"
                >
                  Build your bundle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

