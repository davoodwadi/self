"use client";

/* ==========================================================================
   Week 4, plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     - Person, every human (bust in profile)
     - Shop, the business (BestBuy, IKEA)
     - Monitor / MiniScreen, anything digital (virtual assistant, chatbot,
                              self-return kiosk, cloud/fog/edge screens)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React from "react";
import {
  Cpu,
  Cloud,
  ChatCircle,
  Package,
  Thermometer,
  Watch,
  Car,
  ArrowsClockwise,
  Database,
  Factory,
  SlidersHorizontal,
  Pulse,
  Power,
  Key,
  Gear,
  Star,
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
  Knob as DragKnob,
} from "../_visuals/kit";
import { Person, Shop, Doc, Coins } from "../_visuals/objects";

/* ==========================================================================
   1. Hero: A user in profile accepts and uses a connected digital system
   on a framed screen
   ========================================================================== */

/* ==========================================================================
   2. TAM Flow Diagram: Fred Davis (1986) Technology Acceptance Model
   ========================================================================== */

function BoxLines({
  cx,
  cy,
  lines,
  size = 15.5,
  fill = INK,
}: {
  cx: number;
  cy: number;
  lines: string[];
  size?: number;
  fill?: string;
}) {
  const step = r2(size * 1.38);
  const startY = r2(cy - ((lines.length - 1) * step) / 2 + size * 0.34);
  return (
    <>
      {lines.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={r2(startY + i * step)}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={600}
          fontSize={size}
          fill={INK}
        >
          {line}
        </text>
      ))}
    </>
  );
}

export function TamFlowDiagram() {
  return (
    <Plate
      w={800}
      h={224}
      title="The Technology Acceptance Model: External Variables point to Perceived Usefulness (U) and Perceived Ease of Use (E). Perceived Ease of Use points up to Perceived Usefulness. Both point to Attitude Toward Using (A), which together with Perceived Usefulness points to Behavioral Intention to Use, leading to Actual System Use in red"
    >
      {/* External Variables */}
      <rect x={12} y={66} width={116} height={92} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={70} cy={112} lines={["External", "Variables"]} />

      {/* Perceived Usefulness (U) & Perceived Ease of Use (E) */}
      <rect x={166} y={20} width={156} height={68} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={244} cy={54} lines={["Perceived", "Usefulness (U)"]} />

      <rect x={166} y={136} width={156} height={68} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={244} cy={170} lines={["Perceived Ease", "of Use (E)"]} />

      {/* Attitude Toward Using (A) */}
      <rect x={360} y={66} width={126} height={92} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={423} cy={112} lines={["Attitude", "Toward", "Using (A)"]} />

      {/* Behavioral Intention to Use */}
      <rect x={522} y={66} width={132} height={92} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={588} cy={112} lines={["Behavioral", "Intention to", "Use"]} />

      {/* Actual System Use (SIGNAL red outcome) */}
      <rect x={690} y={66} width={98} height={92} fill={INK} fillOpacity={0.08} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={739} cy={112} lines={["Actual", "System", "Use"]} fill={SIGNAL} />

      {/* Connectors */}
      <Pointer x1={132} y1={94} x2={162} y2={62} w={3.5} head={12} />
      <Pointer x1={132} y1={130} x2={162} y2={162} w={3.5} head={12} />
      <Pointer x1={244} y1={132} x2={244} y2={92} w={3.5} head={12} />
      <Pointer x1={326} y1={66} x2={356} y2={92} w={3.5} head={12} />
      <Pointer x1={326} y1={158} x2={356} y2={132} w={3.5} head={12} />

      {/* Direct path from Perceived Usefulness (U) to Behavioral Intention to Use */}
      <path d="M 326 36 H 588 V 52" fill="none" stroke={INK} strokeWidth={3.5} />
      <path d="M 588 62 L 581 48 H 595 Z" fill={INK} />

      <Pointer x1={490} y1={112} x2={518} y2={112} w={3.5} head={12} />
      <Pointer x1={658} y1={112} x2={686} y2={112} w={4} color={SIGNAL} head={13} />
    </Plate>
  );
}

/* ==========================================================================
   2b | External Variables Interactive (Column Plate, w=400): five distinct
   external factors (screen interface, individual user, peer group, training
   manual, task gear) that students can select to see how each influences
   Perceived Usefulness (U) and Perceived Ease of Use (E)
   ========================================================================== */

const EXT_VARS: {
  n: number;
  name: string;
  u: number;
  e: number;
}[] = [
  { n: 1, name: "System Features", u: 84, e: 86 },
  { n: 2, name: "User Characteristics", u: 58, e: 90 },
  { n: 3, name: "Social Influence", u: 88, e: 46 },
  { n: 4, name: "Training and Support", u: 62, e: 94 },
  { n: 5, name: "Task Characteristics", u: 92, e: 60 },
];

