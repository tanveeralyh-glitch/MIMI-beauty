import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · MIMIbeauty" },
      { name: "description", content: "Get in touch with MIMIbeauty. Concierge care, wholesale, and press enquiries." },
      { property: "og:title", content: "Contact · MIMIbeauty" },
      { property: "og:description", content: "Concierge care, wholesale, and press enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-32 pb-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Say hello</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] leading-[1] tracking-tight">Let's talk skin.</h1>
        <p className="mt-4 max-w-lg text-muted-foreground">Our concierge team replies within 24 hours. For urgent matters call our Paris studio directly.</p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {[
            { icon: MapPin, t: "Studio", b: "12 rue de Sévigné, Paris 75004" },
            { icon: Mail, t: "Email", b: "hello@mimibeauty.com" },
            { icon: Phone, t: "Concierge", b: "+33 1 42 00 00 00" },
          ].map((c, i) => (
            <motion.div key={c.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 rounded-2xl border border-border p-6">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold"><c.icon className="h-4 w-4" /></div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{c.t}</p>
                <p className="mt-1 font-display text-xl">{c.b}</p>
              </div>
            </motion.div>
          ))}
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <iframe
              title="MIMIbeauty studio"
              className="h-full w-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.3577%2C48.855%2C2.3677%2C48.860&layer=mapnik"
            />
          </div>
        </div>

        <form className="space-y-4 rounded-3xl border border-border p-8 md:p-10">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="First name" />
            <Field label="Last name" />
          </div>
          <Field label="Email" type="email" />
          <Field label="Subject" />
          <label className="block">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Message</span>
            <textarea rows={6} className="w-full resize-none rounded-xl border border-border bg-background/60 p-4 text-sm outline-none focus:border-gold" placeholder="Tell us about your skin story…" />
          </label>
          <button type="button" className="mt-2 w-full rounded-full bg-foreground py-4 text-sm text-background transition hover:bg-gold">Send message</button>
        </form>
      </section>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <input type={type} className="w-full rounded-full border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold" />
    </label>
  );
}
