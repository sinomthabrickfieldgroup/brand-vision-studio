import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated line diagrams for building systems, drawn in the site's editorial style.
 * Animation runs only while the diagram is on screen, and is static for reduced motion.
 */
export function SystemDiagram({
  kind,
  className,
}: {
  kind: "water" | "comms";
  className?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(!!e?.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const legend = kind === "water" ? WATER_LEGEND : COMMS_LEGEND;

  return (
    <div
      ref={ref}
      className={cn("diagram", `diagram-${kind}`, playing && "is-playing", className)}
      data-active={active ?? undefined}
    >
      <div className="diagram-canvas">{kind === "water" ? <WaterSvg /> : <CommsSvg />}</div>
      <ul className="diagram-legend" aria-label="Diagram key">
        {legend.map((l) => (
          <li key={l.key}>
            <button
              type="button"
              className="diagram-key"
              data-key={l.key}
              aria-pressed={active === l.key}
              onMouseEnter={() => setActive(l.key)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(l.key)}
              onBlur={() => setActive(null)}
            >
              <span className={cn("diagram-swatch", `swatch-${l.swatch}`)} aria-hidden="true" />
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const WATER_LEGEND = [
  { key: "rain", label: "Rainwater harvesting", swatch: "flow" },
  { key: "bore", label: "Borehole", swatch: "flow" },
  { key: "supply", label: "Building supply", swatch: "solid" },
  { key: "muni", label: "Municipal, backup only", swatch: "dotted" },
];

const COMMS_LEGEND = [
  { key: "primary", label: "Primary fibre", swatch: "flow" },
  { key: "backup", label: "Backup line, automatic failover", swatch: "dotted" },
  { key: "riser", label: "Every floor, always online", swatch: "solid" },
];

function WaterSvg() {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-labelledby="water-title water-desc">
      <title id="water-title">How water reaches the building</title>
      <desc id="water-desc">
        Rain is collected from the roof and a borehole draws from the ground. Both feed on-site
        storage, which supplies the building. The municipal line is kept as a backup.
      </desc>

      {/* ground and aquifer */}
      <rect x="0" y="330" width="400" height="170" className="d-soil" />
      <line x1="0" y1="330" x2="400" y2="330" className="d-ground" />
      <path
        d="M0 448 C 50 438, 90 458, 140 448 S 230 438, 280 448 S 360 458, 400 448 L400 474 C 350 484, 310 464, 260 474 S 170 484, 120 474 S 40 464, 0 474 Z"
        className="d-aquifer"
      />
      <text x="392" y="492" className="d-note" textAnchor="end">
        Aquifer
      </text>

      {/* rain */}
      <g className="d-rain" data-part="rain">
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={196 + i * 13}
            y1={40 + (i % 3) * 12}
            x2={192 + i * 13}
            y2={56 + (i % 3) * 12}
            style={{ animationDelay: `${(i % 5) * 0.23}s` }}
          />
        ))}
      </g>

      {/* building */}
      <g className="d-building">
        <path d="M188 330 V150 H372 V330" />
        <line x1="180" y1="150" x2="380" y2="150" className="d-roof" />
        <line x1="188" y1="210" x2="372" y2="210" className="d-floor" />
        <line x1="188" y1="270" x2="372" y2="270" className="d-floor" />
        {[170, 230, 290].map((y) =>
          [250, 290, 330].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="22"
              height="22"
              rx="1"
              className="d-window"
            />
          )),
        )}
        {/* brick coursing hint */}
        {[318, 324].map((y, r) => (
          <g key={y} className="d-brick">
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1={192 + i * 22 + (r ? 11 : 0)}
                y1={y}
                x2={206 + i * 22 + (r ? 11 : 0)}
                y2={y}
              />
            ))}
          </g>
        ))}
      </g>

      {/* storage tank with animated level */}
      <defs>
        <clipPath id="tank-clip">
          <rect x="62" y="232" width="76" height="96" rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#tank-clip)">
        <rect x="62" y="232" width="76" height="96" className="d-water" />
      </g>
      <rect x="60" y="230" width="80" height="100" rx="8" className="d-tank" />
      <text x="100" y="222" className="d-label" textAnchor="middle">
        Storage
      </text>

      {/* rainwater: gutter, downpipe, into tank */}
      <path d="M188 152 H178 V250 Q178 262 166 262 H140" className="d-pipe" data-part="rain" />
      <path d="M188 152 H178 V250 Q178 262 166 262 H140" className="d-flow" data-part="rain" />
      <text x="214" y="138" className="d-label">
        Roof collection
      </text>

      {/* borehole */}
      <rect x="20" y="312" width="22" height="18" rx="2" className="d-pump" />
      <path d="M31 448 V300 Q31 290 41 290 H60" className="d-pipe" data-part="bore" />
      <path d="M31 448 V300 Q31 290 41 290 H60" className="d-flow" data-part="bore" />
      <text x="40" y="372" className="d-label">
        Borehole
      </text>

      {/* supply to building, up the riser */}
      <path
        d="M140 312 H188 M206 312 V170 M206 290 H226 M206 230 H226 M206 170 H226"
        className="d-supply"
        data-part="supply"
      />
      <path d="M140 312 H206 V170" className="d-flow d-flow-supply" data-part="supply" />

      {/* municipal backup */}
      <path d="M400 352 H300 Q290 352 290 342 V330" className="d-muni" data-part="muni" />
      <circle cx="320" cy="352" r="5" className="d-valve" data-part="muni" />
      <text x="392" y="372" className="d-note" textAnchor="end">
        Municipal, backup only
      </text>
    </svg>
  );
}

