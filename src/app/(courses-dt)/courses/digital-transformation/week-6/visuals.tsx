"use client";

/* ==========================================================================
   Week 6, plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     - Person, every human (bust in profile)
     - Shop, the business (retail store, company)
     - Doc, recorded data / historical records
     - Monitor / MiniScreen, anything digital (AI system, ML model, app)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React from "react";
import {
  Cpu,
  Database,
  HardDrive,
  CloudRain,
  Sun,
  Cloud,
  Wind,
  TreeStructure,
  ChartLineUp,
  CursorClick,
  CheckCircle,
  XCircle,
  Tag,
  SquaresFour,
  Warning,
  MagnifyingGlass,
  MusicNotes,
  ChatCircleText,
  Car,
  FirstAid,
  BookOpen,
  SpeakerHigh,
  Crown,
  Sparkle,
  Bank,
  Camera,
  UsersThree,
  ShoppingBag,
  FilmSlate,
  Thermometer,
  Dna,
} from "@phosphor-icons/react";
import {
  WHITE,
  INK,
  SIGNAL,
  COUNTER,
  COUNTER_FILL,
  r2,
  Plate,
  Monitor,
  MiniScreen,
  Arrow,
  Pointer,
  Knob,
} from "../_visuals/kit";
import { Person, Shop, Doc } from "../_visuals/objects";

const HEAD = { fontFamily: "var(--font-sans)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-sans)", fontWeight: 600 } as const;

/* ==========================================================================
   1. Hero: Data documents feed into a framed screen holding nested realms
   of Artificial Intelligence, Machine Learning, and Deep Learning
   ========================================================================== */

export function HeroAiLayers() {
  return (
    <Plate
      w={520}
      h={340}
      title="Two data documents on the left feed via a red arrow into a framed screen holding three nested realms: Artificial Intelligence on the outside, Machine Learning in the middle, and a red Deep Learning neural network at the core"
    >
      {/* Two distinct data documents feeding into the screen */}
      <Doc x={28} y={42} k={0.68} />
      <Doc x={28} y={146} k={0.68} />

      <Arrow x1={104} x2={156} y={152} color={SIGNAL} />

      {/* Framed digital screen holding AI > ML > DL */}
      <Monitor x={166} y={18} w={334} h={268}>
        {/* Outer zone: Artificial Intelligence */}
        <rect x={188} y={38} width={290} height={226} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
        <text x={333} y={64} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
          Artificial Intelligence
        </text>

        {/* Middle zone: Machine Learning */}
        <rect x={212} y={78} width={242} height={172} fill={WHITE} stroke={INK} strokeWidth={3} />
        <text x={333} y={104} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
          Machine Learning
        </text>

        {/* Inner core: Deep Learning (SIGNAL red) */}
        <rect x={242} y={118} width={182} height={118} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={333} y={142} textAnchor="middle" {...BODY} fontSize={15.5} fill={INK}>
          Deep Learning
        </text>

        {/* Three-layer neural net silhouette inside Deep Learning */}
        {[166, 192, 218].map((ly) =>
          [166, 192, 218].map((ry) => (
            <path
              key={`l-${ly}-${ry}`}
              d={`M 284 ${ly} L 333 ${ry}`}
              stroke={WHITE}
              strokeWidth={1.6}
            />
          )),
        )}
        {[166, 192, 218].map((my) =>
          [179, 205].map((oy) => (
            <path
              key={`r-${my}-${oy}`}
              d={`M 333 ${my} L 382 ${oy}`}
              stroke={WHITE}
              strokeWidth={1.6}
            />
          )),
        )}
        {[166, 192, 218].map((y) => (
          <circle key={`in-${y}`} cx={284} cy={y} r={5.5} fill={WHITE} />
        ))}
        {[166, 192, 218].map((y) => (
          <circle key={`hid-${y}`} cx={333} cy={y} r={5.5} fill={WHITE} />
        ))}
        {[179, 205].map((y) => (
          <circle key={`out-${y}`} cx={382} cy={y} r={6.5} fill={WHITE} />
        ))}
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   2. Artificial Intelligence: Three forms of intelligence (Animal, Human,
   Artificial) as interactive selectable zones
   ========================================================================== */

const INTEL_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, label: "1. Animal" },
  { idx: 1, x0: 280, x1: 520, cx: 400, label: "2. Human" },
  { idx: 2, x0: 540, x1: 780, cx: 660, label: "3. Artificial" },
];

/* A clean silhouette of a migrating bird in flight */
function BirdGlyph({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path
        d="M -28 -8 C -16 -22 -4 -18 4 -6 C 14 -18 26 -22 36 -8 C 24 -10 14 -6 6 4 L 14 12 L 0 8 L -8 14 L -4 4 C -12 -6 -20 -10 -28 -8 Z"
        fill={tone}
      />
    </g>
  );
}

