import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, Leaf, ShieldCheck, Sparkles, Truck, Rabbit, Recycle,
  Star, ChevronDown, Play,
} from "lucide-react";
import { assets, categories, collections, ingredientsShowcase, products } from "@/lib/products";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MIMIbeauty · Reveal Your Natural Beauty" },
      { name: "description", content: "Small-batch luxury skincare & body rituals. Botanical actives, clinical results, quiet luxury." },
      { property: "og:title", content: "MIMIbeauty · Reveal Your Natural Beauty" },
      { property: "og:description", content: "Small-batch luxury skincare & body rituals." },
      { property: "og:image", content: assets.water },
      { name: "twitter:image", content: assets.water },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <FeaturedCategories />
      <WhyChoose />
      <Ingredients />
      <Compare />
      <Testimonials />
      <VideoSection />
      <QuizPreview />

      <Instagram />
      <Newsletter />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0 -z-10">
        <img src="/media__1784439898181.jpg" alt="Hero background" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </motion.div>

      {/* soft gold orbs */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute right-[-6%] top-[10%] hidden h-[46vh] w-[46vh] rounded-full bg-gradient-to-br from-gold/40 to-transparent blur-3xl md:block"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -140]) }}
        className="pointer-events-none absolute left-[-8%] top-[40%] hidden h-[36vh] w-[36vh] rounded-full bg-gradient-to-br from-forest/40 to-transparent blur-3xl lg:block"
      />


      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-24 pt-40 md:justify-center md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[11px] uppercase tracking-[0.5em] text-gold"
        >
          Estd. 2026 · A ritual of light
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-6 max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-balance"
        >
          Reveal your <em className="text-gold not-italic">natural</em> beauty.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg text-foreground/80"
        >
          Ritualistic skincare crafted from botanical actives and quiet science.
          Formulated in small batches. Made to be felt.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:bg-gold hover:text-background">
            Discover the ritual
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/quiz" className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/30 px-7 py-4 text-sm backdrop-blur transition hover:border-gold hover:text-gold">
            Take the skin quiz
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 hidden items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-muted-foreground md:flex"
        >
          <ChevronDown className="h-3 w-3 animate-bounce" /> Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}


function SectionHeader({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[11px] uppercase tracking-[0.4em] text-gold"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight text-balance"
      >
        {title}
      </motion.h2>
      {kicker && (
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{kicker}</p>
      )}
    </div>
  );
}

