/* ==========================================================================
   Week 01 plates: Research for Marketing Decisions.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import {
  Tag,
  Scales,
  Newspaper,
  Storefront,
  Clock,
  Train,
  ArrowUp,
  Question,
  Lightbulb,
  ClipboardText,
  ChartBar,
  PresentationChart,
  Buildings,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import {
  Frame,
  Key,
  Note,
  Display,
  INK,
  INK3,
  RULE2,
  SIGNAL,
  PAPER3,
  SIGNAL_TINT,
  COUNTER_TINT,
  head,
  headAlong,
  bellPath,
  r2,
  COUNTER,
  PAPER,
  RULE,
  Slider,
} from "../_visuals/kit";
import { Person1, Cup1, AiMark1, Tick1 } from "../_visuals/objects";

/**
 * The Purpose of Marketing Research: the same question, level of demand,
 * answered from assumptions (a wide spread of plausible values) and from
 * evidence (a narrow one).
 *
 * Interactive: the slider sets how many respondents the study hears from.
 * With none it would be the assumptions curve (so the slider starts at 20); each added
 * respondent narrows it, quickly at first and then with diminishing returns
 * (the spread falls with the square root of the sample). It opens at 400,
 * the state the slide shows before anyone touches it.
 */
export function UncertaintyNarrowing() {
  const [n, setN] = useState(400);
  const base = 168;
  const x0 = 20;
  const x1 = 380;
  const wide = { x0, x1: 370, base, mean: 200, sd: 68, peak: 46 };
  // Spread and centre move from the assumptions curve (the n = 0 limit) towards the
  // evidence; the peak rises as the spread narrows, capped inside the frame.
  const sd = r2(wide.sd / Math.sqrt(1 + n / 20));
  const t = (wide.sd - sd) / (wide.sd - 12);
  const mean = r2(wide.mean + 22 * t);
  const peak = r2(wide.peak * (wide.sd / sd) ** 0.68);
  const narrow = {
    x0: r2(Math.max(x0, mean - 4 * sd)),
    x1: r2(Math.min(wide.x1, mean + 4 * sd)),
    base,
    mean,
    sd,
    peak,
  };
  return (
    <>
      <Frame
        width={400}
        height={206}
        label={`Two curves of plausible demand over one axis: a wide, flat curve for assumptions and, from ${n} respondents, a ${n < 40 ? "still wide" : "narrow, tall"} curve for evidence`}
      >
        <path d={bellPath({ ...wide, close: true })} fill={PAPER3} />
        <path d={bellPath(wide)} fill="none" stroke={INK} strokeWidth={1.25} />
        <path d={bellPath({ ...narrow, close: true })} fill={SIGNAL_TINT} />
        <path d={bellPath(narrow)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
        <line x1={x0} y1={base} x2={x1} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(x1, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <Key x={36} y={112} fill={INK}>ASSUMPTIONS</Key>
        <line x1={70} y1={118} x2={78} y2={150} stroke={RULE2} strokeWidth={1} />
        <Key x={r2(mean + 1.3 * sd + 6)} y={r2(base - peak * 0.75)} fill={SIGNAL}>EVIDENCE</Key>
        <Key x={x1} y={192} anchor="end" fill={INK3}>LEVEL OF DEMAND</Key>
      </Frame>
      <Slider label="Respondents" value={n} min={20} max={600} step={10} onChange={setN} />
    </>
  );
}

/**
 * Research, Analytics, and Intelligence: one lane per activity over the same
 * stretch of time. Research is a bounded project that asks one question of
 * new respondents; analytics is a continuous series of the firm's own data,
 * run forward as a forecast; intelligence is a steady run of observations of
 * the outside world (competitor prices, regulation, industry news).
 *
 * Interactive: `now` is the latest tick on the shared axis, with a cursor
 * just after it through every lane. Before the project starts, research is only an empty outline;
 * its respondents arrive one per tick and the answer lands at its close.
 * Analytics is solid up to now and a dashed forecast after it; intelligence
 * holds the observations made so far.
 */
const LANE_TICKS = Array.from({ length: 12 }, (_, i) => 36 + i * 46);
/** Research runs from this tick to that one; the lanes open at NOW_DEFAULT. */
const PROJECT_START = 4;
const PROJECT_END = 8;
const NOW_DEFAULT = 9;

export function EvidenceLane({
  kind,
  now = NOW_DEFAULT,
  onScrub,
}: {
  kind: "research" | "analytics" | "intelligence";
  now?: number;
  onScrub?: (tick: number) => void;
}) {
  const W = 600;
  const axisY = 96;
  const x0 = 12;
  const x1 = 588;
  const ticks = LANE_TICKS;
  const nowX = ticks[now];
  // The cursor sits half a tick after the latest reading, so it runs between
  // marks rather than through them.
  const cursorX = r2(nowX + 23);

  let label = "";
  let body: React.ReactNode = null;
  if (kind === "research") {
    const bx = 196;
    const bw = 208;
    const started = now >= PROJECT_START;
    const done = now >= PROJECT_END;
    const answered = Math.max(0, Math.min(4, now - PROJECT_START));
    label = !started
      ? "A time line with one bounded project not yet started: an empty outline ahead of now"
      : done
        ? "A time line with one bounded project: a question, four respondents answering, and an answer, with nothing before or after it"
        : `A time line with one bounded project under way: a question and ${answered} of four respondents so far, no answer yet`;
    body = started ? (
      <g>
        <rect x={bx} y={14} width={bw} height={axisY - 14} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
        {/* the question */}
        <circle cx={bx + 26} cy={52} r={13} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
        <text x={bx + 26} y={57.5} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={17} fontWeight={600} fill={SIGNAL}>?</text>
        {/* new respondents, one per tick of fieldwork */}
        {Array.from({ length: answered }, (_, i) => (
          <Person1 key={i} x={bx + 64 + i * 26} y={80} k={0.95} stroke={INK} fill={PAPER} />
        ))}
        {/* the answer */}
        {done ? (
          <g>
            <circle cx={bx + bw - 26} cy={52} r={13} fill={SIGNAL} />
            <path d={`M${bx + bw - 32} 52.5l4.5 4.5l8-9`} fill="none" stroke={PAPER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ) : null}
      </g>
    ) : (
      <rect x={bx} y={14} width={bw} height={axisY - 14} fill="none" stroke={RULE2} strokeWidth={1.5} strokeDasharray="4 4" />
    );
  } else if (kind === "analytics") {
    const pts = ticks.map((x, i) => [x, r2(66 - i * 2.2 - 10 * Math.sin(i * 1.3) - (i % 3) * 3)] as const);
    const past = pts.slice(0, now + 1);
    const future = pts.slice(now);
    const line = (ps: readonly (readonly [number, number])[]) => ps.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
    label =
      future.length > 1
        ? "A time line with a continuous line of the firm's own sales data up to now, continued as a dashed forecast"
        : "A time line with a continuous line of the firm's own sales data up to now";
    const keyLeft = now >= 2;
    body = (
      <g>
        <Key x={keyLeft ? cursorX - 8 : cursorX + 8} y={24} anchor={keyLeft ? "end" : "start"} fill={INK3} size={10}>NOW</Key>
        <path d={line(past)} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        {future.length > 1 ? (
          <path d={line(future)} fill="none" stroke={INK} strokeWidth={2} strokeDasharray="5 4" strokeLinejoin="round" />
        ) : null}
        {past.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r={3} fill={INK} />
        ))}
      </g>
    );
  } else {
    const icons = [Tag, Scales, Newspaper];
    label =
      "A time line with a steady run of observations of the outside world up to now: competitor price tags, regulatory scales and industry newspapers";
    body = (
      <g>
        {ticks.slice(0, now + 1).map((x, i) => {
          const Icon = icons[i % 3];
          return (
            <g key={x}>
              <line x1={x} y1={70} x2={x} y2={axisY} stroke={COUNTER} strokeWidth={1} />
              <Icon x={x - 14} y={34} size={28} weight="regular" color={COUNTER} />
            </g>
          );
        })}
      </g>
    );
  }

  // Dragging anywhere on a lane moves the shared cursor to the nearest tick.
  const scrub = (e: React.PointerEvent<SVGSVGElement>) => {
    const ctm = e.currentTarget.getScreenCTM();
    if (!onScrub || !ctm) return;
    const x = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).x;
    const nearest = ticks.reduce((best, t, i) => (Math.abs(t - x) < Math.abs(ticks[best] - x) ? i : best), 0);
    if (nearest !== now) onScrub(nearest);
  };

  return (
    <Frame
      width={W}
      height={112}
      label={label}
      className={onScrub ? "cursor-ew-resize touch-pan-y select-none" : ""}
      svgProps={
        onScrub
          ? {
              onPointerDown: (e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                scrub(e);
              },
              onPointerMove: (e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) scrub(e);
              },
            }
          : undefined
      }
    >
      {/* the shared cursor, behind everything it passes */}
      <line x1={cursorX} y1={4} x2={cursorX} y2={axisY} stroke={INK3} strokeWidth={1.25} />
      {body}
      <line x1={x0} y1={axisY} x2={x1} y2={axisY} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x1, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {ticks.map((x) => (
        <line key={x} x1={x} y1={axisY} x2={x} y2={axisY + 5} stroke={RULE} strokeWidth={1} />
      ))}
    </Frame>
  );
}

