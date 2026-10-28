/* ==========================================================================
   Shared objects: what the weeks draw, built on ./kit. See "Shared pieces"
   in the root CLAUDE.md and the course CLAUDE.md for the catalogue style.
   ========================================================================== */

import React from "react";
import { CAT, CatKey, LINE, Numeral, Price, Tile, ht, r2 } from "./kit";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/** Cursor outline at unit scale, tip at (0, 0): about 10 wide and 15 tall. */
const CURSOR = "M0 0V13L3.5 9.8L6 15L8 14L5.6 9H10Z";

/**
 * A click: a solid ink cursor, tip at (x, y). `tone="amber"` marks the key
 * idea (amber with an ink outline). `tone="purple"` is the contrast case.
 */
export function Cursor({
  x,
  y,
  scale = 1.25,
  tone = "ink",
}: {
  x: number;
  y: number;
  scale?: number;
  tone?: "ink" | "amber" | "purple";
}) {
  const fill = { ink: CAT.ink, amber: CAT.amber, purple: CAT.purple }[tone];
  const stroke = tone === "purple" ? CAT.purple : CAT.ink;
  return (
    <path
      transform={`translate(${r2(x)} ${r2(y)}) scale(${scale})`}
      d={CURSOR}
      fill={fill}
      stroke={stroke}
      strokeWidth={tone === "amber" ? 0.75 : 0.55}
      strokeLinejoin="round"
    />
  );
}

/** A rating star centred on (cx, cy), filled in ink or left open. */
export function Star({ cx, cy, r = 5.5, on = true }: { cx: number; cy: number; r?: number; on?: boolean }) {
  let d = "";
  for (let j = 0; j < 10; j++) {
    const a = -Math.PI / 2 + (j * Math.PI) / 5;
    const q = j % 2 ? r * 0.45 : r;
    d += `${j ? "L" : "M"}${r2(cx + q * Math.cos(a))} ${r2(cy + q * Math.sin(a))}`;
  }
  return <path d={`${d}Z`} fill={on ? CAT.ink : "none"} stroke={CAT.ink} strokeWidth={0.9} strokeLinejoin="round" />;
}

/**
 * The engraved mug, centred on (cx, cy): halftone body, dense shaded side,
 * white rim and a handle with a white inner line. About 46 wide and 45 tall
 * at the default scale. Needs <HalftoneDefs id> in the same plate.
 */
