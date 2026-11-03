import type { MediaId } from "@/lib/media";

export type PropertyType = "Mixed-use" | "Office" | "Industrial";

export interface Stat {
  value: string;
  label: string;
  text?: string;
}

export interface Item {
  title: string;
  text: string;
}

export type Block =
  | {
      type: "beforeAfter";
      eyebrow: string;
      title: string;
      text: string;
      before: MediaId;
      after: MediaId;
    }
  | { type: "gallery"; eyebrow: string; title: string; text?: string; media: MediaId[] }
  | {
      type: "split";
      eyebrow: string;
      title: string;
      text: string;
      media: MediaId;
      reverse?: boolean;
      bullets?: string[];
      stats?: Stat[];
      items?: Item[];
    }
  | {
      type: "tabs";
      eyebrow: string;
      title: string;
      text?: string;
      tabs: (Item & { label: string; media: MediaId })[];
    }
  | {
      type: "verticals";
      eyebrow: string;
      title: string;
      text: string;
      items: Item[];
      media: MediaId;
    }
  | { type: "statGrid"; eyebrow: string; title: string; text: string; stats: Stat[] }
  | {
      type: "longform";
      eyebrow: string;
      title: string;
      lead: string;
      paragraphs: string[];
      media?: MediaId;
    }
  | { type: "quote"; quote: string; by: string; role: string; media: MediaId }
  | { type: "marquee"; items: string[] };

export interface Property {
  slug: string;
  name: string;
  shortName: string;
  address: string;
  area: string;
  city: "Cape Town" | "Johannesburg";
  type: PropertyType;
  tags: string[];
  summary: string;
  hero: MediaId;
  card: MediaId;
  facts: Stat[];
  blocks: Block[];
  ctas: [Item & { label: string; subject: string }, Item & { label: string; subject: string }];
}

/*
 * FACT-CHECK before launch — the wireframes and the current live copy disagree on a few
 * numbers. Each is marked "CONFIRM" next to where it is used.
 */
