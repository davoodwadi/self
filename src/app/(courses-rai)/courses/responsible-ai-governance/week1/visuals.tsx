"use client";

import React, { useState } from "react";
import { CENTRE_DASH, Fig, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";

/* ==========================================================================
   WEEK 01 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), FIG. lines in
   Caslon italic and one examiner's red for the finding. See the course
   CLAUDE.md.
   ========================================================================== */

const ink = { stroke: PAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: PAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/**
 * A flat sheet lying down (card, form, page): a parallelogram top face with a
 * thin stippled edge. (x, y) is the front-left corner; the far edge sits `d`
 * higher and `sk` to the right. `lines` sets hairline text rows on the face.
 */
function Sheet({
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

/**
 * Why market algorithms require governance (reference plate).
 * FIG. 1: a hand stamp over one card. FIG. 2: one rule bar drives five
 * plungers onto five cards; with the biased rule four cards take the red.
 */
export function ScalingRule() {
  const [mode, setMode] = useState<"biased" | "audited">("biased");
  const biased = mode === "biased";
  const id = "w1-scale";
  const cards = [322, 424, 526, 628, 730];

  return (
    <div>
      <Frame
        width={800}
        height={236}
        label={`Patent drawing in two figures. FIG. 1: a hand stamp comes down on one card, one decision at a time. FIG. 2: one bar labelled same decision rule drives five plungers down onto five cards at once, thousands of decisions per second; ${biased ? "with the biased rule, four of the five cards are marked in red" : "with the verified rule, all five cards stay plain"}.`}
      >
        <PatentDefs id={id} />

        {/* FIG. 1 — hand stamp over one card */}
        <ellipse cx={121} cy={52} rx={14} ry={6} fill={PAT.paper} {...ink} />
        <path d="M107 52C107 60 135 60 135 52V57C135 65 107 65 107 57Z" fill={stip(id, "light")} {...ink} />
        <path d="M116 63V102H126V63" fill={PAT.paper} {...ink} />
        <path d="M123.5 63.6V102H126V63.6Z" fill={stip(id, "dense")} />
        <ObliqueBox id={id} x={90} y={106} w={52} h={15} dx={10} dy={7} />
        <line x1={121} y1={126} x2={121} y2={156} {...hair} strokeDasharray={CENTRE_DASH} />
        <Sheet id={id} x={66} y={192} w={96} d={28} sk={22} t={5} lines={3} />
        <Fig x={121} y={226} n={1}>
          one decision at a time
        </Fig>

        <line x1={236} y1={22} x2={236} y2={206} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* FIG. 2 — one rule bar pressing five cards */}
        <ObliqueBox id={id} x={270} y={58} w={490} h={32} dx={15} dy={10} />
        <PatentKey x={515} y={78.5} size={13}>
          SAME DECISION RULE
        </PatentKey>
        {cards.map((c, i) => {
          const harmed = biased && i < 4;
          const px = c - 4;
          return (
            <g key={c}>
              <line x1={px - 2.5} y1={90} x2={px - 2.5} y2={124} {...ink} strokeWidth={1.1} />
              <line x1={px + 2.5} y1={90} x2={px + 2.5} y2={124} {...ink} strokeWidth={1.1} />
              <ObliqueBox id={id} x={px - 18} y={124} w={36} h={9} dx={6} dy={4} />
              <line x1={px} y1={137} x2={px} y2={160} {...hair} strokeDasharray={CENTRE_DASH} />
              <Sheet
                id={id}
                x={c - 50}
                y={198}
                w={74}
                d={28}
                sk={20}
                t={4}
                fill={harmed ? stip(id, "signal") : PAT.paper}
                stroke={harmed ? PAT.signal : PAT.ink}
                sw={harmed ? LINE.bold : LINE.outline}
                lines={harmed ? 0 : 2}
              />
            </g>
          );
        })}
        <Fig x={526} y={226} n={2}>
          thousands of decisions per second
        </Fig>
      </Frame>
      <Segmented
        label="Internal decision rule"
        options={[
          { id: "biased", label: "Biased rule (scales error)" },
          { id: "audited", label: "Verified rule (compliant)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Governance authority: a key switch with three positions (approve, restrict,
 * halt) on the model's housing; it turns only with the evidence dossier
 * standing in the slot beside it. The key stands at approve.
 */
export function GovernanceAuthority() {
  const id = "w1-auth";
  const cx = 178;
  const cy = 148;
  const stops = [
    { deg: -52, name: "APPROVE", anchor: "end" as const },
    { deg: 0, name: "RESTRICT", anchor: "middle" as const },
    { deg: 52, name: "HALT", anchor: "start" as const },
  ];
  const at = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [r2(cx + Math.sin(a) * r), r2(cy - Math.cos(a) * r)] as const;
  };
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: a key switch on a housing has three positions, approve, restrict and halt; the key is turned to approve. An evidence dossier stands in a slot in the top of the housing, and a hidden interlock, drawn dashed, runs from the slot to the switch."
    >
      <PatentDefs id={id} />

      {/* Housing */}
      <ObliqueBox id={id} x={70} y={84} w={236} h={112} dx={18} dy={11} />

      {/* Evidence dossier standing in its slot */}
      <path d="M232 82L239 77H305L298 82Z" fill={PAT.ink} />
      <ObliqueBox id={id} x={236} y={18} w={64} h={62} dx={8} dy={5} top={PAT.paper} />
      {[14.5, 16].map((y) => (
        <line key={y} x1={r2(236 + (18 - y) * 1.6)} y1={y} x2={r2(300 + (18 - y) * 1.6)} y2={y} {...hair} strokeWidth={0.45} />
      ))}
      <text x={268} y={34} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={8} letterSpacing="0.1em" fill={PAT.ink}>
        EVIDENCE
      </text>
      {[45, 53, 61, 69].map((y) => (
        <line key={y} x1={246} y1={y} x2={y === 69 ? 272 : 290} y2={y} {...hair} />
      ))}

      {/* Hidden interlock: the dossier in its slot frees the key */}
      <path d="M268 86V148H218" fill="none" {...hair} strokeDasharray="4 2.5" />
      <path d="M262 86H274M218 142V154" fill="none" {...hair} />

      {/* Key switch: dial ring, stops, plug and key */}
      <circle cx={cx} cy={cy} r={36} fill={stip(id, "light")} {...ink} />
      <circle cx={cx} cy={cy} r={29} fill={PAT.paper} {...ink} />
      {stops.map((s) => {
        const [x1, y1] = at(s.deg, 36);
        const [x2, y2] = at(s.deg, 42);
        const [tx, ty] = at(s.deg, 48);
        return (
          <g key={s.name}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} {...ink} />
            <PatentKey x={tx} y={r2(ty + (s.deg === 0 ? -1 : 4))} anchor={s.anchor} size={9}>
              {s.name}
            </PatentKey>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={10} fill={stip(id, "light")} {...ink} />
      <g transform={`rotate(-52 ${cx} ${cy})`}>
        {/* the key: shank in the plug, shoulders, and a flat head with its ring hole */}
        <path
          d={`M${cx - 3} ${cy + 3}V${cy - 10}H${cx - 6}V${cy - 14}H${cx - 10}Q${cx - 13} ${cy - 14} ${cx - 13} ${cy - 18}V${cy - 32}Q${cx - 13} ${cy - 38} ${cx - 7} ${cy - 38}H${cx + 7}Q${cx + 13} ${cy - 38} ${cx + 13} ${cy - 32}V${cy - 18}Q${cx + 13} ${cy - 14} ${cx + 10} ${cy - 14}H${cx + 6}V${cy - 10}H${cx + 3}V${cy + 3}Z`}
          fill={PAT.paper}
          {...ink}
          strokeWidth={LINE.bold}
        />
        <path d={`M${cx + 8} ${cy - 37}Q${cx + 12} ${cy - 36} ${cx + 12} ${cy - 32}V${cy - 18}Q${cx + 12} ${cy - 15} ${cx + 8} ${cy - 15}Z`} fill={stip(id, "dense")} />
        <circle cx={cx} cy={cy - 31} r={3} fill={PAT.paper} {...ink} />
        <line x1={cx - 8} y1={cy - 22} x2={cx + 6} y2={cy - 22} {...hair} />
      </g>
    </Frame>
  );
}

/** A spur gear outline: `n` square-ish teeth between radii r and r + tooth. */
function gearPath(cx: number, cy: number, r: number, n: number, tooth = 4, phase = 0) {
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
function Gear({ cx, cy, r, n, phase = 0 }: { cx: number; cy: number; r: number; n: number; phase?: number }) {
  return (
    <g>
      <path d={gearPath(cx, cy, r, n, 4, phase)} fill={PAT.paper} {...ink} />
      <circle cx={cx} cy={cy} r={r2(r * 0.32)} fill={PAT.paper} {...hair} />
      <circle cx={cx} cy={cy} r={2} fill={PAT.ink} />
    </g>
  );
}

/**
 * Ethics washing. FIG. 1: the decision machine and the decisions it puts out,
 * one of them harmful (red). FIG. 2: the same machine with a values plaque
 * bolted over its front; the decisions coming out are exactly the same.
 */
export function EthicsWashing() {
  const id = "w1-wash";
  const machine = (c: number, plaque: boolean) => (
    <g>
      <ObliqueBox id={id} x={c - 62} y={48} w={88} h={80} dx={12} dy={8} />
      {/* window onto the mechanism */}
      <circle cx={c - 18} cy={86} r={24} fill={stip(id, "light")} {...ink} />
      <Gear cx={c - 24} cy={80} r={11} n={9} />
      <Gear cx={c - 8} cy={98} r={8} n={7} phase={0.3} />
      {/* output slot and the decisions it puts out */}
      <path d={`M${c - 44} 122H${c + 8}`} {...ink} strokeWidth={LINE.bold} />
      <line x1={c - 18} y1={133} x2={c - 18} y2={150} {...hair} strokeDasharray={CENTRE_DASH} />
      {[0, 1, 2].map((k) => (
        <Chip key={k} id={id} x={c - 74 + k * 38} y={170} w={30} d={10} sk={12} red={k === 1} />
      ))}
      {plaque ? (
        <g>
          <ObliqueBox id={id} x={c - 68} y={58} w={94} h={56} dx={4} dy={3} />
          <text x={c - 21} y={77} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={11} letterSpacing="0.1em" fill={PAT.ink}>
            OUR VALUES
          </text>
          {[88, 96, 104].map((y) => (
            <line key={y} x1={c - 54} y1={y} x2={c + (y === 104 ? 0 : 12)} y2={y} {...hair} />
          ))}
          {[
            [c - 63, 63],
            [c + 21, 63],
            [c - 63, 109],
            [c + 21, 109],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill={PAT.paper} {...hair} />
          ))}
        </g>
      ) : null}
    </g>
  );
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing in two figures. FIG. 1: a decision machine, its gears seen through a window, puts out three decision cards, the middle one red. FIG. 2, ethics washing: the same machine with a plaque reading our values bolted over its front puts out exactly the same three cards, the middle one still red."
    >
      <PatentDefs id={id} />
      {machine(108, false)}
      <line x1={200} y1={20} x2={200} y2={180} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {machine(306, true)}
      <Fig x={100} y={200} n={1} size={11} />
      <Fig x={300} y={200} n={2} size={11}>
        ethics washing
      </Fig>
    </Frame>
  );
}

/**
 * A hand lens: a stippled rim around clear glass and a handle running out at
 * angle `a` (radians, 0 = right, positive = down). Children sit in the glass.
 */
function Lens({
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

const tick = (cx: number, cy: number, s: number) =>
  `M${r2(cx - s)} ${r2(cy)}L${r2(cx - s * 0.3)} ${r2(cy + s * 0.7)}L${r2(cx + s)} ${r2(cy - s * 0.8)}`;
const cross = (cx: number, cy: number, s: number) =>
  `M${r2(cx - s)} ${r2(cy - s)}L${r2(cx + s)} ${r2(cy + s)}M${r2(cx + s)} ${r2(cy - s)}L${r2(cx - s)} ${r2(cy + s)}`;

/**
 * Three lenses on the same deployment: consequentialism reads a pass,
 * deontology and virtue ethics read a fail; the conflicting verdicts are red.
 */
export function ThreeLenses() {
  const id = "w1-lens";
  return (
    <Frame
      width={800}
      height={210}
      label="Patent drawing: three hand lenses look at the same deployment, drawn as one housing; the consequentialism lens shows a tick, while the deontology and virtue ethics lenses show red crosses, conflicting conclusions about the same system."
    >
      <PatentDefs id={id} />

      {/* The same deployment */}
      <ObliqueBox id={id} x={334} y={112} w={132} h={70} dx={18} dy={12} />
      {[128, 141, 154, 167].map((y) => (
        <line key={y} x1={350} y1={y} x2={450} y2={y} {...hair} />
      ))}
      <PatentKey x={400} y={204} size={11}>
        SAME DEPLOYMENT
      </PatentKey>

      {/* Sight lines from each lens to the housing */}
      <line x1={196} y1={102} x2={326} y2={136} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={604} y1={102} x2={492} y2={128} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={408} y1={80} x2={408} y2={94} {...hair} strokeDasharray={CENTRE_DASH} />

      <Lens id={id} cx={154} cy={92} r={40} a={-2.55} handle={40}>
        <path d={tick(154, 92, 16)} fill="none" {...ink} strokeWidth={LINE.bold} />
      </Lens>
      <PatentKey x={154} y={156} size={11}>
        CONSEQUENTIALISM
      </PatentKey>

      <Lens id={id} cx={408} cy={46} r={30} a={-0.35} handle={32}>
        <path d={cross(408, 46, 10)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      </Lens>
      <PatentKey x={364} y={50} anchor="end" size={11}>
        DEONTOLOGY
      </PatentKey>

      <Lens id={id} cx={646} cy={92} r={40} a={-0.59} handle={40}>
        <path d={cross(646, 92, 13)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      </Lens>
      <PatentKey x={646} y={156} size={11}>
        VIRTUE ETHICS
      </PatentKey>
    </Frame>
  );
}

/**
 * Consequentialism and market welfare (SIMULATED). Welfare columns for four
 * segments stand on a zero datum, each as wide as its group; the aggregate
 * stands apart. Excluding the narrow minority segment from credit offers
 * lifts the three majority columns and the aggregate, while the minority
 * column drops below zero (red).
 */
export function WelfareTradeoff() {
  const [policy, setPolicy] = useState<"offer" | "exclude">("offer");
  const excluded = policy === "exclude";
  const id = "w1-welfare";
  const base = 138;
  const majority = [
    { x: 96, offer: 40, exclude: 62 },
    { x: 206, offer: 52, exclude: 78 },
    { x: 316, offer: 34, exclude: 56 },
  ];
  const minority = excluded ? -30 : 18;
  const total = majority.reduce((t, m) => t + (excluded ? m.exclude : m.offer), 0) + minority;
  const offerTotal = majority.reduce((t, m) => t + m.offer, 0) + 18;
  const k = 0.6;
  const u = 1;

  return (
    <div>
      <Frame
        width={800}
        height={206}
        label={`Patent drawing, simulated data: four segment welfare columns on a zero datum, each as wide as its group, with its people standing on top (three on each majority column, one on the minority column), and an aggregate column apart on the right. ${excluded ? `With the minority segment excluded from credit offers, the three majority columns rise, the aggregate rises from ${offerTotal} to ${total}, and the narrow minority column hangs below zero in red.` : `With credit offered to every segment, all four columns stand above zero and the aggregate is ${total}.`}`}
      >
        <PatentDefs id={id} />

        {/* Segments on the zero datum */}
        {minority < 0 ? (
          <ObliqueBox
            id={id}
            x={430}
            y={base + 8}
            w={36}
            h={r2(-minority * u)}
            dx={12}
            dy={8}
            front={stip(id, "signal")}
            top={PAT.paper}
            side={stip(id, "dense")}
            stroke={PAT.signal}
          />
        ) : null}
        <ObliqueBox id={id} x={60} y={base} w={440} h={8} dx={30} dy={18} />
        <PatentKey x={52} y={base + 7} anchor="end" size={10}>
          0
        </PatentKey>
        {majority.map((m) => {
          const h = r2((excluded ? m.exclude : m.offer) * u);
          return (
            <g key={m.x}>
              <ObliqueBox id={id} x={m.x} y={r2(base - 6 - h)} w={70} h={h} dx={12} dy={8} />
              {[18, 38, 58].map((f) => (
                <Figure key={f} id={id} x={m.x + f} y={r2(base - 9 - h)} s={0.5} />
              ))}
            </g>
          );
        })}
        {minority > 0 ? <ObliqueBox id={id} x={430} y={r2(base - 6 - minority * u)} w={36} h={r2(minority * u)} dx={12} dy={8} /> : null}
        <Figure id={id} x={452} y={minority > 0 ? r2(base - 9 - minority * u) : base - 9} s={0.5} stroke={excluded ? PAT.signal : PAT.ink} />
        <PatentKey x={422} y={base + 26} anchor="end" fill={excluded ? PAT.signal : PAT.ink} size={9.5}>
          MINORITY SEGMENT
        </PatentKey>

        <line x1={560} y1={16} x2={560} y2={184} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* The aggregate, apart */}
        <ObliqueBox id={id} x={600} y={base} w={150} h={8} dx={30} dy={18} />
        <ObliqueBox id={id} x={634} y={r2(base - 6 - total * k)} w={84} h={r2(total * k)} dx={12} dy={8} />
        {excluded ? (
          <path
            d={`M634 ${r2(base - 6 - offerTotal * k)}H718`}
            fill="none"
            {...hair}
            strokeDasharray="4 2.5"
          />
        ) : null}
        <text x={676} y={r2(base - 18 - total * k)} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={18} fill={PAT.ink}>
          {`+${total}`}
        </text>
        <PatentKey x={690} y={base + 40} size={10}>
          AGGREGATE OUTCOMES
        </PatentKey>

        <PatentKey x={60} y={198} anchor="start" size={9}>
          SIMULATED
        </PatentKey>
      </Frame>
      <Segmented
        label="Credit offers"
        options={[
          { id: "offer", label: "Offer credit to every segment" },
          { id: "exclude", label: "Exclude the minority segment" },
        ]}
        value={policy}
        onChange={setPolicy}
      />
    </div>
  );
}

/** A five-point star centred on (cx, cy). */
const star = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${r2(cx + rr * Math.cos(a))} ${r2(cy + rr * Math.sin(a))}`;
  });
  return `M${pts.join("L")}Z`;
};

/** A coil spring along x from x0 to x1 at height y. */
const spring = (x0: number, x1: number, y: number, n: number, amp: number) => {
  const step = (x1 - x0) / n;
  let d = `M${x0} ${y}`;
  for (let i = 0; i < n; i++) d += `L${r2(x0 + step * (i + 0.5))} ${r2(y + (i % 2 === 0 ? -amp : amp))}`;
  return `${d}L${x1} ${y}`;
};

/**
 * Deontology: a spring drives a rod carrying a fabricated five-star review
 * (red) toward the buyer; a deadbolt dropped into the rail stops it. Past the
 * bolt, a plain disclosure lies open for an informed choice.
 */
export function DeontologicalDuty() {
  const id = "w1-duty";
  return (
    <Frame
      width={800}
      height={215}
      label="Patent drawing: on a rail, a compressed spring drives a rod whose head carries a fabricated five-star review card in red; a deadbolt marked inviolable constraint is dropped into the rail and stops the card; beyond the bolt, a plain disclosure sheet lies open, marked informed consent."
    >
      <PatentDefs id={id} />

      {/* Rail */}
      <ObliqueBox id={id} x={40} y={156} w={700} h={14} dx={22} dy={13} />

      {/* Back plate and spring */}
      <ObliqueBox id={id} x={52} y={84} w={18} h={72} dx={10} dy={6} />
      <path d={spring(70, 176, 122, 12, 14)} fill="none" {...ink} />
      <line x1={176} y1={118} x2={312} y2={118} {...ink} />
      <line x1={176} y1={126} x2={312} y2={126} {...ink} />
      <line x1={176} y1={118} x2={176} y2={126} {...ink} />

      {/* Fabricated review on the rod head: the finding */}
      <ObliqueBox
        id={id}
        x={312}
        y={70}
        w={96}
        h={72}
        dx={10}
        dy={6}
        front={stip(id, "signal")}
        top={PAT.paper}
        stroke={PAT.signal}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={star(328 + i * 16, 98, 7)} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
      ))}
      <rect x={328} y={114} width={64} height={14} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.hair} />

      {/* Deadbolt dropped into the rail */}
      <ObliqueBox id={id} x={418} y={36} w={36} h={128} dx={12} dy={8} />
      <path d="M418 164H454" {...ink} strokeWidth={LINE.bold} />
      <PatentKey x={476} y={52} anchor="start" size={11}>
        INVIOLABLE CONSTRAINT
      </PatentKey>

      {/* Disclosure lying open beyond the bolt */}
      <Sheet id={id} x={560} y={146} w={130} d={44} sk={36} t={3} lines={4} />
      <PatentKey x={640} y={198} size={10.5}>
        INFORMED CONSENT
      </PatentKey>
    </Frame>
  );
}

/** Brick courses on a block's white front face. */
function Courses({ x, y, w, h, step = 16 }: { x: number; y: number; w: number; h: number; step?: number }) {
  const rows = Math.floor(h / step);
  return (
    <g>
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line key={`r${i}`} x1={x} y1={y + step * (i + 1)} x2={x + w} y2={y + step * (i + 1)} {...hair} />
      ))}
      {Array.from({ length: rows }, (_, i) => {
        const off = i % 2 === 0 ? w * 0.5 : w * 0.25;
        return [off, off + w * 0.5]
          .filter((xx) => xx < w - 4)
          .map((xx) => (
            <line key={`j${i}-${xx}`} x1={r2(x + xx)} y1={y + step * i} x2={r2(x + xx)} y2={y + step * (i + 1)} {...hair} />
          ));
      })}
    </g>
  );
}

/**
 * Virtue ethics. FIG. 1: two blocks of rule leave a gap, and a red hook is
 * threaded through it. FIG. 2: the same two piers joined by an arch and
 * keystone, a plumb line hanging true across the gap.
 */
export function VirtueCharacter() {
  const id = "w1-virtue";
  const pier = (x: number) => (
    <g>
      <ObliqueBox id={id} x={x} y={76} w={96} h={100} dx={14} dy={9} />
      <Courses x={x} y={76} w={96} h={100} step={20} />
    </g>
  );
  return (
    <Frame
      width={800}
      height={215}
      label="Patent drawing in two figures. FIG. 1: two masonry blocks stand apart and a red hook is threaded down through the gap between them, exploiting loopholes in disclosure rules. FIG. 2: the same two piers are joined by an arch with a keystone, and a plumb line hangs straight down from the keystone into the gap, for trustworthiness, honesty and care."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — a hook threaded through the gap between two rules */}
      {pier(56)}
      {pier(222)}
      <path
        d="M209 18V150C209 166 189 166 189 152"
        fill="none"
        stroke={PAT.signal}
        strokeWidth={LINE.bold}
        strokeLinecap="round"
      />
      <path d="M189 152L185 160M189 152L195 158" fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <line x1={40} y1={176} x2={352} y2={176} {...hair} />
      <Fig x={200} y={204} n={1}>
        exploit loopholes in disclosure rules
      </Fig>

      <line x1={400} y1={22} x2={400} y2={186} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — the same piers joined by an arch, a plumb line hanging true */}
      {pier(456)}
      {pier(622)}
      {/* Arch over the gap, keystone at its crown */}
      <path d="M535 76A52 52 0 0 1 639 76H622A35 35 0 0 0 552 76Z" fill={PAT.paper} {...ink} />
      <path d="M615.32 55.43L629.07 45.44M603.43 45.1L611.41 30.09M570.57 45.1L562.59 30.09M558.68 55.43L544.93 45.44" fill="none" {...hair} />
      <path d="M582.13 41.34L591.87 41.34L598.07 19.07L575.93 19.07Z" fill={stip(id, "light")} {...ink} />
      <line x1={587} y1={41} x2={587} y2={140} {...hair} />
      <path d="M587 140L593 148L587 162L581 148Z" fill={stip(id, "dense")} {...ink} />
      <line x1={440} y1={176} x2={752} y2={176} {...hair} />
      <Fig x={600} y={204} n={2}>
        trustworthiness, honesty, and care
      </Fig>
    </Frame>
  );
}

/** A stack of `n` coins standing on (cx, y): white rims, a light-stippled cap. */
function Coins({ id, cx, y, n, rx = 15, ry = 5, h = 5 }: { id: string; cx: number; y: number; n: number; rx?: number; ry?: number; h?: number }) {
  const top = y - n * h;
  return (
    <g>
      <path
        d={`M${r2(cx - rx)} ${top}V${y}A${rx} ${ry} 0 0 0 ${r2(cx + rx)} ${y}V${top}Z`}
        fill={PAT.paper}
        {...ink}
      />
      {Array.from({ length: n - 1 }, (_, i) => (
        <path
          key={i}
          d={`M${r2(cx - rx)} ${y - (i + 1) * h}A${rx} ${ry} 0 0 0 ${r2(cx + rx)} ${y - (i + 1) * h}`}
          fill="none"
          {...hair}
        />
      ))}
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={stip(id, "light")} {...ink} />
    </g>
  );
}

/** A hanging scale pan: three cords from (cx, hookY) to a shallow dish at y. */
function Pan({ id, cx, hookY, y, w = 50 }: { id: string; cx: number; hookY: number; y: number; w?: number }) {
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
 * Consequentialist evaluation: a beam balance; coins of benefit weigh the
 * left pan down, the harm (red) rides up on the right.
 */
export function Consequentialism() {
  const id = "w1-conseq";
  const L = { x: 96, y: 74 };
  const R = { x: 304, y: 46 };
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: a beam balance on a stand; two stacks of coins marked benefits weigh the left pan down, while a small red weight marked harms rides up on the right pan."
    >
      <PatentDefs id={id} />

      {/* Stand */}
      <ObliqueBox id={id} x={160} y={176} w={80} h={14} dx={14} dy={9} />
      <path d="M194 176V64H206V176" fill={PAT.paper} {...ink} />
      <path d="M202 64.5V176H206V64.5Z" fill={stip(id, "dense")} />

      {/* Beam, tilted down to the left */}
      <path d={`M${L.x} ${L.y - 3}L${R.x} ${R.y - 3}L${R.x} ${R.y + 3}L${L.x} ${L.y + 3}Z`} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
      <circle cx={200} cy={60} r={5} fill={PAT.paper} {...ink} />
      <circle cx={200} cy={60} r={1.6} fill={PAT.ink} />

      {/* Left pan: benefits */}
      <Pan id={id} cx={L.x} hookY={L.y + 3} y={148} w={84} />
      <Coins id={id} cx={86} y={147} n={6} rx={9} ry={3} h={5} />
      <Coins id={id} cx={106} y={147} n={4} rx={9} ry={3} h={5} />
      <PatentKey x={L.x} y={190} size={10}>
        BENEFITS
      </PatentKey>

      {/* Right pan: harms */}
      <Pan id={id} cx={R.x} hookY={R.y + 3} y={112} w={64} />
      <ObliqueBox id={id} x={292} y={98} w={20} h={13} dx={6} dy={4} front={stip(id, "signal")} top={PAT.paper} stroke={PAT.signal} />
      <PatentKey x={R.x} y={150} fill={PAT.signal} size={10}>
        HARMS
      </PatentKey>
    </Frame>
  );
}

/**
 * Deontological evaluation: a signed and sealed agreement torn in two; the
 * tear (the breached duty) is red.
 */
export function Deontology() {
  const id = "w1-deon";
  const top = 24;
  const bot = 190;
  const n = 12;
  const tearAt = (y: number) => 206 - ((y - top) / (bot - top)) * 14;
  const zig = Array.from({ length: n + 1 }, (_, i) => {
    const y = top + ((bot - top) * i) / n;
    return [r2(tearAt(y) + (i % 2 === 0 ? 0 : 7)), r2(y)] as const;
  });
  const down = zig.map(([x, y]) => `L${x} ${y}`).join("");
  const up = [...zig].reverse().map(([x, y]) => `L${x} ${y}`).join("");
  const rows = [46, 60, 74, 88, 102, 116, 130];
  const shift = "translate(16 6) rotate(4 290 190)";
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: a signed agreement with a seal, its text in rows, torn top to bottom into two halves that have pulled apart; the torn edges are red."
    >
      <PatentDefs id={id} />

      {/* Left half */}
      <path d={`M104 ${top}${down}L104 ${bot}Z`} fill={PAT.paper} {...ink} />
      {rows.map((y, i) => (
        <line key={y} x1={120} y1={y} x2={r2(tearAt(y) - (i === 0 ? 30 : 10))} y2={y} {...hair} strokeWidth={i === 0 ? LINE.outline : LINE.hair} />
      ))}
      <path d="M120 168C130 156 136 176 146 164C152 158 156 170 166 162" fill="none" {...ink} />
      <line x1={118} y1={174} x2={180} y2={174} {...hair} />
      <path d={`M${zig[0][0]} ${zig[0][1]}${down}`} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" />

      {/* Right half, pulled away */}
      <g transform={shift}>
        <path d={`M${zig[0][0]} ${top}L296 ${top}L296 ${bot}${up.replace(/^L/, "L")}Z`} fill={PAT.paper} {...ink} />
        {rows.map((y, i) => (
          <line key={y} x1={r2(tearAt(y) + 14)} y1={y} x2={i === 0 ? 250 : 280} y2={y} {...hair} strokeWidth={i === 0 ? LINE.outline : LINE.hair} />
        ))}
        <circle cx={256} cy={162} r={17} fill={stip(id, "light")} {...ink} />
        <circle cx={256} cy={162} r={11} fill={PAT.paper} {...hair} />
        <path d={star(256, 162, 6)} fill="none" {...hair} />
        <path d={`M${zig[n][0]} ${zig[n][1]}${up}`} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

/**
 * Virtue-ethical evaluation: the institution as a classical front, its steps
 * cut with trustworthy, honest, responsible.
 */
export function VirtueEthics() {
  const id = "w1-virt";
  const cols = [98, 150, 202, 254];
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: a classical institution front with pediment, entablature and four fluted columns on two steps; the lower step reads trustworthy, honest, responsible."
    >
      <PatentDefs id={id} />

      {/* Steps */}
      <ObliqueBox id={id} x={56} y={165} w={268} h={18} dx={14} dy={9} />
      <ObliqueBox id={id} x={72} y={151} w={236} h={14} dx={14} dy={9} />
      <PatentKey x={190} y={178} size={8.5}>
        TRUSTWORTHY · HONEST · RESPONSIBLE
      </PatentKey>

      {/* Pediment and entablature */}
      <path d="M72 58L190 20L308 58Z" fill={PAT.paper} {...ink} />
      <path d="M190 20L204 11L322 49L308 58Z" fill={stip(id, "light")} {...ink} />
      <path d="M96 52L190 30L284 52Z" fill="none" {...hair} />
      <ObliqueBox id={id} x={72} y={58} w={236} h={16} dx={14} dy={9} top={PAT.paper} />

      {/* Columns */}
      {cols.map((x) => (
        <g key={x}>
          <rect x={x - 4} y={74} width={36} height={7} fill={PAT.paper} {...ink} />
          <rect x={x} y={81} width={28} height={66} fill={PAT.paper} {...ink} />
          {[7, 14, 21].map((f) => (
            <line key={f} x1={x + f} y1={84} x2={x + f} y2={144} {...hair} />
          ))}
          <path d={`M${x + 21} 81.5H${x + 27.5}V146.5H${x + 21}Z`} fill={stip(id, "dense")} />
        </g>
      ))}

    </Frame>
  );
}

/**
 * A house in oblique projection: white front with a gable, stippled side,
 * a pitched roof running back. (x, y) is the front face's bottom-left.
 */
function House({ id, x, y, w = 50, h = 34, dx = 14, dy = 9, roof = 20 }: { id: string; x: number; y: number; w?: number; h?: number; dx?: number; dy?: number; roof?: number }) {
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
function Tag({ cx, cy, text, red = false, w = 54 }: { cx: number; cy: number; text: string; red?: boolean; w?: number }) {
  const c = red ? PAT.signal : PAT.ink;
  const x0 = r2(cx - w / 2);
  return (
    <g>
      <path
        d={`M${x0} ${cy - 10}H${r2(cx + w / 2)}V${cy + 10}H${x0}L${r2(x0 - 9)} ${cy}Z`}
        fill={PAT.paper}
        stroke={c}
        strokeWidth={red ? LINE.bold : LINE.outline}
        strokeLinejoin="round"
      />
      <circle cx={r2(x0 - 2)} cy={cy} r={1.8} fill="none" stroke={c} strokeWidth={LINE.hair} />
      <text x={r2(cx + 2)} y={cy + 4.5} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={13} fill={c}>
        {text}
      </text>
    </g>
  );
}

/**
 * The loan-pricing case: identical houses on either side of a postal-code
 * boundary; the same loan is quoted 6.2% on one side and 11.8% (red) on the
 * other.
 */
export function LoanWide() {
  const id = "w1-loan";
  const left = [92, 194, 296];
  const right = [470, 572, 674];
  return (
    <Frame
      width={800}
      height={166}
      label="Patent drawing in plan view: a strip of ground divided by a postal-code boundary line; three identical houses on each side; each house on the postal code A side carries a 6.2% rate tag, each house on the postal code B side carries an 11.8% rate tag in red."
    >
      <PatentDefs id={id} />
      <g transform="translate(0 -46)">

      {/* Ground and boundary */}
      <path d="M36 186L76 126H776L736 186Z" fill={stip(id, "light")} {...ink} />
      <line x1={400} y1={186} x2={440} y2={126} {...ink} strokeWidth={LINE.bold} strokeDasharray={CENTRE_DASH} />

      {left.map((x) => (
        <g key={x}>
          <House id={id} x={x} y={174} w={62} h={40} roof={24} />
          <line x1={x + 31} y1={108} x2={x + 31} y2={84} {...hair} />
          <Tag cx={x + 31} cy={72} text="6.2%" />
        </g>
      ))}
      {right.map((x) => (
        <g key={x}>
          <House id={id} x={x} y={174} w={62} h={40} roof={24} />
          <line x1={x + 31} y1={108} x2={x + 31} y2={84} stroke={PAT.signal} strokeWidth={LINE.hair} />
          <Tag cx={x + 31} cy={72} text="11.8%" red />
        </g>
      ))}

      <PatentKey x={228} y={204} size={10.5}>
        POSTAL CODE A
      </PatentKey>
      <PatentKey x={598} y={204} size={10.5}>
        POSTAL CODE B
      </PatentKey>
      </g>
    </Frame>
  );
}

/**
 * Part 2: an exploded view of one AI system pulled apart into the four
 * stages different organizations own (built, trained, deployed, used); a
 * red fault runs through every layer, owned by none.
 */
export function FragmentedChain() {
  const id = "w1-chain";
  const layers = [
    { y: 56, name: "USED", mark: "diamond" },
    { y: 102, name: "DEPLOYED", mark: "square" },
    { y: 148, name: "TRAINED", mark: "triangle" },
    { y: 194, name: "BUILT", mark: "circle" },
  ];
  const x = 220;
  const w = 380;
  const dx = 70;
  const dy = 26;
  const h = 10;
  const crack = (y: number) => {
    const f = [0, 0.2, 0.4, 0.6, 0.8, 1];
    const jog = [0, 7, -5, 8, -4, 0];
    return `M${f.map((t, i) => `${r2(452 + dx * t + jog[i])} ${r2(y - dy * t)}`).join("L")}`;
  };
  const mark = (kind: string, cx: number, cy: number) => {
    const p = { fill: stip(id, "light"), ...ink };
    if (kind === "circle") return <ellipse cx={cx} cy={cy} rx={11} ry={6} {...p} />;
    if (kind === "triangle") return <path d={`M${cx - 12} ${cy + 5}L${cx + 4} ${cy - 7}L${cx + 12} ${cy + 5}Z`} {...p} />;
    if (kind === "square") return <path d={`M${cx - 12} ${cy + 5}L${cx - 4} ${cy - 5}H${cx + 12}L${cx + 4} ${cy + 5}Z`} {...p} />;
    return <path d={`M${cx - 13} ${cy}L${cx} ${cy - 7}L${cx + 13} ${cy}L${cx} ${cy + 7}Z`} {...p} />;
  };
  return (
    <Frame
      width={800}
      height={214}
      label="Patent drawing, exploded view: one AI system pulled apart along centre lines into four stacked layers, labelled from bottom to top built, trained, deployed and used; each layer carries a different maker's mark, and a red crack runs through the same place in every layer."
    >
      <PatentDefs id={id} />

      {/* Centre lines the layers were pulled apart along */}
      {[x + 24, x + w - 24, x + dx + 24, x + w + dx - 24].map((cx, i) => (
        <line key={cx} x1={cx} y1={i < 2 ? 44 : 16} x2={cx} y2={i < 2 ? 210 : 182} {...hair} strokeDasharray={CENTRE_DASH} />
      ))}

      {[...layers].reverse().map((l) => (
        <g key={l.name}>
          <ObliqueBox id={id} x={x} y={l.y} w={w} h={h} dx={dx} dy={dy} top={PAT.paper} />
          {mark(l.mark, x + 70, l.y - 13)}
          <path d={crack(l.y)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" strokeLinecap="round" />
          <path d={`M452 ${l.y}L457 ${l.y + 5}L451 ${l.y + h}`} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" strokeLinecap="round" />
          <line x1={202} y1={l.y + 5} x2={212} y2={l.y + 5} {...hair} />
          <PatentKey x={194} y={l.y + 9} anchor="end" size={11}>
            {l.name}
          </PatentKey>
        </g>
      ))}
    </Frame>
  );
}

/**
 * A person as a patent figure, standing with feet at (x, y), facing right
 * (`flip` faces left). Clean outline, light stipple on the coat, dense on the
 * trousers. `arm`: "down" at the side, "reach" held forward, "raise" lifted,
 * "lift" both arms up.
 */
function Figure({
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
function Detail({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke={PAT.ink} strokeWidth={LINE.hair} strokeDasharray="6 3" />;
}

/** A patent reference numeral with its curved leader line to the part. */
function Numeral({ n, x, y, tx, ty, bold = false }: { n: number | string; x: number; y: number; tx: number; ty: number; bold?: boolean }) {
  const sy = ty < y - 6 ? y - 15 : y + 4;
  const mx = r2((x + tx) / 2 + 8);
  const my = r2((sy + ty) / 2 - 4);
  return (
    <g>
      <path d={`M${x} ${sy}Q${mx} ${my} ${tx} ${ty}`} fill="none" {...hair} />
      <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-heading)" fontStyle="italic" fontSize={bold ? 17 : 14} fontWeight={bold ? 700 : 400} fill={PAT.ink}>
        {n}
      </text>
    </g>
  );
}

/**
 * The AI value chain: five parts numbered as in the slide's list: (1) the
 * foundation model's weight drum, (2) the deploying firm's housing with a
 * prompt card in its slot, (3) the platform's ranked rack, (4) the consumer,
 * and (5) the regulator's lens on a stand over the chain. Choosing an actor
 * rings its part with a detail circle.
 */
export function ValueChainFiveActors() {
  const [stage, setStage] = useState<"all" | "1" | "2" | "3" | "4" | "5">("all");
  const id = "w1-five";
  const rings: Record<string, [number, number, number]> = {
    "1": [104, 116, 62],
    "2": [252, 122, 58],
    "3": [398, 116, 58],
    "4": [530, 106, 64],
    "5": [690, 92, 66],
  };
  const ring = stage === "all" ? null : rings[stage];
  const names: Record<string, string> = {
    all: "",
    "1": " The foundation model developer's weight drum is ringed.",
    "2": " The deploying firm's housing is ringed.",
    "3": " The platform's ranked rack is ringed.",
    "4": " The consumer is ringed.",
    "5": " The regulator's lens is ringed.",
  };
  return (
    <div>
      <Frame
        width={800}
        height={210}
        label={`Patent drawing of the AI value chain with reference numerals: 1, a drum of model weights; 2, a deploying firm's housing with a prompt card in its slot; 3, a platform rack holding ranked listings; 4, a consumer receiving the result; 5, a regulator's lens on a stand looking over the chain.${names[stage]}`}
      >
        <PatentDefs id={id} />

        {/* Base the chain stands on */}
        <ObliqueBox id={id} x={50} y={166} w={560} h={10} dx={18} dy={10} />

        {/* Flow between the parts */}
        {[
          [150, 200],
          [304, 344],
          [452, 500],
        ].map(([a, b]) => (
          <g key={a}>
            <line x1={a} y1={124} x2={b - 2} y2={124} {...hair} strokeDasharray={CENTRE_DASH} />
            <path d={`M${b - 8} 120L${b} 124L${b - 8} 128`} fill="none" {...hair} />
          </g>
        ))}

        {/* 1 — weight drum */}
        <path d="M66 82V150A38 11 0 0 0 142 150V82Z" fill={PAT.paper} {...ink} />
        <path d="M128 90.3V158.3A38 11 0 0 0 142 150V82A38 11 0 0 1 128 90.3Z" fill={stip(id, "dense")} />
        {[104, 126].map((y) => (
          <path key={y} d={`M66 ${y}A38 11 0 0 0 142 ${y}`} fill="none" {...hair} />
        ))}
        <ellipse cx={104} cy={82} rx={38} ry={11} fill={stip(id, "light")} {...ink} />
        <ellipse cx={104} cy={82} rx={12} ry={3.5} fill={PAT.paper} {...ink} />

        {/* 2 — deploying firm's housing with a prompt card in its slot */}
        <ObliqueBox id={id} x={206} y={98} w={92} h={66} dx={14} dy={9} />
        <path d="M232 92L244 84V60L232 68Z" fill={stip(id, "dense")} {...ink} />
        <rect x={232} y={68} width={40} height={26} fill={PAT.paper} {...ink} />
        {[75, 81, 87].map((y) => (
          <line key={y} x1={238} y1={y} x2={266} y2={y} {...hair} />
        ))}
        <path d="M228 94H276" {...ink} strokeWidth={LINE.bold} />

        {/* 3 — platform rack of ranked listings */}
        <ObliqueBox id={id} x={350} y={62} w={96} h={102} dx={14} dy={9} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={360} y={74 + i * 30} width={76} height={22} fill={PAT.paper} {...ink} />
            <text x={370} y={89 + i * 30} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={11} fill={PAT.ink}>
              {i + 1}
            </text>
            <line x1={380} y1={82 + i * 30} x2={426} y2={82 + i * 30} {...hair} />
            <line x1={380} y1={89 + i * 30} x2={414} y2={89 + i * 30} {...hair} />
          </g>
        ))}

        {/* 4 — the consumer, taking the result */}
        <Figure id={id} x={548} y={162} s={1.4} arm="reach" flip />
        <path d="M486 90L498 84H516L504 90Z" fill={PAT.paper} {...ink} />

        {/* 5 — regulator's lens on a stand, over the chain */}
        <path d="M748 176V40H742V176" fill={PAT.paper} {...ink} />
        <ObliqueBox id={id} x={724} y={176} w={44} h={10} dx={10} dy={6} />
        <line x1={742} y1={46} x2={706} y2={64} {...ink} strokeWidth={LINE.bold} />
        <Lens id={id} cx={686} cy={86} r={26} a={-0.9} handle={4} />

        {/* Reference numerals */}
        <Numeral n={1} x={64} y={40} tx={84} ty={72} bold={stage === "1"} />
        <Numeral n={2} x={208} y={40} tx={234} ty={66} bold={stage === "2"} />
        <Numeral n={3} x={352} y={36} tx={368} ty={56} bold={stage === "3"} />
        <Numeral n={4} x={596} y={40} tx={562} ty={58} bold={stage === "4"} />
        <Numeral n={5} x={652} y={30} tx={672} ty={62} bold={stage === "5"} />

        {ring ? <Detail cx={ring[0]} cy={ring[1]} r={ring[2]} /> : null}
      </Frame>
      <Segmented
        label="Inspect value-chain actor"
        options={[
          { id: "all", label: "All 5 actors" },
          { id: "1", label: "01 Developer" },
          { id: "2", label: "02 Deploying firm" },
          { id: "3", label: "03 Platform" },
          { id: "4", label: "04 Consumer" },
          { id: "5", label: "05 Regulator" },
        ]}
        value={stage}
        onChange={setStage}
      />
    </div>
  );
}

/**
 * The problem of many hands. Blame: the model developer and the deploying
 * retailer point at each other's part (the drum of weights, the prompt card)
 * while the consumer holds the biased outcome (red). Accountable: the
 * retailer turns to the consumer, joined by a line marked accountable.
 */
export function ManyHands() {
  const [mode, setMode] = useState<"blame" | "accountable">("blame");
  const blame = mode === "blame";
  const id = "w1-hands";
  const red = { stroke: PAT.signal, strokeWidth: LINE.bold, fill: "none", strokeLinecap: "round" as const };
  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing: a model developer stands by a drum of weights, a deploying retailer stands by a housing with a prompt card, and a consumer holds a red card for the biased outcome. ${blame ? "The developer points at the retailer's prompt card and the retailer points back at the developer's drum: two red arrows cross, and no one takes the outcome." : "The retailer turns to the consumer; a line marked accountable joins the retailer to the consumer's outcome."}`}
      >
        <PatentDefs id={id} />
        <line x1={40} y1={190} x2={760} y2={190} {...hair} />

        {/* Model developer by the drum of weights */}
        <path d="M66 108V178A32 9 0 0 0 130 178V108Z" fill={PAT.paper} {...ink} />
        <path d="M118 114.8V184.8A32 9 0 0 0 130 178V108A32 9 0 0 1 118 114.8Z" fill={stip(id, "dense")} />
        {[132, 156].map((y) => (
          <path key={y} d={`M66 ${y}A32 9 0 0 0 130 ${y}`} fill="none" {...hair} />
        ))}
        <ellipse cx={98} cy={108} rx={32} ry={9} fill={stip(id, "light")} {...ink} />
        <Figure id={id} x={190} y={189} s={1.55} arm={blame ? "reach" : "down"} />

        {/* Deploying retailer by the housing and its prompt card */}
        <ObliqueBox id={id} x={312} y={124} w={86} h={65} dx={14} dy={9} />
        <path d="M336 118L348 110V88L336 96Z" fill={stip(id, "dense")} {...ink} />
        <rect x={336} y={96} width={38} height={24} fill={PAT.paper} {...ink} />
        {[103, 109, 115].map((y) => (
          <line key={y} x1={341} y1={y} x2={369} y2={y} {...hair} />
        ))}
        <Figure id={id} x={482} y={189} s={1.55} arm="reach" flip={blame} />

        {/* Consumer holding the biased outcome */}
        <Figure id={id} x={712} y={189} s={1.55} arm="reach" flip />
        <path d="M628 108L642 100H664L650 108Z" fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" />

        {blame ? (
          <g>
            <path d="M240 98Q300 36 352 84" {...red} />
            <path d={headAlongPath(352, 84, 52, 48)} {...red} />
            <path d="M434 98Q280 -14 112 94" {...red} />
            <path d={headAlongPath(112, 94, -168, 108)} {...red} />
          </g>
        ) : (
          <g>
            <line x1={532} y1={104} x2={630} y2={104} {...ink} strokeWidth={LINE.bold} />
            <circle cx={532} cy={104} r={2.4} fill={PAT.ink} />
            <circle cx={630} cy={104} r={2.4} fill={PAT.ink} />
            <PatentKey x={581} y={92} size={10.5}>
              ACCOUNTABLE
            </PatentKey>
          </g>
        )}
      </Frame>
      <Segmented
        label="Governance state"
        options={[
          { id: "blame", label: "Problem of many hands (mutual blame)" },
          { id: "accountable", label: "Accountable governance (deployer liable)" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/** An open arrowhead at (x, y) pointing along (dx, dy). */
function headAlongPath(x: number, y: number, dx: number, dy: number, s = 9) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  return `M${r2(bx - uy * s * 0.55)} ${r2(by + ux * s * 0.55)}L${x} ${y}L${r2(bx + uy * s * 0.55)} ${r2(by - ux * s * 0.55)}`;
}

/** A round dial with a needle at `deg` (0 = straight up), on a white face. */
function Dial({ cx, cy, r, deg }: { cx: number; cy: number; r: number; deg: number }) {
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

/**
 * Allocating accountability: one artefact per stakeholder. FIG. 1 the
 * developer's tabbed model documentation; FIG. 2 the deploying firm's
 * console with one dial per customer segment; FIG. 3 the platform's ranked
 * listings with the sponsored slot tagged; FIG. 4 the auditor's stamp of
 * independent verification.
 */
export function AccountabilityDossiers() {
  const id = "w1-dossier";
  return (
    <Frame
      width={800}
      height={210}
      label="Patent drawing in four figures. FIG. 1: a tabbed binder of model documentation. FIG. 2: a monitoring console with three dials, one per customer segment. FIG. 3: a panel of ranked listings whose top slot carries a sponsored tag. FIG. 4: an audit stamp lifted above a page it has marked verified."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — model documentation */}
      <ObliqueBox id={id} x={58} y={56} w={78} h={108} dx={14} dy={9} />
      {[66, 98, 130].map((y) => (
        <path key={y} d={`M136 ${y}L150 ${y - 9}V${y + 9}L136 ${y + 18}Z`} fill={PAT.paper} {...ink} />
      ))}
      <line x1={70} y1={76} x2={124} y2={76} {...ink} />
      {[90, 98, 106, 114, 122, 130].map((y) => (
        <line key={y} x1={70} y1={y} x2={y % 16 === 0 ? 112 : 124} y2={y} {...hair} />
      ))}
      <rect x={70} y={140} width={54} height={14} fill="none" {...hair} />
      <Fig x={100} y={196} n={1} size={11}>
        model documentation
      </Fig>

      {/* FIG. 2 — one dial per customer segment */}
      <ObliqueBox id={id} x={234} y={84} w={132} h={66} dx={14} dy={9} />
      <Dial cx={260} cy={116} r={18} deg={-35} />
      <Dial cx={300} cy={116} r={18} deg={10} />
      <Dial cx={340} cy={116} r={18} deg={40} />
      {[260, 300, 340].map((x) => (
        <line key={x} x1={x - 10} y1={142} x2={x + 10} y2={142} {...hair} />
      ))}
      <Fig x={300} y={196} n={2} size={11}>
        monitoring outcomes
      </Fig>

      {/* FIG. 3 — ranked listings, the sponsored slot tagged */}
      <ObliqueBox id={id} x={444} y={52} w={112} h={112} dx={14} dy={9} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={454} y={62 + i * 33} width={92} height={26} fill={PAT.paper} {...ink} />
          <rect x={460} y={68 + i * 33} width={14} height={14} fill={stip(id, "light")} {...hair} />
          <line x1={480} y1={71 + i * 33} x2={i === 0 ? 490 : 536} y2={71 + i * 33} {...hair} />
          <line x1={480} y1={79 + i * 33} x2={524} y2={79 + i * 33} {...hair} />
        </g>
      ))}
      <rect x={494} y={64} width={50} height={11} fill={PAT.paper} {...ink} />
      <text x={519} y={72.2} textAnchor="middle" fontFamily="var(--font-body)" fontSize={6.6} letterSpacing="0.04em" fill={PAT.ink}>
        SPONSORED
      </text>
      <Fig x={500} y={196} n={3} size={11}>
        sponsorship disclosures
      </Fig>

      {/* FIG. 4 — the auditor's stamp, independent verification */}
      <ellipse cx={700} cy={36} rx={11} ry={5} fill={PAT.paper} {...ink} />
      <path d="M689 36C689 42 711 42 711 36V40C711 46 689 46 689 40Z" fill={stip(id, "light")} {...ink} />
      <path d="M696 45V70H704V45" fill={PAT.paper} {...ink} />
      <ObliqueBox id={id} x={676} y={72} w={44} h={12} dx={8} dy={5} />
      <line x1={700} y1={88} x2={700} y2={108} {...hair} strokeDasharray={CENTRE_DASH} />
      <Sheet id={id} x={636} y={164} w={110} d={44} sk={28} t={4} />
      <ellipse cx={704} cy={142} rx={33} ry={14} fill="none" {...ink} />
      <ellipse cx={704} cy={142} rx={28} ry={11} fill="none" {...hair} />
      <text x={704} y={145} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={8} letterSpacing="0.08em" fill={PAT.ink}>
        VERIFIED
      </text>
      <Fig x={700} y={196} n={4} size={11}>
        independent verification
      </Fig>
    </Frame>
  );
}

/** A pennant flag on a short pole, pole foot at (x, y). */
function Flag({ id, x, y, red = false }: { id: string; x: number; y: number; red?: boolean }) {
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

/**
 * Discussion case: two claim forms with identical loss lines, one written by
 * a native and one by a non-native English speaker, pass through the licensed
 * model; the native claim draws one fraud flag, the non-native claim two
 * (red).
 */
export function InsuranceClaims() {
  const id = "w1-claims";
  const form = (y: number) => (
    <g>
      <ObliqueBox id={id} x={30} y={y} w={74} h={50} dx={8} dy={5} />
      <line x1={38} y1={y + 10} x2={78} y2={y + 10} {...ink} />
      {[18, 25, 32].map((d) => (
        <line key={d} x1={38} y1={y + d} x2={96} y2={y + d} {...hair} />
      ))}
      <rect x={70} y={y + 37} width={26} height={8} fill="none" {...hair} />
    </g>
  );
  return (
    <Frame
      width={400}
      height={215}
      label="Patent drawing: two claim forms with identical lines, marked native and non-native, pass through one licensed model housing; the native claim comes out with one fraud flag, the non-native claim with two red flags, twice the rate."
    >
      <PatentDefs id={id} />

      {form(40)}
      <PatentKey x={70} y={110} size={9}>
        NATIVE
      </PatentKey>
      {form(128)}
      <PatentKey x={70} y={198} size={9}>
        NON-NATIVE
      </PatentKey>

      {/* Licensed model */}
      <line x1={114} y1={64} x2={160} y2={92} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={114} y1={152} x2={160} y2={136} {...hair} strokeDasharray={CENTRE_DASH} />
      <ObliqueBox id={id} x={162} y={72} w={76} h={84} dx={14} dy={9} />
      <Gear cx={192} cy={104} r={11} n={9} />
      <Gear cx={216} cy={128} r={9} n={8} phase={0.25} />
      <line x1={254} y1={92} x2={292} y2={64} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={254} y1={136} x2={292} y2={152} {...hair} strokeDasharray={CENTRE_DASH} />

      {/* Flags out */}
      <Flag id={id} x={304} y={88} />
      <Display1 x={372} y={80} text="1×" />
      <Flag id={id} x={300} y={176} red />
      <Flag id={id} x={326} y={176} red />
      <Display1 x={372} y={168} text="2×" red />
    </Frame>
  );
}

/** A quantity set large in Caslon on the plate (a rate, a multiple). */
function Display1({ x, y, text, red = false, size = 20 }: { x: number; y: number; text: string; red?: boolean; size?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={size} fill={red ? PAT.signal : PAT.ink}>
      {text}
    </text>
  );
}

/**
 * Part 3: the benchmark gap. FIG. 1: the model stands first on a leaderboard
 * podium under a glass bell jar. FIG. 2: the same model laid as a span
 * between two banks of a real market, cracking (red) under load.
 */
export function BenchmarkGap() {
  const id = "w1-gap";
  return (
    <Frame
      width={800}
      height={215}
      label="Patent drawing in two figures. FIG. 1: a model block stands on the first-place step of a leaderboard podium, sealed under a glass bell jar, for technical benchmark performance. FIG. 2: the same model block set on a bridge span between two banks, which cracks in red at mid-span, for a real market setting."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — podium under a bell jar */}
      <ellipse cx={200} cy={170} rx={118} ry={12} fill={stip(id, "light")} {...ink} />
      <ObliqueBox id={id} x={108} y={128} w={52} h={40} dx={10} dy={6} />
      <ObliqueBox id={id} x={232} y={140} w={52} h={28} dx={10} dy={6} />
      <ObliqueBox id={id} x={160} y={108} w={72} h={60} dx={10} dy={6} />
      {[
        [134, 152, "2"],
        [196, 146, "1"],
        [258, 158, "3"],
      ].map(([x, y, n]) => (
        <text key={n} x={x} y={y} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={16} fill={PAT.ink}>
          {n}
        </text>
      ))}
      <ObliqueBox id={id} x={182} y={78} w={28} h={24} dx={8} dy={5} />
      <path d="M94 170V78C94 20 306 20 306 78V170" fill="none" {...ink} />
      <path d="M110 112V80C110 48 140 36 164 32" fill="none" {...hair} />
      <ellipse cx={200} cy={34} rx={12} ry={4} fill={PAT.paper} {...ink} />
      <Fig x={200} y={204} n={1} size={11.5}>
        technical benchmark performance
      </Fig>

      <line x1={400} y1={20} x2={400} y2={190} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — the same model as a span over a real market, cracking */}
      <ObliqueBox id={id} x={430} y={110} w={96} h={70} dx={18} dy={11} />
      <ObliqueBox id={id} x={646} y={110} w={110} h={70} dx={18} dy={11} />
      {/* span: two halves sagging at a mid-span crack */}
      <path d="M500 104L586 112L588 124L500 116Z" fill={PAT.paper} {...ink} />
      <path d="M500 104L508 99L594 107L586 112Z" fill={stip(id, "light")} {...ink} />
      <path d="M592 112L676 104V116L594 124Z" fill={PAT.paper} {...ink} />
      <path d="M598 107L684 99L676 104L592 112Z" fill={stip(id, "light")} {...ink} />
      <path d="M586 112L590 106L588 118L592 112L590 124" fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" strokeLinecap="round" />
      {/* the same model block, now carrying market load */}
      <ObliqueBox id={id} x={542} y={84} w={28} h={24} dx={8} dy={5} />
      <Fig x={600} y={204} n={2} size={11.5}>
        a real market setting
      </Fig>
    </Frame>
  );
}

/**
 * Probabilistic outputs (SIMULATED): a pin board drops the same prompt again
 * and again; each run lands one ball in a brand's bin. Students add runs and
 * flip the framing baffle; the most-chosen bin (red) reverses with framing.
 */
export function ProbabilisticRuns() {
  const [runs, setRuns] = useState(24);
  const [framing, setFraming] = useState<"standard" | "shifted">("standard");
  const id = "w1-runs";

  // Deterministic shares for the two framings so server and client match.
  const shares = framing === "standard" ? [0.58, 0.27, 0.15] : [0.18, 0.24, 0.58];
  const counts = [
    Math.max(runs === 1 ? (framing === "standard" ? 1 : 0) : Math.round(runs * shares[0]), 0),
    runs === 1 ? 0 : Math.round(runs * shares[1]),
    0,
  ];
  counts[2] = Math.max(0, runs - counts[0] - counts[1]);
  const top = counts.indexOf(Math.max(...counts));
  const bins = [268, 400, 532];
  const brand = ["BRAND A", "BRAND B", "BRAND C"];
  const pegs: [number, number][] = [];
  for (let i = 0; i < 6; i++) for (let j = 0; j <= i; j++) pegs.push([r2(400 + (j - i / 2) * 40), 58 + i * 11]);
  const tilt = framing === "standard" ? -1 : 1;

  return (
    <div>
      <Frame
        width={800}
        height={222}
        label={`Patent drawing, simulated data: a hopper drops the same prompt onto a board of pins, past a framing baffle tilted ${framing === "standard" ? "left" : "right"}; after ${runs} repeated runs the balls lie in three brand bins, ${counts[0]} in brand A, ${counts[1]} in brand B and ${counts[2]} in brand C; the most-chosen bin, brand ${"ABC"[top]}, is red.`}
      >
        <PatentDefs id={id} />

        {/* Hopper and framing baffle */}
        <path d="M372 14H428L406 34V42H394V34Z" fill={PAT.paper} {...ink} />
        <path d="M406 34L428 14H436L412 36Z" fill={stip(id, "dense")} {...ink} />
        <line x1={r2(400 - 14)} y1={r2(48 - 4 * tilt)} x2={r2(400 + 14)} y2={r2(48 + 4 * tilt)} {...ink} strokeWidth={LINE.bold} />
        <circle cx={400} cy={48} r={1.8} fill={PAT.ink} />

        {/* Pin board */}
        <path d="M268 54H532L556 122H244Z" fill="none" {...hair} />
        {pegs.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={2.4} fill={PAT.paper} {...ink} />
        ))}

        {/* Bins, front cut away to show the balls */}
        {bins.map((bx, b) => {
          const n = counts[b];
          const hot = b === top && n > 0;
          return (
            <g key={bx}>
              <line x1={bx - 32} y1={124} x2={bx - 32} y2={132} {...hair} strokeDasharray="2 2" />
              <line x1={bx + 32} y1={124} x2={bx + 32} y2={132} {...hair} strokeDasharray="2 2" />
              <rect x={bx - 32} y={132} width={64} height={69} fill={stip(id, "light")} />
              <path d={`M${bx + 32} 132L${bx + 40} 127V196L${bx + 32} 201Z`} fill={stip(id, "dense")} {...ink} />
              <path d={`M${bx - 32} 132V201H${bx + 32}V132`} fill="none" {...ink} />
              {Array.from({ length: n }, (_, k) => {
                const row = Math.floor(k / 5);
                const col = k % 5;
                return (
                  <circle
                    key={k}
                    cx={bx - 24 + col * 12}
                    cy={194 - row * 11}
                    r={5.2}
                    fill={hot ? stip(id, "signal") : PAT.paper}
                    stroke={hot ? PAT.signal : PAT.ink}
                    strokeWidth={LINE.outline}
                  />
                );
              })}
              <text x={bx + 50} y={196} fontFamily="var(--font-heading)" fontSize={13} fill={hot ? PAT.signal : PAT.ink}>
                {n}
              </text>
              <PatentKey x={bx} y={216} size={9.5}>
                {brand[b]}
              </PatentKey>
            </g>
          );
        })}
        <PatentKey x={612} y={216} anchor="start" size={9}>
          SIMULATED
        </PatentKey>
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider label="Repeated runs" value={runs} min={1} max={30} onChange={setRuns} />
        <Segmented
          label="Framing"
          options={[
            { id: "standard", label: "Framing A (Slot 1 favored)" },
            { id: "shifted", label: "Framing B (choice reverses)" },
          ]}
          value={framing}
          onChange={setFraming}
        />
      </div>
    </div>
  );
}

/**
 * Four ways benchmark accuracy fails. FIG. 1 a square peg over a round hole;
 * FIG. 2 one sampled bar standing in front of the hidden distribution (red,
 * dashed); FIG. 3 a commercial prompt card in the slot swings the needle into
 * the red band; FIG. 4 test sheets leaking into the training stack. Choosing a
 * mode rings its figure with a detail circle.
 */
export function BenchmarkFailures() {
  const [focus, setFocus] = useState<"all" | "1" | "2" | "3" | "4">("all");
  const id = "w1-fail";
  const rings: Record<string, number> = { "1": 100, "2": 300, "3": 500, "4": 700 };
  const redLine = { stroke: PAT.signal, strokeWidth: LINE.bold, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const arcPt = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return `${r2(500 + Math.cos(a) * r)} ${r2(130 + Math.sin(a) * r)}`;
  };
  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing in four figures. FIG. 1, construct mismatch: a square peg marked trivia hangs over a round hole marked credit. FIG. 2, single-sample fragility: one sampled bar stands in front of a hidden distribution drawn in dashed red. FIG. 3, prompt sensitivity: a commercial prompt card in a gauge's slot swings its needle into the red band. FIG. 4, benchmark contamination: sheets from the test stack leak along a red path into the training stack.${focus === "all" ? "" : ` Figure ${focus} is ringed.`}`}
      >
        <PatentDefs id={id} />

        {/* FIG. 1 — construct mismatch */}
        <ObliqueBox id={id} x={74} y={50} w={46} h={34} dx={10} dy={6} />
        <PatentKey x={98} y={70} size={7}>
          TRIVIA
        </PatentKey>
        <line x1={97} y1={90} x2={97} y2={118} {...hair} strokeDasharray={CENTRE_DASH} />
        <ObliqueBox id={id} x={46} y={140} w={104} h={14} dx={24} dy={16} top={PAT.paper} />
        <ellipse cx={110} cy={132} rx={20} ry={5} fill={stip(id, "dense")} {...ink} />
        <PatentKey x={98} y={172} size={8}>
          CREDIT
        </PatentKey>
        <Fig x={100} y={202} n={1} size={11}>
          construct mismatch
        </Fig>

        {/* FIG. 2 — single-sample fragility */}
        {[
          [252, 70],
          [272, 92],
          [312, 104],
          [332, 80],
        ].map(([x, h]) => (
          <rect key={x} x={x} y={160 - h} width={16} height={h} fill="none" stroke={PAT.signal} strokeWidth={LINE.hair} strokeDasharray="3 2" />
        ))}
        <ObliqueBox id={id} x={290} y={112} w={18} h={48} dx={6} dy={4} />
        <path d={tick(299, 98, 6)} fill="none" {...ink} strokeWidth={LINE.bold} />
        <line x1={240} y1={160} x2={360} y2={160} {...ink} />
        <Fig x={300} y={202} n={2} size={11}>
          single-sample fragility
        </Fig>

        {/* FIG. 3 — prompt sensitivity */}
        <ObliqueBox id={id} x={456} y={84} w={88} h={80} dx={12} dy={8} />
        <path d="M486 80L496 72V44L486 52Z" fill={stip(id, "dense")} {...ink} />
        <rect x={486} y={52} width={30} height={28} fill={PAT.paper} {...ink} />
        {[59, 65, 71].map((y) => (
          <line key={y} x1={490} y1={y} x2={512} y2={y} {...hair} />
        ))}
        <path d={`M${arcPt(-60, 30)}A30 30 0 0 1 ${arcPt(60, 30)}`} fill="none" {...hair} />
        <path d={`M${arcPt(25, 30)}A30 30 0 0 1 ${arcPt(60, 30)}`} {...redLine} strokeWidth={3} strokeLinecap="butt" />
        <line x1={500} y1={130} x2={r2(500 + Math.sin((45 * Math.PI) / 180) * 26)} y2={r2(130 - Math.cos((45 * Math.PI) / 180) * 26)} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
        <circle cx={500} cy={130} r={2.4} fill={PAT.ink} />
        <Fig x={500} y={202} n={3} size={11}>
          prompt sensitivity
        </Fig>

        {/* FIG. 4 — benchmark contamination */}
        <ObliqueBox id={id} x={624} y={126} w={50} h={34} dx={20} dy={14} top={PAT.paper} />
        {[134, 142, 150].map((y) => (
          <line key={y} x1={624} y1={y} x2={674} y2={y} {...hair} />
        ))}
        <PatentKey x={649} y={176} size={8}>
          TEST
        </PatentKey>
        <ObliqueBox id={id} x={708} y={112} w={58} h={48} dx={20} dy={14} top={PAT.paper} />
        {[120, 128, 136, 144, 152].map((y) => (
          <line key={y} x1={708} y1={y} x2={766} y2={y} {...hair} />
        ))}
        <PatentKey x={737} y={176} size={8}>
          TRAIN
        </PatentKey>
        <path d="M660 112Q686 62 728 92" {...redLine} />
        <path d={headAlongPath(728, 92, 42, 30, 8)} {...redLine} />
        <path d="M672 84L684 78H700L688 84Z" fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
        <Fig x={700} y={202} n={4} size={11}>
          benchmark contamination
        </Fig>

        {focus !== "all" ? <Detail cx={rings[focus]} cy={106} r={78} /> : null}
      </Frame>
      <Segmented
        label="Failure mode"
        options={[
          { id: "all", label: "All 4 modes" },
          { id: "1", label: "1. Construct mismatch" },
          { id: "2", label: "2. Single-sample fragility" },
          { id: "3", label: "3. Prompt sensitivity" },
          { id: "4", label: "4. Contamination" },
        ]}
        value={focus}
        onChange={setFocus}
      />
    </div>
  );
}

/**
 * The six stages as one pipeline, numbered as in the slide's list: (1) a
 * stepped risk-tier gauge, (2) a sieve drum for the data, (3) a test chamber
 * with an inspection window, (4) a gate valve with a hand wheel, (5) the
 * sign-off stamp, (6) a strip-chart monitor whose trace breaks the threshold
 * (red) and sends a rollback line back to stage 3. Choosing a stage rings it.
 */
export function SixStages() {
  const [stage, setStage] = useState<"all" | "1" | "2" | "3" | "4" | "5" | "6">("all");
  const id = "w1-six";
  const xs = [90, 210, 330, 450, 570, 690];
  const holes: [number, number][] = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) holes.push([194 + i * 11, 124 + j * 9]);
  const trace = "M662 138L670 134L678 140L686 130L694 136";
  const spike = "M694 136L700 100L706 140";
  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing of the six stages as one pipeline with reference numerals: 1, a stepped risk-tier gauge; 2, a sieve drum the data passes through; 3, a test chamber with an inspection window; 4, a gate valve with a hand wheel; 5, a stamp over a seal pad for sign-off; 6, a strip-chart monitor whose trace spikes over the threshold in red, sending a rollback line back to stage 3.${stage === "all" ? "" : ` Stage ${stage} is ringed.`}`}
      >
        <PatentDefs id={id} />

        {/* Pipeline */}
        <path d="M24 135H776M24 145H776" fill="none" {...ink} />
        <path d="M776 135L784 140L776 145" fill="none" {...ink} />

        {/* 1 — stepped risk-tier gauge */}
        <ObliqueBox id={id} x={60} y={130} w={20} h={30} dx={8} dy={5} />
        <ObliqueBox id={id} x={80} y={110} w={20} h={50} dx={8} dy={5} />
        <ObliqueBox id={id} x={100} y={90} w={20} h={70} dx={8} dy={5} />
        <path d="M90 92L86 84H94Z" fill={PAT.ink} />
        <line x1={90} y1={76} x2={90} y2={84} {...hair} />

        {/* 2 — sieve drum */}
        <path d="M188 112H234A8 28 0 0 1 234 168H188" fill={PAT.paper} {...ink} />
        <ellipse cx={188} cy={140} rx={8} ry={28} fill={stip(id, "light")} {...ink} />
        {holes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} fill={PAT.paper} {...hair} />
        ))}

        {/* 3 — test chamber with window */}
        <ObliqueBox id={id} x={298} y={96} w={64} h={64} dx={12} dy={8} />
        <circle cx={330} cy={128} r={16} fill={stip(id, "light")} {...ink} />
        <circle cx={330} cy={128} r={11} fill={PAT.paper} {...hair} />

        {/* 4 — gate valve and hand wheel */}
        <ObliqueBox id={id} x={430} y={114} w={40} h={46} dx={10} dy={6} />
        <line x1={450} y1={108} x2={450} y2={78} {...ink} strokeWidth={LINE.bold} />
        <ellipse cx={450} cy={74} rx={20} ry={6} fill="none" {...ink} />
        <line x1={430} y1={74} x2={470} y2={74} {...hair} />
        <line x1={450} y1={68} x2={450} y2={80} {...hair} />

        {/* 5 — sign-off stamp over a seal pad */}
        <ellipse cx={570} cy={74} rx={9} ry={4} fill={PAT.paper} {...ink} />
        <path d="M566 78V98H574V78" fill={PAT.paper} {...ink} />
        <ObliqueBox id={id} x={552} y={100} w={36} h={10} dx={7} dy={4} />
        <line x1={570} y1={113} x2={570} y2={124} {...hair} strokeDasharray={CENTRE_DASH} />
        <ObliqueBox id={id} x={548} y={130} w={44} h={18} dx={8} dy={5} />

        {/* 6 — strip-chart monitor; the trace breaks the threshold */}
        <ObliqueBox id={id} x={652} y={88} w={76} h={72} dx={12} dy={8} />
        <rect x={658} y={96} width={64} height={52} fill={PAT.paper} {...hair} />
        <line x1={658} y1={112} x2={722} y2={112} {...hair} strokeDasharray="4 2" />
        <path d={trace} fill="none" {...ink} />
        <path d={spike} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" strokeLinecap="round" />
        <path d="M706 140L716 134" fill="none" {...hair} />

        {/* Rollback line from 6 back to 3 */}
        <path d="M690 76V34H330V80" fill="none" {...ink} strokeWidth={LINE.bold} />
        <path d={headAlongPath(330, 84, 0, 1, 8)} fill="none" {...ink} strokeWidth={LINE.bold} />
        <PatentKey x={510} y={26} size={10}>
          ROLLBACK
        </PatentKey>

        {/* Reference numerals */}
        {xs.map((x, i) => (
          <Numeral key={x} n={i + 1} x={x - 14} y={196} tx={x} ty={164} bold={stage === String(i + 1)} />
        ))}

        {stage !== "all" ? <Detail cx={xs[Number(stage) - 1]} cy={124} r={56} /> : null}
      </Frame>
      <Segmented
        label="Governance stage"
        options={[
          { id: "all", label: "All 6 stages" },
          { id: "1", label: "01 Scoping" },
          { id: "2", label: "02 Data" },
          { id: "3", label: "03 Audit" },
          { id: "4", label: "04 Oversight" },
          { id: "5", label: "05 Sign-off" },
          { id: "6", label: "06 Monitor" },
        ]}
        value={stage}
        onChange={setStage}
      />
    </div>
  );
}

/** A small card lying flat at (x, y), front-left corner; red for the finding. */
function Chip({ id, x, y, red = false, w = 22, d = 7, sk = 8 }: { id: string; x: number; y: number; red?: boolean; w?: number; d?: number; sk?: number }) {
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

/**
 * Part 4: authority shared between the algorithm and a human reviewer. The
 * algorithm's housing sends a stream of cases up a conveyor into a funnel
 * over the reviewer's desk; the funnel's neck passes one case at a time, and
 * the excess spills over the rim (red): the cognitive limits of the reviewer.
 */
export function SharedAuthority() {
  const id = "w1-shared";
  const belt = (t: number) => [r2(176 + t * 196), r2(108 - t * 58)] as const;
  return (
    <Frame
      width={800}
      height={210}
      label="Patent drawing: an algorithm's housing, its gears shown in a cutaway, sends a stream of case cards up a conveyor into a funnel over a reviewer's desk; the funnel's narrow neck passes one card at a time to the reviewer standing at the desk, while excess cards spill over the rim in red, marked cognitive limits."
    >
      <PatentDefs id={id} />
      <g transform="translate(76 0)">
      <line x1={40} y1={190} x2={640} y2={190} {...hair} />

      {/* Algorithm housing, cut away */}
      <ObliqueBox id={id} x={60} y={86} w={110} h={104} dx={14} dy={9} />
      <path d="M74 100H150L156 108L148 116L156 124L148 132L156 140L148 148L156 156L148 164L156 172L150 176H74Z" fill={stip(id, "light")} {...ink} />
      <Gear cx={104} cy={128} r={18} n={12} />
      <Gear cx={134} cy={156} r={10} n={8} phase={0.2} />

      {/* Conveyor of cases */}
      <path d={`M170 112L${belt(1)[0]} ${belt(1)[1] + 4}M170 104L${belt(1)[0]} ${belt(1)[1] - 4}`} fill="none" {...ink} />
      {[0.1, 0.3, 0.5, 0.7, 0.88].map((t) => (
        <Chip key={t} id={id} x={belt(t)[0] - 10} y={belt(t)[1] - 4} />
      ))}

      {/* Funnel over the desk */}
      <ellipse cx={420} cy={52} rx={44} ry={9} fill={stip(id, "dense")} {...ink} />
      <path d="M376 52L412 104H428L464 52A44 9 0 0 1 376 52Z" fill={PAT.paper} {...ink} />
      <path d="M412 104V112H428V104" fill={PAT.paper} {...ink} />

      {/* The spill: cognitive limits */}
      <Chip id={id} x={352} y={70} red />
      <Chip id={id} x={340} y={104} red w={20} />
      <Chip id={id} x={348} y={140} red />
      <Chip id={id} x={330} y={188} red />
      <Chip id={id} x={356} y={188} red />
      <PatentKey x={420} y={28} fill={PAT.signal} size={10.5}>
        COGNITIVE LIMITS
      </PatentKey>

      {/* Desk and the one case on it */}
      <ObliqueBox id={id} x={384} y={134} w={100} h={8} dx={18} dy={10} />
      <line x1={392} y1={142} x2={392} y2={190} {...ink} />
      <line x1={476} y1={142} x2={476} y2={190} {...ink} />
      <Chip id={id} x={410} y={130} />

      {/* Reviewer */}
      <Figure id={id} x={540} y={189} s={1.45} arm="reach" flip />
      </g>
    </Frame>
  );
}

/* The three oversight regimes share one conveyor of cases, so the column
   plates differ only in where the human stands. */

/** The regime conveyor: a belt running right, cards lying on it at `at` (x positions). */
function Belt({ id, at, x0 = 26, x1 = 356, arrow = true }: { id: string; at: number[]; x0?: number; x1?: number; arrow?: boolean }) {
  return (
    <g>
      <ObliqueBox id={id} x={x0} y={166} w={x1 - x0} h={10} dx={20} dy={14} />
      {arrow ? (
        <g>
          <path d={`M${x1 + 26} 160L${x1 + 36} 166L${x1 + 26} 172`} fill="none" {...hair} />
          <line x1={x1 + 22} y1={166} x2={x1 + 34} y2={166} {...hair} />
        </g>
      ) : null}
      {at.map((x) => (
        <Chip key={x} id={id} x={x} y={162} w={26} d={9} sk={11} />
      ))}
    </g>
  );
}

/** Human-in-the-loop: a gate across the belt holds each case until the reviewer lifts its lever. */
export function InTheLoop() {
  const id = "w1-in";
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: cases on a conveyor queue at a closed gate across the belt; a reviewer standing behind the belt holds the gate's lever, so each case waits for approval before it can pass."
    >
      <PatentDefs id={id} />
      <Belt id={id} at={[48, 104, 160]} x1={296} />
      <Figure id={id} x={360} y={177} s={1.25} arm="raise" flip />
      {/* gate across the belt, and its lever */}
      <ObliqueBox id={id} x={206} y={104} w={10} h={62} dx={20} dy={14} />
      <line x1={226} y1={92} x2={320} y2={74} {...ink} strokeWidth={LINE.bold} />
      <circle cx={322} cy={73} r={5} fill={PAT.paper} {...ink} />
    </Frame>
  );
}

/** Human-on-the-loop: cases run on unchecked; the operator watches a dashboard with a stop switch to hand. */
export function OnTheLoop() {
  const id = "w1-on";
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: cases run continuously along a conveyor; behind it an operator watches a dashboard screen showing a live trace and keeps one hand on a stop switch, able to intervene or shut the system down."
    >
      <PatentDefs id={id} />
      {/* dashboard on a stand */}
      <line x1={196} y1={96} x2={196} y2={150} {...ink} />
      <ObliqueBox id={id} x={146} y={36} w={100} h={60} dx={10} dy={6} />
      <rect x={154} y={44} width={84} height={44} fill={PAT.paper} {...hair} />
      <path d="M158 76L172 70L184 74L196 60L208 66L220 56L234 62" fill="none" {...ink} />
      {/* stop switch on its post */}
      <line x1={312} y1={112} x2={312} y2={150} {...ink} />
      <path d="M300 112A12 6 0 0 1 324 112V106A12 6 0 0 0 300 106Z" fill={stip(id, "dense")} {...ink} />
      <ellipse cx={312} cy={106} rx={12} ry={6} fill={PAT.paper} {...ink} />
      <Belt id={id} at={[40, 96, 152, 208, 256]} x1={296} />
      <Figure id={id} x={362} y={177} s={1.25} arm="reach" flip />
    </Frame>
  );
}

/**
 * Fully autonomous: cases run on between two guard rails (the pre-programmed
 * constraints) with no one at the belt; their record lands in a log on a
 * lectern, read later through a hand lens (the periodic post-hoc audit).
 */
export function Autonomous() {
  const id = "w1-auto";
  const posts = [50, 136, 222, 308];
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: cases run continuously along a conveyor between two guard rails, the pre-programmed constraints, with no person at the belt; past the end of the belt an open log book lies on a lectern under a hand lens, for the periodic post-hoc audit."
    >
      <PatentDefs id={id} />
      {/* far guard rail on posts */}
      {posts.map((x) => (
        <line key={x} x1={x} y1={126} x2={x} y2={152} {...ink} />
      ))}
      <ObliqueBox id={id} x={44} y={122} w={270} h={6} dx={4} dy={2.5} />
      <PatentKey x={180} y={112} size={9}>
        CONSTRAINTS
      </PatentKey>
      <Belt id={id} at={[]} x1={296} />
      {[44, 100, 156, 212, 260].map((x) => (
        <Chip key={x} id={id} x={x} y={159} w={26} d={8} sk={10} />
      ))}
      {/* near guard rail along the front edge */}
      <ObliqueBox id={id} x={26} y={162} w={270} h={5} dx={4} dy={2.5} />

      {/* log on a lectern, audited after the fact */}
      <line x1={354} y1={128} x2={354} y2={186} {...ink} />
      <ObliqueBox id={id} x={334} y={186} w={40} h={6} dx={6} dy={4} />
      <Sheet id={id} x={322} y={126} w={52} d={28} sk={10} t={5} lines={3} />
      <Lens id={id} cx={348} cy={74} r={15} a={-0.75} handle={16} />
    </Frame>
  );
}

/**
 * Failure modes of human oversight. FIG. 1: the reviewer's case stack grows
 * with the caseload; at a light load a lens sits over the top case, past 30
 * cases an hour the stamp comes down on cases unread (red). FIG. 2: a person
 * holds up the whole automated system, a moral crumple zone (red).
 */
export function OversightFailures() {
  const [casesPerHour, setCasesPerHour] = useState(100);
  const overloaded = casesPerHour > 30;
  const id = "w1-crumple";
  const sheets = Math.max(2, Math.round(casesPerHour / 10));
  const h = sheets * 7;
  const top = 176 - h;
  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing in two figures. FIG. 1, rubber-stamping: at ${casesPerHour} cases an hour the reviewer's stack is ${sheets} cases high; ${overloaded ? "a stamp comes down on the top case unread, and the stamped case is red" : "a hand lens sits over the top case for careful review, the stamp set aside"}. FIG. 2, moral crumple zones: a single person in red holds up a large automated system above their head.`}
      >
        <PatentDefs id={id} />

        {/* FIG. 1 — case stack, lens or stamp */}
        <line x1={50} y1={176} x2={340} y2={176} {...hair} />
        <ObliqueBox id={id} x={90} y={top} w={110} h={h} dx={34} dy={22} top={overloaded ? stip(id, "signal") : PAT.paper} stroke={PAT.ink} />
        {overloaded ? <path d={`M${90} ${top}L124 ${top - 22}H234L200 ${top}Z`} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinejoin="round" /> : null}
        {Array.from({ length: sheets - 1 }, (_, i) => (
          <line key={i} x1={90} y1={top + (i + 1) * 7} x2={200} y2={top + (i + 1) * 7} {...hair} strokeWidth={0.4} />
        ))}
        {overloaded ? (
          <g>
            <line x1={162} y1={top - 70} x2={162} y2={top - 48} {...hair} strokeDasharray={CENTRE_DASH} />
            <ellipse cx={162} cy={top - 44} rx={11} ry={5} fill={PAT.paper} {...ink} />
            <path d={`M158 ${top - 40}V${top - 24}H166V${top - 40}`} fill={PAT.paper} {...ink} />
            <ObliqueBox id={id} x={140} y={top - 22} w={44} h={10} dx={8} dy={5} />
          </g>
        ) : (
          <g>
            <Lens id={id} cx={164} cy={top - 30} r={18} a={-0.6} handle={22} />
            <ellipse cx={280} cy={146} rx={11} ry={5} fill={PAT.paper} {...ink} />
            <path d="M276 150V164H284V150" fill={PAT.paper} {...ink} />
            <ObliqueBox id={id} x={258} y={166} w={44} h={10} dx={8} dy={5} />
          </g>
        )}
        <PatentKey x={300} y={40} size={10}>
          {`${casesPerHour} CASES / HR`}
        </PatentKey>
        <Fig x={195} y={204} n={1} size={11.5}>
          rubber-stamping
        </Fig>

        <line x1={400} y1={20} x2={400} y2={190} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* FIG. 2 — one person holding up the whole system */}
        <line x1={440} y1={176} x2={770} y2={176} {...hair} />
        <ObliqueBox id={id} x={494} y={34} w={196} h={64} dx={22} dy={14} />
        <path d="M506 44H676L682 52L674 60L682 68L674 76L682 84L676 90H506Z" fill={stip(id, "light")} {...ink} />
        <Gear cx={540} cy={67} r={14} n={10} />
        <Gear cx={576} cy={70} r={10} n={8} phase={0.2} />
        <Gear cx={612} cy={66} r={14} n={10} phase={0.1} />
        <Gear cx={648} cy={70} r={10} n={8} />
        <Figure id={id} x={592} y={175} s={0.92} arm="lift" stroke={PAT.signal} />
        <Fig x={600} y={204} n={2} size={11.5}>
          moral crumple zones
        </Fig>
      </Frame>
      <Slider label="Reviewer caseload (cases / hr)" value={casesPerHour} min={10} max={120} step={10} onChange={setCasesPerHour} />
    </div>
  );
}

