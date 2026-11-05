import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Mail, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Media } from "@/components/media";
import { BrandLockup } from "@/components/brand-lockup";
import { useLockup } from "@/components/lockup-switcher";
import { Wordmark } from "@/components/wordmark";
import { CONTACT, properties, propertyTypes } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "About", to: "/about" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Services", to: "/services" },
] as const;

/** Kept for callers that still import LogoMark; renders the approved wordmark. */
export function LogoMark({
  light,
  className,
  layout,
}: {
  light?: boolean | undefined;
  className?: string | undefined;
  layout?: "horizontal" | "stacked";
}) {
  return <Wordmark layout={layout} className={cn(light && "text-primary-foreground", className)} />;
}

export function Logo({ light, slot = light ? "footer" : "header" }: { light?: boolean; slot?: "header" | "footer" }) {
  // The lockup only changes in the dev switcher; everywhere else this is the approved wordmark.
  const { id, light: lightMode } = useLockup(slot);
  return (
    <Link to="/" aria-label="Brickfield Group home" className="brand-link inline-flex">
      {id === "wordmark" || id === "none" ? (
        <LogoMark light={light} />
      ) : (
        <BrandLockup id={id} light={lightMode} reverse={Boolean(light)} className={cn(light && "text-primary-foreground")} />
      )}
    </Link>
  );
}

/** The oversized, faint mark under the footer. Follows the switcher's watermark slot. */
function FooterWatermark() {
  const { id, light } = useLockup("watermark");
  if (id === "none") return null;
  return (
    <div className="footer-wordmark" aria-hidden="true">
      {id === "wordmark" ? <Wordmark title="" /> : <BrandLockup id={id} light={light} reverse title="" fluid />}
    </div>
  );
}

function PortfolioMenu({ onNavigate }: { onNavigate: () => void }) {
  const [preview, setPreview] = useState(properties[0]?.slug);
  const current = properties.find((p) => p.slug === preview) ?? properties[0]!;
  return (
    <div className="mega-menu">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_1fr_1fr_minmax(0,1.3fr)]">
        {propertyTypes.map((type) => (
          <div key={type}>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              {type}
            </p>
            <ul className="mt-5 space-y-1">
              {properties
                .filter((p) => p.type === type)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/portfolio/$slug"
                      params={{ slug: p.slug }}
                      onClick={onNavigate}
                      onMouseEnter={() => setPreview(p.slug)}
                      onFocus={() => setPreview(p.slug)}
                      className="mega-link group"
                    >
                      <span className="font-display text-xl">{p.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.address}, {p.area}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <div className="hidden lg:block">
          <div className="relative aspect-[4/3] overflow-hidden">
            {properties.map((p) => (
              <div key={p.slug} className={cn("tab-image", p.slug === current.slug && "is-active")}>
                <Media id={p.hero} fill reveal={false} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {current.type} · {current.city}
            </p>
            <Link to="/portfolio" onClick={onNavigate} className="action action-solid">
              <span className="action-label">View portfolio</span>
              <span className="action-icon" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });
  const closeTimer = useRef<number>(undefined);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  return (
    <header
      className={cn(
        "site-header",
        scrolled && "is-scrolled",
        hidden && !megaOpen && !mobileOpen && "is-hidden",
        (megaOpen || mobileOpen) && "is-open",
      )}
      onKeyDown={(e) => e.key === "Escape" && (setMegaOpen(false), setMobileOpen(false))}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-10 lg:flex lg:justify-between lg:gap-6">
        <button
          type="button"
          className="round-btn order-1 justify-self-start lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <div className="order-2 justify-self-center lg:order-1">
          <Logo />
        </div>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 text-sm lg:order-2 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ className: "is-active" }}
            >
              {item.label}
            </Link>
          ))}
          <div onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button
              type="button"
              className={cn(
                "nav-link inline-flex items-center gap-1.5",
                (megaOpen || pathname.startsWith("/portfolio")) && "is-active",
              )}
              aria-expanded={megaOpen}
              aria-controls="portfolio-menu"
              onClick={() => setMegaOpen((o) => !o)}
            >
              Portfolio{" "}
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-500", megaOpen && "rotate-180")}
              />
            </button>
            {megaOpen && (
              <div id="portfolio-menu" onMouseEnter={openMega}>
                <PortfolioMenu onNavigate={() => setMegaOpen(false)} />
              </div>
            )}
          </div>
        </nav>
        <div className="order-3 flex items-center justify-self-end gap-3">
          <Link to="/contact" className="action action-solid hidden lg:inline-flex">
            <span className="action-label">Contact</span>
            <span className="action-icon" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          </Link>
          <Link to="/contact" className="round-btn lg:hidden" aria-label="Contact us">
            <Mail size={17} />
          </Link>
        </div>
      </div>
      {megaOpen && (
        <div
          className="mega-scrim hidden lg:block"
          onClick={() => setMegaOpen(false)}
          aria-hidden="true"
        />
      )}
      {mobileOpen &&
        createPortal(
          <nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-menu lg:hidden">
            <div className="px-6 pb-10 pt-4">
              {[
                ...navigation,
                { label: "Portfolio", to: "/portfolio" as const },
                { label: "Contact", to: "/contact" as const },
              ].map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="mobile-link"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="font-display text-4xl">{item.label}</span>
                  <ArrowUpRight size={20} />
                </Link>
              ))}
              <p className="eyebrow mt-10">
                <span className="eyebrow-rule" aria-hidden="true" />
                The portfolio
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {properties.map((p) => (
                  <Link
                    key={p.slug}
                    to="/portfolio/$slug"
                    params={{ slug: p.slug }}
                    className="text-muted-foreground"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>,
          document.body,
        )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-8 max-w-sm font-display text-3xl leading-tight">
              Patient capital. Long-term perspective.
            </p>
            <div className="mt-10 grid gap-6 text-sm sm:grid-cols-2">
              <div>
                <p className="text-primary-foreground/50">Address</p>
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-gold mt-2 block w-fit"
                >
                  {CONTACT.address}
                </a>
              </div>
              <div>
                <p className="text-primary-foreground/50">Contact</p>
                <a href={`mailto:${CONTACT.email}`} className="link-gold mt-2 block w-fit">
                  {CONTACT.email}
                </a>
                <a href={CONTACT.tel} className="link-gold mt-1 block w-fit">
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
              Navigation
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                ...navigation,
                { label: "Portfolio", to: "/portfolio" as const },
                { label: "Contact", to: "/contact" as const },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
              Portfolio
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {properties.map((p) => (
                <li key={p.slug}>
                  <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="link-gold">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-primary-foreground/15 py-6 text-xs text-primary-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Brickfield Group. All rights reserved.</p>
          <a
            href="https://fireflycapital.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="link-gold w-fit"
          >
            A subsidiary of Firefly Capital ↗
          </a>
          <p>Cape Town · Johannesburg</p>
        </div>
      </div>
      <FooterWatermark />
    </footer>
  );
}
