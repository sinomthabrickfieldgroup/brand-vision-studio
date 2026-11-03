import { useEffect, useRef, useState, type CSSProperties } from "react";
import { media, standIns, type MediaId } from "@/lib/media";
import { LQIP } from "@/lib/media-lqip";
import { cn } from "@/lib/utils";

interface MediaProps {
  id: MediaId;
  className?: string | undefined;
  /** Fill the parent box instead of using the shot's own aspect ratio. */
  fill?: boolean | undefined;
  /** Scroll parallax strength (e.g. 0.08). Handled by EditorialMotion. */
  parallax?: number | undefined;
  /** Clip-path reveal when the frame enters the viewport. */
  reveal?: boolean | undefined;
  priority?: boolean | undefined;
  caption?: boolean | undefined;
  style?: CSSProperties | undefined;
  /** Hide the placeholder label (for background and decorative uses). */
  bare?: boolean | undefined;
}

/** Find the blurred preview for an imported asset URL, in dev ("/src/.../name.webp") or production ("/assets/name-HASH.webp"). */
function lqipFor(src: string | undefined) {
  if (!src) return undefined;
  const file =
    src
      .split("/")
      .pop()
      ?.split("?")[0]
      ?.replace(/\.\w+$/, "") ?? "";
  return LQIP[file] ?? LQIP[file.replace(/-[\w-]{8}$/, "")];
}

/**
 * Renders a shot from the shot list.
 * - Photos load progressively: a blurred preview shows at once, the full image fades in sharp.
 * - Shots with a `video` play muted and looped, with the photo as poster.
 * - Shots without an image yet render an art-directed placeholder.
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
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const stand = standIns[id];
  const src = ("src" in shot ? (shot.src as string | undefined) : undefined) ?? stand?.src;
  const video = "video" in shot ? (shot.video as string | undefined) : undefined;
  const focus = ("focus" in shot ? (shot.focus as string | undefined) : undefined) ?? stand?.focus;
  const mobileFocus = "mobileFocus" in shot ? (shot.mobileFocus as string | undefined) : undefined;
  const mobileZoom = "mobileZoom" in shot ? (shot.mobileZoom as number | undefined) : undefined;
  const frameVars = {
    ...(focus ? { ["--focus" as string]: focus } : {}),
    ...(mobileFocus ? { ["--focus-m" as string]: mobileFocus } : {}),
    ...(mobileZoom ? { ["--zoom-m" as string]: String(mobileZoom) } : {}),
  };
  const preview = lqipFor(src);
  const showImage = src && !failed;

  // The image may finish (or fail) before hydration attaches its handlers.
  useEffect(() => {
    const el = img.current;
    if (!el || !el.complete) return;
    if (el.naturalWidth === 0) setFailed(true);
    else setLoaded(true);
  }, [src]);

  return (
    <figure
      className={cn(
        "media-frame",
        fill && "absolute inset-0 h-full w-full",
        showImage && !loaded && "is-loading",
        className,
      )}
      style={{
        ...(fill || /\baspect-/.test(className ?? "") ? {} : { aspectRatio: shot.aspect }),
        ...frameVars,
        ...style,
      }}
      data-reveal={reveal ? "frame" : undefined}
    >
      <div className="media-inner" data-parallax={parallax}>
        {showImage ? (
          <>
            {preview && (
              <span
                className="media-preview"
                aria-hidden="true"
                style={{ backgroundImage: `url(${preview})` }}
              />
            )}
            {video ? (
              <video
                className="media-img h-full w-full object-cover"
                src={video}
                poster={src}
                autoPlay
                muted
                loop
                playsInline
                aria-label={shot.alt}
                onLoadedData={() => setLoaded(true)}
              />
            ) : (
              <img
                ref={img}
                src={src}
                alt={shot.alt}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className="media-img h-full w-full object-cover"
              />
            )}
          </>
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
      {showImage && "credit" in shot && (
        <span className="media-credit">{shot.credit as string}</span>
      )}
      {caption && <figcaption className="media-caption">{shot.title}</figcaption>}
    </figure>
  );
}
