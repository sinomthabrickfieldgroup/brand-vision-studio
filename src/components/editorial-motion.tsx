import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { LOADER_EVENT } from "@/components/site-loader";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Elements that rise in when they enter the viewport. */
const TEXT_SELECTOR = [
  "h1",
  "h2",
  "section h3",
  ".eyebrow",
  "section p",
  ".stat",
  ".action",
  ".tag",
  "[data-reveal-item]",
].join(", ");

/**
 * Page motion, applied as progressive enhancement. Content is fully visible without
 * JavaScript and for visitors who prefer reduced motion.
 *
 * - Text and blocks rise in (IntersectionObserver + Web Animations API).
 * - `[data-reveal="frame"]` images open with a clip-path wipe and settle from a slight zoom.
 * - `[data-parallax="0.1"]` drifts with scroll.
 * - `[data-expand]` grows from an inset frame to full-bleed as it scrolls up.
 * - `[data-pin]` + `[data-pin-track]` turns vertical scroll into a horizontal reel.
 * - `[data-count]` counts numbers up the first time they are seen.
 */
export function EditorialMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const root = container.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Wait for the page to finish hydrating before touching inline styles.
    let cleanup = () => {};
    let cancelled = false;
    const begin = () => {
      if (!cancelled) cleanup = setup(root);
    };
    let start = 0;
    // On a first visit the loading screen covers the page; start motion as it lifts.
    const waiting = document.documentElement.dataset["loader"] === "active";
    if (waiting) window.addEventListener(LOADER_EVENT, begin, { once: true });
    else start = window.setTimeout(begin, 60);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      window.removeEventListener(LOADER_EVENT, begin);
      cleanup();
    };
  }, [pathname]);

  function setup(root: HTMLDivElement) {
    root.classList.add("motion-ready");

    const animations: Animation[] = [];
    const counters: { el: HTMLElement; original: string; raf: number }[] = [];

    const reveal = (element: Element) => {
      const el = element as HTMLElement;
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const delay = Math.min(Math.max(siblings.indexOf(el), 0), 4) * 80;

      if (el.dataset["reveal"] === "frame") {
        animations.push(
          el.animate([{ clipPath: "inset(12% 6% 12% 6%)" }, { clipPath: "inset(0% 0% 0% 0%)" }], {
            duration: 1500,
            delay,
            easing: EASE,
            fill: "backwards",
          }),
        );
        const inner = el.querySelector<HTMLElement>(".media-inner > *");
        if (inner)
          animations.push(
            inner.animate([{ transform: "scale(1.18)" }, { transform: "scale(1)" }], {
              duration: 2000,
              delay,
              easing: EASE,
              fill: "backwards",
            }),
          );
        return;
      }
      if (el.dataset["count"] !== undefined) countUp(el);
      const isTitle = el.tagName === "H1" || el.classList.contains("hero-title");
      animations.push(
        el.animate(
          isTitle
            ? [
                { opacity: 0, transform: "translateY(48px)", clipPath: "inset(0 0 100% 0)" },
                { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 -20% 0)" },
              ]
            : [
                { opacity: 0, transform: "translateY(28px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
          { duration: isTitle ? 1400 : 1000, delay, easing: EASE, fill: "backwards" },
        ),
      );
    };

    const countUp = (el: HTMLElement) => {
      const original = el.dataset["count"] ?? el.textContent ?? "";
      const match = original.match(/^([^\d]*)([\d][\d,.]*)(.*)$/);
      if (!match || /\d/.test(match[3] ?? "") || /^(19|20)\d{2}$/.test(original.trim())) return;
      const [, prefix = "", raw = "0", suffix = ""] = match;
      const target = parseFloat(raw.replace(/,/g, ""));
      const decimals = raw.includes(".") ? (raw.split(".")[1] ?? "").length : 0;
      const grouped = raw.includes(",");
      const entry = { el, original, raf: 0 };
      counters.push(entry);
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        const value = (target * eased).toFixed(decimals);
        const formatted = grouped
          ? Number(value).toLocaleString("en-US", { minimumFractionDigits: decimals })
          : value;
        el.textContent = `${prefix}${formatted}${suffix}`;
        if (p < 1) entry.raf = requestAnimationFrame(tick);
        else el.textContent = original;
      };
      entry.raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const watched = new Set<Element>();
    const scan = () => {
      root
        .querySelectorAll(`${TEXT_SELECTOR}, [data-reveal="frame"], [data-count]`)
        .forEach((el) => {
          if (watched.has(el) || el.closest("[role='tabpanel'], .tab-image, .marquee, header"))
            return;
          // Skip nested matches so a paragraph inside a revealing block doesn't animate twice.
          const parent = el.parentElement?.closest(`[data-reveal-item], .stat`);
          if (parent && parent !== el && !(el as HTMLElement).dataset["count"]) return;
          watched.add(el);
          observer.observe(el);
        });
    };
    scan();

    // Scroll-linked effects.
    const parallax = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]")).filter(
      (el) => el.dataset["parallax"],
    );
    const expand = Array.from(root.querySelectorAll<HTMLElement>("[data-expand]"));
    const pins = Array.from(root.querySelectorAll<HTMLElement>("[data-pin]"));
    const isDesktop = window.matchMedia("(min-width: 768px)");

    const sizePins = () => {
      pins.forEach((pin) => {
        const track = pin.querySelector<HTMLElement>("[data-pin-track]");
        if (!track) return;
        if (!isDesktop.matches) {
          pin.style.height = "";
          track.style.transform = "";
          return;
        }
        const distance = Math.max(track.scrollWidth - window.innerWidth, 0);
        pin.style.height = `${distance + window.innerHeight}px`;
        pin.dataset["distance"] = String(distance);
      });
    };

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const distance = document.documentElement.scrollHeight - vh;
        if (progress.current)
          progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(window.scrollY / distance, 1) : 0})`;

        parallax.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          const strength = Number(el.dataset["parallax"]) || 0;
          const offset = (rect.top + rect.height / 2 - vh / 2) * strength;
          el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)${el.classList.contains("media-inner") ? " scale(1.14)" : ""}`;
        });

        expand.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const p = Math.min(Math.max(1 - (rect.top - vh * 0.08) / (vh * 0.75), 0), 1);
          el.style.setProperty("--expand", p.toFixed(3));
        });

        if (isDesktop.matches) {
          pins.forEach((pin) => {
            const track = pin.querySelector<HTMLElement>("[data-pin-track]");
            if (!track) return;
            const rect = pin.getBoundingClientRect();
            const travel = Number(pin.dataset["distance"]) || 0;
            const p = Math.min(Math.max(-rect.top / Math.max(rect.height - vh, 1), 0), 1);
            track.style.transform = `translate3d(${(-travel * p).toFixed(1)}px, 0, 0)`;
            pin.style.setProperty("--pin-progress", p.toFixed(3));
          });
        }
      });
    };

    sizePins();
    update();
    const onResize = () => {
      sizePins();
      update();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      root.classList.remove("motion-ready");
      observer.disconnect();
      animations.forEach((a) => a.cancel());
      counters.forEach((c) => {
        cancelAnimationFrame(c.raf);
        c.el.textContent = c.original;
      });
      cancelAnimationFrame(frame);
      parallax.forEach((el) => (el.style.transform = ""));
      pins.forEach((pin) => {
        pin.style.height = "";
        const track = pin.querySelector<HTMLElement>("[data-pin-track]");
        if (track) track.style.transform = "";
      });
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }

  return (
    <>
      <div ref={progress} aria-hidden="true" className="reading-progress" />
      <div ref={container} className="editorial-pages">
        {children}
      </div>
    </>
  );
}
