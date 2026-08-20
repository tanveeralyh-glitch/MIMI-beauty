"use client";
import { motion } from "framer-motion";

const posts = [
  {
    title: "DEW Face Serum",
    subtitle: "A Daily Ritual for Balanced, Healthy-Looking Skin",
    description: `Healthy skin begins with balance.

When skin becomes dehydrated or repeatedly stripped of moisture, it often responds by producing excess oil in an effort to protect itself. Over time, this imbalance can leave your complexion feeling dry, congested, oily, or more prone to visible blemishes.

DEW is designed to help restore that balance. Powered by a carefully curated blend of botanical oils that work in harmony with the skin's natural barrier, its lightweight formula absorbs effortlessly to replenish moisture, reinforce barrier function, and leave skin feeling soft, comfortable, and naturally radiant without a heavy or greasy finish.

A resilient skin barrier is the foundation of calm, balanced skin. By helping strengthen and support the skin's natural protective barrier, DEW encourages a complexion that feels less reactive and better able to maintain lasting hydration and comfort over time.

Rather than simply providing temporary hydration, DEW works alongside your skin to support long-term balance, resilience, and everyday radiance.

Simple. Effective. Intentionally balanced.`,
    whyYoullLove: [
      "Lightweight, fast-absorbing dry oil formula",
      "Helps maintain balanced hydration",
      "Supports a healthy skin barrier",
      "Helps calm the appearance of stressed, blemish-prone skin",
      "Leaves skin soft, smooth, and naturally radiant",
      "Comfortable, non-greasy finish",
      "Suitable for daily morning and evening use",
      "Crafted with carefully selected botanical ingredients",
    ],
    whyLabel: "Why You'll Love DEW",
    tag: "Face Serum",
    img: "/products/dew.jpg",
  },
  {
    title: "BODY LAVA",
    subtitle: "Lightweight Nourishment. Lasting Comfort.",
    description: `Healthy skin deserves more than surface hydration. While many body moisturisers create a temporary layer that can feel heavy or sticky, HÁLO Body Oil is crafted with a carefully balanced blend of botanical oils that absorb beautifully into the skin, delivering lasting nourishment without residue.

Its lightweight dry oil texture helps replenish moisture, support the skin's natural barrier, and leave skin feeling soft, supple, and comfortably hydrated with a natural, healthy glow.

Whether applied after showering, following shaving or waxing, or whenever your skin needs extra care, HÁLO melts effortlessly into the skin, providing lasting comfort and a silky finish that never feels greasy.

A simple daily ritual for skin that feels nourished, balanced, and beautifully radiant.`,
    whyYoullLove: [
      "Lightweight, fast-absorbing dry oil formula",
      "Deeply nourishes without feeling greasy",
      "Helps support the skin's natural moisture barrier",
      "Leaves skin soft, smooth, and naturally radiant",
      "Comforts skin after shaving or waxing",
      "Suitable for everyday use",
      "Crafted with carefully selected botanical ingredients",
    ],
    whyLabel: "Why You'll Love HÁLO",
    tag: "Body Oil",
    img: "/products/halo.jpg",
  },
  {
    title: "HERBÈ Pre-Wash Scalp Treatment",
    subtitle: "Prepare Your Scalp. Nourish Your Hair.",
    description: `Healthy hair begins with a healthy scalp. Repeated shampooing after conventional scalp treatments to remove product build-up can leave the scalp feeling stripped of its natural oils, making it more prone to dryness and discomfort.

HERBÈ Pre-Wash Scalp Treatment helps replenish moisture before cleansing, creating the ideal foundation for a healthier scalp and softer, stronger-looking hair.

Powered by a carefully selected blend of botanical oils and plant extracts, its lightweight formula helps nourish the scalp, condition the hair, and prepare both scalp and hair before cleansing without leaving behind a heavy or greasy feel.

Applied before shampooing, HERBÈ transforms wash day into a simple ritual of intentional care, leaving the scalp feeling refreshed while hair feels softer, smoother, healthier, and easier to manage after every wash.`,
    whyYoullLove: [
      "Nourishes the scalp before cleansing",
      "Helps replenish moisture before shampooing",
      "Helps prepare the scalp and hair for cleansing",
      "Leaves hair feeling softer and easier to manage",
      "Lightweight formula that rinses away easily",
      "Suitable for all hair types",
      "Crafted with carefully selected botanical ingredients",
    ],
    whyLabel: "Why You'll Love HERBÈ",
    tag: "Scalp Treatment",
    img: "/products/herbe.jpg",
  },
  {
    title: "VEIL Post-Wash Hair Serum",
    subtitle: "A Lightweight Finish. Everyday Protection.",
    description: `The care your hair receives after cleansing is just as important as the care it receives before. Freshly washed hair is more vulnerable to moisture loss, frizz, and heat damage.

VEIL Post-Wash Hair Serum is formulated to nourish and protect every strand while enhancing softness, smoothness, and natural shine without weighing it down.

Its lightweight dry oil formula absorbs effortlessly into damp or dry hair, smoothing the hair cuticle while creating a breathable protective layer around each strand to help shield against everyday heat styling.

The result is hair that feels silky, polished, beautifully manageable, and refreshed with every application, turning your routine into an indulgent sensory experience.

Designed for every hair texture, VEIL enhances your hair's natural character rather than masking it, leaving curls defined, waves soft and bouncy, and straight hair sleek with a luminous, healthy-looking finish.

A simple finishing ritual for hair that feels nourished, protected, and effortlessly refined.`,
    whyYoullLove: [
      "Lightweight, fast-absorbing dry oil formula",
      "Helps protect against everyday heat styling",
      "Helps reduce frizz",
      "Enhances softness, smoothness, and natural shine",
      "Leaves hair feeling silky without weighing it down",
      "Suitable for damp or dry hair",
      "Designed for all hair types and textures",
      "Crafted with carefully selected botanical ingredients",
    ],
    whyLabel: "Why You'll Love VEIL",
    tag: "Hair Serum",
    img: "/products/veil.jpg",
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-10 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Journal</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] tracking-tight">
          Read, slowly.
        </h1>
      </section>

      <section className="mx-auto max-w-3xl space-y-20 px-6 pb-24 md:pb-32">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            id={p.title.split(" ")[0].toLowerCase().replace(/[^a-z]/g, "")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.tag}</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{p.title}</h2>
              <p className="mt-3 text-lg italic text-gold/85">{p.subtitle}</p>
              <p className="mt-6 whitespace-pre-line text-[15px] leading-[1.85] text-white/75 md:text-base">
                {p.description}
              </p>
              <div className="mt-8">
                <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold">{p.whyLabel}</p>
                <ul className="space-y-2">
                  {p.whyYoullLove.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px] text-white/75">
                      <span className="mt-1 text-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
