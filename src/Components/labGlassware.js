import React from "react";

/**
 * labGlassware.js, chemistry apparatus transcribed from the cleaned kit
 * (public/images/kit-chemsitry/), so the geometry has one home.
 *
 * Two variants:
 *
 *  "solid"  , the kit's own treatment: a filled ink silhouette with a stroked
 *              rim. An accent copy is revealed from the bottom by a clip rect,
 *              so the vessel appears to fill without losing the bold shape.
 *
 *  "outline", stroked glass with nothing inside, so real liquid can be seen
 *              through it. Used wherever the vessel actually holds a simulated
 *              liquid (the hero rack, the bench divider).
 *
 * subjectLab.js animates [data-lab-vessel-fill] and [data-liq-surface]; the
 * values set here are the resting state that ships in the rendered HTML.
 */

const RIM = { strokeWidth: 13, strokeLinecap: "round", stroke: "currentColor", fill: "none" };
const GLASS = { fill: "none", stroke: "currentColor", strokeWidth: 9, strokeLinejoin: "round" };

const VESSELS = {
  testTube: {
    viewBox: "0 -0.5 54 170",
    from: 6, to: 163,
    clip: { x: 0, width: 54 },
    liquid: { x: 11, w: 32, level: 52, bottom: 168 },
    shapes: (
      <>
        <rect x="11" y="6" width="32" height="141" fill="currentColor" />
        <circle cx="27" cy="147" r="16" fill="currentColor" />
      </>
    ),
    hollow: (
      <>
        <rect x="11" y="6" width="32" height="141" />
        <circle cx="27" cy="147" r="16" />
      </>
    ),
    outline: (
      <>
        <path d="M11,6 L11,147 M43,6 L43,147" {...GLASS} />
        <path d="M11,147 a16,16 0 0 0 32,0" {...GLASS} />
      </>
    ),
    rim: <line x1="6.5" y1="6.5" x2="47.5" y2="6.5" {...RIM} />,
  },
  beaker: {
    viewBox: "0 -5.5 95 154",
    from: 1, to: 142,
    clip: { x: 0, width: 95 },
    liquid: { x: 7, w: 81, level: 46, bottom: 146 },
    shapes: <rect x="7" y="1" width="81" height="141" rx="11.15" ry="11.15" fill="currentColor" />,
    hollow: <rect x="7" y="1" width="81" height="141" rx="11.15" ry="11.15" />,
    outline: <rect x="7" y="1" width="81" height="141" rx="11.15" ry="11.15" {...GLASS} />,
    rim: <line x1="6.5" y1="6.5" x2="88.5" y2="6.5" {...RIM} />,
  },
  erlenmeyer: {
    viewBox: "-6.52 -0.5 152.78 178",
    from: 6, to: 171,
    clip: { x: -7, width: 160 },
    liquid: { x: -6, w: 158, level: 96, bottom: 176 },
    shapes: (
      <>
        <path
          d="M53.14,54.49c7.44-12.89,26.04-12.89,33.48,0l25.26,43.76,25.26,43.76c7.44,12.89-1.86,28.99-16.74,28.99h-50.53s-50.53,0-50.53,0c-14.88,0-24.18-16.11-16.74-28.99l25.26-43.76,25.26-43.76Z"
          fill="currentColor"
        />
        <rect x="54.04" y="6" width="32" height="51" fill="currentColor" />
      </>
    ),
    hollow: (
      <>
        <path d="M53.14,54.49c7.44-12.89,26.04-12.89,33.48,0l25.26,43.76,25.26,43.76c7.44,12.89-1.86,28.99-16.74,28.99h-50.53s-50.53,0-50.53,0c-14.88,0-24.18-16.11-16.74-28.99l25.26-43.76,25.26-43.76Z" />
        <rect x="54.04" y="6" width="32" height="51" />
      </>
    ),
    outline: (
      <>
        <path d="M53.14,54.49c7.44-12.89,26.04-12.89,33.48,0l25.26,43.76,25.26,43.76c7.44,12.89-1.86,28.99-16.74,28.99h-50.53s-50.53,0-50.53,0c-14.88,0-24.18-16.11-16.74-28.99l25.26-43.76,25.26-43.76Z" {...GLASS} />
        <path d="M54.04,6 L54.04,57 M86.04,6 L86.04,57" {...GLASS} />
      </>
    ),
    rim: <line x1="49.54" y1="6.5" x2="90.54" y2="6.5" {...RIM} />,
  },
  wideBeaker: {
    viewBox: "0 -5.5 142 132",
    from: 1, to: 120,
    clip: { x: 0, width: 142 },
    liquid: { x: 11, w: 121, level: 44, bottom: 124 },
    shapes: <rect x="11" y="1" width="121" height="119" rx="11.15" ry="11.15" fill="currentColor" />,
    hollow: <rect x="11" y="1" width="121" height="119" rx="11.15" ry="11.15" />,
    outline: <rect x="11" y="1" width="121" height="119" rx="11.15" ry="11.15" {...GLASS} />,
    rim: <line x1="6.5" y1="6.5" x2="135.5" y2="6.5" {...RIM} />,
  },
  roundFlask: {
    viewBox: "-6.5 -0.5 141 179",
    from: 6, to: 172,
    clip: { x: -7, width: 148 },
    liquid: { x: -1, w: 130, level: 86, bottom: 176 },
    shapes: (
      <>
        <rect x="49" y="6" width="32" height="51" fill="currentColor" />
        <circle cx="64" cy="108" r="64" fill="currentColor" />
      </>
    ),
    hollow: (
      <>
        <rect x="49" y="6" width="32" height="51" />
        <circle cx="64" cy="108" r="64" />
      </>
    ),
    outline: (
      <>
        <circle cx="64" cy="108" r="64" {...GLASS} />
        <path d="M49,6 L49,52 M81,6 L81,52" {...GLASS} />
      </>
    ),
    rim: <line x1="44.5" y1="6.5" x2="85.5" y2="6.5" {...RIM} />,
  },
  pipette: {
    viewBox: "-12.49 0 150.24 150.24",
    from: 40, to: 138,
    clip: { x: -13, width: 156 },
    liquid: null,
    shapes: (
      <path
        d="M18.83,128.11l-14.96,9.24c-2.26,1.4-4.87-1.21-3.47-3.47l9.24-14.96L87.77,40.78l9.19,9.19L18.83,128.11Z"
        fill="currentColor"
      />
    ),
    hollow: <path d="M18.83,128.11l-14.96,9.24c-2.26,1.4-4.87-1.21-3.47-3.47l9.24-14.96L87.77,40.78l9.19,9.19L18.83,128.11Z" />,
    outline: <path d="M18.83,128.11l-14.96,9.24c-2.26,1.4-4.87-1.21-3.47-3.47l9.24-14.96L87.77,40.78l9.19,9.19L18.83,128.11Z" {...GLASS} />,
    rim: <line x1="125.25" y1="12.5" x2="94.84" y2="42.91" {...RIM} />,
  },
};