export function Mug({ id, cx, cy, scale = 1.5 }: { id: string; cx: number; cy: number; scale?: number }) {
  const handle = "M9 -8C21 -8 21 7 9 7";
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${scale})`}>
      <path d={handle} fill="none" stroke={CAT.ink} strokeWidth={3.2} />
      <path d={handle} fill="none" stroke={CAT.tile} strokeWidth={1.4} />
      <path d="M-15 -15H10V8Q10 15 3 15H-8Q-15 15 -15 8Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={1.1} />
      <path d="M2 -15H10V8Q10 15 3 15Z" fill={ht(id, "dense")} />
      <ellipse cx={-2.5} cy={-15} rx={12.5} ry={2.4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1} />
    </g>
  );
}

/**
 * A complete listing: a 104 × 104 tile at (x, y) with its position numeral,
 * the engraved mug, two name lines and the price. `sponsored` prints the
 * SPONSORED key in the top-right corner.
 */
export function Listing({
  id,
  x,
  y,
  n,
  price,
  sponsored = false,
}: {
  id: string;
  x: number;
  y: number;
  n: number;
  price: string;
  sponsored?: boolean;
}) {
  const w = 104;
  return (
    <g>
      <Tile x={x} y={y} w={w} h={w} />
      <Mug id={id} cx={x + w / 2} cy={y + 46} />
      <Numeral x={x + 11} y={y + 20}>
        {n}
      </Numeral>
      {sponsored ? (
        <CatKey x={x + w - 10} y={y + 17} size={6.5} anchor="end">
          SPONSORED
        </CatKey>
      ) : null}
      <line x1={x + 14} y1={y + 78} x2={x + 72} y2={y + 78} stroke={CAT.ink} strokeWidth={0.5} />
      <line x1={x + 14} y1={y + 82} x2={x + 58} y2={y + 82} stroke={CAT.ink} strokeWidth={0.5} />
      <Price x={x + 14} y={y + 96}>
        {price}
      </Price>
    </g>
  );
}

/* --------------------------------------------------------------------------
   The Week 1 cast, shared from Week 2 on
   -------------------------------------------------------------------------- */

/**
 * The AI shopping agent: a rounded console head with an antenna, two square
 * eyes and a halftone face, centred on (cx, cy). About 40 × 44 at s = 1.
 */
export function Agent({ id, cx, cy, s = 1, tone = "ink" }: { id: string; cx: number; cy: number; s?: number; tone?: "ink" | "purple" }) {
  const c = tone === "purple" ? CAT.purple : CAT.ink;
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} stroke={c} strokeWidth={r2(LINE.outline / s)} strokeLinejoin="round">
      <line x1={0} y1={-16} x2={0} y2={-23} />
      <circle cx={0} cy={-24} r={2.4} fill={c} />
      <rect x={-19} y={-16} width={38} height={30} rx={8} fill={tone === "purple" ? CAT.purple : ht(id, "light")} />
      <rect x={-13} y={-10} width={26} height={16} rx={4} fill={CAT.tile} />
      <rect x={-8} y={-6} width={5} height={6} fill={c} stroke="none" />
      <rect x={3} y={-6} width={5} height={6} fill={c} stroke="none" />
      <path d="M-12 14V20H12V14" fill="none" />
    </g>
  );
}

/**
 * A shopper, head-and-shoulders, centred on (cx, cy) at scale s: white face,
 * halftone coat with a dense shaded side. About 40 wide and 50 tall at s = 1.
 */
export function Person({ id, cx, cy, s = 1, tone = "ink" }: { id: string; cx: number; cy: number; s?: number; tone?: "ink" | "purple" }) {
  const stroke = tone === "purple" ? CAT.purple : CAT.ink;
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} stroke={stroke} strokeWidth={r2(LINE.outline / s)} strokeLinejoin="round">
      <path d="M-20 26V14Q-20 2 -8 0H8Q20 2 20 14V26Z" fill={tone === "purple" ? CAT.purple : ht(id, "light")} />
      {tone === "ink" ? <path d="M6 0Q20 2 20 14V26H8Z" fill={ht(id, "dense")} stroke="none" /> : null}
      <path d="M-5 0L0 8L5 0" fill={CAT.tile} />
      <circle cx={0} cy={-12} r={10} fill={CAT.tile} />
      <path d="M-10 -14Q-9 -24 0 -23Q9 -24 10 -14Q5 -18 0 -18Q-5 -18 -10 -14Z" fill={tone === "purple" ? CAT.purple : CAT.ink} />
    </g>
  );
}

/** A low sneaker in profile centred on (cx, cy): halftone upper, white sole and laces. */
export function Sneaker({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round">
      <path d="M-28 8V-6Q-28 -14 -20 -14Q-14 -14 -12 -8Q-2 -6 10 0Q24 2 28 6V8Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <path d="M-28 -2Q-20 0 -12 -8Q-14 -14 -20 -14Q-28 -14 -28 -6Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-30 8H30Q30 14 24 14H-26Q-30 14 -30 8Z" fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={-6 + k * 6} y1={-6 + k * 2} x2={-2 + k * 6} y2={-1 + k * 2} stroke={CAT.tile} strokeWidth={r2(1.6 / s)} />
      ))}
    </g>
  );
}

/** A small glass bottle with its top-left at (x, y): halftone body, white cap band. */
export function Bottle({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <path d={`M${x + 4} ${y}h6v5q4 3 4 8v12q0 2 -2 2h-10q-2 0 -2 -2v-12q0 -5 4 -8Z`} fill={ht(id, "light")} {...ink} />
      <rect x={x + 3.5} y={y - 3} width={7} height={4} fill={CAT.ink} />
      <rect x={x} y={y + 15} width={14} height={6} fill={CAT.tile} {...hair} />
    </g>
  );
}

/** A warehouse at (x, y), w × h: gabled roof in halftone, roller door with stacked parcels. */
export function Warehouse({ id, x, y, w, h, stock = true }: { id: string; x: number; y: number; w: number; h: number; stock?: boolean }) {
  const roof = r2(h * 0.3);
  const dw = r2(w * 0.5);
  const dx = r2(x + (w - dw) / 2);
  return (
    <g>
      <path d={`M${x} ${y + roof}L${r2(x + w / 2)} ${y}L${x + w} ${y + roof}Z`} fill={ht(id, "light")} {...ink} />
      <rect x={x} y={y + roof} width={w} height={h - roof} fill={CAT.tile} {...ink} />
      <rect x={dx} y={r2(y + roof + 10)} width={dw} height={r2(h - roof - 10)} fill={CAT.tile} {...ink} />
      {stock ? (
        <>
          <Parcel id={id} x={dx + 4} y={y + h - 13} w={16} h={12} />
          <Parcel id={id} x={dx + 24} y={y + h - 13} w={16} h={12} />
          <Parcel id={id} x={dx + 14} y={y + h - 27} w={16} h={12} />
        </>
      ) : (
        [1, 2, 3].map((k) => <line key={k} x1={dx} y1={r2(y + roof + 10 + k * ((h - roof - 10) / 4))} x2={dx + dw} y2={r2(y + roof + 10 + k * ((h - roof - 10) / 4))} {...hair} />)
      )}
    </g>
  );
}

/** The platform's badge: a ringed star, its mark on whatever it owns or runs. */
export function Badge({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={CAT.tile} {...ink} />
      <Star cx={cx} cy={cy} r={r * 0.62} />
    </g>
  );
}

/** A shopping cart centred on (cx, cy): basket in halftone, handle and two wheels. */
export function Cart({ id, cx, cy, s = 1, tone = "ink" }: { id: string; cx: number; cy: number; s?: number; tone?: "ink" | "amber" | "open" }) {
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`} strokeLinejoin="round" strokeLinecap="round">
      <path d="M-16 -10H-11L-6 6H10L14 -5H-9" fill="none" stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <path d="M-9 -5H14L10 6H-6Z" fill={tone === "amber" ? CAT.amber : tone === "open" ? CAT.tile : ht(id, "dense")} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <circle cx={-4} cy={10} r={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
      <circle cx={8} cy={10} r={2} fill={CAT.tile} stroke={CAT.ink} strokeWidth={r2(LINE.outline / s)} />
    </g>
  );
}