/**
 * Matching oversight to decision risk, in three figures. FIG. 1: one mortgage
 * (a house on its deed, red: the severe, hard-to-reverse harm) waits at a
 * closed gate whose lever a reviewer holds. FIG. 2: a stream of transactions
 * runs on a belt wired to a knife-switch circuit breaker. FIG. 3: a webpage
 * carousel reorders its tiles on its own while a hand lens samples it.
 */
export function DecisionRiskRegimes() {
  const id = "w1-risk";
  return (
    <Frame
      width={800}
      height={182}
      label="Patent drawing in three figures. FIG. 1, high-stakes, low-frequency: a single mortgage case, a house on its deed drawn in red, waits at a closed gate whose lever a reviewer holds. FIG. 2, medium-stakes, high-frequency: a stream of transaction cards runs along a belt under a monitor whose trace runs below a dashed threshold, and the belt is wired to a breaker box with a throw lever. FIG. 3, low-stakes, high-velocity: a webpage carousel swaps its tiles on its own while a hand lens looks over it for periodic auditing."
    >
      <PatentDefs id={id} />
      <g transform="translate(0 -34)">

      {/* FIG. 1 — one mortgage held at the reviewer's gate */}
      <line x1={24} y1={176} x2={256} y2={176} {...hair} />
      <Sheet id={id} x={34} y={170} w={84} d={26} sk={22} t={4} fill={stip(id, "signal")} stroke={PAT.signal} sw={LINE.bold} />
      <House id={id} x={64} y={160} w={40} h={28} roof={16} dx={10} dy={6} />
      <ObliqueBox id={id} x={150} y={92} w={10} h={80} dx={16} dy={10} />
      <line x1={168} y1={84} x2={198} y2={60} {...ink} strokeWidth={LINE.bold} />
      <circle cx={200} cy={58} r={4.5} fill={PAT.paper} {...ink} />
      <Figure id={id} x={230} y={175} s={1.32} arm="raise" flip />
      <Fig x={140} y={204} n={1} size={11}>
        high-stakes, low-frequency
      </Fig>

      <line x1={272} y1={20} x2={272} y2={190} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — a stream of transactions, a monitor over it, a breaker at its end */}
      <line x1={384} y1={124} x2={384} y2={152} {...ink} />
      <ObliqueBox id={id} x={334} y={64} w={100} h={60} dx={10} dy={6} />
      <rect x={342} y={72} width={84} height={44} fill={PAT.paper} {...hair} />
      <line x1={342} y1={84} x2={426} y2={84} {...hair} strokeDasharray="4 2.5" />
      <path d="M346 104L358 98L370 102L382 92L394 98L406 90L420 96" fill="none" {...ink} />
      <Belt id={id} at={[296, 336, 376, 416]} x0={288} x1={456} arrow={false} />
      {/* breaker box with its throw lever, wired to the belt */}
      <ObliqueBox id={id} x={488} y={112} w={30} h={42} dx={8} dy={5} />
      <rect x={496} y={120} width={14} height={20} fill={stip(id, "light")} {...hair} />
      <path d="M503 130L517 104" {...ink} strokeWidth={LINE.bold} />
      <circle cx={518} cy={102} r={3.4} fill={PAT.paper} {...ink} />
      <circle cx={503} cy={130} r={2} fill={PAT.ink} />
      <path d="M488 148H478" fill="none" {...hair} strokeDasharray="3 2" />
      <Fig x={400} y={204} n={2} size={11}>
        medium-stakes, high-frequency
      </Fig>

      <line x1={548} y1={20} x2={548} y2={190} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 3 — a webpage carousel reordering itself, a lens over it */}
      <ObliqueBox id={id} x={576} y={74} w={176} h={96} dx={10} dy={6} />
      <line x1={576} y1={88} x2={752} y2={88} {...ink} />
      {[584, 590, 596].map((x) => (
        <circle key={x} cx={x} cy={81} r={1.8} fill={PAT.paper} {...hair} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={600 + i * 46} y={104} width={38} height={44} fill={PAT.paper} {...ink} />
          <ObliqueBox id={id} x={608 + i * 46} y={116} w={16} h={14} dx={4} dy={3} />
          <line x1={606 + i * 46} y1={138} x2={632 + i * 46} y2={138} {...hair} />
        </g>
      ))}
      <path d="M592 120L586 126L592 132M736 120L742 126L736 132" fill="none" {...ink} />
      <path d="M622 100Q645 90 668 100" fill="none" {...hair} />
      <path d={headAlongPath(668, 100, 10, 4, 6)} fill="none" {...hair} />
      <Lens id={id} cx={712} cy={124} r={19} a={0.75} handle={22} />
      <Fig x={666} y={204} n={3} size={11}>
        low-stakes, high-velocity
      </Fig>
      </g>
    </Frame>
  );
}

