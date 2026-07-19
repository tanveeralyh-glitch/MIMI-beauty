import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/lib/cart";
import { assets } from "@/lib/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="relative z-50 overflow-hidden border-b border-border/60 bg-foreground text-background">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-[11px] uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-16 px-8">
              <span>Complimentary shipping over $75</span>
              <span>·</span>
              <span>Dermatologist tested</span>
              <span>·</span>
              <span>Cruelty free & vegan</span>
              <span>·</span>
              <span>New: Hálo body oil</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "var(--background)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4 md:py-5">
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="MIMI BEAUTY" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-lg tracking-[0.2em] md:text-xl">
              MIMI <span className="text-gold">BEAUTY</span>
            </span>
          </Link>

          <nav className="hidden justify-center gap-8 text-sm lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group relative py-1 text-foreground/80 transition hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 justify-self-end">
            <button className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground md:grid" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground md:grid" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-background">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="ml-1 grid h-10 w-10 place-items-center rounded-full text-foreground/70 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-xl tracking-[0.2em]">MIMI <span className="text-gold">BEAUTY</span></span>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col gap-2 px-8 pt-8"
            >
              {nav.map((n) => (
                <motion.div
                  key={n.to}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block font-display text-4xl tracking-tight text-foreground/90 hover:text-gold"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
