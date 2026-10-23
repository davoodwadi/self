/* ==========================================================================
   Week 1 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   A solid black silhouette on cream is the physical business; the same
   silhouette on a framed screen is its digital version. Fixed cast:
     · Shop     — the business
     · Doc      — information (a paper page)
     · Monitor / MiniScreen — the digital place
     · Person   — every human (bust in profile)
   Every coordinate is a literal or rounded, so server and client match.
   ========================================================================== */

import React from "react";
import { Laptop, Gear, Heart, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import { CREAM, INK, SIGNAL, r2, Plate, Monitor, MiniScreen, Arrow, Pointer } from "../_visuals/kit";
import { Shop, Doc, Person } from "../_visuals/objects";

/* ==========================================================================
   Hero — a physical shop and the same shop on a screen
   ========================================================================== */

export function HeroShopScreen() {
  return (
    <Plate
      w={560}
      h={240}
      title="A black shop silhouette, an arrow, and the same black shop on a framed screen"
    >
      <Shop x={40} y={27} k={1.1} />
      <Arrow x1={240} x2={314} y={109} />
      <Monitor x={330} y={24} w={200} h={170}>
        <Shop x={370} y={53} k={0.75} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   Technology, people and processes — equally important
   ========================================================================== */

export function EqualFooting() {
  const tops = [88, 200, 312];
  return (
    <Plate
      h={212}
      title="Three plinths of equal height: a laptop on the first, a person on the second and a gear on the third"
    >
      {tops.map((cx) => (
        <rect key={cx} x={cx - 52} y={150} width={104} height={36} fill={INK} />
      ))}
      <Laptop x={88 - 62} y={40.5} size={124} weight="fill" color={INK} />
      <Person x={200} y={22} k={1.16} />
      <Gear x={312 - 58} y={41.4} size={116} weight="fill" color={INK} />
    </Plate>
  );
}

/* ==========================================================================
   Data-driven decision-making
   ========================================================================== */

export function DataDecision() {
  const bars = [40, 64, 96, 56];
  const base = 144;
  return (
    <Plate
      h={212}
      title="A person looks at a screen showing four bars of data; the tallest bar, the one chosen, is red"
    >
      <Person x={84} y={66} k={1.3} variant={3} glasses="round" />
      <Monitor x={170} y={26} w={200} h={140}>
        {bars.map((hgt, i) => (
          <rect
            key={i}
            x={194 + i * 42}
            y={base - hgt}
            width={26}
            height={hgt}
            fill={i === 2 ? SIGNAL : INK}
          />
        ))}
        <rect x={186} y={base + 2} width={168} height={2.5} fill={INK} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   Six key components of digital transformation — six stations flanking and
   feeding into the central digital business (a Shop on a framed Monitor)
   ========================================================================== */

const COMPONENT_NODES = [
  { name: "1. Technology integration", lines: ["1. Technology", "integration"] },
  { name: "2. Cultural change", lines: ["2. Cultural", "change"] },
  { name: "3. Customer-centric approach", lines: ["3. Customer-", "centric"] },
  { name: "4. Process optimization", lines: ["4. Process", "optimization"] },
  { name: "5. Data-driven decision making", lines: ["5. Data-driven", "decisions"] },
  { name: "6. Agility and flexibility", lines: ["6. Agility and", "flexibility"] },
];

function ComponentGlyph({ i, wx, wy }: { i: number; wx: number; wy: number }) {
  switch (i) {
    case 0:
      return <Laptop x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
    case 1:
      return (
        <g>
          <Person x={wx + 19} y={wy + 12} k={0.42} variant={6} />
          <Person x={wx + 43} y={wy + 12} k={0.42} variant={1} gap />
        </g>
      );
    case 2:
      return (
        <g>
          <Person x={wx + 21} y={wy + 10} k={0.44} variant={0} />
          <Heart x={wx + 38} y={wy + 18} size={21} weight="fill" color={INK} />
        </g>
      );
    case 3:
      return (
        <g>
          <Gear x={wx + 8} y={wy + 8} size={28} weight="fill" color={INK} />
          <Gear x={wx + 31} y={wy + 24} size={26} weight="fill" color={INK} />
        </g>
      );
    case 4: {
      const bars = [16, 26, 38, 22];
      const base = wy + 48;
      return (
        <g>
          {bars.map((hgt, j) => (
            <rect key={j} x={wx + 10 + j * 12} y={base - hgt} width={8} height={hgt} fill={INK} />
          ))}
          <rect x={wx + 8} y={base + 1.5} width={48} height={2} fill={INK} />
        </g>
      );
    }
    default:
      return <ArrowsClockwise x={wx + 10} y={wy + 8} size={44} weight="fill" color={INK} />;
  }
}

export function KeyComponentsHub({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cardW = 228;
  const cardH = 76;
  const targetYs = [104, 134, 164];
  const activeName = COMPONENT_NODES[active]?.name ?? "1. Technology integration";
  const title = `Six key components of digital transformation feeding into a central framed screen holding a business shop: 1. Technology integration, 2. Cultural change, 3. Customer-centric approach, 4. Process optimization, 5. Data-driven decisions, and 6. Agility and flexibility; ${activeName} is highlighted in red`;

  return (
    <Plate w={800} h={292} title={title}>
      {/* Central digital business: Shop on a Monitor */}
      <Monitor x={310} y={64} w={180} h={140}>
        <Shop x={348} y={88} k={0.65} />
      </Monitor>

      {COMPONENT_NODES.map((node, i) => {
        const isLeft = i < 3;
        const row = i % 3;
        const x = isLeft ? 16 : 556;
        const y = 16 + row * 92;
        const cy = y + cardH / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const wx = x + 8;
        const wy = y + 8;
        const tx = x + 150;

        return (
          <g
            key={node.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? node.name : undefined}
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
            <Pointer
              x1={isLeft ? x + cardW + 4 : x - 4}
              y1={cy}
              x2={isLeft ? 302 : 498}
              y2={targetYs[row]}
              w={isLit ? 4.5 : 3}
              color={tone}
              head={12}
            />
            <rect x={x} y={y} width={cardW} height={cardH} fill={tone} />
            <rect x={wx} y={wy} width={64} height={60} fill={CREAM} />
            <ComponentGlyph i={i} wx={wx} wy={wy} />
            {node.lines.map((line, j) => (
              <text
                key={j}
                x={tx}
                y={r2(cy + 5.5 + (j - (node.lines.length - 1) / 2) * 21)}
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

export function KeyComponentsHubTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cardW = 180;
  const cardH = 76;
  const activeName = COMPONENT_NODES[active]?.name ?? "1. Technology integration";
  const title = `Six key components of digital transformation: 1. Technology integration, 2. Cultural change, 3. Customer-centric approach, 4. Process optimization, 5. Data-driven decisions, and 6. Agility and flexibility; ${activeName} is highlighted in red`;

  return (
    <Plate w={400} h={276} title={title}>
      {COMPONENT_NODES.map((node, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 14 : 206;
        const y = 14 + row * 86;
        const cy = y + cardH / 2;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        const wx = x + 6;
        const wy = y + 8;
        const tx = x + 126;

        return (
          <g
            key={node.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? node.name : undefined}
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
            <rect x={x} y={y} width={cardW} height={cardH} fill={tone} />
            <rect x={wx} y={wy} width={64} height={60} fill={CREAM} />
            <ComponentGlyph i={i} wx={wx} wy={wy} />
            {node.lines.map((line, j) => (
              <text
                key={j}
                x={tx}
                y={r2(cy + 5 + (j - (node.lines.length - 1) / 2) * 19)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={13.5}
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
   Five steps from digitization to digital transformation
   (recreates the dt.png staircase in the course's own cast)
   ========================================================================== */

const STEP_NAMES = [
  ["Digitize", "information"],
  ["Organize", "information"],
  ["Automate", "processes"],
  ["Streamline", "processes"],
  ["Transform the", "institution"],
];

const STEP_GROUPS = [
  { from: 0, to: 1, name: "Digitization", lines: ["1. Digitization"] },
  { from: 2, to: 3, name: "Digitalization", lines: ["2. Digitalization"] },
  { from: 4, to: 4, name: "Digital transformation", lines: ["3. Digital", "transformation"] },
];

/* The glyph for step i on a MiniScreen whose top-left is (x, y). */
function StepGlyph({ i, x, y }: { i: number; x: number; y: number }) {
  switch (i) {
    case 0:
      return <Doc x={x + 26.7} y={y + 8.3} k={0.34} />;
    case 1:
      return (
        <g>
          {[0, 1, 2].map((j) => (
            <Doc key={j} x={x + 10 + j * 22} y={y + 14} k={0.2} />
          ))}
        </g>
      );
    case 2:
      return <Gear x={x + 22} y={y + 8} size={40} weight="fill" color={INK} />;
    case 3:
      return (
        <g>
          <Gear x={x + 14} y={y + 11} size={30} weight="fill" color={INK} />
          <Gear x={x + 39} y={y + 15} size={30} weight="fill" color={INK} />
        </g>
      );
    default:
      return <Shop x={x + 21.2} y={y + 8.5} k={0.26} />;
  }
}

function StepLabel({ i, cx, y, size }: { i: number; cx: number; y: number; size: number }) {
  return (
    <>
      {STEP_NAMES[i].map((line, j) => (
        <text
          key={j}
          x={cx}
          y={y + j * Math.round(size * 1.4)}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontWeight={600}
          fontSize={size}
          fill={CREAM}
        >
          {line}
        </text>
      ))}
    </>
  );
}

/* ==========================================================================
   Five steps from digitization to digital transformation
   (recreates the dt.png staircase in the course's own cast)
   Wide: a staircase. Tall (phones): rows with bars that grow at each step.
   ========================================================================== */

export function TransformationSteps({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const x0 = 40;
  const pitch = 144;
  const w = 136;
  const bottom = 310;
  const tops = [256, 229, 202, 175, 148];
  // screen (84 × 56 + 14 stand) centred on each step, 6 above its top
  const sx = (i: number) => x0 + i * pitch + (w - 84) / 2;
  const sy = (i: number) => tops[i] - 6 - 70;
  const activeGroup = STEP_GROUPS[active]?.name ?? "Digitization";
  const title = `Five rising steps, each with a small screen: digitize information (a page), organize information (three pages), automate processes (a gear), streamline processes (two gears), and transform the institution (a shop). Steps 1–2 are grouped as 1. Digitization, 3–4 as 2. Digitalization, and 5 as 3. Digital transformation; ${activeGroup} is highlighted in red`;

  return (
    <Plate w={800} h={320} title={title}>
      {STEP_GROUPS.map((g, gi) => {
        const isLit = gi === active;
        const tone = isLit ? SIGNAL : INK;
        const left = x0 + g.from * pitch;
        const right = x0 + g.to * pitch + w;
        const cx = (left + right) / 2;
        const y = sy(g.to) - 12;
        const indices = Array.from({ length: g.to - g.from + 1 }, (_, k) => g.from + k);
        const topHit = y - 8 - (g.lines.length - 1) * 26 - 18;
        return (
          <g
            key={g.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? g.name : undefined}
            onClick={onSelect ? () => onSelect(gi) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(gi);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect
              x={left}
              y={topHit}
              width={right - left}
              height={bottom - topHit}
              fill="transparent"
            />
            <path
              d={`M ${left} ${y + 10} V ${y} H ${right} V ${y + 10}`}
              stroke={tone}
              strokeWidth={3}
              fill="none"
            />
            {g.lines.map((line, j) => (
              <text
                key={j}
                x={cx}
                y={y - 8 - (g.lines.length - 1 - j) * 26}
                textAnchor="middle"
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={17.5}
                fill={tone}
              >
                {line}
              </text>
            ))}
            {indices.map((i) => {
              const t = tops[i];
              return (
                <g key={i}>
                  <rect x={x0 + i * pitch} y={t} width={w} height={bottom - t} fill={tone} />
                  <StepLabel i={i} cx={x0 + i * pitch + w / 2} y={t + 22} size={15} />
                  <MiniScreen x={sx(i)} y={sy(i)}>
                    <StepGlyph i={i} x={sx(i)} y={sy(i)} />
                  </MiniScreen>
                </g>
              );
            })}
          </g>
        );
      })}
    </Plate>
  );
}

export function TransformationStepsTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const head = 38;
  const row = 86;
  const groups: { gi: number; headY: number; rows: { i: number; y: number }[]; bottomY: number }[] = [];
  let y = 14;
  STEP_GROUPS.forEach((g, gi) => {
    const headY = y;
    y += head;
    const rows: { i: number; y: number }[] = [];
    for (let i = g.from; i <= g.to; i++) {
      rows.push({ i, y });
      y += row;
    }
    const bottomY = y;
    groups.push({ gi, headY, rows, bottomY });
    y += 8;
  });
  const activeGroup = STEP_GROUPS[active]?.name ?? "Digitization";
  const title = `Five rising steps grouped as 1. Digitization, 2. Digitalization, and 3. Digital transformation; ${activeGroup} is highlighted in red`;

  return (
    <Plate w={400} h={y - 4} title={title}>
      {groups.map(({ gi, headY, rows, bottomY }) => {
        const g = STEP_GROUPS[gi];
        const isLit = gi === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={g.name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? g.name : undefined}
            onClick={onSelect ? () => onSelect(gi) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(gi);
                    }
                  }
                : undefined
            }
            className={onSelect ? "cursor-pointer outline-none focus:outline-none" : undefined}
          >
            <rect x={8} y={headY} width={384} height={bottomY - headY} fill="transparent" />
            <text
              x={16}
              y={headY + 16}
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={20}
              fill={tone}
            >
              {`${gi + 1}. ${g.name}`}
            </text>
            <path
              d={`M 16 ${headY + 34} V ${headY + 26} H 384 V ${headY + 34}`}
              stroke={tone}
              strokeWidth={3}
              fill="none"
            />
            {rows.map(({ i, y: ry0 }) => {
              const bw = 150 + i * 30;
              const ry = ry0 + 4;
              return (
                <g key={i}>
                  <MiniScreen x={16} y={ry}>
                    <StepGlyph i={i} x={16} y={ry} />
                  </MiniScreen>
                  <rect x={114} y={ry + 6} width={bw} height={56} fill={tone} />
                  <StepLabel i={i} cx={114 + bw / 2} y={ry + 29} size={17} />
                </g>
              );
            })}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   The Digital Transformation Pyramid — five solid layers from the
   foundation up, and the optional innovation layer as an open outline
   ========================================================================== */

const LAYERS = [
  ["1. Foundation"],
  ["2. Data"],
  ["3. Process"],
  ["4. Customer experience"],
  ["5. Culture and", "leadership"],
  ["6. Innovation"],
];

export function Pyramid({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cx = 200;
  const bandH = 52;
  const gap = 6;
  const widths = [384, 340, 296, 252, 208, 164];
  const bottom = 8 + LAYERS.length * bandH + (LAYERS.length - 1) * gap;
  const activeName = LAYERS[active]?.join(" ") ?? "1. Foundation";
  return (
    <Plate
      h={bottom + 8}
      title={`A stepped pyramid of six numbered layers from the bottom up: 1. Foundation, 2. Data, 3. Process, 4. Customer experience, 5. Culture and leadership, and 6. Innovation on top as an open outline because it is optional; ${activeName} is highlighted in red`}
    >
      {LAYERS.map((lines, i) => {
        const w = widths[i];
        const y = bottom - (i + 1) * bandH - i * gap;
        const optional = i === LAYERS.length - 1;
        const isLit = i === active;
        const fill = optional ? (isLit ? SIGNAL : CREAM) : isLit ? SIGNAL : INK;
        const stroke = optional ? (isLit ? SIGNAL : INK) : "none";
        const textFill = optional && !isLit ? INK : CREAM;
        const label = lines.join(" ");
        return (
          <g
            key={lines[0]}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={onSelect ? label : undefined}
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
            <rect
              x={cx - w / 2 + (optional ? 1.5 : 0)}
              y={y + (optional ? 1.5 : 0)}
              width={w - (optional ? 3 : 0)}
              height={bandH - (optional ? 3 : 0)}
              fill={fill}
              stroke={stroke}
              strokeWidth={optional ? 3 : 0}
            />
            {lines.map((line, j) => (
              <text
                key={j}
                x={cx}
                y={r2(y + bandH / 2 + 5.5 + (j - (lines.length - 1) / 2) * 22)}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={15}
                fill={textFill}
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
