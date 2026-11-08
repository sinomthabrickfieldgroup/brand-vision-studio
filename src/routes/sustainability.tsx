import { createFileRoute } from "@tanstack/react-router";
import {
  BatteryCharging,
  Building2,
  Droplets,
  Gauge,
  Landmark,
  ShieldCheck,
  Sun,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";
import {
  ActionLink,
  CtaPair,
  Eyebrow,
  PageHero,
  SectionIntro,
  StatFigure,
  TabShowcase,
} from "@/components/editorial";
import { Media } from "@/components/media";
import { SystemDiagram } from "@/components/system-diagram";
import type { MediaId } from "@/lib/media";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability, Brickfield Group" },
      {
        name: "description",
        content:
          "Solar and standby power, and borehole water. Infrastructure that works for decades.",
      },
      { property: "og:title", content: "Built to endure | Brickfield Group" },
      {
        property: "og:description",
        content: "Infrastructure investment that keeps tenants running and protects returns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sustainability,
});

const systems: {
  key: string;
  icon: typeof Sun;
  eyebrow: string;
  title: string;
  text: string;
  media: MediaId;
  points: { icon: typeof Sun; title: string; text: string }[];
}[] = [
  {
    key: "power",
    icon: Zap,
    eyebrow: "Power",
    title: "Power that does not quit",
    text: "Generator and solar run in parallel. When the grid fails, the lights stay on and the work continues. We invested over R150m in Canvas infrastructure alone.",
    media: "canvasSolar",
    points: [
      { icon: Sun, title: "Rooftop solar PV", text: "Daytime load carried by the sun." },
      {
        icon: BatteryCharging,
        title: "Standby generation",
        text: "Seamless cover through load-shedding.",
      },
      { icon: Gauge, title: "50% HVAC efficiency", text: "Above baseline, cutting running costs." },
      { icon: ShieldCheck, title: "Redundant supply", text: "No single point of failure." },
    ],
  },
  {
    key: "water",
    icon: Droplets,
    eyebrow: "Water",
    title: "Water independence built into the ground",
    text: "Borehole and rainwater systems feed the properties. We don't wait for the municipality to solve our problems. We built our own supply.",
    media: "borehole",
    points: [
      { icon: Droplets, title: "Borehole on site", text: "A supply we control." },
      {
        icon: Building2,
        title: "Rainwater harvesting",
        text: "Roofs that collect, not just shed.",
      },
      { icon: Landmark, title: "Less municipal draw", text: "Lower dependence, lower risk." },
    ],
  },
  {
    key: "air",
    icon: Wind,
    eyebrow: "Air",
    title: "Roofs that breathe",
    text: "Heat and fumes rise, so we let them out at the top. The new roof at 9 Loop Street has static ventilators along the full ridge, moving air through the warehouse all day without a single motor.",
    media: "loopRoof",
    points: [
      {
        icon: Wind,
        title: "Passive ridge ventilation",
        text: "No motors, no power, no running cost.",
      },
      {
        icon: Gauge,
        title: "Heat and fumes out",
        text: "Hot air leaves where it gathers, at the ridge.",
      },
      {
        icon: Building2,
        title: "Fitted with the new roof",
        text: "Part of the 2026 refurbishment.",
      },
    ],
  },
  // {
  //   key: "comms",
  //   icon: Wifi,
  //   eyebrow: "Comms",
  //   title: "Fibre that keeps the work moving",
  //   text: "Fibre runs through the buildings with a backup ISP ready. The connection doesn't die when the primary line fails.",
  //   media: "fibre",
  //   points: [
  //     { icon: Wifi, title: "Fibre throughout", text: "Every floor, every tenant." },
  //     { icon: ShieldCheck, title: "Backup provider", text: "Automatic failover when lines fail." },
  //   ],
  // },
];

function Sustainability() {
  return (
    <main>
      <PageHero
        eyebrow="Sustainability"
        title={
          <>
            Built to <em>endure</em>
          </>
        }
        text="We invest in infrastructure that works for decades."
        media="canvasSolar"
        slidesEyebrow="Built to endure"
        slides={[
          { id: "canvasSolar", label: "Solar on the roof" },
          { id: "canvasLivingWall", label: "Gardens inside the building" },
          { id: "canvasAtrium", label: "Daylight through the atrium" },
        ]}
        actions={
          <>
            <ActionLink to="/portfolio">Portfolio</ActionLink>
            <ActionLink to="/contact" variant="text">
              Contact
            </ActionLink>
          </>
        }
      />

      {/* Numbers band */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <Eyebrow light className="!text-accent">
            The numbers behind the build
          </Eyebrow>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { value: "50%", label: "HVAC efficiency above baseline" },
              { value: "R150m+", label: "Infrastructure investment at Canvas" },
              { value: "100%", label: "Canvas occupancy since 2022" },
            ].map((s) => (
              <StatFigure
                key={s.label}
                stat={s}
                light
                className="stat-xl border-t border-primary-foreground/20 pt-6"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Systems — jump nav + alternating stories */}
      <nav
        aria-label="Systems"
        className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 md:px-10">
          {systems.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="tab-chip inline-flex shrink-0 items-center gap-2"
            >
              <s.icon size={14} /> {s.eyebrow}
            </a>
          ))}
        </div>
      </nav>

      {systems.map((s, i) => (
        <section
          key={s.key}
          id={s.key}
          className="mx-auto max-w-7xl scroll-mt-32 px-6 py-24 md:px-10 md:py-32"
        >
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className={i % 2 === 1 ? "md:order-2" : undefined}>
              {s.key === "water" || s.key === "comms" ? (
                <SystemDiagram kind={s.key} />
              ) : (
                <Media id={s.media} className="aspect-[4/5]" parallax={0.06} />
              )}
            </div>
            <div>
              <SectionIntro eyebrow={s.eyebrow} title={s.title} text={s.text} />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {s.points.map((p) => (
                  <div
                    key={p.title}
                    className="group flex gap-4 rounded-sm border p-5 transition-colors duration-500 hover:border-foreground"
                    data-reveal-item
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/25 text-fern transition-colors group-hover:bg-primary group-hover:text-accent">
                      <p.icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-medium">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionIntro
            eyebrow="Why"
            title="Built for the long run"
            text="Infrastructure that works for decades pays everyone back."
            center
          />
          <div className="mt-16">
            <TabShowcase
              tabs={[
                {
                  label: "Tenants",
                  title: "Tenants get certainty",
                  text: "Power, water and comms stay on. Work doesn't stop.",
                  media: "canvasCafe",
                },
                {
                  label: "Investors",
                  title: "Investors get yield",
                  text: "Efficient systems cut costs and protect returns over time.",
                  media: "canvasAfter",
                },
                {
                  label: "The city",
                  title: "The city gets relief",
                  text: "Less strain on municipal grids. More resilience for Cape Town.",
                  media: "aboutHero",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaPair
        media="generator"
        ctas={[
          {
            title: "See the proof",
            text: "Walk the floors we built to last. The infrastructure tells the story better than we can.",
            actions: [
              { label: "Portfolio", to: "/portfolio" },
              { label: "Contact", to: "/contact" },
            ],
          },
          {
            title: "Talk to us",
            text: "Ask about the systems behind the spaces. We'll show you the numbers.",
            actions: [{ label: "Contact", to: "/contact" }],
          },
        ]}
      />
    </main>
  );
}
