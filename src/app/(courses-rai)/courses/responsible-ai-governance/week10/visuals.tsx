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
  Segmented,
  Slider,
  r2,
  stip,
} from "../_visuals/kit";
import {
  Figure,
  Sheet,
  SmallModel,
  headAlongPath,
  tick,
} from "../_visuals/objects";

/* ==========================================================================
   WEEK 10 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.

   Week cast: people are patent Figures, an AI system is the model housing
   with two gears (SmallModel), a record or form is a Sheet.
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
const R = PAT.signal;

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
      style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
    >
      {children}
    </text>
  );
}

/**
 * The average user. Above, the users of a speech interface spread along
 * their speech and interaction style: most sit near the middle, a few in the
 * tails. Below, the model's error at each point of that spread: low for the
 * majority, rising in red toward the tails. The slider adds tail users to the
 * training data and the error curve flattens.
 */
export function AverageUser() {
  const [cov, setCov] = useState(2);
  const id = "w10-average";
  const x0 = 110;
  const x1 = 570;
  const X = (z: number) => r2(x0 + ((z + 3) / 6) * (x1 - x0));
  const dBase = 128;
  const dH = 92;
  const eBase = 270;
  const eH = 92;
  const eMax = 50;
  const adapt = (cov - 2) / 28;
  const k = 4 * (1 - 0.85 * adapt);
  const err = (z: number) => 4 + k * z * z;
  const Ye = (e: number) => r2(eBase - (Math.min(e, eMax) / eMax) * eH);
  const zs = Array.from({ length: 61 }, (_, i) => -3 + i * 0.1);
  const density = `M${X(-3)} ${dBase}${zs.map((z) => `L${X(z)} ${r2(dBase - dH * Math.exp((-z * z) / 2))}`).join("")}L${X(3)} ${dBase}Z`;
  const curve = (from: number, to: number) =>
    zs
      .filter((z) => z >= from - 1e-9 && z <= to + 1e-9)
      .map((z, i) => `${i ? "L" : "M"}${X(z)} ${Ye(err(z))}`)
      .join("");
  const tail = err(3);
  return (
    <div>
      <Frame
        width={600}
        height={306}
        label={`Patent drawing of a user distribution and model error. Above, a stippled bell of users spread along speech and interaction style, most near the middle. Below, model error is 4 percent for the majority of observations and rises in red to ${tail.toFixed(0)} percent in the statistical tails, with ${cov} percent tail users in the training data.`}
      >
        <PatentDefs id={id} />
        {/* the users */}
        <path d={density} fill={stip(id, "light")} {...ink} />
        <line x1={x0} y1={dBase} x2={x1} y2={dBase} {...ink} />
        <PatentKey x={x0 - 12} y={dBase - 40} size={12} anchor="end">
          Users
        </PatentKey>
        {/* the tails, through both panels */}
        {[-2, 2].map((z) => (
          <line
            key={z}
            x1={X(z)}
            y1={28}
            x2={X(z)}
            y2={eBase}
            {...hair}
            strokeDasharray="4 3"
          />
        ))}
        <PatentKey x={X(0)} y={dBase + 18} size={12}>
          Majority of observations
        </PatentKey>
        <PatentKey x={X(-2) - 6} y={dBase + 18} size={12} anchor="end">
          Statistical tail
        </PatentKey>
        <PatentKey x={X(2) + 6} y={dBase + 18} size={12} anchor="start">
          Statistical tail
        </PatentKey>
        {/* the error */}
        <line x1={x0} y1={eBase} x2={x1} y2={eBase} {...ink} />
        <line x1={x0} y1={eBase - eH - 4} x2={x0} y2={eBase} {...ink} />
        {[0, 25, 50].map((v) => (
          <g key={v}>
            <line x1={x0 - 5} y1={Ye(v)} x2={x0} y2={Ye(v)} {...ink} />
            <Num x={x0 - 9} y={Ye(v) + 4} size={12} anchor="end">
              {`${v}%`}
            </Num>
          </g>
        ))}
        <PatentKey x={x0 - 40} y={Ye(40) + 4} size={12} anchor="end">
          Model error
        </PatentKey>
        <path d={curve(-2, 2)} fill="none" {...ink} strokeWidth={LINE.bold} />
        <path
          d={curve(-3, -2)}
          fill="none"
          {...ink}
          stroke={R}
          strokeWidth={LINE.bold}
        />
        <path
          d={curve(2, 3)}
          fill="none"
          {...ink}
          stroke={R}
          strokeWidth={LINE.bold}
        />
        <Num x={X(0)} y={Ye(4) - 8} size={15}>
          4%
        </Num>
        <Num x={X(3) + 4} y={Ye(tail) - 8} size={15} anchor="end" fill={R}>
          {`${tail.toFixed(0)}%`}
        </Num>
        <PatentKey x={X(0)} y={eBase + 22} size={12}>
          Speech and interaction style
        </PatentKey>
      </Frame>
      <Slider
        label="Tail users in the training data"
        value={cov}
        min={2}
        max={30}
        onChange={setCov}
        formatValue={(v) => `${v}%`}
      />
    </div>
  );
}

