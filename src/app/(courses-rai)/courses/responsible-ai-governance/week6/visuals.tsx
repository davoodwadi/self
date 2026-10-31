"use client";

import React, { useState } from "react";
import {
  CENTRE_DASH,
  FigureName,
  Frame,
  LINE,
  ObliqueBox,
  PAT,
  PatentDefs,
  PatentKey,
  PlateButton,
  Segmented,
  Slider,
  Toggles,
  r2,
  seeded,
  stip,
} from "../_visuals/kit";
import { Cursor, Eye, Megaphone, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import { Chip, Coins, Detail, Dial, Lens, Tag, Figure, Gear, House, Sheet, SmallModel, cross, headAlongPath, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 6 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.
   ========================================================================== */

const ink = {
  stroke: PAT.ink,
  strokeWidth: LINE.outline,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
const hair = {
  stroke: PAT.ink,
  strokeWidth: LINE.hair,
  strokeLinecap: "round" as const,
};

/** Numerals or a quantity on a plate. */
function Num({
  x,
  y,
  children,
  size = 14,
  anchor = "middle",
  fill = PAT.ink,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-body)"
      fontSize={size}
      fill={fill}
      style={{ fontVariantNumeric: "lining-nums" }}
    >
      {children}
    </text>
  );
}

/* --------------------------------------------------------------------------
   Why AI Transforms Data Governance
   -------------------------------------------------------------------------- */

/**
 * Two figures. A ledger of customer rows, one of them (red) the customer
 * who asks to be deleted. Beside it a model housing of weight columns, each
 * with a thin red layer: that customer's share of every weight. The button
 * deletes the record: the row leaves the ledger and the rows close up, while
 * every red layer stays in the model.
 */
export function RowsVsWeights() {
  const [gone, setGone] = useState(false);
  const id = "w6-rows";
  const lx = 22;
  const ly = 52;
  const rowH = 26;
  const rows = 7;
  const red = 2;
  const rnd = seeded(61);
  const levels = Array.from({ length: 8 }, () => r2(0.35 + rnd() * 0.55));
  const bands = Array.from({ length: 8 }, () => r2(0.15 + rnd() * 0.6));
  const mx = 318;
  const my = 52;
  return (
    <div>
      <Frame
        width={580}
        height={300}
        label={`Patent drawing in two figures. Discrete rows: a ledger of seven customer rows, the third in red. Continuous model weights: a model housing holding eight weight columns, each filled to a different level and each carrying a thin red layer, that customer's share of every weight. ${gone ? "The record has been deleted: the red row is gone from the ledger and the rows have closed up, but every red layer is still in the model's weight columns." : "The red customer's record is still in the ledger."}`}
      >
        <PatentDefs id={id} />
        {/* ledger */}
        <ObliqueBox id={id} x={lx} y={ly} w={220} h={rows * rowH + 8} dx={12} dy={8} />
        {Array.from({ length: rows }, (_, i) => {
          const isRed = i === red;
          if (isRed && gone) return null;
          const shift = gone && i > red ? -rowH : 0;
          const y = ly + 4 + i * rowH + shift;
          const c = isRed ? PAT.signal : PAT.ink;
          return (
            <g key={i} style={{ transition: "transform 500ms ease" }}>
              <rect x={lx + 8} y={y + 3} width={204} height={rowH - 6} fill={isRed ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={LINE.hair} />
              <line x1={lx + 52} y1={y + 3} x2={lx + 52} y2={y + rowH - 3} stroke={c} strokeWidth={LINE.hair} />
              <line x1={lx + 132} y1={y + 3} x2={lx + 132} y2={y + rowH - 3} stroke={c} strokeWidth={LINE.hair} />
              <line x1={lx + 18} y1={y + rowH / 2} x2={lx + 42} y2={y + rowH / 2} stroke={c} strokeWidth={LINE.hair} />
              <line x1={lx + 62} y1={y + rowH / 2} x2={lx + 118} y2={y + rowH / 2} stroke={c} strokeWidth={LINE.hair} />
              <line x1={lx + 142} y1={y + rowH / 2} x2={lx + 196} y2={y + rowH / 2} stroke={c} strokeWidth={LINE.hair} />
            </g>
          );
        })}
        {gone ? (
          <rect x={lx + 8} y={ly + 4 + (rows - 1) * rowH + 3} width={204} height={rowH - 6} fill="none" {...hair} strokeDasharray="3 3" />
        ) : null}
        <FigureName x={lx + 110} y={286} size={13}>
          discrete rows
        </FigureName>
        {/* the training run that absorbed the rows into the weights */}
        <line x1={lx + 240} y1={ly + 96} x2={mx - 8} y2={ly + 96} {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={headAlongPath(mx - 6, ly + 96, 1, 0, 8)} fill="none" {...ink} />
        {/* model housing with weight columns */}
        <ObliqueBox id={id} x={mx} y={my} w={226} h={rows * rowH + 8} dx={12} dy={8} />
        {levels.map((lv, i) => {
          const vx = r2(mx + 22 + i * 26);
          const top = my + 22;
          const bot = my + rows * rowH - 10;
          const fy = r2(bot - lv * (bot - top));
          const by = r2(fy + bands[i] * (bot - fy));
          return (
            <g key={i}>
              <rect x={vx} y={top} width={14} height={bot - top} rx={7} fill={PAT.paper} {...ink} />
              <path d={`M${vx + 0.5} ${fy}H${vx + 13.5}V${bot - 7}A6.5 6.5 0 0 1 ${vx + 0.5} ${bot - 7}Z`} fill={stip(id, "light")} stroke="none" />
              <line x1={vx} y1={fy} x2={vx + 14} y2={fy} {...hair} />
              <rect x={vx + 0.5} y={by} width={13} height={4} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.hair} />
            </g>
          );
        })}
        <FigureName x={mx + 115} y={286} size={13}>
          continuous model weights
        </FigureName>
      </Frame>
      <div className="mt-2.5 px-1">
        <PlateButton onClick={() => setGone((g) => !g)}>{gone ? "Restore the record" : "Delete one customer's record"}</PlateButton>
      </div>
    </div>
  );
}

/**
 * The data lifecycle as four stations along one centre line: a blank form
 * before collection, a model being trained on a stack of records, the model
 * issuing an output card at inference, and a model in dashed outline being
 * erased in retirement or unlearning. One governance rail runs over all four,
 * clamped to each.
 */
export function LifecycleStations() {
  const id = "w6-life";
  const xs = [78, 228, 378, 528];
  const base = 104;
  const keys = [
    ["Before", "collection"],
    ["During", "training"],
    ["At", "inference"],
    ["Retirement or", "unlearning"],
  ];
  return (
    <Frame
      width={600}
      height={160}
      label="Patent drawing of the data lifecycle as four stations on one centre line: a blank form before collection. A model housing fed a stack of records during training. The housing issuing an output card at inference. A housing in dashed outline being rubbed out by an eraser block in retirement or unlearning. One governance rail runs above all four stations and is clamped down to each."
    >
      <PatentDefs id={id} />
      {/* the governance rail */}
      <ObliqueBox id={id} x={24} y={16} w={546} h={8} dx={6} dy={4} />
      {xs.map((x) => (
        <line key={x} x1={x} y1={24} x2={x} y2={40} {...ink} />
      ))}
      <line x1={12} y1={base} x2={588} y2={base} {...hair} strokeDasharray={CENTRE_DASH} />
      {/* before collection: a blank form and a pen */}
      <g transform={`translate(${xs[0]} 0)`}>
        <Sheet id={id} x={-38} y={base - 4} w={48} d={46} sk={14} lines={4} />
        <path d="M18 96L36 52L40 54L22 98Z" fill={PAT.paper} {...ink} />
        <path d="M18 96L17 101L22 98" fill={PAT.ink} {...hair} />
      </g>
      {/* during training: records fed into a housing */}
      <g transform={`translate(${xs[1]} 0)`}>
        <Sheet id={id} x={-58} y={base - 4} w={30} d={18} sk={8} />
        <Sheet id={id} x={-58} y={base - 12} w={30} d={18} sk={8} />
        <Sheet id={id} x={-58} y={base - 20} w={30} d={18} sk={8} />
        <line x1={-16} y1={72} x2={-8} y2={72} {...hair} />
        <path d={headAlongPath(-6, 72, 1, 0, 7)} fill="none" {...ink} />
        <SmallModel id={id} x={-2} y={52} w={50} h={48} />
      </g>
      {/* at inference: the housing issues an output card */}
      <g transform={`translate(${xs[2]} 0)`}>
        <SmallModel id={id} x={-42} y={52} w={50} h={48} />
        <line x1={20} y1={80} x2={28} y2={80} {...hair} />
        <path d={headAlongPath(36, 80, 1, 0, 7)} fill="none" {...ink} />
        <Chip id={id} x={38} y={92} w={22} d={9} sk={8} />
      </g>
      {/* retirement or unlearning: a housing rubbed out */}
      <g transform={`translate(${xs[3]} 0)`}>
        <g strokeDasharray="4 3">
          <rect x={-40} y={52} width={50} height={48} fill="none" {...hair} />
          <path d="M-40 52L-30 46H20L10 52M20 46V94L10 100" fill="none" {...hair} />
        </g>
        <g transform="rotate(-18 30 66)">
          <ObliqueBox id={id} x={12} y={58} w={36} h={16} dx={6} dy={4} />
          <line x1={24} y1={58} x2={24} y2={74} {...hair} />
        </g>
      </g>
      {keys.map(([k1, k2], i) => (
        <g key={k2}>
          <PatentKey x={xs[i]} y={128} size={12}>
            {k1}
          </PatentKey>
          <PatentKey x={xs[i]} y={146} size={12}>
            {k2}
          </PatentKey>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   From Data Ownership to Contextual Integrity
   -------------------------------------------------------------------------- */

/** A shipping label: a card with address lines and a barcode. */
function AddressLabel({ x, y, c = PAT.ink }: { x: number; y: number; c?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={46} height={30} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      {[8, 14, 20].map((d, i) => (
        <line key={d} x1={x + 6} y1={y + d} x2={x + (i === 0 ? 30 : 40)} y2={y + d} stroke={c} strokeWidth={LINE.hair} />
      ))}
      {[0, 2, 3, 5, 7, 8, 10, 12].map((b) => (
        <line key={b} x1={x + 6 + b * 2.4} y1={y + 23} x2={x + 6 + b * 2.4} y2={y + 27} stroke={c} strokeWidth={LINE.hair} />
      ))}
    </g>
  );
}

/** A note of symptoms: a slip with a small cross and written lines. */
function SymptomNote({ x, y, c = PAT.ink }: { x: number; y: number; c?: string }) {
  return (
    <g>
      <path d={`M${x} ${y}H${x + 36}L${x + 44} ${y + 8}V${y + 34}H${x}Z`} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} strokeLinejoin="round" />
      <path d={`M${x + 36} ${y}V${y + 8}H${x + 44}`} fill="none" stroke={c} strokeWidth={LINE.hair} />
      <path d={`M${x + 9} ${y + 6}V${y + 14}M${x + 5} ${y + 10}H${x + 13}`} stroke={c} strokeWidth={LINE.outline} />
      {[19, 25, 30].map((d, i) => (
        <line key={d} x1={x + 6} y1={y + d} x2={x + (i === 2 ? 26 : 38)} y2={y + d} stroke={c} strokeWidth={LINE.hair} />
      ))}
    </g>
  );
}

/**
 * One shopper shares two details: an address label flows to a parcel on a
 * house's doorstep, and a note of symptoms flows to a pharmacist behind a
 * counter. Switched to the advertising model, both details are piped (red)
 * from where they were shared into a model housing that drives a megaphone.
 */
export function ContextFlows() {
  const [use, setUse] = useState<"context" | "ads">("context");
  const id = "w6-ctx";
  const ads = use === "ads";
  const R = PAT.signal;
  return (
    <div>
      <Frame
        width={620}
        height={330}
        label={`Patent drawing of one shopper sharing two details. Upper flow: an address label passes to a parcel on the doorstep of a house, to receive a package. Lower flow: a note of symptoms passes to a pharmacist behind a counter. To the right stands a model housing driving a megaphone, an advertising model. ${ads ? "Both details are now piped, in red, from the house and from the counter into the advertising model." : "Each detail stays within the context in which it was shared. Nothing flows to the advertising model."}`}
      >
        <PatentDefs id={id} />
        <line x1={14} y1={300} x2={606} y2={300} {...hair} />
        <Figure id={id} x={58} y={300} s={1.25} arm="reach" />
        {/* upper flow: the address label to the parcel and house */}
        <path d="M100 210Q120 96 150 92" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
        <AddressLabel x={154} y={76} />
        <line x1={206} y1={92} x2={236} y2={92} {...hair} />
        <path d={headAlongPath(244, 92, 1, 0, 8)} fill="none" {...ink} />
        <line x1={240} y1={130} x2={384} y2={130} {...hair} />
        <House id={id} x={300} y={130} w={58} h={40} />
        <ObliqueBox id={id} x={252} y={106} w={34} h={24} dx={8} dy={5} />
        <line x1={269} y1={106} x2={269} y2={130} {...hair} />
        {/* lower flow: the note of symptoms to the pharmacist */}
        <path d="M100 236Q120 232 150 232" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
        <SymptomNote x={154} y={216} />
        <line x1={206} y1={233} x2={236} y2={233} {...hair} />
        <path d={headAlongPath(244, 233, 1, 0, 8)} fill="none" {...ink} />
        <Figure id={id} x={318} y={300} s={1.25} flip arm="reach" coat="paper" />
        <ObliqueBox id={id} x={252} y={250} w={92} h={50} dx={10} dy={6} />
        <path d="M268 250V240H280V250M266 240H282" fill={PAT.paper} {...ink} />
        {/* the advertising model */}
        <ObliqueBox id={id} x={470} y={150} w={70} h={66} dx={12} dy={8} />
        <Gear cx={493} cy={174} r={10} n={10} />
        <Gear cx={518} cy={198} r={8} n={8} phase={0.25} />
        <Megaphone x={554} y={158} size={40} weight="light" color={ads ? R : PAT.ink} />
        <line x1={470} y1={216} x2={552} y2={216} {...hair} />
        {ads ? (
          <g>
            <path d="M376 112Q440 120 466 170" fill="none" stroke={R} strokeWidth={LINE.bold} strokeDasharray="5 3" />
            <path d={headAlongPath(468, 176, 0.35, 1, 9)} fill="none" stroke={R} strokeWidth={LINE.bold} />
            <path d="M356 262Q430 260 466 206" fill="none" stroke={R} strokeWidth={LINE.bold} strokeDasharray="5 3" />
            <path d={headAlongPath(468, 202, 0.6, -1, 9)} fill="none" stroke={R} strokeWidth={LINE.bold} />
          </g>
        ) : null}
      </Frame>
      <Segmented
        label="Use"
        options={[
          { id: "context", label: "As shared" },
          { id: "ads", label: "Train an advertising model" },
        ]}
        value={use}
        onChange={setUse}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 1: Data Provenance in Training and Personalization
   -------------------------------------------------------------------------- */

/** A dataset drum: an upright cylinder with hairline bands and a light-stippled cap. */
function Drum({ id, cx, y, rx = 34, ry = 10, h = 70, bands = 3 }: { id: string; cx: number; y: number; rx?: number; ry?: number; h?: number; bands?: number }) {
  const top = y - h;
  return (
    <g>
      <path d={`M${cx - rx} ${top}V${y}A${rx} ${ry} 0 0 0 ${cx + rx} ${y}V${top}`} fill={PAT.paper} {...ink} />
      <path d={`M${cx + rx * 0.55} ${r2(top + ry * 0.84)}V${r2(y + ry * 0.84)}A${rx} ${ry} 0 0 0 ${cx + rx} ${y}V${top}Z`} fill={stip(id, "dense")} stroke="none" />
      {Array.from({ length: bands }, (_, i) => {
        const yy = r2(top + ((i + 1) * h) / (bands + 1));
        return <path key={i} d={`M${cx - rx} ${yy}A${rx} ${ry} 0 0 0 ${cx + rx} ${yy}`} fill="none" {...hair} />;
      })}
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={stip(id, "light")} {...ink} />
    </g>
  );
}

/**
 * A dataset drawn as its lineage: three source sheets at left feed through
 * a sieve (the transformation) into a dataset drum, which feeds two models
 * at right. From the drum hangs its provenance tag, with one row for
 * each thing provenance records.
 */
export function ProvenanceTag() {
  const id = "w6-prov";
  const R = PAT.ink;
  const rows = ["Origin", "Authority", "Transformation", "Downstream models"];
  return (
    <Frame
      width={600}
      height={330}
      label="Patent drawing of a dataset's lineage: three source sheets at left pass through a sieve into a dataset drum, which feeds two model housings at right. A provenance tag hangs on a string from the drum, with one written row each for origin, authority, transformation and downstream models."
    >
      <PatentDefs id={id} />
      {/* sources */}
      {[40, 92, 144].map((y) => (
        <Sheet key={y} id={id} x={24} y={y} w={54} d={26} sk={12} lines={2} />
      ))}
      {[30, 82, 134].map((y, i) => (
        <path key={y} d={`M96 ${y}Q132 ${y + (1 - i) * -8} 156 ${88 + (i - 1) * 8}`} fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      ))}
      {/* the sieve: a funnel with a mesh */}
      <path d="M160 70H224L206 106H178Z" fill={PAT.paper} {...ink} />
      <ellipse cx={192} cy={70} rx={32} ry={7} fill={stip(id, "light")} {...ink} />
      {[176, 186, 196, 206].map((x) => (
        <line key={x} x1={x} y1={78} x2={x + (192 - x) * 0.4} y2={104} {...hair} />
      ))}
      <path d="M186 106V118H198V106" fill="none" {...ink} />
      <line x1={192} y1={124} x2={192} y2={140} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={`M192 140Q194 150 236 150`} fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(258, 150, 1, 0, 8)} fill="none" {...ink} />
      <line x1={236} y1={150} x2={252} y2={150} {...hair} />
      {/* the dataset drum */}
      <Drum id={id} cx={306} y={180} h={78} rx={38} ry={11} />
      {/* downstream models */}
      <path d="M352 120Q400 100 430 92" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(438, 90, 1, -0.25, 8)} fill="none" {...ink} />
      <path d="M352 160Q400 176 430 184" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(438, 186, 1, 0.25, 8)} fill="none" {...ink} />
      <SmallModel id={id} x={448} y={56} w={60} h={56} />
      <SmallModel id={id} x={448} y={160} w={60} h={56} />
      {/* the provenance tag on its string */}
      <path d="M306 192Q300 220 276 236" fill="none" stroke={R} strokeWidth={LINE.outline} />
      <path d="M150 236H480V322H150L134 279Z" fill={PAT.paper} stroke={R} strokeWidth={LINE.bold} strokeLinejoin="round" />
      <circle cx={148} cy={279} r={3} fill="none" stroke={R} strokeWidth={LINE.hair} />
      {rows.map((k, i) => (
        <g key={k}>
          <PatentKey x={166} y={256 + i * 19} anchor="start" size={12.5} fill={R}>
            {k}
          </PatentKey>
          <line x1={400} y1={253 + i * 19} x2={466} y2={253 + i * 19} stroke={R} strokeWidth={LINE.hair} />
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   A Taxonomy of Customer Data
   -------------------------------------------------------------------------- */

/** A small upright form, front view, with hairline rows and tick boxes. */
function Form({ x, y, w = 56, h = 72, rows = 4, ticks = 0 }: { x: number; y: number; w?: number; h?: number; rows?: number; ticks?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={PAT.paper} {...ink} />
      {Array.from({ length: rows }, (_, i) => {
        const yy = r2(y + 14 + i * ((h - 22) / Math.max(rows - 1, 1)));
        return (
          <g key={i}>
            <rect x={x + 7} y={yy - 4} width={7} height={7} fill={PAT.paper} {...hair} />
            {i < ticks ? <path d={tick(x + 10.5, yy - 0.5, 3.2)} fill="none" {...ink} /> : null}
            <line x1={x + 19} y1={yy + 1} x2={x + w - 7} y2={yy + 1} {...hair} />
          </g>
        );
      })}
    </g>
  );
}

/**
 * Four origins of customer data, one small figure each. Volunteered: a
 * customer hands a ticked form into a firm's tray. Observed: a shop floor in
 * plan, crossed by the customer's dotted trace, watched by an eye. Inferred:
 * a model housing takes a form and a trace and turns a dial to a
 * probability. Scraped: a crane grab lifts posts off public web pages into a
 * hopper.
 */
export function DataOrigin({ kind }: { kind: "volunteered" | "observed" | "inferred" | "scraped" }) {
  const id = `w6-origin-${kind}`;
  const labels = {
    volunteered: "Patent drawing of a customer handing a filled, ticked form into a firm's tray: volunteered data.",
    observed: "Patent drawing of a shop floor in plan with shelves, crossed by a customer's dotted location trace that dwells by one shelf and ends at the till, watched by an eye: observed data.",
    inferred: "Patent drawing of a model housing taking in a form and a dotted trace and turning a dial to a probability of 0.82: inferred data.",
    scraped: "Patent drawing of a crane grab lifting posts off three public web pages into a hopper: scraped data.",
  } as const;
  return (
    <Frame width={300} height={190} label={labels[kind]}>
      <PatentDefs id={id} />
      <line x1={10} y1={176} x2={290} y2={176} {...hair} />
      {kind === "volunteered" ? (
        <g>
          <Figure id={id} x={62} y={176} s={1.7} arm="reach" />
          <g transform="rotate(-8 136 72)">
            <Form x={114} y={36} w={46} h={60} rows={3} ticks={3} />
          </g>
          <path d="M170 60Q214 58 230 96" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
          <path d={headAlongPath(232, 102, 0.3, 1, 7)} fill="none" {...ink} />
          {/* the firm's tray on a desk */}
          <ObliqueBox id={id} x={188} y={124} w={92} h={52} dx={10} dy={6} />
          <path d="M200 124L206 108H262L256 124" fill={PAT.paper} {...ink} />
          <Sheet id={id} x={208} y={120} w={36} d={10} sk={6} />
        </g>
      ) : null}
      {kind === "observed" ? (
        <g>
          <Sheet id={id} x={20} y={166} w={200} d={96} sk={60} t={4} />
          {[
            [66, 140],
            [130, 140],
            [90, 98],
            [150, 98],
          ].map(([x, y]) => (
            <ObliqueBox key={`${x}${y}`} id={id} x={x} y={y} w={40} h={10} dx={8} dy={5} />
          ))}
          <ObliqueBox id={id} x={230} y={76} w={26} h={12} dx={6} dy={4} />
          {[
            [36, 160],
            [46, 150],
            [57, 140],
            [70, 129],
            [85, 123],
            [101, 122],
            [117, 122],
            [133, 122],
            [166, 121],
            [182, 120],
            [197, 116],
            [210, 108],
            [221, 99],
          ].map(([x, y]) => (
            <circle key={`${x}`} cx={x} cy={y} r={1.8} fill={PAT.ink} />
          ))}
          <circle cx={150} cy={122} r={3.2} fill={PAT.ink} />
          <circle cx={150} cy={122} r={8} fill="none" {...hair} />
          <circle cx={150} cy={122} r={12.5} fill="none" {...hair} strokeDasharray="2 2" />
          <Eye x={18} y={12} size={40} weight="light" color={PAT.ink} />
          <line x1={52} y1={52} x2={74} y2={80} {...hair} strokeDasharray="3 3" />
        </g>
      ) : null}
      {kind === "inferred" ? (
        <g>
          <Form x={16} y={46} w={40} h={50} rows={3} ticks={2} />
          {[
            [18, 152],
            [28, 146],
            [39, 148],
            [50, 154],
            [61, 150],
            [70, 142],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r={1.8} fill={PAT.ink} />
          ))}
          <path d="M62 72Q86 74 100 92" fill="none" {...hair} />
          <path d={headAlongPath(104, 98, 0.5, 1, 7)} fill="none" {...ink} />
          <path d="M74 146Q90 140 100 126" fill="none" {...hair} />
          <path d={headAlongPath(104, 120, 0.5, -1, 7)} fill="none" {...ink} />
          <ObliqueBox id={id} x={108} y={82} w={70} h={64} dx={12} dy={8} />
          <Gear cx={130} cy={104} r={10} n={10} />
          <Gear cx={156} cy={126} r={8} n={8} phase={0.25} />
          <line x1={192} y1={112} x2={204} y2={112} {...hair} />
          <path d={headAlongPath(210, 112, 1, 0, 7)} fill="none" {...ink} />
          <Dial cx={248} cy={112} r={30} deg={46} />
          <Num x={248} y={164} size={17}>
            0.82
          </Num>
        </g>
      ) : null}
      {kind === "scraped" ? (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${12 + i * 16} ${44 + i * 30})`}>
              <rect x={0} y={0} width={100} height={66} fill={PAT.paper} {...ink} />
              <line x1={0} y1={9} x2={100} y2={9} {...hair} />
              {[0, 1, 2].map((c) => (
                <circle key={c} cx={5 + c * 5} cy={4.5} r={1.4} fill="none" {...hair} />
              ))}
              {[0, 1, 2].map((r) => {
                const lifted = i === 2 && r === 1;
                return (
                  <g key={r} strokeDasharray={lifted ? "3 2" : undefined}>
                    <rect x={6} y={14 + r * 17} width={88} height={14} fill="none" {...hair} />
                    {lifted ? null : (
                      <>
                        <circle cx={13} cy={21 + r * 17} r={3.5} fill="none" {...hair} />
                        <line x1={21} y1={19 + r * 17} x2={84} y2={19 + r * 17} {...hair} />
                        <line x1={21} y1={24 + r * 17} x2={66} y2={24 + r * 17} {...hair} />
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          ))}
          {/* the crane grab */}
          <line x1={150} y1={12} x2={292} y2={12} {...ink} strokeWidth={LINE.bold} />
          <ObliqueBox id={id} x={186} y={14} w={24} h={10} dx={5} dy={3} />
          <line x1={198} y1={24} x2={198} y2={50} {...ink} />
          <path d="M182 52H214L220 70L208 86M182 52L176 70L188 86" fill="none" {...ink} strokeWidth={LINE.bold} />
          {[0, 1, 2].map((i) => (
            <Chip key={i} id={id} x={186} y={82 - i * 6} w={18} d={6} sk={6} />
          ))}
          <path d="M132 110Q150 96 172 84" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
          <path d="M222 90Q240 96 244 108" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
          <path d={headAlongPath(246, 114, 0.25, 1, 7)} fill="none" {...ink} />
          {/* the hopper */}
          <path d="M214 124H284L268 152H230Z" fill={PAT.paper} {...ink} />
          <ellipse cx={249} cy={124} rx={35} ry={7} fill={stip(id, "light")} {...ink} />
          <path d="M236 152V176M262 152V176" fill="none" {...ink} />
        </g>
      ) : null}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Purpose Limitation and Secondary Use in Foundation Models
   -------------------------------------------------------------------------- */

/** A tape reel seen face on: rim, hub and three spokes. */
function Reel({ cx, cy, r = 16, c = PAT.ink }: { cx: number; cy: number; r?: number; c?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      <circle cx={cx} cy={cy} r={r2(r * 0.62)} fill="none" stroke={c} strokeWidth={LINE.hair} />
      <circle cx={cx} cy={cy} r={r2(r * 0.22)} fill="none" stroke={c} strokeWidth={LINE.outline} />
      {[0, 120, 240].map((a) => {
        const t = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={r2(cx + Math.cos(t) * r * 0.22)}
            y1={r2(cy + Math.sin(t) * r * 0.22)}
            x2={r2(cx + Math.cos(t) * r * 0.62)}
            y2={r2(cy + Math.sin(t) * r * 0.62)}
            stroke={c}
            strokeWidth={LINE.hair}
          />
        );
      })}
    </g>
  );
}

/**
 * An archive cabinet of old service-call reels, stamped with the purpose
 * they were collected for, is piped toward a fine-tuning model. A sluice
 * gate in the pipe is purpose limitation: with neither fresh consent nor
 * de-identification it stays shut and the repurposed flow (red) backs up
 * against it. Either one lifts the gate and the flow reaches the model.
 */
export function PurposeGate() {
  const [basis, setBasis] = useState<("consent" | "deid")[]>([]);
  const id = "w6-gate";
  const open = basis.length > 0;
  const consent = basis.includes("consent");
  const deid = basis.includes("deid");
  const py = 132;
  const gx = 360;
  const flowEnd = open ? 500 : gx - 8;
  const fc = open ? PAT.ink : PAT.signal;
  const reels = [
    [70, 70],
    [122, 70],
    [70, 120],
    [122, 120],
    [70, 170],
    [122, 170],
  ];
  return (
    <div>
      <Frame
        width={640}
        height={250}
        label={`Patent drawing of an archive cabinet of service-call reels stamped quality assurance, piped toward a fine-tuning model through a sluice gate, purpose limitation. ${open ? `With ${[consent ? "explicit opt-in consent (a tick tag on each reel)" : "", deid ? "rigorous de-identification (each reel's name line struck out)" : ""].filter(Boolean).join(" and ")}, the gate is raised and the flow reaches the model.` : "With neither explicit opt-in consent nor rigorous de-identification, the gate is shut and the repurposed flow, in red, backs up against it."}`}
      >
        <PatentDefs id={id} />
        <line x1={14} y1={226} x2={626} y2={226} {...hair} />
        {/* the archive cabinet */}
        <ObliqueBox id={id} x={30} y={40} w={130} h={186} dx={14} dy={9} />
        {[95, 145].map((y) => (
          <line key={y} x1={30} y1={y} x2={160} y2={y} {...hair} />
        ))}
        {reels.map(([cx, cy]) => (
          <g key={`${cx}${cy}`}>
            <Reel cx={cx} cy={cy - 6} r={15} />
            {consent ? (
              <g>
                <rect x={cx + 9} y={cy + 6} width={12} height={10} fill={PAT.paper} {...hair} />
                <path d={tick(cx + 15, cy + 11, 3)} fill="none" {...ink} />
              </g>
            ) : null}
            {deid ? <line x1={cx - 14} y1={cy + 14} x2={cx + 4} y2={cy + 14} {...ink} strokeWidth={LINE.bold} /> : null}
            {!deid ? <line x1={cx - 14} y1={cy + 14} x2={cx + 4} y2={cy + 14} {...hair} /> : null}
          </g>
        ))}
        <line x1={30} y1={195} x2={160} y2={195} {...hair} />
        {/* the purpose stamp */}
        <g transform="rotate(-4 95 211)">
          <rect x={36} y={194} width={118} height={36} fill={PAT.paper} {...ink} />
          <PatentKey x={95} y={207} size={12.5}>
            Quality
          </PatentKey>
          <PatentKey x={95} y={225} size={12.5}>
            assurance
          </PatentKey>
        </g>
        {/* the pipe */}
        <line x1={174} y1={py - 12} x2={500} y2={py - 12} {...ink} />
        <line x1={174} y1={py + 12} x2={500} y2={py + 12} {...ink} />
        <rect x={175} y={py - 11} width={r2(flowEnd - 175)} height={22} fill={open ? stip(id, "light") : stip(id, "signal")} stroke="none" />
        {!open ? <line x1={176} y1={py - 12} x2={gx - 8} y2={py - 12} stroke={PAT.signal} strokeWidth={LINE.bold} /> : null}
        {!open ? <line x1={176} y1={py + 12} x2={gx - 8} y2={py + 12} stroke={PAT.signal} strokeWidth={LINE.bold} /> : null}
        {/* the sluice gate in its guides */}
        <rect x={gx - 8} y={py - 64} width={4} height={96} fill={stip(id, "dense")} {...hair} />
        <rect x={gx + 6} y={py - 64} width={4} height={96} fill={stip(id, "dense")} {...hair} />
        <rect x={gx - 4} y={open ? py - 60 : py - 14} width={10} height={44} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
        <line x1={gx + 1} y1={open ? py - 60 : py - 14} x2={gx + 1} y2={py - 76} {...ink} />
        <circle cx={gx + 1} cy={py - 80} r={4} fill={PAT.paper} {...ink} />
        <PatentKey x={gx + 1} y={py + 56} size={12.5}>
          Purpose limitation
        </PatentKey>
        <path d={headAlongPath(gx - 10, py, 1, 0, 9)} fill="none" stroke={fc} strokeWidth={LINE.outline} />
        {open ? <path d={headAlongPath(496, py, 1, 0, 9)} fill="none" {...ink} /> : null}
        {/* the fine-tuning model */}
        <ObliqueBox id={id} x={504} y={84} w={100} h={100} dx={14} dy={9} />
        <Gear cx={538} cy={118} r={15} n={12} />
        <Gear cx={574} cy={152} r={11} n={10} phase={0.25} />
        <PatentKey x={554} y={204} size={12.5}>
          Fine-tuning
        </PatentKey>
      </Frame>
      <Toggles
        label="Established"
        options={[
          { id: "consent", label: "Explicit opt-in consent" },
          { id: "deid", label: "Rigorous de-identification" },
        ]}
        value={basis}
        onChange={setBasis}
      />
    </div>
  );
}

/** Benign inputs and how far each pushes the inferred risk (0..1 of the dial). */
const BENIGN = [
  { id: "purchases", label: "Purchase histories", w: 0.3 },
  { id: "dwell", label: "Dwell time", w: 0.24 },
  { id: "location", label: "Location traces", w: 0.32 },
] as const;
type BenignId = (typeof BENIGN)[number]["id"];

/**
 * Three ordinary records (a receipt, a clock face, a dotted trace) feed a
 * model whose gauge reads an inferred risk. Each record switched on pushes
 * the needle further. Together they carry it past the mark into the zone
 * of sensitive personal data, where the needle turns red.
 */
export function SensitiveInference() {
  const [on, setOn] = useState<BenignId[]>(["purchases"]);
  const id = "w6-infer";
  const v = Math.min(0.98, 0.08 + BENIGN.filter((b) => on.includes(b.id)).reduce((a, b) => a + b.w, 0));
  const limit = 0.62;
  const sens = v >= limit;
  const gx = 302;
  const gy = 150;
  const gr = 56;
  const ang = (t: number) => Math.PI + t * Math.PI;
  const pt = (t: number, rr: number) => [r2(gx + Math.cos(ang(t)) * rr), r2(gy + Math.sin(ang(t)) * rr)];
  const [z0x, z0y] = pt(limit, gr);
  const [z1x, z1y] = pt(limit, gr - 14);
  const [nx, ny] = pt(v, gr - 8);
  const ys = [44, 104, 164];
  return (
    <div>
      <Frame
        width={380}
        height={196}
        label={`Patent drawing of three ordinary records, a receipt, a clock face for dwell time and a dotted location trace, feeding a model whose gauge reads an inferred risk. The top of the gauge beyond a mark is the stippled zone of sensitive personal data. ${on.length ? `With ${BENIGN.filter((b) => on.includes(b.id)).map((b) => b.label.toLowerCase()).join(" and ")} switched on,` : "With no records switched on,"} the needle reads ${Math.round(v * 100)} percent of the scale${sens ? ", in the sensitive zone, the needle turned red: the model has created sensitive personal data." : ", below the sensitive zone."}`}
      >
        <PatentDefs id={id} />
        {/* the three non-sensitive inputs */}
        {ys.map((y, i) => {
          const b = BENIGN[i];
          const live = on.includes(b.id);
          return (
            <g key={b.id} strokeDasharray={live ? undefined : "2 2"}>
              {i === 0 ? (
                <g>
                  <path d={`M24 ${y - 22}H58V${y + 18}L54 ${y + 22}L50 ${y + 18}L46 ${y + 22}L42 ${y + 18}L38 ${y + 22}L34 ${y + 18}L30 ${y + 22}L26 ${y + 18}L24 ${y + 20}Z`} fill={PAT.paper} {...ink} />
                  {[-14, -7, 0, 7].map((d) => (
                    <line key={d} x1={30} y1={y + d} x2={52} y2={y + d} {...hair} />
                  ))}
                </g>
              ) : null}
              {i === 1 ? (
                <g>
                  <circle cx={41} cy={y} r={19} fill={PAT.paper} {...ink} />
                  <path d={`M41 ${y - 13}V${y}L50 ${y + 6}`} fill="none" {...ink} />
                </g>
              ) : null}
              {i === 2 ? (
                <g>
                  {[
                    [22, y + 12],
                    [30, y + 4],
                    [39, y + 7],
                    [48, y],
                    [56, y - 8],
                    [62, y - 14],
                  ].map(([x, yy]) => (
                    <circle key={x} cx={x} cy={yy} r={2} fill={live ? PAT.ink : "none"} {...hair} />
                  ))}
                </g>
              ) : null}
              <path d={`M72 ${y}Q104 ${y} 116 ${r2(118 + (i - 1) * 16)}`} fill="none" {...hair} strokeDasharray={live ? CENTRE_DASH : "2 4"} />
            </g>
          );
        })}
        <path d={headAlongPath(126, 118, 1, 0, 8)} fill="none" {...ink} />
        <line x1={116} y1={118} x2={122} y2={118} {...hair} />
        {/* the model */}
        <ObliqueBox id={id} x={130} y={84} w={64} h={68} dx={12} dy={8} />
        <Gear cx={151} cy={106} r={10} n={10} />
        <Gear cx={176} cy={131} r={8} n={8} phase={0.25} />
        <line x1={206} y1={128} x2={240} y2={140} {...hair} />
        {/* the gauge */}
        <path d={`M${gx - gr} ${gy}A${gr} ${gr} 0 0 1 ${gx + gr} ${gy}Z`} fill={PAT.paper} {...ink} />
        <path d={`M${z0x} ${z0y}A${gr} ${gr} 0 0 1 ${gx + gr} ${gy}H${gx + gr - 14}A${gr - 14} ${gr - 14} 0 0 0 ${z1x} ${z1y}Z`} fill={stip(id, "dense")} {...hair} />
        {Array.from({ length: 11 }, (_, k) => {
          const [ax, ay] = pt(k / 10, gr);
          const [bx, by] = pt(k / 10, gr - 6);
          return <line key={k} x1={ax} y1={ay} x2={bx} y2={by} {...hair} />;
        })}
        <line x1={gx} y1={gy} x2={nx} y2={ny} stroke={sens ? PAT.signal : PAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" style={{ transition: "all 400ms ease" }} />
        <circle cx={gx} cy={gy} r={3} fill={PAT.ink} />
        <PatentKey x={gx + 62} y={84} size={12} anchor="end">
          Sensitive
        </PatentKey>
        <PatentKey x={gx} y={178} size={12}>
          Inferred data
        </PatentKey>
      </Frame>
      <Toggles
        label="Inputs"
        options={BENIGN.map((b) => ({ id: b.id, label: b.label }))}
        value={on}
        onChange={setOn}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Shadow Data Pipelines and Third-Party API Leakage
   -------------------------------------------------------------------------- */

/** A small padlock centred on (cx, cy). */
function Padlock({ cx, cy, c = PAT.ink }: { cx: number; cy: number; c?: string }) {
  return (
    <g>
      <path d={`M${cx - 4} ${cy - 2}V${cy - 6}A4 4 0 0 1 ${cx + 4} ${cy - 6}V${cy - 2}`} fill="none" stroke={c} strokeWidth={LINE.outline} />
      <rect x={cx - 6} y={cy - 2} width={12} height={10} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      <circle cx={cx} cy={cy + 3} r={1.2} fill={c} />
    </g>
  );
}

/** An open laptop on a desk, its base front edge from (x, y). */
function Laptop({ x, y, w = 40 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <path d={`M${x} ${y}L${x + 8} ${y - 6}H${x + w + 8}L${x + w} ${y}Z`} fill={PAT.paper} {...ink} />
      <path d={`M${x + 8} ${y - 6}L${x + 4} ${y - 34}H${x + w + 4}L${x + w + 8} ${y - 6}Z`} fill={PAT.paper} {...ink} />
      {[-26, -20, -14].map((d) => (
        <line key={d} x1={x + 12} y1={y + d} x2={x + w - 4} y2={y + d} {...hair} />
      ))}
    </g>
  );
}

/**
 * A building in section beside an external AI provider's building. On the
 * ground floor, the governed warehouse: locked data drums. Upstairs an
 * employee pastes a record from a laptop, and a pipe breaks out through the
 * wall to the provider. Under consumer-grade terms the record (red) is
 * retained in a drawer, read by a contractor and fed into training. Under
 * enterprise controls a DLP valve shuts the pipe, the provider keeps nothing,
 * and the employee works with a model hosted inside the building.
 */
export function ShadowPipeline() {
  const [terms, setTerms] = useState<"consumer" | "enterprise">("consumer");
  const id = "w6-shadow";
  const ent = terms === "enterprise";
  const R = PAT.signal;
  const fc = ent ? PAT.ink : R;
  const py = 176;
  return (
    <div>
      <Frame
        width={640}
        height={296}
        label={`Patent drawing of a building in section beside an external AI provider's building. On the ground floor stand locked data drums, the governed warehouse. Upstairs an employee pastes a record from a laptop into a pipe that breaks out through the wall to the provider. ${ent ? "Under enterprise controls a DLP valve on the pipe is shut. The provider's drawer, review desk and training compartment are empty under zero data retention. The employee uses a model hosted inside the building." : "Under consumer-grade terms the record, in red, is retained in the provider's drawer, read by a human contractor, and fed into a training run."}`}
      >
        <PatentDefs id={id} />
        <g transform="translate(0 -46)">
        <line x1={10} y1={332} x2={630} y2={332} {...ink} />
        {/* the firm's building in section: walls, floor and roof slabs */}
        <rect x={20} y={112} width={300} height={10} fill={stip(id, "dense")} {...ink} />
        <rect x={20} y={222} width={300} height={8} fill={stip(id, "dense")} {...ink} />
        <rect x={20} y={122} width={9} height={210} fill={stip(id, "dense")} {...ink} />
        <path d={`M311 122H320V${py - 18}L316 ${py - 14}L321 ${py - 10}L315 ${py - 6}H311Z`} fill={stip(id, "dense")} {...ink} />
        <path d={`M311 ${py + 18}H320V332H311V${py + 22}L315 ${py + 18}Z`} fill={stip(id, "dense")} {...ink} />
        <rect x={311} y={230} width={9} height={102} fill={stip(id, "dense")} {...ink} />
        {/* ground floor: the governed warehouse */}
        {[70, 130, 190].map((cx) => (
          <g key={cx}>
            <Drum id={id} cx={cx} y={318} rx={22} ry={7} h={58} bands={2} />
            <Padlock cx={cx} cy={292} />
          </g>
        ))}
        {/* upstairs: the employee at a desk */}
        <ObliqueBox id={id} x={120} y={190} w={130} h={32} dx={10} dy={6} />
        <Figure id={id} x={96} y={222} s={1.15} arm="reach" />
        <Laptop x={150} y={186} w={40} />
        <Sheet id={id} x={206} y={186} w={26} d={10} sk={6} lines={1} />
        {ent ? <SmallModel id={id} x={256} y={132} w={40} h={32} /> : null}
        {ent ? <line x1={196} y1={160} x2={252} y2={150} {...hair} strokeDasharray={CENTRE_DASH} /> : null}
        {/* the pipe out through the wall */}
        <path d={`M196 ${py - 4}Q210 ${py - 6} 226 ${py - 6}H428`} fill="none" stroke={fc} strokeWidth={LINE.outline} />
        <path d={`M196 ${py + 4}Q210 ${py + 6} 226 ${py + 6}H428`} fill="none" stroke={fc} strokeWidth={LINE.outline} />
        {!ent ? <rect x={228} y={py - 5} width={198} height={10} fill={stip(id, "signal")} stroke="none" /> : null}
        {ent ? (
          <g>
            <circle cx={360} cy={py} r={13} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
            <line x1={351} y1={py - 9} x2={369} y2={py + 9} {...ink} strokeWidth={LINE.bold} />
            <line x1={360} y1={py - 13} x2={360} y2={py - 26} {...ink} />
            <line x1={352} y1={py - 26} x2={368} y2={py - 26} {...ink} strokeWidth={LINE.bold} />
            <PatentKey x={360} y={py + 32} size={12}>
              DLP
            </PatentKey>
          </g>
        ) : null}
        {/* the external provider */}
        <ObliqueBox id={id} x={430} y={64} w={176} h={268} dx={14} dy={9} />
        {[152, 242].map((y) => (
          <line key={y} x1={430} y1={y} x2={606} y2={y} {...ink} />
        ))}
        {/* retained: a drawer of records */}
        <rect x={446} y={92} width={144} height={50} fill={PAT.paper} {...ink} />
        <line x1={500} y1={100} x2={536} y2={100} {...ink} strokeWidth={LINE.bold} />
        {!ent ? [0, 1, 2, 3].map((i) => <Sheet key={i} id={id} x={462 + i * 26} y={136} w={18} d={22} sk={6} fill={i === 1 ? stip(id, "signal") : PAT.paper} stroke={i === 1 ? R : PAT.ink} />) : null}
        {ent ? (
          <g>
            <PatentKey x={518} y={114} size={11.5}>
              Zero data
            </PatentKey>
            <PatentKey x={518} y={130} size={11.5}>
              retention
            </PatentKey>
          </g>
        ) : (
          <PatentKey x={596} y={82} size={12.5} anchor="end">
            Retained
          </PatentKey>
        )}
        {/* reviewed: a contractor reading */}
        {!ent ? (
          <g>
            <Figure id={id} x={480} y={236} s={0.95} arm="reach" />
            <Sheet id={id} x={504} y={190} w={22} d={12} sk={6} fill={stip(id, "signal")} stroke={R} />
            <ObliqueBox id={id} x={498} y={204} w={72} h={32} dx={8} dy={5} />
          </g>
        ) : (
          <ObliqueBox id={id} x={498} y={204} w={72} h={32} dx={8} dy={5} />
        )}
        {!ent ? (
          <PatentKey x={596} y={172} size={12.5} anchor="end">
            Reviewed
          </PatentKey>
        ) : null}
        {/* training: a run of gears fed records */}
        <Gear cx={548} cy={284} r={16} n={12} />
        <Gear cx={580} cy={300} r={11} n={10} phase={0.25} />
        {!ent ? <Sheet id={id} x={464} y={300} w={24} d={14} sk={6} fill={stip(id, "signal")} stroke={R} /> : null}
        {!ent ? <path d={headAlongPath(526, 290, 1, -0.2, 7)} fill="none" stroke={R} strokeWidth={LINE.outline} /> : null}
        {!ent ? <line x1={496} y1={295} x2={520} y2={291} stroke={R} strokeWidth={LINE.hair} /> : null}
        {!ent ? (
          <PatentKey x={596} y={262} size={12.5} anchor="end">
            Training
          </PatentKey>
        ) : null}
        {!ent ? <path d={headAlongPath(428, py, 1, 0, 8)} fill="none" stroke={R} strokeWidth={LINE.outline} /> : null}
        </g>
      </Frame>
      <Segmented
        label="Terms"
        options={[
          { id: "consumer", label: "Consumer-grade" },
          { id: "enterprise", label: "Enterprise controls" },
        ]}
        value={terms}
        onChange={setTerms}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 2: Consent, Contextual Integrity, and the Limits of Notice-and-Choice
   -------------------------------------------------------------------------- */

/**
 * A privacy policy as a tower of printed pages, taller than the customer
 * who stands beside it. Across from them, on a small console, one I AGREE
 * button under a cursor.
 */
export function PolicyScroll() {
  const id = "w6-scroll";
  const fy = 292;
  const tx = 96;
  const top = 34;
  return (
    <Frame
      width={560}
      height={312}
      label="Patent drawing of a privacy policy as a tower of printed pages more than twice the height of the customer standing beside it, page edges drawn along its side and written lines on its top page. Across from them a small console with a single I agree button under a cursor."
    >
      <PatentDefs id={id} />
      <line x1={12} y1={fy} x2={548} y2={fy} {...hair} />
      {/* the tower of pages */}
      <path d={`M${tx} ${top}L${tx + 30} ${top - 16}H${tx + 130}L${tx + 100} ${top}Z`} fill={PAT.paper} {...ink} />
      {[0, 1, 2, 3].map((k) => (
        <line key={k} x1={r2(tx + 24 + k * 4)} y1={r2(top - 4 - k * 3)} x2={r2(tx + 96 + k * 4)} y2={r2(top - 4 - k * 3)} {...hair} />
      ))}
      <path d={`M${tx + 100} ${top}L${tx + 130} ${top - 16}V${fy - 16}L${tx + 100} ${fy}Z`} fill={stip(id, "light")} {...ink} />
      <rect x={tx} y={top} width={100} height={fy - top} fill={PAT.paper} {...ink} />
      {Array.from({ length: 42 }, (_, i) => {
        const y = r2(top + 6 + i * 6);
        return <line key={i} x1={tx} y1={y} x2={tx + 100} y2={y} {...hair} />;
      })}
      {/* the customer beside it */}
      <Figure id={id} x={268} y={fy} s={1.3} arm="reach" />
      {/* the console with one button */}
      <ObliqueBox id={id} x={340} y={232} w={180} h={60} dx={12} dy={8} />
      <ObliqueBox id={id} x={372} y={250} w={100} h={22} dx={6} dy={4} />
      <PatentKey x={422} y={266} size={12.5}>
        I agree
      </PatentKey>
      <Cursor x={468} y={262} size={30} weight="light" color={PAT.ink} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Contextual Integrity and Informational Norms
   -------------------------------------------------------------------------- */

/** A classical office front (pediment and columns): the insurer. */
function Office({ id, x, y, w = 150, h = 120, c = PAT.ink }: { id: string; x: number; y: number; w?: number; h?: number; c?: string }) {
  const o = { stroke: c, strokeWidth: LINE.outline, strokeLinejoin: "round" as const };
  const cols = 5;
  return (
    <g>
      <path d={`M${x} ${y - h + 34}L${x + w / 2} ${y - h}L${x + w} ${y - h + 34}Z`} fill={stip(id, "light")} {...o} />
      <rect x={x + 6} y={y - h + 34} width={w - 12} height={10} fill={PAT.paper} {...o} />
      {Array.from({ length: cols }, (_, i) => {
        const cx = r2(x + 18 + (i * (w - 36)) / (cols - 1));
        return <rect key={i} x={cx - 6} y={y - h + 44} width={12} height={h - 56} fill={PAT.paper} {...o} />;
      })}
      <rect x={x} y={y - 12} width={w} height={12} fill={stip(id, "dense")} {...o} />
    </g>
  );
}

/**
 * One information flow drawn with its five parameters keyed above it: the
 * patient is the data subject and the sender. Their support-group post is
 * the information type. The seal on its envelope is the transmission
 * principle. And the peers receiving it are the recipient. Switching the
 * recipient to an insurer (an office front) or the principle to commercial
 * underwriting (a coin seal) reddens what changed and stamps the flow a
 * privacy violation.
 */
export function FlowParameters() {
  const [changed, setChanged] = useState<("recipient" | "principle")[]>([]);
  const id = "w6-ci";
  const R = PAT.signal;
  const recip = changed.includes("recipient");
  const princ = changed.includes("principle");
  const bad = recip || princ;
  const fy = 300;
  const tags: { k: [string, string]; v: string; x: number; tx: number; ty: number; red: boolean }[] = [
    { k: ["Data", "subject"], v: "the patient", x: 70, tx: 112, ty: 170, red: false },
    { k: ["", "Sender"], v: "the patient", x: 210, tx: 170, ty: 214, red: false },
    { k: ["Information", "type"], v: "a support-group post", x: 352, tx: 352, ty: 196, red: false },
    { k: ["Transmission", "principle"], v: princ ? "commercial underwriting" : "mutual support", x: 520, tx: 432, ty: 196, red: princ },
    { k: ["", "Recipient"], v: recip ? "an insurer" : "peers", x: 720, tx: 720, ty: 168, red: recip },
  ];
  return (
    <div>
      <Frame
        width={900}
        height={306}
        label={`Patent drawing of one information flow with its five parameters keyed above it. The patient, data subject and sender, hands a sealed envelope holding a support-group post toward its recipient. Transmission principle: ${princ ? "commercial underwriting, a coin seal, in red" : "mutual support, a seal of two linked rings"}. Recipient: ${recip ? "an insurer, an office front, in red" : "peers, three people standing together"}. ${bad ? "The changed parameters are red and the flow is stamped privacy violation." : "No parameter has changed: the flow is appropriate to its context."}`}
      >
        <PatentDefs id={id} />
        <line x1={14} y1={fy} x2={886} y2={fy} {...hair} />
        {/* the patient: subject and sender */}
        <Figure id={id} x={120} y={fy} s={1.6} arm="reach" />
        {/* the envelope with its post and seal */}
        <path d="M168 214Q200 212 276 220" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={headAlongPath(284, 222, 1, 0.2, 8)} fill="none" {...ink} />
        <Sheet id={id} x={318} y={206} w={68} d={26} sk={14} lines={2} />
        <path d="M334 192V200M330 196H338" stroke={PAT.ink} strokeWidth={LINE.outline} />
        <rect x={290} y={206} width={130} height={76} fill={PAT.paper} {...ink} />
        <path d="M290 206L355 250L420 206" fill="none" {...ink} />
        {princ ? (
          <g>
            <circle cx={420} cy={206} r={15} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.bold} />
            <circle cx={420} cy={206} r={10} fill={PAT.paper} stroke={R} strokeWidth={LINE.outline} />
            <Num x={420} y={211} size={14} fill={R}>
              $
            </Num>
          </g>
        ) : (
          <g>
            <circle cx={420} cy={206} r={15} fill={stip(id, "light")} {...ink} />
            <circle cx={415} cy={206} r={6} fill={PAT.paper} {...ink} />
            <circle cx={425} cy={206} r={6} fill="none" {...ink} />
          </g>
        )}
        <line x1={432} y1={244} x2={590} y2={244} {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={headAlongPath(600, 244, 1, 0, 9)} fill="none" {...ink} />
        {/* the recipient */}
        {recip ? (
          <Office id={id} x={640} y={fy} w={170} h={140} c={R} />
        ) : (
          <g>
            <Figure id={id} x={668} y={fy} s={1.45} flip arm="reach" coat="paper" />
            <Figure id={id} x={724} y={fy} s={1.45} flip coat="paper" />
            <Figure id={id} x={780} y={fy} s={1.45} flip coat="paper" />
          </g>
        )}
        {/* the five keyed parameters */}
        {tags.map((t) => {
          const c = t.red ? R : PAT.ink;
          return (
            <g key={t.k[1]}>
              {t.k[0] ? (
                <PatentKey x={t.x} y={26} size={12} fill={c}>
                  {t.k[0]}
                </PatentKey>
              ) : null}
              <PatentKey x={t.x} y={44} size={12} fill={c}>
                {t.k[1]}
              </PatentKey>
              <FigureName x={t.x} y={64} size={14}>
                <tspan fill={c}>{t.v}</tspan>
              </FigureName>
              <path d={`M${t.x} 72Q${r2((t.x + t.tx) / 2)} ${r2((72 + t.ty) / 2 - 10)} ${t.tx} ${t.ty}`} fill="none" stroke={c} strokeWidth={LINE.hair} />
            </g>
          );
        })}
        {/* the finding */}
        <g transform="rotate(-5 520 276)">
          <rect x={434} y={260} width={172} height={32} fill="none" stroke={bad ? R : PAT.ink} strokeWidth={LINE.bold} />
          <PatentKey x={520} y={281} size={12} fill={bad ? R : PAT.ink}>
            {bad ? "Privacy violation" : "Appropriate flow"}
          </PatentKey>
        </g>
      </Frame>
      <Toggles
        label="Change"
        options={[
          { id: "recipient", label: "Recipient: an insurer" },
          { id: "principle", label: "Principle: commercial underwriting" },
        ]}
        value={changed}
        onChange={setChanged}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Why Notice-and-Choice Fails in AI Ecosystems
   -------------------------------------------------------------------------- */

/** Minutes to read one typical privacy policy at reading speed. */
const MIN_PER_POLICY = 10;

/**
 * The services a consumer meets in a year set against the time their
 * policies take to read. The slider adds services. The pile of policies
 * grows, and a calendar of thirty working days fills one day per eight
 * hours of reading, at ten minutes a policy.
 */
export function PolicyHours() {
  const [n, setN] = useState(1200);
  const id = "w6-hours";
  const hours = (n * MIN_PER_POLICY) / 60;
  const days = hours / 8;
  const pile = Math.max(2, Math.round(n / 40));
  const by = 136;
  return (
    <div>
      <Frame
        width={560}
        height={150}
        label={`Patent drawing of a pile of privacy policies for ${n} digital services beside a calendar of thirty working days. At ten minutes a policy, reading them takes ${Math.round(hours)} hours, which fills ${Math.min(30, Math.round(days * 10) / 10)} of the working days.`}
      >
        <PatentDefs id={id} />
        <line x1={12} y1={by} x2={140} y2={by} {...hair} />
        {Array.from({ length: pile }, (_, i) => (
          <Sheet key={i} id={id} x={40 + ((i * 7) % 3)} y={by - 4 - i * 3} w={70} d={18} sk={20} t={2} lines={i === pile - 1 ? 2 : 0} />
        ))}
        <Num x={150} y={by - 18} size={16} anchor="start">
          {`${n}`}
        </Num>
        <PatentKey x={150} y={by} size={12} anchor="start">
          Policies
        </PatentKey>
        {/* thirty working days, filled per eight hours read */}
        {Array.from({ length: 30 }, (_, k) => {
          const col = k % 6;
          const row = Math.floor(k / 6);
          const x = 236 + col * 30;
          const y = 14 + row * 24;
          const f = Math.max(0, Math.min(1, days - k));
          return (
            <g key={k}>
              <rect x={x} y={y} width={26} height={20} fill={PAT.paper} {...hair} />
              {f > 0 ? <rect x={x} y={y} width={r2(26 * f)} height={20} fill={stip(id, "dense")} {...hair} /> : null}
            </g>
          );
        })}
        <Num x={430} y={56} size={28} anchor="start">
          {`${Math.round(hours)}`}
        </Num>
        <PatentKey x={430} y={76} size={12} anchor="start">
          Hours
        </PatentKey>
        <Num x={430} y={112} size={15} anchor="start">
          {`${Math.round(days * 10) / 10} working days`}
        </Num>
      </Frame>
      <Slider label="Services in a year" value={n} min={50} max={1400} step={50} onChange={setN} />
    </div>
  );
}

/**
 * A time line from the moment of consent: a ticked form at left, then raw
 * behavioral logs running on as dots. Partway along, an opaque screen
 * stands across the line. Behind it, in hidden dashed outline, a future
 * model reads the logs and turns a dial to a trait nobody saw coming.
 */
export function HiddenFuture() {
  const id = "w6-future";
  const ty = 112;
  return (
    <Frame
      width={560}
      height={150}
      label="Patent drawing of a time line starting at the moment of consent, a ticked form, with raw behavioral logs running on as dots. An opaque stippled screen stands across the line. Behind it, drawn in hidden dashed outline, a future machine learning model reads the logs and sets a dial to an inferred trait."
    >
      <PatentDefs id={id} />
      <line x1={14} y1={ty} x2={540} y2={ty} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(548, ty, 1, 0, 8)} fill="none" {...ink} />
      <Form x={82} y={28} w={44} h={58} rows={3} ticks={3} />
      <line x1={104} y1={92} x2={104} y2={ty + 6} {...ink} />
      <PatentKey x={106} y={138} size={12}>
        Moment of consent
      </PatentKey>
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} cx={r2(136 + i * 6.6)} cy={r2(ty - 18 + Math.sin(i * 1.3) * 5)} r={1.8} fill={PAT.ink} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={r2(316 + i * 8)} cy={r2(ty - 18 + Math.sin((i + 27) * 1.3) * 5)} r={1.8} fill="none" {...hair} />
      ))}
      {/* the opaque screen */}
      <ObliqueBox id={id} x={284} y={14} w={12} h={116} dx={10} dy={6} />
      {/* the future model, hidden */}
      <g strokeDasharray="4 3">
        <rect x={410} y={50} width={56} height={50} fill="none" {...hair} />
        <path d="M410 50L420 44H476L466 50M476 44V94L466 100" fill="none" {...hair} />
        <circle cx={510} cy={74} r={20} fill="none" {...hair} />
        <line x1={510} y1={74} x2={522} y2={62} {...hair} />
        <line x1={472} y1={74} x2={488} y2={74} {...hair} />
      </g>
      <PatentKey x={470} y={138} size={12}>
        Future model
      </PatentKey>
    </Frame>
  );
}

/**
 * One consenting customer (a tick above them) uploads an address book to an
 * AI assistant. Leader lines run from the book's pages to the people listed
 * in it, bystanders who never consented.
 */
export function BystanderUpload() {
  const id = "w6-bystand";
  const fy = 140;
  const xs = [330, 372, 414, 456, 498];
  return (
    <Frame
      width={560}
      height={150}
      label="Patent drawing of one consenting customer, a tick beside their head, holding up an open address book and uploading it to an AI assistant housing. Lines run from the book to five bystanders listed in it, with no tick, who never consented."
    >
      <PatentDefs id={id} />
      <line x1={12} y1={fy} x2={548} y2={fy} {...hair} />
      <Figure id={id} x={44} y={fy} s={1.3} arm="raise" />
      <path d={tick(20, 36, 7)} fill="none" {...ink} strokeWidth={LINE.bold} />
      {/* the open address book, held up */}
      <path d="M66 18L84 12L102 18V44L84 38L66 44Z" fill={PAT.paper} {...ink} />
      <line x1={84} y1={12} x2={84} y2={38} {...hair} />
      {[22, 28, 34].map((y) => (
        <g key={y}>
          <line x1={70} y1={y} x2={81} y2={y - 2} {...hair} />
          <line x1={87} y1={y - 2} x2={98} y2={y} {...hair} />
        </g>
      ))}
      <path d="M100 46Q120 86 146 104" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(152, 108, 1, 0.6, 8)} fill="none" {...ink} />
      <SmallModel id={id} x={158} y={96} w={48} h={44} />
      {/* the bystanders listed in the book */}
      {xs.map((x) => (
        <g key={x}>
          <line x1={106} y1={20} x2={r2(x - 2)} y2={r2(fy - 86)} {...hair} />
          <Figure id={id} x={x} y={fy} s={1.05} flip coat="dense" />
        </g>
      ))}
    </Frame>
  );
}

/**
 * An essential service as an office front with two doors on one console:
 * ACCEPT ALL opens into the office. DECLINE is walled up, in red. The only
 * way in is to accept broad AI training consent.
 */
export function TakeItOrLeaveIt() {
  const id = "w6-take";
  const fy = 140;
  const R = PAT.signal;
  return (
    <Frame
      width={560}
      height={150}
      label="Patent drawing of an essential service as an office front with two doorways. The doorway marked accept all stands open, a path leading in. The doorway marked decline is bricked up, drawn in red: the only way to the service is to accept."
    >
      <PatentDefs id={id} />
      <line x1={12} y1={fy} x2={548} y2={fy} {...hair} />
      <path d="M108 44L275 8L442 44Z" fill={stip(id, "light")} {...ink} />
      <ObliqueBox id={id} x={116} y={44} w={318} h={fy - 44} dx={10} dy={6} />
      <rect x={110} y={fy - 8} width={340} height={8} fill={stip(id, "dense")} {...ink} />
      {/* accept all: an open doorway */}
      <rect x={176} y={74} width={70} height={58} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
      <path d="M176 74L196 84V132L176 132Z" fill={stip(id, "light")} {...ink} />
      <rect x={150} y={50} width={122} height={19} fill={PAT.paper} {...hair} />
      <PatentKey x={211} y={64} size={12}>
        Accept all
      </PatentKey>
      <path d="M30 136Q120 140 168 120" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(176, 116, 1, -0.5, 8)} fill="none" {...ink} />
      {/* decline: bricked up */}
      <rect x={288} y={50} width={122} height={19} fill={PAT.paper} stroke={R} strokeWidth={LINE.hair} />
      <rect x={314} y={74} width={70} height={58} fill={PAT.paper} stroke={R} strokeWidth={LINE.bold} />
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <line x1={314} y1={r2(74 + (r + 1) * 11.6)} x2={384} y2={r2(74 + (r + 1) * 11.6)} stroke={R} strokeWidth={LINE.hair} />
          {[0, 1, 2].map((c) => {
            const x = r2(314 + (r % 2 ? 12 : 24) + c * 23);
            return <line key={c} x1={x} y1={r2(74 + r * 11.6)} x2={x} y2={r2(74 + (r + 1) * 11.6)} stroke={R} strokeWidth={LINE.hair} />;
          })}
        </g>
      ))}
      <PatentKey x={349} y={64} size={12} fill={R}>
        Decline
      </PatentKey>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Dark Patterns in Consent Management and Opt-Out Design
   -------------------------------------------------------------------------- */

type Pattern = "roach" | "shame" | "bundle" | "default";

/** A slide switch, knob right when on. */
function Switch({ x, y, on, c = PAT.ink }: { x: number; y: number; on: boolean; c?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={34} height={16} rx={8} fill={on ? stip("w6-dark", c === PAT.ink ? "light" : "signal") : PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      <circle cx={on ? x + 26 : x + 8} cy={y + 8} r={6} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
    </g>
  );
}

/**
 * One phone, one consent screen, four ways to rig it. Asymmetric friction:
 * a single large ACCEPT button, while opting out runs through five nested
 * settings sheets pulled out beside the phone (red path). Confirmshaming:
 * the decline is faint small text that shames the user. Bundled consent: a
 * bracket ties profiling and AI training to the basic service under one
 * tick. Pre-selected defaults: every switch already on, AI training among
 * them, under a small note of a policy update.
 */
export function ConsentBanner() {
  const [p, setP] = useState<Pattern>("roach");
  const id = "w6-dark";
  const R = PAT.signal;
  const px = 30;
  const py = 26;
  const pw = 190;
  const ph = 330;
  const sx = px + 14;
  const sw = pw - 28;
  const labels: Record<Pattern, string> = {
    roach: "Asymmetric friction: the phone shows one large accept button. Opting out, drawn in red, runs through five nested settings sheets pulled out beside the phone. One click to opt in, five to opt out.",
    shame: "Confirmshaming and visual interference: a large accept button, and beneath it the decline set in faint small text, in red, reading no thanks, I don't mind worse recommendations.",
    bundle: "Bundled consent: a single tick box with a red bracket that ties profiling and AI training to the basic service. Continuing accepts all three.",
    default: "Pre-selected defaults: four switches, all already on, the AI training switch in red and magnified, above a small note reading our policy has been updated.",
  };
  return (
    <div>
      <Frame width={520} height={372} label={`Patent drawing of one phone showing a consent screen. ${labels[p]}`}>
        <PatentDefs id={id} />
        {/* the phone */}
        <path d={`M${px + pw} ${py + 14}L${px + pw + 10} ${py + 8}V${py + ph - 6}L${px + pw} ${py + ph}Z`} fill={stip(id, "dense")} {...ink} />
        <path d={`M${px + 14} ${py}L${px + 24} ${py - 6}H${px + pw - 4}A14 14 0 0 1 ${px + pw + 10} ${py + 8}L${px + pw} ${py + 14}A14 14 0 0 0 ${px + pw - 14} ${py}Z`} fill={stip(id, "light")} {...ink} />
        <rect x={px} y={py} width={pw} height={ph} rx={14} fill={PAT.paper} {...ink} />
        <rect x={sx} y={py + 30} width={sw} height={ph - 60} fill={PAT.paper} {...hair} />
        <line x1={px + 78} y1={py + 14} x2={px + 112} y2={py + 14} {...ink} strokeWidth={LINE.bold} />
        {/* the screen's heading lines */}
        {[52, 62, 72].map((d, i) => (
          <line key={d} x1={sx + 12} y1={py + d} x2={sx + (i === 2 ? 90 : sw - 12)} y2={py + d} {...hair} />
        ))}
        {p === "roach" ? (
          <g>
            <rect x={sx + 12} y={py + 196} width={sw - 24} height={44} fill={stip(id, "light")} {...ink} strokeWidth={LINE.bold} />
            <PatentKey x={sx + sw / 2} y={py + 223} size={14}>
              Accept
            </PatentKey>
            <Num x={sx + sw / 2} y={py + 258} size={14}>
              1 click
            </Num>
            <line x1={sx + sw - 40} y1={py + 284} x2={sx + sw - 14} y2={py + 284} stroke={R} strokeWidth={LINE.outline} />
            {/* five nested settings sheets */}
            {[0, 1, 2, 3, 4].map((k) => {
              const x = 246 + k * 42;
              const y = 40 + k * 58;
              const last = k === 4;
              return (
                <g key={k}>
                  <rect x={x} y={y} width={88} height={46} fill={PAT.paper} {...ink} />
                  {[10, 19, 28].map((d) => (
                    <line key={d} x1={x + 8} y1={y + d} x2={x + 70} y2={y + d} {...hair} />
                  ))}
                  <line x1={x + 60} y1={y + 38} x2={x + 80} y2={y + 38} stroke={R} strokeWidth={LINE.outline} />
                  {!last ? (
                    <g>
                      <line x1={x + 76} y1={y + 42} x2={x + 76} y2={y + 52} stroke={R} strokeWidth={LINE.outline} />
                      <path d={headAlongPath(x + 76, y + 57, 0, 1, 6)} fill="none" stroke={R} strokeWidth={LINE.outline} />
                    </g>
                  ) : null}
                </g>
              );
            })}
            <path d={`M${sx + sw - 12} ${py + 284}Q232 300 236 150Q238 70 244 66`} fill="none" stroke={R} strokeWidth={LINE.outline} strokeDasharray="4 3" />
            <path d={headAlongPath(246, 66, 1, -0.1, 7)} fill="none" stroke={R} strokeWidth={LINE.outline} />
            <Num x={480} y={344} size={14} fill={R}>
              5 clicks
            </Num>
          </g>
        ) : null}
        {p === "shame" ? (
          <g>
            <rect x={sx + 12} y={py + 176} width={sw - 24} height={44} fill={stip(id, "light")} {...ink} strokeWidth={LINE.bold} />
            <PatentKey x={sx + sw / 2} y={py + 203} size={14}>
              Accept
            </PatentKey>
            <text x={sx + sw / 2} y={py + 268} textAnchor="middle" fontFamily="var(--font-body)" fontStyle="italic" fontSize={8} fill={R}>
              no thanks, I don&apos;t mind
            </text>
            <text x={sx + sw / 2} y={py + 278} textAnchor="middle" fontFamily="var(--font-body)" fontStyle="italic" fontSize={8} fill={R}>
              worse recommendations
            </text>
            <Detail cx={sx + sw / 2} cy={py + 273} r={46} />
            <line x1={r2(sx + sw / 2 + 46 * 0.93)} y1={r2(py + 273 - 46 * 0.37)} x2={r2(404 - 92 * 0.93)} y2={r2(py + 214 + 92 * 0.37)} {...hair} />
            <circle cx={404} cy={py + 214} r={92} fill={PAT.paper} {...ink} />
            <text x={404} y={py + 209} textAnchor="middle" fontFamily="var(--font-body)" fontStyle="italic" fontSize={14} fill={R}>
              no thanks, I don&apos;t mind
            </text>
            <text x={404} y={py + 229} textAnchor="middle" fontFamily="var(--font-body)" fontStyle="italic" fontSize={14} fill={R}>
              worse recommendations
            </text>
          </g>
        ) : null}
        {p === "bundle" ? (
          <g>
            {[
              ["Basic service", 120],
              ["Profiling", 160],
              ["AI training", 200],
            ].map(([k, d]) => (
              <g key={k}>
                <line x1={sx + 12} y1={py + Number(d)} x2={sx + sw - 46} y2={py + Number(d)} {...hair} />
                <PatentKey x={sx + 12} y={py + Number(d) - 6} size={11} anchor="start">
                  {k}
                </PatentKey>
              </g>
            ))}
            <path d={`M${sx + sw - 30} ${py + 108}H${sx + sw - 20}V${py + 196}H${sx + sw - 30}M${sx + sw - 20} ${py + 152}H${sx + sw - 8}`} fill="none" stroke={R} strokeWidth={LINE.bold} />
            <rect x={sx + 12} y={py + 230} width={14} height={14} fill={PAT.paper} {...ink} />
            <path d={tick(sx + 19, py + 237, 5)} fill="none" {...ink} strokeWidth={LINE.bold} />
            <line x1={sx + 34} y1={py + 238} x2={sx + sw - 12} y2={py + 238} {...hair} />
            <rect x={sx + 12} y={py + 252} width={sw - 24} height={14} fill={stip(id, "light")} {...ink} />
            {/* the bundle drawn out beside the phone: the service chained to two weights */}
            <ObliqueBox id={id} x={262} y={150} w={92} h={60} dx={12} dy={8} />
            <PatentKey x={308} y={185} size={11}>
              Service
            </PatentKey>
            {[
              [118, "Profiling"],
              [242, "AI training"],
            ].map(([wy, k]) => {
              const y = Number(wy);
              const links = Array.from({ length: 5 }, (_, i) => {
                const t = (i + 0.5) / 5;
                return [r2(366 + t * 56), r2(180 + t * (y - 180))];
              });
              return (
                <g key={String(k)}>
                  {links.map(([lx, ly], i) => (
                    <ellipse key={i} cx={lx} cy={ly} rx={6} ry={3.5} transform={`rotate(${r2((Math.atan2(y - 180, 56) * 180) / Math.PI)} ${lx} ${ly})`} fill="none" stroke={R} strokeWidth={LINE.outline} />
                  ))}
                  <path d={`M430 ${y - 22}H486L498 ${y + 22}H418Z`} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} strokeLinejoin="round" />
                  <PatentKey x={458} y={y + 40} size={11} fill={R}>
                    {k}
                  </PatentKey>
                </g>
              );
            })}
          </g>
        ) : null}
        {p === "default" ? (
          <g>
            {["Analytics", "Location", "Marketing", "AI training"].map((k, i) => {
              const y = py + 104 + i * 40;
              const red = k === "AI training";
              return (
                <g key={k}>
                  <PatentKey x={sx + 10} y={y + 12} size={10.5} anchor="start" fill={red ? R : PAT.ink}>
                    {k}
                  </PatentKey>
                  <Switch x={sx + sw - 44} y={y} on c={red ? R : PAT.ink} />
                </g>
              );
            })}
            <text x={sx + 12} y={py + 284} fontFamily="var(--font-body)" fontStyle="italic" fontSize={8} fill={PAT.ink}>
              Our policy has been updated.
            </text>
            <Detail cx={sx + sw - 27} cy={py + 232} r={26} />
            <line x1={sx + sw + 2} y1={py + 228} x2={330} y2={py + 200} {...hair} />
            <circle cx={400} cy={py + 190} r={70} fill={PAT.paper} {...ink} />
            <PatentKey x={400} y={py + 164} size={12} fill={R}>
              AI training
            </PatentKey>
            <g transform={`translate(${400 - 48} ${py + 178}) scale(2.8)`}>
              <rect x={0} y={0} width={34} height={16} rx={8} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline / 2.8} />
              <circle cx={26} cy={8} r={6} fill={PAT.paper} stroke={R} strokeWidth={LINE.outline / 2.8} />
            </g>
          </g>
        ) : null}
      </Frame>
      <Segmented
        label="Pattern"
        options={[
          { id: "roach", label: "Roach motel" },
          { id: "shame", label: "Confirmshaming" },
          { id: "bundle", label: "Bundled" },
          { id: "default", label: "Pre-selected" },
        ]}
        value={p}
        onChange={setP}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 3: Technical Privacy Risks and Safeguards
   -------------------------------------------------------------------------- */

/**
 * A customer record with its direct identifiers (name, account number)
 * blacked out by stippled bars, while the rows below it (postal code, birth
 * date, gender) still read in full.
 */
export function RedactedRecord() {
  const id = "w6-redact";
  const x = 100;
  const y = 20;
  const w = 340;
  const rows: [string, string | null][] = [
    ["Name", null],
    ["Account no.", null],
    ["Postal code", "H2X 1Y4"],
    ["Birth date", "1984-03-12"],
    ["Gender", "F"],
  ];
  return (
    <Frame
      width={560}
      height={312}
      label="Patent drawing of a customer record: its name and account number rows are blacked out by stippled redaction bars, while the postal code H2X 1Y4, birth date 1984-03-12 and gender F rows below still read in full."
    >
      <PatentDefs id={id} />
      <path d={`M${x + w} ${y + 10}L${x + w + 12} ${y + 2}V${y + 272}L${x + w} ${y + 280}Z`} fill={stip(id, "dense")} {...ink} />
      <path d={`M${x + 10} ${y}L${x + 22} ${y - 8}H${x + w + 12}L${x + w} ${y}Z`} fill={stip(id, "light")} {...ink} />
      <rect x={x} y={y} width={w} height={280} fill={PAT.paper} {...ink} />
      {[22, 32].map((d, i) => (
        <line key={d} x1={x + 20} y1={y + d} x2={x + (i ? 150 : 230)} y2={y + d} {...hair} />
      ))}
      <line x1={x} y1={y + 48} x2={x + w} y2={y + 48} {...hair} />
      {rows.map(([k, v], i) => {
        const ry = y + 80 + i * 42;
        return (
          <g key={k}>
            <PatentKey x={x + 20} y={ry} size={12} anchor="start">
              {k}
            </PatentKey>
            {v ? (
              <Num x={x + 184} y={ry} size={18} anchor="start">
                {v}
              </Num>
            ) : (
              <rect x={x + 180} y={ry - 16} width={136} height={20} fill={stip(id, "dense")} {...ink} />
            )}
            <line x1={x + 20} y1={ry + 14} x2={x + w - 20} y2={ry + 14} {...hair} />
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   The Failure of Naive Anonymization and Re-Identification Attacks
   -------------------------------------------------------------------------- */

type QI = "zip" | "dob" | "sex";
/** Eight people, as they appear in both tables: ZIP code, date of birth, sex. */
const PEOPLE: Record<QI, string>[] = [
  { zip: "02138", dob: "07-31-45", sex: "F" },
  { zip: "02138", dob: "07-31-45", sex: "M" },
  { zip: "02138", dob: "03-12-84", sex: "F" },
  { zip: "02139", dob: "11-02-71", sex: "M" },
  { zip: "02139", dob: "11-02-71", sex: "M" },
  { zip: "02139", dob: "05-19-90", sex: "F" },
  { zip: "02140", dob: "09-08-62", sex: "F" },
  { zip: "02138", dob: "03-12-84", sex: "M" },
];

/**
 * Two tables of the same eight people: "anonymized" hospital records at left
 * (quasi-identifiers kept, diagnosis stippled) and a public voter list at
 * right (names as written lines). The switches choose which quasi-identifiers
 * are compared. Every hospital row that then matches exactly one voter is
 * linked to that voter's name in red.
 */
export function QuasiIdentifiers() {
  const [cols, setCols] = useState<QI[]>(["zip"]);
  const id = "w6-qi";
  const R = PAT.signal;
  const key = (p: Record<QI, string>) => cols.map((c) => p[c]).join("|");
  const unique = PEOPLE.map((p) => cols.length > 0 && PEOPLE.filter((q) => key(q) === key(p)).length === 1);
  const nUnique = unique.filter(Boolean).length;
  const top = 46;
  const rh = 22;
  const lx = 10;
  const rx = 340;
  const colX = { zip: 0, dob: 52, sex: 126 } as const;
  const head = { zip: "ZIP", dob: "Birth", sex: "Sex" } as const;
  return (
    <div>
      <Frame
        width={600}
        height={282}
        label={`Patent drawing of two tables of the same eight people: anonymized hospital records with ZIP code, birth date and sex kept and the diagnosis stippled, and a public voter list with names. Comparing ${cols.length ? cols.map((c) => ({ zip: "ZIP code", dob: "date of birth", sex: "sex" })[c]).join(", ") : "no quasi-identifiers"}, ${nUnique} of the 8 hospital rows match exactly one voter and are linked to a name in red.`}
      >
        <PatentDefs id={id} />
        {(["L", "R"] as const).map((side) => {
          const x0 = side === "L" ? lx : rx;
          const off = side === "L" ? 0 : 62;
          return (
            <g key={side}>
              <rect x={x0} y={top - 26} width={side === "L" ? 262 : 250} height={rh * 8 + 32} fill={PAT.paper} {...ink} />
              {(Object.keys(colX) as QI[]).map((c) => (
                <PatentKey key={c} x={x0 + 10 + off + colX[c]} y={top - 8} size={11.5} anchor="start">
                  <tspan textDecoration={cols.includes(c) ? "underline" : undefined}>{head[c]}</tspan>
                </PatentKey>
              ))}
              {side === "L" ? (
                <PatentKey x={x0 + 174} y={top - 8} size={11.5} anchor="start">
                  Diagnosis
                </PatentKey>
              ) : (
                <PatentKey x={x0 + 10} y={top - 8} size={11.5} anchor="start">
                  Name
                </PatentKey>
              )}
              {PEOPLE.map((p, i) => {
                const y = top + i * rh;
                const red = side === "R" && unique[i];
                return (
                  <g key={i}>
                    <line x1={x0} y1={y} x2={x0 + (side === "L" ? 262 : 250)} y2={y} {...hair} />
                    {(Object.keys(colX) as QI[]).map((c) => (
                      <Num key={c} x={x0 + 10 + off + colX[c]} y={y + 16} size={13} anchor="start">
                        {p[c]}
                      </Num>
                    ))}
                    {side === "L" ? (
                      <rect x={x0 + 170} y={y + 6} width={80} height={10} fill={stip(id, "dense")} {...hair} />
                    ) : (
                      <line x1={x0 + 10} y1={y + 12} x2={x0 + 56} y2={y + 12} stroke={red ? R : PAT.ink} strokeWidth={red ? LINE.bold : LINE.hair} />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* links for each uniquely matched row */}
        {unique.map((u, i) =>
          u ? (
            <g key={i}>
              <line x1={lx + 262} y1={top + i * rh + 11} x2={rx - 6} y2={top + i * rh + 11} stroke={R} strokeWidth={LINE.outline} />
              <path d={headAlongPath(rx - 1, top + i * rh + 11, 1, 0, 7)} fill="none" stroke={R} strokeWidth={LINE.outline} />
            </g>
          ) : null,
        )}
        <FigureName x={lx + 131} y={250} size={13.5}>
          &ldquo;anonymized&rdquo; hospital records
        </FigureName>
        <FigureName x={rx + 125} y={250} size={13.5}>
          public voter registration list
        </FigureName>
        <Num x={300} y={274} size={16} fill={nUnique ? R : PAT.ink}>
          {`${nUnique} of 8 uniquely identified`}
        </Num>
      </Frame>
      <Toggles
        label="Link on"
        options={[
          { id: "zip", label: "ZIP code" },
          { id: "dob", label: "Date of birth" },
          { id: "sex", label: "Sex" },
        ]}
        value={cols}
        onChange={setCols}
      />
    </div>
  );
}

/** A small person mark standing on (x, y): stippled, red, or a dashed outline when ruled out. */
function PersonMark({ id, x, y, tone }: { id: string; x: number; y: number; tone: "dense" | "signal" | "absent" }) {
  const c = tone === "signal" ? PAT.signal : PAT.ink;
  const dash = tone === "absent" ? "2 2" : undefined;
  const fill = tone === "absent" ? PAT.paper : stip(id, tone);
  return (
    <g stroke={c} strokeWidth={tone === "absent" ? LINE.hair : LINE.outline} strokeDasharray={dash}>
      <circle cx={x} cy={y - 30} r={5} fill={PAT.paper} />
      <path d={`M${x - 8} ${y}V${y - 15}Q${x - 8} ${y - 23} ${x} ${y - 23}Q${x + 8} ${y - 23} ${x + 8} ${y - 15}V${y}Z`} fill={fill} strokeLinejoin="round" />
    </g>
  );
}

/** Known transaction points, the time on each, and how many of the 40 traces still fit. */
const TRACE = [
  { x: 20, y: 34, t: "9:14", fit: 14 },
  { x: 150, y: 30, t: "12:40", fit: 4 },
  { x: 84, y: 92, t: "18:05", fit: 2 },
  { x: 150, y: 144, t: "21:30", fit: 1 },
];

/**
 * A street plan with up to four known card transactions pinned on it, each
 * with its time, beside a crowd of forty people in a de-identified trace.
 * Each point added clears everyone whose trace does not pass through it:
 * fourteen fit one point, four fit two, two fit three, and only one person
 * (red) fits all four.
 */
export function TracePoints() {
  const [k, setK] = useState(2);
  const id = "w6-trace";
  const fit = k === 0 ? 40 : TRACE[k - 1].fit;
  // a fixed order in which people drop out as points are added
  const rnd = seeded(17);
  const order = Array.from({ length: 40 }, (_, i) => ({ i, r: rnd() })).sort((a, b) => a.r - b.r).map((o) => o.i);
  const keep = new Set(order.slice(0, fit));
  return (
    <div>
      <Frame
        width={480}
        height={172}
        label={`Patent drawing of a street plan with ${k} known card transactions pinned on it, at ${TRACE.slice(0, k).map((p) => p.t).join(", ") || "no times"}, beside a crowd of forty people from a de-identified trace. ${fit} of the forty still fit every known point${fit === 1 ? ", drawn in red: uniquely re-identified" : ""}.`}
      >
        <PatentDefs id={id} />
        {/* the street plan */}
        <rect x={10} y={12} width={190} height={148} fill={PAT.paper} {...ink} />
        {[60, 120].map((y) => (
          <g key={y}>
            <line x1={10} y1={y - 5} x2={200} y2={y - 5} {...hair} />
            <line x1={10} y1={y + 5} x2={200} y2={y + 5} {...hair} />
          </g>
        ))}
        {[70, 135].map((x) => (
          <g key={x}>
            <line x1={x - 5} y1={12} x2={x - 5} y2={160} {...hair} />
            <line x1={x + 5} y1={12} x2={x + 5} y2={160} {...hair} />
          </g>
        ))}
        {TRACE.slice(0, k).map((p) => (
          <g key={p.t}>
            <circle cx={p.x} cy={p.y} r={5} fill={PAT.ink} />
            <circle cx={p.x} cy={p.y} r={9} fill="none" {...hair} />
            <Num x={p.x + 11} y={p.y + 5} size={13} anchor="start">
              {p.t}
            </Num>
          </g>
        ))}
        {/* the crowd */}
        {Array.from({ length: 40 }, (_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const on = keep.has(i);
          const one = on && fit === 1;
          return (
            <PersonMark key={i} id={id} x={r2(232 + col * 25)} y={r2(48 + row * 38)} tone={one ? "signal" : on ? "dense" : "absent"} />
          );
        })}
      </Frame>
      <Slider label="Known transaction points" value={k} min={0} max={4} onChange={setK} formatValue={(v) => `${v}`} />
    </div>
  );
}

/** Nine patients: ZIP code, age and the sensitive diagnosis. */
const KROWS = [
  { zip: "02138", age: 24, dx: "flu" },
  { zip: "02139", age: 27, dx: "asthma" },
  { zip: "02134", age: 29, dx: "flu" },
  { zip: "02141", age: 34, dx: "diabetes" },
  { zip: "02142", age: 36, dx: "diabetes" },
  { zip: "02143", age: 38, dx: "diabetes" },
  { zip: "02145", age: 52, dx: "flu" },
  { zip: "02146", age: 55, dx: "asthma" },
  { zip: "02147", age: 58, dx: "heart disease" },
];

const generalize = (r: (typeof KROWS)[number], g: number) => {
  if (g === 0) return { zip: r.zip, age: `${r.age}` };
  if (g === 1) return { zip: `${r.zip.slice(0, 4)}*`, age: `${Math.floor(r.age / 10) * 10}n/a${Math.floor(r.age / 10) * 10 + 9}` };
  return { zip: "021**", age: r.age < 40 ? "< 40" : "≥ 40" };
};

/**
 * A released table of nine patients. The slider generalizes the
 * quasi-identifiers (ZIP code digits, then age bands). Rows that now look
 * alike close into groups, and the smallest group size is k. One group of
 * three shares a single diagnosis, so k-anonymity holds while anyone known to
 * be in that group has their diagnosis revealed (red).
 */
export function KAnonymity() {
  const [g, setG] = useState(1);
  const id = "w6-kanon";
  const R = PAT.signal;
  const rows = KROWS.map((r) => ({ ...r, ...generalize(r, g) }));
  const keyOf = (r: { zip: string; age: string }) => `${r.zip}|${r.age}`;
  const groups: number[][] = [];
  rows.forEach((r, i) => {
    const last = groups[groups.length - 1];
    if (last && keyOf(rows[last[0]]) === keyOf(r)) last.push(i);
    else groups.push([i]);
  });
  const k = Math.min(...groups.map((gr) => gr.length));
  const homog = (gr: number[]) => gr.length > 1 && gr.every((i) => rows[i].dx === rows[gr[0]].dx);
  const top = 34;
  const rh = 17;
  return (
    <div>
      <Frame
        width={480}
        height={192}
        label={`Patent drawing of a released table of nine patients with ZIP code, age and diagnosis. Generalization level ${g}: rows fall into ${groups.length} groups and k is ${k}. ${groups.some(homog) ? "One group of three all share the diagnosis diabetes, drawn in red: the group lacks diversity, so its members' diagnosis is revealed." : ""}`}
      >
        <PatentDefs id={id} />
        <rect x={8} y={top - 24} width={300} height={rh * 9 + 30} fill={PAT.paper} {...ink} />
        {[
          ["ZIP", 20],
          ["Age", 96],
          ["Diagnosis", 180],
        ].map(([k2, x]) => (
          <PatentKey key={String(k2)} x={Number(x)} y={top - 8} size={12.5} anchor="start">
            {k2}
          </PatentKey>
        ))}
        {rows.map((r, i) => {
          const gi = groups.findIndex((gr) => gr.includes(i));
          const red = homog(groups[gi]);
          const y = top + i * rh;
          return (
            <g key={i}>
              <Num x={20} y={y + 13} size={13} anchor="start">
                {r.zip}
              </Num>
              <Num x={96} y={y + 13} size={13} anchor="start">
                {r.age}
              </Num>
              <Num x={180} y={y + 13} size={13} anchor="start" fill={red ? R : PAT.ink}>
                {r.dx}
              </Num>
            </g>
          );
        })}
        {/* group rules and brackets */}
        {groups.map((gr, j) => {
          const y0 = top + gr[0] * rh;
          const y1 = top + (gr[gr.length - 1] + 1) * rh;
          const red = homog(gr);
          const c = red ? R : PAT.ink;
          return (
            <g key={j}>
              <line x1={8} y1={y0} x2={308} y2={y0} {...hair} strokeWidth={gr.length > 1 || j === 0 ? LINE.outline : LINE.hair} />
              <path d={`M318 ${y0 + 2}H324V${y1 - 2}H318`} fill="none" stroke={c} strokeWidth={red ? LINE.bold : LINE.outline} />
              {gr.length > 1 ? (
                <Num x={332} y={r2((y0 + y1) / 2 + 5)} size={13} anchor="start" fill={c}>
                  {`${gr.length} alike`}
                </Num>
              ) : null}
            </g>
          );
        })}
        <Num x={436} y={98} size={28} anchor="middle">
          {`k = ${k}`}
        </Num>
      </Frame>
      <Slider label="Generalization" value={g} min={0} max={2} onChange={setG} formatValue={(v) => ["none", "1 step", "2 steps"][v]} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Training Data Memorization and Membership Inference in LLMs
   -------------------------------------------------------------------------- */

/** Chance the model completes the prefix verbatim, rising with copies in training. */
const recall = (copies: number) => 1 - Math.exp(-copies / 14);

/**
 * A training document carrying one person's contact line, stacked as many
 * times as it was duplicated in the corpus, feeds a model. An adversary's
 * prefix card goes in. The output strip shows the continuation. With few
 * copies the model completes it generically. Past an even chance it returns
 * the phone number and address verbatim (red). The gauge below reads the
 * chance of a verbatim completion.
 */
export function ExtractionPrefix() {
  const [copies, setCopies] = useState(3);
  const id = "w6-extract";
  const R = PAT.signal;
  const p = recall(copies);
  const verbatim = p >= 0.5;
  const shown = Math.min(8, copies);
  return (
    <div>
      <Frame
        width={540}
        height={226}
        label={`Patent drawing of a training document with one person's contact line, duplicated ${copies} times in the corpus, feeding a model. A prefix card reading Contact Jane Roe at goes in. The output strip continues it with ${verbatim ? "the phone number and address verbatim, 555-0142, 12 Elm St., in red" : "a generic phrase, the front desk"}. The chance of a verbatim completion reads ${Math.round(p * 100)} percent.`}
      >
        <PatentDefs id={id} />
        {/* the duplicated training document */}
        {Array.from({ length: shown - 1 }, (_, i) => {
          const k = shown - 1 - i;
          return <rect key={k} x={14 + k * 3} y={70 - k * 3} width={104} height={130} fill={PAT.paper} {...hair} />;
        })}
        <rect x={14} y={70} width={104} height={130} fill={PAT.paper} {...ink} />
        {[86, 96, 106].map((y, i) => (
          <line key={y} x1={24} y1={y} x2={i === 2 ? 70 : 108} y2={y} {...hair} />
        ))}
        <text x={24} y={128} fontFamily="var(--font-body)" fontStyle="italic" fontSize={12} fill={PAT.ink}>
          Jane Roe,
        </text>
        <text x={24} y={144} fontFamily="var(--font-body)" fontStyle="italic" fontSize={12} fill={PAT.ink}>
          555-0142,
        </text>
        <text x={24} y={160} fontFamily="var(--font-body)" fontStyle="italic" fontSize={12} fill={PAT.ink}>
          12 Elm St.
        </text>
        {[176, 186].map((y) => (
          <line key={y} x1={24} y1={y} x2={108} y2={y} {...hair} />
        ))}
        <Num x={66} y={r2(60 - (shown - 1) * 3)} size={16}>
          {`×${copies}`}
        </Num>
        <line x1={132} y1={136} x2={146} y2={136} {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={headAlongPath(154, 136, 1, 0, 8)} fill="none" {...ink} />
        {/* the model */}
        <ObliqueBox id={id} x={160} y={86} w={80} h={76} dx={12} dy={8} />
        <Gear cx={186} cy={112} r={12} n={11} />
        <Gear cx={216} cy={140} r={9} n={9} phase={0.25} />
        {/* the prefix card */}
        <rect x={128} y={14} width={150} height={30} fill={PAT.paper} {...ink} />
        <text x={203} y={34} textAnchor="middle" fontFamily="var(--font-body)" fontStyle="italic" fontSize={14} fill={PAT.ink}>
          Contact Jane Roe at
        </text>
        <line x1={203} y1={44} x2={203} y2={70} {...hair} />
        <path d={headAlongPath(203, 76, 0, 1, 8)} fill="none" {...ink} />
        {/* the output strip */}
        <line x1={254} y1={124} x2={266} y2={124} {...hair} />
        <path d={headAlongPath(272, 124, 1, 0, 8)} fill="none" {...ink} />
        <path d="M276 106H530L522 124L530 142H276Z" fill={PAT.paper} stroke={verbatim ? R : PAT.ink} strokeWidth={verbatim ? LINE.bold : LINE.outline} strokeLinejoin="round" />
        <text x={288} y={129} fontFamily="var(--font-body)" fontStyle="italic" fontSize={15} fill={verbatim ? R : PAT.ink}>
          {verbatim ? "555-0142, 12 Elm St." : "the front desk."}
        </text>
        {/* the gauge: chance of verbatim recall */}
        <rect x={276} y={180} width={254} height={12} fill={PAT.paper} {...ink} />
        <rect x={276} y={180} width={r2(254 * p)} height={12} fill={stip(id, verbatim ? "signal" : "dense")} stroke={verbatim ? R : PAT.ink} strokeWidth={LINE.hair} />
        <line x1={403} y1={174} x2={403} y2={198} {...hair} strokeDasharray="2 2" />
        <PatentKey x={276} y={170} size={12.5} anchor="start">
          Verbatim
        </PatentKey>
        <Num x={530} y={170} size={14} anchor="end" fill={verbatim ? R : PAT.ink}>
          {`${Math.round(p * 100)}%`}
        </Num>
      </Frame>
      <Slider label="Copies in training data" value={copies} min={1} max={40} onChange={setCopies} />
    </div>
  );
}

/** Standard normal CDF (Abramowitz-Stegun). */
function phi(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const q = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - q : q;
}

/**
 * Two stippled distributions of the model's confidence on records: those
 * outside its training set (light) and those inside it (red). The slider
 * trains longer. The model grows more confident and more consistent on the
 * records it has seen, the two hills part, and an adversary thresholding at the midpoint tells
 * members from non-members more often.
 */
export function MembershipGap() {
  const [epochs, setEpochs] = useState(5);
  const id = "w6-member";
  const R = PAT.signal;
  const sd = 0.1;
  const sd1 = r2(0.1 - 0.0025 * epochs);
  const m0 = 0.5;
  const m1 = m0 + 0.018 * epochs;
  const acc = phi((m1 - m0) / ((sd + sd1) / 2) / 2);
  const x0 = 30;
  const x1 = 510;
  const base = 176;
  const X = (c: number) => r2(x0 + c * (x1 - x0));
  const curve = (m: number, w: number) => {
    const pts = Array.from({ length: 61 }, (_, i) => {
      const c = i / 60;
      const y = (sd / w) * Math.exp(-((c - m) ** 2) / (2 * w * w));
      return `${X(c)} ${r2(base - y * 70)}`;
    });
    return `M${X(0)} ${base}L${pts.join("L")}L${X(1)} ${base}Z`;
  };
  const thr = (m0 + m1) / 2;
  return (
    <div>
      <Frame
        width={540}
        height={226}
        label={`Patent drawing of two distributions of a model's confidence on records, from 0 to 1: records outside the training set peak at 0.5. Records inside it, drawn in red, peak at ${m1.toFixed(2)} after ${epochs} training epochs. Thresholding at their midpoint, an adversary tells members from non-members ${Math.round(acc * 100)} percent of the time.`}
      >
        <PatentDefs id={id} />
        <path d={curve(m0, sd)} fill={stip(id, "light")} {...ink} />
        <path d={curve(m1, sd1)} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} fillOpacity={0.9} style={{ transition: "d 300ms ease" }} />
        <line x1={x0} y1={base} x2={x1} y2={base} {...ink} />
        {[0, 0.5, 1].map((c) => (
          <g key={c}>
            <line x1={X(c)} y1={base} x2={X(c)} y2={base + 5} {...hair} />
            <Num x={X(c)} y={base + 20} size={13}>
              {c === 0.5 ? "0.5" : `${c}`}
            </Num>
          </g>
        ))}
        <PatentKey x={(x0 + x1) / 2} y={base + 40} size={12.5}>
          Model confidence
        </PatentKey>
        <line x1={X(thr)} y1={30} x2={X(thr)} y2={base} {...ink} strokeDasharray={CENTRE_DASH} />
        <FigureName x={X(m0) - 70} y={46} size={13.5}>
          not in training set
        </FigureName>
        <FigureName x={Math.min(X(m1) + 40, 470)} y={22} size={13.5}>
          <tspan fill={R}>in training set</tspan>
        </FigureName>
        <Num x={30} y={66} size={24} anchor="start" fill={R}>
          {`${Math.round(acc * 100)}%`}
        </Num>
        <PatentKey x={30} y={84} size={12.5} anchor="start">
          Attack accuracy
        </PatentKey>
      </Frame>
      <Slider label="Training epochs" value={epochs} min={0} max={20} onChange={setEpochs} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Differential Privacy, Federated Learning, and Machine Unlearning
   -------------------------------------------------------------------------- */

/**
 * The output of a differentially private count, drawn twice: on the
 * dataset without one person's record (true count 100) and with it (101).
 * Laplace noise of scale 1/epsilon spreads both. The slider sets epsilon: a
 * small epsilon makes the two output distributions nearly the same (their
 * ratio never exceeds e^epsilon), at the cost of a wide, imprecise answer.
 */
export function EpsilonNoise() {
  const [eps, setEps] = useState(0.5);
  const id = "w6-eps";
  const b = 1 / eps;
  const lo = 92;
  const hi = 109;
  const x0 = 20;
  const x1 = 540;
  const base = 120;
  const X = (v: number) => r2(x0 + ((v - lo) / (hi - lo)) * (x1 - x0));
  const peak = 1 / (2 * b);
  const curve = (mu: number) => {
    const pts = Array.from({ length: 171 }, (_, i) => {
      const v = lo + (i / 170) * (hi - lo);
      const d = (1 / (2 * b)) * Math.exp(-Math.abs(v - mu) / b);
      return `${X(v)} ${r2(base - (d / peak) * 84)}`;
    });
    return `M${X(lo)} ${base}L${pts.join("L")}L${X(hi)} ${base}Z`;
  };
  return (
    <div>
      <Frame
        width={560}
        height={150}
        label={`Patent drawing of the output distribution of a differentially private count, on the dataset without one person's record (true count 100, stippled) and with it (101, outlined). With epsilon ${eps}, the two distributions differ by at most a factor of ${Math.exp(eps).toFixed(2)}. The noise spreads answers about ${Math.round(b * 3)} counts either side.`}
      >
        <PatentDefs id={id} />
        <path d={curve(100)} fill={stip(id, "light")} {...ink} />
        <path d={curve(101)} fill="none" {...ink} strokeWidth={LINE.bold} strokeDasharray="5 3" />
        <line x1={x0} y1={base} x2={x1} y2={base} {...ink} />
        {[95, 100, 105].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={base} x2={X(v)} y2={base + 5} {...hair} />
            <Num x={X(v)} y={base + 20} size={13}>
              {v}
            </Num>
          </g>
        ))}
        <FigureName x={X(100) - 8} y={30} size={13.5} anchor="end">
          without one record
        </FigureName>
        <FigureName x={X(101) + 8} y={30} size={13.5} anchor="start">
          with one record
        </FigureName>
        <text x={x1} y={86} textAnchor="end" fontFamily="var(--font-body)" fontSize={22} fill={PAT.ink}>
          <tspan>e</tspan>
          <tspan dy={-9} fontSize={14}>
            ε
          </tspan>
          <tspan dy={9}>{` = ${Math.exp(eps).toFixed(2)}`}</tspan>
        </text>
      </Frame>
      <Slider label="Epsilon" value={eps} min={0.1} max={2} step={0.1} onChange={setEps} formatValue={(v) => v.toFixed(1)} />
    </div>
  );
}

/** Per-example gradients for one batch: direction (degrees) and length. The last is an outlier record. */
const GRADS = [
  [-30, 84],
  [-14, 98],
  [2, 78],
  [16, 104],
  [32, 90],
  [-44, 72],
  [74, 220],
];

/**
 * One training step of DP-SGD, drawn as vectors from a common point: each
 * record's gradient, one of them an outlier (red) far longer than the rest.
 * The dashed circle is the clipping norm C. Every gradient longer than C is
 * cut back to it, and noise scaled to C (the stippled disc) is added to the
 * averaged update. The slider sets C.
 */
export function ClipAndNoise() {
  const [c, setC] = useState(80);
  const id = "w6-clip";
  const R = PAT.signal;
  const ox = 130;
  const oy = 142;
  const vec = (a: number, l: number) => {
    const t = ((a - 90) * Math.PI) / 180;
    return [r2(ox + Math.cos(t) * l), r2(oy + Math.sin(t) * l)];
  };
  const clipped = GRADS.map(([a, l]) => [a, Math.min(l, c)]);
  const mean = clipped.reduce(([sx, sy], [a, l]) => {
    const t = ((a - 90) * Math.PI) / 180;
    return [sx + (Math.cos(t) * l) / GRADS.length, sy + (Math.sin(t) * l) / GRADS.length];
  }, [0, 0]);
  const mx = 480;
  const my = 142;
  const noise = r2(c * 0.24);
  const arc = (r: number) => {
    const p = (deg: number) => {
      const t = ((deg - 90) * Math.PI) / 180;
      return `${r2(ox + Math.cos(t) * r)} ${r2(oy + Math.sin(t) * r)}`;
    };
    return `M${p(-96)}A${r} ${r} 0 0 1 ${p(96)}`;
  };
  return (
    <div>
      <Frame
        width={560}
        height={150}
        label={`Patent drawing of one DP-SGD step: seven per-example gradients drawn from a common point, one an outlier in red. A dashed circle of radius C = ${c} clips every longer gradient back to it. At right the averaged update carries a stippled disc of noise scaled to C.`}
      >
        <PatentDefs id={id} />
        <path d={arc(c)} fill="none" {...hair} strokeDasharray="4 3" />
        {GRADS.map(([a, l], i) => {
          const out = i === GRADS.length - 1;
          const col = out ? R : PAT.ink;
          const [ex, ey] = vec(a, l);
          const [cx, cy] = vec(a, Math.min(l, c));
          const t = ((a - 90) * Math.PI) / 180;
          return (
            <g key={i}>
              {l > c ? <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={col} strokeWidth={LINE.hair} strokeDasharray="2 3" /> : null}
              <line x1={ox} y1={oy} x2={cx} y2={cy} stroke={col} strokeWidth={out ? LINE.bold : LINE.outline} />
              <path d={headAlongPath(cx, cy, Math.cos(t), Math.sin(t), 7)} fill="none" stroke={col} strokeWidth={LINE.outline} />
            </g>
          );
        })}
        <circle cx={ox} cy={oy} r={2.5} fill={PAT.ink} />
        <PatentKey x={r2(ox - c - 8)} y={oy} size={13} anchor="end">
          C
        </PatentKey>
        {/* the averaged, noised update */}
        <line x1={378} y1={130} x2={420} y2={130} {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={headAlongPath(426, 130, 1, 0, 8)} fill="none" {...ink} />
        <line x1={mx} y1={my} x2={r2(mx + mean[0])} y2={r2(my + mean[1])} {...ink} strokeWidth={LINE.bold} />
        <circle cx={r2(mx + mean[0])} cy={r2(my + mean[1])} r={noise} fill={stip(id, "light")} {...hair} />
        <circle cx={mx} cy={my} r={2.5} fill={PAT.ink} />
        <PatentKey x={r2(mx + mean[0] - noise - 8)} y={r2(my + mean[1] + 4)} size={12} anchor="end">
          Noise
        </PatentKey>
      </Frame>
      <Slider label="Clipping norm C" value={c} min={40} max={120} step={10} onChange={setC} />
    </div>
  );
}

/**
 * Federated learning in plan: four phones each keep their raw records
 * (sheets) locked on the device and train a local update. Only the updates
 * (small arrows) travel up, through a secure aggregation box, to the central
 * server's model.
 */
export function FederatedPlan() {
  const id = "w6-fed";
  const xs = [60, 200, 360, 500];
  return (
    <Frame
      width={560}
      height={186}
      label="Patent drawing of federated learning: four phones along the bottom each keep their raw records behind a padlock and train a local update with a small gear. Only update arrows travel up into a secure aggregation box and on to the central server's model at top."
    >
      <PatentDefs id={id} />
      {/* server */}
      <SmallModel id={id} x={250} y={12} w={52} h={40} />
      <line x1={280} y1={60} x2={280} y2={70} {...hair} />
      <path d={headAlongPath(280, 58, 0, -1, 7)} fill="none" {...ink} />
      {/* secure aggregation */}
      <rect x={180} y={72} width={200} height={26} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
      <PatentKey x={280} y={90} size={12}>
        Secure aggregation
      </PatentKey>
      {xs.map((x, i) => (
        <g key={x}>
          {/* phone */}
          <rect x={x - 30} y={118} width={60} height={64} rx={7} fill={PAT.paper} {...ink} />
          <line x1={x - 8} y1={124} x2={x + 8} y2={124} {...ink} />
          <Sheet id={id} x={x - 24} y={168} w={22} d={10} sk={5} />
          <Sheet id={id} x={x - 24} y={161} w={22} d={10} sk={5} />
          <Padlock cx={x - 12} cy={140} />
          <Gear cx={x + 16} cy={146} r={8} n={8} />
          {/* only the update goes up */}
          <line x1={x + 16} y1={114} x2={r2(220 + i * 40)} y2={102} {...hair} strokeDasharray="4 3" />
          <path d={headAlongPath(r2(220 + i * 40), 101, r2(220 + i * 40 - x - 16), -12, 6)} fill="none" {...ink} />
        </g>
      ))}
    </Frame>
  );
}

/**
 * A model trained in four shards: each stack of records trains its own
 * shard model, and the four shards join into the deployed model above. The
 * erasure request strikes one customer's record (red) from shard two. Only
 * that shard is retrained (red, with its retraining arrow), one of four,
 * rather than the whole model from scratch.
 */
export function ShardUnlearning() {
  const [erased, setErased] = useState(false);
  const id = "w6-shard";
  const R = PAT.signal;
  const xs = [70, 200, 330, 460];
  return (
    <div>
      <Frame
        width={560}
        height={186}
        label={`Patent drawing of a model trained in four shards: each of four record stacks trains its own small shard model, and the four shards join into the deployed model above. ${erased ? "An erasure request has struck one customer's record, in red, from the second stack. Only the second shard is retrained, drawn in red with a retraining arrow: one of four shards." : "One customer's record sits in the second stack, in red."}`}
      >
        <PatentDefs id={id} />
        <SmallModel id={id} x={246} y={10} w={60} h={40} />
        {xs.map((x, i) => {
          const hit = i === 1;
          const redo = hit && erased;
          return (
            <g key={x}>
              <line x1={x + 4} y1={82} x2={r2(256 + i * 13)} y2={54} stroke={redo ? R : PAT.ink} strokeWidth={LINE.hair} />
              <ObliqueBox id={id} x={x - 20} y={86} w={40} h={30} dx={8} dy={5} stroke={redo ? R : PAT.ink} side={redo ? stip(id, "signal") : undefined} />
              <Gear cx={x} cy={101} r={8} n={8} />
              {redo ? (
                <g>
                  <path d={`M${x + 34} 88A16 16 0 1 1 ${x + 34} 116`} fill="none" stroke={R} strokeWidth={LINE.outline} />
                  <path d={headAlongPath(x + 32, 116, -1, 0.1, 6)} fill="none" stroke={R} strokeWidth={LINE.outline} />
                </g>
              ) : null}
              <line x1={x} y1={140} x2={x} y2={124} {...hair} />
              <path d={headAlongPath(x, 121, 0, -1, 6)} fill="none" {...ink} />
              {[0, 1, 2, 3].map((k) => {
                const red = hit && k === 2;
                const y = 178 - k * 8;
                return (
                  <g key={k}>
                    <Sheet id={id} x={x - 20} y={y} w={32} d={8} sk={8} fill={red && !erased ? stip(id, "signal") : PAT.paper} stroke={red ? R : PAT.ink} />
                    {red && erased ? <path d={cross(x - 2, y - 4, 5)} fill="none" stroke={R} strokeWidth={LINE.bold} /> : null}
                  </g>
                );
              })}
            </g>
          );
        })}
        {erased ? (
          <Num x={548} y={40} size={15} anchor="end" fill={R}>
            1 of 4 shards retrained
          </Num>
        ) : null}
      </Frame>
      <div className="mt-2.5 px-1">
        <PlateButton onClick={() => setErased((e) => !e)}>{erased ? "Restore the record" : "Erasure request"}</PlateButton>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 4: Research Ethics Board Governance for Human and AI Studies
   -------------------------------------------------------------------------- */

/**
 * A study protocol lying open in its folder: a consent form on one side,
 * the study design on the other, with a participant figure and a model
 * housing sketched in it (humans and AI both in the study). A hand stamp
 * hangs above it on its centre line, about to come down with the board's
 * approval.
 */
export function ProtocolDossier() {
  const id = "w6-dossier";
  return (
    <Frame
      width={560}
      height={286}
      label="Patent drawing of a study protocol lying open in its folder: a consent form with tick boxes on the left page. On the right page the written study design. Above it a hand stamp hangs on its centre line, about to stamp the protocol approved."
    >
      <PatentDefs id={id} />
      <g transform="translate(0 -26)">
      {/* the open folder */}
      <path d="M40 290L100 210H300L260 290Z" fill={PAT.paper} {...ink} />
      <path d="M260 290L300 210H500L520 290Z" fill={PAT.paper} {...ink} />
      <path d="M40 290V296H520V290" fill={stip(id, "dense")} {...ink} />
      {/* left page: consent form */}
      {[0, 1, 2, 3].map((k) => {
        const y = 226 + k * 16;
        const x = 96 - k * 12;
        return (
          <g key={k}>
            <path d={`M${x} ${y}L${x + 4} ${y - 6}H${x + 12}L${x + 8} ${y}Z`} fill={PAT.paper} {...hair} />
            {k < 3 ? <path d={tick(x + 6, y - 3, 3)} fill="none" {...ink} /> : null}
            <line x1={x + 20} y1={y - 3} x2={x + 150} y2={y - 3} {...hair} />
          </g>
        );
      })}
      {/* right page: the study design, written out */}
      {[0, 1, 2, 3, 4].map((k) => {
        const y = 224 + k * 13;
        const x = 300 - k * 6.5;
        return <line key={k} x1={r2(x + 14)} y1={y} x2={r2(x + (k === 4 ? 120 : 186))} y2={y} {...hair} />;
      })}
      {/* the hand stamp, raised on its centre line */}
      <line x1={300} y1={150} x2={300} y2={204} {...hair} strokeDasharray={CENTRE_DASH} />
      <ObliqueBox id={id} x={236} y={120} w={128} h={26} dx={10} dy={6} />
      <rect x={290} y={62} width={20} height={52} fill={PAT.paper} {...ink} />
      <ellipse cx={300} cy={54} rx={24} ry={12} fill={stip(id, "light")} {...ink} />
      <path d="M236 146H364L362 152H238Z" fill={stip(id, "dense")} {...ink} />
      <PatentKey x={300} y={138} size={13}>
        Approved
      </PatentKey>
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Core Principles of Human-Subjects Research Ethics
   -------------------------------------------------------------------------- */

/**
 * Consent as ongoing: a participant walks a centre line past three study
 * sessions, and the consent form is ticked afresh at each one. A second
 * participant, with diminished autonomy, is accompanied by a guardian whose
 * hand rests on their shoulder.
 */
export function OngoingConsent() {
  const id = "w6-respect";
  const fy = 176;
  return (
    <Frame
      width={400}
      height={190}
      label="Patent drawing of ongoing consent: a participant at left faces three study sessions along a centre line, numbered 1 to 3, and the consent form is ticked again at each. At right a participant with diminished autonomy stands with a guardian whose hand rests on their shoulder."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={fy} x2={390} y2={fy} {...hair} />
      <Figure id={id} x={32} y={fy} s={1.05} />
      <line x1={56} y1={120} x2={250} y2={120} {...hair} strokeDasharray={CENTRE_DASH} />
      {[90, 152, 214].map((x, i) => (
        <g key={x}>
          <Form x={x - 18} y={70} w={36} h={44} rows={2} ticks={2} />
          <circle cx={x} cy={120} r={3} fill={PAT.ink} />
          <Num x={x} y={142} size={16}>
            {`${i + 1}`}
          </Num>
        </g>
      ))}
      {/* the participant with diminished autonomy and the guardian */}
      <Figure id={id} x={300} y={fy} s={0.82} coat="paper" />
      <Figure id={id} x={350} y={fy} s={1.15} flip arm="reach" />
    </Frame>
  );
}

/**
 * A balance: on one pan, five small weights, the physical, psychological,
 * social, economic and privacy risks, each kept small. On the other, one
 * larger weight, the expected benefit. The beam tips toward the benefit.
 */
export function WelfareBalance() {
  const id = "w6-welfare";
  const cx = 200;
  const tilt = -7;
  const t = (tilt * Math.PI) / 180;
  const arm = 120;
  const lx = r2(cx - Math.cos(t) * arm);
  const ly = r2(64 + Math.sin(t) * arm);
  const rx = r2(cx + Math.cos(t) * arm);
  const ry = r2(64 - Math.sin(t) * arm);
  return (
    <Frame
      width={400}
      height={190}
      label="Patent drawing of a balance: the left pan holds five small weights, the physical, psychological, social, economic and privacy risks. The right pan holds one larger weight, the expected benefit. The beam tips toward the benefit."
    >
      <PatentDefs id={id} />
      <path d={`M${cx - 30} 182H${cx + 30}L${cx + 6} 166V70H${cx - 6}V166Z`} fill={stip(id, "light")} {...ink} />
      <line x1={lx} y1={ly} x2={rx} y2={ry} {...ink} strokeWidth={LINE.bold} />
      <circle cx={cx} cy={64} r={4} fill={PAT.paper} {...ink} />
      {/* risk pan */}
      <line x1={lx} y1={ly} x2={lx - 34} y2={ly + 58} {...hair} />
      <line x1={lx} y1={ly} x2={lx + 34} y2={ly + 58} {...hair} />
      <path d={`M${lx - 38} ${ly + 58}Q${lx} ${ly + 74} ${lx + 38} ${ly + 58}Z`} fill={stip(id, "dense")} {...ink} />
      {[-28, -14, 0, 14, 28].map((d) => (
        <path key={d} d={`M${lx + d - 5} ${ly + 58}L${lx + d - 3} ${ly + 50}H${lx + d + 3}L${lx + d + 5} ${ly + 58}Z`} fill={PAT.paper} {...ink} />
      ))}
      <PatentKey x={lx} y={ly + 94} size={13.5}>
        Risks
      </PatentKey>
      {/* benefit pan */}
      <line x1={rx} y1={ry} x2={rx - 34} y2={ry + 58} {...hair} />
      <line x1={rx} y1={ry} x2={rx + 34} y2={ry + 58} {...hair} />
      <path d={`M${rx - 38} ${ry + 58}Q${rx} ${ry + 74} ${rx + 38} ${ry + 58}Z`} fill={stip(id, "dense")} {...ink} />
      <path d={`M${rx - 20} ${ry + 58}L${rx - 14} ${ry + 30}H${rx + 14}L${rx + 20} ${ry + 58}Z`} fill={PAT.paper} {...ink} />
      <PatentKey x={rx} y={ry + 94} size={13.5}>
        Benefits
      </PatentKey>
    </Frame>
  );
}

/**
 * Three groups of participants side by side. Above each group stands the
 * stack of study burdens it carries, below each the share of benefit it
 * receives. The burdens are spread evenly across the three groups, and so
 * are the benefits.
 */
export function JusticeBurden() {
  const id = "w6-justice";
  const xs = [160, 260, 360];
  const fy = 150;
  return (
    <Frame
      width={400}
      height={190}
      label="Patent drawing of three groups of two participants each. In the burdens row above each group stands an equal stack of study sheets. In the benefits row before each group stands an equal stack of coins. Burdens and benefits are spread evenly across the groups."
    >
      <PatentDefs id={id} />
      <line x1={110} y1={fy} x2={394} y2={fy} {...hair} />
      <PatentKey x={8} y={44} size={13.5} anchor="start">
        Burdens
      </PatentKey>
      <PatentKey x={8} y={178} size={13.5} anchor="start">
        Benefits
      </PatentKey>
      {xs.map((x, g) => (
        <g key={x}>
          {[0, 1, 2].map((k) => (
            <Sheet key={k} id={id} x={x - 22} y={44 - k * 6} w={36} d={12} sk={8} />
          ))}
          <line x1={x - 22} y1={52} x2={x + 22} y2={52} {...hair} strokeDasharray="2 2" />
          <Figure id={id} x={x - 13} y={fy} s={0.95} coat={g === 1 ? "dense" : g === 2 ? "paper" : "light"} />
          <Figure id={id} x={x + 13} y={fy} s={0.95} flip coat={g === 1 ? "dense" : g === 2 ? "paper" : "light"} />
          <Coins id={id} cx={x} y={182} n={3} rx={14} ry={4.5} h={5} />
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Deception, Debriefing, and Minimal Risk in Behavioral Experiments
   -------------------------------------------------------------------------- */

type Condition = "necessary" | "minimal" | "debrief";

/**
 * Left, the deception itself: a participant faces a partition, believing a
 * human advisor sits behind it (dashed outline) while an AI agent does
 * (solid housing). Right, the board's interlock: a bolt held by three pins.
 * Each condition switched on lifts its pin. Only with all three lifted does
 * the bolt slide free and the stamp read PERMITTED.
 */
export function DeceptionInterlock() {
  const [on, setOn] = useState<Condition[]>(["minimal"]);
  const id = "w6-interlock";
  const R = PAT.signal;
  const all = on.length === 3;
  const pins: { c: Condition; k: [string, string] }[] = [
    { c: "necessary", k: ["No other", "way"] },
    { c: "minimal", k: ["Minimal", "risk"] },
    { c: "debrief", k: ["Debriefing", ""] },
  ];
  const fy = 260;
  const lx = 298;
  const by = 150;
  return (
    <div>
      <Frame
        width={640}
        height={236}
        label={`Patent drawing in two parts. Left: a participant faces a partition, believing a human advisor sits behind it, drawn in dashed outline, while an AI agent housing actually does. Right: an interlock whose bolt is held by three pins: no other way to answer the question, minimal risk, and debriefing. ${on.length} of 3 pins lifted: ${all ? "the bolt slides free and the stamp reads permitted." : "the bolt stays locked and the stamp reads not permitted, in red."}`}
      >
        <PatentDefs id={id} />
        <g transform="translate(0 -50)">
        <line x1={14} y1={fy} x2={290} y2={fy} {...hair} />
        <Figure id={id} x={50} y={fy} s={1.3} arm="reach" />
        <ObliqueBox id={id} x={124} y={110} w={10} h={150} dx={14} dy={9} />
        {/* the believed human, dashed. The actual AI agent, solid */}
        <g strokeDasharray="4 3">
          <circle cx={214} cy={124} r={10} fill="none" {...hair} />
          <path d="M198 186V154Q198 140 214 140Q230 140 230 154V186" fill="none" {...hair} />
        </g>
        <SmallModel id={id} x={178} y={196} w={64} h={60} />
        {/* the interlock */}
        <ObliqueBox id={id} x={lx} y={70} w={318} h={146} dx={14} dy={9} />
        <rect x={lx + 20} y={by - 8} width={278} height={16} fill={PAT.paper} {...hair} />
        <rect x={all ? lx + 156 : lx + 24} y={by - 6} width={138} height={12} fill={stip(id, "light")} stroke={all ? PAT.ink : R} strokeWidth={LINE.bold} style={{ transition: "x 400ms ease" }} />
        {pins.map((p, i) => {
          const x = lx + 56 + i * 104;
          const up = on.includes(p.c);
          return (
            <g key={p.c}>
              <rect x={x - 6} y={86} width={12} height={92} fill={PAT.paper} {...hair} />
              <rect x={x - 5} y={up ? 88 : by - 26} width={10} height={up ? 40 : 52} fill={up ? PAT.paper : stip(id, "dense")} stroke={!up ? R : PAT.ink} strokeWidth={LINE.outline} style={{ transition: "y 300ms ease" }} />
              <PatentKey x={x} y={194} size={12.5}>
                {p.k[0]}
              </PatentKey>
              {p.k[1] ? (
                <PatentKey x={x} y={209} size={12.5}>
                  {p.k[1]}
                </PatentKey>
              ) : null}
            </g>
          );
        })}
        <g transform={`rotate(-4 ${lx + 160} 252)`}>
          <rect x={lx + 80} y={236} width={160} height={30} fill="none" stroke={all ? PAT.ink : R} strokeWidth={LINE.bold} />
          <PatentKey x={lx + 160} y={256} size={13} fill={all ? PAT.ink : R}>
            {all ? "Permitted" : "Not permitted"}
          </PatentKey>
        </g>
        </g>
      </Frame>
      <Toggles
        label="Established"
        options={[
          { id: "necessary", label: "No other way to answer" },
          { id: "minimal", label: "Minimal risk" },
          { id: "debrief", label: "Debriefing, right to withdraw" },
        ]}
        value={on}
        onChange={setOn}
      />
    </div>
  );
}

/**
 * Sugging: an envelope marked as a market research survey, cut away along a
 * broken edge to show what is inside: a sales price tag (red).
 */
export function DisguisedSurvey() {
  const id = "w6-sugging";
  return (
    <Frame
      width={390}
      height={120}
      label="Patent drawing of an envelope printed market research survey, cut away along a zig-zag break to show what it holds: a sales price tag reading 49 dollars, in red."
    >
      <PatentDefs id={id} />
      <g transform="translate(-80 0)">
      <path d="M96 20L106 14H452L442 20Z" fill={stip(id, "light")} {...ink} />
      <path d="M442 20L452 14V100L442 106Z" fill={stip(id, "dense")} {...ink} />
      <path d="M96 20H442V106H96Z" fill={PAT.paper} {...ink} />
      <path d="M96 20L269 66L442 20" fill="none" {...hair} />
      <PatentKey x={214} y={84} size={12.5}>
        Market research
      </PatentKey>
      <PatentKey x={214} y={100} size={12.5}>
        Survey
      </PatentKey>
      {/* the cutaway */}
      <path d="M336 52L348 46L358 56L370 48L380 58L392 50L404 60L428 52V100H336Z" fill={PAT.paper} {...ink} />
      <Tag cx={384} cy={80} text="$49" red w={52} size={15} />
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   REB Oversight When AI Tools Process Participant Data
   -------------------------------------------------------------------------- */

type Detail = "name" | "workplace" | "events" | "quote";
const TRANSCRIPT: { d: Detail; lines: string[] }[] = [
  { d: "name", lines: ["My name is Maria Lopez."] },
  { d: "workplace", lines: ["I work nights on the cardiac ward", "of the only hospital in Thunder Bay."] },
  { d: "events", lines: ["It started after my divorce in 2019", "and my son's car accident."] },
  { d: "quote", lines: ["\u201cI felt like a ghost on that ward,\u201d", "I told my manager."] },
];
/** How many people could still match the transcript, by how many details remain. */
const MATCHES = (kept: Detail[]) => {
  if (kept.includes("name")) return "1";
  const n = kept.length;
  return ["thousands", "about 40", "about 3", "1"][n];
};

/**
 * An interview transcript on its way to an external language model. The
 * switches strip details from it: each stripped passage is blacked out with
 * a stippled bar, and every passage still left reads in red. The count
 * beside it is how many people the remaining text could describe. Stripping
 * the name alone leaves it at one.
 */
export function TranscriptStrip() {
  const [removed, setRemoved] = useState<Detail[]>(["name"]);
  const id = "w6-transcript";
  const R = PAT.signal;
  const kept = (["name", "workplace", "events", "quote"] as Detail[]).filter((d) => !removed.includes(d));
  const m = MATCHES(kept);
  const rows = TRANSCRIPT.flatMap((t, ti) => t.lines.map((l, li) => ({ d: t.d, l, y: 92 + ti * 10 + (TRANSCRIPT.slice(0, ti).reduce((n, u) => n + u.lines.length, 0) + li) * 26 })));
  return (
    <div>
      <Frame
        width={560}
        height={330}
        label={`Patent drawing of an interview transcript on its way to an external language model. Stripped: ${removed.length ? removed.join(", ") : "nothing"}. Those passages are blacked out with stippled bars. Still in the text, in red: ${kept.length ? kept.join(", ") : "nothing identifying"}. The remaining text could describe ${m} ${m === "1" ? "person" : "people"}.`}
      >
        <PatentDefs id={id} />
        {/* the transcript */}
        <path d="M360 26L372 18V306L360 314Z" fill={stip(id, "dense")} {...ink} />
        <path d="M20 26L32 18H372L360 26Z" fill={stip(id, "light")} {...ink} />
        <rect x={20} y={26} width={340} height={288} fill={PAT.paper} {...ink} />
        <PatentKey x={38} y={50} size={12.5} anchor="start">
          Interview 7
        </PatentKey>
        {rows.map((r) =>
          removed.includes(r.d) ? (
            <rect key={r.l} x={38} y={r.y - 14} width={r2(Math.min(300, r.l.length * 7.4))} height={18} fill={stip(id, "dense")} {...hair} />
          ) : (
            <text key={r.l} x={38} y={r.y} fontFamily="var(--font-body)" fontStyle="italic" fontSize={15} fill={R}>
              {r.l}
            </text>
          ),
        )}
        {/* to the external model */}
        <line x1={384} y1={170} x2={420} y2={170} {...hair} strokeDasharray={CENTRE_DASH} />
        <path d={headAlongPath(428, 170, 1, 0, 8)} fill="none" {...ink} />
        <SmallModel id={id} x={436} y={142} w={70} h={58} />
        <Num x={480} y={250} size={m === "thousands" ? 20 : 26} fill={m === "thousands" ? PAT.ink : R}>
          {m}
        </Num>
        <PatentKey x={480} y={272} size={12.5}>
          {m === "1" ? "Person fits" : "People fit"}
        </PatentKey>
      </Frame>
      <Toggles
        label="Strip"
        options={[
          { id: "name", label: "Name" },
          { id: "workplace", label: "Workplace" },
          { id: "events", label: "Life events" },
          { id: "quote", label: "Verbatim quotes" },
        ]}
        value={removed}
        onChange={setRemoved}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 5: Ethical and Epistemic Boundaries of Synthetic AI Respondents
   -------------------------------------------------------------------------- */

/** A persona card: a portrait outline and written attribute lines. */
function PersonaCard({ x, y, w = 70, h = 46 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={PAT.paper} {...ink} />
      <circle cx={x + 14} cy={y + 15} r={6} fill="none" {...hair} />
      <path d={`M${x + 5} ${y + 36}Q${x + 5} ${y + 24} ${x + 14} ${y + 24}Q${x + 23} ${y + 24} ${x + 23} ${y + 36}`} fill="none" {...hair} />
      {[12, 20, 28, 36].map((d) => (
        <line key={d} x1={x + 30} y1={y + d} x2={x + w - 6} y2={y + d} {...hair} />
      ))}
    </g>
  );
}

/**
 * A silicon-sampling press: a hopper of persona cards feeds a language
 * model housing, which prints filled questionnaires onto a growing stack in
 * place of the human participants, who stand aside.
 */
export function PersonaPress() {
  const id = "w6-press";
  const fy = 290;
  return (
    <Frame
      width={560}
      height={310}
      label="Patent drawing of a silicon-sampling press: a hopper of persona cards, each a portrait outline with written attributes, feeds a language model housing that prints filled questionnaires onto a tall stack at right. To the left stand three people, the human participants it replaces."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={fy} x2={550} y2={fy} {...hair} />
      {/* the human participants, standing aside */}
      {[30, 70, 110].map((x) => (
        <Figure key={x} id={id} x={x} y={fy} s={0.9} coat="paper" />
      ))}
      {/* the persona cards in a hopper */}
      <path d="M150 40H290L270 92H170Z" fill={PAT.paper} {...ink} />
      {[0, 1, 2].map((k) => (
        <PersonaCard key={k} x={174 + k * 10} y={18 - k * 8} />
      ))}
      <path d="M150 40H290" fill="none" {...ink} />
      {/* the model housing */}
      <ObliqueBox id={id} x={160} y={100} w={130} h={130} dx={16} dy={10} />
      <Gear cx={200} cy={146} r={20} n={14} />
      <Gear cx={246} cy={186} r={15} n={12} phase={0.25} />
      <rect x={290} y={204} width={10} height={6} fill={PAT.ink} />
      {/* the printed questionnaires */}
      <path d="M300 208Q330 210 360 220" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(368, 224, 1, 0.3, 8)} fill="none" {...ink} />
      <ObliqueBox id={id} x={160} y={230} w={130} h={60} dx={16} dy={10} />
      {Array.from({ length: 16 }, (_, k) => (
        <Sheet key={k} id={id} x={386} y={r2(fy - k * 8)} w={90} d={30} sk={28} t={3} lines={k === 15 ? 3 : 0} />
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Silicon Samples: Language Models as Simulated Survey Respondents
   -------------------------------------------------------------------------- */

/**
 * A persona prompt card, its attributes keyed and filled in, goes into a
 * language model housing, which fills in a questionnaire as that persona.
 */
export function PersonaPrompt() {
  const id = "w6-persona";
  const rows: [string, string][] = [
    ["Age", "72"],
    ["Income", "$28,000"],
    ["Region", "rural north"],
    ["Politics", "moderate"],
  ];
  return (
    <Frame
      width={560}
      height={176}
      label="Patent drawing of a persona prompt card listing age 72, income 28,000 dollars, region rural north and politics moderate, fed into a language model housing that fills in a questionnaire with ticks as that persona."
    >
      <PatentDefs id={id} />
      <path d="M232 22L244 14V158L232 166Z" fill={stip(id, "dense")} {...ink} />
      <path d="M14 22L26 14H244L232 22Z" fill={stip(id, "light")} {...ink} />
      <rect x={14} y={22} width={218} height={144} fill={PAT.paper} {...ink} />
      {rows.map(([k, v], i) => (
        <g key={k}>
          <PatentKey x={28} y={54 + i * 30} size={13} anchor="start">
            {k}
          </PatentKey>
          <Num x={130} y={54 + i * 30} size={16} anchor="start">
            {v}
          </Num>
          <line x1={28} y1={62 + i * 30} x2={218} y2={62 + i * 30} {...hair} />
        </g>
      ))}
      <line x1={256} y1={94} x2={272} y2={94} {...hair} />
      <path d={headAlongPath(280, 94, 1, 0, 8)} fill="none" {...ink} />
      <SmallModel id={id} x={286} y={60} w={78} h={70} />
      <line x1={378} y1={94} x2={400} y2={94} {...hair} />
      <path d={headAlongPath(408, 94, 1, 0, 8)} fill="none" {...ink} />
      <Form x={418} y={30} w={120} h={130} rows={5} ticks={5} />
    </Frame>
  );
}

/** The model's distribution over answers on a 1 to 7 scale for the persona prompt. */
const ANSWER_PMF = [0.02, 0.05, 0.1, 0.18, 0.34, 0.22, 0.09];

/**
 * Two figures. A member of the group: one person. A conditional probability
 * distribution over text: a pile of pages written about the group feeds a
 * model, whose answers form a distribution of slips over a seven-point
 * scale. The button samples one response from it. Each press can land on a
 * different answer.
 */
export function PersonVsDistribution() {
  const [draw, setDraw] = useState<number | null>(null);
  const [seed, setSeed] = useState(5);
  const id = "w6-dist";
  const sample = () => {
    const r = seeded(seed)();
    let acc = 0;
    let k = 0;
    for (; k < ANSWER_PMF.length - 1; k++) {
      acc += ANSWER_PMF[k];
      if (r < acc) break;
    }
    setDraw(k);
    setSeed((v) => v + 1);
  };
  const base = 186;
  const bx = 290;
  return (
    <div>
      <Frame
        width={560}
        height={250}
        label={`Patent drawing in two figures. A member of the group: one standing person. A conditional probability distribution over text: a pile of pages written about the group feeds a model whose answers stack as slips over a seven-point scale, highest at 5. ${draw !== null ? `The last sampled response is ${draw + 1}.` : "No response has been sampled yet."}`}
      >
        <PatentDefs id={id} />
        <line x1={14} y1={base} x2={130} y2={base} {...hair} />
        <Figure id={id} x={70} y={base} s={1.55} />
        <FigureName x={72} y={226} size={13}>
          a member of the group
        </FigureName>
        {/* pages written about the group */}
        {[0, 1, 2, 3].map((k) => (
          <Sheet key={k} id={id} x={164} y={r2(78 - k * 6)} w={56} d={24} sk={16} lines={k === 3 ? 2 : 0} />
        ))}
        <line x1={194} y1={84} x2={194} y2={98} {...hair} />
        <path d={headAlongPath(194, 104, 0, 1, 7)} fill="none" {...ink} />
        <SmallModel id={id} x={166} y={112} w={52} h={46} />
        <line x1={234} y1={140} x2={256} y2={140} {...hair} />
        <path d={headAlongPath(262, 140, 1, 0, 7)} fill="none" {...ink} />
        {/* the distribution of answer slips */}
        {ANSWER_PMF.map((p, k) => {
          const n = Math.max(1, Math.round(p * 36));
          const x = bx + k * 36;
          const hit = draw === k;
          return (
            <g key={k}>
              {Array.from({ length: n }, (_, j) => (
                <rect key={j} x={x} y={r2(base - 7 - j * 6)} width={28} height={5} fill={hit && j === n - 1 ? stip(id, "dense") : PAT.paper} {...hair} strokeWidth={hit ? LINE.outline : LINE.hair} />
              ))}
              <Num x={x + 14} y={base + 17} size={13}>
                {`${k + 1}`}
              </Num>
            </g>
          );
        })}
        <line x1={bx - 6} y1={base} x2={bx + 7 * 36} y2={base} {...ink} />
        {draw !== null ? <path d={headAlongPath(bx + draw * 36 + 14, r2(base - 12 - Math.round(ANSWER_PMF[draw] * 36) * 6), 0, 1, 8)} fill="none" {...ink} strokeWidth={LINE.bold} /> : null}
        <FigureName x={bx + 125} y={226} size={13.5}>
          a conditional probability
        </FigureName>
        <FigureName x={bx + 125} y={242} size={13.5}>
          distribution over text
        </FigureName>
      </Frame>
      <div className="mt-2.5 px-1">
        <PlateButton onClick={sample}>Sample a response</PlateButton>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Epistemic and Ethical Risks of Replacing Human Panels With AI
   -------------------------------------------------------------------------- */

/**
 * CETSCALE composite scores (17 to 119), target USA: the Detroit human
 * sample of Shimp and Sharma (1987) and five language models, from Wadi,
 * Ghodrat, and Philp (2026), Table 1.
 */
const CETSCALE = {
  human: { label: "Detroit residents", m: 68.58, sd: 25.96 },
  models: [
    { id: "aya", label: "Aya Expanse 32B", m: 89.11, sd: 1.32 },
    { id: "llama", label: "Llama 3.3 70B", m: 71.99, sd: 0.95 },
    { id: "ministral", label: "Ministral 14B", m: 70.2, sd: 5.25 },
    { id: "gemma", label: "Gemma 3 27B", m: 60.32, sd: 0.94 },
    { id: "qwen", label: "Qwen3 Next 80B", m: 53.85, sd: 1.17 },
  ],
} as const;
type ModelId = (typeof CETSCALE.models)[number]["id"];

/**
 * The spread of one human sample against one language model on the same
 * scale. The human scores (light stipple) spread across most of the scale.
 * The model's (red) stand in a narrow spike, its top cut by a break line
 * because it rises far above the plate. The choice below swaps the model.
 */
export function VarianceCollapse() {
  const [mid, setMid] = useState<ModelId>("llama");
  const id = "w6-collapse";
  const R = PAT.signal;
  const mdl = CETSCALE.models.find((m) => m.id === mid)!;
  const hum = CETSCALE.human;
  const x0 = 30;
  const x1 = 530;
  const base = 150;
  const X = (v: number) => r2(x0 + ((v - 17) / (119 - 17)) * (x1 - x0));
  const H = 100;
  const hPeak = 1 / hum.sd;
  const curve = (m: number, sd: number, cap: number) => {
    const pts = Array.from({ length: 205 }, (_, i) => {
      const v = 17 + (i / 204) * 102;
      const d = Math.exp(-((v - m) ** 2) / (2 * sd * sd)) / sd;
      return `${X(v)} ${r2(base - Math.min(cap, (d / hPeak) * 40))}`;
    });
    return `M${X(17)} ${base}L${pts.join("L")}L${X(119)} ${base}Z`;
  };
  const tall = (1 / mdl.sd / hPeak) * 40 > H;
  return (
    <div>
      <Frame
        width={560}
        height={196}
        label={`Patent chart of CETSCALE composite scores from 17 to 119, target USA. Detroit residents (Shimp and Sharma, 1987): mean 68.58, standard deviation 25.96, a broad stippled hill. ${mdl.label} (Wadi, Ghodrat, and Philp, 2026): mean ${mdl.m}, standard deviation ${mdl.sd}, a narrow red spike${tall ? " cut by a break line" : ""}.`}
      >
        <PatentDefs id={id} />
        <path d={curve(hum.m, hum.sd, H)} fill={stip(id, "light")} {...ink} />
        <path d={curve(mdl.m, mdl.sd, H)} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} />
        {tall ? (
          <path d={`M${r2(X(mdl.m) - 10)} ${base - H + 4}L${r2(X(mdl.m) - 3)} ${base - H - 2}L${r2(X(mdl.m) + 3)} ${base - H + 4}L${r2(X(mdl.m) + 10)} ${base - H - 2}`} fill="none" stroke={R} strokeWidth={LINE.bold} />
        ) : null}
        <line x1={x0} y1={base} x2={x1} y2={base} {...ink} />
        {[17, 51, 85, 119].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={base} x2={X(v)} y2={base + 5} {...hair} />
            <Num x={X(v)} y={base + 19} size={13}>
              {v}
            </Num>
          </g>
        ))}
        <PatentKey x={(x0 + x1) / 2} y={base + 40} size={13}>
          CETSCALE score
        </PatentKey>
        <FigureName x={X(28)} y={92} size={13.5}>
          humans
        </FigureName>
        <Num x={X(28)} y={110} size={13}>
          SD 25.96
        </Num>
        <Num x={r2(X(mdl.m) + 16)} y={base - H + 14} size={14} anchor="start" fill={R}>
          {`SD ${mdl.sd}`}
        </Num>
      </Frame>
      <Segmented
        label="Model"
        options={CETSCALE.models.map((m) => ({ id: m.id, label: m.label }))}
        value={mid}
        onChange={setMid}
      />
    </div>
  );
}

/** A persona's answer distribution on a 1 to 7 item under two wordings. */
const WORDINGS = {
  a: [0.03, 0.07, 0.14, 0.22, 0.28, 0.18, 0.08],
  b: [0.08, 0.16, 0.24, 0.24, 0.16, 0.08, 0.04],
} as const;

/**
 * A simulated sample's answers to one seven-point item, as bars. The slider
 * sets the sampling temperature: the distribution sharpens toward one answer
 * as it falls and spreads as it rises. The switch rewords the persona. Mean
 * and standard deviation move with both.
 */
export function TemperatureShift() {
  const [t, setT] = useState(1);
  const [w, setW] = useState<"a" | "b">("a");
  const id = "w6-temp";
  const raw = WORDINGS[w].map((p) => Math.pow(p, 1 / t));
  const z = raw.reduce((a, b) => a + b, 0);
  const pmf = raw.map((p) => p / z);
  const mean = pmf.reduce((a, p, k) => a + p * (k + 1), 0);
  const sd = Math.sqrt(pmf.reduce((a, p, k) => a + p * (k + 1 - mean) ** 2, 0));
  const base = 140;
  const bx = 40;
  const bw = 46;
  const X = (v: number) => r2(bx + (v - 1) * 52 + bw / 2);
  return (
    <div>
      <Frame
        width={560}
        height={180}
        label={`Patent bar chart of a simulated sample's answers to one seven-point item, persona wording ${w === "a" ? "one" : "two"}, temperature ${t.toFixed(1)}: mean ${mean.toFixed(2)}, standard deviation ${sd.toFixed(2)}.`}
      >
        <PatentDefs id={id} />
        {pmf.map((p, k) => {
          const h = r2(Math.min(118, p * 220));
          return (
            <g key={k}>
              <rect x={bx + k * 52} y={r2(base - h)} width={bw} height={h} fill={stip(id, "light")} {...ink} />
              <Num x={bx + k * 52 + bw / 2} y={base + 18} size={13}>
                {`${k + 1}`}
              </Num>
            </g>
          );
        })}
        <line x1={bx - 8} y1={base} x2={bx + 7 * 52} y2={base} {...ink} />
        <line x1={X(mean)} y1={10} x2={X(mean)} y2={base} {...ink} strokeWidth={LINE.bold} strokeDasharray={CENTRE_DASH} />
        <Num x={540} y={56} size={18} anchor="end">
          {`mean ${mean.toFixed(2)}`}
        </Num>
        <Num x={540} y={82} size={18} anchor="end">
          {`SD ${sd.toFixed(2)}`}
        </Num>
      </Frame>
      <div>
        <Slider label="Temperature" value={t} min={0.2} max={1.6} step={0.1} onChange={setT} formatValue={(v) => v.toFixed(1)} />
        <Segmented
          label="Wording"
          options={[
            { id: "a", label: "One" },
            { id: "b", label: "Two" },
          ]}
          value={w}
          onChange={setW}
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Governance Rules for Hybrid Human-AI Research
   -------------------------------------------------------------------------- */

/**
 * Two stages. Pretest: a model housing checks a draft questionnaire, its
 * routing arrow skipping a question. Validation: the finished questionnaire
 * goes to three human respondents, from whom the conclusions come.
 */
export function PilotNotReplace() {
  const id = "w6-pilot";
  const fy = 168;
  return (
    <Frame
      width={400}
      height={196}
      label="Patent drawing in two figures. Pretest: a model housing checks a draft questionnaire whose routing arrow skips a question. Validation: the questionnaire goes on to three human respondents."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={fy} x2={390} y2={fy} {...hair} />
      {/* pretest */}
      <SmallModel id={id} x={16} y={96} w={50} h={44} />
      <line x1={78} y1={110} x2={92} y2={102} {...hair} strokeDasharray="3 2" />
      <Form x={96} y={50} w={64} h={92} rows={4} ticks={0} />
      <path d="M164 64Q182 82 164 100" fill="none" {...ink} />
      <path d={headAlongPath(162, 104, -0.6, 1, 6)} fill="none" {...ink} />
      <FigureName x={96} y={188} size={13.5}>
        pretest
      </FigureName>
      {/* validation on human samples */}
      <line x1={186} y1={96} x2={210} y2={96} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(216, 96, 1, 0, 7)} fill="none" {...ink} />
      {[250, 296, 342].map((x) => (
        <Figure key={x} id={id} x={x} y={fy} s={1.05} />
      ))}
      <FigureName x={296} y={188} size={13.5}>
        validation
      </FigureName>
    </Frame>
  );
}

/**
 * A report's results table with every row tagged by its source, HUMAN or
 * SIMULATED, and a footer recording the model version and the sampling
 * protocol.
 */
export function DisclosedReport() {
  const id = "w6-disclose";
  const rows = ["Human", "Human", "Simulated", "Simulated", "Human"];
  return (
    <Frame
      width={380}
      height={196}
      label="Patent drawing of a report page whose results table tags every row by its source, human or simulated (simulated rows in dashed boxes), with a footer recording the model version and the sampling protocol."
    >
      <PatentDefs id={id} />
      <g transform="translate(20 0)">
      <path d="M318 18L328 12V180L318 186Z" fill={stip(id, "dense")} {...ink} />
      <path d="M12 18L22 12H328L318 18Z" fill={stip(id, "light")} {...ink} />
      <rect x={12} y={18} width={306} height={168} fill={PAT.paper} {...ink} />
      {[30, 38].map((y, i) => (
        <line key={y} x1={26} y1={y} x2={i ? 180 : 270} y2={y} {...hair} />
      ))}
      {rows.map((k, i) => {
        const y = 60 + i * 18;
        const sim = k === "Simulated";
        return (
          <g key={i}>
            <rect x={26} y={y - 12} width={136} height={15} fill={PAT.paper} {...hair} strokeDasharray={sim ? "3 2" : undefined} />
            <PatentKey x={94} y={y} size={12.5}>
              {k}
            </PatentKey>
            <line x1={176} y1={y - 4} x2={r2(226 + ((i * 37) % 76))} y2={y - 4} {...hair} />
          </g>
        );
      })}
      <line x1={26} y1={146} x2={304} y2={146} {...ink} />
      <PatentKey x={26} y={163} size={12.5} anchor="start">
        Model version
      </PatentKey>
      <line x1={200} y1={160} x2={304} y2={160} {...hair} />
      <PatentKey x={26} y={179} size={12.5} anchor="start">
        Sampling protocol
      </PatentKey>
      <line x1={244} y1={176} x2={304} y2={176} {...hair} />
      </g>
    </Frame>
  );
}

/**
 * Two figures. A fragile proxy: a model housing wearing a dashed outline of
 * a shopper, guessing how shoppers feel (red). The actual market actor: a
 * model housing pushing a cart at a shelf, examined through a hand lens.
 */
export function ProxyVsActor() {
  const id = "w6-proxy";
  const R = PAT.signal;
  const fy = 166;
  return (
    <Frame
      width={400}
      height={196}
      label="Patent drawing in two figures. Fragile proxy: a model housing wearing a dashed outline of a shopper, drawn in red. Actual market actor: a model housing with a shopping cart beside a shelf of products, examined through a hand lens."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={fy} x2={390} y2={fy} {...hair} />
      {/* proxy */}
      <g strokeDasharray="4 3">
        <circle cx={92} cy={46} r={16} fill="none" stroke={R} strokeWidth={LINE.outline} />
        <path d="M58 166V96Q58 70 92 70Q126 70 126 96V166" fill="none" stroke={R} strokeWidth={LINE.outline} />
      </g>
      <ObliqueBox id={id} x={66} y={108} w={48} h={52} dx={8} dy={5} stroke={R} side={stip(id, "signal")} top={stip(id, "signal")} />
      <Gear cx={82} cy={126} r={8} n={8} />
      <Gear cx={100} cy={144} r={6} n={7} phase={0.25} />
      <FigureName x={92} y={188} size={13.5}>
        <tspan fill={R}>proxy</tspan>
      </FigureName>
      {/* actor */}
      <ObliqueBox id={id} x={214} y={108} w={48} h={52} dx={8} dy={5} />
      <Gear cx={230} cy={126} r={8} n={8} />
      <Gear cx={248} cy={144} r={6} n={7} phase={0.25} />
      <ShoppingCart x={264} y={118} size={48} weight="light" color={PAT.ink} />
      <ObliqueBox id={id} x={320} y={86} w={60} h={80} dx={8} dy={5} />
      {[112, 140].map((y) => (
        <line key={y} x1={320} y1={y} x2={380} y2={y} {...hair} />
      ))}
      {[
        [326, 112],
        [350, 112],
        [334, 140],
        [356, 140],
      ].map(([x, y]) => (
        <ObliqueBox key={`${x}${y}`} id={id} x={x} y={y - 14} w={16} h={14} dx={4} dy={3} />
      ))}
      <Lens id={id} cx={268} cy={56} r={26} a={2.4} handle={22} />
      <FigureName x={290} y={188} size={13.5}>
        actor
      </FigureName>
    </Frame>
  );
}
