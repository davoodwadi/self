/* ==========================================================================
   Shared objects: what the course's plates draw, built on ./kit. The patent
   drawing pieces come first (sheets, gears, lenses, people, coins, houses,
   tags, dials, reference numerals); the Isometric Tabletop pieces after them
   belong to the previous style.
   ========================================================================== */

import React from "react";
import { INK, LINE, PAPER, PAL, PAT, r2, stip } from "./kit";

const ink = { stroke: PAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: PAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/**
 * A flat sheet lying down (card, form, page): a parallelogram top face with a
 * thin stippled edge. (x, y) is the front-left corner; the far edge sits `d`
 * higher and `sk` to the right. `lines` sets hairline text rows on the face.
 */
export function Sheet({
  id,
  x,
  y,
  w,
  d,
  sk,
  t = 3,
  fill = PAT.paper,
  stroke = PAT.ink,
  sw = LINE.outline,
  lines = 0,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  d: number;
  sk: number;
  t?: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  lines?: number;
}) {
  const rows = Array.from({ length: lines }, (_, j) => {
    const f = (j + 1) / (lines + 1);
    const yy = r2(y - d * (1 - f));
    const xs = r2(x + sk * (1 - f) + w * 0.14);
    return <line key={j} x1={xs} y1={yy} x2={r2(xs + w * 0.66)} y2={yy} {...hair} />;
  });
  return (
    <g>
      <path
        d={`M${x} ${y}V${r2(y + t)}H${r2(x + w)}L${r2(x + w + sk)} ${r2(y - d + t)}V${r2(y - d)}L${r2(x + w)} ${y}Z`}
        fill={stip(id, "dense")}
        {...ink}
      />
      <path
        d={`M${x} ${y}L${r2(x + sk)} ${r2(y - d)}H${r2(x + sk + w)}L${r2(x + w)} ${y}Z`}
        fill={fill}
        {...ink}
        stroke={stroke}
        strokeWidth={sw}
      />
      {rows}
    </g>
  );
}

/** A spur gear outline: `n` square-ish teeth between radii r and r + tooth. */
export function gearPath(cx: number, cy: number, r: number, n: number, tooth = 4, phase = 0) {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = phase + (i / n) * Math.PI * 2;
    const s = (Math.PI * 2) / n;
    const ring = [
      [r, a],
      [r + tooth, a + s * 0.12],
      [r + tooth, a + s * 0.42],
      [r, a + s * 0.54],
    ];
    for (const [rr, aa] of ring) pts.push(`${r2(cx + rr * Math.cos(aa))} ${r2(cy + rr * Math.sin(aa))}`);
  }
  return `M${pts.join("L")}Z`;
}

/** A gear with a hub, drawn in outline. */
export function Gear({ cx, cy, r, n, phase = 0 }: { cx: number; cy: number; r: number; n: number; phase?: number }) {
  return (
    <g>
      <path d={gearPath(cx, cy, r, n, 4, phase)} fill={PAT.paper} {...ink} />
      <circle cx={cx} cy={cy} r={r2(r * 0.32)} fill={PAT.paper} {...hair} />
      <circle cx={cx} cy={cy} r={2} fill={PAT.ink} />
    </g>
  );
}

/**
 * A hand lens: a stippled rim around clear glass and a handle running out at
 * angle `a` (radians, 0 = right, positive = down). Children sit in the glass.
 */
