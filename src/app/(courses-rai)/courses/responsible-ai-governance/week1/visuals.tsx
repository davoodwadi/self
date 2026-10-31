"use client";

import React, { useState } from "react";
import { CENTRE_DASH, FigureName, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";
import {
  Chip,
  Figure,
  House,
  Lens,
  Sheet,
  Tag,
  cross,
  headAlongPath,
  tick,
} from "../_visuals/objects";

/* ==========================================================================
   WEEK 1 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names in
   the body face and one examiner's red for the finding. See the course
   CLAUDE.md.
   ========================================================================== */

const ink = { stroke: PAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: PAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/**
 * Why market algorithms require governance (reference plate).
 * The first figure: a hand stamp over one card. The second figure: one rule bar drives five
 * plungers onto five cards. With the biased rule four cards take the red.
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
        label={`Patent drawing in two figures. The first figure: a hand stamp comes down on one card, one decision at a time. The second figure: one bar labelled same decision rule drives five plungers down onto five cards at once, thousands of decisions per second. ${biased ? "with the biased rule, four of the five cards are marked in red" : "with the verified rule, all five cards stay plain"}.`}
      >
        <PatentDefs id={id} />

        {/* The first figure: hand stamp over one card */}
        <ellipse cx={121} cy={52} rx={14} ry={6} fill={PAT.paper} {...ink} />
        <path d="M107 52C107 60 135 60 135 52V57C135 65 107 65 107 57Z" fill={stip(id, "light")} {...ink} />
        <path d="M116 63V102H126V63" fill={PAT.paper} {...ink} />
        <path d="M123.5 63.6V102H126V63.6Z" fill={stip(id, "dense")} />
        <ObliqueBox id={id} x={90} y={106} w={52} h={15} dx={10} dy={7} />
        <line x1={121} y1={126} x2={121} y2={156} {...hair} strokeDasharray={CENTRE_DASH} />
        <Sheet id={id} x={66} y={192} w={96} d={28} sk={22} t={5} lines={3} />
        <FigureName x={121} y={226} size={11}>
          one decision at a time
        </FigureName>

        <line x1={236} y1={22} x2={236} y2={206} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* The second figure: one rule bar pressing five cards */}
        <ObliqueBox id={id} x={270} y={58} w={490} h={32} dx={15} dy={10} />
        <PatentKey x={515} y={78.5} size={13}>
          Same decision rule
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
        <FigureName x={526} y={226} size={11}>
          thousands of decisions per second
        </FigureName>
      </Frame>
      <Segmented
        label="Decision rule"
        options={[
          { id: "biased", label: "Biased rule" },
          { id: "audited", label: "Verified rule" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Three lenses on the same deployment: consequentialism reads a pass,
 * deontology and virtue ethics read a fail. The conflicting verdicts are red.
 */
export function ThreeLenses() {
  const id = "w1-lens";
  return (
    <Frame
      width={800}
      height={210}
      label="Patent drawing: three hand lenses look at the same deployment, drawn as one housing. The consequentialism lens shows a tick, while the deontology and virtue ethics lenses show red crosses, conflicting conclusions about the same system."
    >
      <PatentDefs id={id} />

      {/* The same deployment */}
      <ObliqueBox id={id} x={334} y={112} w={132} h={70} dx={18} dy={12} />
      {[128, 141, 154, 167].map((y) => (
        <line key={y} x1={350} y1={y} x2={450} y2={y} {...hair} />
      ))}
      <PatentKey x={400} y={204} size={11}>
        Same deployment
      </PatentKey>

      {/* Sight lines from each lens to the housing */}
      <line x1={196} y1={102} x2={326} y2={136} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={604} y1={102} x2={492} y2={128} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={408} y1={80} x2={408} y2={94} {...hair} strokeDasharray={CENTRE_DASH} />

      <Lens id={id} cx={154} cy={92} r={40} a={-2.55} handle={40}>
        <path d={tick(154, 92, 16)} fill="none" {...ink} strokeWidth={LINE.bold} />
      </Lens>
      <PatentKey x={154} y={156} size={11}>
        Consequentialism
      </PatentKey>

      <Lens id={id} cx={408} cy={46} r={30} a={-0.35} handle={32}>
        <path d={cross(408, 46, 10)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      </Lens>
      <PatentKey x={364} y={50} anchor="end" size={11}>
        Deontology
      </PatentKey>

      <Lens id={id} cx={646} cy={92} r={40} a={-0.59} handle={40}>
        <path d={cross(646, 92, 13)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      </Lens>
      <PatentKey x={646} y={156} size={11}>
        Virtue ethics
      </PatentKey>
    </Frame>
  );
}

/**
 * Consequentialism and market welfare. Welfare columns for four
 * segments stand on a zero datum, each as wide as its group. The aggregate
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
        height={190}
        label={`Patent drawing: four segment welfare columns on a zero datum, each as wide as its group, with its people standing on top (three on each majority column, one on the minority column), and an aggregate column apart on the right. ${excluded ? `With the minority segment excluded from credit offers, the three majority columns rise, the aggregate rises from ${offerTotal} to ${total}, and the narrow minority column hangs below zero in red.` : `With credit offered to every segment, all four columns stand above zero and the aggregate is ${total}.`}`}
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
          Minority segment
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
        <text x={676} y={r2(base - 18 - total * k)} textAnchor="middle" fontFamily="var(--font-body)" fontSize={18} fill={PAT.ink}>
          {`+${total}`}
        </text>
        <PatentKey x={690} y={base + 40} size={10}>
          Aggregate outcomes
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

/**
 * The loan-pricing case: identical houses on either side of a postal-code
 * boundary. The same loan is quoted 6.2% on one side and 11.8% (red) on the
 * other.
 */
export function LoanWide() {
  const id = "w1-loan";
  const left = [92, 194, 296];
  const right = [470, 572, 674];
  return (
    <Frame
      width={800}
      height={178}
      label="Patent drawing in plan view: a strip of ground divided by a postal-code boundary line. Three identical houses on each side. Each house on the postal code A side carries a 6.2% rate tag, each house on the postal code B side carries an 11.8% rate tag in red."
    >
      <PatentDefs id={id} />
      <g transform="translate(0 -40)">

      {/* Ground and boundary */}
      <path d="M36 186L76 126H776L736 186Z" fill={stip(id, "light")} {...ink} />
      <line x1={400} y1={186} x2={440} y2={126} {...ink} strokeWidth={LINE.bold} strokeDasharray={CENTRE_DASH} />

      {left.map((x) => (
        <g key={x}>
          <House id={id} x={x} y={174} w={62} h={40} roof={24} />
          <line x1={x + 31} y1={108} x2={x + 31} y2={84} {...hair} />
          <Tag cx={x + 31} cy={68} text="6.2%" w={74} size={19} />
        </g>
      ))}
      {right.map((x) => (
        <g key={x}>
          <House id={id} x={x} y={174} w={62} h={40} roof={24} />
          <line x1={x + 31} y1={108} x2={x + 31} y2={84} stroke={PAT.signal} strokeWidth={LINE.hair} />
          <Tag cx={x + 31} cy={68} text="11.8%" w={74} size={19} red />
        </g>
      ))}

      <PatentKey x={228} y={208} size={16.5}>
        Postal code A
      </PatentKey>
      <PatentKey x={598} y={208} size={16.5}>
        Postal code B
      </PatentKey>
      </g>
    </Frame>
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
        label={`Patent drawing: a model developer stands by a drum of weights, a deploying retailer stands by a housing with a prompt card, and a consumer holds a red card for the biased outcome. ${blame ? "The developer points at the retailer's prompt card and the retailer points back at the developer's drum: two red arrows cross, and no one takes the outcome." : "The retailer turns to the consumer. A line marked accountable joins the retailer to the consumer's outcome."}`}
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
              Accountable
            </PatentKey>
          </g>
        )}
      </Frame>
      <Segmented
        label="Outcome"
        options={[
          { id: "blame", label: "Problem of many hands" },
          { id: "accountable", label: "Accountable governance" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Probabilistic outputs: a pin board drops the same prompt again
 * and again. Each run lands one ball in a brand's bin. Students add runs and
 * flip the framing baffle. The most-chosen bin (red) reverses with framing.
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
  const brand = ["Brand A", "Brand B", "Brand C"];
  const pegs: [number, number][] = [];
  for (let i = 0; i < 6; i++) for (let j = 0; j <= i; j++) pegs.push([r2(400 + (j - i / 2) * 40), 58 + i * 11]);
  const tilt = framing === "standard" ? -1 : 1;

  return (
    <div>
      <Frame
        width={800}
        height={222}
        label={`Patent drawing: a hopper drops the same prompt onto a board of pins, past a framing baffle tilted ${framing === "standard" ? "left" : "right"}. After ${runs} repeated runs the balls lie in three brand bins, ${counts[0]} in brand A, ${counts[1]} in brand B and ${counts[2]} in brand C. The most-chosen bin, brand ${"ABC"[top]}, is red.`}
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
              <text x={bx + 50} y={196} fontFamily="var(--font-body)" fontSize={13} fill={hot ? PAT.signal : PAT.ink}>
                {n}
              </text>
              <PatentKey x={bx} y={216} size={9.5}>
                {brand[b]}
              </PatentKey>
            </g>
          );
        })}
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider label="Repeated runs" value={runs} min={1} max={30} onChange={setRuns} />
        <Segmented
          label="Framing"
          options={[
            { id: "standard", label: "Framing A" },
            { id: "shifted", label: "Framing B" },
          ]}
          value={framing}
          onChange={setFraming}
        />
      </div>
    </div>
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
      label="Patent drawing: cases on a conveyor queue at a closed gate across the belt. A reviewer standing behind the belt holds the gate's lever, so each case waits for approval before it can pass."
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

/** Human-on-the-loop: cases run on unchecked. The operator watches a dashboard with a stop switch to hand. */
export function OnTheLoop() {
  const id = "w1-on";
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: cases run continuously along a conveyor. Behind it an operator watches a dashboard screen showing a live trace and keeps one hand on a stop switch, able to intervene or shut the system down."
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
 * constraints) with no one at the belt. Their record lands in a log on a
 * lectern, read later through a hand lens (the periodic post-hoc audit).
 */
export function Autonomous() {
  const id = "w1-auto";
  const posts = [50, 136, 222, 308];
  return (
    <Frame
      width={400}
      height={210}
      label="Patent drawing: cases run continuously along a conveyor between two guard rails, the pre-programmed constraints, with no person at the belt. Past the end of the belt an open log book lies on a lectern under a hand lens, for the periodic post-hoc audit."
    >
      <PatentDefs id={id} />
      {/* far guard rail on posts */}
      {posts.map((x) => (
        <line key={x} x1={x} y1={126} x2={x} y2={152} {...ink} />
      ))}
      <ObliqueBox id={id} x={44} y={122} w={270} h={6} dx={4} dy={2.5} />
      <PatentKey x={180} y={110} size={15}>
        Constraints
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

/**
 * The agent as surrogate consumer: the shopper hands the agent a goal card.
 * The agent's lens, not the shopper's eyes, reads the results page, its
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
      label="Patent drawing: a shopper on the right hands a goal card to the AI agent, which holds it in its gripper. The agent's lens sends sight lines to a search results page on the left with three listings, a sponsored one at $290 first, then $210 and $245. The agent, not the shopper, reads the page."
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
          <text x={306} y={r.y + 22} textAnchor="end" fontFamily="var(--font-body)" fontSize={14} fill={PAT.ink}>
            {r.price}
          </text>
          {r.ad ? (
            <g>
              <rect x={164} y={r.y + 4} width={98} height={16} fill={PAT.paper} {...ink} />
              <PatentKey x={214} y={r.y + 15.8} size={9.5}>
                Sponsored
              </PatentKey>
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
