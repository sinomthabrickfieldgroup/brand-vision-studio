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

export interface Spec {
  label: string;
  value: string;
  href?: string;
}

export interface BeforeAfterView {
  /** Pill label, e.g. "Exterior". */
  label: string;
  before: MediaId;
  after: MediaId;
  /** Optional one-line note under the slider, e.g. what the tab covers. */
  caption?: string;
}

export type Block =
  | {
      type: "beforeAfter";
      eyebrow: string;
      title: string;
      text: string;
      /** One pair, or several shown as pill tabs above the slider. */
      views: BeforeAfterView[];
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
      dark?: boolean;
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
      type: "compare";
      eyebrow: string;
      title: string;
      text: string;
      columns: { name: string; media: MediaId; stats: Stat[] }[];
    }
  /** Specification sheet: renders the property's specs, highlights and tenants. */
  | { type: "specs"; eyebrow: string; title: string; text?: string; media: MediaId }
  | { type: "marquee"; items: string[] };

export interface Property {
  slug: string;
  name: string;
  address: string;
  area: string;
  city: "Cape Town" | "Johannesburg";
  type: PropertyType;
  /** Label shown on the page, e.g. "Mixed-use flagship". */
  typeLabel: string;
  status: "Flagship" | "Active" | "New acquisition" | "Just completed";
  acquired: string;
  tenants: string[];
  headline: string;
  summary: string;
  hero: MediaId;
  /** Extra hero slides after the main photo. */
  slides?: MediaId[];
  card: MediaId;
  facts: Stat[];
  specs: Spec[];
  highlights: string[];
  external?: { label: string; href: string }[];
  blocks: Block[];
  ctas: [PropertyCta, PropertyCta];
}

export interface PropertyCta extends Item {
  label: string;
  /** Pre-selected topic on the enquiry form. */
  topic: "Register interest" | "Broker enquiry";
}

/**
 * Every property is currently 100% let, so we don't offer viewings (that would read as
 * vacancy). Prospective tenants register interest; brokers ask for the numbers.
 * Give a property its own ctas when it has space to let.
 */
function fullyLetCtas(): [PropertyCta, PropertyCta] {
  return [
    {
      title: "Register interest",
      text: "This building is fully let. Tell us what you need and we'll let you know first when space opens up, here or elsewhere in the portfolio.",
      label: "Register interest",
      topic: "Register interest",
    },
    {
      title: "Broker enquiries",
      text: "Ask for the specification, tenancy profile and track record. We reply within one business day.",
      label: "Broker enquiry",
      topic: "Broker enquiry",
    },
  ];
}

