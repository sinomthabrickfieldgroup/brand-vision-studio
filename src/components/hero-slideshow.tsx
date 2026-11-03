import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LegibleScrim, useLegible } from "@/components/legible";
import { Media } from "@/components/media";
import { media, type MediaId } from "@/lib/media";
import { cn } from "@/lib/utils";

export interface Slide {
  id: MediaId;
  /** Caption; defaults to the shot title. */
  label?: string | undefined;
  /** Optional property to link the caption to. */
  slug?: string | undefined;
}

const INTERVAL = 6500;

/**
 * Cinematic hero: slow Ken Burns drift on each photo (or a looping video, if the shot has
 * one), a wipe between slides, story-style progress and a caption that links onwards.
 * Pauses on hover, when off screen and when the tab is hidden; manual only for reduced motion.
 */
export function HeroSlideshow({
  slides,
  eyebrow = "Featured",
}: {
  slides: Slide[];
  eyebrow?: string | undefined;
}) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const root = useLegible<HTMLDivElement>("bottom", [index]);
  const timer = useRef<number>(undefined);
  const count = slides.length;
  const paused = hovered || userPaused || !visible || reduced || count < 2;

  const go = useCallback(
    (next: number) => {
      setIndex((current) => {
        if (next === current) return current;
        setPrev(current);
        return (next + count) % count;
      });
    },
    [count],
  );

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [root]);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer.current);
  }, [index, paused, go]);

  // Drop the outgoing slide once the wipe has finished.
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), 1500);
    return () => window.clearTimeout(t);
  }, [prev, index]);

  const current = slides[index] ?? slides[0]!;
  const rest = media[current.id].title.split(" · ").pop() ?? "";
  const label = current.label ?? rest.charAt(0).toUpperCase() + rest.slice(1);

  return (
    <div
      ref={root}
      className={cn("hero-show legible", reduced && "is-reduced")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => (
        <div
          key={s.id + i}
          className={cn("hero-slide", i === index && "is-active", i === prev && "is-leaving")}
          style={{
            ["--kb-x" as string]: i % 2 ? "-2%" : "2%",
            ["--kb-y" as string]: i % 3 ? "1.5%" : "-1.5%",
          }}
          aria-hidden={i !== index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
        >
          <Media id={s.id} fill reveal={false} bare priority={i === 0} />
        </div>
      ))}
      <LegibleScrim className="z-[3]" />

      <div className="legible-text hero-show-ui">
        <div key={index} className="hero-show-caption">
          <p className="eyebrow-on-photo">{eyebrow}</p>
          {current.slug ? (
            <Link
              to="/portfolio/$slug"
              params={{ slug: current.slug }}
              className="hero-show-title group"
            >
              {label}
              <ArrowUpRight
                size={20}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </Link>
          ) : (
            <p className="hero-show-title">{label}</p>
          )}
        </div>

        {count > 1 && (
          <div className="hero-show-controls">
            <span className="hero-show-count tabular-nums">
              {String(index + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
            </span>
            <div className="hero-show-bars" aria-hidden="true">
              {slides.map((s, i) => (
                <button
                  key={s.id + i}
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(i)}
                  className={cn(
                    "hero-show-bar",
                    i < index && "is-done",
                    i === index && "is-current",
                  )}
                >
                  <span
                    style={{
                      animationDuration: `${INTERVAL}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                className="hero-show-btn"
                onClick={() => go(index - 1)}
                aria-label="Previous image"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                className="hero-show-btn"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {userPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                type="button"
                className="hero-show-btn"
                onClick={() => go(index + 1)}
                aria-label="Next image"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