/** A hearing aid hooked behind the ear of a right-facing Figure at (x, y), scale s. */
function HearingAid({ x, y, s }: { x: number; y: number; s: number }) {
  const ex = x - 3 * s;
  const ey = y - 74 * s;
  return (
    <path
      d={`M${r2(ex + 1 * s)} ${r2(ey - 5 * s)}Q${r2(ex - 6 * s)} ${r2(ey - 6 * s)} ${r2(ex - 5 * s)} ${r2(ey + 2 * s)}Q${r2(ex - 4.5 * s)} ${r2(ey + 6 * s)} ${r2(ex + 0.5 * s)} ${r2(ey + 5 * s)}`}
      fill="none"
      stroke={PAT.ink}
      strokeWidth={2.4}
      strokeLinecap="round"
    />
  );
}

/** A round speaker grille: a rim with rows of holes. */
function Grille({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const holes: React.ReactNode[] = [];
  const step = r / 2.6;
  for (let i = -2; i <= 2; i++)
    for (let j = -2; j <= 2; j++) {
      const hx = cx + i * step;
      const hy = cy + j * step;
      if (Math.hypot(hx - cx, hy - cy) < r - 3)
        holes.push(
          <circle
            key={`${i}${j}`}
            cx={r2(hx)}
            cy={r2(hy)}
            r={1.2}
            fill={PAT.ink}
          />,
        );
    }
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAT.paper} {...ink} />
      {holes}
    </g>
  );
}

/**
 * The social model of disability. A deaf customer, hearing aid behind the
 * ear, stands at a voice-only banking kiosk: a speaker grille and a
 * microphone, its spoken prompts drawn in red stopping at the customer. Beside
 * it, the same customer at a multimodal kiosk with a text screen, a keypad
 * and a speaker, reaching to type.
 */
