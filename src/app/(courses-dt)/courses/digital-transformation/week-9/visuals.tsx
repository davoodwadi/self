"use client";

/* ==========================================================================
   Week 9 — Industry 4.0 (Flat Silhouette, Interactive-First)
   --------------------------------------------------------------------------
   Custom industrial silhouette vocabulary crafted specifically for Week 9
   (avoiding overused Shop/Doc/Coins/Conversation tropes from earlier weeks):
     · Steam Flywheel & Beam Engine    (First Industrial Revolution)
     · Lattice Pylon, Bessemer Vessel,
       Conveyor & Filament Bulb        (Second Industrial Revolution)
     · Transistor, Silicon Wafer Die,
       ARPANET Mesh & Robotic Arm      (Third Industrial Revolution)
     · Cyber-Physical Digital Twin,
       Bioprinter & Quantum Chandelier (Fourth Industrial Revolution / 4.0)
     · Monitor / MiniScreen            (all digital systems, per course style)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React, { useState } from "react";
import {
  CREAM,
  INK,
  SKIN,
  SIGNAL,
  COUNTER,
  COUNTER_FILL,
  r2,
  Plate,
  Monitor,
  MiniScreen,
  Pointer,
  Knob,
} from "../_visuals/kit";

const HEAD = { fontFamily: "var(--font-heading)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-body)", fontWeight: 600 } as const;

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
      <circle cx={-14} cy={-64} r={8} fill={tone} stroke={CREAM} strokeWidth={2.5} />
      {/* Upper forearm */}
      <path d="M -14 -70 L 22 -84 L 25 -74 L -10 -60 Z" fill={tone} />
      <circle cx={22} cy={-79} r={6.5} fill={tone} stroke={CREAM} strokeWidth={2} />
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
        stroke={CREAM}
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={3.5} fill={CREAM} />
    </g>
  );
}

/* ==========================================================================
   1 · Hero — Interactive Four-Revolution Chrono-Transmission
   Click any of the four industrial epochs (1st Steam, 2nd Electricity,
   3rd Digital Computing, 4th Cyber-Physical Systems) to engage its power
   train and inspect the shift from muscle & steam to smart autonomy.
   ========================================================================== */