export function Lens({
  id,
  cx,
  cy,
  r,
  a,
  handle = 34,
  children,
}: {
  id: string;
  cx: number;
  cy: number;
  r: number;
  a: number;
  handle?: number;
  children?: React.ReactNode;
}) {
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const px = -uy * 4;
  const py = ux * 4;
  const x0 = cx + ux * r;
  const y0 = cy + uy * r;
  const x1 = cx + ux * (r + handle);
  const y1 = cy + uy * (r + handle);
  const d = `M${r2(x0 + px)} ${r2(y0 + py)}L${r2(x1 + px)} ${r2(y1 + py)}A4 4 0 0 0 ${r2(x1 - px)} ${r2(y1 - py)}L${r2(x0 - px)} ${r2(y0 - py)}Z`;
  return (
    <g>
      <path d={d} fill={stip(id, "dense")} {...ink} />
      <circle cx={cx} cy={cy} r={r} fill={stip(id, "dense")} {...ink} />
      <circle cx={cx} cy={cy} r={r - 4} fill={PAT.paper} {...ink} />
      {children}
    </g>
  );
}

export const tick = (cx: number, cy: number, s: number) =>
  `M${r2(cx - s)} ${r2(cy)}L${r2(cx - s * 0.3)} ${r2(cy + s * 0.7)}L${r2(cx + s)} ${r2(cy - s * 0.8)}`;

export const cross = (cx: number, cy: number, s: number) =>
  `M${r2(cx - s)} ${r2(cy - s)}L${r2(cx + s)} ${r2(cy + s)}M${r2(cx + s)} ${r2(cy - s)}L${r2(cx - s)} ${r2(cy + s)}`;

