"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, User, ShoppingBag, X, Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { Product } from "@/lib/products";

const bundles = [
  {
    id: 1,
    name: "Luna Glow Duo",
    description: "Face and body, your daily glow.",
    price: "PKR 14,950",
    image: "/02_luna_glow_duo.jpg",
  },
  {
    id: 2,
    name: "Root to Radiance",
    description: "Nourish your roots. Shine through.",
    price: "PKR 15,950",
    image: "/03_root_to_radiance.jpg",
  },
  {
    id: 3,
    name: "Radiant You",
    description: "The trio that glows and lasts all day.",
    price: "PKR 20,950",
    image: "/04_radiant_you.jpg",
  },
  {
    id: 4,
    name: "The Complete Glow",
    description: "All the essentials. All for you.",
    price: "PKR 27,950",
    image: "/05_complete_glow.jpg",
  },
  {
    id: 5,
    name: "Halo Duo",
    description: "Double the glass, double the glow.",
    price: "PKR 18,950",
    image: "/06_halo_duo.jpg",
  },
  {
    id: 6,
    name: "Halo Quartet",
    description: "Four shades. Endless luminosity.",
    price: "PKR 21,950",
    image: "/07_halo_quartet.jpg",
  },
  {
    id: 7,
    name: "The Everything Set",
    description: "Every essential. One complete glow.",
    price: "PKR 34,950",
    image: "/08_everything_set.jpg",
  },
  {
    id: 8,
    name: "Mimi's Edit",
    description: "A handpicked edit to share, gift or keep.",
    price: "PKR 42,950",
    image: "/09_mimis_edit.jpg",
  },
];

