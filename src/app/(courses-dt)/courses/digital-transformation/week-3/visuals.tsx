/* ==========================================================================
   Week 3 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, on top of the course kit and objects:
     · Person   — every human (course object)
     · Monitor / MiniScreen — anything digital (course kit)
     · Disc     — boxed media: the rental film, traditional software
     · Package  — a product release / increment (Phosphor, fill)
     · Backlog  — a list of work items (ink card, cream item lines)
   Every coordinate is a literal or rounded, so server and client match.
   ========================================================================== */

import React from "react";
import { Play, Cpu, Cloud, Package, ChatCircle, ShieldCheck, Lightning } from "@phosphor-icons/react/dist/ssr";
import { INK, SIGNAL, CREAM, COUNTER_FILL, r2, Plate, Monitor, Arrow, Pointer } from "../_visuals/kit";
import { Person, Shop } from "../_visuals/objects";

/* -- the rental disc in its mailer envelope (physical film) --------------- */

function Mailer({ x, y }: { x: number; y: number }) {
  // a disc (r 34) half out of a 120 × 70 envelope; origin top-left of the disc's box
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 60 0 A 34 34 0 1 0 60.01 0 Z M 60 26 A 8 8 0 1 1 59.99 26 Z" fill={INK} fillRule="evenodd" />
      <circle cx={60} cy={34} r={15} fill="none" stroke={CREAM} strokeWidth={3} />
      <path d="M 0 40 H 120 V 110 H 0 Z" fill={INK} stroke={CREAM} strokeWidth={4} />
      <path d="M 4 44 L 60 78 L 116 44" fill="none" stroke={CREAM} strokeWidth={3} />
    </g>
  );
}

/* ==========================================================================
   How Netflix transformed the movie industry — the disc in the post becomes
   a film on a screen
   ========================================================================== */

export function DiscToStream() {
  return (
    <Plate w={400} h={190} title="A film disc in a mailer envelope, an arrow, then a play button on a framed screen">
      <Mailer x={20} y={36} />
      <Arrow x1={156} x2={210} y={90} color={SIGNAL} />
      <Monitor x={226} y={36} w={154} h={104}>
        <Play x={303 - 30} y={88 - 30} size={60} weight="fill" color={INK} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   Data analytics, four key types — one line of data through time: the past
   as it happened, a dip examined, the forecast, and the chosen next step
   ========================================================================== */

export function FourTypes() {
  const base = 204;
  const past: [number, number][] = [
    [36, 116],
    [78, 100],
    [120, 110],
    [160, 92],
    [194, 98],
    [244, 104],
    [282, 140],
    [318, 146],
    [356, 112],
    [398, 100],
  ];
  const now = past[past.length - 1];
  const end: [number, number] = [586, 72];
  const label = (x: number, s: string, tone = INK) => (
    <text x={x} y={234} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={tone}>
      {s}
    </text>
  );
  return (
    <Plate
      w={800}
      h={248}
      title="One timeline in four zones. Descriptive: a solid line of past data. Diagnostic: a magnifying glass held over a dip in that line. Predictive: the line continues as a dashed forecast in a widening pale blue band. Prescriptive: the path forks in two, and the red branch is the recommended next step"
    >
      <path
        d={`M 210 20 V ${base} M 400 20 V ${base} M 590 20 V ${base}`}
        stroke={INK}
        strokeWidth={1.5}
        strokeDasharray="4 5"
      />
      <path d={`M 20 ${base} H 780`} stroke={INK} strokeWidth={3} />
      {/* predictive */}
      <path d={`M ${now[0]} ${now[1]} L ${end[0]} ${end[1] - 36} V ${end[1] + 36} Z`} fill={COUNTER_FILL} />
      <path d={`M ${now[0]} ${now[1]} L ${end[0]} ${end[1]}`} stroke={INK} strokeWidth={4} strokeDasharray="10 8" />
      {/* descriptive + diagnostic: the past */}
      <path
        d={`M ${past.map((p) => p.join(" ")).join(" L ")}`}
        stroke={INK}
        strokeWidth={4}
        fill="none"
        strokeLinejoin="round"
      />
      {past.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={6} fill={INK} />
      ))}
      {/* diagnostic: a lens on the dip */}
      <circle cx={300} cy={140} r={34} fill="none" stroke={INK} strokeWidth={5} />
      <path d="M 326 166 L 348 188" stroke={INK} strokeWidth={10} strokeLinecap="round" />
      {/* prescriptive: a fork, the recommended branch in red */}
      <circle cx={end[0]} cy={end[1]} r={6} fill={INK} />
      <Pointer x1={end[0] + 10} y1={end[1] + 6} x2={752} y2={150} w={4} />
      <Pointer x1={end[0] + 10} y1={end[1] - 4} x2={756} y2={30} w={7} color={SIGNAL} />
      {label(115, "Descriptive")}
      {label(305, "Diagnostic")}
      {label(495, "Predictive")}
      {label(685, "Prescriptive", SIGNAL)}
    </Plate>
  );
}

