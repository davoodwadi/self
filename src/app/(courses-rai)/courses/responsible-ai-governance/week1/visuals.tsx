"use client";

import React, { useState } from "react";
import { CENTRE_DASH, Fig, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";

export {
  IsoDelegatedExchange as DelegatedExchange,
  IsoSurrogateConsumer as SurrogateConsumer,
  IsoDualAgencyRisks as DualAgencyRisks,
  IsoTravelAgentHotel as TravelAgentHotel,
} from "./visuals-legacy";

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
 * Governance authority: an evidence dossier tied by a centre line to a lever
 * gate with three positions (approve, restrict, halt); the lever stands at
 * approve.
 */
export function GovernanceAuthority() {
  const id = "w1-auth";
  const stops = [
    { y: 72, name: "APPROVE" },
    { y: 112, name: "RESTRICT" },
    { y: 152, name: "HALT" },
  ];
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: a stack of papers marked evidence is tied by a centre line to a lever gate with three positions, approve, restrict and halt; the lever stands at approve."
    >
      <PatentDefs id={id} />

      {/* Evidence dossier: a stack of pages lying down */}
      <ObliqueBox id={id} x={22} y={124} w={104} h={30} dx={30} dy={44} top={PAT.paper} />
      {[0, 1, 2].map((j) => (
        <line key={j} x1={r2(46 + j * -6)} y1={r2(98 + j * 9)} x2={r2(118 + j * -6)} y2={r2(98 + j * 9)} {...hair} />
      ))}
      {[1, 2, 3, 4].map((j) => (
        <line key={j} x1={22} y1={124 + j * 6} x2={126} y2={124 + j * 6} {...hair} strokeWidth={0.45} />
      ))}
      <PatentKey x={74} y={180} size={10}>
        EVIDENCE
      </PatentKey>

      <line x1={160} y1={108} x2={200} y2={108} {...hair} strokeDasharray={CENTRE_DASH} />

      {/* Lever gate */}
      <ObliqueBox id={id} x={200} y={44} w={150} h={140} dx={16} dy={10} />
      <rect x={315} y={62} width={12} height={100} rx={6} fill={stip(id, "dense")} {...ink} />
      {stops.map((s) => (
        <g key={s.name}>
          <line x1={305} y1={s.y} x2={312} y2={s.y} {...hair} />
          <PatentKey x={298} y={s.y + 3.5} anchor="end" size={9.5}>
            {s.name}
          </PatentKey>
        </g>
      ))}
      {/* Lever, pulled up to the approve stop */}
      <path d="M318 72L336 30H342L324 72Z" fill={PAT.paper} {...ink} />
      <path d="M339 30L342 30L324 72L321.5 72Z" fill={stip(id, "dense")} />
      <circle cx={339} cy={28} r={9} fill={PAT.paper} {...ink} />
      <path d="M332.5 32.5A9 9 0 0 0 347.5 25.5A9 9 0 0 1 332.5 32.5Z" fill={stip(id, "dense")} />
      <ellipse cx={321} cy={72} rx={7} ry={3.5} fill={PAT.paper} {...ink} />
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
 * Ethics washing: a placard of values on its posts, its linkage rod ending
 * short of the machine's input shaft; the machine's gears run on untouched.
 */
export function EthicsWashing() {
  const id = "w1-wash";
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: a placard reading our values stands on two posts; the rod from its back stops short of the input shaft of a machine whose cutaway shows its gears turning; the gap between rod and shaft is marked in red as ethics washing."
    >
      <PatentDefs id={id} />

      {/* Placard on posts */}
      <line x1={50} y1={104} x2={50} y2={192} {...ink} />
      <line x1={128} y1={104} x2={128} y2={192} {...ink} />
      <ObliqueBox id={id} x={22} y={44} w={134} h={60} dx={8} dy={5} />
      <text x={89} y={68} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={14} letterSpacing="0.12em" fill={PAT.ink}>
        OUR VALUES
      </text>
      {[80, 88, 96].map((y) => (
        <line key={y} x1={44} y1={y} x2={134} y2={y} {...hair} />
      ))}
      <line x1={34} y1={192} x2={144} y2={192} {...hair} />

      {/* Linkage rod from the placard, ending in free air */}
      <path d="M164 128H214" {...ink} strokeWidth={LINE.bold} fill="none" />
      <path d="M128 128H164" {...hair} strokeDasharray="3 2" fill="none" />
      <circle cx={214} cy={128} r={3} fill={PAT.paper} {...ink} />

      {/* The gap: the finding */}
      <line x1={220} y1={146} x2={250} y2={146} stroke={PAT.signal} strokeWidth={LINE.outline} />
      <line x1={220} y1={138} x2={220} y2={152} stroke={PAT.signal} strokeWidth={LINE.hair} />
      <line x1={250} y1={138} x2={250} y2={152} stroke={PAT.signal} strokeWidth={LINE.hair} />
      <PatentKey x={236} y={202} fill={PAT.signal} size={10}>
        ETHICS WASHING
      </PatentKey>

      {/* Machine, front face cut away to show its gears */}
      <path d="M250 128H262" {...ink} strokeWidth={LINE.bold} />
      <ellipse cx={262} cy={128} rx={3} ry={7} fill={PAT.paper} {...ink} />
      <ObliqueBox id={id} x={264} y={70} w={110} h={112} dx={14} dy={9} />
      {/* Break line: the front face is cut away to show the gears */}
      <path d="M278 82H354L360 90L352 98L360 106L352 114L360 122L352 130L360 138L352 146L360 154L352 162L360 170L354 176H278Z" fill={stip(id, "light")} {...ink} />
      <Gear cx={302} cy={128} r={17} n={12} />
      <Gear cx={331} cy={107} r={9} n={8} phase={0.2} />
      <Gear cx={331} cy={151} r={9} n={8} phase={0.1} />
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
 * Consequentialism and market welfare. FIG. 1: an objective function climbs
 * to its maximum. FIG. 2: by segment, three columns rise above the zero
 * datum and the minority column hangs below it in red; pooled into one
 * average, the column stands above the datum and the harm disappears.
 */
export function WelfareTradeoff() {
  const [view, setView] = useState<"segment" | "aggregate">("segment");
  const bySegment = view === "segment";
  const id = "w1-welfare";
  const base = 128;
  const majority = [
    { x: 330, h: 52 },
    { x: 424, h: 70 },
    { x: 518, h: 44 },
  ];

  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing in two figures. FIG. 1: a graph panel whose objective function curve rises to a marked maximum. FIG. 2: a datum plate at zero welfare; ${bySegment ? "three segment columns rise above it while a minority segment column hangs below it in red" : "all segments are pooled into one wide average column standing above it, and no column falls below"}.`}
      >
        <PatentDefs id={id} />

        {/* FIG. 1 — objective function on a graph panel */}
        <ObliqueBox id={id} x={40} y={56} w={170} h={110} dx={14} dy={9} />
        <path d="M58 150H196M58 150V70" fill="none" {...hair} />
        <path d="M60 146C92 142 112 120 130 96C142 80 156 76 166 80C178 86 188 104 194 116" fill="none" {...ink} strokeWidth={LINE.bold} />
        <line x1={160} y1={80} x2={160} y2={150} {...hair} strokeDasharray={CENTRE_DASH} />
        <circle cx={160} cy={78} r={3.2} fill={PAT.ink} />
        <Fig x={132} y={198} n={1}>
          objective function
        </Fig>

        <line x1={262} y1={22} x2={262} y2={186} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* FIG. 2 — welfare columns on a zero datum plate */}
        {bySegment ? (
          <ObliqueBox
            id={id}
            x={632}
            y={base + 8}
            w={58}
            h={46}
            dx={12}
            dy={8}
            front={stip(id, "signal")}
            top={PAT.paper}
            side={stip(id, "dense")}
            stroke={PAT.signal}
          />
        ) : null}
        <ObliqueBox id={id} x={300} y={base} w={430} h={8} dx={40} dy={22} />
        <PatentKey x={292} y={base + 7} anchor="end" size={10}>
          0
        </PatentKey>
        {bySegment ? (
          <>
            {majority.map((c) => (
              <ObliqueBox key={c.x} id={id} x={c.x} y={base - 6 - c.h} w={58} h={c.h} dx={12} dy={8} />
            ))}
            <PatentKey x={712} y={base + 40} anchor="start" fill={PAT.signal} size={9.5}>
              MINORITY
            </PatentKey>
          </>
        ) : (
          <>
            <ObliqueBox id={id} x={330} y={base - 6 - 38} w={360} h={38} dx={12} dy={8} />
            <PatentKey x={510} y={base - 20} size={10}>
              AVERAGE
            </PatentKey>
          </>
        )}
        <Fig x={530} y={206} n={2}>
          {bySegment ? "severe harm on a smaller group" : "aggregate outcomes"}
        </Fig>
      </Frame>
      <Segmented
        label="Evaluation lens"
        options={[
          { id: "segment", label: "By segment (reveals excluded minority)" },
          { id: "aggregate", label: "Aggregate average only (masks harm)" },
        ]}
        value={view}
        onChange={setView}
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

/** Fully autonomous: cases run between constraint rails into a log that is audited after the fact. */
export function Autonomous() {
  const id = "w1-auto";
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: cases run along a conveyor between two rails marked constraints, with no person present, and drop into an open log book at the end; a hand lens rests on the log for the periodic post-hoc audit."
    >
      <PatentDefs id={id} />
      {/* far rail */}
      <ObliqueBox id={id} x={46} y={146} w={234} h={8} dx={6} dy={4} />
      <Belt id={id} at={[48, 104, 160, 216]} x0={26} x1={286} arrow={false} />
      {/* near rail */}
      <ObliqueBox id={id} x={26} y={168} w={260} h={14} dx={6} dy={4} />
      <PatentKey x={156} y={179} size={8.5}>
        CONSTRAINTS
      </PatentKey>
      {/* log book, audited after the fact */}
      <Sheet id={id} x={300} y={150} w={74} d={34} sk={14} t={6} lines={4} />
      <Lens id={id} cx={340} cy={124} r={13} a={-0.5} handle={18} />
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
 * Matching oversight to decision risk: three columns whose height is the
 * severity of potential harm (the tallest in red), with the cases in front
 * showing how often each decision comes; on each column sits its regime's
 * control: the approval gate, the stop switch, the audit lens. Choosing a
 * tier rings it.
 */
export function DecisionRiskRegimes() {
  const [tier, setTier] = useState<"all" | "high" | "medium" | "low">("all");
  const id = "w1-risk";
  const cols = [
    { k: "high", x: 120, h: 112, n: 1, name: "HIGH-STAKES" },
    { k: "medium", x: 340, h: 70, n: 4, name: "MEDIUM-STAKES" },
    { k: "low", x: 560, h: 34, n: 9, name: "LOW-STAKES" },
  ] as const;
  const ringed = cols.find((c) => c.k === tier);
  return (
    <div>
      <Frame
        width={800}
        height={215}
        label={`Patent drawing: three columns stand for decision tiers, their heights the severity of potential harm. The high-stakes column is tallest and red, with one case in front and an approval gate on top; the medium-stakes column has four cases in front and a stop switch on top; the low-stakes column is lowest, with nine cases in front and an audit lens on top.${ringed ? ` The ${ringed.name.toLowerCase()} tier is ringed.` : ""}`}
      >
        <PatentDefs id={id} />
        <line x1={60} y1={176} x2={760} y2={176} {...hair} />
        {cols.map((c, i) => {
          const top = 166 - c.h;
          const red = i === 0;
          return (
            <g key={c.k}>
              <ObliqueBox
                id={id}
                x={c.x}
                y={top}
                w={70}
                h={c.h}
                dx={18}
                dy={12}
                front={red ? stip(id, "signal") : PAT.paper}
                stroke={red ? PAT.signal : PAT.ink}
              />
              {/* cases in front: how often the decision comes */}
              {Array.from({ length: c.n }, (_, j) => (
                <Chip key={j} id={id} x={c.x + 82 + (j % 3) * 24} y={174 - Math.floor(j / 3) * 9} w={18} d={6} sk={6} />
              ))}
              <PatentKey x={c.x + 54} y={198} size={10}>
                {c.name}
              </PatentKey>
            </g>
          );
        })}

        {/* regime controls on top of each column */}
        <ObliqueBox id={id} x={146} y={30} w={8} h={20} dx={14} dy={9} />
        <line x1={160} y1={22} x2={186} y2={10} {...ink} strokeWidth={LINE.bold} />
        <circle cx={188} cy={9} r={4} fill={PAT.paper} {...ink} />

        <line x1={384} y1={78} x2={384} y2={88} {...ink} />
        <path d="M374 78A10 5 0 0 1 394 78V73A10 5 0 0 0 374 73Z" fill={stip(id, "dense")} {...ink} />
        <ellipse cx={384} cy={73} rx={10} ry={5} fill={PAT.paper} {...ink} />

        <Lens id={id} cx={598} cy={108} r={12} a={-0.6} handle={14} />

        {ringed ? <Detail cx={ringed.x + 54} cy={tier === "high" ? 96 : 120} r={tier === "high" ? 90 : 64} /> : null}
      </Frame>
      <Segmented
        label="Inspect risk regime"
        options={[
          { id: "all", label: "All 3 tiers" },
          { id: "high", label: "High stakes (in-the-loop)" },
          { id: "medium", label: "Medium stakes (on-the-loop)" },
          { id: "low", label: "Low stakes (autonomous)" },
        ]}
        value={tier}
        onChange={setTier}
      />
    </div>
  );
}
