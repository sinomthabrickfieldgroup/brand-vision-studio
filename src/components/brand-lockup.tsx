import { DOORWAY, DOORWAY_RECT } from "@/components/doorway-paths";
import { PORTFOLIO_MARK } from "@/components/portfolio-mark-paths";
import { WORDMARK } from "@/components/wordmark-paths";
import { cn } from "@/lib/utils";

/**
 * Every Brickfield logo: the approved wordmark on its own, or with the provisional doorway mark.
 * Laid out on the wordmark's grid: cap height 100, baseline at y = 0, BRICKFIELD 816.6 wide,
 * GROUP 426.6 wide. Which lockup each part of the site uses is set in src/lib/brand.ts.
 */
export const LOCKUPS = [
  { id: "wordmark", label: "Wordmark only" },
  { id: "horizontal", label: "A · Horizontal" },
  { id: "horizontal-compact", label: "B · Horizontal, compact mark" },
  { id: "two-line", label: "C · Two-line, GROUP left" },
  { id: "two-line-offset", label: "C · Two-line, GROUP offset (Figma)" },
  { id: "two-line-right", label: "C · Two-line, GROUP right (Figma)" },
  { id: "stacked", label: "D · Stacked" },
  { id: "divider", label: "E · Doorway between the words" },
  { id: "mark", label: "F · Mark only" },
] as const;

export type LockupId = (typeof LOCKUPS)[number]["id"];
/** The doorway's opening: see-through, or lit gold. */
export type LockupLight = "open" | "gold";
/** Which mark sits beside the wordmark: the portfolio mark, or the provisional doorway (rectangular or arched door). */
export type DoorShape = "portfolio" | "rect" | "arched";
/** ink: charcoal or cream mark and BRICKFIELD · gold-mark: the doorway in gold · gold: everything gold. */
export type LockupTone = "ink" | "gold-mark" | "gold";
export type Surface = "light" | "dark";

export const BRAND_COLOURS = {
  charcoal: "#3A3A3C", // ink on light backgrounds
  cream: "#F8F4EC", // ink on dark backgrounds
  gold: "#D6B060",
} as const;

const B_W = 816.6;
const G_W = 426.6;
const G_X0 = 8.19; // GROUP's left side-bearing in its own path
const H_W = 876.36 + G_X0 + G_W; // the horizontal wordmark's full width
const LEAD = 160; // GROUP's baseline below BRICKFIELD's in the two-line layouts
const { bounds } = DOORWAY;

type Box = { x: number; y: number; w: number; h: number };
type Paint = { fill: string; cls: "lockup-ink" | "lockup-gold" };
type Colours = { mark: Paint; door: Paint; opening: Paint | null; brickfield: Paint; group: Paint };

function colours(surface: Surface, tone: LockupTone, light: LockupLight): Colours {
  const ink: Paint = { fill: surface === "dark" ? BRAND_COLOURS.cream : BRAND_COLOURS.charcoal, cls: "lockup-ink" };
  const gold: Paint = { fill: BRAND_COLOURS.gold, cls: "lockup-gold" };
  const mark = tone === "ink" ? ink : gold;
  // A gold-lit opening only makes sense against an ink mark; with a gold mark the doorway stays open.
  const lit = tone === "ink" && light === "gold";
  // On dark backgrounds a lit doorway gets a charcoal door, so the door reads against the light.
  const door: Paint = lit && surface === "dark" ? { fill: BRAND_COLOURS.charcoal, cls: "lockup-ink" } : mark;
  return { mark, door, opening: lit ? gold : null, brickfield: tone === "gold" ? gold : ink, group: gold };
}

const boundsOf = (shape: DoorShape) => (shape === "portfolio" ? PORTFOLIO_MARK.bounds : bounds);

/** The mark with its top-left at (x, y) and height h: the portfolio mark, or the doorway. */
function Door({ x, y, h, shape, c }: { x: number; y: number; h: number; shape: DoorShape; c: Colours }) {
  if (shape === "portfolio") {
    const b = PORTFOLIO_MARK.bounds;
    const k = h / b.height;
    return (
      <g transform={`translate(${x - b.x * k} ${y - b.y * k}) scale(${k})`} className="lockup-portfolio">
        {PORTFOLIO_MARK.paths.map((d) => (
          <path key={d} d={d} fill={c.mark.fill} className={cn("lockup-frame", c.mark.cls)} />
        ))}
      </g>
    );
  }
  const k = h / bounds.height;
  const D = shape === "rect" ? DOORWAY_RECT : DOORWAY;
  return (
    <g transform={`translate(${x - bounds.x * k} ${y - bounds.y * k}) scale(${k})`} className="lockup-doorway">
      <path d={D.frame} fill={c.mark.fill} className={cn("lockup-frame", c.mark.cls)} />
      {c.opening && <path d={D.light} fill={c.opening.fill} className={cn("lockup-opening", c.opening.cls)} />}
      {[D.door, D.hingeTop, D.hingeBottom].map((d) => (
        <path key={d} d={d} fill={c.door.fill} className={cn("lockup-door", c.door.cls)} />
      ))}
    </g>
  );
}