/**
 * The three lanes beside their sentences, sharing one `now`: drag any lane or
 * move the NOW slider under them.
 */
export function EvidenceLanes({ texts }: { texts: [React.ReactNode, React.ReactNode, React.ReactNode] }) {
  const [now, setNow] = useState(NOW_DEFAULT);
  const kinds = ["research", "analytics", "intelligence"] as const;
  const cols = "grid items-center gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10";
  return (
    <>
      <div className="mt-6 w-full divide-y divide-[var(--rule)] border-y-2 border-[var(--ink)]">
        {texts.map((text, i) => (
          <div key={i} className={`${cols} py-4`}>
            {text}
            <EvidenceLane kind={kinds[i]} now={now} onScrub={setNow} />
          </div>
        ))}
      </div>
      <div className={`${cols} w-full`}>
        <div className="hidden lg:block" />
        <Slider label="Now" value={now} min={0} max={LANE_TICKS.length - 1} onChange={setNow} showValue={false} />
      </div>
    </>
  );
}

/**
 * Problem-identification research: a tracked market share line that was
 * flat and has begun to fall; the turn is caught before it is obvious.
 */
export function ShareTracking() {
  const axisY = 150;
  const xs = Array.from({ length: 11 }, (_, i) => 40 + i * 32);
  const ys = [78, 74, 80, 76, 79, 75, 78, 84, 91, 99, 108];
  const turn = 6;
  const line = (from: number, to: number) =>
    xs.slice(from, to + 1).map((x, i) => `${i ? "L" : "M"}${x} ${ys[from + i]}`).join("");
  return (
    <Frame
      width={400}
      height={176}
      label="A tracked market share line, flat for months and then starting to fall; the start of the fall is circled"
    >
      <line x1={24} y1={axisY} x2={388} y2={axisY} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(388, axisY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={24} y1={20} x2={24} y2={axisY} stroke={INK} strokeWidth={1.25} />
      <Key x={32} y={26} fill={INK3} size={10}>MARKET SHARE</Key>
      {xs.map((x) => (
        <line key={x} x1={x} y1={axisY} x2={x} y2={axisY + 5} stroke={RULE} strokeWidth={1} />
      ))}
      <path d={line(0, turn)} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d={line(turn, xs.length - 1)} fill="none" stroke={COUNTER} strokeWidth={2.25} strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle key={x} cx={x} cy={ys[i]} r={3} fill={i > turn ? COUNTER : INK} />
      ))}
      <circle cx={xs[turn + 1]} cy={ys[turn + 1]} r={13} fill="none" stroke={COUNTER} strokeWidth={1.5} />
    </Frame>
  );
}

