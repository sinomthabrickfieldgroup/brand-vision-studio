import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionLink, CtaPair, PageHero, SectionIntro, StatFigure } from "@/components/editorial";
import { PortfolioIndex, ProjectCard } from "@/components/portfolio-views";
import { portfolioTotals, properties, propertyTypes, type PropertyType } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio, Brickfield Group" },
      {
        name: "description",
        content:
          "Mixed-use, office and industrial properties in Cape Town and Johannesburg, held for the long term and managed by our own team.",
      },
      { property: "og:title", content: "A portfolio built on patient capital" },
      {
        property: "og:description",
        content: "Fifteen years of disciplined adaptive reuse across Cape Town and Johannesburg.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [filter, setFilter] = useState<PropertyType | "All">("All");
  const [changed, setChanged] = useState(false);
  const visible = filter === "All" ? properties : properties.filter((p) => p.type === filter);

  return (
    <main>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            A portfolio built on <em>patient capital</em>
          </>
        }
        text="Fifteen years of disciplined adaptive reuse across Cape Town's industrial and mixed-use precincts, and beyond. Every property is held for the long term and managed by our own team."
        media="precinct"
        slidesEyebrow="The portfolio"
        slides={[
          { id: "canvasHero", label: "Brickfield Canvas", slug: "brickfield-canvas" },
          { id: "loopHero", label: "9 Loop Street", slug: "9-loop-street" },
          { id: "albertHero", label: "219 Albert Road", slug: "219-albert-road" },
          { id: "montagueHero", label: "24 Montague", slug: "24-montague" },
          { id: "wierdaHero", label: "66/68 Wierda", slug: "66-68-wierda" },
          { id: "callHero", label: "Brickfield Call Centre", slug: "brickfield-call-centre" },
        ]}
        actions={
          <>
            <ActionLink href="#properties">Explore</ActionLink>
            <ActionLink to="/contact" variant="text">
              Contact
            </ActionLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro
            eyebrow="Track record"
            title="Real numbers from the portfolio"
            text="We hold property for the long term. The data reflects that discipline."
          />
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {[
              { value: `${portfolioTotals.gla.toLocaleString("en-US")}m²`, label: "Total GLA" },
              { value: String(portfolioTotals.count), label: "Properties in the portfolio" },
              { value: String(portfolioTotals.cities), label: "Cities where we operate" },
              { value: "100%", label: "Occupancy across the portfolio" },
            ].map((s) => (
              <StatFigure key={s.label} stat={s} className="border-t pt-6" />
            ))}
          </div>
        </div>
      </section>

      <section
        id="properties"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 md:px-10 md:pb-32"
      >
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro eyebrow="Properties" title="Every building, held and operated" />
          <div role="group" aria-label="Filter by property type" className="flex flex-wrap gap-2">
            {(["All", ...propertyTypes] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setFilter(t);
                  setChanged(true);
                }}
                aria-pressed={filter === t}
                className={cn("tab-chip", filter === t && "is-active")}
              >
                {t}
                <span className="ml-2 text-xs opacity-60">
                  {t === "All" ? properties.length : properties.filter((p) => p.type === t).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div key={filter} className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard
              key={p.slug}
              property={p}
              tall={i % 3 === 1}
              className={cn(changed && "filter-in", i % 3 === 1 && "lg:mt-20")}
              style={changed ? { animationDelay: `${i * 70}ms` } : undefined}
            />
          ))}
        </div>
      </section>

      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionIntro
            eyebrow="Index"
            title="The portfolio at a glance"
            text="Hover a row for a look at the building."
          />
          <div className="mt-14">
            <PortfolioIndex items={properties} />
          </div>
        </div>
      </section>

      <CtaPair
        media="canvasHero"
        ctas={[
          {
            title: "Talk to us",
            text: "We can walk you through the portfolio and arrange viewings for qualified tenants and brokers.",
            actions: [{ label: "Contact", to: "/contact" }],
          },
          {
            title: "See it",
            text: "The numbers tell one story. The buildings tell another. Come and see them for yourself.",
            actions: [
              {
                label: "Book a viewing",
                href: "mailto:info@brickfieldgroup.co.za?subject=Viewing%20request",
              },
            ],
          },
        ]}
      />
    </main>
  );
}