function BundleCard({ bundle }: { bundle: typeof bundles[0] }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const slug = `bundle-${bundle.id}`;
  const isWishlisted = has(slug);

  const priceNum = parseInt(bundle.price.replace(/[^\d]/g, ""), 10);

  const productObj = {
    slug,
    name: bundle.name,
    tagline: bundle.description,
    category: "BUNDLE",
    collection: "Set",
    price: priceNum,
    originalPrice: priceNum,
    size: "Set",
    image: bundle.image,
    hoverImage: bundle.image,
    rating: 5,
    reviews: 0,
    benefits: [],
    ingredients: [],
    directions: "",
    skinType: [],
    description: bundle.description,
    gallery: [bundle.image],
    theme: { bg: "", accent: "", accentMuted: "", surface: "", glow: "" },
  } as Product;

  return (
    <div className="flex flex-col group relative h-full">
      <button
        onClick={() => toggle(slug)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        <Heart
          size={16}
          className={isWishlisted ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>
      <Link
        href="#"
        className="relative aspect-[4/5] w-full mb-5 overflow-hidden bg-[#08140E] block"
      >
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col items-center text-center flex-grow w-full">
        <Link href="#">
          <h3 className="font-display font-medium text-xl md:text-2xl mb-2 hover:opacity-70 transition-opacity">
            {bundle.name}
          </h3>
        </Link>
        <p className="text-sm text-white/60 mb-3 max-w-[200px] leading-relaxed flex-grow">
          {bundle.description}
        </p>
        <p className="text-sm font-medium tracking-wide mb-4">{bundle.price}</p>

        <div className="w-full mt-auto pt-3">
          <button
            onClick={() => add(productObj, 1)}
            className="w-full flex items-center justify-center bg-[#ffffff] text-[#000000] border border-[#cccccc] py-3 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-[2px] hover:bg-[#08140E] hover:text-[#ffffff] hover:border-[#08140E] transition-all duration-500"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BundlesPage() {
  const { count, setOpen: setCartOpen } = useCart();
  const { setOpen: setWishlistOpen } = useCart(); // Wait, wishlist is managed separately?
  // Let's check if Wishlist Drawer exists. Actually wishlist uses setWishlistOpen but it's local state in Header normally.
  // I will just link to shop or leave it.

  return (
    <div className="min-h-screen bg-[#08140E] text-white font-sans font-normal pb-24 relative">
      {/* Custom Header for Bundles */}
      <div className="w-full relative z-50">
        {/* Announcement Bar */}
        <div className="w-full bg-[#1F261E] text-[#E8E6DF] py-2.5 px-4 flex items-center justify-between text-[11px] tracking-wide">
          <div className="w-4"></div> {/* spacer for centering */}
          <p className="text-center flex-grow">
            Complimentary delivery on all orders above PKR 5000.
          </p>
          <button className="text-[#E8E6DF] hover:text-white transition-colors">
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main Navbar */}
        <header className="w-full bg-[#08140E] py-5 px-6 md:px-12 flex items-center justify-between relative">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/80">
            <Link href="/" className="hover:text-black transition-colors">
              Shop
            </Link>
            <Link href="/" className="hover:text-black transition-colors">
              About
            </Link>
            <Link href="/" className="hover:text-black transition-colors">
              Journal
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-display font-medium text-4xl tracking-[0.15em] text-white leading-none mb-1.5 ml-1">
                MIMI
              </span>
              <span className="font-sans text-[8px] font-medium tracking-[0.4em] uppercase text-white/60 ml-1">
                Beauty
              </span>
            </Link>
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-6 text-white ml-auto">
            <button className="hover:opacity-70 transition-opacity">
              <Search size={18} strokeWidth={1.25} />
            </button>
            <button className="hover:opacity-70 transition-opacity hidden md:block">
              <User size={18} strokeWidth={1.25} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="hover:opacity-70 transition-opacity relative flex items-center"
            >
              <ShoppingBag size={18} strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute -bottom-1 -right-1 bg-[#1F261E] text-white text-[9px] font-medium w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Back to Home Breadcrumb / Link */}
      <div className="max-w-7xl mx-auto px-6 pt-6 -mb-6 md:-mb-10 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-5/12 flex flex-col items-start text-left z-10">
            <h1 className="font-display font-medium text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.1] mb-6">
              Mimi Sets
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-md leading-relaxed">
              Curated combinations for your skin, hair, and body.
            </p>
            <p className="text-sm md:text-base text-white/60 mb-10 max-w-xs leading-relaxed">
              Thoughtfully paired. Effortlessly essential. Everything you need in harmony.
            </p>
            <Link
              href="#bundles"
              className="inline-flex items-center justify-center bg-[#1A1A1A] text-[#FDFBF7] px-8 py-3.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors"
            >
              Shop Sets
            </Link>
          </div>
          <div className="w-full md:w-7/12 relative mt-8 md:mt-0">
            <div className="aspect-[4/3] md:aspect-[16/10] relative w-full overflow-hidden">
              <Image
                src="/hero_mimi_sets_new.jpg"
                alt="Mimi Sets Hero"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      <section id="bundles" className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-medium text-4xl md:text-5xl mb-4">
            Our Bundles
          </h2>
          <div className="w-4 h-[1px] bg-[#2D2D2D] mb-4"></div>
          <p className="text-sm md:text-base text-white/80 tracking-wide uppercase text-xs">
            Less, simplified. Results, amplified.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>

      {/* Made for You Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 mb-10">
        <div className="w-full flex flex-col md:flex-row bg-[#08140E]">
          <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-auto">
            <Image
              src="/made_for_you_new.jpg"
              alt="Made for You"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12 md:p-24 text-center">
            <h2 className="font-display font-medium text-4xl md:text-5xl mb-4 text-white">
              Mimi's Edit
            </h2>
            <div className="w-4 h-[1px] bg-[#2D2D2D] mb-6"></div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4">
              Your Favorite Set
            </p>
            <p className="text-sm text-white/80 mb-8 max-w-xs leading-relaxed">
              Curated, pre-wrapped and gift-ready.
            </p>
            <button
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center justify-center border border-[#D5D5D5] text-white px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-[#2D2D2D] hover:text-[#FDFBF7] transition-colors"
            >
              Shop The Set
            </button>
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <footer className="w-full bg-[#08140E] py-16 px-6 md:px-12 border-t border-[#EAE8E3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
          {/* Column 1 */}
          <div className="w-full md:w-1/4 flex flex-col">
            <Link href="/" className="flex flex-col items-start mb-6">
              <span className="font-display font-medium text-3xl tracking-[0.15em] text-white leading-none mb-1.5 ml-1">
                MIMI
              </span>
              <span className="font-sans text-[7px] font-medium tracking-[0.4em] uppercase text-white/60 ml-1">
                Beauty
              </span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed max-w-[220px]">
              Skincare and haircare, made with naturally derived ingredients.
            </p>
          </div>

          {/* Column 2 */}
          <div className="w-full md:w-1/6 flex flex-col">
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white mb-6">
              Shop
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Mimi Sets
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Hair Collection
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Body Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full md:w-1/6 flex flex-col">
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white mb-6">
              About
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-full md:w-1/6 flex flex-col">
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white mb-6">
              Help
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="w-full md:w-1/4 flex flex-col">
            <h4 className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white mb-6">
              Stay Connected
            </h4>
            <p className="text-sm text-white/80 mb-4 max-w-[260px]">
              Be the first to know about new launches and offers.
            </p>
            <div className="relative mb-6 w-full max-w-[260px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-[#D5D5D5] px-4 py-2 text-sm outline-none placeholder:text-[#A0A0A0] text-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4 text-white">
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    strokeWidth="1.5"
                  ></rect>
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    strokeWidth="1.5"
                  ></path>
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                </svg>
              </Link>
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </Link>
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="21.17" y1="8" x2="12" y2="8"></line>
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full pt-8">
          <p className="text-[11px] text-white/40">
            © 2025 Mimi Beauty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
