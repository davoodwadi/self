"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Bug,
  Calculator,
  ChatCircleText,
  CheckCircle,
  CursorClick,
  Database,
  EyeSlash,
  FileText,
  Gear,
  Key,
  Microphone,
  Package,
  Robot,
  Scales,
  Ticket,
  User,
  UsersThree,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 7 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);
const LA = label(13, 600);
const MONO = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 12,
  fontWeight: 400,
} as const;
const MONO_S = { ...MONO, fontSize: 10.5 } as const;

/** Several lines of plate text, one tspan per line. */
function Lines({
  x,
  y,
  lines,
  style = L,
  fill = C.ink,
  dy = 17,
  anchor,
}: {
  x: number;
  y: number;
  lines: string[];
  style?: React.CSSProperties;
  fill?: string;
  dy?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={fill} style={style} textAnchor={anchor}>
      {lines.map((t, i) => (
        <tspan key={i} x={x} dy={i ? dy : 0}>
          {t}
        </tspan>
      ))}
    </text>
  );
}

/** A rounded frame, tinted when it carries the accent. */
function Box({
  x,
  y,
  w,
  h,
  tone = C.ink,
  fill,
  rx = 4,
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  rx?: number;
  dash?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill ?? (tone === C.accent ? C.tint : C.paper)}
      stroke={tone}
      strokeWidth={1.3}
      strokeDasharray={dash}
    />
  );
}

/** A Phosphor icon placed by its centre. */
function Icon({
  as,
  x,
  y,
  size = 34,
  tone = C.ink,
  weight = "duotone",
}: {
  as: React.ElementType;
  x: number;
  y: number;
  size?: number;
  tone?: string;
  weight?: "duotone" | "regular" | "fill";
}) {
  return React.createElement(as, {
    x: x - size / 2,
    y: y - size / 2,
    size,
    weight,
    color: tone,
  });
}

/** A polyline path from points. */
const path = (pts: [number, number][]) =>
  `M${pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L")}`;

/** A window frame with a title bar, the shape every screen on these plates takes. */
function Screen({
  x,
  y,
  w,
  h,
  tone = C.ink,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
}) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} tone={tone} fill={fill ?? C.paper} />
      <line x1={x} y1={y + 16} x2={x + w} y2={y + 16} stroke={tone} strokeWidth={1} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={x + 9 + k * 9} cy={y + 8} r={2.4} fill={C.ink3} />
      ))}
    </g>
  );
}

/** Grey bars standing for lines of source code. */
function CodeLines({
  x,
  y,
  lens,
  dy = 12,
  tone = C.ink3,
}: {
  x: number;
  y: number;
  lens: [number, number][];
  dy?: number;
  tone?: string;
}) {
  return (
    <g>
      {lens.map(([indent, len], i) => (
        <rect key={i} x={x + indent} y={y + i * dy} width={len} height={4} rx={2} fill={tone} opacity={0.55} />
      ))}
    </g>
  );
}

/* --------------------------------------------------------------------------
   Shifting the Bottleneck from Code Generation to Specification and Verification
   -------------------------------------------------------------------------- */

const PHASES = [
  { id: "spec", t: ["specification"], d: 8 },
  { id: "impl", t: ["implementation"], d: 20 },
  { id: "test", t: ["testing"], d: 8 },
  { id: "sec", t: ["security", "review"], d: 4 },
] as const;

