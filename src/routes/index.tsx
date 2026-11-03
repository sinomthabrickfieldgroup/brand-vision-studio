import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  ActionLink,
  BeforeAfter,
  CtaPair,
  Eyebrow,
  Marquee,
  SectionIntro,
  StatFigure,
} from "@/components/editorial";
import { Media } from "@/components/media";
import { PortfolioReel } from "@/components/portfolio-views";
import type { MediaId } from "@/lib/media";
import { properties } from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brickfield Group — Patient capital, adaptive reuse" },
      {
        name: "description",
        content:
          "Fifteen years of disciplined adaptive reuse and precinct development in Cape Town and Johannesburg.",
      },
      { property: "og:title", content: "Brickfield Group" },
      {
        property: "og:description",
        content: "We build and hold spaces that work for the long term.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars: {
  title: string;
  text: string;
  media: MediaId;
  to: "/portfolio" | "/about" | "/services";
  label: string;
}[] = [
  {
    title: "Adaptive reuse is our craft",
    text: "We find old buildings and give them new purpose.",
    media: "heritageDetail",
    to: "/portfolio",
    label: "Portfolio",
  },
  {
    title: "Patient capital means no short-term pressure",
    text: "We hold for the long term and build value.",
    media: "aboutHero",
    to: "/about",
    label: "About",
  },
  {
    title: "Long-term tenancy is the goal",
    text: "We thrive when our tenants thrive and stay.",
    media: "canvasCourtyard",
    to: "/services",
    label: "Services",
  },
];

function Index() {
  const canvas = properties[0]!;
  return (
    <main>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
          <Eyebrow>Patient capital · Cape Town & Johannesburg</Eyebrow>
          <h1 className="hero-title mt-7 max-w-6xl text-balance font-display text-[3.1rem] leading-[0.98] tracking-[-0.025em] md:text-[6.4rem]">
            15+ years of disciplined <em>adaptive reuse</em> and precinct development
          </h1>
          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              We are a property holding company backed by patient capital. We build and hold spaces
              that work for the long term.
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionLink to="/portfolio">Explore the portfolio</ActionLink>
              <ActionLink to="/about" variant="text">
                About us
              </ActionLink>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="hero-media-wrap" data-expand>
            <Media id="canvasHero" fill reveal={false} parallax={0.1} priority />
            <div className="absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-[3] flex items-end justify-between text-white md:bottom-10 md:left-10 md:right-10">
              <p className="text-sm">
                <span className="opacity-70">Featured · </span>Brickfield Canvas, Woodstock
              </p>
              <Link
                to="/portfolio/$slug"
                params={{ slug: canvas.slug }}
                className="hidden items-center gap-2 text-sm md:inline-flex"
              >
                View the precinct <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -bottom-24 right-6 z-10 hidden w-[22vw] max-w-[320px] md:block md:right-10"
            data-parallax="-0.12"
          >
            <Media id="canvasCafe" className="aspect-[3/4] shadow-2xl" />
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Adaptive reuse",
          "Precinct development",
          "Patient capital",
          "Woodstock",
          "Maitland",
          "Sandton",
          "Operated in-house",
        ]}
        className="mt-20 py-10 md:mt-32"
      />

      {/* Numbers */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionIntro
              eyebrow="Numbers"
              title="The record is clear, and it is real"
              text="We don't trade on promises. We hold property, we fill it, and we keep it filled."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink to="/portfolio" variant="outline">
                Portfolio
              </ActionLink>
              <ActionLink to="/contact" variant="text">
                Contact
              </ActionLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {[
              {
                value: "100%",
                label: "Occupancy rate",
                text: "Canvas fully tenanted since June 2022.",
              },
              {
                value: "15+",
                label: "Years operating",
                text: "Disciplined acquisition and management since the beginning.",
              },
              {
                value: "30K+",
                label: "Square metres held",
                text: "Across six properties in two cities.",
              },
              {
                value: "2019",
                label: "In-house operations",
                text: "Our own cleaning and security teams.",
              },
            ].map((s) => (
              <StatFigure key={s.label} stat={s} className="border-t pt-6" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured transformation */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
            <SectionIntro
              eyebrow="Featured"
              title={
                <>
                  The Canvas transformation is <em>the proof</em>
                </>
              }
            />
            <div className="md:justify-self-end">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                We took a tired industrial site and turned it into a fully tenanted mixed-use
                precinct. Drag the line and see for yourself.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink to="/portfolio/$slug" params={{ slug: canvas.slug }}>
                  Read the case study
                </ActionLink>
              </div>
            </div>
          </div>
          <BeforeAfter before="canvasBefore" after="canvasAfter" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {canvas.facts.map((s) => (
              <StatFigure key={s.label} stat={s} className="border-t pt-5" />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <SectionIntro
          eyebrow="Pillars"
          title="How we operate"
          text="Three principles guide every decision we make."
          center
        />
        <div className="mt-16 grid gap-px overflow-hidden border bg-border md:grid-cols-3">
          {pillars.map((p, i) => (
            <Link
              key={p.title}
              to={p.to}
              className="pillar-card flex flex-col bg-background p-6 md:p-8"
              data-reveal-item
            >
              <div className="pillar-media" aria-hidden="true">
                <Media id={p.media} fill reveal={false} bare />
              </div>
              <div className="flex items-center justify-between">
                <span className="pillar-num font-display text-sm text-fern transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <Media id={p.media} className="mt-6 aspect-[4/3]" />
              <h3 className="mt-8 font-display text-3xl leading-tight">{p.title}</h3>
              <p className="mt-4 text-muted-foreground transition-colors">{p.text}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm">
                {p.label} <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Portfolio reel */}
      <PortfolioReel
        items={properties}
        intro={
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="The portfolio" title="Six buildings. One long view." />
            <ActionLink to="/portfolio" variant="outline" className="self-start md:self-auto">
              View all properties
            </ActionLink>
          </div>
        }
      />

      <CtaPair
        media="aboutHero"
        ctas={[
          {
            title: "See the work",
            text: "Browse the portfolio and see the spaces we have built and hold.",
            actions: [{ label: "Portfolio", to: "/portfolio" }],
          },
          {
            title: "Talk to us",
            text: "Speak to our team about space, investment, or a new home for your business.",
            actions: [{ label: "Contact", to: "/contact" }],
          },
        ]}
      />
    </main>
  );
}