export function SocialModel() {
  const id = "w10-social";
  const g = 214;
  const s = 1.5;
  return (
    <Frame
      width={600}
      height={252}
      label="Patent drawing of two banking kiosks. Left, a deaf customer with a hearing aid faces a voice-only kiosk with only a speaker grille and a microphone. Its spoken prompts, drawn in red, stop at the customer. Right, the same customer reaches to type on a multimodal kiosk with a text screen, a keypad and a speaker."
    >
      <PatentDefs id={id} />
      <line x1={14} y1={g} x2={586} y2={g} {...ink} />
      {/* voice-only */}
      <Figure id={id} x={92} y={g} s={s} />
      <HearingAid x={92} y={g} s={s} />
      <ObliqueBox id={id} x={162} y={64} w={86} h={g - 64} dx={12} dy={7} />
      <Grille cx={205} cy={104} r={20} />
      <rect
        x={193}
        y={140}
        width={24}
        height={9}
        rx={4.5}
        fill={PAT.paper}
        {...ink}
      />
      {[197, 201, 205, 209, 213].map((x) => (
        <line key={x} x1={x} y1={142.5} x2={x} y2={146.5} {...hair} />
      ))}
      {[14, 23, 32].map((rr) => (
        <path
          key={rr}
          d={`M${r2(158 - rr * 0.5)} ${r2(104 - rr * 0.86)}A${rr} ${rr} 0 0 0 ${r2(158 - rr * 0.5)} ${r2(104 + rr * 0.86)}`}
          fill="none"
          stroke={R}
          strokeWidth={LINE.bold}
          strokeLinecap="round"
        />
      ))}
      <FigureName x={170} y={242} size={14}>
        voice-only interface
      </FigureName>
      {/* multimodal */}
      <Figure id={id} x={402} y={g} s={s} arm="reach" />
      <HearingAid x={402} y={g} s={s} />
      <ObliqueBox id={id} x={450} y={64} w={96} h={g - 64} dx={12} dy={7} />
      <rect x={460} y={76} width={76} height={50} fill={PAT.paper} {...ink} />
      {[88, 98, 108].map((y, i) => (
        <line
          key={y}
          x1={468}
          y1={y}
          x2={i === 2 ? 504 : 526}
          y2={y}
          {...hair}
        />
      ))}
      <rect x={468} y={114} width={20} height={7} fill={PAT.paper} {...hair} />
      {Array.from({ length: 9 }, (_, i) => (
        <rect
          key={i}
          x={466 + (i % 3) * 15}
          y={138 + Math.floor(i / 3) * 13}
          width={11}
          height={9}
          fill={PAT.paper}
          {...hair}
        />
      ))}
      <Grille cx={524} cy={156} r={11} />
      <FigureName x={470} y={242} size={14}>
        multimodal interface
      </FigureName>
    </Frame>
  );
}

/** A seated person in a wheelchair, facing right, with the wheel's ground contact at the origin. */
function Wheelchair({ id }: { id: string }) {
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return (
      <line
        key={i}
        x1={r2(-Math.cos(a) * 16)}
        y1={r2(-18 - Math.sin(a) * 16)}
        x2={r2(Math.cos(a) * 16)}
        y2={r2(-18 + Math.sin(a) * 16)}
        {...hair}
      />
    );
  });
  return (
    <g>
      {/* frame */}
      <path d="M-12 -54L-8 -26H18L26 -8H34" fill="none" {...ink} />
      <path d="M-12 -54H-21" fill="none" {...ink} />
      <circle cx={28} cy={-4} r={4} fill={PAT.paper} {...ink} />
      {/* person */}
      <path
        d="M-8 -28L10 -28L6 -60Q-2 -64 -10 -60Z"
        fill={stip(id, "light")}
        {...ink}
      />
      <path d="M0 -36H24V-27H0Z" fill={stip(id, "dense")} {...ink} />
      <path d="M17 -36H26L29 -11H21Z" fill={stip(id, "dense")} {...ink} />
      <path d="M21 -11H34V-8H21Z" fill={PAT.paper} {...ink} />
      <path d="M-2 -57L4 -58L12 -31L7 -29Z" fill={PAT.paper} {...ink} />
      <circle cx={-1} cy={-71} r={7} fill={PAT.paper} {...ink} />
      {/* wheel */}
      <circle cx={0} cy={-18} r={18} fill="none" {...ink} />
      <circle cx={0} cy={-18} r={14.5} fill="none" {...hair} />
      {spokes}
      <circle cx={0} cy={-18} r={2} fill={PAT.ink} />
    </g>
  );
}

/**
 * The curb-cut effect, in profile. A sidewalk drops to the street by a
 * ramp cut into the curb. A traveler pulling luggage and a parent pushing a
 * stroller come along the sidewalk, a wheelchair user rolls down the ramp, and
 * a delivery worker rolling a cart is already on the street.
 */
