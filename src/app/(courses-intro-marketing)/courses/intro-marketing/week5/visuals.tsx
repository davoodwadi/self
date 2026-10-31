/* ==========================================================================
   Week 5, figures
   --------------------------------------------------------------------------
   Hand-built SVG plates for the four [figure: ...] slides in week5/content.md:
     1. FourStepProcess: four-step marketing research process progressing from
        problem definition and research plan development to data implementation
        and managerial reporting, with Step 1 branching into exploratory,
        descriptive, and causal objectives.
     2. SecondaryVsPrimary: comparison of internal and external secondary data
        sources with primary data collection methods across speed, cost, and
        specificity.
     3. CrmCycle: customer relationship management cycle integrating sales,
        service, and marketing touchpoints into a unified customer profile.
     4. SyntheticVsHumanSurvey: comparison of synthetic AI survey responses
        used for early questionnaire pretesting against primary survey data
        from real human consumers.
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  head2,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  PAPER3,
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Chip2, Coins2, Person3 } from "../_visuals/objects";

/** Exploratory research: a lens over a question mark, centred on the lens. */
function QuestionLens({
  x,
  y,
  r = 16,
  tone = INK,
}: {
  x: number;
  y: number;
  r?: number;
  tone?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={tone} strokeWidth={1.75} />
      <line
        x1={r2(x + r * 0.72)}
        y1={r2(y + r * 0.72)}
        x2={r2(x + r * 1.4)}
        y2={r2(y + r * 1.4)}
        stroke={tone}
        strokeWidth={2.75}
        strokeLinecap="round"
      />
      <Display x={x} y={r2(y + r * 0.42)} anchor="middle" fill={tone} size={r2(r * 1.05)}>
        ?
      </Display>
    </g>
  );
}

/* ==========================================================================
   1. FOUR-STEP MARKETING RESEARCH PROCESS
   ========================================================================== */

