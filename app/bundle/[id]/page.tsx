"use client";
import Link from "next/link";
import { bundles, Bundle } from "@/components/site/bundle-card";
import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Heart, Minus, Plus, Share2, Check, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { findProduct, products } from "@/lib/products";

function MagneticButton({ children, onClick, className, style }: {
  children: React.ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.button onClick={onClick}
      style={{ ...style }}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1.5s] ease-in-out group-hover:translate-x-[150%]" />
      {children}
    </motion.button>
  );
}

function CinematicStage({ image, accent, glow }: { image: string; accent: string; glow: string }) {
  return (
    <div className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden rounded-[2.5rem] shadow-2xl lg:min-h-[680px]"
      style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${glow} 0%, transparent 70%)` }} />
      <motion.img
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6, ease: "easeOut" }, filter: { duration: 0.6 } }}
        src={image} alt="Bundle"
        className="relative z-10 h-3/4 max-h-[700px] w-full object-contain p-4 drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)] mix-blend-screen"
      />
    </div>
  );
}

const GIFT_PACKAGING_FEE = 1500;

function formatPkr(amount: number): string {
  return `Rs. ${amount.toLocaleString()}`;
}

export default function BundleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const bundle = bundles.find((b) => b.id === resolvedParams.id);

  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [packaging, setPackaging] = useState<"only" | "gift">("only");
  const [selectedBodyOil, setSelectedBodyOil] = useState<string>("halo");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!bundle) return (
    <div className="grid min-h-[60vh] place-items-center bg-background text-foreground">
      <p>Bundle not found. <Link href="/bundles" className="underline">Back to bundles</Link></p>
    </div>
  );

  const giftSelected = packaging === "gift";
  const totalPrice = bundle.price + (giftSelected ? GIFT_PACKAGING_FEE : 0);
  const containsBodyOil = bundle.products.includes("halo");
  const bodyOils = ["Halò", "Pearl", "Amalfi", "Santorini"];
  const wishlisted = has(bundle.id);
  const theme = {
    bg: "#08140E",
    accent: "#CFA76A",
    accentMuted: "rgba(207, 167, 106, 0.15)",
    surface: "rgba(207, 167, 106, 0.04)",
    glow: "rgba(207, 167, 106, 0.08)",
  };

  const handleAddToCart = () => {
    setStatus("loading");
    setTimeout(() => {
      const itemsToAdd = bundle.products.map((slug) => {
        const product = findProduct(slug);
        if (!product) return null;
        return { product, qty };
      }).filter(Boolean);

      itemsToAdd.forEach((item: any) => {
        if (item) add(item.product, item.qty);
      });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    }, 600);
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-white selection:bg-white/20" style={{ backgroundColor: theme.bg }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px]" style={{ backgroundColor: theme.glow }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[140px]" style={{ backgroundColor: theme.glow }} />
      </div>

      <div className="relative z-10 pt-24 lg:pt-32">
        {/* Back Button */}
        <div className="mx-auto max-w-[1800px] px-6 pb-6 lg:px-12 xl:px-20">
          <div className="flex items-center gap-6">
            <Link href="/bundles" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors"
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = theme.accent; el.style.backgroundColor = theme.accentMuted; el.style.color = theme.accent; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = ""; el.style.backgroundColor = ""; el.style.color = ""; }}>
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              Back to Bundles
            </Link>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: `${theme.accent}99` }}>BUNDLE</span>
          </div>
        </div>

        <section className="mx-auto max-w-[1800px] flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-12 xl:gap-20">
          {/* Left: Bundle Image - Mobile First, Desktop Left */}
          <div className="relative order-1 px-6 lg:order-1 lg:pl-12 xl:pl-20">
            <CinematicStage image={bundle.image} accent={theme.accent} glow={theme.glow} />
          </div>

          {/* Right: Bundle Info - Mobile Second, Desktop Right */}
          <div className="relative order-2 mt-8 px-6 lg:order-2 lg:mt-0 lg:pr-12 xl:pr-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-white">{bundle.name}</h1>
              <p className="mt-4 text-lg text-white/60 md:text-xl">{bundle.description}</p>

              <div className="mt-10">
                <div className="text-base leading-relaxed text-white/65 md:text-lg">
                  Includes: {bundle.products.map((slug) => {
                    const product = findProduct(slug);
                    return product ? product.name : slug;
                  }).join(", ")}
                </div>
              </div>
            </motion.div>

            {/* Purchase Panel */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 rounded-[2rem] border p-8 shadow-2xl backdrop-blur-3xl"
              style={{ borderColor: `${theme.accent}20`, backgroundColor: theme.surface }}>
              
              {/* Set / Gift Wrapping Option */}
              <div className="mb-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D8D2C8] mb-3" style={{ fontFamily: "Montserrat" }}>
                  Packaging
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPackaging("only")}
                    className={`flex flex-col items-center justify-center rounded-lg border px-4 py-4 transition-colors ${
                      packaging === "only" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
                    }`}
                  >
                    <span className="text-sm font-medium tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                      Set
                    </span>
                    <span className="mt-1 text-xs text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                      {formatPkr(bundle.price)}
                    </span>
                  </button>
                  <button
                    onClick={() => setPackaging("gift")}
                    className={`flex flex-col items-center justify-center rounded-lg border px-4 py-4 transition-colors ${
                      packaging === "gift" ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
                    }`}
                  >
                    <span className="text-sm font-medium tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                      Gift Wrapping
                    </span>
                    <span className="mt-1 text-xs text-[#D8D2C8]" style={{ fontFamily: "Montserrat" }}>
                      + {formatPkr(GIFT_PACKAGING_FEE)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Body Oil Selection */}
              {containsBodyOil && (
                <div className="mb-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D8D2C8] mb-3" style={{ fontFamily: "Montserrat" }}>
                    Choose Your Body Oil
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {bodyOils.map((oil) => (
                      <button
                        key={oil}
                        onClick={() => setSelectedBodyOil(oil.toLowerCase())}
                        className={`flex items-center justify-center rounded-lg border px-4 py-3 transition-colors ${
                          selectedBodyOil === oil.toLowerCase() ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/40"
                        }`}
                      >
                        <span className="text-sm font-medium tracking-wide text-[#F5F2EC]" style={{ fontFamily: "Montserrat" }}>
                          {oil}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-end justify-between border-b pb-6 mb-6" style={{ borderColor: `${theme.accent}15` }}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl tracking-tight text-white">{formatPkr(totalPrice)}</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex h-16 w-full items-center justify-between rounded-full border px-6"
                  style={{ borderColor: `${theme.accent}20`, backgroundColor: "rgba(0,0,0,0.2)" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="transition hover:scale-110" style={{ color: theme.accent }}>
                    <Minus className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <AnimatePresence mode="popLayout">
                    <motion.span key={qty} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
                      className="w-8 text-center text-lg font-medium text-white">{qty}</motion.span>
                  </AnimatePresence>
                  <button onClick={() => setQty(qty + 1)} className="transition hover:scale-110" style={{ color: theme.accent }}>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>

                <MagneticButton onClick={handleAddToCart}
                  className="flex h-16 w-full flex-1 items-center justify-center rounded-full"
                  style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: status === "success" ? `0 0 40px ${theme.accentMuted}` : "none" }}>
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span key="idle" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
                        className="text-xs font-bold uppercase tracking-[0.25em]">Add to Bag</motion.span>
                    )}
                    {status === "loading" && (
                      <motion.span key="loading" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span key="success" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]">
                        <Check className="h-4 w-4" strokeWidth={3} /> Added
                      </motion.span>
                    )}
                  </AnimatePresence>
                </MagneticButton>
              </div>

              <div className="mt-6 flex justify-center gap-10">
                <button onClick={() => toggle(bundle.id)}
                  className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors"
                  style={{ color: wishlisted ? theme.accent : "rgba(255,255,255,0.4)" }}>
                  <Heart className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={1.5}
                    style={{ fill: wishlisted ? theme.accent : "transparent" }} />
                  {wishlisted ? "Saved" : "Wishlist"}
                </button>
                <button className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white">
                  <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={1.5} /> Share
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