/** A till receipt at (x, y): zigzag foot, item lines with prices, and a total rule. */
export function Receipt({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const zig = Array.from({ length: Math.floor(w / 7) }, (_, k) => `L${r2(x + w - (k + 0.5) * 7)} ${y + h + 4}L${r2(x + w - (k + 1) * 7)} ${y + h}`).join("");
  return (
    <g>
      <path d={`M${x} ${y}H${x + w}V${y + h}${zig}L${x} ${y + h}Z`} fill={CAT.tile} {...ink} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <line x1={x + 7} y1={y + 18 + k * 14} x2={x + 36} y2={y + 18 + k * 14} {...hair} />
          <line x1={x + w - 20} y1={y + 18 + k * 14} x2={x + w - 7} y2={y + 18 + k * 14} {...hair} />
        </g>
      ))}
      <line x1={x + 7} y1={y + 66} x2={x + w - 7} y2={y + 66} {...ink} />
      <Price x={x + w - 7} y={y + 82} size={11} anchor="end">
        $8.97
      </Price>
      <rect x={x + 10} y={y + 92} width={w - 20} height={8} fill="none" {...hair} />
      {Array.from({ length: 12 }, (_, k) => (
        <line key={k} x1={r2(x + 12 + k * ((w - 24) / 11))} y1={y + 93} x2={r2(x + 12 + k * ((w - 24) / 11))} y2={y + 99} stroke={CAT.ink} strokeWidth={k % 3 ? 0.6 : 1.4} />
      ))}
    </g>
  );
}

/** A coin in a stack, edge-on. `amber` fills its face in the accent, with the ink outline kept. */
export function AmberCoin({ id, cx, cy, amber = false }: { id: string; cx: number; cy: number; amber?: boolean }) {
  const rx = 22;
  const ry = 4.2;
  const t = 4;
  return (
    <g>
      <path d={`M${cx - rx} ${cy}v${t}a${rx} ${ry} 0 0 0 ${2 * rx} 0v-${t}`} fill={amber ? CAT.amber : ht(id, "dense")} {...ink} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={amber ? CAT.amber : CAT.tile} {...ink} />
    </g>
  );
}

