import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Brickfield Group" },
    { name: "description", content: "Contact Brickfield Group for property and operations enquiries. Find us at 35 Brickfield Road, Woodstock, Cape Town." },
    { property: "og:title", content: "Contact Brickfield Group" },
    { property: "og:description", content: "Talk to our team about spaces, commercial cleaning and security." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Contact,
});

function Contact() {
  return <main>
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:px-8 md:pt-24"><p className="text-xs uppercase text-fern">Contact Brickfield Group</p><h1 className="mt-6 font-display text-5xl md:text-7xl">Let’s talk.</h1><p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">A space for your business. A new purpose for a building. A conversation about the long term.</p></section>
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-2 md:gap-20 md:px-8 md:pb-24"><div className="space-y-8"><div className="border-t pt-6"><p className="flex items-center gap-3 text-xs uppercase text-fern"><Mail size={16} /> Email</p><a href="mailto:info@brickfieldgroup.co.za" className="mt-4 block break-words font-display text-2xl md:text-3xl">info@brickfieldgroup.co.za</a></div><div className="border-t pt-6"><p className="flex items-center gap-3 text-xs uppercase text-fern"><Phone size={16} /> Telephone</p><a href="tel:+27218307050" className="mt-4 block font-display text-3xl">021 830 7050</a></div><div className="border-t pt-6"><p className="flex items-center gap-3 text-xs uppercase text-fern"><MapPin size={16} /> Visit us</p><p className="mt-4 font-display text-2xl leading-relaxed">35 Brickfield Road<br />Woodstock, Cape Town</p><Button asChild variant="link" className="mt-3 px-0 text-fern"><a href="https://www.google.com/maps/search/?api=1&query=35+Brickfield+Road+Woodstock+Cape+Town" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight /></a></Button></div></div><div className="border-t pt-6"><p className="text-xs uppercase text-fern">Enquiries</p>{[
      ["Property & leasing", "Brickfield property and leasing enquiry", "Brickfield Canvas, 9 Loop Street and our wider portfolio."],
      ["Cleaning & security", "Brickfield cleaning and security enquiry", "Commercial cleaning and security for your business."],
      ["General enquiries", "Brickfield general enquiry", "Get in touch with the Brickfield team."],
    ].map(([title, subject, text]) => <a key={title} href={`mailto:info@brickfieldgroup.co.za?subject=${encodeURIComponent(subject ?? "Brickfield enquiry")}`} className="group flex items-center justify-between gap-6 border-b py-8"><div><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{text}</p></div><ArrowUpRight className="shrink-0 text-fern transition-transform group-hover:translate-x-1" size={21} /></a>)}</div></section>
  </main>;
}