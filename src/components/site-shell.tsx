import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "About", to: "/about" },
  { label: "Brickfield Canvas", to: "/brickfield-canvas" },
  { label: "9 Loop Street", to: "/loop-street" },
  { label: "Contact", to: "/contact" },
] as const;

export function Logo() {
  return <Link to="/" aria-label="Brickfield Group home" className="brand-link flex flex-wrap items-baseline gap-x-2 leading-none"><span className="font-sans text-lg">BRICKFIELD</span><span className="font-sans text-lg text-accent">GROUP</span></Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-8">
      <Logo />
      <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm lg:flex">{navigation.map(item => <Link key={item.to} to={item.to} className="link-gold py-1" activeProps={{ className: "text-fern" }}>{item.label}</Link>)}</nav>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav aria-label="Mobile navigation" className="editorial-menu border-t px-6 pb-6 lg:hidden">{navigation.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block border-b py-4 text-base" activeProps={{ className: "text-fern" }}>{item.label}</Link>)}</nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t"><div className="mx-auto max-w-6xl px-6 py-14 md:px-8"><div className="flex flex-col justify-between gap-10 md:flex-row"><Logo /><div className="space-y-3 text-sm text-muted-foreground"><p>35 Brickfield Road, Woodstock, Cape Town</p><a className="block link-gold w-fit" href="mailto:info@brickfieldgroup.co.za">info@brickfieldgroup.co.za</a><a className="block" href="tel:+27218307050">021 830 7050</a></div><Link to="/contact" className="flex h-fit items-center gap-3 text-sm">Let’s talk <ArrowUpRight size={17} /></Link></div><p className="mt-12 border-t pt-5 text-xs text-muted-foreground">Brickfield Group · Patient capital. Long-term perspective.</p></div></footer>;
}