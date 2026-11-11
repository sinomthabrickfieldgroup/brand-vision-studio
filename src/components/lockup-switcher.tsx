import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LOCKUPS, type DoorShape, type LockupLight, type LockupTone } from "@/components/brand-lockup";
import { LOGOS, type LogoConfig, type LogoSlot } from "@/lib/brand";

/**
 * Dev-only review panel for the logos. Production uses LOGOS from src/lib/brand.ts as-is. In
 * `vite dev`, or after visiting any page with `?lockups=1` (handy on a Vercel preview), a "Logo"
 * panel overrides each slot (header, footer, watermark) live; overrides are kept in localStorage.
 * "Copy config" copies the current picks in the shape LOGOS expects, ready to paste.
 */
type Choices = Record<LogoSlot, LogoConfig | null>;

const SLOTS: { id: LogoSlot; label: string }[] = [
  { id: "header", label: "Header" },
  { id: "footer", label: "Footer logo" },
  { id: "watermark", label: "Watermark" },
];
const KEY = "bf:lockups";
const FLAG = "bf:lockups-enabled";
const FALLBACK: LogoConfig = { id: "horizontal", shape: "portfolio", light: "open", tone: "ink" };

const LogoContext = createContext<Choices>(LOGOS);

/** The logo for a slot: an explicit override, else the dev panel's pick, else LOGOS. */
export function useLogo(slot: LogoSlot, override?: LogoConfig): LogoConfig | null {
  const choices = useContext(LogoContext);
  return override ?? choices[slot];
}

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

/** Accepts anything saved by earlier versions of the panel and fills in missing settings. */
function normalise(raw: unknown, base: LogoConfig | null): LogoConfig | null {
  if (raw === null) return null;
  if (!raw || typeof raw !== "object") return base;
  const r = raw as { id?: unknown; shape?: unknown; light?: unknown; tone?: unknown };
  if (r.id === "none") return null;
  if (!LOCKUPS.some((l) => l.id === r.id)) return base;
  const b = base ?? FALLBACK;
  return {
    id: r.id as LogoConfig["id"],
    shape: r.shape === "portfolio" || r.shape === "arched" || r.shape === "rect" ? r.shape : b.shape,
    light: r.light === "gold" ? "gold" : r.light === "open" || r.light === "paper" ? "open" : b.light,
    tone: r.tone === "gold" || r.tone === "gold-mark" || r.tone === "ink" ? r.tone : b.tone,
  };
}

function load(): Choices {
  const saved = read<Partial<Record<LogoSlot, unknown>> | null>(KEY, null);
  if (!saved) return LOGOS;
  return {
    header: normalise(saved.header, LOGOS.header),
    footer: normalise(saved.footer, LOGOS.footer),
    watermark: normalise(saved.watermark, LOGOS.watermark),
  };
}

const asConfig = (c: Choices) =>
  "export const LOGOS: Record<LogoSlot, LogoConfig | null> = {\n" +
  SLOTS.map(({ id }) => {
    const v = c[id];
    return v
      ? `  ${id}: { id: "${v.id}", shape: "${v.shape}", light: "${v.light}", tone: "${v.tone}" },`
      : `  ${id}: null,`;
  }).join("\n") +
  "\n};\n";

function Toggle<T extends string>({
  value,
  disabled,
  options,
}: {
  value: T | undefined;
  disabled: boolean;
  options: [T, string, (v: T) => void][];
}) {
  return (
    <div className="lockup-switcher-row">
      {options.map(([v, label, onPick]) => (
        <button key={v} type="button" aria-pressed={value === v} disabled={disabled} onClick={() => onPick(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export function LockupProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [choices, setChoices] = useState<Choices>(LOGOS);
  const [slot, setSlot] = useState<LogoSlot>("header");
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  // Read overrides after hydration so server and client render the same first frame.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lockups") === "0") write(FLAG, false);
    if (params.get("lockups") === "1") write(FLAG, true);
    const on = import.meta.env.DEV || read(FLAG, false);
    setEnabled(on);
    if (on) setChoices(load());
  }, []);

  const save = (value: Choices) => {
    setChoices(value);
    write(KEY, value);
  };
  const current = choices[slot];
  const update = (next: Partial<LogoConfig>) => save({ ...choices, [slot]: { ...(current ?? FALLBACK), ...next } });
  const hidden = slot === "watermark" && current === null;

  const ids = LOCKUPS.map((l) => l.id as string).concat(slot === "watermark" ? ["none"] : []);
  const pick = (id: string) => (id === "none" ? save({ ...choices, [slot]: null }) : update({ id: id as LogoConfig["id"] }));
  const step = (dir: 1 | -1) => {
    const i = ids.indexOf(current?.id ?? "none");
    pick(ids[(i + dir + ids.length) % ids.length]!);
  };
  const copyTo = (target: LogoSlot) => {
    if (current === null && target !== "watermark") return; // only the watermark can be hidden
    save({ ...choices, [target]: current ? { ...current } : null });
  };
  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(asConfig(choices));
      setNote("Copied. Paste over LOGOS in src/lib/brand.ts.");
    } catch {
      setNote("Clipboard blocked. The config is in the console.");
      console.log(asConfig(choices));
    }
    window.setTimeout(() => setNote(""), 4000);
  };

  return (
    <LogoContext.Provider value={enabled ? choices : LOGOS}>
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
                  <button key={s.id} type="button" role="tab" aria-selected={slot === s.id} onClick={() => setSlot(s.id)}>
                    {s.label}
                  </button>
                ))}
              </div>
              <label>
                <span>Lockup</span>
                <div className="lockup-switcher-select">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous lockup">←</button>
                  <select value={current?.id ?? "none"} onChange={(e) => pick(e.target.value)}>
                    {LOCKUPS.map((l) => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                    {slot === "watermark" && <option value="none">Hidden</option>}
                  </select>
                  <button type="button" onClick={() => step(1)} aria-label="Next lockup">→</button>
                </div>
              </label>
              <Toggle<DoorShape>
                disabled={hidden}
                value={current?.shape}
                options={[
                  ["portfolio", "Portfolio", (shape) => update({ shape })],
                  ["rect", "Door", (shape) => update({ shape })],
                  ["arched", "Arched door", (shape) => update({ shape })],
                ]}
              />
              <Toggle<LockupTone>
                disabled={hidden}
                value={current?.tone}
                options={[
                  ["ink", "Ink", (tone) => update({ tone })],
                  ["gold-mark", "Gold mark", (tone) => update({ tone })],
                  ["gold", "All gold", (tone) => update({ tone })],
                ]}
              />
              <Toggle<LockupLight>
                disabled={hidden || current?.shape === "portfolio"}
                value={current?.tone === "ink" ? current.light : undefined}
                options={[["open", "Open doorway", (light) => update({ light })], ["gold", "Gold light", (light) => update({ light, tone: "ink" })]]}
              />
              <div className="lockup-switcher-row lockup-switcher-copy">
                <span>Copy to</span>
                {SLOTS.filter((s) => s.id !== slot).map((s) => (
                  <button key={s.id} type="button" onClick={() => copyTo(s.id)}>{s.label}</button>
                ))}
              </div>
              <div className="lockup-switcher-row">
                <button type="button" onClick={copyConfig}>Copy config</button>
                <button type="button" onClick={() => save(LOGOS)}>Reset to config</button>
              </div>
              <p>{note || "Dev preview only. Production follows src/lib/brand.ts."}</p>
            </div>
          )}
        </div>
      )}
    </LogoContext.Provider>
  );
}