export function CurbCut() {
  const id = "w10-curb";
  const top = 150;
  const st = 192;
  const rA = 380;
  const rB = 500;
  const dx = 16;
  const dy = 10;
  const front = `M40 ${top}H${rA}L${rB} ${st}H700V210H40Z`;
  const face = (a: [number, number], b: [number, number]) =>
    `M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${b[0] + dx} ${b[1] - dy}L${a[0] + dx} ${a[1] - dy}Z`;
  const slope = (st - top) / (rB - rA);
  const angle = r2((Math.atan(slope) * 180) / Math.PI);
  const onRamp = (x: number) => r2(top + (x - rA) * slope - 5);
  return (
    <Frame
      width={800}
      height={196}
      label="Patent drawing of a sidewalk curb cut in profile. A raised sidewalk drops to the street by a ramp cut into the curb. A traveler pulling luggage and a parent pushing a stroller walk along the sidewalk toward the ramp, a wheelchair user rolls down it, and a delivery worker rolling a cart of boxes is already on the street."
    >
      <PatentDefs id={id} />
      <g transform="translate(-34 -62) scale(1.16)">
        <path
          d={face([40, top], [rA, top])}
          fill={stip(id, "light")}
          {...ink}
        />
        <path d={face([rA, top], [rB, st])} fill={stip(id, "light")} {...ink} />
        <path d={face([rB, st], [700, st])} fill={stip(id, "light")} {...ink} />
        <path d={front} fill={PAT.paper} {...ink} />
        <path
          d={`M${rA} ${top}L${rB} ${st}`}
          fill="none"
          {...ink}
          strokeWidth={LINE.bold}
        />
        <line x1={34} y1={216} x2={716} y2={216} {...hair} />
        {/* traveler pulling luggage */}
        <Figure id={id} x={110} y={top - 4} />
        <path d={`M96 ${top - 40}L80 ${top - 30}`} fill="none" {...ink} />
        <rect
          x={60}
          y={top - 34}
          width={24}
          height={26}
          rx={2}
          fill={stip(id, "light")}
          {...ink}
        />
        <line x1={64} y1={top - 28} x2={80} y2={top - 28} {...hair} />
        <circle cx={65} cy={top - 6} r={2} fill={PAT.paper} {...ink} />
        <circle cx={79} cy={top - 6} r={2} fill={PAT.paper} {...ink} />
        {/* parent pushing a stroller */}
        <Figure id={id} x={214} y={top - 4} arm="reach" />
        <path d={`M244 ${top - 55}L256 ${top - 30}`} fill="none" {...ink} />
        <path
          d={`M254 ${top - 30}Q256 ${top - 14} 270 ${top - 14}H286Q294 ${top - 16} 292 ${top - 30}Z`}
          fill={PAT.paper}
          {...ink}
        />
        <path
          d={`M254 ${top - 30}Q254 ${top - 52} 274 ${top - 50}L276 ${top - 30}`}
          fill={stip(id, "light")}
          {...ink}
        />
        <path
          d={`M264 ${top - 14}L262 ${top - 9}M284 ${top - 14}L286 ${top - 9}`}
          fill="none"
          {...ink}
        />
        <circle cx={262} cy={top - 7} r={3} fill={PAT.paper} {...ink} />
        <circle cx={286} cy={top - 7} r={3} fill={PAT.paper} {...ink} />
        {/* wheelchair user on the ramp */}
        <g transform={`translate(440 ${onRamp(440)}) rotate(${angle})`}>
          <Wheelchair id={id} />
        </g>
        {/* delivery worker rolling a cart */}
        <Figure id={id} x={620} y={st - 4} arm="reach" />
        <path d={`M650 ${st - 55}L662 ${st - 12}H704`} fill="none" {...ink} />
        <circle cx={668} cy={st - 8} r={4} fill={PAT.paper} {...ink} />
        <circle cx={698} cy={st - 8} r={4} fill={PAT.paper} {...ink} />
        <ObliqueBox id={id} x={666} y={st - 42} w={32} h={30} dx={8} dy={5} />
        <ObliqueBox id={id} x={669} y={st - 68} w={26} h={26} dx={8} dy={5} />
      </g>
    </Frame>
  );
}

/** A wall calendar page: a binding strip and a grid of days, one ringed. */
function CalendarPage({
  id,
  x,
  y,
  w = 40,
  h = 36,
}: {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
}) {
  const cw = w / 5;
  const ch = (h - 9) / 4;
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={5} dy={3} />
      <line x1={x} y1={y + 8} x2={x + w} y2={y + 8} {...ink} />
      {Array.from({ length: 4 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={r2(x + cw * (i + 1))}
          y1={y + 8}
          x2={r2(x + cw * (i + 1))}
          y2={y + h}
          {...hair}
        />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <line
          key={`h${i}`}
          x1={x}
          y1={r2(y + 8 + ch * (i + 1))}
          x2={x + w}
          y2={r2(y + 8 + ch * (i + 1))}
          {...hair}
        />
      ))}
    </g>
  );
}

