import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/site-shell";

/**
 * First-visit loading screen: a brick wall is laid course by course as the page really
 * loads (fonts + images), the Brickfield lockup assembles, then the screen lifts away to
 * reveal the page. Shown once per browser session.
 *
 * Safety: an inline script in the document head decides before first paint whether to show
 * it (html[data-loader]). Without JavaScript it is hidden by <noscript> CSS, and a CSS
 * failsafe removes it after a few seconds if anything goes wrong.
 */

const COLS = 7;
const ROWS = 5;
const PHRASES = ["Adaptive reuse", "Precinct development", "Patient capital"];

/** Running-bond bricks, laid bottom course first, left to right. */
const W = 44;
const H = 18;
const G = 4;
const HALF = (W - G) / 2;
const BRICKS = (() => {
  const bricks: { x: number; y: number; w: number }[] = [];
  for (let row = 0; row < ROWS; row++) {
    const y = (ROWS - 1 - row) * (H + G);
    const widths =
      row % 2 === 1
        ? [HALF, ...Array<number>(COLS - 1).fill(W), HALF]
        : Array<number>(COLS).fill(W);
    let x = 0;
    for (const w of widths) {
      bricks.push({ x, y, w });
      x += w + G;
    }
  }
  return bricks;
})();
const WALL_W = COLS * W + (COLS - 1) * G;
const WALL_H = ROWS * H + (ROWS - 1) * G;

export const LOADER_EVENT = "bf:loaded";
export const LOADER_SCRIPT = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem("bf-intro");d.setAttribute("data-loader",seen?"skip":"active");}catch(e){document.documentElement.setAttribute("data-loader","skip");}})();`;

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const raf = useRef(0);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset["loader"] !== "active") {
      setPhase("done");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN = reduce ? 600 : 2200;
    const MAX = 4800;
    const start = performance.now();

    let ready = 0;
    const signals: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ];
    signals.forEach((s) =>
      s.then(() => (ready += 1 / signals.length)).catch(() => (ready += 1 / signals.length)),
    );

    let shown = 0;
    let finishing = false;
    const timers: number[] = [];
    const tick = (now: number) => {
      const t = now - start;
      const timeP = Math.min(t / MIN, 1);
      // Never claim more than the page has actually done, unless it is taking too long.
      const ceiling = ready >= 0.999 ? 1 : 0.35 + ready * 0.55;
      const target = t > MAX ? 1 : Math.min(timeP, ceiling);
      shown += (target - shown) * (reduce ? 0.3 : 0.075);
      if (target === 1 && shown > 0.996) shown = 1;
      setProgress(shown);
      if (shown === 1 && !finishing) {
        finishing = true;
        timers.push(
          window.setTimeout(
            () => {
              setPhase("exit");
              html.dataset["loader"] = "exiting";
              window.dispatchEvent(new Event(LOADER_EVENT));
            },
            reduce ? 0 : 420,
          ),
          window.setTimeout(
            () => {
              setPhase("done");
              html.dataset["loader"] = "done";
              try {
                sessionStorage.setItem("bf-intro", "1");
              } catch {
                /* private mode */
              }
            },
            reduce ? 350 : 420 + 1250,
          ),
        );
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (phase === "done") return null;

  const laid = Math.floor(progress * BRICKS.length + 0.0001);
  const pct = Math.round(progress * 100);
  const phrase = PHRASES[Math.min(Math.floor(progress * PHRASES.length), PHRASES.length - 1)];

  return (
    <div
      className={`site-loader${phase === "exit" ? " is-exiting" : ""}`}
      role="progressbar"
      aria-label="Loading Brickfield Group"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div className="site-loader-grain" aria-hidden="true" />
      <div className="site-loader-stage">
        <svg
          className="site-loader-wall"
          viewBox={`-2 -2 ${WALL_W + 4} ${WALL_H + 4}`}
          aria-hidden="true"
        >
          {BRICKS.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={H}
              rx={2}
              className={
                i < laid ? (i === BRICKS.length - 1 ? "is-laid is-key" : "is-laid") : undefined
              }
              style={{ transitionDelay: `${(i % 3) * 40}ms`, ["--i" as string]: i }}
            />
          ))}
        </svg>
        <div className={`site-loader-logo${progress > 0.55 ? " is-in" : ""}`}>
          <LogoMark layout="stacked" />
        </div>
      </div>

      <div className="site-loader-foot" aria-hidden="true">
        <p key={phrase} className="site-loader-phrase">
          <span className="eyebrow-rule" />
          {phrase}
        </p>
        <p className="site-loader-count">
          {String(pct).padStart(3, "0")}
          <span>%</span>
        </p>
      </div>
      <div
        className="site-loader-bar"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </div>
  );
}