/* The AI agent keeps one glyph through Part 5: a small housing with a scanning
   lens and an articulated arm ending in a gripper. */

/**
 * The AI agent: housing with feet at (x, y) (front-left bottom corner), a lens
 * on its front and an arm reaching right to the gripper at (gx, gy).
 */
function Agent({ id, x, y, gx, gy, stroke = PAT.ink }: { id: string; x: number; y: number; gx: number; gy: number; stroke?: string }) {
  const o = { stroke, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const sx = x + 46;
  const sy = y - 30;
  const ex = r2((sx + gx) / 2);
  const ey = r2(Math.min(sy, gy) - 16);
  return (
    <g>
      {/* arm: shoulder, elbow, gripper */}
      <path d={`M${sx} ${sy}L${ex} ${ey}L${gx} ${gy - 6}`} fill="none" {...o} strokeWidth={3.2} />
      <path d={`M${sx} ${sy}L${ex} ${ey}L${gx} ${gy - 6}`} fill="none" stroke={PAT.paper} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={ex} cy={ey} r={3} fill={PAT.paper} {...o} />
      <path d={`M${gx - 5} ${gy - 6}L${gx - 6} ${gy + 2}M${gx + 5} ${gy - 6}L${gx + 6} ${gy + 2}M${gx - 5} ${gy - 6}H${gx + 5}`} fill="none" {...o} />
      {/* housing */}
      <path d={`M${x + 46} ${y - 40}L${x + 54} ${y - 45}V${y - 5}L${x + 46} ${y}Z`} fill={stip(id, "dense")} {...o} />
      <path d={`M${x} ${y - 40}L${x + 8} ${y - 45}H${x + 54}L${x + 46} ${y - 40}Z`} fill={stip(id, "light")} {...o} />
      <rect x={x} y={y - 40} width={46} height={40} fill={PAT.paper} {...o} />
      <circle cx={x + 23} cy={y - 22} r={10} fill={stip(id, "light")} {...o} />
      <circle cx={x + 23} cy={y - 22} r={5.5} fill={PAT.paper} {...o} />
      <circle cx={x + 23} cy={y - 22} r={1.6} fill={stroke} />
      <circle cx={sx} cy={sy} r={3} fill={PAT.paper} {...o} />
    </g>
  );
}

/** A shop shelf with goods on two shelves; (x, y) is the front face's top-left. */
function Shelf({ id, x, y, w = 120, h = 116 }: { id: string; x: number; y: number; w?: number; h?: number }) {
  const rows = [y + h * 0.42, y + h * 0.82];
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={16} dy={10} />
      {rows.map((ry) => (
        <g key={ry}>
          <line x1={x} y1={ry} x2={x + w} y2={ry} {...ink} />
          {[0.1, 0.4, 0.7].map((f, i) => (
            <ObliqueBox key={f} id={id} x={r2(x + w * f)} y={r2(ry - 22 + (i % 2) * 6)} w={22} h={r2(22 - (i % 2) * 6)} dx={5} dy={3} />
          ))}
        </g>
      ))}
    </g>
  );
}

