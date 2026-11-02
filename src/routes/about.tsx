import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Brickfield Group" },
    { name: "description", content: "Meet Brickfield Group: patient capital, adaptive reuse and a long-term approach to property in Cape Town and Johannesburg." },
    { property: "og:title", content: "About Brickfield Group" },
    { property: "og:description", content: "A property holding company building spaces and businesses for the long term." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: About,
});

function About() {
  return <main>
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:px-8 md:pb-24 md:pt-24"><p className="text-xs uppercase text-fern">About Brickfield Group</p><h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight md:text-7xl">Built on a long-term perspective.</h1><div className="mt-8 h-px w-24 bg-accent" /><p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">We are a property holding company backed by patient capital. For more than 15 years, we have focused on disciplined adaptive reuse and precinct development in Cape Town and Johannesburg.</p></section>
    <section className="border-y"><div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:px-8"><p className="text-xs uppercase text-fern">Our approach</p><div><h2 className="font-display text-3xl md:text-4xl">We build and hold spaces that work for the long term.</h2><div className="mt-10 grid gap-8 md:grid-cols-2"><div><h3 className="font-display text-2xl">Old buildings. New purpose.</h3><p className="mt-4 leading-relaxed text-muted-foreground">Adaptive reuse is our craft. We find old buildings and give them new purpose, with a focus on the people and businesses that use them.</p></div><div><h3 className="font-display text-2xl">Patient capital.</h3><p className="mt-4 leading-relaxed text-muted-foreground">We hold for the long term and build value. Long-term tenancy is the goal: we thrive when our tenants thrive and stay.</p></div></div></div></div></section>
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24"><p className="text-xs uppercase text-fern">Operations</p><h2 className="mt-5 max-w-3xl font-display text-4xl md:text-5xl">Real businesses, not just buildings.</h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Since 2019 we have run our own cleaning and security teams. They are revenue-generating businesses built on the property base.</p><div className="mt-12 grid gap-10 md:grid-cols-2"><div className="border-t pt-6"><span className="text-xs text-accent">01</span><h3 className="mt-4 font-display text-3xl">Cleaning</h3><p className="mt-4 text-muted-foreground">In-house commercial cleaning available to third-party clients.</p></div><div className="border-t pt-6"><span className="text-xs text-accent">02</span><h3 className="mt-4 font-display text-3xl">Security</h3><p className="mt-4 text-muted-foreground">Trained teams that scale with the portfolio.</p></div></div><Button asChild variant="outline" className="mt-10 h-12"><Link to="/contact">Talk to our team <ArrowUpRight /></Link></Button></section>
    <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:px-8"><h2 className="max-w-lg font-display text-3xl md:text-4xl">The Canvas transformation is the proof.</h2><Link to="/brickfield-canvas" className="inline-flex items-center gap-3 text-accent">Explore Brickfield Canvas <ArrowUpRight size={18} /></Link></div></section>
  </main>;
}