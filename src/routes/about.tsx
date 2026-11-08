import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ActionLink, CtaPair, Eyebrow, PageHero, SectionIntro } from "@/components/editorial";
import { Media } from "@/components/media";
import { Legible, LegibleScrim } from "@/components/legible";
import type { MediaId } from "@/lib/media";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Brickfield Group" },
      {
        name: "description",
        content:
          "Backed by Firefly Capital, Brickfield Group has spent more than  fifteen years buying and transforming underused buildings into productive precincts.",
      },
      { property: "og:title", content: "About Brickfield Group" },
      {
        property: "og:description",
        content: "Patient capital, adaptive reuse and in-house operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const timeline = [
  {
    year: "2009",
    title: "33 Brickfield Road",
    text: "The first acquisition, in Woodstock. Still held today.",
  },
  {
    year: "2012",
    title: "24 Montague",
    text: "A multi-tenant industrial park in Montague Gardens.",
  },
  { year: "2014", title: "66/68 Wierda", text: "Two A-Grade office buildings in Sandton." },
  {
    year: "2016",
    title: "35 Brickfield Road",
    text: "A general industrial property becomes the Canvas project.",
  },
  {
    year: "2019",
    title: "Canvas completed",
    text: "10,400m² of A-Grade space, with our own operations teams on the ground.",
  },
  { year: "2022", title: "Fully tenanted", text: "Canvas reaches 100% occupancy." },
  { year: "2025", title: "219 Albert Road", text: "A heritage industrial building in Woodstock." },
  {
    year: "2026",
    title: "9 Loop Street",
    text: "A Maitland depot rebuilt for heavy industry in five months.",
  },
];

const team: { name: string; role: string; text: string; media: MediaId }[] = [
  {
    name: "Trevor Jacobs",
    role: "CEO / Director",
    text: "Trevor has led Brickfield Group for over fifteen years, building a portfolio from R600m to R1bn.",
    media: "portraitTrevor",
  },
  {
    name: "Rowan Gordon",
    role: "Director",
    text: "Rowan brings deep capital markets experience and oversees the group's long-term investment strategy.",
    media: "portraitRowan",
  },
  {
    name: "Timothy Manners-Wood",
    role: "COO",
    text: "Timothy runs the in-house operations, making sure our buildings perform for tenants every day.",
    media: "portraitTimothy",
  },
];

