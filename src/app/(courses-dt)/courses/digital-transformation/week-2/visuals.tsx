/* ==========================================================================
   Week 2 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, on top of the course kit and objects:
     · Table    — a structured record set: rows and columns, ink header row
     · the unstructured kinds, one icon each, always the same weight:
       Image (photo), Envelope (email), FilmStrip (video),
       ChatCircle (social post), Globe (web page), Pulse (raw sensor signal)
     · Database — stored data (hand-drawn cylinder)
     · Person   — every human (course object)
     · Coins    — value gained (course object, SIGNAL)
   Every coordinate is a literal or rounded, so server and client match.
   ========================================================================== */

import React from "react";
import {
  Image as Photo,
  Envelope,
  FilmStrip,
  ChatCircle,
  Globe,
  Pulse,
  MagnifyingGlass,
  Timer,
  Gear,
  Lightbulb,
  Broadcast,
  Tray,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import { CREAM, INK, SIGNAL, COUNTER_FILL, r2, Plate, Monitor, MiniScreen, Arrow, Pointer } from "../_visuals/kit";
import { Shop, Coins, Person } from "../_visuals/objects";

/* -- cast: Table (structured data), origin top-left ----------------------- */

export function Table({
  x,
  y,
  w,
  h,
  rows = 4,
  cols = 3,
  tone = INK,
  lit,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rows?: number;
  cols?: number;
  tone?: string;
  /** a body row (0-based) whose cells are filled SIGNAL: the record found */
  lit?: number;
}) {
  // a solid block; body cells cut out as cream, header row left solid
  const g = Math.max(2, r2(w / 40));
  const head = r2(h / (rows + 1));
  const cw = r2((w - g * (cols + 1)) / cols);
  const ch = r2((h - head - g * (rows + 1)) / rows);
  let holes = "";
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const cx = r2(x + g + c * (cw + g));
      const cy = r2(y + head + g + r * (ch + g));
      holes += ` M ${cx} ${cy} H ${r2(cx + cw)} V ${r2(cy + ch)} H ${cx} Z`;
    }
  return (
    <g>
      <path d={`M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z${holes}`} fill={tone} fillRule="evenodd" />
      {lit !== undefined &&
        Array.from({ length: cols }, (_, c) => (
          <rect
            key={c}
            x={r2(x + g + c * (cw + g))}
            y={r2(y + head + g + lit * (ch + g))}
            width={cw}
            height={ch}
            fill={SIGNAL}
          />
        ))}
    </g>
  );
}

/* -- cast: the unstructured kinds (one icon each, centred on cx, cy) ------ */

export type Kind = "photo" | "email" | "video" | "post" | "web" | "signal";
const KIND_ICON = { photo: Photo, email: Envelope, video: FilmStrip, post: ChatCircle, web: Globe, signal: Pulse };

export function Unit({
  kind,
  cx,
  cy,
  s,
  rot = 0,
  color = INK,
}: {
  kind: Kind;
  cx: number;
  cy: number;
  s: number;
  rot?: number;
  color?: string;
}) {
  const Icon = KIND_ICON[kind];
  return (
    <g transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined}>
      <Icon x={r2(cx - s / 2)} y={r2(cy - s / 2)} size={s} weight="fill" color={color} />
    </g>
  );
}

/* -- cast: Database — a stack of n discs, bottom-centre at (cx, bottom) -- */

