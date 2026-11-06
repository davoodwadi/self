"use client";

/* ==========================================================================
   Week 9, Industry 4.0 (Flat Silhouette, Interactive-First)
   --------------------------------------------------------------------------
   Custom industrial silhouette vocabulary crafted specifically for Week 9
   (avoiding overused Shop/Doc/Coins/Conversation tropes from earlier weeks):
     - Steam Flywheel & Beam Engine    (First Industrial Revolution)
     - Lattice Pylon, Bessemer Vessel,
       Conveyor & Filament Bulb        (Second Industrial Revolution)
     - Transistor, Silicon Wafer Die,
       ARPANET Mesh & Robotic Arm      (Third Industrial Revolution)
     - Cyber-Physical Digital Twin,
       Bioprinter & Quantum Chandelier (Fourth Industrial Revolution / 4.0)
     - Monitor / MiniScreen            (all digital systems, per course style)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React, { useState } from "react";
import {
  WHITE,
  INK,
  SIGNAL,
  COUNTER_FILL,
  r2,
  Plate,
  Monitor,
  MiniScreen,
  Pointer,
} from "../_visuals/kit";

const HEAD = { fontFamily: "var(--font-sans)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-sans)", fontWeight: 600 } as const;

/* -- Reusable custom industrial silhouette primitives --------------------- */

/** Spoked industrial flywheel + piston rod silhouette (origin at wheel center cx, cy). */
function SteamFlywheelGlyph({
  cx,
  cy,
  r = 28,
  tone = INK,
}: {
  cx: number;
  cy: number;
  r?: number;
  tone?: string;
}) {
  const ir = r2(r * 0.68);
  const hr = r2(r * 0.24);
  const spokes = [0, 60, 120].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x1 = r2(cx - Math.cos(rad) * ir);
    const y1 = r2(cy - Math.sin(rad) * ir);
    const x2 = r2(cx + Math.cos(rad) * ir);
    const y2 = r2(cy + Math.sin(rad) * ir);
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={tone} strokeWidth={r2(r * 0.24)} />
      <path d={spokes.join(" ")} stroke={tone} strokeWidth={r2(r * 0.13)} />
      <circle cx={cx} cy={cy} r={hr} fill={tone} />
    </g>
  );
}

/** Articulated multi-axis industrial robotic arm silhouette (base center at bx, by). */
function RobotArmGlyph({
  bx,
  by,
  k = 1,
  tone = INK,
}: {
  bx: number;
  by: number;
  k?: number;
  tone?: string;
}) {
  return (
    <g transform={`translate(${bx} ${by}) scale(${k})`}>
      {/* Pedestal base */}
      <path d="M -26 0 H 26 V -10 H 16 L 12 -24 H -12 L -16 -10 H -26 Z" fill={tone} />
      {/* Lower boom */}
      <path d="M -8 -24 L -20 -64 L -8 -68 L 6 -24 Z" fill={tone} />
      <circle cx={-14} cy={-64} r={8} fill={tone} stroke={WHITE} strokeWidth={2.5} />
      {/* Upper forearm */}
      <path d="M -14 -70 L 22 -84 L 25 -74 L -10 -60 Z" fill={tone} />
      <circle cx={22} cy={-79} r={6.5} fill={tone} stroke={WHITE} strokeWidth={2} />
      {/* Two-prong gripper claw */}
      <path
        d="M 26 -83 L 40 -91 L 44 -83 L 34 -79 L 44 -75 L 40 -67 L 26 -75 Z"
        fill={tone}
      />
    </g>
  );
}

/** Silicon microprocessor package silhouette with pin leads (center at cx, cy). */
function SiliconChipGlyph({
  cx,
  cy,
  s = 36,
  tone = INK,
}: {
  cx: number;
  cy: number;
  s?: number;
  tone?: string;
}) {
  const hs = r2(s / 2);
  const core = r2(s * 0.54);
  const hc = r2(core / 2);
  const pins = [-0.3, 0, 0.3].map((f) => r2(f * s));
  return (
    <g>
      {pins.map((off) => (
        <g key={off}>
          <rect x={r2(cx + off - 2)} y={r2(cy - hs - 6)} width={4} height={6} fill={tone} />
          <rect x={r2(cx + off - 2)} y={r2(cy + hs)} width={4} height={6} fill={tone} />
          <rect x={r2(cx - hs - 6)} y={r2(cy + off - 2)} width={6} height={4} fill={tone} />
          <rect x={r2(cx + hs)} y={r2(cy + off - 2)} width={6} height={4} fill={tone} />
        </g>
      ))}
      <rect x={r2(cx - hs)} y={r2(cy - hs)} width={s} height={s} fill={tone} />
      <rect
        x={r2(cx - hc)}
        y={r2(cy - hc)}
        width={core}
        height={core}
        fill="none"
        stroke={WHITE}
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={3.5} fill={WHITE} />
    </g>
  );
}

/* ==========================================================================
   1. Hero: Interactive Four-Revolution Chrono-Transmission
   Click any of the four industrial epochs (1st Steam, 2nd Electricity,
   3rd Digital Computing, 4th Cyber-Physical Systems) to engage its power
   train and inspect the shift from muscle & steam to smart autonomy.
   ========================================================================== */

const HERO_EPOCHS = [
  {
    num: "1st",
    era: "1760 to 1840",
    title: "Steam & Mechanization",
    sub: "Water, coal & iron factories",
  },
  {
    num: "2nd",
    era: "1870 to 1914",
    title: "Electricity & Mass Line",
    sub: "Steel, chemicals & assembly",
  },
  {
    num: "3rd",
    era: "1960s-Present",
    title: "Digital & Internet",
    sub: "Transistors, PCs & automation",
  },
  {
    num: "4.0",
    era: "Industry 4.0",
    title: "Cyber-Physical Systems",
    sub: "AI, IoT, robotics & bio-tech",
  },
];

