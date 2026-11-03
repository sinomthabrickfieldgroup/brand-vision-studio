/**
 * SHOT LIST — every image on the site comes from this file.
 *
 * Until the real photoshoot images are selected, slots without a `src` render an
 * art-directed placeholder frame (tone + grain + shot title). To fill a slot:
 *   1. Generate an image from its `prompt` (or pick the matching photo from the shoot),
 *   2. add it to src/assets (or upload via Lovable),
 *   3. set `src` on the slot below.
 *
 * AI-generated images are stand-ins for layout review only. Replace every one with real
 * photography before launch: this is a property site and buyers, lenders and tenants
 * will assume the buildings shown are the real ones.
 */
import canvasPhoto from "@/assets/brickfield-canvas.asset.json";
import loopPhoto from "@/assets/loop-street-photo.asset.json";

export type Tone = "stone" | "dusk" | "concrete" | "sage" | "brick" | "night";
export type Aspect = "21/9" | "16/9" | "3/2" | "4/3" | "4/5" | "1/1" | "3/4";

export interface Shot {
  title: string;
  alt: string;
  aspect: Aspect;
  tone: Tone;
  prompt: string;
  src?: string;
}

/** Shared art direction appended to every prompt so the set reads as one shoot. */
export const HOUSE_STYLE =
  "Photorealistic architectural editorial photograph for a property investment company in Cape Town, South Africa. " +
  "Light, airy, warm-neutral colour grade with soft ochre and terracotta accents, natural light, gentle contrast, " +
  "medium-format camera, subtle film grain, calm and confident mood, magazine quality. " +
  "Any people are incidental, candid and out of focus. No text, no signage lettering, no logos, no watermark.";

const shot = (s: Shot) => s;

