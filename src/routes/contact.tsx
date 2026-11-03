import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ActionLink, CtaPair, Eyebrow, SectionIntro } from "@/components/editorial";
import { Media } from "@/components/media";
import { CONTACT, mailto } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Brickfield Group" },
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
  component: Contact,
});

const topics = [
  "Leasing and space",
  "Investment",
  "Cleaning services",
  "Security services",
  "Something else",
];
const roles = ["Broker", "Tenant", "Investor", "Bank", "Service provider", "Other"];

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
  const [role, setRole] = useState("");

  // No message delivery service is connected, so the form composes an email in the
  // visitor's own mail app rather than pretending to submit.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = `${get("first")} ${get("last")}`.trim();
    const body = [
      get("message"),
      "",
      "—",
      name,
      get("email"),
      get("phone"),
      role && `I am a: ${role}`,
    ]
      .filter((l): l is string => typeof l === "string")
      .join("\n");
    window.location.href = mailto(`${get("topic") || "Enquiry"}${name ? ` — ${name}` : ""}`, body);
  };

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <Eyebrow>Contact</Eyebrow>
        <div className="mt-7 grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <h1 className="hero-title font-display text-[3.4rem] leading-[0.95] tracking-[-0.025em] md:text-[7rem]">
            Talk to <em>us</em>
          </h1>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We answer every message. No brokers on commission, no call centres. Just the people
              who run the buildings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={`mailto:${CONTACT.email}`}>Email us</ActionLink>
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
              text="Fill this in and we'll open a ready-to-send email in your mail app. We'll get back to you within one business day."
            />
          </div>
          <form onSubmit={onSubmit} className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
            <Field label="First name" name="first" autoComplete="given-name" required />
            <Field label="Last name" name="last" autoComplete="family-name" />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
            <label className="sm:col-span-2">
              <span className="field-label">Choose a topic</span>
              <select name="topic" className="field-input" defaultValue="">
                <option value="" disabled>
                  Select one…
                </option>
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <fieldset className="sm:col-span-2">
              <legend className="field-label">Which best describes you?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={role === r}
                    onClick={() => setRole(role === r ? "" : r)}
                    className={cn("tab-chip bg-background", role === r && "is-active")}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="sm:col-span-2">
              <span className="field-label">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Type your message…"
                className="field-input resize-y"
              />
            </label>
            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Opens your email app. Nothing is sent until you press send there.
              </p>
              <button type="submit" className="action action-solid">
                <span className="action-label">Compose email</span>
                <span className="action-icon" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </button>
            </div>
          </form>
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

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span className="field-label">
        {label}
        {props.required && <span className="text-fern"> *</span>}
      </span>
      <input className="field-input" {...props} />
    </label>
  );
}
