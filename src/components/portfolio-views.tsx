import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Media } from "@/components/media";
import type { Property } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function ProjectCard({
  property,
  className,
  tall,
  style,
}: {
  property: Property;
  className?: string | undefined;
  tall?: boolean | undefined;
  style?: React.CSSProperties | undefined;
}) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: property.slug }}
      className={cn("project-card group", className)}
      style={style}
      data-reveal-item
    >
      <div className="relative">
        <Media id={property.card} className={tall ? "aspect-[4/5]" : "aspect-[4/3]"} />
        <span className="card-arrow" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
        <div className="absolute left-4 top-4 z-[3] flex flex-wrap gap-2">
          <span className="tag border-transparent bg-background/85 text-foreground">
            {property.typeLabel}
          </span>
          {property.status !== "Active" && (
            <span className="status-badge bg-accent">
              {property.status === "Just completed" ? "New" : property.status}
            </span>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t pt-4">
        <h3 className="font-display text-2xl">{property.name}</h3>
        <span className="shrink-0 text-xs text-muted-foreground">{property.area}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{property.summary}</p>
    </Link>
  );
}

/** A typographic index of the portfolio; on desktop a preview image follows the cursor. */
export function PortfolioIndex({ items }: { items: Property[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setHovered(null)}
      className="border-b"
    >
      {items.map((p, i) => (
        <Link
          key={p.slug}
          to="/portfolio/$slug"
          params={{ slug: p.slug }}
          className="index-row"
          onMouseEnter={() => setHovered(p.slug)}
          data-reveal-item
        >
          <span className="font-display text-sm tabular-nums text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-3xl md:text-4xl">{p.name}</span>
          <span className="hidden text-sm text-muted-foreground md:block">{p.address}</span>
          <span className="hidden text-sm text-muted-foreground md:block">
            {p.type} · {p.city}
          </span>
          <span className="index-arrow grid h-11 w-11 place-items-center rounded-full border">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      ))}
      <div className="hidden md:block" aria-hidden="true">
        {items.map((p) => (
          <div
            key={p.slug}
            className={cn("index-preview", hovered === p.slug && "is-visible")}
            style={{ left: pos.x + 200, top: pos.y }}
          >
            <Media id={p.hero} fill reveal={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A horizontal reel. EditorialMotion pins it and drives it with vertical scroll on desktop. */
export function PortfolioReel({ items, intro }: { items: Property[]; intro: React.ReactNode }) {
  return (
    <section data-pin className="relative">
      <div className="reel-sticky py-20 md:py-0">
        <div className="mx-auto mb-10 w-full max-w-7xl px-6 md:mb-14 md:px-10">{intro}</div>
        <div className="reel-track" data-pin-track>
          {items.map((p, i) => (
            <Link
              key={p.slug}
              to="/portfolio/$slug"
              params={{ slug: p.slug }}
              className="project-card group relative block w-[80vw] shrink-0 md:w-[min(46vw,620px)]"
            >
              <div className="relative">
                <Media id={p.hero} className="aspect-[4/3] md:aspect-[16/11]" reveal={false} />
                <span className="card-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-display text-sm text-fern tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl">{p.name}</h3>
                <span className="ml-auto text-xs text-muted-foreground">
                  {p.type} · {p.area}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-12 hidden w-full max-w-7xl px-6 md:block md:px-10">
          <div className="reel-progress">
            <div />
          </div>
        </div>
      </div>
    </section>
  );
}
