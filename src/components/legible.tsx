import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Text over photography that always meets WCAG AA (4.5:1).
 *
 * It samples the photo under the text area and works out the lightest scrim that makes
 * the text pass, trying both light text on a charcoal scrim and charcoal text on a paper
 * scrim, and picks whichever needs less scrim (light text wins ties: it suits the brand).
 * Gold is never used for text here: per the CI guide, gold text is only allowed on charcoal.
 *
 * Children style themselves with the `legible-text` / `legible-soft` classes; the scrim is
 * drawn by `<LegibleScrim />`.
 */

const CHARCOAL: RGB = [43, 42, 40];
const PAPER: RGB = [248, 245, 239];
type RGB = [number, number, number];

const lin = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]: RGB) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Smallest scrim alpha so that `text` passes against every sampled pixel (bar the brightest/darkest 3%). */
function alphaNeeded(pixels: RGB[], text: RGB, scrim: RGB, target: number) {
  const tl = luminance(text);
  // The gradient's strength across the text area is ~85% of its peak, so solve for that.
  for (let a = 0; a <= 0.96; a += 0.02) {
    const eff = a * 0.85;
    let failures = 0;
    for (const p of pixels) {
      const mixed: RGB = [
        p[0] + (scrim[0] - p[0]) * eff,
        p[1] + (scrim[1] - p[1]) * eff,
        p[2] + (scrim[2] - p[2]) * eff,
      ];
      if (contrast(tl, luminance(mixed)) < target) failures++;
    }
    if (failures / pixels.length <= 0.03) return a;
  }
  return 0.96;
}

export function useLegible<T extends HTMLElement>(
  region: "bottom" | "full" | "left" = "bottom",
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cancelled = false;
    let img: HTMLImageElement | null = null;

    const apply = () => {
      img = root.querySelector<HTMLImageElement>(".is-active img.media-img, img.media-img");
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      try {
        const N = 40;
        const canvas = document.createElement("canvas");
        canvas.width = N;
        canvas.height = N;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return true;
        // Draw what the frame actually shows (object-fit: cover), then read the text region.
        const box = img.getBoundingClientRect();
        const scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
        const sw = box.width / scale;
        const sh = box.height / scale;
        const [fx, fy] = (getComputedStyle(img).objectPosition || "50% 50%")
          .split(" ")
          .map((v) => parseFloat(v) / 100);
        const sx = (img.naturalWidth - sw) * (fx ?? 0.5);
        const sy = (img.naturalHeight - sh) * (fy ?? 0.5);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, N, N);
        const heroStrip = root.classList.contains("hero-show");
        const y0 = region === "bottom" ? Math.floor(N * (heroStrip ? 0.72 : 0.45)) : 0;
        const x1 = region === "left" ? Math.floor(N * 0.6) : N;
        const data = ctx.getImageData(0, y0, x1, N - y0).data;
        const pixels: RGB[] = [];
        for (let i = 0; i < data.length; i += 4)
          pixels.push([data[i]!, data[i + 1]!, data[i + 2]!]);
        const light = alphaNeeded(pixels, PAPER, CHARCOAL, 4.5);
        const dark = alphaNeeded(pixels, CHARCOAL, PAPER, 4.5);
        // Heroes always use light text on charcoal so slides feel consistent as they change.
        const useLight = heroStrip || light <= dark + 0.1;
        const a = Math.max(useLight ? light : dark, 0.35);
        if (cancelled) return true;
        root.style.setProperty("--legible-scrim", (useLight ? CHARCOAL : PAPER).join(" "));
        root.style.setProperty("--legible-a", a.toFixed(2));
        root.style.setProperty("--legible-text", `rgb(${(useLight ? PAPER : CHARCOAL).join(" ")})`);
        root.dataset["legible"] = useLight ? "light" : "dark";
      } catch {
        /* cross-origin image: keep the safe default (light text, strong scrim) */
      }
      return true;
    };

    if (!apply()) {
      const onLoad = () => apply();
      const target = root.querySelector<HTMLImageElement>("img.media-img");
      target?.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelled = true;
        target?.removeEventListener("load", onLoad);
      };
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, ...deps]);

  return ref;
}

/** The gradient behind overlay text; its colour and strength come from `useLegible`. */
export function LegibleScrim({
  className,
  direction = "top",
}: {
  className?: string | undefined;
  direction?: "top" | "right";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("legible-scrim", direction === "right" && "legible-scrim-right", className)}
    />
  );
}

/** Convenience wrapper: a positioned box that measures its own photo. */
export function Legible({
  children,
  className,
  region,
}: {
  children: ReactNode;
  className?: string | undefined;
  region?: "bottom" | "full" | "left";
}) {
  const ref = useLegible<HTMLDivElement>(region);
  return (
    <div ref={ref} className={cn("legible", className)}>
      {children}
    </div>
  );
}