export const media = {
  // ── Brickfield Canvas (35 Brickfield Road, Woodstock) ──────────────────────
  canvasHero: shot({
    title: "Canvas · exterior, morning",
    alt: "Brickfield Canvas exterior in Woodstock, Cape Town",
    aspect: "21/9",
    tone: "stone",
    src: canvasPhoto.url,
    prompt:
      "Wide street-level view of a converted three-storey industrial brick building turned modern office campus, large steel-framed windows, a planted green living wall, clean paving and young trees, Table Mountain softly visible in the haze behind, low morning sun raking across the facade.",
  }),
  canvasBefore: shot({
    title: "Canvas · before, 2016",
    alt: "The industrial shell at 35 Brickfield Road before redevelopment",
    aspect: "16/9",
    tone: "concrete",
    prompt:
      "The same converted industrial building BEFORE redevelopment: a tired 1970s brick-and-concrete warehouse, faded paint, rusted roller doors, cracked yard, overcast flat light, documentary style, identical framing to a straight-on wide facade shot.",
  }),
  canvasAfter: shot({
    title: "Canvas · after, today",
    alt: "Brickfield Canvas after its transformation into a mixed-use precinct",
    aspect: "16/9",
    tone: "stone",
    prompt:
      "The same building AFTER redevelopment from an identical straight-on wide facade framing: restored brick, new black steel windows, a green living wall, landscaped forecourt with benches and trees, warm golden-hour light.",
  }),
  canvasCourtyard: shot({
    title: "Canvas · courtyard",
    alt: "Shared courtyard at Brickfield Canvas",
    aspect: "4/5",
    tone: "sage",
    prompt:
      "Inner courtyard of a converted industrial office campus, exposed brick, steel walkways, potted olive trees and timber benches, two people chatting out of focus, dappled late-afternoon light.",
  }),
  canvasCafe: shot({
    title: "Canvas · café",
    alt: "The community café at Brickfield Canvas",
    aspect: "4/3",
    tone: "brick",
    prompt:
      "Bright community café inside a converted warehouse, polished concrete floor, long timber counter, pendant lights, espresso machine, people working on laptops in soft focus, morning light through tall steel windows.",
  }),
  canvasCowork: shot({
    title: "Canvas · co-working",
    alt: "Co-working space at Brickfield Canvas",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Calm co-working floor in a converted industrial building, long oak desks, exposed concrete soffit and services, indoor plants, large windows, soft daylight, a few people focused on work, out of focus.",
  }),
  canvasMeeting: shot({
    title: "Canvas · meeting room",
    alt: "Glass-walled meeting room at Brickfield Canvas",
    aspect: "4/3",
    tone: "concrete",
    prompt:
      "Glass-walled meeting room with a large timber table and black chairs, exposed brick wall, a screen on the wall turned off, soft daylight, empty and ready for use.",
  }),
  canvasGym: shot({
    title: "Canvas · gym",
    alt: "On-site gym at Brickfield Canvas",
    aspect: "4/3",
    tone: "night",
    prompt:
      "Small boutique gym in a converted warehouse, rubber floor, timber wall slats, racks of dumbbells and two rowing machines, warm accent lighting, empty, early evening.",
  }),
  canvasEvents: shot({
    title: "Canvas · community event",
    alt: "A community event in the Canvas courtyard",
    aspect: "4/3",
    tone: "dusk",
    prompt:
      "Evening community event in a brick courtyard, festoon string lights, people standing in small groups holding drinks, all slightly out of focus, warm dusk sky.",
  }),
  canvasOffices: shot({
    title: "Canvas · offices",
    alt: "A-grade office suite at Brickfield Canvas",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "A-grade private office suite inside a heritage industrial conversion, oak floors, white walls, black steel window frames, plants, ergonomic desks, bright clean daylight.",
  }),
  canvasSolar: shot({
    title: "Canvas · rooftop solar",
    alt: "Rooftop solar array at Brickfield Canvas",
    aspect: "16/9",
    tone: "stone",
    prompt:
      "Aerial drone view of rows of solar PV panels on an industrial building roof in Woodstock, Cape Town, city grid and Table Mountain in the background, crisp clear afternoon light.",
  }),

  // ── 9 Loop Street (Maitland) ───────────────────────────────────────────────
  loopHero: shot({
    title: "9 Loop Street · facade",
    alt: "9 Loop Street industrial facility in Maitland",
    aspect: "21/9",
    tone: "concrete",
    src: loopPhoto.url,
    prompt:
      "Freshly refurbished industrial facility in Maitland, Cape Town: clean charcoal steel cladding, large roller doors, a two-storey office block with glazing, a concrete truck yard, clear blue sky, crisp midday light.",
  }),
  loopWarehouse: shot({
    title: "9 Loop Street · warehouse floor",
    alt: "Column-efficient warehouse floor at 9 Loop Street",
    aspect: "16/9",
    tone: "concrete",
    prompt:
      "Interior of a large, clean, column-efficient steel-portal warehouse, epoxy-coated concrete floor, high-bay LED lights, roof sheeting with translucent panels, an overhead crane rail, empty, cool even light.",
  }),
  loopYard: shot({
    title: "9 Loop Street · truck yard",
    alt: "Yard access at 9 Loop Street",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Wide concrete truck yard beside a refurbished industrial building, a delivery truck reversing to a loading door, painted bay lines, palisade fence, afternoon sun.",
  }),
  loopOffice: shot({
    title: "9 Loop Street · office block",
    alt: "Office and canteen block at 9 Loop Street",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Modern office and canteen block attached to a warehouse, glazed facade, simple timber and steel interior visible, neat landscaping strip, soft afternoon light.",
  }),
  loopPower: shot({
    title: "9 Loop Street · 400A supply",
    alt: "Upgraded three-phase power distribution at 9 Loop Street",
    aspect: "4/3",
    tone: "night",
    prompt:
      "Close-up of a new industrial three-phase electrical distribution board in a clean plant room, neatly labelled cable trays, steel cabinets, cool directional light, sharp detail.",
  }),
  loopFabrication: shot({
    title: "9 Loop Street · in operation",
    alt: "Steel fabrication work under way inside 9 Loop Street",
    aspect: "4/5",
    tone: "dusk",
    prompt:
      "Steel fabrication workshop in operation, sparks from a welder in the mid-ground, steel beams on trestles, warm glow against a cool warehouse interior, worker unrecognisable behind a welding mask.",
  }),

  // ── Brickfield Call Centre (33 Brickfield Road, Woodstock) ────────────────
  callHero: shot({
    title: "Call Centre · exterior",
    alt: "Brickfield Call Centre office building in Woodstock",
    aspect: "21/9",
    tone: "brick",
    prompt:
      "Purpose-built three-storey office building in Woodstock, Cape Town, red face-brick with long horizontal bands of glazing, a neat entrance canopy, street trees, warm late-afternoon light.",
  }),
  callFloor: shot({
    title: "Call Centre · open floor",
    alt: "High-density open-plan floor at Brickfield Call Centre",
    aspect: "16/9",
    tone: "stone",
    prompt:
      "Large high-density open-plan office floor with rows of workstations, acoustic ceiling baffles, carpet tiles, daylight from long windows, people working in soft focus.",
  }),
  callBreakout: shot({
    title: "Call Centre · breakout",
    alt: "Staff breakout area at Brickfield Call Centre",
    aspect: "4/3",
    tone: "sage",
    prompt:
      "Bright staff breakout and canteen area in an office building, long tables, plants, a kitchen counter, warm natural light, a few people on a break out of focus.",
  }),
  callPlant: shot({
    title: "Call Centre · backup power",
    alt: "Backup generator and UPS plant serving Brickfield Call Centre",
    aspect: "4/3",
    tone: "night",
    prompt:
      "Clean plant room with a large standby diesel generator and UPS cabinets, painted floor, cable trays, cool directional light, sharp detail.",
  }),
  callEntrance: shot({
    title: "Call Centre · reception",
    alt: "Secure reception at Brickfield Call Centre",
    aspect: "4/5",
    tone: "stone",
    prompt:
      "Secure office reception with access turnstiles, a timber reception desk, a security officer in a neat uniform standing out of focus, polished floor, daylight.",
  }),

  // ── 66/68 Wierda (Wierda Valley, Sandton) ──────────────────────────────────
  wierdaHero: shot({
    title: "66/68 Wierda · exterior",
    alt: "66/68 Wierda office building in Wierda Valley, Sandton",
    aspect: "21/9",
    tone: "dusk",
    prompt:
      "Contemporary four-storey office building in Wierda Valley, Sandton, Johannesburg, pale stone and glass facade, mature jacaranda trees, Highveld golden-hour light, clear sky.",
  }),
  wierdaLobby: shot({
    title: "66/68 Wierda · lobby",
    alt: "Lobby at 66/68 Wierda",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Calm double-volume office lobby, stone floor, timber slat wall, sculptural pendant light, a large plant, warm daylight, empty.",
  }),
  wierdaFloor: shot({
    title: "66/68 Wierda · office floor",
    alt: "Office floor at 66/68 Wierda",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Single-tenant corporate office floor, glass meeting rooms along one side, workstations, city views of Sandton through floor-to-ceiling glazing, soft afternoon light.",
  }),
  wierdaStreet: shot({
    title: "66/68 Wierda · precinct",
    alt: "The Wierda Valley precinct around 66/68 Wierda",
    aspect: "4/3",
    tone: "sage",
    prompt:
      "Leafy Sandton office precinct street, pavements under trees, low-rise office buildings, a few pedestrians in business attire out of focus, golden light.",
  }),

  // ── 24 Montague Drive (Montague Gardens) ──────────────────────────────────
  montagueHero: shot({
    title: "24 Montague · exterior",
    alt: "24 Montague Drive industrial building",
    aspect: "21/9",
    tone: "concrete",
    prompt:
      "Well-kept mid-size industrial warehouse in Montague Gardens, Cape Town, light grey cladding, a row of roller doors, a staff parking area, mountains faint on the horizon, clean even midday light.",
  }),
  montagueYard: shot({
    title: "24 Montague · loading",
    alt: "Direct street loading at 24 Montague Drive",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Truck backed up to a roller-door loading bay at an industrial warehouse, wide turning area, painted lines, clear afternoon light.",
  }),
  montagueInterior: shot({
    title: "24 Montague · floor plate",
    alt: "Open, column-free floor plate at 24 Montague Drive",
    aspect: "4/3",
    tone: "concrete",
    prompt:
      "Open column-free warehouse interior with pallet racking along one wall, clean concrete floor, high-bay lights, roof skylights, empty, even light.",
  }),
  montagueStreet: shot({
    title: "24 Montague · the street",
    alt: "The industrial street around 24 Montague Drive",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Broad industrial-park street lined with warehouses and palm trees, a truck in the distance, clear blue sky, crisp midday light.",
  }),

  // ── 219/237 Albert Road (Woodstock) ───────────────────────────────────────
  albertHero: shot({
    title: "219 Albert Road · exterior",
    alt: "219/237 Albert Road industrial building in Woodstock",
    aspect: "21/9",
    tone: "brick",
    prompt:
      "Older but well-maintained red-brick industrial building on a busy Woodstock street, painted steel roller doors, a neat pavement, traditional Cape Town terrace houses nearby, late-afternoon light.",
  }),
  albertInterior: shot({
    title: "219 Albert Road · interior",
    alt: "Warehouse interior at 219 Albert Road",
    aspect: "4/3",
    tone: "concrete",
    prompt:
      "High-ceiling brick warehouse interior with steel roof trusses, pallet racking for vertical storage, clean concrete floor, daylight through high windows.",
  }),
  albertLoading: shot({
    title: "219 Albert Road · loading",
    alt: "Street loading access at 219 Albert Road",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Street-level loading door on a brick industrial building, a small delivery truck at the kerb, Woodstock street life out of focus, warm light.",
  }),
  albertStreet: shot({
    title: "219 Albert Road · Woodstock",
    alt: "Albert Road, Woodstock",
    aspect: "4/3",
    tone: "dusk",
    prompt:
      "Albert Road in Woodstock, Cape Town at dusk, a mix of old industrial buildings and creative studios, street lights coming on, Devil's Peak in the background.",
  }),

  // ── Group, people and operations ──────────────────────────────────────────
  aboutHero: shot({
    title: "Woodstock · from above",
    alt: "Aerial view over Woodstock towards Table Mountain",
    aspect: "21/9",
    tone: "stone",
    prompt:
      "Aerial view over the Woodstock and Salt River industrial district of Cape Town, a mix of old warehouses and converted buildings, Table Mountain and Devil's Peak behind, soft morning haze.",
  }),
  precinct: shot({
    title: "Precinct · a city block",
    alt: "A Woodstock city block of adjacent industrial buildings",
    aspect: "4/3",
    tone: "brick",
    prompt:
      "Elevated view of a single Woodstock city block where several adjacent industrial buildings are being upgraded together, new roofs and solar panels on some, scaffolding on one, golden light.",
  }),
  heritageDetail: shot({
    title: "Detail · restored brick and steel",
    alt: "Detail of restored brick and new steel windows",
    aspect: "4/5",
    tone: "brick",
    prompt:
      "Close architectural detail of restored century-old red brick meeting a new black steel window frame, texture sharp, raking warm side light.",
  }),
  portraitTrevor: shot({
    title: "Portrait · CEO",
    alt: "Portrait of the CEO of Brickfield Group",
    aspect: "3/4",
    tone: "stone",
    prompt:
      "Placeholder only — use the real headshot from the shoot. Environmental portrait setting: exposed brick wall, soft window light.",
  }),
  portraitRowan: shot({
    title: "Portrait · Director",
    alt: "Portrait of a director of Brickfield Group",
    aspect: "3/4",
    tone: "concrete",
    prompt:
      "Placeholder only — use the real headshot from the shoot. Environmental portrait setting: steel-framed window, soft daylight.",
  }),
  portraitTimothy: shot({
    title: "Portrait · COO",
    alt: "Portrait of the COO of Brickfield Group",
    aspect: "3/4",
    tone: "sage",
    prompt:
      "Placeholder only — use the real headshot from the shoot. Environmental portrait setting: Canvas courtyard, open shade.",
  }),
  cleaningTeam: shot({
    title: "Services · cleaning team",
    alt: "Brickfield's in-house cleaning team at work",
    aspect: "4/5",
    tone: "sage",
    prompt:
      "Commercial cleaning team in neat matching charcoal uniforms polishing a concrete floor in a bright office lobby, faces turned away or out of focus, morning light, sense of pride and care.",
  }),
  cleaningDetail: shot({
    title: "Services · cleaning detail",
    alt: "Detail of commercial cleaning work",
    aspect: "4/3",
    tone: "stone",
    prompt:
      "Close detail of a gloved hand wiping a glass partition with a microfibre cloth, reflections of an office interior, crisp clean light.",
  }),
  securityTeam: shot({
    title: "Services · security team",
    alt: "Brickfield's in-house security officer on patrol",
    aspect: "4/5",
    tone: "night",
    prompt:
      "Uniformed security officer walking a well-lit brick courtyard of an office campus at blue hour, radio on shoulder, seen from behind and slightly side-on, calm and professional.",
  }),
  securityControl: shot({
    title: "Services · control room",
    alt: "Security control room",
    aspect: "4/3",
    tone: "night",
    prompt:
      "Compact security control room with a wall of CCTV monitors showing building exteriors, an officer's silhouette at the desk, cool screen glow.",
  }),
  borehole: shot({
    title: "Sustainability · borehole and tanks",
    alt: "Borehole and water storage tanks",
    aspect: "4/3",
    tone: "sage",
    prompt:
      "Neat installation of green water storage tanks, borehole pump head and filtration equipment beside a brick industrial building, landscaping around it, clear daylight.",
  }),
  fibre: shot({
    title: "Sustainability · fibre and comms",
    alt: "Fibre and network room",
    aspect: "4/3",
    tone: "night",
    prompt:
      "Tidy comms room with a network rack, fibre patch panels with yellow and blue fibre leads, small status LEDs glowing, cool light.",
  }),
  generator: shot({
    title: "Sustainability · generator and solar",
    alt: "Standby generator running alongside solar infrastructure",
    aspect: "4/3",
    tone: "concrete",
    prompt:
      "Standby generator enclosure in a clean yard beside an industrial building, rooftop solar panels visible above, clear sky, crisp light.",
  }),
  contactHero: shot({
    title: "Contact · 35 Brickfield Road",
    alt: "The entrance at 35 Brickfield Road, Woodstock",
    aspect: "4/3",
    tone: "stone",
    src: canvasPhoto.url,
    prompt:
      "Welcoming entrance to a converted industrial office campus, open steel-framed glass doors, planters either side, warm morning light.",
  }),
} as const satisfies Record<string, Shot>;

export type MediaId = keyof typeof media;
