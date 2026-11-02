import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

/** Progressive enhancement: all content stays visible without motion or JavaScript. */
export function EditorialMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: location => location.pathname });

  useEffect(() => {
    const root = container.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const isImage = element.tagName === "IMG";
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const delay = Math.min(Math.max(siblings.indexOf(element), 0), 3) * 90;
        animations.push(element.animate(isImage ? [
          { clipPath: "inset(7% 0 7% 0)", transform: "scale(1.045)", opacity: 0.65 },
          { clipPath: "inset(0% 0 0% 0)", transform: "scale(1)", opacity: 1 },
        ] : [
          { opacity: 0, transform: "translateY(26px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: isImage ? 1500 : 1000, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" }));
        observer.unobserve(element);
      });
    }, { threshold: 0.12 });
    root.querySelectorAll("h1, h2, h3, section > p, section > div > p, section .grid > div, section .grid > a, figure img").forEach(element => observer.observe(element));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(window.scrollY / distance, 1) : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return <>
    <div ref={progress} aria-hidden="true" className="reading-progress" />
    <div ref={container} className="editorial-pages">{children}</div>
  </>;
}