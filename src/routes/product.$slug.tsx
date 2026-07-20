import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findProduct, products } from "@/lib/products";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Minus, Plus, Share2, Star, ChevronDown, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · MIMIbeauty` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} · MIMIbeauty` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center">
      <p>Product not found. <Link to="/shop" className="text-gold underline">Back to shop</Link></p>
    </div>
  ),
  errorComponent: () => <div className="p-24 text-center">Something went wrong.</div>,
  component: ProductPage,
});

function AccordionItem({ title, children, open, onClick }: { title: string; children: React.ReactNode; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-border/40">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-gold"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.25em]">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("ingredients");
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = has(product.slug);
  
  const [active, setActive] = useState(0);
  
  // Real gallery images without duplication, filtering out any empty ones
  const gallery = [product.image, product.hoverImage].filter(Boolean);
  const related = products.filter((p) => p.slug !== product.slug);

  const handleAddToCart = () => {
    add(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="bg-background">
      {/* Absolute Breadcrumb (Desktop) */}
      <div className="absolute left-6 top-24 z-20 hidden md:block lg:left-12 lg:top-32 xl:left-20">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <Link to="/shop" className="transition-colors hover:text-gold">Shop</Link>
          <span className="mx-2">·</span>
          {product.category}
        </p>
      </div>

      <section className="mx-auto lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-0 xl:max-w-[1800px] xl:grid-cols-[1.4fr_1fr]">
        
        {/* Mobile Breadcrumb & Title (Hidden on LG) */}
        <div className="px-6 pt-24 pb-4 lg:hidden">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Link to="/shop" className="transition-colors hover:text-gold">Shop</Link>
            <span className="mx-2">·</span>
            {product.category}
          </p>
        </div>

        {/* Left Column: Visuals & Small Gallery */}
        <div className="flex flex-col gap-4 px-2 pb-6 lg:px-12 lg:pb-32 lg:pt-24 xl:px-20">
          <motion.div 
            layoutId={product.slug}
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-[#f8f8f8] lg:rounded-[2.5rem]"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={active}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={gallery[active]} 
                alt={`${product.name}`} 
                className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
                loading="eager"
              />
            </AnimatePresence>
          </motion.div>
          
          {/* Small Gallery */}
          <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-3 px-2 lg:px-0">
            {gallery.map((src, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)} 
                className={`relative aspect-square overflow-hidden rounded-xl border bg-[#f8f8f8] transition-all duration-300 ${active === i ? "border-gold opacity-100" : "border-border/50 opacity-60 hover:border-gold/50 hover:opacity-100"}`}
              >
                <img src={src} className="h-full w-full object-contain p-2 mix-blend-multiply" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Details */}
        <div className="relative">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:px-12 xl:px-20 lg:pb-0">
            {/* Scrollable container on desktop if content is tall */}
            <div className="px-6 py-10 lg:max-h-[85vh] lg:overflow-y-auto lg:px-0 lg:py-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{product.collection} Collection</p>
                <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-tight">{product.name}</h1>
                <p className="mt-4 text-[15px] text-muted-foreground md:text-base">{product.tagline}</p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`} strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
                </div>

                <p className="mt-8 text-[15px] leading-relaxed text-foreground/80 md:text-base">{product.description}</p>
                
                <div className="mt-10 flex items-baseline gap-4 border-b border-border/40 pb-10">
                  <span className="font-display text-4xl">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">/ {product.size}</span>
                </div>
              </motion.div>

              {/* Desktop Add to Cart Block (Hidden on mobile) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-8 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 items-center gap-4 rounded-full border border-border px-4 transition-colors hover:border-gold/50">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center text-muted-foreground transition hover:text-foreground"><Minus className="h-4 w-4" /></button>
                    <span className="w-4 text-center font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center text-muted-foreground transition hover:text-foreground"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button 
                    onClick={handleAddToCart} 
                    className={`group relative flex h-14 flex-1 items-center justify-center overflow-hidden rounded-full transition-all duration-500 ${justAdded ? "bg-gold text-background" : "bg-foreground text-background hover:bg-gold hover:shadow-[0_15px_40px_-10px_rgba(201,168,106,0.6)]"}`}
                  >
                    <AnimatePresence mode="wait">
                      {justAdded ? (
                        <motion.span key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest">
                          <Check className="h-4 w-4" strokeWidth={2.5} /> Added to Ritual
                        </motion.span>
                      ) : (
                        <motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-[11px] font-semibold uppercase tracking-[0.22em] transition-transform group-hover:scale-105">
                          Add to bag · ${(product.price * qty).toFixed(2)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
                
                <div className="mt-6 flex gap-8">
                  <button onClick={() => toggle(product.slug)} className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors ${wishlisted ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}>
                    <Heart className={`h-4 w-4 ${wishlisted ? "fill-gold" : ""}`} strokeWidth={1.5} /> {wishlisted ? "Saved" : "Wishlist"}
                  </button>
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground">
                    <Share2 className="h-4 w-4" strokeWidth={1.5} /> Share
                  </button>
                </div>
              </motion.div>

              {/* Accordion Details */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="mt-12 lg:mt-16">
                <AccordionItem 
                  title="Ingredients" 
                  open={activeTab === "ingredients"} 
                  onClick={() => setActiveTab(activeTab === "ingredients" ? "" : "ingredients")}
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {product.ingredients.map((i: string) => (
                      <div key={i} className="rounded-xl border border-border/40 bg-secondary/20 px-4 py-3 backdrop-blur-sm">
                        <span className="font-medium text-foreground">{i}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-gold">Clean · Vegan · Cruelty-Free</p>
                </AccordionItem>
                
                <AccordionItem 
                  title="Benefits" 
                  open={activeTab === "benefits"} 
                  onClick={() => setActiveTab(activeTab === "benefits" ? "" : "benefits")}
                >
                  <ul className="space-y-4">
                    {product.benefits.map((b: string) => (
                      <li key={b} className="flex items-start gap-4">
                        <span className="mt-1.5 grid h-2 w-2 shrink-0 place-items-center rounded-full bg-gold/30">
                          <span className="h-1 w-1 rounded-full bg-gold" />
                        </span> 
                        <span className="text-foreground/90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                
                <AccordionItem 
                  title="The Ritual (Directions)" 
                  open={activeTab === "directions"} 
                  onClick={() => setActiveTab(activeTab === "directions" ? "" : "directions")}
                >
                  <p className="text-base leading-loose text-foreground/90">{product.directions}</p>
                </AccordionItem>
              </motion.div>
              
              {/* Spacer for mobile to scroll past the fixed bottom bar */}
              <div className="h-28 lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/50 bg-background/85 p-4 pb-safe backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-12 items-center gap-2 rounded-full border border-border bg-background px-2">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center text-muted-foreground"><Minus className="h-3.5 w-3.5" /></button>
            <span className="w-5 text-center text-sm font-medium">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center text-muted-foreground"><Plus className="h-3.5 w-3.5" /></button>
          </div>
          <button 
            onClick={handleAddToCart}
            className={`flex h-12 flex-1 items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${justAdded ? "bg-gold text-background shadow-[0_10px_30px_-10px_rgba(201,168,106,0.5)]" : "bg-foreground text-background"}`}
          >
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.span key="added-mobile" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Added
                </motion.span>
              ) : (
                <motion.span key="add-mobile" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Add to bag · ${(product.price * qty).toFixed(2)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Related Products */}
      <section className="border-t border-border/40 bg-secondary/30 py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Explore</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl">Ritual companions</h2>
            </div>
            <Link to="/shop" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] transition hover:text-gold md:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.slice(0, 4).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
