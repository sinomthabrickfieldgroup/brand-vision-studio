import { useId } from "react";
import { PORTFOLIO_MARK } from "@/components/portfolio-mark-paths";
import { SERVICES, WORDMARK } from "@/components/wordmark-paths";
import { cn } from "@/lib/utils";

/**
 * Every Brickfield logo: the approved wordmark on its own, or with the portfolio mark.
 * Laid out on the wordmark's grid: cap height 100, baseline at y = 0, BRICKFIELD 816.6 wide,
 * GROUP 426.6 wide. Which lockup each part of the site uses is set in src/lib/brand.ts.
 */
export type LockupId = "wordmark" | "horizontal" | "stacked" | "mark";
/** relief: the soft gradient and edge light used on the website · flat: one solid colour (print, small sizes). */
export type MarkFinish = "relief" | "flat";
/** The word after BRICKFIELD. */
export type SecondWord = "group" | "services";
/** ink: charcoal or cream mark and BRICKFIELD · gold-mark: the mark in gold · gold: everything gold. */
export type LockupTone = "ink" | "gold-mark" | "gold";
export type Surface = "light" | "dark";

export const BRAND_COLOURS = {
  charcoal: "#3A3A3C", // ink on light backgrounds
  cream: "#F8F4EC", // ink on dark backgrounds
  gold: "#D6B060",
} as const;

const WORDS = {
  group: { d: WORDMARK.group, x0: 8.19, w: 426.6 },
  services: { d: SERVICES.d, x0: SERVICES.x0, w: SERVICES.width },
} as const;
const MARK_H = 160; // the mark's height beside the wordmark (cap height 100)
const STACK_H = 260;
const GAP = 80;

type Box = { x: number; y: number; w: number; h: number };
type Paint = { fill: string; cls: "lockup-ink" | "lockup-gold" };
type Colours = { mark: Paint; brickfield: Paint; word: Paint };

function colours(surface: Surface, tone: LockupTone): Colours {
  const ink: Paint = { fill: surface === "dark" ? BRAND_COLOURS.cream : BRAND_COLOURS.charcoal, cls: "lockup-ink" };
  const gold: Paint = { fill: BRAND_COLOURS.gold, cls: "lockup-gold" };
  return { mark: tone === "ink" ? ink : gold, brickfield: tone === "gold" ? gold : ink, word: gold };
}

const markWidth = (h: number) => (PORTFOLIO_MARK.bounds.width * h) / PORTFOLIO_MARK.bounds.height;

/** The portfolio mark with its top-left at (x, y) and height h. */
function Mark({ x, y, h, finish, paint }: { x: number; y: number; h: number; finish: MarkFinish; paint: Paint }) {
  const uid = useId().replace(/:/g, "");
  const b = PORTFOLIO_MARK.bounds;
  const k = h / b.height;
  const transform = `translate(${x - b.x * k} ${y - b.y * k}) scale(${k})`;
  if (finish === "flat") {
    return (
      <g transform={transform} className="lockup-portfolio">
        {PORTFOLIO_MARK.paths.map((d) => (
          <path key={d} d={d} fill={paint.fill} className={cn("lockup-frame", paint.cls)} />
        ))}
      </g>
    );
  }
  const ink = paint.fill.toUpperCase();
  const [from, to] =
    ink === BRAND_COLOURS.gold ? PORTFOLIO_MARK.relief.gold
    : ink === BRAND_COLOURS.cream ? PORTFOLIO_MARK.relief.cream
    : PORTFOLIO_MARK.relief.charcoal;
  return (
    <g transform={transform} className="lockup-portfolio">
      <defs>
        <linearGradient id={`${uid}-g`} x1="-60" y1="60" x2="190" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <filter id={`${uid}-f`} x="-5%" y="-5%" width="115%" height="115%" colorInterpolationFilters="sRGB">
          <feOffset in="SourceAlpha" dx="1.1" dy="1.8" />
          <feGaussianBlur stdDeviation="0.85" />
          <feColorMatrix values="0 0 0 0 0.227 0 0 0 0 0.227 0 0 0 0 0.235 0 0 0 0.18 0" result="drop" />
          <feOffset in="SourceAlpha" dx="-0.7" dy="-0.8" />
          <feGaussianBlur stdDeviation="0.175" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.973 0 0 0 0 0.957 0 0 0 0 0.925 0 0 0 0.36 0" result="light" />
          <feOffset in="SourceAlpha" dx="0.95" dy="1.15" />
          <feGaussianBlur stdDeviation="0.225" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.227 0 0 0 0 0.227 0 0 0 0 0.235 0 0 0 0.55 0" result="dark" />
          <feMerge>
            <feMergeNode in="drop" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="light" />
            <feMergeNode in="dark" />
          </feMerge>
        </filter>
      </defs>
      {PORTFOLIO_MARK.paths.map((d) => (
        <path
          key={d}
          d={d}
          fill={`url(#${uid}-g)`}
          filter={`url(#${uid}-f)`}
          className={cn("lockup-frame lockup-relief", paint.cls)}
        />
      ))}
    </g>
  );
}

