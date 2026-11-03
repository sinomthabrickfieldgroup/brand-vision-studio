import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { HeroSlideshow, type Slide } from "@/components/hero-slideshow";
import { Media } from "@/components/media";
import { hasImage, type MediaId } from "@/lib/media";
import type { Item, Stat } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/* ─── Type ──────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
  light,
}: {
  children: ReactNode;
  className?: string | undefined;
  light?: boolean | undefined;
}) {
  return (
    <p className={cn("eyebrow", light && "text-primary-foreground/70", className)}>
      <span className="eyebrow-rule" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text,
  center,
  className,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  center?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <Eyebrow className={center ? "justify-center" : undefined}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-balance font-display text-4xl leading-[1.05] md:text-[3.4rem]">
        {title}
      </h2>
      {text && (
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{text}</p>
      )}
      {children}
    </div>
  );
}

/* ─── Links & buttons ───────────────────────────────────────────────────── */

type Target =
  | {
      to: LinkProps["to"];
      params?: LinkProps["params"];
      search?: Record<string, string> | undefined;
      href?: never;
    }
  | { href: string; to?: never; params?: never; search?: never };

export function ActionLink({
  children,
  variant = "solid",
  className,
  ...target
}: Target & {
  children: ReactNode;
  variant?: "solid" | "outline" | "text" | "light";
  className?: string | undefined;
}) {
  const classes = cn("action", `action-${variant}`, className);
  const inner = (
    <>
      <span className="action-label">{children}</span>
      <span className="action-icon" aria-hidden="true">
        <ArrowUpRight size={16} />
      </span>
    </>
  );
  if (target.href) {
    const external = target.href.startsWith("http");
    return (
      <a
        href={target.href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={target.to!}
      params={target.params as never}
      search={target.search as never}
      className={classes}
    >
      {inner}
    </Link>
  );
}

/* ─── Numbers ───────────────────────────────────────────────────────────── */

export function StatFigure({
  stat,
  className,
  light,
}: {
  stat: Stat;
  className?: string | undefined;
  light?: boolean | undefined;
}) {
  return (
    <div className={cn("stat", className)}>
      <div className="stat-value font-display leading-none tracking-tight" data-count={stat.value}>
        {stat.value}
      </div>
      <div
        className={cn(
          "mt-4 text-sm font-medium",
          light ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {stat.label}
      </div>
      {stat.text && (
        <p
          className={cn(
            "mt-1.5 text-sm",
            light ? "text-primary-foreground/60" : "text-muted-foreground",
          )}
        >
          {stat.text}
        </p>
      )}
    </div>
  );
}

export function StatRow({
  stats,
  light,
  className,
}: {
  stats: Stat[];
  light?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4", className)}>
      {stats.map((s) => (
        <StatFigure
          key={s.label}
          stat={s}
          light={light}
          className={cn("border-t pt-6", light && "border-primary-foreground/20")}
        />
      ))}
    </div>
  );
}

/* ─── Marquee ───────────────────────────────────────────────────────────── */

const DEFAULT_SUBLINE = [
  "Cape Town",
  "Johannesburg",
  "Since 2009",
  "Held for the long term",
  "Operated in-house",
  "Patient capital",
];

/**
 * An editorial ticker: a large serif line drifting one way and a small tracked line drifting
 * the other. It speeds up with scroll velocity and settles back, pauses off screen, and is a
 * static, wrapped list for reduced motion.
 */
export function Marquee({
  items,
  subline = DEFAULT_SUBLINE,
  className,
}: {
  items: string[];
  subline?: string[] | undefined;
  className?: string | undefined;
}) {
  const root = useRef<HTMLDivElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-live");
    let visible = false;
    let raf = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let boost = 0;
    let xa = 0;
    let xb = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else cancelAnimationFrame(raf);
    });
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const y = window.scrollY;
      const v = (y - lastY) / Math.max(dt, 0.001);
      lastY = y;
      boost += (Math.max(-1600, Math.min(1600, v)) * 0.06 - boost) * 0.08;
      const wa = (rowA.current?.scrollWidth ?? 0) / 4;
      const wb = (rowB.current?.scrollWidth ?? 0) / 4;
      xa -= (22 + Math.abs(boost) * 0.7) * dt;
      xb += (14 + Math.abs(boost) * 0.4) * dt;
      if (wa) xa = ((xa % wa) - wa) % wa;
      if (wb) xb = ((xb % wb) - wb) % wb;
      if (rowA.current) rowA.current.style.transform = `translate3d(${xa.toFixed(2)}px,0,0)`;
      if (rowB.current) rowB.current.style.transform = `translate3d(${xb.toFixed(2)}px,0,0)`;
      if (visible) raf = requestAnimationFrame(tick);
    };
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.classList.remove("is-live");
    };
  }, []);

  const set = (list: string[], big: boolean, dup = false) =>
    list.map((item, i) => (
      <span
        key={item + i + String(dup)}
        className={cn("ticker-item", big && i % 2 === 1 && "is-italic", dup && "ticker-dup")}
      >
        {item}
        <span className={big ? "ticker-brick" : "ticker-dot"} aria-hidden="true" />
      </span>
    ));

  return (
    <div ref={root} className={cn("ticker", className)}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="ticker-line ticker-line-a" aria-hidden="true">
        <div ref={rowA} className="ticker-track">
          {set(items, true)}
          {[1, 2, 3].map((k) => (
            <Fragment key={k}>{set(items, true, true)}</Fragment>
          ))}
        </div>
      </div>
      <div className="ticker-line ticker-line-b" aria-hidden="true">
        <div ref={rowB} className="ticker-track">
          {set(subline, false)}
          {[1, 2, 3].map((k) => (
            <Fragment key={k}>{set(subline, false, true)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Gallery carousel ──────────────────────────────────────────────────── */

export function Gallery({ media, className }: { media: MediaId[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      const first = el.children[0] as HTMLElement | undefined;
      if (first) setIndex(Math.round(el.scrollLeft / (first.offsetWidth + 20)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Drag to scroll with a mouse; touch uses native scrolling.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.classList.add("is-dragging");
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const up = () => {
      dragging = false;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (el && first) el.scrollBy({ left: dir * (first.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <div className={cn("gallery", className)}>
      <div
        ref={track}
        className="gallery-track"
        tabIndex={0}
        aria-label="Image gallery, scroll horizontally"
      >
        {media.map((id, i) => (
          <div key={id} className={cn("gallery-slide", i % 3 === 1 && "md:mt-16")}>
            <Media id={id} className="gallery-media" caption />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl items-center gap-6 px-6 md:px-10">
        <span className="font-display text-sm tabular-nums text-muted-foreground">
          {String(Math.min(index + 1, media.length)).padStart(2, "0")} /{" "}
          {String(media.length).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-border">
          <div
            className="h-px origin-left bg-foreground transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="round-btn"
            aria-label="Previous image"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="round-btn"
            aria-label="Next image"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Before / after ────────────────────────────────────────────────────── */

export function BeforeAfter({ before, after }: { before: MediaId; after: MediaId }) {
  const [value, setValue] = useState(50);
  const root = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  // One gentle sweep the first time it scrolls into view, hinting that it can be dragged.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          if (touched.current) return;
          const p = Math.min((t - start) / 2200, 1);
          setValue(50 + Math.sin(p * Math.PI * 2) * 18 * (1 - p));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="before-after" style={{ ["--split" as string]: `${value}%` }}>
      <Media id={after} fill reveal={false} />
      <div className="before-after-before">
        <Media id={before} fill reveal={false} />
      </div>
      <div className="before-after-handle" aria-hidden="true">
        <span>
          <ArrowLeft size={14} />
          <ArrowRight size={14} />
        </span>
      </div>
      <span className="before-after-label left-5">Before</span>
      <span className="before-after-label right-5">After</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => {
          touched.current = true;
          setValue(Number(e.target.value));
        }}
        aria-label="Compare before and after"
        className="before-after-range"
      />
    </div>
  );
}

/* ─── Tabbed showcase ───────────────────────────────────────────────────── */

export function TabShowcase({
  tabs,
  dark,
}: {
  tabs: (Item & { label: string; media: MediaId })[];
  dark?: boolean | undefined;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const DURATION = 6000;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % tabs.length), DURATION);
    return () => window.clearTimeout(t);
  }, [active, paused, inView, tabs.length]);

  const current = tabs[active] ?? tabs[0]!;
  return (
    <div
      ref={root}
      className="grid items-stretch gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex flex-col">
        <div role="tablist" aria-label="Features" className="flex flex-wrap gap-2">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn("tab-chip", dark && "tab-chip-dark", i === active && "is-active")}
            >
              {tab.label}
              {i === active && !paused && inView && (
                <span
                  key={active}
                  className="tab-chip-progress"
                  style={{ animationDuration: `${DURATION}ms` }}
                />
              )}
            </button>
          ))}
        </div>
        <div key={active} role="tabpanel" className="tab-panel mt-10 md:mt-auto">
          <p
            className={cn("font-display text-sm tabular-nums", dark ? "text-accent" : "text-fern")}
          >
            {String(active + 1).padStart(2, "0")} — {current.label}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{current.title}</h3>
          <p
            className={cn(
              "mt-4 max-w-md text-lg leading-relaxed",
              dark ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            {current.text}
          </p>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        {tabs.map((tab, i) => (
          <div
            key={tab.label}
            className={cn("tab-image", i === active && "is-active")}
            aria-hidden={i !== active}
          >
            <Media id={tab.media} fill reveal={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Closing CTA pair ──────────────────────────────────────────────────── */

export interface Cta {
  title: string;
  text: string;
  actions: {
    label: string;
    to?: LinkProps["to"];
    href?: string;
    search?: Record<string, string>;
  }[];
}

export function CtaPair({ ctas, media }: { ctas: [Cta, Cta]; media?: MediaId }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      {media && (
        <div className="absolute inset-0 -z-10 opacity-35">
          <Media id={media} fill reveal={false} parallax={0.12} bare />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
        </div>
      )}
      <div className="mx-auto grid max-w-7xl gap-px px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
        {ctas.map((cta, i) => (
          <div
            key={cta.title}
            className={cn(
              "py-6 md:py-0",
              i === 1 &&
                "border-t border-primary-foreground/15 pt-12 md:border-l md:border-t-0 md:pl-14 md:pt-0",
            )}
          >
            <h2 className="font-display text-4xl md:text-5xl">{cta.title}</h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-primary-foreground/70">
              {cta.text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {cta.actions.map((a, j) =>
                a.href ? (
                  <ActionLink
                    key={a.label}
                    href={a.href}
                    variant={j === 0 ? "light" : "text"}
                    className={j === 1 ? "text-primary-foreground" : undefined}
                  >
                    {a.label}
                  </ActionLink>
                ) : (
                  <ActionLink
                    key={a.label}
                    to={a.to!}
                    search={a.search}
                    variant={j === 0 ? "light" : "text"}
                    className={j === 1 ? "text-primary-foreground" : undefined}
                  >
                    {a.label}
                  </ActionLink>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Page hero ─────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  text,
  media,
  actions,
  tags,
  badge,
  slides,
  slidesEyebrow,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  media: MediaId;
  actions?: ReactNode;
  tags?: string[];
  badge?: ReactNode;
  slides?: Slide[] | undefined;
  slidesEyebrow?: string | undefined;
}) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-8 md:px-10 md:pb-20 md:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          {badge}
        </div>
        <div className="mt-5 grid items-end gap-5 md:mt-7 md:gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <h1 className="hero-title text-balance font-display text-[2.5rem] leading-[1] tracking-[-0.02em] sm:text-[3.2rem] md:text-[5.6rem]">
            {title}
          </h1>
          <div>
            {tags && (
              <div className="mb-4 hidden flex-wrap gap-2 sm:flex md:mb-6">
                {tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {text}
            </p>
            {actions && <div className="mt-5 flex flex-wrap gap-3 md:mt-8">{actions}</div>}
          </div>
        </div>
      </div>
      <div className="hero-media-wrap" data-expand>
        {slides && slides.filter((s) => hasImage(s.id)).length > 0 ? (
          <HeroSlideshow slides={slides.filter((s) => hasImage(s.id))} eyebrow={slidesEyebrow} />
        ) : (
          <Media id={media} fill reveal={false} parallax={0.1} priority />
        )}
      </div>
    </section>
  );
}