/**
 * Problem-solving research: one known problem, three alternative prices,
 * and the one the research supports.
 */
export function ChooseAmongAlternatives() {
  const sx = 52;
  const sy = 88;
  const opts = [
    { y: 36, price: "$8" },
    { y: 88, price: "$10", chosen: true },
    { y: 140, price: "$12" },
  ];
  const tx = 250;
  return (
    <Frame
      width={400}
      height={176}
      label="One known problem branching to three alternative prices, eight, ten and twelve dollars; the ten-dollar price is chosen"
    >
      <circle cx={sx} cy={sy} r={16} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <text x={sx} y={sy + 6} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={18} fontWeight={600} fill={INK}>!</text>
      {opts.map(({ y, price, chosen }) => {
        const c = chosen ? SIGNAL : INK3;
        const ex = tx - 14;
        const d = `M${sx + 18} ${sy}C${sx + 90} ${sy} ${ex - 80} ${y} ${ex} ${y}`;
        return (
          <g key={price}>
            <path d={d} fill="none" stroke={c} strokeWidth={chosen ? 2 : 1.25} />
            <path d={headAlong(ex, y, 1, 0, 7)} fill="none" stroke={c} strokeWidth={chosen ? 2 : 1.25} />
            {/* a price tag */}
            <path
              d={`M${tx} ${y}L${tx + 14} ${y - 16}H${tx + 78}V${y + 16}H${tx + 14}Z`}
              fill={chosen ? SIGNAL_TINT : PAPER}
              stroke={c}
              strokeWidth={chosen ? 2 : 1.25}
              strokeLinejoin="round"
            />
            <circle cx={tx + 15} cy={y} r={3} fill="none" stroke={c} strokeWidth={1.25} />
            <text x={tx + 48} y={y + 6} textAnchor="middle" fontFamily="var(--font-body)" fontSize={16} fontWeight={600} fill={chosen ? SIGNAL : INK} style={{ fontVariantNumeric: "tabular-nums" }}>
              {price}
            </text>
            {chosen ? (
              <g>
                <circle cx={tx + 104} cy={y} r={11} fill={SIGNAL} />
                <path d={`M${tx + 99} ${y + 0.5}l3.5 3.5l6-7`} fill="none" stroke={PAPER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * When Research Is Justified: decisions placed by how consequential they are
 * and how uncertain the right action is; research is justified only where
 * both are high.
 *
 * Interactive: each quadrant is clickable. The chosen one fills and states
 * its verdict, justified in the high-high corner and not justified in the
 * other three. It opens on the justified corner, as the static plate did.
 */
export function JustifiedQuadrant() {
  const [picked, setPicked] = useState(1);
  const L = 56;
  const T = 18;
  const R = 384;
  const B = 206;
  const mx = r2((L + R) / 2);
  const my = r2((T + B) / 2);
  const top = T + 12;
  const right = R - 16;
  // Reading order: top left, top right (the justified corner), bottom left, bottom right.
  const cells = [
    { x: L, y: top, w: mx - L, h: my - top, place: "less uncertain, more consequential" },
    { x: mx, y: top, w: right - mx, h: my - top, place: "uncertain and consequential" },
    { x: L, y: my, w: mx - L, h: B - my, place: "less uncertain, less consequential" },
    { x: mx, y: my, w: right - mx, h: B - my, place: "uncertain, less consequential" },
  ];
  const justified = picked === 1;
  return (
    <Frame
      width={400}
      height={240}
      label={`A two-by-two grid: how consequential the decision is against how uncertain the right action is; the ${cells[picked].place} quadrant is selected and marked ${justified ? "justified" : "not justified"}`}
    >
      {cells.map((c, i) => {
        const on = i === picked;
        const tone = i === 1 ? SIGNAL : COUNTER;
        return (
          <g
            key={i}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${c.place}: ${i === 1 ? "justified" : "not justified"}`}
            className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[var(--ink)] [&:hover>rect:first-child]:fill-[var(--paper-3)]"
            onClick={() => setPicked(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPicked(i);
              }
            }}
          >
            <rect
              x={c.x + 6}
              y={c.y + 6}
              width={c.w - 12}
              height={c.h - 12}
              fill="transparent"
              style={on ? { fill: i === 1 ? SIGNAL_TINT : COUNTER_TINT } : undefined}
              stroke={on ? tone : "transparent"}
              strokeWidth={1.75}
            />
            {on ? (
              <Key x={r2(c.x + c.w / 2)} y={r2(c.y + c.h / 2 + 4)} anchor="middle" fill={tone} size={12}>
                {i === 1 ? "JUSTIFIED" : "NOT JUSTIFIED"}
              </Key>
            ) : null}
          </g>
        );
      })}
      <line x1={L} y1={my} x2={right} y2={my} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" pointerEvents="none" />
      <line x1={mx} y1={top} x2={mx} y2={B} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" pointerEvents="none" />
      <line x1={L} y1={B} x2={R} y2={B} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(R, B, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <line x1={L} y1={B} x2={L} y2={T} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(L, T, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={R} y={B + 22} anchor="end" fill={INK3}>UNCERTAIN</Key>
      <g transform={`translate(${L - 14} ${T}) rotate(-90)`}>
        <Key x={0} y={0} anchor="end" fill={INK3}>CONSEQUENTIAL</Key>
      </g>
    </Frame>
  );
}

/**
 * Symptoms Versus Problems: a coffee chain's falling sales (the symptom)
 * and four underlying causes that could each produce it.
 */
export function SymptomAndCauses() {
  const rows = [8, 7, 5, 4];
  const causes = [
    { l1: "NEW", l2: "COMPETITOR", icon: "store" },
    { l1: "PRICE", l2: "INCREASE", icon: "price" },
    { l1: "SLOWER", l2: "SERVICE", icon: "clock" },
    { l1: "COMMUTING", l2: "PATTERNS", icon: "train" },
  ] as const;
  const cx0 = 372;
  const step = 118;
  const iconY = 108;
  const busY = 46;
  const blockR = 266;
  const midY = 109;
  return (
    <Frame
      width={800}
      height={196}
      label="A coffee chain's cups sold per quarter falling from eight to four, the symptom, linked to four possible underlying causes: a new competitor, a price increase, slower service and a change in commuting patterns"
    >
      {/* the symptom: cups sold per quarter */}
      <Key x={24} y={24} fill={COUNTER}>SYMPTOM</Key>
      {rows.map((n, r) => {
        const y = 66 + r * 36;
        return (
          <g key={r}>
            <Key x={24} y={y - 5} fill={INK3} size={10}>{`Q${r + 1}`}</Key>
            {Array.from({ length: n }, (_, i) => (
              <Cup1 key={i} x={64 + i * 24} y={y} k={1} stroke={COUNTER} />
            ))}
          </g>
        );
      })}
      {/* the link: causes feed the symptom */}
      <path d={`M${cx0 + step * 3} ${busY}H${cx0}`} fill="none" stroke={INK} strokeWidth={1.25} />
      <path d={`M${cx0} ${busY}H${blockR + 28}V${midY}H${blockR - 2}`} fill="none" stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <path d={head.left(blockR - 2, midY, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {/* a bracket gathering all four quarters */}
      <path d={`M${blockR - 12} 42H${blockR - 6}V176H${blockR - 12}`} fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={cx0 + step * 1.5} y={busY - 12} anchor="middle" fill={SIGNAL}>PROBLEM?</Key>
      {causes.map((c, i) => {
        const x = cx0 + i * step;
        return (
          <g key={c.l2}>
            <line x1={x} y1={busY} x2={x} y2={iconY - 26} stroke={INK} strokeWidth={1.25} />
            <circle cx={x} cy={iconY} r={24} fill={PAPER} stroke={INK} strokeWidth={1.25} />
            {c.icon === "store" ? <Storefront x={x - 14} y={iconY - 14} size={28} color={INK} /> : null}
            {c.icon === "price" ? (
              <g>
                <Tag x={x - 17} y={iconY - 12} size={26} color={INK} />
                <ArrowUp x={x + 2} y={iconY - 18} size={18} weight="bold" color={INK} />
              </g>
            ) : null}
            {c.icon === "clock" ? <Clock x={x - 14} y={iconY - 14} size={28} color={INK} /> : null}
            {c.icon === "train" ? <Train x={x - 14} y={iconY - 14} size={28} color={INK} /> : null}
            <Key x={x} y={iconY + 44} anchor="middle" fill={INK} size={10.5}>{c.l1}</Key>
            <Key x={x} y={iconY + 58} anchor="middle" fill={INK} size={10.5}>{c.l2}</Key>
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Discussion: Symptom or Problem? Ten new members joining in each year;
 * the ones who cancel within three months are filled. Last year two, this
 * year four: twice the rate.
 */
export function CancellationsDoubled() {
  const rows = [
    { year: "LAST YEAR", cancelled: 2, y: 78 },
    { year: "THIS YEAR", cancelled: 4, y: 170 },
  ];
  return (
    <Frame
      width={400}
      height={196}
      label="Ten new members last year, two of them cancelling within three months; ten new members this year, four of them cancelling: twice the rate"
    >
      <Key x={392} y={22} anchor="end" fill={COUNTER} size={10}>CANCEL WITHIN 3 MONTHS</Key>
      {rows.map(({ year, cancelled, y }) => (
        <g key={year}>
          <Key x={16} y={y - 50} fill={INK3} size={10.5}>{year}</Key>
          {Array.from({ length: 10 }, (_, i) => {
            const gone = i >= 10 - cancelled;
            return (
              <Person1
                key={i}
                x={28 + i * 27}
                y={y}
                k={0.95}
                stroke={gone ? COUNTER : INK}
                fill={gone ? COUNTER : PAPER}
              />
            );
          })}
          <line x1={306} y1={y - 38} x2={306} y2={y} stroke={RULE} strokeWidth={1} />
          <Display x={392} y={y - 8} anchor="end" fill={COUNTER} size={30}>{`${cancelled}`}</Display>
          <Key x={392} y={y + 12} anchor="end" fill={INK3} size={10}>OF 10</Key>
        </g>
      ))}
    </Frame>
  );
}

/** Node centres for the six steps, set to sit over a six-column text grid at 1440px. */
const STEP_X = [61, 197, 333, 468, 604, 740];

/**
 * The Six Steps of the Research Process: six numbered steps in sequence,
 * each with its object (a question, an idea, a questionnaire, respondents,
 * a chart, a presentation), and a loop from the report back to the start.
 * With `ai`, the loop is dropped and the AI mark sits on every step.
 */
export function ResearchProcess({ ai = false }: { ai?: boolean }) {
  const cy = ai ? 62 : 96;
  const r = 30;
  const icons = [Question, Lightbulb, ClipboardText, null, ChartBar, PresentationChart];
  const H = ai ? 128 : 162;
  const label = ai
    ? "The six steps of the research process in sequence, from problem definition to the report, with the AI mark on every step"
    : "The six steps of the research process in sequence, from problem definition to the report, with a loop from the report back to the start";
  return (
    <Frame width={800} height={H} label={label}>
      {!ai ? (
        <g>
          <path
            d={`M${STEP_X[5]} ${cy - r - 4}C${STEP_X[5]} ${cy - 96} ${STEP_X[0]} ${cy - 96} ${STEP_X[0]} ${cy - r - 4}`}
            fill="none"
            stroke={COUNTER}
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          <path d={head.down(STEP_X[0], cy - r - 4, 8)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
        </g>
      ) : null}
      {STEP_X.slice(0, -1).map((x, i) => (
        <g key={x}>
          <line x1={x + r + 6} y1={cy} x2={STEP_X[i + 1] - r - 6} y2={cy} stroke={INK} strokeWidth={1.25} />
          <path d={head.right(STEP_X[i + 1] - r - 6, cy, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        </g>
      ))}
      {STEP_X.map((x, i) => {
        const Icon = icons[i];
        return (
          <g key={x}>
            <circle cx={x} cy={cy} r={r} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            {Icon ? (
              <Icon x={x - 14} y={cy - 14} size={28} color={INK} />
            ) : (
              <g>
                {[-9, 9].map((dx) => (
                  <Person1 key={dx} x={x + dx} y={cy + 13} k={0.72} stroke={INK} fill={PAPER} width={1.25} />
                ))}
              </g>
            )}
            <Key x={x} y={cy + r + 22} anchor="middle" fill={INK3} size={11}>{String(i + 1).padStart(2, "0")}</Key>
            {ai ? <AiMark1 cx={x + r + 2} cy={cy - r - 2} s={20} fill={SIGNAL} /> : null}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Limitations of AI: answers to the same 1–7 question from real people and
 * from AI-simulated consumers. The simulated answers look like a plausible
 * distribution, but they sit higher and spread less: a systematic difference.
 */
export function SimulatedVersusReal() {
  const base = 150;
  const x0 = 36;
  const x1 = 372;
  const sx = (v: number) => r2(x0 + ((v - 1) / 6) * (x1 - x0));
  const real = { x0: sx(1), x1: sx(7), base, mean: sx(3.9), sd: 62, peak: 70 };
  const sim = { x0: sx(3.6), x1: sx(7), base, mean: sx(5.6), sd: 28, peak: 112 };
  return (
    <Frame
      width={400}
      height={186}
      label="Answers to the same one-to-seven question: real people spread widely around the middle; AI-simulated consumers cluster higher and tighter"
    >
      <path d={bellPath({ ...real, close: true })} fill={PAPER3} />
      <path d={bellPath(real)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={bellPath({ ...sim, close: true })} fill={COUNTER_TINT} />
      <path d={bellPath(sim)} fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <line x1={x0 - 12} y1={base} x2={x1 + 12} y2={base} stroke={INK} strokeWidth={1.25} />
      {[1, 2, 3, 4, 5, 6, 7].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={base} x2={sx(v)} y2={base + 5} stroke={INK} strokeWidth={1} />
          <Key x={sx(v)} y={base + 20} anchor="middle" fill={INK3} size={10.5}>{`${v}`}</Key>
        </g>
      ))}
      <Key x={sx(1.2)} y={base - 58} fill={INK}>REAL PEOPLE</Key>
      <Key x={sx(5.2)} y={50} anchor="end" fill={COUNTER}>AI-SIMULATED</Key>
    </Frame>
  );
}

/**
 * The Researcher's Accountability: the researcher's effort on one study,
 * without AI and with it. With AI the whole takes less time, and most of
 * it goes to verifying rather than producing.
 */
export function EffortShift() {
  const x = 16;
  const unit = 1.16;
  const rows = [
    { key: "WITHOUT AI", y: 44, produce: 250, verify: 60, ai: false },
    { key: "WITH AI", y: 124, produce: 70, verify: 150, ai: true },
  ];
  const h = 30;
  return (
    <Frame
      width={400}
      height={172}
      label="Two bars of the researcher's effort on one study: without AI, mostly producing and a little verifying; with AI, a shorter bar that is mostly verifying"
    >
      {rows.map((r) => {
        const pw = r2(r.produce * unit);
        const vw = r2(r.verify * unit);
        return (
          <g key={r.key}>
            <Key x={x} y={r.y - 10} fill={INK3} size={10.5}>{r.key}</Key>
            {r.ai ? <AiMark1 cx={x + 70} cy={r.y - 14} s={14} fill={SIGNAL} /> : null}
            <rect x={x} y={r.y} width={pw} height={h} fill={PAPER3} stroke={INK} strokeWidth={1.25} />
            <rect x={r2(x + pw)} y={r.y} width={vw} height={h} fill={SIGNAL} stroke={SIGNAL} strokeWidth={1.25} />
            {!r.ai ? (
              <Key x={x + 10} y={r.y + 19.5} fill={INK} size={10.5}>PRODUCING</Key>
            ) : (
              <Key x={r2(x + pw + 10)} y={r.y + 19.5} fill={PAPER} size={10.5}>VERIFYING</Key>
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Part 5: the four stakeholders of marketing research, each with the object
 * of the role: the researcher's magnifying glass, the client's firm, the
 * respondent's completed answer sheet, and the public as a crowd.
 */
export function Stakeholders() {
  const cx = [100, 300, 500, 700];
  const baseY = 64;
  const keys = ["THE RESEARCHER", "THE CLIENT", "THE RESPONDENT", "THE PUBLIC"];
  return (
    <Frame
      width={800}
      height={98}
      label="The four stakeholders of marketing research: the researcher with a magnifying glass, the client with the firm's building, the respondent with a completed answer sheet, and the public as a crowd"
    >
      {/* researcher */}
      <Person1 x={cx[0] - 18} y={baseY} k={1.4} />
      <MagnifyingGlass x={cx[0] + 4} y={baseY - 42} size={34} color={INK} />
      {/* client */}
      <Person1 x={cx[1] - 18} y={baseY} k={1.4} />
      <Buildings x={cx[1] + 4} y={baseY - 42} size={36} color={INK} />
      {/* respondent: a sheet with ticked answers */}
      <Person1 x={cx[2] - 18} y={baseY} k={1.4} />
      <g>
        <rect x={cx[2] + 8} y={baseY - 44} width={28} height={36} rx={2} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${cx[2] + 13} ${baseY - 34 + i * 10}l2.5 2.5l4.5-5`} fill="none" stroke={INK} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            <line x1={cx[2] + 23} y1={baseY - 34 + i * 10} x2={cx[2] + 31} y2={baseY - 34 + i * 10} stroke={INK} strokeWidth={1.25} />
          </g>
        ))}
      </g>
      {/* public */}
      {[-24, 0, 24].map((dx) => (
        <Person1 key={`f${dx}`} x={cx[3] + dx} y={baseY - 22} k={0.8} width={1.25} />
      ))}
      {[-36, -12, 12, 36].map((dx) => (
        <Person1 key={`b${dx}`} x={cx[3] + dx} y={baseY} k={0.95} />
      ))}
      {keys.map((k, i) => (
        <Key key={k} x={cx[i]} y={baseY + 24} anchor="middle" fill={INK}>{k}</Key>
      ))}
    </Frame>
  );
}

/**
 * Part 2: a precise answer to an incorrectly defined question. Every shot
 * lands in a tight group on the target that was set, while the target that
 * matters stands untouched beside it.
 */
export function PreciseWrongTarget() {
  const rings = [44, 32, 20, 8];
  const t1 = { x: 110, y: 58 };
  const t2 = { x: 296, y: 58 };
  const hits = [
    [-3, -2],
    [2, 3],
    [4, -3],
    [-2, 4],
    [0, 0],
    [-4, 1],
  ];
  const target = (x: number, y: number, tone: string, fill: string) =>
    rings.map((r, i) => (
      <circle key={r} cx={x} cy={y} r={r} fill={i === rings.length - 1 ? tone : i % 2 ? PAPER : fill} stroke={tone} strokeWidth={1.25} />
    ));
  return (
    <Frame
      width={400}
      height={140}
      label="Two targets: every shot lands in a tight group on the bullseye of the question as defined, while the target of the actual problem is untouched"
    >
      {target(t1.x, t1.y, COUNTER, COUNTER_TINT)}
      {hits.map(([dx, dy], i) => (
        <g key={i}>
          <circle cx={t1.x + dx * 2.2} cy={t1.y + dy * 2.2} r={3.4} fill={INK} stroke={PAPER} strokeWidth={1} />
        </g>
      ))}
      {target(t2.x, t2.y, INK, PAPER3)}
      <Key x={t1.x} y={128} anchor="middle" fill={COUNTER} size={10.5}>THE QUESTION AS DEFINED</Key>
      <Key x={t2.x} y={128} anchor="middle" fill={INK} size={10.5}>THE ACTUAL PROBLEM</Key>
    </Frame>
  );
}

/**
 * AI Agents as a Subject of Marketing Research: in agent-mediated purchasing
 * the consumer states the goal, and the agent acquires information from the
 * product page (prices, a sponsorship label) and selects an alternative. The
 * consumer never sees the page.
 */
export function AgentMediatedPurchase() {
  const page = { x: 246, y: 30, w: 144, h: 138 };
  const rows = [
    { y: 44, price: "$4.99", sponsored: true, chosen: false },
    { y: 110, price: "$5.49", sponsored: false, chosen: true },
  ];
  return (
    <Frame
      width={400}
      height={184}
      label="A consumer passes a goal to an AI agent. The agent acquires information from a product page the consumer does not see: two listings with their prices, one labelled sponsored. The agent selects the other listing"
    >
      <Person1 x={34} y={150} k={1.35} />
      <line x1={58} y1={104} x2={108} y2={104} stroke={INK} strokeWidth={1.5} />
      <path d={head.right(110, 104, 7)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={84} y={94} anchor="middle" fill={INK3} size={9.5}>GOAL</Key>

      <AiMark1 cx={134} cy={104} s={34} fill={SIGNAL} />

      <line x1={158} y1={104} x2={238} y2={104} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head.right(240, 104, 7)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={199} y={94} anchor="middle" fill={SIGNAL} size={9.5}>ACQUIRES</Key>

      <rect x={page.x} y={page.y} width={page.w} height={page.h} fill={PAPER} stroke={RULE2} strokeWidth={1.25} />
      {rows.map((r) => (
        <g key={r.price}>
          <rect x={page.x + 10} y={r.y} width={38} height={38} fill={PAPER3} />
          <line x1={page.x + 58} y1={r.y + 6} x2={page.x + 108} y2={r.y + 6} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
          <Note x={page.x + 58} y={r.y + 27} size={14} fill={INK} weight={600}>{r.price}</Note>
          {r.sponsored ? (
            <g>
              <rect x={page.x + 58} y={r.y + 34} width={72} height={15} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
              <Key x={page.x + 94} y={r.y + 45} anchor="middle" fill={COUNTER} size={8.5}>SPONSORED</Key>
            </g>
          ) : null}
          {r.chosen ? (
            <g>
              <rect x={page.x + 4} y={r.y - 6} width={page.w - 8} height={52} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
              <circle cx={page.x + 122} cy={r.y + 20} r={10} fill={SIGNAL} />
              <Tick1 cx={page.x + 122} cy={r.y + 20} s={4.5} />
            </g>
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

/**
 * Evaluating AI Systems as a Research Task: twenty responses from the same
 * model to the same prompt, stacked on a seven-point scale. Any one of them,
 * taken alone, could be read as the model's answer.
 */
export function SamePromptResponses() {
  const counts = [0, 1, 3, 6, 5, 4, 1];
  const x0 = 44;
  const x1 = 364;
  const base = 126;
  const sx = (v: number) => r2(x0 + ((v - 1) / 6) * (x1 - x0));
  const dot = 13;
  const one = { v: 6, i: 3 };
  return (
    <Frame
      width={400}
      height={160}
      label="Twenty responses from one model to one prompt, stacked on a one-to-seven scale: they spread from 2 to 7, most at 4 and 5. A single response, at 6, is highlighted"
    >
      <Key x={16} y={22} fill={INK3} size={10}>20 RESPONSES · SAME MODEL · SAME PROMPT</Key>
      {counts.map((c, k) =>
        Array.from({ length: c }, (_, i) => {
          const hit = k + 1 === one.v && i === one.i;
          return (
            <circle
              key={`${k}-${i}`}
              cx={sx(k + 1)}
              cy={r2(base - 10 - i * dot)}
              r={5}
              fill={hit ? SIGNAL : PAPER3}
              stroke={hit ? SIGNAL : INK}
              strokeWidth={1.25}
            />
          );
        }),
      )}
      <line x1={r2(sx(one.v) + 9)} y1={r2(base - 10 - one.i * dot)} x2={r2(sx(one.v) + 22)} y2={r2(base - 10 - one.i * dot)} stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={r2(sx(one.v) + 26)} y={r2(base - 6 - one.i * dot)} fill={SIGNAL} size={9.5}>ONE</Key>
      <line x1={x0 - 14} y1={base} x2={x1 + 14} y2={base} stroke={INK} strokeWidth={1.25} />
      {[1, 2, 3, 4, 5, 6, 7].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={base} x2={sx(v)} y2={base + 5} stroke={INK} strokeWidth={1} />
          <Key x={sx(v)} y={base + 20} anchor="middle" fill={INK3} size={10.5}>{`${v}`}</Key>
        </g>
      ))}
    </Frame>
  );
}