/**
 * Part 5: from human-mediated to agent-mediated exchange. FIG. 1: the
 * consumer reaches the shelf. FIG. 2: the consumer stands back and the agent,
 * acting on their behalf, reaches the same shelf.
 */
export function DelegatedExchange() {
  const id = "w1-deleg";
  return (
    <Frame
      width={800}
      height={215}
      label="Patent drawing in two figures. FIG. 1, human-mediated exchange: a consumer reaches for goods on a shop shelf. FIG. 2, agent-mediated exchange: the consumer stands back, joined by a centre line to an AI agent, a small housing with a lens and an arm, which reaches the same shelf on the consumer's behalf."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 */}
      <line x1={40} y1={180} x2={360} y2={180} {...hair} />
      <Shelf id={id} x={210} y={58} />
      <Figure id={id} x={166} y={179} s={1.45} arm="reach" />
      <Fig x={200} y={206} n={1} size={11.5}>
        human-mediated exchange
      </Fig>

      <line x1={400} y1={20} x2={400} y2={190} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 */}
      <line x1={440} y1={180} x2={760} y2={180} {...hair} />
      <Shelf id={id} x={630} y={58} />
      <Figure id={id} x={466} y={179} s={1.45} />
      <line x1={486} y1={112} x2={538} y2={140} {...hair} strokeDasharray={CENTRE_DASH} />
      <Agent id={id} x={540} y={180} gx={640} gy={110} />
      <Fig x={600} y={206} n={2} size={11.5}>
        agent-mediated exchange
      </Fig>
    </Frame>
  );
}

