import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LOCKUPS, type LockupId, type LockupLight } from "@/components/brand-lockup";

/**
 * Dev-only lockup switcher. The site renders the plain wordmark everywhere (the default) on the
 * server and in production. In `vite dev`, or after visiting any page with `?lockups=1` (handy on a
 * Vercel preview), a small panel lets you pick a lockup, and whether the doorway is open (no fill)
 * or lit gold, separately for the header logo, the footer logo and the footer watermark. Choices
 * are kept in localStorage. Remove this file and its provider once a lockup is approved.
 */
export type Slot = "header" | "footer" | "watermark";
export type SlotChoice = { id: LockupId | "none"; light: LockupLight };
type Choices = Record<Slot, SlotChoice>;

const SLOTS: { id: Slot; label: string }[] = [
  { id: "header", label: "Header" },
  { id: "footer", label: "Footer logo" },
  { id: "watermark", label: "Watermark" },
];
const DEFAULT: Choices = {
  header: { id: "wordmark", light: "paper" },
  footer: { id: "wordmark", light: "paper" },
  watermark: { id: "wordmark", light: "paper" },
};
const KEY = "bf:lockups";
const OLD_KEY = "bf:lockup"; // single-choice format from the first version of the switcher
const FLAG = "bf:lockups-enabled";

const LockupContext = createContext<Choices>(DEFAULT);
export const useLockup = (slot: Slot) => useContext(LockupContext)[slot];

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
}

const isValid = (c: unknown, slot: Slot): c is SlotChoice =>
  !!c &&
  typeof c === "object" &&
  ((slot === "watermark" && (c as SlotChoice).id === "none") || LOCKUPS.some((l) => l.id === (c as SlotChoice).id));

function load(): Choices {
  const saved = read<Partial<Choices> | null>(KEY, null);
  if (saved) {
    return {
      header: isValid(saved.header, "header") ? saved.header : DEFAULT.header,
      footer: isValid(saved.footer, "footer") ? saved.footer : DEFAULT.footer,
      watermark: isValid(saved.watermark, "watermark") ? saved.watermark : DEFAULT.watermark,
    };
  }
  const old = read<SlotChoice | null>(OLD_KEY, null); // carry over the earlier single choice
  return isValid(old, "header") ? { ...DEFAULT, header: old, footer: old } : DEFAULT;
}

export function LockupProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [choices, setChoices] = useState<Choices>(DEFAULT);
  const [slot, setSlot] = useState<Slot>("header");
  const [open, setOpen] = useState(false);

  // Read stored choices after hydration so server and client render the same first frame.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lockups") === "0") write(FLAG, false);
    if (params.get("lockups") === "1") write(FLAG, true);
    const on = import.meta.env.DEV || read(FLAG, false);
    setEnabled(on);
    if (on) setChoices(load());
  }, []);

  const update = (next: Partial<SlotChoice>) => {
    const value = { ...choices, [slot]: { ...choices[slot], ...next } };
    setChoices(value);
    write(KEY, value);
  };

  const options = slot === "watermark" ? [...LOCKUPS, { id: "none" as const, label: "Hidden" }] : LOCKUPS;
  const current = choices[slot];
  const step = (dir: 1 | -1) => {
    const i = options.findIndex((l) => l.id === current.id);
    update({ id: options[(i + dir + options.length) % options.length]!.id });
  };
  const copyTo = (target: Slot) => {
    if (current.id === "none" && target !== "watermark") return; // "Hidden" only exists for the watermark
    const value = { ...choices, [target]: { ...current } };
    setChoices(value);
    write(KEY, value);
  };

  return (
    <LockupContext.Provider value={enabled ? choices : DEFAULT}>
      {children}
      {enabled && (
        <div className="lockup-switcher" data-open={open}>
          <button type="button" className="lockup-switcher-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            Logo
          </button>
          {open && (
            <div className="lockup-switcher-panel">
              <div className="lockup-switcher-tabs" role="tablist" aria-label="Where">
                {SLOTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={slot === s.id}
                    onClick={() => setSlot(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <label>
                <span>Lockup</span>
                <select value={current.id} onChange={(e) => update({ id: e.target.value as SlotChoice["id"] })}>
                  {options.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="lockup-switcher-row">
                <button type="button" onClick={() => step(-1)} aria-label="Previous lockup">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next lockup">
                  →
                </button>
                <span className="lockup-switcher-sep" />
                {(["paper", "gold"] as const).map((l) => (
                  <button key={l} type="button" aria-pressed={current.light === l} onClick={() => update({ light: l })}>
                    {l === "paper" ? "Open (no fill)" : "Gold light"}
                  </button>
                ))}
              </div>
              <div className="lockup-switcher-row lockup-switcher-copy">
                <span>Copy to</span>
                {SLOTS.filter((s) => s.id !== slot).map((s) => (
                  <button key={s.id} type="button" onClick={() => copyTo(s.id)}>
                    {s.label}
                  </button>
                ))}
              </div>
              <p>Dev preview only. Production shows the wordmark.</p>
            </div>
          )}
        </div>
      )}
    </LockupContext.Provider>
  );
}
