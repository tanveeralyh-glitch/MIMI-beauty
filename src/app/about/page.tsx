"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-[#F6F2EB]">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-32 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-[920px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 shrink-0 bg-gold sm:w-10" />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em] text-gold sm:text-[11px]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                The House of Mimi
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 }}
              className="mt-7 font-display text-[clamp(2.55rem,8.4vw,6.6rem)] font-medium uppercase leading-[0.92] tracking-[-0.02em]"
            >
              A quiet
              <br />
              obsession
              <br />
              with <span className="text-gold">skin.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-7 max-w-[36rem] text-[15px] leading-[1.75] text-[#F6F2EB]/72 sm:text-base md:text-lg"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              We design skincare that feels, repairs, and is intentional.
              <br className="hidden sm:block" /> It integrates seamlessly into your daily space.
            </motion.p>
          </div>
        </div>

      </section>

      {/* About Us */}
      <section className="relative pb-24 pt-10 md:pb-36 md:pt-16">
        <div className="mx-auto grid w-full max-w-[1600px] items-start gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-16 xl:gap-24 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="min-w-0"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-gold" />
              <p
                className="text-[10px] font-medium uppercase tracking-[0.42em] text-gold sm:text-[11px]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                About Us
              </p>
            </div>
            <h2 className="font-display text-[clamp(1.7rem,4.4vw,4.15rem)] font-medium uppercase leading-[1.12] tracking-[-0.015em] text-[#F6F2EB]">
              At Mimi Beauty,
              <br />
              we believe skincare should
              <br className="hidden sm:block" />
              feel effortless, luxurious,
              <br className="hidden sm:block" />
              and inspired by nature.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="min-w-0 space-y-7 text-[15px] font-light leading-[1.85] text-[#F6F2EB]/82 sm:text-[16px] md:space-y-8 md:text-[17px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <p>
              We design healing skincare that heals, repairs
              <br className="hidden md:block" /> and is intentional. It integrates seamlessly
              <br className="hidden md:block" /> into your daily space.
            </p>
            <p>
              Created in Pakistan, our collection is thoughtfully formulated with
              naturally derived ingredients to nourish your skin with lightweight, fast-
              absorbing care. Every product is designed to fit seamlessly into your
              daily collection while delivering effective, uncompromising results.
            </p>
            <p>
              As one of the first local brands to introduce a complete head-to-toe range of
              specialized dry oils, we&apos;re redefining modern skincare with formulas crafted for
              face, body, hair, and intimate areas.
            </p>
            <p>
              Our products are free from sulphates, parabens, silicones, and harsh synthetic
              additives because we believe what you leave out is just as important as what you
              put in.
            </p>
            <p className="pt-1 font-medium text-gold">Simple. Intentional. Naturally beautiful.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
