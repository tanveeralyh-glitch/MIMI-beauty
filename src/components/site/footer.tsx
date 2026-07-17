import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2 } from "lucide-react";
import { assets } from "@/lib/products";

export function Footer() {
  const groups = [
    { title: "Shop", links: [["Shop All", "/shop"], ["Collections", "/collections"], ["Ingredients", "/ingredients"], ["Skin Quiz", "/quiz"]] },
    { title: "Company", links: [["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"], ["FAQ", "/faq"]] },
    { title: "Support", links: [["Shipping", "/shipping"], ["Refund", "/refund"], ["Terms", "/terms"], ["Privacy", "/privacy"]] },
  ];
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-secondary/40 pt-20 grain">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-16 md:grid-cols-[1.4fr_repeat(3,1fr)_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={assets.logo} alt="MIMIbeauty" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-2xl">MIMI<span className="text-gold">beauty</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Ritualistic skincare crafted in small batches. Botanical actives, clinical results, quiet luxury.
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">ESTD · 2026</p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{g.title}</h4>
            <ul className="space-y-3 text-sm">
              {g.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-foreground/70 transition hover:text-foreground">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Newsletter</h4>
          <p className="mb-4 text-sm text-muted-foreground">Rituals, drops, and quiet things. No noise.</p>
          <form className="flex overflow-hidden rounded-full border border-border bg-background">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-transparent px-4 py-3 text-sm outline-none"
            />
            <button className="bg-gold px-5 text-sm font-medium text-background transition hover:bg-gold-soft">Join</button>
          </form>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Music2].map((I, i) => (
              <a key={i} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold" href="#" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © 2026 MIMIbeauty. Crafted with intention.
      </div>
    </footer>
  );
}
