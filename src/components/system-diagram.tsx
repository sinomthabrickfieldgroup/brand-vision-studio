import { Cctv, KeyRound, Laptop, Router, Smartphone, Tv } from "lucide-react";
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
  { key: "backup", label: "Backup line on standby", swatch: "dotted" },
  { key: "devices", label: "Everything on the network", swatch: "solid" },
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

const DEVICES = [
  { x: 62, y: 262, label: "Laptops", Icon: Laptop },
  { x: 96, y: 392, label: "Phones", Icon: Smartphone },
  { x: 200, y: 440, label: "Meeting rooms", Icon: Tv },
  { x: 304, y: 392, label: "Access control", Icon: KeyRound },
  { x: 338, y: 262, label: "CCTV", Icon: Cctv },
];
const HUB = { x: 200, y: 250 };

function CommsSvg() {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-labelledby="comms-title comms-desc">
      <title id="comms-title">How the building stays connected</title>
      <desc id="comms-desc">
        Fibre feeds the building network, with a backup line on standby. Laptops, phones, meeting
        rooms, access control and CCTV all connect through it.
      </desc>

      {/* upstream: primary fibre and backup line */}
      <path d="M130 0 C 130 120, 170 160, 188 220" className="d-pipe" data-part="primary" />
      <path d="M130 0 C 130 120, 170 160, 188 220" className="d-flow" data-part="primary" />
      <text x="140" y="40" className="d-label">
        Primary fibre
      </text>
      <path d="M290 0 C 290 120, 230 160, 212 220" className="d-muni" data-part="backup" />
      <text x="282" y="70" className="d-note" textAnchor="end">
        Backup line · standby
      </text>

      {/* hub to devices */}
      {DEVICES.map((d) => (
        <g key={d.label} data-part="devices">
          <line x1={HUB.x} y1={HUB.y} x2={d.x} y2={d.y} className="d-supply n-link" />
          <line x1={HUB.x} y1={HUB.y} x2={d.x} y2={d.y} className="d-flow" />
        </g>
      ))}

      {/* hub */}
      <circle cx={HUB.x} cy={HUB.y} r="44" className="n-halo" />
      <circle cx={HUB.x} cy={HUB.y} r="32" className="n-hub" />
      <Router x={HUB.x - 13} y={HUB.y - 13} width={26} height={26} className="n-icon n-icon-hub" />
      <text x={HUB.x} y={HUB.y - 54} className="d-note" textAnchor="middle">
        Building network
      </text>

      {/* devices */}
      {DEVICES.map((d, i) => (
        <g key={d.label} data-part="devices">
          <circle
            cx={d.x}
            cy={d.y}
            r="25"
            className="n-device"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <d.Icon x={d.x - 11} y={d.y - 11} width={22} height={22} className="n-icon" />
          <text x={d.x} y={d.y + 44} className="d-note" textAnchor="middle">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