function layout(id: LockupId, finish: MarkFinish, c: Colours, word: SecondWord): { box: Box; node: React.ReactNode } {
  const w = WORDS[word];
  const wordmarkW = 876.36 + w.x0 + w.w;
  const mark = (x: number, y: number, h: number) => <Mark x={x} y={y} h={h} finish={finish} paint={c.mark} />;
  const words = (x: number) => (
    <>
      <path
        d={WORDMARK.brickfield}
        transform={`translate(${x - 9.38} 0)`}
        fill={c.brickfield.fill}
        className={cn("lockup-brickfield", c.brickfield.cls)}
      />
      <path
        d={w.d}
        transform={`translate(${x + 876.36} 0)`}
        fill={c.word.fill}
        className={cn("lockup-group", c.word.cls)}
      />
    </>
  );
  switch (id) {
    case "wordmark":
      return { box: { x: 0, y: -100, w: wordmarkW, h: 100 }, node: words(0) };
    case "horizontal": {
      // The mark stands on the wordmark's baseline.
      const x = markWidth(MARK_H) + GAP;
      return { box: { x: 0, y: -MARK_H, w: x + wordmarkW, h: MARK_H }, node: <>{mark(0, -MARK_H, MARK_H)}{words(x)}</> };
    }
    case "stacked": {
      const gap = 70;
      return {
        box: { x: 0, y: -100 - gap - STACK_H, w: wordmarkW, h: STACK_H + gap + 100 },
        node: <>{mark(wordmarkW / 2 - markWidth(STACK_H) / 2, -100 - gap - STACK_H, STACK_H)}{words(0)}</>,
      };
    }
    case "mark":
      return { box: { x: 0, y: -MARK_H, w: markWidth(MARK_H), h: MARK_H }, node: mark(0, -MARK_H, MARK_H) };
  }
}

export type LockupProps = {
  id: LockupId;
  finish?: MarkFinish;
  /** GROUP or SERVICES after BRICKFIELD. */
  word?: SecondWord;
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
  finish = "relief",
  word = "group",
  tone = "ink",
  surface = "light",
  className,
  title,
  fluid = false,
}: LockupProps) {
  const { box, node } = layout(id, finish, colours(surface, tone), word);
  const name = title ?? (word === "services" ? "Brickfield Services" : "Brickfield Group");
  const pad = 3;
  return (
    <svg
      viewBox={`${box.x - pad} ${box.y - pad} ${box.w + 2 * pad} ${box.h + 2 * pad}`}
      role={name ? "img" : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={cn("lockup", `lockup-${id}`, className)}
      style={fluid ? undefined : { height: `calc(var(--lockup-cap, 14px) * ${((box.h + 2 * pad) / 100).toFixed(3)})` }}
    >
      {node}
    </svg>
  );
}
