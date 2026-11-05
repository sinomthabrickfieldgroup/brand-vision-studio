import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LOCKUPS, type LockupId, type LockupLight } from "@/components/brand-lockup";

/**
 * Dev-only lockup switcher. The site renders the plain wordmark (the default) on the server and in
 * production. In `vite dev`, or after visiting any page with `?lockups=1` (handy on a Vercel preview),
 * a small panel lets you pick a lockup and whether the doorway is open (no fill) or lit gold; the choice is kept in
 * localStorage. Remove this file and its provider once a lockup is approved.
 */
type Choice = { id: LockupId; light: LockupLight };
const DEFAULT: Choice = { id: "wordmark", light: "paper" };
const KEY = "bf:lockup";
const FLAG = "bf:lockups-enabled";

const LockupContext = createContext<Choice>(DEFAULT);
export const useLockup = () => useContext(LockupContext);

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

export function LockupProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [choice, setChoice] = useState<Choice>(DEFAULT);
  const [open, setOpen] = useState(false);

  // Read the stored choice after hydration so server and client render the same first frame.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lockups") === "0") write(FLAG, false);
    if (params.get("lockups") === "1") write(FLAG, true);
    const on = import.meta.env.DEV || read(FLAG, false);
    setEnabled(on);
    if (on) {
      const saved = read<Choice>(KEY, DEFAULT);
      if (LOCKUPS.some((l) => l.id === saved.id)) setChoice(saved);
    }
  }, []);

  const update = (next: Partial<Choice>) => {
    const value = { ...choice, ...next };
    setChoice(value);
    write(KEY, value);
  };

  const step = (dir: 1 | -1) => {
    const i = LOCKUPS.findIndex((l) => l.id === choice.id);
    update({ id: LOCKUPS[(i + dir + LOCKUPS.length) % LOCKUPS.length]!.id });
  };

  return (
    <LockupContext.Provider value={enabled ? choice : DEFAULT}>
      {children}
      {enabled && (
        <div className="lockup-switcher" data-open={open}>
          <button type="button" className="lockup-switcher-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            Logo
          </button>
          {open && (
            <div className="lockup-switcher-panel">
              <label>
                <span>Lockup</span>
                <select value={choice.id} onChange={(e) => update({ id: e.target.value as LockupId })}>
                  {LOCKUPS.map((l) => (
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
                  <button
                    key={l}
                    type="button"
                    aria-pressed={choice.light === l}
                    onClick={() => update({ light: l })}
                  >
                    {l === "paper" ? "Open (no fill)" : "Gold light"}
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
