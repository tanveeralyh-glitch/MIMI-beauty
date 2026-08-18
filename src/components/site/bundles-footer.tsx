import Link from "next/link";
import { Facebook, Instagram, Mail, ArrowUpRight } from "lucide-react";

const columns = [
  { title: "Shop", links: [["All products", "/shop"], ["Mimi Sets", "/bundles"], ["New arrivals", "/shop"]] },
  { title: "About", links: [["Our story", "/about"], ["Ingredients", "/about"], ["Journal", "/blog"]] },
  { title: "Help", links: [["Contact us", "/contact"], ["Shipping", "/contact"], ["FAQs", "/contact"]] },
];

export function BundlesFooter() {
  return (
    <footer className="border-t border-white/10 bg-background text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr] lg:gap-16">
          <div className="max-w-xs">
            <Link href="/bundles" className="font-serif text-3xl tracking-[0.22em]">MIMI</Link>
            <p className="mt-5 text-sm leading-6 text-[#D8D2C8]">Thoughtful beauty rituals for skin, hair, and body. Made to bring you back to yourself.</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{column.title}</h2>
                {column.links.map(([label, href]) => <Link key={label} href={href} className="text-sm text-[#D8D2C8] transition-colors hover:text-white">{label}</Link>)}
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Stay connected</h2>
            <p className="mt-4 text-sm leading-6 text-[#D8D2C8]">Notes on beauty, rituals, and the little things that make a difference.</p>
            <form className="mt-6 flex border-b border-white/20" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="bundles-email" className="sr-only">Email address</label>
              <input id="bundles-email" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-white/40" required />
              <button type="submit" aria-label="Subscribe to newsletter" className="transition-colors hover:text-gold"><ArrowUpRight className="size-5" /></button>
            </form>
            <div className="mt-6 flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold"><Instagram className="size-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold"><Facebook className="size-4" /></a>
              <a href="mailto:hello@mimibeauty.com" aria-label="Email Mimi Beauty" className="hover:text-gold"><Mail className="size-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MIMI Beauty. All rights reserved.</p>
          <p>Made with care, for your everyday.</p>
        </div>
      </div>
    </footer>
  );
}

export default BundlesFooter;