/** A screen at (x, y) showing a page of six product tiles, with its stand. */
export function Monitor({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={140} height={96} rx={4} fill={CAT.tile} {...ink} />
      <rect x={x + 6} y={y + 6} width={128} height={84} fill="none" {...hair} />
      {Array.from({ length: 6 }, (_, k) => {
        const tx = x + 12 + (k % 3) * 40;
        const ty = y + 12 + Math.floor(k / 3) * 38;
        return (
          <g key={k}>
            <rect x={tx} y={ty} width={36} height={34} fill={CAT.tile} {...hair} />
            <Mug id={id} cx={tx + 18} cy={ty + 15} scale={0.45} />
            <line x1={tx + 5} y1={ty + 28} x2={tx + 24} y2={ty + 28} {...hair} />
          </g>
        );
      })}
      <path d={`M${x + 62} ${y + 96}V${y + 106}M${x + 78} ${y + 96}V${y + 106}M${x + 50} ${y + 107}H${x + 90}`} fill="none" {...ink} />
    </g>
  );
}

/** A house centred on (cx, cy): halftone roof, white walls and a door. */
export function House({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 13} y={cy - 6} width={26} height={20} fill={CAT.tile} {...ink} />
      <path d={`M${cx - 17} ${cy - 5}L${cx} ${cy - 20}L${cx + 17} ${cy - 5}Z`} fill={ht(id, "dense")} {...ink} />
      <rect x={cx - 4} y={cy + 3} width={8} height={11} fill={CAT.tile} {...ink} />
    </g>
  );
}

/** A coin seen edge-on in a stack, centred on (cx, cy): white face, halftone rim. */
export function Coin({ id, cx, cy, rx = 17, ry = 4.5, t = 4.5 }: { id: string; cx: number; cy: number; rx?: number; ry?: number; t?: number }) {
  return (
    <g>
      <path d={`M${r2(cx - rx)} ${cy}v${t}a${rx} ${ry} 0 0 0 ${2 * rx} 0v-${t}`} fill={ht(id, "dense")} {...ink} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={CAT.tile} {...ink} />
      <ellipse cx={cx} cy={cy} rx={r2(rx * 0.62)} ry={r2(ry * 0.6)} fill="none" {...hair} />
    </g>
  );
}

/** A parcel: front face in halftone, white top, a tape line, at (x, y) with face w × h. */
export function Parcel({ id, x, y, w, h, tone = "ink" }: { id: string; x: number; y: number; w: number; h: number; tone?: "ink" | "amber" | "purple" }) {
  const d = r2(w * 0.28);
  return (
    <g>
      <path d={`M${x} ${y}l${d} ${r2(-d * 0.6)}h${w}l${-d} ${r2(d * 0.6)}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${x + w} ${y}l${d} ${r2(-d * 0.6)}v${h}l${-d} ${r2(d * 0.6)}Z`} fill={ht(id, "dense")} {...ink} />
      <rect x={x} y={y} width={w} height={h} fill={tone === "amber" ? CAT.amber : tone === "purple" ? CAT.purple : ht(id, "light")} {...ink} />
      <line x1={r2(x + w / 2)} y1={y} x2={r2(x + w / 2)} y2={r2(y + h)} stroke={CAT.tile} strokeWidth={1.6} />
      <line x1={r2(x + w / 2)} y1={y} x2={r2(x + w / 2 + d)} y2={r2(y - d * 0.6)} stroke={CAT.ink} strokeWidth={LINE.hair} />
    </g>
  );
}

/** A stopwatch centred on (cx, cy). Its hand sweeps t seconds of an 8-second dial. */
export function Stopwatch({ cx, cy, r, t }: { cx: number; cy: number; r: number; t: number }) {
  const a = -Math.PI / 2 + (t / 8) * 2 * Math.PI;
  const sweep = t >= 8 ? "" : `M${cx} ${cy}L${cx} ${r2(cy - r + 2.5)}A${r - 2.5} ${r - 2.5} 0 ${t > 4 ? 1 : 0} 1 ${r2(cx + (r - 2.5) * Math.cos(a))} ${r2(cy + (r - 2.5) * Math.sin(a))}Z`;
  return (
    <g>
      <rect x={cx - 2.5} y={cy - r - 5} width={5} height={4} fill={CAT.tile} {...ink} />
      <circle cx={cx} cy={cy} r={r} fill={CAT.tile} {...ink} />
      {t >= 8 ? <circle cx={cx} cy={cy} r={r - 2.5} fill={CAT.ink} /> : <path d={sweep} fill={CAT.ink} />}
      <circle cx={cx} cy={cy} r={1.4} fill={CAT.tile} />
    </g>
  );
}

