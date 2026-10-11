/* ==========================================================================
   Week 10 plates: Segmentation, Positioning, and Preference Analysis.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.

   Data: the factor, map, cluster, conjoint, simulator and embedding plates
   run on SIMULATED data and say so on the plate. The AI-agent plate uses
   Wadi & Ma (2026c): Table 4 (sponsorship coefficients by principal, Study 1)
   and Table 14 (choice shares by disclosure label, Study 2).
   ========================================================================== */

import React, { useState } from "react";
import {
  Frame,
  Key,
  Note,
  Display,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  SIGNAL_TINT,
  head,
  r2,
  seeded,
  PlateButton,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1 } from "../_visuals/objects";
import { Bank, Eye } from "@phosphor-icons/react";

/* --------------------------------------------------------------------------
   Shared helpers
   -------------------------------------------------------------------------- */

/**
 * Pointer handlers for a drag inside a plate: `onPoint` receives the pointer
 * in the plate's own viewBox units. Attach to the element students grab.
 */
function dragHandlers(onPoint: (x: number, y: number) => void) {
  const at = (e: React.PointerEvent<SVGElement>) => {
    const svg = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGSVGElement);
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    onPoint(p.x, p.y);
  };
  return {
    onPointerDown: (e: React.PointerEvent<SVGElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      at(e);
    },
    onPointerMove: (e: React.PointerEvent<SVGElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) at(e);
    },
  };
}

const minus = (s: string) => s.replace("-", "−");
const fmt = (v: number, d = 2) => minus(v.toFixed(d));

/* --------------------------------------------------------------------------
   Factor Analysis
   -------------------------------------------------------------------------- */

const BANK_ITEMS = [
  "Friendly staff",
  "Helpful advice",
  "Courteous service",
  "Low fees",
  "Competitive interest rates",
  "No hidden charges",
];

/** Eigenvalues of the six-item correlation matrix (simulated two-factor data). */
const EIGEN = [2.85, 1.66, 0.5, 0.39, 0.35, 0.25];

/**
 * Varimax-rotated loadings for 1–4 retained factors, from a principal-factor
 * solution of the same simulated correlation matrix (columns signed positive).
 */
const LOADINGS: Record<number, number[][]> = {
  1: [[0.74], [0.76], [0.75], [0.61], [0.69], [0.56]],
  2: [
    [0.88, 0.09],
    [0.84, 0.18],
    [0.91, 0.07],
    [0.08, 0.86],
    [0.21, 0.83],
    [0.06, 0.81],
  ],
  3: [
    [0.89, 0.05, 0.1],
    [0.84, 0.18, 0.08],
    [0.91, 0.1, 0.01],
    [0.06, 0.84, 0.32],
    [0.18, 0.86, 0.23],
    [0.07, 0.31, 0.95],
  ],
  4: [
    [0.93, 0.08, 0.08, 0.15],
    [0.51, 0.12, 0.09, 0.81],
    [0.84, 0.1, 0.0, 0.36],
    [0.14, 0.86, 0.31, -0.09],
    [0.05, 0.84, 0.24, 0.31],
    [0.05, 0.31, 0.95, 0.07],
  ],
};

const HIGH = 0.6;

/** A factor's name, read from the items that load highly on it. */
function factorName(col: number[]): [string, string?] {
  const hi = col.map((v, i) => (Math.abs(v) >= HIGH ? i : -1)).filter((i) => i >= 0);
  if (hi.length === 1) return ["ONE ITEM", "ONLY"];
  if (hi.every((i) => i < 3)) return ["SERVICE", "QUALITY"];
  if (hi.every((i) => i >= 3)) return ["VALUE"];
  return ["SERVICE AND", "VALUE MIXED"];
}

/**
 * Factor retention: the scree plot of six bank ratings beside the rotated
 * loadings. Students choose how many factors to retain, on the scree plot
 * or the control beneath, and watch the loadings table: one factor mixes
 * service and value, two give the clean SERVICE QUALITY and VALUE solution
 * (the two eigenvalues above one), three or four add factors that only one
 * item loads on.
 */
