"use client";

/* ==========================================================================
   Week 10 — Cyber Security, Ethics and Social Issues of Digital Transformation
   (Flat Silhouette, Interactive-First)
   --------------------------------------------------------------------------
   Bespoke visual vocabulary crafted specifically for Week 10 (deliberately
   avoiding overused Shop, Doc, Coins, Person, Conversation, and generic icon
   boxes from earlier weeks):
     · Rotary Vault Tumbler & Bulkhead Gate   (Cybersecurity & Defense)
     · Forensic Loupe & Signal Waveform       (Verification vs. Hallucination)
     · Direct-Deposit Routing Switchboard     (CRA / H&R Block Case Study)
     · 8-Blade Mechanical Camera Iris         (Privacy by Design vs. Data Models)
     · Optical X-Ray Prism & Neural Monolith  (Algorithmic Bias & Explainability)
     · Cantilevered Moderation Pendulum       (Misinformation vs. Censorship)
     · Hyperboloid Cooling Towers & Racks     (AI Carbon Footprint & Costs)
     · Five-Monolith Gravitational Funnel     (Top-5 Cloud Monopoly Dynamics)
     · Three-Gear Feedback Escapement         (Weapons of Math Destruction)
     · Monitor / MiniScreen                   (Digital systems, per course style)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React, { useState } from "react";
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
  Pointer,
  Knob,
} from "../_visuals/kit";

const HEAD = { fontFamily: "var(--font-heading)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-body)", fontWeight: 600 } as const;

/* ==========================================================================
   Bespoke Silhouette Primitives for Week 10
   ========================================================================== */

/** Mechanical vault wheel with 6 radial locking bolts and concentric tumbler ring. */
function VaultWheelGlyph({
  cx,
  cy,
  r = 28,
  angleDeg = 0,
  tone = INK,
}: {
  cx: number;
  cy: number;
  r?: number;
  angleDeg?: number;
  tone?: string;
}) {
  const ir = r2(r * 0.62);
  const hr = r2(r * 0.24);
  const bolts = [0, 60, 120, 180, 240, 300].map((d) => {
    const rad = ((d + angleDeg) * Math.PI) / 180;
    const x1 = r2(cx + Math.cos(rad) * hr);
    const y1 = r2(cy + Math.sin(rad) * hr);
    const x2 = r2(cx + Math.cos(rad) * (r + 4));
    const y2 = r2(cy + Math.sin(rad) * (r + 4));
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={tone} strokeWidth={r2(r * 0.22)} />
      <circle cx={cx} cy={cy} r={ir} fill="none" stroke={tone} strokeWidth={2} />
      <path d={bolts.join(" ")} stroke={tone} strokeWidth={r2(r * 0.14)} strokeLinecap="square" />
      <circle cx={cx} cy={cy} r={hr} fill={tone} />
      <circle cx={cx} cy={cy} r={r2(hr * 0.38)} fill={CREAM} />
    </g>
  );
}

/** Hyperboloid cooling tower silhouette (bottom-center at bx, by; scaled by k). */
function CoolingTowerGlyph({
  bx,
  by,
  k = 1,
  tone = INK,
  plume = false,
}: {
  bx: number;
  by: number;
  k?: number;
  tone?: string;
  plume?: boolean;
}) {
  return (
    <g transform={`translate(${bx} ${by}) scale(${k})`}>
      {plume && (
        <path
          d="M -14 -82 C -22 -96 -8 -108 0 -104 C 10 -112 24 -98 14 -82 Z"
          fill={SIGNAL}
        />
      )}
      <path
        d="M -28 0 C -18 -26 -16 -52 -20 -76 H 20 C 16 -52 18 -26 28 0 Z"
        fill={tone}
      />
      <rect x={-22} y={-76} width={44} height={5} fill={tone} />
      <path d="M -22 -12 H 22 M -18 -38 H 18 M -18 -60 H 18" stroke={CREAM} strokeWidth={2.2} />
    </g>
  );
}

/** Multi-blade mechanical iris aperture (center cx, cy; outer radius r; openness 0..1). */
function CameraIrisGlyph({
  cx,
  cy,
  r = 56,
  openness = 0.35,
  tone = INK,
  coreTone = SIGNAL,
}: {
  cx: number;
  cy: number;
  r?: number;
  openness?: number;
  tone?: string;
  coreTone?: string;
}) {
  const apertureR = r2(Math.max(6, r * (0.12 + openness * 0.68)));
  const bladeAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={tone} />
      <circle cx={cx} cy={cy} r={r2(r - 6)} fill="none" stroke={CREAM} strokeWidth={2} />
      {/* Inner opening that grows/shrinks with openness */}
      <circle cx={cx} cy={cy} r={apertureR} fill={CREAM} />
      {/* Iris shutter blade seams */}
      {bladeAngles.map((deg) => {
        const rad1 = (deg * Math.PI) / 180;
        const rad2 = ((deg + 38) * Math.PI) / 180;
        const x1 = r2(cx + Math.cos(rad1) * apertureR);
        const y1 = r2(cy + Math.sin(rad1) * apertureR);
        const x2 = r2(cx + Math.cos(rad2) * (r - 7));
        const y2 = r2(cy + Math.sin(rad2) * (r - 7));
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={CREAM}
            strokeWidth={2.2}
          />
        );
      })}
      {/* Exposed personal-data core inside the aperture when open */}
      {openness > 0.08 && (
        <circle
          cx={cx}
          cy={cy}
          r={r2(Math.max(4, apertureR * 0.58))}
          fill={coreTone}
        />
      )}
    </g>
  );
}

/** Spoked industrial gear silhouette for escapement & feedback loops. */
function GearWheelGlyph({
  cx,
  cy,
  r = 34,
  teeth = 8,
  tone = INK,
}: {
  cx: number;
  cy: number;
  r?: number;
  teeth?: number;
  tone?: string;
}) {
  const toothList = Array.from({ length: teeth }, (_, i) => {
    const deg = (i * 360) / teeth;
    const rad = (deg * Math.PI) / 180;
    const x1 = r2(cx + Math.cos(rad) * (r - 4));
    const y1 = r2(cy + Math.sin(rad) * (r - 4));
    const x2 = r2(cx + Math.cos(rad) * (r + 7));
    const y2 = r2(cy + Math.sin(rad) * (r + 7));
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  });
  return (
    <g>
      <path d={toothList.join(" ")} stroke={tone} strokeWidth={8} strokeLinecap="butt" />
      <circle cx={cx} cy={cy} r={r} fill={tone} />
      <circle cx={cx} cy={cy} r={r2(r * 0.56)} fill={CREAM} />
      <circle cx={cx} cy={cy} r={r2(r * 0.24)} fill={tone} />
    </g>
  );
}

/* ==========================================================================
   1 · Hero — Interactive 4-Pillar Responsible Governance Compass
   Click any of the four agenda quadrants (1. Cyber Risks, 2. Ethical AI,
   3. Social Challenges, 4. Balanced Innovation) to rotate the central
   governance needle and inspect its digital screen mechanism.
   ========================================================================== */

const HERO_PILLARS = [
  {
    num: "01",
    short: "Cyber",
    title: "Cybersecurity & Governance",
    sub: "Threats, attack surfaces & prevention",
  },
  {
    num: "02",
    short: "Ethics",
    title: "Privacy & Ethical AI",
    sub: "Data minimization, bias & explainability",
  },
  {
    num: "03",
    short: "Social",
    title: "Integrity & Sustainability",
    sub: "Information trust, AI costs & monopolies",
  },
  {
    num: "04",
    short: "Balance",
    title: "Responsible Innovation",
    sub: "Driving innovation while managing risk",
  },
];