/** A five-point star centred on (cx, cy). */
export const star = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${r2(cx + rr * Math.cos(a))} ${r2(cy + rr * Math.sin(a))}`;
  });
  return `M${pts.join("L")}Z`;
};

/** A stack of `n` coins standing on (cx, y): white rims, a light-stippled cap (red for the finding). */
export function Coins({ id, cx, y, n, rx = 15, ry = 5, h = 5, red = false }: { id: string; cx: number; y: number; n: number; rx?: number; ry?: number; h?: number; red?: boolean }) {
  const top = y - n * h;
  const c = red ? PAT.signal : PAT.ink;
  return (
    <g>
      <path
        d={`M${r2(cx - rx)} ${top}V${y}A${rx} ${ry} 0 0 0 ${r2(cx + rx)} ${y}V${top}Z`}
        fill={PAT.paper}
        {...ink}
        stroke={c}
      />
      {Array.from({ length: n - 1 }, (_, i) => (
        <path
          key={i}
          d={`M${r2(cx - rx)} ${y - (i + 1) * h}A${rx} ${ry} 0 0 0 ${r2(cx + rx)} ${y - (i + 1) * h}`}
          fill="none"
          {...hair}
          stroke={c}
        />
      ))}
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={stip(id, red ? "signal" : "light")} {...ink} stroke={c} />
    </g>
  );
}

/** A hanging scale pan: three cords from (cx, hookY) to a shallow dish at y. */
export function Pan({ id, cx, hookY, y, w = 50 }: { id: string; cx: number; hookY: number; y: number; w?: number }) {
  return (
    <g>
      <line x1={cx} y1={hookY} x2={cx - w / 2} y2={y} {...hair} />
      <line x1={cx} y1={hookY} x2={cx + w / 2} y2={y} {...hair} />
      <path d={`M${cx - w / 2} ${y}Q${cx} ${y + 16} ${cx + w / 2} ${y}`} fill={stip(id, "dense")} {...ink} />
      <ellipse cx={cx} cy={y} rx={w / 2} ry={4} fill={PAT.paper} {...ink} />
    </g>
  );
}

/**
 * A house in oblique projection: white front with a gable, stippled side,
 * a pitched roof running back. (x, y) is the front face's bottom-left.
 */
export function House({ id, x, y, w = 50, h = 34, dx = 14, dy = 9, roof = 20 }: { id: string; x: number; y: number; w?: number; h?: number; dx?: number; dy?: number; roof?: number }) {
  const t = y - h;
  const ax = r2(x + w / 2);
  const ay = t - roof;
  return (
    <g>
      <path d={`M${x + w} ${t}L${x + w + dx} ${t - dy}V${y - dy}L${x + w} ${y}Z`} fill={stip(id, "dense")} {...ink} />
      <path d={`M${ax} ${ay}L${r2(ax + dx)} ${ay - dy}L${x + w + dx} ${t - dy}L${x + w} ${t}Z`} fill={stip(id, "light")} {...ink} />
      <path d={`M${x} ${y}V${t}L${ax} ${ay}L${x + w} ${t}V${y}Z`} fill={PAT.paper} {...ink} />
      <rect x={r2(ax - 6)} y={y - 16} width={12} height={16} fill={PAT.paper} {...hair} />
      <rect x={x + 7} y={t + 7} width={9} height={8} fill={PAT.paper} {...hair} />
      <rect x={x + w - 16} y={t + 7} width={9} height={8} fill={PAT.paper} {...hair} />
    </g>
  );
}

/** A price tag with a string hole, its text centred: for rates and prices. */
export function Tag({ cx, cy, text, red = false, w = 54, size = 13 }: { cx: number; cy: number; text: string; red?: boolean; w?: number; size?: number }) {
  const c = red ? PAT.signal : PAT.ink;
  const x0 = r2(cx - w / 2);
  return (
    <g>
      <path
        d={`M${x0} ${r2(cy - size * 0.8)}H${r2(cx + w / 2)}V${r2(cy + size * 0.8)}H${x0}L${r2(x0 - 9)} ${cy}Z`}
        fill={PAT.paper}
        stroke={c}
        strokeWidth={red ? LINE.bold : LINE.outline}
        strokeLinejoin="round"
      />
      <circle cx={r2(x0 - 2)} cy={cy} r={1.8} fill="none" stroke={c} strokeWidth={LINE.hair} />
      <text x={r2(cx + 2)} y={r2(cy + size * 0.35)} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={size} fill={c}>
        {text}
      </text>
    </g>
  );
}

/**
 * A person as a patent figure, standing with feet at (x, y), facing right
 * (`flip` faces left). Clean outline, light stipple on the coat, dense on the
 * trousers. `arm`: "down" at the side, "reach" held forward, "raise" lifted,
 * "lift" both arms up.
 */
export function Figure({
  id,
  x,
  y,
  s = 1,
  arm = "down",
  flip = false,
  stroke = PAT.ink,
}: {
  id: string;
  x: number;
  y: number;
  s?: number;
  arm?: "down" | "reach" | "raise" | "lift";
  flip?: boolean;
  stroke?: string;
}) {
  const o = { stroke, strokeWidth: LINE.outline / s, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const fwd =
    arm === "reach"
      ? "M10 -62L30 -54L31 -48L10 -54Z"
      : arm === "raise" || arm === "lift"
        ? "M10 -62L24 -84L29 -81L14 -56Z"
        : "M10 -62L14 -36L9 -35L6 -56Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {/* legs */}
      <path d="M-9 -36L-8 0H-1L0 -30L1 0H8L9 -36Z" fill={stip(id, "dense")} {...o} />
      <path d="M-11 0H-1M1 0H11" fill="none" {...o} />
      {/* back arm */}
      <path d={arm === "lift" ? "M-10 -62L-24 -84L-29 -81L-14 -56Z" : "M-10 -62L-14 -36L-9 -35L-6 -56Z"} fill={PAT.paper} {...o} />
      {/* coat */}
      <path d="M-11 -64Q0 -68 11 -64L10 -34H-10Z" fill={stip(id, "light")} {...o} />
      <path d="M0 -66V-34" fill="none" {...o} strokeWidth={LINE.hair / s} />
      {/* front arm */}
      <path d={fwd} fill={PAT.paper} {...o} />
      {/* head */}
      <circle cx={1} cy={-74} r={7} fill={PAT.paper} {...o} />
      <path d="M7.5 -75.5L9.5 -73L7.6 -72.6" fill="none" {...o} strokeWidth={LINE.hair / s} />
    </g>
  );
}

/** A detail circle: the dashed ring a patent drawing puts round the part in question. */
export function Detail({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke={PAT.ink} strokeWidth={LINE.hair} strokeDasharray="6 3" />;
}

/** A patent reference numeral with its curved leader line to the part. */
export function Numeral({ n, x, y, tx, ty, bold = false }: { n: number | string; x: number; y: number; tx: number; ty: number; bold?: boolean }) {
  const sy = ty < y - 6 ? y - 15 : y + 4;
  const mx = r2((x + tx) / 2 + 8);
  const my = r2((sy + ty) / 2 - 4);
  return (
    <g>
      <path d={`M${x} ${sy}Q${mx} ${my} ${tx} ${ty}`} fill="none" {...hair} />
      <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-heading)" fontStyle="italic" fontSize={bold ? 18 : 14} fill={PAT.ink}>
        {n}
      </text>
    </g>
  );
}

/** An open arrowhead at (x, y) pointing along (dx, dy). */
export function headAlongPath(x: number, y: number, dx: number, dy: number, s = 9) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  return `M${r2(bx - uy * s * 0.55)} ${r2(by + ux * s * 0.55)}L${x} ${y}L${r2(bx + uy * s * 0.55)} ${r2(by - ux * s * 0.55)}`;
}

/** A round dial with a needle at `deg` (0 = straight up), on a white face. */
export function Dial({ cx, cy, r, deg }: { cx: number; cy: number; r: number; deg: number }) {
  const ticks = [-60, -30, 0, 30, 60];
  const a = ((deg - 90) * Math.PI) / 180;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAT.paper} {...ink} />
      {ticks.map((t) => {
        const ta = ((t - 90) * Math.PI) / 180;
        return (
          <line
            key={t}
            x1={r2(cx + Math.cos(ta) * (r - 2))}
            y1={r2(cy + Math.sin(ta) * (r - 2))}
            x2={r2(cx + Math.cos(ta) * (r - 6))}
            y2={r2(cy + Math.sin(ta) * (r - 6))}
            {...hair}
          />
        );
      })}
      <line x1={cx} y1={cy} x2={r2(cx + Math.cos(a) * (r - 5))} y2={r2(cy + Math.sin(a) * (r - 5))} {...ink} strokeWidth={LINE.bold} />
      <circle cx={cx} cy={cy} r={2} fill={PAT.ink} />
    </g>
  );
}

/** A pennant flag on a short pole, pole foot at (x, y). */
export function Flag({ id, x, y, red = false }: { id: string; x: number; y: number; red?: boolean }) {
  const c = red ? PAT.signal : PAT.ink;
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 34} stroke={c} strokeWidth={LINE.outline} strokeLinecap="round" />
      <path
        d={`M${x} ${y - 34}L${x + 22} ${y - 27}L${x} ${y - 20}Z`}
        fill={red ? stip(id, "signal") : PAT.paper}
        stroke={c}
        strokeWidth={red ? LINE.bold : LINE.outline}
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A quantity set large in Caslon on the plate (a rate, a multiple). */
export function Display1({ x, y, text, red = false, size = 20 }: { x: number; y: number; text: string; red?: boolean; size?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={size} fill={red ? PAT.signal : PAT.ink}>
      {text}
    </text>
  );
}

/** A small card lying flat at (x, y), front-left corner; red for the finding. */
export function Chip({ id, x, y, red = false, w = 22, d = 7, sk = 8 }: { id: string; x: number; y: number; red?: boolean; w?: number; d?: number; sk?: number }) {
  return (
    <path
      d={`M${x} ${y}L${r2(x + sk)} ${r2(y - d)}H${r2(x + sk + w)}L${r2(x + w)} ${y}Z`}
      fill={red ? stip(id, "signal") : PAT.paper}
      stroke={red ? PAT.signal : PAT.ink}
      strokeWidth={LINE.outline}
      strokeLinejoin="round"
    />
  );
}

/** A 3D axonometric tabletop base slab that every diorama scene sits on. */
export function IsoBase({ w = 400 }: { w?: 400 | 800 }) {
  if (w === 800) {
    return (
      <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
        <polygon points="40,156 120,104 760,104 680,156" fill={PAL.slabTop} />
        <polygon points="40,156 680,156 680,170 40,170" fill={PAL.slabLeft} />
        <polygon points="680,156 760,104 760,118 680,170" fill={PAL.slabRight} />
      </g>
    );
  }
  return (
    <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
      <polygon points="24,162 84,112 376,112 316,162" fill={PAL.slabTop} />
      <polygon points="24,162 316,162 316,176 24,176" fill={PAL.slabLeft} />
      <polygon points="316,162 376,112 376,126 316,176" fill={PAL.slabRight} />
    </g>
  );
}

/** A 3D isometric box (building, shield wall, desk, pedestal) with front, right, and top faces. */
export function IsoBlock({
  x,
  y,
  w,
  d,
  h,
  topFill = PAL.paper,
  leftFill = PAL.slabLeft,
  rightFill = PAL.slabRight,
  stroke = PAL.ink,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  topFill?: string;
  leftFill?: string;
  rightFill?: string;
  stroke?: string;
}) {
  const dx = r2(d * 0.72);
  const dy = r2(d * 0.52);
  return (
    <g stroke={stroke} strokeWidth="1.4" strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + w},${y} ${x + w},${y - h} ${x},${y - h}`} fill={leftFill} />
      <polygon
        points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - dy - h} ${x + w},${y - h}`}
        fill={rightFill}
      />
      <polygon
        points={`${x},${y - h} ${x + w},${y - h} ${x + w + dx},${y - dy - h} ${x + dx},${y - dy - h}`}
        fill={topFill}
      />
    </g>
  );
}

/**
 * GlassCube: the course's signature container for an AI model or algorithm.
 * Draws dashed back edges, renders `children` inside the cube, then overlays
 * the translucent front/side/top glass planes, and finally renders `outside`
 * (e.g. an exit port + mechanical arm) on top so no cube edge crosses it.
 */
export function GlassCube({
  x,
  y,
  w = 60,
  d = 44,
  h = 60,
  children,
  outside,
}: {
  x: number;
  y: number;
  w?: number;
  d?: number;
  h?: number;
  children?: React.ReactNode;
  outside?: React.ReactNode;
}) {
  const dx = r2(d * 0.72);
  const dy = r2(d * 0.52);
  return (
    <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
      {/* Dashed back edges visible through the glass */}
      <line x1={x} y1={y} x2={x + dx} y2={y - dy} stroke={PAL.ink3} strokeDasharray="3 3" />
      <line x1={x + dx} y1={y - dy} x2={x + w + dx} y2={y - dy} stroke={PAL.ink3} strokeDasharray="3 3" />
      <line x1={x + dx} y1={y - dy} x2={x + dx} y2={y - dy - h} stroke={PAL.ink3} strokeDasharray="3 3" />

      {/* Internal mechanism */}
      {children}

      {/* Translucent glass faces */}
      <polygon points={`${x},${y} ${x + w},${y} ${x + w},${y - h} ${x},${y - h}`} fill={PAL.paper} fillOpacity="0.45" />
      <polygon
        points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - dy - h} ${x + w},${y - h}`}
        fill={PAL.slabLeft}
        fillOpacity="0.45"
      />
      <polygon
        points={`${x},${y - h} ${x + w},${y - h} ${x + w + dx},${y - dy - h} ${x + dx},${y - dy - h}`}
        fill={PAL.paper}
        fillOpacity="0.65"
      />

      {/* External port / arm emerging from the cube */}
      {outside}
    </g>
  );
}