function ExtGlyph({ n, y }: { n: number; y: number }) {
  switch (n) {
    case 1:
      return <SlidersHorizontal x={54} y={y - 16} size={32} weight="fill" color={INK} />;
    case 2:
      return <Star x={54} y={y - 16} size={32} weight="fill" color={INK} />;
    case 3:
      return <ChatCircle x={54} y={y - 16} size={32} weight="fill" color={INK} />;
    case 4:
      return <Doc x={56} y={y - 18} k={0.3} />;
    default:
      return <Gear x={54} y={y - 16} size={32} weight="fill" color={INK} />;
  }
}

export function ExternalVariablesInteractive() {
  const [sel, setSel] = React.useState(0);
  const active = EXT_VARS[sel];
  const rowY = (i: number) => 46 + i * 48;
  const activeY = rowY(sel);

  return (
    <Plate
      w={400}
      h={284}
      title={`Five external variables on the left (1 System Features, 2 User Characteristics, 3 Social Influence, 4 Training and Support, 5 Task Characteristics) point to Perceived Usefulness (U) and Perceived Ease of Use (E) on the right. ${active.name} is selected in red, setting U to ${active.u}% and E to ${active.e}%`}
    >
      {/* Five selectable external variable rows with distinct silhouettes */}
      {EXT_VARS.map((v, i) => {
        const y = rowY(i);
        const on = i === sel;
        return (
          <g
            key={v.n}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${v.n}. ${v.name}`}
            style={{ cursor: "pointer" }}
            onClick={() => setSel(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSel(i);
              }
            }}
          >
            <rect
              x={14}
              y={y - 20}
              width={92}
              height={40}
              fill={on ? COUNTER_FILL : WHITE}
              stroke={on ? SIGNAL : INK}
              strokeWidth={on ? 3 : 2}
            />
            <rect x={14} y={y - 20} width={28} height={40} fill={on ? SIGNAL : INK} />
            <text
              x={28}
              y={y + 6}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={700}
              fontSize={16}
              fill={WHITE}
            >
              {v.n}
            </text>
            <ExtGlyph n={v.n} y={y} />
          </g>
        );
      })}

      {/* Arrows from the selected external variable to U and E */}
      <Pointer
        x1={112}
        y1={activeY}
        x2={188}
        y2={92}
        w={active.u >= active.e ? 4.5 : 3}
        color={SIGNAL}
        head={12}
      />
      <Pointer
        x1={112}
        y1={activeY}
        x2={188}
        y2={204}
        w={active.e >= active.u ? 4.5 : 3}
        color={COUNTER}
        head={12}
      />

      {/* Right: Perceived Usefulness (U) gauge card */}
      <rect x={196} y={44} width={190} height={86} fill={WHITE} stroke={INK} strokeWidth={2.5} />
      <text x={210} y={68} fontFamily="var(--font-sans)" fontWeight={700} fontSize={15.5} fill={INK}>
        Perceived Usefulness (U)
      </text>
      <rect x={210} y={82} width={124} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={210} y={82} width={r2((active.u / 100) * 124)} height={22} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={374} y={99} textAnchor="end" fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        {`${active.u}%`}
      </text>

      {/* Right: Perceived Ease of Use (E) gauge card */}
      <rect x={196} y={156} width={190} height={86} fill={WHITE} stroke={INK} strokeWidth={2.5} />
      <text x={210} y={180} fontFamily="var(--font-sans)" fontWeight={700} fontSize={15.5} fill={INK}>
        Perceived Ease of Use (E)
      </text>
      <rect x={210} y={194} width={124} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={210} y={194} width={r2((active.e / 100) * 124)} height={22} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={374} y={211} textAnchor="end" fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        {`${active.e}%`}
      </text>

      {/* Selected variable caption at bottom right */}
      <text x={291} y={266} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        {`${active.n}. ${active.name}`}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   3. Interactive TAM Beliefs Simulator: drag Perceived Usefulness (PU) and
   Perceived Ease of Use (PEOU) to watch Attitude Toward Use and Behavioral
   Intention to Use respond
   ========================================================================== */

export function TamBeliefsInteractive() {
  const [pu, setPu] = React.useState(75);
  const [peou, setPeou] = React.useState(70);

  // In TAM, PEOU also bolsters PU. Both drive Attitude, and Attitude + PU drive Intention.
  const effPu = Math.min(100, Math.round(pu * 0.78 + peou * 0.22));
  const attitude = Math.round(effPu * 0.55 + peou * 0.45);
  const intention = Math.round(attitude * 0.65 + effPu * 0.35);

  const trackX = 28;
  const trackW = 240;
  const outX = 448;
  const outW = 240;

  return (
    <Plate
      w={800}
      h={222}
      title={`Interactive TAM sliders: Perceived Usefulness (PU) is set to ${pu}% and Perceived Ease of Use (PEOU) is set to ${peou}%, producing Attitude Toward Use of ${attitude}% and Behavioral Intention to Use of ${intention}%`}
    >
      {/* Left: Draggable input beliefs */}
      <text x={trackX} y={44} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        Perceived Usefulness (PU)
      </text>
      <rect x={trackX} y={56} width={trackW} height={24} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <rect x={trackX} y={56} width={r2((pu / 100) * trackW)} height={24} fill={INK} />
      <DragKnob
        x={trackX}
        y={68}
        value={pu}
        min={10}
        max={100}
        onChange={setPu}
        label="Perceived Usefulness (PU)"
      />
      <text x={trackX + trackW + 22} y={74} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        {`${pu}%`}
      </text>

      {/* Upward TAM link: PEOU bolsters PU */}
      <Pointer x1={148} y1={134} x2={148} y2={90} w={3} head={11} />

      <text x={trackX} y={160} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        Perceived Ease of Use (PEOU)
      </text>
      <rect x={trackX} y={172} width={trackW} height={24} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <rect x={trackX} y={172} width={r2((peou / 100) * trackW)} height={24} fill={INK} />
      <DragKnob
        x={trackX}
        y={184}
        value={peou}
        min={10}
        max={100}
        onChange={setPeou}
        label="Perceived Ease of Use (PEOU)"
      />
      <text x={trackX + trackW + 22} y={190} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        {`${peou}%`}
      </text>

      {/* Connectors from PU & PEOU to Attitude & Intention */}
      <Pointer x1={336} y1={68} x2={432} y2={68} w={3.5} head={12} />
      <Pointer x1={336} y1={184} x2={432} y2={84} w={3.5} head={12} />
      <Pointer x1={660} y1={92} x2={660} y2={132} w={4} color={SIGNAL} head={12} />

      {/* Right: Resulting Attitude & Behavioral Intention */}
      <text x={outX} y={44} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        Attitude Toward Use
      </text>
      <rect x={outX} y={56} width={outW} height={26} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <rect x={outX} y={56} width={r2((attitude / 100) * outW)} height={26} fill={COUNTER} />
      <text x={outX + outW + 18} y={75} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        {`${attitude}%`}
      </text>

      <text x={outX} y={160} fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        Behavioral Intention to Use
      </text>
      <rect x={outX} y={172} width={outW} height={28} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <rect x={outX} y={172} width={r2((intention / 100) * outW)} height={28} fill={SIGNAL} />
      <text x={outX + outW + 18} y={193} fontFamily="var(--font-sans)" fontWeight={700} fontSize={20} fill={INK}>
        {`${intention}%`}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   3b | BestBuy External Variables Plate (Column Plate, w=400): four external
   variables (system features, tech-savvy user, review stars, tutorial doc)
   feeding BestBuy's AI-powered virtual shopping assistant on a framed screen
   ========================================================================== */

/* ==========================================================================
   4. BestBuy Feature Trade-Off (Interactive): "How is adding more features
   reducing the ease of use?"
   ========================================================================== */


/* ==========================================================================
   4b | BestBuy Catalog & Manuals Bridge (Column Plate, w=400): product
   catalog database and manuals feed into the AI chatbot on a framed screen
   ========================================================================== */

/* ==========================================================================
   5. Hospital Triage Chatbot: patients consult a chatbot on a framed screen,
   which routes non-urgent cases to care at home and critical cases to urgent care
   ========================================================================== */

function HouseGlyph({ x, y }: { x: number; y: number }) {
  // 56 × 52 solid silhouette of a home, origin top-left
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 28 0 L 56 24 H 48 V 52 H 34 V 34 H 22 V 52 H 8 V 24 H 0 Z" fill={INK} />
    </g>
  );
}

function MedicalCross({ x, y, k = 1, tone = SIGNAL }: { x: number; y: number; k?: number; tone?: string }) {
  // 52 × 52 bold medical cross, origin top-left
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d="M 16 0 H 36 V 16 H 52 V 36 H 36 V 52 H 16 V 36 H 0 V 16 H 16 Z" fill={tone} />
    </g>
  );
}

export function HospitalTriageFlow() {
  return (
    <Plate
      w={800}
      h={208}
      title="Incoming symptom inquiries enter a triage chatbot on a framed screen. From the screen, a black arrow leads to a house labeled At home, and a red arrow leads to a medical cross labeled Urgent care"
    >
      <ChatCircle x={52} y={56} size={52} weight="fill" color={INK} />
      <ChatCircle x={118} y={72} size={52} weight="fill" color={SIGNAL} />
      <Arrow x1={186} x2={256} y={96} />

      <Monitor x={268} y={16} w={164} h={108}>
        <ChatCircle x={350 - 28} y={70 - 28} size={56} weight="fill" color={INK} />
      </Monitor>
      <text x={350} y={190} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        Triage
      </text>

      {/* Fork: At home (INK) vs Urgent care (SIGNAL) */}
      <Pointer x1={444} y1={62} x2={556} y2={48} w={4} head={13} />
      <HouseGlyph x={572} y={18} />
      <text x={644} y={52} fontFamily="var(--font-sans)" fontWeight={700} fontSize={20} fill={INK}>
        At home
      </text>

      <Pointer x1={444} y1={98} x2={556} y2={136} w={5} color={SIGNAL} head={14} />
      <MedicalCross x={574} y={114} tone={SIGNAL} />
      <text x={644} y={147} fontFamily="var(--font-sans)" fontWeight={700} fontSize={20} fill={INK}>
        Urgent care
      </text>
    </Plate>
  );
}

/* ==========================================================================
   5b | Hospital Peak-Hours Triage Simulator (Column Plate, w=400): drag how
   many non-urgent cases the chatbot filters to see Waiting times fall and
   Staff focus on critical patients rise
   ========================================================================== */

/* ==========================================================================
   5c | Hospital EHR Integration Plate (Column Plate, w=400): an Electronic
   Health Record (EHR) screen on the left links via a red arrow into the
   hospital chatbot screen on the right
   ========================================================================== */

/* ==========================================================================
   6. IKEA Self-Return Kiosk: contrasts waiting in a queue of customers with
   processing a return directly at a framed self-return kiosk
   ========================================================================== */

export function IkeaKioskReturn() {
  const queueX = [60, 122, 184, 246];
  const queueVariants = [7, 5, 6, 3] as const;
  return (
    <Plate
      w={800}
      h={206}
      title="Left: four customers waiting in line behind a counter, labeled Waiting in line. Right: a single customer steps directly to a framed screen holding a package and return arrow, labeled Self-return kiosk in red"
    >
      {/* Left: Waiting in line */}
      {queueX.map((x, i) => (
        <Person key={x} x={x} y={38} k={1.02} variant={queueVariants[i]} gap={i > 0} />
      ))}
      <rect x={312} y={78} width={54} height={62} fill={INK} />
      <text x={200} y={184} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={700} fontSize={18} fill={INK}>
        Waiting in line
      </text>

      <path d="M 400 20 V 188" stroke={INK} strokeWidth={1.5} strokeDasharray="5 5" />

      {/* Right: Self-return kiosk */}
      <Person x={476} y={38} k={1.02} variant={4} />
      <Arrow x1={530} x2={590} y={88} color={SIGNAL} />
      <Monitor x={602} y={16} w={164} h={104}>
        <Package x={644} y={44} size={48} weight="fill" color={INK} />
        <ArrowsClockwise x={696} y={46} size={44} weight="fill" color={SIGNAL} />
      </Monitor>
      <text
        x={600}
        y={184}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={700}
        fontSize={18}
        fill={INK}
      >
        Self-return kiosk
      </text>
    </Plate>
  );
}

/* ==========================================================================
   6b | IKEA Kiosk Benefits Plate (Column Plate, w=400): top row shows fast
   barcode return on a framed kiosk screen. Bottom row shows staff freed for
   complex issues and cost savings
   ========================================================================== */

/* ==========================================================================
   6c | UTAUT Synthesis Plate (Column Plate, w=400): TAM, TPB, and the
   Motivational Model converge into UTAUT (2003), which branches into its four
   primary constructs (1 to 4)
   ========================================================================== */

export function UtautSynthesisPlate() {
  const sources: [string[], number][] = [
    [["TAM"], 42],
    [["TPB"], 124],
    [["Motivational", "Model"], 206],
  ];
  const fourY = [34, 94, 154, 214];
  return (
    <Plate
      w={400}
      h={248}
      title="Three prior models on the left (TAM, TPB, Motivational Model) converge into a central red block labeled UTAUT 2003, which branches into four numbered constructs (1 to 4) on the right"
    >
      {/* Left: Three prior models */}
      {sources.map(([lines, cy]) => (
        <g key={cy}>
          <rect x={14} y={cy - 26} width={122} height={52} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
          <BoxLines cx={75} cy={cy} lines={lines} size={15} />
          <Pointer x1={140} y1={cy} x2={182} y2={r2(96 + (cy - 42) * 0.34)} w={3.5} head={11} />
        </g>
      ))}

      {/* Center: UTAUT (2003) */}
      <rect x={188} y={76} width={96} height={96} fill={INK} fillOpacity={0.08} stroke={INK} strokeWidth={1.5} />
      <BoxLines cx={236} cy={124} lines={["UTAUT", "2003"]} size={18} fill={SIGNAL} />

      {/* Right: Four numbered primary constructs */}
      {fourY.map((cy, i) => (
        <g key={cy}>
          <Pointer x1={288} y1={r2(92 + i * 21)} x2={334} y2={cy} w={3.5} color={SIGNAL} head={11} />
          <rect x={340} y={cy - 20} width={44} height={40} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
          <text
            x={362}
            y={cy + 7}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontWeight={700}
            fontSize={20}
            fill={INK}
          >
            {i + 1}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   7. Interactive UTAUT Model (Venkatesh et al., 2003): click any of the four
   moderating variables at the bottom to highlight the exact relationships it
   moderates
   ========================================================================== */

type ModeratorId = "gender" | "age" | "experience" | "voluntariness";


/* ==========================================================================
   7b | IKEA UTAUT Drivers Plate (Full-width, w=800): four visual scenes
   aligned with the four UTAUT constructs above (1 clock for saving time,
   2 touch screen for ease of use, 3 two shoppers with word-of-mouth bubble,
   4 support staff with guidance doc), pointing down to Behavioral Intention
   and Actual Use
   ========================================================================== */

/* ==========================================================================
   7c | IKEA Moderating Variables Interactive (Column Plate, w=400): select any
   of the five moderators (1 Age, 2 Gender, 3 Experience, 4 Voluntariness of
   Use, 5 Cultural Context) to compare kiosk adoption across customer segments
   ========================================================================== */

const IKEA_MODS: {
  n: number;
  short: string;
  hiLabel: string;
  hiVal: number;
  loLabel: string;
  loVal: number;
}[] = [
  { n: 1, short: "Age", hiLabel: "Younger customers", hiVal: 86, loLabel: "Older customers", loVal: 52 },
  { n: 2, short: "Gender", hiLabel: "Demographic group A", hiVal: 78, loLabel: "Demographic group B", loVal: 64 },
  { n: 3, short: "Experience", hiLabel: "Experienced users", hiVal: 90, loLabel: "First-time users", loVal: 48 },
  { n: 4, short: "Voluntariness", hiLabel: "Voluntary choice", hiVal: 84, loLabel: "Forced (no alternative)", loVal: 42 },
  { n: 5, short: "Cultural Context", hiLabel: "High self-service norm", hiVal: 88, loLabel: "Low self-service norm", loVal: 50 },
];

export function IkeaModeratorsInteractive() {
  const [sel, setSel] = React.useState(3); // default to 4. Voluntariness ("forced")
  const active = IKEA_MODS[sel];
  const rowY = (i: number) => 46 + i * 48;

  return (
    <Plate
      w={400}
      h={280}
      title={`Interactive IKEA moderating variables: ${active.n}. ${active.short} is selected on the left, comparing kiosk adoption between ${active.hiLabel} (${active.hiVal}%) and ${active.loLabel} (${active.loVal}%) on the right`}
    >
      {/* Left: Five selectable moderators */}
      {IKEA_MODS.map((m, i) => {
        const y = rowY(i);
        const on = i === sel;
        return (
          <g
            key={m.n}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${m.n}. ${m.short}`}
            style={{ cursor: "pointer" }}
            onClick={() => setSel(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSel(i);
              }
            }}
          >
            <rect
              x={14}
              y={y - 19}
              width={142}
              height={38}
              fill={INK}
              fillOpacity={on ? 0.08 : 0.03}
              stroke={INK}
              strokeWidth={on ? 2 : 1.25}
            />
            <text
              x={26}
              y={y + 6}
              fontFamily="var(--font-sans)"
              fontWeight={on ? 700 : 600}
              fontSize={14}
              fill={INK}
            >
              {`${m.n}. ${m.short}`}
            </text>
          </g>
        );
      })}

      {/* Connector from selected moderator to comparison card */}
      <Pointer x1={162} y1={rowY(sel)} x2={194} y2={140} w={3.5} color={SIGNAL} head={11} />

      {/* Right: Segment comparison card */}
      <rect x={200} y={42} width={186} height={198} fill={WHITE} stroke={INK} strokeWidth={2.5} />
      <text x={214} y={70} fontFamily="var(--font-sans)" fontWeight={700} fontSize={14.5} fill={INK}>
        {active.hiLabel}
      </text>
      <rect x={214} y={82} width={118} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={214} y={82} width={r2((active.hiVal / 100) * 118)} height={22} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={374} y={99} textAnchor="end" fontFamily="var(--font-sans)" fontWeight={700} fontSize={15} fill={INK}>
        {`${active.hiVal}%`}
      </text>

      <text x={214} y={154} fontFamily="var(--font-sans)" fontWeight={700} fontSize={14.5} fill={INK}>
        {active.loLabel}
      </text>
      <rect x={214} y={166} width={118} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={214} y={166} width={r2((active.loVal / 100) * 118)} height={22} fill={COUNTER} />
      <text x={374} y={183} textAnchor="end" fontFamily="var(--font-sans)" fontWeight={700} fontSize={15} fill={INK}>
        {`${active.loVal}%`}
      </text>

      <text x={293} y={222} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={600} fontSize={13.5} fill={INK}>
        Adoption &amp; satisfaction
      </text>
    </Plate>
  );
}