export function FourStepProcess() {
  const steps = [
    {
      x: 20,
      w: 176,
      n: "Step 1",
      a: "Define problem &",
      b: "research objectives",
      active: true,
    },
    {
      x: 222,
      w: 172,
      n: "Step 2",
      a: "Develop the",
      b: "research plan",
      active: false,
    },
    {
      x: 420,
      w: 172,
      n: "Step 3",
      a: "Implement the",
      b: "research plan",
      active: false,
    },
    {
      x: 618,
      w: 162,
      n: "Step 4",
      a: "Interpret & report",
      b: "the findings",
      active: false,
    },
  ];

  return (
    <Frame
      height={248}
      label="Four-step marketing research process progressing from defining the problem and research objectives to developing the research plan, implementing the research plan, and interpreting and reporting the findings, with Step 1 setting exploratory, descriptive, or causal objectives."
    >
      {steps.map((s, i) => {
        const cx = r2(s.x + s.w / 2);
        const next = steps[i + 1];
        return (
          <g key={s.n}>
            <rect
              x={s.x}
              y={14}
              width={s.w}
              height={72}
              fill={s.active ? SIGNAL_TINT : PAPER2}
              stroke={s.active ? SIGNAL : INK}
              strokeWidth={s.active ? 1.75 : 1.5}
            />
            <Key
              x={cx}
              y={33}
              anchor="middle"
              fill={s.active ? SIGNAL : INK3}
              size={10.5}
            >
              {s.n}
            </Key>
            <Key
              x={cx}
              y={53}
              anchor="middle"
              fill={s.active ? SIGNAL : INK}
              size={11}
            >
              {s.a}
            </Key>
            <Key
              x={cx}
              y={72}
              anchor="middle"
              fill={s.active ? SIGNAL : INK}
              size={11}
            >
              {s.b}
            </Key>
            {next ? (
              <g>
                <line
                  x1={s.x + s.w + 2}
                  y1={50}
                  x2={next.x - 4}
                  y2={50}
                  stroke={INK}
                  strokeWidth={1.5}
                />
                <path
                  d={head2.right(next.x - 2, 50)}
                  fill="none"
                  stroke={INK}
                  strokeWidth={1.5}
                />
              </g>
            ) : null}
          </g>
        );
      })}

      {/* Branch from Step 1 into the three research objective types */}
      <path
        d="M108 86 V108 H660 M140 108 V126 M400 108 V126 M660 108 V126"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <path d={head2.down(140, 128)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.down(400, 128)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.down(660, 128)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      {/* 1. Exploratory research */}
      <rect
        x={20}
        y={132}
        width={240}
        height={98}
        fill={PAPER2}
        stroke={INK}
        strokeWidth={1.5}
      />
      <QuestionLens x={60} y={176} r={16} tone={INK} />
      <Key x={166} y={162} anchor="middle" fill={INK} size={11.5}>
        Exploratory research
      </Key>
      <Note x={166} y={184} anchor="middle" size={11.5}>
        Preliminary information
      </Note>
      <Note x={166} y={202} anchor="middle" size={11.5}>
        &amp; hypotheses
      </Note>

      {/* 2. Descriptive research */}
      <rect
        x={280}
        y={132}
        width={240}
        height={98}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      {[
        [304, 18],
        [318, 30],
        [332, 24],
        [346, 38],
      ].map(([bx, bh]) => (
        <rect
          key={bx}
          x={bx}
          y={198 - bh}
          width={10}
          height={bh}
          fill={PAPER}
          stroke={COUNTER}
          strokeWidth={1.4}
        />
      ))}
      <line x1={298} y1={198} x2={362} y2={198} stroke={COUNTER} strokeWidth={1.4} />
      <Key x={434} y={162} anchor="middle" fill={COUNTER} size={11.5}>
        Descriptive research
      </Key>
      <Note x={434} y={184} anchor="middle" size={11.5}>
        Market potential,
      </Note>
      <Note x={434} y={202} anchor="middle" size={11.5}>
        demographics &amp; attitudes
      </Note>

      {/* 3. Causal research */}
      <rect
        x={540}
        y={132}
        width={240}
        height={98}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <circle cx={568} cy={180} r={10} fill={PAPER} stroke={SIGNAL} strokeWidth={1.6} />
      <line x1={580} y1={180} x2={602} y2={180} stroke={SIGNAL} strokeWidth={1.6} />
      <path d={head2.right(604, 180)} fill="none" stroke={SIGNAL} strokeWidth={1.6} />
      <circle cx={616} cy={180} r={10} fill={SIGNAL} />
      <Key x={698} y={162} anchor="middle" fill={SIGNAL} size={11.5}>
        Causal research
      </Key>
      <Note x={698} y={184} anchor="middle" size={11.5}>
        Cause-and-effect
      </Note>
      <Note x={698} y={202} anchor="middle" size={11.5}>
        relationships
      </Note>
    </Frame>
  );
}


/* ==========================================================================
   2. SECONDARY VS PRIMARY DATA
   ========================================================================== */

/** A small clock face showing elapsed share of time, centred on (x, y). */
function MiniClock({
  x,
  y,
  r = 16,
  frac,
  tone,
}: {
  x: number;
  y: number;
  r?: number;
  frac: number;
  tone: string;
}) {
  const t = (frac * 360 - 90) * (Math.PI / 180);
  const ex = r2(x + (r - 2.5) * Math.cos(t));
  const ey = r2(y + (r - 2.5) * Math.sin(t));
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <path
        d={`M${x} ${y} V${r2(y - r + 2.5)} A${r2(r - 2.5)} ${r2(r - 2.5)} 0 ${frac > 0.5 ? 1 : 0} 1 ${ex} ${ey} Z`}
        fill={tone}
        opacity={0.18}
      />
      <line x1={x} y1={y} x2={x} y2={r2(y - r + 4)} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={x} y1={y} x2={ex} y2={ey} stroke={tone} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={x} cy={y} r={2} fill={tone} />
    </g>
  );
}

