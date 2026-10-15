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

"use client";

import React from "react";
import {
  Play,
  Cpu,
  Cloud,
  Package,
  ChatCircle,
  ShieldCheck,
  Lightning,
  Heart,
  FilmSlate,
  Clock,
  Megaphone,
  Trophy,
  Anchor,
  Lightbulb,
  Eye,
  Gear,
  ArrowsClockwise,
} from "@phosphor-icons/react/dist/ssr";
import { INK, SIGNAL, CREAM, COUNTER_FILL, r2, Plate, Monitor, MiniScreen, Arrow, Pointer } from "../_visuals/kit";
import { Person, Shop, Doc } from "../_visuals/objects";

/* -- the rental disc in its mailer envelope (physical film) --------------- */

function Mailer({ x, y, discTone = INK }: { x: number; y: number; discTone?: string }) {
  // a disc (r 34) half out of a 120 × 70 envelope; origin top-left of the disc's box
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 60 0 A 34 34 0 1 0 60.01 0 Z M 60 26 A 8 8 0 1 1 59.99 26 Z" fill={discTone} fillRule="evenodd" />
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

const ANALYTICS_ZONES: { idx: number; x0: number; x1: number; cx: number; label: string }[] = [
  { idx: 0, x0: 20, x1: 210, cx: 115, label: "1. Descriptive" },
  { idx: 1, x0: 210, x1: 400, cx: 305, label: "2. Diagnostic" },
  { idx: 3, x0: 400, x1: 590, cx: 495, label: "4. Predictive" },
  { idx: 2, x0: 590, x1: 780, cx: 685, label: "3. Prescriptive" },
];

export function FourTypes({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const base = 200;
  const pastDesc: [number, number][] = [
    [36, 116],
    [78, 100],
    [122, 112],
    [166, 92],
    [210, 100],
  ];
  const pastDiag: [number, number][] = [
    [210, 100],
    [248, 106],
    [284, 142],
    [320, 146],
    [360, 112],
    [400, 100],
  ];
  const now = pastDiag[pastDiag.length - 1];
  const end: [number, number] = [590, 76];
  const descTone = active === 0 ? SIGNAL : INK;
  const diagTone = active === 1 ? SIGNAL : INK;
  const predTone = active === 3 ? SIGNAL : INK;
  const prescTone = active === 2 ? SIGNAL : INK;
  const activeLabel = ANALYTICS_ZONES.find((z) => z.idx === active)?.label ?? "1. Descriptive";

  return (
    <Plate
      w={800}
      h={256}
      title={`One timeline in four selectable zones: 1. Descriptive (past data line), 2. Diagnostic (magnifying glass over a dip), 4. Predictive (dashed forecast in a pale blue band), and 3. Prescriptive (forking path from the forecast to two courses of action, with the optimal recommended target highlighted); ${activeLabel} is highlighted in red`}
    >
      <path
        d={`M 210 20 V ${base} M 400 20 V ${base} M 590 20 V ${base}`}
        stroke={INK}
        strokeWidth={1.5}
        strokeDasharray="4 5"
      />
      <path d={`M 20 ${base} H 780`} stroke={INK} strokeWidth={3} />

      {/* 4. Predictive: forecast cone and dashed line */}
      <path d={`M ${now[0]} ${now[1]} L ${end[0]} ${end[1] - 36} V ${end[1] + 36} Z`} fill={COUNTER_FILL} />
      <path
        d={`M ${now[0]} ${now[1]} L ${end[0]} ${end[1]}`}
        stroke={predTone}
        strokeWidth={active === 3 ? 5 : 4}
        strokeDasharray="10 8"
      />

      {/* 1. Descriptive: past segment 1 */}
      <path
        d={`M ${pastDesc.map((p) => p.join(" ")).join(" L ")}`}
        stroke={descTone}
        strokeWidth={active === 0 ? 5 : 4}
        fill="none"
        strokeLinejoin="round"
      />
      {pastDesc.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={active === 0 ? 7 : 6} fill={descTone} />
      ))}

      {/* 2. Diagnostic: past segment 2 + magnifying lens on the dip */}
      <path
        d={`M ${pastDiag.map((p) => p.join(" ")).join(" L ")}`}
        stroke={diagTone}
        strokeWidth={active === 1 ? 5 : 4}
        fill="none"
        strokeLinejoin="round"
      />
      {pastDiag.slice(1).map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={active === 1 ? 7 : 6} fill={diagTone} />
      ))}
      <circle cx={302} cy={142} r={34} fill="none" stroke={diagTone} strokeWidth={active === 1 ? 6 : 5} />
      <path d="M 328 168 L 350 190" stroke={diagTone} strokeWidth={10} strokeLinecap="round" />

      {/* 3. Prescriptive: decision fork to two outcome targets */}
      <circle cx={end[0]} cy={end[1]} r={active === 3 || active === 2 ? 7 : 6} fill={active === 3 ? predTone : prescTone} />
      {/* Alternative lower path to a lesser outcome node */}
      <Pointer x1={end[0] + 10} y1={end[1] + 6} x2={724} y2={142} w={3.5} head={12} color={INK} />
      <circle cx={744} cy={148} r={12} fill="none" stroke={INK} strokeWidth={3} />
      {/* Recommended upper path to the optimal target */}
      <Pointer x1={end[0] + 10} y1={end[1] - 4} x2={718} y2={48} w={active === 2 ? 6.5 : 4.5} head={15} color={prescTone} />
      <circle cx={744} cy={42} r={18} fill={prescTone} />
      <path d="M 736 42 L 742 48 L 753 36" fill="none" stroke={CREAM} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />

      {/* Interactive hit zones and bottom tab bars */}
      {ANALYTICS_ZONES.map((z) => {
        const isLit = z.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? z.label : undefined}
            onClick={onSelect ? () => onSelect(z.idx) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(z.idx);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={z.x0} y={16} width={z.x1 - z.x0} height={232} fill="transparent" />
            <rect x={z.x0 + 8} y={base + 8} width={z.x1 - z.x0 - 16} height={isLit ? 6 : 2} fill={tone} />
            <text
              x={z.cx}
              y={238}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={19}
              fill={tone}
            >
              {z.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   Netflix timeline — four moments on one rail, the last one lit
   ========================================================================== */

function Calendar({ x, y, tone = INK }: { x: number; y: number; tone?: string }) {
  // 90 × 96 page with two rings and a 4 × 3 grid of days, origin top-left
  const days = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++) days.push(`M ${11 + c * 18} ${42 + r * 16} h 14 v 11 h -14 Z`);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M 0 30 H 90 V 96 H 0 Z ${days.join(" ")}`} fill={INK} fillRule="evenodd" />
      <path d="M 0 10 H 90 V 30 H 0 Z" fill={tone} />
      <path d="M 0 30 H 90" stroke={CREAM} strokeWidth={3} />
      <rect x={20} y={0} width={10} height={22} rx={3} fill={INK} stroke={CREAM} strokeWidth={3} />
      <rect x={60} y={0} width={10} height={22} rx={3} fill={INK} stroke={CREAM} strokeWidth={3} />
    </g>
  );
}

/* ==========================================================================
   Challenges and considerations — Technology vs Business considerations
   feeding into Netflix's digital streaming screen
   ========================================================================== */

export function NetflixConsiderations({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const techTone = active === 0 ? SIGNAL : INK;
  const bizTone = active === 1 ? SIGNAL : INK;
  const activeGroup = active === 0 ? "Technology" : "Business";

  return (
    <Plate
      w={800}
      h={256}
      title={`What Netflix needs to consider for digital transformation: on the left, Technology (Cloud infrastructure and Video encoding); on the right, Business (New business model, Competition and Piracy, Consumer engagement and loyalty), both feeding into a central framed streaming screen; ${activeGroup} is highlighted in red`}
    >
      {/* Central streaming screen */}
      <Monitor x={316} y={54} w={168} h={124}>
        <Play x={400 - 28} y={116 - 28} size={56} weight="fill" color={INK} />
      </Monitor>

      {/* Left group: Technology (0) */}
      <g
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-pressed={onSelect ? active === 0 : undefined}
        aria-label={onSelect ? "Technology" : undefined}
        onClick={onSelect ? () => onSelect(0) : undefined}
        onKeyDown={
          onSelect
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(0);
                }
              }
            : undefined
        }
        className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
      >
        <rect x={16} y={8} width={288} height={240} fill="transparent" />
        <text
          x={144}
          y={28}
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontWeight={700}
          fontSize={20}
          fill={techTone}
        >
          1. Technology
        </text>
        <path d="M 24 46 V 36 H 264 V 46" fill="none" stroke={techTone} strokeWidth={3} />

        {/* Tech card 1: Cloud infrastructure */}
        <rect x={24} y={58} width={240} height={76} fill={techTone} />
        <rect x={32} y={66} width={60} height={60} fill={CREAM} />
        <Cloud x={42} y={76} size={40} weight="fill" color={INK} />
        <text x={176} y={91} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={15.5} fill={CREAM}>
          Cloud
        </text>
        <text x={176} y={112} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={15.5} fill={CREAM}>
          infrastructure
        </text>
        <Pointer x1={268} y1={96} x2={308} y2={102} w={active === 0 ? 4.5 : 3} color={techTone} head={12} />

        {/* Tech card 2: Video encoding */}
        <rect x={24} y={154} width={240} height={76} fill={techTone} />
        <rect x={32} y={162} width={60} height={60} fill={CREAM} />
        <FilmSlate x={42} y={172} size={40} weight="fill" color={INK} />
        <text x={176} y={187} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={15.5} fill={CREAM}>
          Video
        </text>
        <text x={176} y={208} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={15.5} fill={CREAM}>
          encoding
        </text>
        <Pointer x1={268} y1={192} x2={308} y2={140} w={active === 0 ? 4.5 : 3} color={techTone} head={12} />
      </g>

      {/* Right group: Business (1) */}
      <g
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-pressed={onSelect ? active === 1 : undefined}
        aria-label={onSelect ? "Business" : undefined}
        onClick={onSelect ? () => onSelect(1) : undefined}
        onKeyDown={
          onSelect
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(1);
                }
              }
            : undefined
        }
        className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
      >
        <rect x={496} y={8} width={288} height={240} fill="transparent" />
        <text
          x={656}
          y={28}
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontWeight={700}
          fontSize={20}
          fill={bizTone}
        >
          2. Business
        </text>
        <path d="M 536 46 V 36 H 776 V 46" fill="none" stroke={bizTone} strokeWidth={3} />

        {/* Business card 1: Stream on demand */}
        <rect x={536} y={58} width={240} height={52} fill={bizTone} />
        <rect x={544} y={64} width={44} height={40} fill={CREAM} />
        <Play x={552} y={70} size={28} weight="fill" color={INK} />
        <text x={680} y={90} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={15} fill={CREAM}>
          Stream on demand
        </text>
        <Pointer x1={532} y1={84} x2={492} y2={96} w={active === 1 ? 4.5 : 3} color={bizTone} head={12} />

        {/* Business card 2: Competition & Piracy */}
        <rect x={536} y={118} width={240} height={52} fill={bizTone} />
        <rect x={544} y={124} width={44} height={40} fill={CREAM} />
        <ShieldCheck x={552} y={130} size={28} weight="fill" color={INK} />
        <text x={680} y={150} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={14.5} fill={CREAM}>
          Competition &amp; Piracy
        </text>
        <Pointer x1={532} y1={144} x2={492} y2={120} w={active === 1 ? 4.5 : 3} color={bizTone} head={12} />

        {/* Business card 3: Engagement & loyalty */}
        <rect x={536} y={178} width={240} height={52} fill={bizTone} />
        <rect x={544} y={184} width={44} height={40} fill={CREAM} />
        <Heart x={552} y={190} size={28} weight="fill" color={INK} />
        <text x={680} y={210} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={14.5} fill={CREAM}>
          Engagement &amp; loyalty
        </text>
        <Pointer x1={532} y1={204} x2={492} y2={148} w={active === 1 ? 4.5 : 3} color={bizTone} head={12} />
      </g>
    </Plate>
  );
}

export function NetflixConsiderationsTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const techTone = active === 0 ? SIGNAL : INK;
  const bizTone = active === 1 ? SIGNAL : INK;
  const activeGroup = active === 0 ? "Technology" : "Business";

  return (
    <Plate
      w={400}
      h={228}
      title={`What Netflix needs to consider for digital transformation: 1. Technology and 2. Business; ${activeGroup} is highlighted in red`}
    >
      {/* Left column: 1. Technology */}
      <g
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-pressed={onSelect ? active === 0 : undefined}
        aria-label={onSelect ? "Technology" : undefined}
        onClick={onSelect ? () => onSelect(0) : undefined}
        onKeyDown={
          onSelect
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(0);
                }
              }
            : undefined
        }
        className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
      >
        <rect x={14} y={12} width={180} height={204} fill={techTone} />
        <rect x={26} y={24} width={156} height={74} fill={CREAM} />
        <Cloud x={46} y={38} size={46} weight="fill" color={INK} />
        <FilmSlate x={116} y={38} size={46} weight="fill" color={INK} />
        <text x={104} y={138} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={CREAM}>
          1. Technology
        </text>
        <text x={104} y={166} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={14} fill={CREAM}>
          Cloud &amp; Encoding
        </text>
      </g>

      {/* Right column: 2. Business */}
      <g
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-pressed={onSelect ? active === 1 : undefined}
        aria-label={onSelect ? "Business" : undefined}
        onClick={onSelect ? () => onSelect(1) : undefined}
        onKeyDown={
          onSelect
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(1);
                }
              }
            : undefined
        }
        className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
      >
        <rect x={206} y={12} width={180} height={204} fill={bizTone} />
        <rect x={218} y={24} width={156} height={74} fill={CREAM} />
        <Play x={232} y={42} size={38} weight="fill" color={INK} />
        <ShieldCheck x={278} y={42} size={38} weight="fill" color={INK} />
        <Heart x={324} y={42} size={38} weight="fill" color={INK} />
        <text x={296} y={138} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={CREAM}>
          2. Business
        </text>
        <text x={296} y={166} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={14} fill={CREAM}>
          Model, Piracy, Loyalty
        </text>
      </g>
    </Plate>
  );
}

export const NETFLIX_YEARS = ["1997", "1999", "2003", "2007"];

export function NetflixTimeline({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const rail = 148;
  const cx = [100, 300, 500, 700];
  const activeYear = NETFLIX_YEARS[active] ?? "1997";
  return (
    <Plate
      w={800}
      h={204}
      title={`A timeline with four selectable moments: 1997, a film disc in a mailer envelope; 1999, a monthly calendar; 2003, a group of three people for 1 million subscribers; 2007, a play button on a framed screen; ${activeYear} is highlighted in red`}
    >
      <path d={`M 20 ${rail} H 780`} stroke={INK} strokeWidth={4} />
      {cx.map((x, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={x}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? NETFLIX_YEARS[i] : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x - 90} y={6} width={180} height={192} fill="transparent" />
            {i === 0 && <Mailer x={40} y={10} discTone={tone} />}
            {i === 1 && <Calendar x={255} y={20} tone={tone} />}
            {i === 2 && (
              <g>
                <Person x={436} y={40} k={0.75} hair="crop" />
                <Person x={564} y={40} k={0.75} hair="bun" flip />
                <Person x={500} y={20} k={0.95} hair="bob" gap />
                <rect x={428} y={120} width={144} height={6} fill={tone} />
              </g>
            )}
            {i === 3 && (
              <Monitor x={640} y={14} w={120} h={80}>
                <Play x={700 - 22} y={54 - 22} size={44} weight="fill" color={tone} />
              </Monitor>
            )}
            <circle cx={x} cy={rail} r={isLit ? 10 : 8} fill={tone} />
            <text
              x={x}
              y={rail + 34}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={22}
              fill={tone}
            >
              {NETFLIX_YEARS[i]}
            </text>
            <rect x={x - 36} y={rail + 44} width={72} height={isLit ? 5 : 0} fill={tone} />
          </g>
        );
      })}
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
   Kotter's 8 Steps: 1 to 4 (Interactive) — four rising staircase steps with
   a silhouette scene on each step
   ========================================================================== */

const KOTTER_1_TO_4 = [
  { n: 1, label: "1. Create a Sense of Urgency", lines: ["1. Create a Sense", "of Urgency"] },
  { n: 2, label: "2. Build a Guiding Coalition", lines: ["2. Build a Guiding", "Coalition"] },
  { n: 3, label: "3. Form a Strategic Vision and Initiatives", lines: ["3. Form a Strategic", "Vision & Initiatives"] },
  { n: 4, label: "4. Communicate the Vision", lines: ["4. Communicate", "the Vision"] },
];

export function KotterSteps1To4({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const x0 = 16;
  const w = 180;
  const pitch = 196;
  const bottom = 248;
  const tops = [164, 152, 140, 128];
  const activeName = KOTTER_1_TO_4[active]?.label ?? KOTTER_1_TO_4[0].label;

  return (
    <Plate
      w={800}
      h={256}
      title={`Kotter's Steps 1 to 4 on four rising steps: 1. Create a Sense of Urgency (a person beside a clock), 2. Build a Guiding Coalition (three leaders together), 3. Form a Strategic Vision and Initiatives (a leader looking at a digital shop on a screen), and 4. Communicate the Vision (a leader with a megaphone addressing stakeholders); ${activeName} is highlighted in red`}
    >
      {KOTTER_1_TO_4.map((step, i) => {
        const x = x0 + i * pitch;
        const cx = x + w / 2;
        const top = tops[i];
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={step.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? step.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={16} width={w} height={bottom - 16} fill="transparent" />
            {/* Scene perched on top of step */}
            {i === 0 && (
              <g>
                <Person x={72} y={78} k={0.8} hair="bob" />
                <Clock x={112} y={84} size={58} weight="fill" color={tone} />
              </g>
            )}
            {i === 1 && (
              <g>
                <Person x={258} y={74} k={0.72} hair="crop" />
                <Person x={346} y={74} k={0.72} hair="bun" flip />
                <Person x={302} y={58} k={0.88} hair="bob" gap />
              </g>
            )}
            {i === 2 && (
              <g>
                <Person x={446} y={54} k={0.8} hair="crop" />
                <MiniScreen x={492} y={64}>
                  <Shop x={513.2} y={72.5} k={0.26} tone={tone} />
                </MiniScreen>
              </g>
            )}
            {i === 3 && (
              <g>
                <Person x={636} y={42} k={0.8} hair="bun" />
                <Megaphone x={668} y={50} size={38} weight="fill" color={tone} />
                <Person x={728} y={54} k={0.68} hair="crop" flip />
                <Person x={758} y={54} k={0.68} hair="bob" flip gap />
              </g>
            )}

            {/* Rising step block */}
            <rect x={x} y={top} width={w} height={bottom - top} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={cx}
                y={r2(top + 34 + j * 22)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={15}
                fill={CREAM}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </Plate>
  );
}

export function KotterSteps1To4Tall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeName = KOTTER_1_TO_4[active]?.label ?? KOTTER_1_TO_4[0].label;
  return (
    <Plate w={400} h={196} title={`Kotter's Steps 1 to 4; ${activeName} is highlighted in red`}>
      {KOTTER_1_TO_4.map((step, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 14 : 206;
        const y = 14 + row * 88;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={step.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? step.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={y} width={180} height={76} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={x + 90}
                y={r2(y + 32 + j * 21)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={14.5}
                fill={CREAM}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </Plate>
  );
}

const KOTTER_5_TO_8 = [
  { n: 5, label: "5. Empower Broad-Based Action", lines: ["5. Empower", "Broad-Based Action"] },
  { n: 6, label: "6. Generate Short-Term Wins", lines: ["6. Generate", "Short-Term Wins"] },
  { n: 7, label: "7. Consolidate Gains and Produce More Change", lines: ["7. Consolidate Gains", "& More Change"] },
  { n: 8, label: "8. Anchor New Approaches in the Culture", lines: ["8. Anchor in", "the Culture"] },
];

export function KotterSteps5To8({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const x0 = 16;
  const w = 180;
  const pitch = 196;
  const bottom = 248;
  const tops = [164, 152, 140, 128];
  const activeName = KOTTER_5_TO_8[active]?.label ?? KOTTER_5_TO_8[0].label;

  return (
    <Plate
      w={800}
      h={256}
      title={`Kotter's Steps 5 to 8 on four rising steps: 5. Empower Broad-Based Action (a person moving past an opened obstacle wall), 6. Generate Short-Term Wins (a person beside a trophy), 7. Consolidate Gains and Produce More Change (three rising building blocks with an upward arrow), and 8. Anchor New Approaches in the Culture (a digital shop on a screen beside an anchor); ${activeName} is highlighted in red`}
    >
      {KOTTER_5_TO_8.map((step, i) => {
        const x = x0 + i * pitch;
        const cx = x + w / 2;
        const top = tops[i];
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={step.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? step.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={16} width={w} height={bottom - 16} fill="transparent" />
            {/* Scene perched on top of step */}
            {i === 0 && (
              <g>
                <Person x={58} y={78} k={0.8} hair="crop" />
                <Person x={106} y={78} k={0.8} hair="bob" gap />
                <Lightning x={136} y={90} size={56} weight="fill" color={tone} />
              </g>
            )}
            {i === 1 && (
              <g>
                <Person x={270} y={66} k={0.8} hair="bun" />
                <Trophy x={312} y={76} size={64} weight="fill" color={tone} />
              </g>
            )}
            {i === 2 && (
              <g>
                <Trophy x={420} y={80} size={48} weight="fill" color={INK} />
                <Pointer x1={470} y1={104} x2={494} y2={104} w={4} color={tone} head={10} />
                <MiniScreen x={498} y={64}>
                  <Shop x={519.2} y={72.5} k={0.26} tone={tone} />
                </MiniScreen>
              </g>
            )}
            {i === 3 && (
              <g>
                <MiniScreen x={620} y={52}>
                  <Shop x={641.2} y={60.5} k={0.26} />
                </MiniScreen>
                <Anchor x={714} y={54} size={64} weight="fill" color={tone} />
              </g>
            )}

            {/* Rising step block */}
            <rect x={x} y={top} width={w} height={bottom - top} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={cx}
                y={r2(top + 34 + j * 22)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={15}
                fill={CREAM}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </Plate>
  );
}

export function KotterSteps5To8Tall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeName = KOTTER_5_TO_8[active]?.label ?? KOTTER_5_TO_8[0].label;
  return (
    <Plate w={400} h={196} title={`Kotter's Steps 5 to 8; ${activeName} is highlighted in red`}>
      {KOTTER_5_TO_8.map((step, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 14 : 206;
        const y = 14 + row * 88;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={step.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? step.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={y} width={180} height={76} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={x + 90}
                y={r2(y + 32 + j * 21)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={14.5}
                fill={CREAM}
              >
                {line}
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
   Microsoft's transformation and Kotter's 8 Steps: 1 to 4 (Interactive, w=400)
   ========================================================================== */

const MS_KOTTER_1_TO_4 = [
  { n: 1, label: "1. Create a Sense of Urgency", lines: ["1. Create a Sense", "of Urgency"] },
  { n: 2, label: "2. Build a Guiding Coalition", lines: ["2. Build a Guiding", "Coalition"] },
  { n: 3, label: "3. Form a Strategic Vision", lines: ["3. Strategic Vision", "& Initiatives"] },
  { n: 4, label: "4. Communicate the Vision", lines: ["4. Communicate", "the Vision"] },
];

export function MicrosoftKotter1To4({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeItem = MS_KOTTER_1_TO_4[active] ?? MS_KOTTER_1_TO_4[0];
  const activeY = 14 + active * 70 + 31;

  return (
    <Plate
      w={400}
      h={296}
      title={`Microsoft's transformation across Kotter's Steps 1 to 4: selectable steps on the left and a scene on the right; ${activeItem.label} is highlighted in red`}
    >
      {MS_KOTTER_1_TO_4.map((step, i) => {
        const y = 14 + i * 70;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={step.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? step.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={12} y={y} width={164} height={62} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={94}
                y={r2(y + 27 + j * 20)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={14}
                fill={CREAM}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Connector from active step to stage */}
      <Pointer x1={178} y1={activeY} x2={198} y2={activeY} w={4} color={SIGNAL} head={10} />

      {/* Right stage box */}
      <rect x={202} y={14} width={186} height={272} fill={CREAM} stroke={INK} strokeWidth={3} />

      {/* Step 1 scene: Traditional software disc evolving to Cloud-first screen */}
      {active === 0 && (
        <g>
          <g transform="translate(295 66) scale(0.68)">
            <Disc cx={0} cy={0} />
          </g>
          <Pointer x1={295} y1={110} x2={295} y2={144} w={4.5} color={SIGNAL} head={12} />
          <Monitor x={227} y={152} w={136} h={90}>
            <Cloud x={295 - 26} y={197 - 26} size={52} weight="fill" color={SIGNAL} />
          </Monitor>
        </g>
      )}

      {/* Step 2 scene: Guiding coalition of executives from various divisions */}
      {active === 1 && (
        <g>
          <Person x={246} y={118} k={0.85} hair="crop" />
          <Person x={344} y={118} k={0.85} hair="bun" flip />
          <Person x={295} y={96} k={1.08} hair="bob" gap />
          <rect x={220} y={212} width={150} height={14} fill={SIGNAL} />
        </g>
      )}

      {/* Step 3 scene: Cloud services (Azure), AI (Cpu), Collaboration tools (Office 365) */}
      {active === 2 && (
        <g>
          <MiniScreen x={253} y={38}>
            <Cloud x={275} y={46} size={40} weight="fill" color={SIGNAL} />
          </MiniScreen>
          <g transform="translate(216 158) scale(0.85)">
            <MiniScreen x={0} y={0}>
              <Cpu x={22} y={8} size={40} weight="fill" color={INK} />
            </MiniScreen>
          </g>
          <g transform="translate(303 158) scale(0.85)">
            <MiniScreen x={0} y={0}>
              <Doc x={28.7} y={8.3} k={0.34} />
            </MiniScreen>
          </g>
        </g>
      )}

      {/* Step 4 scene: Open dialogue and feedback across channels */}
      {active === 3 && (
        <g>
          <ChatCircle x={236} y={54} size={48} weight="fill" color={SIGNAL} />
          <ChatCircle x={302} y={72} size={48} weight="fill" color={INK} />
          <Person x={256} y={142} k={0.92} hair="crop" />
          <Person x={334} y={142} k={0.92} hair="bob" flip />
        </g>
      )}
    </Plate>
  );
}

/* ==========================================================================
   Microsoft's transformation and Kotter's 8 Steps: 5 to 8 (Interactive, w=400)
   ========================================================================== */

const MS_KOTTER_5_TO_8 = [
  { n: 5, label: "5. Empower Broad-Based Action", lines: ["5. Empower", "Broad-Based Action"] },
  { n: 6, label: "6. Generate Short-Term Wins", lines: ["6. Generate", "Short-Term Wins"] },
  { n: 7, label: "7. Consolidate Gains", lines: ["7. Consolidate Gains", "& More Change"] },
  { n: 8, label: "8. Anchor in the Culture", lines: ["8. Anchor in", "the Culture"] },
];

export function MicrosoftKotter5To8({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeItem = MS_KOTTER_5_TO_8[active] ?? MS_KOTTER_5_TO_8[0];
  const activeY = 14 + active * 70 + 31;

  return (
    <Plate
      w={400}
      h={296}
      title={`Microsoft's transformation across Kotter's Steps 5 to 8: selectable steps on the left and a scene on the right; ${activeItem.label} is highlighted in red`}
    >
      {MS_KOTTER_5_TO_8.map((step, i) => {
        const y = 14 + i * 70;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={step.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? step.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={12} y={y} width={164} height={62} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={94}
                y={r2(y + 27 + j * 20)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={14}
                fill={CREAM}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Connector from active step to stage */}
      <Pointer x1={178} y1={activeY} x2={198} y2={activeY} w={4} color={SIGNAL} head={10} />

      {/* Right stage box */}
      <rect x={202} y={14} width={186} height={272} fill={CREAM} stroke={INK} strokeWidth={3} />

      {/* Step 5 scene: Growth mindset, innovation, and experimentation */}
      {active === 0 && (
        <g>
          <Lightbulb x={267} y={46} size={56} weight="fill" color={SIGNAL} />
          <Person x={295} y={118} k={1.15} hair="bob" />
        </g>
      )}

      {/* Step 6 scene: Early successes with Azure & Office 365 celebrated */}
      {active === 1 && (
        <g>
          <MiniScreen x={253} y={42}>
            <Cloud x={275} y={50} size={40} weight="fill" color={INK} />
          </MiniScreen>
          <Trophy x={263} y={152} size={64} weight="fill" color={SIGNAL} />
        </g>
      )}

      {/* Step 7 scene: Invest in cloud technology and expand product offerings */}
      {active === 2 && (
        <g>
          <Monitor x={225} y={38} w={140} h={96}>
            <Cloud x={295 - 26} y={86 - 26} size={52} weight="fill" color={SIGNAL} />
          </Monitor>
          <Package x={222} y={188} size={42} weight="fill" color={INK} />
          <Package x={274} y={188} size={42} weight="fill" color={INK} />
          <Package x={326} y={188} size={42} weight="fill" color={SIGNAL} />
        </g>
      )}

      {/* Step 8 scene: Empathy, teamwork, and inclusive culture */}
      {active === 3 && (
        <g>
          <Heart x={269} y={52} size={52} weight="fill" color={SIGNAL} />
          <Person x={256} y={138} k={0.92} hair="bun" />
          <Person x={334} y={138} k={0.92} hair="crop" flip />
        </g>
      )}
    </Plate>
  );
}

/* ==========================================================================
   Prosci ADKAR Model Overview (Interactive, w=800 + Tall w=400) — an
   individual progresses through the five outcomes: A, D, K, A, R
   ========================================================================== */

const ADKAR_STAGES = [
  { letter: "A", name: "Awareness" },
  { letter: "D", name: "Desire" },
  { letter: "K", name: "Knowledge" },
  { letter: "A", name: "Ability" },
  { letter: "R", name: "Reinforcement" },
];

function AdkarMark({ i, cx, y, tone }: { i: number; cx: number; y: number; tone: string }) {
  switch (i) {
    case 0:
      return <Eye x={cx - 20} y={y} size={40} weight="fill" color={tone} />;
    case 1:
      return <Heart x={cx - 20} y={y} size={40} weight="fill" color={tone} />;
    case 2:
      return <Doc x={cx - 16} y={y - 2} k={0.36} tone={tone} />;
    case 3:
      return <Gear x={cx - 20} y={y} size={40} weight="fill" color={tone} />;
    default:
      return <Trophy x={cx - 20} y={y} size={40} weight="fill" color={tone} />;
  }
}

export function AdkarOverview({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const x0 = 20;
  const w = 132;
  const pitch = 157;
  const boxY = 116;
  const boxH = 104;
  const activeStage = ADKAR_STAGES[active] ?? ADKAR_STAGES[0];

  return (
    <Plate
      w={800}
      h={234}
      title={`The Prosci ADKAR Model as five sequential individual outcomes: Awareness (A), Desire (D), Knowledge (K), Ability (A), and Reinforcement (R); an individual stands at ${activeStage.name}, highlighted in red`}
    >
      {ADKAR_STAGES.map((st, i) => {
        const x = x0 + i * pitch;
        const cx = x + w / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g key={st.name}>
            {i < 4 && (
              <Pointer
                x1={x + w + 3}
                y1={boxY + boxH / 2}
                x2={x + pitch - 3}
                y2={boxY + boxH / 2}
                w={3.5}
                color={i < active ? SIGNAL : INK}
                head={9}
              />
            )}
            <g
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-pressed={onSelect ? isLit : undefined}
              aria-label={onSelect ? `${st.letter} – ${st.name}` : undefined}
              onClick={onSelect ? () => onSelect(i) : undefined}
              onKeyDown={
                onSelect
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(i);
                      }
                    }
                  : undefined
              }
              className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
            >
              <rect x={x} y={10} width={w} height={214} fill="transparent" />
              {isLit ? (
                <g>
                  <Person x={cx - 26} y={26} k={0.82} hair="bob" />
                  <AdkarMark i={i} cx={cx + 32} y={50} tone={SIGNAL} />
                </g>
              ) : (
                <AdkarMark i={i} cx={cx} y={50} tone={INK} />
              )}
              <rect x={x} y={boxY} width={w} height={boxH} fill={tone} />
              <text
                x={cx}
                y={boxY + 54}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={42}
                fill={CREAM}
              >
                {st.letter}
              </text>
              <text
                x={cx}
                y={boxY + 86}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={15}
                fill={CREAM}
              >
                {st.name}
              </text>
            </g>
          </g>
        );
      })}
    </Plate>
  );
}

export function AdkarOverviewTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeStage = ADKAR_STAGES[active] ?? ADKAR_STAGES[0];
  return (
    <Plate
      w={400}
      h={258}
      title={`The Prosci ADKAR Model as five individual outcomes; ${activeStage.name} is highlighted in red`}
    >
      {ADKAR_STAGES.map((st, i) => {
        const y = 12 + i * 48;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={st.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? `${st.letter} – ${st.name}` : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={14} y={y} width={372} height={40} fill={tone} />
            <rect x={18} y={y + 4} width={36} height={32} fill={CREAM} />
            <text
              x={36}
              y={y + 27}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={22}
              fill={tone}
            >
              {st.letter}
            </text>
            <text
              x={72}
              y={y + 26}
              fontFamily="var(--font-body)"
              fontWeight={600}
              fontSize={16}
              fill={CREAM}
            >
              {st.name}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   ADKAR: 1. Awareness, 2. Desire, 3. Knowledge (Interactive, w=800 + Tall)
   ========================================================================== */

const ADKAR_FIRST_THREE = [
  { letter: "A", n: 1, name: "Awareness" },
  { letter: "D", n: 2, name: "Desire" },
  { letter: "K", n: 3, name: "Knowledge" },
];

export function AdkarFirstThree({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const xs = [24, 284, 544];
  const w = 232;
  const activeItem = ADKAR_FIRST_THREE[active] ?? ADKAR_FIRST_THREE[0];

  return (
    <Plate
      w={800}
      h={236}
      title={`ADKAR stages 1 to 3: 1. Awareness (a megaphone and eye reaching a person), 2. Desire (two engaged people with a heart of motivation), and 3. Knowledge (a person with a training document and process gear); ${activeItem.n}. ${activeItem.name} is highlighted in red`}
    >
      {ADKAR_FIRST_THREE.map((st, i) => {
        const x = xs[i];
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g key={st.name}>
            {i < 2 && (
              <Pointer
                x1={x + w + 4}
                y1={176}
                x2={xs[i + 1] - 4}
                y2={176}
                w={4}
                color={i < active ? SIGNAL : INK}
                head={10}
              />
            )}
            <g
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-pressed={onSelect ? isLit : undefined}
              aria-label={onSelect ? `${st.n}. ${st.name}` : undefined}
              onClick={onSelect ? () => onSelect(i) : undefined}
              onKeyDown={
                onSelect
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(i);
                      }
                    }
                  : undefined
              }
              className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
            >
              <rect x={x} y={12} width={w} height={212} fill="transparent" />

              {/* Stage scene */}
              {i === 0 && (
                <g>
                  <Megaphone x={40} y={48} size={48} weight="fill" color={tone} />
                  <Eye x={104} y={44} size={38} weight="fill" color={tone} />
                  <Person x={198} y={26} k={0.96} hair="bob" flip />
                </g>
              )}
              {i === 1 && (
                <g>
                  <Person x={328} y={32} k={0.9} hair="crop" />
                  <Heart x={378} y={48} size={44} weight="fill" color={tone} />
                  <Person x={472} y={32} k={0.9} hair="bun" flip />
                </g>
              )}
              {i === 2 && (
                <g>
                  <Person x={592} y={26} k={0.96} hair="bob" />
                  <Doc x={648} y={34} k={0.54} tone={tone} />
                  <Gear x={712} y={50} size={46} weight="fill" color={tone} />
                </g>
              )}

              {/* Bottom banner */}
              <rect x={x} y={134} width={w} height={86} fill={tone} />
              <rect x={x + 14} y={152} width={50} height={50} fill={CREAM} />
              <text
                x={x + 39}
                y={188}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={32}
                fill={tone}
              >
                {st.letter}
              </text>
              <text
                x={x + 144}
                y={184}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={20}
                fill={CREAM}
              >
                {`${st.n}. ${st.name}`}
              </text>
            </g>
          </g>
        );
      })}
    </Plate>
  );
}

export function AdkarFirstThreeTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeItem = ADKAR_FIRST_THREE[active] ?? ADKAR_FIRST_THREE[0];
  return (
    <Plate w={400} h={172} title={`ADKAR stages 1 to 3; ${activeItem.n}. ${activeItem.name} is highlighted in red`}>
      {ADKAR_FIRST_THREE.map((st, i) => {
        const y = 12 + i * 52;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={st.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? `${st.n}. ${st.name}` : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={14} y={y} width={372} height={44} fill={tone} />
            <rect x={18} y={y + 4} width={36} height={36} fill={CREAM} />
            <text
              x={36}
              y={y + 29}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={22}
              fill={tone}
            >
              {st.letter}
            </text>
            <text
              x={72}
              y={y + 28}
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={18}
              fill={CREAM}
            >
              {`${st.n}. ${st.name}`}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   ADKAR: 4. Ability, 5. Reinforcement (Interactive, w=800 + Tall)
   ========================================================================== */

const ADKAR_LAST_TWO = [
  { letter: "A", n: 4, name: "Ability" },
  { letter: "R", n: 5, name: "Reinforcement" },
];

export function AdkarLastTwo({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const xs = [24, 420];
  const w = 356;
  const activeItem = ADKAR_LAST_TWO[active] ?? ADKAR_LAST_TWO[0];

  return (
    <Plate
      w={800}
      h={236}
      title={`ADKAR stages 4 and 5: 4. Ability (a person practicing new skills on a digital screen to deliver a package) and 5. Reinforcement (two people celebrating sustained change with a trophy of recognition); ${activeItem.n}. ${activeItem.name} is highlighted in red`}
    >
      <Pointer
        x1={384}
        y1={176}
        x2={416}
        y2={176}
        w={4.5}
        color={active === 1 ? SIGNAL : INK}
        head={11}
      />
      {ADKAR_LAST_TWO.map((st, i) => {
        const x = xs[i];
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={st.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? `${st.n}. ${st.name}` : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={12} width={w} height={212} fill="transparent" />

            {/* Stage 4: Ability — applying skills on a digital screen to deliver results */}
            {i === 0 && (
              <g>
                <Person x={92} y={26} k={0.96} hair="crop" />
                <MiniScreen x={156} y={44}>
                  <Gear x={178} y={52} size={40} weight="fill" color={tone} />
                </MiniScreen>
                <Pointer x1={246} y1={72} x2={278} y2={72} w={4} color={tone} head={10} />
                <Package x={286} y={44} size={56} weight="fill" color={tone} />
              </g>
            )}

            {/* Stage 5: Reinforcement — recognition, rewards, and ongoing support */}
            {i === 1 && (
              <g>
                <Person x={496} y={26} k={0.96} hair="bun" />
                <Trophy x={566} y={38} size={64} weight="fill" color={tone} />
                <Person x={700} y={26} k={0.96} hair="bob" flip />
              </g>
            )}

            {/* Bottom banner */}
            <rect x={x} y={134} width={w} height={86} fill={tone} />
            <rect x={x + 18} y={152} width={50} height={50} fill={CREAM} />
            <text
              x={x + 43}
              y={188}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={32}
              fill={tone}
            >
              {st.letter}
            </text>
            <text
              x={x + 206}
              y={185}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={22}
              fill={CREAM}
            >
              {`${st.n}. ${st.name}`}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function AdkarLastTwoTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeItem = ADKAR_LAST_TWO[active] ?? ADKAR_LAST_TWO[0];
  return (
    <Plate w={400} h={124} title={`ADKAR stages 4 and 5; ${activeItem.n}. ${activeItem.name} is highlighted in red`}>
      {ADKAR_LAST_TWO.map((st, i) => {
        const y = 12 + i * 52;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={st.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? `${st.n}. ${st.name}` : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={14} y={y} width={372} height={44} fill={tone} />
            <rect x={18} y={y + 4} width={36} height={36} fill={CREAM} />
            <text
              x={36}
              y={y + 29}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={22}
              fill={tone}
            >
              {st.letter}
            </text>
            <text
              x={72}
              y={y + 28}
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={18}
              fill={CREAM}
            >
              {`${st.n}. ${st.name}`}
            </text>
          </g>
        );
      })}
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
   Traditional vs. Agile Project Management (Interactive, w=800 + Tall w=400)
   — four selectable dimensions contrasting the Traditional and Agile paths
   ========================================================================== */

const TRAD_AGILE_STAGES = [
  { n: 1, name: "Goal Setting", label: "1. Goal Setting" },
  { n: 2, name: "Initial Steps", label: "2. Initial Steps" },
  { n: 3, name: "Execution", label: "3. Execution" },
  { n: 4, name: "Focus", label: "4. Focus" },
];

export function TradVsAgileInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const x0 = 16;
  const w = 180;
  const pitch = 196;
  const activeStage = TRAD_AGILE_STAGES[active] ?? TRAD_AGILE_STAGES[0];

  return (
    <Plate
      w={800}
      h={252}
      title={`Traditional vs. Agile Project Management across four selectable stages: 1. Goal Setting, 2. Initial Steps, 3. Execution, and 4. Focus; ${activeStage.label} is highlighted in red, contrasting the Traditional top lane with the Agile bottom lane`}
    >
      {/* Top selector tabs */}
      {TRAD_AGILE_STAGES.map((st, i) => {
        const x = x0 + i * pitch;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={st.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? st.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={12} width={w} height={44} fill={tone} />
            <text
              x={x + w / 2}
              y={40}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={17}
              fill={CREAM}
            >
              {st.label}
            </text>
          </g>
        );
      })}

      {/* Lane labels and divider */}
      <text x={20} y={116} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={INK}>
        Traditional
      </text>
      <path d="M 20 154 H 780" stroke={INK} strokeWidth={1.5} />
      <text x={20} y={208} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={SIGNAL}>
        Agile
      </text>

      {/* Stage 0: 1. Goal Setting */}
      {active === 0 && (
        <g>
          <Doc x={176} y={76} k={0.54} />
          <Arrow x1={242} x2={676} y={108} />
          <Bullseye cx={724} cy={108} />

          <path d="M 176 202 L 680 168 V 236 Z" fill={COUNTER_FILL} />
          <Pointer x1={176} y1={202} x2={412} y2={186} w={5} color={SIGNAL} head={12} />
          <circle cx={422} cy={186} r={6} fill={SIGNAL} />
          <Pointer x1={432} y1={186} x2={676} y2={208} w={5} color={SIGNAL} head={12} />
          <Bullseye cx={724} cy={208} />
        </g>
      )}

      {/* Stage 1: 2. Initial Steps */}
      {active === 1 && (
        <g>
          <Doc x={176} y={76} k={0.52} />
          <Doc x={236} y={76} k={0.52} />
          <g transform="translate(296 76) scale(0.62)">
            <Calendar x={0} y={0} />
          </g>
          <Arrow x1={370} x2={676} y={108} />
          <Bullseye cx={724} cy={108} />

          <Doc x={176} y={172} k={0.48} tone={SIGNAL} />
          <Pointer x1={234} y1={202} x2={372} y2={184} w={5} color={SIGNAL} head={12} />
          <circle cx={380} cy={184} r={6} fill={SIGNAL} />
          <Pointer x1={388} y1={184} x2={526} y2={214} w={5} color={SIGNAL} head={12} />
          <circle cx={534} cy={214} r={6} fill={SIGNAL} />
          <Pointer x1={542} y1={214} x2={676} y2={202} w={5} color={SIGNAL} head={12} />
          <Bullseye cx={724} cy={202} />
        </g>
      )}

      {/* Stage 2: 3. Execution */}
      {active === 2 && (
        <g>
          <Pointer x1={176} y1={108} x2={326} y2={108} w={5} head={12} />
          <Doc x={336} y={76} k={0.52} />
          <Pointer x1={394} y1={108} x2={506} y2={108} w={5} head={12} />
          <Doc x={516} y={76} k={0.52} />
          <Pointer x1={574} y1={108} x2={682} y2={108} w={5} head={12} />
          <Package x={694} y={80} size={56} weight="fill" color={INK} />

          <ArrowsClockwise x={184} y={176} size={50} weight="fill" color={SIGNAL} />
          <ChatCircle x={256} y={180} size={42} weight="fill" color={INK} />
          <Pointer x1={310} y1={202} x2={364} y2={202} w={4.5} color={SIGNAL} head={11} />
          <ArrowsClockwise x={374} y={176} size={50} weight="fill" color={SIGNAL} />
          <ChatCircle x={446} y={180} size={42} weight="fill" color={INK} />
          <Pointer x1={500} y1={202} x2={554} y2={202} w={4.5} color={SIGNAL} head={11} />
          <ArrowsClockwise x={564} y={176} size={50} weight="fill" color={SIGNAL} />
          <Pointer x1={624} y1={202} x2={682} y2={202} w={4.5} color={SIGNAL} head={11} />
          <Package x={694} y={174} size={56} weight="fill" color={SIGNAL} />
        </g>
      )}

      {/* Stage 3: 4. Focus */}
      {active === 3 && (
        <g>
          <Arrow x1={176} x2={578} y={108} />
          <Package x={588} y={80} size={56} weight="fill" color={INK} />
          <Pointer x1={650} y1={108} x2={682} y2={108} w={4.5} head={11} />
          <Bullseye cx={724} cy={108} />

          <Package x={184} y={178} size={48} weight="fill" color={SIGNAL} />
          <Pointer x1={240} y1={202} x2={332} y2={202} w={4.5} color={SIGNAL} head={11} />
          <Package x={340} y={178} size={48} weight="fill" color={SIGNAL} />
          <Pointer x1={396} y1={202} x2={488} y2={192} w={4.5} color={SIGNAL} head={11} />
          <Package x={496} y={168} size={48} weight="fill" color={SIGNAL} />
          <Pointer x1={552} y1={192} x2={676} y2={188} w={4.5} color={SIGNAL} head={11} />
          <Bullseye cx={724} cy={188} />
        </g>
      )}
    </Plate>
  );
}

export function TradVsAgileTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeStage = TRAD_AGILE_STAGES[active] ?? TRAD_AGILE_STAGES[0];
  return (
    <Plate w={400} h={132} title={`Traditional vs. Agile stages; ${activeStage.label} is highlighted in red`}>
      {TRAD_AGILE_STAGES.map((st, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 14 : 206;
        const y = 12 + row * 58;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={st.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? st.label : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={y} width={180} height={48} fill={tone} />
            <text
              x={x + 90}
              y={y + 30}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={16}
              fill={CREAM}
            >
              {st.label}
            </text>
          </g>
        );
      })}
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

export function ScrumPrinciples1To3({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const xs = [20, 282, 544];
  const w = 236;
  const names = ["1. Empirical Process Control", "2. Self-Organization", "3. Collaboration"];
  const activeName = names[active] ?? names[0];

  return (
    <Plate
      w={800}
      h={248}
      title={`Principles of Scrum 1 to 3: 1. Empirical Process Control (a beam resting on three pillars: Transparency, Inspection, and Adaptation), 2. Self-Organization (a cross-functional team of three organizing their own work), and 3. Collaboration (team and stakeholders communicating in ceremonies); ${activeName} is highlighted in red`}
    >
      {xs.map((x, i) => {
        const cx = x + w / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={names[i]}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? names[i] : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={10} width={w} height={228} fill="transparent" />

            {/* Principle 1: Three pillars of Empirical Process Control */}
            {i === 0 && (
              <g>
                <rect x={x + 12} y={20} width={w - 24} height={24} fill={tone} />
                {[x + 48, cx, x + w - 48].map((px) => (
                  <g key={px}>
                    <rect x={px - 22} y={48} width={44} height={9} fill={tone} />
                    <rect x={px - 15} y={60} width={30} height={82} fill={tone} />
                    <rect x={px - 22} y={145} width={44} height={9} fill={tone} />
                  </g>
                ))}
              </g>
            )}

            {/* Principle 2: Self-Organization */}
            {i === 1 && (
              <g>
                <Gear x={346} y={16} size={38} weight="fill" color={tone} />
                <Lightbulb x={416} y={14} size={40} weight="fill" color={tone} />
                <Person x={332} y={72} k={0.84} hair="crop" />
                <Person x={468} y={72} k={0.84} hair="bun" flip />
                <Person x={400} y={56} k={1.0} hair="bob" gap />
              </g>
            )}

            {/* Principle 3: Collaboration */}
            {i === 2 && (
              <g>
                <ChatCircle x={604} y={18} size={46} weight="fill" color={tone} />
                <ChatCircle x={672} y={32} size={46} weight="fill" color={INK} />
                <Person x={604} y={64} k={0.92} hair="bun" />
                <Person x={720} y={64} k={0.92} hair="crop" flip />
              </g>
            )}

            {/* Bottom banner */}
            <rect x={x} y={172} width={w} height={64} fill={tone} />
            {i === 0 ? (
              <>
                <text
                  x={cx}
                  y={199}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight={700}
                  fontSize={17}
                  fill={CREAM}
                >
                  1. Empirical Process
                </text>
                <text
                  x={cx}
                  y={222}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight={700}
                  fontSize={17}
                  fill={CREAM}
                >
                  Control
                </text>
              </>
            ) : (
              <text
                x={cx}
                y={211}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={18}
                fill={CREAM}
              >
                {names[i]}
              </text>
            )}
          </g>
        );
      })}
    </Plate>
  );
}

export function ScrumPrinciples1To3Tall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const names = ["1. Empirical Process Control", "2. Self-Organization", "3. Collaboration"];
  const activeName = names[active] ?? names[0];
  return (
    <Plate w={400} h={172} title={`Principles of Scrum 1 to 3; ${activeName} is highlighted in red`}>
      {names.map((name, i) => {
        const y = 12 + i * 52;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? name : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={14} y={y} width={372} height={44} fill={tone} />
            <text
              x={200}
              y={y + 28}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={17}
              fill={CREAM}
            >
              {name}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function ScrumPrinciples4To6({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const xs = [20, 282, 544];
  const w = 236;
  const names = ["4. Value-Based Prioritization", "5. Time Boxing", "6. Iterative Development"];
  const activeName = names[active] ?? names[0];

  return (
    <Plate
      w={800}
      h={248}
      title={`Principles of Scrum 4 to 6: 4. Value-Based Prioritization (a Product Owner beside a prioritized Product Backlog), 5. Time Boxing (a clock inside a fixed boundary frame), and 6. Iterative Development (repeated small cycles producing an increment package); ${activeName} is highlighted in red`}
    >
      {xs.map((x, i) => {
        const cx = x + w / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={names[i]}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? names[i] : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={10} width={w} height={228} fill="transparent" />

            {/* Principle 4: Value-Based Prioritization */}
            {i === 0 && (
              <g>
                <Person x={78} y={52} k={1.04} hair="bob" />
                <Backlog x={138} y={36} w={88} n={5} tone={INK} />
                {isLit && <rect x={150} y={54} width={64} height={6} fill={SIGNAL} />}
              </g>
            )}

            {/* Principle 5: Time Boxing */}
            {i === 1 && (
              <g>
                <rect x={334} y={22} width={132} height={132} fill="none" stroke={tone} strokeWidth={5} />
                <Clock x={352} y={40} size={96} weight="fill" color={tone} />
              </g>
            )}

            {/* Principle 6: Iterative Development */}
            {i === 2 && (
              <g>
                <ArrowsClockwise x={560} y={64} size={46} weight="fill" color={tone} />
                <Pointer x1={610} y1={87} x2={634} y2={87} w={3.5} color={tone} head={9} />
                <ArrowsClockwise x={638} y={64} size={46} weight="fill" color={tone} />
                <Pointer x1={688} y1={87} x2={712} y2={87} w={3.5} color={tone} head={9} />
                <Package x={716} y={62} size={50} weight="fill" color={tone} />
              </g>
            )}

            {/* Bottom banner */}
            <rect x={x} y={172} width={w} height={64} fill={tone} />
            {i === 0 && (
              <>
                <text
                  x={cx}
                  y={199}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight={700}
                  fontSize={17}
                  fill={CREAM}
                >
                  4. Value-Based
                </text>
                <text
                  x={cx}
                  y={222}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight={700}
                  fontSize={17}
                  fill={CREAM}
                >
                  Prioritization
                </text>
              </>
            )}
            {i === 1 && (
              <text
                x={cx}
                y={211}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={18}
                fill={CREAM}
              >
                5. Time Boxing
              </text>
            )}
            {i === 2 && (
              <>
                <text
                  x={cx}
                  y={199}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight={700}
                  fontSize={17}
                  fill={CREAM}
                >
                  6. Iterative
                </text>
                <text
                  x={cx}
                  y={222}
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight={700}
                  fontSize={17}
                  fill={CREAM}
                >
                  Development
                </text>
              </>
            )}
          </g>
        );
      })}
    </Plate>
  );
}

export function ScrumPrinciples4To6Tall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const names = ["4. Value-Based Prioritization", "5. Time Boxing", "6. Iterative Development"];
  const activeName = names[active] ?? names[0];
  return (
    <Plate w={400} h={172} title={`Principles of Scrum 4 to 6; ${activeName} is highlighted in red`}>
      {names.map((name, i) => {
        const y = 12 + i * 52;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? name : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={14} y={y} width={372} height={44} fill={tone} />
            <text
              x={200}
              y={y + 28}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={17}
              fill={CREAM}
            >
              {name}
            </text>
          </g>
        );
      })}
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

export function ScrumProcess({
  mode,
  active = 0,
  onSelect,
}: {
  mode?: "events-first" | "events-second" | "artifacts";
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const isProdBacklog = mode === "artifacts" && active === 0;
  const isSprintBacklog = mode === "artifacts" && active === 1;
  const isIncrement = mode === "artifacts" && active === 2;

  const isSprint = mode === "events-first" && active === 0;
  const isPlanning = mode === "events-first" && active === 1;

  const isDaily = mode === "events-second" && active === 0;
  const isReview = mode === "events-second" && active === 1;
  const isRetro = mode === "events-second" && active === 2;

  const pbTone = isProdBacklog ? SIGNAL : INK;
  const sbTone = isSprintBacklog ? SIGNAL : INK;
  const incTone = isIncrement ? SIGNAL : INK;
  const sprintTone = isSprint ? SIGNAL : INK;
  const planTone = isPlanning ? SIGNAL : INK;
  const dailyTone = isDaily ? SIGNAL : INK;
  const reviewTone = isReview ? SIGNAL : INK;
  const retroTone = isRetro ? SIGNAL : INK;

  const cx = 440;
  const cy = 150;
  const R = 86;
  const at = (deg: number, r = R): [number, number] => [
    r2(cx + Math.cos((deg * Math.PI) / 180) * r),
    r2(cy + Math.sin((deg * Math.PI) / 180) * r),
  ];
  const [planX, planY] = at(180);
  const [revX, revY] = at(40);
  const [retX, retY] = at(100);
  const daily: [number, number] = at(-45, R + 32);

  const btnProps = (enabled: boolean, idx: number, label: string, isLit: boolean) =>
    enabled && onSelect
      ? {
          role: "button" as const,
          tabIndex: 0,
          "aria-pressed": isLit,
          "aria-label": label,
          onClick: () => onSelect(idx),
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(idx);
            }
          },
          className: "cursor-pointer outline-none focus:outline-none",
        }
      : {};

  const activeDesc =
    mode === "artifacts"
      ? ["Product Backlog", "Sprint Backlog", "Increment"][active]
      : mode === "events-first"
        ? ["Sprint", "Sprint Planning"][active]
        : mode === "events-second"
          ? ["Daily Scrum", "Sprint Review", "Sprint Retrospective"][active]
          : undefined;

  return (
    <Plate
      w={800}
      h={296}
      title={`Scrum methodology: a product backlog list feeds a shorter sprint backlog; an arrow marked sprint planning enters a large clockwise loop, the sprint of 1 to 4 weeks, with a small daily scrum loop at its top right; stops on the loop mark the sprint review and the sprint retrospective; an arrow leaves the loop to a package, the increment${
        activeDesc ? `. ${activeDesc} is highlighted in red` : ""
      }`}
    >
      {/* Artifact 1: Product Backlog */}
      <g {...btnProps(mode === "artifacts", 0, "Product Backlog", isProdBacklog)}>
        <rect x={12} y={62} width={108} height={224} fill="transparent" />
        <Backlog x={20} y={70} w={92} n={7} tone={pbTone} />
        {word(66, 252, "Product", pbTone)}
        {word(66, 274, "Backlog", pbTone)}
      </g>

      <Pointer x1={122} y1={150} x2={160} y2={150} w={4} />

      {/* Artifact 2: Sprint Backlog */}
      <g {...btnProps(mode === "artifacts", 1, "Sprint Backlog", isSprintBacklog)}>
        <rect x={162} y={100} width={90} height={146} fill="transparent" />
        <Backlog x={170} y={110} w={74} n={3} tone={sbTone} />
        {word(207, 212, "Sprint", sbTone)}
        {word(207, 234, "Backlog", sbTone)}
      </g>

      {/* Artifact 3: Increment */}
      <g {...btnProps(mode === "artifacts", 2, "Increment", isIncrement)}>
        <rect x={668} y={100} width={108} height={134} fill="transparent" />
        <Package x={676} y={108} size={88} weight="fill" color={incTone} />
        {word(720, 222, "Increment", incTone)}
      </g>

      {/* Event: Sprint (the main loop) */}
      <g {...btnProps(mode === "events-first", 0, "Sprint", isSprint)}>
        <circle cx={cx} cy={cy} r={R} fill="transparent" stroke={sprintTone} strokeWidth={12} />
        <Head x={cx + 14} y={cy - R} a={0} size={22} tone={sprintTone} />
        <Head x={cx - 14} y={cy + R} a={Math.PI} size={22} tone={sprintTone} />
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontWeight={700}
          fontSize={26}
          fill={sprintTone}
        >
          Sprint
        </text>
        {word(cx, cy + 26, "1 to 4 weeks", sprintTone)}
      </g>

      {/* Event: Sprint Planning (entry arrow + node) */}
      <g {...btnProps(mode === "events-first", 1, "Sprint Planning", isPlanning)}>
        <rect x={250} y={96} width={118} height={74} fill="transparent" />
        <Pointer x1={254} y1={cy} x2={cx - R - 14} y2={cy} w={isPlanning ? 5 : 4} color={planTone} />
        {word(296, 118, "Sprint", planTone, "middle", 14)}
        {word(296, 137, "Planning", planTone, "middle", 14)}
        <circle cx={planX} cy={planY} r={isPlanning ? 14 : 12} fill={planTone} stroke={CREAM} strokeWidth={3} />
      </g>

      {/* Event: Daily Scrum */}
      <g {...btnProps(mode === "events-second", 0, "Daily Scrum", isDaily)}>
        <rect x={daily[0] - 32} y={daily[1] - 32} width={172} height={64} fill="transparent" />
        <circle cx={daily[0]} cy={daily[1]} r={24} fill="none" stroke={dailyTone} strokeWidth={isDaily ? 7 : 6} />
        <Head x={daily[0] + 6} y={daily[1] - 24} a={0} size={13} tone={dailyTone} />
        {word(daily[0] + 36, daily[1] + 6, "Daily Scrum", dailyTone, "start", 14)}
      </g>

      {/* Event: Sprint Review */}
      <g {...btnProps(mode === "events-second", 1, "Sprint Review", isReview)}>
        <rect x={revX - 18} y={revY - 18} width={148} height={42} fill="transparent" />
        <circle cx={revX} cy={revY} r={isReview ? 14 : 12} fill={reviewTone} stroke={CREAM} strokeWidth={3} />
        {word(at(40, R + 20)[0], at(40, R + 20)[1] + 8, "Sprint Review", reviewTone, "start", 14)}
      </g>

      {/* Event: Sprint Retrospective */}
      <g {...btnProps(mode === "events-second", 2, "Sprint Retrospective", isRetro)}>
        <rect x={retX - 86} y={retY - 18} width={172} height={66} fill="transparent" />
        <circle cx={retX} cy={retY} r={isRetro ? 14 : 12} fill={retroTone} stroke={CREAM} strokeWidth={3} />
        {word(at(100, R + 24)[0], at(100, R + 24)[1] + 12, "Sprint Retrospective", retroTone, "middle", 14)}
      </g>

      {/* Increment exit arrow */}
      <Pointer x1={cx + R + 10} y1={cy} x2={664} y2={cy} w={4} />
    </Plate>
  );
}

/* ==========================================================================
   Roles in Scrum (Interactive, w=800 + Tall w=400) — Product Owner, Scrum
   Master, and Development Team
   ========================================================================== */

const SCRUM_ROLES = ["1. Product Owner", "2. Scrum Master", "3. Development Team"];

export function ScrumRolesHub({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const xs = [20, 282, 544];
  const w = 236;
  const activeName = SCRUM_ROLES[active] ?? SCRUM_ROLES[0];

  return (
    <Plate
      w={800}
      h={248}
      title={`Three primary roles in Scrum: 1. Product Owner (a person managing the prioritized product backlog), 2. Scrum Master (a shield between the team and external lightning interruptions), and 3. Development Team (three cross-functional members delivering the product increment package); ${activeName} is highlighted in red`}
    >
      {xs.map((x, i) => {
        const cx = x + w / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={SCRUM_ROLES[i]}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? SCRUM_ROLES[i] : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={x} y={10} width={w} height={228} fill="transparent" />

            {/* 1. Product Owner */}
            {i === 0 && (
              <g>
                <Person x={78} y={48} k={1.06} hair="bob" />
                <Backlog x={138} y={36} w={88} n={5} tone={INK} />
                {isLit && <rect x={150} y={54} width={64} height={6} fill={SIGNAL} />}
              </g>
            )}

            {/* 2. Scrum Master */}
            {i === 1 && (
              <g>
                <Person x={314} y={58} k={0.9} hair="bun" />
                <Person x={364} y={58} k={0.9} hair="crop" gap />
                <ShieldCheck x={406} y={48} size={66} weight="fill" color={tone} />
                <Lightning x={472} y={58} size={46} weight="fill" color={INK} />
              </g>
            )}

            {/* 3. Development Team */}
            {i === 2 && (
              <g>
                <Person x={576} y={60} k={0.88} hair="bun" />
                <Person x={624} y={60} k={0.88} hair="crop" gap />
                <Person x={672} y={60} k={0.88} hair="bob" gap />
                <Package x={716} y={78} size={52} weight="fill" color={tone} />
              </g>
            )}

            {/* Bottom banner */}
            <rect x={x} y={172} width={w} height={64} fill={tone} />
            <text
              x={cx}
              y={211}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={18}
              fill={CREAM}
            >
              {SCRUM_ROLES[i]}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function ScrumRolesHubTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const activeName = SCRUM_ROLES[active] ?? SCRUM_ROLES[0];
  return (
    <Plate w={400} h={172} title={`Roles in Scrum; ${activeName} is highlighted in red`}>
      {SCRUM_ROLES.map((name, i) => {
        const y = 12 + i * 52;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? name : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={14} y={y} width={372} height={44} fill={tone} />
            <text
              x={200}
              y={y + 28}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={17}
              fill={CREAM}
            >
              {name}
            </text>
          </g>
        );
      })}
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