/** A sculpted 3D tabletop figure standing on the diorama board at (x, y). */
export function IsoPerson({
  x,
  y,
  scale = 1,
  coat = PAL.counter,
  coatShade = PAL.counterMid,
  skin = PAL.skin1,
  flip = false,
  reach = false,
  behindBack = false,
}: {
  x: number;
  y: number;
  scale?: number;
  coat?: string;
  coatShade?: string;
  skin?: string;
  flip?: boolean;
  reach?: boolean;
  behindBack?: boolean;
}) {
  const sx = flip ? -scale : scale;
  return (
    <g
      transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(sx)} ${r2(scale)})`}
      stroke={PAL.ink}
      strokeWidth={r2(1.35 / scale)}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <ellipse cx="2" cy="0" rx="13" ry="4.5" fill={PAL.slabRight} stroke="none" opacity="0.7" />
      <path d="M -8 -28 V -3 H -2 V -28 Z" fill={PAL.ink2} />
      <path d="M 2 -28 V -3 H 8 V -28 Z" fill={PAL.ink} />
      <path d="M -9 -4 H -1 L 1 0 H -9 Z" fill={PAL.ink} />
      <path d="M 1 -4 H 9 L 12 0 H 1 Z" fill={PAL.ink} />

      {behindBack && (
        <g>
          <path d="M -8 -56 L -22 -48 L -28 -52" fill="none" stroke={coatShade} strokeWidth="5.5" />
          <circle cx="-32" cy="-54" r="4.5" fill="none" stroke={PAL.signal} strokeWidth="2" />
          <line x1="-28" y1="-51" x2="-18" y2="-43" stroke={PAL.signal} strokeWidth="2.2" />
        </g>
      )}

      <path d="M -12 -26 L -10 -66 H 6 L 8 -26 Z" fill={coat} />
      <path d="M 6 -66 L 12 -62 L 13 -24 L 8 -26 Z" fill={coatShade} />
      <polygon points="-3,-66 2,-54 6,-66" fill={PAL.paper} />

      {reach ? (
        <g>
          <path d="M 4 -60 L 18 -50 L 30 -52" fill="none" stroke={PAL.ink} strokeWidth="6" />
          <path d="M 4 -60 L 18 -50 L 30 -52" fill="none" stroke={coat} strokeWidth="4" />
          <circle cx="32" cy="-52" r="3.2" fill={skin} />
        </g>
      ) : (
        <g>
          <path d="M -7 -60 L -11 -42 L -6 -34" fill="none" stroke={PAL.ink} strokeWidth="5.5" />
          <path d="M -7 -60 L -11 -42 L -6 -34" fill="none" stroke={coat} strokeWidth="3.6" />
          <circle cx="-5.5" cy="-33" r="2.8" fill={skin} />
        </g>
      )}

      <rect x="-2.5" y="-72" width="6" height="7" fill={skin} />
      <path d="M -7 -84 C -7 -91, 8 -91, 9 -83 L 12 -79 L 9 -77 C 9 -71, -7 -71, -7 -78 Z" fill={skin} />
      <circle cx="4.5" cy="-82" r="1.1" fill={PAL.ink} stroke="none" />
      <path d="M -8 -77 C -10 -86, -5 -93, 4 -92 C 9 -92, 10 -87, 8 -85 C 3 -86, -2 -85, -5 -80 Z" fill={PAL.ink} />
    </g>
  );
}

/** A 3D cylindrical stack of coins on the diorama board. */
export function IsoCoinStack({
  x,
  y,
  n = 4,
  signal = false,
}: {
  x: number;
  y: number;
  n?: number;
  signal?: boolean;
}) {
  const fillSide = signal ? PAL.signal : PAL.counter;
  const fillTop = signal ? PAL.signalLight : PAL.counterLight;
  return (
    <g stroke={PAL.ink} strokeWidth="1.2">
      {Array.from({ length: n }, (_, i) => {
        const cy = y - i * 6;
        return (
          <g key={i}>
            <path d={`M ${x - 11} ${cy - 6} V ${cy} A 11 4.2 0 0 0 ${x + 11} ${cy} V ${cy - 6} Z`} fill={fillSide} />
            <ellipse cx={x} cy={cy - 6} rx="11" ry="4.2" fill={fillTop} />
          </g>
        );
      })}
    </g>
  );
}

/** A 3D isometric house with pitched roof and optional floating rate placard. */
export function IsoHouse({
  x,
  y,
  rate,
  penalized = false,
}: {
  x: number;
  y: number;
  rate?: string;
  penalized?: boolean;
}) {
  const roofFront = penalized ? PAL.signal : PAL.counter;
  const roofSide = penalized ? PAL.signalMid : PAL.counterMid;
  return (
    <g stroke={PAL.ink} strokeWidth="1.4" strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + 56},${y} ${x + 56},${y - 44} ${x},${y - 44}`} fill={PAL.paper} />
      <polygon
        points={`${x + 56},${y} ${r2(x + 84.8)},${r2(y - 20.8)} ${r2(x + 84.8)},${r2(y - 64.8)} ${x + 56},${y - 44}`}
        fill={PAL.slabLeft}
      />
      <rect x={x + 18} y={y - 28} width="16" height="28" fill={roofFront} />
      <polygon points={`${x - 4},${y - 44} ${x + 28},${y - 72} ${x + 60},${y - 44}`} fill={roofFront} />
      <polygon
        points={`${x + 28},${y - 72} ${r2(x + 56.8)},${r2(y - 92.8)} ${r2(x + 88.8)},${r2(y - 64.8)} ${x + 60},${y - 44}`}
        fill={roofSide}
      />
      {rate && (
        <>
          <line x1={x + 42} y1={y - 78} x2={x + 42} y2={y - 96} stroke={PAL.ink} strokeWidth="1.4" />
          <rect
            x={x + 8}
            y={y - 122}
            width="68"
            height="26"
            rx="3"
            fill={penalized ? PAL.signal : PAL.paper}
            stroke={penalized ? PAL.signal : PAL.ink}
            strokeWidth="1.6"
          />
          <text
            x={x + 42}
            y={y - 104}
            textAnchor="middle"
            fontSize="14.5"
            fontWeight="700"
            fill={penalized ? PAL.paper : PAL.ink}
            stroke="none"
          >
            {rate}
          </text>
        </>
      )}
    </g>
  );
}