export function SecondaryVsPrimary() {
  return (
    <Frame
      height={272}
      label="Comparison of internal and external secondary data sources with primary data collection methods across speed, cost, and specificity."
    >
      {/* Left column: Secondary data */}
      <rect
        x={20}
        y={14}
        width={368}
        height={244}
        fill={PAPER2}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key x={204} y={35} anchor="middle" fill={COUNTER} size={12}>
        Secondary data (already exists)
      </Key>
      <line x1={36} y1={46} x2={372} y2={46} stroke={RULE2} strokeWidth={1} />

      {/* Internal database box */}
      <rect
        x={36}
        y={56}
        width={336}
        height={52}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.25}
      />
      <ellipse cx={64} cy={72} rx={13} ry={4.5} fill={PAPER2} stroke={INK} strokeWidth={1.4} />
      <path
        d="M51 72 V92 A13 4.5 0 0 0 77 92 V72 M51 82 A13 4.5 0 0 0 77 82"
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
      />
      <Key x={92} y={78} fill={INK} size={11}>
        Internal database
      </Key>
      <Note x={92} y={96} size={11}>
        Accounting, sales, operations &amp; service records
      </Note>

      {/* External sources box */}
      <rect
        x={36}
        y={116}
        width={336}
        height={52}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.25}
      />
      <path
        d="M50 134 L64 125 L78 134 Z"
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path
        d="M54 136 V152 M64 136 V152 M74 136 V152 M49 153 H79"
        stroke={COUNTER}
        strokeWidth={1.4}
      />
      <Key x={92} y={138} fill={COUNTER} size={11}>
        External secondary sources
      </Key>
      <Note x={92} y={156} size={11}>
        Census agencies, trade groups &amp; syndicators
      </Note>

      {/* Secondary metrics row: Speed, Cost, Specificity */}
      <line x1={36} y1={180} x2={372} y2={180} stroke={RULE2} strokeWidth={1} />
      <MiniClock x={88} y={208} r={15} frac={0.15} tone={COUNTER} />
      <Key x={88} y={244} anchor="middle" fill={COUNTER} size={10.5}>
        Fast speed
      </Key>

      <Coins2 x={204} y={222} n={2} w={28} tone={COUNTER} />
      <Key x={204} y={244} anchor="middle" fill={COUNTER} size={10.5}>
        Low cost
      </Key>

      <circle cx={320} cy={208} r={14} fill={PAPER} stroke={INK3} strokeWidth={1.3} />
      <circle cx={320} cy={208} r={7} fill="none" stroke={INK3} strokeWidth={1.2} />
      <circle cx={330} cy={198} r={3.5} fill={COUNTER} />
      <Key x={320} y={244} anchor="middle" fill={INK} size={10.5}>
        Broad fit
      </Key>

      {/* Right column: Primary data */}
      <rect
        x={412}
        y={14}
        width={368}
        height={244}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={596} y={35} anchor="middle" fill={SIGNAL} size={12}>
        Primary data (collected for purpose)
      </Key>
      <line x1={428} y1={46} x2={764} y2={46} stroke={RULE2} strokeWidth={1} />

      {/* Three primary methods feeding specific decision */}
      {[
        { x: 428, title: "Observation", sub: "Watch actions" },
        { x: 542, title: "Surveys", sub: "Ask questions" },
        { x: 656, title: "Experiments", sub: "Test causes" },
      ].map((m) => (
        <g key={m.title}>
          <rect
            x={m.x}
            y={56}
            width={108}
            height={52}
            fill={PAPER}
            stroke={SIGNAL}
            strokeWidth={1.25}
          />
          <Key x={r2(m.x + 54)} y={78} anchor="middle" fill={SIGNAL} size={11}>
            {m.title}
          </Key>
          <Note x={r2(m.x + 54)} y={96} anchor="middle" size={11}>
            {m.sub}
          </Note>
        </g>
      ))}

      <rect
        x={428}
        y={116}
        width={336}
        height={52}
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth={1.4}
      />
      <Key x={596} y={138} anchor="middle" fill={SIGNAL} size={11}>
        Tailored to novel decision at hand
      </Key>
      <Note x={596} y={156} anchor="middle" size={11}>
        Custom sampling plan &amp; research instruments
      </Note>

      {/* Primary metrics row: Speed, Cost, Specificity */}
      <line x1={428} y1={180} x2={764} y2={180} stroke={RULE2} strokeWidth={1} />
      <MiniClock x={480} y={208} r={15} frac={0.82} tone={INK} />
      <Key x={480} y={244} anchor="middle" fill={INK} size={10.5}>
        Slower speed
      </Key>

      <Coins2 x={596} y={224} n={5} w={28} tone={INK} />
      <Key x={596} y={244} anchor="middle" fill={INK} size={10.5}>
        Higher cost
      </Key>

      <circle cx={712} cy={208} r={14} fill={PAPER} stroke={SIGNAL} strokeWidth={1.4} />
      <circle cx={712} cy={208} r={7} fill="none" stroke={SIGNAL} strokeWidth={1.2} />
      <circle cx={712} cy={208} r={3.5} fill={SIGNAL} />
      <Key x={712} y={244} anchor="middle" fill={SIGNAL} size={10.5}>
        Exact specificity
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3. CRM CYCLE AND TOUCHPOINT INTEGRATION
   ========================================================================== */