/** A mailed envelope at (x, y): white body, flap lines and a halftone stamp. */
export function Envelope({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={CAT.tile} {...ink} />
      <path d={`M${x} ${y}L${r2(x + w / 2)} ${r2(y + h * 0.58)}L${x + w} ${y}`} fill="none" {...ink} />
      <rect x={r2(x + w - 15)} y={y + 5} width={10} height={12} fill={ht(id, "dense")} {...hair} />
    </g>
  );
}

/** A shop front at (x, y), w × h: striped awning, a window with a mug, and a door. */
export function Shop({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  const n = 6;
  const sw = r2(w / n);
  const aw = r2(h * 0.2);
  return (
    <g>
      <rect x={x} y={r2(y + aw - 4)} width={w} height={r2(h - aw + 4)} fill={CAT.tile} {...ink} />
      {Array.from({ length: n }, (_, k) => (
        <path key={k} d={`M${r2(x + k * sw)} ${y}h${sw}v${r2(aw - 6)}a${r2(sw / 2)} 6 0 0 1 ${-sw} 0Z`} fill={k % 2 ? CAT.tile : ht(id, "dense")} {...ink} />
      ))}
      <rect x={r2(x + w * 0.1)} y={r2(y + aw + h * 0.12)} width={r2(w * 0.42)} height={r2(h * 0.36)} fill={ht(id, "light")} {...ink} />
      <rect x={r2(x + w * 0.62)} y={r2(y + aw + h * 0.12)} width={r2(w * 0.28)} height={r2(h - aw - h * 0.12)} fill={CAT.tile} {...ink} />
      <circle cx={r2(x + w * 0.85)} cy={r2(y + h * 0.66)} r={1.6} fill={CAT.ink} />
    </g>
  );
}

/** A printed order form at (x, y): heading bar, ruled lines and a signature box. */
export function OrderForm({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lines = Math.floor((h - 34) / 9);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={CAT.tile} {...ink} />
      <rect x={x + 5} y={y + 6} width={w - 10} height={7} fill={CAT.ink} />
      {Array.from({ length: lines }, (_, k) => (
        <line key={k} x1={x + 6} y1={r2(y + 24 + k * 9)} x2={x + w - 6} y2={r2(y + 24 + k * 9)} {...hair} />
      ))}
      <rect x={r2(x + w - 24)} y={r2(y + h - 14)} width={18} height={8} fill="none" {...hair} />
    </g>
  );
}

/** A payment card at (x, y): halftone face, white chip and two number lines. */
export function PayCard({ id, x, y, w, h, fill }: { id: string; x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill ?? ht(id, "light")} {...ink} />
      <rect x={r2(x + w * 0.11)} y={r2(y + h * 0.3)} width={r2(w * 0.18)} height={r2(h * 0.22)} rx={1.5} fill={CAT.tile} {...ink} />
      <line x1={r2(x + w * 0.11)} y1={r2(y + h * 0.75)} x2={r2(x + w - 8)} y2={r2(y + h * 0.75)} stroke={CAT.tile} strokeWidth={2.4} />
    </g>
  );
}

/** An engraved espresso machine centred on (cx, cy): halftone body, dense side, white drip tray and cup. */
export function Espresso({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <rect x={-56} y={-66} width={112} height={26} rx={4} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-56} y={-40} width={30} height={86} fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={26} y={-40} width={30} height={86} fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-26} y={-40} width={52} height={12} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M-14 -28H14V-20H-14Z" fill={CAT.ink} />
      <line x1={14} y1={-24} x2={34} y2={-24} stroke={CAT.ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M-10 18H10V30Q10 34 6 34H-6Q-10 34 -10 30Z" fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-62} y={46} width={124} height={8} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <rect x={-26} y={36} width={52} height={10} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <circle cx={41} cy={-53} r={6} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.outline} />
    </g>
  );
}