export function HeroFourRevolutionsEngine() {
  const [active, setActive] = useState(3);
  const current = HERO_EPOCHS[active] ?? HERO_EPOCHS[3];

  const cols = [
    { x: 16, w: 112, cx: 72, stepY: 234, stepH: 82 },
    { x: 140, w: 112, cx: 196, stepY: 208, stepH: 108 },
    { x: 264, w: 112, cx: 320, stepY: 182, stepH: 134 },
    { x: 388, w: 116, cx: 446, stepY: 156, stepH: 160 },
  ];

  return (
    <Plate
      w={520}
      h={330}
      title={`Interactive four-epoch industrial transmission rising from left to right: 1st (Steam cylinder, beam, and spoked flywheel), 2nd (High-voltage electric lattice pylon and spark), 3rd (Framed screen holding a silicon microprocessor chip), and 4.0 (Framed cyber-physical screen holding an autonomous robotic arm). Currently engaged: ${current.num} - ${current.title}`}
    >
      {/* Top readout banner showing the engaged Industrial Revolution */}
      <rect x={16} y={12} width={488} height={46} fill={INK} fillOpacity={0.04} stroke={INK} strokeWidth={1.5} />
      <rect x={22} y={18} width={66} height={34} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={55} y={41} textAnchor="middle" {...HEAD} fontSize={19} fill={INK}>
        {current.num}
      </text>
      <text x={102} y={33} {...HEAD} fontSize={15.5} fill={INK}>
        {current.title}
      </text>
      <text x={102} y={50} {...BODY} fontSize={12.5} fill={INK}>
        {current.era} | {current.sub}
      </text>

      {cols.map((c, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const ep = HERO_EPOCHS[i];

        return (
          <g
            key={ep.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`${ep.num}: ${ep.title}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={c.x} y={66} width={c.w} height={252} fill="transparent" />

            {/* 1st Revolution: Steam cylinder + overhead rocking beam + spoked flywheel */}
            {i === 0 && (
              <g>
                <rect x={28} y={168} width={24} height={54} fill={tone} />
                <rect x={37} y={146} width={6} height={24} fill={tone} />
                <path d="M 34 146 L 90 162" stroke={tone} strokeWidth={6} strokeLinecap="round" />
                <path d="M 88 162 V 192" stroke={tone} strokeWidth={4} />
                <SteamFlywheelGlyph cx={88} cy={194} r={26} tone={tone} />
              </g>
            )}

            {/* 2nd Revolution: Lattice electric pylon + high-voltage lightning spark */}
            {i === 1 && (
              <g>
                <path
                  d="M 168 196 L 181 110 H 193 L 206 196 H 197 L 187 136 L 177 196 Z"
                  fill={tone}
                />
                <rect x={162} y={124} width={50} height={6} fill={tone} />
                <rect x={167} y={146} width={40} height={5} fill={tone} />
                <path d="M 226 112 L 212 136 H 224 L 214 160 L 238 132 H 225 Z" fill={tone} />
              </g>
            )}

            {/* 3rd Revolution: Framed MiniScreen holding a silicon microprocessor */}
            {i === 2 && (
              <g>
                <MiniScreen x={278} y={100}>
                  <SiliconChipGlyph cx={320} cy={128} s={26} tone={tone} />
                </MiniScreen>
              </g>
            )}

            {/* 4th Revolution: Framed Cyber-Physical Screen holding autonomous robot + IoT nodes */}
            {i === 3 && (
              <g>
                <MiniScreen x={404} y={74}>
                  <RobotArmGlyph bx={436} by={120} k={0.4} tone={tone} />
                  <circle cx={468} cy={92} r={4.5} fill={tone} />
                  <circle cx={468} cy={110} r={4.5} fill={tone} />
                  <path d="M 454 92 H 468 V 110" fill="none" stroke={tone} strokeWidth={2} />
                </MiniScreen>
              </g>
            )}

            {/* Stepped industrial plinth */}
            <rect x={c.x} y={c.stepY} width={c.w} height={c.stepH} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />

            <text x={c.cx} y={c.stepY + 34} textAnchor="middle" {...HEAD} fontSize={23} fill={INK}>
              {ep.num}
            </text>
            <text x={c.cx} y={c.stepY + 58} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              {ep.era}
            </text>
            {isLit && <rect x={c.x + 16} y={c.stepY + 68} width={c.w - 32} height={4} fill={WHITE} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   2. Question: 1759 Canada: Interactive Pre-Industrial River-Valley
   Livelihood Selector & Muscle-Power Workday Instrument
   ========================================================================== */


/* ==========================================================================
   3. The First Industrial Revolution: Connected 6-Station Industrial
   Valley & Steam Mill Cross-Section (Interactive)
   ========================================================================== */

const FIRST_REV_STATIONS = [
  { num: "1", short: "1. Mechanization", full: "1. Mechanization of Production" },
  { num: "2", short: "2. Steam Power", full: "2. Steam Power" },
  { num: "3", short: "3. Factory System", full: "3. Factory System" },
  { num: "4", short: "4. Textile Boom", full: "4. Textile Industry Boom" },
  { num: "5", short: "5. Iron & Coal", full: "5. Iron and Coal Production" },
  { num: "6", short: "6. Rail & Canals", full: "6. Railroads and Canals" },
];

/** Toothed industrial gear silhouette (center cx, cy, outer radius r). */
function GearWheelGlyph({
  cx,
  cy,
  r = 24,
  tone = INK,
}: {
  cx: number;
  cy: number;
  r?: number;
  tone?: string;
}) {
  const baseR = r2(r * 0.78);
  const holeR = r2(r * 0.3);
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
    <rect
      key={deg}
      x={r2(cx - r * 0.14)}
      y={r2(cy - r)}
      width={r2(r * 0.28)}
      height={r2(r * 0.3)}
      fill={tone}
      transform={`rotate(${deg} ${cx} ${cy})`}
    />
  ));
  return (
    <g>
      {teeth}
      <path
        d={`M ${cx} ${r2(cy - baseR)} A ${baseR} ${baseR} 0 1 0 ${r2(cx + 0.01)} ${r2(cy - baseR)} Z M ${cx} ${r2(cy - holeR)} A ${holeR} ${holeR} 0 1 1 ${r2(cx - 0.01)} ${r2(cy - holeR)} Z`}
        fill={tone}
        fillRule="evenodd"
      />
    </g>
  );
}

export function SteamMillCrossSectionInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = FIRST_REV_STATIONS[active] ?? FIRST_REV_STATIONS[0];
  const xs = [16, 144, 272, 400, 528, 656];
  const w = 122;

  return (
    <Plate
      w={800}
      h={234}
      title={`Interactive 18th: 19th century industrial landscape with six connected stations: 1. Mechanization (meshing drive gears and belt), 2. Steam Power (Watt beam engine and flywheel), 3. Factory System (centralized sawtooth-roof mill with smokestack), 4. Textile Boom (multi-spindle power loom frame), 5. Iron and Coal (coal mine cart and iron crucible), and 6. Railroads and Canals (steam locomotive on stone viaduct over canal barge). Active: ${current.full}`}
    >
      {/* Overhead line-shaft & ground rail linking the 6 stations */}
      <path d="M 16 36 H 778" stroke={INK} strokeWidth={2.5} strokeDasharray="6 4" />
      <path d="M 16 172 H 778" stroke={INK} strokeWidth={3.5} />

      {xs.map((x, i) => {
        const cx = r2(x + w / 2);
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const st = FIRST_REV_STATIONS[i];

        return (
          <g
            key={st.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={st.full}
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
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <rect x={x} y={14} width={w} height={208} fill="transparent" />

            {/* Drop hanger from overhead drive line-shaft */}
            <path d={`M ${cx} 36 V 48`} stroke={tone} strokeWidth={isLit ? 4 : 2.5} />
            <circle cx={cx} cy={36} r={isLit ? 6 : 4.5} fill={tone} />

            {/* 1. Mechanization of Production: meshing gears + drive belt */}
            {i === 0 && (
              <g>
                <GearWheelGlyph cx={54} cy={100} r={25} tone={tone} />
                <GearWheelGlyph cx={102} cy={126} r={21} tone={tone} />
                <path d="M 54 75 L 102 105 M 54 125 L 102 147" stroke={tone} strokeWidth={3} />
                <rect x={36} y={156} width={82} height={10} fill={tone} />
              </g>
            )}

            {/* 2. Steam Power: Watt beam engine + cylinder + spoked flywheel */}
            {i === 1 && (
              <g>
                {/* Vertical steam cylinder */}
                <rect x={156} y={110} width={26} height={54} fill={tone} />
                <rect x={166} y={78} width={6} height={34} fill={tone} />
                {/* Central stone engine pillar */}
                <path d="M 194 90 H 210 L 214 164 H 190 Z" fill={tone} />
                {/* Overhead rocking beam */}
                <path d="M 164 78 L 240 96" stroke={tone} strokeWidth={7} strokeLinecap="round" />
                <circle cx={202} cy={87} r={5} fill={WHITE} />
                {/* Connecting rod + flywheel */}
                <path d="M 238 96 V 136" stroke={tone} strokeWidth={4} />
                <SteamFlywheelGlyph cx={238} cy={136} r={22} tone={tone} />
              </g>
            )}

            {/* 3. Factory System: centralized sawtooth mill + tall chimney */}
            {i === 2 && (
              <g>
                {/* Tapered brick chimney */}
                <path d="M 282 62 H 294 L 298 166 H 278 Z" fill={tone} />
                {/* Sawtooth centralized factory body with 6 window cutouts */}
                <path
                  d="M 300 102 L 326 82 V 102 L 352 82 V 102 L 378 82 V 166 H 300 Z M 308 112 H 322 V 128 H 308 Z M 332 112 H 346 V 128 H 332 Z M 356 112 H 370 V 128 H 356 Z M 308 136 H 322 V 154 H 308 Z M 332 136 H 346 V 154 H 332 Z M 356 136 H 370 V 154 H 356 Z"
                  fill={tone}
                  fillRule="evenodd"
                />
              </g>
            )}

            {/* 4. Textile Industry Boom: Power loom & multi-spindle frame */}
            {i === 3 && (
              <g>
                {/* Twin side standards + top & bottom beams */}
                <rect x={414} y={66} width={10} height={100} fill={tone} />
                <rect x={498} y={66} width={10} height={100} fill={tone} />
                <rect x={410} y={66} width={102} height={10} fill={tone} />
                <rect x={414} y={112} width={94} height={8} fill={tone} />
                <rect x={414} y={152} width={94} height={10} fill={tone} />
                {/* 5 vertical spindles/bobbins + warp threads */}
                {[432, 446, 461, 476, 490].map((sx) => (
                  <g key={sx}>
                    <rect x={sx - 3} y={82} width={6} height={24} rx={2} fill={tone} />
                    <path d={`M ${sx} 76 V 152`} stroke={tone} strokeWidth={2} />
                  </g>
                ))}
              </g>
            )}

            {/* 5. Iron and Coal Production: Coal mine cart + pouring iron crucible */}
            {i === 4 && (
              <g>
                {/* Coal heap inside trapezoidal mine cart on rail wheels */}
                <path d="M 542 120 L 556 104 L 572 112 L 584 102 L 598 120 Z" fill={tone} />
                <path d="M 538 120 H 602 L 594 148 H 546 Z" fill={tone} />
                <circle cx={556} cy={156} r={8} fill={tone} />
                <circle cx={584} cy={156} r={8} fill={tone} />
                {/* Blast-furnace crucible pouring molten stream into ingot mold */}
                <path d="M 610 72 H 640 L 634 106 H 616 Z" fill={tone} />
                <path d="M 625 106 V 148" stroke={tone} strokeWidth={5} />
                <rect x={610} y={148} width={30} height={16} fill={tone} />
              </g>
            )}

            {/* 6. Railroads and Canals: Steam locomotive on viaduct over canal barge */}
            {i === 5 && (
              <g>
                {/* Early steam locomotive silhouette */}
                <rect x={668} y={84} width={64} height={24} rx={4} fill={tone} />
                <rect x={666} y={70} width={22} height={36} fill={tone} />
                <rect x={722} y={64} width={8} height={22} fill={tone} />
                <circle cx={680} cy={114} r={8.5} fill={tone} stroke={WHITE} strokeWidth={2} />
                <circle cx={702} cy={114} r={8.5} fill={tone} stroke={WHITE} strokeWidth={2} />
                <circle cx={724} cy={114} r={7} fill={tone} stroke={WHITE} strokeWidth={2} />
                {/* Stone viaduct bridge with two arches */}
                <path
                  d="M 660 122 H 774 V 144 H 762 A 16 14 0 0 0 730 144 H 712 A 16 14 0 0 0 680 144 H 660 Z"
                  fill={tone}
                />
                {/* Canal basin + cargo barge below */}
                <rect x={660} y={146} width={114} height={20} fill={COUNTER_FILL} />
                <path d="M 674 148 H 760 L 750 162 H 684 Z" fill={tone} />
              </g>
            )}

            {/* Bottom station nameplate */}
            <rect x={x} y={180} width={w} height={42} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={cx} y={206} textAnchor="middle" {...HEAD} fontSize={12.5} fill={INK}>
              {st.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   4. First Revolution Impact on Society: Panoramic Valley Transformation
   & Interactive 1760 to 1850 Time Scrubber
   ========================================================================== */


/* ==========================================================================
   5. Question: 1890: The 1890 Schoolhouse Reskilling Bridge & Career
   Switchyard (Interactive)
   ========================================================================== */


/* ==========================================================================
   6. The Second Industrial Revolution: High-Voltage Power Grid & 5-Station
   Mass Production Circuit (Interactive)
   ========================================================================== */

const SECOND_REV_STATIONS = [
  { num: "1", short: "1. Assembly Line", full: "1. Mass Production & Assembly Line" },
  { num: "2", short: "2. Electrification", full: "2. Widespread Electrification" },
  { num: "3", short: "3. Steel (Bessemer)", full: "3. Innovation in Steel Production" },
  { num: "4", short: "4. Chemicals", full: "4. Advances in Chemical Industry" },
  { num: "5", short: "5. Transport & Comm", full: "5. Revolution in Transportation & Communication" },
];

/** Classic 1913 Model-T touring car silhouette (origin top-left x, y, width ~48, height ~28). */
function ModelTCarGlyph({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      {/* Boxy Model-T cab & hood */}
      <path d="M 4 14 V 2 H 28 V 10 H 44 V 20 H 2 V 14 Z" fill={tone} />
      <rect x={8} y={5} width={16} height={7} fill={WHITE} />
      <circle cx={11} cy={22} r={6} fill={tone} stroke={WHITE} strokeWidth={1.8} />
      <circle cx={35} cy={22} r={6} fill={tone} stroke={WHITE} strokeWidth={1.8} />
    </g>
  );
}

export function SecondRevolutionPowerGridInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = SECOND_REV_STATIONS[active] ?? SECOND_REV_STATIONS[0];
  const xs = [16, 170, 324, 478, 632];
  const w = 148;

  return (
    <Plate
      w={800}
      h={242}
      title={`Interactive Second Industrial Revolution circuit with five stations powered by an overhead electric busbar: 1. Assembly Line (Ford 1913 moving conveyor with Model-T chassis), 2. Electrification (transmission pylon, lamp, and dynamo), 3. Steel (Bessemer converter vessel and steel skyscraper frame), 4. Chemicals (distillation flask, medical cross, and polymer ring), and 5. Transport and Communication (Wright biplane, motorcar, and candlestick telephone). Active: ${current.full}`}
    >
      {/* Overhead high-voltage power busbar + ground floor rail */}
      <path d="M 16 32 H 780" stroke={INK} strokeWidth={3} />
      <path d="M 16 178 H 780" stroke={INK} strokeWidth={3.5} />

      {xs.map((x, i) => {
        const cx = r2(x + w / 2);
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const st = SECOND_REV_STATIONS[i];

        return (
          <g
            key={st.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={st.full}
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
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <rect x={x} y={12} width={w} height={218} fill="transparent" />

            {/* Ceramic insulator drop from high-voltage busbar */}
            <rect x={cx - 5} y={26} width={10} height={12} fill={tone} />
            <path d={`M ${cx} 38 V 52`} stroke={tone} strokeWidth={isLit ? 4 : 2.5} />

            {/* 1. Mass Production & Assembly Line (1913 Ford conveyor + overhead hoist) */}
            {i === 0 && (
              <g>
                {/* Overhead gantry hoist lowering chassis part */}
                <path d="M 56 54 V 76 M 46 76 H 66" stroke={tone} strokeWidth={3.5} />
                <ModelTCarGlyph x={30} y={104} k={1.05} tone={tone} />
                <ModelTCarGlyph x={94} y={104} k={1.05} tone={tone} />
                {/* Moving conveyor belt with rollers */}
                <rect x={24} y={144} width={132} height={22} rx={11} fill="none" stroke={tone} strokeWidth={4.5} />
                {[42, 74, 106, 138].map((rx) => (
                  <circle key={rx} cx={rx} cy={155} r={5} fill={tone} />
                ))}
              </g>
            )}

            {/* 2. Widespread Electrification: Lattice tower + overhead factory lamp + spark */}
            {i === 1 && (
              <g>
                {/* Lattice electrical pylon */}
                <path
                  d="M 186 174 L 200 68 H 212 L 226 174 H 217 L 206 98 L 195 174 Z"
                  fill={tone}
                />
                <rect x={180} y={84} width={52} height={5} fill={tone} />
                <rect x={185} y={104} width={42} height={5} fill={tone} />
                {/* Overhead industrial reflector lamp + bulb */}
                <path d="M 278 52 V 76" stroke={tone} strokeWidth={3.5} />
                <path d="M 254 92 L 268 76 H 288 L 302 92 Z" fill={tone} />
                <circle cx={278} cy={98} r={8} fill={tone} />
                {/* Electric lightning bolt */}
                <path d="M 272 118 L 258 142 H 274 L 264 168 L 292 138 H 276 Z" fill={tone} />
              </g>
            )}

            {/* 3. Innovation in Steel Production: Bessemer converter + steel skyscraper girder frame */}
            {i === 2 && (
              <g>
                {/* Pear-shaped Bessemer converter vessel on trunnions */}
                <path
                  d="M 344 74 H 366 L 374 96 C 378 114 372 130 355 130 C 338 130 332 114 336 96 Z"
                  fill={tone}
                />
                <rect x={332} y={104} width={46} height={6} fill={tone} />
                <path d="M 336 110 V 174 M 374 110 V 174" stroke={tone} strokeWidth={5} />
                {/* Steel skyscraper structural grid on right */}
                <path
                  d="M 404 60 H 458 V 174 H 404 Z M 412 68 H 428 V 96 H 412 Z M 434 68 H 450 V 96 H 434 Z M 412 104 H 428 V 132 H 412 Z M 434 104 H 450 V 132 H 434 Z M 412 140 H 428 V 168 H 412 Z M 434 140 H 450 V 168 H 434 Z"
                  fill={tone}
                  fillRule="evenodd"
                />
              </g>
            )}

            {/* 4. Advances in Chemical Industry: Distillation flask + medical cross & synthetic ring */}
            {i === 3 && (
              <g>
                {/* Round-bottom chemical flask with neck & condenser tube */}
                <rect x={502} y={66} width={16} height={32} fill={tone} />
                <rect x={498} y={62} width={24} height={6} fill={tone} />
                <circle cx={510} cy={126} r={28} fill={tone} />
                <path d="M 490 118 H 530" stroke={WHITE} strokeWidth={3} />
                <path d="M 518 76 L 548 90 V 106" fill="none" stroke={tone} strokeWidth={4} />
                {/* Medical cross (modern medicine) */}
                <path
                  d="M 580 68 H 596 V 82 H 610 V 98 H 596 V 112 H 580 V 98 H 566 V 82 H 580 Z"
                  fill={tone}
                />
                {/* Synthetic polymer hexagon ring */}
                <polygon
                  points="588,124 608,135 608,157 588,168 568,157 568,135"
                  fill="none"
                  stroke={tone}
                  strokeWidth={5}
                />
              </g>
            )}

            {/* 5. Transportation & Communication: Wright biplane + candlestick phone + motorcar */}
            {i === 4 && (
              <g>
                {/* 1903 Wright Flyer biplane silhouette */}
                <rect x={648} y={70} width={96} height={6} fill={tone} />
                <rect x={648} y={90} width={96} height={6} fill={tone} />
                <path d="M 664 76 V 90 M 696 76 V 90 M 728 76 V 90" stroke={tone} strokeWidth={3} />
                <rect x={690} y={64} width={12} height={36} fill={tone} />
                {/* Bell candlestick telephone on left */}
                <rect x={648} y={162} width={28} height={8} fill={tone} />
                <rect x={658} y={126} width={8} height={38} fill={tone} />
                <circle cx={662} cy={122} r={8} fill={tone} />
                <path d="M 644 134 H 658" stroke={tone} strokeWidth={4} />
                {/* Karl Benz motorcar on right */}
                <ModelTCarGlyph x={698} y={136} k={1.1} tone={tone} />
              </g>
            )}

            {/* Bottom station nameplate */}
            <rect x={x} y={186} width={w} height={44} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={cx} y={214} textAnchor="middle" {...HEAD} fontSize={13.5} fill={INK}>
              {st.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   7. Second Revolution: Key Inventions: Interactive Patent Grid & Live
   Mechanism Chamber (Edison 1879, Combustion Engine, Marconi 1895, Ford 1913)
   ========================================================================== */


/* ==========================================================================
   8. Second Revolution Impact on Society: Panoramic 6-Zone Metropolis
   Skyline & Underground Cutaway (Interactive)
   ========================================================================== */

const SECOND_SOCIETY_IMPACTS = [
  { num: "1", short: "1. Megacities", full: "1. Urban Growth & Megacities" },
  { num: "2", short: "2. Consumerism", full: "2. Rise of Consumer Culture" },
  { num: "3", short: "3. Corp. Jobs", full: "3. New Job Opportunities" },
  { num: "4", short: "4. Living Std.", full: "4. Improved Living Standards" },
  { num: "5", short: "5. Labor Mvmt.", full: "5. Worker Exploitation and Inequality" },
  { num: "6", short: "6. Pollution", full: "6. Environmental Consequences" },
];

export function MegacitySkylineInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = SECOND_SOCIETY_IMPACTS[active] ?? SECOND_SOCIETY_IMPACTS[0];
  const xs = [16, 144, 272, 400, 528, 656];
  const w = 122;

  return (
    <Plate
      w={800}
      h={242}
      title={`Interactive Second Industrial Revolution societal skyline with six selectable urban strata: 1. Megacities (stepped steel skyscraper and underground sanitation pipe), 2. Consumerism (rooftop advertising billboard and variety display window), 3. Corporate Jobs (management hierarchy pyramid), 4. Living Standards (medical cross and rising life-expectancy bars), 5. Labor Movement (workers raising union placards), and 6. Pollution (coal, steel, and chemical smokestacks). Active: ${current.full}`}
    >
      {/* Continuous street level across the metropolis */}
      <path d="M 16 174 H 778" stroke={INK} strokeWidth={3.5} />

      {xs.map((x, i) => {
        const cx = r2(x + w / 2);
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const imp = SECOND_SOCIETY_IMPACTS[i];

        return (
          <g
            key={imp.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={imp.full}
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
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <rect x={x} y={14} width={w} height={216} fill="transparent" />

            {/* 1. Urban Growth & Megacities: Stepped skyscraper spire + sanitation pipe */}
            {i === 0 && (
              <g>
                {/* Stepped skyscraper with spire */}
                <rect x={74} y={22} width={6} height={18} fill={tone} />
                <rect x={62} y={40} width={30} height={22} fill={tone} />
                <path
                  d="M 48 62 H 106 V 146 H 48 Z M 56 70 H 68 V 86 H 56 Z M 72 70 H 82 V 86 H 72 Z M 86 70 H 98 V 86 H 86 Z M 56 94 H 68 V 110 H 56 Z M 72 94 H 82 V 110 H 72 Z M 86 94 H 98 V 110 H 86 Z M 56 118 H 68 V 134 H 56 Z M 72 118 H 82 V 134 H 72 Z M 86 118 H 98 V 134 H 86 Z"
                  fill={tone}
                  fillRule="evenodd"
                />
                {/* Underground municipal sanitation conduit */}
                <rect x={26} y={150} width={102} height={18} rx={9} fill={COUNTER_FILL} stroke={tone} strokeWidth={3} />
              </g>
            )}

            {/* 2. Rise of Consumer Culture: Rooftop advertising billboard + product variety showcase */}
            {i === 1 && (
              <g>
                {/* Rooftop advertising billboard on struts */}
                <rect x={156} y={34} width={98} height={44} fill={tone} />
                <rect x={162} y={40} width={86} height={32} fill={WHITE} />
                {/* Starburst ad mark + bold ad bars */}
                <circle cx={182} cy={56} r={9} fill={tone} />
                <rect x={198} y={48} width={42} height={6} fill={tone} />
                <rect x={198} y={58} width={30} height={6} fill={tone} />
                <path d="M 172 78 V 94 M 238 78 V 94" stroke={tone} strokeWidth={4} />
                {/* Street-level showcase window with 3 distinct product silhouettes */}
                <rect x={156} y={94} width={98} height={74} fill="none" stroke={tone} strokeWidth={4} />
                {/* Product 1: bottle. Product 2: bowler hat. Product 3: radio/appliance */}
                <path d="M 170 156 V 126 H 174 V 114 H 180 V 126 H 184 V 156 Z" fill={tone} />
                <path d="M 192 146 H 220 V 152 H 192 Z M 196 146 C 196 130 216 130 216 146 Z" fill={tone} />
                <rect x={226} y={124} width={18} height={32} rx={3} fill={tone} />
                <circle cx={235} cy={135} r={4} fill={WHITE} />
              </g>
            )}

            {/* 3. New Job Opportunities: Industrial corporation management org chart */}
            {i === 2 && (
              <g>
                {/* Top executive management node */}
                <rect x={305} y={38} width={56} height={30} fill={tone} />
                <circle cx={333} cy={49} r={5} fill={WHITE} />
                <path d="M 323 63 C 323 56 343 56 343 63 Z" fill={WHITE} />
                {/* Org-chart tree connectors */}
                <path d="M 333 68 V 92 M 294 92 H 372 M 294 92 V 108 M 333 92 V 108 M 372 92 V 108" stroke={tone} strokeWidth={3.5} />
                {/* Three department manager/workforce nodes */}
                {[278, 317, 356].map((nx) => (
                  <g key={nx}>
                    <rect x={nx} y={108} width={32} height={54} fill={tone} />
                    <circle cx={nx + 16} cy={124} r={5} fill={WHITE} />
                    <path d={`M ${nx + 7} 142 C ${nx + 7} 134 ${nx + 25} 134 ${nx + 25} 142 Z`} fill={WHITE} />
                    <rect x={nx + 6} y={148} width={20} height={6} fill={WHITE} />
                  </g>
                ))}
              </g>
            )}

            {/* 4. Improved Living Standards: Medical cross + rising life expectancy steps */}
            {i === 3 && (
              <g>
                {/* Medical cross badge */}
                <path
                  d="M 424 40 H 440 V 54 H 454 V 70 H 440 V 84 H 424 V 70 H 410 V 54 H 424 Z"
                  fill={tone}
                />
                {/* Rising life-expectancy bars + upward arrow */}
                <Pointer x1={460} y1={96} x2={506} y2={48} w={4} head={10} color={tone} />
                <rect x={414} y={134} width={24} height={36} fill={tone} />
                <rect x={448} y={108} width={24} height={62} fill={tone} />
                <rect x={482} y={76} width={24} height={94} fill={tone} />
              </g>
            )}

            {/* 5. Worker Exploitation & Inequality: Workers raising labor union placards */}
            {i === 4 && (
              <g>
                {/* Two raised union placards on poles clear above worker heads */}
                <rect x={537} y={38} width={38} height={26} fill={tone} />
                <rect x={543} y={45} width={26} height={4.5} fill={WHITE} />
                <rect x={543} y={53} width={18} height={4.5} fill={WHITE} />
                <path d="M 556 64 V 108" stroke={tone} strokeWidth={3.5} />

                <rect x={601} y={44} width={38} height={26} fill={tone} />
                <rect x={607} y={51} width={26} height={4.5} fill={WHITE} />
                <rect x={607} y={59} width={18} height={4.5} fill={WHITE} />
                <path d="M 620 70 V 108" stroke={tone} strokeWidth={3.5} />

                {/* Three worker silhouettes at base (y=118..168, clear below y=108 poles) */}
                {[556, 588, 620].map((wx) => (
                  <g key={wx}>
                    <circle cx={wx} cy={126} r={8} fill={tone} />
                    <path d={`M ${wx - 10} 168 V 142 C ${wx - 10} 136 ${wx + 10} 136 ${wx + 10} 142 V 168 Z`} fill={tone} />
                  </g>
                ))}
              </g>
            )}

            {/* 6. Environmental Consequences: Coal, steel & chemical smokestacks + drum */}
            {i === 5 && (
              <g>
                {/* Dense overhead smoke plume */}
                <path
                  d="M 672 64 C 672 48 688 40 704 48 C 714 34 738 36 746 52 C 762 52 768 68 754 78 H 678 C 668 78 666 70 672 64 Z"
                  fill={tone}
                />
                {/* Three smokestacks */}
                <path d="M 676 82 H 688 L 692 168 H 672 Z" fill={tone} />
                <path d="M 702 82 H 714 L 718 168 H 698 Z" fill={tone} />
                {/* Ribbed chemical drum on the right */}
                <rect x={730} y={114} width={34} height={54} rx={4} fill={tone} />
                <path d="M 730 130 H 764 M 730 150 H 764" stroke={WHITE} strokeWidth={2.5} />
              </g>
            )}

            {/* Bottom station nameplate */}
            <rect x={x} y={182} width={w} height={44} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={cx} y={210} textAnchor="middle" {...HEAD} fontSize={12.5} fill={INK}>
              {imp.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   9. Questions: 1932: Riveted Steel Skyscraper Girder Balance (How Work
   Improved vs. How Work Worsened by 1932)
   ========================================================================== */

/* ==========================================================================
   10. The Third Industrial Revolution (Digital Revolution): Silicon Wafer
   & Printed-Circuit Bus Connecting the 5 Digital Pillars (Interactive)
   ========================================================================== */

const THIRD_REV_STATIONS = [
  { num: "1", short: "1. Microprocessors", full: "1. Digital Computing & Microprocessors" },
  { num: "2", short: "2. Robotics", full: "2. Automation & Robotics" },
  { num: "3", short: "3. Internet & Web", full: "3. The Internet & Connectivity" },
  { num: "4", short: "4. Renewables", full: "4. Renewable Energy" },
  { num: "5", short: "5. Big Data & AI", full: "5. Big Data and AI Advancements" },
];

export function SiliconWaferCircuitInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = THIRD_REV_STATIONS[active] ?? THIRD_REV_STATIONS[0];
  const xs = [16, 170, 324, 478, 632];
  const w = 148;

  return (
    <Plate
      w={800}
      h={236}
      title={`Interactive Third Industrial Revolution circuit bus with five selectable digital pillars: 1. Microprocessors (1947 three-lead transistor and 1971 silicon chip on a framed screen), 2. Robotics (framed control screen driving an articulated robotic arm), 3. Internet and Web (ARPANET packet mesh and World Wide Web globe on a framed screen), 4. Renewables (three-blade wind turbine and solar photovoltaic array), and 5. Big Data and AI (cloud and neural decision nodes on a framed screen). Active: ${current.full}`}
    >
      {/* Top PCB circuit trace bus + ground rail */}
      <path d="M 16 30 H 780" stroke={INK} strokeWidth={3} />
      <path d="M 16 172 H 780" stroke={INK} strokeWidth={3.5} />

      {xs.map((x, i) => {
        const cx = r2(x + w / 2);
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const st = THIRD_REV_STATIONS[i];

        return (
          <g
            key={st.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={st.full}
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
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <rect x={x} y={10} width={w} height={214} fill="transparent" />

            {/* PCB solder pad & vertical trace drop */}
            <circle cx={cx} cy={30} r={isLit ? 6.5 : 5} fill={tone} />
            <circle cx={cx} cy={30} r={2} fill={WHITE} />
            <path d={`M ${cx} 36 V 52`} stroke={tone} strokeWidth={isLit ? 3.5 : 2.5} />

            {/* 1. Digital Computing & Microprocessors: 1947 Transistor -> 1971 Chip on MiniScreen */}
            {i === 0 && (
              <g>
                {/* 1947 three-legged transistor silhouette */}
                <path d="M 28 78 C 28 64 52 64 52 78 V 110 H 28 Z" fill={tone} />
                <rect x={24} y={106} width={32} height={6} fill={tone} />
                <path d="M 32 112 V 148 M 40 112 V 154 M 48 112 V 148" stroke={tone} strokeWidth={3.5} />
                {/* Framed MiniScreen holding the 1971 microprocessor chip */}
                <MiniScreen x={72} y={76}>
                  <SiliconChipGlyph cx={114} cy={104} s={26} tone={tone} />
                </MiniScreen>
              </g>
            )}

            {/* 2. Automation & Robotics: Articulated 6-axis Robotic Arm + precision assembly line */}
            {i === 1 && (
              <g>
                <RobotArmGlyph bx={224} by={168} k={0.86} tone={tone} />
                {/* Workpiece & precision pedestal under robotic gripper */}
                <rect x={264} y={110} width={28} height={24} fill="none" stroke={tone} strokeWidth={3.5} />
                <rect x={256} y={138} width={44} height={30} fill={tone} />
              </g>
            )}

            {/* 3. The Internet & Connectivity: ARPANET nodes + Web Globe inside MiniScreen */}
            {i === 2 && (
              <g>
                {/* Left & right ARPANET packet nodes */}
                <circle cx={336} cy={88} r={6} fill={tone} />
                <circle cx={336} cy={126} r={6} fill={tone} />
                <path d="M 336 88 V 126 M 342 88 L 354 96 M 342 126 L 354 114" stroke={tone} strokeWidth={2.5} />
                <MiniScreen x={356} y={76}>
                  {/* World Wide Web meridian globe inside screen */}
                  <circle cx={398} cy={104} r={17} fill="none" stroke={tone} strokeWidth={3} />
                  <ellipse cx={398} cy={104} rx={8} ry={17} fill="none" stroke={tone} strokeWidth={2} />
                  <path d="M 381 104 H 415" stroke={tone} strokeWidth={2} />
                </MiniScreen>
                <circle cx={460} cy={88} r={6} fill={tone} />
                <circle cx={460} cy={126} r={6} fill={tone} />
                <path d="M 460 88 V 126 M 442 96 L 454 88 M 442 114 L 454 126" stroke={tone} strokeWidth={2.5} />
              </g>
            )}

            {/* 4. Renewable Energy: 3-Blade Wind Turbine + Angled Solar Panel Array */}
            {i === 3 && (
              <g>
                {/* Wind turbine mast & 3 blades */}
                <path d="M 510 92 H 516 L 519 168 H 507 Z" fill={tone} />
                {[0, 120, 240].map((deg) => (
                  <path
                    key={deg}
                    d="M 513 92 L 509 56 L 513 52 L 517 56 Z"
                    fill={tone}
                    transform={`rotate(${deg} 513 92)`}
                  />
                ))}
                <circle cx={513} cy={92} r={5} fill={tone} stroke={WHITE} strokeWidth={1.5} />
                {/* Solar photovoltaic panel array on stand */}
                <path d="M 548 148 L 566 112 H 618 L 600 148 Z" fill={tone} />
                <path d="M 557 130 H 609 M 584 112 L 566 148 M 601 112 L 583 148" stroke={WHITE} strokeWidth={2} />
                <path d="M 576 148 V 168 M 592 148 V 168" stroke={tone} strokeWidth={4} />
              </g>
            )}

            {/* 5. Big Data and AI Advancements: Cloud + AI Neural Nodes inside MiniScreen */}
            {i === 4 && (
              <g>
                {/* Data cylinder stacks on left */}
                <rect x={638} y={88} width={22} height={14} rx={3} fill={tone} />
                <rect x={638} y={106} width={22} height={14} rx={3} fill={tone} />
                <rect x={638} y={124} width={22} height={14} rx={3} fill={tone} />
                <MiniScreen x={668} y={76}>
                  {/* Cloud + neural decision fork inside screen with clear margin */}
                  <path
                    d="M 692 98 C 692 91 699 88 704 91 C 708 84 719 84 723 91 C 730 91 732 98 725 102 H 695 C 690 102 690 98 692 98 Z"
                    fill={tone}
                  />
                  <circle cx={698} cy={114} r={3.5} fill={tone} />
                  <circle cx={710} cy={115} r={3.5} fill={tone} />
                  <circle cx={722} cy={114} r={3.5} fill={tone} />
                  <path d="M 710 102 L 698 114 M 710 102 V 115 M 710 102 L 722 114" stroke={tone} strokeWidth={2} />
                </MiniScreen>
              </g>
            )}

            {/* Bottom station nameplate */}
            <rect x={x} y={180} width={w} height={44} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={cx} y={208} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
              {st.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   11. Key Innovations ("Innovation Replaces Invention"): Interactive
   Compounding Platform Wave from Silicon Hardware to AI/ML (1970s-Present)
   ========================================================================== */

const THIRD_INNOVATIONS = [
  { num: "1", era: "1970s: 80s", short: "1. Personal PCs", full: "1. Personal Computers (1970s-1980s)" },
  { num: "2", era: "1990s+", short: "2. The Internet", full: "2. The Internet (1990s-Present)" },
  { num: "3", era: "2000s+", short: "3. Mobile Tech", full: "3. Mobile Technology (2000s-Present)" },
  { num: "4", era: "1990s+", short: "4. E-Commerce", full: "4. E-Commerce (1990s-Present)" },
  { num: "5", era: "2010s+", short: "5. AI & ML", full: "5. Artificial Intelligence & Machine Learning (2010s-Present)" },
];

export function InnovationWaveInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = THIRD_INNOVATIONS[active] ?? THIRD_INNOVATIONS[0];
  const xs = [164, 288, 412, 536, 660];
  const w = 120;

  return (
    <Plate
      w={800}
      h={244}
      title={`Interactive diagram showing how innovation replaces physical invention: on the left, the physical transistor and microprocessor base (Invention). To the right, five ascending digital platform innovations on framed screens (1. Personal Computers, 2. The Internet, 3. Mobile Technology, 4. E-Commerce, and 5. Artificial Intelligence and Machine Learning). Active: ${current.full}`}
    >
      {/* Left Foundation Block: Hardware Invention (Transistor / Chip) */}
      <rect x={16} y={38} width={116} height={192} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <text x={74} y={64} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
        Invention
      </text>
      <SiliconChipGlyph cx={74} cy={116} s={44} tone={INK} />
      <rect x={24} y={166} width={100} height={52} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={74} y={189} textAnchor="middle" {...BODY} fontSize={12} fill={INK}>
        1947 / 1971
      </text>
      <text x={74} y={207} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
        Silicon Base
      </text>

      {/* Arrow from Invention -> Platform Innovations */}
      <Pointer x1={134} y1={134} x2={160} y2={134} w={4} head={10} color={SIGNAL} />

      {/* Top banner over the 5 Platform Innovations */}
      <text x={472} y={26} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
        Platform Innovations Built on Digital Foundations (Click 1 to 5)
      </text>

      {xs.map((x, i) => {
        const cx = r2(x + w / 2);
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const inv = THIRD_INNOVATIONS[i];
        const stepH = 62 + i * 7;
        const stepY = 230 - stepH;

        return (
          <g
            key={inv.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={inv.full}
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
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <rect x={x} y={36} width={w} height={196} fill="transparent" />

            {/* 1. Personal Computers (1970s-1980s): MiniScreen + keyboard */}
            {i === 0 && (
              <g>
                <MiniScreen x={x + 18} y={64}>
                  <rect x={x + 34} y={80} width={52} height={8} fill={tone} />
                  <rect x={x + 34} y={92} width={36} height={8} fill={tone} />
                </MiniScreen>
                {/* Keyboard silhouette below screen stand */}
                <rect x={x + 22} y={144} width={76} height={10} fill={tone} />
              </g>
            )}

            {/* 2. The Internet (1990s-Present): Connected global screen */}
            {i === 1 && (
              <g>
                <MiniScreen x={x + 18} y={60}>
                  <circle cx={cx} cy={88} r={16} fill="none" stroke={tone} strokeWidth={2.8} />
                  <ellipse cx={cx} cy={88} rx={7} ry={16} fill="none" stroke={tone} strokeWidth={2} />
                  <path d={`M ${cx - 16} 88 H ${cx + 16}`} stroke={tone} strokeWidth={2} />
                </MiniScreen>
              </g>
            )}

            {/* 3. Mobile Technology (2000s-Present): Framed handheld smartphone screen + wireless arcs */}
            {i === 2 && (
              <g>
                {/* Wireless cellular arcs above phone */}
                <path
                  d={`M ${cx - 14} 52 A 18 18 0 0 1 ${cx + 14} 52 M ${cx - 22} 44 A 28 28 0 0 1 ${cx + 22} 44`}
                  fill="none"
                  stroke={tone}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Framed vertical mobile screen */}
                <rect x={cx - 24} y={60} width={48} height={74} fill="none" stroke={tone} strokeWidth={4.5} />
                <rect x={cx - 19} y={65} width={38} height={56} fill="none" stroke={tone} strokeWidth={1} />
                <circle cx={cx} cy={127} r={2.5} fill={tone} />
                <rect x={cx - 12} y={76} width={24} height={16} fill={tone} />
                <rect x={cx - 12} y={96} width={24} height={6} fill={tone} />
              </g>
            )}

            {/* 4. E-Commerce (1990s-Present): Storefront & parcel inside MiniScreen */}
            {i === 3 && (
              <g>
                <MiniScreen x={x + 18} y={52}>
                  {/* Package box + trade arrow inside screen */}
                  <rect x={x + 34} y={68} width={24} height={24} fill={tone} />
                  <path d={`M ${x + 46} 68 V 92 M ${x + 34} 78 H ${x + 58}`} stroke={WHITE} strokeWidth={2} />
                  <Pointer x1={x + 62} y1={80} x2={x + 88} y2={80} w={3} head={8} color={tone} />
                </MiniScreen>
              </g>
            )}

            {/* 5. AI & Machine Learning (2010s-Present): Neural decision nodes inside MiniScreen */}
            {i === 4 && (
              <g>
                <MiniScreen x={x + 18} y={46}>
                  <circle cx={x + 40} cy={66} r={4.5} fill={tone} />
                  <circle cx={x + 40} cy={84} r={4.5} fill={tone} />
                  <circle cx={x + 62} cy={75} r={5} fill={tone} />
                  <circle cx={x + 82} cy={66} r={4.5} fill={tone} />
                  <circle cx={x + 82} cy={84} r={4.5} fill={tone} />
                  <path
                    d={`M ${x + 40} 66 L ${x + 62} 75 M ${x + 40} 84 L ${x + 62} 75 M ${x + 62} 75 L ${x + 82} 66 M ${x + 62} 75 L ${x + 82} 84`}
                    stroke={tone}
                    strokeWidth={2.2}
                  />
                </MiniScreen>
              </g>
            )}

            {/* Rising platform step plinth */}
            <rect x={x} y={stepY} width={w} height={stepH} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={cx} y={stepY + 24} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
              {inv.short}
            </text>
            <text x={cx} y={stepY + 44} textAnchor="middle" {...BODY} fontSize={12} fill={INK}>
              {inv.era}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   13. The Fourth Industrial Revolution (Industry 4.0): 7-Pillar
   Cyber-Physical Matrix & Live Digital Twin Monitor (Interactive)
   ========================================================================== */

const FOURTH_REV_TECHS = [
  {
    num: "1",
    short: "1. AI & ML",
    full: "1. Artificial Intelligence (AI) & Machine Learning",
    example: "Chatbots & Recommendation Systems",
  },
  {
    num: "2",
    short: "2. IoT & CPS",
    full: "2. Internet of Things (IoT) & Cyber-Physical Systems",
    example: "Smart Factory Self-Diagnosis",
  },
  {
    num: "3",
    short: "3. Cloud & Data",
    full: "3. Big Data & Cloud Computing",
    example: "Real-Time Supply Chain Optimization",
  },
  {
    num: "4",
    short: "4. Blockchain",
    full: "4. Blockchain & Decentralized Technologies",
    example: "Immutable Supply Chain & Crypto Ledger",
  },
  {
    num: "5",
    short: "5. Robotics",
    full: "5. Advanced Robotics & Automation",
    example: "Autonomous Warehouse Fulfillment Robots",
  },
  {
    num: "6",
    short: "6. Bio & 3D Print",
    full: "6. Biotechnology, 3D Printing & Human-Machine",
    example: "3D-Printed Organs & AI Drug Discovery",
  },
  {
    num: "7",
    short: "7. Quantum & 5G",
    full: "7. Quantum Computing & 5G Networks",
    example: "Quantum & 5G AI Medical Diagnostics",
  },
];

export function CyberPhysicalConvergenceInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = FOURTH_REV_TECHS[active] ?? FOURTH_REV_TECHS[0];

  // Top row: 4 nodes (0..3), Bottom row: 3 nodes (4..6)
  const nodes = [
    { x: 16, y: 18, w: 98, h: 98, cx: 65 },
    { x: 122, y: 18, w: 98, h: 98, cx: 171 },
    { x: 228, y: 18, w: 98, h: 98, cx: 277 },
    { x: 334, y: 18, w: 98, h: 98, cx: 383 },
    { x: 16, y: 128, w: 132, h: 98, cx: 82 },
    { x: 158, y: 128, w: 132, h: 98, cx: 224 },
    { x: 300, y: 128, w: 132, h: 98, cx: 366 },
  ];

  return (
    <Plate
      w={800}
      h={240}
      title={`Interactive Industry 4.0 cyber-physical convergence diagram: on the left, seven selectable technology modules (1. AI and ML, 2. IoT and Cyber-Physical Systems, 3. Big Data and Cloud, 4. Blockchain, 5. Advanced Robotics, 6. Biotechnology and 3D Printing, 7. Quantum Computing and 5G). On the right, a framed Digital Twin monitor displaying ${current.example}`}
    >
      {nodes.map((n, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const tech = FOURTH_REV_TECHS[i];

        return (
          <g
            key={tech.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={tech.full}
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
            className={onSelect ? "cursor-pointer" : undefined}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              fill={isLit ? COUNTER_FILL : WHITE}
              stroke={tone}
              strokeWidth={isLit ? 3.5 : 2}
            />

            {/* Module mini-glyphs */}
            {i === 0 && (
              <g>
                <circle cx={n.cx - 18} cy={n.y + 26} r={5} fill={tone} />
                <circle cx={n.cx - 18} cy={n.y + 46} r={5} fill={tone} />
                <circle cx={n.cx} cy={n.y + 36} r={6} fill={tone} />
                <circle cx={n.cx + 18} cy={n.y + 26} r={5} fill={tone} />
                <circle cx={n.cx + 18} cy={n.y + 46} r={5} fill={tone} />
                <path
                  d={`M ${n.cx - 18} ${n.y + 26} L ${n.cx} ${n.y + 36} M ${n.cx - 18} ${n.y + 46} L ${n.cx} ${n.y + 36} M ${n.cx} ${n.y + 36} L ${n.cx + 18} ${n.y + 26} M ${n.cx} ${n.y + 36} L ${n.cx + 18} ${n.y + 46}`}
                  stroke={tone}
                  strokeWidth={2.5}
                />
              </g>
            )}
            {i === 1 && (
              <g>
                <GearWheelGlyph cx={n.cx - 10} cy={n.y + 38} r={16} tone={tone} />
                <path
                  d={`M ${n.cx + 10} ${n.y + 24} A 14 14 0 0 1 ${n.cx + 10} ${n.y + 48} M ${n.cx + 17} ${n.y + 18} A 22 22 0 0 1 ${n.cx + 17} ${n.y + 54}`}
                  fill="none"
                  stroke={tone}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            )}
            {i === 2 && (
              <g>
                <path
                  d={`M ${n.cx - 24} ${n.y + 46} C ${n.cx - 24} ${n.y + 36} ${n.cx - 14} ${n.y + 32} ${n.cx - 6} ${n.y + 36} C ${n.cx} ${n.y + 24} ${n.cx + 16} ${n.y + 26} ${n.cx + 20} ${n.y + 36} C ${n.cx + 28} ${n.y + 36} ${n.cx + 30} ${n.y + 48} ${n.cx + 20} ${n.y + 50} H ${n.cx - 20} Z`}
                  fill={tone}
                />
              </g>
            )}
            {i === 3 && (
              <g>
                <rect x={n.cx - 28} y={n.y + 26} width={16} height={22} fill={tone} />
                <rect x={n.cx - 6} y={n.y + 26} width={16} height={22} fill={tone} />
                <rect x={n.cx + 16} y={n.y + 26} width={16} height={22} fill={tone} />
                <path d={`M ${n.cx - 12} ${n.y + 37} H ${n.cx - 6} M ${n.cx + 10} ${n.y + 37} H ${n.cx + 16}`} stroke={tone} strokeWidth={3} />
              </g>
            )}
            {i === 4 && (
              <g>
                {/* Autonomous warehouse bot carrying pod */}
                <rect x={n.cx - 24} y={n.y + 18} width={48} height={20} fill={tone} />
                <rect x={n.cx - 28} y={n.y + 42} width={56} height={12} rx={5} fill={tone} />
                <circle cx={n.cx - 16} cy={n.y + 56} r={5} fill={tone} />
                <circle cx={n.cx + 16} cy={n.y + 56} r={5} fill={tone} />
              </g>
            )}
            {i === 5 && (
              <g>
                {/* 3D Bioprinter nozzle + layered organ heart */}
                <rect x={n.cx - 14} y={n.y + 12} width={28} height={8} fill={tone} />
                <path d={`M ${n.cx - 6} ${n.y + 20} H ${n.cx + 6} L ${n.cx + 2} ${n.y + 30} H ${n.cx - 2} Z`} fill={tone} />
                <path
                  d={`M ${n.cx} ${n.y + 58} C ${n.cx - 18} ${n.y + 46} ${n.cx - 18} ${n.y + 32} ${n.cx - 8} ${n.y + 32} C ${n.cx - 3} ${n.y + 32} ${n.cx} ${n.y + 36} ${n.cx} ${n.y + 38} C ${n.cx} ${n.y + 36} ${n.cx + 3} ${n.y + 32} ${n.cx + 8} ${n.y + 32} C ${n.cx + 18} ${n.y + 32} ${n.cx + 18} ${n.y + 46} ${n.cx} ${n.y + 58} Z`}
                  fill={tone}
                />
              </g>
            )}
            {i === 6 && (
              <g>
                {/* Quantum chandelier tiers */}
                <rect x={n.cx - 24} y={n.y + 14} width={48} height={6} fill={tone} />
                <rect x={n.cx - 18} y={n.y + 28} width={36} height={6} fill={tone} />
                <rect x={n.cx - 10} y={n.y + 42} width={20} height={6} fill={tone} />
                <path d={`M ${n.cx - 14} ${n.y + 20} V ${n.y + 42} M ${n.cx} ${n.y + 20} V ${n.y + 56} M ${n.cx + 14} ${n.y + 20} V ${n.y + 42}`} stroke={tone} strokeWidth={2.5} />
              </g>
            )}

            {/* Bottom label strip */}
            <rect x={n.x} y={n.y + 66} width={n.w} height={32} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
            <text x={n.cx} y={n.y + 87} textAnchor="middle" {...HEAD} fontSize={12} fill={INK}>
              {tech.short}
            </text>
          </g>
        );
      })}

      {/* Connector arrow into the Central Digital Twin Monitor */}
      <Pointer x1={438} y1={116} x2={472} y2={116} w={4} head={9} color={SIGNAL} />

      {/* Right Side: Live Industry 4.0 Digital Twin Monitor */}
      <Monitor x={478} y={16} w={306} h={182}>
        {/* Top banner inside monitor */}
        <rect x={492} y={30} width={278} height={28} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={631} y={49} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
          {current.example}
        </text>

        {/* Scene 0: AI & ML: Chatbot + Recommendation Engine matching items */}
        {active === 0 && (
          <g>
            {/* User query bubble on left */}
            <rect x={504} y={76} width={74} height={44} fill={INK} />
            <rect x={514} y={88} width={54} height={6} fill={WHITE} />
            <rect x={514} y={100} width={38} height={6} fill={WHITE} />
            <Pointer x1={582} y1={98} x2={614} y2={98} w={3.5} head={8} color={SIGNAL} />
            {/* AI self-learning node hub */}
            <circle cx={634} cy={98} r={16} fill={SIGNAL} />
            <circle cx={634} cy={98} r={6} fill={WHITE} />
            <Pointer x1={654} y1={90} x2={686} y2={78} w={3} head={8} color={SIGNAL} />
            <Pointer x1={654} y1={106} x2={686} y2={118} w={3} head={8} color={SIGNAL} />
            {/* Recommended media & product cards (Netflix / Amazon) */}
            <rect x={690} y={66} width={66} height={26} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={723} y={84} textAnchor="middle" {...HEAD} fontSize={11.5} fill={INK}>
              Match 98%
            </text>
            <rect x={690} y={104} width={66} height={26} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={723} y={122} textAnchor="middle" {...HEAD} fontSize={11.5} fill={INK}>
              Match 94%
            </text>
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Self-learning algorithms &amp; recommendations
            </text>
          </g>
        )}

        {/* Scene 1: IoT & Cyber-Physical Systems: Smart Factory Self-Diagnosis */}
        {active === 1 && (
          <g>
            <GearWheelGlyph cx={538} cy={104} r={24} tone={SIGNAL} />
            <RobotArmGlyph bx={604} by={142} k={0.68} tone={INK} />
            <Pointer x1={636} y1={104} x2={668} y2={104} w={3.5} head={8} color={SIGNAL} />
            {/* Self-diagnosis status panel */}
            <rect x={672} y={72} width={88} height={64} fill={SIGNAL} />
            <text x={716} y={96} textAnchor="middle" {...HEAD} fontSize={12} fill={INK}>
              IoT Sensor
            </text>
            <text x={716} y={118} textAnchor="middle" {...BODY} fontSize={11.5} fill={INK}>
              Auto-Optimized
            </text>
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Machines self-diagnose &amp; optimize operations
            </text>
          </g>
        )}

        {/* Scene 2: Big Data & Cloud: Real-Time Supply Chain Optimization */}
        {active === 2 && (
          <g>
            {/* Central Cloud Optimizer */}
            <path
              d="M 596 102 C 596 90 608 84 618 90 C 626 76 646 78 652 90 C 664 90 666 104 654 108 H 602 Z"
              fill={SIGNAL}
            />
            {/* Warehouse on left -> Cloud -> Delivery fleet on right */}
            <rect x={506} y={92} width={48} height={46} fill={INK} />
            <rect x={516} y={104} width={12} height={12} fill={WHITE} />
            <rect x={532} y={104} width={12} height={12} fill={WHITE} />
            <Pointer x1={558} y1={110} x2={590} y2={102} w={3.5} head={8} color={SIGNAL} />
            <Pointer x1={666} y1={102} x2={698} y2={110} w={3.5} head={8} color={SIGNAL} />
            <ModelTCarGlyph x={702} y={102} k={1.15} tone={SIGNAL} />
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Real-time cloud supply chain routing
            </text>
          </g>
        )}

        {/* Scene 3: Blockchain & Decentralized Technologies */}
        {active === 3 && (
          <g>
            {[510, 598, 686].map((bx, bi) => (
              <g key={bx}>
                <rect x={bx} y={74} width={64} height={64} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
                <text x={bx + 32} y={98} textAnchor="middle" {...HEAD} fontSize={12} fill={INK}>
                  Block {bi + 1}
                </text>
                <rect x={bx + 14} y={110} width={36} height={6} fill={bi === 2 ? SIGNAL : INK} fillOpacity={0.35} />
                <rect x={bx + 14} y={122} width={24} height={6} fill={bi === 2 ? SIGNAL : INK} fillOpacity={0.35} />
                {bi < 2 && <Pointer x1={bx + 66} y1={106} x2={bx + 86} y2={106} w={3.5} head={7} color={SIGNAL} />}
              </g>
            ))}
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Decentralized tracking &amp; cryptocurrency ledger
            </text>
          </g>
        )}

        {/* Scene 4: Advanced Robotics & Automation: Warehouse Fulfillment Bots */}
        {active === 4 && (
          <g>
            <path d="M 500 144 H 762" stroke={INK} strokeWidth={3} strokeDasharray="6 4" />
            {[524, 612, 700].map((rx, ri) => (
              <g key={rx}>
                {/* Shelving rack pod carried by autonomous robot */}
                <rect x={rx - 22} y={72} width={44} height={38} fill={ri === 1 ? SIGNAL : INK} />
                <path d={`M ${rx - 16} 86 H ${rx + 16} M ${rx - 16} 98 H ${rx + 16}`} stroke={WHITE} strokeWidth={2.5} />
                {/* Wheeled AGV robot base */}
                <rect x={rx - 26} y={114} width={52} height={16} rx={6} fill={SIGNAL} />
                <circle cx={rx - 14} cy={136} r={6} fill={INK} />
                <circle cx={rx + 14} cy={136} r={6} fill={INK} />
              </g>
            ))}
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Autonomous e-commerce fulfillment fleet
            </text>
          </g>
        )}

        {/* Scene 5: Biotechnology, 3D Printing & Human-Machine Integration */}
        {active === 5 && (
          <g>
            {/* 3D Bioprinter gantry & nozzle printing an organ silhouette */}
            <rect x={512} y={66} width={110} height={8} fill={INK} />
            <rect x={556} y={74} width={22} height={12} fill={SIGNAL} />
            <path d="M 563 86 H 571 L 569 96 H 565 Z" fill={SIGNAL} />
            <path
              d="M 567 136 C 543 120 543 100 556 100 C 562 100 567 105 567 108 C 567 105 572 100 578 100 C 591 100 591 120 567 136 Z"
              fill={SIGNAL}
            />
            <rect x={524} y={138} width={86} height={6} fill={INK} />
            {/* DNA Double-Helix rungs on right for AI drug discovery */}
            <path
              d="M 666 68 C 698 84 698 104 666 120 C 698 132 698 140 682 144 M 714 68 C 682 84 682 104 714 120 C 682 132 682 140 698 144"
              fill="none"
              stroke={INK}
              strokeWidth={4}
            />
            <path d="M 674 78 H 706 M 674 96 H 706 M 674 114 H 706 M 674 132 H 706" stroke={SIGNAL} strokeWidth={3} />
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              3D-printed organs &amp; AI drug discovery
            </text>
          </g>
        )}

        {/* Scene 6: Quantum Computing & 5G Networks */}
        {active === 6 && (
          <g>
            {/* Quantum dilution chandelier on left */}
            <rect x={516} y={66} width={64} height={7} fill={INK} />
            <rect x={526} y={84} width={44} height={7} fill={INK} />
            <rect x={536} y={102} width={24} height={7} fill={SIGNAL} />
            <path d="M 532 73 V 102 M 548 73 V 126 M 564 73 V 102" stroke={INK} strokeWidth={3} />
            <circle cx={548} cy={128} r={6} fill={SIGNAL} />

            {/* 5G high-speed wave link */}
            <Pointer x1={594} y1={104} x2={654} y2={104} w={4} head={9} color={SIGNAL} />
            <text x={624} y={92} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
              5G
            </text>

            {/* AI Medical Diagnostic Scan on right */}
            <rect x={666} y={68} width={82} height={72} fill={INK} />
            <path
              d="M 698 84 H 716 V 96 H 728 V 112 H 716 V 124 H 698 V 112 H 686 V 96 H 698 Z"
              fill={SIGNAL}
            />
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Quantum-enhanced AI medical diagnostics
            </text>
          </g>
        )}
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   14. Impact on Society and Business (Industry 4.0), Dual-Wing Control
   Console: Opportunities (1 to 4) vs. Risks & Governance (5 to 7) Around a Central
   Interactive Impact Stage
   ========================================================================== */