/** Legacy compatibility exports for Person1 and AiMark1. */
export function Person1({
  x,
  y,
  k = 1,
  stroke = INK,
  fill = PAPER,
  width = 1.5,
}: {
  x: number;
  y: number;
  k?: number;
  stroke?: string;
  fill?: string;
  width?: number;
}) {
  const w = r2(10 * k);
  const top = r2(y - 21 * k);
  const shoulder = r2(y - 12 * k);
  return (
    <g>
      <circle cx={x} cy={r2(y - 28 * k)} r={r2(6 * k)} fill={fill} stroke={stroke} strokeWidth={width} />
      <path
        d={`M${r2(x - w)} ${y}V${shoulder}Q${r2(x - w)} ${top} ${x} ${top}Q${r2(x + w)} ${top} ${r2(x + w)} ${shoulder}V${y}Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
      />
    </g>
  );
}

export function AiMark1({
  cx,
  cy,
  s = 24,
  fill = INK,
}: {
  cx: number;
  cy: number;
  s?: number;
  fill?: string;
}) {
  const h = s / 2;
  const n = s * 0.13;
  const d = `M${r2(cx)} ${r2(cy - h)}Q${r2(cx + n)} ${r2(cy - n)} ${r2(cx + h)} ${r2(cy)}Q${r2(cx + n)} ${r2(cy + n)} ${r2(cx)} ${r2(cy + h)}Q${r2(cx - n)} ${r2(cy + n)} ${r2(cx - h)} ${r2(cy)}Q${r2(cx - n)} ${r2(cy - n)} ${r2(cx)} ${r2(cy - h)}Z`;
  return <path d={d} fill={fill} />;
}

