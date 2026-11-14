import type { DoorShape, LockupId, LockupLight, LockupTone, SecondWord } from "@/components/brand-lockup";

/**
 * Which logo each part of the site uses. Change a line here to change it everywhere in production.
 * In `vite dev` (or after `?lockups=1`) the Logo panel overrides these for review, and its
 * "Copy config" button copies the current picks in this exact shape, ready to paste over LOGOS.
 *
 *   id     wordmark | horizontal | horizontal-compact | two-line | two-line-offset | two-line-right
 *          | stacked | divider | mark
 *   shape  portfolio | portfolio-line | portfolio-line-bold | portfolio-relief | rect | arched
 *          the portfolio mark (solid, thin outline, bold outline, relief), or the earlier doorway
 *   word   group | services       BRICKFIELD GROUP or BRICKFIELD SERVICES
 *   light  open | gold            doorway only: left see-through, or lit gold
 *   tone   ink | gold-mark | gold ink: charcoal on light, cream on dark · gold-mark: mark in gold · gold: all gold
 */
export type LogoConfig = { id: LockupId; shape: DoorShape; word: SecondWord; light: LockupLight; tone: LockupTone };
export type LogoSlot = "header" | "footer" | "watermark";

export const LOGOS: Record<LogoSlot, LogoConfig | null> = {
  header: { id: "horizontal", shape: "portfolio", word: "group", light: "open", tone: "ink" },
  footer: { id: "horizontal", shape: "portfolio", word: "group", light: "open", tone: "ink" },
  /** null hides the watermark. */
  watermark: { id: "wordmark", shape: "portfolio", word: "group", light: "open", tone: "ink" },
};
