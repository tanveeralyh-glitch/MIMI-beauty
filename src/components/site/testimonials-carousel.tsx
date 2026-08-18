"use client";

import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Khadija Faisal",
    product: "DEW — Barrier Repair Face Serum",
    stars: 5,
    quote:
      "I've actually been really happy with the face serum. I've struggled with random breakouts and acne for a while, so I was honestly a bit hesitant to try it. But my skin has been so much calmer since I started using it, and I've had way fewer breakouts. Even the marks from old acne are starting to look better. Definitely one of my favourite products from Mimi so far.",
  },
  {
    name: "Aitezaz Malik",
    product: "DEW — Barrier Repair Face Serum",
    stars: 5,
    quote:
      "I've been using Mimi for a few days now and I actually really like it. My skin feels so much softer and the glow is definitely there. I was a little unsure at first because I'm always scared of trying new products but so far it's been really good. Also the packaging is SO pretty.",
  },
  {
    name: "Meerab Bilal",
    product: "Full Ritual — Face, Hair & Body",
    stars: 5,
    quote:
      "I'm genuinely loving these products! The hair serum has made my hair feel so much softer and smoother, while the face serum gives such a fresh, dewy glow — skin bilkul fresh lagti hai. The body oil is honestly my favourite, it leaves the skin super soft and hydrated without that heavy, greasy feeling. And the scent is just next level, noticeable but not overpowering. Packaging is so pretty and gives such a luxurious feel. Overall, I'm really happy with everything and already excited for the next products.",
  },
  {
    name: "Haider Shah",
    product: "VEIL — Post Wash Hair Serum",
    stars: 5,
    quote:
      "Post wash hair serum bhi honestly kaafi acha laga. Hair ko smooth aur manageable feel karwata hai, aur frizz bhi kaafi control ho jata hai. Sabse achi baat ye hai ke hair oily ya heavy feel nahi hotay. I've been using it and the overall finish is very clean, nourishing yet lightweight and worth trying. 💗",
  },
];

// Duplicate for seamless looping
const CARDS = [...testimonials, ...testimonials];

function ReviewCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="testimonials-card relative flex-none w-[82vw] sm:w-[420px] md:w-[460px] flex flex-col rounded-2xl border border-[#C9A86A]/18 bg-[#0B1510] px-5 pt-6 pb-5 sm:px-7 sm:pt-8 sm:pb-7 shadow-[0_8px_48px_-12px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-[#C9A86A]/38"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-5 right-5 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-[#C9A86A]/40 to-transparent" />

      {/* Stars */}
      <div className="flex gap-1 mb-4 sm:mb-5">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#C9A86A] text-[#C9A86A]" />
        ))}
      </div>

      {/* Quote */}
      <p className="flex-1 text-[14px] sm:text-[15px] leading-[1.65] sm:leading-[1.75] text-[#F5F2EC]/80 font-light italic mb-6 sm:mb-8">
        "{t.quote}"
      </p>

      {/* Footer */}
      <div className="pt-4 sm:pt-5 border-t border-[#C9A86A]/12 flex flex-col gap-1">
        <p className="font-display text-[16px] sm:text-[18px] tracking-wide text-[#F5F2EC]">
          {t.name}
        </p>
        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A86A]/75">
          {t.product}
        </p>
      </div>
    </div>
  );
}

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Touch drag support
  const dragStart = useRef<number | null>(null);
  const dragOffset = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth <= 768) return;
    dragStart.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (window.innerWidth <= 768) return;
    if (dragStart.current === null || !trackRef.current) return;
    const delta = dragStart.current - e.touches[0].clientX;
    dragOffset.current += delta;
    dragStart.current = e.touches[0].clientX;
    // Apply offset via transform relative to current animation position
    const el = trackRef.current;
    const computed = getComputedStyle(el).transform;
    const matrix = new DOMMatrix(computed);
    el.style.transform = `translateX(${matrix.m41 - delta}px)`;
    el.style.animationPlayState = "paused";
  };
  const onTouchEnd = () => {
    if (window.innerWidth <= 768) return;
    if (trackRef.current) {
      trackRef.current.style.transform = "";
      trackRef.current.style.animationPlayState = "running";
    }
    dragStart.current = null;
    setPaused(false);
  };

  return (
    <section className="relative border-y border-[#C9A86A]/15 bg-[#07110D] overflow-hidden py-20 md:py-28">
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(201,168,106,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 mb-14 md:mb-20">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A86A]">
            Community
          </span>
          <h2
            className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.05] tracking-tight text-[#F5F2EC]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Words from our customers.
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#C9A86A] text-[#C9A86A]" />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F5F2EC]/45">
              5.0 · All verified customers
            </span>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div
        className="relative z-10 w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, #07110D, transparent)" }} />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, #07110D, transparent)" }} />

        <div
          ref={trackRef}
          className="testimonials-track flex gap-6 px-6 pb-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            animationName: "marqueeScroll",
            animationDuration: "38s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
            cursor: "grab",
          }}
        >
          {CARDS.map((t, i) => (
            <ReviewCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* CSS keyframes injected via style tag */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .testimonials-track {
            animation: none !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            width: auto !important;
            -webkit-overflow-scrolling: touch;
            cursor: default !important;
          }
          .testimonials-card {
            scroll-snap-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
