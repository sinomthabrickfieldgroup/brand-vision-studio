import type { LockupId, LockupTone, MarkFinish, SecondWord } from "@/components/brand-lockup";

/**
 * Which logo each part of the site uses. Change a line here to change it everywhere.
 *
 *   id      wordmark | horizontal | stacked | mark
 *   finish  relief (website) | flat (one solid colour)
 *   word    group | services       BRICKFIELD GROUP or BRICKFIELD SERVICES
 *   tone    ink | gold-mark | gold ink: charcoal on light, cream on dark · gold-mark: mark in gold · gold: all gold
 */
export type LogoConfig = { id: LockupId; finish: MarkFinish; word: SecondWord; tone: LockupTone };
export type LogoSlot = "header" | "footer" | "watermark";

export const LOGOS: Record<LogoSlot, LogoConfig | null> = {
  header: { id: "horizontal", finish: "relief", word: "group", tone: "ink" },
  footer: { id: "horizontal", finish: "relief", word: "group", tone: "ink" },
  /** The faint band under the footer; it always renders flat in a light tint. null hides it. */
  watermark: { id: "horizontal", finish: "relief", word: "group", tone: "ink" },
};
