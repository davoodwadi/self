/* ==========================================================================
   Week 05 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: a bridge of information, an
   aim that holds or drifts, a fork of objectives, a plan sheet, a balance, a
   pipeline over two collaborators, a sales line that forks, a clipboard and
   a shelf, a split lane of sources, paired bars, a field too wide for one
   company, three pitfalls, a panel of dials, a fitted edge, an observer, a
   form, matched groups, a shelf with a gap, a data field that forks, a CRM
   loop, a lens dug into data, a foundation of insights, and a spectrum.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (560, 400 or 360 for column plates), flat fills,
       hairline rules, no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
     · every label reuses words from the slide the plate sits on
     · anything that implies a quantity the content does not give is marked
       SCHEMATIC
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  glyphProps,
  hash2,
  head2,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  r2,
  RULE,
  RULE2,
  Schematic,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Coins1, Person3 } from "../_visuals/objects";

/** A clipboard with ticked rows, centred on x, top at y. */
function Clipboard({ x, y, w = 80, h = 96, rows = 3, ticked = 2, tone = INK }: { x: number; y: number; w?: number; h?: number; rows?: number; ticked?: number; tone?: string }) {
  const step = (h - 26) / rows;
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={h} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 18} y={y - 6} width={36} height={12} fill={tone} />
      {Array.from({ length: rows }, (_, i) => {
        const ry = y + 26 + i * step;
        return (
          <g key={i}>
            <rect x={x - w / 2 + 12} y={ry - 6} width={12} height={12} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
            {i < ticked ? <path d={`M${x - w / 2 + 14} ${ry} L${x - w / 2 + 17} ${ry + 3} L${x - w / 2 + 23} ${ry - 4}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} /> : null}
            <line x1={x - w / 2 + 32} y1={ry} x2={x + w / 2 - 12} y2={ry} stroke={RULE2} strokeWidth={2.5} />
          </g>
        );
      })}
    </g>
  );
}

/* ==========================================================================
   1 · BRIDGE — information connects people to the marketer
   ========================================================================== */

export function ResearchBridge() {
  const groups = [
    { y: 78, name: "CONSUMERS" },
    { y: 148, name: "CUSTOMERS" },
    { y: 218, name: "THE PUBLIC" },
  ];
  return (
    <Frame height={240} label="Consumers, customers, and the public are connected to the marketer through information. The information passes through design, collection, and analysis, and the marketer uses it to identify and define opportunities and problems.">
      {groups.map((g) => (
        <g key={g.name}>
          <Person3 x={60} y={g.y} stroke={COUNTER} />
          <Person3 x={82} y={g.y} stroke={COUNTER} />
          <Key x={104} y={g.y - 10} fill={COUNTER} size={10}>
            {g.name}
          </Key>
          <path d={`M196 ${g.y - 14} C232 ${g.y - 14} 226 132 256 132`} fill="none" stroke={COUNTER} strokeWidth={1.25} />
        </g>
      ))}

      <Key x={410} y={100} anchor="middle" fill={SIGNAL} size={10.5}>
        INFORMATION
      </Key>
      <rect x={260} y={112} width={300} height={40} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={360} y1={112} x2={360} y2={152} stroke={SIGNAL} strokeWidth={1} />
      <line x1={460} y1={112} x2={460} y2={152} stroke={SIGNAL} strokeWidth={1} />
      {[
        [310, "DESIGN"],
        [410, "COLLECTION"],
        [510, "ANALYSIS"],
      ].map(([x, t]) => (
        <Key key={t} x={x as number} y={136} anchor="middle" fill={SIGNAL} size={9.5}>
          {t}
        </Key>
      ))}
      <line x1={560} y1={132} x2={586} y2={132} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(588, 132)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      <Person3 x={616} y={160} k={1.4} />
      <Key x={616} y={186} anchor="middle" fill={INK} size={10}>
        MARKETER
      </Key>

      <line x1={644} y1={120} x2={670} y2={88} stroke={INK3} strokeWidth={1.25} />
      <line x1={644} y1={144} x2={670} y2={172} stroke={INK3} strokeWidth={1.25} />
      <rect x={674} y={64} width={112} height={32} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={730} y={84} anchor="middle" fill={COUNTER} size={9.5}>
        OPPORTUNITIES
      </Key>
      <Note x={730} y={132} anchor="middle" size={11.5} italic>
        identify and define
      </Note>
      <rect x={674} y={160} width={112} height={32} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={730} y={180} anchor="middle" fill={SIGNAL} size={9.5}>
        PROBLEMS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · AIM — the first step sets the line the whole process follows
   ========================================================================== */

export function ProblemAim() {
  return (
    <Frame height={254} label="From the first step, defining the problem, a straight line reaches the research objectives. Two lines that leave at a slightly different angle drift further apart over the entire research process and miss.">
      <Key x={90} y={92} anchor="middle" fill={SIGNAL} size={10}>
        DEFINE THE PROBLEM
      </Key>

      {[40, 200].map((endY) => (
        <g key={endY}>
          <line x1={100} y1={120} x2={644} y2={endY} stroke={INK3} strokeWidth={1.25} strokeDasharray="5 5" />
          <path d={`M638 ${endY - 6} L650 ${endY + 6} M650 ${endY - 6} L638 ${endY + 6}`} fill="none" stroke={INK3} strokeWidth={1.75} />
        </g>
      ))}

      <line x1={98} y1={120} x2={668} y2={120} stroke={SIGNAL} strokeWidth={2} />
      {[260, 420, 580].map((x) => (
        <circle key={x} cx={x} cy={120} r={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      ))}
      <circle cx={90} cy={120} r={8} fill={SIGNAL} />

      <circle cx={700} cy={120} r={28} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={700} cy={120} r={18} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <circle cx={700} cy={120} r={7} fill={SIGNAL} />
      <Key x={700} y={78} anchor="middle" fill={SIGNAL} size={10}>
        RESEARCH OBJECTIVES
      </Key>

      <path d="M150 218 V228 H640 V218" fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={395} y={248} anchor="middle" fill={INK} size={10}>
        GUIDES THE ENTIRE RESEARCH PROCESS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   3 · FORK — three kinds of objective (560 wide)
   ========================================================================== */

export function ObjectiveFork() {
  return (
    <Frame width={560} height={200} label="Depending on the problem, research objectives branch three ways: exploratory, descriptive, or causal.">
      <rect x={150} y={14} width={260} height={36} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={280} y={37} anchor="middle" fill={INK} size={11.5}>
        DEPENDING ON THE PROBLEM
      </Key>
      <path d="M280 50 V68 M95 68 H465 M95 68 V88 M280 68 V88 M465 68 V88" fill="none" stroke={INK3} strokeWidth={1.25} />

      {/* exploratory: a lens over a question */}
      <circle cx={90} cy={122} r={19} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <line x1={104} y1={136} x2={118} y2={150} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <Display x={90} y={130} anchor="middle" fill={INK} size={20}>
        ?
      </Display>
      <Key x={95} y={188} anchor="middle" fill={INK} size={12.5}>
        EXPLORATORY
      </Key>

      {/* descriptive: measured bars */}
      {[
        [250, 22],
        [268, 36],
        [286, 28],
        [304, 44],
      ].map(([x, h]) => (
        <rect key={x} x={x - 6} y={150 - h} width={12} height={h} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      ))}
      <line x1={236} y1={150} x2={318} y2={150} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={280} y={188} anchor="middle" fill={COUNTER} size={12.5}>
        DESCRIPTIVE
      </Key>

      {/* causal: one thing drives another */}
      <circle cx={433} cy={124} r={12} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      <circle cx={497} cy={124} r={12} fill={SIGNAL} />
      <line x1={447} y1={124} x2={481} y2={124} stroke={SIGNAL} strokeWidth={1.75} />
      <path d={head2.right(483, 124)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={465} y={188} anchor="middle" fill={SIGNAL} size={12.5}>
        CAUSAL
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   4 · PLAN SHEET — what the research plan spells out
   ========================================================================== */

export function PlanSheet() {
  const cols = [
    { cx: 173, n: "01", a: "EXACT INFORMATION", b: "NEEDED" },
    { cx: 400, n: "02", a: "SOURCES OF", b: "EXISTING DATA" },
    { cx: 627, n: "03", a: "SPECIFIC RESEARCH", b: "APPROACHES" },
  ];
  return (
    <Frame height={244} label="A research plan sheet in three sections: the exact information needed, sources of existing data, and specific research approaches.">
      <rect x={60} y={20} width={680} height={210} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={60.75} y={20.75} width={678.5} height={33} fill={SIGNAL_TINT} />
      <line x1={60} y1={54} x2={740} y2={54} stroke={SIGNAL} strokeWidth={1} />
      <Key x={400} y={42} anchor="middle" fill={SIGNAL} size={11}>
        RESEARCH PLAN
      </Key>
      <line x1={287} y1={54} x2={287} y2={230} stroke={RULE} strokeWidth={1} />
      <line x1={513} y1={54} x2={513} y2={230} stroke={RULE} strokeWidth={1} />

      {cols.map((c) => (
        <g key={c.n}>
          <Display x={c.cx} y={92} anchor="middle" fill={INK3} size={20}>
            {c.n}
          </Display>
          <Key x={c.cx} y={194} anchor="middle" fill={INK} size={9.5}>
            {c.a}
          </Key>
          <Key x={c.cx} y={210} anchor="middle" fill={INK} size={9.5}>
            {c.b}
          </Key>
        </g>
      ))}

      {/* exact: crosshair */}
      <circle cx={173} cy={140} r={22} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <circle cx={173} cy={140} r={6} fill={SIGNAL} />
      <path d="M173 110 V126 M173 154 V170 M143 140 H159 M187 140 H203" stroke={SIGNAL} strokeWidth={1.5} />

      {/* existing data: database */}
      <ellipse cx={400} cy={118} rx={24} ry={7} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <path d="M376 118 V160 A24 7 0 0 0 424 160 V118" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d="M376 132 A24 7 0 0 0 424 132 M376 146 A24 7 0 0 0 424 146" fill="none" stroke={COUNTER} strokeWidth={1.25} />

      {/* approaches: a fork of routes */}
      <line x1={593} y1={140} x2={621} y2={140} stroke={INK} strokeWidth={1.5} />
      {[
        [655, 116],
        [659, 140],
        [655, 164],
      ].map(([x, y]) => (
        <g key={y}>
          <line x1={621} y1={140} x2={x} y2={y} stroke={INK} strokeWidth={1.5} />
          <path d={headAlong1(x, y, x - 621, y - 140)} fill="none" stroke={INK} strokeWidth={1.5} />
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   5 · BALANCE — cost of data against value of insights (400 wide)
   ========================================================================== */

export function CostValueBalance() {
  return (
    <Frame width={400} height={166} label="A level balance: the cost of obtaining data in one pan, the value of the insights in the other.">
      <g transform="translate(0 -60)">
      <line x1={150} y1={214} x2={250} y2={214} stroke={RULE} strokeWidth={1} />
      <path d="M186 214 L200 196 L214 214 Z" fill={INK} />
      <line x1={200} y1={100} x2={200} y2={196} stroke={INK} strokeWidth={2} />
      <line x1={70} y1={100} x2={330} y2={100} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={200} cy={100} r={5} fill={PAPER} stroke={INK} strokeWidth={1.5} />

      {[80, 320].map((x) => (
        <g key={x}>
          <path d={`M${x} 100 L${x - 40} 150 M${x} 100 L${x + 40} 150`} fill="none" stroke={INK3} strokeWidth={1} />
          <path d={`M${x - 46} 150 Q${x} 170 ${x + 46} 150`} fill="none" stroke={INK} strokeWidth={1.5} />
        </g>
      ))}

      <Coins1 x={80} y={148} n={4} rx={12} tone={INK} />
      <path d="M320 116 L338 134 L320 152 L302 134 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />

      <Key x={80} y={188} anchor="middle" fill={INK} size={9.5}>
        COST OF
      </Key>
      <Key x={80} y={202} anchor="middle" fill={INK} size={9.5}>
        OBTAINING DATA
      </Key>
      <Key x={320} y={188} anchor="middle" fill={SIGNAL} size={9.5}>
        VALUE OF
      </Key>
      <Key x={320} y={202} anchor="middle" fill={SIGNAL} size={9.5}>
        THE INSIGHTS
      </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   6 · PIPELINE OVER TWO PEOPLE — implementing, interpreting, together
   ========================================================================== */

export function ImplementInterpret() {
  const s3 = [
    { x: 40, t: "COLLECTING" },
    { x: 180, t: "PROCESSING" },
    { x: 320, t: "ANALYZING" },
  ];
  const s4 = [
    { x: 470, a: "DRAWING", b: "CONCLUSIONS" },
    { x: 630, a: "REPORTING TO", b: "MANAGEMENT" },
  ];
  return (
    <Frame height={280} label="Step 3, implementing: collecting, processing, analyzing. Step 4, interpreting: drawing conclusions, reporting to management. Below, researchers and managers work together toward actionable insights.">
      <path d="M40 48 V40 H430 V48" fill="none" stroke={COUNTER} strokeWidth={1.25} />
      <Key x={235} y={30} anchor="middle" fill={COUNTER} size={10.5}>
        03 · IMPLEMENTING
      </Key>
      <path d="M470 48 V40 H760 V48" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={615} y={30} anchor="middle" fill={SIGNAL} size={10.5}>
        04 · INTERPRETING
      </Key>

      {s3.map((c, i) => (
        <g key={c.t}>
          <rect x={c.x} y={62} width={110} height={44} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
          <Key x={c.x + 55} y={88} anchor="middle" fill={COUNTER} size={9.5}>
            {c.t}
          </Key>
          {i < 2 ? (
            <>
              <line x1={c.x + 112} y1={84} x2={c.x + 136} y2={84} stroke={COUNTER} strokeWidth={1.5} />
              <path d={head2.right(c.x + 138, 84)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
            </>
          ) : null}
        </g>
      ))}
      <line x1={432} y1={84} x2={466} y2={84} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(468, 84)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      {s4.map((c, i) => (
        <g key={c.a}>
          <rect x={c.x} y={62} width={130} height={44} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
          <Key x={c.x + 65} y={81} anchor="middle" fill={SIGNAL} size={9.5}>
            {c.a}
          </Key>
          <Key x={c.x + 65} y={96} anchor="middle" fill={SIGNAL} size={9.5}>
            {c.b}
          </Key>
          {i === 0 ? (
            <>
              <line x1={602} y1={84} x2={626} y2={84} stroke={SIGNAL} strokeWidth={1.5} />
              <path d={head2.right(628, 84)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
            </>
          ) : null}
        </g>
      ))}

      <line x1={40} y1={140} x2={760} y2={140} stroke={RULE} strokeWidth={1} />

      <Person3 x={180} y={236} k={1.5} stroke={COUNTER} />
      <Key x={180} y={262} anchor="middle" fill={COUNTER} size={10}>
        RESEARCHERS
      </Key>
      <Person3 x={620} y={236} k={1.5} stroke={SIGNAL} />
      <Key x={620} y={262} anchor="middle" fill={SIGNAL} size={10}>
        MANAGERS
      </Key>

      <line x1={206} y1={214} x2={304} y2={214} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(306, 214)} fill="none" stroke={INK} strokeWidth={1.5} />
      <line x1={594} y1={214} x2={496} y2={214} stroke={INK} strokeWidth={1.5} />
      <path d={head2.left(494, 214)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Note x={400} y={180} anchor="middle" size={12} italic>
        work together
      </Note>
      <rect x={310} y={196} width={180} height={36} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Key x={400} y={218} anchor="middle" fill={INK} size={9.5}>
        ACTIONABLE INSIGHTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7 · SALES LINE THAT FORKS — research objectives before a campaign
   ========================================================================== */

export function SalesDropFork() {
  return (
    <Frame height={236} label="Sales for a flagship product run flat, then drop suddenly. From the drop, one dashed path rushes to launch a new advertising campaign; a solid path goes first to exploratory research objectives.">
      <path d="M40 44 V200 H330" fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={52} y={52} fill={INK3} size={10}>
        SALES
      </Key>
      <path d="M60 86 L100 80 L140 88 L180 80 L220 86 L244 82" fill="none" stroke={INK} strokeWidth={1.75} strokeLinejoin="round" />
      <path d="M244 82 L272 166 L300 178" fill="none" stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={300} cy={178} r={5} fill={SIGNAL} />
      <Key x={40} y={224} fill={INK} size={10}>
        FLAGSHIP PRODUCT
      </Key>

      <path d="M312 178 C400 178 420 80 514 80" fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="5 5" />
      <path d={head2.right(516, 80)} fill="none" stroke={INK3} strokeWidth={1.5} />
      <Note x={642} y={48} anchor="middle" size={12} italic>
        rushing to launch
      </Note>
      <rect x={522} y={60} width={240} height={40} fill={PAPER} stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
      <Key x={642} y={84} anchor="middle" fill={INK3} size={9.5}>
        NEW ADVERTISING CAMPAIGN
      </Key>

      <line x1={312} y1={178} x2={514} y2={178} stroke={SIGNAL} strokeWidth={1.75} />
      <path d={head2.right(516, 178)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <rect x={522} y={154} width={240} height={48} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={642} y={174} anchor="middle" fill={SIGNAL} size={9.5}>
        EXPLORATORY RESEARCH
      </Key>
      <Key x={642} y={190} anchor="middle" fill={SIGNAL} size={9.5}>
        OBJECTIVES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   8 · CLIPBOARD AND SHELF — the two main types of data
   ========================================================================== */

/** The advantages and limitations pair under each data type. */
function PlusMinus({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx - 100} cy={178} r={8} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={`M${cx - 104} 178 H${cx - 96} M${cx - 100} 174 V182`} stroke={INK3} strokeWidth={1.5} />
      <Key x={cx - 86} y={182} fill={INK3} size={9.5}>
        ADVANTAGES
      </Key>
      <circle cx={cx + 18} cy={178} r={8} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={`M${cx + 14} 178 H${cx + 22}`} stroke={INK3} strokeWidth={1.5} />
      <Key x={cx + 32} y={182} fill={INK3} size={9.5}>
        LIMITATIONS
      </Key>
    </g>
  );
}

export function TwoDataTypes() {
  const heights = [84, 94, 78, 90, 86];
  return (
    <Frame height={204} label="Two types of data side by side. Primary: a clipboard being filled in. Secondary: a shelf of files that already exist. Each has advantages and limitations.">
      <line x1={400} y1={20} x2={400} y2={196} stroke={RULE} strokeWidth={1} />

      <Key x={200} y={32} anchor="middle" fill={SIGNAL} size={11}>
        PRIMARY
      </Key>
      <Clipboard x={200} y={56} w={84} h={96} rows={3} ticked={2} />
      <line x1={230} y1={152} x2={258} y2={116} stroke={SIGNAL} strokeWidth={5} strokeLinecap="round" />
      <PlusMinus cx={200} />

      <Key x={600} y={32} anchor="middle" fill={COUNTER} size={11}>
        SECONDARY
      </Key>
      <line x1={530} y1={152} x2={670} y2={152} stroke={INK} strokeWidth={1.5} />
      {heights.map((h, i) => {
        const x = 540 + i * 25;
        return (
          <g key={i}>
            <rect x={x} y={152 - h} width={20} height={h} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
            <rect x={x + 5} y={152 - h + 12} width={10} height={16} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
          </g>
        );
      })}
      <PlusMinus cx={600} />
    </Frame>
  );
}

/* ==========================================================================
   9 · SPLIT LANE — internal vs external secondary data
   ========================================================================== */

export function SecondarySplitLane() {
  return (
    <Frame height={280} label="A split lane. Internal secondary data comes from internal databases; external secondary data comes from government reports and commercial data services. Both were collected for another purpose, and both can be relevant to the current problem.">
      <Key x={140} y={34} fill={INK3} size={10}>
        SOURCES
      </Key>
      <Key x={460} y={34} anchor="middle" fill={INK3} size={10}>
        COLLECTED FOR
      </Key>
      <Key x={695} y={34} anchor="middle" fill={INK3} size={10}>
        RELEVANT TO
      </Key>
      <line x1={20} y1={50} x2={780} y2={50} stroke={RULE2} strokeWidth={1} />
      <rect x={20} y={162} width={580} height={110} fill={COUNTER_TINT} />
      <line x1={20} y1={161} x2={600} y2={161} stroke={RULE} strokeWidth={1.5} />

      {/* internal lane */}
      <Key x={24} y={110} fill={SIGNAL} size={11}>
        INTERNAL
      </Key>
      <ellipse cx={150} cy={96} rx={12} ry={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M138 96 V116 A12 4 0 0 0 162 116 V96 M138 106 A12 4 0 0 0 162 106" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={176} y={110} fill={INK} size={10}>
        INTERNAL DATABASES
      </Key>
      <line x1={320} y1={106} x2={396} y2={106} stroke={INK3} strokeWidth={1.25} />
      <rect x={400} y={92} width={120} height={28} fill={PAPER} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
      <Key x={460} y={110} anchor="middle" fill={INK3} size={9}>
        ANOTHER PURPOSE
      </Key>

      {/* external lane */}
      <Key x={24} y={226} fill={COUNTER} size={11}>
        EXTERNAL
      </Key>
      <path d="M138 190 L150 182 L162 190 Z" fill={PAPER} stroke={COUNTER} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M142 192 V206 M150 192 V206 M158 192 V206 M137 207 H163" stroke={COUNTER} strokeWidth={1.5} />
      <Key x={176} y={200} fill={INK} size={10}>
        GOVERNMENT REPORTS
      </Key>
      <rect x={139} y={232} width={22} height={24} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
      {[
        [144, 8],
        [150, 14],
        [156, 11],
      ].map(([x, h]) => (
        <rect key={x} x={x - 2} y={252 - h} width={4} height={h} fill={COUNTER} />
      ))}
      <Key x={176} y={248} fill={INK} size={10}>
        COMMERCIAL DATA SERVICES
      </Key>
      <line x1={332} y1={197} x2={396} y2={216} stroke={INK3} strokeWidth={1.25} />
      <line x1={368} y1={244} x2={396} y2={230} stroke={INK3} strokeWidth={1.25} />
      <rect x={400} y={208} width={120} height={28} fill={PAPER} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
      <Key x={460} y={226} anchor="middle" fill={INK3} size={9}>
        ANOTHER PURPOSE
      </Key>

      {/* converge on the current problem */}
      <path d="M524 106 C580 106 584 152 614 156" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={headAlong1(616, 156.5, 1, 0.25)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M524 222 C580 222 584 170 614 166" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d={headAlong1(616, 165.5, 1, -0.25)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={620} y={143} width={150} height={36} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={695} y={165} anchor="middle" fill={SIGNAL} size={10}>
        CURRENT PROBLEM
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   10 · SECONDARY DATA: ADVANTAGES AND DISADVANTAGES (400 wide)
   ========================================================================== */

export function FastCheap() {
  return (
    <Frame width={400} height={170} label="Two pairs of bars. Secondary data takes less time and costs less than primary data.">
      <Schematic x={392} y={16} />
      <Key x={20} y={40} fill={INK} size={10}>
        TIME
      </Key>
      <rect x={20} y={48} width={80} height={12} fill={COUNTER} />
      <rect x={20.75} y={64.75} width={300} height={10.5} fill="none" stroke={INK3} strokeWidth={1.5} />
      <Key x={20} y={104} fill={INK} size={10}>
        COST
      </Key>
      <rect x={20} y={112} width={92} height={12} fill={COUNTER} />
      <rect x={20.75} y={128.75} width={280} height={10.5} fill="none" stroke={INK3} strokeWidth={1.5} />
      <rect x={20} y={152} width={10} height={10} fill={COUNTER} />
      <Key x={36} y={161} fill={COUNTER} size={9.5}>
        SECONDARY
      </Key>
      <rect x={150.75} y={152.75} width={8.5} height={8.5} fill="none" stroke={INK3} strokeWidth={1.5} />
      <Key x={166} y={161} fill={INK3} size={9.5}>
        PRIMARY
      </Key>
    </Frame>
  );
}

export function BeyondOneCompany() {
  const cx = 96;
  const cy = 88;
  const dots: [number, number][] = [];
  for (let x = 36; x <= 364; x += 16)
    for (let y = 36; y <= 128; y += 14) if (!(x > 250 && y < 52)) dots.push([x, y]);
  return (
    <Frame width={400} height={170} label="A wide field of data points labelled secondary data. A small circle marks the few points an individual company could collect on its own.">
      <rect x={20} y={20} width={360} height={120} fill="none" stroke={COUNTER} strokeWidth={1.25} />
      <Key x={366} y={38} anchor="end" fill={COUNTER} size={9.5}>
        SECONDARY DATA
      </Key>
      <circle cx={cx} cy={cy} r={36} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      {dots.map(([x, y]) => {
        const inside = Math.hypot(x - cx, y - cy) < 32;
        return <circle key={`${x}-${y}`} cx={x} cy={y} r={inside ? 2.4 : 1.8} fill={inside ? SIGNAL : COUNTER} opacity={inside ? 1 : 0.55} />;
      })}
      <line x1={cx} y1={124} x2={cx} y2={148} stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={20} y={163} fill={SIGNAL} size={9.5}>
        AN INDIVIDUAL COMPANY
      </Key>
    </Frame>
  );
}

export function SecondaryPitfalls() {
  return (
    <Frame width={400} height={170} label="Three pitfalls: an empty folder, the information might not exist; a square peg over a round hole, not very usable; a mark outside the target, not accurate.">
      <line x1={135} y1={30} x2={135} y2={140} stroke={RULE} strokeWidth={1} />
      <line x1={265} y1={30} x2={265} y2={140} stroke={RULE} strokeWidth={1} />

      <path d="M40 56 H62 L70 64 H100 V110 H40 Z" fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="4 4" strokeLinejoin="round" />
      <Key x={70} y={150} anchor="middle" fill={SIGNAL} size={9}>
        MIGHT NOT EXIST
      </Key>

      <circle cx={200} cy={104} r={18} fill={PAPER2} stroke={INK3} strokeWidth={1.5} />
      <rect x={184} y={42} width={32} height={32} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={200} y={150} anchor="middle" fill={SIGNAL} size={9}>
        NOT VERY USABLE
      </Key>

      <circle cx={330} cy={88} r={26} fill="none" stroke={INK3} strokeWidth={1.25} />
      <circle cx={330} cy={88} r={16} fill="none" stroke={INK3} strokeWidth={1.25} />
      <circle cx={330} cy={88} r={5} fill={INK3} />
      <path d="M352 54 L362 64 M362 54 L352 64" stroke={SIGNAL} strokeWidth={2.25} />
      <Key x={330} y={150} anchor="middle" fill={SIGNAL} size={9}>
        NOT ACCURATE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   11 · DIALS — the decisions primary data requires
   ========================================================================== */

export function PrimaryDecisions() {
  const dials = [
    { x: 300, a: "RESEARCH", b: "APPROACHES", deg: -60 },
    { x: 440, a: "CONTACT", b: "METHODS", deg: -135 },
    { x: 580, a: "SAMPLING", b: "PLANS", deg: -95 },
  ];
  return (
    <Frame height={206} label="The specific purpose at hand feeds three decisions, set like dials: research approaches, contact methods, and sampling plans. Together they produce primary data.">
      <rect x={30} y={88} width={160} height={52} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={110} y={110} anchor="middle" fill={SIGNAL} size={9.5}>
        SPECIFIC PURPOSE
      </Key>
      <Key x={110} y={126} anchor="middle" fill={SIGNAL} size={9.5}>
        AT HAND
      </Key>
      <line x1={194} y1={114} x2={256} y2={114} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(258, 114)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      <path d="M266 48 V40 H614 V48" fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={440} y={30} anchor="middle" fill={INK3} size={10}>
        DECISIONS
      </Key>

      {dials.map((d) => {
        const cy = 114;
        return (
          <g key={d.a}>
            <circle cx={d.x} cy={cy} r={30} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            {[-180, -135, -90, -45, 0].map((t) => {
              const r = (t * Math.PI) / 180;
              return <line key={t} x1={r2(d.x + 24 * Math.cos(r))} y1={r2(cy + 24 * Math.sin(r))} x2={r2(d.x + 29 * Math.cos(r))} y2={r2(cy + 29 * Math.sin(r))} stroke={INK3} strokeWidth={1.25} />;
            })}
            <line
              x1={d.x}
              y1={cy}
              x2={r2(d.x + 20 * Math.cos((d.deg * Math.PI) / 180))}
              y2={r2(cy + 20 * Math.sin((d.deg * Math.PI) / 180))}
              stroke={SIGNAL}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <circle cx={d.x} cy={cy} r={4} fill={SIGNAL} />
            <Key x={d.x} y={170} anchor="middle" fill={INK} size={9.5}>
              {d.a}
            </Key>
            <Key x={d.x} y={185} anchor="middle" fill={INK} size={9.5}>
              {d.b}
            </Key>
          </g>
        );
      })}

      <line x1={614} y1={114} x2={658} y2={114} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(660, 114)} fill="none" stroke={INK} strokeWidth={1.5} />
      <rect x={664} y={96} width={116} height={36} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={722} y={118} anchor="middle" fill={SIGNAL} size={10}>
        PRIMARY DATA
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   12 · FITTED EDGE — highly relevant, but more time and resources (400)
   ========================================================================== */

export function RelevantCostly() {
  return (
    <Frame width={400} height={180} label="Left: data cut to fit the purpose exactly, highly relevant. Right: an hourglass and a stack of coins, more time and resources.">
      <path d="M30 40 H116 L136 62 L116 85 L136 108 L116 130 H30 Z" fill={PAPER} stroke={INK3} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={70} y={89} anchor="middle" fill={INK3} size={9}>
        PURPOSE
      </Key>
      <path d="M124 40 H196 V130 H124 L144 108 L124 85 L144 62 Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <Key x={113} y={162} anchor="middle" fill={SIGNAL} size={9.5}>
        HIGHLY RELEVANT
      </Key>

      <path d="M262 46 H298 M262 124 H298" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <path d="M266 48 L294 48 L280 85 L294 122 L266 122 L280 85 Z" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M270 122 L290 122 L280 104 Z" fill={INK3} />
      <path d="M272 58 L288 58 L280 76 Z" fill={INK3} opacity={0.5} />
      <Coins1 x={346} y={122} n={6} rx={16} tone={INK} />
      <Key x={306} y={162} anchor="middle" fill={INK} size={9.5}>
        MORE TIME AND RESOURCES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · THREE APPROACHES — observational, survey, experimental (360 wide)
   ========================================================================== */

export function ObservePlate() {
  return (
    <Frame width={360} height={220} label="An eye watching two shoppers in front of a store shelf.">
      <rect x={150} y={52} width={186} height={118} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      {[92, 132].map((y) => (
        <line key={y} x1={150} y1={y} x2={336} y2={y} stroke={INK3} strokeWidth={1.25} />
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3);
        const x = 162 + (i % 3) * 58 + (row % 2) * 14;
        const h = 18 + Math.round(hash2(i) * 12);
        const base = 92 + row * 40;
        return <rect key={i} x={x} y={base - h} width={28} height={h} fill="none" stroke={RULE2} strokeWidth={1.25} />;
      })}
      <line x1={120} y1={206} x2={344} y2={206} stroke={RULE} strokeWidth={1} />
      <line x1={86} y1={76} x2={194} y2={160} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 4" />
      <line x1={86} y1={76} x2={282} y2={160} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 4" />
      <Person3 x={200} y={206} k={1.3} />
      <Person3 x={288} y={206} k={1.3} />
      <path d="M32 70 Q58 46 84 70 Q58 94 32 70 Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      <circle cx={58} cy={70} r={8} fill={SIGNAL} />
    </Frame>
  );
}

export function SurveyPlate() {
  return (
    <Frame width={360} height={220} label="A questionnaire with a knowledge question answered by checkbox and an attitudes question answered on a five-point scale.">
      <rect x={70} y={16} width={220} height={194} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={90} y={48} fill={COUNTER} size={9.5}>
        KNOWLEDGE
      </Key>
      {[70, 94].map((y, i) => (
        <g key={y}>
          <rect x={90} y={y - 7} width={14} height={14} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
          {i === 0 ? <path d={`M93 ${y} L97 ${y + 4} L103 ${y - 5}`} fill="none" stroke={COUNTER} strokeWidth={2} /> : null}
          <line x1={114} y1={y} x2={i === 0 ? 240 : 210} y2={y} stroke={RULE2} strokeWidth={3} />
        </g>
      ))}
      <line x1={86} y1={118} x2={274} y2={118} stroke={RULE} strokeWidth={1} />
      <Key x={90} y={144} fill={COUNTER} size={9.5}>
        ATTITUDES
      </Key>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={104 + i * 38} cy={176} r={9} fill={i === 3 ? COUNTER : PAPER} stroke={i === 3 ? COUNTER : INK3} strokeWidth={1.5} />
      ))}
    </Frame>
  );
}

export function ExperimentPlate() {
  const groups = [
    { c: 90, lit: false },
    { c: 270, lit: true },
  ];
  return (
    <Frame width={360} height={236} label="Two matched groups of people. The factors above them are the same except one, changed for the second group. The second group's result bar is taller.">
      {groups.map((g) => (
        <g key={g.c}>
          {[0, 1, 2].map((i) => {
            const on = g.lit && i === 2;
            return <rect key={i} x={g.c - 25 + i * 18} y={20} width={12} height={12} fill={on ? SIGNAL : PAPER} stroke={on ? SIGNAL : INK3} strokeWidth={1.25} />;
          })}
          {[
            [-20, 94],
            [20, 94],
            [-20, 140],
            [20, 140],
          ].map(([dx, feet]) => (
            <Person3 key={`${dx}-${feet}`} x={g.c + dx} y={feet} k={0.9} stroke={g.lit ? SIGNAL : INK} />
          ))}
          <rect x={g.c - 14} y={g.lit ? 186 : 206} width={28} height={g.lit ? 40 : 20} fill={g.lit ? SIGNAL : PAPER} stroke={g.lit ? SIGNAL : INK3} strokeWidth={1.5} />
        </g>
      ))}
      <Display x={180} y={112} anchor="middle" fill={INK3} size={28}>
        =
      </Display>
      <line x1={40} y1={226} x2={320} y2={226} stroke={INK3} strokeWidth={1.25} />
      <Key x={180} y={172} anchor="middle" fill={INK} size={9.5}>
        MATCHED GROUPS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · SHELF WITH A GAP — a category no one has studied yet
   ========================================================================== */

export function NovelShelf() {
  return (
    <Frame height={236} label="A shelf of secondary data files with a gap where a novel product category would go: it does not currently exist. An arrow leads from the gap to a clipboard of primary data.">
      <Key x={40} y={50} fill={COUNTER} size={10.5}>
        SECONDARY DATA
      </Key>
      {Array.from({ length: 10 }, (_, i) => {
        const x = 50 + i * 42;
        const h = 82 + Math.round(hash2(i + 7) * 22);
        return (
          <g key={i}>
            <rect x={x} y={180 - h} width={34} height={h} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
            <rect x={x + 8} y={180 - h + 14} width={18} height={24} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1} />
          </g>
        );
      })}
      <rect x={474} y={80} width={36} height={100} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="5 4" />
      <Display x={492} y={140} anchor="middle" fill={SIGNAL} size={24}>
        ?
      </Display>
      <line x1={40} y1={180} x2={530} y2={180} stroke={INK} strokeWidth={1.75} />
      <Key x={492} y={204} anchor="middle" fill={SIGNAL} size={10}>
        NOVEL PRODUCT CATEGORY
      </Key>
      <Note x={492} y={224} anchor="middle" size={12} italic>
        does not currently exist
      </Note>

      <line x1={526} y1={128} x2={626} y2={128} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(628, 128)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={690} y={50} anchor="middle" fill={SIGNAL} size={10.5}>
        PRIMARY DATA
      </Key>
      <Clipboard x={690} y={76} w={96} h={110} rows={3} ticked={1} />
    </Frame>
  );
}

/* ==========================================================================
   15 · DATA FIELD THAT FORKS — more data, or better data and insights
   ========================================================================== */

export function BigDataFork() {
  const field = Array.from({ length: 420 }, (_, i) => [40 + hash2(i) * 290, 48 + hash2(i + 900) * 164] as const);
  const more = Array.from({ length: 360 }, (_, i) => [488 + hash2(i + 3000) * 264, 30 + hash2(i + 5000) * 64] as const);
  const pattern: [number, number][] = [
    [512, 196],
    [556, 186],
    [604, 190],
    [652, 176],
    [700, 170],
    [736, 160],
  ];
  return (
    <Frame height={244} label="A huge, dense field of data points labelled big data. A dashed path leads to an even denser box, more data. A solid path leads to a few points joined into a clear pattern, better data and insights.">
      <Key x={40} y={34} fill={INK} size={10.5}>
        BIG DATA
      </Key>
      {field.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill={INK3} opacity={0.55} />
      ))}

      <path d="M340 128 C400 128 410 62 474 62" fill="none" stroke={INK3} strokeWidth={1.5} strokeDasharray="5 5" />
      <path d={head2.right(476, 62)} fill="none" stroke={INK3} strokeWidth={1.5} />
      <rect x={480} y={24} width={280} height={76} fill="none" stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 4" />
      {more.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.3} fill={INK3} opacity={0.4} />
      ))}
      <Key x={620} y={120} anchor="middle" fill={INK3} size={10}>
        MORE DATA
      </Key>

      <path d="M340 128 C400 128 410 180 474 180" fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <path d={head2.right(476, 180)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <rect x={480} y={146} width={280} height={66} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={`M${pattern.map((p) => p.join(" ")).join("L")}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      {pattern.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={4} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      ))}
      <Key x={620} y={234} anchor="middle" fill={SIGNAL} size={10}>
        BETTER DATA AND INSIGHTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   16 · CORE PROCESS — the CRM cycle
   ========================================================================== */

export function CrmCycle() {
  const cx = 400;
  const cy = 165;
  const rx = 250;
  const ry = 118;
  const nodes = [
    { t: -90, name: "SALES", tone: INK },
    { t: 0, name: "SERVICE", tone: INK },
    { t: 90, name: "LOYALTY", tone: SIGNAL },
    { t: 180, name: "MARKETING", tone: INK },
  ];
  const pw = 150;
  const ph = 32;
  const at = (deg: number) => {
    const t = (deg * Math.PI) / 180;
    return [r2(cx + rx * Math.cos(t)), r2(cy + ry * Math.sin(t))] as const;
  };
  return (
    <Frame height={330} label="The CRM cycle: sales, service, and marketing all feed detailed customer information at the core, while touchpoints around the loop are managed to maximize loyalty.">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={INK3} strokeWidth={1.5} />
      {[-45, 45, 135, 225].map((deg) => {
        const t = (deg * Math.PI) / 180;
        const [x, y] = at(deg);
        return <path key={deg} d={headAlong1(x, y, -rx * Math.sin(t), ry * Math.cos(t), 10)} fill="none" stroke={INK3} strokeWidth={1.75} />;
      })}
      {[-60, -30, 30, 60, 120, 150, 210, 240].map((deg) => {
        const [x, y] = at(deg);
        return <circle key={deg} cx={x} cy={y} r={4.5} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />;
      })}
      <line x1={664} y1={60} x2={630} y2={98} stroke={SIGNAL} strokeWidth={1} />
      <Key x={668} y={56} fill={SIGNAL} size={10}>
        TOUCHPOINTS
      </Key>

      {[
        [cx, cy - 64, cx, cy - ry + ph / 2],
        [cx + 64, cy, cx + rx - pw / 2, cy],
        [cx - 64, cy, cx - rx + pw / 2, cy],
      ].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x2} y1={y2} x2={x1} y2={y1} stroke={INK} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <line x1={cx} y1={cy + 64} x2={cx} y2={cy + ry - ph / 2} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.down(cx, cy + ry - ph / 2 - 1)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      <circle cx={cx} cy={cy} r={62} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      {["DETAILED", "CUSTOMER", "INFORMATION"].map((w, i) => (
        <Key key={w} x={cx} y={cy - 10 + i * 16} anchor="middle" fill={SIGNAL} size={9.5}>
          {w}
        </Key>
      ))}

      {nodes.map((n) => {
        const [x, y] = at(n.t);
        const lit = n.tone === SIGNAL;
        return (
          <g key={n.name}>
            <rect x={x - pw / 2} y={y - ph / 2} width={pw} height={ph} rx={16} fill={lit ? SIGNAL : PAPER} stroke={n.tone} strokeWidth={1.5} />
            <Key x={x} y={y + 4} anchor="middle" fill={lit ? PAPER : INK} size={10}>
              {n.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   17 · LENS DUG INTO DATA — marketing analytics
   ========================================================================== */

export function AnalyticsDig() {
  const lx = 260;
  const ly = 170;
  const dots = Array.from({ length: 380 }, (_, i) => [40 + hash2(i + 11000) * 430, 88 + hash2(i + 13000) * 134] as const).filter(
    ([x, y]) => Math.hypot(x - lx, y - ly) > 40 && !(Math.abs(x - lx) < 5 && y < ly),
  );
  const pattern: [number, number][] = [
    [238, 186],
    [250, 178],
    [262, 170],
    [274, 160],
    [284, 152],
  ];
  return (
    <Frame height={262} label="Marketing analytics drawn as a lens pushed down into a field of big data, bringing out a meaningful pattern. The results lead to customer insights and to a gauge of marketing performance.">
      <Key x={36} y={64} fill={INK3} size={10}>
        BIG DATA
      </Key>
      <line x1={30} y1={74} x2={480} y2={74} stroke={INK3} strokeWidth={1.25} />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.7} fill={INK3} opacity={0.5} />
      ))}

      <Key x={274} y={30} fill={SIGNAL} size={10}>
        MARKETING ANALYTICS
      </Key>
      <line x1={260} y1={20} x2={260} y2={136} stroke={SIGNAL} strokeWidth={3} strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={34} fill={PAPER} stroke={SIGNAL} strokeWidth={2.5} />
      <path d={`M${pattern.map((p) => p.join(" ")).join("L")}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      {pattern.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={2.8} fill={SIGNAL} />
      ))}
      <Key x={260} y={248} anchor="middle" fill={SIGNAL} size={9.5}>
        MEANINGFUL PATTERNS
      </Key>

      <line x1={488} y1={150} x2={538} y2={112} stroke={INK} strokeWidth={1.5} />
      <path d={headAlong1(540, 110.5, 50, -38)} fill="none" stroke={INK} strokeWidth={1.5} />
      <line x1={488} y1={160} x2={536} y2={194} stroke={INK} strokeWidth={1.5} />
      <path d={headAlong1(538, 195.5, 48, 34)} fill="none" stroke={INK} strokeWidth={1.5} />

      <Person3 x={566} y={122} k={0.9} stroke={COUNTER} />
      <Key x={590} y={110} fill={COUNTER} size={10}>
        CUSTOMER INSIGHTS
      </Key>
      <path d="M548 206 A22 22 0 0 1 592 206" fill="none" stroke={INK} strokeWidth={1.75} />
      <line x1={570} y1={206} x2={583} y2={190} stroke={SIGNAL} strokeWidth={2} strokeLinecap="round" />
      <circle cx={570} cy={206} r={3} fill={INK} />
      <Key x={604} y={204} fill={INK} size={10}>
        MARKETING PERFORMANCE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   18 · FOUNDATION — interpretation turns data into insights, then value
   ========================================================================== */

export function InterpretationChain() {
  const dots = Array.from({ length: 64 }, (_, i) => [44 + hash2(i + 21000) * 150, 104 + hash2(i + 23000) * 96] as const);
  return (
    <Frame height={250} label="Raw data on its own, sent straight across, is crossed out. Passed through a person, the human element of interpretation, it becomes customer insights: the foundation on which customer value and relationships are built.">
      <Key x={40} y={90} fill={INK3} size={10}>
        DATA
      </Key>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} fill={INK3} opacity={0.6} />
      ))}

      <path d="M200 92 Q340 12 466 80" fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="5 5" />
      <path d="M462 72 L478 88 M478 72 L462 88" stroke={SIGNAL} strokeWidth={2.25} />
      <Note x={336} y={32} anchor="middle" size={12} italic>
        data alone
      </Note>

      <line x1={206} y1={172} x2={262} y2={172} stroke={INK3} strokeWidth={1.5} />
      <path d={head2.right(264, 172)} fill="none" stroke={INK3} strokeWidth={1.5} />
      <Person3 x={310} y={200} k={1.6} />
      <Key x={310} y={222} anchor="middle" fill={INK} size={9.5}>
        HUMAN ELEMENT
      </Key>
      <Key x={310} y={238} anchor="middle" fill={INK} size={9.5}>
        OF INTERPRETATION
      </Key>

      <line x1={380} y1={206} x2={502} y2={206} stroke={SIGNAL} strokeWidth={1.75} />
      <path d={head2.right(504, 206)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Note x={440} y={194} anchor="middle" size={11.5} italic>
        fresh understandings
      </Note>

      <rect x={516} y={120} width={124} height={64} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={578} y={156} anchor="middle" fill={COUNTER} size={9.5}>
        CUSTOMER VALUE
      </Key>
      <rect x={650} y={120} width={124} height={64} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={712} y={156} anchor="middle" fill={COUNTER} size={9.5}>
        RELATIONSHIPS
      </Key>
      <rect x={510} y={190} width={270} height={32} fill={SIGNAL} />
      <Key x={645} y={210} anchor="middle" fill={PAPER} size={10}>
        CUSTOMER INSIGHTS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   19 · SPECTRUM — personalized value to invading privacy
   ========================================================================== */

export function PrivacyLine() {
  const mark = 430;
  return (
    <Frame height={214} label="A line from personalized value to invading consumer privacy. Moving right, more personal data piles up at each stop. A dashed marker in the middle asks where the line is.">
      {Array.from({ length: 11 }, (_, i) => {
        const x = 100 + i * 60;
        const tone = x < mark ? COUNTER : SIGNAL;
        return (
          <g key={i}>
            {Array.from({ length: i + 1 }, (_, j) => (
              <circle key={j} cx={x} cy={110 - j * 7} r={2.6} fill={tone} opacity={x < mark ? 0.7 : 1} />
            ))}
          </g>
        );
      })}
      <line x1={60} y1={120} x2={740} y2={120} stroke={INK} strokeWidth={1.75} />
      <line x1={60} y1={112} x2={60} y2={128} stroke={INK} strokeWidth={1.75} />
      <line x1={740} y1={112} x2={740} y2={128} stroke={INK} strokeWidth={1.75} />
      <Key x={60} y={152} fill={COUNTER} size={10.5}>
        PERSONALIZED VALUE
      </Key>
      <Key x={740} y={152} anchor="end" fill={SIGNAL} size={10.5}>
        INVADING CONSUMER PRIVACY
      </Key>

      <line x1={mark} y1={52} x2={mark} y2={136} stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />
      <circle cx={mark} cy={34} r={16} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Display x={mark} y={42} anchor="middle" fill={INK} size={22}>
        ?
      </Display>
      <Key x={mark} y={194} anchor="middle" fill={INK} size={11}>
        WHERE IS THE LINE?
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

export function GlyphAim() {
  return (
    <svg {...glyphProps}>
      <line x1="6" y1="20" x2="46" y2="20" stroke="var(--signal)" strokeWidth="1.5" />
      <line x1="6" y1="20" x2="44" y2="6" stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="6" y1="20" x2="44" y2="34" stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="52" cy="20" r="8" stroke="var(--signal)" strokeWidth="1.5" />
      <circle cx="52" cy="20" r="3" fill="var(--signal)" />
      <circle cx="6" cy="20" r="3" fill="var(--signal)" />
    </svg>
  );
}

export function GlyphTwoData() {
  return (
    <svg {...glyphProps}>
      <rect x="6" y="6" width="20" height="28" stroke="var(--signal)" strokeWidth="1.5" />
      <path d="M10 14 H22 M10 20 H22 M10 26 H18" stroke="var(--signal)" strokeWidth="1.25" />
      <line x1="32" y1="4" x2="32" y2="36" stroke="var(--rule)" strokeWidth="1" />
      {[38, 46, 54].map((x, i) => (
        <rect key={x} x={x} y={10 - (i % 2) * 3} width="6" height={24 + (i % 2) * 3} stroke="var(--counter)" strokeWidth="1.25" />
      ))}
    </svg>
  );
}

export function GlyphPattern() {
  const pts = [
    [8, 32],
    [20, 26],
    [32, 28],
    [44, 16],
    [56, 8],
  ];
  return (
    <svg {...glyphProps}>
      {[
        [12, 10],
        [26, 12],
        [50, 30],
        [38, 34],
        [16, 20],
        [58, 22],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="var(--ink-3)" />
      ))}
      <path d={`M${pts.map((p) => p.join(" ")).join("L")}`} stroke="var(--signal)" strokeWidth="1.5" />
      {pts.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.5" fill="var(--paper)" stroke="var(--signal)" strokeWidth="1.25" />
      ))}
    </svg>
  );
}
