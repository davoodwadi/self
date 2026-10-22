/* ==========================================================================
   Shared objects: what the course's plates draw, built on ./kit: patent
   drawing pieces (sheets, gears, lenses, people, coins, houses, tags,
   dials, reference numerals).
   ========================================================================== */

import React from "react";
import { INK, LINE, PAPER, PAT, r2, stip } from "./kit";

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
 * "lift" both arms up. `coat` sets the coat's tone ("paper" and "dense" tell two
 * groups apart; "signal" marks the finding, trousers included).
 */
export function Figure({
  id,
  x,
  y,
  s = 1,
  arm = "down",
  flip = false,
  stroke = PAT.ink,
  coat = "light",
}: {
  id: string;
  x: number;
  y: number;
  s?: number;
  arm?: "down" | "reach" | "raise" | "lift";
  flip?: boolean;
  stroke?: string;
  coat?: "light" | "dense" | "signal" | "paper";
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
      <path d="M-9 -36L-8 0H-1L0 -30L1 0H8L9 -36Z" fill={stip(id, coat === "signal" ? "signal" : "dense")} {...o} />
      <path d="M-11 0H-1M1 0H11" fill="none" {...o} />
      {/* back arm */}
      <path d={arm === "lift" ? "M-10 -62L-24 -84L-29 -81L-14 -56Z" : "M-10 -62L-14 -36L-9 -35L-6 -56Z"} fill={PAT.paper} {...o} />
      {/* coat */}
      <path d="M-11 -64Q0 -68 11 -64L10 -34H-10Z" fill={coat === "paper" ? PAT.paper : stip(id, coat)} {...o} />
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

