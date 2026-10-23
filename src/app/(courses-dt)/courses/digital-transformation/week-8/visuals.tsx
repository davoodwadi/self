"use client";

/* ==========================================================================
   Week 8 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     · Person                — every human (bust in profile)
     · Shop                  — physical building / home base
     · Doc                   — training log / proposal / record
     · Coins                 — extrinsic reward / cost
     · Monitor / MiniScreen  — anything digital (VR/AR environment, simulator,
                               gamified app screen)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React, { useState } from "react";
import {
  AirplaneTilt,
  CarProfile,
  Goggles,
  Trophy,
  Medal,
  Star,
  Cube,
  HandPalm,
  Eye,
  SpeakerHigh,
  Broom,
  GameController,
  UsersThree,
  FlagBanner,
  Sword,
  Heart,
  Compass,
  CloudRain,
  MusicNotes,
  Headphones,
  Package,
  Lightning,
  Crosshair,
  Robot,
  BookOpen,
  Scales,
  ShieldWarning,
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
  Knob,
} from "../_visuals/kit";
import { Person, Shop, Coins } from "../_visuals/objects";

const HEAD = { fontFamily: "var(--font-heading)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-body)", fontWeight: 600 } as const;

/* ==========================================================================
   1 · Hero — Physical trainee & aircraft on the left; red arrow into a
   framed digital screen showing an immersive simulation and gamified milestones
   ========================================================================== */