function CommsSvg() {
  const floors = [160, 235, 310];
  return (
    <svg viewBox="0 0 400 500" role="img" aria-labelledby="comms-title comms-desc">
      <title id="comms-title">How the building stays connected</title>
      <desc id="comms-desc">
        A primary fibre line feeds the comms room and a riser to every floor. When the primary line
        fails, a backup line takes over automatically and every floor stays online.
      </desc>

      {/* status */}
      <g className="c-status">
        <rect x="16" y="20" width="230" height="56" rx="10" className="c-status-box" />
        <circle cx="34" cy="38" r="4" className="c-dot" />
        <text x="46" y="42" className="d-label">
          All floors online
        </text>
        <text x="34" y="64" className="d-note c-on-primary">
          Running on primary fibre
        </text>
        <text x="34" y="64" className="d-note c-on-backup">
          Primary down · backup took over
        </text>
      </g>

      {/* building */}
      <g className="d-building">
        <path d="M210 420 V120 H372 V420" />
        <line x1="202" y1="120" x2="380" y2="120" className="d-roof" />
        {[195, 270, 345].map((y) => (
          <line key={y} x1="210" y1={y} x2="372" y2={y} className="d-floor" />
        ))}
        {floors.map((y) =>
          [280, 305, 330, 355].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x - 9}
              y={y - 6}
              width="16"
              height="12"
              rx="1"
              className="d-window"
            />
          )),
        )}
      </g>
      <line x1="0" y1="420" x2="400" y2="420" className="d-ground" />

      {/* comms room */}
      <rect x="222" y="362" width="50" height="46" rx="4" className="c-room" />
      <text x="247" y="438" className="d-note" textAnchor="middle">
        Comms room
      </text>

      {/* riser to every floor */}
      <path d="M247 362 V160" className="d-supply" data-part="riser" />
      <path d="M247 362 V160" className="d-flow" data-part="riser" />
      {floors.map((y, i) => (
        <g key={y} data-part="riser">
          <line x1="247" y1={y} x2="262" y2={y} className="d-supply" />
          <circle
            cx="247"
            cy={y}
            r="5"
            className="c-node"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        </g>
      ))}

      {/* primary fibre */}
      <path
        id="c-primary"
        d="M0 300 C 90 300, 130 378, 222 378"
        className="d-pipe"
        data-part="primary"
      />
      <path
        d="M0 300 C 90 300, 130 378, 222 378"
        className="d-flow c-primary-flow"
        data-part="primary"
      />
      <text x="8" y="288" className="d-label">
        Primary fibre
      </text>
      <g className="c-break" transform="translate(112 338)">
        <circle r="11" />
        <path d="M-5 -5 L5 5 M5 -5 L-5 5" />
      </g>

      {/* backup line */}
      <path d="M0 468 C 100 468, 140 396, 222 396" className="d-muni" data-part="backup" />
      <path
        d="M0 468 C 100 468, 140 396, 222 396"
        className="d-flow c-backup-flow"
        data-part="backup"
      />
      <text x="8" y="490" className="d-label">
        Backup line
      </text>
    </svg>
  );
}
