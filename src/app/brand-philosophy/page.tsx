"use client";

import { motion } from "framer-motion";

const paragraphs = [
  "Your skin and hair were never meant to depend on products forever. They were designed to protect, heal, and thrive naturally.",
  "Many conventional products deliver quick, visible results by treating the surface rather than the root cause. Over time, harsh ingredients can weaken the skin barrier, damage the hair cuticle, and leave your skin and hair relying on continuous use instead of becoming healthier.",
  "At Mimi Beauty, we believe skincare and haircare should support your body's natural ability to restore itself, not replace it.",
  "Every formula is thoughtfully crafted with naturally derived ingredients that promote long-term skin, hair, and body health. Rather than offering temporary results, our products work with your body to nourish, repair, and strengthen from within.",
  "You will never find long ingredient lists or complicated routines at Mimi Beauty. Every ingredient is chosen with intention because we believe quality matters more than quantity.",
  "Every product has a purpose, every formula serves a function, and every step is designed to deliver meaningful care without complexity.",
  "We are not here to create dependency. We are here to help your skin, hair, and body become healthier, stronger, and more resilient with every use.",
  "Because true beauty is not about covering imperfections. It is about restoring balance, protecting what is already yours, and helping your natural beauty flourish.",
  "Your journey to healthier skin, stronger hair, and lasting body wellness begins with the choices you make today. Discover naturally derived care that restores, protects, and strengthens from within, because lasting beauty begins with lasting skin, hair, and body health.",
  "Choose care that restores, not conceals.",
  "Welcome to a new standard of naturally intentional beauty.",
  "Welcome to Mimi Beauty.",
];

export default function BrandPhilosophyPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Mimi Beauty</p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05]"
        >
          Brand Philosophy
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
