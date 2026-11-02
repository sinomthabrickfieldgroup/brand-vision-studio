import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CaseStudyProps {
  name: string;
  location: string;
  category: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: { title: string; text: string }[];
  next: { name: string; to: "/brickfield-canvas" | "/loop-street" };
}

export function CaseStudy(props: CaseStudyProps) {
  return <main>
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:px-8 md:pt-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft size={15} /> All projects</Link>
      <div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs uppercase text-fern">{props.category} · {props.location}</p><h1 className="mt-4 font-display text-5xl md:text-7xl">{props.name}</h1></div><p className="text-sm text-muted-foreground">The Brickfield portfolio</p></div>
    </section>
    <figure className="mx-auto max-w-7xl"><img src={props.image} alt={props.imageAlt} className="aspect-[4/3] w-full object-cover md:aspect-[16/8]" /><figcaption className="px-6 py-4 text-xs text-muted-foreground md:px-8">{props.name} · {props.location}</figcaption></figure>
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:px-8 md:py-24"><p className="text-xs uppercase text-fern">The project</p><div><h2 className="font-display text-3xl leading-snug md:text-4xl">{props.introduction}</h2><div className="mt-12 grid gap-10 md:grid-cols-2">{props.sections.map(section => <div key={section.title} className="border-t pt-6"><h3 className="font-display text-2xl">{section.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{section.text}</p></div>)}</div></div></section>
    <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-8"><div><p className="text-xs text-accent">SPACE ENQUIRIES</p><h2 className="mt-3 font-display text-3xl">Find your place at {props.name}.</h2></div><Button asChild variant="outline" className="h-12 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/contact">Get in touch <ArrowUpRight /></Link></Button></div></section>
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-8"><Link to={props.next.to} className="group flex items-center justify-between gap-6 border-t py-7"><div><p className="text-xs text-muted-foreground">NEXT PROJECT</p><p className="mt-3 font-display text-3xl">{props.next.name}</p></div><ArrowUpRight className="text-fern transition-transform group-hover:translate-x-1" /></Link></div>
  </main>;
}