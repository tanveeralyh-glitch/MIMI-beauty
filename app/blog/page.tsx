"use client";
import { motion } from "framer-motion";
import { assets } from "@/lib/products";

const posts = [
  {
    title: "DEW Face Serum",
    subtitle: "A Daily Ritual for Balanced, Healthy-Looking Skin",
    description: "Healthy skin begins with balance. When skin becomes dehydrated or repeatedly stripped of moisture, it often responds by producing excess oil in an effort to protect itself. Over time, this imbalance can leave your complexion feeling dry, congested, oily, or more prone to visible blemishes.\n\nDEW is designed to help restore that balance. Powered by a carefully curated blend of botanical oils that work in harmony with the skin's natural barrier, its lightweight formula absorbs effortlessly to replenish moisture, reinforce barrier function, and leave skin feeling soft, comfortable, and naturally radiant without a heavy or greasy finish.\n\nA resilient skin barrier is the foundation of calm, balanced skin. By helping strengthen and support the skin's natural protective barrier, DEW encourages a complexion that feels less reactive and better able to maintain lasting hydration and comfort over time.\n\nRather than simply providing temporary hydration, DEW works alongside your skin to support long-term balance, resilience, and everyday radiance.\n\nSimple. Effective. Intentionally balanced.",
    whyYoullLove: [
      "Lightweight, fast-absorbing dry oil formula",
      "Helps maintain balanced hydration",
      "Supports a healthy skin barrier",
      "Helps calm the appearance of stressed, blemish-prone skin",
      "Leaves skin soft, smooth, and naturally radiant",
      "Comfortable, non-greasy finish",
      "Suitable for daily morning and evening use",
      "Crafted with carefully selected botanical ingredients"
    ],
    tag: "Face Serum",
    img: "/dew.jpg"
  },
  {
    title: "HÁLO Body Oil",
    subtitle: "Lightweight Nourishment. Lasting Comfort.",
    description: "Healthy skin deserves more than surface hydration. While many body moisturisers create a temporary layer that can feel heavy or sticky, HÁLO Body Oil is crafted with a carefully balanced blend of botanical oils that absorb beautifully into the skin, delivering lasting nourishment without residue.\n\nIts lightweight dry oil texture helps replenish moisture, support the skin's natural barrier, and leave skin feeling soft, supple, and comfortably hydrated with a natural, healthy glow.\n\nWhether applied after showering, following shaving or waxing, or whenever your skin needs extra care, HÁLO melts effortlessly into the skin, providing lasting comfort and a silky finish that never feels greasy.\n\nA simple daily ritual for skin that feels nourished, balanced, and beautifully radiant.",
    whyYoullLove: [
      "Lightweight, fast-absorbing dry oil formula",
      "Deeply nourishes without feeling greasy",
      "Helps support the skin's natural moisture barrier",
      "Leaves skin soft, smooth, and naturally radiant",
      "Comforts skin after shaving or waxing",
      "Suitable for everyday use",
      "Crafted with carefully selected botanical ingredients"
    ],
    tag: "Body Oil",
    img: "/halo.jpg"
  },
  {
    title: "HERBÈ Pre-Wash Scalp Treatment",
    subtitle: "Prepare Your Scalp. Nourish Your Hair.",
    description: "Healthy hair begins with a healthy scalp. Repeated shampooing after conventional scalp treatments to remove product build-up can leave the scalp feeling stripped of its natural oils, making it more prone to dryness and discomfort. HERBÈ Pre-Wash Scalp Treatment helps replenish moisture before cleansing, creating the ideal foundation for a healthier scalp and softer, stronger-looking hair.\n\nPowered by a carefully selected blend of botanical oils and plant extracts, its lightweight formula helps nourish the scalp, condition the hair, and prepare both scalp and hair before cleansing without leaving behind a heavy or greasy feel. Applied before shampooing, HERBÈ transforms wash day into a simple ritual of intentional care, leaving the scalp feeling refreshed while hair feels softer, smoother, healthier, and easier to manage after every wash.",
    whyYoullLove: [
      "Nourishes the scalp before cleansing",
      "Helps replenish moisture before shampooing",
      "Helps prepare the scalp and hair for cleansing",
      "Leaves hair feeling softer and easier to manage",
      "Lightweight formula that rinses away easily",
      "Suitable for all hair types",
      "Crafted with carefully selected botanical ingredients"
    ],
    tag: "Scalp Treatment",
    img: "/herbe.jpg"
  },
  {
    title: "VEIL Post-Wash Hair Serum",
    subtitle: "A Lightweight Finish. Everyday Protection.",
    description: "The care your hair receives after cleansing is just as important as the care it receives before. Freshly washed hair is more vulnerable to moisture loss, frizz, and heat damage. VEIL Post-Wash Hair Serum is formulated to nourish and protect every strand while enhancing softness, smoothness, and natural shine without weighing it down.\n\nIts lightweight dry oil formula absorbs effortlessly into damp or dry hair, smoothing the hair cuticle while creating a breathable protective layer around each strand to help shield against everyday heat styling. The result is hair that feels silky, polished, beautifully manageable, and refreshed with every application, turning your routine into an indulgent sensory experience. Designed for every hair texture, VEIL enhances your hair's natural character rather than masking it, leaving curls defined, waves soft and bouncy, and straight hair sleek with a luminous, healthy-looking finish.\n\nA simple finishing ritual for hair that feels nourished, protected, and effortlessly refined.",
    whyYoullLove: [
      "Lightweight, fast-absorbing dry oil formula",
      "Helps protect against everyday heat styling",
      "Helps reduce frizz",
      "Enhances softness, smoothness, and natural shine",
      "Leaves hair feeling silky without weighing it down",
      "Suitable for damp or dry hair",
      "Designed for all hair types and textures",
      "Crafted with carefully selected botanical ingredients"
    ],
    tag: "Hair Serum",
    img: "/veil.jpg"
  },
];


export default function Page() { return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-8 md:pt-32 md:pb-12">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Journal</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">Read, slowly.</h1>
      </section>
      <section className="mx-auto grid max-w-[1400px] gap-8 px-6 pb-16 md:pb-32 md:grid-cols-2">
        {posts.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group overflow-hidden rounded-3xl border border-border bg-background hover-lift">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={p.img} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.tag}</p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl">{p.title}</h2>
              <p className="mt-2 text-lg text-gold/80 italic">{p.subtitle}</p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">{p.description}</p>
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Why You'll Love {p.title.split(' ')[0]}</p>
                <ul className="space-y-2">
                  {p.whyYoullLove.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-gold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  ); }

