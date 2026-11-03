import { useEffect, useRef, useState, type CSSProperties } from "react";
import { media, standIns, type MediaId } from "@/lib/media";
import { cn } from "@/lib/utils";

interface MediaProps {
  id: MediaId;
  className?: string;
  /** Fill the parent box instead of using the shot's own aspect ratio. */
  fill?: boolean;
  /** Scroll parallax strength (e.g. 0.08). Handled by EditorialMotion. */
  parallax?: number;
  /** Clip-path reveal when the frame enters the viewport. */
  reveal?: boolean;
  priority?: boolean;
  caption?: boolean;
  style?: CSSProperties;
  /** Hide the placeholder label (for background and decorative uses). */
  bare?: boolean;
}

/**
 * Renders a shot from the shot list. Shots without a real image yet (or whose image fails
 * to load) render an art-directed placeholder so layouts still read as photographic.
 */
export function Media({
  id,
  className,
  fill,
  parallax,
  reveal = true,
  priority,
  caption,
  style,
  bare,
}: MediaProps) {
  const shot = media[id];
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // An image can fail before hydration attaches onError; catch that case too.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  const stand = standIns[id];
  const src = ("src" in shot ? (shot.src as string | undefined) : undefined) ?? stand?.src;
  const showImage = src && !failed;

  return (
    <figure
      className={cn("media-frame", fill && "absolute inset-0 h-full w-full", className)}
      style={{
        ...(fill || /\baspect-/.test(className ?? "") ? {} : { aspectRatio: shot.aspect }),
        ...style,
      }}
      data-reveal={reveal ? "frame" : undefined}
    >
      <div className="media-inner" data-parallax={parallax}>
        {showImage ? (
          <img
            ref={img}
            src={src}
            alt={shot.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
            style={stand && !("src" in shot) ? { objectPosition: stand.focus } : undefined}
          />
        ) : (
          <div
            role="img"
            aria-label={shot.alt}
            className={cn("media-placeholder", `tone-${shot.tone}`)}
            title={shot.prompt}
          />
        )}
      </div>
      {!showImage && !bare && (
        <span className="media-slate" aria-hidden="true">
          <span className="media-slate-dot" />
          {shot.title}
        </span>
      )}
      {caption && <figcaption className="media-caption">{shot.title}</figcaption>}
    </figure>
  );
}