export function BottleneckLab() {
  const [s, setS] = useState(5);
  const PX = 15;
  const rest = 20;
  const after = rest + 20 / s;
  const share = Math.round((rest / after) * 100);

  const bar = (y: number, speed: number, lit: boolean) => {
    let x = 0;
    return PHASES.map((p) => {
      const d = p.id === "impl" ? p.d / speed : p.d;
      const w = d * PX;
      const x0 = x;
      x += w;
      const isImpl = p.id === "impl";
      const tone = lit && !isImpl ? C.accent : C.ink;
      return (
        <g key={p.id}>
          <rect
            x={r2(x0)}
            y={y}
            width={r2(w)}
            height={44}
            fill={isImpl ? C.grey : lit ? C.tint : C.paper}
            stroke={tone}
            strokeWidth={1.3}
          />
          {w >= (isImpl ? 110 : 56) && (
            <Lines
              x={r2(x0 + w / 2)}
              y={y + (p.t.length > 1 ? 19 : 27)}
              lines={[...p.t]}
              style={LS}
              fill={tone}
              anchor="middle"
              dy={13}
            />
          )}
        </g>
      );
    });
  };

  // total delivery time against speed-up
  const px0 = 700;
  const px1 = 950;
  const pyB = 220;
  const X = (v: number) => r2(px0 + ((v - 1) / 19) * (px1 - px0));
  const Y = (d: number) => r2(pyB - (d / 40) * 170);
  const curve = Array.from({ length: 77 }, (_, i) => {
    const v = 1 + i / 4;
    return [X(v), Y(rest + 20 / v)] as [number, number];
  });

  return (
    <Plate
      w={960}
      h={300}
      title={`Interactive: drag the code generation speed-up. Before generative AI, one feature takes 40 days: 8 of specification, 20 of implementation, 8 of testing and 4 of security review. With code generation ${s} times faster it takes ${after.toFixed(1)} days, and specification and verification grow from 50 percent to ${share} percent of the time. Delivery never drops below 20 days`}
    >
      <text x={0} y={20} fill={C.ink} style={L}>
        before generative AI
      </text>
      {bar(30, 1, false)}
      <text x={610} y={56} fill={C.ink3} style={LS}>
        40 days
      </text>

      <text x={0} y={110} fill={C.ink} style={L}>
        {`with code generation ${s}× faster`}
      </text>
      {bar(120, s, true)}
      <text x={r2(after * PX + 10)} y={146} fill={C.accent} style={LA}>
        {`${after.toFixed(1)} days`}
      </text>

      <text x={0} y={204} fill={C.ink2} style={L}>
        share of time in specification and verification
      </text>
      <text x={0} y={234} fill={C.ink3} style={LB}>
        50% before
      </text>
      <text x={110} y={234} fill={C.accent} style={label(20, 700)}>
        {`${share}% now`}
      </text>

      {/* total time curve */}
      <text x={px0} y={20} fill={C.ink} style={L}>
        days to deliver one feature
      </text>
      <line x1={px0} y1={pyB} x2={px1} y2={pyB} stroke={C.ink} />
      {[0, 20, 40].map((d) => (
        <text key={d} x={px0 - 8} y={Y(d) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {d}
        </text>
      ))}
      <line x1={px0} y1={Y(20)} x2={px1} y2={Y(20)} stroke={C.ink3} strokeDasharray="5 4" />
      <text x={px1} y={Y(20) + 16} textAnchor="end" fill={C.ink2} style={LS}>
        specification and verification
      </text>
      <path d={path(curve)} fill="none" stroke={C.ink} strokeWidth={1.6} />
      <circle cx={X(s)} cy={Y(after)} r={5.5} fill={C.accent} />
      {[1, 10, 20].map((v) => (
        <text key={v} x={X(v)} y={pyB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {`${v}×`}
        </text>
      ))}

      {/* the knob */}
      <text x={0} y={284} fill={C.ink} style={L}>
        code generation speed-up
      </text>
      <Knob x={200} y={280} len={360} value={s} min={1} max={20} step={1} onChange={setS} label="Code generation speed-up, from 1 to 20 times faster" />
      <text x={590} y={285} fill={C.accent} style={LB}>
        {`${s}×`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Synthesizing Unstructured User Research and Support Logs
   -------------------------------------------------------------------------- */

const CLUSTERS = [
  { cx: 330, cy: 70, lit: true },
  { cx: 452, cy: 180, lit: false },
  { cx: 330, cy: 266, lit: false },
];

const THEMES = [
  { t: "export times out on large reports", v: 2.4 },
  { t: "invoice line items are unclear", v: 0.9 },
  { t: "single sign-on setup fails", v: 0.4 },
];

export function DiscoveryPipeline() {
  const sources = [
    { icon: Microphone, t: ["user interview", "transcripts"], y: 70 },
    { icon: Ticket, t: ["support", "tickets"], y: 150 },
    { icon: ChatCircleText, t: ["session", "feedback"], y: 230 },
  ];
  const dots = CLUSTERS.flatMap((c, k) =>
    Array.from({ length: 14 }, (_, i) => {
      const a = hash(k * 40 + i) * Math.PI * 2;
      const rr = 8 + hash(k * 40 + i + 17) * 34;
      return { x: r2(c.cx + Math.cos(a) * rr * 1.25), y: r2(c.cy + Math.sin(a) * rr * 0.75), lit: c.lit, k, i };
    }),
  );
  const rowY = [60, 186, 266];
  return (
    <Plate
      w={960}
      h={318}
      title="Product discovery pipeline. Interview transcripts, support tickets and session feedback are embedded and clustered into three pain points: export times out on large reports, with 2.4 million dollars of revenue up for renewal, unclear invoice line items with 0.9 million, and single sign-on setup failures with 0.4 million. The top theme links back to a verbatim customer quote from a support ticket and an interview recording"
    >
      {sources.map((s) => (
        <g key={s.y}>
          <Icon as={s.icon} x={22} y={s.y} size={34} />
          <Lines x={50} y={s.y - 4} lines={s.t} style={L} />
          <Arrow x1={168} y1={s.y} x2={240} y2={r2(150 + (s.y - 150) * 0.5)} tone={C.ink3} width={1.3} />
        </g>
      ))}

      <text x={250} y={20} fill={C.ink} style={L}>
        embedding clusters
      </text>
      {CLUSTERS.map((c, k) => (
        <ellipse key={k} cx={c.cx} cy={c.cy} rx={58} ry={38} fill={c.lit ? C.tint : "none"} stroke={c.lit ? C.accent : C.ink3} strokeWidth={1.1} />
      ))}
      {dots.map((d) => (
        <circle key={`${d.k}-${d.i}`} cx={d.x} cy={d.y} r={3.6} fill={d.lit ? C.accent : C.ink3} />
      ))}
      <Arrow x1={392} y1={64} x2={572} y2={60} tone={C.accent} width={1.4} />
      <Arrow x1={514} y1={184} x2={572} y2={186} tone={C.ink3} width={1.3} />
      <Arrow x1={392} y1={266} x2={572} y2={266} tone={C.ink3} width={1.3} />

      <text x={580} y={20} fill={C.ink} style={L}>
        pain point
      </text>
      <text x={812} y={20} fill={C.ink} style={L}>
        revenue up for renewal
      </text>
      {THEMES.map((t, i) => {
        const lit = i === 0;
        const y = rowY[i];
        return (
          <g key={t.t}>
            <Box x={580} y={y - 20} w={218} h={40} tone={lit ? C.accent : C.ink} />
            <text x={592} y={y + 5} fill={lit ? C.accent : C.ink} style={lit ? LA : L}>
              {t.t}
            </text>
            <rect x={812} y={y - 7} width={r2((t.v / 2.4) * 96)} height={14} fill={lit ? C.accent : C.ink3} opacity={lit ? 1 : 0.6} />
            <text x={r2(812 + (t.v / 2.4) * 96 + 8)} y={y + 5} fill={lit ? C.accent : C.ink2} style={lit ? LA : L}>
              {`$${t.v.toFixed(1)}M`}
            </text>
          </g>
        );
      })}

      {/* traceability back to the source record */}
      <path d="M600 80 L600 122 L612 122" fill="none" stroke={C.accent} strokeWidth={1.3} strokeDasharray="3 3" />
      <rect x={612} y={90} width={348} height={64} rx={4} fill={C.paper} stroke={C.accent} strokeWidth={1.1} strokeDasharray="4 3" />
      <Lines
        x={624}
        y={110}
        lines={["“Every time I export the quarterly report", "it just spins and times out.”"]}
        style={{ ...L, fontStyle: "italic" }}
        fill={C.ink}
      />
      <text x={624} y={145} fill={C.ink3} style={LS}>
        support ticket 4127 | interview recording at 12:04
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Divergent Concept Generation and Specification Drafting
   -------------------------------------------------------------------------- */

function Thumb({ x, y, w = 26, h = 18, tone = C.ink3, fill }: { x: number; y: number; w?: number; h?: number; tone?: string; fill?: string }) {
  return (
    <g>
      <rect x={r2(x - w / 2)} y={r2(y - h / 2)} width={w} height={h} rx={2} fill={fill ?? C.paper} stroke={tone} strokeWidth={1} />
      <line x1={r2(x - w / 2 + 4)} y1={r2(y - h / 2 + 5)} x2={r2(x + w / 2 - 8)} y2={r2(y - h / 2 + 5)} stroke={tone} strokeWidth={1.4} />
      <rect x={r2(x - w / 2 + 4)} y={r2(y - 1)} width={r2(w / 2 - 4)} height={r2(h / 2 - 3)} fill={tone} opacity={0.35} />
    </g>
  );
}

export function DoubleDiamond() {
  const ax = 74;
  const mx = 415;
  const bx = 760;
  const cy = 150;
  const H = 120;
  const half = (x: number) => (x <= mx ? ((x - ax) / (mx - ax)) * H : ((bx - x) / (bx - mx)) * H);
  // concepts the model generates, scattered through the divergent half
  const divergent: { x: number; y: number }[] = [];
  for (let i = 0; divergent.length < 26 && i < 400; i++) {
    const x = 130 + hash(i * 2 + 3) * 270;
    const y = cy + (hash(i * 2 + 4) - 0.5) * 2 * H;
    const room = half(x) - 14;
    if (Math.abs(y - cy) > room) continue;
    if (divergent.some((p) => Math.abs(p.x - x) < 32 && Math.abs(p.y - y) < 24)) continue;
    divergent.push({ x: r2(x), y: r2(y) });
  }
  const colA = Array.from({ length: 7 }, (_, i) => cy - 78 + i * 26);
  const colB = [cy - 26, cy, cy + 26];
  return (
    <Plate
      w={960}
      h={310}
      title="Double-diamond design workflow. From a problem statement, a generative model expands the divergent half into many alternative concepts. In the convergent half, a person narrows them against technical and then economic constraints to one concept, which is written into a concise specification with acceptance criteria, a data schema and a success metric"
    >
      <Lines x={0} y={cy - 6} lines={["problem", "statement"]} style={L} />
      <path
        d={`M${ax} ${cy} L${mx} ${cy - H} L${bx} ${cy} L${mx} ${cy + H} Z`}
        fill="none"
        stroke={C.ink3}
        strokeWidth={1.2}
      />
      <line x1={mx} y1={cy - H} x2={mx} y2={cy + H} stroke={C.rule} />
      {divergent.map((p, i) => (
        <Thumb key={i} x={p.x} y={p.y} />
      ))}

      {[
        { x: 520, t: "technical constraints" },
        { x: 660, t: "economic constraints" },
      ].map((c) => (
        <g key={c.x}>
          <line x1={c.x} y1={40} x2={c.x} y2={262} stroke={C.ink} strokeWidth={1.4} strokeDasharray="6 4" />
          <text x={c.x} y={30} textAnchor="middle" fill={C.ink} style={L}>
            {c.t}
          </text>
        </g>
      ))}
      {colA.map((y) => (
        <Thumb key={y} x={462} y={y} />
      ))}
      {colB.map((y) => (
        <Thumb key={y} x={590} y={y} />
      ))}
      <Thumb x={712} y={cy} w={30} h={20} tone={C.accent} fill={C.tint} />
      <Arrow x1={736} y1={cy} x2={786} y2={cy} tone={C.accent} />

      {/* the specification */}
      <text x={796} y={60} fill={C.ink} style={L}>
        specification
      </text>
      <Box x={796} y={70} w={164} h={160} tone={C.accent} fill={C.paper} />
      {["acceptance criteria", "data schema", "success metric"].map((t, i) => (
        <g key={t}>
          <rect x={810} y={96 + i * 40} width={11} height={11} rx={2} fill="none" stroke={C.accent} strokeWidth={1.3} />
          <path d={`M812 ${102 + i * 40} l3 3 l5 -6`} fill="none" stroke={C.accent} strokeWidth={1.5} />
          <text x={830} y={106 + i * 40} fill={C.ink} style={L}>
            {t}
          </text>
          <rect x={830} y={113 + i * 40} width={i === 1 ? 80 : 104} height={3} rx={1.5} fill={C.ink3} opacity={0.4} />
        </g>
      ))}

      <Icon as={Robot} x={176} y={292} size={26} tone={C.ink2} />
      <text x={196} y={297} fill={C.ink} style={LA}>
        divergent exploration
      </text>
      <Icon as={User} x={500} y={292} size={26} tone={C.ink2} />
      <text x={520} y={297} fill={C.ink} style={LA}>
        convergent selection
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Validating Product Hypotheses Before Full Engineering Build
   -------------------------------------------------------------------------- */

export function RiskGrid() {
  const cells = [
    { name: "value risk", q: "Do customers truly want it?", icon: UsersThree, test: "real user behavior", time: "weeks to months", len: 330, lit: false },
    { name: "usability risk", q: "Can users navigate it without confusion?", icon: CursorClick, test: "interactive prototype with test users", time: "hours", len: 26, lit: true },
    { name: "feasibility risk", q: "Can it be built reliably?", icon: Gear, test: "working technical prototype", time: "hours", len: 26, lit: true },
    { name: "viability risk", q: "Does it meet legal, financial and brand rules?", icon: Scales, test: "unit-economics analysis", time: "weeks", len: 220, lit: false },
  ];
  return (
    <Plate
      w={960}
      h={300}
      title="Four product risks. Value risk is tested by real user behavior over weeks to months. Usability risk is tested with an interactive prototype and test users in hours. Feasibility risk is tested with a working technical prototype in hours. Viability risk is tested by unit-economics analysis over weeks. Generative tools shorten only the usability and feasibility tests"
    >
      {cells.map((c, i) => {
        const x = (i % 2) * 490;
        const y = Math.floor(i / 2) * 156;
        const tone = c.lit ? C.accent : C.ink;
        return (
          <g key={c.name}>
            <Box x={x} y={y} w={470} h={144} tone={tone} fill={c.lit ? C.tint : C.paper} />
            <Icon as={c.icon} x={x + 34} y={y + 40} size={32} tone={tone} />
            <text x={x + 64} y={y + 36} fill={tone} style={LB}>
              {c.name}
            </text>
            <text x={x + 64} y={y + 56} fill={C.ink2} style={LS}>
              {c.q}
            </text>
            <line x1={x + 16} y1={y + 76} x2={x + 454} y2={y + 76} stroke={C.rule} />
            <text x={x + 20} y={y + 100} fill={C.ink} style={L}>
              {c.test}
            </text>
            <rect x={x + 20} y={y + 112} width={c.len} height={9} rx={2} fill={c.lit ? C.accent : C.ink3} opacity={c.lit ? 1 : 0.55} />
            <text x={x + 30 + c.len} y={y + 121} fill={c.lit ? C.accent : C.ink2} style={c.lit ? LA : LS}>
              {c.time}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   What Is Vibe Coding?
   -------------------------------------------------------------------------- */

export function VibeVsTraditional() {
  return (
    <Plate
      w={960}
      h={262}
      title="Two ways of building. In traditional software engineering, a person reads and edits the source code directly. In vibe coding, the creator describes a change in a prompt, the model writes code the creator never reads, the running app is checked by eye, and any error message is pasted back into the prompt"
    >
      {/* traditional */}
      <text x={0} y={20} fill={C.ink} style={LB}>
        traditional software engineering
      </text>
      <Icon as={User} x={34} y={146} size={46} />
      <path d="M62 136 L100 106 M62 146 L100 146 M62 156 L100 186" stroke={C.ink3} strokeWidth={1} strokeDasharray="3 3" />
      <Screen x={104} y={36} w={330} h={220} />
      <CodeLines
        x={120}
        y={66}
        dy={15}
        lens={[[0, 120], [14, 180], [14, 140], [28, 200], [28, 0], [14, 60], [0, 30], [0, 0], [0, 140], [14, 210], [14, 120]]}
      />
      <rect x={112} y={124} width={314} height={14} fill={C.grey} />
      <rect x={148} y={128} width={150} height={5} rx={2} fill={C.ink} />
      <line x1={302} y1={122} x2={302} y2={140} stroke={C.ink} strokeWidth={1.6} />

      {/* vibe coding */}
      <text x={510} y={20} fill={C.accent} style={LB}>
        vibe coding
      </text>
      <Icon as={User} x={530} y={74} size={34} tone={C.ink} />
      <Box x={552} y={52} w={176} h={44} rx={10} tone={C.ink} />
      <text x={566} y={79} fill={C.ink} style={L}>
        “add a total for each month”
      </text>

      <Icon as={Robot} x={812} y={74} size={40} tone={C.ink} />
      <Box x={852} y={46} w={104} h={60} tone={C.ink3} fill={C.paper} />
      <CodeLines x={862} y={56} dy={10} lens={[[0, 60], [8, 74], [8, 50], [16, 66], [0, 30]]} />
      <rect x={852} y={46} width={104} height={60} rx={4} fill={C.paper} opacity={0.6} />
      <Icon as={EyeSlash} x={904} y={76} size={26} tone={C.ink2} weight="regular" />

      <Screen x={760} y={142} w={196} h={116} />
      {[30, 52, 40, 70, 58, 84].map((h, i) => (
        <rect key={i} x={784 + i * 26} y={r2(250 - h * 0.85)} width={16} height={r2(h * 0.85)} fill={i === 5 ? C.ink : C.ink3} opacity={i === 5 ? 1 : 0.55} />
      ))}

      <Box x={520} y={182} w={190} h={50} tone={C.ink} />
      <text x={532} y={204} fill={C.ink} style={MONO_S}>
        TypeError:
      </text>
      <text x={532} y={220} fill={C.ink} style={MONO_S}>
        month is undefined
      </text>

      <Arrow x1={734} y1={74} x2={786} y2={74} tone={C.accent} width={1.8} />
      <text x={760} y={64} textAnchor="middle" fill={C.accent} style={LS}>
        describe
      </text>
      <Arrow x1={812} y1={100} x2={836} y2={136} tone={C.accent} width={1.8} />
      <text x={834} y={122} fill={C.accent} style={LS}>
        run and look
      </text>
      <Arrow x1={754} y1={207} x2={716} y2={207} tone={C.accent} width={1.8} />
      <Arrow x1={600} y1={176} x2={600} y2={104} tone={C.accent} width={1.8} />
      <Lines x={612} y={136} lines={["paste the", "error back"]} style={LS} fill={C.accent} dy={14} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Interactive Prototypes Versus Static Wireframes
   -------------------------------------------------------------------------- */

export function WireframeVsPrototype() {
  const rows = [
    { name: "Okonkwo-Ramírez International Freight Ltd.", lane: "Montréal to Halifax", lit: true },
    { name: "Bay Street Bakery", lane: "Toronto to Ottawa", lit: false },
    { name: "Nord Paper", lane: "Québec to Montréal", lit: false },
  ];
  return (
    <Plate
      w={960}
      h={300}
      title="A static wireframe beside an interactive prototype of the same booking screen. The wireframe is grey boxes and a placeholder image that cannot take input. The prototype holds realistic sample records, and a test user's entry exposes two problems the drawing hid: a long customer name that overflows its column, and a delivery date earlier than the pickup date"
    >
      <text x={0} y={20} fill={C.ink} style={LB}>
        static wireframe
      </text>
      <Screen x={0} y={36} w={430} h={256} tone={C.ink3} />
      <rect x={20} y={68} width={180} height={12} rx={2} fill={C.grey} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20} y={98 + i * 30} width={90} height={8} rx={2} fill={C.grey} />
          <rect x={120} y={92 + i * 30} width={290} height={20} rx={2} fill="none" stroke={C.ink3} />
        </g>
      ))}
      <rect x={20} y={190} width={180} height={84} fill="none" stroke={C.ink3} />
      <path d="M20 190 L200 274 M200 190 L20 274" stroke={C.ink3} strokeWidth={1} />
      <rect x={300} y={240} width={110} height={30} rx={3} fill={C.grey} stroke={C.ink3} />

      <text x={500} y={20} fill={C.ink} style={LB}>
        interactive prototype
      </text>
      <Screen x={500} y={36} w={460} h={256} />
      {/* sample records */}
      {rows.map((r, i) => {
        const y = 86 + i * 26;
        return (
          <g key={r.name}>
            <line x1={512} y1={y + 8} x2={948} y2={y + 8} stroke={C.rule} />
            <text x={516} y={y} fill={r.lit ? C.accent : C.ink} style={L}>
              {r.lit ? "Okonkwo-Ramírez Internatio" : r.name}
            </text>
            <text x={760} y={y} fill={C.ink2} style={L}>
              {r.lane}
            </text>
          </g>
        );
      })}
      <rect x={512} y={72} width={240} height={20} fill="none" stroke={C.accent} strokeWidth={1.4} />
      <line x1={752} y1={68} x2={752} y2={96} stroke={C.accent} strokeWidth={1.4} />
      {/* a live entry */}
      <text x={516} y={170} fill={C.ink2} style={LS}>
        pickup
      </text>
      <Box x={516} y={178} w={140} h={26} tone={C.ink} />
      <text x={526} y={196} fill={C.ink} style={L}>
        14 March
      </text>
      <text x={676} y={170} fill={C.ink2} style={LS}>
        delivery
      </text>
      <Box x={676} y={178} w={140} h={26} tone={C.accent} />
      <text x={686} y={196} fill={C.ink} style={L}>
        12 March
      </text>
      <Icon as={CursorClick} x={830} y={200} size={24} tone={C.ink} weight="regular" />
      <rect x={516} y={218} width={430} height={26} rx={3} fill={C.tint} />
      <text x={528} y={236} fill={C.accent} style={LA}>
        Accepted a delivery date before the pickup date
      </text>
      <rect x={836} y={254} width={110} height={28} rx={3} fill={C.ink} />
      <text x={891} y={273} textAnchor="middle" fill={C.paper} style={LA}>
        Book load
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   From Autocomplete Copilots to Autonomous Coding Agents
   -------------------------------------------------------------------------- */

export function ToolEvolution() {
  return (
    <Plate
      w={960}
      h={316}
      title="Three generations of AI coding tools. Autocomplete suggests the next few lines inside the one open file. Conversational chat answers a pasted error message with a code snippet. An autonomous agent edits several files across the whole repository and loops through edit, compile and test until the checks pass"
    >
      {/* 1 autocomplete */}
      <text x={0} y={20} fill={C.ink} style={LB}>
        1 autocomplete
      </text>
      <Screen x={0} y={36} w={290} h={196} />
      <CodeLines x={14} y={64} dy={16} lens={[[0, 110], [14, 160], [14, 120], [28, 140], [28, 0], [14, 0], [0, 0]]} />
      <text x={42} y={136} fill={C.ink} style={MONO}>
        total =
      </text>
      <text x={98} y={136} fill={C.ink3} style={{ ...MONO, fontStyle: "italic" }}>
        price * qty * (1 + tax)
      </text>
      <line x1={97} y1={125} x2={97} y2={140} stroke={C.ink} strokeWidth={1.4} />
      <rect x={96} y={124} width={180} height={18} fill="none" stroke={C.ink3} strokeDasharray="3 3" />

      {/* 2 chat */}
      <text x={334} y={20} fill={C.ink} style={LB}>
        2 conversational chat
      </text>
      <Screen x={334} y={36} w={130} h={196} />
      <CodeLines x={346} y={64} dy={16} lens={[[0, 80], [10, 100], [10, 70], [20, 90], [10, 60], [0, 30], [0, 90], [10, 80], [0, 30]]} />
      <Box x={472} y={36} w={152} h={196} tone={C.ink} />
      <rect x={486} y={50} width={128} height={42} rx={8} fill={C.grey} />
      <text x={496} y={67} fill={C.ink} style={MONO_S}>
        {"KeyError: 'id'"}
      </text>
      <text x={496} y={83} fill={C.ink} style={MONO_S}>
        line 42
      </text>
      <rect x={482} y={104} width={132} height={92} rx={8} fill={C.paper} stroke={C.ink3} />
      <text x={494} y={122} fill={C.ink2} style={LS}>
        The record has no id.
      </text>
      <rect x={492} y={132} width={112} height={54} rx={3} fill={C.grey} />
      <CodeLines x={500} y={142} dy={11} lens={[[0, 80], [8, 70], [8, 50], [0, 40]]} tone={C.ink} />

      {/* 3 agent */}
      <text x={668} y={20} fill={C.accent} style={LB}>
        3 autonomous agent
      </text>
      {[
        { d: 0, t: "src", f: false },
        { d: 1, t: "billing.py", f: true },
        { d: 1, t: "invoice.py", f: true },
        { d: 1, t: "tax.py", f: false },
        { d: 0, t: "tests", f: false },
        { d: 1, t: "test_billing.py", f: true },
        { d: 1, t: "test_tax.py", f: false },
        { d: 0, t: "api", f: false },
        { d: 1, t: "routes.py", f: false },
      ].map((r, i) => (
        <g key={r.t}>
          {r.f && <circle cx={672} cy={52 + i * 20} r={3.5} fill={C.accent} />}
          <text x={682 + r.d * 12} y={56 + i * 20} fill={r.f ? C.accent : r.d ? C.ink2 : C.ink} style={r.d ? MONO_S : { ...MONO_S, fontWeight: 600 }}>
            {r.t}
          </text>
        </g>
      ))}
      <rect x={800} y={36} width={160} height={92} rx={4} fill={C.ink} />
      <text x={812} y={58} fill={C.paper} style={MONO_S}>
        $ pytest
      </text>
      <text x={812} y={78} fill={C.paper} style={MONO_S}>
        41 passed, 1 failed
      </text>
      <text x={812} y={98} fill={C.paper} style={MONO_S}>
        $ pytest
      </text>
      <text x={812} y={118} fill={C.paper} style={MONO_S}>
        42 passed
      </text>
      {/* the loop */}
      {[
        { t: "edit", x: 846, y: 168 },
        { t: "compile", x: 922, y: 168 },
        { t: "test", x: 884, y: 222 },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 30} y={n.y - 13} width={60} height={24} rx={12} fill={C.tint} stroke={C.accent} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={C.accent} style={LA}>
            {n.t}
          </text>
        </g>
      ))}
      <Arrow x1={878} y1={168} x2={890} y2={168} tone={C.accent} width={1.4} />
      <Arrow x1={922} y1={182} x2={904} y2={208} tone={C.accent} width={1.4} />
      <Arrow x1={864} y1={208} x2={848} y2={182} tone={C.accent} width={1.4} />

      {/* scope */}
      {[
        { x: 96, w: 180, t: "the next few lines" },
        { x: 334, w: 290, t: "a pasted snippet and its reply" },
        { x: 668, w: 292, t: "the whole repository" },
      ].map((s, i) => (
        <g key={s.t}>
          <path d={`M${s.x} 252 L${s.x} 260 L${s.x + s.w} 260 L${s.x + s.w} 252`} fill="none" stroke={i === 2 ? C.accent : C.ink3} strokeWidth={1.3} />
          <text x={s.x + s.w / 2} y={284} textAnchor="middle" fill={i === 2 ? C.accent : C.ink2} style={i === 2 ? LA : L}>
            {s.t}
          </text>
        </g>
      ))}
      <text x={0} y={310} fill={C.ink3} style={LS}>
        what the tool sees and changes
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Automated Testing, Verification Loops, and Continuous Refactoring
   -------------------------------------------------------------------------- */

const GATES = [
  { t: "type check", x: 230 },
  { t: "unit tests", x: 390 },
  { t: "integration tests", x: 550 },
  { t: "human review", x: 710 },
];
const FAULTS = 20;

/** Where each of the agent's faulty edits is stopped, for a given test coverage. */
function harness(cov: number) {
  return Array.from({ length: FAULTS }, (_, i) => {
    if (i < 4) return 0;
    if (hash(i * 3 + 1) < cov * 0.85) return 1;
    if (hash(i * 3 + 2) < cov * 0.6) return 2;
    if (hash(i * 3 + 3) < 0.35) return 3;
    return 4;
  });
}

export function HarnessLab() {
  const [cov, setCov] = useState(20);
  const stop = harness(cov / 100);
  const counts = [0, 1, 2, 3, 4].map((g) => stop.filter((s) => s === g).length);
  const cols = [...GATES.map((g) => g.x), 880];
  return (
    <Plate
      w={960}
      h={290}
      title={`Interactive: drag the automated test coverage. An agent makes ${FAULTS} faulty edits. The type check stops ${counts[0]}, unit tests stop ${counts[1]}, integration tests stop ${counts[2]}, human review stops ${counts[3]}, and ${counts[4]} reach production at ${cov} percent coverage`}
    >
      <Icon as={Robot} x={40} y={74} size={44} />
      <text x={0} y={22} fill={C.ink} style={L}>
        {`${FAULTS} faulty edits`}
      </text>
      <line x1={76} y1={74} x2={850} y2={74} stroke={C.ink3} strokeWidth={1.3} />
      <Arrow x1={820} y1={74} x2={850} y2={74} tone={C.ink3} width={1.3} />
      {GATES.map((g) => (
        <g key={g.t}>
          <rect x={g.x - 5} y={48} width={10} height={52} fill={C.ink} />
          <text x={g.x} y={22} textAnchor="middle" fill={C.ink} style={L}>
            {g.t}
          </text>
        </g>
      ))}
      <Box x={856} y={50} w={104} h={48} tone={C.accent} />
      <text x={908} y={79} textAnchor="middle" fill={C.accent} style={LA}>
        production
      </text>

      {cols.map((x, g) => {
        const n = counts[g];
        const lit = g === 4;
        return (
          <g key={g}>
            {Array.from({ length: n }, (_, k) => (
              <circle key={k} cx={x - 27 + (k % 4) * 18} cy={126 + Math.floor(k / 4) * 18} r={6.5} fill={lit ? C.accent : C.ink3} opacity={lit ? 1 : 0.7} />
            ))}
            <text x={x} y={206} textAnchor="middle" fill={lit ? C.accent : C.ink2} style={lit ? label(16, 700) : L}>
              {lit ? `${n} reach it` : `${n} stopped`}
            </text>
          </g>
        );
      })}

      <text x={0} y={266} fill={C.ink} style={L}>
        automated test coverage
      </text>
      <Knob x={200} y={262} len={460} value={cov} min={0} max={95} step={5} onChange={setCov} label="Automated test coverage, from 0 to 95 percent" />
      <text x={690} y={267} fill={C.accent} style={LB}>
        {`${cov}%`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Technical Debt and Codebase Comprehension
   -------------------------------------------------------------------------- */

const MONTHS = 24;

/** Features shipped each month when a share r of generated code is reviewed and refactored. */
function velocity(r: number) {
  const base = 10 + 6 * (1 - r);
  return Array.from({ length: MONTHS + 1 }, (_, t) => base / (1 + 0.06 * Math.pow(1 - r, 1.5) * Math.pow(t, 1.3)));
}
const DISCIPLINED = velocity(1);

export function DebtLab() {
  const [pct, setPct] = useState(0);
  const r = pct / 100;
  const v = velocity(r);
  const total = Math.round(v.slice(1).reduce((a, b) => a + b, 0));
  const totalRef = Math.round(DISCIPLINED.slice(1).reduce((a, b) => a + b, 0));
  const places = 1 + Math.round(11 * (1 - r));
  const x0 = 40;
  const x1 = 600;
  const yB = 230;
  const X = (t: number) => r2(x0 + (t / MONTHS) * (x1 - x0));
  const Y = (f: number) => r2(yB - (f / 16) * 190);
  return (
    <Plate
      w={960}
      h={318}
      title={`Interactive: drag the share of generated code that is reviewed and refactored. At ${pct} percent, the team ships ${v[0].toFixed(1)} features in the first month and ${v[MONTHS].toFixed(1)} in month 24, ${total} features in two years against ${totalRef} for a fully refactored codebase, and one tax-rule change must be made in ${places} ${places === 1 ? "place" : "places"}`}
    >
      <text x={x0} y={20} fill={C.ink} style={L}>
        features shipped per month
      </text>
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} />
      {[0, 5, 10, 15].map((f) => (
        <text key={f} x={x0 - 8} y={Y(f) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {f}
        </text>
      ))}
      {[0, 6, 12, 18, 24].map((t) => (
        <text key={t} x={X(t)} y={yB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {t === 24 ? "month 24" : t}
        </text>
      ))}
      <path d={path(DISCIPLINED.map((f, t) => [X(t), Y(f)]))} fill="none" stroke={C.ink} strokeWidth={1.4} strokeDasharray="6 4" />
      <text x={x1} y={Y(10) - 8} textAnchor="end" fill={C.ink2} style={LS}>
        disciplined, refactored
      </text>
      <path d={path(v.map((f, t) => [X(t), Y(f)]))} fill="none" stroke={C.accent} strokeWidth={2.4} strokeLinejoin="round" />

      {/* the same rule, copied */}
      <text x={660} y={20} fill={C.ink} style={L}>
        places to edit for one tax-rule change
      </text>
      {Array.from({ length: 12 }, (_, i) => (
        <Icon key={i} as={FileText} x={680 + (i % 6) * 40} y={58 + Math.floor(i / 6) * 44} size={32} tone={i < places ? C.accent : C.rule} weight={i < places ? "duotone" : "regular"} />
      ))}
      <text x={660} y={150} fill={C.accent} style={label(22, 700)}>
        {places}
      </text>
      <text x={690} y={150} fill={C.ink2} style={L}>
        {places === 1 ? "shared function" : "copied blocks"}
      </text>

      <text x={660} y={194} fill={C.ink} style={L}>
        features shipped in 24 months
      </text>
      <text x={660} y={224} fill={C.accent} style={label(22, 700)}>
        {total}
      </text>
      <text x={712} y={224} fill={C.ink2} style={L}>
        {`against ${totalRef} when refactored`}
      </text>

      <text x={0} y={290} fill={C.ink} style={L}>
        generated code reviewed and refactored
      </text>
      <Knob x={270} y={286} len={420} value={pct} min={0} max={100} step={10} onChange={setPct} label="Share of generated code reviewed and refactored, from 0 to 100 percent" />
      <text x={720} y={291} fill={C.accent} style={LB}>
        {`${pct}%`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Security Vulnerabilities in Machine-Generated Code
   -------------------------------------------------------------------------- */

export function SecurityFlaws() {
  const code: { t: string; flag?: number }[] = [
    { t: 'import { parse } from "fastjson-parse-utils"', flag: 0 },
    { t: "" },
    { t: 'const PAYMENTS_KEY = "sk_live_4f9a2c81e07b"', flag: 1 },
    { t: "" },
    { t: 'app.get("/invoices/:id", async (req, res) => {' },
    { t: '  const sql = "SELECT * FROM invoices WHERE id=" + req.params.id', flag: 2 },
    { t: "  const rows = await db.query(sql)" },
    { t: "  res.json(rows)", flag: 3 },
    { t: "})" },
  ];
  const notes = [
    { t: "hallucinated package", s: "slopsquatting: an attacker registers this name", lit: true },
    { t: "hardcoded secret", s: "readable in any user's browser", lit: false },
    { t: "SQL injection", s: "query built from unvalidated user text", lit: false },
    { t: "missing authorization check", s: "returns any customer's invoice", lit: false },
  ];
  const Yl = (i: number) => 58 + i * 26;
  return (
    <Plate
      w={960}
      h={300}
      title="A short block of generated server code with four flaws marked. The import names a package that does not exist, which an attacker can register and fill with malware. A live payments key is written into the code. The database query is built by pasting the user's text into SQL. The invoice is returned without checking that it belongs to the signed-in customer"
    >
      <Box x={0} y={30} w={560} h={262} tone={C.ink3} />
      {code.map((c, i) => (
        <g key={i}>
          <text x={24} y={Yl(i)} textAnchor="end" fill={C.ink3} style={MONO_S}>
            {i + 1}
          </text>
          <text x={34} y={Yl(i)} fill={C.ink} style={MONO} xmlSpace="preserve">
            {c.t}
          </text>
          {c.flag !== undefined && (
            <rect x={30} y={Yl(i) - 14} width={524} height={20} rx={2} fill={notes[c.flag].lit ? C.tint : C.grey} opacity={notes[c.flag].lit ? 1 : 0.6} />
          )}
        </g>
      ))}
      {code.map((c, i) =>
        c.flag === undefined ? null : (
          <g key={`n${i}`}>
            <line x1={556} y1={Yl(i) - 4} x2={600} y2={Yl(i) - 4} stroke={notes[c.flag].lit ? C.accent : C.ink3} strokeWidth={1.2} />
            <circle cx={556} cy={Yl(i) - 4} r={3} fill={notes[c.flag].lit ? C.accent : C.ink3} />
          </g>
        ),
      )}
      {code.map((c, i) => {
        if (c.flag === undefined) return null;
        const n = notes[c.flag];
        const tone = n.lit ? C.accent : C.ink;
        return (
          <g key={`t${i}`}>
            <text x={610} y={Yl(i)} fill={tone} style={n.lit ? LB : LA}>
              {n.t}
            </text>
            <text x={610} y={Yl(i) + 17} fill={C.ink2} style={LS}>
              {n.s}
            </text>
          </g>
        );
      })}
      <Icon as={Package} x={900} y={52} size={40} tone={C.accent} />
      <Icon as={Bug} x={920} y={68} size={26} tone={C.accent} weight="fill" />
      <text x={900} y={98} textAnchor="middle" fill={C.ink2} style={LS}>
        malware runs
      </text>
      <text x={900} y={113} textAnchor="middle" fill={C.ink2} style={LS}>
        on install
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Automated Guardrails, Static Analysis, and Sandboxed Execution
   -------------------------------------------------------------------------- */

export function GuardrailPipeline() {
  const gates = [
    { t: ["static security", "testing (SAST)"], x: 230, stops: Bug },
    { t: ["secret", "detection"], x: 400, stops: Key },
    { t: ["dependency", "allowlist"], x: 570, stops: Package },
    { t: ["human", "review"], x: 740, stops: null },
  ];
  return (
    <Plate
      w={960}
      h={286}
      title="A CI/CD pipeline that gates every proposed change. Static security testing stops insecure patterns, secret detection stops hardcoded keys, and the dependency allowlist stops unverified or hallucinated packages before human review and deployment. Below, the coding agent runs its shell commands and tests inside an isolated sandbox with no connection to the production database or live customers"
    >
      <Icon as={Robot} x={24} y={88} size={34} />
      <Icon as={User} x={62} y={88} size={30} tone={C.ink2} />
      <line x1={86} y1={88} x2={868} y2={88} stroke={C.ink} strokeWidth={1.4} />
      <Arrow x1={840} y1={88} x2={870} y2={88} tone={C.ink} width={1.4} />
      <Box x={874} y={66} w={86} h={44} tone={C.ink} />
      <text x={917} y={93} textAnchor="middle" fill={C.ink} style={LA}>
        deploy
      </text>
      {gates.map((g) => (
        <g key={g.x}>
          <Lines x={g.x} y={18} lines={g.t} style={L} anchor="middle" dy={16} />
          <rect x={g.x - 34} y={60} width={68} height={56} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
          <Icon as={CheckCircle} x={g.x} y={88} size={24} tone={C.ink} weight="regular" />
          {g.stops && (
            <g>
              <line x1={g.x} y1={116} x2={g.x} y2={128} stroke={C.ink3} />
              <Icon as={g.stops} x={g.x} y={144} size={26} tone={C.ink3} weight="regular" />
              <path d={`M${g.x - 14} 158 L${g.x + 14} 130`} stroke={C.ink3} strokeWidth={1.6} />
            </g>
          )}
        </g>
      ))}

      {/* sandbox */}
      <rect x={0} y={172} width={520} height={110} rx={8} fill={C.tint} stroke={C.accent} strokeWidth={1.6} strokeDasharray="7 4" />
      <text x={16} y={194} fill={C.accent} style={LA}>
        isolated sandbox
      </text>
      <Icon as={Robot} x={60} y={240} size={44} tone={C.accent} />
      <rect x={110} y={204} width={210} height={70} rx={4} fill={C.ink} />
      <text x={122} y={225} fill={C.paper} style={MONO_S}>
        $ npm install
      </text>
      <text x={122} y={244} fill={C.paper} style={MONO_S}>
        $ npm test
      </text>
      <text x={122} y={263} fill={C.paper} style={MONO_S}>
        $ ./migrate.sh
      </text>
      <line x1={520} y1={228} x2={720} y2={228} stroke={C.ink3} strokeWidth={1.3} strokeDasharray="4 4" />
      <path d="M586 214 L614 242 M614 214 L586 242" stroke={C.ink} strokeWidth={2} />
      <Icon as={Database} x={740} y={228} size={42} tone={C.ink2} />
      <text x={740} y={270} textAnchor="middle" fill={C.ink2} style={LS}>
        production data
      </text>
      <Icon as={UsersThree} x={880} y={228} size={42} tone={C.ink2} />
      <text x={880} y={270} textAnchor="middle" fill={C.ink2} style={LS}>
        live customers
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Citizen Development and the Rise of Domain Builders
   -------------------------------------------------------------------------- */

export function CitizenDev() {
  const tx0 = 590;
  const tx1 = 950;
  const M = (m: number) => r2(tx0 + (m / 6) * (tx1 - tx0));
  return (
    <Plate
      w={960}
      h={300}
      title="Two ways to get a commission calculator. Traditionally, a finance analyst files a request that waits in the central IT backlog, then an engineer learns the domain before building it, about six months in all. With an IT-governed sandbox, the analyst builds it directly in about three days"
    >
      {/* traditional */}
      <text x={0} y={20} fill={C.ink} style={LB}>
        traditional IT backlog
      </text>
      <Icon as={User} x={28} y={80} size={40} />
      <Arrow x1={56} y1={80} x2={98} y2={80} tone={C.ink3} />
      {Array.from({ length: 7 }, (_, i) => (
        <Icon key={i} as={Ticket} x={126 + i * 18} y={80 - (i % 2) * 6} size={30} tone={i === 0 ? C.ink : C.ink3} weight={i === 0 ? "duotone" : "regular"} />
      ))}
      <text x={180} y={118} textAnchor="middle" fill={C.ink2} style={LS}>
        waiting in the backlog
      </text>
      <Arrow x1={264} y1={80} x2={306} y2={80} tone={C.ink3} />
      <Icon as={User} x={330} y={80} size={40} />
      <Icon as={BookOpen} x={366} y={66} size={26} tone={C.ink2} />
      <text x={344} y={118} textAnchor="middle" fill={C.ink2} style={LS}>
        engineer learns the domain
      </text>
      <Arrow x1={400} y1={80} x2={442} y2={80} tone={C.ink3} />
      <Icon as={Calculator} x={470} y={80} size={40} />

      {/* sandbox */}
      <rect x={0} y={156} width={540} height={136} rx={8} fill="none" stroke={C.ink} strokeWidth={1.3} strokeDasharray="7 4" />
      <text x={16} y={180} fill={C.ink} style={LB}>
        IT-governed sandbox
      </text>
      <Icon as={User} x={60} y={236} size={40} tone={C.accent} />
      <Arrow x1={90} y1={236} x2={170} y2={236} tone={C.accent} />
      <Icon as={Calculator} x={200} y={236} size={40} tone={C.accent} />
      <text x={60} y={276} textAnchor="middle" fill={C.ink2} style={LS}>
        domain expert builds
      </text>
      <Icon as={Database} x={340} y={236} size={32} tone={C.ink2} />
      <text x={340} y={276} textAnchor="middle" fill={C.ink2} style={LS}>
        governed data connector
      </text>
      <line x1={226} y1={236} x2={318} y2={236} stroke={C.ink3} strokeDasharray="3 3" />
      <Icon as={Key} x={470} y={236} size={30} tone={C.ink2} />
      <text x={470} y={276} textAnchor="middle" fill={C.ink2} style={LS}>
        single sign-on
      </text>

      {/* time */}
      <text x={tx0} y={20} fill={C.ink} style={L}>
        time until the tool is in use
      </text>
      <rect x={tx0} y={70} width={r2(M(6) - tx0)} height={20} fill={C.ink3} opacity={0.55} />
      <text x={M(6)} y={112} textAnchor="end" fill={C.ink2} style={LA}>
        about 6 months
      </text>
      <rect x={tx0} y={226} width={r2(M(0.1) - tx0)} height={20} fill={C.accent} />
      <text x={r2(M(0.1) + 10)} y={241} fill={C.accent} style={LA}>
        3 days
      </text>
      <line x1={tx0} y1={60} x2={tx0} y2={256} stroke={C.ink} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Tiered Governance: Disposable Tools Versus Core Systems
   -------------------------------------------------------------------------- */

export function TierPyramid() {
  const cx = 230;
  const top = 20;
  const base = 300;
  const hw = 180;
  const edge = (y: number) => (hw * (y - top)) / (base - top);
  const cuts = [top, 113, 206, base];
  const tiers = [
    {
      n: "Tier 3",
      ex: ["customer-facing products,", "financial transactions,", "regulated decisions"],
      ctl: ["full software engineering", "security audits", "formal change control"],
    },
    {
      n: "Tier 2",
      ex: ["shared departmental tools,", "internal dashboards"],
      ctl: ["IT-managed hosting, single sign-on", "role-based data permissions", "peer review"],
    },
    {
      n: "Tier 1",
      ex: ["local formatting scripts,", "interactive UI prototypes"],
      ctl: ["build freely inside approved sandboxes"],
    },
  ];
  return (
    <Plate
      w={960}
      h={306}
      title="A three-tier governance pyramid. The wide base, Tier 1, holds the many personal scripts and prototypes, built freely in approved sandboxes. Tier 2 holds shared departmental tools and dashboards, which need IT-managed hosting, single sign-on, role-based permissions and peer review. The narrow top, Tier 3, holds customer-facing, financial and regulated systems, which need full software engineering, security audits and formal change control. Data sensitivity and user scope rise toward the top"
    >
      <Arrow x1={10} y1={298} x2={10} y2={24} tone={C.accent} width={1.6} />
      <text transform="translate(28 160) rotate(-90)" textAnchor="middle" fill={C.accent} style={LA}>
        data sensitivity, scope, rigor
      </text>
      {tiers.map((t, i) => {
        const y0 = cuts[i];
        const y1 = cuts[i + 1];
        const mid = (y0 + y1) / 2;
        return (
          <g key={t.n}>
            <path
              d={`M${r2(cx - edge(y0))} ${y0} L${r2(cx + edge(y0))} ${y0} L${r2(cx + edge(y1))} ${y1} L${r2(cx - edge(y1))} ${y1} Z`}
              fill={i === 0 ? C.tint : i === 1 ? C.grey : C.paper}
              stroke={C.ink}
              strokeWidth={1.3}
            />
            <text x={cx} y={r2(mid + (i === 0 ? 22 : 6))} textAnchor="middle" fill={C.ink} style={LB}>
              {t.n}
            </text>
            <line x1={430} y1={y1} x2={960} y2={y1} stroke={C.rule} opacity={i === 2 ? 0 : 1} />
            <Lines x={440} y={r2(mid - ((t.ex.length - 1) * 17) / 2 + 4)} lines={t.ex} style={L} fill={C.ink2} />
            {t.ctl.map((c, k) => {
              const y = r2(mid - ((t.ctl.length - 1) * 24) / 2 + k * 24);
              return (
                <g key={c}>
                  <Icon as={CheckCircle} x={672} y={y} size={18} tone={C.accent} weight="fill" />
                  <text x={688} y={y + 4.5} fill={C.ink} style={L}>
                    {c}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Plate>
  );
}
