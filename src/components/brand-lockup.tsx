import { DOORWAY } from "@/components/doorway-paths";
import { WORDMARK } from "@/components/wordmark-paths";
import { cn } from "@/lib/utils";

/**
 * Lockups of the provisional doorway mark with the approved wordmark. Everything is laid out on
 * the wordmark's grid: cap height 100, baseline at y = 0, BRICKFIELD 816.6 wide, GROUP 426.6 wide.
 * Not approved yet: the site shows the plain wordmark unless a lockup is picked in the dev switcher.
 */
export const LOCKUPS = [
  { id: "wordmark", label: "Wordmark only (current)" },
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
export type LockupLight = "paper" | "gold";

const CHAR = "#3A3A3C";
const GOLD = "#D6B060";
const PAPER = "#FCFCFC";
const B_W = 816.6;
const G_W = 426.6;
const G_X0 = 8.19; // GROUP's left side-bearing in its own path
const LEAD = 160; // GROUP's baseline below BRICKFIELD's in the two-line layouts
const { bounds } = DOORWAY;

type Box = { x: number; y: number; w: number; h: number };

/** The doorway with its top-left at (x, y) and height h. */
function Door({ x, y, h, reverse, light }: { x: number; y: number; h: number; reverse: boolean; light: LockupLight }) {
  const k = h / bounds.height;
  // Light theme: charcoal frame and door; the opening is paper or gold.
  // Reverse: the frame takes the light text colour; the opening inverts to charcoal, or stays gold with a dark door.
  const opening = light === "gold" ? GOLD : reverse ? CHAR : PAPER;
  const door = reverse && light === "gold" ? CHAR : "currentColor";
  return (
    <g transform={`translate(${x - bounds.x * k} ${y - bounds.y * k}) scale(${k})`} className="lockup-mark">
      <path d={DOORWAY.frame} fill="currentColor" />
      <path d={DOORWAY.light} fill={opening} />
      <path d={DOORWAY.door} fill={door} />
      <path d={DOORWAY.hingeTop} fill={door} />
      <path d={DOORWAY.hingeBottom} fill={door} />
    </g>
  );
}

const markWidth = (h: number) => (bounds.width * h) / bounds.height;

function Brickfield({ x, y }: { x: number; y: number }) {
  return <path d={WORDMARK.brickfield} transform={`translate(${x - 9.38} ${y})`} className="wordmark-brickfield" />;
}
function Group({ x, y }: { x: number; y: number }) {
  return <path d={WORDMARK.group} transform={`translate(${x - G_X0} ${y})`} className="wordmark-group" />;
}

function layout(id: Exclude<LockupId, "wordmark">, reverse: boolean, light: LockupLight) {
  const door = (x: number, y: number, h: number) => <Door x={x} y={y} h={h} reverse={reverse} light={light} />;
  switch (id) {
    case "horizontal":
    case "horizontal-compact": {
      const compact = id === "horizontal-compact";
      const h = compact ? 100 : 160;
      const gap = compact ? 62 : 80;
      const x = markWidth(h) + gap;
      const box: Box = { x: 0, y: -h, w: x + 876.36 + G_X0 + G_W, h };
      return { box, node: <>{door(0, -h, h)}<Brickfield x={x} y={0} /><Group x={x + 876.36 + G_X0} y={0} /></> };
    }
    case "two-line":
    case "two-line-offset":
    case "two-line-right": {
      const h = 100 + LEAD;
      const x = markWidth(h) + 55;
      const gx = id === "two-line" ? x : id === "two-line-offset" ? x + 153 : x + B_W - G_W;
      const box: Box = { x: 0, y: -100, w: x + B_W, h };
      return { box, node: <>{door(0, -100, h)}<Brickfield x={x} y={0} /><Group x={gx} y={LEAD} /></> };
    }
    case "stacked": {
      const h = 260;
      const gap = 70;
      const total = 876.36 + G_X0 + G_W;
      const box: Box = { x: 0, y: -100 - gap - h, w: total, h: h + gap + 100 };
      return {
        box,
        node: <>{door(total / 2 - markWidth(h) / 2, -100 - gap - h, h)}<Brickfield x={0} y={0} /><Group x={876.36 + G_X0} y={0} /></>,
      };
    }
    case "divider": {
      const h = 130;
      const sp = 72;
      const gx = B_W + sp + markWidth(h) + sp;
      const box: Box = { x: 0, y: -h, w: gx + G_W, h };
      return { box, node: <><Brickfield x={0} y={0} />{door(B_W + sp, -h, h)}<Group x={gx} y={0} /></> };
    }
    case "mark": {
      const h = 160;
      return { box: { x: 0, y: -h, w: markWidth(h), h }, node: door(0, -h, h) };
    }
  }
}

/**
 * Renders a lockup. Size it with `--lockup-cap` (the height of the wordmark's capitals); the
 * SVG's height follows from the layout, so every lockup keeps the same lettering size.
 */
export function BrandLockup({
  id,
  light = "paper",
  reverse = false,
  className,
  title = "Brickfield Group",
}: {
  id: Exclude<LockupId, "wordmark">;
  light?: LockupLight;
  reverse?: boolean;
  className?: string;
  title?: string;
}) {
  const { box, node } = layout(id, reverse, light);
  const pad = 2;
  return (
    <svg
      viewBox={`${box.x - pad} ${box.y - pad} ${box.w + 2 * pad} ${box.h + 2 * pad}`}
      role="img"
      aria-label={title}
      className={cn("lockup", `lockup-${id}`, className)}
      style={{ height: `calc(var(--lockup-cap, 14px) * ${((box.h + 2 * pad) / 100).toFixed(3)})` }}
    >
      {node}
    </svg>
  );
}