const HERO_EPOCHS = [
  {
    num: "1st",
    era: "1760–1840",
    title: "Steam & Mechanization",
    sub: "Water, coal & iron factories",
  },
  {
    num: "2nd",
    era: "1870–1914",
    title: "Electricity & Mass Line",
    sub: "Steel, chemicals & assembly",
  },
  {
    num: "3rd",
    era: "1960s–Present",
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
      title={`Interactive four-epoch industrial transmission rising from left to right: 1st (Steam cylinder, beam, and spoked flywheel), 2nd (High-voltage electric lattice pylon and spark), 3rd (Framed screen holding a silicon microprocessor chip), and 4.0 (Framed cyber-physical screen holding an autonomous robotic arm). Currently engaged: ${current.num} — ${current.title}`}
    >
      {/* Top readout banner showing the engaged Industrial Revolution */}
      <rect x={16} y={12} width={488} height={46} fill={INK} />
      <rect x={22} y={18} width={66} height={34} fill={SIGNAL} />
      <text x={55} y={41} textAnchor="middle" {...HEAD} fontSize={19} fill={CREAM}>
        {current.num}
      </text>
      <text x={102} y={33} {...HEAD} fontSize={15.5} fill={CREAM}>
        {current.title}
      </text>
      <text x={102} y={50} {...BODY} fontSize={12.5} fill={CREAM}>
        {current.era} · {current.sub}
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
            <rect x={c.x} y={c.stepY} width={c.w} height={c.stepH} fill={tone} />

            <text x={c.cx} y={c.stepY + 34} textAnchor="middle" {...HEAD} fontSize={23} fill={CREAM}>
              {ep.num}
            </text>
            <text x={c.cx} y={c.stepY + 58} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              {ep.era}
            </text>
            {isLit && <rect x={c.x + 16} y={c.stepY + 68} width={c.w - 32} height={4} fill={CREAM} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   2 · Question: 1759 Canada — Interactive Pre-Industrial River-Valley
   Livelihood Selector & Muscle-Power Workday Instrument
   ========================================================================== */

const PATHS_1759 = [
  {
    id: "farming",
    label: "1. Farming",
    full: "1. Farming & Land Clearing",
    power: "Oxen & hand plough",
    rate: 1.2,
    unit: "bushels / day",
  },
  {
    id: "fur-timber",
    label: "2. Fur Trade",
    full: "2. Voyageur Fur & Timber",
    power: "Paddle & portage muscle",
    rate: 1.8,
    unit: "leagues / day",
  },
  {
    id: "blacksmith",
    label: "3. Blacksmith",
    full: "3. Village Blacksmith",
    power: "Hand bellows & hammer",
    rate: 0.9,
    unit: "iron tools / day",
  },
  {
    id: "cottage",
    label: "4. Spinning",
    full: "4. Cottage Spinning",
    power: "Foot treadle & wheel",
    rate: 1.5,
    unit: "skeins / day",
  },
];

export function Canada1759Interactive() {
  const [pathIdx, setPathIdx] = useState(0);
  const [hours, setHours] = useState(10);
  const chosen = PATHS_1759[pathIdx] ?? PATHS_1759[0];
  const output = r2(hours * chosen.rate);
  const barW = r2(((hours - 4) / 10) * 204);

  const zones = [
    { x: 18, w: 120, cx: 78 },
    { x: 146, w: 120, cx: 206 },
    { x: 274, w: 120, cx: 334 },
    { x: 402, w: 120, cx: 462 },
  ];

  return (
    <Plate
      w={800}
      h={268}
      title={`Interactive 1759 Canada pre-industrial career landscape: four selectable livelihoods along a river-valley profile (1. Farming plough and pine, 2. Fur trade voyageur canoe on water, 3. Blacksmith anvil and hammer, 4. Cottage spinning wheel) paired with a muscle-power workday slider (${hours} hours/day, ${output} ${chosen.unit})`}
    >
      {/* Left header */}
      <text x={20} y={28} {...HEAD} fontSize={18} fill={INK}>
        1759 Canada: Pre-Industrial Career Paths (Click to Choose)
      </text>

      {/* Continuous ground horizon across the 4 scenes */}
      <path d="M 18 190 H 522" stroke={INK} strokeWidth={3.5} />

      {zones.map((z, i) => {
        const isLit = i === pathIdx;
        const tone = isLit ? SIGNAL : INK;
        const p = PATHS_1759[i];

        return (
          <g
            key={p.id}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={p.full}
            onClick={() => setPathIdx(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPathIdx(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={z.x} y={40} width={z.w} height={214} fill="transparent" />

            {/* Scene 1: Conifer pine + wooden hand plough silhouette */}
            {i === 0 && (
              <g>
                {/* Conifer pine tree */}
                <path
                  d="M 48 64 L 30 96 H 40 L 26 124 H 38 L 24 152 H 72 L 58 124 H 70 L 56 96 H 66 Z"
                  fill={tone}
                />
                <rect x={44} y={152} width={8} height={38} fill={tone} />
                {/* Hand plough silhouette */}
                <path
                  d="M 74 182 L 104 166 L 126 132 M 96 170 L 116 130"
                  fill="none"
                  stroke={tone}
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <path d="M 68 186 L 94 186 L 88 172 Z" fill={tone} />
                <circle cx={98} cy={176} r={10} fill="none" stroke={tone} strokeWidth={4} />
              </g>
            )}

            {/* Scene 2: River channel + Voyageur birchbark canoe & paddle clear of bales */}
            {i === 1 && (
              <g>
                <rect x={150} y={154} width={112} height={34} fill={COUNTER_FILL} />
                {/* Bundled fur bales seated inside hull */}
                <rect x={174} y={134} width={22} height={14} rx={3} fill={tone} />
                <rect x={200} y={132} width={22} height={16} rx={3} fill={tone} />
                {/* Birchbark canoe silhouette with upturned prows */}
                <path
                  d="M 156 134 C 156 164 176 172 206 172 C 236 172 256 164 256 134 C 248 148 232 154 206 154 C 180 154 164 148 156 134 Z"
                  fill={tone}
                />
                {/* Upright paddle to the right of the bales */}
                <path d="M 234 78 V 114" stroke={tone} strokeWidth={4.5} strokeLinecap="round" />
                <path d="M 228 112 H 240 L 238 134 H 230 Z" fill={tone} />
              </g>
            )}

            {/* Scene 3: Horned blacksmith anvil + raised forging hammer */}
            {i === 2 && (
              <g>
                {/* Raised blacksmith hammer */}
                <path d="M 318 78 L 356 108" stroke={tone} strokeWidth={5} strokeLinecap="round" />
                <path d="M 304 88 L 324 64 L 336 74 L 316 98 Z" fill={tone} />
                {/* London-pattern horned anvil silhouette */}
                <path
                  d="M 284 134 L 310 126 H 370 V 142 L 352 152 V 170 L 366 188 H 302 L 316 170 V 148 L 284 134 Z"
                  fill={tone}
                />
              </g>
            )}

            {/* Scene 4: Cottage spoked spinning wheel on 3-legged bench */}
            {i === 3 && (
              <g>
                <SteamFlywheelGlyph cx={444} cy={116} r={28} tone={tone} />
                {/* Slanted table bench + legs + distaff spindle */}
                <path d="M 418 154 L 504 142" stroke={tone} strokeWidth={7} strokeLinecap="round" />
                <path d="M 444 144 V 152 M 430 154 L 420 188 M 486 145 L 498 188 M 458 150 L 458 188" stroke={tone} strokeWidth={4.5} />
                <path d="M 496 142 V 104" stroke={tone} strokeWidth={4} />
                <ellipse cx={496} cy={98} rx={6} ry={12} fill={tone} />
              </g>
            )}

            {/* Bottom label tab */}
            <rect x={z.x} y={198} width={z.w} height={48} fill={tone} />
            <text x={z.cx} y={228} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Divider */}
      <path d="M 536 16 V 252" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Right interactive panel: Pre-Industrial Muscle-Power Limit */}
      <text x={552} y={28} {...HEAD} fontSize={16.5} fill={INK}>
        Muscle Power
      </text>

      <rect x={552} y={42} width={232} height={58} fill={COUNTER_FILL} stroke={INK} strokeWidth={2.5} />
      <text x={564} y={64} {...HEAD} fontSize={14} fill={INK}>
        {chosen.full}
      </text>
      <text x={564} y={86} {...BODY} fontSize={13} fill={INK}>
        Power: {chosen.power}
      </text>

      {/* Output bar */}
      <text x={552} y={124} {...BODY} fontSize={14} fill={INK}>
        Daily output: {output} {chosen.unit}
      </text>
      <rect x={552} y={134} width={212} height={24} fill={CREAM} stroke={INK} strokeWidth={2.5} />
      <rect x={556} y={138} width={barW} height={16} fill={SIGNAL} />

      {/* Draggable Workday Hours Knob */}
      <text x={552} y={188} {...BODY} fontSize={14} fill={INK}>
        Daylight labor: {hours} hrs / day
      </text>
      <path d="M 564 214 H 768" stroke={INK} strokeWidth={5} />
      <Knob
        x={564}
        y={214}
        len={204}
        min={4}
        max={14}
        step={1}
        value={hours}
        onChange={setHours}
        label="Daylight manual labor hours"
        tone={SIGNAL}
      />
      <text x={564} y={246} {...BODY} fontSize={12.5} fill={INK}>
        4 hrs
      </text>
      <text x={768} y={246} textAnchor="end" {...BODY} fontSize={12.5} fill={INK}>
        14 hrs (Stamina cap)
      </text>
    </Plate>
  );
}

/* ==========================================================================
   3 · The First Industrial Revolution — Connected 6-Station Industrial
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
      title={`Interactive 18th–19th century industrial landscape with six connected stations: 1. Mechanization (meshing drive gears and belt), 2. Steam Power (Watt beam engine and flywheel), 3. Factory System (centralized sawtooth-roof mill with smokestack), 4. Textile Boom (multi-spindle power loom frame), 5. Iron and Coal (coal mine cart and iron crucible), and 6. Railroads and Canals (steam locomotive on stone viaduct over canal barge). Active: ${current.full}`}
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
                <circle cx={202} cy={87} r={5} fill={CREAM} />
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
                <circle cx={680} cy={114} r={8.5} fill={tone} stroke={CREAM} strokeWidth={2} />
                <circle cx={702} cy={114} r={8.5} fill={tone} stroke={CREAM} strokeWidth={2} />
                <circle cx={724} cy={114} r={7} fill={tone} stroke={CREAM} strokeWidth={2} />
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
            <rect x={x} y={180} width={w} height={42} fill={tone} />
            <text x={cx} y={206} textAnchor="middle" {...HEAD} fontSize={12.5} fill={CREAM}>
              {st.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   4 · First Revolution Impact on Society — Panoramic Valley Transformation
   & Interactive 1760–1850 Time Scrubber
   ========================================================================== */

const FIRST_SOCIETY_IMPACTS = [
  { num: "1", short: "1. Urbanization", full: "1. Urbanization", defaultYear: 1810 },
  { num: "2", short: "2. Working Class", full: "2. Rise of the Working Class", defaultYear: 1825 },
  { num: "3", short: "3. Transport", full: "3. Improved Transportation", defaultYear: 1835 },
  { num: "4", short: "4. Trade & Goods", full: "4. Increased Production and Trade", defaultYear: 1840 },
  { num: "5", short: "5. Environment", full: "5. Environmental Effects", defaultYear: 1850 },
];

export function FirstRevSocietySimulatorInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const [year, setYear] = useState(1830);
  const progress = r2((year - 1760) / 90); // 0..1
  const urbanPct = Math.round(15 + progress * 39);
  const tradeMult = r2(1 + progress * 7.5);
  const forestPct = Math.round(90 - progress * 52);

  const zones = [
    { x: 16, w: 98, cx: 65 },
    { x: 120, w: 98, cx: 169 },
    { x: 224, w: 98, cx: 273 },
    { x: 328, w: 98, cx: 377 },
    { x: 432, w: 98, cx: 481 },
  ];

  const handleSelect = (i: number) => {
    onSelect?.(i);
    setYear(FIRST_SOCIETY_IMPACTS[i]?.defaultYear ?? 1830);
  };

  return (
    <Plate
      w={800}
      h={256}
      title={`Interactive societal impact panorama of the First Industrial Revolution (${year}): 1. Urbanization (migration arrow into multi-storey city blocks), 2. Working Class (industrial workers under factory shift clock), 3. Transport (paddle steamship and rail), 4. Trade and Goods (stacked manufactured crates), and 5. Environment (felled tree stumps and smokestack plumes). Urban share: ${urbanPct}%, Trade output: ${tradeMult}x`}
    >
      {/* Left header */}
      <text x={18} y={26} {...HEAD} fontSize={16.5} fill={INK}>
        Societal Transformation (Click a Zone)
      </text>

      {/* Continuous baseline */}
      <path d="M 16 184 H 530" stroke={INK} strokeWidth={3.5} />

      {zones.map((z, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const imp = FIRST_SOCIETY_IMPACTS[i];

        return (
          <g
            key={imp.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={imp.full}
            onClick={() => handleSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={z.x} y={36} width={z.w} height={206} fill="transparent" />

            {/* 1. Urbanization: Rural cottage -> arrow -> dense multi-storey city tenements */}
            {i === 0 && (
              <g>
                {/* Small rural cottage on left */}
                <path d="M 18 156 L 32 142 L 46 156 V 182 H 18 Z" fill={tone} />
                <Pointer x1={34} y1={134} x2={64} y2={112} w={3.5} head={9} color={tone} />
                {/* Tall urban apartment blocks on right */}
                <path
                  d="M 68 88 H 90 V 182 H 68 Z M 73 96 H 78 V 106 H 73 Z M 81 96 H 86 V 106 H 81 Z M 73 114 H 78 V 124 H 73 Z M 81 114 H 86 V 124 H 81 Z M 73 132 H 78 V 142 H 73 Z M 81 132 H 86 V 142 H 81 Z"
                  fill={tone}
                  fillRule="evenodd"
                />
                <path
                  d="M 92 70 H 112 V 182 H 92 Z M 96 78 H 101 V 88 H 96 Z M 103 78 H 108 V 88 H 103 Z M 96 96 H 101 V 106 H 96 Z M 103 96 H 108 V 106 H 103 Z M 96 114 H 101 V 124 H 96 Z M 103 114 H 108 V 124 H 103 Z"
                  fill={tone}
                  fillRule="evenodd"
                />
              </g>
            )}

            {/* 2. Rise of the Working Class: Factory shift clock + three capped worker silhouettes */}
            {i === 1 && (
              <g>
                {/* Factory shift clock above */}
                <circle cx={169} cy={76} r={20} fill="none" stroke={tone} strokeWidth={4} />
                <path d="M 169 76 V 63 M 169 76 L 180 82" stroke={tone} strokeWidth={3.5} strokeLinecap="round" />
                {/* Three industrial workers in profile */}
                {[140, 169, 198].map((wx) => (
                  <g key={wx}>
                    <circle cx={wx} cy={126} r={9} fill={tone} />
                    {/* Flat worker cap visor */}
                    <path d={`M ${wx - 10} 121 H ${wx + 13} L ${wx + 9} 115 H ${wx - 8} Z`} fill={tone} />
                    <path
                      d={`M ${wx - 12} 182 V 146 C ${wx - 12} 139 ${wx + 12} 139 ${wx + 12} 146 V 182 Z`}
                      fill={tone}
                    />
                  </g>
                ))}
              </g>
            )}

            {/* 3. Improved Transportation: Side-wheel paddle steamship on water */}
            {i === 2 && (
              <g>
                <rect x={228} y={154} width={90} height={28} fill={COUNTER_FILL} />
                {/* Tall steamship funnel + smoke puff */}
                <rect x={268} y={88} width={10} height={38} fill={tone} />
                <circle cx={260} cy={76} r={8} fill={tone} />
                <circle cx={248} cy={68} r={10} fill={tone} />
                {/* Hull + paddle wheel housing */}
                <path d="M 232 126 H 314 L 304 156 H 242 Z" fill={tone} />
                <circle cx={273} cy={146} r={14} fill={tone} stroke={CREAM} strokeWidth={2.5} />
                <path d="M 263 146 H 283 M 273 136 V 156" stroke={CREAM} strokeWidth={2} />
              </g>
            )}

            {/* 4. Increased Production and Trade: Stacked manufactured crates + crane hook */}
            {i === 3 && (
              <g>
                {/* Overhead dock crane hook */}
                <path d="M 377 48 V 72" stroke={tone} strokeWidth={3.5} />
                <path d="M 365 86 L 377 72 L 389 86" fill="none" stroke={tone} strokeWidth={3} />
                {/* Growing pyramid of manufactured crates */}
                <rect x={334} y={156} width={26} height={26} fill={tone} />
                <rect x={364} y={156} width={26} height={26} fill={tone} />
                <rect x={394} y={156} width={26} height={26} fill={tone} />
                <rect x={349} y={126} width={26} height={26} fill={tone} />
                <rect x={379} y={126} width={26} height={26} fill={tone} />
                {year >= 1800 && <rect x={364} y={96} width={26} height={26} fill={tone} />}
              </g>
            )}

            {/* 5. Environmental Effects: Felled tree stumps (deforestation) + twin smokestacks */}
            {i === 4 && (
              <g>
                {/* Twin industrial chimneys + dark smoke cloud */}
                <path d="M 442 96 H 452 L 455 182 H 439 Z" fill={tone} />
                <path d="M 462 106 H 472 L 475 182 H 459 Z" fill={tone} />
                <path
                  d="M 446 84 C 446 72 458 66 468 72 C 476 62 494 64 498 76 C 510 76 516 88 506 96 H 452 C 444 96 442 90 446 84 Z"
                  fill={tone}
                />
                {/* Deforestation: tree stumps on the right */}
                <path d="M 484 182 L 488 158 H 502 L 506 182 Z" fill={tone} />
                <path d="M 508 182 L 512 162 H 524 L 528 182 Z" fill={tone} />
                {year < 1815 && (
                  <path d="M 495 116 L 482 154 H 508 Z" fill={tone} />
                )}
              </g>
            )}

            {/* Bottom label tab */}
            <rect x={z.x} y={192} width={z.w} height={46} fill={tone} />
            <text x={z.cx} y={220} textAnchor="middle" {...HEAD} fontSize={11.5} fill={CREAM}>
              {imp.short}
            </text>
          </g>
        );
      })}

      {/* Divider */}
      <path d="M 542 16 V 242" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Right panel: Interactive Year Scrubber (1760 -> 1850) */}
      <text x={556} y={26} {...HEAD} fontSize={17} fill={INK}>
        Year: {year}
      </text>

      {/* Three live indicators driven by the year slider */}
      <text x={556} y={54} {...BODY} fontSize={13} fill={INK}>
        Urban share: {urbanPct}%
      </text>
      <rect x={556} y={62} width={220} height={14} fill={CREAM} stroke={INK} strokeWidth={2} />
      <rect x={559} y={65} width={r2((urbanPct / 60) * 214)} height={8} fill={SIGNAL} />

      <text x={556} y={98} {...BODY} fontSize={13} fill={INK}>
        Manufactured goods: {tradeMult}×
      </text>
      <rect x={556} y={106} width={220} height={14} fill={CREAM} stroke={INK} strokeWidth={2} />
      <rect x={559} y={109} width={r2((tradeMult / 9) * 214)} height={8} fill={INK} />

      <text x={556} y={142} {...BODY} fontSize={13} fill={INK}>
        Forest cover left: {forestPct}%
      </text>
      <rect x={556} y={150} width={220} height={14} fill={CREAM} stroke={INK} strokeWidth={2} />
      <rect x={559} y={153} width={r2((forestPct / 100) * 214)} height={8} fill={COUNTER} />

      {/* Year slider Knob */}
      <text x={556} y={190} {...BODY} fontSize={13.5} fill={INK}>
        Drag timeline (1760–1850):
      </text>
      <path d="M 568 212 H 768" stroke={INK} strokeWidth={5} />
      <Knob
        x={568}
        y={212}
        len={200}
        min={1760}
        max={1850}
        step={5}
        value={year}
        onChange={setYear}
        label="First Industrial Revolution year"
        tone={SIGNAL}
      />
      <text x={568} y={240} {...BODY} fontSize={12} fill={INK}>
        1760
      </text>
      <text x={768} y={240} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        1850
      </text>
    </Plate>
  );
}

/* ==========================================================================
   5 · Question: 1890 — The 1890 Schoolhouse Reskilling Bridge & Career
   Switchyard (Interactive)
   ========================================================================== */

const PATHS_1890 = [
  {
    num: "1",
    label: "1. Railway Engineer",
    from: "Horse-cart teamster",
    skill: "Steam boilers & rail tables",
  },
  {
    num: "2",
    label: "2. Telegraph Operator",
    from: "Courier & post rider",
    skill: "Morse code & circuits",
  },
  {
    num: "3",
    label: "3. Steel Machinist",
    from: "Village blacksmith",
    skill: "Precision gauges & steel",
  },
  {
    num: "4",
    label: "4. Factory Bookkeeper",
    from: "Cottage shopkeeper",
    skill: "Literacy & accounting",
  },
];

export function Transition1890BridgeInteractive() {
  const [career, setCareer] = useState(0);
  const current = PATHS_1890[career] ?? PATHS_1890[0];
  const rowYs = [38, 92, 146, 200];
  const startYs = [106, 128, 150, 172];

  return (
    <Plate
      w={800}
      h={252}
      title={`Interactive 1890 career transition diagram: on the left, displaced pre-industrial craft work (${current.from}); in the center, an 1890 schoolhouse with bell cupola teaching ${current.skill}; on the right, four selectable 1890 industrial career paths with ${current.label} highlighted in red`}
    >
      {/* Left panel: Prior Pre-Industrial / Craft Job */}
      <rect x={16} y={20} width={192} height={214} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <text x={112} y={46} textAnchor="middle" {...HEAD} fontSize={16} fill={INK}>
        Previous Trade
      </text>
      {/* Hand wheel + horse cart wheel + anvil silhouette */}
      <SteamFlywheelGlyph cx={78} cy={104} r={24} tone={INK} />
      <path d="M 118 126 L 132 120 H 172 V 130 L 160 138 V 150 H 126 V 136 Z" fill={INK} />
      <rect x={26} y={160} width={172} height={58} fill={INK} />
      <text x={112} y={183} textAnchor="middle" {...BODY} fontSize={12.5} fill={CREAM}>
        From:
      </text>
      <text x={112} y={204} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
        {current.from}
      </text>

      {/* Arrow from Previous Trade -> 1890 Schoolhouse */}
      <Pointer x1={212} y1={134} x2={252} y2={134} w={4} head={11} color={SIGNAL} />

      {/* Center: The 1890 Schoolhouse (Reskilling Pivot) */}
      <g>
        {/* Bell cupola on top of pitched roof */}
        <path d="M 342 34 L 360 18 L 378 34 V 56 H 342 Z" fill={INK} />
        <circle cx={360} cy={44} r={5} fill={CREAM} />
        {/* Pitched roof */}
        <path d="M 252 94 L 360 50 L 468 94 Z" fill={INK} />
        {/* Schoolhouse main hall */}
        <rect x={256} y={94} width={208} height={140} fill={INK} />
        {/* Interior chalkboard screen (cream inset) */}
        <rect x={268} y={104} width={184} height={76} fill={CREAM} />
        <text x={360} y={128} textAnchor="middle" {...HEAD} fontSize={16.5} fill={SIGNAL}>
          1890 Schoolhouse
        </text>
        <text x={360} y={149} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
          Reskilling &amp; Literacy:
        </text>
        <text x={360} y={168} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
          {current.skill}
        </text>
        {/* Schoolhouse steps at base */}
        <text x={360} y={212} textAnchor="middle" {...BODY} fontSize={13} fill={CREAM}>
          Transition Bridge
        </text>
      </g>

      {/* Branching arrows from Schoolhouse -> 4 Career Paths */}
      {rowYs.map((ry, i) => {
        const isLit = i === career;
        return (
          <Pointer
            key={ry}
            x1={472}
            y1={startYs[i]}
            x2={514}
            y2={ry + 21}
            w={isLit ? 4.5 : 2.5}
            head={10}
            color={isLit ? SIGNAL : INK}
          />
        );
      })}

      {/* Right column: 4 Selectable 1890 Career Paths */}
      <text x={650} y={24} textAnchor="middle" {...HEAD} fontSize={16} fill={INK}>
        Choose 1890 Career Path
      </text>

      {PATHS_1890.map((p, i) => {
        const ry = rowYs[i];
        const isLit = i === career;
        const tone = isLit ? SIGNAL : INK;

        return (
          <g
            key={p.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={p.label}
            onClick={() => setCareer(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCareer(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={518} y={ry} width={266} height={42} fill={tone} />
            {/* Small bespoke emblem inside each career bar */}
            <rect x={524} y={ry + 6} width={34} height={30} fill={CREAM} />
            {i === 0 && (
              <g>
                <rect x={529} y={ry + 16} width={24} height={10} fill={tone} />
                <rect x={545} y={ry + 10} width={5} height={8} fill={tone} />
                <circle cx={535} cy={ry + 29} r={3.5} fill={tone} />
                <circle cx={547} cy={ry + 29} r={3.5} fill={tone} />
              </g>
            )}
            {i === 1 && (
              <g>
                <path d={`M 529 ${ry + 28} H 553`} stroke={tone} strokeWidth={3} />
                <path d={`M 533 ${ry + 20} L 549 ${ry + 14}`} stroke={tone} strokeWidth={3} />
                <circle cx={549} cy={ry + 14} r={3.5} fill={tone} />
              </g>
            )}
            {i === 2 && (
              <g>
                {/* I-beam cross section silhouette */}
                <path
                  d={`M 530 ${ry + 11} H 552 V ${ry + 16} H 544 V ${ry + 26} H 552 V ${ry + 31} H 530 V ${ry + 26} H 538 V ${ry + 16} H 530 Z`}
                  fill={tone}
                />
              </g>
            )}
            {i === 3 && (
              <g>
                {/* Accounting ledger grid */}
                <rect x={531} y={ry + 10} width={20} height={22} fill={tone} />
                <path d={`M 535 ${ry + 16} H 547 M 535 ${ry + 22} H 547`} stroke={CREAM} strokeWidth={2} />
              </g>
            )}
            <text x={570} y={ry + 27} {...HEAD} fontSize={15.5} fill={CREAM}>
              {p.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   6 · The Second Industrial Revolution — High-Voltage Power Grid & 5-Station
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
      <rect x={8} y={5} width={16} height={7} fill={CREAM} />
      <circle cx={11} cy={22} r={6} fill={tone} stroke={CREAM} strokeWidth={1.8} />
      <circle cx={35} cy={22} r={6} fill={tone} stroke={CREAM} strokeWidth={1.8} />
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
                <path d="M 490 118 H 530" stroke={CREAM} strokeWidth={3} />
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
            <rect x={x} y={186} width={w} height={44} fill={tone} />
            <text x={cx} y={214} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              {st.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   7 · Second Revolution: Key Inventions — Interactive Patent Grid & Live
   Mechanism Chamber (Edison 1879, Combustion Engine, Marconi 1895, Ford 1913)
   ========================================================================== */

const KEY_INVENTIONS_2 = [
  {
    num: "1",
    year: "1879",
    short: "1. Light Bulb",
    title: "1. Electric Light Bulb (Thomas Edison, 1879)",
    sub: "Enabled night-time work & extended productivity",
  },
  {
    num: "2",
    year: "1885",
    short: "2. Combustion",
    title: "2. Internal Combustion Engine",
    sub: "Powered automobiles & transformed transportation",
  },
  {
    num: "3",
    year: "1895",
    short: "3. Radio Waves",
    title: "3. Radio Waves (Guglielmo Marconi, 1895)",
    sub: "First wireless communication across distance",
  },
  {
    num: "4",
    year: "1913",
    short: "4. Assembly Line",
    title: "4. Automobile Production Line (Henry Ford, 1913)",
    sub: "Reduced build time from 12.5 hrs to 93 min",
  },
];

export function InventionsWorkbenchInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const [power, setPower] = useState(85);
  const current = KEY_INVENTIONS_2[active] ?? KEY_INVENTIONS_2[0];
  const frac = r2(power / 100);

  const cards = [
    { x: 16, y: 38, w: 156, h: 98, cx: 94 },
    { x: 182, y: 38, w: 156, h: 98, cx: 260 },
    { x: 16, y: 146, w: 156, h: 98, cx: 94 },
    { x: 182, y: 146, w: 156, h: 98, cx: 260 },
  ];

  return (
    <Plate
      w={800}
      h={256}
      title={`Interactive Second Industrial Revolution Key Inventions workbench: on the left, four selectable patent plates (1879 Electric Light Bulb, Internal Combustion Engine, 1895 Radio Waves, 1913 Automobile Production Line); on the right, an interactive mechanism chamber demonstrating ${current.title} at ${power}% intensity`}
    >
      <text x={18} y={26} {...HEAD} fontSize={17} fill={INK}>
        Select Key Invention (1–4)
      </text>

      {cards.map((c, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const inv = KEY_INVENTIONS_2[i];

        return (
          <g
            key={inv.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={inv.title}
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
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              fill={isLit ? COUNTER_FILL : CREAM}
              stroke={tone}
              strokeWidth={isLit ? 4 : 2.5}
            />
            {/* Year badge in top-left corner */}
            <rect x={c.x + 8} y={c.y + 8} width={44} height={22} fill={tone} />
            <text x={c.x + 30} y={c.y + 24} textAnchor="middle" {...HEAD} fontSize={12.5} fill={CREAM}>
              {inv.year}
            </text>

            {/* Bespoke silhouette glyph on the right side of each patent card */}
            {i === 0 && (
              <g>
                {/* Edison pear bulb + filament loop + screw base */}
                <circle cx={c.x + 114} cy={c.y + 34} r={16} fill={tone} />
                <path
                  d={`M ${c.x + 109} ${c.y + 42} V ${c.y + 28} A 5 5 0 0 1 ${c.x + 119} ${c.y + 28} V ${c.y + 42}`}
                  fill="none"
                  stroke={CREAM}
                  strokeWidth={2}
                />
                <rect x={c.x + 107} y={c.y + 48} width={14} height={10} fill={tone} />
              </g>
            )}
            {i === 1 && (
              <g>
                {/* Cutaway piston cylinder + connecting rod + crank */}
                <rect x={c.x + 98} y={c.y + 14} width={32} height={44} fill="none" stroke={tone} strokeWidth={3.5} />
                <rect x={c.x + 103} y={c.y + 22} width={22} height={12} fill={tone} />
                <path d={`M ${c.x + 114} ${c.y + 34} V ${c.y + 52}`} stroke={tone} strokeWidth={3.5} />
                <circle cx={c.x + 114} cy={c.y + 52} r={5} fill={tone} />
              </g>
            )}
            {i === 2 && (
              <g>
                {/* Marconi radio mast + radiating wave arcs */}
                <path d={`M ${c.x + 94} ${c.y + 56} L ${c.x + 100} ${c.y + 18} H ${c.x + 104} L ${c.x + 110} ${c.y + 56} Z`} fill={tone} />
                <path
                  d={`M ${c.x + 114} ${c.y + 18} A 14 14 0 0 1 ${c.x + 114} ${c.y + 40} M ${c.x + 122} ${c.y + 12} A 22 22 0 0 1 ${c.x + 122} ${c.y + 46}`}
                  fill="none"
                  stroke={tone}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            )}
            {i === 3 && (
              <g>
                <ModelTCarGlyph x={c.x + 88} y={c.y + 20} k={1.05} tone={tone} />
                <path d={`M ${c.x + 82} ${c.y + 52} H ${c.x + 144}`} stroke={tone} strokeWidth={4} />
              </g>
            )}

            {/* Bottom label bar inside card */}
            <rect x={c.x} y={c.y + 66} width={c.w} height={32} fill={tone} />
            <text x={c.cx} y={c.y + 87} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              {inv.short}
            </text>
          </g>
        );
      })}

      {/* Right Interactive Chamber */}
      <rect x={356} y={14} width={428} height={230} fill={CREAM} stroke={INK} strokeWidth={3.5} />
      <rect x={356} y={14} width={428} height={38} fill={INK} />
      <text x={370} y={38} {...HEAD} fontSize={14.5} fill={CREAM}>
        {current.title}
      </text>

      {/* Chamber Scene 0: 1879 Electric Light Bulb -> Night-time factory work */}
      {active === 0 && (
        <g>
          {/* Hanging Edison bulb with socket cap in the center */}
          <path d="M 446 52 V 66" stroke={INK} strokeWidth={4} />
          <rect x={438} y={66} width={16} height={10} fill={INK} />
          <circle cx={446} cy={98} r={24} fill={SIGNAL} />
          <path d="M 439 108 V 88 A 7 7 0 0 1 453 88 V 108" fill="none" stroke={CREAM} strokeWidth={2.5} />
          {/* Light rays when power > 20 */}
          {power >= 20 &&
            [-50, -25, 0, 25, 50].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = r2(446 + Math.cos(rad) * 30);
              const y1 = r2(98 + Math.sin(rad) * 30);
              const x2 = r2(446 + Math.cos(rad) * (34 + frac * 18));
              const y2 = r2(98 + Math.sin(rad) * (34 + frac * 18));
              return <path key={deg} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={SIGNAL} strokeWidth={3.5} strokeLinecap="round" />;
            })}

          {/* Night-shift factory windows on right */}
          <rect x={534} y={66} width={224} height={96} fill={INK} />
          <text x={646} y={86} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
            Night-Time Factory Shift ({Math.round(10 + frac * 14)} hrs/day)
          </text>
          {[552, 602, 652, 702].map((wx, wi) => {
            const windowLit = frac * 4 > wi;
            return (
              <rect
                key={wx}
                x={wx}
                y={98}
                width={38}
                height={48}
                fill={windowLit ? SIGNAL : CREAM}
              />
            );
          })}
        </g>
      )}

      {/* Chamber Scene 1: Internal Combustion Engine -> Piston stroke & motorcar */}
      {active === 1 && (
        <g>
          {/* Cutaway cylinder & reciprocating piston on left */}
          <rect x={392} y={64} width={68} height={96} fill="none" stroke={INK} strokeWidth={4} />
          {/* Spark at top of cylinder */}
          <circle cx={426} cy={72} r={6} fill={SIGNAL} />
          {/* Piston head moving with slider */}
          <rect x={398} y={r2(80 + (1 - frac) * 28)} width={56} height={20} fill={SIGNAL} />
          <path d={`M 426 ${r2(100 + (1 - frac) * 28)} V 144`} stroke={INK} strokeWidth={5} />
          <circle cx={426} cy={144} r={10} fill={INK} />

          {/* Road & motorcar propelled rightward by throttle */}
          <path d="M 488 152 H 760" stroke={INK} strokeWidth={4} />
          <ModelTCarGlyph x={r2(496 + frac * 170)} y={118} k={1.35} tone={SIGNAL} />
          <text x={624} y={86} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
            Engine Output: {Math.round(12 + frac * 38)} mph
          </text>
        </g>
      )}

      {/* Chamber Scene 2: 1895 Radio Waves -> Marconi wireless transmission */}
      {active === 2 && (
        <g>
          {/* Transmitter tower on left */}
          <path d="M 388 160 L 402 68 H 412 L 426 160 H 417 L 407 96 L 397 160 Z" fill={SIGNAL} />
          <rect x={384} y={82} width={46} height={5} fill={SIGNAL} />

          {/* Concentric wireless radio wave arcs propagating across the gap */}
          {[1, 2, 3, 4].map((step) => {
            const visible = frac * 4 >= step - 0.2;
            const r = step * 48;
            return (
              <path
                key={step}
                d={`M ${r2(416 + r * 0.7)} ${r2(114 - r * 0.42)} A ${r} ${r} 0 0 1 ${r2(416 + r * 0.7)} ${r2(114 + r * 0.42)}`}
                fill="none"
                stroke={visible ? SIGNAL : COUNTER_FILL}
                strokeWidth={4}
                strokeLinecap="round"
              />
            );
          })}

          {/* Receiver mast on right */}
          <path d="M 714 160 L 728 68 H 738 L 752 160 H 743 L 733 96 L 723 160 Z" fill={frac > 0.7 ? SIGNAL : INK} />
          <rect x={710} y={82} width={46} height={5} fill={frac > 0.7 ? SIGNAL : INK} />
          <path d="M 376 160 H 764" stroke={INK} strokeWidth={3.5} />
        </g>
      )}

      {/* Chamber Scene 3: 1913 Ford Automobile Production Line */}
      {active === 3 && (
        <g>
          <text x={570} y={76} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
            Assembly Time: {r2(12.5 - frac * 10.95)} hrs ({Math.round(750 - frac * 657)} min / car)
          </text>
          {/* Moving assembly belt */}
          <rect x={382} y={136} width={376} height={24} rx={12} fill="none" stroke={INK} strokeWidth={4.5} />
          {[406, 460, 514, 568, 622, 676, 730].map((rx) => (
            <circle key={rx} cx={rx} cy={148} r={5.5} fill={INK} />
          ))}
          {/* 4 standardized cars along the line */}
          {[396, 488, 580, 672].map((cx, ci) => (
            <ModelTCarGlyph
              key={cx}
              x={cx}
              y={100}
              k={1.15}
              tone={ci <= Math.floor(frac * 3.9) ? SIGNAL : INK}
            />
          ))}
        </g>
      )}

      {/* Interactive control slider at bottom of right chamber */}
      <text x={374} y={190} {...BODY} fontSize={13} fill={INK}>
        {current.sub}
      </text>
      <path d="M 384 214 H 748" stroke={INK} strokeWidth={5} />
      <Knob
        x={384}
        y={214}
        len={364}
        min={0}
        max={100}
        step={5}
        value={power}
        onChange={setPower}
        label="Invention intensity slider"
        tone={SIGNAL}
      />
    </Plate>
  );
}

/* ==========================================================================
   8 · Second Revolution Impact on Society — Panoramic 6-Zone Metropolis
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
                <rect x={162} y={40} width={86} height={32} fill={CREAM} />
                {/* Starburst ad mark + bold ad bars */}
                <circle cx={182} cy={56} r={9} fill={tone} />
                <rect x={198} y={48} width={42} height={6} fill={tone} />
                <rect x={198} y={58} width={30} height={6} fill={tone} />
                <path d="M 172 78 V 94 M 238 78 V 94" stroke={tone} strokeWidth={4} />
                {/* Street-level showcase window with 3 distinct product silhouettes */}
                <rect x={156} y={94} width={98} height={74} fill="none" stroke={tone} strokeWidth={4} />
                {/* Product 1: bottle; Product 2: bowler hat; Product 3: radio/appliance */}
                <path d="M 170 156 V 126 H 174 V 114 H 180 V 126 H 184 V 156 Z" fill={tone} />
                <path d="M 192 146 H 220 V 152 H 192 Z M 196 146 C 196 130 216 130 216 146 Z" fill={tone} />
                <rect x={226} y={124} width={18} height={32} rx={3} fill={tone} />
                <circle cx={235} cy={135} r={4} fill={CREAM} />
              </g>
            )}

            {/* 3. New Job Opportunities: Industrial corporation management org chart */}
            {i === 2 && (
              <g>
                {/* Top executive management node */}
                <rect x={305} y={38} width={56} height={30} fill={tone} />
                <circle cx={333} cy={49} r={5} fill={CREAM} />
                <path d="M 323 63 C 323 56 343 56 343 63 Z" fill={CREAM} />
                {/* Org-chart tree connectors */}
                <path d="M 333 68 V 92 M 294 92 H 372 M 294 92 V 108 M 333 92 V 108 M 372 92 V 108" stroke={tone} strokeWidth={3.5} />
                {/* Three department manager/workforce nodes */}
                {[278, 317, 356].map((nx) => (
                  <g key={nx}>
                    <rect x={nx} y={108} width={32} height={54} fill={tone} />
                    <circle cx={nx + 16} cy={124} r={5} fill={CREAM} />
                    <path d={`M ${nx + 7} 142 C ${nx + 7} 134 ${nx + 25} 134 ${nx + 25} 142 Z`} fill={CREAM} />
                    <rect x={nx + 6} y={148} width={20} height={6} fill={CREAM} />
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
                <rect x={543} y={45} width={26} height={4.5} fill={CREAM} />
                <rect x={543} y={53} width={18} height={4.5} fill={CREAM} />
                <path d="M 556 64 V 108" stroke={tone} strokeWidth={3.5} />

                <rect x={601} y={44} width={38} height={26} fill={tone} />
                <rect x={607} y={51} width={26} height={4.5} fill={CREAM} />
                <rect x={607} y={59} width={18} height={4.5} fill={CREAM} />
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
                <path d="M 730 130 H 764 M 730 150 H 764" stroke={CREAM} strokeWidth={2.5} />
              </g>
            )}

            {/* Bottom station nameplate */}
            <rect x={x} y={182} width={w} height={44} fill={tone} />
            <text x={cx} y={210} textAnchor="middle" {...HEAD} fontSize={12.5} fill={CREAM}>
              {imp.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   9 · Questions: 1932 — Riveted Steel Skyscraper Girder Balance (How Work
   Improved vs. How Work Worsened by 1932)
   ========================================================================== */

export function WorkerBalance1932Interactive() {
  const [side, setSide] = useState<0 | 1>(0);
  const [pace, setPace] = useState(65);
  const tiltDeg = r2(((pace - 50) / 50) * 5); // -5 to +5 deg
  const impTone = side === 0 ? SIGNAL : INK;
  const worTone = side === 1 ? SIGNAL : INK;

  return (
    <Plate
      w={800}
      h={256}
      title={`Interactive 1932 riveted steel girder balance comparing how industrial work improved (left pan: electric light, affordable goods, medical and living standards) versus how it worsened (right pan: repetitive assembly pace, unsafe high-steel hazards, long hours and displacement) at ${pace}% line pace`}
    >
      {/* Top title */}
      <text x={20} y={26} {...HEAD} fontSize={17.5} fill={INK}>
        1932 Industrial Work Balance (Click Side or Drag Line Speed)
      </text>

      {/* Central 1932 riveted steel truss fulcrum */}
      <path d="M 366 184 L 392 68 H 408 L 434 184 Z" fill={INK} />
      <rect x={352} y={180} width={96} height={12} fill={INK} />
      <text x={400} y={168} textAnchor="middle" {...HEAD} fontSize={16} fill={CREAM}>
        1932
      </text>

      {/* Tilting riveted steel I-beam girder */}
      <g transform={`rotate(${tiltDeg} 400 66)`}>
        <rect x={140} y={58} width={520} height={16} fill={INK} />
        {[180, 230, 280, 330, 470, 520, 570, 620].map((rx) => (
          <circle key={rx} cx={rx} cy={66} r={2.5} fill={CREAM} />
        ))}
        <circle cx={400} cy={66} r={6} fill={SIGNAL} />
      </g>

      {/* Left Pan: How It Improved (clickable) */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={side === 0}
        aria-label="In what aspects has it improved?"
        onClick={() => setSide(0)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSide(0);
          }
        }}
        className="cursor-pointer"
      >
        <path d="M 180 66 V 106" stroke={impTone} strokeWidth={4} />
        <rect
          x={24}
          y={106}
          width={312}
          height={82}
          fill={side === 0 ? COUNTER_FILL : CREAM}
          stroke={impTone}
          strokeWidth={side === 0 ? 4 : 2.5}
        />
        <rect x={24} y={106} width={312} height={28} fill={impTone} />
        <text x={180} y={125} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
          1. How It Improved (Output +{Math.round(80 + pace * 2.2)}%)
        </text>

        {/* Three silhouettes inside Improved pan: Light bulb, Model-T car, Medical cross */}
        <circle cx={66} cy={156} r={12} fill={impTone} />
        <rect x={61} y={168} width={10} height={6} fill={impTone} />
        <text x={86} y={161} {...BODY} fontSize={12.5} fill={INK}>
          Lighting
        </text>

        <ModelTCarGlyph x={148} y={144} k={0.9} tone={impTone} />
        <text x={198} y={161} {...BODY} fontSize={12.5} fill={INK}>
          Goods
        </text>

        <path d="M 262 144 H 272 V 152 H 280 V 162 H 272 V 170 H 262 V 162 H 254 V 152 H 262 Z" fill={impTone} />
        <text x={286} y={161} {...BODY} fontSize={12.5} fill={INK}>
          Health
        </text>
      </g>

      {/* Right Pan: How It Worsened (clickable) */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={side === 1}
        aria-label="In what aspects has it worsened?"
        onClick={() => setSide(1)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSide(1);
          }
        }}
        className="cursor-pointer"
      >
        <path d="M 620 66 V 106" stroke={worTone} strokeWidth={4} />
        <rect
          x={464}
          y={106}
          width={312}
          height={82}
          fill={side === 1 ? COUNTER_FILL : CREAM}
          stroke={worTone}
          strokeWidth={side === 1 ? 4 : 2.5}
        />
        <rect x={464} y={106} width={312} height={28} fill={worTone} />
        <text x={620} y={125} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
          2. How It Worsened (Strain {pace}%)
        </text>

        {/* Three silhouettes inside Worsened pan: Gear monotony, Hazard triangle, Long shift clock */}
        <GearWheelGlyph cx={498} cy={158} r={15} tone={worTone} />
        <text x={518} y={162} {...BODY} fontSize={12.5} fill={INK}>
          Monotony
        </text>

        <path d="M 604 142 L 620 172 H 588 Z" fill={worTone} />
        <rect x={602} y={151} width={4} height={11} fill={CREAM} />
        <circle cx={604} cy={167} r={2} fill={CREAM} />
        <text x={626} y={162} {...BODY} fontSize={12.5} fill={INK}>
          Hazards
        </text>

        <circle cx={702} cy={158} r={14} fill="none" stroke={worTone} strokeWidth={3.5} />
        <path d="M 702 158 V 149 M 702 158 L 710 162" stroke={worTone} strokeWidth={3} strokeLinecap="round" />
        <text x={722} y={162} {...BODY} fontSize={12.5} fill={INK}>
          Hours
        </text>
      </g>

      {/* Bottom Interactive Slider: Assembly Line Speed & Mechanization */}
      <text x={24} y={224} {...BODY} fontSize={13.5} fill={INK}>
        Assembly pace: {pace}%
      </text>
      <path d="M 190 220 H 756" stroke={INK} strokeWidth={5} />
      <Knob
        x={190}
        y={220}
        len={566}
        min={10}
        max={100}
        step={5}
        value={pace}
        onChange={setPace}
        label="1932 assembly line speed and mechanization"
        tone={SIGNAL}
      />
    </Plate>
  );
}

/* ==========================================================================
   10 · The Third Industrial Revolution (Digital Revolution) — Silicon Wafer
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
            <circle cx={cx} cy={30} r={2} fill={CREAM} />
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
                <circle cx={513} cy={92} r={5} fill={tone} stroke={CREAM} strokeWidth={1.5} />
                {/* Solar photovoltaic panel array on stand */}
                <path d="M 548 148 L 566 112 H 618 L 600 148 Z" fill={tone} />
                <path d="M 557 130 H 609 M 584 112 L 566 148 M 601 112 L 583 148" stroke={CREAM} strokeWidth={2} />
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
            <rect x={x} y={180} width={w} height={44} fill={tone} />
            <text x={cx} y={208} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
              {st.short}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   11 · Key Innovations ("Innovation Replaces Invention") — Interactive
   Compounding Platform Wave from Silicon Hardware to AI/ML (1970s–Present)
   ========================================================================== */

const THIRD_INNOVATIONS = [
  { num: "1", era: "1970s–80s", short: "1. Personal PCs", full: "1. Personal Computers (1970s-1980s)" },
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
      title={`Interactive diagram showing how innovation replaces physical invention: on the left, the physical transistor and microprocessor base (Invention); to the right, five ascending digital platform innovations on framed screens (1. Personal Computers, 2. The Internet, 3. Mobile Technology, 4. E-Commerce, and 5. Artificial Intelligence and Machine Learning). Active: ${current.full}`}
    >
      {/* Left Foundation Block: Hardware Invention (Transistor / Chip) */}
      <rect x={16} y={38} width={116} height={192} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <text x={74} y={64} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
        Invention
      </text>
      <SiliconChipGlyph cx={74} cy={116} s={44} tone={INK} />
      <rect x={24} y={166} width={100} height={52} fill={INK} />
      <text x={74} y={189} textAnchor="middle" {...BODY} fontSize={12} fill={CREAM}>
        1947 / 1971
      </text>
      <text x={74} y={207} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
        Silicon Base
      </text>

      {/* Arrow from Invention -> Platform Innovations */}
      <Pointer x1={134} y1={134} x2={160} y2={134} w={4} head={10} color={SIGNAL} />

      {/* Top banner over the 5 Platform Innovations */}
      <text x={472} y={26} textAnchor="middle" {...HEAD} fontSize={17} fill={INK}>
        Platform Innovations Built on Digital Foundations (Click 1–5)
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
                  <path d={`M ${x + 46} 68 V 92 M ${x + 34} 78 H ${x + 58}`} stroke={CREAM} strokeWidth={2} />
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
            <rect x={x} y={stepY} width={w} height={stepH} fill={tone} />
            <text x={cx} y={stepY + 24} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
              {inv.short}
            </text>
            <text x={cx} y={stepY + 44} textAnchor="middle" {...BODY} fontSize={12} fill={CREAM}>
              {inv.era}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   12 · Question: 2006 — Workplace Analog-to-Digital Adaptation Switchboard
   (Interactive)
   ========================================================================== */

const ADAPT_2006 = [
  {
    num: "1",
    short: "1. Records & Data",
    analog: "Paper filing cabinets",
    digital: "PC databases & spreadsheets",
  },
  {
    num: "2",
    short: "2. Communication",
    analog: "Postal mail & memos",
    digital: "Email & instant web portals",
  },
  {
    num: "3",
    short: "3. Commerce",
    analog: "Local walk-in counter",
    digital: "24/7 global e-commerce",
  },
  {
    num: "4",
    short: "4. Field Work",
    analog: "Fixed desk & paper map",
    digital: "Mobile wireless devices",
  },
];

export function Workflow2006AdapterInteractive() {
  const [col, setCol] = useState(0);
  const current = ADAPT_2006[col] ?? ADAPT_2006[0];
  const xs = [18, 210, 402, 594];
  const w = 188;

  return (
    <Plate
      w={800}
      h={256}
      title={`Interactive 2006 workplace adaptation switchboard with four job domains converting from physical tools on top to framed digital screens below: 1. Records and Data (filing cabinet to database screen), 2. Communication (paper post to web/email screen), 3. Commerce (cash register to e-commerce screen), and 4. Field Work (clipboard to wireless mobile screen). Active: ${current.short} — ${current.analog} to ${current.digital}`}
    >
      {/* Top interactive status header */}
      <rect x={18} y={12} width={764} height={36} fill={INK} />
      <text x={32} y={35} {...HEAD} fontSize={14.5} fill={CREAM}>
        2006 Job Adaptation — {current.short}:
      </text>
      <text x={768} y={35} textAnchor="end" {...BODY} fontSize={13.5} fill={CREAM}>
        {current.analog} → {current.digital}
      </text>

      {xs.map((x, i) => {
        const cx = r2(x + w / 2);
        const isLit = i === col;
        const tone = isLit ? SIGNAL : INK;
        const item = ADAPT_2006[i];

        return (
          <g
            key={item.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`${item.short}: ${item.analog} to ${item.digital}`}
            onClick={() => setCol(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCol(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect
              x={x}
              y={56}
              width={w}
              height={188}
              fill={isLit ? COUNTER_FILL : CREAM}
              stroke={tone}
              strokeWidth={isLit ? 3.5 : 2}
            />

            {/* Left side of card: Physical pre-digital tool + arrow -> Right side: Framed Screen */}
            {/* 1. Filing cabinet -> Database MiniScreen */}
            {i === 0 && (
              <g>
                <rect x={x + 14} y={76} width={38} height={68} fill={tone} />
                {[82, 102, 122].map((dy) => (
                  <rect key={dy} x={x + 20} y={dy} width={26} height={14} fill={CREAM} />
                ))}
                <Pointer x1={x + 56} y1={110} x2={x + 84} y2={110} w={3.5} head={8} color={tone} />
                <MiniScreen x={x + 90} y={76}>
                  <rect x={x + 104} y={90} width={56} height={8} fill={tone} />
                  <rect x={x + 104} y={102} width={56} height={8} fill={tone} />
                  <rect x={x + 104} y={114} width={38} height={8} fill={tone} />
                </MiniScreen>
              </g>
            )}

            {/* 2. Envelope / Memo -> Web & Email MiniScreen */}
            {i === 1 && (
              <g>
                <rect x={x + 12} y={92} width={42} height={30} fill={tone} />
                <path d={`M ${x + 14} 94 L ${x + 33} 110 L ${x + 52} 94`} fill="none" stroke={CREAM} strokeWidth={2.5} />
                <Pointer x1={x + 58} y1={108} x2={x + 84} y2={108} w={3.5} head={8} color={tone} />
                <MiniScreen x={x + 90} y={76}>
                  <rect x={x + 108} y={90} width={48} height={28} fill={tone} />
                  <path d={`M ${x + 110} 92 L ${x + 132} 106 L ${x + 154} 92`} fill="none" stroke={CREAM} strokeWidth={2.2} />
                </MiniScreen>
              </g>
            )}

            {/* 3. Physical Cash Register -> E-Commerce MiniScreen */}
            {i === 2 && (
              <g>
                <path d={`M ${x + 14} 134 H ${x + 54} V 114 L ${x + 46} 90 H ${x + 22} L ${x + 14} 114 Z`} fill={tone} />
                <rect x={x + 24} y={78} width={20} height={10} fill={tone} />
                <rect x={x + 22} y={98} width={24} height={10} fill={CREAM} />
                <Pointer x1={x + 58} y1={108} x2={x + 84} y2={108} w={3.5} head={8} color={tone} />
                <MiniScreen x={x + 90} y={76}>
                  <rect x={x + 114} y={88} width={36} height={24} fill={tone} />
                  <circle cx={x + 122} cy={118} r={4} fill={tone} />
                  <circle cx={x + 142} cy={118} r={4} fill={tone} />
                </MiniScreen>
              </g>
            )}

            {/* 4. Paper Clipboard -> Mobile Smartphone Screen */}
            {i === 3 && (
              <g>
                <rect x={x + 14} y={80} width={38} height={54} fill={tone} />
                <rect x={x + 24} y={74} width={18} height={8} fill={tone} />
                <rect x={x + 20} y={92} width={26} height={5} fill={CREAM} />
                <rect x={x + 20} y={104} width={26} height={5} fill={CREAM} />
                <rect x={x + 20} y={116} width={18} height={5} fill={CREAM} />
                <Pointer x1={x + 58} y1={108} x2={x + 88} y2={108} w={3.5} head={8} color={tone} />
                {/* Framed Smartphone Screen + wireless wave arcs */}
                <path
                  d={`M ${x + 120} 68 A 14 14 0 0 1 ${x + 144} 68`}
                  fill="none"
                  stroke={tone}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <rect x={x + 108} y={76} width={48} height={68} fill="none" stroke={tone} strokeWidth={4.5} />
                <rect x={x + 113} y={81} width={38} height={50} fill="none" stroke={tone} strokeWidth={1} />
                <rect x={x + 120} y={90} width={24} height={16} fill={tone} />
                <circle cx={x + 132} cy={137} r={2.5} fill={tone} />
              </g>
            )}

            {/* Bottom card title banner */}
            <rect x={x} y={162} width={w} height={36} fill={tone} />
            <text x={cx} y={185} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
              {item.short}
            </text>
            <text x={cx} y={222} textAnchor="middle" {...BODY} fontSize={12} fill={INK}>
              {item.digital}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   13 · The Fourth Industrial Revolution (Industry 4.0) — 7-Pillar
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
      title={`Interactive Industry 4.0 cyber-physical convergence diagram: on the left, seven selectable technology modules (1. AI and ML, 2. IoT and Cyber-Physical Systems, 3. Big Data and Cloud, 4. Blockchain, 5. Advanced Robotics, 6. Biotechnology and 3D Printing, 7. Quantum Computing and 5G); on the right, a framed Digital Twin monitor displaying ${current.example}`}
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
              fill={isLit ? COUNTER_FILL : CREAM}
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
            <rect x={n.x} y={n.y + 66} width={n.w} height={32} fill={tone} />
            <text x={n.cx} y={n.y + 87} textAnchor="middle" {...HEAD} fontSize={12} fill={CREAM}>
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
        <rect x={492} y={30} width={278} height={28} fill={INK} />
        <text x={631} y={49} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
          {current.example}
        </text>

        {/* Scene 0: AI & ML — Chatbot + Recommendation Engine matching items */}
        {active === 0 && (
          <g>
            {/* User query bubble on left */}
            <rect x={504} y={76} width={74} height={44} fill={INK} />
            <rect x={514} y={88} width={54} height={6} fill={CREAM} />
            <rect x={514} y={100} width={38} height={6} fill={CREAM} />
            <Pointer x1={582} y1={98} x2={614} y2={98} w={3.5} head={8} color={SIGNAL} />
            {/* AI self-learning node hub */}
            <circle cx={634} cy={98} r={16} fill={SIGNAL} />
            <circle cx={634} cy={98} r={6} fill={CREAM} />
            <Pointer x1={654} y1={90} x2={686} y2={78} w={3} head={8} color={SIGNAL} />
            <Pointer x1={654} y1={106} x2={686} y2={118} w={3} head={8} color={SIGNAL} />
            {/* Recommended media & product cards (Netflix / Amazon) */}
            <rect x={690} y={66} width={66} height={26} fill={SIGNAL} />
            <text x={723} y={84} textAnchor="middle" {...HEAD} fontSize={11.5} fill={CREAM}>
              Match 98%
            </text>
            <rect x={690} y={104} width={66} height={26} fill={INK} />
            <text x={723} y={122} textAnchor="middle" {...HEAD} fontSize={11.5} fill={CREAM}>
              Match 94%
            </text>
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Self-learning algorithms &amp; recommendations
            </text>
          </g>
        )}

        {/* Scene 1: IoT & Cyber-Physical Systems — Smart Factory Self-Diagnosis */}
        {active === 1 && (
          <g>
            <GearWheelGlyph cx={538} cy={104} r={24} tone={SIGNAL} />
            <RobotArmGlyph bx={604} by={142} k={0.68} tone={INK} />
            <Pointer x1={636} y1={104} x2={668} y2={104} w={3.5} head={8} color={SIGNAL} />
            {/* Self-diagnosis status panel */}
            <rect x={672} y={72} width={88} height={64} fill={SIGNAL} />
            <text x={716} y={96} textAnchor="middle" {...HEAD} fontSize={12} fill={CREAM}>
              IoT Sensor
            </text>
            <text x={716} y={118} textAnchor="middle" {...BODY} fontSize={11.5} fill={CREAM}>
              Auto-Optimized
            </text>
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Machines self-diagnose &amp; optimize operations
            </text>
          </g>
        )}

        {/* Scene 2: Big Data & Cloud — Real-Time Supply Chain Optimization */}
        {active === 2 && (
          <g>
            {/* Central Cloud Optimizer */}
            <path
              d="M 596 102 C 596 90 608 84 618 90 C 626 76 646 78 652 90 C 664 90 666 104 654 108 H 602 Z"
              fill={SIGNAL}
            />
            {/* Warehouse on left -> Cloud -> Delivery fleet on right */}
            <rect x={506} y={92} width={48} height={46} fill={INK} />
            <rect x={516} y={104} width={12} height={12} fill={CREAM} />
            <rect x={532} y={104} width={12} height={12} fill={CREAM} />
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
                <rect x={bx} y={74} width={64} height={64} fill={bi === 2 ? SIGNAL : INK} />
                <text x={bx + 32} y={98} textAnchor="middle" {...HEAD} fontSize={12} fill={CREAM}>
                  Block {bi + 1}
                </text>
                <rect x={bx + 14} y={110} width={36} height={6} fill={CREAM} />
                <rect x={bx + 14} y={122} width={24} height={6} fill={CREAM} />
                {bi < 2 && <Pointer x1={bx + 66} y1={106} x2={bx + 86} y2={106} w={3.5} head={7} color={SIGNAL} />}
              </g>
            ))}
            <text x={631} y={168} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
              Decentralized tracking &amp; cryptocurrency ledger
            </text>
          </g>
        )}

        {/* Scene 4: Advanced Robotics & Automation — Warehouse Fulfillment Bots */}
        {active === 4 && (
          <g>
            <path d="M 500 144 H 762" stroke={INK} strokeWidth={3} strokeDasharray="6 4" />
            {[524, 612, 700].map((rx, ri) => (
              <g key={rx}>
                {/* Shelving rack pod carried by autonomous robot */}
                <rect x={rx - 22} y={72} width={44} height={38} fill={ri === 1 ? SIGNAL : INK} />
                <path d={`M ${rx - 16} 86 H ${rx + 16} M ${rx - 16} 98 H ${rx + 16}`} stroke={CREAM} strokeWidth={2.5} />
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
            <text x={624} y={92} textAnchor="middle" {...HEAD} fontSize={13} fill={SIGNAL}>
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
   14 · Impact on Society and Business (Industry 4.0) — Dual-Wing Control
   Console: Opportunities (1–4) vs. Risks & Governance (5–7) Around a Central
   Interactive Impact Stage
   ========================================================================== */

const FOURTH_IMPACTS = [
  {
    num: "1",
    short: "1. Hyper-Personalized",
    full: "1. Hyper-Personalized Products & Services",
    caption: "AI tailors products & services to each individual",
  },
  {
    num: "2",
    short: "2. Smart Cities",
    full: "2. Smart Cities & Digital Governance",
    caption: "IoT infrastructure optimizes traffic, transit & energy",
  },
  {
    num: "3",
    short: "3. Productivity",
    full: "3. Increased Productivity & Efficiency",
    caption: "AI and automation raise output while cutting waste",
  },
  {
    num: "4",
    short: "4. Business Models",
    full: "4. New Business Models",
    caption: "Platforms (Uber, Airbnb) & subscriptions (Netflix, SaaS)",
  },
  {
    num: "5",
    short: "5. Job Disruption",
    full: "5. Job Disruption & Reskilling Needs",
    caption: "Automation displaces routine roles; workforce reskills",
  },
  {
    num: "6",
    short: "6. Cybersecurity",
    full: "6. Cybersecurity & Privacy Concerns",
    caption: "Defending connected systems & data against cyberattacks",
  },
  {
    num: "7",
    short: "7. Ethical Challenges",
    full: "7. Ethical Challenges",
    caption: "Addressing algorithmic bias, surveillance & displacement",
  },
];

export function Industry4ImpactDialInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const current = FOURTH_IMPACTS[active] ?? FOURTH_IMPACTS[0];
  const leftYs = [40, 88, 136, 184];
  const rightYs = [40, 104, 168];

  return (
    <Plate
      w={800}
      h={242}
      title={`Interactive Industry 4.0 societal and business impact console: on the left wing, four value and business model shifts (1. Hyper-Personalized, 2. Smart Cities, 3. Productivity, 4. Business Models); on the right wing, three disruption and governance challenges (5. Job Disruption, 6. Cybersecurity, 7. Ethical Challenges); in the center stage, a scene illustrating ${current.full}`}
    >
      {/* Left Wing Header: Value & Business Shifts (1–4) */}
      <text x={110} y={26} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Value &amp; Business (1–4)
      </text>

      {leftYs.map((ly, i) => {
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const item = FOURTH_IMPACTS[i];
        return (
          <g
            key={item.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={item.full}
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
            <rect x={16} y={ly} width={188} height={40} fill={tone} />
            <text x={110} y={ly + 25} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              {item.short}
            </text>
          </g>
        );
      })}

      {/* Right Wing Header: Risks & Ethics (5–7) */}
      <text x={690} y={26} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Risks &amp; Ethics (5–7)
      </text>

      {rightYs.map((ry, idx) => {
        const i = idx + 4;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const item = FOURTH_IMPACTS[i];
        return (
          <g
            key={item.num}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={item.full}
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
            <rect x={596} y={ry} width={188} height={56} fill={tone} />
            <text x={690} y={ry + 33} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              {item.short}
            </text>
          </g>
        );
      })}

      {/* Center Stage: Live Impact Scene */}
      <rect x={220} y={14} width={360} height={212} fill={CREAM} stroke={INK} strokeWidth={3.5} />
      <rect x={220} y={14} width={360} height={34} fill={INK} />
      <text x={400} y={36} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
        {current.full}
      </text>

      {/* Scene 0: 1. Hyper-Personalized Products & Services */}
      {active === 0 && (
        <g>
          <MiniScreen x={242} y={76}>
            <circle cx={284} cy={104} r={14} fill={SIGNAL} />
            <circle cx={284} cy={104} r={5} fill={CREAM} />
          </MiniScreen>
          {/* Three tailored arrows to three custom packages/profiles */}
          <Pointer x1={334} y1={90} x2={396} y2={72} w={3.5} head={8} color={SIGNAL} />
          <Pointer x1={334} y1={104} x2={396} y2={114} w={3.5} head={8} color={SIGNAL} />
          <Pointer x1={334} y1={118} x2={396} y2={156} w={3.5} head={8} color={SIGNAL} />
          {[60, 102, 144].map((py, pi) => (
            <g key={py}>
              <rect x={404} y={py} width={148} height={26} fill={pi === 0 ? SIGNAL : INK} />
              <text x={478} y={py + 18} textAnchor="middle" {...HEAD} fontSize={12} fill={CREAM}>
                Custom Profile #{pi + 1}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* Scene 1: 2. Smart Cities & Digital Governance */}
      {active === 1 && (
        <g>
          {/* Connected urban skyline + smart traffic signal + civic screen */}
          <path
            d="M 244 176 V 84 H 286 V 176 Z M 252 94 H 262 V 108 H 252 Z M 268 94 H 278 V 108 H 268 Z M 252 118 H 262 V 132 H 252 Z M 268 118 H 278 V 132 H 268 Z"
            fill={INK}
            fillRule="evenodd"
          />
          {/* Smart traffic signal post */}
          <rect x={312} y={82} width={26} height={58} rx={4} fill={INK} />
          <circle cx={325} cy={95} r={5} fill={CREAM} />
          <circle cx={325} cy={111} r={5} fill={CREAM} />
          <circle cx={325} cy={127} r={5} fill={SIGNAL} />
          <rect x={322} y={140} width={6} height={36} fill={INK} />
          {/* IoT sensor wave arcs */}
          <path d="M 350 96 A 16 16 0 0 1 350 124 M 360 88 A 26 26 0 0 1 360 132" fill="none" stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
          {/* Digital Governance Screen + Connected Car */}
          <MiniScreen x={384} y={68}>
            <rect x={400} y={84} width={52} height={8} fill={SIGNAL} />
            <rect x={400} y={98} width={36} height={8} fill={INK} />
          </MiniScreen>
          <ModelTCarGlyph x={488} y={142} k={1.15} tone={SIGNAL} />
          <path d="M 236 176 H 564" stroke={INK} strokeWidth={3} />
        </g>
      )}

      {/* Scene 2: 3. Increased Productivity & Efficiency */}
      {active === 2 && (
        <g>
          <RobotArmGlyph bx={284} by={174} k={0.88} tone={SIGNAL} />
          {/* Rising productivity bars on center-right */}
          <rect x={356} y={134} width={28} height={40} fill={INK} />
          <rect x={392} y={104} width={28} height={70} fill={INK} />
          <rect x={428} y={68} width={28} height={106} fill={SIGNAL} />
          <text x={406} y={192} textAnchor="middle" {...HEAD} fontSize={12} fill={INK}>
            Output ↑
          </text>
          {/* Shrinking waste/cost bars on far right */}
          <rect x={486} y={96} width={24} height={78} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
          <rect x={520} y={144} width={24} height={30} fill={SIGNAL} />
          <text x={516} y={192} textAnchor="middle" {...HEAD} fontSize={12} fill={INK}>
            Waste &amp; Cost ↓
          </text>
          <path d="M 240 174 H 560" stroke={INK} strokeWidth={3} />
        </g>
      )}

      {/* Scene 3: 4. New Business Models (Platforms & Subscriptions) */}
      {active === 3 && (
        <g>
          {/* Central Digital Platform Screen */}
          <MiniScreen x={358} y={72}>
            <circle cx={400} cy={100} r={14} fill={SIGNAL} />
            <path d="M 392 100 H 408 M 400 92 V 108" stroke={CREAM} strokeWidth={2.5} />
          </MiniScreen>
          {/* Left: Ride & Home Platform (Uber / Airbnb) */}
          <ModelTCarGlyph x={246} y={72} k={1.05} tone={INK} />
          <path d="M 250 142 L 272 124 L 294 142 V 168 H 250 Z" fill={INK} />
          <Pointer x1={304} y1={104} x2={350} y2={104} w={3.5} head={8} color={SIGNAL} />
          {/* Right: Subscription SaaS & Streaming (Netflix / SaaS) */}
          <Pointer x1={450} y1={104} x2={492} y2={104} w={3.5} head={8} color={SIGNAL} />
          <rect x={498} y={72} width={62} height={42} fill={SIGNAL} />
          <polygon points="522,84 522,102 538,93" fill={CREAM} />
          <rect x={498} y={124} width={62} height={36} fill={INK} />
          <text x={529} y={147} textAnchor="middle" {...HEAD} fontSize={12} fill={CREAM}>
            SaaS
          </text>
        </g>
      )}

      {/* Scene 4: 5. Job Disruption & Reskilling Needs */}
      {active === 4 && (
        <g>
          {/* Left: Robot replacing manual role */}
          <RobotArmGlyph bx={276} by={174} k={0.82} tone={SIGNAL} />
          <Pointer x1={322} y1={128} x2={364} y2={104} w={3.5} head={8} color={SIGNAL} />
          {/* Center-Right: Reskilling Staircase climbing to a Digital Screen */}
          <rect x={364} y={150} width={36} height={24} fill={INK} />
          <rect x={400} y={126} width={36} height={48} fill={INK} />
          <rect x={436} y={102} width={36} height={72} fill={SIGNAL} />
          <MiniScreen x={480} y={76}>
            <SiliconChipGlyph cx={522} cy={104} s={24} tone={SIGNAL} />
          </MiniScreen>
          <path d="M 236 174 H 564" stroke={INK} strokeWidth={3} />
        </g>
      )}

      {/* Scene 5: 6. Cybersecurity & Privacy Concerns */}
      {active === 5 && (
        <g>
          {/* Cyberattack lightning bolts striking from left */}
          <path d="M 248 76 L 284 102 H 268 L 304 128" fill="none" stroke={SIGNAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <Pointer x1={296} y1={116} x2={336} y2={116} w={4} head={9} color={SIGNAL} />
          {/* Protective Shield & Lock defending a framed screen */}
          <path
            d="M 356 68 H 416 V 114 C 416 142 386 160 386 166 C 386 160 356 142 356 114 Z"
            fill={SIGNAL}
          />
          <rect x={374} y={104} width={24} height={20} fill={CREAM} />
          <path d="M 379 104 V 96 A 7 7 0 0 1 393 96 V 104" fill="none" stroke={CREAM} strokeWidth={3} />
          {/* Protected data screen on right */}
          <MiniScreen x={452} y={76}>
            <rect x={468} y={92} width={52} height={8} fill={INK} />
            <rect x={468} y={106} width={38} height={8} fill={INK} />
          </MiniScreen>
        </g>
      )}

      {/* Scene 6: 7. Ethical Challenges (AI Bias, Surveillance, Displacement) */}
      {active === 6 && (
        <g>
          {/* Left: Tilted Algorithmic Bias Scale */}
          <path d="M 296 172 L 310 92 H 318 L 332 172 Z" fill={INK} />
          <g transform="rotate(-10 314 96)">
            <rect x={254} y={92} width={120} height={8} fill={SIGNAL} />
            <rect x={250} y={108} width={34} height={18} fill={SIGNAL} />
            <rect x={344} y={108} width={34} height={18} fill={INK} />
          </g>
          {/* Right: Surveillance Eye inside Framed Screen */}
          <MiniScreen x={436} y={76}>
            <path
              d="M 454 104 C 466 88 490 88 502 104 C 490 120 466 120 454 104 Z"
              fill={SIGNAL}
            />
            <circle cx={478} cy={104} r={6} fill={CREAM} />
            <circle cx={478} cy={104} r={2.5} fill={INK} />
          </MiniScreen>
          <path d="M 236 172 H 564" stroke={INK} strokeWidth={3} />
        </g>
      )}

      {/* Bottom caption inside center stage */}
      <text x={400} y={214} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        {current.caption}
      </text>
    </Plate>
  );
}
