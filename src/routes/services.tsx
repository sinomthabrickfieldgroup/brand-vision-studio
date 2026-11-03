import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { ActionLink, CtaPair, Marquee, PageHero, SectionIntro } from "@/components/editorial";
import { Media } from "@/components/media";
import type { MediaId } from "@/lib/media";
import { CONTACT, mailto } from "@/lib/portfolio";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Commercial cleaning and security | Brickfield Group" },
      {
        name: "description",
        content:
          "In-house commercial cleaning and security teams, running since 2019 and available to third-party clients in Cape Town.",
      },
      { property: "og:title", content: "Brickfield Services — Built to operate" },
      {
        property: "og:description",
        content: "Cleaning and security run by the people who own the building.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const offerings: {
  key: "cleaning" | "security";
  icon: typeof Sparkles;
  label: string;
  title: string;
  media: MediaId;
  subject: string;
}[] = [
  {
    key: "cleaning",
    icon: Sparkles,
    label: "Cleaning",
    title: "Commercial cleaning for buildings that demand better",
    media: "cleaningTeam",
    subject: "Cleaning enquiry",
  },
  {
    key: "security",
    icon: ShieldCheck,
    label: "Security",
    title: "Security that knows the ground it protects",
    media: "securityTeam",
    subject: "Security enquiry",
  },
];

function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Built to <em>operate</em>
          </>
        }
        text="We don't just buy buildings. We run businesses inside them. Since 2019 our in-house cleaning and security teams have worked the ground at Brickfield Canvas and across the group, and they're available to third-party clients."
        media="cleaningTeam"
        actions={
          <>
            <ActionLink href={mailto("Services enquiry")}>Enquire</ActionLink>
            <ActionLink to="/portfolio" variant="text">
              Portfolio
            </ActionLink>
          </>
        }
      />

      {/* Provenance */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <SectionIntro
              eyebrow="Provenance"
              title="Built on the property base, running since 2019"
              text="We opened Brickfield Canvas and put our own people on the ground. Cleaning and security aren't afterthoughts. They are businesses we built from nothing and run every day."
            />
            <ul className="mt-9 space-y-4">
              {[
                "In-house operations since 2019",
                "Not subcontracted, not outsourced",
                "The team scales with the portfolio",
              ].map((b) => (
                <li key={b} className="flex items-start gap-4 border-t pt-4" data-reveal-item>
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/25 text-fern">
                    <Check size={14} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Media id="canvasCourtyard" className="aspect-[4/5]" parallax={0.06} />
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionIntro
            eyebrow="Offerings"
            title="Two services, one standard"
            text="Both available to third-party clients."
            center
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {offerings.map((o) => (
              <a
                key={o.key}
                href={`#${o.key}`}
                className="project-card group relative block overflow-hidden"
                data-reveal-item
              >
                <div className="relative aspect-[4/5] md:aspect-[5/6]">
                  <Media id={o.media} fill reveal={false} bare />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-primary-foreground md:p-10">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-primary">
                      <o.icon size={20} />
                    </span>
                    <p className="mt-6 text-xs uppercase tracking-[0.22em] text-accent">
                      {o.label}
                    </p>
                    <h3 className="mt-3 max-w-sm font-display text-3xl leading-tight md:text-4xl">
                      {o.title}
                    </h3>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80">
                      In-house team, available to third-party clients <ArrowUpRight size={16} />
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning */}
      <section
        id="cleaning"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="grid grid-cols-5 gap-4">
            <Media id="cleaningDetail" className="col-span-3 aspect-[3/4]" parallax={0.05} />
            <Media id="cleaningTeam" className="col-span-2 mt-20 aspect-[2/3]" parallax={-0.05} />
          </div>
          <div>
            <SectionIntro
              eyebrow="Cleaning"
              title="A clean building works better"
              text="We have run our own cleaning teams since Canvas opened. The work is done by people who answer to us, not to a subcontractor."
            />
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {[
                [
                  "In-house",
                  "Our teams work across our own portfolio and for third-party clients who want the same standard.",
                ],
                [
                  "Scalable",
                  "The team grows with the number of buildings we clean. No shortcuts, no drop in quality.",
                ],
              ].map(([t, d]) => (
                <div key={t} className="border-t pt-5" data-reveal-item>
                  <h3 className="font-display text-2xl">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href={mailto("Cleaning enquiry")}>Enquire about cleaning</ActionLink>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Office lobbies",
          "Shared amenities",
          "Industrial yards",
          "Night patrols",
          "Access control",
          "Daily deep-clean",
        ]}
        className="border-y py-8"
      />

      {/* Security */}
      <section
        id="security"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="md:order-2">
            <div className="relative">
              <Media id="securityControl" className="aspect-[4/5]" parallax={0.06} />
            </div>
          </div>
          <div>
            <SectionIntro
              eyebrow="Security"
              title="Security you can hold accountable"
              text="Our security team has protected Brickfield Canvas since 2019. We don't subcontract. We hire, train and manage every person on the ground, and the team scales with our clients."
            />
            <div className="mt-9 divide-y border-y">
              {[
                ["Guarding", "Trained officers who know the building and its tenants."],
                ["Control room", "CCTV and access control monitored around the clock."],
                ["Patrols", "Visible, scheduled patrols across sites and precincts."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-6"
                  data-reveal-item
                >
                  <h3 className="font-display text-xl">{t}</h3>
                  <p className="text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href={mailto("Security enquiry")}>Enquire about security</ActionLink>
            </div>
          </div>
        </div>
      </section>

      {/* Enquire now */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:px-10">
          <div>
            <SectionIntro
              eyebrow="Contact"
              title="Enquire now"
              text="Tell us what your building needs."
            />
            <div className="mt-10 divide-y border-y">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: CONTACT.email,
                  href: mailto("Services enquiry"),
                },
                { icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.tel },
                { icon: MapPin, label: "Office", value: CONTACT.address, href: CONTACT.maps },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-5 py-5"
                  {...(c.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon size={17} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="mt-1 block font-display text-xl">{c.value}</span>
                  </span>
                  <ArrowUpRight
                    className="ml-auto text-fern transition-transform duration-500 group-hover:rotate-45"
                    size={20}
                  />
                </a>
              ))}
            </div>
          </div>
          <Media id="contactHero" className="aspect-[4/3]" parallax={0.05} />
        </div>
      </section>

      <CtaPair
        media="securityTeam"
        ctas={[
          {
            title: "Cleaning enquiries",
            text: "Tell us what your building needs. We'll tell you if we can do it well.",
            actions: [
              { label: "Enquire", href: mailto("Cleaning enquiry") },
              { label: "Portfolio", to: "/portfolio" },
            ],
          },
          {
            title: "Security enquiries",
            text: "A safe building is a productive building. We run our own teams.",
            actions: [
              { label: "Enquire", href: mailto("Security enquiry") },
              { label: "Portfolio", to: "/portfolio" },
            ],
          },
        ]}
      />
    </main>
  );
}
