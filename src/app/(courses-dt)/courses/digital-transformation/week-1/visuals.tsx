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
import { Laptop, Gear } from "@phosphor-icons/react/dist/ssr";
import { CREAM, INK, SIGNAL, Plate, Monitor, MiniScreen, Arrow } from "../_visuals/kit";
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
      <Person x={200} y={26} k={1.2} />
      <Gear x={312 - 58} y={41.4} size={116} weight="fill" color={INK} />
    </Plate>
  );
}

/* ==========================================================================
   Data-driven decision-making
   ========================================================================== */

export function DataDecision() {
  const bars = [40, 64, 96, 56];
  const base = 148;
  return (
    <Plate
      h={222}
      title="A person looks at a screen showing four bars of data; the tallest bar, the one chosen, is red"
    >
      <Person x={84} y={70} k={1.3} hair="crop" />
      <Monitor x={170} y={30} w={200} h={140}>
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
  { from: 0, to: 1, name: "Digitization", tone: INK },
  { from: 2, to: 3, name: "Digitalization", tone: INK },
  { from: 4, to: 4, name: "Digital transformation", tone: SIGNAL },
];

const STEPS_TITLE =
  "Five rising steps, each with a small screen: digitize information (a page), organize information (three pages), automate processes (a gear), streamline processes (two gears), and transform the institution (a red shop on the red last step). Steps 1–2 are grouped as digitization, 3–4 as digitalization and 5 as digital transformation";

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
      return <Shop x={x + 21.2} y={y + 8.5} k={0.26} tone={SIGNAL} />;
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

export function TransformationSteps() {
  const x0 = 40;
  const pitch = 144;
  const w = 136;
  const bottom = 384;
  const tops = [324, 284, 244, 204, 164];
  // screen (84 × 56 + 14 stand) centred on each step, 6 above its top
  const sx = (i: number) => x0 + i * pitch + (w - 84) / 2;
  const sy = (i: number) => tops[i] - 6 - 70;
  return (
    <Plate w={800} h={404} title={STEPS_TITLE}>
      {tops.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * pitch} y={t} width={w} height={bottom - t} fill={i === 4 ? SIGNAL : INK} />
          <StepLabel i={i} cx={x0 + i * pitch + w / 2} y={t + 24} size={15} />
          <MiniScreen x={sx(i)} y={sy(i)}>
            <StepGlyph i={i} x={sx(i)} y={sy(i)} />
          </MiniScreen>
        </g>
      ))}
      {STEP_GROUPS.map((g) => {
        const left = x0 + g.from * pitch;
        const right = x0 + g.to * pitch + w;
        const y = sy(g.to) - 18;
        return (
          <g key={g.name}>
            <path
              d={`M ${left} ${y + 10} V ${y} H ${right} V ${y + 10}`}
              stroke={g.tone}
              strokeWidth={3}
              fill="none"
            />
            <text
              x={g.from === 4 ? right : (left + right) / 2}
              y={y - 10}
              textAnchor={g.from === 4 ? "end" : "middle"}
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={20}
              fill={g.tone}
            >
              {g.name}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function TransformationStepsTall() {
  const head = 38;
  const row = 86;
  // lay out headings and rows top to bottom
  const items: { kind: "head" | "row"; i: number; y: number }[] = [];
  let y = 14;
  STEP_GROUPS.forEach((g, gi) => {
    items.push({ kind: "head", i: gi, y });
    y += head;
    for (let i = g.from; i <= g.to; i++) {
      items.push({ kind: "row", i, y });
      y += row;
    }
    y += 8;
  });
  return (
    <Plate w={400} h={y - 4} title={STEPS_TITLE}>
      {items.map((it) => {
        if (it.kind === "head") {
          const g = STEP_GROUPS[it.i];
          return (
            <g key={`h${it.i}`}>
              <text
                x={16}
                y={it.y + 16}
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={20}
                fill={g.tone}
              >
                {g.name}
              </text>
              <path
                d={`M 16 ${it.y + 34} V ${it.y + 26} H 384 V ${it.y + 34}`}
                stroke={g.tone}
                strokeWidth={3}
                fill="none"
              />
            </g>
          );
        }
        const bw = 150 + it.i * 30;
        const ry = it.y + 4;
        return (
          <g key={`r${it.i}`}>
            <MiniScreen x={16} y={ry}>
              <StepGlyph i={it.i} x={16} y={ry} />
            </MiniScreen>
            <rect x={114} y={ry + 6} width={bw} height={56} fill={it.i === 4 ? SIGNAL : INK} />
            <StepLabel i={it.i} cx={114 + bw / 2} y={ry + 29} size={17} />
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
  ["Foundation"],
  ["Data"],
  ["Process"],
  ["Customer experience"],
  ["Culture and", "leadership"],
  ["Innovation"],
];

export function Pyramid() {
  const cx = 200;
  const bandH = 54;
  const gap = 6;
  const widths = [384, 336, 288, 240, 192, 144];
  const bottom = 8 + LAYERS.length * bandH + (LAYERS.length - 1) * gap;
  return (
    <Plate
      h={bottom + 8}
      title="A stepped pyramid of six layers. From the bottom: Foundation, Data, Process, Customer experience, Culture and leadership as solid black blocks, and Innovation on top as an open outline because it is optional"
    >
      {LAYERS.map((lines, i) => {
        const w = widths[i];
        const y = bottom - (i + 1) * bandH - i * gap;
        const optional = i === LAYERS.length - 1;
        return (
          <g key={lines[0]}>
            <rect
              x={cx - w / 2 + (optional ? 1.5 : 0)}
              y={y + (optional ? 1.5 : 0)}
              width={w - (optional ? 3 : 0)}
              height={bandH - (optional ? 3 : 0)}
              fill={optional ? "none" : INK}
              stroke={optional ? INK : "none"}
              strokeWidth={3}
            />
            {lines.map((line, j) => (
              <text
                key={j}
                x={cx}
                y={y + bandH / 2 + 5.5 + (j - (lines.length - 1) / 2) * 22.4}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontWeight={600}
                fontSize={16}
                fill={optional ? INK : CREAM}
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
