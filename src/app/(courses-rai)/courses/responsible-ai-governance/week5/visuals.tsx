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
import { Chip, Dial, Figure, Flag, Gear, House, Sheet, SmallModel, Tag, cross, headAlongPath, star, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 05 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in Caslon italic and one examiner's red for the finding. See the course
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

/** Caslon numerals or a quantity on a plate. */
function Num({
  x,
  y,
  children,
  size = 14,
  anchor = "middle",
  fill = PAT.ink,
  italic = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-heading)"
      fontSize={size}
      fontStyle={italic ? "italic" : undefined}
      fill={fill}
      style={{ fontVariantNumeric: "lining-nums" }}
    >
      {children}
    </text>
  );
}

/* --------------------------------------------------------------------------
   02. Why Opacity Is a Governance Problem
   -------------------------------------------------------------------------- */

/**
 * A sealed model housing. Six input cards feed its left face. Three decisions
 * leave its right face: a loan letter stamped DENIED, a premium tag raised,
 * a supplier shortlist with one name crossed off. Inside, the routes from the
 * inputs to the decisions are hidden lines, drawn dashed in red: which
 * variables drove the outcome cannot be seen from outside.
 */
export function OpaqueDecisions() {
  const id = "w5-opaque";
  const bx = 196;
  const by = 34;
  const bw = 150;
  const bh = 150;
  const ins = Array.from({ length: 6 }, (_, i) => r2(by + 18 + i * 23));
  const outs = [by + 26, by + 75, by + 124];
  const exitX = bx + bw;
  return (
    <Frame
      width={560}
      height={262}
      label="Patent drawing of a sealed model housing. Six input cards feed its left face, and three decisions leave its right face: a loan letter stamped DENIED, an insurance premium tag raised by 18 percent, and a supplier shortlist with one name crossed off. Inside the housing, the routes from the inputs to the decisions are hidden lines, dashed in red, so which variables drove each outcome cannot be seen."
    >
      <PatentDefs id={id} />
      {/* input cards */}
      {ins.map((y, i) => (
        <g key={i}>
          <Sheet id={id} x={44} y={r2(y + 4)} w={52} d={9} sk={10} t={2.5} lines={1} />
          <line x1={110} y1={r2(y - 1)} x2={bx} y2={r2(y - 1)} {...hair} />
        </g>
      ))}
      {/* the sealed housing */}
      <ObliqueBox id={id} x={bx} y={by} w={bw} h={bh} dx={16} dy={10} />
      {/* hidden routes inside */}
      {ins.map((y, i) =>
        outs.map((oy, j) =>
          (i + j) % 2 === 0 || i === 2 ? (
            <path
              key={`${i}-${j}`}
              d={`M${bx + 4} ${r2(y - 1)}C${bx + 60} ${r2(y - 1)} ${bx + 80} ${oy} ${exitX - 4} ${oy}`}
              fill="none"
              stroke={PAT.signal}
              strokeWidth={LINE.hair}
              strokeDasharray="4 3"
            />
          ) : null,
        ),
      )}
      {/* outputs */}
      {outs.map((oy) => (
        <line key={oy} x1={exitX + 16} y1={oy} x2={exitX + 34} y2={oy} {...hair} />
      ))}
      {/* loan letter, stamped */}
      <rect x={exitX + 38} y={outs[0] - 30} width={66} height={56} fill={PAT.paper} {...ink} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={exitX + 46} y1={outs[0] - 20 + k * 7} x2={exitX + 90 - k * 8} y2={outs[0] - 20 + k * 7} {...hair} />
      ))}
      <g transform={`rotate(-8 ${exitX + 74} ${outs[0] + 12})`}>
        <rect x={exitX + 46} y={outs[0] + 3} width={56} height={17} fill="none" {...ink} />
        <PatentKey x={exitX + 75} y={outs[0] + 15.5} size={10}>
          DENIED
        </PatentKey>
      </g>
      {/* premium tag, raised */}
      <Tag cx={exitX + 78} cy={outs[1]} text="+18%" w={56} size={14} />
      {/* supplier shortlist, one struck */}
      <rect x={exitX + 38} y={outs[2] - 24} width={66} height={52} fill={PAT.paper} {...ink} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          {k === 2 ? (
            <path d={cross(exitX + 47, outs[2] - 13 + k * 11, 3)} {...ink} />
          ) : (
            <circle cx={exitX + 47} cy={outs[2] - 13 + k * 11} r={1.6} fill={PAT.ink} />
          )}
          <line x1={exitX + 53} y1={outs[2] - 13 + k * 11} x2={exitX + 94} y2={outs[2] - 13 + k * 11} {...hair} />
        </g>
      ))}
      <FigureName x={70} y={240} size={14}>
        variables
      </FigureName>
      <FigureName x={exitX + 72} y={240} size={14}>
        outcomes
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   03. Transparency Versus Explainability Versus Interpretability
   -------------------------------------------------------------------------- */

type Form = "process" | "intrinsic" | "posthoc";

/**
 * One deployed model and the three forms of visibility, each switched on or
 * off on its own. Process transparency puts up a notice board with its
 * documents beside the model. Intrinsic interpretability turns the housing's
 * front to glass, showing a weighted beam whose weights can be read directly.
 * Without it, the housing is sealed and its routes are hidden (dashed red).
 * Post-hoc explainability clamps a small surrogate model to the output, which
 * prints an approximate summary. Any combination can be set.
 */
export function ThreeForms() {
  const [on, setOn] = useState<Form[]>(["process", "posthoc"]);
  const id = "w5-three";
  const has = (f: Form) => on.includes(f);
  const hx = 226;
  const hy = 52;
  const hw = 170;
  const hh = 150;
  const outY = 138;
  const label = `Patent drawing of one deployed model with three forms of visibility. Process transparency is ${has("process") ? "on: a notice board and two documents stand beside the model" : "off"}. Intrinsic interpretability is ${has("intrinsic") ? "on: the housing's front is glass, showing a beam with three weights read directly" : "off: the housing is sealed and its internal routes are hidden, drawn dashed in red"}. Post-hoc explainability is ${has("posthoc") ? "on: a small surrogate model fed by the output prints an approximate three-bar summary" : "off"}.`;
  return (
    <div>
      <Frame width={660} height={262} label={label}>
        <PatentDefs id={id} />
        {/* process transparency: notice board and documents */}
        {has("process") ? (
          <g>
            <line x1={84} y1={150} x2={84} y2={206} {...ink} strokeWidth={LINE.bold} />
            <ObliqueBox id={id} x={24} y={58} w={120} h={92} dx={8} dy={5} />
            <PatentKey x={84} y={80} size={13}>
              NOTICE
            </PatentKey>
            {[0, 1, 2, 3].map((k) => (
              <line key={k} x1={40} y1={96 + k * 13} x2={k === 3 ? 100 : 128} y2={96 + k * 13} {...hair} />
            ))}
            <Sheet id={id} x={100} y={206} w={58} d={14} sk={16} lines={2} />
            <Sheet id={id} x={106} y={196} w={58} d={14} sk={16} lines={2} />
            <FigureName x={84} y={240} size={14}>
              process transparency
            </FigureName>
          </g>
        ) : null}

        {/* the model */}
        <ObliqueBox id={id} x={hx} y={hy} w={hw} h={hh} dx={16} dy={10} />
        {has("intrinsic") ? (
          <g>
            {/* glass: glints in the corner */}
            <path d={`M${hx + 10} ${hy + 30}L${hx + 30} ${hy + 10}M${hx + 10} ${hy + 44}L${hx + 44} ${hy + 10}`} {...hair} />
            {/* a beam with three weights, each marked with its coefficient */}
            <path d={`M${hx + 85} ${hy + 108}l-10 18h20Z`} fill={stip(id, "dense")} {...ink} />
            <line x1={hx + 60} y1={hy + 126.5} x2={hx + 110} y2={hy + 126.5} {...ink} />
            <line x1={hx + 14} y1={hy + 108} x2={hx + 156} y2={hy + 108} {...ink} strokeWidth={LINE.bold} />
            {(
              [
                [hx + 32, 30, "0.8"],
                [hx + 72, 26, "0.3"],
                [hx + 128, 36, "1.2"],
              ] as const
            ).map(([x, s, w]) => (
              <g key={w}>
                <ObliqueBox id={id} x={r2(x - s / 2)} y={r2(hy + 107 - s)} w={s} h={s} dx={5} dy={3} />
                <Num x={x} y={r2(hy + 112 - s / 2)} size={12}>
                  {w}
                </Num>
              </g>
            ))}
            <FigureName x={r2(hx + hw / 2 + 8)} y={240} size={14}>
              intrinsic interpretability
            </FigureName>
          </g>
        ) : (
          <g>
            {[30, 62, 94, 126].map((y, i) =>
              [48, 88, 118].map((oy, j) =>
                (i + j) % 2 === 0 ? (
                  <path
                    key={`${i}-${j}`}
                    d={`M${hx + 6} ${hy + y}C${hx + 70} ${hy + y} ${hx + 90} ${hy + oy} ${hx + hw - 6} ${hy + oy}`}
                    fill="none"
                    stroke={PAT.signal}
                    strokeWidth={LINE.hair}
                    strokeDasharray="4 3"
                  />
                ) : null,
              ),
            )}
            <FigureName x={r2(hx + hw / 2 + 8)} y={240} size={14}>
              black box
            </FigureName>
          </g>
        )}

        {/* post-hoc explainability: a surrogate on the output */}
        {has("posthoc") ? (
          <g>
            <line x1={hx + hw + 16} y1={outY} x2={494} y2={outY} {...hair} />
            <Num x={r2((hx + hw + 16 + 494) / 2)} y={outY - 8} size={20}>
              ≈
            </Num>
            <SmallModel id={id} x={494} y={110} w={58} h={54} />
            <line x1={562} y1={outY} x2={578} y2={outY} {...hair} />
            <rect x={580} y={104} width={66} height={68} fill={PAT.paper} {...ink} />
            {[38, 24, 14].map((w, k) => (
              <rect key={k} x={590} y={116 + k * 17} width={w} height={8} fill={stip(id, "light")} {...ink} />
            ))}
            <FigureName x={570} y={240} size={14}>
              post-hoc explanation
            </FigureName>
          </g>
        ) : null}
      </Frame>
      <Toggles
        label="Provide"
        options={[
          { id: "process", label: "Process transparency" },
          { id: "intrinsic", label: "Intrinsic interpretability" },
          { id: "posthoc", label: "Post-hoc explainability" },
        ]}
        value={on}
        onChange={setOn}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   04. Part 1: Intrinsic Interpretability Versus Black-Box Complexity
   -------------------------------------------------------------------------- */

/** A small decision tree: a root, two branches and four leaves, centred on (cx, y). */
function TreeGlyph({ cx, y, s = 1, stroke = PAT.ink }: { cx: number; y: number; s?: number; stroke?: string }) {
  const o = { stroke, strokeWidth: LINE.hair, strokeLinecap: "round" as const, fill: "none" };
  const p = (dx: number, dy: number) => `${r2(cx + dx * s)} ${r2(y + dy * s)}`;
  return (
    <g>
      <path d={`M${p(0, 0)}L${p(-6, 7)}M${p(0, 0)}L${p(6, 7)}M${p(-6, 7)}L${p(-9, 14)}M${p(-6, 7)}L${p(-3, 14)}M${p(6, 7)}L${p(3, 14)}M${p(6, 7)}L${p(9, 14)}`} {...o} />
      <circle cx={cx} cy={y} r={r2(1.6 * s)} fill={stroke} />
      {[-9, -3, 3, 9].map((dx) => (
        <rect key={dx} x={r2(cx + dx * s - 1.5 * s)} y={r2(y + 14 * s)} width={r2(3 * s)} height={r2(3 * s)} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.hair} />
      ))}
    </g>
  );
}

/**
 * A platform balance with a level needle. On the left platform lies one
 * card: a three-line rule list. On the right stands a crate packed with
 * decision trees: the ensemble. The beam rests level and the needle, in red,
 * points straight up: the same out-of-sample accuracy.
 */
export function LevelBalance() {
  const id = "w5-balance";
  const cx = 270;
  const beamY = 168;
  return (
    <Frame
      width={540}
      height={330}
      label="Patent drawing of a platform balance whose base reads out-of-sample accuracy. On the left platform lies a single card carrying a three-line rule list, the constrained interpretable model. On the right platform stands a crate packed with fifteen small decision trees, the black-box ensemble. The beam rests level and the needle, in red, points straight up at the centre of its dial."
    >
      <PatentDefs id={id} />
      {/* base with its key */}
      <ObliqueBox id={id} x={52} y={262} w={424} h={30} dx={14} dy={9} />
      <PatentKey x={cx} y={282} size={13}>
        OUT-OF-SAMPLE ACCURACY
      </PatentKey>
      {/* column and beam */}
      <rect x={cx - 8} y={beamY + 8} width={16} height={262 - beamY - 8} fill={PAT.paper} {...ink} />
      <ObliqueBox id={id} x={84} y={beamY} w={372} h={8} dx={6} dy={4} />
      <circle cx={cx} cy={beamY + 4} r={3} fill={PAT.paper} {...ink} />
      {/* stems and platforms */}
      {[114, 426].map((x) => (
        <g key={x}>
          <line x1={x} y1={beamY - 4} x2={x} y2={146} {...ink} strokeWidth={LINE.bold} />
          <Sheet id={id} x={x - 66} y={146} w={120} d={12} sk={12} t={4} />
        </g>
      ))}
      {/* the rule list */}
      <Sheet id={id} x={78} y={140} w={60} d={34} sk={22} t={2} lines={3} />
      {/* the crate of trees */}
      <ObliqueBox id={id} x={374} y={52} w={100} h={88} dx={12} dy={8} />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => <TreeGlyph key={`${row}-${col}`} cx={r2(386 + col * 19)} y={60 + row * 27} s={0.82} />),
      )}
      {/* level needle and dial */}
      <path d={`M${cx - 40} 112A40 40 0 0 1 ${cx + 40} 112`} fill="none" {...ink} />
      {[-30, -15, 0, 15, 30].map((d) => {
        const a = ((d - 90) * Math.PI) / 180;
        return (
          <line
            key={d}
            x1={r2(cx + Math.cos(a) * 34)}
            y1={r2(112 + Math.sin(a) * 34)}
            x2={r2(cx + Math.cos(a) * 40)}
            y2={r2(112 + Math.sin(a) * 40)}
            {...hair}
          />
        );
      })}
      <line x1={cx} y1={beamY} x2={cx} y2={78} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <FigureName x={118} y={318} size={14}>
        constrained interpretable model
      </FigureName>
      <FigureName x={424} y={318} size={14}>
        black-box ensemble
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   05. Intrinsically Interpretable Models
   -------------------------------------------------------------------------- */

const LIN = { b: -2, v: 0.6, a: -0.15 };
const gamV = (v: number) => 2.2 / (1 + Math.exp(-1.4 * (v - 3.5))) - 1.1;
const gamA = (a: number) => 1.2 * Math.exp(-a / 6) - 0.4;
const sgn = (n: number) => (n < 0 ? `− ${Math.abs(n).toFixed(2)}` : `+ ${n.toFixed(2)}`);

/**
 * One account scored by three interpretable models at once, driven by two
 * sliders. Left: a sparse linear model's two contributions as bars from a
 * zero line (coefficient times value). Middle: a GAM's two shape functions,
 * with the account's point on each. Right: a falling rule list on a card,
 * the line that fires marked. In every figure the account's reading (red) is
 * the computation itself.
 */