/* ==========================================================================
   Netflix timeline — four moments on one rail, the last one lit
   ========================================================================== */

function Calendar({ x, y }: { x: number; y: number }) {
  // 90 × 96 page with two rings and a 4 × 3 grid of days, origin top-left
  const days = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++) days.push(`M ${11 + c * 18} ${42 + r * 16} h 14 v 11 h -14 Z`);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M 0 10 H 90 V 96 H 0 Z ${days.join(" ")}`} fill={INK} fillRule="evenodd" />
      <path d="M 0 30 H 90" stroke={CREAM} strokeWidth={3} />
      <rect x={20} y={0} width={10} height={22} rx={3} fill={INK} stroke={CREAM} strokeWidth={3} />
      <rect x={60} y={0} width={10} height={22} rx={3} fill={INK} stroke={CREAM} strokeWidth={3} />
    </g>
  );
}

export const NETFLIX_YEARS = ["1997", "1999", "2003", "2007"];

export function NetflixTimeline() {
  const rail = 140;
  const cx = [100, 300, 500, 700];
  return (
    <Plate
      w={800}
      h={180}
      title="A timeline with four moments: 1997, a film disc in a mailer envelope; 1999, a calendar; 2003, a group of three people; 2007, a play button on a framed screen, marked in red"
    >
      <Mailer x={40} y={10} />
      <Calendar x={255} y={20} />
      <Person x={436} y={45} k={0.75} hair="crop" />
      <Person x={564} y={45} k={0.75} hair="bun" flip />
      <Person x={500} y={25} k={0.95} hair="bob" gap />
      <Monitor x={640} y={14} w={120} h={80}>
        <Play x={700 - 22} y={54 - 22} size={44} weight="fill" color={INK} />
      </Monitor>
      <path d={`M 20 ${rail} H 780`} stroke={INK} strokeWidth={4} />
      {cx.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={rail} r={8} fill={i === 3 ? SIGNAL : INK} />
          <text
            x={x}
            y={rail + 32}
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontWeight={700}
            fontSize={22}
            fill={i === 3 ? SIGNAL : INK}
          >
            {NETFLIX_YEARS[i]}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   Change management — people, processes and technology move in step to
   the digital business
   ========================================================================== */

/* A process: three steps joined by short arrows, 112 × 24, origin top-left. */
function Process({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 44, 88].map((dx) => (
        <rect key={dx} x={dx} y={0} width={24} height={24} fill={INK} />
      ))}
      <path d="M 28 12 H 32 M 72 12 H 76" stroke={INK} strokeWidth={3} />
      <path d="M 40 12 L 31 6 V 18 Z M 84 12 L 75 6 V 18 Z" fill={INK} />
    </g>
  );
}

export function AlignedChange() {
  const rows = [56, 120, 184];
  const label = (y: number, s: string) => (
    <text x={164} y={y + 7} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={INK}>
      {s}
    </text>
  );
  return (
    <Plate
      w={800}
      h={262}
      title="Three rows, people (a person), processes (three linked steps) and technology (a chip), each with a red arrow pointing the same way to a shop on a framed screen"
    >
      <Person x={84} y={rows[0] - 28} k={0.56} hair="bun" />
      <Process x={28} y={rows[1] - 12} />
      <Cpu x={84 - 28} y={rows[2] - 28} size={56} weight="fill" color={INK} />
      {label(rows[0], "People")}
      {label(rows[1], "Processes")}
      {label(rows[2], "Technology")}
      {rows.map((y) => (
        <Arrow key={y} x1={300} x2={566} y={y} color={SIGNAL} />
      ))}
      <Monitor x={590} y={20} w={186} h={196}>
        <Shop x={625.4} y={64} k={0.72} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   Kotter's eight steps — a staircase climbed one step at a time
   ========================================================================== */

const KOTTER: string[][] = [
  ["Create a", "Sense of", "Urgency"],
  ["Build a", "Guiding", "Coalition"],
  ["Form a", "Strategic", "Vision and", "Initiatives"],
  ["Communicate", "the Vision"],
  ["Empower", "Broad-Based", "Action"],
  ["Generate", "Short-Term", "Wins"],
  ["Consolidate", "Gains and", "Produce", "More Change"],
  ["Anchor New", "Approaches", "in the", "Culture"],
];

export function KotterStairs() {
  const base = 292;
  const w = 94;
  const gap = 4;
  const names = KOTTER.map((l) => l.join(" ")).join(", ");
  return (
    <Plate w={800} h={304} title={`A staircase of eight rising steps, numbered 1 to 8 and named: ${names}`}>
      {KOTTER.map((lines, i) => {
        const x = 10 + i * (w + gap);
        const h = 40 + i * 22;
        const top = base - h;
        return (
          <g key={i}>
            <rect x={x} y={top} width={w} height={h} fill={INK} />
            <text
              x={x + w / 2}
              y={base - 12}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={22}
              fill={CREAM}
              style={{ fontVariantNumeric: "lining-nums" }}
            >
              {i + 1}
            </text>
            {lines.map((s, j) => (
              <text
                key={s}
                x={x + w / 2}
                y={r2(top - 10 - (lines.length - 1 - j) * 19.6)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={14}
                fill={INK}
              >
                {s}
              </text>
            ))}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   The case of Microsoft — boxed software becomes a cloud service on a screen
   ========================================================================== */

/* A software disc, radius 54, centred on (cx, cy). */
function Disc({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M ${cx} ${cy - 54} A 54 54 0 1 0 ${cx + 0.01} ${cy - 54} Z M ${cx} ${cy - 10} A 10 10 0 1 1 ${cx - 0.01} ${cy - 10} Z`}
        fill={INK}
        fillRule="evenodd"
      />
      <circle cx={cx} cy={cy} r={22} fill="none" stroke={CREAM} strokeWidth={3} />
    </g>
  );
}