/* ==========================================================================
   8. Interactive IoT Loop (Collect, Share, Act): switch between smart
   thermostats, wearable fitness trackers, and connected cars
   ========================================================================== */

type IotDeviceId = "thermostat" | "tracker" | "car";

const IOT_DEVICES: { id: IotDeviceId; label: string; x: number; w: number }[] = [
  { id: "thermostat", label: "Smart thermostats", x: 64, w: 204 },
  { id: "tracker", label: "Wearable fitness trackers", x: 288, w: 236 },
  { id: "car", label: "Connected cars", x: 544, w: 192 },
];

function IotGlyph({ id, cx, cy, size = 60, tone = INK }: { id: IotDeviceId; cx: number; cy: number; size?: number; tone?: string }) {
  const x = r2(cx - size / 2);
  const y = r2(cy - size / 2);
  if (id === "thermostat") return <Thermometer x={x} y={y} size={size} weight="fill" color={tone} />;
  if (id === "tracker") return <Watch x={x} y={y} size={size} weight="fill" color={tone} />;
  return <Car x={x} y={y} size={size} weight="fill" color={tone} />;
}

export function IotLoopInteractive() {
  const [dev, setDev] = React.useState<IotDeviceId>("thermostat");
  const current = IOT_DEVICES.find((d) => d.id === dev)!;

  return (
    <Plate
      w={800}
      h={248}
      title={`IoT network loop for ${current.label}: Collect (the device gathers sensor data), Share (transmits data to a framed screen), and Act in red (automated control acts on the data)`}
    >
      {/* 1. Collect */}
      <circle cx={136} cy={76} r={52} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <IotGlyph id={dev} cx={136} cy={76} size={58} tone={INK} />
      <text x={136} y={172} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={700} fontSize={20} fill={INK}>
        Collect
      </text>

      <Arrow x1={204} x2={304} y={76} />

      {/* 2. Share (framed screen) */}
      <Monitor x={318} y={14} w={164} h={98}>
        <IotGlyph id={dev} cx={376} cy={63} size={44} tone={INK} />
        <Pulse x={414} y={41} size={44} weight="fill" color={INK} />
      </Monitor>
      <text x={400} y={172} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={700} fontSize={20} fill={INK}>
        Share
      </text>

      <Arrow x1={496} x2={596} y={76} color={SIGNAL} />

      {/* 3. Act */}
      <circle cx={664} cy={76} r={52} fill={SIGNAL} />
      <IotGlyph id={dev} cx={664} cy={76} size={58} tone={WHITE} />
      <text
        x={664}
        y={172}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={700}
        fontSize={20}
        fill={INK}
      >
        Act
      </text>

      {/* Device selector buttons */}
      {IOT_DEVICES.map((d) => {
        const on = d.id === dev;
        return (
          <g
            key={d.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={d.label}
            style={{ cursor: "pointer" }}
            onClick={() => setDev(d.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setDev(d.id);
              }
            }}
          >
            <rect
              x={d.x}
              y={196}
              width={d.w}
              height={34}
              fill={INK}
              fillOpacity={on ? 0.08 : 0.03}
              stroke={INK}
              strokeWidth={on ? 2 : 1.25}
            />
            <text
              x={r2(d.x + d.w / 2)}
              y={218}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={15}
              fill={INK}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   9. IoT Privacy and Security: five visual stations aligned under the five
   best practices
   ========================================================================== */

/* ==========================================================================
   10. IoT Device Management Process: five connected lifecycle stages
   ========================================================================== */

export function IotDeviceLifecycle() {
  const cx = [86, 243, 400, 557, 714];
  const cy = 82;
  const r = 46;
  return (
    <Plate
      w={800}
      h={204}
      title="Five connected stages of the IoT device management process: 1 Provisioning and Authentication (a key), 2 Configuration and Control (sliders), 3 Monitoring and Diagnostics (a pulse line), 4 Software Updates and Maintenance (an update cycle), and 5 Decommissioning in red (a power symbol), with a return path under the row back to stage 1"
    >
      {/* Connectors between the 5 stages */}
      {[0, 1, 2, 3].map((i) => (
        <Pointer
          key={i}
          x1={cx[i] + r + 8}
          y1={cy}
          x2={cx[i + 1] - r - 8}
          y2={cy}
          w={4}
          color={i === 3 ? SIGNAL : INK}
          head={12}
        />
      ))}

      {/* Lifecycle replacement loop from Decommissioning (5) back to Provisioning (1) */}
      <path
        d={`M ${cx[4]} ${cy + r + 10} V 176 H ${cx[0]} V ${cy + r + 18}`}
        fill="none"
        stroke={INK}
        strokeWidth={3}
        strokeDasharray="6 6"
      />
      <path d={`M ${cx[0]} ${cy + r + 8} L ${cx[0] - 7} ${cy + r + 22} H ${cx[0] + 7} Z`} fill={INK} />

      {/* Stage 1: Provisioning and Authentication */}
      <circle cx={cx[0]} cy={cy} r={r} fill={INK} />
      <Key x={cx[0] - 24} y={cy - 24} size={48} weight="fill" color={WHITE} />

      {/* Stage 2: Configuration and Control */}
      <circle cx={cx[1]} cy={cy} r={r} fill={INK} />
      <SlidersHorizontal x={cx[1] - 24} y={cy - 24} size={48} weight="fill" color={WHITE} />

      {/* Stage 3: Monitoring and Diagnostics */}
      <circle cx={cx[2]} cy={cy} r={r} fill={INK} />
      <Pulse x={cx[2] - 24} y={cy - 24} size={48} weight="fill" color={WHITE} />

      {/* Stage 4: Software Updates and Maintenance */}
      <circle cx={cx[3]} cy={cy} r={r} fill={INK} />
      <ArrowsClockwise x={cx[3] - 24} y={cy - 24} size={48} weight="fill" color={WHITE} />

      {/* Stage 5: Decommissioning */}
      <circle cx={cx[4]} cy={cy} r={r} fill={SIGNAL} />
      <Power x={cx[4] - 24} y={cy - 24} size={48} weight="fill" color={WHITE} />
    </Plate>
  );
}

/* ==========================================================================
   11. Cloud Computing Hub: a central data center on a framed screen delivers
   storage, processing, and software over the internet to remote users and shops
   ========================================================================== */

export function CloudComputingHub() {
  return (
    <Plate
      w={800}
      h={216}
      title="A central framed screen labeled Central data center holds a cloud, storage database, and processor. Arrows connect it to remote people on the left and a remote business shop on the right"
    >
      {/* Left: Remote endpoints */}
      <MiniScreen x={76} y={54}>
        <Doc x={103} y={62} k={0.34} />
      </MiniScreen>
      <Pointer x1={276} y1={84} x2={176} y2={84} w={4} color={SIGNAL} head={13} />
      <Pointer x1={176} y1={108} x2={276} y2={108} w={3.5} head={12} />

      {/* Center: Central data center on a framed screen */}
      <Monitor x={290} y={16} w={220} h={124}>
        <Cloud x={346 - 30} y={76 - 30} size={60} weight="fill" color={SIGNAL} />
        <Database x={416 - 22} y={76 - 22} size={44} weight="fill" color={INK} />
        <Cpu x={468 - 22} y={76 - 22} size={44} weight="fill" color={INK} />
      </Monitor>
      <text
        x={400}
        y={198}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={700}
        fontSize={18}
        fill={INK}
      >
        Central data center
      </text>

      {/* Right: Remote business */}
      <Pointer x1={524} y1={84} x2={604} y2={84} w={4} color={SIGNAL} head={13} />
      <Pointer x1={604} y1={108} x2={524} y2={108} w={3.5} head={12} />
      <Shop x={620} y={34} k={0.82} />
    </Plate>
  );
}

/* ==========================================================================
   12. Interactive Edge, Fog, and Cloud Simulator: select where data is
   processed (Edge, Fog, or Cloud) to see the distance traveled and its effect
   on Latency and Bandwidth usage
   ========================================================================== */

type TierId = "edge" | "fog" | "cloud";

const TIERS: {
  id: TierId;
  label: string;
  cx: number;
  latency: number;
  bandwidth: number;
}[] = [
  { id: "edge", label: "Edge", cx: 214, latency: 14, bandwidth: 18 },
  { id: "fog", label: "Fog", cx: 446, latency: 46, bandwidth: 48 },
  { id: "cloud", label: "Cloud", cx: 678, latency: 92, bandwidth: 94 },
];

export function EdgeFogCloudInteractive() {
  const [tier, setTier] = React.useState<TierId>("edge");
  const active = TIERS.find((t) => t.id === tier)!;

  return (
    <Plate
      w={800}
      h={226}
      title={`Interactive comparison of Edge, Fog, and Cloud computing: processing at the ${active.label} tier shows the round-trip path from the data source and produces Latency of ${active.latency}% and Bandwidth usage of ${active.bandwidth}%`}
    >
      {/* Leftmost: Data source (Autonomous vehicle / Factory machine) */}
      <circle cx={68} cy={66} r={44} fill={INK} />
      <Car x={68 - 26} y={66 - 26} size={52} weight="fill" color={WHITE} />
      <text x={68} y={134} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        Source
      </text>

      {/* Three selectable computing tiers: Edge, Fog (bridge), Cloud */}
      {TIERS.map((t) => {
        const on = t.id === tier;
        return (
          <g
            key={t.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${t.label} computing`}
            style={{ cursor: "pointer" }}
            onClick={() => setTier(t.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setTier(t.id);
              }
            }}
          >
            <rect
              x={t.cx - 64}
              y={14}
              width={128}
              height={128}
              fill={on ? COUNTER_FILL : WHITE}
              stroke={on ? SIGNAL : INK}
              strokeWidth={on ? 3.5 : 1.5}
            />
            <MiniScreen x={t.cx - 42} y={24}>
              {t.id === "cloud" ? (
                <Cloud x={t.cx - 20} y={32} size={40} weight="fill" color={on ? SIGNAL : INK} />
              ) : t.id === "fog" ? (
                <Factory x={t.cx - 18} y={33} size={36} weight="fill" color={on ? SIGNAL : INK} />
              ) : (
                <Cpu x={t.cx - 18} y={34} size={36} weight="fill" color={on ? SIGNAL : INK} />
              )}
            </MiniScreen>
            <text
              x={t.cx}
              y={128}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={700}
              fontSize={18}
              fill={INK}
            >
              {t.label}
            </text>
          </g>
        );
      })}

      {/* Active signal path from Source to chosen tier */}
      <Pointer x1={116} y1={160} x2={active.cx} y2={160} w={5} color={SIGNAL} head={14} />

      {/* Bottom: Latency and Bandwidth usage bars */}
      <text x={28} y={202} fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        Latency
      </text>
      <rect x={108} y={186} width={200} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={108} y={186} width={r2((active.latency / 100) * 200)} height={20} fill={SIGNAL} />
      <text x={320} y={202} fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        {`${active.latency}%`}
      </text>

      <text x={384} y={202} fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        Bandwidth usage
      </text>
      <rect x={528} y={186} width={140} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={528} y={186} width={r2((active.bandwidth / 100) * 140)} height={20} fill={COUNTER} />
      <text x={680} y={202} fontFamily="var(--font-sans)" fontWeight={700} fontSize={16} fill={INK}>
        {`${active.bandwidth}%`}
      </text>

    </Plate>
  );
}

/* ==========================================================================
   13. Interactive 4-Layer Architecture Stack (Column Plate, w=400): click
   Cloud, Fog, Edge, or IoT in the vertical stack to view its use case on the
   framed screen beside it
   ========================================================================== */

type StackKey = "cloud" | "fog" | "edge" | "iot";

const STACK_LAYERS: { id: StackKey; name: string; useCase: string[]; y: number }[] = [
  { id: "cloud", name: "Cloud", useCase: ["Data analytics", "for e-commerce"], y: 22 },
  { id: "fog", name: "Fog", useCase: ["Industrial IoT", "for manufacturing"], y: 82 },
  { id: "edge", name: "Edge", useCase: ["Autonomous", "vehicles"], y: 142 },
  { id: "iot", name: "IoT", useCase: ["Smart home", "appliances"], y: 202 },
];

export function ArchitectureStackInteractive() {
  const [layer, setLayer] = React.useState<StackKey>("fog");
  const active = STACK_LAYERS.find((l) => l.id === layer)!;

  return (
    <Plate
      w={400}
      h={260}
      title={`Interactive four-layer architecture stack (Cloud, Fog, Edge, IoT) on the left. ${active.name} is selected in red, pointing to a framed screen on the right showing its use case: ${active.useCase.join(" ")}`}
    >
      {/* Vertical backbone connecting Cloud <-> Fog <-> Edge <-> IoT */}
      <path d="M 84 44 V 224" stroke={INK} strokeWidth={4} />

      {STACK_LAYERS.map((l) => {
        const on = l.id === layer;
        return (
          <g
            key={l.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${l.name}: ${l.useCase.join(" ")}`}
            style={{ cursor: "pointer" }}
            onClick={() => setLayer(l.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLayer(l.id);
              }
            }}
          >
            <rect
              x={16}
              y={l.y}
              width={136}
              height={42}
              fill={INK}
              fillOpacity={on ? 0.08 : 0.03}
              stroke={INK}
              strokeWidth={on ? 2 : 1.25}
            />
            <text
              x={84}
              y={l.y + 27}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={700}
              fontSize={18}
              fill={INK}
            >
              {l.name}
            </text>
          </g>
        );
      })}

      <Pointer x1={158} y1={active.y + 21} x2={198} y2={98} w={4} color={SIGNAL} head={12} />

      {/* Right: Framed screen showing the selected layer's use case */}
      <Monitor x={208} y={24} w={172} h={124}>
        {layer === "cloud" && (
          <g>
            <Shop x={232} y={56} k={0.44} />
            <Database x={314} y={62} size={46} weight="fill" color={SIGNAL} />
          </g>
        )}
        {layer === "fog" && <Factory x={294 - 34} y={86 - 34} size={68} weight="fill" color={SIGNAL} />}
        {layer === "edge" && <Car x={294 - 34} y={86 - 34} size={68} weight="fill" color={SIGNAL} />}
        {layer === "iot" && (
          <g>
            <HouseGlyph x={244} y={60} />
            <Thermometer x={312} y={58} size={52} weight="fill" color={SIGNAL} />
          </g>
        )}
      </Monitor>

      <BoxLines cx={294} cy={218} lines={active.useCase} size={16} fill={SIGNAL} />
    </Plate>
  );
}