/** A delivery van at (x, y), facing right: halftone body, white cab window, two wheels and a parcel in the back. */
export function Van({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}H${x + 58}V${y + 40}H${x}Z`} fill={ht(id, "light")} {...ink} />
      <path d={`M${x + 58} ${y + 10}H${x + 74}L${x + 86} ${y + 24}V${y + 40}H${x + 58}Z`} fill={CAT.tile} {...ink} />
      <path d={`M${x + 62} ${y + 14}H${x + 73}L${x + 81} ${y + 24}H${x + 62}Z`} fill={ht(id, "dense")} {...hair} />
      <circle cx={x + 16} cy={y + 41} r={6} fill={CAT.tile} {...ink} />
      <circle cx={x + 70} cy={y + 41} r={6} fill={CAT.tile} {...ink} />
      <rect x={x + 8} y={y + 8} width={26} height={18} fill={CAT.tile} {...hair} />
      <Parcel id={id} x={x + 13} y={y + 14} w={14} h={10} />
    </g>
  );
}

/** A plant at (x, y), w × h: sawtooth roof, a chimney and a row of windows. */
export function Factory({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  const t = r2(w / 3);
  const roof = r2(h * 0.28);
  return (
    <g>
      <rect x={r2(x + w * 0.72)} y={r2(y - h * 0.25)} width={r2(w * 0.12)} height={r2(h * 0.5)} fill={ht(id, "dense")} {...ink} />
      <path
        d={`M${x} ${y + h}V${y + roof}${[0, 1, 2].map((k) => `L${r2(x + k * t + t)} ${y}V${y + roof}`).join("")}V${y + h}Z`}
        fill={CAT.tile}
        {...ink}
      />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${r2(x + k * t)} ${y + roof}L${r2(x + k * t + t)} ${y}V${y + roof}Z`} fill={ht(id, "light")} {...ink} />
      ))}
      {[0, 1, 2].map((k) => (
        <rect key={k} x={r2(x + 6 + k * (w - 12) / 3)} y={r2(y + h * 0.5)} width={r2((w - 12) / 3 - 5)} height={r2(h * 0.22)} fill={ht(id, "dense")} {...hair} />
      ))}
    </g>
  );
}

/** A hooded trail jacket centred on (cx, cy): halftone body, dense sleeve shading, white zip. */
export function Jacket({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`} strokeLinejoin="round">
      <path d="M-22 -50Q0 -66 22 -50L26 -38H-26Z" fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M-26 -38L-48 -24L-58 52H-42L-34 0V60H34V0L42 52H58L48 -24L26 -38Z" fill={ht(id, "light")} stroke={CAT.ink} strokeWidth={LINE.outline} />
      <path d="M48 -24L58 52H42L36 4Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-26 -38Q0 -24 26 -38" fill="none" stroke={CAT.ink} strokeWidth={LINE.outline} />
      <line x1={0} y1={-30} x2={0} y2={60} stroke={CAT.tile} strokeWidth={2.4} />
      <line x1={0} y1={-30} x2={0} y2={60} stroke={CAT.ink} strokeWidth={0.5} strokeDasharray="1.5 1.5" />
      <rect x={-26} y={12} width={16} height={4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.hair} />
      <rect x={10} y={12} width={16} height={4} fill={CAT.tile} stroke={CAT.ink} strokeWidth={LINE.hair} />
    </g>
  );
}

/** A hotel front centred on (cx, cy): halftone roof band, white facade with a grid of windows and a door. */
export function Hotel({ id, cx, cy, s = 1, amber = false }: { id: string; cx: number; cy: number; s?: number; amber?: boolean }) {
  const w = r2(LINE.outline / s);
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${s})`}>
      <rect x={-14} y={-18} width={28} height={36} fill={amber ? CAT.amber : CAT.tile} stroke={CAT.ink} strokeWidth={w} />
      <rect x={-16} y={-22} width={32} height={5} fill={ht(id, "dense")} stroke={CAT.ink} strokeWidth={w} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-10 + c * 7.5} y={-13 + r * 8} width={4.5} height={5} fill={CAT.ink} />),
      )}
      <rect x={-3} y={11} width={6} height={7} fill={CAT.ink} />
    </g>
  );
}
