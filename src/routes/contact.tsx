import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ActionLink, CtaPair, Eyebrow, SectionIntro } from "@/components/editorial";
import { Media } from "@/components/media";
import { EnquiryForm } from "@/components/enquiry-form";
import { CONTACT } from "@/lib/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Brickfield Group" },
      {
        name: "description",
        content:
          "Talk to the people who run the buildings. 35 Brickfield Road, Woodstock, Cape Town.",
      },
      { property: "og:title", content: "Contact Brickfield Group" },
      {
        property: "og:description",
        content: "We answer every message. No brokers on commission, no call centres.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { property?: string; topic?: string } => ({
    ...(typeof search["property"] === "string" ? { property: search["property"] } : {}),
    ...(typeof search["topic"] === "string" ? { topic: search["topic"] } : {}),
  }),
  component: Contact,
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    note: "We answer every message.",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    note: "Call during business hours.",
    value: CONTACT.phone,
    href: CONTACT.tel,
  },
  {
    icon: MapPin,
    label: "Office",
    note: "Get directions",
    value: CONTACT.address,
    href: CONTACT.maps,
  },
];

function Contact() {
  const search = Route.useSearch();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <Eyebrow>Contact</Eyebrow>
        <div className="mt-7 grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <h1 className="hero-title font-display text-[2.8rem] leading-[0.95] sm:text-[3.4rem] tracking-[-0.025em] md:text-[7rem]">
            Talk to <em>us</em>
          </h1>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We answer every message. No brokers on commission, no call centres. Just the people
              who run the buildings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#enquiry">Send a message</ActionLink>
              <ActionLink href="#map" variant="text">
                Map
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      {/* Find us */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="divide-y border-y">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-start gap-5 py-7"
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                data-reveal-item
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 group-hover:bg-primary group-hover:text-accent">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="mt-2 block break-words font-display text-2xl leading-snug transition-colors group-hover:text-fern">
                    {c.value}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.note}</span>
                </span>
                <ArrowUpRight
                  className="ml-auto mt-1 shrink-0 text-fern transition-transform duration-500 group-hover:rotate-45"
                  size={20}
                />
              </a>
            ))}
          </div>
          <Media
            id="contactHero"
            className="aspect-[4/3] md:aspect-auto md:h-full"
            parallax={0.05}
          />
        </div>
      </section>

      {/* Send a message */}
      <section className="bg-card py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-20 md:px-10">
          <div>
            <SectionIntro
              eyebrow="Send a message"
              title="Tell us what you need"
              text="Space in the portfolio, investment or our services. A person on our team reads every message and replies, usually within one business day."
            />
          </div>
          <div id="enquiry" className="scroll-mt-28">
            <EnquiryForm defaultProperty={search.property} defaultTopic={search.topic} />
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="relative h-[60vh] min-h-[380px] scroll-mt-20">
        <iframe
          title="Map showing 35 Brickfield Road, Woodstock, Cape Town"
          src="https://www.google.com/maps?q=35+Brickfield+Road,+Woodstock,+Cape+Town&output=embed"
          className="h-full w-full grayscale-[0.85] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute left-6 top-6 max-w-xs bg-background p-6 shadow-xl md:left-10 md:top-10">
          <p className="text-xs uppercase tracking-[0.18em] text-fern">Visit</p>
          <p className="mt-2 font-display text-2xl leading-snug">35 Brickfield Road, Woodstock</p>
        </div>
      </section>

      <CtaPair
        media="canvasCourtyard"
        ctas={[
          {
            title: "See the portfolio",
            text: "Brickfield Canvas is fully tenanted. The numbers hold up. Walk the buildings before you decide.",
            actions: [
              { label: "Portfolio", to: "/portfolio" },
              { label: "About", to: "/about" },
            ],
          },
          {
            title: "Our services",
            text: "Cleaning and security from teams that already run our own buildings.",
            actions: [{ label: "Services", to: "/services" }],
          },
        ]}
      />
    </main>
  );
}