export function Database({
  cx,
  bottom,
  w,
  n,
  disc = 20,
  tone = INK,
  ground = CREAM,
}: {
  cx: number;
  bottom: number;
  w: number;
  n: number;
  disc?: number;
  tone?: string;
  /** what the stack sits on: the gaps between discs are drawn in it */
  ground?: string;
}) {
  const rx = r2(w / 2);
  const ry = r2(w / 7);
  const x0 = r2(cx - rx);
  const x1 = r2(cx + rx);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const yb = r2(bottom - ry - i * disc);
        const yt = r2(yb - disc);
        return (
          <path
            key={i}
            d={`M ${x0} ${yt} V ${yb} A ${rx} ${ry} 0 0 0 ${x1} ${yb} V ${yt} A ${rx} ${ry} 0 0 0 ${x0} ${yt} Z`}
            fill={tone}
            stroke={ground}
            strokeWidth={3}
          />
        );
      })}
      <ellipse cx={cx} cy={r2(bottom - ry - n * disc)} rx={rx} ry={ry} fill={tone} stroke={ground} strokeWidth={3} />
    </g>
  );
}

/* ==========================================================================
   Hero — structured and unstructured data, turned into value
   ========================================================================== */

export function HeroDataToValue() {
  return (
    <Plate
      w={500}
      h={250}
      title="A heap of data — a table, a photo, an email, a video and a social post — with an arrow pointing to a red stack of coins"
    >
      <Table x={34} y={30} w={118} h={88} rows={4} cols={3} />
      <Unit kind="photo" cx={214} cy={66} s={84} rot={-8} />
      <Unit kind="email" cx={70} cy={174} s={78} rot={7} />
      <Unit kind="video" cx={152} cy={170} s={72} rot={-5} />
      <Unit kind="post" cx={234} cy={178} s={66} rot={6} />
      <Arrow x1={296} x2={372} y={133} />
      <Coins x={436} y={206} n={7} />
    </Plate>
  );
}

/* ==========================================================================
   Structured data — rows and columns, easily searched
   ========================================================================== */

export function StructuredTable() {
  return (
    <Plate
      h={180}
      title="A table of rows and columns with a dark header row; a magnifying glass beside it finds one row, which is red"
    >
      <Table x={34} y={24} w={262} h={132} rows={5} cols={4} lit={2} />
      <MagnifyingGlass x={310} y={72} size={68} weight="fill" color={INK} />
    </Plate>
  );
}

/* ==========================================================================
   Unstructured data — no predefined format: kinds scattered, no grid
   ========================================================================== */

export function UnstructuredHeap() {
  return (
    <Plate
      h={180}
      title="A loose scatter with no rows or columns: a photo, a video, a web page, a social post, an email and a raw sensor signal"
    >
      <Unit kind="photo" cx={64} cy={58} s={70} rot={-9} />
      <Unit kind="video" cx={162} cy={48} s={58} rot={6} />
      <Unit kind="web" cx={252} cy={70} s={60} />
      <Unit kind="post" cx={342} cy={52} s={58} rot={8} />
      <Unit kind="email" cx={146} cy={134} s={62} rot={7} />
      <Unit kind="signal" cx={282} cy={138} s={64} rot={-4} />
    </Plate>
  );
}

/* ==========================================================================
   Volume — an enormous amount: a tower of storage beside a person
   ========================================================================== */

export function Volume() {
  return (
    <Plate h={230} title="A person stands beside a stack of database discs nearly twice their height">
      <Person x={132} y={118} k={1} variant={8} />
      <Database cx={268} bottom={218} w={124} n={9} disc={19} />
    </Plate>
  );
}

/* ==========================================================================
   Velocity — data generated and processed at speed, in real time
   ========================================================================== */