export const properties: Property[] = [
  {
    slug: "brickfield-canvas",
    name: "Brickfield Canvas",
    address: "35 Brickfield Road",
    area: "Woodstock",
    city: "Cape Town",
    type: "Mixed-use",
    typeLabel: "Mixed-use flagship",
    status: "Flagship",
    acquired: "2016",
    tenants: [],
    headline: "Redeveloped. Reimagined. Fully tenanted.",
    summary:
      "10,400m² of A-Grade workspace in Woodstock, home to 20+ businesses across tech, health, finance and the sciences. Built green, fully tenanted since 2022.",
    hero: "canvasHero",
    slides: ["canvasLobby", "canvasCafe", "canvasCourtyard", "canvasOffices", "canvasGym"],
    card: "canvasLobby",
    facts: [
      { value: "10,400m²", label: "Gross lettable area" },
      { value: "100%", label: "Tenanted since 2022" },
      { value: "20+", label: "Businesses on campus" },
      { value: "2019", label: "Completed" },
    ],
    specs: [
      { label: "Address", value: "35 Brickfield Road, Woodstock" },
      { label: "GLA", value: "10,400m²" },
      { label: "Erf size", value: "17,527m²" },
      { label: "Uses", value: "Co-working, café, studios, event space" },
      { label: "Parking", value: "148 single + 21 tandem bays" },
      {
        label: "Tenants",
        value: "Meet the tenants",
        href: "https://brickfieldcanvas.com/community#tenants",
      },
      { label: "Acquired", value: "2016" },
      { label: "Completed", value: "2019" },
    ],
    highlights: [
      "A-Grade workspace in the heart of Woodstock",
      "Green-tech infrastructure: solar, borehole, in-slab heating and living walls",
      "Home to 20+ businesses across tech, health, biotech, finance and consulting",
      "50% HVAC efficiency above baseline",
      "24/7 generator-backed power with automatic failover",
      "148 single + 21 tandem parking bays on site",
      "Walk score 92. 10 minutes to the CBD",
    ],
    external: [
      { label: "Visit Brickfield Canvas", href: "https://brickfieldcanvas.com" },
      { label: "Meet the tenants", href: "https://brickfieldcanvas.com/community#tenants" },
    ],
    blocks: [
      {
        type: "beforeAfter",
        eyebrow: "The transformation",
        title: "From general industrial to a campus for Africa's next decade",
        text: "In 2016 we acquired a general industrial property at 35 Brickfield Road. Over three years it was stripped back and rebuilt. Drag to see the difference.",
        views: [{ label: "Exterior", before: "canvasBefore", after: "canvasAfter" }],
      },
      {
        type: "specs",
        eyebrow: "Specifications",
        title: "The numbers behind disciplined adaptive reuse",
        text: "Canvas sits alongside the Brickfield Call Centre on a combined 21,000m² land parcel, with circa 14,000m² of office space in total.",
        media: "canvasOffices",
      },
      {
        type: "tabs",
        eyebrow: "On campus",
        title: "Everything Canvas is built to offer",
        text: "A-Grade offices with the amenities that make people want to come in.",
        tabs: [
          {
            label: "Community",
            title: "20+ businesses, one campus",
            text: "Tech, health, biotech, finance and consulting, working side by side.",
            media: "canvasBreakout",
          },
          {
            label: "Café",
            title: "The community café",
            text: "Where tenants meet each other, from the first coffee to the last meeting.",
            media: "canvasCafe",
          },
          {
            label: "Meeting rooms",
            title: "10 meeting rooms",
            text: "Bookable rooms for every size of conversation, available to every tenant.",
            media: "canvasMeeting",
          },
          {
            label: "Co-working",
            title: "Co-working and studios",
            text: "Room to start small and grow without leaving the building.",
            media: "canvasCowork",
          },
          {
            label: "Events",
            title: "Event space",
            text: "Talks, launches and socials that turn neighbours into a network.",
            media: "canvasEvents",
          },
          {
            label: "Gym",
            title: "An on-site gym",
            text: "Wellness on campus, no detour before or after work.",
            media: "canvasGym",
          },
        ],
      },
      {
        type: "verticals",
        eyebrow: "Who's here",
        title: "The businesses shaping what comes next",
        text: "Completed in 2019 and fully tenanted since 2022. The mix is broad by design.",
        media: "canvasCafe",
        items: [
          { title: "Tech", text: "Software, platforms and product teams." },
          { title: "Health", text: "Medical and wellness practices." },
          { title: "Biotech", text: "Life-science and research businesses." },
          { title: "Finance", text: "Financial services and fintech." },
          { title: "Consulting", text: "Advisory and professional services." },
          { title: "The sciences", text: "Specialists who need A-Grade space." },
        ],
      },
      {
        type: "tabs",
        eyebrow: "Infrastructure",
        title: "Green infrastructure, running quietly in the background",
        text: "Built green from the start, so tenants never have to think about it.",
        dark: true,
        tabs: [
          {
            label: "Power",
            title: "24/7 power with automatic failover",
            text: "Rooftop solar carries daytime load, with generator backup that switches over on its own.",
            media: "canvasSolar",
          },
          {
            label: "Water",
            title: "A borehole on site",
            text: "Water independence built into the ground, not left to the municipal supply.",
            media: "borehole",
          },
          {
            label: "Climate",
            title: "50% HVAC efficiency above baseline",
            text: "In-slab heating and living walls keep the building comfortable and efficient.",
            media: "canvasLivingWall",
          },
        ],
      },
      {
        type: "split",
        eyebrow: "Location",
        title: "In the heart of Woodstock, ten minutes from the CBD",
        text: "Easy to walk to, easy to drive to and easy to park at.",
        media: "canvasCourtyard",
        reverse: true,
        stats: [
          { value: "92", label: "Walk score" },
          { value: "10 min", label: "To the CBD" },
          { value: "169", label: "Parking bays on site" },
          { value: "21,000m²", label: "Combined land parcel" },
        ],
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "Walk the campus",
        media: [
          "canvasLobby",
          "canvasCourtyard",
          "canvasBreakout",
          "canvasMeeting",
          "canvasAtrium",
          "canvasGym",
          "canvasNook",
          "canvasOffices",
        ],
      },
    ],
    ctas: fullyLetCtas(),
  },
  {
    slug: "9-loop-street",
    name: "9 Loop Street",
    address: "9 Loop Street",
    area: "Maitland",
    city: "Cape Town",
    type: "Industrial",
    typeLabel: "Industrial",
    status: "Just completed",
    acquired: "March 2026",
    tenants: ["AMD Engineering"],
    headline: "Refurbished from the ground up.",
    summary:
      "A newly refurbished premium industrial facility in Maitland: 2,362m² GLA, 400A three-phase power and dual yard access, occupied by AMD Engineering.",
    hero: "loopHero",
    slides: ["loopWarehouse", "loopOffice", "loopTopDown"],
    card: "loopWarehouse",
    facts: [
      { value: "2,362m²", label: "Gross lettable area" },
      { value: "400A", label: "Three-phase power" },
      { value: "925m²", label: "Surfaced yard" },
      { value: "100%", label: "Occupied" },
    ],
    specs: [
      { label: "Address", value: "9 Loop Street, Maitland" },
      { label: "GLA", value: "2,362m²" },
      { label: "Erf size", value: "3,287m²" },
      { label: "Zoning", value: "General Industrial" },
      { label: "Warehouse", value: "1,770m² column-efficient floor plate" },
      { label: "Mezzanine", value: "302m²" },
      { label: "Office block", value: "290m² admin and reception" },
      { label: "Yard", value: "925m² surfaced, container and truck handling" },
      { label: "Power supply", value: "400A three-phase" },
      { label: "Security", value: "24hr manned + armed response" },
      { label: "Acquired", value: "March 2026" },
      { label: "Completed", value: "August 2026" },
    ],
    highlights: [
      "Dual yard access via Loop Street and Norway Street",
      "400A three-phase power suited to heavy engineering and fabrication",
      "Comprehensively refurbished in 2026, 100% occupied",
      "Home to AMD Engineering, a specialist steel fabrication firm established in 1993",
    ],
    blocks: [
      {
        type: "beforeAfter",
        eyebrow: "Newly completed · August 2026",
        title: "Five months from depot to premium facility",
        text: "Before the refurbishment, 9 Loop Street was a conventional industrial warehouse and logistics depot. Now it has upgraded power, modern offices and yard access built for heavy link trucks.",
        views: [
          { label: "Exterior", before: "loopBefore", after: "loopHero" },
          { label: "Interior", before: "loopInteriorBefore", after: "loopWarehouse" },
          { label: "Mezzanine", before: "loopMezzanineBefore", after: "loopOffice" },
          {
            label: "Facilities",
            before: "loopFacilitiesBefore",
            after: "loopFacilitiesAfter",
            caption: "Offices and bathrooms",
          },
        ],
      },
      {
        type: "split",
        eyebrow: "The facility",
        title: "Designed around the way industry works",
        text: "A column-efficient warehouse floor with a modern office and canteen block, and a yard that trucks can actually use.",
        media: "loopWarehouse",
        items: [
          {
            title: "1,770m² warehouse",
            text: "A column-efficient floor plate, plus a 302m² mezzanine.",
          },
          { title: "Dual yard access", text: "Trucks enter from Loop Street and Norway Street." },
          { title: "290m² office block", text: "Admin, reception and canteen for the team." },
        ],
      },
      {
        type: "specs",
        eyebrow: "Specifications",
        title: "Built for heavy engineering",
        media: "loopPower",
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "Strong bones, clean lines",
        media: ["loopHero", "loopWarehouse", "loopOffice", "loopYard", "loopTopDown", "loopGuardhouse"],
      },
      {
        type: "split",
        eyebrow: "Tenant",
        title: "Purpose-suited to AMD Engineering",
        text: "The first tenant is AMD Engineering, a Maitland-based specialist in steel fabrication and manufacturing, established in 1993. The 400A supply and column-efficient floor were suited to how they work.",
        media: "loopFabrication",
        reverse: true,
        stats: [
          { value: "1993", label: "AMD Engineering established" },
          { value: "100%", label: "Occupied on completion" },
        ],
      },
    ],
    ctas: fullyLetCtas(),
  },
  {
    slug: "brickfield-call-centre",
    name: "Brickfield Call Centre",
    address: "33 Brickfield Road",
    area: "Woodstock",
    city: "Cape Town",
    type: "Office",
    typeLabel: "Office",
    status: "Active",
    acquired: "2009",
    tenants: ["Nimble Group"],
    headline: "Single covenant. Long term.",
    summary:
      "6,101m² of purpose-built office space in Woodstock, fully occupied by Nimble Group, next door to Brickfield Canvas.",
    hero: "callHero",
    slides: [],
    card: "callFloor",
    facts: [
      { value: "6,101m²", label: "Contiguous office space" },
      { value: "68", label: "Parking bays" },
      { value: "100%", label: "Occupied" },
      { value: "2009", label: "Acquired" },
    ],
    specs: [
      { label: "Address", value: "33 Brickfield Road, Woodstock" },
      { label: "GLA", value: "6,101m²" },
      { label: "Erf size", value: "7,362m²" },
      { label: "Zoning", value: "General Industrial" },
      { label: "Parking", value: "68 open bays (expandable)" },
      { label: "Tenant", value: "Nimble Group" },
      { label: "Acquired", value: "2009" },
    ],
    highlights: [
      "6,101m² of contiguous office space, rare in the Woodstock node",
      "68 parking bays with the option to expand on and off site",
      "Direct access to Brickfield Canvas: café, gym, function space and meeting rooms",
      "Fully occupied, single long-term covenant with Nimble Group",
    ],
    blocks: [
      {
        type: "split",
        eyebrow: "Purpose-built",
        title: "Built around one tenant's operations",
        text: "Tucked away from the main road but well connected for commutes, 33 Brickfield Road was purpose-built for Nimble Group's operational needs. Six thousand square metres of contiguous office space in the Woodstock node is rare, and Nimble Group's continued occupation speaks to that.",
        media: "callFloor",
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "Exterior, workspaces and common areas",
        media: ["callHero", "callFloor", "callBreakout", "callEntrance"],
      },
      {
        type: "split",
        eyebrow: "Next door",
        title: "Canvas amenities, on tap",
        text: "The building has direct access to Brickfield Canvas next door, on a combined 21,000m² land parcel.",
        media: "canvasCafe",
        reverse: true,
        bullets: ["Community café", "Gym", "Function space", "Meeting rooms"],
      },
      {
        type: "specs",
        eyebrow: "Specifications",
        title: "The asset at a glance",
        media: "callEntrance",
      },
    ],
    ctas: fullyLetCtas(),
  },
  {
    slug: "66-68-wierda",
    name: "66/68 Wierda",
    address: "66 & 68 Wierda Road East",
    area: "Wierda Valley, Sandton",
    city: "Johannesburg",
    type: "Office",
    typeLabel: "Office",
    status: "Active",
    acquired: "2014",
    tenants: ["Nimble Group"],
    headline: "Two buildings. One covenant.",
    summary:
      "Two A-Grade office buildings in Wierda Valley, Sandton: 5,636m² GLA combined, fully let to Nimble Group on a long-term basis.",
    hero: "wierdaHero",
    slides: ["wierdaJacaranda", "wierdaLogoFront", "wierdaGarden", "wierdaCourtyard"],
    card: "wierdaJacaranda",
    facts: [
      { value: "5,636m²", label: "Combined GLA" },
      { value: "2", label: "A-Grade buildings" },
      { value: "195", label: "Parking bays" },
      { value: "100%", label: "Let to Nimble Group" },
    ],
    specs: [
      { label: "Address", value: "66 & 68 Wierda Road East, Wierda Valley" },
      { label: "Combined GLA", value: "5,636m²" },
      { label: "66 Wierda GLA", value: "1,806m²" },
      { label: "68 Wierda GLA", value: "3,830m²" },
      { label: "66 Wierda erf size", value: "5,800m²" },
      { label: "Parking, 66 Wierda", value: "18 basement + 39 undercover" },
      { label: "Parking, 68 Wierda", value: "63 basement + 41 undercover + 34 open" },
      { label: "Total parking", value: "195 bays" },
      { label: "Tenant", value: "Nimble Group" },
      { label: "Acquired", value: "2014" },
    ],
    highlights: [
      "5,636m² combined GLA across two A-Grade buildings",
      "Fully let to Nimble Group, a single long-term covenant",
      "195 parking bays across basement, undercover and open",
    ],
    blocks: [
      {
        type: "split",
        eyebrow: "The holding",
        title: "Acquired separately. Operated as one.",
        text: "66 and 68 Wierda Road East are neighbouring A-Grade office properties in Wierda Valley, Sandton. Together they are fully let to Nimble Group.",
        media: "wierdaSignage",
      },
      {
        type: "compare",
        eyebrow: "Side by side",
        title: "Two buildings, one asset",
        text: "How the space and parking split across the pair.",
        columns: [
          {
            name: "66 Wierda",
            media: "wierdaBlockB",
            stats: [
              { value: "1,806m²", label: "GLA" },
              { value: "57", label: "Parking bays", text: "18 basement + 39 undercover" },
            ],
          },
          {
            name: "68 Wierda",
            media: "wierdaFacade",
            stats: [
              { value: "3,830m²", label: "GLA" },
              {
                value: "138",
                label: "Parking bays",
                text: "63 basement + 41 undercover + 34 open",
              },
            ],
          },
        ],
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "The buildings and the precinct",
        media: [
          "wierdaHero",
          "wierdaJacaranda",
          "wierdaLogoFront",
          "wierdaPrecinct",
          "wierdaGarden",
          "wierdaCourtyard",
          "wierdaLobby",
          "wierdaFloor",
          "wierdaBreakout",
          "wierdaCanteen",
          "wierdaKitchen",
          "wierdaBoardroom",
          "wierdaRoses",
          "wierdaNsoEntrance",
        ],
      },
      {
        type: "specs",
        eyebrow: "Specifications",
        title: "The asset at a glance",
        media: "wierdaGarden",
      },
    ],
    ctas: fullyLetCtas(),
  },
  {
    slug: "24-montague",
    name: "24 Montague",
    address: "24 Montague Drive",
    area: "Montague Gardens",
    city: "Cape Town",
    type: "Industrial",
    typeLabel: "Industrial",
    status: "Active",
    acquired: "2012",
    tenants: ["Wispeco", "Rich Home"],
    headline: "Two businesses. One well-run park.",
    summary:
      "A multi-tenant industrial park in Montague Gardens: a 7,362m² General Industrial site with dual access, 35 parking bays and room to load.",
    hero: "montagueHero",
    slides: ["montagueYard", "montagueInterior"],
    card: "montagueInterior",
    facts: [
      { value: "4,232m²", label: "Gross lettable area" },
      { value: "7,362m²", label: "Erf size" },
      { value: "2", label: "Established tenants" },
      { value: "2012", label: "Acquired" },
    ],
    specs: [
      { label: "Address", value: "24 Montague Drive, Montague Gardens" },
      { label: "GLA", value: "4,232m²" },
      { label: "Erf size", value: "7,362m²" },
      { label: "Zoning", value: "General Industrial" },
      { label: "Parking", value: "35 bays + 10 visitor bays" },
      { label: "Tenants", value: "Wispeco, Rich Home" },
      { label: "Acquired", value: "2012" },
    ],
    highlights: [
      "7,362m² General Industrial erf in Montague Gardens",
      "35 parking bays + 10 visitor bays on site",
      "Dual access, suited to logistics and manufacturing operations",
    ],
    blocks: [
      {
        type: "split",
        eyebrow: "The park",
        title: "Managed to a standard that keeps serious operators",
        text: "Acquired in 2012, 24 Montague is home to two established businesses, Wispeco and Rich Home. The park offers dual access, ample parking and loading facilities.",
        media: "montagueYard",
        items: [
          { title: "Dual access", text: "Suited to logistics and manufacturing." },
          { title: "Parking and loading", text: "35 bays plus 10 for visitors." },
          { title: "General Industrial", text: "Zoned for the work that happens here." },
        ],
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "The park, the yard and the street it works on",
        media: ["montagueHero", "montagueYard", "montagueInterior", "montagueStreet"],
      },
      {
        type: "specs",
        eyebrow: "Specifications",
        title: "The asset at a glance",
        media: "montagueInterior",
      },
    ],
    ctas: fullyLetCtas(),
  },
  {
    slug: "219-albert-road",
    name: "219 Albert Road",
    address: "219 Albert Road",
    area: "Woodstock",
    city: "Cape Town",
    type: "Industrial",
    typeLabel: "Industrial",
    status: "New acquisition",
    acquired: "October 2025",
    tenants: ["Jambo", "Digital Express"],
    headline: "Heritage bones. Modern tenants.",
    summary:
      "A heritage industrial building on Albert Road, Woodstock, home to a mix of makers and print operations.",
    hero: "albertHero",
    slides: ["albertInterior", "albertLoading"],
    card: "albertInterior",
    facts: [
      { value: "5,200m²", label: "Gross lettable area" },
      { value: "13m", label: "Maximum height" },
      { value: "300A", label: "Power supply" },
      { value: "2025", label: "Acquired" },
    ],
    specs: [
      { label: "Address", value: "219 Albert Road, Woodstock" },
      { label: "GLA", value: "5,200m²" },
      { label: "Erf size", value: "5,769m²" },
      { label: "Zoning", value: "Mixed-use" },
      { label: "Height", value: "7.5m to 13m" },
      { label: "Power supply", value: "300A" },
      { label: "Tenants", value: "Jambo, Digital Express" },
      { label: "Acquired", value: "October 2025" },
    ],
    highlights: [
      "Heritage industrial building in Woodstock",
      "A tenant mix of makers and print operations",
      "Acquired October 2025",
    ],
    blocks: [
      {
        type: "split",
        eyebrow: "Heritage",
        title: "Character preserved, spaces made ready",
        text: "Acquired in October 2025, 219 Albert Road sits on the edge of Woodstock, one of Cape Town's most active creative and light-industrial corridors. Its spaces have been made ready for a new generation of makers, printers and fabricators.",
        media: "heritageDetail",
        stats: [
          { value: "7.5–13m", label: "Ceiling heights" },
          { value: "5,769m²", label: "Erf size" },
        ],
      },
      {
        type: "gallery",
        eyebrow: "Gallery",
        title: "A working building in a working neighbourhood",
        media: ["albertHero", "albertInterior", "albertLoading", "albertStreet"],
      },
      {
        type: "specs",
        eyebrow: "Specifications",
        title: "The asset at a glance",
        media: "albertLoading",
      },
    ],
    ctas: fullyLetCtas(),
  },
];

export const propertyTypes: PropertyType[] = ["Mixed-use", "Office", "Industrial"];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

/** Portfolio-wide totals, computed so they stay right as properties change. */
export const portfolioTotals = (() => {
  const gla = properties.reduce(
    (sum, p) =>
      sum +
      Number(
        (p.facts.find((f) => /GLA|lettable|office space/i.test(f.label))?.value ?? "0").replace(
          /[^\d]/g,
          "",
        ),
      ),
    0,
  );
  return { gla, count: properties.length, cities: new Set(properties.map((p) => p.city)).size };
})();

export const mailto = (subject: string, body?: string) =>
  `mailto:info@brickfieldgroup.co.za?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const CONTACT = {
  email: "info@brickfieldgroup.co.za",
  phone: "021 830 0750",
  tel: "tel:+27218300750",
  address: "35 Brickfield Road, Woodstock, Cape Town",
  maps: "https://www.google.com/maps/search/?api=1&query=35+Brickfield+Road+Woodstock+Cape+Town",
};
