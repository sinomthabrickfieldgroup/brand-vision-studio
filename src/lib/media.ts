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

// Real photography from the shoot and existing Brickfield libraries.
import photo_canvas_cafe from "@/assets/photos/canvas-cafe.webp";
import photo_canvas_before_aerial from "@/assets/photos/canvas-before-aerial.webp";
import photo_canvas_upper_lobby from "@/assets/photos/canvas-upper-lobby.webp";
import photo_canvas_gym_detail from "@/assets/photos/canvas-gym-detail.webp";
import photo_canvas_barista from "@/assets/photos/canvas-barista.webp";
import photo_canvas_lobby_desk from "@/assets/photos/canvas-lobby-desk.webp";
import photo_canvas_coworking_people from "@/assets/photos/canvas-coworking-people.webp";
import photo_canvas_breakout from "@/assets/photos/canvas-breakout.webp";
import photo_canvas_desks_detail from "@/assets/photos/canvas-desks-detail.webp";
import photo_canvas_gym from "@/assets/photos/canvas-gym.webp";
import photo_canvas_terrace from "@/assets/photos/canvas-terrace.webp";
import photo_canvas_presentation from "@/assets/photos/canvas-presentation.webp";
import photo_canvas_meeting_room from "@/assets/photos/canvas-meeting-room.webp";
import photo_canvas_garden_corridor from "@/assets/photos/canvas-garden-corridor.webp";
import photo_canvas_atrium from "@/assets/photos/canvas-atrium.webp";
import photo_canvas_open_floor from "@/assets/photos/canvas-open-floor.webp";
import photo_canvas_front_desk from "@/assets/photos/canvas-front-desk.webp";
import photo_canvas_reading_nook from "@/assets/photos/canvas-reading-nook.webp";
import photo_canvas_exterior from "@/assets/photos/canvas-exterior-hd.webp";
import photo_call_centre_exterior from "@/assets/photos/call-centre-exterior.webp";
// remember to optimise these 
import photo_loop_before_aerial from "@/assets/photos/loop-before-aerial.jpg";
import photo_loop_before_interior from "@/assets/photos/loop-before-mezzanine-001.jpg";
import photo_loop_before_mezzanine from "@/assets/photos/loop-before-mezzanine-view-003.jpg";
import photo_loop_before_kitchen from "@/assets/photos/loop-kitchen-before-001.jpg";
import photo_loop_facilities_kitchen from "@/assets/photos/loop-kitchen-001.jpg";
import photo_loop_guardhouse from "@/assets/photos/loop-guardhouse.jpg";
import photo_loop_ventilation from "@/assets/photos/loop-roof-inffra-001.jpg";
import photo_wierda_aerial from "@/assets/photos/wierda-aerial.webp";
import photo_wierda_logo_front from "@/assets/photos/wierda-logo-front.webp";
import photo_wierda_jacaranda from "@/assets/photos/wierda-jacaranda.webp";
import photo_wierda_precinct from "@/assets/photos/wierda-precinct.webp";
import photo_wierda_signage from "@/assets/photos/wierda-signage.webp";
import photo_wierda_courtyard_skyline from "@/assets/photos/wierda-courtyard-skyline.webp";
import photo_wierda_nso_entrance from "@/assets/photos/wierda-nso-entrance.webp";
import photo_wierda_boardroom from "@/assets/photos/wierda-boardroom.webp";
import photo_wierda_breakout from "@/assets/photos/wierda-breakout.webp";
import photo_wierda_canteen from "@/assets/photos/wierda-canteen.webp";
import photo_wierda_garden_courtyard from "@/assets/photos/wierda-garden-courtyard.webp";
import photo_wierda_block_b from "@/assets/photos/wierda-block-b.webp";
import photo_wierda_facade from "@/assets/photos/wierda-facade.webp";
import photo_wierda_kitchen from "@/assets/photos/wierda-kitchen.webp";
import photo_wierda_open_plan from "@/assets/photos/wierda-open-plan.webp";
import photo_wierda_roses from "@/assets/photos/wierda-roses.webp";
import photo_wierda_lobby from "@/assets/photos/wierda-lobby.webp";