function FeaturedCategories() {
  const catImages = [
    "/media__1784439898541.jpg",
    "/media__1784439898491.jpg",
    "/media__1784439898596.jpg",
    "/media__1784439898781.jpg",
    "/media__1784439898181.jpg",
    "/media__1784439730149.png",
    "/media__1784439730167.png",
    "/media__1784439898541.jpg"
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <SectionHeader eyebrow="The Wardrobe" title="Curated by ritual" kicker="Every category, considered. Choose the object that will live on your shelf." />
      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((c, i) => (
          <motion.button
            key={c}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary/50 p-6 text-left"
          >
            <img
              src={catImages[i % catImages.length]}
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/85 via-background/30 to-background/10 transition group-hover:from-background/70" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">0{i + 1}</p>
            <p className="mt-auto flex h-full items-end font-display text-2xl md:text-3xl text-foreground">{c}</p>
            <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 text-gold" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}


function BestSellers() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Best Sellers</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
            Loved into permanence.
          </h2>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm hover:text-gold">
          Shop all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-6">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const whyItems = [
  { icon: ShieldCheck, title: "Dermatologist tested", body: "Every formula clinically evaluated for sensitive skin." },
  { icon: Rabbit, title: "Cruelty free", body: "Never tested on animals. Certified by Leaping Bunny." },
  { icon: Leaf, title: "100% vegan", body: "Plant-based actives. No compromise on efficacy." },
  { icon: Sparkles, title: "Botanical actives", body: "Wild-harvested, cold-pressed, and clinically dosed." },
  { icon: Recycle, title: "Sustainable packaging", body: "Refillable glass. Post-consumer recycled cartons." },
  { icon: Truck, title: "Complimentary shipping", body: "Free carbon-neutral delivery on orders over $75." },
];

function WhyChoose() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-24 md:py-32 grain">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader eyebrow="Why MIMIbeauty" title="Six promises, kept quietly." />
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3">
          {whyItems.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-background/60 p-8 backdrop-blur transition hover:border-gold/60 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-border transition group-hover:border-gold group-hover:text-gold">
                <it.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-6 font-display text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <SectionHeader eyebrow="Ingredients" title="Molecular poetry." kicker="Every actives dosed at the clinically-effective level. No fillers, no theatre." />
      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3">
        {ingredientsShowcase.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-background p-8"
          >
            <img 
              src={[
                "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1611078449921-2a134a413d42?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1608248593875-f947e9541da0?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80"
              ][i]}
              alt={it.name}
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-110 group-hover:opacity-60"
            />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/20 blur-2xl transition group-hover:bg-gold/40" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute right-6 top-6 h-16 w-16 rounded-full border border-gold/40"
            >
              <div className="absolute inset-2 rounded-full border border-gold/60" />
              <div className="absolute inset-5 rounded-full bg-gold/40" />
            </motion.div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">0{i + 1}</p>
            <div className="absolute inset-x-8 bottom-8">
              <h3 className="font-display text-3xl md:text-4xl">{it.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <SectionHeader eyebrow="Proof, not promises" title="Before · After · Always." />
      <BeforeAfter />
    </section>
  );
}

function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setPct = (pct: number) => {
    const clamped = Math.max(4, Math.min(96, pct));
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    if (beforeRef.current) beforeRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPct(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      onPointerDown={(e) => { draggingRef.current = true; onMove(e); }}
      onPointerMove={onMove}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerLeave={() => (draggingRef.current = false)}
      className="relative mt-16 aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-border touch-none"
    >
      <img src="/after.png" alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <div ref={beforeRef} className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <img src="/before.png" alt="Before" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div ref={dividerRef} className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gold">
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-gold bg-background/80 backdrop-blur cursor-ew-resize">
          <span className="text-gold">◀ ▶</span>
        </div>
      </div>
      <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] backdrop-blur">Before</div>
      <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-gold/90 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-background">After · 28 days</div>
    </motion.div>
  );
}

const testimonials = [
  { name: "Amelia R.", city: "New York", quote: "The Dew serum genuinely changed my skin. Two weeks in, my barrier feels rebuilt. It's the first product I've re-ordered twice." },
  { name: "Sofia L.", city: "Milan", quote: "Hálo is the most beautiful body oil I've ever owned. The fragrance is subtle and the shine is unreal." },
  { name: "Yuki T.", city: "Tokyo", quote: "Every detail feels intentional. The packaging, the ritual, the results. Rhode meets Aesop." },
  { name: "Chloé D.", city: "Paris", quote: "Herbé transformed my scalp. My hair grows faster and shinier. This brand is quietly extraordinary." },
];

function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader eyebrow="Loved worldwide" title="Words from our community." />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="glass rounded-2xl p-7"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5 fill-gold" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <footer className="mt-6">
                <p className="font-display text-lg">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.city}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative aspect-[21/9] overflow-hidden rounded-3xl"
      >
        <motion.video
          src="https://videos.pexels.com/video-files/7479891/7479891-uhd_2560_1440_25fps.mp4"
          poster={assets.water}
          autoPlay
          muted
          loop
          playsInline
          initial={{ scale: 1.15 }}
          animate={{ scale: [1.15, 1.05, 1.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/40" />
        <div className="absolute inset-0 grid place-items-center">
          <button className="group relative grid h-24 w-24 place-items-center rounded-full border border-gold/80 bg-background/40 backdrop-blur">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
            <Play className="h-6 w-6 translate-x-0.5 text-gold" />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="absolute bottom-10 left-10"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Ritual · 01</p>
          <h3 className="mt-3 font-display text-4xl md:text-5xl">A morning, illuminated.</h3>
        </motion.div>
      </motion.div>
    </section>
  );
}

function QuizPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary via-background to-secondary p-10 md:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Skin Quiz · 60 seconds</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-tight text-balance">
              Your ritual, <em className="text-gold">designed for you</em>.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Four gentle questions. A personalised routine built by dermatologists, delivered instantly.
            </p>
            <Link to="/quiz" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm text-background hover:bg-gold">
              Begin the quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {["Skin type", "Concerns", "Sensitivity", "Ritual time"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-background/60 p-4 backdrop-blur"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-background text-sm font-medium">{i + 1}</span>
                <span className="font-medium">{step}</span>
                <div className="ml-auto h-1 w-24 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-gold" style={{ width: `${25 * (i + 1)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <SectionHeader eyebrow="Collections" title="Rituals, composed." />
      <div className="mt-16 grid gap-4 md:grid-cols-6">
        {collections.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-3xl border border-border p-8 aspect-[3/4] md:aspect-auto md:min-h-[380px] ${i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3"} bg-gradient-to-br ${c.tone}`}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-background/70">Collection · 0{i + 1}</p>
            <h3 className="mt-4 font-display text-4xl text-background md:text-5xl">{c.name}</h3>
            <Link to="/collections" className="absolute bottom-8 left-8 inline-flex items-center gap-2 rounded-full bg-background/90 px-5 py-2.5 text-sm text-foreground opacity-0 transition group-hover:opacity-100">
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Instagram() {
  const imgs = [
    "/media__1784439898491.jpg",
    "/media__1784439898596.jpg",
    "/media__1784439898541.jpg",
    "/media__1784439898181.jpg",
    "/media__1784439898781.jpg",
    "/media__1784439898491.jpg",
    "/media__1784439898596.jpg",
    "/media__1784439898541.jpg"
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <SectionHeader eyebrow="@mimibeauty" title="Rituals, in the wild." />
      <div className="mt-14 grid grid-cols-2 items-center gap-6 md:grid-cols-4 md:gap-8">
        {imgs.map((src, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`block relative overflow-hidden bg-secondary/10 shadow-sm ${
              i % 4 === 0 ? "aspect-[2/3] rounded-t-[100px] rounded-b-2xl md:-translate-y-8" :
              i % 4 === 1 ? "aspect-square rounded-full" :
              i % 4 === 2 ? "aspect-[3/4] rounded-3xl md:translate-y-12" :
              "aspect-[4/5] rounded-br-[80px] rounded-tl-[80px] rounded-tr-2xl rounded-bl-2xl"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

const posts = [
  { title: "The barrier repair diary", excerpt: "How ceramides rebuild the moisture barrier in 28 days.", tag: "Journal" },
  { title: "On slow beauty", excerpt: "Why the ritual matters as much as the formula.", tag: "Philosophy" },
  { title: "A guide to layering", excerpt: "The right order for serums, oils, and moisturisers.", tag: "How-to" },
];

function Blog() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.5em] text-gold"
          >
            — The Journal —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-6 font-script text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-gold"
          >
            Read, slowly.
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mx-auto mt-6 h-px w-32 origin-left bg-gold/60"
          />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-none bg-secondary/20">
                <img 
                  src={[
                    "https://images.unsplash.com/photo-1611078449921-2a134a413d42?auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80"
                  ][i]} 
                  alt="" 
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  loading="lazy" 
                />
              </div>
              <div className="pt-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.tag}</p>
                <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm">
                  Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-3xl bg-secondary/50 p-10 text-foreground md:p-20 grain">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Letter</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
              Slow drops, quiet news.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Occasional letters on ritual, ingredients, and new arrivals. Never noise.
            </p>
          </div>
          <form className="flex flex-col gap-3 md:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full flex-1 rounded-full border border-border bg-background/50 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold"
            />
            <button className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-background transition hover:bg-gold-soft">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
