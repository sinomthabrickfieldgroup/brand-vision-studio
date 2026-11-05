import type { DoorShape, LockupId, LockupLight, LockupTone } from "@/components/brand-lockup";

/**
 * Which logo each part of the site uses. Change a line here to change it everywhere in production.
 * In `vite dev` (or after `?lockups=1`) the Logo panel overrides these for review, and its
 * "Copy config" button copies the current picks in this exact shape, ready to paste over LOGOS.
 *
 *   id     wordmark | horizontal | horizontal-compact | two-line | two-line-offset | two-line-right
 *          | stacked | divider | mark  (the doorway mark is provisional, so production still uses the wordmark)
 *   shape  rect | arched          the door's head
 *   light  open | gold            the doorway left see-through, or lit gold
 *   tone   ink | gold-mark | gold ink: charcoal on light, cream on dark · gold-mark: doorway in gold · gold: all gold
 */
export type LogoConfig = { id: LockupId; shape: DoorShape; light: LockupLight; tone: LockupTone };
export type LogoSlot = "header" | "footer" | "watermark";

export const LOGOS: Record<LogoSlot, LogoConfig | null> = {
  header: { id: "wordmark", shape: "rect", light: "open", tone: "ink" },
  footer: { id: "wordmark", shape: "rect", light: "open", tone: "ink" },
  /** null hides the watermark. */
  watermark: { id: "wordmark", shape: "rect", light: "open", tone: "ink" },
};
