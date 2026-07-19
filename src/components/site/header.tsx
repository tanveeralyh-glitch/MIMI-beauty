import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/lib/cart";
import { assets } from "@/lib/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Product" },
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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:py-5">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-start lg:hidden text-foreground/80 hover:text-foreground"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Centered Logo on Mobile, Left on Desktop */}
          <Link to="/" className="flex items-center justify-center gap-3 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <img src="/logo.png" alt="Mimi Beauty." className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover shadow-sm" />
            <span className="font-script text-3xl leading-none text-gold md:text-4xl lg:text-5xl">
              Mimi Beauty.
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden justify-center gap-8 text-sm lg:flex flex-1 ml-12">
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

          {/* Action Icons */}
          <div className="flex items-center gap-2 justify-end">
            <button className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground md:grid" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden h-10 w-10 place-items-center rounded-full text-foreground/70 hover:text-foreground md:grid" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </button>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5 md:h-5 md:w-5" />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-background">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 md:py-5">
              <div className="w-10" />
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <span className="font-script text-3xl leading-none text-gold md:text-4xl">Mimi Beauty.</span>
              </Link>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-end text-foreground/70 hover:text-foreground">
                <X className="h-7 w-7" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-col items-center justify-center gap-8 h-[60vh]"
            >
              {nav.map((n) => (
                <motion.div
                  key={n.to}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block font-display text-4xl tracking-tight text-foreground/90 hover:text-gold active:scale-95 transition-all"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-0 right-0 flex justify-center gap-8"
            >
              <Link to="/shop" onClick={() => setOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors">Shop</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors">Story</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors">Contact</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