export function ReadableModels() {
  const [v, setV] = useState(4);
  const [a, setA] = useState(3);
  const id = "w5-readable";
  const cv = LIN.v * v;
  const ca = LIN.a * a;
  const z = LIN.b + cv + ca;
  const gv = gamV(v);
  const ga = gamA(a);
  const flag = v > 3 && a < 7;
  // linear figure
  const zx = 150;
  const u = 17;
  const bar = (y: number, c: number) => {
    const x0 = c < 0 ? r2(zx + c * u) : zx;
    return <rect x={x0} y={y} width={r2(Math.abs(c) * u)} height={16} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />;
  };
  // GAM figure
  const plot = (y0: number, max: number, f: (t: number) => number, t: number, lo: number, hi: number) => {
    const x0 = 300;
    const x1 = 520;
    const h = 56;
    const xAt = (s: number) => r2(x0 + (s / max) * (x1 - x0));
    const yAt = (q: number) => r2(y0 + h - ((q - lo) / (hi - lo)) * h);
    const pts = Array.from({ length: 61 }, (_, i) => `${xAt((i / 60) * max)} ${yAt(f((i / 60) * max))}`);
    return (
      <g>
        <line x1={x0} y1={y0} x2={x0} y2={y0 + h + 0.5} {...ink} />
        <line x1={x0} y1={yAt(0)} x2={x1} y2={yAt(0)} {...hair} strokeDasharray={CENTRE_DASH} />
        <line x1={x0} y1={y0 + h + 0.5} x2={x1} y2={y0 + h + 0.5} {...ink} />
        <path d={`M${pts.join("L")}`} fill="none" {...ink} />
        <line x1={xAt(t)} y1={yAt(f(t))} x2={xAt(t)} y2={y0 + h} stroke={PAT.signal} strokeWidth={LINE.hair} strokeDasharray="3 2" />
        <circle cx={xAt(t)} cy={yAt(f(t))} r={4} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <Num x={x1} y={y0 + h + 16} anchor="end" size={12}>
          {max}
        </Num>
        <Num x={x0} y={y0 + h + 16} anchor="start" size={12}>
          0
        </Num>
      </g>
    );
  };
  const rows = [
    { text: `IF velocity > 3 per hour`, on: flag },
    { text: `AND account age < 7 days`, on: flag },
    { text: `THEN flag`, on: flag },
    { text: `ELSE pass`, on: !flag },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={240}
        label={`Patent drawing of one account, with transaction velocity ${v} per hour and account age ${a} days, scored by three interpretable models. Sparse linear model: contributions ${sgn(cv)} for velocity and ${sgn(ca)} for account age on an intercept of ${LIN.b}, total ${z.toFixed(2)}. Generalized additive model: the account's point on each shape function, ${sgn(gv)} and ${sgn(ga)}. Falling rule list: ${flag ? "the first rule fires and the account is flagged" : "no rule fires and the account passes"}.`}
      >
        <PatentDefs id={id} />
        {/* sparse linear model */}
        <line x1={zx} y1={64} x2={zx} y2={170} {...ink} />
        <PatentKey x={14} y={60} size={11} anchor="start">
          VELOCITY
        </PatentKey>
        {bar(68, cv)}
        <Num x={r2(zx + Math.max(0, cv) * u + 6)} y={81} anchor="start" size={13}>
          {`${LIN.v} × ${v}`}
        </Num>
        <PatentKey x={14} y={118} size={11} anchor="start">
          ACCOUNT AGE
        </PatentKey>
        {bar(126, ca)}
        <Num x={r2(zx + 6)} y={139} anchor="start" size={13}>
          {`${LIN.a} × ${a}`}
        </Num>
        <Num x={140} y={196} size={15} fill={PAT.signal}>
          {`${LIN.b} ${sgn(cv)} ${sgn(ca)} = ${z.toFixed(2)}`}
        </Num>
        <FigureName x={140} y={230} size={14}>
          sparse linear model
        </FigureName>

        {/* generalized additive model */}
        <PatentKey x={300} y={30} size={11} anchor="start">
          VELOCITY
        </PatentKey>
        {plot(38, 8, gamV, v, -1.3, 1.3)}
        <PatentKey x={300} y={130} size={11} anchor="start">
          ACCOUNT AGE
        </PatentKey>
        {plot(138, 30, gamA, a, -0.6, 1)}
        <FigureName x={410} y={230} size={14}>
          generalized additive model
        </FigureName>

        {/* falling rule list */}
        <ObliqueBox id={id} x={572} y={44} w={206} h={148} dx={8} dy={5} />
        {rows.map((r, i) => (
          <text
            key={i}
            x={590}
            y={78 + i * 30 + (i === 3 ? 6 : 0)}
            fontFamily="var(--font-heading)"
            fontSize={14}
            fill={r.on ? PAT.signal : PAT.ink}
          >
            {r.text}
          </text>
        ))}
        <line x1={586} y1={154} x2={764} y2={154} {...hair} />
        <FigureName x={679} y={230} size={14}>
          falling rule list
        </FigureName>
      </Frame>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Slider label="Transaction velocity" value={v} min={0} max={8} onChange={setV} formatValue={(n) => `${n} / h`} />
        <Slider label="Account age" value={a} min={0} max={30} onChange={setA} formatValue={(n) => `${n} d`} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   06. Black-Box Models
   -------------------------------------------------------------------------- */

/** A binary decision tree `depth` levels deep, root at (cx, y), spread `w` wide. */
function DeepTree({ cx, y, w, h, depth }: { cx: number; y: number; w: number; h: number; depth: number }) {
  const segs: string[] = [];
  const leaves: [number, number][] = [];
  const grow = (x: number, yy: number, half: number, d: number) => {
    if (d === depth) {
      leaves.push([x, yy]);
      return;
    }
    const ny = yy + h / depth;
    segs.push(`M${r2(x)} ${r2(yy)}L${r2(x - half)} ${r2(ny)}M${r2(x)} ${r2(yy)}L${r2(x + half)} ${r2(ny)}`);
    grow(x - half, ny, half / 2, d + 1);
    grow(x + half, ny, half / 2, d + 1);
  };
  grow(cx, y, w / 4, 0);
  return (
    <g>
      <path d={segs.join("")} fill="none" stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinecap="round" />
      <circle cx={cx} cy={y} r={1.4} fill={PAT.ink} />
      {leaves.map(([x, yy], i) => (
        <circle key={i} cx={x} cy={r2(yy + 1)} r={1} fill={PAT.ink} />
      ))}
    </g>
  );
}

/**
 * Two figures. Left: an ensemble as a stand of deep decision trees, rows
 * receding up and to the right, too many to read as one rule list. Right: a
 * model housing whose front is broken away, as when weights are released:
 * inside, a dense lattice of nodes and connections in red, open to view and
 * still unreadable.
 */
export function BlackBoxes() {
  const id = "w5-blackbox";
  const layers = 7;
  const per = 9;
  const nx0 = 438;
  const nx1 = 624;
  const ny0 = 82;
  const ny1 = 222;
  const node = (l: number, k: number) => [r2(nx0 + (l / (layers - 1)) * (nx1 - nx0)), r2(ny0 + (k / (per - 1)) * (ny1 - ny0))] as const;
  const links: string[] = [];
  for (let l = 0; l < layers - 1; l++)
    for (let a = 0; a < per; a++)
      for (let b = 0; b < per; b++) {
        const [x0, y0] = node(l, a);
        const [x1, y1] = node(l + 1, b);
        links.push(`M${x0} ${y0}L${x1} ${y1}`);
      }
  const zig = Array.from({ length: 9 }, (_, i) => `${r2(418 + (i % 2 ? 7 : -3))} ${r2(60 + (i * 186) / 8)}`);
  return (
    <Frame
      width={680}
      height={300}
      label="Patent drawing of two black-box models. Left, an ensemble: a stand of twenty-one deep decision trees, each four levels deep, in receding rows. Right, a model whose weights are released: its housing is broken open to show a dense lattice of seven layers of nodes, every node joined to every node in the next layer, drawn in red, open to view yet unreadable."
    >
      <PatentDefs id={id} />
      {/* the ensemble */}
      {[0, 1, 2].map((row) =>
        Array.from({ length: 7 }, (_, col) => (
          <DeepTree key={`${row}-${col}`} cx={r2(40 + col * 44 + row * 18)} y={r2(170 - row * 50)} w={40} h={36} depth={4} />
        )),
      )}
      <FigureName x={180} y={272} size={14}>
        hundreds of deep trees
      </FigureName>

      {/* the released model, broken open */}
      <ObliqueBox id={id} x={398} y={52} w={250} h={192} dx={16} dy={10} />
      <path
        d={`M${zig[0]}L${zig.slice(1).join("L")}L${zig[8].split(" ")[0]} ${243.5}H${647.5}V${52.5}H${zig[0].split(" ")[0]}Z`}
        fill={PAT.paper}
        stroke="none"
      />
      <path d={`M${zig.join("L")}`} fill="none" {...ink} />
      <path d={`M${398} ${52}H${zig[0].split(" ")[0]}`} fill="none" {...ink} />
      <path d={links.join("")} fill="none" stroke={PAT.signal} strokeWidth={LINE.hair} />
      {Array.from({ length: layers }, (_, l) =>
        Array.from({ length: per }, (_, k) => {
          const [x, y] = node(l, k);
          return <circle key={`${l}-${k}`} cx={x} cy={y} r={2.6} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.hair} />;
        }),
      )}
      <FigureName x={530} y={272} size={14}>
        billions of parameters
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   07. When High-Stakes Decisions Should Use Interpretable Models
   -------------------------------------------------------------------------- */

/** The black box's decision boundary over the applicant plane (both axes 0..1). */
const bbBoundary = (x: number) =>
  0.5 + 0.17 * Math.sin(2 * Math.PI * x * 1.4) + 0.08 * Math.sin(2 * Math.PI * x * 4.7 + 1) + 0.045 * Math.sin(2 * Math.PI * x * 10.3 + 2);
const BB_GRID = Array.from({ length: 1001 }, (_, i) => 0.2 + (i / 1000) * 0.6);
const BB_PEAK = BB_GRID.reduce((m, u) => (bbBoundary(u) > bbBoundary(m) ? u : m), 0.2);
const PIECES = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];
const APPLICANTS = (() => {
  const rnd = seeded(515);
  return Array.from({ length: 160 }, () => ({ x: 0.015 + rnd() * 0.97, y: 0.015 + rnd() * 0.97 }));
})();

/**
 * Applicants scattered over a two-feature plane, split by the black box's
 * wiggly decision boundary. A post-hoc surrogate approximates that boundary
 * with straight pieces. The slider sets how many. Applicants who fall between
 * the two lines are explained wrongly (red). Beside the plane, the surrogate's
 * rule card grows one line per piece: only a card as long as the model itself
 * closes the gap.
 */
export function SurrogateGap() {
  const [step, setStep] = useState(1);
  const id = "w5-surrogate";
  const k = PIECES[step];
  const x0 = 24;
  const x1 = 364;
  const y0 = 24;
  const y1 = 276;
  const X = (u: number) => r2(x0 + u * (x1 - x0));
  const Y = (v: number) => r2(y1 - v * (y1 - y0));
  const sur = (u: number) => {
    const i = Math.min(k - 1, Math.floor(u * k));
    const a = i / k;
    const b = (i + 1) / k;
    return bbBoundary(a) + ((u - a) / (b - a)) * (bbBoundary(b) - bbBoundary(a));
  };
  const N = 200;
  const bb = Array.from({ length: N + 1 }, (_, i) => `${X(i / N)} ${Y(bbBoundary(i / N))}`);
  const sp = Array.from({ length: k + 1 }, (_, i) => `${X(i / k)} ${Y(bbBoundary(i / k))}`);
  const gap = `M${bb.join("L")}L${Array.from({ length: N + 1 }, (_, i) => `${X(1 - i / N)} ${Y(sur(1 - i / N))}`).join("L")}Z`;
  const wrong = APPLICANTS.filter((p) => (p.y - bbBoundary(p.x)) * (p.y - sur(p.x)) < 0);
  const lines = Math.min(k, 32);
  // key each line in place at the black box's highest peak, where the
  // straight pieces always run below it: one key above, one below
  const clear = (u0: number, text: string, below: boolean) => {
    const half = (text.length * 9.6) / 2 / (x1 - x0);
    let top = y1;
    let bottom = y0;
    for (let i = 0; i <= 40; i++) {
      const u = Math.min(1, Math.max(0, u0 - half + (i / 40) * 2 * half));
      top = Math.min(top, Y(sur(u)), Y(bbBoundary(u)));
      bottom = Math.max(bottom, Y(sur(u)), Y(bbBoundary(u)));
    }
    return [X(u0), r2(below ? bottom + 16 : top - 8)];
  };
  const kb = clear(BB_PEAK, "BLACK BOX", false);
  const ke = clear(BB_PEAK, "EXPLANATION", true);
  const keyAt = ([x, y]: number[], text: string) => (
    <g>
      <rect x={r2(x - (text.length * 9.6) / 2)} y={r2(y - 11)} width={r2(text.length * 9.6)} height={15} fill={PAT.paper} />
      <PatentKey x={x} y={y} size={11}>
        {text}
      </PatentKey>
    </g>
  );
  return (
    <div>
      <Frame
        width={560}
        height={312}
        label={`Patent drawing of 160 applicants scattered over a two-feature plane, split by a black box's wiggly decision boundary. A post-hoc surrogate approximates the boundary with ${k} straight ${k === 1 ? "piece" : "pieces"}. The slivers between the two lines are stippled red, and ${wrong.length} applicants fall in them, explained wrongly. Beside the plane, the surrogate's rule card holds ${k} ${k === 1 ? "line" : "lines"}.`}
      >
        <PatentDefs id={id} />
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={PAT.paper} {...ink} />
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
          <path d={gap} fill={stip(id, "signal")} stroke="none" fillRule="evenodd" />
          <path d={`M${bb.join("L")}`} fill="none" {...ink} strokeWidth={LINE.bold} />
          <path d={`M${sp.join("L")}`} fill="none" {...ink} strokeDasharray="6 3" />
        </g>
        {APPLICANTS.map((p, i) => {
          const bad = (p.y - bbBoundary(p.x)) * (p.y - sur(p.x)) < 0;
          return (
            <circle
              key={i}
              cx={X(p.x)}
              cy={Y(p.y)}
              r={bad ? 3.2 : 2.2}
              fill={bad ? PAT.signal : PAT.paper}
              stroke={bad ? PAT.signal : PAT.ink}
              strokeWidth={LINE.hair}
            />
          );
        })}
        {keyAt(kb, "BLACK BOX")}
        {keyAt(ke, "EXPLANATION")}
        <Num x={x0} y={300} anchor="start" size={15} fill={PAT.signal}>
          {`${wrong.length} of ${APPLICANTS.length} applicants explained wrongly`}
        </Num>

        {/* the surrogate's rule card */}
        <ObliqueBox id={id} x={404} y={34} w={120} h={242} dx={8} dy={5} />
        {Array.from({ length: lines }, (_, i) => (
          <line key={i} x1={416} y1={r2(44 + i * 7.2)} x2={r2(500 - (i % 3) * 12)} y2={r2(44 + i * 7.2)} {...hair} />
        ))}
        <Num x={464} y={300} size={15}>
          {`${k} ${k === 1 ? "rule" : "rules"}`}
        </Num>
      </Frame>
      <Slider label="Surrogate pieces" value={step} min={0} max={PIECES.length - 1} onChange={setStep} formatValue={(v) => String(PIECES[v])} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   08. Part 2: Post-Hoc Feature Attribution Methods
   -------------------------------------------------------------------------- */

/**
 * A deployed model, sealed, passes its predictions out along a shaft. An
 * attribution meter is clamped onto the shaft after the model: its face
 * shows four feature bars, and its selector switches scope between GLOBAL
 * and LOCAL.
 */
export function ClampOnMeter() {
  const id = "w5-clamp";
  const sy = 214;
  return (
    <Frame
      width={560}
      height={300}
      label="Patent drawing of a sealed model housing whose predictions leave along a shaft as small slips. An attribution meter is clamped onto the shaft after the model. Its face shows four feature bars of different lengths, and a selector knob on it switches between GLOBAL and LOCAL scope."
    >
      <PatentDefs id={id} />
      {/* the deployed model */}
      <ObliqueBox id={id} x={24} y={150} w={140} h={120} dx={14} dy={9} />
      {/* the shaft */}
      <path d={`M${178} ${sy - 7}H${470}M${178} ${sy + 7}H${470}`} fill="none" {...ink} />
      <ellipse cx={470} cy={sy} rx={3} ry={7} fill={PAT.paper} {...ink} />
      {[0, 1, 2].map((k) => (
        <Chip key={k} id={id} x={482 + k * 4} y={r2(sy + 18 + k * 14)} w={24} d={7} sk={8} />
      ))}
      {/* the clamp around the shaft */}
      <rect x={300} y={sy - 18} width={52} height={42} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
      <rect x={292} y={sy - 26} width={68} height={8} fill={stip(id, "dense")} {...ink} />
      <line x1={326} y1={sy + 24} x2={326} y2={sy + 38} {...ink} strokeWidth={LINE.bold} />
      <rect x={316} y={sy + 38} width={20} height={6} fill={PAT.paper} {...ink} />
      {/* the meter on its stem */}
      <line x1={326} y1={sy - 26} x2={326} y2={150} {...ink} strokeWidth={LINE.bold} />
      <ObliqueBox id={id} x={210} y={30} w={250} h={120} dx={14} dy={9} />
      <rect x={224} y={44} width={148} height={92} fill={PAT.paper} {...hair} />
      {[104, 72, 46, 26].map((w, k) => (
        <g key={k}>
          <line x1={236} y1={r2(56 + k * 20)} x2={236} y2={r2(70 + k * 20)} {...hair} />
          <rect x={236} y={r2(58 + k * 20)} width={w} height={10} fill={stip(id, "light")} {...ink} />
        </g>
      ))}
      {/* the scope selector */}
      <PatentKey x={418} y={64} size={12}>
        GLOBAL
      </PatentKey>
      <circle cx={418} cy={92} r={15} fill={stip(id, "light")} {...ink} />
      <circle cx={418} cy={92} r={9} fill={PAT.paper} {...ink} />
      <line x1={418} y1={92} x2={418} y2={73} {...ink} strokeWidth={LINE.bold} />
      <PatentKey x={418} y={130} size={12}>
        LOCAL
      </PatentKey>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   09. Global Versus Local Explanations
   -------------------------------------------------------------------------- */

const GL_FEATURES = ["UTILIZATION", "INQUIRIES", "INCOME", "TENURE"];
const GL_BASE = 0.18;
const GL_FOCUS = 13;
/** 24 customers: an id, four signed attributions and the default probability they sum to. */
const GL_CUSTOMERS = (() => {
  const rnd = seeded(4082);
  const scale = [0.11, 0.07, 0.06, 0.035];
  const lean = [0.45, 0.35, -0.1, -0.2];
  return Array.from({ length: 24 }, (_, i) => {
    const a =
      i === GL_FOCUS
        ? [0.14, 0.09, 0.04, -0.03]
        : scale.map((s, j) => Math.round((rnd() * 2 - 1 + lean[j]) * s * 100) / 100);
    const p = Math.max(0.02, Math.min(0.95, GL_BASE + a.reduce((x, y) => x + y, 0)));
    return { id: 4069 + i, a, p: Math.round(p * 100) / 100 };
  });
})();
const GL_GLOBAL = GL_FEATURES.map((_, j) => GL_CUSTOMERS.reduce((s, c) => s + Math.abs(c.a[j]), 0) / GL_CUSTOMERS.length);

/**
 * A population of 24 customers on the left. In the middle, the global
 * explanation: each feature's average weight across all of them, as bars
 * running left from the feature names. On the right, the local explanation
 * for the one customer selected (red, ringed): that customer's own signed
 * contributions from the baseline, summing to their default probability.
 * Tapping another customer changes only the local side.
 */
export function GlobalLocal() {
  const [sel, setSel] = useState(GL_FOCUS);
  const id = "w5-globlocal";
  const c = GL_CUSTOMERS[sel];
  const keyX = 466;
  const gx = 400;
  const gScale = 1500;
  const lx = 648;
  const lScale = 560;
  const rowY = (j: number) => 62 + j * 30;
  return (
    <div>
      <Frame
        width={800}
        height={214}
        label={`Patent drawing of 24 customers. Global explanation: average weight of each feature across all customers, ${GL_FEATURES.map((f, j) => `${f.toLowerCase()} ${GL_GLOBAL[j].toFixed(2)}`).join(", ")}. Local explanation for applicant ${c.id}, default probability ${c.p.toFixed(2)} from a baseline of ${GL_BASE}: ${GL_FEATURES.map((f, j) => `${f.toLowerCase()} ${c.a[j] >= 0 ? "+" : "−"}${Math.abs(c.a[j]).toFixed(2)}`).join(", ")}.`}
      >
        <PatentDefs id={id} />
        {/* the population */}
        {GL_CUSTOMERS.map((cu, i) => {
          const row = Math.floor(i / 8);
          const x = r2(28 + (i % 8) * 30 + (row % 2) * 12);
          const y = 82 + row * 48;
          const on = i === sel;
          return (
            <g
              key={cu.id}
              role="button"
              tabIndex={0}
              aria-label={`Applicant ${cu.id}`}
              aria-pressed={on}
              onClick={() => setSel(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(i)}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect x={x - 13} y={y - 42} width={26} height={46} fill="transparent" />
              <Figure id={id} x={x} y={y} s={0.48} coat={on ? "signal" : row === 1 ? "paper" : "light"} stroke={on ? PAT.signal : PAT.ink} />
              {on ? <circle cx={x} cy={y - 19} r={22} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} /> : null}
            </g>
          );
        })}
        <FigureName x={145} y={200} size={14}>
          population of customers
        </FigureName>

        {/* feature names, shared */}
        {GL_FEATURES.map((f, j) => (
          <PatentKey key={f} x={keyX} y={rowY(j) + 4} size={11}>
            {f}
          </PatentKey>
        ))}
        {/* global: average weight, running left */}
        <line x1={gx + 0.5} y1={44} x2={gx + 0.5} y2={rowY(3) + 16} {...ink} />
        {GL_GLOBAL.map((g, j) => (
          <rect key={j} x={r2(gx - g * gScale)} y={rowY(j) - 7} width={r2(g * gScale)} height={14} fill={stip(id, "light")} {...ink} />
        ))}
        <FigureName x={340} y={200} size={14}>
          global explanation
        </FigureName>

        {/* local: this customer's signed contributions */}
        <Num x={lx} y={32} size={15} fill={PAT.signal}>
          {`Applicant ${c.id} | ${c.p.toFixed(2)}`}
        </Num>
        <line x1={lx + 0.5} y1={44} x2={lx + 0.5} y2={rowY(3) + 16} {...ink} />
        {c.a.map((v, j) => (
          <rect
            key={j}
            x={r2(v < 0 ? lx + v * lScale : lx)}
            y={rowY(j) - 7}
            width={r2(Math.abs(v) * lScale)}
            height={14}
            fill={stip(id, "signal")}
            stroke={PAT.signal}
            strokeWidth={LINE.outline}
          />
        ))}
        {c.a.map((v, j) => (
          <Num key={j} x={r2(v >= 0 ? lx + v * lScale + 6 : lx + 6)} y={rowY(j) + 5} anchor="start" size={12}>
            {`${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}`}
          </Num>
        ))}
        <FigureName x={lx} y={200} size={14}>
          local explanation
        </FigureName>
      </Frame>
      <Segmented
        label="Explain applicant"
        options={[GL_FOCUS, 2, 9, 20].map((i) => ({ id: String(i), label: String(GL_CUSTOMERS[i].id) }))}
        value={String(sel)}
        onChange={(v) => setSel(Number(v))}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   10. Permutation Feature Importance and Partial Dependence
   -------------------------------------------------------------------------- */

type ShuffleCol = "none" | "income" | "util";
const SH_COLS: { id: Exclude<ShuffleCol, "none">; key: string }[] = [
  { id: "income", key: "INCOME" },
  { id: "util", key: "UTILIZATION" },
];
const SH_ERROR: Record<ShuffleCol, number> = { none: 0.12, income: 0.18, util: 0.29 };
/** Eight holdout customers: two feature values (0..1) and whether they defaulted. */
const SH_ROWS = [
  { v: [0.82, 0.18], d: false },
  { v: [0.35, 0.88], d: true },
  { v: [0.6, 0.3], d: false },
  { v: [0.22, 0.95], d: true },
  { v: [0.9, 0.12], d: false },
  { v: [0.45, 0.7], d: true },
  { v: [0.7, 0.4], d: false },
  { v: [0.28, 0.62], d: false },
];
const SH_PERM = [5, 3, 7, 0, 6, 1, 4, 2];

/**
 * A holdout table: eight customers, two feature columns drawn as value bars
 * and an outcome column (filled = defaulted). Choosing a feature shuffles its
 * column across the rows (red), breaking its link to the outcome. The gauge
 * beside the table shows how far the model's holdout error rises.
 */
export function ShuffleColumn() {
  const [col, setCol] = useState<ShuffleCol>("util");
  const id = "w5-shuffle";
  const cx0 = 18;
  const cw = 124;
  const top = 50;
  const rh = 19;
  const err = SH_ERROR[col];
  const needle = (e: number) => -60 + (e / 0.4) * 120;
  const da = ((needle(err) - 90) * Math.PI) / 180;
  const db = ((needle(SH_ERROR.none) - 90) * Math.PI) / 180;
  const gx = 418;
  const gy = 132;
  const gr = 46;
  return (
    <div>
      <Frame
        width={488}
        height={226}
        label={`Patent drawing of a holdout table of eight customers with income and utilization columns and a default outcome column. ${col === "none" ? "No column is shuffled" : `The ${SH_COLS.find((c) => c.id === col)?.key.toLowerCase()} column is shuffled across rows, in red`}. A gauge beside the table reads the model's holdout error: ${err.toFixed(2)}, against ${SH_ERROR.none.toFixed(2)} unshuffled.`}
      >
        <PatentDefs id={id} />
        {/* table frame */}
        <rect x={cx0} y={top - 30} width={cw * 2 + 90} height={30 + rh * 8 + 6} fill={PAT.paper} {...ink} />
        <line x1={cx0} y1={top - 4} x2={cx0 + cw * 2 + 90} y2={top - 4} {...ink} />
        {[1, 2].map((k) => (
          <line key={k} x1={cx0 + cw * k} y1={top - 30} x2={cx0 + cw * k} y2={top + rh * 8 + 2} {...hair} />
        ))}
        {SH_COLS.map((c, j) => (
          <PatentKey key={c.id} x={cx0 + cw * j + cw / 2} y={top - 13} size={11} fill={c.id === col ? PAT.signal : PAT.ink}>
            {c.key}
          </PatentKey>
        ))}
        <PatentKey x={cx0 + cw * 2 + 45} y={top - 13} size={11}>
          OUTCOME
        </PatentKey>
        {SH_ROWS.map((r, i) => (
          <g key={i}>
            {SH_COLS.map((c, j) => {
              const shuffled = c.id === col;
              const v = shuffled ? SH_ROWS[SH_PERM[i]].v[j] : r.v[j];
              return (
                <rect
                  key={c.id}
                  x={cx0 + cw * j + 12}
                  y={r2(top + i * rh + 3)}
                  width={r2(v * (cw - 24))}
                  height={9}
                  fill={stip(id, shuffled ? "signal" : "light")}
                  stroke={shuffled ? PAT.signal : PAT.ink}
                  strokeWidth={LINE.hair}
                />
              );
            })}
            <circle cx={cx0 + cw * 2 + 45} cy={r2(top + i * rh + 7.5)} r={4.5} fill={r.d ? PAT.ink : PAT.paper} {...ink} />
          </g>
        ))}

        {/* holdout error gauge */}
        <path d={`M${r2(gx + Math.cos(((-150) * Math.PI) / 180) * gr)} ${r2(gy + Math.sin(((-150) * Math.PI) / 180) * gr)}A${gr} ${gr} 0 0 1 ${r2(gx + Math.cos(((-30) * Math.PI) / 180) * gr)} ${r2(gy + Math.sin(((-30) * Math.PI) / 180) * gr)}`} fill="none" {...ink} />
        {[0, 0.1, 0.2, 0.3, 0.4].map((e) => {
          const a = ((needle(e) - 90) * Math.PI) / 180;
          return (
            <g key={e}>
              <line x1={r2(gx + Math.cos(a) * (gr - 6))} y1={r2(gy + Math.sin(a) * (gr - 6))} x2={r2(gx + Math.cos(a) * gr)} y2={r2(gy + Math.sin(a) * gr)} {...hair} />
            </g>
          );
        })}
        <line x1={gx} y1={gy} x2={r2(gx + Math.cos(db) * (gr - 10))} y2={r2(gy + Math.sin(db) * (gr - 10))} {...hair} strokeDasharray="3 2" />
        <line x1={gx} y1={gy} x2={r2(gx + Math.cos(da) * (gr - 4))} y2={r2(gy + Math.sin(da) * (gr - 4))} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
        <circle cx={gx} cy={gy} r={3} fill={PAT.ink} />
        <Num x={gx} y={gy + 28} size={22}>
          {err.toFixed(2)}
        </Num>
        <Num x={gx} y={gy + 50} size={14} fill={PAT.signal}>
          {col === "none" ? "" : `+${(err - SH_ERROR.none).toFixed(2)}`}
        </Num>
        <FigureName x={gx} y={62} size={14}>
          holdout error
        </FigureName>
      </Frame>
      <Segmented
        label="Shuffle"
        options={[
          { id: "none", label: "None" },
          { id: "income", label: "Income" },
          { id: "util", label: "Utilization" },
        ]}
        value={col}
        onChange={setCol}
      />
    </div>
  );
}

/** Sixteen customers' ICE curves over income (0..1): half fall, half rise, through an interaction. */
const ICE = (() => {
  const rnd = seeded(77);
  return Array.from({ length: 16 }, (_, i) => {
    const up = i % 2 === 1;
    const level = 0.32 + rnd() * 0.32;
    const slope = (up ? 1 : -1) * (0.2 + rnd() * 0.16);
    const bend = 0.06 * (rnd() - 0.5);
    return { up, f: (u: number) => level + slope * (u - 0.5) + bend * Math.sin(u * Math.PI * 2) };
  });
})();

/**
 * A partial dependence plot of predicted default against income: the average
 * curve (bold) is nearly flat. Switching on the ICE curves draws one thin
 * curve per customer underneath it: half rise and half fall (the falling
 * half in red), an effect the average hides.
 */
export function IceCurves() {
  const [view, setView] = useState<"pdp" | "ice">("pdp");
  const id = "w5-ice";
  const x0 = 62;
  const x1 = 456;
  const y0 = 18;
  const y1 = 188;
  const X = (u: number) => r2(x0 + u * (x1 - x0));
  const Y = (v: number) => r2(y1 - v * (y1 - y0));
  const path = (f: (u: number) => number) => `M${Array.from({ length: 41 }, (_, i) => `${X(i / 40)} ${Y(f(i / 40))}`).join("L")}`;
  const pdp = (u: number) => ICE.reduce((s, c) => s + c.f(u), 0) / ICE.length;
  return (
    <div>
      <Frame
        width={488}
        height={226}
        label={`Patent drawing of a partial dependence plot of predicted default against income: the average curve is nearly flat${view === "ice" ? ". Sixteen individual conditional expectation curves are drawn beneath it, one per customer: eight rise with income and eight fall, the falling ones in red" : ""}.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={y0} x2={x0} y2={y1 + 0.5} {...ink} />
        <line x1={x0} y1={y1 + 0.5} x2={x1} y2={y1 + 0.5} {...ink} />
        <PatentKey x={x1} y={y1 + 28} size={11} anchor="end">
          INCOME
        </PatentKey>
        <PatentKey x={x0 + 8} y={y0 + 4} size={11} anchor="start">
          PREDICTED DEFAULT
        </PatentKey>
        {view === "ice"
          ? ICE.map((c, i) => (
              <path key={i} d={path(c.f)} fill="none" stroke={c.up ? PAT.ink : PAT.signal} strokeWidth={LINE.hair} />
            ))
          : null}
        <path d={path(pdp)} fill="none" {...ink} strokeWidth={LINE.bold} />
        {[0, 0.5, 1].map((v) => (
          <Num key={v} x={x0 - 8} y={Y(v) + 4} anchor="end" size={12}>
            {v === 0 ? "0" : v.toFixed(1)}
          </Num>
        ))}
      </Frame>
      <Segmented
        label="Show"
        options={[
          { id: "pdp", label: "Partial dependence" },
          { id: "ice", label: "With ICE curves" },
        ]}
        value={view}
        onChange={setView}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   11. Local Surrogates and Game-Theoretic Attributions: LIME and SHAP
   -------------------------------------------------------------------------- */

/** The black box's curved boundary over the plane (0..1 each way): above it, denied. */
const limeBoundary = (u: number) => 0.3 + 0.5 * u * u + 0.08 * Math.sin(u * 9);
const LIME_ME = { x: 0.52, y: 0.43 };
const LIME_PTS = (() => {
  const rnd = seeded(2016);
  return Array.from({ length: 46 }, () => {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * 0.26;
    return { x: LIME_ME.x + Math.cos(a) * d, y: LIME_ME.y + Math.sin(a) * d * 1.1, d };
  });
})();

/**
 * LIME around one customer. The black box splits the plane along a curve
 * (the denied side stippled). Around the customer (the cross), perturbed
 * profiles are scattered. Each is answered by the black box (filled = denied)
 * and weighted by closeness (larger = heavier). A straight local line fitted
 * to those answers (red) stands in for the curve near the customer only.
 */
export function LimeFit() {
  const id = "w5-lime";
  const x0 = 20;
  const x1 = 420;
  const y0 = 16;
  const y1 = 236;
  const X = (u: number) => r2(x0 + u * (x1 - x0));
  const Y = (v: number) => r2(y1 - v * (y1 - y0));
  const curve = Array.from({ length: 81 }, (_, i) => `${X(i / 80)} ${Y(Math.min(1, limeBoundary(i / 80)))}`);
  // tangent of the boundary at the customer's x, shifted through the boundary point
  const h = 0.001;
  const slope = (limeBoundary(LIME_ME.x + h) - limeBoundary(LIME_ME.x - h)) / (2 * h);
  const b0 = limeBoundary(LIME_ME.x);
  const line = (u: number) => b0 + slope * (u - LIME_ME.x);
  const ua = LIME_ME.x - 0.3;
  const ub = LIME_ME.x + 0.3;
  return (
    <Frame
      width={440}
      height={252}
      label="Patent drawing of LIME around one customer. A black-box model divides a two-feature plane along a curved boundary, the denied side stippled. Around the customer, marked by a cross, 46 perturbed profiles are scattered inside a dashed neighbourhood. Each is filled if the black box denies it, and drawn larger the closer it lies. A straight local line, in red, is fitted to them and follows the curve only near the customer."
    >
      <PatentDefs id={id} />
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <path d={`M${curve.join("L")}L${x1} ${y0}L${x0} ${y0}Z`} fill={stip(id, "light")} stroke="none" />
        <path d={`M${curve.join("L")}`} fill="none" {...ink} strokeWidth={LINE.bold} />
      </g>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" {...ink} />
      <ellipse cx={X(LIME_ME.x)} cy={Y(LIME_ME.y)} rx={r2(0.27 * (x1 - x0))} ry={r2(0.3 * (y1 - y0))} fill="none" {...hair} strokeDasharray="5 3" />
      {LIME_PTS.map((p, i) => {
        const denied = p.y > limeBoundary(p.x);
        return (
          <circle
            key={i}
            cx={X(p.x)}
            cy={Y(p.y)}
            r={r2(4.2 - p.d * 9)}
            fill={denied ? PAT.ink : PAT.paper}
            stroke={PAT.ink}
            strokeWidth={LINE.hair}
          />
        );
      })}
      <line x1={X(ua)} y1={Y(line(ua))} x2={X(ub)} y2={Y(line(ub))} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <path d={cross(X(LIME_ME.x), Y(LIME_ME.y), 6)} stroke={PAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
      <circle cx={X(LIME_ME.x)} cy={Y(LIME_ME.y)} r={11} fill="none" {...ink} />
    </Frame>
  );
}

type Player = "I" | "U" | "N";
const PLAYERS: { id: Player; key: string; tone: "light" | "dense" | "paper" }[] = [
  { id: "I", key: "INQUIRIES", tone: "dense" },
  { id: "U", key: "UTILIZATION", tone: "light" },
  { id: "N", key: "INCOME", tone: "paper" },
];
/** The model's prediction when only the features in the coalition are known (the rest at baseline). */
const COALITION: Record<string, number> = { "": 0.18, I: 0.26, U: 0.22, N: 0.24, IU: 0.3, IN: 0.36, NU: 0.27, INU: 0.42 };
const coal = (s: Player[]) => COALITION[[...s].sort().join("")];
const ORDERS: Player[][] = [
  ["I", "U", "N"],
  ["I", "N", "U"],
  ["U", "I", "N"],
  ["U", "N", "I"],
  ["N", "I", "U"],
  ["N", "U", "I"],
];
const marginals = (order: Player[]) => {
  const out = {} as Record<Player, number>;
  order.forEach((p, i) => (out[p] = coal(order.slice(0, i + 1)) - coal(order.slice(0, i))));
  return out;
};
const SHAPLEY = (() => {
  const sum = { I: 0, U: 0, N: 0 } as Record<Player, number>;
  for (const o of ORDERS) {
    const m = marginals(o);
    for (const p of o) sum[p] += m[p] / ORDERS.length;
  }
  return sum;
})();

/**
 * One applicant's prediction (0.42) built up from the baseline mean (0.18) as
 * three features join the coalition. Left: the stack for one joining order,
 * chosen below. Each feature's block is its marginal contribution in that
 * order, and the same feature adds different amounts in different orders.
 * Right: the Shapley stack, each block the average over all six orders.
 * Both stacks always reach the prediction line (red): local accuracy.
 */
export function ShapleyOrders() {
  const [k, setK] = useState(0);
  const id = "w5-shap";
  const order = ORDERS[k];
  const m = marginals(order);
  const Y = (v: number) => r2(190 - (v - 0.18) * 620);
  const stack = (x: number, seq: Player[], vals: Record<Player, number>) => {
    let acc = 0.18;
    return seq.map((p) => {
      const from = acc;
      acc += vals[p];
      const pl = PLAYERS.find((q) => q.id === p)!;
      const top = Y(acc);
      const bot = Y(from);
      return (
        <g key={p}>
          <rect x={x} y={top} width={70} height={r2(bot - top)} fill={pl.tone === "paper" ? PAT.paper : stip(id, pl.tone)} {...ink} />
          <PatentKey x={x + 124} y={r2((top + bot) / 2 + 4)} size={11.5} anchor="start">
            {pl.key}
          </PatentKey>
          <Num x={x + 76} y={r2((top + bot) / 2 + 4)} anchor="start" size={13}>
            {`+${vals[p].toFixed(3).replace(/0$/, "")}`}
          </Num>
        </g>
      );
    });
  };
  return (
    <div>
      <Frame
        width={600}
        height={232}
        label={`Patent drawing of one applicant's prediction built up from a baseline of 0.18 to 0.42. For the joining order ${order.map((p) => PLAYERS.find((q) => q.id === p)!.key.toLowerCase()).join(", then ")}, the marginal contributions are ${order.map((p) => `${PLAYERS.find((q) => q.id === p)!.key.toLowerCase()} +${m[p].toFixed(2)}`).join(", ")}. The Shapley values, averaged over all six orders, are ${PLAYERS.map((q) => `${q.key.toLowerCase()} +${SHAPLEY[q.id].toFixed(3)}`).join(", ")}. Both stacks reach the prediction line, in red.`}
      >
        <PatentDefs id={id} />
        {/* baseline and prediction */}
        <line x1={24} y1={Y(0.18)} x2={590} y2={Y(0.18)} {...hair} strokeDasharray={CENTRE_DASH} />
        <Num x={590} y={Y(0.18) + 17} anchor="end" size={13}>
          baseline 0.18
        </Num>
        <line x1={24} y1={Y(0.42)} x2={590} y2={Y(0.42)} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <Num x={590} y={Y(0.42) - 7} anchor="end" size={13} fill={PAT.signal}>
          prediction 0.42
        </Num>
        {stack(90, order, m)}
        {stack(344, ["I", "U", "N"], SHAPLEY)}
        <FigureName x={125} y={222} size={14}>
          one joining order
        </FigureName>
        <FigureName x={379} y={222} size={14}>
          Shapley values
        </FigureName>
      </Frame>
      <div className="mt-2.5 px-1">
        <PlateButton onClick={() => setK((v) => (v + 1) % ORDERS.length)}>Try another joining order</PlateButton>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   12. Limitations and Vulnerabilities of Post-Hoc Attributions
   -------------------------------------------------------------------------- */

/** Four reruns of the same explanation: each feature's attribution under a new random seed. */
const RERUNS = [
  { seed: 1, v: [0.31, 0.22, 0.12] },
  { seed: 2, v: [0.2, 0.29, 0.14] },
  { seed: 3, v: [0.18, 0.17, 0.27] },
  { seed: 4, v: [0.29, 0.25, 0.1] },
];
const RERUN_KEYS = ["UTILIZATION", "INQUIRIES", "INCOME"];
const AGE_HISTORY = (() => {
  const rnd = seeded(19);
  return Array.from({ length: 48 }, () => {
    const age = 19 + rnd() * 50;
    return { age, hist: Math.max(0, (age - 19) * (0.3 + rnd() * 0.6)) };
  });
})();

/** A model housing, (x, y) its front face's top-left. Red for the biased one. */
function Box({ id, x, y, w, h, red = false }: { id: string; x: number; y: number; w: number; h: number; red?: boolean }) {
  return <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={8} dy={5} stroke={red ? PAT.signal : PAT.ink} side={red ? stip(id, "signal") : undefined} />;
}

/**
 * One strip per limitation. Causal: inside the model a proxy's attribution
 * bar runs long (red), while in the real world moving house leaves the
 * default-risk dial where it was. Instability: one customer's three
 * attributions, rerun with a new seed. The top driver (red) changes.
 * Correlated features: age against credit history, where real customers fill
 * a wedge and the off-manifold pairing (nineteen, twenty years) sits outside
 * it (red). Scaffolding: a detector routes synthetic perturbations to a fair
 * model and real profiles to a biased one (red).
 */
export function FourLimits({ kind }: { kind: "causal" | "instability" | "correlated" | "scaffolding" }) {
  const [run, setRun] = useState(0);
  const id = `w5-limit-${kind}`;
  if (kind === "causal") {
    return (
      <Frame
        width={560}
        height={160}
        label="Patent drawing of two figures. Inside the model: a long attribution bar, in red, for the postal code feature, above a short one for income. In the real world: a house with an arrow to a second house, each with a default-risk dial beneath it. The needle reads the same after the move."
      >
        <PatentDefs id={id} />
        <rect x={10} y={12} width={256} height={124} fill={PAT.paper} {...hair} strokeDasharray="5 3" />
        <PatentKey x={26} y={42} size={12} anchor="start">
          POSTAL CODE
        </PatentKey>
        <rect x={26} y={50} width={214} height={16} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <PatentKey x={26} y={94} size={12} anchor="start">
          INCOME
        </PatentKey>
        <rect x={26} y={102} width={70} height={16} fill={stip(id, "light")} {...ink} />
        <FigureName x={138} y={154} size={14}>
          inside the model
        </FigureName>
        {/* the real world: moving house leaves the risk dial where it was */}
        <House id={id} x={318} y={74} w={40} h={28} dx={9} dy={6} roof={16} />
        <path d="M368 34Q406 10 444 34" fill="none" {...ink} />
        <path d={headAlongPath(444, 34, 1, 1.1, 8)} fill="none" {...ink} />
        <House id={id} x={456} y={74} w={40} h={28} dx={9} dy={6} roof={16} />
        <Dial cx={338} cy={112} r={20} deg={-25} />
        <Dial cx={476} cy={112} r={20} deg={-25} />
        <FigureName x={420} y={154} size={14}>
          in the real world
        </FigureName>
      </Frame>
    );
  }
  if (kind === "instability") {
    const r = RERUNS[run];
    const top = r.v.indexOf(Math.max(...r.v));
    return (
      <div>
        <Frame
          width={560}
          height={150}
          label={`Patent drawing of one customer's three feature attributions, rerun with random seed ${r.seed}: ${RERUN_KEYS.map((k, j) => `${k.toLowerCase()} ${r.v[j].toFixed(2)}`).join(", ")}. The top driver, in red, is ${RERUN_KEYS[top].toLowerCase()}.`}
        >
          <PatentDefs id={id} />
          <Num x={546} y={30} anchor="end" size={16}>
            {`seed ${r.seed}`}
          </Num>
          <line x1={150.5} y1={14} x2={150.5} y2={136} {...ink} />
          {RERUN_KEYS.map((k, j) => (
            <g key={k}>
              <PatentKey x={140} y={r2(36 + j * 42)} size={12} anchor="end" fill={j === top ? PAT.signal : PAT.ink}>
                {k}
              </PatentKey>
              <rect
                x={151}
                y={r2(24 + j * 42)}
                width={r2(r.v[j] * 1000)}
                height={16}
                fill={stip(id, j === top ? "signal" : "light")}
                stroke={j === top ? PAT.signal : PAT.ink}
                strokeWidth={LINE.outline}
              />
            </g>
          ))}
        </Frame>
        <div className="mt-1.5 px-1">
          <PlateButton onClick={() => setRun((v) => (v + 1) % RERUNS.length)}>Rerun with a new seed</PlateButton>
        </div>
      </div>
    );
  }
  if (kind === "correlated") {
    const X = (age: number) => r2(60 + ((age - 18) / 52) * 480);
    const Y = (hist: number) => r2(130 - (hist / 40) * 116);
    return (
      <Frame
        width={560}
        height={158}
        label="Patent drawing of a scatter of age against length of credit history: 48 customers fill a wedge, since history cannot exceed the years since adulthood. A red point far outside the wedge pairs an age of nineteen with a twenty-year credit history."
      >
        <PatentDefs id={id} />
        <path d={`M${X(19)} ${Y(0)}L${X(70)} ${Y(0)}L${X(70)} ${Y(40)}L${X(63.4)} ${Y(40)}Z`} fill={stip(id, "light")} stroke="none" />
        <line x1={60} y1={10} x2={60} y2={130.5} {...ink} />
        <line x1={60} y1={130.5} x2={546} y2={130.5} {...ink} />
        {AGE_HISTORY.map((p, i) => (
          <circle key={i} cx={X(p.age)} cy={Y(p.hist)} r={3} fill={PAT.paper} {...ink} strokeWidth={LINE.hair} />
        ))}
        <circle cx={X(19)} cy={Y(20)} r={5.5} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.bold} />
        <Num x={X(19) + 12} y={Y(20) + 5} anchor="start" size={14} fill={PAT.signal}>
          age 19, 20-year history
        </Num>
        <PatentKey x={546} y={154} size={12} anchor="end">
          AGE
        </PatentKey>
        <PatentKey x={68} y={22} size={12} anchor="start">
          CREDIT HISTORY
        </PatentKey>
        {[20, 40, 60].map((a) => (
          <Num key={a} x={X(a)} y={150} size={12}>
            {a}
          </Num>
        ))}
      </Frame>
    );
  }
  // adversarial scaffolding
  const synth = [
    [40, 34],
    [62, 22],
    [52, 48],
    [80, 40],
    [30, 56],
    [86, 20],
  ];
  return (
    <Frame
      width={560}
      height={162}
      label="Patent drawing of adversarial scaffolding. A detector valve at the centre receives two inputs: a scatter of synthetic perturbation points, which it routes to a fair model, and a real customer's profile card, which it routes to a biased model drawn in red."
    >
      <PatentDefs id={id} />
      {/* synthetic perturbations */}
      {synth.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill={PAT.paper} {...ink} strokeWidth={LINE.hair} />
      ))}
      <path d="M100 36H220L246 72" fill="none" {...hair} />
      {/* a real profile */}
      <rect x={34} y={96} width={52} height={60} fill={PAT.paper} {...ink} />
      <circle cx={60} cy={114} r={8} fill={PAT.paper} {...hair} />
      <line x1={44} y1={134} x2={76} y2={134} {...hair} />
      <line x1={44} y1={144} x2={68} y2={144} {...hair} />
      <path d="M100 126H220L246 96" fill="none" {...hair} />
      {/* the detector */}
      <path d="M260 60L284 84L260 108L236 84Z" fill={stip(id, "light")} {...ink} />
      <path d="M284 84L318 38H388" fill="none" {...hair} />
      <path d={headAlongPath(388, 38, 1, 0, 8)} fill="none" {...hair} />
      <path d="M284 84L318 130H388" fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} />
      <path d={headAlongPath(388, 130, 1, 0, 8)} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} />
      <Box id={id} x={394} y={14} w={130} h={48} />
      <PatentKey x={459} y={43} size={12}>
        FAIR
      </PatentKey>
      <Box id={id} x={394} y={106} w={130} h={48} red />
      <PatentKey x={459} y={135} size={12} fill={PAT.signal}>
        BIASED
      </PatentKey>
      <FigureName x={156} y={26} size={14}>
        synthetic
      </FigureName>
      <FigureName x={156} y={148} size={14}>
        real
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   13. Discussion: The Disputed Credit Denial
   -------------------------------------------------------------------------- */

/**
 * The bank's portal page as a sheet: a DECLINED stamp, then the top three
 * negative SHAP values as bars running left from a zero line, each with its
 * feature name as printed on the page. The postal-code bar is red.
 */
export function PortalLetter() {
  const id = "w5-portal";
  const zx = 352;
  const rows = [
    { text: "Number of recent credit inquiries", v: 0.11 },
    { text: "Postal code commercial density", v: 0.08, red: true },
    { text: "Average monthly balance volatility", v: 0.06 },
  ];
  return (
    <Frame
      width={400}
      height={318}
      label="Patent drawing of the bank's customer portal page for a working-capital application, stamped DECLINED. It lists the top three negative SHAP values as bars running left from a zero line: number of recent credit inquiries, the longest. Postal code commercial density, in red. And average monthly balance volatility."
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={14} y={22} w={362} h={286} dx={10} dy={6} />
      {/* header */}
      <line x1={32} y1={54} x2={190} y2={54} {...ink} strokeWidth={LINE.bold} />
      <line x1={32} y1={68} x2={150} y2={68} {...hair} />
      <g transform="rotate(-6 302 62)">
        <rect x={244} y={46} width={118} height={30} fill="none" {...ink} strokeWidth={LINE.bold} />
        <PatentKey x={303} y={66} size={14}>
          DECLINED
        </PatentKey>
      </g>
      <line x1={32} y1={98} x2={360} y2={98} {...hair} />
      {/* the three reasons */}
      <line x1={zx + 0.5} y1={112} x2={zx + 0.5} y2={290} {...ink} />
      {rows.map((r, i) => {
        const y = 134 + i * 56;
        const w = r2(r.v * 1500);
        const c = r.red ? PAT.signal : PAT.ink;
        return (
          <g key={r.text}>
            <text x={32} y={y} fontFamily="var(--font-heading)" fontSize={16} fill={c}>
              {r.text}
            </text>
            <rect x={r2(zx - w)} y={y + 10} width={w} height={18} fill={stip(id, r.red ? "signal" : "light")} stroke={c} strokeWidth={LINE.outline} />
            <Num x={r2(zx - w - 8)} y={y + 24} anchor="end" size={15} fill={c}>
              {`−${r.v.toFixed(2)}`}
            </Num>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   14. Part 3: Counterfactual Explanations and Actionable Recourse
   -------------------------------------------------------------------------- */

/**
 * A field in oblique plan, split by a fence: the decision boundary between
 * DENIED and APPROVED ground. The applicant stands on the denied side reading
 * a card of feature weights, which says nothing of where to walk. The
 * shortest way across the fence is paced out in red, ending at a flag.
 */
export function BoundaryFence() {
  const id = "w5-fence";
  // ground: front-left (20, 270), depth up-right
  const g = { x: 20, y: 262, w: 470, d: 190, sk: 60 };
  // the fence runs from the front edge to the back edge
  const f0 = [300, 262];
  const f1 = [250, 72];
  const at = (t: number) => [r2(f0[0] + (f1[0] - f0[0]) * t), r2(f0[1] + (f1[1] - f0[1]) * t)];
  const posts = Array.from({ length: 8 }, (_, i) => at(0.03 + i * (0.94 / 7)));
  const me = [128, 236];
  const xing = at(0.2);
  const goal = [r2(xing[0] + 60), r2(xing[1] - 2)];
  return (
    <Frame
      width={560}
      height={300}
      label="Patent drawing of a field in oblique plan, divided by a fence, the decision boundary, into denied ground on the left and approved ground on the right. The applicant stands on the denied side holding a card of feature weights. A red line of paces marks the shortest way across the fence, ending at a red flag on the approved side."
    >
      <PatentDefs id={id} />
      <Sheet id={id} x={g.x} y={g.y} w={g.w} d={g.d} sk={g.sk} t={5} />
      {/* denied ground stippled */}
      <path d={`M${g.x} ${g.y}L${r2(g.x + g.sk)} ${r2(g.y - g.d)}H${f1[0]}L${f0[0]} ${f0[1]}Z`} fill={stip(id, "light")} stroke="none" />
      {/* fence: rails and posts */}
      {[8, 20].map((h) => {
        const [ax, ay] = at(0.03);
        const [bx, by] = at(0.97);
        return <line key={h} x1={ax} y1={r2(ay - h)} x2={bx} y2={r2(by - h)} {...ink} />;
      })}
      {posts.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={x} y2={r2(y - 26)} {...ink} strokeWidth={LINE.bold} />
      ))}
      <PatentKey x={150} y={108} size={13}>
        DENIED
      </PatentKey>
      <PatentKey x={400} y={128} size={13}>
        APPROVED
      </PatentKey>
      {/* the applicant with a card of weights */}
      <Figure id={id} x={me[0]} y={me[1]} s={0.9} arm="reach" coat="paper" />
      <rect x={me[0] + 22} y={me[1] - 66} width={34} height={42} fill={PAT.paper} {...ink} />
      {[20, 12, 26, 8].map((w, k) => (
        <rect key={k} x={me[0] + 26} y={me[1] - 61 + k * 9} width={w} height={5} fill={stip(id, "dense")} {...hair} />
      ))}
      {/* paces to the nearest point across */}
      <path
        d={`M${me[0] + 14} ${me[1]}L${xing[0]} ${xing[1]}L${goal[0]} ${goal[1]}`}
        fill="none"
        stroke={PAT.signal}
        strokeWidth={LINE.outline}
        strokeDasharray="5 4"
      />
      <Flag id={id} x={goal[0]} y={goal[1]} red />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   15. Counterfactual Explanations: What Would Have Changed the Decision
   -------------------------------------------------------------------------- */

const CF_ME = { inc: 52, util: 42 };
/** The model's boundary: approved when utilization is at or below this line (income in thousands). */
const cfLine = (inc: number) => 30 + 3 * (inc - 52);
const cfApproved = (inc: number, util: number) => util <= cfLine(inc) + 1e-9;

/**
 * The applicant on the model's decision plane: annual income across,
 * credit card utilization up. The denied side of the boundary is stippled.
 * The two sliders move the applicant's profile. The ring stays at the
 * original. Two counterfactuals sit on the boundary: income 4,000 dollars
 * higher, or utilization down to 30 percent. The stamp shows the decision at
 * the moved profile, read off the model's own rule.
 */
export function CounterfactualPlane() {
  const [inc, setInc] = useState(CF_ME.inc);
  const [util, setUtil] = useState(CF_ME.util);
  const id = "w5-cf";
  const x0 = 56;
  const x1 = 340;
  const y0 = 24;
  const y1 = 270;
  const X = (v: number) => r2(x0 + ((v - 40) / 30) * (x1 - x0));
  const Y = (u: number) => r2(y1 - ((u - 10) / 60) * (y1 - y0));
  const ok = cfApproved(inc, util);
  // boundary across the plot
  const b0 = [Math.max(40, (10 - 30) / 3 + 52), 10];
  const b1 = [Math.min(70, (70 - 30) / 3 + 52), 70];
  const dInc = inc - CF_ME.inc;
  const dUtil = util - CF_ME.util;
  return (
    <div>
      <Frame
        width={500}
        height={318}
        label={`Patent drawing of a decision plane with annual income from 40,000 to 70,000 dollars across and credit card utilization from 10 to 70 percent up. The denied side of the model's boundary is stippled. The applicant's original profile, 52,000 dollars and 42 percent, is ringed. Two counterfactuals sit on the boundary: 56,000 dollars at 42 percent, and 52,000 dollars at 30 percent. The profile now shown is ${inc},000 dollars and ${util} percent: ${ok ? "approved" : "denied"}.`}
      >
        <PatentDefs id={id} />
        <path d={`M${X(b0[0])} ${Y(b0[1])}L${X(b1[0])} ${Y(b1[1])}L${X(40)} ${Y(70)}L${X(40)} ${Y(10)}Z`} fill={stip(id, "light")} stroke="none" />
        <line x1={X(b0[0])} y1={Y(b0[1])} x2={X(b1[0])} y2={Y(b1[1])} {...ink} strokeWidth={LINE.bold} />
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" {...ink} />
        {[40, 50, 60, 70].map((v) => (
          <Num key={v} x={X(v)} y={y1 + 18} size={13}>
            {`$${v}k`}
          </Num>
        ))}
        {[30, 50, 70].map((u) => (
          <Num key={u} x={x0 - 8} y={Y(u) + 4} anchor="end" size={13}>
            {`${u}%`}
          </Num>
        ))}
        <PatentKey x={x1} y={y1 + 40} size={12} anchor="end">
          ANNUAL INCOME
        </PatentKey>
        <PatentKey x={x0 + 8} y={y0 + 18} size={12} anchor="start">
          UTILIZATION
        </PatentKey>
        {/* the two counterfactuals on the boundary */}
        {[
          [56, 42],
          [52, 30],
        ].map(([a, b]) => (
          <path key={a} d={`M${X(a)} ${Y(b) - 6}L${X(a) + 6} ${Y(b)}L${X(a)} ${Y(b) + 6}L${X(a) - 6} ${Y(b)}Z`} fill={PAT.paper} {...ink} />
        ))}
        <line x1={X(52) + 9} y1={Y(42)} x2={X(56) - 8} y2={Y(42)} {...hair} strokeDasharray="3 2" />
        <line x1={X(52)} y1={Y(42) + 9} x2={X(52)} y2={Y(30) - 8} {...hair} strokeDasharray="3 2" />
        {/* original profile and the moved one */}
        <circle cx={X(CF_ME.inc)} cy={Y(CF_ME.util)} r={8} fill="none" {...ink} />
        <circle cx={X(inc)} cy={Y(util)} r={4.5} fill={ok ? PAT.signal : PAT.ink} stroke={ok ? PAT.signal : PAT.ink} />
        {/* the decision stamp */}
        <g transform="rotate(-6 424 70)">
          <rect x={366} y={54} width={116} height={30} fill="none" stroke={ok ? PAT.signal : PAT.ink} strokeWidth={LINE.bold} />
          <PatentKey x={425} y={74} size={13} fill={ok ? PAT.signal : PAT.ink}>
            {ok ? "APPROVED" : "DENIED"}
          </PatentKey>
        </g>
        <Num x={366} y={128} anchor="start" size={15}>
          {`income ${dInc >= 0 ? "+" : "−"}$${(Math.abs(dInc) * 1000).toLocaleString("en-US")}`}
        </Num>
        <Num x={366} y={152} anchor="start" size={15}>
          {`utilization ${dUtil > 0 ? "+" : dUtil < 0 ? "−" : "±"}${Math.abs(dUtil)} pts`}
        </Num>
      </Frame>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Slider label="Annual income" value={inc} min={40} max={70} onChange={setInc} formatValue={(v) => `$${v}k`} />
        <Slider label="Utilization" value={util} min={10} max={70} onChange={setUtil} formatValue={(v) => `${v}%`} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   16. From Explanation to Actionable Recourse
   -------------------------------------------------------------------------- */

type LeverKind = "mutable" | "oneway" | "locked";
const LEVERS: { key: string; kind: LeverKind }[] = [
  { key: "SAVINGS", kind: "mutable" },
  { key: "UTILIZATION", kind: "mutable" },
  { key: "EDUCATION", kind: "oneway" },
  { key: "AGE", kind: "locked" },
  { key: "BIRTHPLACE", kind: "locked" },
];
/** The counterfactual each search returns: how far each lever moves (−1..1) and its printed change. */
const SEARCH: Record<"all" | "actionable", { move: number[]; text: string[] }> = {
  all: { move: [0, -0.15, 0, 0.6, 0.4], text: ["", "−3 pts", "", "+6 yrs", "other"] },
  actionable: { move: [0.5, -0.45, 0.3, 0, 0], text: ["+$3,000", "−10 pts", "+1 cert.", "", ""] },
};

/** A small padlock centred on (cx, cy). */
function Padlock({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 4} ${cy - 2}V${cy - 6}A4 4 0 0 1 ${cx + 4} ${cy - 6}V${cy - 2}`} fill="none" {...ink} />
      <rect x={cx - 6} y={cy - 2} width={12} height={10} fill={PAT.paper} {...ink} />
      <circle cx={cx} cy={cy + 3} r={1.2} fill={PAT.ink} />
    </g>
  );
}

/**
 * The applicant's profile as a control panel of five levers. Mutable
 * features slide either way. A directionally constrained one carries a
 * one-way ratchet. Immutable ones are padlocked. The choice below sets what
 * the counterfactual search may move: over all features it moves padlocked
 * levers (red), over actionable features only it moves only those the
 * applicant can change.
 */
export function RecourseLevers() {
  const [mode, setMode] = useState<"all" | "actionable">("all");
  const id = "w5-levers";
  const xs = [46, 150, 260, 344, 432];
  const mid = 80;
  const half = 40;
  const s = SEARCH[mode];
  return (
    <div>
      <Frame
        width={512}
        height={186}
        label={`Patent drawing of a control panel of five levers: savings and utilization slide either way, education has a one-way ratchet, age and birthplace are padlocked. ${mode === "all" ? "Searching over all features, the counterfactual moves the padlocked age lever by six years and birthplace, in red, and utilization by 3 points." : "Searching over actionable features only, the counterfactual moves savings by 3,000 dollars, utilization down 10 points and education up by one certificate. The padlocked levers stay put."}`}
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={6} y={20} w={494} h={160} dx={10} dy={6} />
        {LEVERS.map((l, i) => {
          const x = xs[i];
          const m = s.move[i];
          const bad = l.kind === "locked" && m !== 0;
          const c = bad ? PAT.signal : PAT.ink;
          const ky = r2(mid - m * half);
          return (
            <g key={l.key}>
              <rect x={x - 4} y={mid - half - 6} width={8} height={half * 2 + 12} rx={4} fill={stip(id, "dense")} {...hair} />
              <line x1={x - 12} y1={mid} x2={x + 12} y2={mid} {...hair} />
              {m !== 0 ? <line x1={x} y1={mid} x2={x} y2={ky} stroke={c} strokeWidth={LINE.bold} /> : null}
              <circle cx={x} cy={ky} r={8} fill={bad ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={LINE.outline} />
              {l.kind === "locked" ? <Padlock cx={x} cy={mid + half + 18} /> : null}
              {l.kind === "oneway" ? (
                <g>
                  <path d={headAlongPath(x - 20, mid - 30, 0, -1, 8)} fill="none" {...ink} />
                  <line x1={x - 20} y1={mid - 30} x2={x - 20} y2={mid + 4} {...ink} />
                  <line x1={x - 26} y1={mid + 4} x2={x - 14} y2={mid + 4} {...ink} strokeWidth={LINE.bold} />
                </g>
              ) : null}
              {s.text[i] && s.text[i] !== "other" ? (
                <Num x={x + 14} y={r2(ky + 5)} anchor="start" size={13} fill={c}>
                  {s.text[i]}
                </Num>
              ) : null}
              <PatentKey x={x} y={170} size={11.5}>
                {l.key}
              </PatentKey>
            </g>
          );
        })}
      </Frame>
      <Segmented
        label="Search over"
        options={[
          { id: "all", label: "All features" },
          { id: "actionable", label: "Mutable features only" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/** Distances from the boundary of each group's rejected members (both groups: 6 of 10 approved). */
const BURDEN = {
  A: { approved: [18, 40, 62, 90, 118, 150], rejected: [-14, -30, -46, -62] },
  B: { approved: [22, 46, 70, 96, 124, 146], rejected: [-92, -118, -144, -170] },
};

/**
 * Two groups of ten applicants on one score track each, with the decision
 * boundary as a shared vertical line. Both groups have six approved members
 * to its right: prediction parity holds. Their four rejected members sit at
 * different distances to its left: close for group A, far for group B. A
 * caliper measures each group's mean distance. Group B's (red) is the larger
 * recourse burden.
 */
export function RecourseBurden() {
  const id = "w5-burden";
  const bx = 262;
  const rows = [
    { key: "GROUP A", y: 54, d: BURDEN.A, red: false },
    { key: "GROUP B", y: 128, d: BURDEN.B, red: true },
  ];
  return (
    <Frame
      width={500}
      height={190}
      label="Patent drawing of two groups of ten applicants on score tracks either side of one decision boundary. In both groups six applicants are approved, to the right. Group A's four rejected applicants sit close to the boundary, a mean of 38 units away. Group B's sit far from it, a mean of 131 units away, marked by a red caliper: a larger recourse burden."
    >
      <PatentDefs id={id} />
      <line x1={bx} y1={18} x2={bx} y2={172} {...ink} strokeWidth={LINE.bold} />
      <PatentKey x={bx - 12} y={186} size={12} anchor="end">
        REJECTED
      </PatentKey>
      <PatentKey x={bx + 12} y={186} size={12} anchor="start">
        APPROVED
      </PatentKey>
      {rows.map((r) => {
        const mean = r.d.rejected.reduce((a, b) => a + b, 0) / r.d.rejected.length;
        const c = r.red ? PAT.signal : PAT.ink;
        return (
          <g key={r.key}>
            <PatentKey x={8} y={r.y + 4} size={12} anchor="start">
              {r.key}
            </PatentKey>
            <line x1={92} y1={r.y} x2={490} y2={r.y} {...hair} />
            {r.d.approved.map((v) => (
              <circle key={v} cx={r2(bx + v * 1.45)} cy={r.y} r={5} fill={PAT.paper} {...ink} />
            ))}
            {r.d.rejected.map((v) => (
              <circle key={v} cx={r2(bx + v * 0.9)} cy={r.y} r={5} fill={PAT.ink} {...ink} />
            ))}
            {/* caliper: mean distance to the boundary */}
            <g stroke={c} strokeWidth={r.red ? LINE.bold : LINE.outline} strokeLinecap="round">
              <line x1={r2(bx + mean * 0.9)} y1={r.y + 18} x2={bx} y2={r.y + 18} />
              <line x1={r2(bx + mean * 0.9)} y1={r.y + 12} x2={r2(bx + mean * 0.9)} y2={r.y + 24} />
            </g>
            <Num x={r2(bx + mean * 0.9 - 6)} y={r.y + 23} anchor="end" size={13} fill={c}>
              {`${Math.round(-mean)}`}
            </Num>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   17. Part 4: Reasoning Traces in Large Language Models as Verbal Protocols
   -------------------------------------------------------------------------- */

/**
 * A language model's housing, its gears seen through an inspection window,
 * prints a long strip of reasoning text that runs out across the table.
 * A single choice card, ticked, drops from a slot on its front.
 */
export function TraceScroll() {
  const id = "w5-scroll";
  const sx0 = 196;
  const sx1 = 506;
  const sy = 238;
  const d = 58;
  const sk = 40;
  const rnd = seeded(31);
  const words = Array.from({ length: 4 }, (_, row) => {
    const f = (row + 1) / 5;
    const y = r2(sy - d * f);
    const xo = r2(sk * f);
    const out: [number, number][] = [];
    let x = sx0 + 14;
    while (x < sx1 - 40) {
      const len = 10 + rnd() * 30;
      out.push([r2(x + xo), r2(x + xo + len)]);
      x += len + 6;
    }
    return { y, out };
  });
  return (
    <Frame
      width={560}
      height={300}
      label="Patent drawing of a language model's housing, its gears seen through an inspection window. A long strip of reasoning text runs out of its side across the table, covered in rows of words. A single choice card with a tick lies in front of the housing, dropped from a slot on its face."
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={30} y={60} w={150} h={178} dx={16} dy={10} />
      <rect x={46} y={76} width={118} height={92} fill={PAT.paper} {...hair} />
      <Gear cx={88} cy={116} r={22} n={12} />
      <Gear cx={130} cy={140} r={15} n={10} phase={0.2} />
      {/* the strip of reasoning text */}
      <path d={`M${sx0} ${sy}L${r2(sx0 + sk)} ${sy - d}H${r2(sx1 + sk)}L${sx1} ${sy}Z`} fill={PAT.paper} {...ink} />
      <path d={`M${sx0} ${sy}V${sy + 3}H${sx1}L${r2(sx1 + sk)} ${sy - d + 3}V${sy - d}L${sx1} ${sy}Z`} fill={stip(id, "dense")} {...ink} />
      {words.map((r, i) => r.out.map(([a, b], j) => <line key={`${i}-${j}`} x1={a} y1={r.y} x2={b} y2={r.y} {...hair} />))}
      {/* the choice slot and card */}
      <rect x={90} y={196} width={30} height={4} fill={PAT.ink} />
      <line x1={105} y1={204} x2={105} y2={252} {...hair} strokeDasharray="3 3" />
      <Sheet id={id} x={78} y={278} w={52} d={20} sk={12} t={3} />
      <path d={tick(110, 268, 7)} fill="none" {...ink} strokeWidth={LINE.bold} />
      <FigureName x={196} y={290} size={14} anchor="start">
        final choice
      </FigureName>
      <FigureName x={370} y={168} size={14}>
        reasoning trace
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   18. Chain-of-Thought and Reasoning Traces as Verbal Protocols
   -------------------------------------------------------------------------- */

type Code = "goal" | "attributes" | "disclosure";
type Span = [string, Code?];
const HUMAN: Span[][] = [
  [["“Okay, I want the "], ["cheapest per ounce", "goal"], ["."]],
  [["This one is "], ["$4.99 for 10 oz", "attributes"], [", that one"]],
  [["is "], ["$5.00 for 11 oz", "attributes"], [". Oh, the second says"]],
  [["Sponsored", "disclosure"], [". Still cheaper per ounce,"]],
  [["so I’ll take it.”"]],
];
const AGENT: Span[][] = [
  [["Goal: the "], ["lowest price per ounce", "goal"], ["."]],
  [["Coffee A is "], ["$4.99 for 10 oz", "attributes"], [". Coffee B"]],
  [["is "], ["$5.00 for 11 oz", "attributes"], [". B carries a"]],
  [["Sponsored label", "disclosure"], [", but its unit price"]],
  [["is lower. I choose Coffee B."]],
];

/**
 * Two transcripts side by side: a shopper's think-aloud protocol at the
 * shelf and an AI shopping agent's reasoning trace for the same choice. The
 * codebook below picks one decision construct. Its spans are marked in red
 * in both transcripts at once, by the same rule.
 */
export function CodedProtocols() {
  const [code, setCode] = useState<Code>("goal");
  const id = "w5-coded";
  const card = (x: number, rows: Span[][]) => (
    <g>
      <rect x={x} y={20} width={318} height={128} fill={PAT.paper} {...ink} />
      {rows.map((spans, i) => (
        <text key={i} x={x + 16} y={48 + i * 22} fontFamily="var(--font-heading)" fontSize={14} fill={PAT.ink}>
          {spans.map(([t, c], j) => (
            <tspan key={j} fill={c === code ? PAT.signal : PAT.ink} style={c === code ? { textDecoration: "underline" } : undefined}>
              {t}
            </tspan>
          ))}
        </text>
      ))}
    </g>
  );
  const coded = (rows: Span[][]) =>
    rows
      .flat()
      .filter(([, c]) => c === code)
      .map(([t]) => t)
      .join(". ");
  return (
    <div>
      <Frame
        width={800}
        height={184}
        label={`Patent drawing of two transcripts. Left, a shopper at a shelf speaks a think-aloud protocol. Right, an AI shopping agent writes a reasoning trace for the same coffee choice. The codebook construct ${code} is marked in red in both: shopper, ${coded(HUMAN)}. Agent, ${coded(AGENT)}.`}
      >
        <PatentDefs id={id} />
        <Figure id={id} x={34} y={146} s={1.2} arm="reach" />
        <path d="M64 70L74 64V78Z" fill={PAT.paper} {...ink} />
        {card(74, HUMAN)}
        <SmallModel id={id} x={420} y={86} w={48} h={50} />
        <path d="M482 70L492 64V78Z" fill={PAT.paper} {...ink} />
        {card(474, AGENT)}
        <FigureName x={233} y={174} size={14}>
          think-aloud protocol
        </FigureName>
        <FigureName x={633} y={174} size={14}>
          reasoning trace
        </FigureName>
      </Frame>
      <Segmented
        label="Codebook"
        options={[
          { id: "goal", label: "Goal formulated" },
          { id: "attributes", label: "Attributes compared" },
          { id: "disclosure", label: "Disclosure noticed" },
        ]}
        value={code}
        onChange={setCode}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   19. Plausibility Versus Faithfulness in LLM Explanations
   -------------------------------------------------------------------------- */

const CUE_TRACE = {
  off: ["Laptop B lasts 14 hours on a", "charge, against 9 hours for", "laptop A, at the same price", "and weight. Answer: (B)"],
  on: ["Laptop A has the sturdier", "aluminium build and the better", "keyboard, which matter most", "for daily use. Answer: (A)"],
};

/**
 * A few-shot prompt and the model's reply. The prompt's three worked
 * examples sit on the left with their marked answers, the new question
 * beneath them. With the covert cue on, every worked answer is (A). The
 * model then answers (A) and writes a reason about build quality that never
 * mentions the pattern (red). Two meters read the reply: plausibility stays
 * high either way. Faithfulness falls when the cue drives the answer.
 */
export function CoveredCue() {
  const [cue, setCue] = useState(false);
  const id = "w5-cue";
  const answers = cue ? ["A", "A", "A"] : ["A", "B", "B"];
  const trace = cue ? CUE_TRACE.on : CUE_TRACE.off;
  const red = cue ? PAT.signal : PAT.ink;
  const meter = (y: number, key: string, v: number, c: string) => (
    <g>
      <PatentKey x={318} y={y} size={11} anchor="start">
        {key}
      </PatentKey>
      <rect x={318} y={y + 8} width={230} height={12} fill={PAT.paper} {...ink} />
      <rect x={318} y={y + 8} width={r2(230 * v)} height={12} fill={stip(id, c === PAT.signal ? "signal" : "light")} stroke={c} strokeWidth={LINE.outline} />
    </g>
  );
  return (
    <div>
      <Frame
        width={580}
        height={300}
        label={`Patent drawing of a few-shot prompt and a model's reply. The three worked examples are answered ${answers.join(", ")}${cue ? ": the covert cue, every answer (A)" : ""}. The model replies: “${trace.join(" ")}” Meters below: plausibility high. Faithfulness ${cue ? "low, since the reason never mentions the answer pattern that drove the choice" : "high"}.`}
      >
        <PatentDefs id={id} />
        {/* worked examples */}
        {answers.map((a, i) => (
          <g key={i}>
            <rect x={16} y={20 + i * 56} width={188} height={46} fill={PAT.paper} {...ink} />
            <line x1={28} y1={36 + i * 56} x2={146} y2={36 + i * 56} {...hair} />
            <line x1={28} y1={50 + i * 56} x2={124} y2={50 + i * 56} {...hair} />
            <circle cx={178} cy={43 + i * 56} r={13} fill="none" {...ink} />
            <Num x={178} y={48 + i * 56} size={14}>
              {`(${a})`}
            </Num>
          </g>
        ))}
        {/* the new question */}
        <rect x={16} y={200} width={188} height={64} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
        <line x1={28} y1={218} x2={170} y2={218} {...hair} />
        <Num x={28} y={250} anchor="start" size={14}>
          (A) laptop A
        </Num>
        <Num x={118} y={250} anchor="start" size={14}>
          (B) laptop B
        </Num>
        <FigureName x={110} y={290} size={14}>
          prompt
        </FigureName>
        {/* the model */}
        <line x1={212} y1={150} x2={228} y2={150} {...hair} />
        <SmallModel id={id} x={232} y={124} w={46} h={50} />
        <line x1={290} y1={150} x2={306} y2={150} {...hair} />
        {/* the reply */}
        <rect x={310} y={20} width={252} height={130} fill={PAT.paper} stroke={red} strokeWidth={LINE.outline} />
        {trace.map((t, i) => (
          <text key={i} x={324} y={46 + i * 26} fontFamily="var(--font-heading)" fontSize={14} fill={red}>
            {t}
          </text>
        ))}
        {meter(186, "PLAUSIBILITY", 0.92, PAT.ink)}
        {meter(236, "FAITHFULNESS", cue ? 0.18 : 0.9, red)}
        <FigureName x={436} y={290} size={14}>
          chain-of-thought explanation
        </FigureName>
      </Frame>
      <Toggles
        label="Prompt"
        options={[{ id: "cue", label: "Covert cue: every worked answer is (A)" }]}
        value={cue ? ["cue"] : []}
        onChange={(v) => setCue(v.includes("cue"))}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   20. Auditing Reasoning Traces Alongside Observed Choices
   -------------------------------------------------------------------------- */

/**
 * Wadi & Ma (2026b), Study 1 Tool-Lab, Gemini 3.1 Pro (Tables W12 and W13):
 * by number of bags bought, the share of sessions whose first reasoning
 * trace states a total-price goal, the diagnostic attributes acquired (of 6)
 * and the share choosing the unit-price optimal coffee.
 */
const VOLUME = [
  { bags: 1, total: 0.38, unit: 0.62, diag: 5.55, opt: 0.8 },
  { bags: 5, total: 0.52, unit: 0.45, diag: 5.43, opt: 0.76 },
  { bags: 50, total: 0.83, unit: 0.15, diag: 4.4, opt: 0.39 },
  { bags: 250, total: 0.84, unit: 0.14, diag: 4.22, opt: 0.35 },
];

/**
 * Three readings from one audit, driven by the purchase volume. Left: ten
 * coded traces, red when the trace states total-price minimization as the
 * goal. Middle: the six product details that decide the unit price, filled
 * as far as the agent looked them up. Right: the share of sessions that
 * chose the unit-price optimal coffee.
 */
export function VolumeObjective() {
  const [k, setK] = useState(0);
  const id = "w5-volume";
  const v = VOLUME[k];
  const reds = Math.round(v.total * 10);
  return (
    <div>
      <Frame
        width={500}
        height={160}
        label={`Chart from Wadi and Ma (2026b), Gemini 3.1 Pro buying ${v.bags} ${v.bags === 1 ? "bag" : "bags"} of coffee: ${Math.round(v.total * 100)} percent of reasoning traces state total-price minimization as the goal (red) and ${Math.round(v.unit * 100)} percent unit-price minimization. The agent acquired ${v.diag} of 6 diagnostic details. ${Math.round(v.opt * 100)} percent chose the unit-price optimal coffee.`}
      >
        <PatentDefs id={id} />
        {/* coded traces */}
        <PatentKey x={10} y={20} size={11} anchor="start">
          STATED GOAL
        </PatentKey>
        {Array.from({ length: 10 }, (_, i) => {
          const red = i < reds;
          const x = 12 + (i % 5) * 30;
          const y = 34 + Math.floor(i / 5) * 46;
          return (
            <g key={i}>
              <rect x={x} y={y} width={22} height={36} fill={red ? stip(id, "signal") : PAT.paper} stroke={red ? PAT.signal : PAT.ink} strokeWidth={LINE.outline} />
              {[0, 1, 2].map((l) => (
                <line key={l} x1={x + 4} y1={y + 9 + l * 8} x2={x + 18 - (l % 2) * 5} y2={y + 9 + l * 8} stroke={red ? PAT.signal : PAT.ink} strokeWidth={LINE.hair} />
              ))}
            </g>
          );
        })}
        <Num x={10} y={136} anchor="start" size={14} fill={PAT.signal}>
          {`${Math.round(v.total * 100)}% total price`}
        </Num>
        <Num x={10} y={154} anchor="start" size={14}>
          {`${Math.round(v.unit * 100)}% unit price`}
        </Num>

        {/* diagnostic details acquired */}
        <PatentKey x={178} y={20} size={11} anchor="start">
          DETAILS ACQUIRED
        </PatentKey>
        {Array.from({ length: 6 }, (_, i) => {
          const x = 180 + (i % 3) * 46;
          const y = 34 + Math.floor(i / 3) * 46;
          const f = Math.max(0, Math.min(1, v.diag - i));
          return (
            <g key={i}>
              <rect x={x} y={y} width={38} height={36} fill={PAT.paper} {...ink} />
              {f > 0 ? <rect x={x} y={r2(y + 36 * (1 - f))} width={38} height={r2(36 * f)} fill={stip(id, "light")} {...ink} /> : null}
            </g>
          );
        })}
        <Num x={178} y={136} anchor="start" size={14}>
          {`${v.diag.toFixed(2)} of 6`}
        </Num>

        {/* optimal choice */}
        <PatentKey x={340} y={20} size={11} anchor="start">
          OPTIMAL CHOICE
        </PatentKey>
        <rect x={342} y={34} width={36} height={82} fill={PAT.paper} {...ink} />
        <rect x={342} y={r2(34 + 82 * (1 - v.opt))} width={36} height={r2(82 * v.opt)} fill={stip(id, "dense")} {...ink} />
        <Num x={388} y={r2(34 + 82 * (1 - v.opt) + 5)} anchor="start" size={20}>
          {`${Math.round(v.opt * 100)}%`}
        </Num>
        <FigureName x={340} y={154} size={13} anchor="start">
          Gemini 3.1 Pro
        </FigureName>
      </Frame>
      <Slider label="Bags purchased" value={k} min={0} max={VOLUME.length - 1} onChange={setK} formatValue={(i) => String(VOLUME[i].bags)} />
    </div>
  );
}

/**
 * Wadi & Ma (2026c), Study 1, Gemini 3.1 Pro (Tables 5 and 6, 500 runs per
 * cell): mean skepticism coded from the pre-choice reasoning trace (1 to 7)
 * and the share of runs booking the target hotel, by the principal named in
 * the system prompt and whether the hotel carries the sponsor tag.
 */
const PRINCIPAL = [
  { key: "TRAVELER", organic: { skep: 1.14, booked: 0.53 }, sponsored: { skep: 5.62, booked: 0.028 } },
  { key: "PLATFORM", organic: { skep: 1.09, booked: 0.542 }, sponsored: { skep: 4.16, booked: 0.25 } },
];

/**
 * The target hotel's listing card, with or without its sponsor tag, and one
 * row per principal named in the agent's system prompt. Each row reads the
 * skepticism coded from the agent's reasoning traces on a 1-to-7 scale (red)
 * and the share of runs that booked the hotel. Adding the tag moves both
 * readings in both rows, by less when the platform is the principal.
 */
export function PrincipalSkepticism() {
  const [tag, setTag] = useState(true);
  const id = "w5-principal";
  const sx0 = 150;
  const sx1 = 310;
  const sX = (s: number) => r2(sx0 + ((s - 1) / 6) * (sx1 - sx0));
  const bx = 346;
  const bw = 230;
  return (
    <div>
      <Frame
        width={500}
        height={158}
        label={`Chart from Wadi and Ma (2026c), Gemini 3.1 Pro, target hotel ${tag ? "tagged as sponsored" : "untagged"}. ${PRINCIPAL.map((p) => {
          const v = tag ? p.sponsored : p.organic;
          return `${p.key.toLowerCase()} as principal: skepticism coded from the reasoning trace ${v.skep.toFixed(2)} of 7, in red, and ${(v.booked * 100).toFixed(1)} percent of 500 runs booked the hotel`;
        }).join(". ")}.`}
      >
        <PatentDefs id={id} />
        {/* the listing */}
        <rect x={8} y={26} width={118} height={112} fill={PAT.paper} {...ink} />
        <rect x={18} y={36} width={44} height={36} fill={stip(id, "light")} {...hair} />
        <House id={id} x={26} y={68} w={22} h={14} dx={5} dy={3} roof={9} />
        {[0, 1, 2].map((l) => (
          <line key={l} x1={70} y1={44 + l * 10} x2={116 - l * 10} y2={44 + l * 10} {...hair} />
        ))}
        {[0, 1, 2, 3, 4].map((s) => (
          <path key={s} d={star(r2(24 + s * 12), 92, 4.6)} fill={s < 4 ? PAT.ink : PAT.paper} {...hair} />
        ))}
        {tag ? (
          <g>
            <rect x={16} y={108} width={102} height={22} fill={PAT.paper} {...ink} />
            <PatentKey x={68} y={123} size={11}>
              SPONSORED
            </PatentKey>
          </g>
        ) : null}
        <PatentKey x={sx0} y={16} size={11} anchor="start">
          SKEPTICISM
        </PatentKey>
        <PatentKey x={bx} y={16} size={11} anchor="start">
          BOOKED
        </PatentKey>
        {PRINCIPAL.map((p, i) => {
          const v = tag ? p.sponsored : p.organic;
          const y = 64 + i * 60;
          return (
            <g key={p.key}>
              <PatentKey x={sx0} y={y - 26} size={11} anchor="start">
                {p.key}
              </PatentKey>
              <line x1={sx0} y1={y} x2={sx1} y2={y} {...ink} />
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <g key={s}>
                  <line x1={sX(s)} y1={y - 4} x2={sX(s)} y2={y + 4} {...hair} />
                  <Num x={sX(s)} y={y + 18} size={11.5}>
                    {s}
                  </Num>
                </g>
              ))}
              <path d={`M${sX(v.skep)} ${y - 4}l-6 -12h12Z`} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
              <Num x={r2(sX(v.skep) + 10)} y={y - 8} anchor="start" size={15} fill={PAT.signal}>
                {v.skep.toFixed(2)}
              </Num>
              <rect x={bx} y={y - 10} width={r2(bw * v.booked)} height={18} fill={stip(id, "dense")} {...ink} />
              <line x1={bx} y1={y - 14} x2={bx} y2={y + 12} {...ink} />
              <Num x={r2(bx + bw * v.booked + 8)} y={y + 5} anchor="start" size={15}>
                {`${(v.booked * 100).toFixed(1)}%`}
              </Num>
            </g>
          );
        })}
      </Frame>
      <Toggles label="Listing" options={[{ id: "tag", label: "Sponsor tag" }]} value={tag ? ["tag"] : []} onChange={(t) => setTag(t.includes("tag"))} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   21. Part 5: Designing Disclosures and Documentation for Stakeholders
   -------------------------------------------------------------------------- */

/**
 * An exploded view: four sheets of technical evidence (an interpretable
 * model's weights, attribution bars, a counterfactual crossing a boundary,
 * an audit tally) pulled apart along centre lines above a documentation
 * folder. From the folder one slim document, cut for its reader (red), is
 * handed to the person who must act on it.
 */
export function EvidenceBinder() {
  const id = "w5-binder";
  const sx = 40;
  const w = 170;
  const d = 34;
  const sk = 44;
  const ys = [56, 104, 152, 200];
  const corners = [
    [sx, 0],
    [sx + w, 0],
    [sx + sk, -d],
    [sx + w + sk, -d],
  ];
  const emblem = (i: number, y: number) => {
    const cx = sx + sk / 2 + w / 2;
    const cy = y - d / 2;
    if (i === 0)
      return (
        <g>
          <line x1={cx - 40} y1={cy + 4} x2={cx + 40} y2={cy + 4} {...ink} />
          <path d={`M${cx} ${cy + 4}l-5 8h10Z`} fill={PAT.ink} />
          <rect x={cx - 34} y={cy - 6} width={10} height={10} fill={PAT.paper} {...hair} />
          <rect x={cx + 18} y={cy - 10} width={14} height={14} fill={PAT.paper} {...hair} />
        </g>
      );
    if (i === 1)
      return (
        <g>
          {[46, 30, 18].map((bw, k) => (
            <rect key={k} x={cx - 30} y={cy - 10 + k * 7} width={bw} height={4} fill={stip(id, "dense")} {...hair} />
          ))}
        </g>
      );
    if (i === 2)
      return (
        <g>
          <line x1={cx - 10} y1={cy - 12} x2={cx + 6} y2={cy + 12} {...ink} />
          <circle cx={cx - 26} cy={cy + 2} r={3} fill={PAT.ink} />
          <line x1={cx - 22} y1={cy + 1} x2={cx + 12} y2={cy - 4} {...hair} strokeDasharray="3 2" />
          <circle cx={cx + 16} cy={cy - 5} r={3} fill={PAT.paper} {...ink} />
        </g>
      );
    return (
      <g>
        {[0, 1, 2, 3, 4, 5].map((k) =>
          k === 4 ? (
            <path key={k} d={cross(cx - 30 + k * 12, cy, 3)} {...ink} />
          ) : (
            <path key={k} d={tick(cx - 30 + k * 12, cy, 3.5)} fill="none" {...ink} />
          ),
        )}
      </g>
    );
  };
  return (
    <Frame
      width={560}
      height={318}
      label="Patent drawing in exploded view. Four sheets of technical evidence hang one above another along centre lines: an interpretable model's weighted beam, attribution bars, a counterfactual crossing a boundary, and an audit tally of ticks and one cross. Below them lies a documentation folder. From it one slim document, outlined in red, is handed to a person who must act on it."
    >
      <PatentDefs id={id} />
      {/* centre lines through the stack */}
      {corners.map(([x, dy], i) => (
        <line key={i} x1={x} y1={ys[0] + dy} x2={x} y2={ys[3] + 46 + dy} {...hair} strokeDasharray={CENTRE_DASH} />
      ))}
      {ys.map((y, i) => (
        <g key={y}>
          <Sheet id={id} x={sx} y={y} w={w} d={d} sk={sk} t={3} />
          <g transform={`translate(${sx + sk / 2 + w / 2} ${y - d / 2}) scale(1.5) translate(${-(sx + sk / 2 + w / 2)} ${-(y - d / 2)})`}>{emblem(i, y)}</g>
        </g>
      ))}
      {/* the folder */}
      <Sheet id={id} x={sx - 8} y={292} w={w + 16} d={d + 8} sk={sk} t={10} />
      <path d={`M${sx + sk - 8} ${292 - d - 8}l12 -8h40l8 8`} fill={PAT.paper} {...ink} />
      {/* the tailored document, handed over */}
      <path d={`M${sx + w + 30} 270Q${330} 250 ${360} 214`} fill="none" {...hair} strokeDasharray="4 3" />
      <path d={headAlongPath(360, 214, 0.6, -1, 8)} fill="none" {...hair} />
      <g transform="rotate(-10 392 170)">
        <rect x={368} y={128} width={52} height={66} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <rect x={364} y={132} width={52} height={66} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.bold} />
        <rect x={364} y={132} width={52} height={66} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} />
        {[0, 1, 2].map((k) => (
          <line key={k} x1={372} y1={148 + k * 12} x2={406 - k * 6} y2={148 + k * 12} stroke={PAT.signal} strokeWidth={LINE.hair} />
        ))}
      </g>
      <Figure id={id} x={482} y={288} s={1.9} arm="reach" flip />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   22. Tailoring Explanations to Stakeholder Needs
   -------------------------------------------------------------------------- */

/** A standing document: white front with a thin stippled edge, (x, y) its top-left. */
function Doc({ id, x, y, w, h, children }: { id: string; x: number; y: number; w: number; h: number; children?: React.ReactNode }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={6} dy={4} />
      {children}
    </g>
  );
}

/**
 * What each audience receives, drawn as the document itself. Engineers: a
 * sheet of ICE curves beside global attribution bars. Executives: a model
 * card above an accuracy-fairness frontier. Regulators: a bound audit trail
 * with a disparate-impact ratio and a seal. Consumers: a notice with one
 * plain reason and one step that would change the outcome.
 */
export function FourAudiences({ kind }: { kind: "engineer" | "executive" | "regulator" | "consumer" }) {
  const id = `w5-aud-${kind}`;
  if (kind === "engineer") {
    const curves = [0.2, 0.35, 0.5, 0.62, 0.75].map((b, i) =>
      Array.from({ length: 11 }, (_, k) => `${r2(24 + k * 10)} ${r2(130 - (b + (i % 2 ? 0.3 : -0.2) * (k / 10)) * 80)}`).join("L"),
    );
    return (
      <Frame width={260} height={160} label="Patent drawing of an engineer's sheet: five ICE curves, some rising and some falling, beside four global attribution bars.">
        <PatentDefs id={id} />
        <Doc id={id} x={12} y={20} w={120} h={126}>
          <line x1={24} y1={36} x2={24} y2={132} {...ink} />
          <line x1={24} y1={132} x2={124} y2={132} {...ink} />
          {curves.map((c, i) => (
            <path key={i} d={`M${c}`} fill="none" {...hair} />
          ))}
        </Doc>
        <Doc id={id} x={146} y={20} w={100} h={126}>
          <line x1={160} y1={34} x2={160} y2={132} {...ink} />
          {[70, 52, 34, 18].map((w, k) => (
            <rect key={k} x={160} y={44 + k * 22} width={w} height={12} fill={stip(id, "light")} {...ink} />
          ))}
        </Doc>
      </Frame>
    );
  }
  if (kind === "executive") {
    const front = Array.from({ length: 21 }, (_, k) => {
      const t = k / 20;
      return `${r2(150 + t * 90)} ${r2(132 - Math.sqrt(1 - t * t) * 80)}`;
    });
    return (
      <Frame width={260} height={160} label="Patent drawing of an executive's documents: a model card with a header and short rows, and a chart of the accuracy-fairness trade-off frontier, a curve bowing outward with one chosen point.">
        <PatentDefs id={id} />
        <Doc id={id} x={6} y={20} w={128} h={126}>
          <PatentKey x={70} y={42} size={12}>
            MODEL CARD
          </PatentKey>
          <line x1={22} y1={50} x2={118} y2={50} {...ink} />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <line x1={24} y1={66 + k * 15} x2={60} y2={66 + k * 15} {...hair} />
              <line x1={70} y1={66 + k * 15} x2={112 - (k % 2) * 14} y2={66 + k * 15} {...hair} />
            </g>
          ))}
        </Doc>
        <line x1={150} y1={40} x2={150} y2={132.5} {...ink} />
        <line x1={150} y1={132.5} x2={246} y2={132.5} {...ink} />
        <path d={`M${front.join("L")}`} fill="none" {...ink} />
        <circle cx={r2(150 + 0.6 * 90)} cy={r2(132 - 0.8 * 80)} r={4} fill={PAT.ink} />
      </Frame>
    );
  }
  if (kind === "regulator") {
    return (
      <Frame width={260} height={160} label="Patent drawing of a regulator's audit trail: a bound ledger of dated rows, a disparate-impact ratio of 0.82, and a round conformity seal.">
        <PatentDefs id={id} />
        <Doc id={id} x={12} y={20} w={150} h={126}>
          <rect x={12} y={20} width={10} height={126} fill={stip(id, "dense")} {...ink} />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <g key={k}>
              <line x1={32} y1={40 + k * 16} x2={56} y2={40 + k * 16} {...hair} />
              <line x1={64} y1={40 + k * 16} x2={150 - (k % 3) * 16} y2={40 + k * 16} {...hair} />
            </g>
          ))}
          <Num x={32} y={138} anchor="start" size={15}>
            impact ratio 0.82
          </Num>
        </Doc>
        <circle cx={208} cy={100} r={30} fill={PAT.paper} {...ink} />
        <circle cx={208} cy={100} r={24} fill="none" {...hair} strokeDasharray="2 2" />
        <path d={tick(208, 102, 11)} fill="none" {...ink} strokeWidth={LINE.bold} />
      </Frame>
    );
  }
  return (
    <Frame width={260} height={160} label="Patent drawing of a consumer's notice: a letter saying an automated system made the decision, one plain-language reason, and one feasible step marked with an arrow, in red, that would change the outcome.">
      <PatentDefs id={id} />
      <Doc id={id} x={12} y={16} w={232} h={134}>
        <PatentKey x={26} y={38} size={12} anchor="start">
          AUTOMATED DECISION
        </PatentKey>
        <line x1={26} y1={46} x2={230} y2={46} {...ink} />
        {[0, 1].map((k) => (
          <line key={k} x1={26} y1={64 + k * 13} x2={220 - k * 40} y2={64 + k * 13} {...hair} />
        ))}
        <path d={headAlongPath(44, 112, 1, 0, 8)} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} />
        <line x1={26} y1={112} x2={44} y2={112} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <line x1={54} y1={108} x2={214} y2={108} stroke={PAT.signal} strokeWidth={LINE.hair} />
        <line x1={54} y1={120} x2={170} y2={120} stroke={PAT.signal} strokeWidth={LINE.hair} />
      </Doc>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   23. Model Cards, Datasheets, and System Transparency Notes
   -------------------------------------------------------------------------- */

/** A chain of oval links from (x0, y) to (x1, y). */
function Chain({ x0, x1, y }: { x0: number; x1: number; y: number }) {
  const n = Math.max(2, Math.round((x1 - x0) / 16));
  const step = (x1 - x0) / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const cx = r2(x0 + step * (i + 0.5));
        return i % 2 === 0 ? (
          <ellipse key={i} cx={cx} cy={y} rx={r2(step * 0.62)} ry={5.5} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} />
        ) : (
          <rect key={i} x={r2(cx - step * 0.62)} y={y - 2} width={r2(step * 1.24)} height={4} rx={2} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.outline} />
        );
      })}
    </g>
  );
}

/**
 * The three documents side by side, each a standing sheet with its title:
 * the datasheet (a table of rows), the model card (rows and a bar per
 * group for disaggregated performance), the system transparency note (rows
 * and a dated audit stamp). Chains join them in red: the chain of custody.
 */
export function ChainOfCustody() {
  const id = "w5-custody";
  const docs = [
    { x: 40, key: "DATASHEET" },
    { x: 310, key: "MODEL CARD" },
    { x: 580, key: "SYSTEM NOTE" },
  ];
  const w = 180;
  const h = 140;
  const y = 16;
  return (
    <Frame
      width={800}
      height={170}
      label="Patent drawing of three standing documents joined by red chains: a datasheet with a table of rows. A model card with rows and four bars of performance by group. And a system transparency note with rows and a dated audit stamp. The chains form the chain of custody."
    >
      <PatentDefs id={id} />
      {docs.map((d, i) => (
        <g key={d.key}>
          <ObliqueBox id={id} x={d.x} y={y} w={w} h={h} dx={8} dy={5} />
          <PatentKey x={d.x + w / 2} y={y + 24} size={12}>
            {d.key}
          </PatentKey>
          <line x1={d.x + 12} y1={y + 32} x2={d.x + w - 12} y2={y + 32} {...ink} />
          {i === 0
            ? [0, 1, 2, 3, 4, 5].map((k) => (
                <g key={k}>
                  <line x1={d.x + 14} y1={y + 50 + k * 14} x2={d.x + 70} y2={y + 50 + k * 14} {...hair} />
                  <line x1={d.x + 82} y1={y + 50 + k * 14} x2={d.x + w - 16 - (k % 2) * 20} y2={y + 50 + k * 14} {...hair} />
                </g>
              ))
            : null}
          {i === 1 ? (
            <g>
              {[0, 1, 2].map((k) => (
                <line key={k} x1={d.x + 14} y1={y + 50 + k * 14} x2={d.x + w - 20 - k * 16} y2={y + 50 + k * 14} {...hair} />
              ))}
              {[86, 80, 64, 82].map((v, k) => (
                <rect key={k} x={d.x + 20 + k * 38} y={r2(y + h - 10 - v * 0.5)} width={22} height={r2(v * 0.5)} fill={stip(id, "light")} {...ink} />
              ))}
            </g>
          ) : null}
          {i === 2 ? (
            <g>
              {[0, 1, 2, 3, 4].map((k) => (
                <line key={k} x1={d.x + 14} y1={y + 50 + k * 14} x2={d.x + 112 - (k % 2) * 18} y2={y + 50 + k * 14} {...hair} />
              ))}
              <circle cx={d.x + 144} cy={y + 104} r={24} fill="none" {...ink} />
              <circle cx={d.x + 144} cy={y + 104} r={19} fill="none" {...hair} strokeDasharray="2 2" />
              <Num x={d.x + 144} y={y + 109} size={13}>
                2026
              </Num>
            </g>
          ) : null}
        </g>
      ))}
      <Chain x0={228} x1={310} y={y + 70} />
      <Chain x0={498} x1={580} y={y + 70} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   24. Dark Transparency and Disclosure Overload
   -------------------------------------------------------------------------- */

/** Share of readers who get as far as page k: most stop after the first few pages. */
const reachPage = (k: number) => Math.exp(-(k - 1) / 4);

/**
 * A disclosure as a stack of pages seen edge-on in oblique projection. The
 * page carrying the adverse error rate (red) sits about two-thirds of the
 * way down. The slider adds pages. The readout gives the share of readers who reach the red
 * page, which falls as the stack grows.
 */
export function BuriedDisclosure() {
  const [n, setN] = useState(3);
  const id = "w5-buried";
  const red = Math.max(2, Math.round(n * 0.65));
  const reach = reachPage(red);
  const t = 4.4;
  const base = 262;
  const x = 150;
  const w = 180;
  const d = 64;
  const sk = 60;
  const topY = r2(base - n * t);
  const pct = `${(reach * 100).toFixed(reach < 0.1 ? 1 : 0)}%`;
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={`Patent drawing of a disclosure of ${n} pages stacked in oblique projection, with the page carrying the adverse error rate, in red, at page ${red}. A reader stands beside the stack. ${pct} of readers reach the red page.`}
      >
        <PatentDefs id={id} />
        {/* page edges, bottom to top */}
        {Array.from({ length: n }, (_, i) => {
          const k = n - i; // page number from the top
          const y = r2(base - i * t);
          const isRed = k === red;
          return (
            <path
              key={i}
              d={`M${x} ${y}V${r2(y - t)}H${x + w}L${x + w + sk} ${r2(y - t - d)}V${r2(y - d)}L${x + w} ${y}Z`}
              fill={isRed ? stip(id, "signal") : PAT.paper}
              stroke={isRed ? PAT.signal : PAT.ink}
              strokeWidth={LINE.hair}
              strokeLinejoin="round"
            />
          );
        })}
        {/* the top page face */}
        <path d={`M${x} ${topY}L${x + sk} ${r2(topY - d)}H${x + w + sk}L${x + w} ${topY}Z`} fill={PAT.paper} {...ink} />
        {[0, 1, 2, 3].map((l) => {
          const f = (l + 1) / 5;
          const yy = r2(topY - d * f);
          return <line key={l} x1={r2(x + sk * f + 20)} y1={yy} x2={r2(x + sk * f + w - 30 - (l % 2) * 30)} y2={yy} {...hair} />;
        })}
        <Figure id={id} x={84} y={base} s={1.3} arm="reach" />
        {/* the red page's depth */}
        <Num x={x + w + sk + 8} y={r2(base - (n - red) * t - d + 2)} anchor="start" size={14} fill={PAT.signal}>
          {`error rate, page ${red}`}
        </Num>
        <Num x={20} y={292} anchor="start" size={15}>
          {`${n} pages | `}
          <tspan fill={PAT.signal}>{`${pct} of readers reach page ${red}`}</tspan>
        </Num>
      </Frame>
      <Slider label="Pages disclosed" value={n} min={3} max={30} onChange={setN} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   25. Discussion: When the Reasoning Trace Looks Clean
   -------------------------------------------------------------------------- */

/**
 * The assistant's pick on the shelf: two boxed products with identical star
 * rows, the private-label box at the higher price chosen and ticked (red),
 * the third-party brand cheaper. Above them the collapsible "Why I picked
 * this product" panel, open, praising build quality.
 */
export function CleanTrace() {
  const id = "w5-clean";
  const box = (x: number, price: string, mine: boolean) => {
    const c = mine ? PAT.signal : PAT.ink;
    return (
      <g>
        <ObliqueBox id={id} x={x} y={190} w={110} h={86} dx={14} dy={9} stroke={c} />
        {[0, 1, 2, 3, 4].map((s) => (
          <path key={s} d={star(r2(x + 22 + s * 16), 214, 6)} fill={s < 4 ? c : PAT.paper} stroke={c} strokeWidth={LINE.hair} />
        ))}
        {mine ? (
          <rect x={x + 18} y={236} width={74} height={20} fill="none" stroke={c} strokeWidth={LINE.hair} />
        ) : (
          <circle cx={x + 55} cy={246} r={11} fill="none" stroke={c} strokeWidth={LINE.hair} />
        )}
        <Tag cx={x + 64} cy={300} text={price} w={60} size={15} />
      </g>
    );
  };
  return (
    <Frame
      width={400}
      height={330}
      label="Patent drawing of an AI shopping assistant's pick. Two boxed products sit side by side with identical four-star ratings: the private-label box, at 24 dollars, is ticked and drawn in red. The third-party brand, at 19 dollars, is not. Above them, the open “Why I picked this product” panel praises the private-label product's build quality."
    >
      <PatentDefs id={id} />
      {/* the trace panel */}
      <rect x={14} y={14} width={372} height={136} fill={PAT.paper} {...ink} />
      <path d="M28 34l6 6 6-6" fill="none" {...ink} />
      <text x={50} y={40} fontFamily="var(--font-heading)" fontSize={15} fill={PAT.ink}>
        Why I picked this product
      </text>
      <line x1={14} y1={52} x2={386} y2={52} {...hair} />
      {["The casing is solid and the hinges feel", "well made. Its build quality should hold", "up to daily use better than the rest."].map((t, i) => (
        <text key={i} x={28} y={78 + i * 24} fontFamily="var(--font-heading)" fontStyle="italic" fontSize={15} fill={PAT.ink}>
          {t}
        </text>
      ))}
      <path d="M104 150L96 184" fill="none" {...hair} strokeDasharray="3 3" />
      {box(40, "$24", true)}
      {box(226, "$19", false)}
      <path d={tick(22, 236, 9)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} />
    </Frame>
  );
}