export const VESSEL_NAMES = Object.keys(VESSELS);
export const vesselMeta = (name) => VESSELS[name] || VESSELS.beaker;

/**
 * @param {string} name     key from VESSELS
 * @param {string} id       unique per instance, clip paths share a document scope
 * @param {string} variant  "solid" (default) or "outline"
 * @param {string} gradient gradient id to fill the liquid with (outline only)
 */
const Glassware = ({ name, id, className, variant = "solid", gradient }) => {
  const v = vesselMeta(name);
  const clipId = `lab-clip-${id}`;

  if (variant === "outline") {
    const liq = v.liquid;
    return (
      <svg viewBox={v.viewBox} className={className} role="presentation" focusable="false">
        {liq && (
          <defs>
            <clipPath id={clipId}>{v.hollow}</clipPath>
          </defs>
        )}
        {liq && (
          <g
            clipPath={`url(#${clipId})`}
            data-lab-liq
            data-liq-x={liq.x}
            data-liq-w={liq.w}
            data-liq-level={liq.level}
            data-liq-bottom={liq.bottom}
          >
            {/* Resting level ships in the HTML so the vessel is never empty */}
            <path
              data-liq-surface
              fill={gradient ? `url(#${gradient})` : "var(--lab-accent)"}
              d={`M${liq.x},${liq.level} L${liq.x + liq.w},${liq.level} L${liq.x + liq.w},${liq.bottom} L${liq.x},${liq.bottom} Z`}
            />
            <g data-liq-bubbles />
          </g>
        )}
        {v.outline}
        {v.rim}
      </svg>
    );
  }

  return (
    <svg viewBox={v.viewBox} className={className} role="presentation" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <rect data-lab-vessel-fill="" x={v.clip.x} width={v.clip.width} y={v.to} height="0" />
        </clipPath>
      </defs>
      <g data-lab-vessel="" data-fill-from={v.from} data-fill-to={v.to}>
        {v.shapes}
        {v.rim}
        <g clipPath={`url(#${clipId})`} style={{ color: "var(--lab-accent)" }}>
          {v.shapes}
        </g>
      </g>
    </svg>
  );
};

export default Glassware;