/**
 * The agent as surrogate consumer: the shopper hands the agent a goal card;
 * the agent's lens, not the shopper's eyes, reads the results page, its
 * sight lines running to each listing (the first one sponsored).
 */
export function SurrogateConsumer() {
  const id = "w1-surr";
  const rows = [
    { y: 46, price: "$290", ad: true },
    { y: 90, price: "$210", ad: false },
    { y: 134, price: "$245", ad: false },
  ];
  return (
    <Frame
      width={800}
      height={215}
      label="Patent drawing: a shopper on the right hands a goal card to the AI agent, which holds it in its gripper; the agent's lens sends sight lines to a search results page on the left with three listings, a sponsored one at $290 first, then $210 and $245; the agent, not the shopper, reads the page."
    >
      <PatentDefs id={id} />
      <line x1={40} y1={190} x2={760} y2={190} {...hair} />

      {/* Results page on a stand */}
      <ObliqueBox id={id} x={60} y={30} w={270} h={150} dx={12} dy={8} />
      <line x1={140} y1={180} x2={140} y2={190} {...ink} />
      <line x1={250} y1={180} x2={250} y2={190} {...ink} />
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={74} y={r.y} width={242} height={36} fill={PAT.paper} {...ink} />
          <ObliqueBox id={id} x={82} y={r.y + 10} w={20} h={18} dx={5} dy={3} />
          <line x1={112} y1={r.y + 13} x2={r.ad ? 158 : 210} y2={r.y + 13} {...hair} />
          <line x1={112} y1={r.y + 22} x2={190} y2={r.y + 22} {...hair} />
          <text x={306} y={r.y + 22} textAnchor="end" fontFamily="var(--font-heading)" fontSize={14} fill={PAT.ink}>
            {r.price}
          </text>
          {r.ad ? (
            <g>
              <rect x={164} y={r.y + 6} width={58} height={13} fill={PAT.paper} {...ink} />
              <text x={193} y={r.y + 15.6} textAnchor="middle" fontFamily="var(--font-body)" fontSize={7.4} letterSpacing="0.04em" fill={PAT.ink}>
                SPONSORED
              </text>
            </g>
          ) : null}
        </g>
      ))}

      {/* Sight lines from the agent's lens */}
      {rows.map((r) => (
        <line key={r.y} x1={474} y1={164} x2={346} y2={r.y + 12} {...hair} strokeDasharray="4 3" />
      ))}

      {/* The agent takes the goal card */}
      <Agent id={id} x={460} y={190} gx={590} gy={106} />
      <path d="M574 108L584 100H606L596 108Z" fill={PAT.paper} {...ink} />
      <Figure id={id} x={640} y={189} s={1.45} arm="reach" flip />
    </Frame>
  );
}