export function HeroImmersivePlate() {
  return (
    <Plate
      w={540}
      h={270}
      title="A person in profile and an airplane silhouette on cream, an arrow, and a framed screen holding the same airplane alongside three rising gamification steps topped with a red trophy"
    >
      {/* Physical side: person and aircraft silhouette on cream */}
      <Person x={76} y={28} k={0.96} variant={10} />
      <AirplaneTilt x={38} y={144} size={76} weight="fill" color={INK} />

      <Arrow x1={144} x2={208} y={128} />

      {/* Digital side: framed screen with simulated aircraft + gamified progression */}
      <Monitor x={220} y={18} w={296} h={204}>
        <AirplaneTilt x={252} y={66} size={76} weight="fill" color={INK} />
        {/* Rising gamification steps inside the screen */}
        <rect x={360} y={152} width={36} height={42} fill={INK} />
        <rect x={404} y={124} width={36} height={70} fill={INK} />
        <rect x={448} y={92} width={36} height={102} fill={SIGNAL} />
        <Trophy x={450} y={50} size={32} weight="fill" color={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   2 · Question: Becoming a Pilot — Driver's license vs. Pilot's 10,000 hours,
   and an interactive simulator slider showing how immersive simulation solves
   the 10,000-hour training bottleneck
   ========================================================================== */

export function PilotTrainingInteractive() {
  const [simPct, setSimPct] = useState(50);
  const simHours = Math.round((10000 * simPct) / 100);
  const airHours = 10000 - simHours;
  const airBarW = r2((352 * airHours) / 10000);
  const simBarW = r2(352 - airBarW);
  const costPct = Math.round(100 - simPct * 0.85);

  return (
    <Plate
      w={800}
      h={276}
      title={`On the left, four people beside a car silhouette for a driver's license versus one person and a 10,000-hour requirement beside an airplane for a pilot's license; on the right, an interactive slider (currently ${simPct}% simulator share, ${simHours.toLocaleString()} simulator hours and ${airHours.toLocaleString()} aircraft hours) shifts training from a physical aircraft into a framed flight-simulator screen`}
    >
      {/* Left comparison: Driver's license (many people) vs. Pilot's license (1 person, 10,000 hours) */}
      <text x={140} y={32} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
        Driver&apos;s vs. Pilot&apos;s License
      </text>

      {/* Row 1: Driver's license — car + 4 drivers */}
      <rect x={20} y={48} width={240} height={88} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <text x={32} y={68} {...HEAD} fontSize={14} fill={INK}>
        Driver&apos;s license
      </text>
      <CarProfile x={30} y={80} size={42} weight="fill" color={INK} />
      <Person x={102} y={76} k={0.48} variant={0} />
      <Person x={140} y={76} k={0.48} variant={3} />
      <Person x={178} y={76} k={0.48} variant={6} />
      <Person x={216} y={76} k={0.48} variant={8} />

      {/* Row 2: Pilot's license — aircraft + 1 pilot + 10,000 hours */}
      <rect x={20} y={150} width={240} height={96} fill={CREAM} stroke={INK} strokeWidth={3} />
      <text x={32} y={172} {...HEAD} fontSize={14} fill={INK}>
        Pilot&apos;s license
      </text>
      <AirplaneTilt x={30} y={186} size={42} weight="fill" color={INK} />
      <Person x={102} y={182} k={0.48} variant={10} />
      <rect x={132} y={192} width={114} height={32} fill={SIGNAL} />
      <text x={189} y={213} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
        10,000 hours
      </text>

      <path d="M 276 18 V 256" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Right instrument: Solution — shifting 10,000 hours into Flight Simulator */}
      <text x={296} y={32} {...HEAD} fontSize={18} fill={INK}>
        Solution: Flight Simulator
      </text>

      {/* Physical aircraft -> Framed Simulator Screen */}
      <AirplaneTilt x={320} y={60} size={56} weight="fill" color={COUNTER} />
      <Pointer x1={388} y1={86} x2={434} y2={86} w={4} head={12} color={SIGNAL} />

      <Monitor x={444} y={44} w={116} h={76}>
        <AirplaneTilt x={482} y={62} size={40} weight="fill" color={SIGNAL} />
      </Monitor>

      {/* Matched baseline for both hour labels (Rule 11 & Rule 15) */}
      <text x={348} y={170} textAnchor="middle" {...BODY} fontSize={13.5} fill={COUNTER}>
        {airHours.toLocaleString()} hrs air
      </text>
      <text x={502} y={170} textAnchor="middle" {...HEAD} fontSize={13.5} fill={SIGNAL}>
        {simHours.toLocaleString()} hrs sim
      </text>

      {/* Cost & Risk gauge on far right */}
      <rect x={586} y={44} width={194} height={106} fill={CREAM} stroke={INK} strokeWidth={3} />
      <text x={683} y={70} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
        Real-flight cost &amp; risk
      </text>
      <rect x={602} y={84} width={162} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={602} y={84} width={r2((162 * costPct) / 100)} height={20} fill={COUNTER} />
      <text x={683} y={130} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
        {costPct}% of all-aircraft
      </text>

      {/* Single 10,000-hour split bar & interactive Knob */}
      <rect x={296} y={186} width={airBarW} height={20} fill={COUNTER} />
      <rect x={r2(296 + airBarW)} y={186} width={simBarW} height={20} fill={SIGNAL} />
      <rect x={296} y={186} width={352} height={20} fill="none" stroke={INK} strokeWidth={2.5} />
      <text x={662} y={201} {...HEAD} fontSize={14.5} fill={SIGNAL}>
        {simPct}% simulator
      </text>

      {/* Slider track */}
      <text x={296} y={244} {...BODY} fontSize={14} fill={INK}>
        Simulator share
      </text>
      <path d="M 418 239 H 738" stroke={INK} strokeWidth={4} />
      <Knob
        x={418}
        y={239}
        len={320}
        value={simPct}
        min={0}
        max={80}
        step={5}
        tone={SIGNAL}
        label="Simulator share of 10,000 training hours"
        onChange={setSimPct}
      />
    </Plate>
  );
}

/* ==========================================================================
   3 · Immersive Technologies — Three selectable pillars:
   1. Simulating realistic environments, 2. Interacting with virtual elements,
   3. Blending digital content with the physical world
   ========================================================================== */

export function SimulatingPlate() {
  return (
    <Plate
      w={400}
      h={184}
      title="A physical airplane silhouette on cream, an arrow, and a framed screen simulating the same airplane environment in red"
    >
      <AirplaneTilt x={34} y={42} size={84} weight="fill" color={INK} />
      <Arrow x1={136} x2={198} y={84} />
      <Monitor x={210} y={18} w={166} h={114}>
        <AirplaneTilt x={257} y={39} size={72} weight="fill" color={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

export function InteractingPlate() {
  return (
    <Plate
      w={400}
      h={184}
      title="A person in profile exchanging two-way arrows with a framed screen showing a hand manipulating a red virtual cube"
    >
      <Person x={72} y={46} k={1.16} variant={4} />
      <Pointer x1={134} y1={68} x2={194} y2={68} w={4} head={12} color={SIGNAL} />
      <Pointer x1={194} y1={96} x2={134} y2={96} w={4} head={12} color={INK} />
      <Monitor x={206} y={18} w={170} h={114}>
        <HandPalm x={234} y={51} size={48} weight="fill" color={INK} />
        <Cube x={296} y={51} size={48} weight="fill" color={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

export function BlendingPlate() {
  return (
    <Plate
      w={400}
      h={184}
      title="A person looking through a framed screen holding a red virtual cube, blended onto a physical shop in the real world"
    >
      <Person x={56} y={46} k={1.16} variant={8} />
      <MiniScreen x={132} y={76}>
        <Cube x={156} y={86} size={36} weight="fill" color={SIGNAL} />
      </MiniScreen>
      <Pointer x1={224} y1={104} x2={264} y2={104} w={4} head={11} color={SIGNAL} />
      <Shop x={272} y={60} k={0.68} />
    </Plate>
  );
}

/* ==========================================================================
   4 · Virtual Reality (VR) and Augmented Reality (AR) — Two selectable panels:
   1. Virtual Reality (VR): headset -> fully computer-generated world (visual,
      auditory, haptic)
   2. Augmented Reality (AR): smartphone/tablet/AR glasses overlaying digital
      elements onto the physical world
   ========================================================================== */

export function VirtualRealityPlate() {
  return (
    <Plate
      w={400}
      h={180}
      title="A person wearing a red VR headset visor immersed in a framed computer-generated screen with visual (eye), auditory (speaker), and haptic (hand) stimuli"
    >
      <Person x={68} y={52} k={1.1} hair="bob" collar="turtleneck" />
      {/* VR headset strap & visor aligned to the eye */}
      <rect x={44} y={78} width={32} height={5} fill={SIGNAL} />
      <rect x={74} y={73} width={25} height={15} rx={3} fill={SIGNAL} stroke={CREAM} strokeWidth={1.5} />

      <Pointer x1={112} y1={92} x2={156} y2={92} w={4} head={12} color={SIGNAL} />

      <Monitor x={168} y={16} w={212} h={116}>
        <Eye x={190} y={52} size={44} weight="fill" color={SIGNAL} />
        <SpeakerHigh x={252} y={52} size={44} weight="fill" color={INK} />
        <HandPalm x={314} y={52} size={44} weight="fill" color={INK} />
      </Monitor>
    </Plate>
  );
}

export function AugmentedRealityPlate() {
  return (
    <Plate
      w={400}
      h={180}
      title="A person viewing a red digital cube on a framed screen that overlays onto a physical shop in the real world"
    >
      <Person x={56} y={52} k={1.1} variant={6} />
      <MiniScreen x={132} y={76}>
        <Cube x={156} y={86} size={36} weight="fill" color={SIGNAL} />
      </MiniScreen>
      <Pointer x1={224} y1={104} x2={264} y2={104} w={4} head={11} color={SIGNAL} />
      <Shop x={272} y={60} k={0.68} />
    </Plate>
  );
}

/* ==========================================================================
   5 · Gamification: Swipe vs. Sweep — Three selectable panels:
   1. Sweep the Floor (mundane physical chore with no feedback loop)
   2. Swipe the Phone (play, achievement, and social interaction on a screen)
   3. Gamify the Task (applying game-design mechanics to non-game goals)
   ========================================================================== */

export function SwipeVsSweepPlate() {
  return (
    <Plate
      w={400}
      h={216}
      title="Two panels comparing Sweep on the left (a person with a broom on plain cream) and Swipe on the right (a person facing a framed screen delivering play via a game controller, achievement via a trophy, and social interaction via three people in red)"
    >
      <path d="M 168 18 V 196" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Left: Sweep the floor */}
      <text x={84} y={36} textAnchor="middle" {...HEAD} fontSize={20} fill={INK}>
        Sweep
      </text>
      <Person x={52} y={90} k={1} variant={7} />
      <Broom x={100} y={108} size={54} weight="fill" color={INK} />

      {/* Right: Swipe the phone (play, achievement, social interaction on a screen) */}
      <text x={284} y={36} textAnchor="middle" {...HEAD} fontSize={20} fill={SIGNAL}>
        Swipe
      </text>
      <Person x={214} y={90} k={1} variant={1} />
      <Monitor x={264} y={56} w={120} h={104}>
        <GameController x={280} y={70} size={34} weight="fill" color={SIGNAL} />
        <Trophy x={332} y={70} size={34} weight="fill" color={SIGNAL} />
        <UsersThree x={306} y={110} size={36} weight="fill" color={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   6 · Elements of Gamification — Five selectable columns:
   1. Points, 2. Badges, 3. Leaderboards, 4. Challenges and Quests,
   5. Levels and Progression
   ========================================================================== */

const ELEMENT_STEPS = [
  { idx: 0, name: "1. Points", lines: ["1. Points"] },
  { idx: 1, name: "2. Badges", lines: ["2. Badges"] },
  { idx: 2, name: "3. Leaderboards", lines: ["3. Leader-", "boards"] },
  { idx: 3, name: "4. Challenges and Quests", lines: ["4. Challenges", "& quests"] },
  { idx: 4, name: "5. Levels and Progression", lines: ["5. Levels &", "progression"] },
];

function ElementGlyph({ i, x, y, tone }: { i: number; x: number; y: number; tone: string }) {
  switch (i) {
    case 0:
      return (
        <g>
          <Star x={x + 12} y={y + 16} size={24} weight="fill" color={tone} />
          <text x={x + 56} y={y + 34} textAnchor="middle" {...HEAD} fontSize={14} fill={tone}>
            +100
          </text>
        </g>
      );
    case 1:
      return <Medal x={x + 24} y={y + 10} size={36} weight="fill" color={tone} />;
    case 2:
      return (
        <g>
          <rect x={x + 16} y={y + 28} width={14} height={20} fill={tone} />
          <rect x={x + 35} y={y + 14} width={14} height={34} fill={tone} />
          <rect x={x + 54} y={y + 34} width={14} height={14} fill={tone} />
        </g>
      );
    case 3:
      return (
        <g>
          <Sword x={x + 12} y={y + 13} size={28} weight="fill" color={tone} />
          <FlagBanner x={x + 44} y={y + 13} size={28} weight="fill" color={tone} />
        </g>
      );
    default:
      return (
        <g>
          <rect x={x + 14} y={y + 34} width={14} height={14} fill={tone} />
          <rect x={x + 35} y={y + 24} width={14} height={24} fill={tone} />
          <rect x={x + 56} y={y + 12} width={14} height={36} fill={tone} />
        </g>
      );
  }
}

export function GamificationElementsInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const x0 = 40;
  const pitch = 144;
  const w = 136;
  const bottom = 236;
  const tops = [184, 162, 140, 118, 96];
  const sx = (i: number) => x0 + i * pitch + (w - 84) / 2;
  const sy = (i: number) => tops[i] - 6 - 70;
  const activeName = ELEMENT_STEPS[active]?.name ?? "1. Points";

  return (
    <Plate
      w={800}
      h={248}
      title={`Five rising gamification steps, each with a small framed screen above it: 1. Points (+100 score), 2. Badges (medal), 3. Leaderboards (podium), 4. Challenges & quests (sword and banner), and 5. Levels & progression (ascending bars); ${activeName} is highlighted in red`}
    >
      {ELEMENT_STEPS.map((step, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const left = x0 + i * pitch;
        const t = tops[i];
        const screenX = sx(i);
        const screenY = sy(i);
        return (
          <g
            key={step.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={step.name}
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
            <rect x={left} y={screenY} width={w} height={bottom - screenY} fill="transparent" />
            <MiniScreen x={screenX} y={screenY}>
              <ElementGlyph i={i} x={screenX} y={screenY} tone={tone} />
            </MiniScreen>
            <rect x={left} y={t} width={w} height={bottom - t} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={j}
                x={left + w / 2}
                y={t + 26 + j * 21}
                textAnchor="middle"
                {...BODY}
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

export function GamificationElementsTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={410}
      title={`Five stacked gamification steps with small screens: 1. Points, 2. Badges, 3. Leaderboards, 4. Challenges and Quests, and 5. Levels and Progression; ${ELEMENT_STEPS[active]?.name ?? "1. Points"} is highlighted in red`}
    >
      {ELEMENT_STEPS.map((step, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const ry = 14 + i * 78;
        const bw = 156 + i * 28;
        return (
          <g
            key={step.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={step.name}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={12} y={ry} width={376} height={72} fill="transparent" />
            <MiniScreen x={16} y={ry}>
              <ElementGlyph i={i} x={16} y={ry} tone={tone} />
            </MiniScreen>
            <rect x={114} y={ry + 6} width={bw} height={54} fill={tone} />
            {step.lines.map((line, j) => (
              <text
                key={j}
                x={114 + bw / 2}
                y={r2(ry + 33 + 5 + (j - (step.lines.length - 1) / 2) * 19)}
                textAnchor="middle"
                {...BODY}
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

/* ==========================================================================
   7 · Progress Bar & MBA Progression — Interactive comparison of an
   unsegmented progress bar vs. a 5-milestone progress bar across a two-year
   (24-month) timeline
   ========================================================================== */

export function ProgressBarComparisonInteractive() {
  const [step, setStep] = useState(2);
  const xs = [190, 295, 400, 505, 610];
  const growingRadii = [11, 14, 17, 20.5, 24];
  const uniformRadius = 16;
  const activeX = xs[step - 1] ?? xs[1];

  return (
    <Plate
      w={800}
      h={262}
      title={`A framed screen comparing two 5-step progress bars at Step ${step} of 5: the top bar has milestone circles that grow larger from step 1 to step 5, while the bottom bar has five milestone circles of identical size; a draggable slider below steps from 1 to 5`}
    >
      <Monitor x={110} y={14} w={580} h={168}>
        {/* Top progress bar: growing milestone circles (1 -> 5) */}
        <rect x={190} y={54} width={420} height={8} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
        <rect x={190} y={54} width={r2(activeX - 190)} height={8} fill={SIGNAL} />
        {xs.map((cx, i) => {
          const r = growingRadii[i];
          const done = i < step;
          const s = r2(r * 0.42);
          return (
            <g key={`top-${i}`} onClick={() => setStep(i + 1)} style={{ cursor: "pointer" }}>
              <circle
                cx={cx}
                cy={58}
                r={r}
                fill={done ? SIGNAL : CREAM}
                stroke={done ? SIGNAL : INK}
                strokeWidth={3}
              />
              {done ? (
                <path
                  d={`M ${r2(cx - s)} 58 L ${r2(cx - s * 0.2)} ${r2(58 + s * 0.8)} L ${r2(cx + s * 1.1)} ${r2(58 - s * 0.9)}`}
                  fill="none"
                  stroke={CREAM}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <text x={cx} y={r2(58 + r * 0.34)} textAnchor="middle" {...HEAD} fontSize={r2(11 + i * 1.4)} fill={INK}>
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}

        <path d="M 140 98 H 660" stroke={INK} strokeWidth={1.5} strokeDasharray="5 5" />

        {/* Bottom progress bar: uniform milestone circles (1 -> 5) */}
        <rect x={190} y={134} width={420} height={8} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
        <rect x={190} y={134} width={r2(activeX - 190)} height={8} fill={COUNTER} />
        {xs.map((cx, i) => {
          const done = i < step;
          return (
            <g key={`bot-${i}`} onClick={() => setStep(i + 1)} style={{ cursor: "pointer" }}>
              <circle
                cx={cx}
                cy={138}
                r={uniformRadius}
                fill={done ? COUNTER : CREAM}
                stroke={done ? COUNTER : INK}
                strokeWidth={3}
              />
              {done ? (
                <path
                  d={`M ${cx - 6} 138 L ${cx - 1} 143 L ${cx + 7} 133`}
                  fill="none"
                  stroke={CREAM}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <text x={cx} y={143.5} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}
      </Monitor>

      {/* Interactive step scrubber below the Monitor stand */}
      <text x={140} y={240} {...HEAD} fontSize={15.5} fill={INK}>
        Milestone
      </text>
      <path d="M 240 235 H 560" stroke={INK} strokeWidth={4} />
      <Knob
        x={240}
        y={235}
        len={320}
        value={step}
        min={1}
        max={5}
        step={1}
        tone={SIGNAL}
        label="Completed milestone step from 1 to 5"
        onChange={setStep}
      />
      <text x={660} y={240} textAnchor="end" {...HEAD} fontSize={15.5} fill={SIGNAL}>
        Step {step} of 5
      </text>
    </Plate>
  );
}

/* ==========================================================================
   8 · Challenges of Gamification — Two selectable panels + interactive
   extrinsic reward slider:
   1. Overjustification Effect (extrinsic rewards crowd out intrinsic enjoyment)
   2. Excessive Freedom (open-world game with no objectives -> boredom)
   ========================================================================== */

export function OverjustificationInteractive() {
  const [extrinsic, setExtrinsic] = useState(75);
  const intrinsic = Math.round(Math.max(15, 95 - extrinsic * 0.75));
  const extW = r2((280 * extrinsic) / 100);
  const intW = r2((280 * intrinsic) / 100);
  const nCoins = Math.max(1, Math.round(extrinsic / 25));

  return (
    <Plate
      w={400}
      h={194}
      title={`Interactive overjustification effect plate: as extrinsic rewards reliance is dragged to ${extrinsic}%, intrinsic motivation drops to ${intrinsic}%`}
    >
      <g transform="translate(0 -30)">
        {/* Extrinsic Rewards row (max 4 coins -> top at y=51) */}
        <Coins x={46} y={104} n={nCoins} />
        <text x={88} y={58} {...HEAD} fontSize={14.5} fill={SIGNAL}>
          Extrinsic rewards ({extrinsic}%)
        </text>
        <rect x={88} y={68} width={280} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
        <rect x={88} y={68} width={extW} height={20} fill={SIGNAL} />

        {/* Intrinsic Motivation row */}
        <Heart x={28} y={120} size={36} weight="fill" color={COUNTER} />
        <text x={88} y={128} {...HEAD} fontSize={14.5} fill={COUNTER}>
          Intrinsic motivation ({intrinsic}%)
        </text>
        <rect x={88} y={138} width={280} height={20} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
        <rect x={88} y={138} width={intW} height={20} fill={COUNTER} />

        {/* Slider for Extrinsic Reliance */}
        <text x={24} y={201} {...BODY} fontSize={14} fill={INK}>
          Reward reliance
        </text>
        <path d="M 156 196 H 366" stroke={INK} strokeWidth={4} />
        <Knob
          x={156}
          y={196}
          len={210}
          value={extrinsic}
          min={0}
          max={100}
          step={5}
          tone={SIGNAL}
          label="Extrinsic reward reliance percentage"
          onChange={setExtrinsic}
        />
      </g>
    </Plate>
  );
}

export function ExcessiveFreedomPlate() {
  return (
    <Plate
      w={400}
      h={224}
      title="A player facing a framed open-world screen where a central compass sends four arrows outward into empty space with no destination or objective"
    >
      <Person x={64} y={92} k={1.12} variant={9} />
      <Monitor x={148} y={24} w={228} h={150}>
        <Compass x={240} y={77} size={44} weight="fill" color={SIGNAL} />
        {/* Four diverging paths into empty space with no goal target */}
        <Pointer x1={232} y1={72} x2={182} y2={48} w={3.5} head={11} color={INK} />
        <Pointer x1={292} y1={72} x2={342} y2={48} w={3.5} head={11} color={INK} />
        <Pointer x1={232} y1={126} x2={182} y2={150} w={3.5} head={11} color={INK} />
        <Pointer x1={292} y1={126} x2={342} y2={150} w={3.5} head={11} color={INK} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   9 · The Case of Microsoft Flight Simulator — Five selectable simulator
   capabilities:
   1. Realistic Environments, 2. Virtual Cockpit, 3. VR Support,
   4. Weather & Traffic, 5. Multiplayer
   ========================================================================== */

const FLIGHT_NODES = [
  { name: "1. Realistic Graphics and Simulated Environments", lines: ["1. Simulated", "environments"] },
  { name: "2. Virtual Cockpit Experiences", lines: ["2. Virtual", "cockpit"] },
  { name: "3. VR Support", lines: ["3. VR", "support"] },
  { name: "4. Dynamic Weather and Air Traffic", lines: ["4. Weather &", "air traffic"] },
  { name: "5. Community and Multiplayer Features", lines: ["5. Community &", "multiplayer"] },
];

function FlightGlyph({ i, wx, wy }: { i: number; wx: number; wy: number }) {
  switch (i) {
    case 0:
      return (
        <g>
          <AirplaneTilt x={wx + 19} y={wy + 6} size={26} weight="fill" color={INK} />
          <path d={`M ${wx + 8} ${wy + 52} L ${wx + 22} ${wy + 38} L ${wx + 34} ${wy + 46} L ${wx + 46} ${wy + 34} L ${wx + 56} ${wy + 52} Z`} fill={INK} />
        </g>
      );
    case 1:
      return <Compass x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
    case 2:
      return <Goggles x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
    case 3:
      return (
        <g>
          <CloudRain x={wx + 5} y={wy + 14} size={26} weight="fill" color={INK} />
          <AirplaneTilt x={wx + 35} y={wy + 16} size={24} weight="fill" color={INK} />
        </g>
      );
    default:
      return <UsersThree x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
  }
}

export function FlightSimCaseInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cardW = 236;
  const cardH = 76;
  const leftYs = [16, 104, 192];
  const rightYs = [60, 148];
  const leftTargets = [96, 128, 160];
  const rightTargets = [112, 148];
  const activeName = FLIGHT_NODES[active]?.name ?? FLIGHT_NODES[0].name;

  return (
    <Plate
      w={800}
      h={284}
      title={`Five capabilities of Microsoft Flight Simulator feeding into a central framed flight-simulator screen showing an aircraft flying above mountains: 1. Simulated environments, 2. Virtual cockpit, 3. VR support, 4. Weather & air traffic, and 5. Community & multiplayer; ${activeName} is highlighted in red`}
    >
      {/* Central Flight Simulator screen */}
      <Monitor x={304} y={56} w={192} h={144}>
        <AirplaneTilt x={370} y={72} size={60} weight="fill" color={INK} />
        <path
          d="M 322 182 L 352 152 L 380 170 L 418 144 L 448 166 L 478 150 V 182 Z"
          fill={INK}
        />
      </Monitor>

      {FLIGHT_NODES.map((node, i) => {
        const isLeft = i < 3;
        const x = isLeft ? 16 : 548;
        const y = isLeft ? leftYs[i] : rightYs[i - 3];
        const cy = y + cardH / 2;
        const targetY = isLeft ? leftTargets[i] : rightTargets[i - 3];
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const wx = x + 8;
        const wy = y + 8;
        const tx = x + 154;

        return (
          <g
            key={node.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={node.name}
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
            <Pointer
              x1={isLeft ? x + cardW + 4 : x - 4}
              y1={cy}
              x2={isLeft ? 296 : 504}
              y2={targetY}
              w={isLit ? 4.5 : 3}
              color={tone}
              head={12}
            />
            <rect x={x} y={y} width={cardW} height={cardH} fill={tone} />
            <rect x={wx} y={wy} width={64} height={60} fill={CREAM} />
            <FlightGlyph i={i} wx={wx} wy={wy} />
            {node.lines.map((line, j) => (
              <text
                key={j}
                x={tx}
                y={r2(cy + 5.5 + (j - (node.lines.length - 1) / 2) * 21)}
                textAnchor="middle"
                {...BODY}
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

export function FlightSimCaseTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cardH = 72;
  return (
    <Plate
      w={400}
      h={418}
      title={`Five selectable Microsoft Flight Simulator features; ${FLIGHT_NODES[active]?.name ?? FLIGHT_NODES[0].name} is highlighted in red`}
    >
      {FLIGHT_NODES.map((node, i) => {
        const y = 12 + i * 80;
        const cy = y + cardH / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const wx = 24;
        const wy = y + 6;
        return (
          <g
            key={node.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={node.name}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={16} y={y} width={368} height={cardH} fill={tone} />
            <rect x={wx} y={wy} width={64} height={60} fill={CREAM} />
            <FlightGlyph i={i} wx={wx} wy={wy} />
            <text x={236} y={cy + 6} textAnchor="middle" {...BODY} fontSize={16} fill={CREAM}>
              {node.lines.join(" ")}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   10 · Guitar Hero — Interactive learning-curve plate (w = 400) comparing
   perceived progression in the first few months of a traditional musical
   instrument vs. Guitar Hero
   ========================================================================== */

export function GuitarHeroCurveInteractive() {
  const [month, setMonth] = useState(3);

  const ghAt = (m: number) => Math.round(45 + 50 * (1 - Math.exp(-m / 3.5)));
  const instAt = (m: number) => Math.round(62 / (1 + Math.exp(-(m - 7.5) * 0.85)));

  const xOf = (m: number) => r2(62 + ((m - 1) / 11) * 190);
  const yOf = (val: number) => r2(184 - (val / 100) * 124);

  const ghPath = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return `${i === 0 ? "M" : "L"} ${xOf(m)} ${yOf(ghAt(m))}`;
  }).join(" ");

  const instPath = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return `${i === 0 ? "M" : "L"} ${xOf(m)} ${yOf(instAt(m))}`;
  }).join(" ");

  const curX = xOf(month);
  const ghVal = ghAt(month);
  const instVal = instAt(month);
  const ghY = yOf(ghVal);
  const instY = yOf(instVal);
  const ghEndY = yOf(ghAt(12));
  const instEndY = yOf(instAt(12));

  return (
    <Plate
      w={400}
      h={304}
      title={`Interactive learning-curve chart comparing perceived progression over 12 months between Guitar Hero in red (high immediate progression, ${ghVal}% at Month ${month}) and a traditional instrument in blue (flat early curve, ${instVal}% at Month ${month}), with a draggable month slider`}
    >
      <text x={24} y={28} {...HEAD} fontSize={16} fill={INK}>
        Perceived progression
      </text>

      {/* Axes */}
      <path d="M 48 52 V 184 H 256" fill="none" stroke={INK} strokeWidth={3} />
      <text x={40} y={64} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        High
      </text>
      <text x={40} y={182} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        Low
      </text>

      {/* Curves */}
      <path d={instPath} fill="none" stroke={COUNTER} strokeWidth={4} />
      <path d={ghPath} fill="none" stroke={SIGNAL} strokeWidth={4} />

      {/* Direct in-place labels aligned at the right end of each curve (Rule 4 & Rule 15) */}
      <text x={266} y={r2(ghEndY + 5)} {...HEAD} fontSize={14} fill={SIGNAL}>
        Guitar Hero
      </text>
      <text x={266} y={r2(instEndY + 5)} {...HEAD} fontSize={14} fill={COUNTER}>
        Real instrument
      </text>

      {/* Active month cursor & points */}
      <path d={`M ${curX} 54 V 184`} stroke={INK} strokeWidth={2} strokeDasharray="4 4" />
      <circle cx={curX} cy={ghY} r={6.5} fill={SIGNAL} stroke={CREAM} strokeWidth={2} />
      <circle cx={curX} cy={instY} r={6.5} fill={COUNTER} stroke={CREAM} strokeWidth={2} />

      {/* Readout band */}
      <rect x={24} y={200} width={352} height={42} fill={CREAM} stroke={INK} strokeWidth={2.5} />
      <text x={200} y={226} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Month {month}: Guitar Hero {ghVal}% · Instrument {instVal}%
      </text>

      {/* Draggable month knob */}
      <text x={24} y={280} {...HEAD} fontSize={14.5} fill={INK}>
        Month {month}
      </text>
      <path d="M 118 275 H 358" stroke={INK} strokeWidth={4} />
      <Knob
        x={118}
        y={275}
        len={240}
        value={month}
        min={1}
        max={12}
        step={1}
        tone={SIGNAL}
        label="Practice month from 1 to 12"
        onChange={setMonth}
      />
    </Plate>
  );
}

/* ==========================================================================
   11 · Zombies, Run! — Four selectable stages of the audio-gamified running
   experience:
   1. Walk or Run, 2. Mission & Music, 3. Collect Supplies, 4. Zombie Chases!
   ========================================================================== */

export function ZombiesRunPlate() {
  const stages = [
    { cx: 106, x0: 24, label: "1. Walk or run", tone: INK },
    { cx: 302, x0: 220, label: "2. Hear your mission", tone: INK },
    { cx: 498, x0: 416, label: "3. Collect supplies", tone: INK },
    { cx: 694, x0: 612, label: "4. Zombie chases!", tone: SIGNAL },
  ];

  return (
    <Plate
      w={800}
      h={206}
      title="Four connected stages of the Zombies, Run! gamified loop: 1. Walk or run (a runner in profile), 2. Hear your mission (headphones and music on a framed screen), 3. Collect supplies (a supply package and base building on a framed screen), and 4. Zombie chases! highlighted in red (alert lightning and sprint flag on a framed screen)"
    >
      {/* 1. Walk or run in the real world */}
      <Person x={106} y={36} k={0.94} variant={7} />
      <Pointer x1={156} y1={88} x2={248} y2={88} w={4} head={12} color={INK} />

      {/* 2. Hear your mission and music */}
      <MiniScreen x={260} y={60}>
        <Headphones x={272} y={73} size={28} weight="fill" color={INK} />
        <MusicNotes x={304} y={73} size={28} weight="fill" color={INK} />
      </MiniScreen>
      <Pointer x1={354} y1={88} x2={444} y2={88} w={4} head={12} color={INK} />

      {/* 3. Collect supplies to grow your base */}
      <MiniScreen x={456} y={60}>
        <Package x={480} y={70} size={36} weight="fill" color={INK} />
      </MiniScreen>
      <Pointer x1={550} y1={88} x2={640} y2={88} w={4} head={12} color={SIGNAL} />

      {/* 4. Zombie chases! */}
      <MiniScreen x={652} y={60}>
        <Lightning x={664} y={72} size={30} weight="fill" color={SIGNAL} />
        <FlagBanner x={698} y={72} size={30} weight="fill" color={SIGNAL} />
      </MiniScreen>

      {/* Aligned stage blocks below */}
      {stages.map((s) => (
        <g key={s.label}>
          <rect x={s.x0} y={148} width={164} height={40} fill={s.tone} />
          <text x={s.cx} y={173} textAnchor="middle" {...BODY} fontSize={15} fill={CREAM}>
            {s.label}
          </text>
        </g>
      ))}
    </Plate>
  );
}

export function ZombiesRunTall() {
  const rows = [
    { y0: 14, label: "1. Walk or run", tone: INK },
    { y0: 82, label: "2. Hear your mission", tone: INK },
    { y0: 150, label: "3. Collect supplies", tone: INK },
    { y0: 218, label: "4. Zombie chases!", tone: SIGNAL },
  ];
  return (
    <Plate
      w={400}
      h={286}
      title="Four stacked stages of Zombies, Run!: 1. Walk or run, 2. Hear your mission, 3. Collect supplies, and 4. Zombie chases! in red"
    >
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect x={24} y={r.y0} width={352} height={48} fill={r.tone} />
          <text x={200} y={r.y0 + 30} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
            {r.label}
          </text>
          {i < rows.length - 1 && (
            <Pointer x1={200} y1={r.y0 + 50} x2={200} y2={r.y0 + 66} w={3.5} head={9} color={INK} />
          )}
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   12 · Ethical Concerns — Three selectable panels showing the military
   adoption of Xbox/PlayStation controllers:
   1. Why Controllers?, 2. Air Force RADBO, 3. iRobot PackBot
   ========================================================================== */

export function MilitaryControllerPlate() {
  return (
    <Plate
      w={800}
      h={194}
      title="On the left, a young person uses a game controller with a framed gaming screen; a red arrow points to the right, where the same person uses the same red game controller to operate two framed military screens: Air Force RADBO (crosshair) and iRobot PackBot (robot)"
    >
      {/* Left: Gaming generation (console fluency) */}
      <Person x={60} y={40} k={0.96} hair="crop" />
      <GameController x={108} y={72} size={44} weight="fill" color={INK} />
      <Pointer x1={158} y1={94} x2={184} y2={94} w={3.5} head={10} color={INK} />
      <MiniScreen x={192} y={66}>
        <Trophy x={216} y={76} size={36} weight="fill" color={INK} />
      </MiniScreen>
      <text x={168} y={168} textAnchor="middle" {...HEAD} fontSize={16} fill={INK}>
        Gaming experience (Halo)
      </text>

      {/* Transition arrow */}
      <Arrow x1={296} x2={352} y={94} color={SIGNAL} />

      {/* Right: Military systems controlled with the same Xbox/PlayStation controller */}
      <Person x={392} y={40} k={0.96} hair="crop" />
      <GameController x={440} y={72} size={44} weight="fill" color={SIGNAL} />
      <Pointer x1={490} y1={94} x2={522} y2={94} w={3.5} head={10} color={SIGNAL} />

      {/* RADBO screen */}
      <MiniScreen x={530} y={66}>
        <Crosshair x={554} y={76} size={36} weight="fill" color={SIGNAL} />
      </MiniScreen>
      <text x={572} y={168} textAnchor="middle" {...HEAD} fontSize={15.5} fill={SIGNAL}>
        Air Force RADBO
      </text>

      {/* PackBot screen */}
      <MiniScreen x={680} y={66}>
        <Robot x={704} y={76} size={36} weight="fill" color={SIGNAL} />
      </MiniScreen>
      <text x={722} y={168} textAnchor="middle" {...HEAD} fontSize={15.5} fill={SIGNAL}>
        iRobot PackBot
      </text>
    </Plate>
  );
}

/* ==========================================================================
   13 · Can Immersive Technology and Gamification Help My Business? — Four
   selectable strategic questions:
   1. Intrinsic Gap?, 2. Use a Story, 3. Balance Both, 4. Do No Harm
   ========================================================================== */

const BIZ_CARDS = [
  { idx: 0, name: "1. Do my users struggle with intrinsic motivation?", lines: ["1. Intrinsic", "motivation?"] },
  { idx: 1, name: "2. How can you induce intrinsic motivation using a story?", lines: ["2. Induce", "with a story"] },
  { idx: 2, name: "3. How to properly balance extrinsic vs. intrinsic motivation?", lines: ["3. Balance", "both"] },
  { idx: 3, name: "4. Is replacing the actual intrinsic motivation with the fabricated one going to hurt the person?", lines: ["4. Protect", "the person"] },
];

function BizGlyph({ i, wx, wy }: { i: number; wx: number; wy: number }) {
  switch (i) {
    case 0:
      return (
        <g>
          <Person x={wx + 17} y={wy + 10} k={0.44} variant={6} />
          <Heart x={wx + 37} y={wy + 14} size={21} weight="fill" color={INK} />
        </g>
      );
    case 1:
      return <BookOpen x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
    case 2:
      return <Scales x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
    default:
      return <ShieldWarning x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
  }
}

export function BusinessQuestionsPlate({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cardW = 180;
  const cardH = 104;
  const activeName = BIZ_CARDS[active]?.name ?? BIZ_CARDS[0].name;

  return (
    <Plate
      w={400}
      h={252}
      title={`Four selectable business evaluation cards for gamification: 1. Intrinsic motivation?, 2. Induce with a story, 3. Balance both, and 4. Protect the person; ${activeName} is highlighted in red`}
    >
      {BIZ_CARDS.map((card, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 14 : 206;
        const y = 14 + row * 120;
        const cy = y + cardH / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const wx = x + 10;
        const wy = y + 22;
        const tx = x + 128;

        return (
          <g
            key={card.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={card.name}
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
            <rect x={x} y={y} width={cardW} height={cardH} fill={tone} />
            <rect x={wx} y={wy} width={64} height={60} fill={CREAM} />
            <BizGlyph i={i} wx={wx} wy={wy} />
            {card.lines.map((line, j) => (
              <text
                key={j}
                x={tx}
                y={r2(cy + 5.5 + (j - (card.lines.length - 1) / 2) * 20)}
                textAnchor="middle"
                {...BODY}
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