function About() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title={
          <>
            Patient <em>capital</em>
          </>
        }
        text="Backed by Firefly Capital, we have spent over fifteen years buying and transforming underused buildings into productive precincts."
        media="aboutHero"
        slidesEyebrow="Fifteen years in the making"
        slides={[
          { id: "aboutHero", label: "Woodstock and beyond" },
          { id: "canvasHero", label: "Brickfield Canvas", slug: "brickfield-canvas" },
          { id: "precinct", label: "Thinking in blocks" },
          { id: "albertHero", label: "219 Albert Road", slug: "219-albert-road" },
          { id: "loopAerialAngle", label: "9 Loop Street, Maitland", slug: "9-loop-street" },
          { id: "wierdaHero", label: "66/68 Wierda, Sandton", slug: "66-68-wierda" },
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

      {/* The long game — timeline */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <SectionIntro eyebrow="The long game" title="One acquisition, then a simple idea" />
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            Buy good buildings in good locations, and hold them. Everything since has been that
            idea, applied patiently.
          </p>
        </div>
        <ol className="mt-16 grid gap-px overflow-hidden border-y bg-border sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t) => (
            <li
              key={t.year}
              className="group relative bg-background px-5 py-8 transition-colors duration-500 hover:bg-card sm:px-6"
              data-reveal-item
            >
              <span className="absolute left-0 top-0 h-0.5 w-0 bg-accent transition-all duration-700 group-hover:w-full" />
              <p className="timeline-year font-display text-fern">{t.year}</p>
              <h3 className="mt-5 font-display text-lg sm:text-xl">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Approach bento */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionIntro
            eyebrow="Approach"
            title="Built to last"
            text="We buy for the long term and operate what we own."
            center
          />
          <div className="mt-16 grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
            <Link
              to="/portfolio"
              className="project-card group relative overflow-hidden bg-primary md:col-span-4 md:row-span-1"
              data-reveal-item
            >
              <Legible className="relative aspect-[16/9] md:aspect-auto md:h-[440px]">
                <Media id="precinct" fill reveal={false} bare />
                <LegibleScrim />
                <div className="legible-text absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <p className="eyebrow-on-photo">Precinct</p>
                  <h3 className="mt-3 max-w-md font-display text-3xl md:text-4xl">
                    We think in blocks, not buildings
                  </h3>
                  <p className="mt-3 max-w-md">
                    We acquire clusters of properties and improve the whole area, not just one
                    asset.
                  </p>
                </div>
                <span className="card-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Legible>
            </Link>
            <div
              className="flex flex-col justify-between gap-6 border bg-background p-8 md:col-span-2"
              data-reveal-item
            >
              <p className="font-display text-6xl text-fern">∞</p>
              <div>
                <h3 className="font-display text-2xl">Patient capital</h3>
                <p className="mt-2 text-muted-foreground">
                  We buy to hold, and measure value in decades.
                </p>
              </div>
            </div>
            <div
              className="flex flex-col justify-between gap-6 border bg-background p-8 md:col-span-2"
              data-reveal-item
            >
              <p className="font-display text-6xl text-fern">100%</p>
              <div>
                <h3 className="font-display text-2xl">Long-term tenancy</h3>
                <p className="mt-2 text-muted-foreground">We thrive when our tenants thrive.</p>
              </div>
            </div>
            <Link
              to="/services"
              className="project-card group relative overflow-hidden md:col-span-4"
              data-reveal-item
            >
              <Legible
                region="left"
                className="relative aspect-[16/9] md:aspect-auto md:h-full md:min-h-[300px]"
              >
                <Media id="cleaningTeam" fill reveal={false} bare />
                <LegibleScrim direction="right" />
                <div className="legible-text absolute inset-y-0 left-0 flex max-w-sm flex-col justify-end p-8 md:p-10">
                  <p className="eyebrow-on-photo">Operations</p>
                  <h3 className="mt-3 font-display text-3xl">In-house teams running since 2019</h3>
                  <p className="mt-3">
                    Our cleaning and security businesses scale with the portfolio.
                  </p>
                </div>
                <span className="card-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Legible>
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro
            eyebrow="Leadership"
            title="Our team"
            text="The people who find the buildings and make them work."
          />
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {team.map((person, i) => (
            <article
              key={person.name}
              className="group"
              data-reveal-item
              style={{ marginTop: i === 1 ? "4rem" : undefined }}
            >
              <div className="overflow-hidden">
                <Media
                  id={person.media}
                  className="aspect-[3/4] transition-transform duration-[1.4s] group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4 border-t pt-4">
                <h3 className="font-display text-2xl">{person.name}</h3>
                <span className="text-xs uppercase tracking-[0.18em] text-fern">{person.role}</span>
              </div>
              <p className="mt-3 text-muted-foreground">{person.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Operations */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <SectionIntro
              eyebrow="Operations"
              title="Real businesses, not just buildings"
              text="Since 2019 we have run our own cleaning and security teams. They are revenue-generating businesses built on the property base."
            />
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                ["Cleaning", "In-house commercial cleaning, available to third-party clients."],
                ["Security", "Trained teams that scale with the portfolio."],
              ].map(([t, d]) => (
                <div key={t} className="border-t pt-5" data-reveal-item>
                  <h3 className="font-display text-2xl">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink to="/services" variant="outline">
                Services
              </ActionLink>
              <ActionLink to="/contact" variant="text">
                Contact
              </ActionLink>
            </div>
          </div>
          <div className="relative">
            <Media id="securityTeam" className="aspect-[4/5]" parallax={0.06} />
            <div
              className="absolute -bottom-10 -left-10 hidden w-1/2 md:block"
              data-parallax="-0.08"
            >
              <Media id="cleaningDetail" className="aspect-[4/3] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Firefly */}
      <section className="border-y">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center md:px-10">
          <Eyebrow>Backed by Firefly Capital</Eyebrow>
          <p className="max-w-2xl font-display text-2xl leading-snug md:text-3xl">
            Capital that measures returns in decades lets us buy well, improve patiently and hold for good.
          </p>
        </div>
      </section>

      <CtaPair
        media="canvasCourtyard"
        ctas={[
          {
            title: "See the work",
            text: "Walk through the buildings and precincts we have transformed over fifteen years.",
            actions: [{ label: "Portfolio", to: "/portfolio" }],
          },
          {
            title: "Get in touch",
            text: "Speak to us about long-term space built for tenants who stay.",
            actions: [{ label: "Contact", to: "/contact" }],
          },
        ]}
      />
    </main>
  );
}