/**
 * Dual agency: the agent's decision needle should point to the consumer it
 * serves (dashed), but each risk pulls it (red) toward something else: a
 * magnet of promoted placements, a weight on the first slot, a hook hidden in
 * a listing's text, or a loss with no one assigned to bear it.
 */
export function DualAgencyRisks() {
  const [risk, setRisk] = useState<"conflict" | "position" | "adversarial" | "liability">("conflict");
  const id = "w1-dual";
  const cx = 330;
  const cy = 100;
  const deg = { conflict: 0, position: -28, adversarial: 18, liability: -8 }[risk];
  const a = (deg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const tip = [r2(cx + ux * 40), r2(cy + uy * 40)];
  const needle = `M${r2(cx - uy * 5)} ${r2(cy + ux * 5)}L${tip[0]} ${tip[1]}L${r2(cx + uy * 5)} ${r2(cy - ux * 5)}Z`;
  const tail = `M${r2(cx - uy * 5)} ${r2(cy + ux * 5)}L${r2(cx - ux * 18)} ${r2(cy - uy * 18)}L${r2(cx + uy * 5)} ${r2(cy - ux * 5)}Z`;
  const pullTo = {
    conflict: [520, 100],
    position: [540, 52],
    adversarial: [548, 117],
    liability: [540, 92],
  }[risk];
  const what = {
    conflict: "a horseshoe magnet marked promoted placements",
    position: "a heavy weight sitting on the first of three ranked slots",
    adversarial: "a red hook hidden among a product listing's lines of text",
    liability: "a torn receipt for the loss, with dashed leaders to the consumer, the platform and the developer and none attached",
  }[risk];
  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing: a consumer stands on the left; a dashed line shows where the agent's decision dial should point, toward the consumer, but its red needle is pulled to the right by ${what}.`}
      >
        <PatentDefs id={id} />
        <line x1={40} y1={190} x2={760} y2={190} {...hair} />
        <Figure id={id} x={100} y={189} s={1.45} />

        {/* The agent's decision dial */}
        <line x1={cx} y1={146} x2={cx} y2={178} {...ink} />
        <ObliqueBox id={id} x={cx - 30} y={178} w={60} h={12} dx={10} dy={6} />
        <circle cx={cx} cy={cy} r={50} fill={stip(id, "light")} {...ink} />
        <circle cx={cx} cy={cy} r={44} fill={PAT.paper} {...ink} />
        {Array.from({ length: 12 }, (_, i) => {
          const t = (i * Math.PI) / 6;
          return (
            <line key={i} x1={r2(cx + Math.cos(t) * 38)} y1={r2(cy + Math.sin(t) * 38)} x2={r2(cx + Math.cos(t) * 43)} y2={r2(cy + Math.sin(t) * 43)} {...hair} />
          );
        })}
        <line x1={cx - 6} y1={cy} x2={cx - 40} y2={cy} {...hair} strokeDasharray="4 3" />
        <line x1={128} y1={98} x2={274} y2={cy} {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={tail} fill={PAT.paper} {...ink} />
        <path d={needle} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
        <circle cx={cx} cy={cy} r={3} fill={PAT.paper} {...ink} />
        <line x1={384} y1={r2(cy + uy * 54)} x2={pullTo[0] - 8} y2={pullTo[1]} stroke={PAT.signal} strokeWidth={LINE.hair} strokeDasharray="3 3" />

        {/* What pulls the needle */}
        {risk === "conflict" ? (
          <g>
            <path d="M600 70H550A30 30 0 0 0 550 130H600V112H552A12 12 0 0 1 552 88H600Z" fill={PAT.paper} {...ink} />
            <path d="M520 100A30 30 0 0 1 550 70V88A12 12 0 0 0 540 100Z" fill={stip(id, "dense")} />
            <rect x={586} y={70} width={14} height={18} fill={stip(id, "dense")} {...ink} />
            <rect x={586} y={112} width={14} height={18} fill={stip(id, "dense")} {...ink} />
            <PatentKey x={570} y={160} size={10}>
              PROMOTED PLACEMENTS
            </PatentKey>
          </g>
        ) : null}
        {risk === "position" ? (
          <g>
            <ObliqueBox id={id} x={548} y={36} w={150} h={132} dx={12} dy={8} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={558} y={46 + i * 40} width={130} height={32} fill={PAT.paper} {...ink} />
                <text x={570} y={67 + i * 40} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={13} fill={PAT.ink}>
                  {i + 1}
                </text>
                <line x1={584} y1={58 + i * 40} x2={640} y2={58 + i * 40} {...hair} />
                <line x1={584} y1={66 + i * 40} x2={624} y2={66 + i * 40} {...hair} />
              </g>
            ))}
            <path d="M648 70V54L656 46H676V62L668 70Z" fill={stip(id, "dense")} {...ink} />
            <path d="M648 54H668V70M668 54L676 46" fill="none" {...ink} />
            <PatentKey x={624} y={186} size={10}>
              POSITION BIAS
            </PatentKey>
          </g>
        ) : null}
        {risk === "adversarial" ? (
          <g>
            <ObliqueBox id={id} x={556} y={40} w={150} h={120} dx={12} dy={8} />
            <ObliqueBox id={id} x={570} y={56} w={40} h={36} dx={8} dy={5} />
            {[60, 70, 80, 102, 110, 126, 134, 142].map((y) => (
              <line key={y} x1={y < 90 ? 622 : 570} y1={y} x2={690} y2={y} {...hair} />
            ))}
            <path d="M548 117H603M606 120V136C606 146 593 146 593 137L598 140" fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={606} cy={117} r={3} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.outline} />
            <PatentKey x={630} y={182} size={10}>
              HIDDEN INSTRUCTIONS
            </PatentKey>
          </g>
        ) : null}
        {risk === "liability" ? (
          <g>
            <path d="M548 56H612V128L604 122L596 128L588 122L580 128L572 122L564 128L556 122L548 128Z" fill={PAT.paper} {...ink} />
            {[68, 78, 88].map((y) => (
              <line key={y} x1={556} y1={y} x2={604} y2={y} {...hair} />
            ))}
            <line x1={556} y1={104} x2={604} y2={104} stroke={PAT.signal} strokeWidth={LINE.bold} />
            {[
              ["CONSUMER", 56],
              ["PLATFORM", 96],
              ["DEVELOPER", 136],
            ].map(([n, y]) => (
              <g key={n}>
                <line x1={620} y1={92} x2={652} y2={(y as number) - 4} {...hair} strokeDasharray="3 3" />
                <PatentKey x={660} y={y as number} anchor="start" size={10}>
                  {n}
                </PatentKey>
              </g>
            ))}
          </g>
        ) : null}
      </Frame>
      <Segmented
        label="Agentic governance risk"
        options={[
          { id: "conflict", label: "1. Principal-agent conflict" },
          { id: "position", label: "2. Position bias" },
          { id: "adversarial", label: "3. Adversarial storefront" },
          { id: "liability", label: "4. Liability ambiguity" },
        ]}
        value={risk}
        onChange={setRisk}
      />
    </div>
  );
}