/**
 * The timing gap, on two time lines that share the moment comprehension
 * breaks down and the assessment moment. Along the traditional accommodation,
 * a diagnosis disclosure form and a scheduling calendar come first, and the
 * accommodation arrives in red after the assessment. Along AI formative
 * support, the support sits at the breakdown itself.
 */
export function TimingGap() {
  const id = "w10-timing";
  const xs = 196;
  const xb = 218;
  const xa = 506;
  const xr = 590;
  const y1 = 104;
  const y2 = 196;
  const axis = (y: number) => (
    <g>
      <line x1={xs} y1={y} x2={636} y2={y} {...ink} />
      <path d={headAlongPath(640, y, 1, 0, 8)} fill="none" {...ink} />
    </g>
  );
  return (
    <Frame
      width={652}
      height={222}
      label="Patent drawing of two time lines sharing the moment comprehension breaks down and the assessment moment. Along the traditional accommodation, a diagnosis disclosure form and a human scheduling calendar come first, and the accommodation arrives in red after the assessment. Along AI formative support, the support sits at the moment comprehension breaks down."
    >
      <PatentDefs id={id} />
      {/* shared moments */}
      <line x1={xb} y1={30} x2={xb} y2={y2 + 6} {...hair} strokeDasharray={CENTRE_DASH} />
      <line x1={xa} y1={30} x2={xa} y2={y2 + 6} {...hair} strokeDasharray={CENTRE_DASH} />
      <PatentKey x={xb} y={20} size={13}>
        Comprehension breaks down
      </PatentKey>
      <PatentKey x={xa} y={20} size={13}>
        Assessment
      </PatentKey>
      {/* traditional accommodation */}
      <FigureName x={16} y={y1 + 5} anchor="start" size={14}>
        traditional accommodation
      </FigureName>
      {axis(y1)}
      <Sheet id={id} x={270} y={y1 - 6} w={36} d={14} sk={12} lines={3} />
      <PatentKey x={294} y={y1 + 22} size={13}>
        Diagnosis disclosure
      </PatentKey>
      <CalendarPage id={id} x={412} y={y1 - 42} />
      <PatentKey x={434} y={y1 + 22} size={13}>
        Human scheduling
      </PatentKey>
      <path d={`M${xa} ${y1 - 34}V${y1 - 40}H${xr}V${y1 - 34}`} fill="none" stroke={R} strokeWidth={LINE.outline} />
      <Sheet id={id} x={xr - 20} y={y1 - 6} w={36} d={14} sk={12} lines={3} stroke={R} sw={LINE.bold} />
      <PatentKey x={xr + 4} y={y1 + 22} size={13} fill={R}>
        Accommodation
      </PatentKey>
      {/* formative support */}
      <FigureName x={16} y={y2 + 5} anchor="start" size={14}>
        AI formative support
      </FigureName>
      {axis(y2)}
      <SmallModel id={id} x={xb + 8} y={y2 - 40} w={40} h={36} />
    </Frame>
  );
}

/**
 * Complementarity: decision accuracy as four stippled columns. The human
 * alone, the AI alone, a naive human-AI team (red) that falls short of the
 * AI alone, and a team designed around asymmetric strengths, the only column
 * above the dashed line at the better of the two alone.
 */