import photo_loop_aerial from "@/assets/photos/loop-aerial.webp";
import photo_loop_warehouse from "@/assets/photos/loop-warehouse.webp";
import photo_loop_mezzanine from "@/assets/photos/loop-mezzanine.webp";
import photo_loop_yard from "@/assets/photos/loop-yard.webp";
import photo_loop_top_down from "@/assets/photos/loop-top-down.webp";
import photo_loop_offices_before from "@/assets/photos/loop-offices-before.webp";
import photo_loop_offices_after from "@/assets/photos/loop-offices-after.webp";
import photo_loop_meeting_before from "@/assets/photos/loop-meeting-before.webp";
import photo_loop_meeting_after from "@/assets/photos/loop-meeting-after.webp";
import photo_loop_staffroom_before from "@/assets/photos/loop-staffroom-before.webp";
import photo_loop_staffroom_after from "@/assets/photos/loop-staffroom-after.webp";
import photo_loop_aerial_angle from "@/assets/photos/loop-aerial-angle.webp";
import photo_loop_warehouse_wide from "@/assets/photos/loop-warehouse-wide.webp";
import photo_loop_warehouse_light from "@/assets/photos/loop-warehouse-light.webp";
import photo_loop_mezzanine_deck from "@/assets/photos/loop-mezzanine-deck.webp";
import photo_loop_mezzanine_stairs from "@/assets/photos/loop-mezzanine-stairs.webp";
import photo_loop_mezzanine_span from "@/assets/photos/loop-mezzanine-span.webp";
import photo_loop_mezzanine_columns from "@/assets/photos/loop-mezzanine-columns.webp";
import photo_loop_office_floor from "@/assets/photos/loop-office-floor.webp";
import photo_loop_office_floor_2 from "@/assets/photos/loop-office-floor-2.webp";
import photo_loop_bathrooms from "@/assets/photos/loop-bathrooms.webp";
import photo_loop_parking from "@/assets/photos/loop-parking.webp";
import photo_trevor_jacobs from "@/assets/photos/trevor-jacobs.webp";
import photo_rowan_gordon from "@/assets/photos/rowan-gordon.webp";
import photo_timothy from "@/assets/photos/timothy.webp";

export type Tone = "stone" | "dusk" | "concrete" | "sage" | "brick" | "night";
export type Aspect = "21/9" | "16/9" | "3/2" | "4/3" | "4/5" | "1/1" | "3/4";