export function FactorRetention() {
  const [k, setK] = useState(2);
  const L = LOADINGS[k];

  // scree plot
  const sx0 = 52;
  const sx1 = 236;
  const sT = 58;
  const sB = 236;
  const SX = (i: number) => r2(sx0 + 18 + (i * (sx1 - sx0 - 30)) / 5);
  const SY = (v: number) => r2(sB - (v / 3) * (sB - sT));
  const scree = EIGEN.map((v, i) => `${i === 0 ? "M" : "L"}${SX(i)} ${SY(v)}`).join("");

  // loadings table
  const tx = 282;
  const cx0 = 468;
  const cw = 72;
  const rowH = 30;
  const ty0 = 78;

  return (
    <div>
      <Frame
        width={760}
        height={330}
        label={`Scree plot of six bank ratings with eigenvalues 2.85, 1.66, 0.50, 0.39, 0.35 and 0.25; two lie above the eigenvalue of one. ${k} factor${k > 1 ? "s" : ""} retained; the loadings table names ${Array.from(
          { length: k },
          (_, c) => factorName(L.map((r) => r[c])).join(" "),
        ).join(", ")}`}
      >
        <Key x={sx0 - 20} y={22}>SCREE PLOT</Key>
        <Key x={sx1 + 8} y={22} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>

        {/* axes */}
        <line x1={sx0} y1={sB} x2={sx1 + 8} y2={sB} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(sx1 + 8, sB, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={sx0} y1={sB} x2={sx0} y2={sT - 14} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(sx0, sT - 14, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 1, 2, 3].map((v) => (
          <Key key={v} x={sx0 - 8} y={r2(SY(v) + 3.5)} anchor="end" size={9.5}>
            {v}
          </Key>
        ))}
        <g transform={`translate(${sx0 - 28} ${sT - 8}) rotate(-90)`}>
          <Key x={0} y={0} anchor="end" size={9.5}>EIGENVALUE</Key>
        </g>
        <Key x={sx1 + 8} y={sB + 36} anchor="end" size={9.5}>FACTOR</Key>

        {/* the eigenvalue-one line */}
        <line x1={sx0} y1={SY(1)} x2={sx1} y2={SY(1)} stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />

        <path d={scree} fill="none" stroke={INK} strokeWidth={1.25} />
        {EIGEN.map((v, i) => {
          const on = i < k;
          const pick = i < 4;
          return (
            <g
              key={i}
              className={pick ? "cursor-pointer" : undefined}
              onClick={pick ? () => setK(i + 1) : undefined}
            >
              {pick ? <rect x={SX(i) - 14} y={sT - 10} width={28} height={sB - sT + 34} fill="transparent" /> : null}
              <circle cx={SX(i)} cy={SY(v)} r={6} fill={on ? SIGNAL : PAPER} stroke={on ? SIGNAL : INK} strokeWidth={1.5} />
              <Key x={SX(i)} y={sB + 18} anchor="middle" size={10} fill={on ? SIGNAL : INK3} weight={on ? 700 : 600}>
                {i + 1}
              </Key>
            </g>
          );
        })}
        <Key x={SX(5) + 4} y={r2(SY(1) - 7)} anchor="end" size={9}>EIGENVALUE 1</Key>

        {/* loadings */}
        <line x1={262} y1={12} x2={262} y2={318} stroke={RULE} strokeWidth={1} />
        <Key x={tx} y={22}>LOADINGS</Key>
        <Key x={tx} y={ty0 - 16} size={9.5}>ITEM</Key>
        {Array.from({ length: k }, (_, c) => (
          <Key key={c} x={cx0 + c * cw + cw / 2} y={ty0 - 16} anchor="middle" size={9.5}>
            {`FACTOR ${c + 1}`}
          </Key>
        ))}
        {BANK_ITEMS.map((item, r) => {
          const y = ty0 + r * rowH;
          return (
            <g key={item}>
              <line x1={tx} y1={y - 8} x2={cx0 + 4 * cw} y2={y - 8} stroke={r === 0 || r === 3 ? INK3 : RULE} strokeWidth={1} />
              <Note x={tx} y={y + 12} size={12.5}>{item}</Note>
              {L[r].map((v, c) => {
                const hi = Math.abs(v) >= HIGH;
                const x = cx0 + c * cw;
                return (
                  <g key={c}>
                    {hi ? <rect x={x + 6} y={y - 5} width={cw - 12} height={rowH - 6} fill={SIGNAL_TINT} /> : null}
                    <Key x={x + cw / 2} y={y + 13} anchor="middle" size={12} fill={hi ? SIGNAL : INK3} weight={hi ? 700 : 500}>
                      {fmt(v)}
                    </Key>
                  </g>
                );
              })}
            </g>
          );
        })}
        <line x1={tx} y1={ty0 + 6 * rowH - 8} x2={cx0 + 4 * cw} y2={ty0 + 6 * rowH - 8} stroke={INK3} strokeWidth={1} />

        {/* each factor, named from the items that load highly on it */}
        <Key x={tx} y={ty0 + 6 * rowH + 16} size={9.5}>NAMED</Key>
        {Array.from({ length: k }, (_, c) => {
          const [a, b] = factorName(L.map((row) => row[c]));
          const x = cx0 + c * cw + cw / 2;
          const clean = a === "SERVICE" || a === "VALUE";
          return (
            <g key={c}>
              <Key x={x} y={ty0 + 6 * rowH + 16} anchor="middle" size={9} fill={clean ? INK : COUNTER} weight={700}>
                {a}
              </Key>
              {b ? (
                <Key x={x} y={ty0 + 6 * rowH + 29} anchor="middle" size={9} fill={clean ? INK : COUNTER} weight={700}>
                  {b}
                </Key>
              ) : null}
            </g>
          );
        })}
      </Frame>
      <Segmented
        label="Factors retained"
        options={[1, 2, 3, 4].map((n) => ({ id: String(n), label: String(n) }))}
        value={String(k)}
        onChange={(v) => setK(Number(v))}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Perceptual Mapping
   -------------------------------------------------------------------------- */

/** Five banks' perceived positions, on the two factors (−1 to +1). */
const BANKS = [
  { id: "A", x: -0.55, y: 0.52 },
  { id: "B", x: 0.6, y: -0.52 },
  { id: "C", x: 0.24, y: 0.5 },
  { id: "D", x: 0.52, y: 0.3 },
  { id: "E", x: -0.5, y: -0.56 },
];

/** One segment's ideal point (the centre of segment 1 on the next plate). */
const IDEAL = { x: 0.74, y: 0.72 };

/** The map's two axes, drawn through the centre with open arrowheads at both ends. */
function MapAxes({ cx, cy, h }: { cx: number; cy: number; h: number }) {
  return (
    <g>
      <line x1={cx - h} y1={cy} x2={cx + h} y2={cy} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(cx + h, cy, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <path d={head.left(cx - h, cy, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={cx} y1={cy - h} x2={cx} y2={cy + h} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(cx, cy - h, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <path d={head.down(cx, cy + h, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={cx + h} y={cy + 20} anchor="end" size={11}>HIGHER SERVICE QUALITY</Key>
      <Key x={cx - h} y={cy + 20} size={11}>LOWER</Key>
      <Key x={cx + 10} y={cy - h + 6} size={11}>BETTER VALUE</Key>
      <Key x={cx + 10} y={cy + h} size={11}>POORER VALUE</Key>
    </g>
  );
}

/** A bank on the map: the icon centred on its position, its letter beneath. */
function BankAt({ x, y, id, color = INK, s = 34 }: { x: number; y: number; id: string; color?: string; s?: number }) {
  return (
    <g>
      <Bank x={r2(x - s / 2)} y={r2(y - s / 2)} size={s} weight="regular" color={color} />
      <Key x={x} y={r2(y + s / 2 + 13)} anchor="middle" size={12} fill={color} weight={700}>
        {id}
      </Key>
    </g>
  );
}

/** The segment's ideal point: a ring with a centre dot. */
function IdealMark({ x, y, color = INK }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill="none" stroke={color} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={3} fill={color} />
    </g>
  );
}

/**
 * A perceptual map of five banks on the two factors from the factor
 * analysis. C and D sit close together, perceived as similar and so in
 * direct competition (the finding, ringed); a segment's ideal point sits
 * nearest C, which that segment is expected to prefer.
 */
export function BankMap() {
  const cx = 232;
  const cy = 222;
  const h = 196;
  const P = (v: { x: number; y: number }) => ({ x: r2(cx + v.x * (h - 24)), y: r2(cy - v.y * (h - 24)) });
  const c = P(BANKS[2]);
  const d = P(BANKS[3]);
  const ideal = P(IDEAL);
  const mid = { x: r2((c.x + d.x) / 2), y: r2((c.y + d.y) / 2 + 6) };
  const tilt = r2((Math.atan2(d.y - c.y, d.x - c.x) * 180) / Math.PI);
  const half = Math.hypot(d.x - c.x, d.y - c.y) / 2;
  // the dashed distance runs from the ring's edge to the edge of C's icon
  const ux = (c.x - ideal.x) / Math.hypot(c.x - ideal.x, c.y - ideal.y);
  const uy = (c.y - ideal.y) / Math.hypot(c.x - ideal.x, c.y - ideal.y);
  return (
    <Frame
      width={560}
      height={444}
      label="Perceptual map of five banks, A to E, on service quality and value. Banks C and D are close together, perceived as similar and so likely to compete directly. A segment's ideal point, high on both dimensions, lies closest to bank C"
    >
      <MapAxes cx={cx} cy={cy} h={h} />

      {/* the close pair */}
      <ellipse
        cx={mid.x}
        cy={mid.y}
        rx={r2(half + 36)}
        ry={38}
        transform={`rotate(${tilt} ${mid.x} ${mid.y})`}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={r2(d.x + 44)} y={r2(d.y + 4)} size={10.5} fill={SIGNAL}>PERCEIVED AS SIMILAR:</Key>
      <Key x={r2(d.x + 44)} y={r2(d.y + 18)} size={10.5} fill={SIGNAL}>COMPETE DIRECTLY</Key>

      {/* the segment's ideal point and its nearest bank */}
      <line
        x1={r2(ideal.x + ux * 14)}
        y1={r2(ideal.y + uy * 14)}
        x2={r2(c.x - ux * 22)}
        y2={r2(c.y - uy * 22)}
        stroke={INK3}
        strokeWidth={1.25}
        strokeDasharray="4 3"
      />
      <IdealMark x={ideal.x} y={ideal.y} />
      <Key x={r2(ideal.x)} y={r2(ideal.y - 20)} anchor="middle" size={11}>IDEAL POINT</Key>

      {BANKS.map((b) => {
        const p = P(b);
        const on = b.id === "C" || b.id === "D";
        return <BankAt key={b.id} x={p.x} y={p.y} id={b.id} color={on ? SIGNAL : INK} />;
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Interpreting a Perceptual Map
   -------------------------------------------------------------------------- */

/** Standard normal draws from a seeded stream (Box–Muller). */
function normals(seed: number, n: number) {
  const rnd = seeded(seed);
  return Array.from({ length: n }, () => {
    const u = Math.max(rnd(), 1e-9);
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  });
}

/**
 * Sixty consumers' ideal points: four segments and a few scattered ideal
 * points, drawn from a seeded stream and kept clear of the banks, the axes,
 * the axis keys and one another, so every glyph stands free.
 */
const CONSUMERS = (() => {
  const groups = [
    { x: 0.72, y: 0.74, n: 14, sd: 0.1 },
    { x: 0.02, y: 0.78, n: 14, sd: 0.1 },
    { x: -0.5, y: -0.3, n: 12, sd: 0.11 },
    { x: 0.7, y: -0.66, n: 10, sd: 0.09 },
    { x: -0.66, y: 0.18, n: 5, sd: 0.12 },
    { x: 0.24, y: -0.3, n: 5, sd: 0.12 },
  ];
  const z = normals(29, 4000);
  let k = 0;
  const out: { x: number; y: number }[] = [];
  const free = (x: number, y: number) =>
    Math.abs(x) > 0.07 &&
    Math.abs(y) > 0.06 &&
    !(y < 0 && y > -0.2 && Math.abs(x) > 0.4) &&
    BANKS.every((b) => Math.abs(b.x - x) > 0.13 || y - b.y > 0.17 || b.y - y > 0.24) &&
    out.every((c) => Math.abs(c.x - x) > 0.06 || Math.abs(c.y - y) > 0.1);
  for (const g of groups) {
    let placed = 0;
    while (placed < g.n && k < z.length - 1) {
      const x = r2(g.x + g.sd * z[k++]);
      const y = r2(g.y + g.sd * z[k++]);
      if (Math.abs(x) > 0.9 || Math.abs(y) > 0.88 || !free(x, y)) continue;
      out.push({ x, y });
      placed++;
    }
  }
  return out;
})();

/** Index of the nearest of the given positions. */
function nearest(p: { x: number; y: number }, list: { x: number; y: number }[]) {
  let best = 0;
  list.forEach((q, i) => {
    if (Math.hypot(q.x - p.x, q.y - p.y) < Math.hypot(list[best].x - p.x, list[best].y - p.y)) best = i;
  });
  return best;
}

/**
 * A new bank enters the map. Sixty consumers stand at their ideal points;
 * each is expected to prefer the nearest bank. Students drag the new bank:
 * placed in an empty region where nobody's ideal point lies (the starting
 * state) it wins no one; moved under the unserved group at the top it wins
 * that segment; moved beside C and D it takes their customers, the
 * competition their proximity predicts.
 */
export function NewEntrant() {
  const [pos, setPos] = useState({ x: -0.82, y: -0.82 });
  const cx = 236;
  const cy = 226;
  const h = 206;
  const s = h - 26;
  const X = (v: number) => r2(cx + v * s);
  const Y = (v: number) => r2(cy - v * s);
  const set = (x: number, y: number) =>
    setPos({
      x: Math.round(Math.max(-0.9, Math.min(0.9, (x - cx) / s)) * 100) / 100,
      y: Math.round(Math.max(-0.9, Math.min(0.9, (cy - y) / s)) * 100) / 100,
    });

  const all = [...BANKS, { id: "NEW", ...pos }];
  const choice = CONSUMERS.map((c) => nearest(c, all));
  const before = CONSUMERS.map((c) => nearest(c, BANKS));
  const won = choice.filter((i) => i === BANKS.length).length;
  const lost = BANKS.map((b, bi) => ({ id: b.id, n: before.filter((i, ci) => i === bi && choice[ci] === BANKS.length).length })).filter(
    (l) => l.n > 0,
  );

  const nx = X(pos.x);
  const ny = Y(pos.y);
  const step = 0.05;
  return (
    <Frame
      width={680}
      height={456}
      label={`Perceptual map of banks A to E and sixty consumers standing at their ideal points; a new bank, which can be dragged, sits at service ${fmt(pos.x)} and value ${fmt(pos.y)} and is nearest the ideal points of ${won} of the 60 consumers${
        lost.length ? `, taken from ${lost.map((l) => `${l.id} (${l.n})`).join(", ")}` : ""
      }`}
    >
      <MapAxes cx={cx} cy={cy} h={h} />
      <Key x={cx - h} y={22} fill={INK3} size={9.5}>SIMULATED</Key>

      {CONSUMERS.map((c, i) => {
        const mine = choice[i] === BANKS.length;
        return <Person1 key={i} x={X(c.x)} y={r2(Y(c.y) + 7)} k={0.42} width={1.1} stroke={mine ? SIGNAL : INK3} fill={mine ? SIGNAL : PAPER} />;
      })}
      {BANKS.map((b) => (
        <BankAt key={b.id} x={X(b.x)} y={Y(b.y)} id={b.id} />
      ))}

      {/* the new bank, the thing students drag */}
      <g
        role="slider"
        tabIndex={0}
        aria-label="Position of the new bank"
        aria-valuetext={`service ${fmt(pos.x)}, value ${fmt(pos.y)}`}
        className="cursor-move touch-none select-none outline-none [&:focus-visible>circle]:stroke-[var(--ink)]"
        {...dragHandlers(set)}
        onKeyDown={(e) => {
          const d = { ArrowRight: [step, 0], ArrowLeft: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
          if (!d) return;
          e.preventDefault();
          set(X(pos.x + d[0]), Y(pos.y + d[1]));
        }}
      >
        <circle cx={nx} cy={ny} r={27} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
        <Bank x={r2(nx - 15)} y={r2(ny - 17)} size={30} weight="regular" color={SIGNAL} />
        {[0, 90, 180, 270].map((a) => (
          <path
            key={a}
            d={`M${r2(nx + 33)} ${r2(ny - 5)}L${r2(nx + 40)} ${ny}L${r2(nx + 33)} ${r2(ny + 5)}Z`}
            transform={`rotate(${a} ${nx} ${ny})`}
            fill={SIGNAL}
          />
        ))}
      </g>

      {/* what the position wins */}
      <line x1={478} y1={14} x2={478} y2={442} stroke={RULE} strokeWidth={1} />
      <Key x={498} y={40}>NEW BANK</Key>
      <Key x={498} y={56}>IS NEAREST TO</Key>
      <Display x={498} y={104} size={44} fill={SIGNAL}>{String(won)}</Display>
      <Key x={r2(504 + String(won).length * 24)} y={104} size={11}>OF 60</Key>
      <Key x={498} y={130} size={9.5}>IDEAL POINTS</Key>

      <Key x={498} y={174}>TAKEN FROM</Key>
      {BANKS.map((b, i) => {
        const n = lost.find((l) => l.id === b.id)?.n ?? 0;
        const y = 196 + i * 30;
        return (
          <g key={b.id}>
            <Key x={498} y={y + 4} size={11} weight={700} fill={n ? INK : INK3}>{b.id}</Key>
            {Array.from({ length: n }, (_, j) => (
              <rect key={j} x={516 + j * 9} y={y - 7} width={6} height={12} fill={SIGNAL} />
            ))}
            {n === 0 ? <line x1={516} y1={y} x2={530} y2={y} stroke={RULE2} strokeWidth={1.25} /> : null}
          </g>
        );
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Cluster Analysis
   -------------------------------------------------------------------------- */

/** Forty customers: annual spending (dollars) and visits per month. */
const SHOPPERS: [number, number][] = [
  [2030, 12], [1390, 2], [2130, 14], [930, 4], [770, 12], [2010, 4], [2200, 16], [1080, 5], [990, 15], [1560, 5],
  [1600, 12], [2410, 3], [2550, 16], [1310, 5], [670, 14], [2030, 2], [320, 14], [1700, 4], [470, 14], [2160, 5],
  [1900, 14], [1420, 6], [2410, 16], [1930, 6], [2140, 12], [460, 4], [2380, 14], [2590, 5], [2670, 17], [2430, 6],
  [2250, 14], [1800, 6], [1240, 15], [640, 5], [2410, 12], [730, 2], [1810, 16], [600, 3], [2580, 12], [2620, 3],
];

/**
 * k-means memberships (k = 2, the best of every pairwise start) on the raw
 * values and on the standardized values of the same forty customers.
 */
const KMEANS = {
  raw: "0101100110000110101001000100000011010100",
  std: "0101010101010101010101010101010101010101",
};

/** Spending's share of the squared Euclidean distance: SDs of $713 and 5.1 visits (99.995%). */
const SPEND_SHARE = { raw: "99.99%", std: "50%" };

type Scaling = keyof typeof KMEANS;

/**
 * Standardize first: forty customers by annual spending and visits per
 * month, split into two clusters by k-means. Students switch the distance
 * between raw and standardized values. On raw values spending, measured in
 * hundreds of dollars, carries 99.99% of the distance, and the clusters cut
 * the customers by spending alone, through the two visible groups; on
 * standardized values both variables count equally and the clusters find
 * the frequent and the occasional visitors.
 */
export function StandardizeFirst() {
  const [scale, setScale] = useState<Scaling>("raw");
  const lab = KMEANS[scale];
  const L = 66;
  const R = 470;
  const T = 40;
  const B = 290;
  const X = (v: number) => r2(L + 14 + (v / 2800) * (R - L - 28));
  const Y = (v: number) => r2(B - 8 - (v / 18) * (B - T - 16));
  return (
    <div>
      <Frame
        width={680}
        height={336}
        label={`Forty customers plotted by annual spending and visits per month, split into two clusters by k-means on ${
          scale === "raw" ? "raw values: spending carries 99.99% of the distance, and the clusters divide the customers by spending only" : "standardized values: both variables count equally, and the clusters separate frequent from occasional visitors"
        }`}
      >
        <Key x={L - 20} y={22}>CUSTOMERS IN TWO CLUSTERS</Key>
        <Key x={R} y={22} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>

        <line x1={L} y1={B} x2={R + 8} y2={B} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(R + 8, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={B} x2={L} y2={T - 8} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, T - 8, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[0, 1000, 2000].map((v) => (
          <Key key={v} x={X(v)} y={B + 16} anchor="middle" size={9.5}>{`$${v.toLocaleString("en-US")}`}</Key>
        ))}
        <Key x={R + 8} y={B + 34} anchor="end" size={9.5}>ANNUAL SPENDING</Key>
        {[0, 5, 10, 15].map((v) => (
          <Key key={v} x={L - 8} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{v}</Key>
        ))}
        <g transform={`translate(${L - 30} ${T - 4}) rotate(-90)`}>
          <Key x={0} y={0} anchor="end" size={9.5}>VISITS PER MONTH</Key>
        </g>

        {SHOPPERS.map(([sp, v], i) => {
          const one = lab[i] === "1";
          return <Person1 key={i} x={X(sp)} y={r2(Y(v) + 8)} k={0.5} width={1.2} stroke={one ? COUNTER : INK} fill={one ? COUNTER : PAPER} />;
        })}

        {/* what the distance measure weighs */}
        <line x1={508} y1={12} x2={508} y2={324} stroke={RULE} strokeWidth={1} />
        <Key x={528} y={44}>SPENDING&apos;S SHARE</Key>
        <Key x={528} y={60}>OF THE DISTANCE</Key>
        <Display x={528} y={110} size={40} fill={SIGNAL}>{SPEND_SHARE[scale]}</Display>
        <rect x={528} y={128} width={130} height={10} fill={PAPER} stroke={INK3} strokeWidth={1} />
        <rect x={528} y={128} width={scale === "raw" ? 130 : 65} height={10} fill={SIGNAL} />
        <Key x={528} y={156} size={9.5}>SPENDING</Key>
        <Key x={658} y={156} anchor="end" size={9.5}>VISITS</Key>

        <Key x={528} y={208}>CLUSTERS SPLIT BY</Key>
        <Note x={528} y={232} size={14} weight={600} fill={INK}>
          {scale === "raw" ? "Spending only" : "Visits per month"}
        </Note>
      </Frame>
      <Segmented
        label="Distance measured on"
        options={[
          { id: "raw", label: "Raw values" },
          { id: "std", label: "Standardized values" },
        ]}
        value={scale}
        onChange={setScale}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   The Clustering Procedure
   -------------------------------------------------------------------------- */

/** Twelve customers' standardized scores on two benefits sought: three groups, with structure inside each. */
const BENEFITS: [number, number][] = [
  [0.6, 0.8], [1.0, 1.3], [1.5, 0.7], [0.9, 0.3],
  [4.0, 1.1], [4.4, 1.6], [3.6, 2.0], [4.8, 0.9], [4.2, 2.3],
  [2.2, 4.4], [2.9, 4.9], [2.6, 3.9],
];

type Node = { members: number[]; h: number; left?: Node; right?: Node; x?: number };

/** Agglomerative clustering with average linkage on Euclidean distance. */
const TREE: Node = (() => {
  const d = (a: number, b: number) => Math.hypot(BENEFITS[a][0] - BENEFITS[b][0], BENEFITS[a][1] - BENEFITS[b][1]);
  const avg = (p: Node, q: Node) => {
    let t = 0;
    for (const a of p.members) for (const b of q.members) t += d(a, b);
    return t / (p.members.length * q.members.length);
  };
  let nodes: Node[] = BENEFITS.map((_, i) => ({ members: [i], h: 0 }));
  while (nodes.length > 1) {
    let bi = 0;
    let bj = 1;
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) if (avg(nodes[i], nodes[j]) < avg(nodes[bi], nodes[bj])) [bi, bj] = [i, j];
    const merged: Node = {
      members: [...nodes[bi].members, ...nodes[bj].members],
      h: r2(avg(nodes[bi], nodes[bj])),
      left: nodes[bi],
      right: nodes[bj],
    };
    nodes = [...nodes.filter((_, i) => i !== bi && i !== bj), merged];
  }
  return nodes[0];
})();

/** Leaf order left to right, read off the tree. */
const LEAVES: number[] = (() => {
  const out: number[] = [];
  const walk = (n: Node): void => {
    if (n.left && n.right) {
      walk(n.left);
      walk(n.right);
    } else out.push(n.members[0]);
  };
  walk(TREE);
  return out;
})();

/** Every merge in the tree, for drawing. */
const MERGES: Node[] = (() => {
  const out: Node[] = [];
  const walk = (n: Node) => {
    if (n.left && n.right) {
      walk(n.left);
      walk(n.right);
      out.push(n);
    }
  };
  walk(TREE);
  return out;
})();

/** The clusters below a cut at height h: the highest subtrees that merge below it. */
function clustersAt(h: number) {
  const out: number[][] = [];
  const walk = (n: Node): void => {
    if (n.h <= h || !n.left || !n.right) out.push(n.members);
    else {
      walk(n.left);
      walk(n.right);
    }
  };
  walk(TREE);
  return out;
}

/**
 * Cutting the dendrogram: twelve customers merged by average linkage.
 * Students drag the cut line up and down the tree; the number of clusters
 * is the number of branches it crosses, and the customers below are
 * bracketed by cluster. Three clusters hold across the widest band of
 * heights, the long branches that statistical criteria look for.
 */
export function DendrogramCut() {
  const top = TREE.h;
  const [cut, setCut] = useState(r2(top * 0.55));
  const L = 92;
  const R = 640;
  const base = 252;
  const T = 44;
  const Y = (h: number) => r2(base - (h / top) * (base - T));
  const pos = new Map(LEAVES.map((leaf, i) => [leaf, L + 20 + (i * (R - L - 40)) / (LEAVES.length - 1)]));
  const nodeX = (n: Node): number => (n.left && n.right ? (nodeX(n.left) + nodeX(n.right)) / 2 : pos.get(n.members[0])!);
  const groups = clustersAt(cut);
  const set = (y: number) => setCut(r2(Math.max(0.05, Math.min(top * 1.04, ((base - y) / (base - T)) * top))));
  const cy = Y(cut);
  return (
    <Frame
      width={760}
      height={340}
      label={`Dendrogram of twelve customers merged by average linkage; a cut line, which can be dragged, crosses the tree at a distance of ${fmt(cut)} and gives ${groups.length} cluster${groups.length > 1 ? "s" : ""}`}
    >
      <Key x={L - 70} y={22}>DENDROGRAM</Key>
      <Key x={R + 108} y={22} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>

      {/* distance axis */}
      <line x1={L - 30} y1={base} x2={L - 30} y2={T - 14} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L - 30, T - 14, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[0, 1, 2, 3].map((v) => (v <= top ? <Key key={v} x={L - 38} y={r2(Y(v) + 3.5)} anchor="end" size={9.5}>{v}</Key> : null))}
      <g transform={`translate(${L - 56} ${T - 8}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" size={9.5}>MERGE DISTANCE</Key>
      </g>

      {/* the tree */}
      {MERGES.map((n, i) => {
        const xl = r2(nodeX(n.left!));
        const xr = r2(nodeX(n.right!));
        const y = Y(n.h);
        return (
          <path
            key={i}
            d={`M${xl} ${Y(n.left!.h)}V${y}H${xr}V${Y(n.right!.h)}`}
            fill="none"
            stroke={INK}
            strokeWidth={1.5}
          />
        );
      })}

      {/* customers and their clusters */}
      {LEAVES.map((leaf) => (
        <Person1 key={leaf} x={r2(pos.get(leaf)!)} y={base + 40} k={0.62} />
      ))}
      {groups.map((g, i) => {
        const xs = g.map((m) => pos.get(m)!);
        const x0 = r2(Math.min(...xs) - 12);
        const x1 = r2(Math.max(...xs) + 12);
        return (
          <g key={i}>
            <path d={`M${x0} ${base + 48}v6H${x1}v-6`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
          </g>
        );
      })}

      {/* the cut, the thing students drag */}
      <g
        role="slider"
        tabIndex={0}
        aria-label="Height of the cut"
        aria-valuemin={0}
        aria-valuemax={r2(top)}
        aria-valuenow={cut}
        className="cursor-ns-resize touch-none select-none outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
        {...dragHandlers((_, y) => set(y))}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") set(cy - 6);
          else if (e.key === "ArrowDown") set(cy + 6);
          else return;
          e.preventDefault();
        }}
      >
        <rect x={L - 30} y={r2(cy - 12)} width={R - L + 40} height={24} fill="transparent" />
        <line x1={L - 22} y1={cy} x2={R + 8} y2={cy} stroke={SIGNAL} strokeWidth={2} />
        <rect x={L - 30} y={r2(cy - 9)} width={18} height={18} rx={9} fill={PAPER} stroke={SIGNAL} strokeWidth={2} />
        <path d={`M${L - 25} ${r2(cy - 1.5)}L${L - 21} ${r2(cy - 6)}L${L - 17} ${r2(cy - 1.5)}Z`} fill={SIGNAL} />
        <path d={`M${L - 25} ${r2(cy + 1.5)}L${L - 21} ${r2(cy + 6)}L${L - 17} ${r2(cy + 1.5)}Z`} fill={SIGNAL} />
      </g>
      <Display x={R + 16} y={r2(cy + 7)} size={20} fill={SIGNAL}>
        {`${groups.length} cluster${groups.length > 1 ? "s" : ""}`}
      </Display>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Evaluating Segments
   -------------------------------------------------------------------------- */

type Pt = [number, number];

/** Sixty customers on two clustering variables (0–1): three real groups, or an even spread with none. */
const SPREADS: Record<"groups" | "none", Pt[]> = {
  groups: (() => {
    // three groups, drawn from a seeded stream with every glyph standing free
    const z = normals(83, 2000);
    const centres: Pt[] = [
      [0.22, 0.3],
      [0.76, 0.26],
      [0.5, 0.76],
    ];
    const out: Pt[] = [];
    let k = 0;
    while (out.length < 60 && k < z.length - 1) {
      const c = centres[out.length % 3];
      const p: Pt = [r2(c[0] + 0.085 * z[k++]), r2(c[1] + 0.085 * z[k++])];
      if (p[0] < 0.02 || p[0] > 0.98 || p[1] < 0.03 || p[1] > 0.97) continue;
      if (out.some((q) => Math.abs(q[0] - p[0]) < 0.03 && Math.abs(q[1] - p[1]) < 0.065)) continue;
      out.push(p);
    }
    return out;
  })(),
  none: (() => {
    // jittered grid: even coverage, no groups
    const rnd = seeded(12);
    const out: Pt[] = [];
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 10; c++) out.push([r2(0.06 + c * 0.098 + (rnd() - 0.5) * 0.06), r2(0.08 + r * 0.168 + (rnd() - 0.5) * 0.09)]);
    return out;
  })(),
};

const sq = (a: Pt, b: Pt) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

/** k-means (k = 3) on a half-sample, seeded k-means++ start; returns the centroids. */
function kmeans3(points: Pt[], seed: number): Pt[] {
  const rnd = seeded(seed);
  const half = points.filter(() => rnd() < 0.5);
  const cs: Pt[] = [half[Math.floor(rnd() * half.length)]];
  while (cs.length < 3) {
    const w = half.map((p) => Math.min(...cs.map((c) => sq(p, c))));
    let t = rnd() * w.reduce((a, b) => a + b, 0);
    const i = w.findIndex((v) => (t -= v) <= 0);
    cs.push(half[i < 0 ? half.length - 1 : i]);
  }
  let cent = cs;
  for (let it = 0; it < 25; it++) {
    const lab = half.map((p) => cent.map((c) => sq(p, c)).reduce((b, v, j, a) => (v < a[b] ? j : b), 0));
    cent = cent.map((c, j) => {
      const m = half.filter((_, i) => lab[i] === j);
      return m.length ? ([m.reduce((a, p) => a + p[0], 0) / m.length, m.reduce((a, p) => a + p[1], 0) / m.length] as Pt) : c;
    });
  }
  return cent;
}

const assign = (points: Pt[], cent: Pt[]) =>
  points.map((p) => cent.map((c) => sq(p, c)).reduce((b, v, j, a) => (v < a[b] ? j : b), 0));

const PERMS = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];

/** Relabel `next` to agree best with `prev`; returns the relabelled clusters and the share that agree. */
function matchLabels(prev: number[], next: number[]) {
  let best = { lab: next, agree: -1 };
  for (const p of PERMS) {
    const lab = next.map((l) => p[l]);
    const agree = lab.filter((l, i) => l === prev[i]).length;
    if (agree > best.agree) best = { lab, agree };
  }
  return best;
}

/**
 * Clusters from nothing: sixty customers clustered into three segments by
 * k-means, each time on a fresh random half of the sample. On data with no
 * group structure (the starting state) k-means still returns three tidy
 * clusters, but each new half moves the boundaries and customers change
 * segment; on data with three real groups the solution repeats.
 */
export function ClustersFromNothing() {
  const [data, setData] = useState<"none" | "groups">("none");
  const [draw, setDraw] = useState(1);
  const pts = SPREADS[data];
  const prevLab = assign(pts, kmeans3(pts, 1000 + (draw - 1) * 7));
  const cent = kmeans3(pts, 1000 + draw * 7);
  const { lab, agree } = matchLabels(prevLab, assign(pts, cent));
  const share = Math.round((agree / pts.length) * 100);

  const L = 30;
  const T = 44;
  const W = 400;
  const H = 260;
  const X = (v: number) => r2(L + v * W);
  const Y = (v: number) => r2(T + H - v * H);
  const look = [
    { stroke: SIGNAL, fill: SIGNAL },
    { stroke: COUNTER, fill: COUNTER },
    { stroke: INK, fill: PAPER },
  ];
  return (
    <div>
      <Frame
        width={660}
        height={330}
        label={`Sixty customers ${data === "none" ? "with no group structure" : "in three real groups"}, clustered into three segments by k-means on half-sample ${draw}; ${share}% of customers stay in the same segment as on the previous half-sample`}
      >
        <Key x={L} y={22}>{`THREE CLUSTERS FROM HALF-SAMPLE ${draw}`}</Key>
        <Key x={L + W} y={22} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>
        <rect x={L - 10} y={T - 14} width={W + 20} height={H + 28} fill="none" stroke={RULE2} strokeWidth={1} />
        {pts.map((p, i) => (
          <Person1 key={i} x={X(p[0])} y={r2(Y(p[1]) + 7)} k={0.42} width={1.1} {...look[lab[i]]} />
        ))}

        <line x1={466} y1={12} x2={466} y2={318} stroke={RULE} strokeWidth={1} />
        <Key x={486} y={56}>SAME SEGMENT AS</Key>
        <Key x={486} y={72}>PREVIOUS HALF</Key>
        <Display x={486} y={124} size={44} fill={SIGNAL}>{`${share}%`}</Display>
        <Key x={486} y={146} size={9.5}>OF CUSTOMERS</Key>
        <Key x={486} y={204}>VERDICT</Key>
        <Note x={486} y={228} size={14} weight={600} fill={INK}>
          {share >= 90 ? "Stable" : "Unstable:"}
        </Note>
        {share < 90 ? (
          <Note x={486} y={248} size={14} weight={600} fill={INK}>
            not used for targeting
          </Note>
        ) : null}
      </Frame>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Data"
          options={[
            { id: "none", label: "No group structure" },
            { id: "groups", label: "Three real groups" },
          ]}
          value={data}
          onChange={(v) => {
            setData(v);
            setDraw(1);
          }}
        />
        <PlateButton className="mt-2" onClick={() => setDraw((d) => d + 1)}>
          Cluster another half-sample
        </PlateButton>
      </div>
    </div>
  );
}
/* --------------------------------------------------------------------------
   Conjoint Analysis
   -------------------------------------------------------------------------- */

/** A laptop of brand `brand`, the brand's letter on its screen, centred on (cx, cy); s is its width. */
function LaptopOf({ cx, cy, brand, s = 44, color = INK }: { cx: number; cy: number; brand: string; s?: number; color?: string }) {
  const w = s * 0.78;
  const h = s * 0.5;
  const top = cy - s * 0.36;
  return (
    <g>
      <rect x={r2(cx - w / 2)} y={r2(top)} width={r2(w)} height={r2(h)} rx={2.5} fill={PAPER} stroke={color} strokeWidth={1.5} />
      <path
        d={`M${r2(cx - w / 2 - s * 0.08)} ${r2(top + h + 3)}H${r2(cx + w / 2 + s * 0.08)}L${r2(cx + w / 2 + s * 0.11)} ${r2(top + h + 7)}H${r2(cx - w / 2 - s * 0.11)}Z`}
        fill={color}
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <Display x={cx} y={r2(top + h * 0.74)} anchor="middle" size={r2(s * 0.34)} fill={color}>
        {brand}
      </Display>
    </g>
  );
}

/** A battery whose charge shows the hours it lasts (16 hours full), with the hours beside it. */
function BatteryOf({ x, y, hours, color = INK }: { x: number; y: number; hours: number; color?: string }) {
  const w = 34;
  return (
    <g>
      <rect x={x} y={y - 8} width={w} height={16} rx={2} fill={PAPER} stroke={color} strokeWidth={1.5} />
      <rect x={x + w} y={y - 3.5} width={3} height={7} fill={color} />
      <rect x={x + 3} y={y - 5} width={r2(((w - 6) * hours) / 16)} height={10} fill={color} />
      <Key x={x + w + 9} y={y + 4} size={11} fill={color} weight={700}>{`${hours} H`}</Key>
    </g>
  );
}

/** A price tag with its price, its hole on the left, starting at (x, y). */
function TagOf({ x, y, price, color = INK }: { x: number; y: number; price: number; color?: string }) {
  const w = 66;
  return (
    <g>
      <path d={`M${x} ${y}L${x + 10} ${y - 11}H${x + w}V${y + 11}H${x + 10}Z`} fill={PAPER} stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={x + 9} cy={y} r={2.2} fill={color} />
      <Key x={x + 40} y={y + 4} anchor="middle" size={11} fill={color} weight={700}>{`$${price.toLocaleString("en-US")}`}</Key>
    </g>
  );
}

/** One choice task: three profiles, each one level of every attribute; the respondent picks the third. */
const TASK = [
  { brand: "A", hours: 8, price: 900 },
  { brand: "B", hours: 16, price: 1300 },
  { brand: "C", hours: 12, price: 1100 },
];
const PICKED = 2;

/**
 * A choice-based conjoint task: the laptop's three attributes and their
 * levels above, and below them one choice set of three profiles, each
 * combining one level of every attribute, plus the option to choose none.
 * The respondent's choice, and the levels it combines, are in signal.
 */
export function ChoiceTask() {
  const pick = TASK[PICKED];
  const rowY = [52, 96, 140];
  const lx = (i: number) => 168 + i * 150;
  const cardY = 196;
  const cardW = 140;
  const cardH = 128;
  const cardX = (i: number) => 30 + i * 158;
  return (
    <Frame
      width={680}
      height={340}
      label="Conjoint design for a laptop: brand with levels A, B and C; battery life of 8, 12 or 16 hours; price of $900, $1,100 or $1,300. One choice task shows three profiles (A, 8 hours, $900; B, 16 hours, $1,300; C, 12 hours, $1,100) and the option to choose none; the respondent chooses brand C with 12 hours at $1,100"
    >
      {/* attributes and levels */}
      <Key x={30} y={22}>ATTRIBUTES AND LEVELS</Key>
      {["BRAND", "BATTERY LIFE", "PRICE"].map((a, r) => (
        <g key={a}>
          <Key x={30} y={rowY[r] + 4} size={10}>{a}</Key>
          {r < 2 ? <line x1={30} y1={rowY[r] + 22} x2={650} y2={rowY[r] + 22} stroke={RULE} strokeWidth={1} /> : null}
        </g>
      ))}
      {["A", "B", "C"].map((b, i) => (
        <LaptopOf key={b} cx={lx(i) + 20} cy={rowY[0] - 2} brand={b} s={36} color={b === pick.brand ? SIGNAL : INK} />
      ))}
      {[8, 12, 16].map((h, i) => (
        <BatteryOf key={h} x={lx(i)} y={rowY[1]} hours={h} color={h === pick.hours ? SIGNAL : INK} />
      ))}
      {[900, 1100, 1300].map((p, i) => (
        <TagOf key={p} x={lx(i) - 6} y={rowY[2]} price={p} color={p === pick.price ? SIGNAL : INK} />
      ))}

      {/* one choice task */}
      <line x1={30} y1={170} x2={650} y2={170} stroke={INK3} strokeWidth={1} />
      <Key x={30} y={188} size={10}>ONE CHOICE TASK OF MANY</Key>
      {TASK.map((t, i) => {
        const on = i === PICKED;
        const x = cardX(i);
        const c = on ? SIGNAL : INK;
        return (
          <g key={i}>
            <rect x={x} y={cardY} width={cardW} height={cardH} fill={on ? SIGNAL_TINT : PAPER} stroke={c} strokeWidth={on ? 2 : 1.25} />
            <LaptopOf cx={x + cardW / 2} cy={cardY + 32} brand={t.brand} s={44} color={c} />
            <BatteryOf x={x + 34} y={cardY + 72} hours={t.hours} color={c} />
            <TagOf x={x + 36} y={cardY + 104} price={t.price} color={c} />
          </g>
        );
      })}
      <rect x={cardX(3)} y={cardY} width={cardW - 24} height={cardH} fill={PAPER} stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />
      <Key x={r2(cardX(3) + (cardW - 24) / 2)} y={cardY + 60} anchor="middle" size={10.5}>NONE OF</Key>
      <Key x={r2(cardX(3) + (cardW - 24) / 2)} y={cardY + 75} anchor="middle" size={10.5}>THESE</Key>
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Designing a Conjoint Study
   -------------------------------------------------------------------------- */

const EXTRA = [
  { id: "storage", label: "Storage (3 levels)", levels: 3 },
  { id: "screen", label: "Screen size (2)", levels: 2 },
  { id: "weight", label: "Weight (3)", levels: 3 },
  { id: "color", label: "Color (3)", levels: 3 },
] as const;
type ExtraId = (typeof EXTRA)[number]["id"];

/**
 * Smallest standard orthogonal array that estimates every main effect:
 * L9 holds up to four three-level attributes; L18 holds one two-level and
 * up to seven three-level attributes.
 */
const fractionalSize = (n3: number, n2: number) => (n2 === 0 && n3 <= 4 ? 9 : 18);

/**
 * Profile count: every possible laptop profile drawn as a small card, the
 * profiles of a fractional factorial design in signal. Students add
 * attributes to the brand, battery and price of the example: the possible
 * profiles multiply from 27 to 1,458 while the fractional design needs 9
 * or 18; a seventh attribute passes the six that respondents can weigh.
 */
export function ProfileCount() {
  const [extra, setExtra] = useState<ExtraId[]>([]);
  const added = EXTRA.filter((e) => extra.includes(e.id));
  const levels = [3, 3, 3, ...added.map((e) => e.levels)];
  const full = levels.reduce((a, b) => a * b, 1);
  const frac = fractionalSize(levels.filter((l) => l === 3).length, levels.filter((l) => l === 2).length);
  const nAttr = levels.length;

  // the grid of profile cards always fills its area, so the cards shrink as they multiply
  const gx = 236;
  const gy = 14;
  const gw = 550;
  const gh = 214;
  let size = 60;
  let cols = 1;
  for (; size > 2; size -= 0.25) {
    const g = size * 0.3;
    cols = Math.floor((gw + g) / (size + g));
    if (Math.ceil(full / cols) * (size + g) - g <= gh) break;
  }
  const gap = size * 0.3;
  const rows = Math.ceil(full / cols);
  const ox = gx + (gw - (Math.min(cols, full) * (size + gap) - gap)) / 2;
  const oy = gy + (gh - (rows * (size + gap) - gap)) / 2;
  // the fractional design's profiles, scattered through the full set (one per stratum, seeded)
  const rnd = seeded(full);
  const picked = new Set(Array.from({ length: frac }, (_, i) => Math.floor(((i + 0.15 + rnd() * 0.7) * full) / frac)));
  return (
    <div>
      <Frame
        width={800}
        height={242}
        label={`${nAttr} attributes with ${levels.join(", ")} levels give ${full.toLocaleString("en-US")} possible profiles; a fractional factorial design of ${frac} profiles estimates every part-worth${
          nAttr > 6 ? "; with seven attributes the profiles exceed the six that respondents can weigh" : ""
        }`}
      >
        <Key x={20} y={26}>{`${nAttr} ATTRIBUTES`}</Key>
        <Note x={20} y={45} size={12.5} fill={INK3}>{levels.join(" × ") + " levels"}</Note>

        <Key x={20} y={80}>POSSIBLE PROFILES</Key>
        <Display x={20} y={116} size={36}>{full.toLocaleString("en-US")}</Display>

        <Key x={20} y={150} fill={SIGNAL}>FRACTIONAL DESIGN</Key>
        <Display x={20} y={186} size={36} fill={SIGNAL}>{String(frac)}</Display>
        <Key x={r2(28 + String(frac).length * 20)} y={186} size={10} fill={SIGNAL}>PROFILES</Key>

        {nAttr > 6 ? (
          <g>
            <Key x={20} y={214} fill={COUNTER}>OVER SIX ATTRIBUTES:</Key>
            <Key x={20} y={229} fill={COUNTER}>RESPONDENTS SIMPLIFY</Key>
          </g>
        ) : null}

        <line x1={214} y1={10} x2={214} y2={232} stroke={RULE} strokeWidth={1} />
        {Array.from({ length: full }, (_, i) => {
          const on = picked.has(i);
          return (
            <rect
              key={i}
              x={r2(ox + (i % cols) * (size + gap))}
              y={r2(oy + Math.floor(i / cols) * (size + gap))}
              width={r2(size)}
              height={r2(size)}
              rx={r2(Math.min(3, size * 0.12))}
              fill={on ? SIGNAL : PAPER}
              stroke={on ? SIGNAL : INK3}
              strokeWidth={size > 12 ? 1.25 : 0.75}
            />
          );
        })}
      </Frame>
      <Toggles
        label="Add attributes"
        allowNone
        options={EXTRA.map((e) => ({ id: e.id, label: e.label }))}
        value={extra}
        onChange={setExtra}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Interpreting Part-Worth Utilities
   -------------------------------------------------------------------------- */

/** Part-worths of the example (centred): brand range 1.0, battery range 2.0. */
const BRAND_PW = [
  { level: "A", u: 0.5 },
  { level: "B", u: 0 },
  { level: "C", u: -0.5 },
];
const BATTERY_PW = [
  { level: 8, u: -1.1 },
  { level: 12, u: 0.1 },
  { level: 16, u: 0.9 },
];
/** Utility lost per dollar: $900 to $1,300 spans 3.0 units, as in the example. */
const PER_DOLLAR = 3 / 400;

/**
 * Relative importance depends on the levels: the respondent's part-worths
 * for the laptop's brand, battery life and price, with each attribute's
 * range bracketed and the relative importances beneath. Students move the
 * highest price tested; the respondent's preferences stay the same, but a
 * wider price range lengthens the price range bracket and raises the
 * importance of price from 50% (the example, $900 to $1,300) to 67% at
 * $1,700, or lowers it to 33% at $1,100.
 */
export function PriceRangeImportance() {
  const [hi, setHi] = useState(1300);
  const prices = [900, (900 + hi) / 2, hi];
  const mid = prices[1];
  const pricePw = prices.map((p) => ({ level: p, u: -PER_DOLLAR * (p - mid) }));
  const ranges = [1, 2, r2(PER_DOLLAR * (hi - 900))];
  const total = ranges.reduce((a, b) => a + b, 0);
  const share = ranges.map((r) => Math.round((r / total) * 100));

  const zero = 136;
  const unit = 32;
  const Y = (u: number) => r2(zero - u * unit);
  const panels = [
    { key: "BRAND", x0: 76, x1: 216, pts: BRAND_PW },
    { key: "BATTERY LIFE", x0: 268, x1: 408, pts: BATTERY_PW },
    { key: "PRICE", x0: 460, x1: 600, pts: pricePw },
  ];
  const px = (p: (typeof panels)[number], i: number) => r2(p.x0 + 10 + (i * (p.x1 - p.x0 - 20)) / 2);

  const bx = 76;
  const bw = 584;
  const by = 306;
  return (
    <div>
      <Frame
        width={680}
        height={350}
        label={`Part-worths for a laptop: brand range 1.0, battery life range 2.0, price range ${ranges[2].toFixed(1)} for prices from $900 to $${hi.toLocaleString(
          "en-US",
        )}. Relative importance: brand ${share[0]}%, battery life ${share[1]}%, price ${share[2]}%`}
      >
        <g transform={`translate(18 ${Y(3.3)}) rotate(-90)`}>
          <Key x={0} y={0} anchor="end" size={9.5}>PART-WORTH</Key>
        </g>
        {/* utility scale */}
        <line x1={52} y1={Y(-3.1)} x2={52} y2={Y(3.3)} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(52, Y(3.3), 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[-3, -2, -1, 0, 1, 2, 3].map((u) => (
          <g key={u}>
            <line x1={48} y1={Y(u)} x2={52} y2={Y(u)} stroke={INK} strokeWidth={1.25} />
            <Key x={44} y={r2(Y(u) + 3.5)} anchor="end" size={9}>{u > 0 ? `+${u}` : u < 0 ? `\u2212${-u}` : "0"}</Key>
          </g>
        ))}
        <line x1={56} y1={zero} x2={660} y2={zero} stroke={RULE2} strokeWidth={1} />

        {panels.map((p, pi) => {
          const us = p.pts.map((q) => q.u);
          const top = Y(Math.max(...us));
          const bot = Y(Math.min(...us));
          const isPrice = pi === 2;
          const c = isPrice ? SIGNAL : INK;
          return (
            <g key={p.key}>
              <Key x={r2((p.x0 + p.x1) / 2)} y={22} anchor="middle" size={10}>{p.key}</Key>
              <path d={p.pts.map((q, i) => `${i ? "L" : "M"}${px(p, i)} ${Y(q.u)}`).join("")} fill="none" stroke={c} strokeWidth={1.5} />
              {p.pts.map((q, i) => (
                <circle key={i} cx={px(p, i)} cy={Y(q.u)} r={4.5} fill={c} />
              ))}
              {/* the range */}
              <path d={`M${p.x1 + 6} ${top}h6V${bot}h-6`} fill="none" stroke={c} strokeWidth={1.5} />
              <Key x={p.x1 + 18} y={r2((top + bot) / 2 + 4)} size={10} fill={c} weight={700}>{ranges[pi].toFixed(1)}</Key>
              {/* the levels, drawn as in the choice task */}
              {p.pts.map((q, i) =>
                pi === 0 ? (
                  <LaptopOf key={i} cx={px(p, i)} cy={252} brand={String(q.level)} s={30} />
                ) : pi === 1 ? (
                  <g key={i}>
                    <rect x={px(p, i) - 12} y={240} width={24} height={12} rx={1.5} fill={PAPER} stroke={INK} strokeWidth={1.25} />
                    <rect x={px(p, i) + 12} y={243.5} width={2.5} height={5} fill={INK} />
                    <rect x={px(p, i) - 10} y={242} width={r2((20 * Number(q.level)) / 16)} height={8} fill={INK} />
                    <Key x={px(p, i)} y={270} anchor="middle" size={9.5}>{`${q.level} H`}</Key>
                  </g>
                ) : (
                  <Key key={i} x={px(p, i)} y={252} anchor="middle" size={10} fill={c} weight={700}>
                    {`$${Number(q.level).toLocaleString("en-US")}`}
                  </Key>
                ),
              )}
            </g>
          );
        })}

        {/* relative importance */}
        <Key x={20} y={by - 10}>RELATIVE IMPORTANCE</Key>
        <Key x={660} y={by - 10} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>
        {ranges.map((r, i) => {
          const x0 = r2(bx + (ranges.slice(0, i).reduce((a, b) => a + b, 0) / total) * bw);
          const w = r2((r / total) * bw);
          const isPrice = i === 2;
          return (
            <g key={i}>
              <rect x={x0} y={by} width={r2(w - 2)} height={34} fill={isPrice ? SIGNAL : PAPER} stroke={isPrice ? SIGNAL : INK3} strokeWidth={1} />
              <Key x={r2(x0 + w / 2 - 1)} y={by + 14} anchor="middle" size={9.5} fill={isPrice ? PAPER : INK3}>
                {["BRAND", "BATTERY", "PRICE"][i]}
              </Key>
              <Key x={r2(x0 + w / 2 - 1)} y={by + 28} anchor="middle" size={11} fill={isPrice ? PAPER : INK} weight={700}>
                {`${share[i]}%`}
              </Key>
            </g>
          );
        })}
      </Frame>
      <Slider label={`Highest price tested: $${hi.toLocaleString("en-US")}`} value={hi} min={1100} max={1700} step={100} onChange={setHi} showValue={false} />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Willingness to Pay and Market Simulation
   -------------------------------------------------------------------------- */

/** Battery part-worths (8 → 12 hours adds 1.2) and the utility of one dollar (−0.04), as in the example. */
const BATTERY_U: Record<number, number> = { 8: 0, 12: 1.2, 16: 1.8 };
const DOLLAR_U = -0.04;

/** Whole people out of n for a set of shares (largest remainder). */
function apportion(shares: number[], n: number) {
  const raw = shares.map((v) => v * n);
  const out = raw.map(Math.floor);
  const order = raw.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]);
  const left = n - out.reduce((a, b) => a + b, 0);
  for (let k = 0; k < left; k++) out[order[k][1]]++;
  return out;
}

/**
 * A market simulator: three laptops, the firm's own (A: 12 hours, $1,100)
 * and two competitors; shares of preference follow from the part-worths of
 * the example by the logit rule. Students change competitor B's price
 * (8 hours, starting at $1,100) and watch the shares move: A and B tie when
 * B is $30 cheaper, the willingness to pay for the four extra hours.
 */
export function MarketSimulator() {
  const [pb, setPb] = useState(1100);
  const items = [
    { brand: "A", hours: 12, price: 1100 },
    { brand: "B", hours: 8, price: pb },
    { brand: "C", hours: 16, price: 1150 },
  ];
  const u = items.map((it) => BATTERY_U[it.hours] + DOLLAR_U * (it.price - 1000));
  const e = u.map(Math.exp);
  const sum = e.reduce((a, b) => a + b, 0);
  const share = e.map((v) => v / sum);
  const pct = share.map((v) => Math.round(v * 100));
  const people = apportion(share, 20);
  const gap = 1100 - pb;

  const colX = [120, 340, 560];
  return (
    <div>
      <Frame
        width={680}
        height={322}
        label={`Market simulation: laptop A (12 hours, $1,100) has a ${pct[0]}% share of preference, competitor B (8 hours, $${pb.toLocaleString(
          "en-US",
        )}) ${pct[1]}%, and C (16 hours, $1,150) ${pct[2]}%${gap === 30 ? "; A and B tie when B is $30 cheaper, the willingness to pay for four more hours" : ""}`}
      >
        <Key x={20} y={22}>SHARES OF PREFERENCE</Key>
        <Key x={660} y={22} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>
        {items.map((it, i) => {
          const x = colX[i];
          const c = i === 0 ? SIGNAL : i === 1 ? COUNTER : INK;
          return (
            <g key={it.brand}>
              <LaptopOf cx={x} cy={66} brand={it.brand} s={50} color={c} />
              <BatteryOf x={x - 34} y={104} hours={it.hours} color={c} />
              <TagOf x={x - 36} y={136} price={it.price} color={c} />
              {i === 1 ? (
                <Key x={x} y={166} anchor="middle" size={9.5} fill={COUNTER}>
                  {gap === 0 ? "SAME PRICE AS A" : gap > 0 ? `$${gap} BELOW A` : `$${-gap} ABOVE A`}
                </Key>
              ) : null}
              <Display x={x} y={210} anchor="middle" size={32} fill={c}>{`${pct[i]}%`}</Display>
              {Array.from({ length: people[i] }, (_, j) => (
                <Person1
                  key={j}
                  x={r2(x - 72 + (j % 10) * 16)}
                  y={r2(252 + Math.floor(j / 10) * 40)}
                  k={0.66}
                  width={1.2}
                  stroke={c}
                  fill={i === 2 ? PAPER : c}
                />
              ))}
            </g>
          );
        })}
        <line x1={230} y1={40} x2={230} y2={310} stroke={RULE} strokeWidth={1} />
        <line x1={450} y1={40} x2={450} y2={310} stroke={RULE} strokeWidth={1} />
      </Frame>
      <Slider
        label={`Competitor B's price: $${pb.toLocaleString("en-US")}`}
        value={pb}
        min={1000}
        max={1150}
        step={10}
        onChange={setPb}
        showValue={false}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Conjoint Designs for AI Agents
   -------------------------------------------------------------------------- */

/**
 * Wadi & Ma (2026c), Study 1, Table 4 (N = 2,000; Gemini 3.1 Pro): the
 * sponsorship coefficient under each principal, from the fixed-effects logit
 * on target choice.
 */
const SPONSOR_PW = [
  { key: "TRAVELER", pw: -6.49 },
  { key: "PLATFORM", pw: -2.5 },
];

/**
 * Wadi & Ma (2026c), Study 2, Table 14 (500 tasks per cell): share of tasks
 * in which the agent chose the paid listing, by label, without platform
 * attribution.
 */
const LABEL_SHARE = [
  { label: "Promoted", traveler: 28.8, platform: 39.6 },
  { label: "Sponsored", traveler: 0.8, platform: 1.4 },
];

/** A listing's label, drawn as the badge it appears as on the page. */
function LabelBadge({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 7.4 + 16;
  return (
    <g>
      <rect x={x} y={y - 11} width={r2(w)} height={20} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Note x={r2(x + w / 2)} y={y + 3.5} anchor="middle" size={12} weight={600} fill={INK}>
        {text}
      </Note>
    </g>
  );
}

/**
 * The sponsorship label as a conjoint attribute for AI agents (real data):
 * above, the part-worth of the label for agents told they serve the
 * traveler or the booking platform (−6.49 and −2.50: the platform's agent
 * penalizes paid listings less); below, the share of tasks in which each
 * agent chose the paid listing under the labels "Promoted" and "Sponsored".
 */
export function SponsorPartWorths() {
  const zx = 610;
  const X = (pw: number) => r2(zx + (pw / 7) * 400);
  const sx = 240;
  const S = (v: number) => r2(sx + (v / 50) * 370);
  const look = { traveler: { c: INK, key: "TRAVELER" }, platform: { c: SIGNAL, key: "PLATFORM" } };
  return (
    <Frame
      width={680}
      height={348}
      label="Part-worth of a sponsorship label for AI agents in hotel booking (Wadi & Ma, 2026c): −6.49 for agents told they serve the traveler and −2.50 for agents told they serve the booking platform. Share of tasks in which the agent chose the paid listing: with the label Promoted, 28.8% (traveler) and 39.6% (platform); with the label Sponsored, 0.8% and 1.4%"
    >
      <Key x={20} y={22}>PART-WORTH OF A SPONSORSHIP LABEL</Key>
      {SPONSOR_PW.map((r, i) => {
        const y = 56 + i * 40;
        const c = i === 1 ? SIGNAL : INK;
        return (
          <g key={r.key}>
            <AiMark1 cx={30} cy={y} s={20} fill={c} />
            <Key x={48} y={y - 2} size={9.5} fill={c}>AGENT SERVES</Key>
            <Key x={48} y={y + 11} size={9.5} fill={c} weight={700}>{`THE ${r.key}`}</Key>
            <rect x={X(r.pw)} y={y - 10} width={r2(zx - X(r.pw))} height={20} fill={c} />
            <Key x={r2(X(r.pw) - 8)} y={y + 4} anchor="end" size={11} fill={c} weight={700}>{fmt(r.pw)}</Key>
          </g>
        );
      })}
      <line x1={zx} y1={36} x2={zx} y2={120} stroke={INK} strokeWidth={1.25} />
      <Key x={zx} y={134} anchor="middle" size={9.5}>0</Key>
      <Key x={X(-6)} y={134} anchor="middle" size={9.5}>{"\u22126"}</Key>
      <Key x={X(-4)} y={134} anchor="middle" size={9.5}>{"\u22124"}</Key>
      <Key x={X(-2)} y={134} anchor="middle" size={9.5}>{"\u22122"}</Key>
      {[-6, -4, -2].map((v) => (
        <line key={v} x1={X(v)} y1={118} x2={X(v)} y2={122} stroke={INK} strokeWidth={1.25} />
      ))}
      <line x1={X(-7)} y1={120} x2={zx} y2={120} stroke={INK} strokeWidth={1.25} />

      <line x1={20} y1={158} x2={660} y2={158} stroke={RULE} strokeWidth={1} />
      <Key x={20} y={184}>PAID LISTING CHOSEN, SHARE OF 500 TASKS</Key>
      {LABEL_SHARE.map((r, gi) => {
        const y0 = 214 + gi * 64;
        return (
          <g key={r.label}>
            <LabelBadge x={20} y={y0 + 12} text={r.label} />
            {(["traveler", "platform"] as const).map((who, j) => {
              const v = r[who];
              const y = y0 + j * 24;
              const c = look[who].c;
              return (
                <g key={who}>
                  <AiMark1 cx={r2(sx - 96)} cy={y} s={13} fill={c} />
                  <Key x={r2(sx - 84)} y={y + 3.5} size={9} fill={c}>{look[who].key}</Key>
                  <rect x={sx} y={y - 8} width={Math.max(1.5, r2(S(v) - sx))} height={16} fill={c} />
                  <Key x={r2(Math.max(S(v), sx + 1.5) + 8)} y={y + 4} size={11} fill={c} weight={700}>{`${v.toFixed(1)}%`}</Key>
                </g>
              );
            })}
          </g>
        );
      })}
      <line x1={sx} y1={198} x2={sx} y2={322} stroke={INK} strokeWidth={1.25} />
      <line x1={sx} y1={322} x2={S(50)} y2={322} stroke={INK} strokeWidth={1.25} />
      {[0, 25, 50].map((v) => (
        <g key={v}>
          <line x1={S(v)} y1={322} x2={S(v)} y2={326} stroke={INK} strokeWidth={1.25} />
          <Key x={S(v)} y={338} anchor="middle" size={9.5}>{`${v}%`}</Key>
        </g>
      ))}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   Embeddings
   -------------------------------------------------------------------------- */

/**
 * Eleven open-ended answers to "What do you look for in a breakfast?",
 * placed where a two-dimensional projection of their embeddings would put
 * them (simulated): answers with similar meanings sit together.
 */
const ANSWERS = [
  { t: "I need something quick before work", x: 30, y: 62 },
  { t: "Breakfast has to take five minutes", x: 44, y: 92 },
  { t: "No time to sit down in the morning", x: 26, y: 122 },
  { t: "I want breakfast with more protein", x: 276, y: 62 },
  { t: "Trying to cut down on sugar", x: 290, y: 92 },
  { t: "Something that keeps me full", x: 280, y: 122 },
  { t: "I need a quiet place to work", x: 30, y: 226 },
  { t: "Five minutes of calm with my coffee", x: 40, y: 256 },
  { t: "A corner where I can sit and read", x: 24, y: 286 },
  { t: "Coffee here costs too much", x: 286, y: 236 },
  { t: "Looking for a cheaper morning option", x: 272, y: 266 },
];

const words = (t: string) => new Set(t.toLowerCase().match(/[a-z]+/g) ?? []);

/** Similarity of two answers' embeddings, simulated from their distance on the projection. */
const embedSim = (a: (typeof ANSWERS)[number], b: (typeof ANSWERS)[number]) =>
  r2(Math.max(0, 0.95 - Math.hypot(a.x - b.x, a.y - b.y) / 420));

type NearBy = "meaning" | "words";

/**
 * Nearest by meaning or by words: open-ended breakfast answers on a
 * projection of their embeddings. Students pick an answer and compare its
 * two nearest neighbours by embedding with its two nearest by shared words.
 * "I need something quick before work" is closest in meaning to
 * "Breakfast has to take five minutes", which shares none of its words,
 * while the answer sharing most words, "I need a quiet place to work",
 * means something else and sits far away.
 */
export function EmbeddingNeighbors() {
  const [sel, setSel] = useState(0);
  const [by, setBy] = useState<NearBy>("meaning");
  const me = ANSWERS[sel];
  const mine = words(me.t);
  const scored = ANSWERS.map((a, i) => {
    const shared = [...words(a.t)].filter((w) => mine.has(w));
    return { i, shared, sim: embedSim(me, a) };
  }).filter((r) => r.i !== sel);
  const ranked = [...scored].sort((p, q) => (by === "meaning" ? q.sim - p.sim : q.shared.length - p.shared.length || q.sim - p.sim)).slice(0, 2);
  const rank = new Map(ranked.map((r, k) => [r.i, k + 1]));

  const cardW = (t: string) => r2(t.length * 5.5 + 36);
  return (
    <div>
      <Frame
        width={760}
        height={322}
        label={`Eleven open-ended breakfast answers placed by their embeddings. Selected: "${me.t}". Its two nearest answers by ${
          by === "meaning" ? "embedding" : "shared words"
        }: ${ranked.map((r) => `"${ANSWERS[r.i].t}" (${by === "meaning" ? `similarity ${r.sim.toFixed(2)}` : `${r.shared.length} shared words`})`).join(" and ")}`}
      >
        <Key x={20} y={24}>ANSWERS PLACED BY THEIR EMBEDDINGS</Key>
        <Key x={500} y={24} anchor="end" size={9.5} fill={INK3}>SIMULATED</Key>

        {ANSWERS.map((a, i) => {
          const on = i === sel;
          const r = rank.get(i);
          const w = cardW(a.t);
          return (
            <g
              key={i}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={a.t}
              className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
              onClick={() => setSel(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSel(i);
                }
              }}
            >
              <rect
                x={a.x}
                y={a.y - 15}
                width={w}
                height={22}
                rx={3}
                fill={on ? SIGNAL : r ? SIGNAL_TINT : PAPER}
                stroke={on || r ? SIGNAL : RULE2}
                strokeWidth={on || r ? 1.5 : 1}
              />
              <Note x={a.x + 26} y={a.y} size={11.5} fill={on ? PAPER : r ? SIGNAL : INK2} weight={on || r ? 600 : 400}>
                {a.t}
              </Note>
              {r ? (
                <g>
                  <circle cx={a.x + 12} cy={a.y - 4} r={7} fill={SIGNAL} />
                  <Key x={a.x + 12} y={r2(a.y - 0.5)} anchor="middle" size={9} fill={PAPER} weight={700}>
                    {r}
                  </Key>
                </g>
              ) : (
                <circle cx={a.x + 12} cy={a.y - 4} r={2.5} fill={on ? PAPER : INK3} />
              )}
            </g>
          );
        })}

        {/* the two nearest, scored */}
        <line x1={524} y1={12} x2={524} y2={310} stroke={RULE} strokeWidth={1} />
        <Key x={538} y={50}>{by === "meaning" ? "NEAREST BY EMBEDDING" : "NEAREST BY SHARED WORDS"}</Key>
        {ranked.map((r, k) => {
          const y = 90 + k * 92;
          return (
            <g key={r.i}>
              <circle cx={546} cy={y - 4} r={8} fill={SIGNAL} />
              <Key x={546} y={y} anchor="middle" size={9.5} fill={PAPER} weight={700}>
                {k + 1}
              </Key>
              {by === "meaning" ? (
                <>
                  <Key x={562} y={y} size={9.5}>SIMILARITY</Key>
                  <Display x={562} y={y + 34} size={28} fill={SIGNAL}>{r.sim.toFixed(2)}</Display>
                </>
              ) : (
                <>
                  <Key x={562} y={y} size={9.5}>SHARED WORDS</Key>
                  <Display x={562} y={y + 34} size={28} fill={SIGNAL}>{String(r.shared.length)}</Display>
                  <Note x={r2(562 + String(r.shared.length).length * 16 + 8)} y={y + 30} size={12} fill={INK3} italic>
                    {r.shared.map((w) => (w === "i" ? "I" : w)).join(", ")}
                  </Note>
                </>
              )}
              <Key x={562} y={y + 56} size={9}>{by === "meaning" ? `${r.shared.length} SHARED WORDS` : `SIMILARITY ${r.sim.toFixed(2)}`}</Key>
            </g>
          );
        })}
      </Frame>
      <Segmented
        label="Nearest by"
        options={[
          { id: "meaning", label: "Embedding" },
          { id: "words", label: "Shared words" },
        ]}
        value={by}
        onChange={setBy}
      />
    </div>
  );
}
/* --------------------------------------------------------------------------
   Clustering Customers With Embeddings
   -------------------------------------------------------------------------- */

/** Three clusters of customers on their answers' embeddings, with a sample of the texts read in each. */
const TEXT_CLUSTERS = [
  { cx: 0.24, cy: 0.76, texts: ["Grab-and-go on my way to the office", "I eat in the car most mornings"], name: "SPEED" },
  { cx: 0.78, cy: 0.64, texts: ["More protein after the gym", "Less sugar in the pastries, please"], name: "HEALTH" },
  { cx: 0.42, cy: 0.2, texts: ["Prices went up again this year", "A meal deal would bring me back"], name: "PRICE" },
];

const TEXT_POINTS: { x: number; y: number; c: number }[] = (() => {
  const z = normals(61, 1200);
  const out: { x: number; y: number; c: number }[] = [];
  let k = 0;
  while (out.length < 36 && k < z.length - 1) {
    const c = out.length % 3;
    const g = TEXT_CLUSTERS[c];
    const p = { x: r2(g.cx + 0.075 * z[k++]), y: r2(g.cy + 0.075 * z[k++]), c };
    if (p.x < 0.04 || p.x > 0.96 || p.y < 0.04 || p.y > 0.96) continue;
    if (out.some((q) => Math.abs(q.x - p.x) < 0.05 && Math.abs(q.y - p.y) < 0.09)) continue;
    out.push(p);
  }
  return out;
})();

/**
 * Reading the clusters: customers clustered by k-means on the embeddings of
 * their answers (the step a model does, marked with the AI spark); the
 * projection's dimensions carry no names, so each cluster is named by
 * reading a sample of its texts (the eye).
 */
export function TextClusters() {
  const L = 24;
  const T = 44;
  const W = 230;
  const H = 250;
  const X = (v: number) => r2(L + v * W);
  const Y = (v: number) => r2(T + H - v * H);
  const look = [
    { stroke: SIGNAL, fill: SIGNAL },
    { stroke: COUNTER, fill: COUNTER },
    { stroke: INK, fill: PAPER },
  ];
  return (
    <Frame
      width={680}
      height={318}
      label="Thirty-six customers clustered by k-means on the embeddings of their answers into three clusters. A person reads a sample of each cluster's texts and names it: SPEED (Grab-and-go on my way to the office; I eat in the car most mornings), HEALTH (More protein after the gym; Less sugar in the pastries, please) and PRICE (Prices went up again this year; A meal deal would bring me back)"
    >
      <AiMark1 cx={L + 7} cy={18} s={16} fill={SIGNAL} />
      <Key x={L + 22} y={22}>CLUSTERED ON EMBEDDINGS</Key>
      <rect x={L - 8} y={T - 12} width={W + 16} height={H + 24} fill="none" stroke={RULE2} strokeWidth={1} />
      {TEXT_POINTS.map((p, i) => (
        <Person1 key={i} x={X(p.x)} y={r2(Y(p.y) + 8)} k={0.5} width={1.2} {...look[p.c]} />
      ))}

      <line x1={290} y1={10} x2={290} y2={308} stroke={RULE} strokeWidth={1} />
      <Eye x={306} y={6} size={24} weight="regular" color={INK} />
      <Key x={338} y={22}>READ AND NAMED</Key>
      {TEXT_CLUSTERS.map((g, i) => {
        const y = 62 + i * 86;
        return (
          <g key={g.name}>
            <Person1 x={318} y={y + 26} k={0.5} width={1.2} {...look[i]} />
            {g.texts.map((t, j) => (
              <Note key={j} x={340} y={y + 6 + j * 20} size={12.5} italic fill={INK2}>
                {`\u201c${t}\u201d`}
              </Note>
            ))}
            <Key x={340} y={y + 54} size={10.5} weight={700} fill={INK}>{`\u2192 ${g.name}`}</Key>
          </g>
        );
      })}
    </Frame>
  );
}
/* --------------------------------------------------------------------------
   AI-Generated Personas
   -------------------------------------------------------------------------- */

/** The segment's profile, and the generated persona's lines: each traced to a row, or to none. */
const PERSONA = [
  { data: "Median age: 31", line: "Maya, 31" },
  { data: "Visits before 8 a.m.: 72%", line: "Stops in before 8 a.m. on weekdays" },
  { data: "Orders in the app: 64%", line: "Orders ahead in the app" },
  { data: "Main answer theme: speed", line: "Wants breakfast in under five minutes" },
  { data: null, line: "Works as a nurse" },
  { data: null, line: "Mother of two" },
  { data: null, line: "\u201cI\u2019d pay anything to skip the line.\u201d" },
];

/**
 * Tracing a persona: on the left, the data describing a segment; on the
 * right, the persona a language model generated from it. Each supported
 * line is linked to the row it rests on; the occupation, the family
 * situation and the quotation rest on no data and are flagged.
 */
export function PersonaTrace() {
  const rowY = (i: number) => 74 + i * 34;
  const lx = 24;
  const lw = 222;
  const rx = 330;
  const rw = 330;
  return (
    <Frame
      width={680}
      height={322}
      label="A segment's data (median age 31; 72% visit before 8 a.m.; 64% order in the app; main answer theme speed) beside the persona a language model generated from it. Four persona lines trace to the data; the occupation (works as a nurse), the family situation (mother of two) and the quotation are not supported by any data"
    >
      <Key x={lx} y={26}>SEGMENT DATA</Key>
      <AiMark1 cx={rx + 8} cy={21} s={16} fill={INK} />
      <Key x={rx + 24} y={26}>GENERATED PERSONA</Key>
      <rect x={rx - 10} y={44} width={rw + 10} height={rowY(6) - 26} fill={PAPER} stroke={INK3} strokeWidth={1} />

      {PERSONA.map((p, i) => {
        const y = rowY(i);
        const ok = p.data !== null;
        return (
          <g key={i}>
            {ok ? (
              <>
                <line x1={lx} y1={y + 12} x2={lx + lw} y2={y + 12} stroke={RULE} strokeWidth={1} />
                <Note x={lx} y={y + 4} size={12.5} fill={INK}>{p.data}</Note>
                <line x1={lx + lw + 6} y1={y} x2={rx - 18} y2={y} stroke={SIGNAL} strokeWidth={1.5} />
                <circle cx={lx + lw + 6} cy={y} r={2.5} fill={SIGNAL} />
                <path d={head.right(rx - 16, y, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
              </>
            ) : (
              <Key x={rx - 18} y={y + 4} anchor="end" size={9.5} fill={COUNTER} weight={700}>NO DATA</Key>
            )}
            <Note
              x={rx + 6}
              y={y + 4}
              size={i === 0 ? 15 : 12.5}
              weight={i === 0 ? 600 : 400}
              italic={i === 6}
              fill={ok ? INK : COUNTER}
            >
              {p.line}
            </Note>
            {!ok ? (
              <line x1={rx + 4} y1={y + 9} x2={r2(rx + 8 + p.line.length * 5.8)} y2={y + 9} stroke={COUNTER} strokeWidth={1.25} strokeDasharray="3 2" />
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}