export const properties: Property[] = [
  {
    slug: "brickfield-canvas",
    name: "Brickfield Canvas",
    shortName: "Canvas",
    address: "35 Brickfield Road",
    area: "Woodstock",
    city: "Cape Town",
    type: "Mixed-use",
    tags: ["Mixed-use", "Woodstock", "Fully tenanted"],
    summary:
      "An industrial shell turned into a living, working precinct. Fully tenanted since June 2022.",
    hero: "canvasHero",
    card: "canvasCourtyard",
    facts: [
      { value: "15,000m²", label: "Gross lettable area" }, // CONFIRM: live site says 10,400m²
      { value: "100%", label: "Occupied since June 2022" },
      { value: "20+", label: "Businesses on site" },
      { value: "R150m+", label: "Infrastructure invested" },
    ],
    blocks: [
      {
        type: "beforeAfter",
        eyebrow: "The transformation",
        title: "From industrial shell to a living, working precinct",
        text: "Drag to see 35 Brickfield Road before and after. Same building, same street, a completely different future.",
        before: "canvasBefore",
        after: "canvasAfter",
      },
      {
        type: "split",
        eyebrow: "Specifications",
        title: "The numbers behind disciplined adaptive reuse",
        text: "Built on patient capital and held for the long term. Every square metre works for its tenants.",
        media: "canvasOffices",
        bullets: [
          "15,000 square metres of gross lettable area",
          "100 percent occupancy since June 2022",
          "Secure parking, fibre and backup power",
        ],
      },
      {
        type: "tabs",
        eyebrow: "Features",
        title: "Everything Canvas is built to offer",
        text: "A rich network of tenants, plus the café, gym and spaces that make people want to come in.",
        tabs: [
          {
            label: "Community",
            title: "20+ businesses across nine verticals",
            text: "No single tenant carries the building's performance. The mix is broad by design.",
            media: "canvasCourtyard",
          },
          {
            label: "Café",
            title: "The heart of the precinct",
            text: "Coffee in the morning, lunch meetings at noon. The café is where tenants meet each other.",
            media: "canvasCafe",
          },
          {
            label: "Meeting rooms",
            title: "Rooms you can book by the hour",
            text: "Glass-walled boardrooms and huddle spaces, available to every tenant.",
            media: "canvasMeeting",
          },
          {
            label: "Events",
            title: "A calendar that keeps people coming in",
            text: "Talks, socials and launches in the courtyard turn neighbours into a network.",
            media: "canvasEvents",
          },
          {
            label: "Co-working",
            title: "Flexible desks for growing teams",
            text: "Start with a desk, grow into a suite. Teams can scale without leaving the building.",
            media: "canvasCowork",
          },
          {
            label: "Gym",
            title: "Wellness on site",
            text: "An on-site gym means no detour before or after work.",
            media: "canvasGym",
          },
        ],
      },
      {
        type: "split",
        eyebrow: "Tenancy",
        title: "Opened in a lockdown. Fully tenanted by 2022.",
        text: "Canvas opened its doors in March 2020, the same week South Africa went into lockdown. Two years of patient, methodical leasing followed, and by June 2022 the building was full.", // CONFIRM: live site says the campus emerged in 2019
        media: "canvasCowork",
        reverse: true,
        stats: [
          { value: "Mar 2020", label: "Doors opened" },
          { value: "Jun 2022", label: "Fully tenanted" },
        ],
      },
      {
        type: "verticals",
        eyebrow: "Who's here",
        title: "Nine verticals under one roof",
        text: "FinTech, health, legal, consulting and more. Businesses that grow here tend to stay here.",
        media: "canvasCafe",
        items: [
          { title: "FinTech", text: "Digital platforms and payment systems." },
          { title: "Health", text: "Medical practices and wellness providers." },
          { title: "Legal", text: "Law firms and advisory practices." },
          { title: "Consulting", text: "Professional services teams." },
          { title: "Technology", text: "Software and product studios." },
          { title: "Science", text: "Research and lab-adjacent businesses." },
        ],
      },
      {
        type: "tabs",
        eyebrow: "Infrastructure",
        title: "Built to endure",
        text: "Over R150 million went into the transformation. The HVAC system runs 50 percent above baseline efficiency.",
        tabs: [
          {
            label: "Power",
            title: "Generator and solar keep the precinct running",
            text: "Solar and standby generation run in parallel, so load-shedding doesn't stop the work.",
            media: "canvasSolar",
          },
          {
            label: "Water",
            title: "Water independence built into the ground",
            text: "A borehole and rainwater harvesting reduce reliance on the municipal supply.",
            media: "borehole",
          },
          {
            label: "Comms",
            title: "Fibre with a backup line",
            text: "Fibre runs through the building with a second ISP ready if the primary line fails.",
            media: "fibre",
          },
        ],
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "Walk the precinct",
        media: [
          "canvasAfter",
          "canvasCourtyard",
          "canvasCafe",
          "canvasOffices",
          "canvasEvents",
          "canvasGym",
        ],
      },
    ],
    ctas: [
      {
        title: "See it yourself",
        text: "Walk the floors and see why tenants stay. We'll show you the spaces.",
        label: "Book a viewing",
        subject: "Viewing request — Brickfield Canvas",
      },
      {
        title: "Broker enquiries",
        text: "Get the full specification and current availability. We reply within one business day.",
        label: "Enquire",
        subject: "Broker enquiry — Brickfield Canvas",
      },
    ],
  },
  {
    slug: "loop-street",
    name: "9 Loop Street",
    shortName: "Loop Street",
    address: "9 Loop Street",
    area: "Maitland", // CONFIRM: wireframe says Woodstock
    city: "Cape Town",
    type: "Industrial",
    tags: ["Industrial", "Maitland", "Fully tenanted"],
    summary:
      "Refurbished from the ground up for serious industry. Strong bones, clean lines and a tenant that stays.",
    hero: "loopHero",
    card: "loopWarehouse",
    facts: [
      { value: "2,362m²", label: "Facility size" },
      { value: "5 mo", label: "Full refurbishment" },
      { value: "400A", label: "Three-phase supply" },
      { value: "100%", label: "Tenanted" },
    ],
    blocks: [
      {
        type: "split",
        eyebrow: "The specification",
        title: "Designed around the way industry works",
        text: "Acquired in March 2026 and completed in August 2026, a conventional warehouse became a premium facility tailored to manufacturing and fabrication.",
        media: "loopWarehouse",
        items: [
          {
            title: "Column-efficient warehouse",
            text: "Clear floor for production lines and overhead handling.",
          },
          { title: "Dual yard access", text: "Trucks enter from Loop Street and Norway Street." },
          {
            title: "Office and canteen block",
            text: "A proper home for the team, not an afterthought.",
          },
        ],
      },
      {
        type: "gallery",
        eyebrow: "The gallery",
        title: "A working building with clean lines and strong bones",
        media: ["loopHero", "loopWarehouse", "loopYard", "loopOffice", "loopPower"],
      },
      {
        type: "split",
        eyebrow: "Tenancy",
        title: "A tenant that stays is the only metric that matters",
        text: "The first tenant is AMD Engineering, a specialist steel fabrication business established in 1993. The power and layout were suited to how they work.",
        media: "loopFabrication",
        reverse: true,
        items: [
          { title: "Long lease", text: "The tenant signed for the long haul." },
          { title: "Single covenant", text: "One tenant, one lease, one relationship." },
          {
            title: "In-house care",
            text: "Our own maintenance team has kept the building sharp since day one.",
          },
        ],
      },
      {
        type: "split",
        eyebrow: "Power with a purpose",
        title: "400A three-phase, ready for heavy engineering",
        text: "The upgraded supply supports the demands of fabrication without compromise. We spend where the occupier needs it.",
        media: "loopPower",
      },
    ],
    ctas: [
      {
        title: "Talk to us",
        text: "Brokers and tenants can reach the people who run the building directly.",
        label: "Contact",
        subject: "Enquiry — 9 Loop Street",
      },
      {
        title: "See it",
        text: "Walk the floor and see the bones of the building for yourself.",
        label: "Book a viewing",
        subject: "Viewing request — 9 Loop Street",
      },
    ],
  },
  {
    slug: "brickfield-call-centre",
    name: "Brickfield Call Centre",
    shortName: "Call Centre",
    address: "33 Brickfield Road",
    area: "Woodstock",
    city: "Cape Town",
    type: "Office",
    tags: ["Office", "Woodstock", "Fully tenanted"],
    summary:
      "A purpose-built office asset in the heart of Woodstock, with long-term single-covenant tenancy.",
    hero: "callHero",
    card: "callFloor",
    facts: [
      { value: "100%", label: "Occupied since completion" },
      { value: "1", label: "Long-term covenant" },
      { value: "24/7", label: "Redundant power" },
      { value: "2019", label: "In-house ops since" },
    ],
    blocks: [
      {
        type: "split",
        eyebrow: "Purpose-built",
        title: "Built for continuous operation and high-density use",
        text: "Redundant power, fibre connectivity and secure access are standard here. The building carries the infrastructure a modern operations tenant demands.",
        media: "callFloor",
        bullets: [
          "Generator and UPS backup",
          "Fibre with a second provider",
          "Controlled access and on-site security",
        ],
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "Exterior, workspaces and common areas",
        media: ["callHero", "callFloor", "callBreakout", "callEntrance", "callPlant"],
      },
      {
        type: "split",
        eyebrow: "Tenancy",
        title: "A long-term covenant that proves the asset",
        text: "Fully tenanted since completion. The tenant stays because the building works for them.",
        media: "callBreakout",
        reverse: true,
        items: [
          {
            title: "Lease track record",
            text: "Long-term, single-covenant tenancy with no churn.",
          },
          { title: "Current occupancy", text: "Fully let to a covenant that values stability." },
          {
            title: "Space configuration",
            text: "Open floor plates designed for high-density operations.",
          },
        ],
      },
      {
        type: "split",
        eyebrow: "Operated in-house",
        title: "We don't hand the keys to a third party",
        text: "Brickfield Services has run cleaning and security for this building since it opened. The teams know the asset. They know the tenant. For a broker, that means one point of accountability.",
        media: "callEntrance",
      },
    ],
    ctas: [
      {
        title: "For brokers",
        text: "Request yield details and current leasing information for this asset.",
        label: "Enquire",
        subject: "Broker enquiry — Brickfield Call Centre",
      },
      {
        title: "For tenants",
        text: "Arrange a viewing and see how this building could work for your team.",
        label: "Book a viewing",
        subject: "Viewing request — Brickfield Call Centre",
      },
    ],
  },
  {
    slug: "wierda",
    name: "66/68 Wierda",
    shortName: "Wierda",
    address: "66/68 Wierda Road",
    area: "Wierda Valley, Sandton",
    city: "Johannesburg",
    type: "Office",
    tags: ["Office", "Sandton", "Long-term tenancy"],
    summary:
      "A purpose-built office holding in Johannesburg, held for long-term single-covenant tenancy and steady yield.",
    hero: "wierdaHero",
    card: "wierdaLobby",
    facts: [
      { value: "100%", label: "Occupancy" },
      { value: "1", label: "Single covenant" },
      { value: "9%", label: "Group yield track record" },
      { value: "0", label: "Vacancy churn" },
    ],
    blocks: [
      {
        type: "longform",
        eyebrow: "The holding",
        title: "A steady office holding",
        lead: "66/68 Wierda was acquired with one clear objective: stable, long-term space for a tenant that values continuity.",
        paragraphs: [
          "The property offers functional office accommodation with a layout that supports a single tenant. It is not a speculative development.",
          "For brokers, the metrics are straightforward. The property carries a strong occupancy record and contributes to the group's 9% yield track record. It is clean, well maintained and free of vacancy churn.",
          "The building forms part of a wider strategy. Brickfield Group does not trade properties on short cycles. We hold, improve and operate. That is the difference.",
        ],
        media: "wierdaLobby",
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "The space and the precinct",
        media: ["wierdaHero", "wierdaLobby", "wierdaFloor", "wierdaStreet"],
      },
      {
        type: "split",
        eyebrow: "Tenancy",
        title: "Built for a tenant that stays",
        text: "This is not a building designed for turnover. It is designed for a tenant that wants to remain.",
        media: "wierdaFloor",
        items: [
          {
            title: "Purpose-built office space",
            text: "The layout works for a single covenant. No retrofitting, no compromises.",
          },
          {
            title: "Long-term lease track record",
            text: "Tenants stay because the landlord doesn't churn properties or leases.",
          },
          {
            title: "Operational stability",
            text: "Services are managed directly, not subcontracted to strangers.",
          },
        ],
      },
      {
        type: "quote",
        quote: "The landlord actually answers the phone. That matters more than people think.",
        by: "Tenant representative",
        role: "Office tenant, 66/68 Wierda",
        media: "wierdaStreet",
      }, // CONFIRM: placeholder testimonial from wireframe — get a real, approved quote
    ],
    ctas: [
      {
        title: "Leasing enquiries",
        text: "Speak to us about long-term office space at 66/68 Wierda.",
        label: "Contact",
        subject: "Leasing enquiry — 66/68 Wierda",
      },
      {
        title: "Viewing requests",
        text: "Arrange a walkthrough of the building and surrounding precinct.",
        label: "Book a viewing",
        subject: "Viewing request — 66/68 Wierda",
      },
    ],
  },
  {
    slug: "montague",
    name: "24 Montague",
    shortName: "Montague",
    address: "24 Montague Drive",
    area: "Montague Gardens", // CONFIRM: wireframe says Woodstock
    city: "Cape Town",
    type: "Industrial",
    tags: ["Industrial", "Montague Gardens", "Long-term tenancy"],
    summary:
      "A disciplined industrial holding built for tenants who need certainty and brokers who value yield.",
    hero: "montagueHero",
    card: "montagueInterior",
    facts: [
      { value: "100%", label: "Occupancy", text: "Fully let to a long-term single covenant." },
      { value: "3,500m²", label: "GLA", text: "Functional space that works hard for the tenant." },
      {
        value: "Industrial",
        label: "Property type",
        text: "Purpose-built for operational certainty.",
      },
      { value: "9%", label: "Yield context", text: "Consistent with the group track record." },
    ],
    blocks: [
      {
        type: "gallery",
        eyebrow: "Image gallery",
        title: "The building, the yard and the street it works on",
        media: ["montagueHero", "montagueYard", "montagueInterior", "montagueStreet"],
      },
      {
        type: "longform",
        eyebrow: "Specifications",
        title: "Specifications that hold up under inspection",
        lead: "A clean, open floor plate with direct street loading. A truck can get in, turn and get out without a problem.",
        paragraphs: [
          "The location gives a tenant quick access to the city and the N1 without the congestion of the central business district. It is a working building in a working precinct.",
          "There are no columns in the way of a production line or a racking system. The zoning is industrial, parking is adequate for staff and visitors, and the power supply is stable.",
          "Water is secure and the fibre is in. These are not luxuries. They are the basics done properly.",
        ],
        media: "montagueInterior",
      },
      {
        type: "split",
        eyebrow: "Tenant",
        title: "A landlord who stays out of the way",
        text: "We don't churn tenants. We keep them. A long-term lease is better for everyone.",
        media: "montagueYard",
        reverse: true,
        items: [
          { title: "Stability", text: "One covenant tenant. One lease. No churn." },
          {
            title: "Purpose-built",
            text: "The space was designed for industrial operations from day one.",
          },
        ],
      },
    ],
    ctas: [
      {
        title: "Talk to us",
        text: "We know the building and we know the numbers. Ask us anything.",
        label: "Contact",
        subject: "Enquiry — 24 Montague",
      },
      {
        title: "See it",
        text: "Walk the floor and the yard. A site visit tells the truth.",
        label: "Book a viewing",
        subject: "Viewing request — 24 Montague",
      },
    ],
  },
  {
    slug: "albert-road",
    name: "219 Albert Road",
    shortName: "Albert Road",
    address: "219/237 Albert Road",
    area: "Woodstock",
    city: "Cape Town",
    type: "Industrial",
    tags: ["Industrial", "Woodstock", "Long-term tenancy"],
    summary:
      "A working industrial asset on a street that has always worked for a living. Space that works, and a landlord who stays.",
    hero: "albertHero",
    card: "albertInterior",
    facts: [
      { value: "100%", label: "Occupancy rate" },
      { value: "1", label: "Long-term tenant" },
      { value: "9%", label: "Yield track record" },
      { value: "15+", label: "Years operating" },
    ],
    blocks: [
      {
        type: "gallery",
        eyebrow: "The property",
        title: "A working asset in a working neighbourhood",
        media: ["albertHero", "albertInterior", "albertLoading", "albertStreet"],
      },
      {
        type: "longform",
        eyebrow: "Specifications",
        title: "Nothing clever about it. That is the point.",
        lead: "Industrial zoning, a straightforward layout, direct street loading and ceiling heights that allow for racking and vertical storage.",
        paragraphs: [
          "Floor plates are open and column-free where it matters. Power supply is stable, with backup in place.",
          "The infrastructure is not new, but it is maintained. Brickfield has run its own operations since 2019. We know what breaks and we fix it before it does.",
          "The roof is sound. The drainage works. The security is in-house.",
        ],
        media: "albertLoading",
      },
      {
        type: "split",
        eyebrow: "Tenancy",
        title: "A tenant who stays because the building works",
        text: "The current occupier has been here long enough to know every corner of the building. They stay because the space does what it should.",
        media: "albertInterior",
        reverse: true,
        stats: [
          { value: "100%", label: "Occupancy since the current covenant signed" },
          { value: "0", label: "Months of vacancy in the last five years" },
        ],
      },
    ],
    ctas: [
      {
        title: "Enquire now",
        text: "Talk to us about available space at 219 Albert Road.",
        label: "Contact",
        subject: "Enquiry — 219 Albert Road",
      },
      {
        title: "Visit us",
        text: "Find us at 35 Brickfield Road in Woodstock, around the corner.",
        label: "Book a visit",
        subject: "Visit request — 219 Albert Road",
      },
    ],
  },
];

export const propertyTypes: PropertyType[] = ["Mixed-use", "Office", "Industrial"];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const mailto = (subject: string, body?: string) =>
  `mailto:info@brickfieldgroup.co.za?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const CONTACT = {
  email: "info@brickfieldgroup.co.za",
  phone: "021 830 7050",
  tel: "tel:+27218307050",
  address: "35 Brickfield Road, Woodstock, Cape Town",
  maps: "https://www.google.com/maps/search/?api=1&query=35+Brickfield+Road+Woodstock+Cape+Town",
};