export function BoxToCloud() {
  return (
    <Plate w={400} h={196} title="A software disc, a red arrow, then a cloud on a framed screen">
      <Disc cx={80} cy={94} />
      <Arrow x1={144} x2={204} y={94} color={SIGNAL} />
      <Monitor x={222} y={30} w={156} h={112}>
        <Cloud x={300 - 38} y={86 - 38} size={76} weight="fill" color={INK} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   Agile project management — small, rapid releases go out to the customer,
   and the customer's feedback comes back
   ========================================================================== */

export function SmallReleases() {
  return (
    <Plate
      w={400}
      h={200}
      title="Four small red packages released one after another along an arrow to a customer, and a black arrow of feedback running back from the speech bubble at the customer's face"
    >
      <ChatCircle x={266} y={34} size={42} weight="fill" color={INK} />
      <Pointer x1={256} y1={55} x2={24} y2={55} w={6} />
      {[24, 84, 144, 204].map((x) => (
        <Package key={x} x={x} y={92} size={48} weight="fill" color={SIGNAL} />
      ))}
      <Arrow x1={24} x2={292} y={164} />
      <Person x={348} y={66} k={1.2} hair="crop" flip />
    </Plate>
  );
}

/* ==========================================================================
   Traditional vs. agile — one straight shot at a fixed target, against a
   path of short iterations that adjusts on the way to it
   ========================================================================== */

function Bullseye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {[34, 24, 14].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill={i % 2 ? CREAM : INK} />
      ))}
      <circle cx={cx} cy={cy} r={6} fill={CREAM} />
    </g>
  );
}