/** A hotel block with a grid of windows; (x, y) is the front face's top-left. */
function Hotel({ id, x, y, w = 84, h = 112 }: { id: string; x: number; y: number; w?: number; h?: number }) {
  const cols = 3;
  const rows = 5;
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={14} dy={9} />
      {Array.from({ length: rows * cols }, (_, k) => {
        const c = k % cols;
        const r = Math.floor(k / cols);
        return <rect key={k} x={r2(x + 10 + c * ((w - 20) / cols))} y={y + 10 + r * 17} width={14} height={10} fill={PAT.paper} {...hair} />;
      })}
      <rect x={r2(x + w / 2 - 9)} y={y + h - 18} width={18} height={18} fill={PAT.paper} {...ink} />
    </g>
  );
}

/**
 * Discussion case: the agent pins the first-ranked, sponsored hotel, which
 * lets the street noise in (red); the quiet four-star hotel beside it is
 * passed over.
 */
export function TravelAgentHotel() {
  const id = "w1-hotel";
  const arc = (r: number) => `M${r2(236 - r * 0.5)} ${r2(112 - r * 0.87)}A${r} ${r} 0 0 0 ${r2(236 - r * 0.5)} ${r2(112 + r * 0.87)}`;
  return (
    <Frame
      width={400}
      height={215}
      label="Patent drawing: two hotel blocks; the left one carries a sponsored sign on its roof and red noise waves at its side, and the AI agent beside it takes hold of it; the right one, with four stars on its roof sign, is quiet and passed over."
    >
      <PatentDefs id={id} />
      <line x1={20} y1={190} x2={380} y2={190} {...hair} />

      {/* Sponsored hotel, ranked first, letting the noise in */}
      <Hotel id={id} x={84} y={60} />
      <rect x={92} y={34} width={68} height={16} fill={PAT.paper} {...ink} />
      <line x1={100} y1={50} x2={100} y2={58} {...ink} />
      <line x1={152} y1={50} x2={152} y2={58} {...ink} />
      <text x={126} y={45.4} textAnchor="middle" fontFamily="var(--font-body)" fontSize={7.6} letterSpacing="0.04em" fill={PAT.ink}>
        SPONSORED
      </text>
      {[16, 26, 36].map((r) => (
        <path key={r} d={arc(r)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      ))}

      {/* Quiet four-star hotel, passed over */}
      <Hotel id={id} x={264} y={60} />
      <rect x={272} y={34} width={68} height={16} fill={PAT.paper} {...ink} />
      <line x1={280} y1={50} x2={280} y2={58} {...ink} />
      <line x1={332} y1={50} x2={332} y2={58} {...ink} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={star(285 + i * 14, 42, 5)} fill="none" {...ink} />
      ))}

      {/* The agent pins the sponsored hotel */}
      <Agent id={id} x={14} y={190} gx={92} gy={178} />
    </Frame>
  );
}