function Streak({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 26} ${y - 8} H ${x - 8} M ${x - 32} ${y} H ${x - 8} M ${x - 26} ${y + 8} H ${x - 8}`}
      stroke={INK}
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}

export function Velocity() {
  const xs = [42, 128, 214];
  const y = 158;
  return (
    <Plate
      h={230}
      title="A stopwatch above a line of small tables racing, with speed lines behind each, into a screen showing a live signal"
    >
      <Timer x={168} y={20} size={72} weight="fill" color={INK} />
      {xs.map((x) => (
        <g key={x}>
          <Streak x={x} y={y} />
          <Table x={x} y={y - 17} w={46} h={34} rows={2} cols={2} />
        </g>
      ))}
      <Arrow x1={268} x2={300} y={y} />
      <MiniScreen x={306} y={y - 28}>
        <Unit kind="signal" cx={348} cy={y} s={38} />
      </MiniScreen>
    </Plate>
  );
}

/* ==========================================================================
   Variety — various formats side by side
   ========================================================================== */

export function Variety() {
  const xs = [84, 200, 316];
  return (
    <Plate
      h={230}
      title="Six formats side by side: a table, a photo, a video, an email, a web page and a social post"
    >
      <Table x={xs[0] - 34} y={44} w={68} h={52} rows={3} cols={3} />
      <Unit kind="photo" cx={xs[1]} cy={70} s={72} />
      <Unit kind="video" cx={xs[2]} cy={70} s={72} />
      <Unit kind="email" cx={xs[0]} cy={162} s={72} />
      <Unit kind="web" cx={xs[1]} cy={162} s={72} />
      <Unit kind="post" cx={xs[2]} cy={162} s={72} />
    </Plate>
  );
}

/* ==========================================================================
   Data lake — raw data kept in its native format until it is needed
   ========================================================================== */

export function DataLake() {
  return (
    <Plate
      h={230}
      title="A pale blue lake in which raw data floats in its native formats: a photo, a video, an email, a table, a social post and a sensor signal"
    >
      <path
        d="M 30 120 C 26 72 92 44 170 50 C 224 54 252 34 312 42 C 366 50 384 96 372 140 C 360 186 300 204 216 198 C 150 194 104 206 64 186 C 38 172 32 146 30 120 Z"
        fill={COUNTER_FILL}
      />
      <Unit kind="photo" cx={98} cy={102} s={56} rot={-12} />
      <Unit kind="video" cx={196} cy={86} s={50} rot={9} />
      <Unit kind="post" cx={300} cy={92} s={48} rot={-6} />
      <Table x={66} y={140} w={52} h={40} rows={2} cols={3} />
      <Unit kind="email" cx={204} cy={156} s={52} rot={-8} />
      <Unit kind="signal" cx={302} cy={150} s={50} rot={10} />
    </Plate>
  );
}

/* ==========================================================================
   Data warehouse — structured data from several sources, shelved in order
   ========================================================================== */

export function DataWarehouse() {
  // building: gable roof over walls; the front is cut away to show shelves
  const L = 140;
  const R = 380;
  const top = 74;
  const base = 212;
  const shelves = [130, 171, 212];
  const xs = [158, 212, 266, 320];
  const srcY = [113, 154, 195];
  return (
    <Plate
      h={230}
      title="Three sources — a shop, a web page and a sensor signal — each send an arrow into a warehouse whose shelves hold identical tables in neat rows"
    >
      <path
        d={`M ${L - 10} ${top} L ${(L + R) / 2} 22 L ${R + 10} ${top} Z M ${L} ${top + 6} H ${R} V ${base} H ${L} Z M ${L + 10} ${top + 16} H ${R - 10} V ${base} H ${L + 10} Z`}
        fill={INK}
        fillRule="evenodd"
      />
      {shelves.map((y) => (
        <g key={y}>
          <rect x={L + 10} y={y - 4} width={R - L - 20} height={4} fill={INK} />
          {xs.map((x) => (
            <Table key={x} x={x} y={y - 30} w={40} h={26} rows={2} cols={2} />
          ))}
        </g>
      ))}
      <Shop x={21} y={srcY[0] - 15} k={0.2} />
      <Unit kind="web" cx={37} cy={srcY[1]} s={34} />
      <Unit kind="signal" cx={37} cy={srcY[2]} s={34} />
      {srcY.map((y) => (
        <Arrow key={y} x1={66} x2={140} y={y} />
      ))}
    </Plate>
  );
}

/* ==========================================================================
   Processing frameworks — the same gear and screen; only the arrival differs
   ========================================================================== */

/* gear (processing) then a screen with the result, shared by both plates */
function Processor({ y }: { y: number }) {
  return (
    <g>
      <Gear x={276} y={y - 44} size={88} weight="fill" color={INK} />
      <Arrow x1={372} x2={426} y={y} />
      <MiniScreen x={434} y={y - 28}>
        <Lightbulb x={457} y={y - 19} size={38} weight="fill" color={INK} />
      </MiniScreen>
    </g>
  );
}

export function BatchProcessing() {
  const y = 80;
  return (
    <Plate
      w={540}
      h={160}
      title="A large block of twelve tables enters a gear all at once; an arrow leads from the gear to a screen showing a lightbulb, the insight"
    >
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <Table key={`${r}${c}`} x={24 + c * 40} y={y - 42 + r * 30} w={34} h={24} rows={2} cols={2} />
        )),
      )}
      <Arrow x1={196} x2={268} y={y} />
      <Processor y={y} />
    </Plate>
  );
}

export function StreamProcessing() {
  const y = 80;
  const xs = [46, 122, 198];
  return (
    <Plate
      w={540}
      h={160}
      title="Single tables arrive one after another, with speed lines behind each, into the same gear; an arrow leads to the same screen showing a lightbulb, the insight"
    >
      {xs.map((x) => (
        <g key={x}>
          <Streak x={x} y={y} />
          <Table x={x} y={y - 12} w={34} h={24} rows={2} cols={2} />
        </g>
      ))}
      <Arrow x1={240} x2={268} y={y} />
      <Processor y={y} />
    </Plate>
  );
}

/* ==========================================================================
   Analytics tools — one timeline in three zones under the three columns:
   what has happened, what will happen, what to do
   ========================================================================== */

export function AnalyticsTimeline() {
  const base = 176;
  const past: [number, number][] = [
    [34, 138], [70, 124], [106, 132], [142, 110], [178, 118], [214, 96], [256, 102],
  ];
  const now = past[past.length - 1];
  const end: [number, number] = [500, 70];
  const label = (x: number, s: string, tone = INK) => (
    <text x={x} y={206} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={tone}>
      {s}
    </text>
  );
  return (
    <Plate
      w={800}
      h={220}
      title="A timeline in three zones. Descriptive: a solid line of past data. Predictive: the line continues as a dashed forecast inside a widening pale blue band. Prescriptive: the path forks in two, and the red branch is the recommended action"
    >
      {/* zone dividers and the time axis */}
      <path d={`M 266 20 V ${base} M 533 20 V ${base}`} stroke={INK} strokeWidth={1.5} strokeDasharray="4 5" />
      <path d={`M 20 ${base} H 780`} stroke={INK} strokeWidth={3} />
      {/* predictive: widening band, dashed forecast */}
      <path d={`M ${now[0]} ${now[1]} L ${end[0]} ${end[1] - 40} V ${end[1] + 40} Z`} fill={COUNTER_FILL} />
      <path d={`M ${now[0]} ${now[1]} L ${end[0]} ${end[1]}`} stroke={INK} strokeWidth={4} strokeDasharray="10 8" />
      {/* descriptive: past data */}
      <path d={`M ${past.map((p) => p.join(" ")).join(" L ")}`} stroke={INK} strokeWidth={4} fill="none" strokeLinejoin="round" />
      {past.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={6} fill={INK} />
      ))}
      {/* prescriptive: a fork, the recommended branch in red */}
      <circle cx={end[0]} cy={end[1]} r={6} fill={INK} />
      <Pointer x1={end[0] + 10} y1={end[1] + 6} x2={752} y2={156} w={4} />
      <Pointer x1={end[0] + 10} y1={end[1] - 4} x2={756} y2={30} w={7} color={SIGNAL} />
      {label(133, "Descriptive")}
      {label(400, "Predictive")}
      {label(667, "Prescriptive", SIGNAL)}
    </Plate>
  );
}

/* ==========================================================================
   Porter's value chain — support activities span the top, primary
   activities stand below, and the chain points to the value delivered
   ========================================================================== */

const SUPPORT = ["Firm Infrastructure", "Human Resource Management", "Technology Development", "Procurement"];
const PRIMARY = [
  ["Inbound", "Logistics"],
  ["Operations"],
  ["Outbound", "Logistics"],
  ["Marketing", "and Sales"],
  ["Service"],
];

export function ValueChain() {
  const L = 20;
  const R = 640;
  const top = 10;
  const bh = 26;
  const gap = 5;
  const pTop = top + 4 * (bh + gap) + 3;
  const bottom = 216;
  const cw = (R - L - 4 * gap) / 5;
  const word = (x: number, y: number, s: string, fill: string, size = 16) => (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={size} fill={fill}>
      {s}
    </text>
  );
  return (
    <Plate
      w={800}
      h={226}
      title="Porter's value chain: four pale blue support bars (firm infrastructure, human resource management, technology development, procurement) span the top; five black primary columns (inbound logistics, operations, outbound logistics, marketing and sales, service) stand below; the whole chain ends in a red point marked value"
    >
      {SUPPORT.map((s, i) => {
        const y = top + i * (bh + gap);
        return (
          <g key={s}>
            <rect x={L} y={y} width={R - L} height={bh} fill={COUNTER_FILL} />
            {word((L + R) / 2, y + 18.5, s, INK)}
          </g>
        );
      })}
      {PRIMARY.map((lines, i) => {
        const x = r2(L + i * (cw + gap));
        const cy = (pTop + bottom) / 2;
        return (
          <g key={i}>
            <rect x={x} y={pTop} width={r2(cw)} height={bottom - pTop} fill={INK} />
            {lines.map((s, j) => (
              <React.Fragment key={s}>
                {word(r2(x + cw / 2), r2(cy + 6 + (j - (lines.length - 1) / 2) * 22), s, CREAM)}
              </React.Fragment>
            ))}
          </g>
        );
      })}
      <path d={`M ${R + gap} ${top} L 780 ${(top + bottom) / 2} L ${R + gap} ${bottom} Z`} fill={SIGNAL} />
      {word(R + 44, (top + bottom) / 2 + 7, "Value", CREAM, 20)}
    </Plate>
  );
}

/* Phones: the same chain as a column, the loop running up the right side. */
export function DataChainTall({ active }: { active: number }) {
  const cx = 64;
  const r = 21;
  const pitch = 80;
  const y = (i: number) => 58 + i * pitch;
  const lit = (i: number) => i >= active && i < active + 3;
  const loopLit = active === 6;
  const right = 372;
  const loopTone = loopLit ? SIGNAL : INK;
  return (
    <Plate
      h={y(7) + 50}
      title={`The data value chain as a column of eight circles joined by arrows, from data generation down to data utilization, with a feedback and iteration arrow running back up to the first. Lit in red: ${
        active === 6 ? "interpretation, utilization and the feedback loop" : CHAIN.slice(active, active + 3).join(", ").toLowerCase()
      }`}
    >
      {CHAIN.map((name, i) => (
        <g key={name}>
          <circle cx={cx} cy={y(i)} r={r} fill={lit(i) ? SIGNAL : CREAM} stroke={lit(i) ? SIGNAL : INK} strokeWidth={3} />
          <g transform={`translate(${cx} ${y(i)}) scale(0.68) translate(${-cx} ${-y(i)})`}>
            <ChainGlyph i={i} cx={cx} cy={y(i)} color={lit(i) ? CREAM : INK} ground={lit(i) ? SIGNAL : CREAM} />
          </g>
          <text
            x={cx + r + 18}
            y={y(i) + 6}
            fontFamily="var(--font-body)"
            fontWeight={600}
            fontSize={18}
            fill={lit(i) ? SIGNAL : INK}
          >
            {name}
          </text>
          {i < CHAIN.length - 1 && <Pointer x1={cx} y1={y(i) + r + 5} x2={cx} y2={y(i + 1) - r - 6} w={3} />}
        </g>
      ))}
      <path
        d={`M ${cx} ${y(7) + r + 2} V ${y(7) + 36} H ${right} V 14 H ${cx} V ${y(0) - r - 20}`}
        fill="none"
        stroke={loopTone}
        strokeWidth={loopLit ? 5 : 3}
      />
      <path d={`M ${cx} ${y(0) - r - 5} L ${cx - 11} ${y(0) - r - 24} H ${cx + 11} Z`} fill={loopTone} />
      <text
        x={right - 14}
        y={y(4)}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontWeight={600}
        fontSize={16}
        fill={loopTone}
        transform={`rotate(-90 ${right - 14} ${y(4)})`}
      >
        Feedback and Iteration
      </text>
    </Plate>
  );
}

/* ==========================================================================
   Socio-technical systems — people and technology interact, and one red
   frame holds both: they are considered together
   ========================================================================== */

function SystemLabel({ x, y, s }: { x: number; y: number; s: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
      {s}
    </text>
  );
}

export function PeopleAndTechnology() {
  return (
    <Plate
      h={242}
      title="Two people (the social system) and a screen with a gear (the technical system), with arrows running both ways between them, all held inside one red frame"
    >
      <rect x={10} y={10} width={380} height={222} fill="none" stroke={SIGNAL} strokeWidth={5} />
      <Person x={58} y={64} k={0.92} variant={4} />
      <Person x={142} y={64} k={0.92} variant={9} />
      <Monitor x={244} y={54} w={112} h={84}>
        <Gear x={275} y={71} size={50} weight="fill" color={INK} />
      </Monitor>
      <Pointer x1={186} y1={84} x2={234} y2={84} w={4} />
      <Pointer x1={234} y1={116} x2={186} y2={116} w={4} />
      <SystemLabel x={100} y={202} s="Social system" />
      <SystemLabel x={300} y={202} s="Technical system" />
    </Plate>
  );
}

/* ==========================================================================
   Social system — a network of relationships among people
   ========================================================================== */

export function SocialNetwork() {
  const k = 0.52;
  const centre = { x: 200, y: 124 };
  const ring = [-90, -18, 54, 126, 198].map((a) => ({
    x: r2(200 + 142 * Math.cos((a * Math.PI) / 180)),
    y: r2(124 + 96 * Math.sin((a * Math.PI) / 180)),
  }));
  const ringVariants = [0, 3, 5, 6, 7] as const;
  // a line between two people, stopped short of each so it never touches them
  const link = (a: { x: number; y: number }, b: { x: number; y: number }, key: string) => {
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    const ux = (b.x - a.x) / d;
    const uy = (b.y - a.y) / d;
    const g = 31;
    return (
      <path
        key={key}
        d={`M ${r2(a.x + ux * g)} ${r2(a.y + uy * g)} L ${r2(b.x - ux * g)} ${r2(b.y - uy * g)}`}
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );
  };
  return (
    <Plate h={240} title="Six people joined by lines into a network: five in a ring, each linked to their neighbours and to one person in the middle">
      {ring.map((p, i) => link(p, ring[(i + 1) % 5], `r${i}`))}
      {ring.map((p, i) => link(centre, p, `s${i}`))}
      {ring.map((p, i) => (
        <Person key={i} x={p.x} y={r2(p.y - 50 * k)} k={k} variant={ringVariants[i]} flip={p.x > 200} />
      ))}
      <Person x={centre.x} y={r2(centre.y - 50 * k)} k={k} variant={2} />
    </Plate>
  );
}

/* ==========================================================================
   Data value chain — eight stages in a row and the feedback loop back to the
   start; the three stages a slide teaches are lit red
   ========================================================================== */

const CHAIN = [
  "Generation",
  "Collection",
  "Storage",
  "Processing",
  "Analysis",
  "Visualization",
  "Interpretation",
  "Utilization",
];

function ChainGlyph({
  i,
  cx,
  cy,
  color,
  ground,
}: {
  i: number;
  cx: number;
  cy: number;
  color: string;
  ground: string;
}) {
  const s = 34;
  const at = { x: r2(cx - s / 2), y: r2(cy - s / 2), size: s, weight: "fill" as const, color };
  switch (i) {
    case 0:
      return <Broadcast {...at} />;
    case 1:
      return <Tray {...at} />;
    case 2:
      return <Database cx={cx} bottom={cy + 16} w={30} n={3} disc={8} tone={color} ground={ground} />;
    case 3:
      return <Gear {...at} />;
    case 4:
      return <MagnifyingGlass {...at} />;
    case 5:
      return (
        <g>
          {[10, 18, 26].map((hgt, j) => (
            <rect key={j} x={cx - 15 + j * 11} y={cy + 14 - hgt} width={8} height={hgt} fill={color} />
          ))}
          <rect x={cx - 17} y={cy + 14} width={34} height={2.5} fill={color} />
        </g>
      );
    case 6:
      return <Lightbulb {...at} />;
    default:
      return <Target {...at} />;
  }
}

export function DataChain({ active }: { active: number }) {
  const cy = 80;
  const r = 26;
  const x = (i: number) => 52 + i * 99.4;
  const lit = (i: number) => i >= active && i < active + 3;
  const loopLit = active === 6;
  const loopTone = loopLit ? SIGNAL : INK;
  const loopY = 30;
  const names = CHAIN.map((n, i) => `${i + 1}. data ${n.toLowerCase()}`).join(", ");
  return (
    <Plate
      w={800}
      h={140}
      title={`The data value chain as eight circles joined by arrows (${names}), with a feedback and iteration arrow running over the top from the last stage back down into the first. Lit in red: ${
        active === 6 ? "interpretation, utilization and the feedback loop" : CHAIN.slice(active, active + 3).join(", ").toLowerCase()
      }`}
    >
      {CHAIN.map((name, i) => (
        <g key={name}>
          <circle cx={r2(x(i))} cy={cy} r={r} fill={lit(i) ? SIGNAL : CREAM} stroke={lit(i) ? SIGNAL : INK} strokeWidth={4} />
          <g transform={`translate(${r2(x(i))} ${cy}) scale(0.82) translate(${r2(-x(i))} ${-cy})`}>
            <ChainGlyph i={i} cx={r2(x(i))} cy={cy} color={lit(i) ? CREAM : INK} ground={lit(i) ? SIGNAL : CREAM} />
          </g>
          <text
            x={r2(x(i))}
            y={cy + r + 24}
            textAnchor="middle"
            fontFamily="var(--font-body)"
            fontWeight={600}
            fontSize={13}
            fill={lit(i) ? SIGNAL : INK}
          >
            {name}
          </text>
          {i < CHAIN.length - 1 && (
            <Pointer x1={r2(x(i) + r + 7)} y1={cy} x2={r2(x(i + 1) - r - 7)} y2={cy} w={3} head={12} />
          )}
        </g>
      ))}
      {/* feedback and iteration: up out of the last stage, back over the row,
          and down into the first */}
      <path
        d={`M ${r2(x(7))} ${cy - r - 6} V ${loopY} H ${r2(x(0))} V ${cy - r - 18}`}
        fill="none"
        stroke={loopTone}
        strokeWidth={loopLit ? 5 : 3}
      />
      <path
        d={`M ${r2(x(0))} ${cy - r - 6} L ${r2(x(0) - 8)} ${cy - r - 20} H ${r2(x(0) + 8)} Z`}
        fill={loopTone}
      />
      <text
        x={400}
        y={loopY - 10}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontWeight={600}
        fontSize={14}
        fill={loopTone}
      >
        Feedback and Iteration
      </text>
    </Plate>
  );
}