function Brickfield({ x, y, c }: { x: number; y: number; c: Colours }) {
  return (
    <path
      d={WORDMARK.brickfield}
      transform={`translate(${x - 9.38} ${y})`}
      fill={c.brickfield.fill}
      className={cn("lockup-brickfield", c.brickfield.cls)}
    />
  );
}
function Group({ x, y, c }: { x: number; y: number; c: Colours }) {
  return (
    <path
      d={WORDMARK.group}
      transform={`translate(${x - G_X0} ${y})`}
      fill={c.group.fill}
      className={cn("lockup-group", c.group.cls)}
    />
  );
}

function layout(id: LockupId, shape: DoorShape, c: Colours): { box: Box; node: React.ReactNode } {
  const door = (x: number, y: number, h: number) => <Door x={x} y={y} h={h} shape={shape} c={c} />;
  const markWidth = (h: number) => (boundsOf(shape).width * h) / boundsOf(shape).height;
  const words = (x: number) => (
    <>
      <Brickfield x={x} y={0} c={c} />
      <Group x={x + 876.36 + G_X0} y={0} c={c} />
    </>
  );
  switch (id) {
    case "wordmark":
      return { box: { x: 0, y: -100, w: H_W, h: 100 }, node: words(0) };
    case "horizontal":
    case "horizontal-compact": {
      const compact = id === "horizontal-compact";
      const h = compact ? 100 : 160;
      const x = markWidth(h) + (compact ? 62 : 80);
      return { box: { x: 0, y: -h, w: x + H_W, h }, node: <>{door(0, -h, h)}{words(x)}</> };
    }
    case "two-line":
    case "two-line-offset":
    case "two-line-right": {
      const h = 100 + LEAD;
      const x = markWidth(h) + 55;
      const gx = id === "two-line" ? x : id === "two-line-offset" ? x + 153 : x + B_W - G_W;
      return {
        box: { x: 0, y: -100, w: x + B_W, h },
        node: <>{door(0, -100, h)}<Brickfield x={x} y={0} c={c} /><Group x={gx} y={LEAD} c={c} /></>,
      };
    }
    case "stacked": {
      const h = 260;
      const gap = 70;
      return {
        box: { x: 0, y: -100 - gap - h, w: H_W, h: h + gap + 100 },
        node: <>{door(H_W / 2 - markWidth(h) / 2, -100 - gap - h, h)}{words(0)}</>,
      };
    }
    case "divider": {
      const h = 130;
      const sp = 72;
      const gx = B_W + sp + markWidth(h) + sp;
      return {
        box: { x: 0, y: -h, w: gx + G_W, h },
        node: <><Brickfield x={0} y={0} c={c} />{door(B_W + sp, -h, h)}<Group x={gx} y={0} c={c} /></>,
      };
    }
    case "mark": {
      const h = 160;
      return { box: { x: 0, y: -h, w: markWidth(h), h }, node: door(0, -h, h) };
    }
  }
}

export type LockupProps = {
  id: LockupId;
  shape?: DoorShape;
  light?: LockupLight;
  tone?: LockupTone;
  /** The background it sits on: charcoal ink on light, cream ink on dark. */
  surface?: Surface;
  className?: string | undefined;
  /** Accessible name; pass "" for decorative use. */
  title?: string;
  /** Size by width from CSS (e.g. the footer watermark) instead of by capital height. */
  fluid?: boolean;
};

/**
 * Renders a lockup. Size it with `--lockup-cap` (the height of the wordmark's capitals); the
 * SVG's height follows from the layout, so every lockup keeps the same lettering size.
 */
export function BrandLockup({
  id,
  shape = "portfolio",
  light = "open",
  tone = "ink",
  surface = "light",
  className,
  title = "Brickfield Group",
  fluid = false,
}: LockupProps) {
  const { box, node } = layout(id, shape, colours(surface, tone, light));
  const pad = 2;
  return (
    <svg
      viewBox={`${box.x - pad} ${box.y - pad} ${box.w + 2 * pad} ${box.h + 2 * pad}`}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("lockup", `lockup-${id}`, `lockup-door-${shape}`, className)}
      style={fluid ? undefined : { height: `calc(var(--lockup-cap, 14px) * ${((box.h + 2 * pad) / 100).toFixed(3)})` }}
    >
      {node}
    </svg>
  );
}