export function Complementarity() {
  const id = "w10-team";
  const base = 226;
  const H = 190;
  const lo = 50;
  const hi = 90;
  const x0 = 70;
  const cols = [
    { key: "Human alone", v: 71 },
    { key: "AI alone", v: 79 },
    { key: "Naive team", v: 74, red: true },
    { key: "Designed team", v: 86 },
  ];
  const Y = (v: number) => r2(base - ((v - lo) / (hi - lo)) * H);
  return (
    <Frame
      width={520}
      height={262}
      label="Patent drawing of decision accuracy as four stippled columns on an axis from 50 to 90 percent: human alone 71 percent, AI alone 79 percent, a naive human-AI team 74 percent in red, and a team designed around asymmetric strengths 86 percent, the only column above the dashed line at the AI alone."
    >
      <PatentDefs id={id} />
      <PatentKey x={x0 - 8} y={18} size={12} anchor="start">
        Decision accuracy
      </PatentKey>
      <line x1={x0 - 8} y1={26} x2={x0 - 8} y2={base} {...ink} />
      {[50, 70, 90].map((v) => (
        <g key={v}>
          <line x1={x0 - 13} y1={Y(v)} x2={x0 - 8} y2={Y(v)} {...ink} />
          <Num x={x0 - 17} y={Y(v) + 4} size={12} anchor="end">
            {`${v}%`}
          </Num>
        </g>
      ))}
      <line x1={x0 - 8} y1={base} x2={506} y2={base} {...ink} />
      <line x1={x0 - 8} y1={Y(79)} x2={506} y2={Y(79)} {...ink} strokeDasharray="5 3" />
      {cols.map((c, i) => {
        const x = x0 + 8 + i * 106;
        return (
          <g key={c.key}>
            <ObliqueBox
              id={id}
              x={x}
              y={Y(c.v)}
              w={62}
              h={r2(base - Y(c.v))}
              dx={12}
              dy={7}
              top={c.red ? stip(id, "signal") : undefined}
              side={c.red ? stip(id, "signal") : undefined}
              stroke={c.red ? R : PAT.ink}
            />
            <Num x={x + 31} y={Y(c.v) + 22} size={16} fill={c.red ? R : PAT.ink}>
              {`${c.v}%`}
            </Num>
            <PatentKey x={x + 31} y={base + 22} size={12} fill={c.red ? R : PAT.ink}>
              {c.key}
            </PatentKey>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Alert fatigue. As false-positive alarms per shift grow, the share of alerts
 * an operator actually inspects falls (an operator inspects about 50 alerts
 * a shift). Five genuine cases arrive among the alarms in every shift: those
 * that fall outside the inspected share pass through unexamined, in red.
 */
export function AlertFatigue() {
  const [alarms, setAlarms] = useState(200);
  const id = "w10-alert";
  const cap = 50;
  const share = (a: number) => Math.min(1, cap / a);
  const x0 = 90;
  const x1 = 380;
  const base = 210;
  const top = 50;
  const X = (a: number) => r2(x0 + (a / 400) * (x1 - x0));
  const Y = (s: number) => r2(base - s * (base - top));
  const s = share(alarms);
  const missed = Math.round(5 * (1 - s));
  const pts = Array.from({ length: 40 }, (_, i) => 10 + i * 10);
  const curve = pts
    .map((a, i) => `${i ? "L" : "M"}${X(a)} ${Y(share(a))}`)
    .join("");
  return (
    <div>
      <Frame
        width={600}
        height={272}
        label={`Patent drawing of alert fatigue. A curve shows the share of alerts operators inspect falling as false-positive alarms per shift grow. At ${alarms} alarms per shift, ${Math.round(s * 100)} percent are inspected. Of five genuine cases in the shift, ${5 - missed} are examined and ${missed} pass through unexamined, in red.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={top - 6} x2={x0} y2={base} {...ink} />
        <line x1={x0} y1={base} x2={x1 + 6} y2={base} {...ink} />
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <line
              x1={x0 - 5}
              y1={Y(v / 100)}
              x2={x0}
              y2={Y(v / 100)}
              {...ink}
            />
            <Num x={x0 - 9} y={Y(v / 100) + 4} size={12} anchor="end">
              {`${v}%`}
            </Num>
          </g>
        ))}
        {[0, 200, 400].map((a) => (
          <Num key={a} x={X(a)} y={base + 18} size={12}>
            {a}
          </Num>
        ))}
        <PatentKey x={x0} y={top - 16} size={12} anchor="start">
          Alerts inspected
        </PatentKey>
        <PatentKey x={x1 + 6} y={base + 38} size={12} anchor="end">
          False-positive alarms per shift
        </PatentKey>
        <path d={curve} fill="none" {...ink} strokeWidth={LINE.bold} />
        <line
          x1={X(alarms)}
          y1={Y(s)}
          x2={X(alarms)}
          y2={base}
          {...hair}
          strokeDasharray="3 3"
        />
        <circle cx={X(alarms)} cy={Y(s)} r={4.5} fill={PAT.paper} {...ink} />
        <Num x={r2(X(alarms) + 10)} y={r2(Y(s) - 9)} size={16} anchor="start">
          {`${Math.round(s * 100)}%`}
        </Num>
        {/* the genuine cases */}
        <PatentKey x={500} y={36} size={12}>
          Genuine cases
        </PatentKey>
        {Array.from({ length: 5 }, (_, i) => {
          const miss = i >= 5 - missed;
          const y = 66 + i * 30;
          return (
            <g key={i}>
              <Sheet
                id={id}
                x={452}
                y={y}
                w={70}
                d={12}
                sk={14}
                lines={2}
                stroke={miss ? R : PAT.ink}
                sw={miss ? LINE.bold : LINE.outline}
                fill={miss ? stip(id, "signal") : PAT.paper}
              />
              {miss ? null : (
                <path
                  d={tick(554, y - 6, 7)}
                  fill="none"
                  {...ink}
                  strokeWidth={LINE.bold}
                />
              )}
            </g>
          );
        })}
        <Num x={444} y={232} size={14} anchor="start">
          {`${5 - missed} examined`}
        </Num>
        <Num x={444} y={252} size={14} anchor="start" fill={R}>
          {`${missed} unexamined`}
        </Num>
      </Frame>
      <Slider
        label="False-positive alarms per shift"
        value={alarms}
        min={20}
        max={400}
        step={20}
        onChange={setAlarms}
      />
    </div>
  );
}

/**
 * A review screen with cognitive forcing. Left, the case facts and the
 * reviewer's provisional assessment. Right, the model panel: shuttered until
 * a provisional assessment is recorded, then showing the model's score with
 * its predictive dispersion (red when consensus is low) and the strongest
 * evidence for approval and for rejection.
 */
export function ForcingScreen() {
  const [call, setCall] = useState<"none" | "approve" | "reject">("none");
  const id = "w10-forcing";
  const open = call !== "none";
  const s0 = 238;
  const s1 = 424;
  const S = (v: number) => r2(s0 + v * (s1 - s0));
  const radio = (x: number, y: number, on: boolean, text: string) => (
    <g>
      <circle cx={x} cy={y - 4} r={6} fill={PAT.paper} {...ink} />
      {on ? <circle cx={x} cy={y - 4} r={3} fill={PAT.ink} /> : null}
      <PatentKey x={x + 12} y={y} size={13} anchor="start">
        {text}
      </PatentKey>
    </g>
  );
  return (
    <div>
      <Frame
        width={480}
        height={252}
        label={
          open
            ? `Patent drawing of a loan review screen. The reviewer has recorded a provisional assessment to ${call}. The model panel now shows a score of 0.56 with a wide red dispersion band from 0.38 to 0.74 flagged as low consensus, and the strongest evidence for approval (stable income, on-time payments) beside the strongest evidence for rejection (high debt load, thin credit file).`
            : "Patent drawing of a loan review screen. The reviewer reads the case facts at left, and no provisional assessment is recorded yet. The model panel at right is shuttered and its score withheld."
        }
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={10} y={22} w={448} h={222} dx={12} dy={7} />
        <rect x={20} y={32} width={428} height={202} fill={PAT.paper} {...ink} />
        <line x1={214} y1={42} x2={214} y2={224} {...hair} />
        {/* case facts and provisional assessment */}
        <PatentKey x={34} y={60} size={13} anchor="start">
          Case facts
        </PatentKey>
        {[82, 98, 114, 130].map((y, i) => (
          <line key={y} x1={34} y1={y} x2={i === 3 ? 140 : 198} y2={y} {...hair} />
        ))}
        <PatentKey x={34} y={172} size={13} anchor="start">
          Provisional assessment
        </PatentKey>
        {radio(42, 204, call === "approve", "Approve")}
        {radio(126, 204, call === "reject", "Reject")}
        {/* the model panel */}
        {open ? (
          <g>
            <PatentKey x={228} y={60} size={13} anchor="start">
              Model score
            </PatentKey>
            <rect x={S(0.38)} y={90} width={r2(S(0.74) - S(0.38))} height={12} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} />
            <line x1={s0} y1={96} x2={s1} y2={96} {...ink} />
            {[0, 0.5, 1].map((v) => (
              <g key={v}>
                <line x1={S(v)} y1={92} x2={S(v)} y2={100} {...ink} />
                <Num x={S(v)} y={118} size={12}>
                  {v}
                </Num>
              </g>
            ))}
            <circle cx={S(0.56)} cy={96} r={4.5} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
            <Num x={S(0.56)} y={82} size={15}>
              0.56
            </Num>
            <PatentKey x={S(0.56)} y={138} size={13} fill={R}>
              Low consensus
            </PatentKey>
            <line x1={228} y1={150} x2={436} y2={150} {...hair} />
            <PatentKey x={228} y={172} size={13} anchor="start">
              For approval
            </PatentKey>
            <PatentKey x={346} y={172} size={13} anchor="start">
              For rejection
            </PatentKey>
            {["Stable income", "On-time payments"].map((t, i) => (
              <PatentKey key={t} x={228} y={196 + i * 20} size={12} anchor="start">
                {t}
              </PatentKey>
            ))}
            {["High debt load", "Thin credit file"].map((t, i) => (
              <PatentKey key={t} x={346} y={196 + i * 20} size={12} anchor="start">
                {t}
              </PatentKey>
            ))}
          </g>
        ) : (
          <g>
            <rect x={224} y={42} width={214} height={182} fill={stip(id, "dense")} {...ink} />
            <rect x={258} y={115} width={146} height={36} fill={PAT.paper} {...ink} />
            <PatentKey x={331} y={138} size={13}>
              Model score withheld
            </PatentKey>
          </g>
        )}
      </Frame>
      <Segmented
        label="Provisional assessment"
        options={[
          { id: "none", label: "Not recorded" },
          { id: "approve", label: "Approve" },
          { id: "reject", label: "Reject" },
        ]}
        value={call}
        onChange={setCall}
      />
    </div>
  );
}

/**
 * Arnstein's ladder adapted to AI design: a ladder of eight rungs in three
 * bands. The bottom rungs, non-participation and extraction, are bracketed in
 * red. Above them tokenistic consultation, and at the top partnership and
 * co-design, where participants hold veto authority.
 */
export function Ladder() {
  const id = "w10-ladder";
  const rungY = (i: number) => 282 - i * 34;
  const band = (from: number, to: number, keys: string[], red = false) => {
    const yb = rungY(from) + 10;
    const yt = rungY(to) - 8;
    const c = red ? R : PAT.ink;
    return (
      <g>
        <path d={`M132 ${yb}H140V${yt}H132`} fill="none" stroke={c} strokeWidth={LINE.outline} strokeLinejoin="round" />
        {keys.map((k, j) => (
          <PatentKey key={k} x={154} y={r2((yb + yt) / 2 + 5 + (j - (keys.length - 1) / 2) * 20)} size={15} anchor="start" fill={c}>
            {k}
          </PatentKey>
        ))}
      </g>
    );
  };
  return (
    <Frame
      width={420}
      height={316}
      label="Patent drawing of a ladder of participation in AI design with eight rungs in three bands: non-participation and extraction at the bottom, bracketed in red, tokenism and surface consultation in the middle, and partnership and co-design with veto authority at the top."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={302} x2={150} y2={302} {...ink} />
      {Array.from({ length: 8 }, (_, i) => (
        <ObliqueBox key={i} id={id} x={42} y={rungY(i)} w={58} h={5} dx={8} dy={5} />
      ))}
      <ObliqueBox id={id} x={30} y={20} w={10} h={282} dx={8} dy={5} />
      <ObliqueBox id={id} x={100} y={20} w={10} h={282} dx={8} dy={5} />
      {band(0, 1, ["Non-participation", "and extraction"], true)}
      {band(2, 4, ["Tokenism and surface", "consultation"])}
      {band(5, 7, ["Partnership and co-design", "with veto authority"])}
    </Frame>
  );
}
