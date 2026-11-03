import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import {
  BeforeAfter,
  CtaPair,
  Eyebrow,
  Gallery,
  Marquee,
  PageHero,
  SectionIntro,
  StatFigure,
  StatRow,
  TabShowcase,
  ActionLink,
} from "@/components/editorial";
import { Media } from "@/components/media";
import { properties, type Block, type Property } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const wrap = "mx-auto max-w-7xl px-6 md:px-10";

function BlockView({ block, property }: { block: Block; property: Property }) {
  switch (block.type) {
    case "beforeAfter":
      return (
        <section className={cn(wrap, "py-24 md:py-36")}>
          <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <SectionIntro eyebrow={block.eyebrow} title={block.title} />
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
              {block.text}
            </p>
          </div>
          <BeforeAfter before={block.before} after={block.after} />
        </section>
      );
    case "gallery":
      return (
        <section className="py-24 md:py-32">
          <div
            className={cn(
              wrap,
              "mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end",
            )}
          >
            <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
            <p className="text-sm text-muted-foreground">Drag or use the arrows</p>
          </div>
          <Gallery media={block.media} />
        </section>
      );
    case "split":
      return (
        <section className={cn(wrap, "py-20 md:py-28")}>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className={cn(block.reverse && "md:order-2")}>
              <Media id={block.media} className="aspect-[4/5]" parallax={0.06} />
            </div>
            <div>
              <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
              {block.bullets && (
                <ul className="mt-9 space-y-4">
                  {block.bullets.map((b) => (
                    <li key={b} data-reveal-item className="flex items-start gap-4 border-t pt-4">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/25 text-fern">
                        <Check size={14} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {block.items && (
                <div className="mt-9 divide-y border-y">
                  {block.items.map((item) => (
                    <div
                      key={item.title}
                      data-reveal-item
                      className="grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6"
                    >
                      <h3 className="font-display text-xl">{item.title}</h3>
                      <p className="text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {block.stats && (
                <div className="mt-10 grid grid-cols-2 gap-6">
                  {block.stats.map((s) => (
                    <StatFigure key={s.label} stat={s} className="border-t pt-5" />
                  ))}
                </div>
              )}
              <div className="mt-10 flex flex-wrap gap-3">
                <ActionLink to="/contact" search={{ property: property.slug }} variant="outline">
                  Enquire
                </ActionLink>
                <ActionLink to="/contact" variant="text">
                  Contact
                </ActionLink>
              </div>
            </div>
          </div>
        </section>
      );
    case "tabs": {
      const dark = !!block.dark;
      return (
        <section
          className={cn(dark ? "bg-primary text-primary-foreground" : "bg-card", "py-24 md:py-32")}
        >
          <div className={wrap}>
            <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <Eyebrow light={dark} className={dark ? "!text-accent" : undefined}>
                  {block.eyebrow}
                </Eyebrow>
                <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-[3.4rem]">
                  {block.title}
                </h2>
              </div>
              {block.text && (
                <p
                  className={cn(
                    "max-w-md text-lg leading-relaxed md:justify-self-end",
                    dark ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {block.text}
                </p>
              )}
            </div>
            <TabShowcase tabs={block.tabs} dark={dark} />
          </div>
        </section>
      );
    }
    case "verticals":
      return (
        <section className={cn(wrap, "py-24 md:py-32")}>
          <div className="grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
              <Media id={block.media} className="mt-10 hidden aspect-[4/3] md:block" />
            </div>
            <div className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2">
              {block.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal-item
                  className="group bg-background p-8 transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="font-display text-sm text-fern transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "statGrid":
      return (
        <section className={cn(wrap, "py-24")}>
          <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
          <StatRow stats={block.stats} className="mt-14" />
        </section>
      );
    case "specs":
      return (
        <section className={cn(wrap, "py-24 md:py-32")}>
          <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
              <Media
                id={block.media}
                className="mt-10 hidden aspect-[4/5] md:block"
                parallax={0.05}
              />
            </div>
            <div>
              <dl className="spec-sheet">
                {property.specs.map((s) => (
                  <div key={s.label} className="spec-row" data-reveal-item>
                    <dt>{s.label}</dt>
                    <dd>
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-fern link-gold"
                        >
                          {s.value} <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        s.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              {property.highlights.length > 0 && (
                <div className="mt-14">
                  <Eyebrow>Highlights</Eyebrow>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {property.highlights.map((h) => (
                      <li
                        key={h}
                        data-reveal-item
                        className="flex items-start gap-3 rounded-sm bg-card p-4 text-sm leading-relaxed"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/30 text-fern">
                          <Check size={12} />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {property.tenants.length > 0 && (
                <div className="mt-14">
                  <Eyebrow>{property.tenants.length === 1 ? "Tenant" : "Tenants"}</Eyebrow>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {property.tenants.map((t) => (
                      <span key={t} className="tenant-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {property.external && (
                <div className="mt-14 flex flex-wrap gap-3">
                  {property.external.map((e, i) => (
                    <ActionLink key={e.href} href={e.href} variant={i === 0 ? "solid" : "text"}>
                      {e.label}
                    </ActionLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    case "compare":
      return (
        <section className="bg-card py-24 md:py-32">
          <div className={wrap}>
            <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} center />
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {block.columns.map((c) => (
                <div key={c.name} className="group bg-background p-6 md:p-8" data-reveal-item>
                  <div className="overflow-hidden">
                    <Media
                      id={c.media}
                      className="aspect-[16/10] transition-transform duration-[1.4s] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-8 font-display text-3xl">{c.name}</h3>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    {c.stats.map((st) => (
                      <StatFigure key={st.label} stat={st} className="border-t pt-5" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "marquee":
      return <Marquee items={block.items} className="border-y py-8" />;
  }
}

export function CaseStudy({ property }: { property: Property }) {
  const index = properties.findIndex((p) => p.slug === property.slug);
  const next = properties[(index + 1) % properties.length] ?? properties[0]!;

  return (
    <main>
      <PageHero
        eyebrow={`${property.address} · ${property.area}`}
        title={property.name}
        text={property.summary}
        tags={[property.typeLabel, property.area, property.city]}
        badge={
          property.status === "Active" ? undefined : (
            <span className="status-badge">
              {property.status === "Just completed" && <Sparkles size={12} />}
              {property.status === "Just completed" ? "New · Just completed" : property.status}
            </span>
          )
        }
        media={property.hero}
        actions={
          <>
            <ActionLink to="/contact" search={{ property: property.slug }}>
              Enquire
            </ActionLink>
            <ActionLink to="/portfolio" variant="text">
              All properties
            </ActionLink>
          </>
        }
      />

      <section className={cn(wrap, "py-16 md:py-20")}>
        <StatRow stats={property.facts} />
      </section>

      <Marquee
        items={[
          property.typeLabel,
          property.address,
          property.area,
          `Acquired ${property.acquired}`,
          ...property.tenants,
          "Held for the long term",
        ]}
        className="border-y py-6 text-muted-foreground"
      />

      {property.blocks.map((block, i) => (
        <BlockView key={i} block={block} property={property} />
      ))}

      <CtaPair
        media={property.hero}
        ctas={
          property.ctas.map((c) => ({
            title: c.title,
            text: c.text,
            actions: [
              {
                label: c.label,
                to: "/contact" as const,
                search: /viewing|visit/i.test(c.label)
                  ? { property: property.slug, topic: "Book a viewing" }
                  : { property: property.slug },
              },
              { label: "Portfolio", to: "/portfolio" as const },
            ],
          })) as never
        }
      />

      <Link
        to="/portfolio/$slug"
        params={{ slug: next.slug }}
        className="group relative block overflow-hidden"
      >
        <div className="relative h-[46vh] min-h-[320px]">
          <Media id={next.hero} fill reveal={false} parallax={0.08} bare />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
          <div
            className={cn(
              wrap,
              "absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 pb-10 text-primary-foreground",
            )}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-accent">Next property</p>
              <p className="mt-3 font-display text-5xl transition-transform duration-700 group-hover:translate-x-2 md:text-7xl">
                {next.name}
              </p>
            </div>
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary-foreground text-primary transition-transform duration-700 group-hover:rotate-45">
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
    </main>
  );
}
