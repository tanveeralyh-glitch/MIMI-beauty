"use client";

import { motion } from "framer-motion";

const paragraphs = [
  "Mimi Beauty is a premium Pakistani skincare brand built on a simple belief that the best care works with your body, not against it.",
  "We thoughtfully formulate products using naturally derived ingredients that support healthy skin, hair, and body care without complexity. Every formula is intentionally designed to deliver effective results while respecting your body's natural balance.",
  "Our collection is centered around fast-absorbing dry oil formulations that nourish deeply without leaving a heavy or greasy feel. From face and hair to body care, each product is designed to fit seamlessly into your daily routine while delivering purposeful, long-term care.",
  "At Mimi Beauty, we believe luxury is found in thoughtful formulation, honest ingredients, and products that truly deserve a place in your routine. We don't believe in creating more. We believe in creating better.",
  "This is more than skincare. It is a commitment to helping you care for yourself with intention, confidence, and simplicity.",
  "Working in harmony with nature, helping your body restore, protect, and strengthen from within.",
];

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Mimi Beauty</p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05]"
        >
          Who We Are
        </motion.h1>
        <div className="mt-10 space-y-6">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 48)} className="text-[16px] font-light leading-[1.85] text-white/80">
              {para}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