/* A clean 3-hexagon honeycomb cluster for bees building hives */
function HiveCluster({ cx, cy, tone = INK }: { cx: number; cy: number; tone?: string }) {
  const hex = (hx: number, hy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${r2(hx + r * Math.cos(a))},${r2(hy + r * Math.sin(a))}`;
    }).join(" ");
    return <polygon key={`${hx}-${hy}`} points={pts} fill={tone} stroke={WHITE} strokeWidth={2.5} />;
  };
  return (
    <g>
      {hex(cx - 17, cy - 10, 17)}
      {hex(cx + 17, cy - 10, 17)}
      {hex(cx, cy + 19, 17)}
    </g>
  );
}

export function IntelligenceTypesInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const t0 = active === 0 ? SIGNAL : INK;
  const t1 = active === 1 ? SIGNAL : INK;
  const t2 = active === 2 ? SIGNAL : INK;
  const activeName = INTEL_ZONES[active]?.label ?? "1. Animal";

  return (
    <Plate
      w={800}
      h={252}
      title={`Three selectable panels comparing forms of intelligence: 1. Animal (migrating birds in V-formation and a honeycomb hive), 2. Human (a person in profile with mathematical and musical creations), and 3. Artificial (a framed screen performing pattern recognition, language translation, and object detection). ${activeName} is selected in red`}
    >
      {/* Vertical dividers */}
      <path d="M 270 18 V 192 M 530 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Panel 1: Animal intelligence: migrating birds + honeycomb hive */}
      <BirdGlyph x={88} y={54} k={0.95} tone={t0} />
      <BirdGlyph x={136} y={38} k={1.05} tone={t0} />
      <BirdGlyph x={184} y={54} k={0.95} tone={t0} />
      <HiveCluster cx={140} cy={132} tone={t0} />

      {/* Panel 2: Human intelligence: person in profile + equation & music */}
      <Person x={354} y={64} k={1.18} variant={9} />
      <rect x={422} y={38} width={66} height={46} rx={4} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={455} y={68} textAnchor="middle" {...HEAD} fontSize={21} fill={INK}>
        ∑x²
      </text>
      <MusicNotes x={430} y={106} size={50} weight="fill" color={t1} />

      {/* Panel 3: Artificial intelligence: framed Monitor with 3 AI domains */}
      <Monitor x={568} y={28} w={184} h={124}>
        <Sparkle x={586} y={69} size={42} weight="fill" color={t2} />
        <ChatCircleText x={639} y={69} size={42} weight="fill" color={t2} />
        <Car x={692} y={69} size={42} weight="fill" color={t2} />
      </Monitor>

      {/* Interactive selector tabs at bottom */}
      {INTEL_ZONES.map((z) => {
        const isLit = z.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.label}
            style={onSelect ? { cursor: "pointer" } : undefined}
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
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
              {z.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function IntelligenceTypesTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const rows = [
    { idx: 0, y0: 14, label: "1. Animal" },
    { idx: 1, y0: 118, label: "2. Human" },
    { idx: 2, y0: 222, label: "3. Artificial" },
  ];
  return (
    <Plate
      w={400}
      h={326}
      title={`Three stacked selectable rows comparing 1. Animal, 2. Human, and 3. Artificial intelligence. ${rows[active]?.label ?? "1. Animal"} is selected in red`}
    >
      {rows.map((r) => {
        const isLit = r.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={r.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={r.label}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(r.idx) : undefined}
          >
            <rect x={16} y={r.y0} width={368} height={90} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={r.y0} width={140} height={90} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={86} y={r.y0 + 52} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
              {r.label}
            </text>
            {r.idx === 0 && (
              <>
                <BirdGlyph x={208} y={r.y0 + 44} k={0.85} tone={tone} />
                <HiveCluster cx={312} cy={r.y0 + 44} tone={tone} />
              </>
            )}
            {r.idx === 1 && (
              <>
                <Person x={222} y={r.y0 + 12} k={0.72} variant={9} />
                <MusicNotes x={296} y={r.y0 + 22} size={44} weight="fill" color={tone} />
              </>
            )}
            {r.idx === 2 && (
              <>
                <MiniScreen x={182} y={r.y0 + 10}>
                  <Sparkle x={196} y={r.y0 + 24} size={26} weight="fill" color={tone} />
                  <ChatCircleText x={228} y={r.y0 + 24} size={26} weight="fill" color={tone} />
                </MiniScreen>
                <MiniScreen x={282} y={r.y0 + 10}>
                  <Car x={309} y={r.y0 + 23} size={30} weight="fill" color={tone} />
                </MiniScreen>
              </>
            )}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   3. Which one is AI? - Four candidate digital systems inspected side by
   side (1. Rules-based chess, 2. Music recommender, 3. Dictionary spell-check,
   4. Text-to-speech synthesis)
   ========================================================================== */

const AI_CANDIDATES = [
  { idx: 0, x0: 20, x1: 195, cx: 107.5, tab: "1. Chess Game", badge: "Rules-Based AI", isAi: true },
  { idx: 1, x0: 215, x1: 390, cx: 302.5, tab: "2. Music Recs", badge: "Machine Learning", isAi: true },
  { idx: 2, x0: 410, x1: 585, cx: 497.5, tab: "3. Spell-Check", badge: "Dictionary Lookup", isAi: false },
  { idx: 3, x0: 605, x1: 780, cx: 692.5, tab: "4. ElevenLabs", badge: "Deep Learning AI", isAi: true },
];

export function WhichOneIsAiInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => {
    if (i !== active) return INK;
    return AI_CANDIDATES[i].isAi ? SIGNAL : COUNTER;
  };
  const current = AI_CANDIDATES[active] ?? AI_CANDIDATES[0];

  return (
    <Plate
      w={800}
      h={262}
      title={`Four selectable framed screens answering Which one is AI: 1. Chess Game (Rules-Based AI), 2. Music Recs (Machine Learning), 3. Spell-Check (Dictionary Lookup), and 4. ElevenLabs (Deep Learning AI). ${current.tab} (${current.badge}) is selected`}
    >
      {/* Dividers */}
      <path d="M 205 18 V 202 M 400 18 V 202 M 595 18 V 202" stroke={INK} strokeWidth={1.8} strokeDasharray="4 5" />

      {/* 1. Rules-based computer chess */}
      <Monitor x={42} y={20} w={131} h={96}>
        <Crown x={88.5} y={31} size={38} weight="fill" color={toneOf(0)} />
        <path d="M 107.5 72 L 84 90 M 107.5 72 L 131 90" stroke={toneOf(0)} strokeWidth={3} />
        <circle cx={84} cy={90} r={4.5} fill={toneOf(0)} />
        <circle cx={131} cy={90} r={4.5} fill={toneOf(0)} />
      </Monitor>

      {/* 2. Historical music recommendation */}
      <Monitor x={237} y={20} w={131} h={96}>
        <MusicNotes x={256} y={44} size={42} weight="fill" color={toneOf(1)} />
        <Pointer x1={302} y1={66} x2={324} y2={66} w={3.5} head={10} color={toneOf(1)} />
        <Sparkle x={326} y={48} size={34} weight="fill" color={toneOf(1)} />
      </Monitor>

      {/* 3. Dictionary spell-check */}
      <Monitor x={432} y={20} w={131} h={96}>
        <BookOpen x={475} y={44} size={46} weight="fill" color={toneOf(2)} />
      </Monitor>

      {/* 4. ElevenLabs text-to-speech */}
      <Monitor x={627} y={20} w={131} h={96}>
        <Doc x={646} y={44} k={0.38} tone={toneOf(3)} />
        <Pointer x1={686} y1={66} x2={706} y2={66} w={3.5} head={10} color={toneOf(3)} />
        <SpeakerHigh x={708} y={46} size={38} weight="fill" color={toneOf(3)} />
      </Monitor>

      {/* Category badges and bottom selector buttons */}
      {AI_CANDIDATES.map((c) => {
        const isLit = c.idx === active;
        const tone = toneOf(c.idx);
        return (
          <g
            key={c.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={`${c.tab}: ${c.badge}`}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(c.idx) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(c.idx);
                    }
                  }
                : undefined
            }
          >
            <rect x={c.x0} y={14} width={c.x1 - c.x0} height={238} fill="transparent" />
            <text x={c.cx} y={182} textAnchor="middle" {...BODY} fontSize={15} fill={INK}>
              {c.badge}
            </text>
            <rect x={c.x0} y={210} width={c.x1 - c.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={c.cx} y={235} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
              {c.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function WhichOneIsAiTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={384}
      title={`Four stacked selectable rows for Which one is AI: 1. Chess Game, 2. Music Recs, 3. Spell-Check, and 4. ElevenLabs. ${AI_CANDIDATES[active]?.tab ?? "1. Chess Game"} is selected`}
    >
      {AI_CANDIDATES.map((c, i) => {
        const y0 = 12 + i * 92;
        const isLit = i === active;
        const tone = isLit ? (c.isAi ? SIGNAL : COUNTER) : INK;
        return (
          <g
            key={c.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={`${c.tab}: ${c.badge}`}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={16} y={y0} width={368} height={84} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={156} height={84} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={94} y={y0 + 38} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
              {c.tab}
            </text>
            <text x={94} y={y0 + 60} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              {c.badge}
            </text>
            <MiniScreen x={236} y={y0 + 7}>
              {i === 0 && <Crown x={263} y={y0 + 20} size={30} weight="fill" color={tone} />}
              {i === 1 && <MusicNotes x={263} y={y0 + 20} size={30} weight="fill" color={tone} />}
              {i === 2 && <BookOpen x={263} y={y0 + 20} size={30} weight="fill" color={tone} />}
              {i === 3 && <SpeakerHigh x={263} y={y0 + 20} size={30} weight="fill" color={tone} />}
            </MiniScreen>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   4. Machine Learning: Contrasted with Rules-Based Expert Systems. Uses
   Data and Performance Metric to automatically find how to solve a Task
   ========================================================================== */

export function RulesVsMlInteractive() {
  const [dataPct, setDataPct] = React.useState(75);
  // Simulated performance metric: ML improves as data increases. Rules-based stays flat
  const mlScore = Math.round(50 + 46 * (1 - Math.exp(-dataPct / 34)));
  const rulesScore = 62;
  const barW = r2((mlScore / 100) * 144);

  return (
    <Plate
      w={800}
      h={242}
      title={`Left: Rules-Based Expert Systems in blue, where a person writes explicit rules for a screen and performance stays flat at ${rulesScore}%. Right: Machine Learning in red, where Data and a Performance Metric automatically train the model on a screen. Dragging the Data slider to ${dataPct}% raises the Performance Metric to ${mlScore}%`}
    >
      {/* Center divider */}
      <path d="M 392 18 V 226" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* LEFT: Rules-Based Expert Systems (COUNTER blue contrast) */}
      <text x={200} y={32} textAnchor="middle" {...HEAD} fontSize={19} fill={INK}>
        Rules-Based Expert Systems
      </text>
      <Doc x={88} y={58} k={0.62} tone={COUNTER} />
      <Pointer x1={154} y1={96} x2={208} y2={96} w={4} head={12} color={COUNTER} />
      <Monitor x={218} y={48} w={148} h={96}>
        <text x={297} y={84} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
          Fixed Rules
        </text>
        <rect x={251} y={98} width={92} height={14} fill={COUNTER_FILL} stroke={COUNTER} strokeWidth={1.5} />
        <rect x={251} y={98} width={r2((rulesScore / 100) * 92)} height={14} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={297} y={128} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
          Metric: {rulesScore}%
        </text>
      </Monitor>

      {/* RIGHT: Machine Learning (SIGNAL red focal point) */}
      <text x={596} y={32} textAnchor="middle" {...HEAD} fontSize={19} fill={INK}>
        Machine Learning (21st Century)
      </text>
      <Doc x={428} y={58} k={0.62} tone={SIGNAL} />
      <Pointer x1={494} y1={96} x2={532} y2={96} w={4} head={12} color={SIGNAL} />
      <Monitor x={540} y={44} w={218} h={104}>
        <text x={649} y={76} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
          Performance Metric: {mlScore}%
        </text>
        <rect x={577} y={86} width={144} height={16} fill={COUNTER} stroke={INK} strokeWidth={2} />
        <rect x={577} y={86} width={barW} height={16} fill={SIGNAL} />
        <text x={649} y={124} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
          Solves Task
        </text>
      </Monitor>

      {/* Interactive slider for Data volume */}
      <text x={428} y={214} {...BODY} fontSize={15.5} fill={INK}>
        Data: {dataPct}%
      </text>
      <path d="M 526 208 H 746" stroke={INK} strokeWidth={4} />
      <Knob
        x={526}
        y={208}
        len={220}
        value={dataPct}
        min={10}
        max={100}
        step={5}
        tone={SIGNAL}
        label="Training data volume"
        onChange={setDataPct}
      />
    </Plate>
  );
}

/* ==========================================================================
   5. Rise of Machine Learning: Increase in Compute Power, Increase in Data
   (Big Data), and Decrease in Storage Costs across the 21st century
   ========================================================================== */

export function RiseOfMlInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const [year, setYear] = React.useState(2020);
  const t = (year - 2000) / 25;
  const computePct = Math.round(12 + 88 * Math.pow(t, 1.3));
  const dataPct = Math.round(15 + 85 * Math.pow(t, 1.15));
  const storageCostPct = Math.round(100 - 94 * Math.pow(t, 0.85));

  const cols = [
    { idx: 0, x0: 24, x1: 252, cx: 138, title: "Compute Power", val: `${computePct}%`, pct: computePct, up: true, Icon: Cpu },
    { idx: 1, x0: 286, x1: 514, cx: 400, title: "Big Data", val: `${dataPct}%`, pct: dataPct, up: true, Icon: Database },
    { idx: 2, x0: 548, x1: 776, cx: 662, title: "Storage Costs", val: `${storageCostPct}%`, pct: storageCostPct, up: false, Icon: HardDrive },
  ];

  return (
    <Plate
      w={800}
      h={266}
      title={`Three 21st-century drivers of Machine Learning at year ${year}: Compute Power (${computePct}%, rising), Big Data (${dataPct}%, rising), and Storage Costs (${storageCostPct}%, falling), controlled by a timeline slider from 2000 to 2025`}
    >
      <path d="M 269 20 V 196 M 531 20 V 196" stroke={INK} strokeWidth={1.8} strokeDasharray="4 5" />

      {cols.map((c) => {
        const isLit = c.idx === active;
        const tone = isLit ? (c.up ? SIGNAL : COUNTER) : INK;
        const barW = r2((c.pct / 100) * 184);
        const Icon = c.Icon;
        return (
          <g
            key={c.title}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={c.title}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(c.idx) : undefined}
          >
            <rect x={c.x0} y={18} width={c.x1 - c.x0} height={178} fill="transparent" />
            <MiniScreen x={c.cx - 42} y={24}>
              <Icon x={c.cx - 16} y={36} size={32} weight="fill" color={tone} />
            </MiniScreen>
            <text x={c.cx} y={124} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
              {c.title}
            </text>
            <rect x={c.cx - 92} y={138} width={184} height={18} fill={WHITE} stroke={INK} strokeWidth={2} />
            <rect x={c.cx - 92} y={138} width={barW} height={18} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={c.cx} y={180} textAnchor="middle" {...BODY} fontSize={15} fill={INK}>
              {c.up ? `↑ ${c.val}` : `↓ ${c.val}`}
            </text>
          </g>
        );
      })}

      {/* Timeline slider along the bottom */}
      <path d="M 24 206 H 776" stroke={INK} strokeWidth={2} />
      <text x={160} y={242} textAnchor="end" {...HEAD} fontSize={18} fill={INK}>
        Year: {year}
      </text>
      <path d="M 190 236 H 650" stroke={INK} strokeWidth={4} />
      <Knob
        x={190}
        y={236}
        len={460}
        value={year}
        min={2000}
        max={2025}
        step={1}
        tone={SIGNAL}
        label="21st-century timeline year"
        onChange={setYear}
      />
      <text x={672} y={241} {...BODY} fontSize={14.5} fill={INK}>
        2000 to 2025
      </text>
    </Plate>
  );
}

/* ==========================================================================
   6. Decision Trees: Mentally formed Decision Tree to decide whether to go
   outside to play tennis (Outlook -> Humidity / Overcast / Wind -> Yes / No)
   ========================================================================== */

const TENNIS_PATHS = [
  { idx: 0, label: "Sunny | High", outlook: "Sunny", sub: "High", play: false, leafX: 88 },
  { idx: 1, label: "Sunny | Normal", outlook: "Sunny", sub: "Normal", play: true, leafX: 232 },
  { idx: 2, label: "Overcast", outlook: "Overcast", sub: "", play: true, leafX: 400 },
  { idx: 3, label: "Rain | Strong", outlook: "Rain", sub: "Strong", play: false, leafX: 568 },
  { idx: 4, label: "Rain | Weak", outlook: "Rain", sub: "Weak", play: true, leafX: 712 },
];

export function DecisionTreeInteractive() {
  const [pathIdx, setPathIdx] = React.useState(1);
  const cur = TENNIS_PATHS[pathIdx] ?? TENNIS_PATHS[1];
  const activeTone = cur.play ? SIGNAL : COUNTER;

  const isSunny = pathIdx === 0 || pathIdx === 1;
  const isOvercast = pathIdx === 2;
  const isRain = pathIdx === 3 || pathIdx === 4;

  return (
    <Plate
      w={800}
      h={304}
      title={`Interactive Decision Tree for playing tennis: root node Outlook branches to Sunny (Humidity: High -> No, Normal -> Yes), Overcast (Yes), and Rain (Wind: Strong -> No, Weak -> Yes). Active path: ${cur.label} -> ${cur.play ? "Yes" : "No"}`}
    >
      {/* Connectors from Outlook (400, 52) to Level 2 */}
      <path
        d="M 336 42 L 160 96"
        stroke={isSunny ? activeTone : INK}
        strokeWidth={isSunny ? 5 : 2.5}
      />
      <path
        d="M 400 56 V 184"
        stroke={isOvercast ? activeTone : INK}
        strokeWidth={isOvercast ? 5 : 2.5}
      />
      <path
        d="M 464 42 L 640 96"
        stroke={isRain ? activeTone : INK}
        strokeWidth={isRain ? 5 : 2.5}
      />

      {/* Branch labels under Outlook */}
      <Sun x={186} y={30} size={22} weight="fill" color={isSunny ? activeTone : INK} />
      <text x={214} y={47} {...BODY} fontSize={14.5} fill={INK}>
        Sunny
      </text>

      <Cloud x={364} y={96} size={22} weight="fill" color={isOvercast ? activeTone : INK} />
      <text x={412} y={113} {...BODY} fontSize={14.5} fill={INK}>
        Overcast
      </text>

      <CloudRain x={538} y={30} size={22} weight="fill" color={isRain ? activeTone : INK} />
      <text x={566} y={47} {...BODY} fontSize={14.5} fill={INK}>
        Rain
      </text>

      {/* Connectors from Humidity (160, 134) to leaves (88, 184) and (232, 184) */}
      <path
        d="M 134 134 L 88 184"
        stroke={pathIdx === 0 ? activeTone : INK}
        strokeWidth={pathIdx === 0 ? 5 : 2.5}
      />
      <text x={82} y={160} textAnchor="end" {...BODY} fontSize={14} fill={INK}>
        High
      </text>

      <path
        d="M 186 134 L 232 184"
        stroke={pathIdx === 1 ? activeTone : INK}
        strokeWidth={pathIdx === 1 ? 5 : 2.5}
      />
      <text x={238} y={160} {...BODY} fontSize={14} fill={INK}>
        Normal
      </text>

      {/* Connectors from Wind (640, 134) to leaves (568, 184) and (712, 184) */}
      <path
        d="M 614 134 L 568 184"
        stroke={pathIdx === 3 ? activeTone : INK}
        strokeWidth={pathIdx === 3 ? 5 : 2.5}
      />
      <text x={562} y={160} textAnchor="end" {...BODY} fontSize={14} fill={INK}>
        Strong
      </text>

      <path
        d="M 666 134 L 712 184"
        stroke={pathIdx === 4 ? activeTone : INK}
        strokeWidth={pathIdx === 4 ? 5 : 2.5}
      />
      <text x={718} y={160} {...BODY} fontSize={14} fill={INK}>
        Weak
      </text>

      {/* Root Node: Outlook */}
      <rect x={336} y={16} width={128} height={40} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={400} y={42} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
        Outlook
      </text>

      {/* Internal Node: Humidity */}
      <rect x={96} y={96} width={128} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={160} y={121} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
        Humidity
      </text>

      {/* Internal Node: Wind */}
      <rect x={576} y={96} width={128} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={640} y={121} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
        Wind
      </text>

      {/* Five Leaf Nodes + Bottom Selector Buttons */}
      {TENNIS_PATHS.map((p) => {
        const isLit = p.idx === pathIdx;
        const leafTone = isLit ? (p.play ? SIGNAL : COUNTER) : INK;
        const tabX = 20 + p.idx * 154;
        return (
          <g
            key={p.label}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`${p.label}: Play tennis ${p.play ? "Yes" : "No"}`}
            style={{ cursor: "pointer" }}
            onClick={() => setPathIdx(p.idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPathIdx(p.idx);
              }
            }}
          >
            {/* Leaf box */}
            <rect
              x={p.leafX - 46}
              y={184}
              width={92}
              height={40}
              fill={INK}
              fillOpacity={isLit ? 0.12 : 0.05}
              stroke={INK}
              strokeWidth={isLit ? 2 : 1.5}
            />
            <text x={p.leafX} y={210} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
              {p.play ? "Yes" : "No"}
            </text>

            {/* Bottom scenario selector button */}
            <rect x={tabX} y={248} width={144} height={40} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={tabX + 72} y={273} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
              {p.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   7. Linear Regression: Retail transaction data (Price of items and their
   Sales) with a fitted regression line predicting continuous Sales from Price
   ========================================================================== */

const RETAIL_POINTS: [number, number][] = [
  [12, 88],
  [16, 76],
  [20, 78],
  [24, 64],
  [28, 60],
  [33, 55],
  [38, 42],
  [43, 38],
  [48, 28],
];

export function LinearRegressionInteractive() {
  const [price, setPrice] = React.useState(25);
  // Linear model: sales = 104 - 1.55 * price
  const predSales = Math.round(104 - 1.55 * price);

  const xOf = (p: number) => r2(68 + ((p - 10) / 40) * 304);
  const yOf = (s: number) => r2(198 - ((s - 15) / 85) * 142);

  const px = xOf(price);
  const py = yOf(predSales);

  return (
    <Plate
      w={400}
      h={308}
      title={`Linear Regression scatter plot of retail store transactions with Price on the horizontal axis and Sales on the vertical axis. At Price $${price}, the red regression line predicts Sales of ${predSales} units`}
    >
      {/* Prediction readout badge above plot */}
      <rect x={68} y={10} width={196} height={30} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={166} y={30} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
        Price ${price} → Sales: {predSales}
      </text>

      {/* Axes */}
      <path d="M 68 48 V 198 H 376" fill="none" stroke={INK} strokeWidth={3} />
      <text x={14} y={126} {...HEAD} fontSize={15} fill={INK}>
        Sales
      </text>
      <text x={58} y={60} textAnchor="end" {...BODY} fontSize={12.5} fill={INK}>
        95
      </text>
      <text x={58} y={194} textAnchor="end" {...BODY} fontSize={12.5} fill={INK}>
        20
      </text>

      {/* Recorded retail transaction points */}
      {RETAIL_POINTS.map(([p, s]) => (
        <circle key={p} cx={xOf(p)} cy={yOf(s)} r={5.5} fill={INK} />
      ))}

      {/* Fitted Linear Regression line */}
      <path
        d={`M ${xOf(10)} ${yOf(104 - 1.55 * 10)} L ${xOf(50)} ${yOf(104 - 1.55 * 50)}`}
        stroke={SIGNAL}
        strokeWidth={4.5}
      />

      {/* Dashed projection from selected Price to Predicted Sales */}
      <path
        d={`M ${px} 198 V ${py} H 68`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.2}
        strokeDasharray="5 4"
      />
      <circle cx={px} cy={py} r={8.5} fill={SIGNAL} stroke={WHITE} strokeWidth={2.5} />

      {/* Interactive Price slider */}
      <text x={68} y={232} {...BODY} fontSize={14.5} fill={INK}>
        Price ($10: $50)
      </text>
      <path d="M 68 262 H 372" stroke={INK} strokeWidth={4} />
      <Knob
        x={68}
        y={262}
        len={304}
        value={price}
        min={10}
        max={50}
        step={2}
        tone={SIGNAL}
        label="Item price in dollars"
        onChange={setPrice}
      />
    </Plate>
  );
}

/* ==========================================================================
   8. Logistic Regression: Historical click data for a retail website
   predicting binary outcome (Click = 1 vs No Click = 0) along a sigmoid curve
   ========================================================================== */

const NO_CLICK_X = [8, 16, 24, 32, 39, 46];
const CLICK_X = [54, 62, 70, 78, 86, 94];

export function LogisticRegressionInteractive() {
  const [score, setScore] = React.useState(68);
  const prob = 1 / (1 + Math.exp(-(score - 50) / 11));
  const pct = Math.round(prob * 100);
  const willClick = prob >= 0.5;
  const activeTone = willClick ? SIGNAL : COUNTER;

  const xOf = (v: number) => r2(68 + (v / 100) * 304);
  const yOf = (p: number) => r2(188 - p * 128);

  const curvePts = Array.from({ length: 41 }, (_, i) => {
    const v = i * 2.5;
    const p = 1 / (1 + Math.exp(-(v - 50) / 11));
    return `${i === 0 ? "M" : "L"} ${xOf(v)} ${yOf(p)}`;
  }).join(" ");

  const cx = xOf(score);
  const cy = yOf(prob);

  return (
    <Plate
      w={400}
      h={308}
      title={`Logistic Regression S-curve for retail website click prediction: customer match score ${score} yields ${pct}% probability, predicting ${willClick ? "Click (1)" : "No Click (0)"}`}
    >
      {/* Binary prediction badge above plot */}
      <rect x={68} y={10} width={196} height={30} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={166} y={30} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
        {willClick ? `Click (1) | ${pct}%` : `No Click (0) | ${pct}%`}
      </text>

      {/* Axes */}
      <path d="M 68 48 V 196 H 376" fill="none" stroke={INK} strokeWidth={3} />
      <text x={56} y={64} textAnchor="end" {...BODY} fontSize={12.5} fill={INK}>
        1
      </text>
      <text x={56} y={128} textAnchor="end" {...BODY} fontSize={12.5} fill={INK}>
        0.5
      </text>
      <text x={56} y={192} textAnchor="end" {...BODY} fontSize={12.5} fill={INK}>
        0
      </text>

      {/* 0.5 Decision threshold line */}
      <path d="M 68 124 H 372" stroke={INK} strokeWidth={1.8} strokeDasharray="5 5" />

      {/* Historical binary click outcomes (0 = No click, 1 = Click) */}
      {NO_CLICK_X.map((v) => (
        <circle key={`nc-${v}`} cx={xOf(v)} cy={188} r={5} fill={COUNTER} />
      ))}
      {CLICK_X.map((v) => (
        <circle key={`c-${v}`} cx={xOf(v)} cy={60} r={5} fill={SIGNAL} />
      ))}

      {/* Logistic sigmoid curve */}
      <path d={curvePts} fill="none" stroke={INK} strokeWidth={4} />

      {/* Active customer projection & point */}
      <path d={`M ${cx} 196 V ${cy} H 68`} fill="none" stroke={activeTone} strokeWidth={2.2} strokeDasharray="4 4" />
      <circle cx={cx} cy={cy} r={8.5} fill={activeTone} stroke={WHITE} strokeWidth={2.5} />

      {/* Customer & product match slider */}
      <text x={68} y={232} {...BODY} fontSize={14.5} fill={INK}>
        Customer &amp; Product Match: {score}
      </text>
      <path d="M 68 262 H 372" stroke={INK} strokeWidth={4} />
      <Knob
        x={68}
        y={262}
        len={304}
        value={score}
        min={0}
        max={100}
        step={4}
        tone={activeTone}
        label="Customer and product characteristics score"
        onChange={setScore}
      />
    </Plate>
  );
}

/* ==========================================================================
   9. Ensemble Learning: Three independent weather apps (Apple Weather,
   AccuWeather, Google Weather, each 70% accuracy) combine by majority vote
   ========================================================================== */

const WEATHER_APPS = ["Apple Weather", "AccuWeather", "Google Weather"] as const;

export function EnsembleWeatherInteractive() {
  const [votes, setVotes] = React.useState<[boolean, boolean, boolean]>([true, true, false]);
  const rainCount = votes.filter(Boolean).length;
  const ensembleRain = rainCount >= 2;
  const outTone = ensembleRain ? SIGNAL : COUNTER;

  const toggleApp = (idx: number) => {
    setVotes((prev) => {
      const next: [boolean, boolean, boolean] = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <Plate
      w={400}
      h={340}
      title={`Interactive Ensemble Learning weather forecast: Apple Weather (${votes[0] ? "rain" : "no rain"}), AccuWeather (${votes[1] ? "rain" : "no rain"}), and Google Weather (${votes[2] ? "rain" : "no rain"}) combine by majority vote (${rainCount} of 3) to predict ${ensembleRain ? "rain" : "no rain"}`}
    >
      {WEATHER_APPS.map((name, i) => {
        const y0 = 14 + i * 88;
        const saysRain = votes[i];
        const tone = saysRain ? SIGNAL : COUNTER;
        const targetY = 116 + (i - 1) * 26;
        return (
          <g
            key={name}
            role="button"
            tabIndex={0}
            aria-pressed={saysRain}
            aria-label={`${name}: ${saysRain ? "rain" : "no rain"} (click to toggle)`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleApp(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleApp(i);
              }
            }}
          >
            <MiniScreen x={18} y={y0}>
              {saysRain ? (
                <CloudRain x={45} y={y0 + 13} size={30} weight="fill" color={SIGNAL} />
              ) : (
                <Sun x={45} y={y0 + 13} size={30} weight="fill" color={COUNTER} />
              )}
            </MiniScreen>
            <text x={110} y={y0 + 24} {...BODY} fontSize={13} fill={INK}>
              {name}
            </text>
            <text x={110} y={y0 + 45} {...HEAD} fontSize={15} fill={INK}>
              {saysRain ? "“rain”" : "“no rain”"}
            </text>
            <Pointer x1={208} y1={y0 + 34} x2={250} y2={targetY} w={3.5} head={10} color={tone} />
          </g>
        );
      })}

      {/* Majority Vote Ensemble Box */}
      <rect x={256} y={76} width={128} height={116} fill={INK} fillOpacity={0.04} stroke={INK} strokeWidth={1.5} />
      <text x={320} y={106} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
        Majority Vote
      </text>
      <text x={320} y={134} textAnchor="middle" {...HEAD} fontSize={22} fill={INK}>
        {ensembleRain ? "“rain”" : "“no rain”"}
      </text>
      <text x={320} y={162} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
        {rainCount} of 3 apps
      </text>

      {/* Preset outcome buttons matching the 3 slide outcomes */}
      {[
        { label: "3 rain", state: [true, true, true] as [boolean, boolean, boolean] },
        { label: "2 rain, 1 no", state: [true, true, false] as [boolean, boolean, boolean] },
        { label: "1 rain, 2 no", state: [true, false, false] as [boolean, boolean, boolean] },
      ].map((p, i) => {
        const bx = 18 + i * 124;
        const activePreset =
          (i === 0 && rainCount === 3) || (i === 1 && rainCount === 2) || (i === 2 && rainCount === 1);
        return (
          <g
            key={p.label}
            role="button"
            tabIndex={0}
            aria-pressed={activePreset}
            aria-label={p.label}
            style={{ cursor: "pointer" }}
            onClick={() => setVotes(p.state)}
          >
            <rect
              x={bx}
              y={290}
              width={116}
              height={36}
              fill={INK}
              fillOpacity={activePreset ? 0.08 : 0.03}
              stroke={INK}
              strokeWidth={activePreset ? 2 : 1.25}
            />
            <text x={bx + 58} y={313} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
              {p.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   10. Random Forest: Five selectable stages: 1. Ensemble Method,
   2. Diversity, 3. Voting/Averaging, 4. Robustness, 5. Advantages
   ========================================================================== */

const RF_ZONES = [
  { idx: 0, x0: 16, x1: 160, cx: 88, tab: "1. Ensemble" },
  { idx: 1, x0: 172, x1: 316, cx: 244, tab: "2. Diversity" },
  { idx: 2, x0: 328, x1: 472, cx: 400, tab: "3. Voting" },
  { idx: 3, x0: 484, x1: 628, cx: 556, tab: "4. Robustness" },
  { idx: 4, x0: 640, x1: 784, cx: 712, tab: "5. Advantages" },
];

/* Small decision tree glyph inside a box */
function MiniTreeGlyph({ cx, cy, variant, tone }: { cx: number; cy: number; variant: number; tone: string }) {
  const lx = variant === 1 ? cx - 10 : cx - 16;
  const rx = variant === 2 ? cx + 10 : cx + 16;
  return (
    <g>
      <path d={`M ${cx} ${cy - 14} L ${lx} ${cy + 12} M ${cx} ${cy - 14} L ${rx} ${cy + 12}`} stroke={tone} strokeWidth={3} />
      <circle cx={cx} cy={cy - 14} r={5.5} fill={tone} />
      <circle cx={lx} cy={cy + 12} r={5} fill={tone} />
      <circle cx={rx} cy={cy + 12} r={5} fill={tone} />
    </g>
  );
}

export function RandomForestInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const current = RF_ZONES[active] ?? RF_ZONES[0];

  return (
    <Plate
      w={800}
      h={256}
      title={`Five selectable stages of Random Forest: 1. Ensemble (random data subsets), 2. Diversity (independent trees), 3. Voting (majority class or average prediction), 4. Robustness (reduced overfitting), and 5. Advantages (accuracy and feature importance). ${current.tab} is selected in red`}
    >
      <path
        d="M 166 18 V 192 M 322 18 V 192 M 478 18 V 192 M 634 18 V 192"
        stroke={INK}
        strokeWidth={1.6}
        strokeDasharray="4 5"
      />

      {/* 1. Ensemble Method: dataset splitting into 3 random subsets */}
      <Doc x={26} y={56} k={0.48} tone={toneOf(0)} />
      <Pointer x1={76} y1={84} x2={104} y2={52} w={3} head={9} color={toneOf(0)} />
      <Pointer x1={76} y1={84} x2={104} y2={84} w={3} head={9} color={toneOf(0)} />
      <Pointer x1={76} y1={84} x2={104} y2={116} w={3} head={9} color={toneOf(0)} />
      {[40, 74, 108].map((y, i) => (
        <rect key={i} x={110} y={y} width={40} height={22} fill={toneOf(0)} />
      ))}

      {/* 2. Diversity: 3 independent trees on a framed screen */}
      <Monitor x={180} y={36} w={128} h={96}>
        {[206, 244, 282].map((cx, i) => (
          <g key={cx}>
            <path
              d={`M ${cx} ${64 + (i === 1 ? -4 : 2)} L ${cx - 10} 96 M ${cx} ${64 + (i === 1 ? -4 : 2)} L ${cx + 10} 96`}
              stroke={toneOf(1)}
              strokeWidth={2.5}
            />
            <circle cx={cx} cy={64 + (i === 1 ? -4 : 2)} r={4.5} fill={toneOf(1)} />
            <circle cx={cx - 10} cy={96} r={4} fill={toneOf(1)} />
            <circle cx={cx + 10} cy={96} r={4} fill={toneOf(1)} />
          </g>
        ))}
      </Monitor>

      {/* 3. Voting / Averaging */}
      {[50, 88, 126].map((y, i) => (
        <g key={y}>
          <rect
            x={340}
            y={y - 12}
            width={36}
            height={24}
            fill={INK}
            fillOpacity={0.04}
            stroke={INK}
            strokeWidth={1.5}
          />
          <text x={358} y={y + 5} textAnchor="middle" {...HEAD} fontSize={13.5} fill={INK}>
            {i < 2 ? "A" : "B"}
          </text>
          <Pointer x1={380} y1={y} x2={412} y2={88} w={3} head={9} color={toneOf(2)} />
        </g>
      ))}
      <rect x={416} y={64} width={48} height={48} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      <text x={440} y={95} textAnchor="middle" {...HEAD} fontSize={20} fill={INK}>
        A
      </text>

      {/* 4. Robustness: generalized smooth fit vs noisy single tree */}
      <path d="M 498 148 V 44 M 498 148 H 616" stroke={INK} strokeWidth={2.5} />
      <path
        d="M 506 132 L 526 56 L 548 136 L 570 60 L 592 124 L 610 58"
        fill="none"
        stroke={COUNTER}
        strokeWidth={2}
        strokeDasharray="4 3"
      />
      <path
        d="M 506 128 Q 558 68 612 64"
        fill="none"
        stroke={toneOf(3)}
        strokeWidth={4.5}
      />

      {/* 5. Advantages: Feature importance bars */}
      <text x={712} y={40} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Feature Importance
      </text>
      {[
        { y: 58, w: 92, name: "1" },
        { y: 90, w: 64, name: "2" },
        { y: 122, w: 36, name: "3" },
      ].map((f) => (
        <g key={f.name}>
          <text x={656} y={f.y + 14} {...BODY} fontSize={13.5} fill={INK}>
            {f.name}
          </text>
          <rect x={674} y={f.y} width={f.w} height={18} fill={toneOf(4)} />
        </g>
      ))}

      {/* Bottom interactive tabs */}
      {RF_ZONES.map((z) => {
        const isLit = z.idx === active;
        const tone = toneOf(z.idx);
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
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
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function RandomForestTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={340}
      title={`Five stacked selectable rows for Random Forest stages. ${RF_ZONES[active]?.tab ?? "1. Ensemble"} is selected in red`}
    >
      {RF_ZONES.map((z, i) => {
        const y0 = 14 + i * 63;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={16} y={y0} width={368} height={52} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={160} height={52} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={96} y={y0 + 32} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
              {z.tab}
            </text>
            {i === 0 && <Doc x={266} y={y0 + 8} k={0.31} tone={tone} />}
            {i === 1 && <TreeStructure x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 2 && <CheckCircle x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 3 && <ChartLineUp x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 4 && <Sparkle x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   11. Supervised vs. Unsupervised Learning: Labeled data mapped to
   known targets (Hedonic vs Utility) vs Unlabeled data grouped into clusters
   ========================================================================== */

export function SupervisedVsUnsupervisedInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const supTone = active === 0 ? SIGNAL : INK;
  const unsupTone = active === 1 ? SIGNAL : INK;

  return (
    <Plate
      w={800}
      h={256}
      title={`Two selectable learning paradigms: 1. Supervised Learning (labeled customer data classified into Hedonic vs. Utility on a framed screen) and 2. Unsupervised Learning (unlabeled customer data grouped into natural clusters on a framed screen). ${active === 0 ? "1. Supervised Learning" : "2. Unsupervised Learning"} is selected in red`}
    >
      <path d="M 400 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* LEFT: Supervised Learning: Labeled data (Hedonic vs Utility) */}
      <Doc x={36} y={36} k={0.42} tone={supTone} />
      <Tag x={82} y={42} size={22} weight="fill" color={supTone} />
      <Doc x={36} y={104} k={0.42} tone={COUNTER} />
      <Tag x={82} y={112} size={22} weight="fill" color={COUNTER} />
      <Pointer x1={112} y1={90} x2={144} y2={90} w={3.5} head={11} color={supTone} />

      <Monitor x={152} y={22} w={216} h={132}>
        <text x={208} y={48} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
          Hedonic
        </text>
        <circle cx={192} cy={68} r={6} fill={supTone} />
        <circle cx={216} cy={82} r={6} fill={supTone} />
        <circle cx={188} cy={98} r={6} fill={supTone} />

        {/* Learned decision boundary */}
        <path d="M 244 38 L 272 138" stroke={supTone} strokeWidth={3.5} strokeDasharray="5 4" />

        <text x={312} y={48} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
          Utility
        </text>
        <rect x={294} y={66} width={11} height={11} fill={COUNTER} />
        <rect x={318} y={84} width={11} height={11} fill={COUNTER} />
        <rect x={298} y={106} width={11} height={11} fill={COUNTER} />
      </Monitor>

      {/* RIGHT: Unsupervised Learning: Unlabeled data grouped into clusters */}
      <Doc x={428} y={36} k={0.42} tone={unsupTone} />
      <Doc x={428} y={104} k={0.42} tone={unsupTone} />
      <Pointer x1={484} y1={90} x2={524} y2={90} w={3.5} head={11} color={unsupTone} />

      <Monitor x={532} y={22} w={216} h={132}>
        {/* Discovered Cluster 1 */}
        <circle cx={596} cy={84} r={34} fill="none" stroke={unsupTone} strokeWidth={3} strokeDasharray="5 4" />
        <circle cx={586} cy={74} r={5.5} fill={unsupTone} />
        <circle cx={608} cy={80} r={5.5} fill={unsupTone} />
        <circle cx={592} cy={96} r={5.5} fill={unsupTone} />

        {/* Discovered Cluster 2 */}
        <circle cx={686} cy={92} r={34} fill="none" stroke={unsupTone} strokeWidth={3} strokeDasharray="5 4" />
        <circle cx={676} cy={82} r={5.5} fill={unsupTone} />
        <circle cx={698} cy={88} r={5.5} fill={unsupTone} />
        <circle cx={684} cy={104} r={5.5} fill={unsupTone} />
      </Monitor>

      {/* Interactive selector tabs */}
      {[
        { idx: 0, x0: 20, x1: 386, cx: 203, label: "1. Supervised Learning (Labeled)" },
        { idx: 1, x0: 414, x1: 780, cx: 597, label: "2. Unsupervised Learning (Unlabeled)" },
      ].map((t) => {
        const isLit = t.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={t.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={t.label}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(t.idx) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(t.idx);
                    }
                  }
                : undefined
            }
          >
            <rect x={t.x0} y={14} width={t.x1 - t.x0} height={228} fill="transparent" />
            <rect x={t.x0} y={202} width={t.x1 - t.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={t.cx} y={226} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
              {t.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function SupervisedVsUnsupervisedTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const rows = [
    { idx: 0, y0: 16, label: "1. Supervised Learning", sub: "Labeled Data" },
    { idx: 1, y0: 132, label: "2. Unsupervised Learning", sub: "Unlabeled Data" },
  ];
  return (
    <Plate
      w={400}
      h={244}
      title={`Two stacked selectable rows comparing 1. Supervised Learning (Labeled Data) and 2. Unsupervised Learning (Unlabeled Data). ${rows[active]?.label ?? "1. Supervised Learning"} is selected`}
    >
      {rows.map((r) => {
        const isLit = r.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={r.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={r.label}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(r.idx) : undefined}
          >
            <rect x={16} y={r.y0} width={368} height={96} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={r.y0} width={216} height={96} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={124} y={r.y0 + 44} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
              {r.label}
            </text>
            <text x={124} y={r.y0 + 68} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
              {r.sub}
            </text>
            {r.idx === 0 ? (
              <Tag x={286} y={r.y0 + 26} size={44} weight="fill" color={tone} />
            ) : (
              <SquaresFour x={286} y={r.y0 + 26} size={44} weight="fill" color={tone} />
            )}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   12. Popular Algorithms, When to Use, and Challenges: Three selectable
   lenses comparing Supervised and Unsupervised learning
   ========================================================================== */

const LENS_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, tab: "1. Popular Algorithms" },
  { idx: 1, x0: 280, x1: 520, cx: 400, tab: "2. When to Use" },
  { idx: 2, x0: 540, x1: 780, cx: 660, tab: "3. Challenges" },
];

export function ParadigmLensInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = LENS_ZONES[active] ?? LENS_ZONES[0];

  return (
    <Plate
      w={800}
      h={252}
      title={`Three selectable lenses comparing Supervised and Unsupervised learning: 1. Popular Algorithms (SVM and Neural Networks vs K-Means and PCA), 2. When to Use (Sales forecasting vs Gene grouping and anomaly detection), and 3. Challenges (Costly labeling and overfitting vs Subjective evaluation). ${cur.tab} is selected in red`}
    >
      <path d="M 270 18 V 192 M 530 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* 1. Popular Algorithms: Supervised (SVM boundary) vs Unsupervised (K-Means/PCA) */}
      <MiniScreen x={38} y={34}>
        <path d="M 52 74 L 108 46" stroke={toneOf(0)} strokeWidth={3.5} />
        <circle cx={62} cy={52} r={4.5} fill={toneOf(0)} />
        <circle cx={96} cy={72} r={4.5} fill={COUNTER} />
      </MiniScreen>
      <text x={80} y={132} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        SVM | Trees
      </text>

      <MiniScreen x={158} y={34}>
        <circle cx={186} cy={62} r={12} fill="none" stroke={COUNTER} strokeWidth={2.5} />
        <circle cx={214} cy={62} r={12} fill="none" stroke={COUNTER} strokeWidth={2.5} />
        <circle cx={186} cy={62} r={3.5} fill={COUNTER} />
        <circle cx={214} cy={62} r={3.5} fill={COUNTER} />
      </MiniScreen>
      <text x={200} y={132} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        K-Means | PCA
      </text>

      {/* 2. When to Use: Forecasting sales vs Grouping genes */}
      <MiniScreen x={298} y={34}>
        <ChartLineUp x={324} y={46} size={32} weight="fill" color={toneOf(1)} />
      </MiniScreen>
      <text x={340} y={132} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Sales Goal
      </text>

      <MiniScreen x={418} y={34}>
        <Dna x={444} y={46} size={32} weight="fill" color={COUNTER} />
      </MiniScreen>
      <text x={460} y={132} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Group Genes
      </text>

      {/* 3. Challenges: Costly labels & overfitting vs Subjective without ground truth */}
      <MiniScreen x={558} y={34}>
        <Tag x={572} y={48} size={26} weight="fill" color={toneOf(2)} />
        <Warning x={602} y={48} size={26} weight="fill" color={toneOf(2)} />
      </MiniScreen>
      <text x={600} y={132} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Overfitting
      </text>

      <MiniScreen x={678} y={34}>
        <MagnifyingGlass x={704} y={46} size={32} weight="fill" color={COUNTER} />
      </MiniScreen>
      <text x={720} y={132} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Subjective
      </text>

      {/* Bottom selector buttons */}
      {LENS_ZONES.map((z) => {
        const isLit = z.idx === active;
        const tone = toneOf(z.idx);
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
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
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function ParadigmLensTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={278}
      title={`Three stacked selectable rows for 1. Popular Algorithms, 2. When to Use, and 3. Challenges. ${LENS_ZONES[active]?.tab ?? "1. Popular Algorithms"} is selected`}
    >
      {LENS_ZONES.map((z, i) => {
        const y0 = 14 + i * 86;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={16} y={y0} width={368} height={74} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={224} height={74} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={128} y={y0 + 43} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
              {z.tab}
            </text>
            {i === 0 && <TreeStructure x={292} y={y0 + 18} size={38} weight="fill" color={tone} />}
            {i === 1 && <ChartLineUp x={292} y={y0 + 18} size={38} weight="fill" color={tone} />}
            {i === 2 && <Warning x={292} y={y0 + 18} size={38} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   13. Comparison Table Companion Plate: Visualizes the selected Aspect row
   (1. Data, 2. Goal, 3. Feedback, 4. Common Tasks, 5. Evaluation Metrics)
   for Supervised vs. Unsupervised Learning
   ========================================================================== */

const ASPECT_NAMES = ["Data", "Goal", "Feedback", "Common Tasks", "Evaluation Metrics"] as const;

export function ComparisonAspectPlate({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const aspectName = ASPECT_NAMES[active] ?? "Data";

  return (
    <Plate
      w={400}
      h={312}
      title={`Visual comparison of Supervised Learning (top, in red) and Unsupervised Learning (bottom, in blue) for ${aspectName}`}
    >
      {/* Aspect header bar */}
      <rect x={20} y={14} width={360} height={34} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={200} y={37} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
        Aspect: {aspectName}
      </text>

      {/* TOP HALF: Supervised Learning (SIGNAL red) */}
      <text x={24} y={84} {...HEAD} fontSize={17} fill={INK}>
        Supervised
      </text>
      <MiniScreen x={164} y={58}>
        {active === 0 && <Tag x={190} y={70} size={32} weight="fill" color={SIGNAL} />}
        {active === 1 && <ChartLineUp x={190} y={70} size={32} weight="fill" color={SIGNAL} />}
        {active === 2 && <CheckCircle x={190} y={70} size={32} weight="fill" color={SIGNAL} />}
        {active === 3 && <path d="M 178 100 L 234 72" stroke={SIGNAL} strokeWidth={4} />}
        {active === 4 && (
          <text x={206} y={92} textAnchor="middle" {...HEAD} fontSize={16} fill={INK}>
            F1 | RMSE
          </text>
        )}
      </MiniScreen>
      <text x={264} y={92} {...BODY} fontSize={13.5} fill={INK}>
        {active === 0 && "Inputs + Labels"}
        {active === 1 && "Predict / Classify"}
        {active === 2 && "Direct Feedback"}
        {active === 3 && "Reg. / Classif."}
        {active === 4 && "Accuracy | F1"}
      </text>

      <path d="M 20 144 H 380" stroke={INK} strokeWidth={1.8} strokeDasharray="4 4" />

      {/* BOTTOM HALF: Unsupervised Learning (COUNTER blue) */}
      <text x={24} y={184} {...HEAD} fontSize={17} fill={INK}>
        Unsupervised
      </text>
      <MiniScreen x={164} y={158}>
        {active === 0 && <Doc x={192} y={166} k={0.34} tone={COUNTER} />}
        {active === 1 && <SquaresFour x={190} y={170} size={32} weight="fill" color={COUNTER} />}
        {active === 2 && <MagnifyingGlass x={190} y={170} size={32} weight="fill" color={COUNTER} />}
        {active === 3 && (
          <>
            <circle cx={194} cy={186} r={10} fill="none" stroke={COUNTER} strokeWidth={2.5} />
            <circle cx={218} cy={186} r={10} fill="none" stroke={COUNTER} strokeWidth={2.5} />
          </>
        )}
        {active === 4 && <path d="M 180 170 L 198 194 L 232 198" fill="none" stroke={COUNTER} strokeWidth={3.5} />}
      </MiniScreen>
      <text x={264} y={192} {...BODY} fontSize={13.5} fill={INK}>
        {active === 0 && "Inputs Only"}
        {active === 1 && "Find Patterns"}
        {active === 2 && "No Feedback"}
        {active === 3 && "Cluster | PCA"}
        {active === 4 && "Elbow | Silh."}
      </text>

      {/* Five Aspect selector buttons */}
      {ASPECT_NAMES.map((name, i) => {
        const bx = 20 + i * 73;
        const isLit = i === active;
        return (
          <g
            key={name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={name}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={bx} y={256} width={68} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={bx + 34} y={280} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
              {i + 1}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   14. Case Studies 1 to 10: Supervised vs. Unsupervised Learning: Interactive
   10-case selector and classifier
   ========================================================================== */

const CASE_META: {
  n: number;
  short: string;
  supervised: boolean;
  task: string;
}[] = [
  { n: 1, short: "Customer Churn", supervised: true, task: "Predict Churn" },
  { n: 2, short: "Gene Clusters", supervised: false, task: "Disease Subtypes" },
  { n: 3, short: "Movie Ratings", supervised: true, task: "Predict Ratings" },
  { n: 4, short: "Market Basket", supervised: false, task: "Item Associations" },
  { n: 5, short: "Temperature", supervised: true, task: "Predict Temp." },
  { n: 6, short: "10k Photos", supervised: false, task: "Cluster Landscapes" },
  { n: 7, short: "Loan Approval", supervised: true, task: "Approve / Reject" },
  { n: 8, short: "50D to 2D PCA", supervised: false, task: "2D Visualization" },
  { n: 9, short: "Diabetes Dx", supervised: true, task: "Diagnose Cases" },
  { n: 10, short: "Communities", supervised: false, task: "Group Users" },
];

function CaseDomainGlyph({ n, tone }: { n: number; tone: string }) {
  switch (n) {
    case 1:
      return <Tag x={88} y={102} size={58} weight="fill" color={tone} />;
    case 2:
      return <Dna x={88} y={102} size={58} weight="fill" color={tone} />;
    case 3:
      return <FilmSlate x={88} y={102} size={58} weight="fill" color={tone} />;
    case 4:
      return <ShoppingBag x={88} y={102} size={58} weight="fill" color={tone} />;
    case 5:
      return <Thermometer x={88} y={102} size={58} weight="fill" color={tone} />;
    case 6:
      return <Camera x={88} y={102} size={58} weight="fill" color={tone} />;
    case 7:
      return <Bank x={88} y={102} size={58} weight="fill" color={tone} />;
    case 8:
      return <Database x={88} y={102} size={58} weight="fill" color={tone} />;
    case 9:
      return <FirstAid x={88} y={102} size={58} weight="fill" color={tone} />;
    default:
      return <UsersThree x={88} y={102} size={58} weight="fill" color={tone} />;
  }
}

export function CaseStudiesInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const c = CASE_META[active] ?? CASE_META[0];
  const tone = c.supervised ? SIGNAL : COUNTER;

  return (
    <Plate
      w={800}
      h={242}
      title={`Interactive Case Study Explorer (Cases 1 to 10): Case ${c.n} (${c.short}) uses ${c.supervised ? "Supervised Learning" : "Unsupervised Learning"} for ${c.task}`}
    >
      {/* Top row: 10 clickable Case buttons */}
      {CASE_META.map((item, i) => {
        const bx = 20 + i * 76.5;
        const isLit = i === active;
        const btnTone = isLit ? (item.supervised ? SIGNAL : COUNTER) : INK;
        return (
          <g
            key={item.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={`Case ${item.n}: ${item.short}`}
            style={onSelect ? { cursor: "pointer" } : undefined}
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
          >
            <rect x={r2(bx)} y={14} width={71} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={r2(bx + 35.5)} y={38} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
              Case {item.n}
            </text>
          </g>
        );
      })}

      {/* Domain input on left */}
      <CaseDomainGlyph n={c.n} tone={tone} />
      {c.supervised && <Tag x={156} y={114} size={32} weight="fill" color={SIGNAL} />}
      <text x={124} y={208} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
        {c.short}
      </text>

      <Pointer x1={206} y1={134} x2={266} y2={134} w={4} head={12} color={tone} />

      {/* Framed Screen in center showing Labeled Mapping vs Unlabeled Structure */}
      <Monitor x={276} y={72} w={212} h={118}>
        <text x={382} y={106} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
          {c.supervised ? "Labeled Data" : "Unlabeled Data"}
        </text>
        <rect x={306} y={120} width={152} height={36} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={382} y={144} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
          {c.task}
        </text>
      </Monitor>

      <Pointer x1={500} y1={134} x2={548} y2={134} w={4} head={12} color={tone} />

      {/* Paradigm Verdict badges on right */}
      <rect
        x={558}
        y={78}
        width={220}
        height={48}
        fill={INK}
        fillOpacity={c.supervised ? 0.08 : 0.02}
        stroke={INK}
        strokeWidth={c.supervised ? 2 : 1.25}
      />
      <text
        x={668}
        y={108}
        textAnchor="middle"
        {...HEAD}
        fontSize={16.5}
        fill={INK}
      >
        Supervised Learning
      </text>

      <rect
        x={558}
        y={140}
        width={220}
        height={48}
        fill={INK}
        fillOpacity={!c.supervised ? 0.08 : 0.02}
        stroke={INK}
        strokeWidth={!c.supervised ? 2 : 1.25}
      />
      <text
        x={668}
        y={170}
        textAnchor="middle"
        {...HEAD}
        fontSize={16.5}
        fill={INK}
      >
        Unsupervised Learning
      </text>
    </Plate>
  );
}

export function CaseStudiesTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const c = CASE_META[active] ?? CASE_META[0];
  const tone = c.supervised ? SIGNAL : COUNTER;
  return (
    <Plate
      w={400}
      h={224}
      title={`Interactive Case Study selector (Cases 1 to 10): Case ${c.n} (${c.short}) uses ${c.supervised ? "Supervised Learning" : "Unsupervised Learning"}`}
    >
      {CASE_META.map((item, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const bx = 18 + col * 74;
        const by = 14 + row * 46;
        const isLit = i === active;
        const btnTone = isLit ? (item.supervised ? SIGNAL : COUNTER) : INK;
        return (
          <g
            key={item.n}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={`Case ${item.n}`}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={bx} y={by} width={68} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={bx + 34} y={by + 24} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
              Case {item.n}
            </text>
          </g>
        );
      })}
      <rect x={18} y={120} width={364} height={86} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={200} y={154} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
        Case {c.n}: {c.short}
      </text>
      <text x={200} y={184} textAnchor="middle" {...BODY} fontSize={15.5} fill={INK}>
        {c.supervised ? "Supervised Learning" : "Unsupervised Learning"} | {c.task}
      </text>
    </Plate>
  );
}
