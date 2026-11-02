import { createFileRoute, Link } from "@tanstack/react-router";
import canvas from "@/assets/brickfield-canvas.asset.json";
import loop from "@/assets/loop-street-photo.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brickfield Group — Patient capital, adaptive reuse" },
      { name: "description", content: "Fifteen years of disciplined adaptive reuse and precinct development in Cape Town and Johannesburg." },
      { property: "og:title", content: "Brickfield Group" },
      { property: "og:description", content: "We build and hold spaces that work for the long term." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const stats = [["100%", "Occupancy since June 2022"], ["15+", "Years operating"], ["R1bn", "Portfolio held"]];
const pillars = [
  ["Adaptive reuse is our craft", "We find old buildings and give them new purpose."],
  ["Patient capital means no short-term pressure", "We hold for the long term and build value."],
  ["Long-term tenancy is the goal", "We thrive when our tenants thrive and stay."],
];
const work = [
  { title: "Brickfield Canvas", subtitle: "Mixed-use · Woodstock", to: "/brickfield-canvas", image: canvas.url },
  { title: "9 Loop Street", subtitle: "Industrial · Maitland", to: "/loop-street", image: loop.url },
] as const;

function Index() {
  return (
    <div className="min-h-screen font-sans">

      <section className="mx-auto max-w-6xl px-8 pb-24 pt-28">
        <p className="text-xs uppercase tracking-brand text-muted-foreground">Patient capital · Cape Town</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.08] md:text-7xl">
          15+ years of disciplined adaptive reuse and precinct development
        </h1>
        <div className="editorial-rule mt-10 h-px w-24 bg-accent" />
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          We are a property holding company backed by patient capital. We build and hold spaces that work for the long term.
        </p>
      </section>

      <section className="border-y">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {stats.map(([n, l]) => (
            <div key={n} className="border-b px-8 py-14 md:border-b-0 md:border-r last:border-0">
              <div className="font-display text-7xl">{n}</div>
              <div className="mt-3 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-28">
        <p className="text-xs uppercase tracking-brand text-fern">Featured work</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">The Canvas transformation is the proof</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {work.map(({ title, subtitle, to, image }) => (
            <Link key={title} to={to} className="project-link group block">
              <div className="aspect-[4/5] overflow-hidden bg-card">
                <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t pt-4">
                <h3 className="font-display text-xl">{title}</h3>
                <span className="text-xs text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
              </div>
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-8 py-28">
          <p className="text-xs uppercase tracking-brand text-accent">How we operate</p>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {pillars.map(([t, d]) => (
              <div key={t} className="border-t border-accent/40 pt-6">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-4 text-sm opacity-70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
