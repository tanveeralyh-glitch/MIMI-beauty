"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Leaf, Droplet } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    href: "/blog",
    title: "Journal",
    description: "Thoughts, stories, and insights on skincare, self-care, and everything in between.",
    icon: BookOpen,
  },
  {
    href: "/brand-philosophy",
    title: "Brand Philosophy",
    description: "Our beliefs, our values, and our promise to you and the planet.",
    icon: Leaf,
  },
  {
    href: "/who-we-are",
    title: "Who We Are",
    description: "Our story, our values, and the care behind every Mimi Beauty formula.",
    icon: Droplet,
  },
];

export function ReadSlowlySection() {
  return (
    <section className="relative overflow-hidden bg-[#07110D] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 12% 20%, rgba(201,168,106,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.08] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Read Slowly,
            <br />
            Everything <em className="italic text-gold">Matters.</em>
          </motion.h2>

          <div className="my-8 flex items-center justify-center gap-4">
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-gold">
              <path d="M10 6H30" stroke="currentColor" strokeWidth="0.5" />
              <path d="M20 6C20 4 22 2 24 2C24 4 22 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 18 10 16 10C16 8 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 4 18 2 16 2C16 4 18 6 20 6Z" fill="currentColor" />
              <path d="M20 6C20 8 22 10 24 10C24 8 22 6 20 6Z" fill="currentColor" />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-xl text-[15px] md:text-[17px] leading-relaxed text-[#D8D2C8]/85"
          >
            Take a moment to understand what goes into our formulas, what we believe in, and what you're choosing for your skin.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="block h-full">
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="group relative flex h-full min-h-[240px] flex-col rounded-2xl border border-gold/20 bg-[#121A15] p-7 sm:p-8 text-left transition-colors hover:border-gold/50"
                >
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                  <h3
                    className="mt-8 text-2xl text-[#F5F2EC]"
                    style={{ fontFamily: "var(--font-cormorant, serif)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#D8D2C8]/80">
                    {card.description}
                  </p>
                  <ArrowRight className="mt-auto ml-auto h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                </motion.article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