export function CrmCycle() {
  const cx = 400;
  const cy = 150;
  const rx = 256;
  const ry = 108;
  const nodes = [
    { t: -90, name: "Sales", tone: INK },
    { t: 0, name: "Customer support", tone: INK },
    { t: 90, name: "Customer loyalty", tone: SIGNAL },
    { t: 180, name: "Website & payment", tone: INK },
  ];
  const pw = 164;
  const ph = 36;
  const at = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    return [r2(cx + rx * Math.cos(t)), r2(cy + ry * Math.sin(t))] as const;
  };
  const [tx, ty] = at(-35);
  return (
    <Frame
      width={800}
      height={300}
      label="Customer relationship management cycle integrating sales, customer support, and website and payment touchpoints into a unified customer profile to maximize customer loyalty."
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={INK3} strokeWidth={1.5} />
      {[-45, 45, 135, 225].map((deg) => {
        const t = (deg * Math.PI) / 180;
        const [x, y] = at(deg);
        return (
          <path
            key={deg}
            d={headAlong1(x, y, -rx * Math.sin(t), ry * Math.cos(t), 9)}
            fill="none"
            stroke={INK3}
            strokeWidth={1.6}
          />
        );
      })}
      {[-60, -35, 35, 60, 120, 145, 215, 240].map((deg) => {
        const [x, y] = at(deg);
        return (
          <circle
            key={deg}
            cx={x}
            cy={y}
            r={5}
            fill={PAPER}
            stroke={COUNTER}
            strokeWidth={1.6}
          />
        );
      })}

      {/* Callout for Customer touchpoints */}
      <line
        x1={r2(tx + 5)}
        y1={r2(ty - 4)}
        x2={r2(tx + 36)}
        y2={r2(ty - 26)}
        stroke={COUNTER}
        strokeWidth={1.25}
      />
      <Key x={r2(tx + 42)} y={r2(ty - 24)} fill={COUNTER} size={11}>
        Customer touchpoints
      </Key>

      {/* Inward data integration from Sales, Website & payment, and Customer support */}
      <line
        x1={cx}
        y1={r2(cy - ry + ph / 2)}
        x2={cx}
        y2={r2(cy - 66)}
        stroke={INK3}
        strokeWidth={1.4}
        strokeDasharray="4 4"
      />
      <path d={head2.down(cx, cy - 64)} fill="none" stroke={INK3} strokeWidth={1.4} />

      <line
        x1={r2(cx - rx + pw / 2)}
        y1={cy}
        x2={r2(cx - 66)}
        y2={cy}
        stroke={INK3}
        strokeWidth={1.4}
        strokeDasharray="4 4"
      />
      <path d={head2.right(cx - 64, cy)} fill="none" stroke={INK3} strokeWidth={1.4} />

      <line
        x1={r2(cx + rx - pw / 2)}
        y1={cy}
        x2={r2(cx + 66)}
        y2={cy}
        stroke={INK3}
        strokeWidth={1.4}
        strokeDasharray="4 4"
      />
      <path d={head2.left(cx + 64, cy)} fill="none" stroke={INK3} strokeWidth={1.4} />

      {/* Outward arrow from Unified customer profile to Customer loyalty */}
      <line x1={cx} y1={r2(cy + 62)} x2={cx} y2={r2(cy + ry - ph / 2 - 2)} stroke={SIGNAL} strokeWidth={1.6} />
      <path d={head2.down(cx, cy + ry - ph / 2)} fill="none" stroke={SIGNAL} strokeWidth={1.6} />

      <circle cx={cx} cy={cy} r={62} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={cx} y={cy - 14} anchor="middle" fill={SIGNAL} size={11.5}>
        Unified
      </Key>
      <Key x={cx} y={cy + 4} anchor="middle" fill={SIGNAL} size={11.5}>
        customer
      </Key>
      <Key x={cx} y={cy + 22} anchor="middle" fill={SIGNAL} size={11.5}>
        profile
      </Key>

      {nodes.map((n) => {
        const [x, y] = at(n.t);
        const lit = n.tone === SIGNAL;
        return (
          <g key={n.name}>
            <rect
              x={r2(x - pw / 2)}
              y={r2(y - ph / 2)}
              width={pw}
              height={ph}
              rx={18}
              fill={lit ? SIGNAL : PAPER2}
              stroke={n.tone}
              strokeWidth={1.5}
            />
            <Key x={x} y={r2(y + 4)} anchor="middle" fill={lit ? PAPER : INK} size={11}>
              {n.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   4. SYNTHETIC VS HUMAN SURVEY RESPONDENTS
   ========================================================================== */

/** A compact questionnaire sheet with checkbox rows and a 5-point scale. */
function SurveyForm({
  x,
  y,
  tone = INK,
}: {
  x: number;
  y: number;
  tone?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={86} height={68} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {[0, 1].map((i) => {
        const ry = y + 16 + i * 16;
        return (
          <g key={i}>
            <rect x={x + 10} y={ry - 5} width={10} height={10} fill={PAPER} stroke={tone} strokeWidth={1.2} />
            {i === 0 ? (
              <path
                d={`M${x + 12} ${ry} L${x + 14.5} ${ry + 2.5} L${x + 19} ${ry - 3}`}
                fill="none"
                stroke={tone}
                strokeWidth={1.6}
              />
            ) : null}
            <line x1={x + 26} y1={ry} x2={x + 74} y2={ry} stroke={RULE2} strokeWidth={2.2} />
          </g>
        );
      })}
      <line x1={x + 10} y1={y + 44} x2={x + 76} y2={y + 44} stroke={RULE} strokeWidth={1} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={x + 15 + i * 14}
          cy={y + 56}
          r={4}
          fill={i === 3 ? tone : PAPER}
          stroke={tone}
          strokeWidth={1.25}
        />
      ))}
    </g>
  );
}

export function SyntheticVsHumanSurvey() {
  return (
    <Frame
      height={268}
      label="Comparison of synthetic AI survey responses used for early questionnaire pretesting against primary survey data collected from real human consumers."
    >
      {/* Left panel: Synthetic AI survey pretesting */}
      <rect
        x={20}
        y={14}
        width={350}
        height={240}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Key x={195} y={36} anchor="middle" fill={COUNTER} size={12}>
        Early stage: Synthetic AI responses
      </Key>
      <line x1={36} y1={48} x2={354} y2={48} stroke={RULE2} strokeWidth={1} />

      <Chip2 x={96} y={96} s={42} tone={COUNTER} fill={PAPER} />
      <line x1={132} y1={96} x2={208} y2={96} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(210, 96)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <SurveyForm x={218} y={62} tone={COUNTER} />

      <rect x={36} y={144} width={318} height={94} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={52} y={166} fill={COUNTER} size={11}>
        Pretesting &amp; hypothesis generation
      </Key>
      <Note x={52} y={188} size={11}>
        Generated in minutes at minimal cost
      </Note>
      <Note x={52} y={206} size={11}>
        Reproduces directional price &amp; demand patterns
      </Note>
      <Note x={52} y={224} size={11}>
        Refines question wording &amp; scale variation
      </Note>

      {/* Connector between early pretesting and primary human survey */}
      <Key x={400} y={118} anchor="middle" fill={INK3} size={10}>
        Then
      </Key>
      <line x1={374} y1={134} x2={422} y2={134} stroke={INK} strokeWidth={1.6} />
      <path d={head2.right(424, 134)} fill="none" stroke={INK} strokeWidth={1.6} />

      {/* Right panel: Primary survey data from real human consumers */}
      <rect
        x={430}
        y={14}
        width={350}
        height={240}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={605} y={36} anchor="middle" fill={SIGNAL} size={12}>
        Final stage: Primary human survey
      </Key>
      <line x1={446} y1={48} x2={764} y2={48} stroke={RULE2} strokeWidth={1} />

      <Person3 x={482} y={118} k={1.05} stroke={SIGNAL} />
      <Person3 x={512} y={118} k={1.05} stroke={SIGNAL} />
      <Person3 x={542} y={118} k={1.05} stroke={SIGNAL} />
      <line x1={564} y1={96} x2={620} y2={96} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(622, 96)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <SurveyForm x={630} y={62} tone={SIGNAL} />

      <rect x={446} y={144} width={318} height={94} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={462} y={166} fill={SIGNAL} size={11}>
        Empirical validation on real buyers
      </Key>
      <Note x={462} y={188} size={11}>
        Grounded in lived physical &amp; sensory experience
      </Note>
      <Note x={462} y={206} size={11}>
        Represents emerging &amp; minority segments
      </Note>
      <Note x={462} y={224} size={11}>
        Required for consequential launch decisions
      </Note>
    </Frame>
  );
}