export function HeroGovernanceCompassInteractive() {
  const [active, setActive] = useState(0);
  const current = HERO_PILLARS[active] ?? HERO_PILLARS[0];

  const tabs = [
    { x: 18, w: 114, cx: 75 },
    { x: 142, w: 114, cx: 199 },
    { x: 266, w: 114, cx: 323 },
    { x: 390, w: 112, cx: 446 },
  ];

  return (
    <Plate
      w={520}
      h={340}
      title={`Interactive four-pillar governance instrument for Week 10: selector tabs along the top switch the central framed screen between 01 Cybersecurity Vault, 02 Privacy & AI Aperture, 03 Cooling Tower Footprint, and 04 Balanced Innovation Scale. Currently active: ${current.num} ${current.title}`}
    >
      {/* Top interactive quadrant selector tabs */}
      {tabs.map((t, i) => {
        const isLit = i === active;
        const p = HERO_PILLARS[i];
        return (
          <g
            key={p.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`${p.num} ${p.title}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect
              x={t.x}
              y={14}
              width={t.w}
              height={48}
              fill={isLit ? SIGNAL : INK}
            />
            <text x={t.cx} y={34} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
              {p.num} · {p.short}
            </text>
            <rect
              x={r2(t.cx - 18)}
              y={46}
              width={36}
              height={4}
              fill={isLit ? CREAM : COUNTER_FILL}
            />
          </g>
        );
      })}

      {/* Left physical mechanism emblem */}
      <g>
        {active === 0 && <VaultWheelGlyph cx={78} cy={176} r={42} angleDeg={15} tone={INK} />}
        {active === 1 && <CameraIrisGlyph cx={78} cy={176} r={44} openness={0.22} tone={INK} coreTone={SIGNAL} />}
        {active === 2 && <CoolingTowerGlyph bx={78} by={224} k={1.15} tone={INK} plume />}
        {active === 3 && (
          <g>
            {/* Architectural balance fulcrum */}
            <path d="M 54 224 L 78 176 L 102 224 Z" fill={INK} />
            <rect x={30} y={170} width={96} height={8} fill={SIGNAL} />
            <circle cx={42} cy={156} r={11} fill={INK} />
            <circle cx={114} cy={156} r={11} fill={COUNTER} />
          </g>
        )}
      </g>

      <Pointer x1={134} y1={176} x2={176} y2={176} w={5} color={SIGNAL} />

      {/* Central framed digital Monitor showing the governed digital system */}
      <Monitor x={184} y={76} w={318} h={196}>
        <rect x={200} y={90} width={286} height={32} fill={INK} />
        <text x={343} y={111} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
          {current.title}
        </text>

        {active === 0 && (
          <g>
            <VaultWheelGlyph cx={268} cy={184} r={34} angleDeg={30} tone={SIGNAL} />
            <rect x={324} y={146} width={144} height={24} fill={INK} />
            <text x={396} y={163} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              Perimeter Locked
            </text>
            <rect x={324} y={180} width={144} height={24} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
            <text x={396} y={197} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              MFA + Supply Audit
            </text>
          </g>
        )}

        {active === 1 && (
          <g>
            <CameraIrisGlyph cx={268} cy={184} r={36} openness={0.18} tone={INK} coreTone={SIGNAL} />
            <rect x={324} y={146} width={144} height={24} fill={SIGNAL} />
            <text x={396} y={163} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              Data Minimization
            </text>
            <rect x={324} y={180} width={144} height={24} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
            <text x={396} y={197} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              Explainable AI Lens
            </text>
          </g>
        )}

        {active === 2 && (
          <g>
            <CoolingTowerGlyph bx={248} by={228} k={0.9} tone={INK} plume />
            <CoolingTowerGlyph bx={294} by={228} k={0.72} tone={INK} />
            <rect x={332} y={146} width={138} height={24} fill={SIGNAL} />
            <text x={401} y={163} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              2x–3x / yr AI Cost
            </text>
            <rect x={332} y={180} width={138} height={24} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
            <text x={401} y={197} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              Top 5 Cloud Giants
            </text>
          </g>
        )}

        {active === 3 && (
          <g>
            <path d="M 318 228 L 343 182 L 368 228 Z" fill={INK} />
            <rect x={238} y={176} width={210} height={7} fill={INK} />
            <rect x={242} y={142} width={88} height={28} fill={COUNTER} />
            <text x={286} y={161} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              Innovation
            </text>
            <rect x={356} y={142} width={88} height={28} fill={SIGNAL} />
            <text x={400} y={161} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              Governance
            </text>
          </g>
        )}

        <text x={343} y={252} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
          {current.sub}
        </text>
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   2 · Review of Last Week — 5-Station Chrono-Escapement Recall Instrument
   Students click any of the 5 review questions (1st, 2nd, 3rd, 4th Industrial
   Revolutions, and Expected Changes in Industry 4.0) to inspect its visual
   escapement mechanism and key takeaways from Week 9.
   ========================================================================== */

const REVIEW_STATIONS = [
  {
    qNum: "Q1",
    era: "1760–1840",
    short: "1st Rev",
    title: "First Industrial Revolution",
    mechanism: "Steam Power & Mechanization",
    detail: "Coal, iron, steam engines, textile mills & centralized factories",
  },
  {
    qNum: "Q2",
    era: "1870–1914",
    short: "2nd Rev",
    title: "Second Industrial Revolution",
    mechanism: "Electricity & Mass Assembly",
    detail: "Bessemer steel, electric grid, Ford assembly line & telegraph",
  },
  {
    qNum: "Q3",
    era: "1960s–Now",
    short: "3rd Rev",
    title: "Third Industrial Revolution",
    mechanism: "Transistors, PCs & Internet",
    detail: "Microprocessors, industrial robotics, World Wide Web & mobile",
  },
  {
    qNum: "Q4",
    era: "Industry 4.0",
    short: "4th Rev",
    title: "Fourth Industrial Revolution",
    mechanism: "Cyber-Physical Convergence",
    detail: "AI/ML, IoT smart factories, cloud, blockchain, bio & quantum",
  },
  {
    qNum: "Q5",
    era: "4.0 Impact",
    short: "4.0 Shift",
    title: "Changes Expected in Industry 4.0",
    mechanism: "Hyper-Personalization & New Risks",
    detail: "Smart cities, platform models, reskilling, cybersecurity & AI ethics",
  },
];

export function ReviewRevolutionsDialInteractive({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  const current = REVIEW_STATIONS[active] ?? REVIEW_STATIONS[0];
  const xs = [88, 244, 400, 556, 712];

  return (
    <Plate
      w={800}
      h={270}
      title={`Interactive five-station review escapement for Week 9: Q1 First Industrial Revolution (1760–1840), Q2 Second Industrial Revolution (1870–1914), Q3 Third Industrial Revolution (1960s–Present), Q4 Fourth Industrial Revolution (Industry 4.0), and Q5 Expected Changes in Industry 4.0. Currently inspecting ${current.qNum}: ${current.title}`}
    >
      {/* Horizontal transmission shaft connecting the 5 stations */}
      <rect x={68} y={66} width={664} height={6} fill={INK} />

      {xs.map((cx, i) => {
        const isLit = i === active;
        const st = REVIEW_STATIONS[i];
        return (
          <g
            key={st.qNum}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`${st.qNum}: ${st.title}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={cx - 64} y={8} width={128} height={124} fill="transparent" />
            <text x={cx} y={24} textAnchor="middle" {...HEAD} fontSize={13.5} fill={isLit ? SIGNAL : INK}>
              {st.qNum} · {st.era}
            </text>
            <GearWheelGlyph cx={cx} cy={69} r={21} teeth={8} tone={isLit ? SIGNAL : INK} />
            <rect
              x={cx - 52}
              y={108}
              width={104}
              height={22}
              fill={isLit ? SIGNAL : COUNTER_FILL}
              stroke={INK}
              strokeWidth={1.5}
            />
            <text
              x={cx}
              y={123}
              textAnchor="middle"
              {...BODY}
              fontSize={12.5}
              fill={isLit ? CREAM : INK}
            >
              {st.short}
            </text>
          </g>
        );
      })}

      {/* Bottom synchronized inspection chamber */}
      <rect x={28} y={146} width={744} height={108} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <rect x={28} y={146} width={136} height={108} fill={INK} />
      <text x={96} y={194} textAnchor="middle" {...HEAD} fontSize={28} fill={SIGNAL}>
        {current.qNum}
      </text>
      <text x={96} y={222} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
        {current.era}
      </text>

      <text x={184} y={184} {...HEAD} fontSize={19} fill={INK}>
        {current.title}
      </text>
      <text x={184} y={210} {...HEAD} fontSize={15} fill={SIGNAL}>
        {current.mechanism}
      </text>
      <text x={184} y={234} {...BODY} fontSize={14} fill={INK}>
        {current.detail}
      </text>

      <MiniScreen x={668} y={162}>
        <GearWheelGlyph cx={710} cy={190} r={14} teeth={6} tone={SIGNAL} />
      </MiniScreen>
    </Plate>
  );
}

/* ==========================================================================
   3 · The Evolving Threat Landscape — Interactive Attack-Surface & Threat
   Defense Dome (made-up governance posture + real lecture vectors)
   ========================================================================== */

const THREAT_VECTORS = [
  {
    id: "state",
    name: "State-Sponsored Attacks",
    surface: "Cloud Adoption",
    summary: "Targeted intrusion into cloud infrastructure & operations",
  },
  {
    id: "ransomware",
    name: "Ransomware",
    surface: "Remote Work (MFA)",
    summary: "Compromised credentials lock enterprise systems & data",
  },
  {
    id: "supply",
    name: "Supply Chain Vulnerabilities",
    surface: "IoT (Device Manipulation)",
    summary: "Compromised third-party vendors & manipulated IoT devices",
  },
];

export function ThreatLandscapeDefenseDomeInteractive({
  activeThreat,
  onSelectThreat,
}: {
  activeThreat: number;
  onSelectThreat: (i: number) => void;
}) {
  const [defenseLevel, setDefenseLevel] = useState(65);
  const current = THREAT_VECTORS[activeThreat] ?? THREAT_VECTORS[0];

  // Simulated exposure index shrinks as MFA, IoT hardening, and cloud governance rise
  const exposurePct = Math.max(8, Math.round(92 - defenseLevel * 0.78));
  const shieldWallW = r2(6 + (defenseLevel / 100) * 14);

  return (
    <Plate
      w={540}
      h={380}
      title={`Interactive cybersecurity threat dome: select State-Sponsored Attacks, Ransomware, or Supply Chain Vulnerabilities, and drag the governance & MFA defense slider (${defenseLevel}%) to contract residual breach exposure (${exposurePct}%)`}
    >
      {/* Top threat selector pills */}
      {[
        { x: 16, w: 164, label: "State-Sponsored" },
        { x: 188, w: 164, label: "Ransomware" },
        { x: 360, w: 164, label: "Supply Chain" },
      ].map((tab, i) => {
        const isLit = i === activeThreat;
        return (
          <g
            key={tab.label}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={tab.label}
            onClick={() => onSelectThreat(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectThreat(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect
              x={tab.x}
              y={12}
              width={tab.w}
              height={34}
              fill={isLit ? SIGNAL : INK}
            />
            <text x={r2(tab.x + tab.w / 2)} y={34} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              {tab.label}
            </text>
          </g>
        );
      })}

      {/* Economic & Reputational risk readout */}
      <rect x={264} y={56} width={260} height={28} fill={INK} />
      <text x={394} y={75} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
        Breach Risk: {exposurePct}%
      </text>

      {/* Left attack-surface expansion nodes (IoT, Cloud, Remote Work MFA) */}
      {[
        { y: 74, title: "IoT Devices", sub: "Device Manipulation", matchIdx: 2 },
        { y: 138, title: "Cloud Adoption", sub: "Shared Control Plane", matchIdx: 0 },
        { y: 202, title: "Remote Work", sub: "Multifactor Auth (MFA)", matchIdx: 1 },
      ].map((node) => {
        const isTarget = node.matchIdx === activeThreat;
        return (
          <g
            key={node.title}
            role="button"
            tabIndex={0}
            aria-label={`${node.title}: ${node.sub}`}
            onClick={() => onSelectThreat(node.matchIdx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectThreat(node.matchIdx);
              }
            }}
            className="cursor-pointer"
          >
            <rect
              x={16}
              y={node.y}
              width={168}
              height={50}
              fill={isTarget ? SIGNAL : COUNTER_FILL}
              stroke={INK}
              strokeWidth={2.5}
            />
            <text
              x={28}
              y={node.y + 22}
              {...HEAD}
              fontSize={14}
              fill={isTarget ? CREAM : INK}
            >
              {node.title}
            </text>
            <text
              x={28}
              y={node.y + 41}
              {...BODY}
              fontSize={12.5}
              fill={isTarget ? CREAM : INK}
            >
              {node.sub}
            </text>
            <Pointer
              x1={184}
              y1={node.y + 25}
              x2={258}
              y2={node.y + 25}
              w={isTarget ? 4.5 : 2.5}
              color={isTarget ? SIGNAL : INK}
            />
          </g>
        );
      })}

      {/* Protective Governance Barrier Wall (thickens as defenseLevel increases) */}
      <rect
        x={264}
        y={94}
        width={shieldWallW}
        height={158}
        fill={COUNTER}
      />

      {/* Protected Enterprise Zone & Core Digital Monitor */}
      <rect
        x={292}
        y={94}
        width={232}
        height={158}
        fill={COUNTER_FILL}
        stroke={INK}
        strokeWidth={2.5}
      />
      <rect x={338} y={108} width={140} height={98} fill={CREAM} />
      <Monitor x={338} y={108} w={140} h={98}>
        <VaultWheelGlyph
          cx={408}
          cy={157}
          r={24}
          angleDeg={defenseLevel * 1.8}
          tone={exposurePct > 45 ? SIGNAL : INK}
        />
      </Monitor>

      {/* Active threat detail bar */}
      <rect x={16} y={266} width={508} height={48} fill={INK} />
      <text x={270} y={287} textAnchor="middle" {...HEAD} fontSize={14} fill={SIGNAL}>
        {current.name} · {current.surface}
      </text>
      <text x={270} y={306} textAnchor="middle" {...BODY} fontSize={13} fill={CREAM}>
        {current.summary}
      </text>

      {/* Interactive Governance & MFA hardening slider */}
      <text x={16} y={344} {...HEAD} fontSize={13.5} fill={INK}>
        MFA & Governance: {defenseLevel}%
      </text>
      <rect x={256} y={336} width={240} height={8} fill={INK} />
      <rect x={256} y={336} width={r2((defenseLevel / 100) * 240)} height={8} fill={COUNTER} />
      <Knob
        x={256}
        y={340}
        len={240}
        min={0}
        max={100}
        step={5}
        value={defenseLevel}
        onChange={setDefenseLevel}
        label="Governance and MFA hardening level"
        tone={COUNTER}
      />
    </Plate>
  );
}

/* ==========================================================================
   4 · Question: North America Breach Anatomy Reconstructor
   Interactive forensic board for the 3 research questions:
     1. Who caused it?
     2. What vulnerability enabled it?
     3. How could the organization/business prevented the breach?
   ========================================================================== */

const NA_ARCHETYPES = [
  {
    id: "credential",
    label: "Case 1: Credentials",
    who1: "External cybercrime",
    who2: "credential syndicate",
    vuln1: "Reused passwords without",
    vuln2: "Multifactor Auth (MFA)",
    prev1: "Enforce hardware MFA",
    prev2: "& login rate-limiting",
  },
  {
    id: "vendor",
    label: "Case 2: Supply Chain",
    who1: "State-sponsored group",
    who2: "compromising a vendor",
    vuln1: "Trusted third-party",
    vuln2: "software update pipeline",
    prev1: "Zero-trust vendor",
    prev2: "isolation & code signing",
  },
  {
    id: "iot-ransom",
    label: "Case 3: IoT Ransom",
    who1: "Ransomware extortion",
    who2: "operator network",
    vuln1: "Unpatched IoT devices",
    vuln2: "on flat enterprise LAN",
    prev1: "Network segmentation",
    prev2: "& offline backups",
  },
];

export function NorthAmericaBreachLabInteractive() {
  const [archIdx, setArchIdx] = useState(0);
  const [prevented, setPrevented] = useState(false);
  const current = NA_ARCHETYPES[archIdx] ?? NA_ARCHETYPES[0];

  return (
    <Plate
      w={800}
      h={266}
      title={`Interactive North America breach investigation board: compare three breach cases across Who caused it, What vulnerability enabled it, and How the business could have prevented it. Prevention safeguard is currently ${prevented ? "ON" : "OFF"}`}
    >
      {/* Top archetype selector + Prevention toggle */}
      {NA_ARCHETYPES.map((a, i) => {
        const isLit = i === archIdx;
        const x = 20 + i * 192;
        return (
          <g
            key={a.id}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={a.label}
            onClick={() => setArchIdx(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setArchIdx(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={x} y={14} width={180} height={36} fill={isLit ? INK : COUNTER_FILL} stroke={INK} strokeWidth={2} />
            <text x={x + 90} y={37} textAnchor="middle" {...HEAD} fontSize={13.5} fill={isLit ? CREAM : INK}>
              {a.label}
            </text>
          </g>
        );
      })}

      {/* Interactive Prevention Bulkhead Switch */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={prevented}
        aria-label="Toggle breach prevention safeguard"
        onClick={() => setPrevented((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPrevented((p) => !p);
          }
        }}
        className="cursor-pointer"
      >
        <rect
          x={604}
          y={14}
          width={176}
          height={36}
          fill={prevented ? COUNTER : SIGNAL}
        />
        <text x={692} y={37} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
          {prevented ? "Safeguard: ON" : "Safeguard: OFF"}
        </text>
      </g>

      {/* Stage 1: Who caused it? */}
      <rect x={20} y={68} width={224} height={154} fill={CREAM} stroke={INK} strokeWidth={3} />
      <rect x={20} y={68} width={224} height={32} fill={INK} />
      <text x={132} y={89} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
        1. Who caused it?
      </text>
      <VaultWheelGlyph cx={132} cy={138} r={22} angleDeg={0} tone={SIGNAL} />
      <text x={132} y={184} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
        {current.who1}
      </text>
      <text x={132} y={204} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
        {current.who2}
      </text>

      <Pointer x1={244} y1={145} x2={284} y2={145} w={4.5} color={SIGNAL} />

      {/* Stage 2: What vulnerability enabled it? */}
      <rect x={286} y={68} width={228} height={154} fill={CREAM} stroke={INK} strokeWidth={3} />
      <rect x={286} y={68} width={228} height={32} fill={SIGNAL} />
      <text x={400} y={89} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
        2. What vulnerability?
      </text>
      <rect x={376} y={114} width={48} height={42} fill={INK} />
      <path d="M 392 114 L 406 135 L 394 156" stroke={SIGNAL} strokeWidth={5} fill="none" />
      <text x={400} y={184} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
        {current.vuln1}
      </text>
      <text x={400} y={204} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
        {current.vuln2}
      </text>

      {/* Prevention Gate between Stage 2 and Stage 3 */}
      {prevented ? (
        <g>
          <rect x={528} y={76} width={16} height={138} fill={COUNTER} />
        </g>
      ) : (
        <Pointer x1={514} y1={145} x2={554} y2={145} w={4.5} color={SIGNAL} />
      )}

      {/* Stage 3: How could the organization prevent it? */}
      <Monitor x={556} y={68} w={224} h={154}>
        <rect x={568} y={80} width={200} height={28} fill={prevented ? COUNTER : INK} />
        <text x={668} y={99} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
          3. Prevention
        </text>
        <text x={668} y={148} textAnchor="middle" {...HEAD} fontSize={14.5} fill={prevented ? COUNTER : INK}>
          {current.prev1}
        </text>
        <text x={668} y={172} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
          {current.prev2}
        </text>
        <text x={668} y={202} textAnchor="middle" {...HEAD} fontSize={13} fill={prevented ? COUNTER : SIGNAL}>
          {prevented ? "BREACH PREVENTED" : "BREACH ACTIVE"}
        </text>
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   5 · Note on Research — Interactive GenAI Hallucination & Source Scanner
   Students drag the verification loupe across articles in a "2024 in Review"
   webpage to distinguish fabricated GenAI breach claims from real filings.
   ========================================================================== */

const REPORT_CLAIMS = [
  {
    id: "claim-1",
    headline: "Report A: '2024 Mega-Bank Vault Breach'",
    verdict: "HALLUCINATED REPORT",
    sub: "Fabricated by GenAI — did not happen!",
    viable: false,
  },
  {
    id: "claim-2",
    headline: "Report B: '2024 National Telecom Wipeout'",
    verdict: "HALLUCINATED REPORT",
    sub: "No regulator filing exists — fake report!",
    viable: false,
  },
  {
    id: "claim-3",
    headline: "Report C: '2020 CRA & H&R Block Leak'",
    verdict: "VERIFIED SOURCE",
    sub: "Confirmed by CRA & Privacy Commissioner (OPC)",
    viable: true,
  },
];

export function HallucinatedReportScannerInteractive() {
  const [scanIndex, setScanIndex] = useState(0);
  const current = REPORT_CLAIMS[scanIndex] ?? REPORT_CLAIMS[0];

  return (
    <Plate
      w={500}
      h={350}
      title={`Interactive research source verifier: inspect three breach headlines inside a digital browser screen to expose fake GenAI hallucinated breach reports versus verified regulatory records. Currently scanning: ${current.headline} (${current.verdict})`}
    >
      <Monitor x={24} y={16} w={452} h={246}>
        {/* Browser header bar */}
        <rect x={38} y={30} width={424} height={28} fill={INK} />
        <circle cx={54} cy={44} r={5} fill={SIGNAL} />
        <circle cx={70} cy={44} r={5} fill={CREAM} />
        <text x={258} y={49} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
          Source Viability Scanner · Click a Report
        </text>

        {REPORT_CLAIMS.map((c, i) => {
          const isLit = i === scanIndex;
          const y = 68 + i * 58;
          return (
            <g
              key={c.id}
              role="button"
              tabIndex={0}
              aria-pressed={isLit}
              aria-label={`${c.headline} — ${c.verdict}`}
              onClick={() => setScanIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setScanIndex(i);
                }
              }}
              className="cursor-pointer"
            >
              <rect
                x={42}
                y={y}
                width={416}
                height={50}
                fill={isLit ? (c.viable ? COUNTER_FILL : SIGNAL) : CREAM}
                stroke={INK}
                strokeWidth={isLit ? 3 : 1.5}
              />
              <text
                x={56}
                y={y + 21}
                {...HEAD}
                fontSize={13.5}
                fill={isLit && !c.viable ? CREAM : INK}
              >
                {c.headline}
              </text>
              <text
                x={56}
                y={y + 40}
                {...BODY}
                fontSize={12.5}
                fill={isLit && !c.viable ? CREAM : INK}
              >
                {isLit ? `${c.verdict} — ${c.sub}` : "Click to verify source viability"}
              </text>
            </g>
          );
        })}
      </Monitor>

      {/* Bottom Forensic Verdict Readout Banner */}
      <rect
        x={24}
        y={302}
        width={452}
        height={34}
        fill={current.viable ? COUNTER : SIGNAL}
      />
      <text x={250} y={324} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
        {current.verdict} · {current.viable ? "Viable Regulatory Record" : "GenAI Fake: Did Not Happen!"}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   6 · Case Study: Canadian Revenue Agency (CRA) Data Leak
   Interactive 3-Stage Forensic Switchboard synchronized with the slide's
   three dossier columns:
     Stage 0: 2020 H&R Block Canada credential theft -> Direct deposit switch -> $6M+ stolen
     Stage 1: CRA internal error -> 30,000+ taxpayers' SINs, tax returns & financial details exposed
     Stage 2: Ongoing investigation -> Office of the Privacy Commissioner (OPC) & Privacy Act
   ========================================================================== */

export function CraBreachForensicTimelineInteractive({
  activeStage,
  onSelectStage,
}: {
  activeStage: number;
  onSelectStage: (i: number) => void;
}) {
  const stages = [
    {
      num: "01",
      title: "H&R Block & $6M Refund Diversion (2020)",
      badge: "H&R Block · $6M+ Stolen",
    },
    {
      num: "02",
      title: "Internal Error: 30,000+ SINs Exposed",
      badge: "30,000+ SINs Exposed",
    },
    {
      num: "03",
      title: "OPC Privacy Act Investigation",
      badge: "OPC & Privacy Act",
    },
  ];

  return (
    <Plate
      w={800}
      h={304}
      title={`Interactive forensic diagram of the Canadian Revenue Agency (CRA) data leak across three stages: 01 H&R Block Canada data used to alter direct deposit routing and steal over $6 million; 02 Internal error exposing over 30,000 Canadian taxpayers' SINs, tax returns, and financial details; 03 Office of the Privacy Commissioner (OPC) investigation under the Privacy Act. Currently viewing Stage 0${activeStage + 1}`}
    >
      {/* Top stage selector bar */}
      {stages.map((st, i) => {
        const isLit = i === activeStage;
        const x = 20 + i * 256;
        return (
          <g
            key={st.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`Stage ${st.num}: ${st.title}`}
            onClick={() => onSelectStage(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectStage(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect
              x={x}
              y={14}
              width={248}
              height={44}
              fill={isLit ? SIGNAL : INK}
            />
            <text x={x + 124} y={35} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
              {st.num} · {st.badge}
            </text>
            <rect
              x={x + 84}
              y={46}
              width={80}
              height={4}
              fill={isLit ? CREAM : COUNTER_FILL}
            />
          </g>
        );
      })}

      {/* Stage 0 visual: H&R Block credential breach -> Direct Deposit switch -> $6M diverted */}
      {activeStage === 0 && (
        <g>
          {/* Left: H&R Block Canada credential vault */}
          <rect x={24} y={82} width={206} height={164} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
          <rect x={24} y={82} width={206} height={34} fill={INK} />
          <text x={127} y={104} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
            H&R Block Canada (2020)
          </text>
          <VaultWheelGlyph cx={74} cy={172} r={26} angleDeg={25} tone={SIGNAL} />
          <text x={156} y={160} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
            Confidential
          </text>
          <text x={156} y={180} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
            Data Obtained
          </text>
          <text x={156} y={202} textAnchor="middle" {...BODY} fontSize={12.5} fill={SIGNAL}>
            Unauthorized Access
          </text>

          <Pointer x1={232} y1={164} x2={278} y2={164} w={5} color={SIGNAL} />

          {/* Center: CRA Direct Deposit Routing Switchboard */}
          <Monitor x={282} y={76} w={236} h={172}>
            <text x={400} y={106} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
              CRA Direct Deposit Switch
            </text>
            {/* Legitimate taxpayer track (disconnected) */}
            <line x1={308} y1={146} x2={382} y2={146} stroke={INK} strokeWidth={5} />
            <line x1={382} y1={146} x2={434} y2={126} stroke={INK} strokeWidth={2.5} strokeDasharray="5 4" />
            <text x={496} y={130} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
              Taxpayer
            </text>
            {/* Diverted imposter track (active SIGNAL red) */}
            <line x1={382} y1={146} x2={446} y2={182} stroke={SIGNAL} strokeWidth={6} />
            <circle cx={382} cy={146} r={7} fill={SIGNAL} />
            <rect x={312} y={198} width={176} height={28} fill={SIGNAL} />
            <text x={400} y={217} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              False Tax Returns Filed
            </text>
          </Monitor>

          <Pointer x1={520} y1={164} x2={566} y2={164} w={5} color={SIGNAL} />

          {/* Right: Over $6 Million stolen in fraudulent refunds */}
          <rect x={570} y={82} width={206} height={164} fill={SIGNAL} stroke={INK} strokeWidth={3} />
          <text x={673} y={138} textAnchor="middle" {...HEAD} fontSize={36} fill={CREAM}>
            $6M+
          </text>
          <text x={673} y={170} textAnchor="middle" {...HEAD} fontSize={16} fill={CREAM}>
            Fraudulent Refunds
          </text>
          <text x={673} y={196} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
            Direct deposit info altered
          </text>
          <text x={673} y={216} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
            by unauthorized imposters
          </text>
        </g>
      )}

      {/* Stage 1 visual: Internal error exposing 30,000+ taxpayers' SINs, tax returns & financial details */}
      {activeStage === 1 && (
        <g>
          <Monitor x={36} y={76} w={336} h={172}>
            <rect x={52} y={92} width={304} height={30} fill={SIGNAL} />
            <text x={204} y={112} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
              CRA Internal Error: Gate Left Open
            </text>
            {/* 6 rows of 5 grid blocks = 30,000+ taxpayers */}
            {Array.from({ length: 15 }, (_, k) => {
              const col = k % 5;
              const row = Math.floor(k / 5);
              return (
                <rect
                  key={k}
                  x={64 + col * 58}
                  y={134 + row * 32}
                  width={46}
                  height={22}
                  fill={SIGNAL}
                />
              );
            })}
          </Monitor>

          <Pointer x1={376} y1={164} x2={428} y2={164} w={5} color={SIGNAL} />

          <rect x={432} y={82} width={344} height={164} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
          <text x={604} y={120} textAnchor="middle" {...HEAD} fontSize={28} fill={SIGNAL}>
            30,000+ Taxpayers
          </text>
          <rect x={456} y={136} width={296} height={28} fill={INK} />
          <text x={604} y={155} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
            Social Insurance Numbers (SIN)
          </text>
          <rect x={456} y={172} width={142} height={28} fill={INK} />
          <text x={527} y={191} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
            Tax Returns
          </text>
          <rect x={610} y={172} width={142} height={28} fill={INK} />
          <text x={681} y={191} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
            Financial Details
          </text>
          <text x={604} y={226} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
            Left accessible to unauthorized individuals
          </text>
        </g>
      )}

      {/* Stage 2 visual: Ongoing OPC Investigation under the Privacy Act */}
      {activeStage === 2 && (
        <g>
          <rect x={36} y={82} width={316} height={164} fill={INK} />
          <text x={194} y={122} textAnchor="middle" {...HEAD} fontSize={19} fill={CREAM}>
            Office of the Privacy
          </text>
          <text x={194} y={146} textAnchor="middle" {...HEAD} fontSize={19} fill={CREAM}>
            Commissioner (OPC)
          </text>
          <rect x={72} y={166} width={244} height={32} fill={SIGNAL} />
          <text x={194} y={187} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
            Investigation Ongoing
          </text>
          <text x={194} y={224} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
            Federal Privacy Oversight Watchdog
          </text>

          <Pointer x1={356} y1={164} x2={416} y2={164} w={5} color={SIGNAL} />

          <Monitor x={420} y={76} w={352} h={172}>
            <rect x={438} y={92} width={316} height={32} fill={COUNTER} />
            <text x={596} y={113} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
              Federal Privacy Act Obligations Audit
            </text>
            <VaultWheelGlyph cx={488} cy={176} r={30} angleDeg={0} tone={COUNTER} />
            <text x={626} y={156} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
              Did CRA meet its legal
            </text>
            <text x={626} y={178} textAnchor="middle" {...HEAD} fontSize={15} fill={INK}>
              obligations under the
            </text>
            <text x={626} y={202} textAnchor="middle" {...HEAD} fontSize={17} fill={SIGNAL}>
              Privacy Act?
            </text>
          </Monitor>
        </g>
      )}
    </Plate>
  );
}

/* ==========================================================================
   7 · Ethics in Digital Transformation — Interactive Privacy Aperture vs.
   Personalization Instrument
   "Instead of protecting the collected data, do not collect data at all."
   ========================================================================== */

export function PrivacyMinimizationApertureInteractive() {
  const [collectionLevel, setCollectionLevel] = useState(10);
  const openness = collectionLevel / 100;
  const privacyScore = 100 - collectionLevel;
  const personalizationScore = collectionLevel;

  const isZeroCollection = collectionLevel === 0;

  return (
    <Plate
      w={800}
      h={304}
      title={`Interactive privacy-by-design iris aperture: drag the data collection knob (${collectionLevel}%) or click 'Do Not Collect Data At All' to see how Data Minimization preserves Privacy Rights (${privacyScore}%) while Data-Driven Personalization (${personalizationScore}%) demands personal data`}
    >
      {/* Left column: Privacy by Design & Data Minimization */}
      <rect x={20} y={16} width={236} height={212} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <rect x={20} y={16} width={236} height={36} fill={COUNTER} />
      <text x={138} y={39} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
        Privacy Rights & Minimization
      </text>
      <text x={138} y={88} textAnchor="middle" {...HEAD} fontSize={34} fill={COUNTER}>
        {privacyScore}%
      </text>
      <text x={138} y={114} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Privacy Protection Index
      </text>
      <text x={138} y={142} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Privacy needs little data collection.
      </text>
      {/* One-click Privacy by Design button */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={isZeroCollection}
        aria-label="Activate Privacy by Design: Do not collect data at all"
        onClick={() => setCollectionLevel(0)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCollectionLevel(0);
          }
        }}
        className="cursor-pointer"
      >
        <rect
          x={36}
          y={164}
          width={204}
          height={46}
          fill={isZeroCollection ? SIGNAL : INK}
        />
        <text x={138} y={184} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
          Privacy by Design Mode:
        </text>
        <text x={138} y={201} textAnchor="middle" {...BODY} fontSize={12.5} fill={CREAM}>
          Do Not Collect Data At All (0%)
        </text>
      </g>

      {/* Center: Framed digital Monitor holding the Mechanical Camera Iris Aperture */}
      <Monitor x={274} y={16} w={252} h={184}>
        <text x={400} y={40} textAnchor="middle" {...HEAD} fontSize={13.5} fill={INK}>
          Collection Aperture
        </text>
        <CameraIrisGlyph
          cx={400}
          cy={106}
          r={46}
          openness={openness}
          tone={INK}
          coreTone={SIGNAL}
        />
        <text x={400} y={176} textAnchor="middle" {...HEAD} fontSize={13} fill={isZeroCollection ? COUNTER : SIGNAL}>
          {isZeroCollection
            ? "Zero Data Collected (0%)"
            : `Collecting ${collectionLevel}% Personal Data`}
        </text>
      </Monitor>

      {/* Right column: Data-Driven Business Model & Personalization */}
      <rect x={544} y={16} width={236} height={212} fill={CREAM} stroke={INK} strokeWidth={3} />
      <rect x={544} y={16} width={236} height={36} fill={SIGNAL} />
      <text x={662} y={39} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
        Data-Driven Personalization
      </text>
      <text x={662} y={88} textAnchor="middle" {...HEAD} fontSize={34} fill={SIGNAL}>
        {personalizationScore}%
      </text>
      <text x={662} y={114} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Personalization Depth
      </text>
      <text x={662} y={142} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Personalization needs personal data.
      </text>
      {/* One-click Data-Driven Max button */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={collectionLevel === 85}
        aria-label="Set Data-Driven Business Model (85% collection)"
        onClick={() => setCollectionLevel(85)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCollectionLevel(85);
          }
        }}
        className="cursor-pointer"
      >
        <rect
          x={560}
          y={164}
          width={204}
          height={46}
          fill={collectionLevel >= 70 ? SIGNAL : INK}
        />
        <text x={662} y={184} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
          Data-Driven Model Mode:
        </text>
        <text x={662} y={201} textAnchor="middle" {...BODY} fontSize={12.5} fill={CREAM}>
          Collect Personal Data (85%)
        </text>
      </g>

      {/* Bottom Interactive Knob Track */}
      <text x={44} y={268} {...HEAD} fontSize={14} fill={COUNTER}>
        Minimization (0%)
      </text>
      <rect x={220} y={260} width={360} height={8} fill={INK} />
      <rect x={220} y={260} width={r2((collectionLevel / 100) * 360)} height={8} fill={SIGNAL} />
      <Knob
        x={220}
        y={264}
        len={360}
        min={0}
        max={100}
        step={5}
        value={collectionLevel}
        onChange={setCollectionLevel}
        label="Personal data collection aperture from 0% data minimization to 100% data-driven personalization"
        tone={SIGNAL}
      />
      <text x={600} y={268} {...HEAD} fontSize={14} fill={SIGNAL}>
        Max Collection (100%)
      </text>
    </Plate>
  );
}

/* ==========================================================================
   8 · Ethical AI and Algorithm Governance — Interactive Bias & Explainability
   X-Ray Lens ("How is the AI model making decisions?")
   ========================================================================== */

const BIAS_MODES = [
  {
    id: "social",
    name: "Social bias",
    skewedProxy: "Socioeconomic Proxy Weight: 78%",
    outcome: "Skewed against lower-income tiers",
    correctedRule: "Audit & strip socioeconomic proxies",
  },
  {
    id: "racial",
    name: "Racial bias",
    skewedProxy: "Unbalanced Training Set Skew: 84%",
    outcome: "Disproportionate error rates",
    correctedRule: "Re-balance training cohorts",
  },
  {
    id: "gender",
    name: "Gender bias",
    skewedProxy: "Historical Gendered Token Weight: 74%",
    outcome: "Penalizes underrepresented gender",
    correctedRule: "Enforce equal outcome parity",
  },
  {
    id: "cognitive",
    name: "Cognitive bias",
    skewedProxy: "Recency & Confirmation Skew: 81%",
    outcome: "Over-weights vivid recent spikes",
    correctedRule: "Calibrate long-term baselines",
  },
];

export function AlgorithmGovernanceXrayInteractive({
  activeBias,
  onSelectBias,
}: {
  activeBias: number;
  onSelectBias: (i: number) => void;
}) {
  const [xrayOpen, setXrayOpen] = useState(true);
  const current = BIAS_MODES[activeBias] ?? BIAS_MODES[0];

  return (
    <Plate
      w={540}
      h={370}
      title={`Interactive AI algorithm governance X-ray: select Social bias, Racial bias, Gender bias, or Cognitive bias, and toggle the Transparency & Explainability X-ray lens (${xrayOpen ? "OPEN" : "OPAQUE BLACK BOX"}) to inspect how the AI model is making decisions`}
    >
      {/* Top 4 bias selector tabs */}
      {BIAS_MODES.map((b, i) => {
        const isLit = i === activeBias;
        const x = 16 + i * 128;
        return (
          <g
            key={b.id}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={b.name}
            onClick={() => onSelectBias(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectBias(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={x} y={12} width={122} height={36} fill={isLit ? SIGNAL : INK} />
            <text x={x + 61} y={35} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
              {b.name}
            </text>
          </g>
        );
      })}

      {/* Framed digital Monitor holding the AI Decision Engine */}
      <Monitor x={20} y={60} w={500} h={216}>
        <rect x={36} y={74} width={468} height={28} fill={INK} />
        <text x={270} y={93} textAnchor="middle" {...HEAD} fontSize={13.5} fill={CREAM}>
          How is the AI model making decisions? · {xrayOpen ? "Explainable View" : "Black-Box View"}
        </text>

        {!xrayOpen ? (
          /* Opaque Black Box state */
          <g>
            <rect x={140} y={114} width={260} height={112} fill={INK} />
            <text x={270} y={168} textAnchor="middle" {...HEAD} fontSize={32} fill={SIGNAL}>
              ? · BLACK BOX · ?
            </text>
            <text x={270} y={204} textAnchor="middle" {...BODY} fontSize={13} fill={CREAM}>
              Decision weights hidden — cannot audit {current.name}
            </text>
          </g>
        ) : (
          /* Explainable X-Ray Lens state revealing internal neural weights */
          <g>
            <rect x={44} y={110} width={452} height={148} fill={COUNTER_FILL} stroke={COUNTER} strokeWidth={3} />
            {/* Neural network nodes & skewed red pathway */}
            <circle cx={78} cy={144} r={10} fill={SIGNAL} />
            <circle cx={78} cy={184} r={10} fill={INK} />
            <circle cx={78} cy={224} r={10} fill={INK} />
            <circle cx={166} cy={162} r={11} fill={SIGNAL} />
            <circle cx={166} cy={208} r={11} fill={COUNTER} />
            <line x1={88} y1={144} x2={155} y2={162} stroke={SIGNAL} strokeWidth={5} />
            <line x1={88} y1={184} x2={155} y2={162} stroke={SIGNAL} strokeWidth={3} />
            <line x1={88} y1={224} x2={155} y2={208} stroke={COUNTER} strokeWidth={2.5} />

            {/* Explainability readout inside X-ray */}
            <rect x={196} y={118} width={286} height={38} fill={SIGNAL} />
            <text x={339} y={142} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
              {current.skewedProxy}
            </text>
            <text x={339} y={180} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              {current.outcome}
            </text>
            <rect x={196} y={198} width={286} height={34} fill={INK} />
            <text x={339} y={220} textAnchor="middle" {...BODY} fontSize={13} fill={CREAM}>
              Fix: {current.correctedRule}
            </text>
          </g>
        )}
      </Monitor>

      {/* Bottom Interactive Explainability X-Ray Toggle Bar */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={xrayOpen}
        aria-label="Toggle Transparency and Explainability X-Ray Lens"
        onClick={() => setXrayOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setXrayOpen((v) => !v);
          }
        }}
        className="cursor-pointer"
      >
        <rect
          x={20}
          y={316}
          width={500}
          height={42}
          fill={xrayOpen ? COUNTER : SIGNAL}
        />
        <text x={270} y={342} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
          {xrayOpen
            ? "Transparency & Explainability X-Ray: ON (Click to Hide)"
            : "Transparency & Explainability X-Ray: OFF (Click to Inspect)"}
        </text>
      </g>
    </Plate>
  );
}

/* ==========================================================================
   9 · Truth, Trust and Digital Information Integrity — Interactive Content
   Moderation Balance Fulcrum
   "The balance between battling misinformation and censorship"
   ========================================================================== */

export function InformationIntegrityFulcrumInteractive() {
  const [filterStrictness, setFilterStrictness] = useState(50);

  // Tilt angle in degrees: -7 deg when under-moderated, 0 deg near 50%, +7 deg when over-censored
  const tiltDeg = r2(((filterStrictness - 50) / 50) * 7);
  const stateLabel =
    filterStrictness < 35
      ? "Under-Moderated: Misinformation & Synthetic Media Flood"
      : filterStrictness > 65
        ? "Over-Moderated: Overreaching Censorship Silences Speech"
        : "Balanced Governance: Battles Misinformation Without Censorship";

  const stateTone = filterStrictness >= 35 && filterStrictness <= 65 ? COUNTER : SIGNAL;

  return (
    <Plate
      w={800}
      h={296}
      title={`Interactive content moderation balance fulcrum: drag the moderation strictness knob (${filterStrictness}%) between Battling Misinformation and Censorship Risk. Current state: ${stateLabel}`}
    >
      {/* Top status banner */}
      <rect x={20} y={14} width={760} height={36} fill={stateTone} />
      <text x={400} y={37} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
        {stateLabel}
      </text>

      {/* Central Fulcrum Base */}
      <path d="M 366 226 L 400 172 L 434 226 Z" fill={INK} />
      <rect x={330} y={226} width={140} height={10} fill={INK} />

      {/* Tilting Balance Beam Group */}
      <g transform={`translate(400 172) rotate(${tiltDeg})`}>
        <rect x={-310} y={-5} width={620} height={10} fill={INK} />
        <circle cx={0} cy={0} r={10} fill={CREAM} stroke={INK} strokeWidth={4} />

        {/* Left Pan: Misinformation & Synthetic Media Challenges */}
        <g transform="translate(-230 -78)">
          <MiniScreen x={-42} y={0}>
            <rect x={-26} y={14} width={52} height={10} fill={SIGNAL} />
            <rect x={-26} y={30} width={38} height={8} fill={INK} />
          </MiniScreen>
          <text x={0} y={-10} textAnchor="middle" {...HEAD} fontSize={14} fill={SIGNAL}>
            Misinformation & Synthetic Media
          </text>
        </g>

        {/* Right Pan: Censorship Risk */}
        <g transform="translate(230 -78)">
          <MiniScreen x={-42} y={0}>
            <rect x={-28} y={12} width={56} height={9} fill={INK} />
            <rect x={-28} y={25} width={56} height={9} fill={INK} />
            <rect x={-28} y={38} width={56} height={9} fill={SIGNAL} />
          </MiniScreen>
          <text x={0} y={-10} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
            Overreaching Censorship
          </text>
        </g>
      </g>

      {/* Bottom Interactive Knob Track */}
      <text x={24} y={272} {...HEAD} fontSize={13.5} fill={SIGNAL}>
        Misinformation Risk (0%)
      </text>
      <rect x={260} y={264} width={280} height={8} fill={INK} />
      <rect x={358} y={260} width={84} height={16} fill={COUNTER_FILL} stroke={COUNTER} strokeWidth={2} />
      <Knob
        x={260}
        y={268}
        len={280}
        min={0}
        max={100}
        step={5}
        value={filterStrictness}
        onChange={setFilterStrictness}
        label="Corporate content moderation balance from 0% unchecked misinformation to 100% heavy censorship"
        tone={stateTone}
      />
      <text x={560} y={272} {...HEAD} fontSize={13.5} fill={INK}>
        Censorship Risk (100%)
      </text>
    </Plate>
  );
}

/* ==========================================================================
   10 · Environmental Sustainability (Slide 1) — Frontier AI Training Cost &
   Carbon Footprint Comparator (Real Cited Data: GPT-3, GPT-4, Gemini Ultra)
   ========================================================================== */

const FRONTIER_MODELS = [
  {
    id: "gpt3",
    name: "GPT-3 (2020)",
    minM: 2.0,
    maxM: 4.6,
    staffM: null,
    rangeText: "$2 million to $4.6 million",
    note: "Estimated training compute cost",
    towers: 1,
  },
  {
    id: "gpt4",
    name: "GPT-4 (2023)",
    minM: 41.0,
    maxM: 78.4,
    staffM: 100.0,
    rangeText: "$41 million to $78.4 million (> $100M with staff salaries)",
    note: "Sam Altman suggested total cost exceeded $100M including staff salaries",
    towers: 3,
  },
  {
    id: "gemini",
    name: "Gemini Ultra (2023)",
    minM: 30.0,
    maxM: 191.0,
    staffM: null,
    rangeText: "$30 million to $191 million (excluding staff salaries)",
    note: "Google's advanced AI model estimated training cost range",
    towers: 4,
  },
];

export function AiTrainingFootprintComparatorInteractive({
  activeModel,
  onSelectModel,
}: {
  activeModel: number;
  onSelectModel: (i: number) => void;
}) {
  const [includeSalaries, setIncludeSalaries] = useState(false);
  const current = FRONTIER_MODELS[activeModel] ?? FRONTIER_MODELS[1];

  const scaleMax = 200; // $200M axis ceiling

  return (
    <Plate
      w={800}
      h={316}
      title={`Interactive frontier AI training cost and carbon footprint comparator: GPT-3 (2020, $2M–$4.6M), GPT-4 (2023, $41M–$78.4M, exceeding $100M with staff salaries), and Gemini Ultra (2023, $30M–$191M excluding staff salaries). Currently inspecting: ${current.name}`}
    >
      {/* Top model selector tabs + GPT-4 staff salary toggle */}
      {FRONTIER_MODELS.map((m, i) => {
        const isLit = i === activeModel;
        const x = 20 + i * 186;
        return (
          <g
            key={m.id}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={m.name}
            onClick={() => onSelectModel(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectModel(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={x} y={14} width={178} height={36} fill={isLit ? SIGNAL : INK} />
            <text x={x + 89} y={37} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
              {m.name}
            </text>
          </g>
        );
      })}

      {/* Staff salaries toggle (highlights Sam Altman >$100M quote on GPT-4) */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={includeSalaries}
        aria-label="Toggle GPT-4 staff salaries (> $100M total cost)"
        onClick={() => {
          setIncludeSalaries((s) => !s);
          onSelectModel(1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIncludeSalaries((s) => !s);
            onSelectModel(1);
          }
        }}
        className="cursor-pointer"
      >
        <rect
          x={582}
          y={14}
          width={198}
          height={36}
          fill={includeSalaries ? COUNTER : COUNTER_FILL}
          stroke={INK}
          strokeWidth={2}
        />
        <text
          x={681}
          y={37}
          textAnchor="middle"
          {...HEAD}
          fontSize={13}
          fill={includeSalaries ? CREAM : INK}
        >
          {includeSalaries ? "+ Staff Salaries: ON (>$100M)" : "+ Staff Salaries: OFF (Click)"}
        </text>
      </g>

      {/* Left: Cooling Tower & Data Center Carbon Footprint Silhouette */}
      <rect x={20} y={64} width={224} height={176} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <text x={132} y={88} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Carbon & Compute Scale
      </text>
      {Array.from({ length: current.towers }, (_, tIdx) => {
        const spacing = 46;
        const startX = r2(132 - ((current.towers - 1) * spacing) / 2);
        return (
          <CoolingTowerGlyph
            key={tIdx}
            bx={r2(startX + tIdx * spacing)}
            by={206}
            k={0.82}
            tone={INK}
            plume
          />
        );
      })}
      <text x={132} y={228} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        {current.name} Footprint
      </text>

      {/* Right: Framed Monitor showing the Min-to-Max Dollar Range Bars */}
      <Monitor x={262} y={64} w={518} h={176}>
        <text x={521} y={90} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
          Estimated Training Cost Range ($ Millions USD)
        </text>

        {FRONTIER_MODELS.map((m, i) => {
          const isLit = i === activeModel;
          const rowY = 108 + i * 38;
          const barX0 = 408;
          const maxTrackW = 240;
          const minW = Math.max(6, r2((m.minM / scaleMax) * maxTrackW));
          const maxW = Math.max(12, r2((m.maxM / scaleMax) * maxTrackW));
          const staffW = m.staffM ? r2((m.staffM / scaleMax) * maxTrackW) : null;

          return (
            <g
              key={m.id}
              onClick={() => onSelectModel(i)}
              className="cursor-pointer"
            >
              <text
                x={396}
                y={rowY + 16}
                textAnchor="end"
                {...HEAD}
                fontSize={13.5}
                fill={isLit ? SIGNAL : INK}
              >
                {m.name}
              </text>
              {/* Full range bar (max estimate) */}
              <rect
                x={barX0}
                y={rowY}
                width={maxW}
                height={22}
                fill={isLit ? SIGNAL : COUNTER_FILL}
                stroke={INK}
                strokeWidth={1.5}
              />
              {/* Minimum estimate solid core */}
              <rect x={barX0} y={rowY} width={minW} height={22} fill={INK} />
              {/* Optional >$100M staff salary extension for GPT-4 */}
              {includeSalaries && staffW && (
                <rect
                  x={r2(barX0 + maxW)}
                  y={rowY}
                  width={r2(staffW - maxW)}
                  height={22}
                  fill={COUNTER}
                />
              )}
              <text
                x={r2(barX0 + (includeSalaries && staffW ? staffW : maxW) + 8)}
                y={rowY + 16}
                {...BODY}
                fontSize={12.5}
                fill={INK}
              >
                {m.id === "gpt3" && "$2M–$4.6M"}
                {m.id === "gpt4" && (includeSalaries ? ">$100M" : "$41M–$78.4M")}
                {m.id === "gemini" && "$30M–$191M"}
              </text>
            </g>
          );
        })}
      </Monitor>

      {/* Bottom readout */}
      <rect x={20} y={278} width={760} height={28} fill={INK} />
      <text x={400} y={297} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
        {current.name}: {current.rangeText}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   11 · Environmental Sustainability (Slide 2) — 2017–2027 Exponential AI
   Training Cost Trajectory Forecaster ($930 Transformer -> >$78M GPT-4 -> >$1B 2027)
   ========================================================================== */

export function ExponentialCostForecasterInteractive() {
  // Annual growth factor in tenths: 20 = 2.0x/yr, 25 = 2.5x/yr, 30 = 3.0x/yr
  const [factorTenths, setFactorTenths] = useState(25);
  const factor = r2(factorTenths / 10);

  // Project from 2023 ($78.4M) over 4 years to 2027: 78.4 * factor^4
  const projected2027M = Math.round(78.4 * Math.pow(factor, 4));
  const projected2027B = r2(projected2027M / 1000);

  const milestones = [
    { year: "2017", model: "Transformer", costLabel: "$930", logH: 14, tone: INK },
    { year: "2020", model: "GPT-3", costLabel: "$2M–$4.6M", logH: 48, tone: INK },
    { year: "2023", model: "GPT-4", costLabel: "Over $78M", logH: 78, tone: SIGNAL },
    {
      year: "2027",
      model: "Projection",
      costLabel: `~$${projected2027B}B (>$1B)`,
      logH: r2(94 + ((factorTenths - 20) / 10) * 14),
      tone: COUNTER,
    },
  ];

  return (
    <Plate
      w={800}
      h={304}
      title={`Interactive 2017–2027 AI training cost growth instrument: from $930 for the 2017 Transformer model to over $78 million for GPT-4 in 2023, compounding at ${factor}x per year (between 2x and 3x per year) to exceed $1 billion (~$${projected2027B}B) by 2027`}
    >
      {/* Framed digital Monitor showing the logarithmic rising columns */}
      <Monitor x={20} y={14} w={760} h={212}>
        <rect x={36} y={28} width={728} height={26} fill={INK} />
        <text x={400} y={46} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
          2017–2027 Frontier Training Cost Trajectory (Log Scale · {factor}x / Year)
        </text>

        {milestones.map((m, i) => {
          const cx = 132 + i * 178;
          const baseY = 182;
          const barY = r2(baseY - m.logH);
          return (
            <g key={m.year}>
              <rect x={cx - 48} y={barY} width={96} height={m.logH} fill={m.tone} />
              <text x={cx} y={barY - 7} textAnchor="middle" {...HEAD} fontSize={13.5} fill={m.tone}>
                {m.costLabel}
              </text>
              <text x={cx} y={202} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
                {m.year} · {m.model}
              </text>
              {i < milestones.length - 1 && (
                <Pointer
                  x1={cx + 54}
                  y1={r2(barY + m.logH / 2)}
                  x2={cx + 122}
                  y2={r2(baseY - milestones[i + 1].logH / 2)}
                  w={3.5}
                  color={SIGNAL}
                />
              )}
            </g>
          );
        })}
      </Monitor>

      {/* Bottom Interactive Growth Factor Slider (2.0x to 3.0x per year) */}
      <text x={24} y={280} {...HEAD} fontSize={14} fill={INK}>
        Growth Factor: {factor}x / yr (2x–3x)
      </text>
      <rect x={340} y={272} width={220} height={8} fill={INK} />
      <rect x={340} y={272} width={r2(((factorTenths - 20) / 10) * 220)} height={8} fill={SIGNAL} />
      <Knob
        x={340}
        y={276}
        len={220}
        min={20}
        max={30}
        step={1}
        value={factorTenths}
        onChange={setFactorTenths}
        label="Annual AI training cost growth factor between 2.0x and 3.0x per year"
        tone={SIGNAL}
      />
      <text x={584} y={280} {...HEAD} fontSize={14} fill={COUNTER}>
        2027: &gt;$1B (~${projected2027B}B)
      </text>
    </Plate>
  );
}

/* ==========================================================================
   12 · Platform Power and Digital Monopolies — Interactive Network-Effects
   & Top-5 Cloud Centralization Funnel
   "In 2024, if you were to host your website, you had to go through one of
   top five cloud companies."
   ========================================================================== */

export function CloudMonopolyGravityInteractive() {
  const [networkStrength, setNetworkStrength] = useState(90);
  const t = networkStrength / 100;

  // 8 website traffic streams that converge into the 5 cloud monoliths as t approaches 1
  const clouds = [86, 178, 270, 362, 454];
  const sites = [46, 110, 174, 238, 302, 366, 430, 494];

  return (
    <Plate
      w={540}
      h={360}
      title={`Interactive platform power and cloud monopoly funnel: drag the network effects slider (${networkStrength}%) to watch independent websites converge through the top five cloud companies in 2024 under winner-takes-all dynamics`}
    >
      {/* Top 8 Website / Business Nodes */}
      <text x={270} y={22} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Independent Websites & Digital Businesses Seeking Hosting
      </text>
      {sites.map((sx, idx) => {
        // Target cloud monolith index (0..4)
        const targetCloudX = clouds[idx % 5];
        const endX = r2(sx * (1 - t) + targetCloudX * t);
        return (
          <g key={sx}>
            <rect x={sx - 20} y={32} width={40} height={24} fill={INK} />
            <rect x={sx - 16} y={36} width={32} height={16} fill={CREAM} />
            <path
              d={`M ${sx} 56 C ${sx} 96 ${endX} 96 ${endX} 132`}
              fill="none"
              stroke={t > 0.5 ? SIGNAL : INK}
              strokeWidth={3}
            />
          </g>
        );
      })}

      {/* Central Framed Digital Screen: The Top Five Cloud Companies (2024) */}
      <Monitor x={24} y={134} w={492} h={146}>
        <text x={270} y={158} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
          2024 Winner-Takes-All Gateway: Top Five Cloud Companies
        </text>
        {clouds.map((cx, i) => (
          <g key={cx}>
            <rect
              x={cx - 34}
              y={170}
              width={68}
              height={84}
              fill={t > 0.5 ? SIGNAL : INK}
            />
            <rect x={cx - 24} y={182} width={48} height={6} fill={CREAM} />
            <rect x={cx - 24} y={196} width={48} height={6} fill={CREAM} />
            <rect x={cx - 24} y={210} width={48} height={6} fill={CREAM} />
            <text x={cx} y={242} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
              Cloud #{i + 1}
            </text>
          </g>
        ))}
      </Monitor>

      {/* Bottom Interactive Network Effects Slider */}
      <text x={24} y={336} {...HEAD} fontSize={13.5} fill={INK}>
        Network Effects: {networkStrength}%
      </text>
      <rect x={336} y={328} width={168} height={8} fill={INK} />
      <rect x={336} y={328} width={r2(t * 168)} height={8} fill={SIGNAL} />
      <Knob
        x={336}
        y={332}
        len={168}
        min={0}
        max={100}
        step={10}
        value={networkStrength}
        onChange={setNetworkStrength}
        label="Network effects and winner-takes-all centralization slider"
        tone={SIGNAL}
      />
    </Plate>
  );
}

/* ==========================================================================
   13 · Further Readings — Interactive Weapons of Math Destruction (O'Neil, 2016)
   Three-Gear Inequality & Democracy Feedback Escapement
   ========================================================================== */

const WMD_PILLARS = [
  {
    num: "01",
    short: "Opacity",
    name: "Opacity (Black-Box Scoring)",
    desc: "Citizens and workers are scored by proprietary mathematical models they cannot inspect or appeal.",
  },
  {
    num: "02",
    short: "Scale",
    name: "Scale (Mass Automation)",
    desc: "Big Data deploys the same automated judgment across millions of loans, jobs, schools, and sentences.",
  },
  {
    num: "03",
    short: "Damage",
    name: "Inequality & Democratic Harm",
    desc: "Punitive feedback loops lock disadvantaged groups out of opportunity, widening inequality.",
  },
];

export function WeaponsOfMathDestructionInteractive() {
  const [activeGear, setActiveGear] = useState(0);
  const current = WMD_PILLARS[activeGear] ?? WMD_PILLARS[0];
  const gearCenters = [156, 400, 644];

  return (
    <Plate
      w={800}
      h={276}
      title={`Interactive three-gear diagram of Cathy O'Neil's Weapons of Math Destruction (2016): 01 Opacity, 02 Scale, and 03 Inequality & Democratic Harm. Currently inspecting Gear ${current.num}: ${current.name}`}
    >
      {/* Top header */}
      <rect x={24} y={14} width={752} height={34} fill={INK} />
      <text x={400} y={36} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
        O&apos;Neil (2016) · How Big Data Increases Inequality and Threatens Democracy (Click a Gear)
      </text>

      {/* Three meshing gears */}
      {gearCenters.map((cx, i) => {
        const isLit = i === activeGear;
        const p = WMD_PILLARS[i];
        return (
          <g
            key={p.num}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={`${p.num} ${p.name}`}
            onClick={() => setActiveGear(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveGear(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={cx - 108} y={54} width={216} height={134} fill="transparent" />
            <GearWheelGlyph cx={cx} cy={112} r={34} teeth={10} tone={isLit ? SIGNAL : INK} />
            <text x={cx} y={176} textAnchor="middle" {...HEAD} fontSize={14.5} fill={isLit ? SIGNAL : INK}>
              {p.num} · {p.short}
            </text>
            {i < 2 && (
              <Pointer x1={cx + 58} y1={112} x2={gearCenters[i + 1] - 58} y2={112} w={4} color={SIGNAL} />
            )}
          </g>
        );
      })}

      {/* Bottom readout box + digital MiniScreen on cream */}
      <rect x={24} y={194} width={632} height={72} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <text x={44} y={222} {...HEAD} fontSize={16} fill={SIGNAL}>
        {current.num} · {current.name}
      </text>
      <text x={44} y={248} {...BODY} fontSize={13.5} fill={INK}>
        {current.desc}
      </text>
      <MiniScreen x={682} y={194}>
        <GearWheelGlyph cx={724} cy={222} r={14} teeth={6} tone={SIGNAL} />
      </MiniScreen>
    </Plate>
  );
}