export function TwoPaths() {
  const agile: [number, number][] = [
    [176, 186],
    [256, 222],
    [336, 204],
    [416, 160],
    [496, 150],
    [576, 176],
  ];
  const last = agile[agile.length - 1];
  const label = (y: number, s: string, tone: string) => (
    <text x={20} y={y + 7} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={tone}>
      {s}
    </text>
  );
  return (
    <Plate
      w={800}
      h={240}
      title="Traditional: one straight black arrow fired at a fixed target. Agile: a red path of short steps, each step a dot, that bends and adjusts until it reaches the same kind of target"
    >
      {label(60, "Traditional", INK)}
      <Arrow x1={176} x2={680} y={60} />
      <Bullseye cx={726} cy={60} />
      <path d="M 20 122 H 780" stroke={INK} strokeWidth={1.5} />
      {label(186, "Agile", SIGNAL)}
      <path
        d={`M ${agile.map((p) => p.join(" ")).join(" L ")}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {agile.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={7} fill={SIGNAL} />
      ))}
      <Pointer x1={last[0]} y1={last[1]} x2={682} y2={186} w={5} color={SIGNAL} />
      <Bullseye cx={726} cy={186} />
    </Plate>
  );
}

/* ==========================================================================
   Scrum — the rugby scrum: two packs bent low, heads locked together,
   contesting the ball between them
   ========================================================================== */

/* A player bent forward, facing right, placed by the centre of the head. */
function Bent({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  const parts = (tone: string, pad: number) => (
    <g stroke={tone} strokeLinecap="round" fill="none">
      <path d="M -72 -10 L -18 0" strokeWidth={30 + pad} />
      <path d="M -70 -4 L -62 36 L -82 74 M -58 -2 L -34 34 L -42 74" strokeWidth={15 + pad} strokeLinejoin="round" />
      <circle cx={0} cy={4} r={14 + pad / 2} fill={tone} stroke="none" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      {parts(CREAM, 6)}
      {parts(INK, 0)}
    </g>
  );
}

export function RugbyScrum() {
  return (
    <Plate
      w={400}
      h={160}
      title="A rugby scrum: two packs of two players bent low, one behind the other, face each other with their heads locked together, and a red ball on the ground between them"
    >
      {[
        [186, 66],
        [104, 62],
      ].map(([x, y]) => (
        <g key={x}>
          <Bent x={x} y={y} />
          <Bent x={400 - x} y={y} flip />
        </g>
      ))}
      <g transform="rotate(-15 200 136)">
        <ellipse cx={200} cy={136} rx={24} ry={14} fill={SIGNAL} />
        <path d="M 190 131 H 210 M 194 127 V 135 M 200 127 V 135 M 206 127 V 135" stroke={CREAM} strokeWidth={2} />
      </g>
    </Plate>
  );
}

/* ==========================================================================
   Empirical process control — three pillars carry it
   ========================================================================== */

export function ThreePillars() {
  const cx = [80, 200, 320];
  const names = ["Transparency", "Inspection", "Adaptation"];
  return (
    <Plate
      w={400}
      h={224}
      title="A beam marked empirical process control resting on three pillars named transparency, inspection and adaptation"
    >
      <rect x={16} y={14} width={368} height={36} fill={INK} />
      <text
        x={200}
        y={38}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontWeight={600}
        fontSize={17}
        fill={CREAM}
      >
        Empirical Process Control
      </text>
      {cx.map((x, i) => (
        <g key={x}>
          <rect x={x - 32} y={56} width={64} height={12} fill={INK} />
          <rect x={x - 22} y={72} width={44} height={96} fill={INK} />
          <rect x={x - 32} y={172} width={64} height={12} fill={INK} />
          <text
            x={x}
            y={208}
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontWeight={700}
            fontSize={17}
            fill={INK}
          >
            {names[i]}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   Scrum methodology — product backlog, sprint backlog, the sprint loop with
   its daily scrum, and the increment. `lit` marks the events or artifacts.
   ========================================================================== */

/* A backlog: an ink card with `n` cream item lines, origin top-left. */
function Backlog({ x, y, w, n, tone = INK }: { x: number; y: number; w: number; n: number; tone?: string }) {
  const lines = Array.from({ length: n }, (_, i) => `M ${x + 12} ${y + 18 + i * 20} h ${w - 24} v 6 h ${-(w - 24)} Z`);
  return <path d={`M ${x} ${y} h ${w} v ${n * 20 + 16} h ${-w} Z ${lines.join(" ")}`} fill={tone} fillRule="evenodd" />;
}

const word = (x: number, y: number, s: string, tone: string, anchor: "middle" | "start" = "middle", size = 16) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-body)" fontWeight={600} fontSize={size} fill={tone}>
    {s}
  </text>
);

/* Arrowhead pointing along angle `a` (radians), tip at (x, y). */
function Head({ x, y, a, size = 16, tone = INK }: { x: number; y: number; a: number; size?: number; tone?: string }) {
  const bx = x - Math.cos(a) * size;
  const by = y - Math.sin(a) * size;
  const hw = size * 0.6;
  return (
    <path
      d={`M ${r2(x)} ${r2(y)} L ${r2(bx - Math.sin(a) * hw)} ${r2(by + Math.cos(a) * hw)} L ${r2(bx + Math.sin(a) * hw)} ${r2(by - Math.cos(a) * hw)} Z`}
      fill={tone}
    />
  );
}

export function ScrumProcess({ lit }: { lit?: "events" | "artifacts" }) {
  const ev = lit === "events" ? SIGNAL : INK;
  const ar = lit === "artifacts" ? SIGNAL : INK;
  const cx = 440;
  const cy = 150;
  const R = 86;
  const at = (deg: number, r = R): [number, number] => [
    r2(cx + Math.cos((deg * Math.PI) / 180) * r),
    r2(cy + Math.sin((deg * Math.PI) / 180) * r),
  ];
  const stops: [number, string][] = [
    [180, "planning"],
    [40, "review"],
    [100, "retro"],
  ];
  const daily: [number, number] = at(-45, R + 32);
  return (
    <Plate
      w={800}
      h={296}
      title={`Scrum methodology: a product backlog list feeds a shorter sprint backlog; an arrow marked sprint planning enters a large clockwise loop, the sprint of 1 to 4 weeks, with a small daily scrum loop at its top right; stops on the loop mark the sprint review and the sprint retrospective; an arrow leaves the loop to a package, the increment${
        lit ? `. The ${lit} are red` : ""
      }`}
    >
      {/* artifacts */}
      <Backlog x={20} y={70} w={92} n={7} tone={ar} />
      {word(66, 252, "Product", ar)}
      {word(66, 274, "Backlog", ar)}
      <Pointer x1={122} y1={150} x2={160} y2={150} w={4} />
      <Backlog x={170} y={110} w={74} n={3} tone={ar} />
      {word(207, 212, "Sprint", ar)}
      {word(207, 234, "Backlog", ar)}
      <Package x={676} y={108} size={88} weight="fill" color={ar} />
      {word(720, 222, "Increment", ar)}
      {/* sprint planning: the way in */}
      <Pointer x1={254} y1={cy} x2={cx - R - 10} y2={cy} w={4} color={ev} />
      {word(296, 118, "Sprint", ev, "middle", 14)}
      {word(296, 137, "Planning", ev, "middle", 14)}
      {/* the sprint */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={INK} strokeWidth={12} />
      <Head x={cx + 14} y={cy - R} a={0} size={22} />
      <Head x={cx - 14} y={cy + R} a={Math.PI} size={22} />
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontWeight={700}
        fontSize={26}
        fill={INK}
      >
        Sprint
      </text>
      {word(cx, cy + 26, "1 to 4 weeks", INK)}
      {stops.map(([deg, k]) => {
        const [x, y] = at(deg);
        return <circle key={k} cx={x} cy={y} r={12} fill={ev} stroke={CREAM} strokeWidth={3} />;
      })}
      {word(at(40, R + 20)[0], at(40, R + 20)[1] + 8, "Sprint Review", ev, "start", 14)}
      {word(at(100, R + 24)[0], at(100, R + 24)[1] + 12, "Sprint Retrospective", ev, "middle", 14)}
      {/* increment: the way out */}
      <Pointer x1={cx + R + 10} y1={cy} x2={664} y2={cy} w={4} />
      {/* daily scrum */}
      <circle cx={daily[0]} cy={daily[1]} r={24} fill="none" stroke={ev} strokeWidth={6} />
      <Head x={daily[0] + 6} y={daily[1] - 24} a={0} size={13} tone={ev} />
      {word(daily[0] + 36, daily[1] + 6, "Daily Scrum", ev, "start", 14)}
    </Plate>
  );
}

/* ==========================================================================
   Roles in Scrum — one figure per role, with the thing the role looks after
   ========================================================================== */

export function ProductOwnerRole() {
  return (
    <Plate
      w={400}
      h={170}
      title="The product owner: a person beside the product backlog, a list they manage, with its top item in red"
    >
      <Person x={130} y={40} k={1.2} hair="bob" />
      <Backlog x={216} y={30} w={100} n={5} />
      <rect x={228} y={48} width={76} height={6} fill={SIGNAL} />
    </Plate>
  );
}

export function ScrumMasterRole() {
  return (
    <Plate
      w={400}
      h={170}
      title="The scrum master: a red shield stands between the team, two people, and a lightning bolt, an outside interruption"
    >
      <Person x={70} y={52} k={1.08} hair="bun" />
      <Person x={150} y={52} k={1.08} hair="crop" gap />
      <ShieldCheck x={208} y={40} size={92} weight="fill" color={SIGNAL} />
      <Lightning x={318} y={54} size={64} weight="fill" color={INK} />
    </Plate>
  );
}

export function DevTeamRole() {
  return (
    <Plate
      w={400}
      h={170}
      title="The development team: three people side by side and the package they deliver together, the product increment"
    >
      <Person x={70} y={56} k={1.04} hair="bun" />
      <Person x={160} y={56} k={1.04} hair="crop" gap />
      <Person x={250} y={56} k={1.04} hair="bob" gap />
      <Package x={312} y={84} size={76} weight="fill" color={INK} />
    </Plate>
  );
}

/* ==========================================================================
   Hero — a shop climbs a staircase of change, step by step, to its place on
   a screen
   ========================================================================== */

export function HeroStairs() {
  const steps = [
    [20, 236, 110, 56],
    [134, 186, 110, 106],
    [248, 136, 132, 156],
  ];
  return (
    <Plate
      w={400}
      h={300}
      title="A staircase of three rising steps: a shop stands on the lowest step, a red arrow climbs the stairs, and the same shop sits on a framed screen on the top step"
    >
      {steps.map(([x, y, w, h]) => (
        <rect key={x} x={x} y={y} width={w} height={h} fill={INK} />
      ))}
      <Shop x={36} y={158} k={0.5} />
      <Pointer x1={130} y1={160} x2={226} y2={102} w={6} color={SIGNAL} />
      <Monitor x={262} y={27} w={104} h={76}>
        <Shop x={290} y={43} k={0.3} />
      </Monitor>
    </Plate>
  );
}