export interface Shot {
  title: string;
  alt: string;
  aspect: Aspect;
  tone: Tone;
  prompt: string;
  src?: string;
  /** CSS object-position for the crop, e.g. "50% 30%". */
  focus?: string;
  /** Phones: zoom in on this point (e.g. "50% 70%") to trade sky for architecture. */
  mobileFocus?: string;
  /** Phones: how far to zoom in on mobileFocus (e.g. 1.35). */
  mobileZoom?: number;
  /** Required credit shown over the image, e.g. for third-party imagery. */
  credit?: string;
  /** Optional muted, looping video (MP4/WebM). `src` is used as its poster. */
  video?: string;
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
    alt: "Brickfield Canvas at 35 Brickfield Road, Woodstock, with Devil's Peak behind",
    aspect: "21/9",
    tone: "stone",
    src: photo_canvas_exterior,
    focus: "50% 74%",
    prompt:
      "Wide street-level view of a converted three-storey industrial brick building turned modern office campus, large steel-framed windows, a planted green living wall, clean paving and young trees, Table Mountain softly visible in the haze behind, low morning sun raking across the facade.",
    mobileFocus: "46% 86%",
    mobileZoom: 1.6,
  }),
  canvasBefore: shot({
    title: "Canvas · before, aerial",
    alt: "35 Brickfield Road before redevelopment: a general industrial building, seen from above",
    aspect: "16/9",
    tone: "concrete",
    src: photo_canvas_before_aerial,
    focus: "50% 55%",
    credit: "Imagery © Google",
    prompt:
      "The same converted industrial building BEFORE redevelopment: a tired 1970s brick-and-concrete warehouse, faded paint, rusted roller doors, cracked yard, overcast flat light, documentary style, identical framing to a straight-on wide facade shot.",
  }),
  canvasAfter: shot({
    title: "Canvas · today",
    alt: "Brickfield Canvas today: restored brick, new glazing and landscaped parking",
    aspect: "16/9",
    tone: "stone",
    src: photo_canvas_exterior,
    focus: "50% 74%",
    prompt:
      "The same building AFTER redevelopment from an identical straight-on wide facade framing: restored brick, new black steel windows, a green living wall, landscaped forecourt with benches and trees, warm golden-hour light.",
    mobileFocus: "46% 86%",
    mobileZoom: 1.6,
  }),
  canvasCourtyard: shot({
    title: "Canvas · terrace",
    alt: "The covered terrace at Brickfield Canvas, with white umbrellas, planters and high tables",
    aspect: "4/5",
    tone: "sage",
    src: photo_canvas_terrace,
    focus: "50% 55%",
    prompt:
      "Inner courtyard of a converted industrial office campus, exposed brick, steel walkways, potted olive trees and timber benches, two people chatting out of focus, dappled late-afternoon light.",
  }),
  canvasCafe: shot({
    title: "Canvas · café",
    alt: "The café and lounge at Brickfield Canvas: exposed concrete, red sprinkler lines and a timber-clad counter",
    aspect: "4/3",
    tone: "brick",
    src: photo_canvas_cafe,
    focus: "50% 55%",
    prompt:
      "Bright community café inside a converted warehouse, polished concrete floor, long timber counter, pendant lights, espresso machine, people working on laptops in soft focus, morning light through tall steel windows.",
  }),
  canvasBarista: shot({
    title: "Canvas · barista",
    alt: "Coffee being made at the Canvas café",
    aspect: "4/3",
    tone: "night",
    src: photo_canvas_barista,
    focus: "55% 50%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasLobby: shot({
    title: "Canvas · upper lobby",
    alt: "The upper lobby at Brickfield Canvas: a slatted timber desk, leather chairs and glazing over the atrium",
    aspect: "16/9",
    tone: "stone",
    src: photo_canvas_upper_lobby,
    focus: "50% 55%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasLobbyDesk: shot({
    title: "Canvas · lobby desk",
    alt: "The slatted timber lobby desk at Brickfield Canvas",
    aspect: "4/5",
    tone: "stone",
    src: photo_canvas_lobby_desk,
    focus: "40% 50%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasBreakout: shot({
    title: "Canvas · breakout",
    alt: "A breakout lounge at Brickfield Canvas with patchwork beanbags and a brick screen wall",
    aspect: "16/9",
    tone: "brick",
    src: photo_canvas_breakout,
    focus: "55% 55%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasDesks: shot({
    title: "Canvas · desks",
    alt: "Desks and chairs in a Canvas office",
    aspect: "4/3",
    tone: "stone",
    src: photo_canvas_desks_detail,
    focus: "50% 60%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasAtrium: shot({
    title: "Canvas · atrium",
    alt: "Looking up through the glazed atrium at Brickfield Canvas",
    aspect: "3/4",
    tone: "sage",
    src: photo_canvas_atrium,
    focus: "50% 40%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasNook: shot({
    title: "Canvas · reading nook",
    alt: "A quiet corner at Brickfield Canvas with floor cushions and colourful plywood shelving",
    aspect: "3/4",
    tone: "sage",
    src: photo_canvas_reading_nook,
    focus: "50% 50%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasGymDetail: shot({
    title: "Canvas · training",
    alt: "Training with dumbbells at the Canvas gym",
    aspect: "4/3",
    tone: "night",
    src: photo_canvas_gym_detail,
    focus: "50% 40%",
    prompt: "Real photograph from the Brickfield Canvas library.",
  }),
  canvasCowork: shot({
    title: "Canvas · co-working",
    alt: "Two people working together at a standing desk in the Canvas co-working space",
    aspect: "4/3",
    tone: "stone",
    src: photo_canvas_coworking_people,
    focus: "50% 40%",
    prompt:
      "Calm co-working floor in a converted industrial building, long oak desks, exposed concrete soffit and services, indoor plants, large windows, soft daylight, a few people focused on work, out of focus.",
  }),
  canvasMeeting: shot({
    title: "Canvas · meeting room",
    alt: "A meeting room at Brickfield Canvas: dark table, tan leather chairs and a wall-mounted screen",
    aspect: "4/3",
    tone: "concrete",
    src: photo_canvas_meeting_room,
    focus: "50% 60%",
    prompt:
      "Glass-walled meeting room with a large timber table and black chairs, exposed brick wall, a screen on the wall turned off, soft daylight, empty and ready for use.",
  }),
  canvasGym: shot({
    title: "Canvas · gym",
    alt: "The on-site gym at Brickfield Canvas, with a forest mural and herringbone floor",
    aspect: "4/3",
    tone: "night",
    src: photo_canvas_gym,
    focus: "55% 50%",
    prompt:
      "Small boutique gym in a converted warehouse, rubber floor, timber wall slats, racks of dumbbells and two rowing machines, warm accent lighting, empty, early evening.",
  }),
  canvasEvents: shot({
    title: "Canvas · in session",
    alt: "A presentation in a Canvas meeting space",
    aspect: "4/3",
    tone: "dusk",
    src: photo_canvas_presentation,
    focus: "40% 45%",
    prompt:
      "Evening community event in a brick courtyard, festoon string lights, people standing in small groups holding drinks, all slightly out of focus, warm dusk sky.",
  }),
  canvasOffices: shot({
    title: "Canvas · open floor",
    alt: "An open A-Grade floor at Brickfield Canvas: polished concrete, exposed steel trusses and a glazed core",
    aspect: "4/3",
    tone: "stone",
    src: photo_canvas_open_floor,
    focus: "50% 55%",
    prompt:
      "A-grade private office suite inside a heritage industrial conversion, oak floors, white walls, black steel window frames, plants, ergonomic desks, bright clean daylight.",
  }),
  canvasLivingWall: shot({
    title: "Canvas · garden corridor",
    alt: "A corridor at Brickfield Canvas looking onto a planted internal garden and timber deck",
    aspect: "4/3",
    tone: "sage",
    src: photo_canvas_garden_corridor,
    focus: "60% 55%",
    prompt:
      "A lush vertical living wall of ferns and trailing plants against restored brick inside a converted industrial office atrium, soft daylight from a skylight, drip irrigation lines just visible.",
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
    title: "9 Loop Street · from above",
    alt: "9 Loop Street from the air after its 2026 refurbishment, with new charcoal roof sheeting and a surfaced yard",
    aspect: "21/9",
    tone: "concrete",
    src: photo_loop_aerial,
    focus: "55% 55%",
    prompt:
      "Freshly refurbished industrial facility in Maitland, Cape Town: clean charcoal steel cladding, large roller doors, a two-storey office block with glazing, a concrete truck yard, clear blue sky, crisp midday light.",
    mobileFocus: "55% 60%",
    mobileZoom: 1.15,
  }),
  loopBefore: shot({
    title: "9 Loop Street · before, 2026",
    alt: "9 Loop Street as a logistics depot before refurbishment",
    aspect: "21/9",
    tone: "concrete",
    src: photo_loop_before_aerial,
    focus: "50% 55%",
    prompt:
      "The same industrial facility BEFORE refurbishment, identical framing: a tired conventional warehouse and logistics depot, faded cladding, rusted roller doors, potholed yard, overcast flat light, documentary style. Use a progress photo from the refurbishment if one exists.",
    mobileFocus: "50% 60%",
    mobileZoom: 1.15,
  }),
  loopInteriorBefore: shot({
    title: "9 Loop Street · interior, before",
    alt: "The warehouse floor at 9 Loop Street before refurbishment",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_before_interior,
    focus: "50% 55%",
    mobileFocus: "50% 60%",
    mobileZoom: 1.15,
    prompt:
      "The 9 Loop Street warehouse floor BEFORE refurbishment, framed to match the after shot: worn concrete floor, old lighting, tired roof sheeting, depot clutter. Use a progress photo if one exists.",
  }),
  loopMezzanineBefore: shot({
    title: "9 Loop Street · mezzanine, before",
    alt: "The mezzanine area at 9 Loop Street before refurbishment",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_before_mezzanine,
    focus: "50% 55%",
    prompt:
      "The mezzanine area at 9 Loop Street BEFORE refurbishment, framed to match the after shot of the 302m² steel mezzanine. Use a progress photo if one exists.",
    mobileFocus: "50% 60%",
    mobileZoom: 1.15,
  }),
  loopFacilitiesBefore: shot({
    title: "9 Loop Street · offices and bathrooms, before",
    alt: "The offices and bathrooms at 9 Loop Street before refurbishment",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_before_kitchen,
    focus: "50% 55%",
    prompt:
      "The 9 Loop Street offices or bathrooms BEFORE refurbishment, framed to match the after shot: dated finishes, old fittings. Use a progress photo if one exists.",
    mobileFocus: "50% 60%",
    mobileZoom: 1.15,
  }),
  loopFacilitiesAfter: shot({
    title: "9 Loop Street · offices and bathrooms",
    alt: "The refurbished offices and bathrooms at 9 Loop Street",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_facilities_kitchen,
    focus: "50% 55%",
    mobileFocus: "50% 60%",
    mobileZoom: 1.15,
    prompt:
      "The refurbished offices or bathrooms at 9 Loop Street, same framing as the before shot: clean modern finishes, good daylight, simple and practical.",
  }),
  loopWarehouse: shot({
    title: "9 Loop Street · warehouse floor",
    alt: "The column-efficient warehouse floor and mezzanine at 9 Loop Street",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_warehouse,
    focus: "50% 55%",
    prompt:
      "Interior of a large, clean, column-efficient steel-portal warehouse, epoxy-coated concrete floor, high-bay LED lights, roof sheeting with translucent panels, an overhead crane rail, empty, cool even light.",
  }),
  loopYard: shot({
    title: "9 Loop Street · yard",
    alt: "The surfaced yard and side access at 9 Loop Street, looking towards the mountains",
    aspect: "4/3",
    tone: "stone",
    src: photo_loop_yard,
    focus: "60% 60%",
    prompt:
      "Wide concrete truck yard beside a refurbished industrial building, a delivery truck reversing to a loading door, painted bay lines, palisade fence, afternoon sun.",
  }),
  loopOffice: shot({
    title: "9 Loop Street · mezzanine",
    alt: "The 302m² steel mezzanine above the roller doors at 9 Loop Street",
    aspect: "4/3",
    tone: "stone",
    src: photo_loop_mezzanine,
    focus: "50% 45%",
    prompt:
      "Modern office and canteen block attached to a warehouse, glazed facade, simple timber and steel interior visible, neat landscaping strip, soft afternoon light.",
  }),
  loopAerialAngle: shot({
    title: "9 Loop Street · the building",
    alt: "9 Loop Street from the air at an angle: the long refurbished building with its charcoal roof, ridge ventilators, roller doors and marked parking along the yard",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_aerial_angle,
    focus: "55% 55%",
    prompt: "Angled drone view of the refurbished 9 Loop Street building.",
  }),
  loopTopDown: shot({
    title: "9 Loop Street · plan view",
    alt: "9 Loop Street from directly above: the long roof, skylights and the yard along its length",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_top_down,
    prompt: "Top-down drone view of the refurbished building and its yard.",
  }),
  loopWarehouseWide: shot({
    title: "9 Loop Street · warehouse",
    alt: "The refurbished warehouse at 9 Loop Street: exposed steel trusses, roof lights, a roller door and an epoxy floor",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_warehouse_wide,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopWarehouseLight: shot({
    title: "9 Loop Street · warehouse light",
    alt: "Afternoon light through the clerestory windows of the 9 Loop Street warehouse, looking through to the mezzanine bay",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_warehouse_light,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopMezzanineDeck: shot({
    title: "9 Loop Street · mezzanine deck",
    alt: "The open steel mezzanine deck at 9 Loop Street under the roof trusses, with clerestory windows along the wall",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_mezzanine_deck,
    focus: "50% 55%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopMezzanineStairs: shot({
    title: "9 Loop Street · mezzanine stairs",
    alt: "A steel stair up to the mezzanine at 9 Loop Street, with white-painted beams and roller doors beyond",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_mezzanine_stairs,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopMezzanineSpan: shot({
    title: "9 Loop Street · under the mezzanine",
    alt: "The covered floor beneath the 9 Loop Street mezzanine, with slim steel columns and an epoxy floor",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_mezzanine_span,
    focus: "50% 55%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopMezzanineColumns: shot({
    title: "9 Loop Street · mezzanine bay",
    alt: "Light across the floor beneath the 9 Loop Street mezzanine, with white steel columns and beams",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_mezzanine_columns,
    focus: "50% 55%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopOfficeFloor: shot({
    title: "9 Loop Street · offices",
    alt: "The refurbished open-plan office at 9 Loop Street: laminate floor, split air-conditioning and a row of windows",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_office_floor,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopOfficeFloor2: shot({
    title: "9 Loop Street · offices",
    alt: "Another view of the open-plan office at 9 Loop Street, with LED lighting and windows on two sides",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_office_floor_2,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopBathrooms: shot({
    title: "9 Loop Street · bathrooms and kitchen",
    alt: "New bathrooms and a fitted kitchen off the offices at 9 Loop Street",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_bathrooms,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopParking: shot({
    title: "9 Loop Street · parking",
    alt: "The parking bays along the boundary wall at 9 Loop Street",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_parking,
    focus: "55% 60%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopOfficesBefore: shot({
    title: "9 Loop Street · offices, before",
    alt: "The open-plan office at 9 Loop Street before refurbishment: worn rubber flooring, old fittings and loose cabling",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_offices_before,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopOfficesAfter: shot({
    title: "9 Loop Street · offices",
    alt: "The refurbished open-plan office at 9 Loop Street: laminate floor, LED lighting, split air-conditioning and new doors",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_offices_after,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopMeetingBefore: shot({
    title: "9 Loop Street · private office, before",
    alt: "A private office at 9 Loop Street before refurbishment, with an old timber table, shelving and a glass board",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_meeting_before,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopMeetingAfter: shot({
    title: "9 Loop Street · private office",
    alt: "A refurbished private office at 9 Loop Street, with timber floors, downlights and air-conditioning",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_meeting_after,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopStaffroomBefore: shot({
    title: "9 Loop Street · staff room, before",
    alt: "The staff room at 9 Loop Street before refurbishment: cracked floor, extractor fans and notices on the walls",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_staffroom_before,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopStaffroomAfter: shot({
    title: "9 Loop Street · staff room",
    alt: "The refurbished staff room at 9 Loop Street: sealed floor, fresh paint and glazed doors through to the offices",
    aspect: "16/9",
    tone: "stone",
    src: photo_loop_staffroom_after,
    focus: "50% 50%",
    prompt: "Still from the 9 Loop Street shoot.",
  }),
  loopRoof: shot({
    title: "9 Loop Street · roof ventilation",
    alt: "The new charcoal roof at 9 Loop Street, with a row of static ventilators along the ridge",
    aspect: "16/9",
    tone: "concrete",
    src: photo_loop_ventilation,
    focus: "50% 55%",
    prompt: "Drone close-up of the new roof sheeting and ridge ventilators at 9 Loop Street.",
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
  loopGuardhouse: shot({
    title: "9 Loop Street · guardhouse",
    alt: "The guardhouse at 9 Loop Street, with a security officer on duty",
    aspect: "4/3",
    tone: "night",  
    src: photo_loop_guardhouse,
      focus: "50% 55%",
      prompt:
        "Small security guardhouse at the entrance to an industrial facility, a uniformed security officer on duty, warm interior light, cool evening sky.",
  }),

  // ── Brickfield Call Centre (33 Brickfield Road, Woodstock) ────────────────
  callHero: shot({
    title: "Call Centre · entrance",
    alt: "The entrance canopy and parking at Brickfield Call Centre, 33 Brickfield Road",
    aspect: "21/9",
    tone: "brick",
    src: photo_call_centre_exterior,
    focus: "40% 78%",
    prompt:
      "Large purpose-built office building in Woodstock, Cape Town, set back from the main road, face-brick and long horizontal bands of glazing, an open parking area in front, a neighbouring converted brick campus visible beside it, warm late-afternoon light.",
    mobileFocus: "38% 90%",
    mobileZoom: 1.5,
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
  // Stills from the Nov 2026 shoot. Which building (66 or 68) each shows is still to be confirmed.
  wierdaHero: shot({
    title: "66/68 Wierda · from above",
    alt: "66/68 Wierda from the air: the campus among jacaranda trees in Wierda Valley, with the Sandton skyline behind",
    aspect: "21/9",
    tone: "sage",
    src: photo_wierda_aerial,
    focus: "50% 50%",
    prompt: "Frame from the November 2026 Wierda Valley drone footage.",
  }),
  wierdaCourtyard: shot({
    title: "66/68 Wierda · courtyard and skyline",
    alt: "The landscaped courtyard and parking at 66/68 Wierda, with the Sandton skyline beyond",
    aspect: "16/9",
    tone: "sage",
    src: photo_wierda_courtyard_skyline,
    focus: "50% 60%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaJacaranda: shot({
    title: "66/68 Wierda · arrival",
    alt: "A white two-storey office building at 66/68 Wierda with a glazed entrance, behind a jacaranda in bloom",
    aspect: "16/9",
    tone: "sage",
    src: photo_wierda_jacaranda,
    focus: "50% 55%",
    prompt: "Frame from the November 2026 Wierda Valley footage.",
  }),
  wierdaLogoFront: shot({
    title: "66/68 Wierda · logo window",
    alt: "The front of a building at 66/68 Wierda, with a large glazed panel between two trees and dappled shade",
    aspect: "16/9",
    tone: "stone",
    src: photo_wierda_logo_front,
    focus: "50% 50%",
    prompt: "Frame from the November 2026 Wierda Valley footage.",
  }),
  wierdaPrecinct: shot({
    title: "66/68 Wierda · precinct",
    alt: "Tiled roofs and jacarandas at 66/68 Wierda, with the Sandton skyline beyond",
    aspect: "16/9",
    tone: "sage",
    src: photo_wierda_precinct,
    focus: "55% 60%",
    prompt: "Frame from the November 2026 Wierda Valley drone footage.",
  }),
  wierdaGarden: shot({
    title: "66/68 Wierda · garden courtyard",
    alt: "The tree-shaded garden courtyard at 66/68 Wierda, with a rose arch, water feature and long outdoor tables",
    aspect: "16/9",
    tone: "sage",
    src: photo_wierda_garden_courtyard,
    focus: "50% 55%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaFacade: shot({
    title: "66/68 Wierda · facade",
    alt: "A pale brick facade at 66/68 Wierda with a tall glazed panel, framed by roses and clipped hedges",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_facade,
    focus: "45% 50%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaBlockB: shot({
    title: "66/68 Wierda · Block B entrance",
    alt: "The double-height glazed entrance to Block B at 66/68 Wierda, under mature trees",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_block_b,
    focus: "50% 50%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaSignage: shot({
    title: "66/68 Wierda · wayfinding",
    alt: "The campus directory sign at 66/68 Wierda among roses and hedges",
    aspect: "4/3",
    tone: "sage",
    src: photo_wierda_signage,
    focus: "50% 50%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaRoses: shot({
    title: "66/68 Wierda · garden detail",
    alt: "Climbing roses on a garden arch at 66/68 Wierda, with the open parking beyond",
    aspect: "4/3",
    tone: "sage",
    src: photo_wierda_roses,
    focus: "45% 50%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaLobby: shot({
    title: "66/68 Wierda · reception",
    alt: "A bright reception at 66/68 Wierda with lounge seating and a glazed entrance to the gardens",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_lobby,
    focus: "55% 55%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaFloor: shot({
    title: "66/68 Wierda · open-plan floor",
    alt: "An open-plan office floor at 66/68 Wierda, with planter dividers and timber screens",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_open_plan,
    focus: "50% 55%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaBreakout: shot({
    title: "66/68 Wierda · breakout area",
    alt: "A breakout and dining area at 66/68 Wierda, with timber slat screens and a polished tile floor",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_breakout,
    focus: "50% 55%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaCanteen: shot({
    title: "66/68 Wierda · canteen",
    alt: "The staff canteen at 66/68 Wierda, seen through timber slats",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_canteen,
    focus: "50% 55%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaKitchen: shot({
    title: "66/68 Wierda · kitchen",
    alt: "A staff kitchen at 66/68 Wierda, with tree views and a balcony",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_kitchen,
    focus: "50% 50%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaBoardroom: shot({
    title: "66/68 Wierda · boardroom",
    alt: "A boardroom at 66/68 Wierda, with a large table, video conferencing screen and garden views",
    aspect: "4/3",
    tone: "stone",
    src: photo_wierda_boardroom,
    focus: "50% 55%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),
  wierdaNsoEntrance: shot({
    title: "66/68 Wierda · tenant entrance",
    alt: "A tenant entrance at 66/68 Wierda, with access control and branded signage",
    aspect: "4/3",
    tone: "night",
    src: photo_wierda_nso_entrance,
    focus: "50% 50%",
    prompt: "Still from the November 2026 Wierda Valley shoot.",
  }),

  // ── 24 Montague Drive (Montague Gardens) ──────────────────────────────────
  montagueHero: shot({
    title: "24 Montague · the park",
    alt: "24 Montague Drive industrial building",
    aspect: "21/9",
    tone: "concrete",
    prompt:
      "Well-kept multi-tenant industrial park in Montague Gardens, Cape Town: two adjoining warehouse units with light grey cladding and roller doors, a shared yard with two access gates, parking bays, mountains faint on the horizon, clean even midday light.",
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
      "Heritage red-brick industrial building on Albert Road, Woodstock, Cape Town, tall arched windows, painted steel doors, a building between 7.5 and 13 metres high, creative-district street life out of focus, late-afternoon light.",
  }),
  albertInterior: shot({
    title: "219 Albert Road · interior",
    alt: "Warehouse interior at 219 Albert Road",
    aspect: "4/3",
    tone: "concrete",
    prompt:
      "High-ceiling heritage brick interior with steel roof trusses, a large-format print operation and maker workbenches in soft focus, clean concrete floor, daylight through tall windows.",
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
    title: "Trevor Jacobs",
    alt: "Trevor Jacobs, CEO and Director of Brickfield Group",
    aspect: "3/4",
    tone: "stone",
    src: photo_trevor_jacobs,
    focus: "40% 30%",
    prompt:
      "Placeholder only — use the real headshot from the shoot. Environmental portrait setting: exposed brick wall, soft window light.",
  }),
  portraitRowan: shot({
    title: "Rowan Gordon",
    alt: "Rowan Gordon, Director of Brickfield Group",
    aspect: "3/4",
    tone: "concrete",
    src: photo_rowan_gordon,
    focus: "50% 35%",
    prompt:
      "Placeholder only — use the real headshot from the shoot. Environmental portrait setting: steel-framed window, soft daylight.",
  }),
  portraitTimothy: shot({
    title: "Timothy",
    alt: "Timothy, COO of Brickfield Group",
    aspect: "3/4",
    tone: "sage",
    src: photo_timothy,
    focus: "50% 25%",
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
    title: "Canvas · front desk",
    alt: "The front desk at Brickfield Canvas, with the Canvas sign on the brick wall behind",
    aspect: "4/3",
    tone: "stone",
    src: photo_canvas_front_desk,
    focus: "55% 50%",
    prompt:
      "Welcoming entrance to a converted industrial office campus, open steel-framed glass doors, planters either side, warm morning light.",
  }),
} as const satisfies Record<string, Shot>;

export type MediaId = keyof typeof media;

/**
 * STAND-INS — Unsplash photos used to plan the photoshoot selection. They show the kind of
 * shot each slot wants; they are not Brickfield buildings. Replace each with a real photo
 * (set `src` on the shot above and delete its line here) before launch.
 */
import si_08df4776 from "@/assets/stand-in/08df4776.webp";
import si_1aafbb24 from "@/assets/stand-in/1aafbb24.webp";
import si_29810c3b from "@/assets/stand-in/29810c3b.webp";
import si_357f12aa from "@/assets/stand-in/357f12aa.webp";
import si_5bc69ba9 from "@/assets/stand-in/5bc69ba9.webp";
import si_711614b0 from "@/assets/stand-in/711614b0.webp";
import si_97512505 from "@/assets/stand-in/97512505.webp";
import si_9c720f5d from "@/assets/stand-in/9c720f5d.webp";
import si_b23d9d70 from "@/assets/stand-in/b23d9d70.webp";
import si_b772ec77 from "@/assets/stand-in/b772ec77.webp";
import si_c9344f4f from "@/assets/stand-in/c9344f4f.webp";
import si_d1597a16 from "@/assets/stand-in/d1597a16.webp";
import si_d53154cb from "@/assets/stand-in/d53154cb.webp";
import si_f9854d80 from "@/assets/stand-in/f9854d80.webp";
import si_ffbe175e from "@/assets/stand-in/ffbe175e.webp";

import si_security_control from "@/assets/stand-in/security-control.webp";
import si_cleaning_team from "@/assets/stand-in/cleaning-team.webp";
import si_cleaning_detail from "@/assets/stand-in/cleaning-detail.webp";

export const standIns: Partial<Record<MediaId, { src: string; focus: string }>> = {
  cleaningTeam: { src: si_cleaning_team, focus: "55% 55%" },
  cleaningDetail: { src: si_cleaning_detail, focus: "70% 50%" },
  securityTeam: { src: si_security_control, focus: "40% 70%" },
  securityControl: { src: si_security_control, focus: "35% 65%" },
  canvasSolar: { src: si_b772ec77, focus: "50% 60%" },
  loopBefore: { src: si_b23d9d70, focus: "50% 55%" },
  loopPower: { src: photo_loop_ventilation, focus: "50% 55%" },
  loopFabrication: { src: photo_loop_warehouse_light, focus: "50% 55%" },
  callPlant: { src: si_f9854d80, focus: "50% 45%" },
  montagueHero: { src: si_5bc69ba9, focus: "70% 60%" },
  montagueYard: { src: si_97512505, focus: "50% 70%" },
  montagueInterior: { src: si_d53154cb, focus: "50% 50%" },
  montagueStreet: { src: si_d1597a16, focus: "50% 50%" },
  albertHero: { src: si_ffbe175e, focus: "50% 50%" },
  albertInterior: { src: si_1aafbb24, focus: "50% 40%" },
  albertLoading: { src: si_29810c3b, focus: "45% 60%" },
  aboutHero: { src: si_c9344f4f, focus: "50% 55%" },
  precinct: { src: si_9c720f5d, focus: "50% 50%" },
  heritageDetail: { src: si_ffbe175e, focus: "62% 45%" },
  generator: { src: si_711614b0, focus: "50% 40%" },
};

/** True when a shot has a real or stand-in image (used to keep placeholders out of slideshows). */
export const hasImage = (id: MediaId) =>
  Boolean(("src" in media[id] && (media[id] as Shot).src) || standIns[id]);
