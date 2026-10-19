"use client";

/* ==========================================================================
   Week 4 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     · Person   — every human (bust in profile)
     · Shop     — the business (BestBuy, IKEA)
     · Monitor / MiniScreen — anything digital (virtual assistant, chatbot,
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
  LockKey,
  ShieldCheck,
  ArrowsClockwise,
  Database,
  Factory,
  SlidersHorizontal,
  Pulse,
  Power,
  Key,
  Gear,
  Star,
  Barcode,
  Clock,
} from "@phosphor-icons/react";
import {
  CREAM,
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
   1 · Hero — A user in profile accepts and uses a connected digital system
   on a framed screen
   ========================================================================== */

export function HeroAcceptance() {
  return (
    <Plate
      w={560}
      h={240}
      title="A person in profile faces a framed screen holding a digital shop, with a red arrow from the person to the screen showing technology acceptance and use"
    >
      <Person x={104} y={62} k={1.5} hair="bob" />
      <Arrow x1={194} x2={294} y={118} color={SIGNAL} />
      <Monitor x={312} y={24} w={216} h={164}>
        <Shop x={357.6} y={48.5} k={0.78} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   2 · TAM Flow Diagram — Fred Davis (1986) Technology Acceptance Model
   ========================================================================== */

function BoxLines({
  cx,
  cy,
  lines,
  size = 15.5,
  fill = CREAM,
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
          fontFamily="var(--font-body)"
          fontWeight={600}
          fontSize={size}
          fill={fill}
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
      title="The Technology Acceptance Model: External Variables point to Perceived Usefulness (U) and Perceived Ease of Use (E); Perceived Ease of Use points up to Perceived Usefulness; both point to Attitude Toward Using (A), which together with Perceived Usefulness points to Behavioral Intention to Use, leading to Actual System Use in red"
    >
      {/* External Variables */}
      <rect x={12} y={66} width={116} height={92} fill={INK} />
      <BoxLines cx={70} cy={112} lines={["External", "Variables"]} />

      {/* Perceived Usefulness (U) & Perceived Ease of Use (E) */}
      <rect x={166} y={20} width={156} height={68} fill={INK} />
      <BoxLines cx={244} cy={54} lines={["Perceived", "Usefulness (U)"]} />

      <rect x={166} y={136} width={156} height={68} fill={INK} />
      <BoxLines cx={244} cy={170} lines={["Perceived Ease", "of Use (E)"]} />

      {/* Attitude Toward Using (A) */}
      <rect x={360} y={66} width={126} height={92} fill={INK} />
      <BoxLines cx={423} cy={112} lines={["Attitude", "Toward", "Using (A)"]} />

      {/* Behavioral Intention to Use */}
      <rect x={522} y={66} width={132} height={92} fill={INK} />
      <BoxLines cx={588} cy={112} lines={["Behavioral", "Intention to", "Use"]} />

      {/* Actual System Use (SIGNAL red outcome) */}
      <rect x={690} y={66} width={98} height={92} fill={SIGNAL} />
      <BoxLines cx={739} cy={112} lines={["Actual", "System", "Use"]} />

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
   2b · External Variables Interactive (Column Plate, w=400) — five distinct
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
      return <Person x={70} y={y - 20} k={0.38} hair="bob" />;
    case 3:
      return (
        <g>
          <Person x={58} y={y - 18} k={0.34} hair="crop" />
          <Person x={80} y={y - 18} k={0.34} hair="bun" flip gap />
        </g>
      );
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
      title={`SIMULATED. Five external variables on the left (1 System Features, 2 User Characteristics, 3 Social Influence, 4 Training and Support, 5 Task Characteristics) point to Perceived Usefulness (U) and Perceived Ease of Use (E) on the right; ${active.name} is selected in red, setting U to ${active.u}% and E to ${active.e}%`}
    >
      <text x={386} y={20} textAnchor="end" fontFamily="var(--font-body)" fontWeight={600} fontSize={12} fill={INK}>
        SIMULATED
      </text>

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
              fill={on ? COUNTER_FILL : CREAM}
              stroke={on ? SIGNAL : INK}
              strokeWidth={on ? 3 : 2}
            />
            <rect x={14} y={y - 20} width={28} height={40} fill={on ? SIGNAL : INK} />
            <text
              x={28}
              y={y + 6}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={16}
              fill={CREAM}
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
      <rect x={196} y={44} width={190} height={86} fill={CREAM} stroke={INK} strokeWidth={2.5} />
      <text x={210} y={68} fontFamily="var(--font-heading)" fontWeight={700} fontSize={15.5} fill={INK}>
        Perceived Usefulness (U)
      </text>
      <rect x={210} y={82} width={124} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={210} y={82} width={r2((active.u / 100) * 124)} height={22} fill={SIGNAL} />
      <text x={374} y={99} textAnchor="end" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        {`${active.u}%`}
      </text>

      {/* Right: Perceived Ease of Use (E) gauge card */}
      <rect x={196} y={156} width={190} height={86} fill={CREAM} stroke={INK} strokeWidth={2.5} />
      <text x={210} y={180} fontFamily="var(--font-heading)" fontWeight={700} fontSize={15.5} fill={INK}>
        Perceived Ease of Use (E)
      </text>
      <rect x={210} y={194} width={124} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={210} y={194} width={r2((active.e / 100) * 124)} height={22} fill={COUNTER} />
      <text x={374} y={211} textAnchor="end" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={COUNTER}>
        {`${active.e}%`}
      </text>

      {/* Selected variable caption at bottom right */}
      <text x={291} y={266} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        {`${active.n}. ${active.name}`}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   3 · Interactive TAM Beliefs Simulator — drag Perceived Usefulness (PU) and
   Perceived Ease of Use (PEOU) to watch Attitude Toward Use and Behavioral
   Intention to Use respond
   ========================================================================== */

export function TamBeliefsInteractive() {
  const [pu, setPu] = React.useState(75);
  const [peou, setPeou] = React.useState(70);

  // In TAM, PEOU also bolsters PU; both drive Attitude, and Attitude + PU drive Intention.
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
      h={244}
      title={`SIMULATED. Interactive TAM sliders: Perceived Usefulness (PU) is set to ${pu}% and Perceived Ease of Use (PEOU) is set to ${peou}%, producing Attitude Toward Use of ${attitude}% and Behavioral Intention to Use of ${intention}%`}
    >
      <text
        x={776}
        y={24}
        textAnchor="end"
        fontFamily="var(--font-body)"
        fontWeight={600}
        fontSize={13}
        fill={INK}
      >
        SIMULATED
      </text>

      {/* Left: Draggable input beliefs */}
      <text x={trackX} y={44} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
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
      <text x={trackX + trackW + 22} y={74} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        {`${pu}%`}
      </text>

      {/* Upward TAM link: PEOU bolsters PU */}
      <Pointer x1={148} y1={134} x2={148} y2={90} w={3} head={11} />

      <text x={trackX} y={160} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
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
      <text x={trackX + trackW + 22} y={190} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        {`${peou}%`}
      </text>

      {/* Connectors from PU & PEOU to Attitude & Intention */}
      <Pointer x1={336} y1={68} x2={432} y2={68} w={3.5} head={12} />
      <Pointer x1={336} y1={184} x2={432} y2={84} w={3.5} head={12} />
      <Pointer x1={660} y1={92} x2={660} y2={132} w={4} color={SIGNAL} head={12} />

      {/* Right: Resulting Attitude & Behavioral Intention */}
      <text x={outX} y={44} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        Attitude Toward Use
      </text>
      <rect x={outX} y={56} width={outW} height={26} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <rect x={outX} y={56} width={r2((attitude / 100) * outW)} height={26} fill={COUNTER} />
      <text x={outX + outW + 18} y={75} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        {`${attitude}%`}
      </text>

      <text x={outX} y={160} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={SIGNAL}>
        Behavioral Intention to Use
      </text>
      <rect x={outX} y={172} width={outW} height={28} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <rect x={outX} y={172} width={r2((intention / 100) * outW)} height={28} fill={SIGNAL} />
      <text x={outX + outW + 18} y={193} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={SIGNAL}>
        {`${intention}%`}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   3b · BestBuy External Variables Plate (Column Plate, w=400) — four external
   variables (system features, tech-savvy user, review stars, tutorial doc)
   feeding BestBuy's AI-powered virtual shopping assistant on a framed screen
   ========================================================================== */

export function BestBuyAssistantPlate() {
  const rows = [36, 92, 148, 204];
  return (
    <Plate
      w={400}
      h={244}
      title="Four numbered external variable badges on the left (1 interface sliders, 2 a tech-savvy shopper, 3 a review star, 4 a tutorial document) point to a framed screen holding a digital shop and a red chat assistant bubble"
    >
      {rows.map((cy, i) => (
        <g key={cy}>
          <rect x={16} y={cy - 20} width={96} height={40} fill={CREAM} stroke={INK} strokeWidth={2} />
          <rect x={16} y={cy - 20} width={28} height={40} fill={INK} />
          <text
            x={30}
            y={cy + 6}
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontWeight={700}
            fontSize={16}
            fill={CREAM}
          >
            {i + 1}
          </text>
          {i === 0 && <SlidersHorizontal x={58} y={cy - 15} size={30} weight="fill" color={INK} />}
          {i === 1 && <Person x={74} y={cy - 19} k={0.36} hair="crop" />}
          {i === 2 && <Star x={58} y={cy - 15} size={30} weight="fill" color={INK} />}
          {i === 3 && <Doc x={60} y={cy - 17} k={0.29} />}
          <Pointer x1={118} y1={cy} x2={198} y2={r2(84 + i * 22)} w={3} head={11} />
        </g>
      ))}

      <Monitor x={208} y={40} w={176} h={134}>
        <Shop x={232} y={70} k={0.52} />
        <ChatCircle x={320} y={58} size={44} weight="fill" color={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   4 · BestBuy Feature Trade-Off (Interactive) — "How is adding more features
   reducing the ease of use?"
   ========================================================================== */

const BB_USEFULNESS = [48, 74, 88, 92, 94, 95];
const BB_EASE = [92, 86, 78, 56, 36, 22];
const BB_ADOPTION = [64, 79, 85, 70, 54, 42];

export function BestBuyFeatureTradeoff() {
  const [features, setFeatures] = React.useState(3);
  const idx = features - 1;
  const u = BB_USEFULNESS[idx];
  const e = BB_EASE[idx];
  const use = BB_ADOPTION[idx];

  const barX = 396;
  const barW = 280;

  return (
    <Plate
      w={800}
      h={246}
      title={`SIMULATED. Interactive feature trade-off for BestBuy's virtual shopping assistant: with ${features} ${features === 1 ? "feature" : "features"} on the screen, Perceived Usefulness is ${u}%, Perceived Ease of Use is ${e}%, and Actual System Use is ${use}%`}
    >
      <text x={776} y={22} textAnchor="end" fontFamily="var(--font-body)" fontWeight={600} fontSize={13} fill={INK}>
        SIMULATED
      </text>

      {/* Left: Framed screen showing the chat assistant + feature modules */}
      <Monitor x={28} y={16} w={184} h={120}>
        <ChatCircle x={50} y={36} size={42} weight="fill" color={INK} />
        {Array.from({ length: features }, (_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <rect
              key={i}
              x={102 + col * 30}
              y={40 + row * 36}
              width={24}
              height={26}
              fill={i >= 3 ? SIGNAL : INK}
            />
          );
        })}
      </Monitor>

      {/* Feature count slider under the screen */}
      <text x={28} y={200} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        {`System Features: ${features}`}
      </text>
      <rect x={28} y={210} width={240} height={12} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={28} y={210} width={r2(((features - 1) / 5) * 240)} height={12} fill={INK} />
      <DragKnob
        x={28}
        y={216}
        value={features}
        min={1}
        max={6}
        onChange={setFeatures}
        label="Number of system features in the virtual assistant"
      />

      <Pointer x1={232} y1={84} x2={372} y2={84} w={3.5} head={12} />

      {/* Right: Three resulting bars */}
      <text x={barX} y={40} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        Perceived Usefulness (E)
      </text>
      <rect x={barX} y={48} width={barW} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={barX} y={48} width={r2((u / 100) * barW)} height={20} fill={INK} />
      <text x={barX + barW + 16} y={64} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        {`${u}%`}
      </text>

      <text x={barX} y={108} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        Perceived Ease of Use (U)
      </text>
      <rect x={barX} y={116} width={barW} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={barX} y={116} width={r2((e / 100) * barW)} height={20} fill={COUNTER} />
      <text x={barX + barW + 16} y={132} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        {`${e}%`}
      </text>

      <text x={barX} y={176} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        Actual System Use
      </text>
      <rect x={barX} y={184} width={barW} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={barX} y={184} width={r2((use / 100) * barW)} height={22} fill={SIGNAL} />
      <text x={barX + barW + 16} y={201} fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={SIGNAL}>
        {`${use}%`}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   4b · BestBuy Catalog & Manuals Bridge (Column Plate, w=400) — product
   catalog database and manuals feed into the AI chatbot on a framed screen
   ========================================================================== */

export function BestBuyCatalogBridgePlate() {
  return (
    <Plate
      w={400}
      h={216}
      title="Left: a product catalog database above a manual document. Center: a red arrow connects them into a framed screen holding a chat bubble and digital shop, facing a customer on the right"
    >
      <Database x={26} y={26} size={52} weight="fill" color={INK} />
      <Doc x={28} y={96} k={0.54} />

      <Arrow x1={92} x2={146} y={90} color={SIGNAL} />

      <Monitor x={156} y={24} w={130} h={104}>
        <ChatCircle x={174} y={48} size={40} weight="fill" color={SIGNAL} />
        <Shop x={220} y={62} k={0.32} />
      </Monitor>

      <Person x={344} y={54} k={0.95} hair="bob" flip />
    </Plate>
  );
}

/* ==========================================================================
   5 · Hospital Triage Chatbot — patients consult a chatbot on a framed screen,
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
      title="Two patients in profile face a triage chatbot on a framed screen; from the screen, a black arrow leads to a house labeled At home, and a red arrow leads to a medical cross labeled Urgent care"
    >
      <Person x={68} y={54} k={1.05} hair="bun" />
      <Person x={132} y={42} k={1.18} hair="crop" gap />
      <Arrow x1={194} x2={256} y={96} />

      <Monitor x={268} y={16} w={164} h={108}>
        <ChatCircle x={350 - 28} y={70 - 28} size={56} weight="fill" color={INK} />
      </Monitor>
      <text x={350} y={190} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        Triage
      </text>

      {/* Fork: At home (INK) vs Urgent care (SIGNAL) */}
      <Pointer x1={444} y1={62} x2={556} y2={48} w={4} head={13} />
      <HouseGlyph x={572} y={18} />
      <text x={644} y={52} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={INK}>
        At home
      </text>

      <Pointer x1={444} y1={98} x2={556} y2={136} w={5} color={SIGNAL} head={14} />
      <MedicalCross x={574} y={114} tone={SIGNAL} />
      <text x={644} y={147} fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={SIGNAL}>
        Urgent care
      </text>
    </Plate>
  );
}

/* ==========================================================================
   5b · Hospital Peak-Hours Triage Simulator (Column Plate, w=400) — drag how
   many non-urgent cases the chatbot filters to see Waiting times fall and
   Staff focus on critical patients rise
   ========================================================================== */

export function HospitalPeakSimulator() {
  const [filterPct, setFilterPct] = React.useState(65);
  const waitPct = Math.round(92 - filterPct * 0.78);
  const criticalFocus = Math.round(28 + filterPct * 0.85);

  const trackX = 24;
  const trackW = 240;

  return (
    <Plate
      w={400}
      h={256}
      title={`SIMULATED. Interactive hospital triage simulator: when the chatbot filters ${filterPct}% of non-urgent cases, Waiting times drop to ${waitPct}% and Staff focus on critical patients rises to ${criticalFocus}%`}
    >
      <text x={380} y={22} textAnchor="end" fontFamily="var(--font-body)" fontWeight={600} fontSize={12} fill={INK}>
        SIMULATED
      </text>

      {/* Draggable input: Non-urgent cases filtered by chatbot */}
      <text x={trackX} y={42} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        Non-urgent cases filtered
      </text>
      <rect x={trackX} y={54} width={trackW} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={trackX} y={54} width={r2((filterPct / 100) * trackW)} height={22} fill={INK} />
      <DragKnob
        x={trackX}
        y={65}
        value={filterPct}
        min={10}
        max={85}
        onChange={setFilterPct}
        label="Percentage of non-urgent cases filtered by the hospital chatbot"
      />
      <text x={trackX + trackW + 22} y={71} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        {`${filterPct}%`}
      </text>

      <Pointer x1={144} y1={86} x2={144} y2={114} w={3.5} color={SIGNAL} head={11} />

      {/* Outcome 1: Waiting times */}
      <text x={trackX} y={138} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        Waiting times
      </text>
      <rect x={trackX} y={148} width={trackW} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={trackX} y={148} width={r2((waitPct / 100) * trackW)} height={22} fill={COUNTER} />
      <text x={trackX + trackW + 22} y={165} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={COUNTER}>
        {`${waitPct}%`}
      </text>

      {/* Outcome 2: Critical patient focus */}
      <text x={trackX} y={204} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        Focus on critical patients
      </text>
      <rect x={trackX} y={214} width={trackW} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={trackX} y={214} width={r2((criticalFocus / 100) * trackW)} height={22} fill={SIGNAL} />
      <text
        x={trackX + trackW + 22}
        y={231}
        fontFamily="var(--font-heading)"
        fontWeight={700}
        fontSize={16}
        fill={SIGNAL}
      >
        {`${criticalFocus}%`}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   5c · Hospital EHR Integration Plate (Column Plate, w=400) — an Electronic
   Health Record (EHR) screen on the left links via a red arrow into the
   hospital chatbot screen on the right
   ========================================================================== */

export function HospitalEhrIntegrationPlate() {
  return (
    <Plate
      w={400}
      h={212}
      title="Left: a framed screen holding a patient health record document, labeled EHR. Center: a red arrow connects it into a second framed screen holding a chatbot bubble and medical cross"
    >
      <Monitor x={20} y={24} w={132} h={108}>
        <Doc x={64} y={46} k={0.48} />
      </Monitor>
      <text x={86} y={188} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        EHR
      </text>

      <Arrow x1={164} x2={236} y={78} color={SIGNAL} />

      <Monitor x={248} y={24} w={132} h={108}>
        <ChatCircle x={266} y={58} size={38} weight="fill" color={INK} />
        <MedicalCross x={314} y={58} k={0.74} tone={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   6 · IKEA Self-Return Kiosk — contrasts waiting in a queue of customers with
   processing a return directly at a framed self-return kiosk
   ========================================================================== */

export function IkeaKioskReturn() {
  const queueX = [60, 122, 184, 246];
  const hairs: ("bob" | "crop" | "bun")[] = ["crop", "bob", "bun", "crop"];
  return (
    <Plate
      w={800}
      h={206}
      title="Left: four customers waiting in line behind a counter, labeled Waiting in line. Right: a single customer steps directly to a framed screen holding a package and return arrow, labeled Self-return kiosk in red"
    >
      {/* Left: Waiting in line */}
      {queueX.map((x, i) => (
        <Person key={x} x={x} y={38} k={1.02} hair={hairs[i]} gap={i > 0} />
      ))}
      <rect x={312} y={78} width={54} height={62} fill={INK} />
      <text x={200} y={184} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={18} fill={INK}>
        Waiting in line
      </text>

      <path d="M 400 20 V 188" stroke={INK} strokeWidth={1.5} strokeDasharray="5 5" />

      {/* Right: Self-return kiosk */}
      <Person x={476} y={38} k={1.02} hair="bob" />
      <Arrow x1={530} x2={590} y={88} color={SIGNAL} />
      <Monitor x={602} y={16} w={164} h={104}>
        <Package x={644} y={44} size={48} weight="fill" color={INK} />
        <ArrowsClockwise x={696} y={46} size={44} weight="fill" color={SIGNAL} />
      </Monitor>
      <text
        x={600}
        y={184}
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontWeight={700}
        fontSize={18}
        fill={SIGNAL}
      >
        Self-return kiosk
      </text>
    </Plate>
  );
}

/* ==========================================================================
   6b · IKEA Kiosk Benefits Plate (Column Plate, w=400) — top row shows fast
   barcode return on a framed kiosk screen; bottom row shows staff freed for
   complex issues and cost savings
   ========================================================================== */

export function IkeaKioskStepsPlate() {
  return (
    <Plate
      w={400}
      h={260}
      title="Top: a framed kiosk screen holding a barcode and package points to a fast clock, labeled Faster returns. Bottom: a staff member works on complex gears beside a red stack of coins, labeled Cost savings"
    >
      {/* Top: Routine return on kiosk -> Faster returns */}
      <Monitor x={20} y={12} w={156} h={92}>
        <Barcode x={44} y={36} size={42} weight="fill" color={INK} />
        <Package x={102} y={38} size={40} weight="fill" color={INK} />
      </Monitor>
      <Arrow x1={190} x2={254} y={60} color={SIGNAL} />
      <Clock x={282} y={24} size={56} weight="fill" color={SIGNAL} />
      <text x={310} y={104} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        Faster returns
      </text>

      <path d="M 20 152 H 380" stroke={INK} strokeWidth={1.5} strokeDasharray="5 5" />

      {/* Bottom: Staff focus on complex issues + Cost savings */}
      <Person x={64} y={162} k={0.84} hair="crop" />
      <Gear x={118} y={172} size={38} weight="fill" color={INK} />
      <Gear x={158} y={198} size={30} weight="fill" color={INK} />
      <Coins x={262} y={240} n={4} />
      <text x={340} y={210} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        Cost
      </text>
      <text x={340} y={234} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        savings
      </text>
    </Plate>
  );
}

/* ==========================================================================
   6c · UTAUT Synthesis Plate (Column Plate, w=400) — TAM, TPB, and the
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
          <rect x={14} y={cy - 26} width={122} height={52} fill={INK} />
          <BoxLines cx={75} cy={cy} lines={lines} size={15} />
          <Pointer x1={140} y1={cy} x2={182} y2={r2(96 + (cy - 42) * 0.34)} w={3.5} head={11} />
        </g>
      ))}

      {/* Center: UTAUT (2003) */}
      <rect x={188} y={76} width={96} height={96} fill={SIGNAL} />
      <BoxLines cx={236} cy={124} lines={["UTAUT", "2003"]} size={18} />

      {/* Right: Four numbered primary constructs */}
      {fourY.map((cy, i) => (
        <g key={cy}>
          <Pointer x1={288} y1={r2(92 + i * 21)} x2={334} y2={cy} w={3.5} color={SIGNAL} head={11} />
          <rect x={340} y={cy - 20} width={44} height={40} fill={INK} />
          <text
            x={362}
            y={cy + 7}
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontWeight={700}
            fontSize={20}
            fill={CREAM}
          >
            {i + 1}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   7 · Interactive UTAUT Model (Venkatesh et al., 2003) — click any of the four
   moderating variables at the bottom to highlight the exact relationships it
   moderates
   ========================================================================== */

type ModeratorId = "gender" | "age" | "experience" | "voluntariness";

const MODERATORS: {
  id: ModeratorId;
  label: string;
  x: number;
  w: number;
  paths: ("pe" | "ee" | "si" | "fc")[];
}[] = [
  { id: "gender", label: "Gender", x: 16, w: 172, paths: ["pe", "ee", "si"] },
  { id: "age", label: "Age", x: 206, w: 172, paths: ["pe", "ee", "si", "fc"] },
  { id: "experience", label: "Experience", x: 396, w: 172, paths: ["ee", "si", "fc"] },
  { id: "voluntariness", label: "Voluntariness of Use", x: 586, w: 198, paths: ["si"] },
];

export function UtautModelInteractive() {
  const [mod, setMod] = React.useState<ModeratorId>("experience");
  const active = MODERATORS.find((m) => m.id === mod)!;
  const isLit = (p: "pe" | "ee" | "si" | "fc") => active.paths.includes(p);

  const constructs: { id: "pe" | "ee" | "si" | "fc"; label: string; y: number }[] = [
    { id: "pe", label: "Performance Expectancy", y: 14 },
    { id: "ee", label: "Effort Expectancy", y: 68 },
    { id: "si", label: "Social Influence", y: 122 },
    { id: "fc", label: "Facilitating Conditions", y: 176 },
  ];

  return (
    <Plate
      w={800}
      h={284}
      title={`The UTAUT model (Venkatesh et al., 2003): Performance Expectancy, Effort Expectancy, and Social Influence point to Behavioral Intention, which together with Facilitating Conditions points to Use Behavior. Bottom row shows four moderating variables (Gender, Age, Experience, Voluntariness of Use); ${active.label} is selected in red, highlighting the ${active.paths.length} paths it moderates`}
    >
      {/* Four primary constructs */}
      {constructs.map((c) => {
        const lit = isLit(c.id);
        return (
          <g key={c.id}>
            <rect x={16} y={c.y} width={212} height={42} fill={lit ? SIGNAL : INK} />
            <text
              x={122}
              y={c.y + 27}
              textAnchor="middle"
              fontFamily="var(--font-body)"
              fontWeight={600}
              fontSize={15.5}
              fill={CREAM}
            >
              {c.label}
            </text>
          </g>
        );
      })}

      {/* Behavioral Intention */}
      <rect x={368} y={56} width={164} height={68} fill={INK} />
      <BoxLines cx={450} cy={90} lines={["Behavioral", "Intention"]} />

      {/* Use Behavior */}
      <rect x={620} y={114} width={164} height={68} fill={INK} />
      <BoxLines cx={702} cy={148} lines={["Use", "Behavior"]} />

      {/* Construct -> Outcome arrows */}
      <Pointer
        x1={232}
        y1={35}
        x2={362}
        y2={72}
        w={isLit("pe") ? 5 : 3}
        color={isLit("pe") ? SIGNAL : INK}
        head={13}
      />
      <Pointer
        x1={232}
        y1={89}
        x2={362}
        y2={89}
        w={isLit("ee") ? 5 : 3}
        color={isLit("ee") ? SIGNAL : INK}
        head={13}
      />
      <Pointer
        x1={232}
        y1={143}
        x2={362}
        y2={106}
        w={isLit("si") ? 5 : 3}
        color={isLit("si") ? SIGNAL : INK}
        head={13}
      />
      <Pointer
        x1={232}
        y1={197}
        x2={614}
        y2={162}
        w={isLit("fc") ? 5 : 3}
        color={isLit("fc") ? SIGNAL : INK}
        head={13}
      />

      {/* Behavioral Intention -> Use Behavior */}
      <Pointer x1={536} y1={90} x2={614} y2={134} w={3.5} color={INK} head={13} />

      {/* Interactive Moderating Variables row */}
      {MODERATORS.map((m) => {
        const on = m.id === mod;
        return (
          <g
            key={m.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`Moderator: ${m.label}`}
            style={{ cursor: "pointer" }}
            onClick={() => setMod(m.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMod(m.id);
              }
            }}
          >
            <rect
              x={m.x}
              y={234}
              width={m.w}
              height={36}
              fill={on ? SIGNAL : COUNTER_FILL}
              stroke={on ? SIGNAL : INK}
              strokeWidth={2.5}
            />
            <text
              x={r2(m.x + m.w / 2)}
              y={257}
              textAnchor="middle"
              fontFamily="var(--font-body)"
              fontWeight={600}
              fontSize={15}
              fill={on ? CREAM : INK}
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   7b · IKEA UTAUT Drivers Plate (Full-width, w=800) — four visual scenes
   aligned with the four UTAUT constructs above (1 clock for saving time,
   2 touch screen for ease of use, 3 two shoppers with word-of-mouth bubble,
   4 support staff with guidance doc), pointing down to Behavioral Intention
   and Actual Use
   ========================================================================== */

export function IkeaUtautDriversPlate() {
  const cx = [104, 301, 499, 696];
  return (
    <Plate
      w={800}
      h={168}
      title="Four visual stations for IKEA's kiosk under the four UTAUT constructs: 1 a clock for saving time, 2 a framed touch screen for ease of use, 3 two shoppers talking for word-of-mouth social influence, and 4 a support staff member with a guidance document for facilitating conditions; arrows point down to the outcomes below"
    >
      {/* 1. Performance Expectancy: saving time */}
      <Clock x={cx[0] - 28} y={20} size={56} weight="fill" color={INK} />

      {/* 2. Effort Expectancy: intuitive touch screen */}
      <MiniScreen x={cx[1] - 42} y={14}>
        <SlidersHorizontal x={cx[1] - 18} y={24} size={36} weight="fill" color={INK} />
      </MiniScreen>

      {/* 3. Social Influence: observing other customers & word-of-mouth */}
      <Person x={cx[2] - 34} y={16} k={0.72} hair="bob" />
      <Person x={cx[2] + 34} y={16} k={0.72} hair="crop" flip gap />
      <ChatCircle x={cx[2] - 14} y={6} size={28} weight="fill" color={SIGNAL} />

      {/* 4. Facilitating Conditions: on-site support staff & clear guidance */}
      <Person x={cx[3] - 26} y={16} k={0.72} hair="bun" />
      <Doc x={cx[3] + 14} y={24} k={0.52} />

      {/* Shared horizontal collector bar & downward arrows to outcomes */}
      <path d="M 104 114 H 696" stroke={INK} strokeWidth={3.5} />
      {cx.map((x) => (
        <path key={x} d={`M ${x} 94 V 114`} stroke={INK} strokeWidth={3.5} />
      ))}
      <Pointer x1={250} y1={114} x2={250} y2={154} w={4.5} color={SIGNAL} head={13} />
      <Pointer x1={550} y1={114} x2={550} y2={154} w={4.5} color={SIGNAL} head={13} />
    </Plate>
  );
}

/* ==========================================================================
   7c · IKEA Moderating Variables Interactive (Column Plate, w=400) — select any
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
      title={`SIMULATED. Interactive IKEA moderating variables: ${active.n}. ${active.short} is selected on the left, comparing kiosk adoption between ${active.hiLabel} (${active.hiVal}%) and ${active.loLabel} (${active.loVal}%) on the right`}
    >
      <text x={386} y={20} textAnchor="end" fontFamily="var(--font-body)" fontWeight={600} fontSize={12} fill={INK}>
        SIMULATED
      </text>

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
              fill={on ? SIGNAL : COUNTER_FILL}
              stroke={on ? SIGNAL : INK}
              strokeWidth={2.5}
            />
            <text
              x={26}
              y={y + 6}
              fontFamily="var(--font-body)"
              fontWeight={600}
              fontSize={14}
              fill={on ? CREAM : INK}
            >
              {`${m.n}. ${m.short}`}
            </text>
          </g>
        );
      })}

      {/* Connector from selected moderator to comparison card */}
      <Pointer x1={162} y1={rowY(sel)} x2={194} y2={140} w={3.5} color={SIGNAL} head={11} />

      {/* Right: Segment comparison card */}
      <rect x={200} y={42} width={186} height={198} fill={CREAM} stroke={INK} strokeWidth={2.5} />
      <text x={214} y={70} fontFamily="var(--font-heading)" fontWeight={700} fontSize={14.5} fill={INK}>
        {active.hiLabel}
      </text>
      <rect x={214} y={82} width={118} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={214} y={82} width={r2((active.hiVal / 100) * 118)} height={22} fill={SIGNAL} />
      <text x={374} y={99} textAnchor="end" fontFamily="var(--font-heading)" fontWeight={700} fontSize={15} fill={SIGNAL}>
        {`${active.hiVal}%`}
      </text>

      <text x={214} y={154} fontFamily="var(--font-heading)" fontWeight={700} fontSize={14.5} fill={INK}>
        {active.loLabel}
      </text>
      <rect x={214} y={166} width={118} height={22} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={214} y={166} width={r2((active.loVal / 100) * 118)} height={22} fill={COUNTER} />
      <text x={374} y={183} textAnchor="end" fontFamily="var(--font-heading)" fontWeight={700} fontSize={15} fill={COUNTER}>
        {`${active.loVal}%`}
      </text>

      <text x={293} y={222} textAnchor="middle" fontFamily="var(--font-body)" fontWeight={600} fontSize={13.5} fill={INK}>
        Adoption &amp; satisfaction
      </text>
    </Plate>
  );
}

/* ==========================================================================
   8 · Interactive IoT Loop (Collect, Share, Act) — switch between smart
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
      <text x={136} y={172} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={INK}>
        Collect
      </text>

      <Arrow x1={204} x2={304} y={76} />

      {/* 2. Share (framed screen) */}
      <Monitor x={318} y={14} w={164} h={98}>
        <IotGlyph id={dev} cx={376} cy={63} size={44} tone={INK} />
        <Pulse x={414} y={41} size={44} weight="fill" color={INK} />
      </Monitor>
      <text x={400} y={172} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={20} fill={INK}>
        Share
      </text>

      <Arrow x1={496} x2={596} y={76} color={SIGNAL} />

      {/* 3. Act */}
      <circle cx={664} cy={76} r={52} fill={SIGNAL} />
      <IotGlyph id={dev} cx={664} cy={76} size={58} tone={CREAM} />
      <text
        x={664}
        y={172}
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontWeight={700}
        fontSize={20}
        fill={SIGNAL}
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
              fill={on ? INK : COUNTER_FILL}
              stroke={INK}
              strokeWidth={2.5}
            />
            <text
              x={r2(d.x + d.w / 2)}
              y={218}
              textAnchor="middle"
              fontFamily="var(--font-body)"
              fontWeight={600}
              fontSize={15}
              fill={on ? CREAM : INK}
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
   9 · IoT Privacy and Security — five visual stations aligned under the five
   best practices
   ========================================================================== */

export function IotSecurityPractices() {
  const cx = [86, 243, 400, 557, 714];
  return (
    <Plate
      w={800}
      h={184}
      title="Five numbered security stations aligned across a rail: 1, a key inside a framed screen for device authentication; 2, a lock on a network link for secure communications; 3, an update cycle on a framed screen for firmware updates; 4, one kept data block beside two crossed-out blocks for limiting data collection; 5, a person with a red shield for educating users"
    >
      {/* 1. Strong device authentication */}
      <MiniScreen x={cx[0] - 42} y={24}>
        <Key x={cx[0] - 18} y={34} size={36} weight="fill" color={INK} />
      </MiniScreen>

      {/* 2. Secure network communications */}
      <path d={`M ${cx[1] - 54} 58 H ${cx[1] + 54}`} stroke={INK} strokeWidth={5} />
      <circle cx={cx[1] - 54} cy={58} r={8} fill={INK} />
      <circle cx={cx[1] + 54} cy={58} r={8} fill={INK} />
      <circle cx={cx[1]} cy={58} r={26} fill={CREAM} stroke={INK} strokeWidth={3.5} />
      <LockKey x={cx[1] - 18} y={40} size={36} weight="fill" color={INK} />

      {/* 3. Keep software and firmware updated */}
      <MiniScreen x={cx[2] - 42} y={24}>
        <ArrowsClockwise x={cx[2] - 19} y={33} size={38} weight="fill" color={INK} />
      </MiniScreen>

      {/* 4. Limit data collection and storage */}
      <rect x={cx[3] - 44} y={66} width={88} height={22} rx={4} fill={INK} />
      <rect
        x={cx[3] - 44}
        y={38}
        width={88}
        height={20}
        rx={4}
        fill={COUNTER_FILL}
        stroke={INK}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <rect
        x={cx[3] - 44}
        y={12}
        width={88}
        height={20}
        rx={4}
        fill={COUNTER_FILL}
        stroke={INK}
        strokeWidth={2}
        strokeDasharray="4 4"
      />

      {/* 5. Educate users on IoT security */}
      <Person x={cx[4] - 20} y={14} k={0.82} hair="bob" />
      <ShieldCheck x={cx[4] + 10} y={32} size={44} weight="fill" color={SIGNAL} />

      {/* Shared plinth rail & numerals */}
      <path d="M 24 128 H 776" stroke={INK} strokeWidth={4} />
      {cx.map((x, i) => (
        <g key={x}>
          <rect x={x - 18} y={128} width={36} height={36} fill={i === 4 ? SIGNAL : INK} />
          <text
            x={x}
            y={153}
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontWeight={700}
            fontSize={20}
            fill={CREAM}
          >
            {i + 1}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   10 · IoT Device Management Process — five connected lifecycle stages
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
      <Key x={cx[0] - 24} y={cy - 24} size={48} weight="fill" color={CREAM} />

      {/* Stage 2: Configuration and Control */}
      <circle cx={cx[1]} cy={cy} r={r} fill={INK} />
      <SlidersHorizontal x={cx[1] - 24} y={cy - 24} size={48} weight="fill" color={CREAM} />

      {/* Stage 3: Monitoring and Diagnostics */}
      <circle cx={cx[2]} cy={cy} r={r} fill={INK} />
      <Pulse x={cx[2] - 24} y={cy - 24} size={48} weight="fill" color={CREAM} />

      {/* Stage 4: Software Updates and Maintenance */}
      <circle cx={cx[3]} cy={cy} r={r} fill={INK} />
      <ArrowsClockwise x={cx[3] - 24} y={cy - 24} size={48} weight="fill" color={CREAM} />

      {/* Stage 5: Decommissioning */}
      <circle cx={cx[4]} cy={cy} r={r} fill={SIGNAL} />
      <Power x={cx[4] - 24} y={cy - 24} size={48} weight="fill" color={CREAM} />
    </Plate>
  );
}

/* ==========================================================================
   11 · Cloud Computing Hub — a central data center on a framed screen delivers
   storage, processing, and software over the internet to remote users and shops
   ========================================================================== */

export function CloudComputingHub() {
  return (
    <Plate
      w={800}
      h={216}
      title="A central framed screen labeled Central data center holds a cloud, storage database, and processor; arrows connect it to remote people on the left and a remote business shop on the right"
    >
      {/* Left: Remote users */}
      <Person x={72} y={48} k={1.05} hair="crop" />
      <Person x={136} y={38} k={1.15} hair="bob" gap />
      <Pointer x1={276} y1={84} x2={196} y2={84} w={4} color={SIGNAL} head={13} />
      <Pointer x1={196} y1={108} x2={276} y2={108} w={3.5} head={12} />

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
        fontFamily="var(--font-heading)"
        fontWeight={700}
        fontSize={18}
        fill={SIGNAL}
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
   12 · Interactive Edge, Fog, and Cloud Simulator — select where data is
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
      title={`SIMULATED. Interactive comparison of Edge, Fog, and Cloud computing: processing at the ${active.label} tier shows the round-trip path from the data source and produces Latency of ${active.latency}% and Bandwidth usage of ${active.bandwidth}%`}
    >
      {/* Leftmost: Data source (Autonomous vehicle / Factory machine) */}
      <circle cx={68} cy={66} r={44} fill={INK} />
      <Car x={68 - 26} y={66 - 26} size={52} weight="fill" color={CREAM} />
      <text x={68} y={134} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
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
              fill={on ? COUNTER_FILL : CREAM}
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
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={18}
              fill={on ? SIGNAL : INK}
            >
              {t.label}
            </text>
          </g>
        );
      })}

      {/* Active signal path from Source to chosen tier */}
      <Pointer x1={116} y1={160} x2={active.cx} y2={160} w={5} color={SIGNAL} head={14} />

      {/* Bottom: Latency and Bandwidth usage bars */}
      <text x={28} y={202} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        Latency
      </text>
      <rect x={108} y={186} width={200} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={108} y={186} width={r2((active.latency / 100) * 200)} height={20} fill={SIGNAL} />
      <text x={320} y={202} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={SIGNAL}>
        {`${active.latency}%`}
      </text>

      <text x={384} y={202} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        Bandwidth usage
      </text>
      <rect x={528} y={186} width={140} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={528} y={186} width={r2((active.bandwidth / 100) * 140)} height={20} fill={COUNTER} />
      <text x={680} y={202} fontFamily="var(--font-heading)" fontWeight={700} fontSize={16} fill={INK}>
        {`${active.bandwidth}%`}
      </text>

      <text x={784} y={201} textAnchor="end" fontFamily="var(--font-body)" fontWeight={600} fontSize={12.5} fill={INK}>
        SIMULATED
      </text>
    </Plate>
  );
}

/* ==========================================================================
   13 · Interactive 4-Layer Architecture Stack (Column Plate, w=400) — click
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
      title={`Interactive four-layer architecture stack (Cloud, Fog, Edge, IoT) on the left; ${active.name} is selected in red, pointing to a framed screen on the right showing its use case: ${active.useCase.join(" ")}`}
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
              fill={on ? SIGNAL : COUNTER_FILL}
              stroke={on ? SIGNAL : INK}
              strokeWidth={2.5}
            />
            <text
              x={84}
              y={l.y + 27}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={18}
              fill={on ? CREAM : INK}
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
