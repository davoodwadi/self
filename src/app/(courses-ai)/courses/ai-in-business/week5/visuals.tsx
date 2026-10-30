"use client";

import React, { useState } from "react";
import {
  ChartBar,
  ChatCircleDots,
  CheckCircle,
  Coins,
  FileText,
  Flask,
  GraduationCap,
  Keyboard,
  Microphone,
  Mouse,
  Queue,
  Robot,
  Timer,
  User,
  UsersThree,
  VideoCamera,
  Webcam,
  XCircle,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 5 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);
const MONO = { ...label(12, 500), fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };

/** Several lines of plate text, one tspan per line. */
function Lines({
  x,
  y,
  lines,
  style = L,
  fill = C.ink,
  dy = 17,
  anchor,
}: {
  x: number;
  y: number;
  lines: string[];
  style?: React.CSSProperties;
  fill?: string;
  dy?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={fill} style={style} textAnchor={anchor}>
      {lines.map((t, i) => (
        <tspan key={i} x={x} dy={i ? dy : 0}>
          {t}
        </tspan>
      ))}
    </text>
  );
}

/** A rounded frame, tinted when it carries the accent. */
function Box({
  x,
  y,
  w,
  h,
  tone = C.ink,
  fill,
  rx = 4,
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  rx?: number;
  dash?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill ?? (tone === C.accent ? C.tint : C.paper)}
      stroke={tone}
      strokeWidth={1.3}
      strokeDasharray={dash}
    />
  );
}

/** A Phosphor icon placed by its centre. */
function Icon({
  as,
  x,
  y,
  size = 34,
  tone = C.ink,
  weight = "duotone",
}: {
  as: React.ElementType;
  x: number;
  y: number;
  size?: number;
  tone?: string;
  weight?: "duotone" | "regular" | "fill";
}) {
  return React.createElement(as, {
    x: x - size / 2,
    y: y - size / 2,
    size,
    weight,
    color: tone,
  });
}

/** A row of choices under an interactive plate. */
function Choice<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-4 flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={`rounded border px-3 py-1.5 font-sans text-[0.9375rem] transition-colors ${
              on
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--rule)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink-3)]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Construct Validity and Target Labels in HR Modeling
   -------------------------------------------------------------------------- */

export function ConstructGap() {
  return (
    <Plate
      w={900}
      h={350}
      title="Two overlapping regions. Employee effectiveness, what management cares about, includes team mentorship, problem prevention and client trust that the target label misses. Supervisor ratings, tenure and past hiring choices, what the training label records, also carry headquarters office and majority demographic, which a model learns as merit"
    >
      <text x={200} y={20} textAnchor="middle" fill={C.accent} style={LB}>
        employee effectiveness
      </text>
      <text x={200} y={38} textAnchor="middle" fill={C.ink3} style={LS}>
        what management cares about
      </text>
      <text x={700} y={20} textAnchor="middle" fill={C.ink} style={LB}>
        supervisor ratings, tenure, past hiring
      </text>
      <text x={700} y={38} textAnchor="middle" fill={C.ink3} style={LS}>
        what the training label records
      </text>

      <ellipse cx={330} cy={196} rx={235} ry={130} fill={C.tint} stroke={C.accent} strokeWidth={1.6} />
      <ellipse cx={570} cy={196} rx={235} ry={130} fill={C.grey} stroke={C.ink3} strokeWidth={1.6} />

      <Lines x={205} y={170} lines={["team mentorship", "problem prevention", "client trust"]} anchor="middle" dy={22} />
      <text x={205} y={262} textAnchor="middle" fill={C.accent} style={label(12, 600)}>
        missed by the label
      </text>

      <Lines x={450} y={188} lines={["captured", "by both"]} anchor="middle" fill={C.ink3} style={LS} dy={16} />

      <Lines x={695} y={180} lines={["headquarters office", "majority demographic"]} anchor="middle" dy={22} />
      <text x={695} y={250} textAnchor="middle" fill={C.ink} style={label(12, 600)}>
        learned as merit
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   From Keyword Filters to Semantic Skill Matching
   -------------------------------------------------------------------------- */

const RESUMES = [
  { title: "Compliance officer", years: "4 years", kw: true, score: 0.93 },
  { title: "Financial auditing", years: "6 years", kw: false, score: 0.86 },
  { title: "Regulatory reporting", years: "5 years", kw: false, score: 0.81 },
  { title: "Retail store sales", years: "3 years", kw: false, score: 0.22 },
];

export function KeywordVsSemantic() {
  const rowY = [118, 182, 246, 310];
  const bx = 690;
  const bw = 170;
  const cut = 0.6;
  return (
    <Plate
      w={960}
      h={360}
      title="Four applicants for a compliance analyst posting. A keyword filter that requires the word compliance passes only the compliance officer and rejects the financial auditor and the regulatory reporting specialist. Skills taxonomy matching scores the same resumes 0.93, 0.86, 0.81 and 0.22, so the first three go to human review"
    >
      <text x={480} y={22} textAnchor="middle" fill={C.ink} style={LB}>
        posting: compliance analyst
      </text>

      <text x={250} y={62} textAnchor="end" fill={C.ink} style={LB}>
        keyword filter
      </text>
      <text x={250} y={82} textAnchor="end" fill={C.ink3} style={MONO}>
        must contain &quot;compliance&quot;
      </text>
      <text x={bx} y={62} fill={C.ink} style={LB}>
        skills taxonomy match
      </text>
      <text x={bx} y={82} fill={C.ink3} style={LS}>
        similarity to the role
      </text>

      {RESUMES.map((r, i) => {
        const y = rowY[i];
        const surfaced = !r.kw && r.score >= cut;
        return (
          <g key={r.title}>
            <Box x={330} y={y - 24} w={290} h={48} tone={C.ink3} />
            <Icon as={FileText} x={356} y={y} size={28} tone={C.ink2} />
            <text x={380} y={y - 3} fill={C.ink} style={L}>
              {r.title}
            </text>
            <text x={380} y={y + 14} fill={C.ink3} style={LS}>
              {r.years}
            </text>

            <Arrow x1={322} y1={y} x2={278} y2={y} tone={C.ink3} width={1.3} />
            <Icon as={r.kw ? CheckCircle : XCircle} x={256} y={y} size={24} tone={r.kw ? C.ink : C.ink3} />
            <text x={236} y={y + 5} textAnchor="end" fill={r.kw ? C.ink : C.ink3} style={L}>
              {r.kw ? "passes" : "rejected"}
            </text>

            <Arrow x1={628} y1={y} x2={bx - 8} y2={y} tone={C.ink3} width={1.3} />
            <rect x={bx} y={y - 9} width={bw} height={18} fill={C.grey} />
            <rect x={bx} y={y - 9} width={r2(bw * r.score)} height={18} fill={surfaced ? C.accent : r.score >= cut ? C.ink2 : C.ink3} />
            <text x={bx + bw + 10} y={y + 5} fill={surfaced ? C.accent : C.ink} style={label(13, surfaced ? 600 : 500)}>
              {r.score.toFixed(2)}
            </text>
          </g>
        );
      })}
      <line x1={r2(bx + bw * cut)} y1={92} x2={r2(bx + bw * cut)} y2={334} stroke={C.ink} strokeDasharray="4 3" />
      <text x={r2(bx + bw * cut)} y={350} textAnchor="middle" fill={C.ink3} style={LS}>
        review threshold 0.60
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Structured Interview Analysis and Assessment Tools
   -------------------------------------------------------------------------- */

const COMPETENCIES = ["client handling", "accuracy", "prioritization"];
const SCORES = [
  [4, 2, 5],
  [3, 5, 3],
  [5, 3, 2],
];

export function InterviewRubric() {
  const qy = [62, 112, 162];
  const cy = [62, 112, 162];
  const tx = 650;
  return (
    <Plate
      w={960}
      h={312}
      title="Structured interview workflow. The same three competency-based questions go to every candidate, the answers are transcribed and each candidate is scored one to five on client handling, accuracy and prioritization against a behavioral rubric. Below, scoring facial expression, vocal pitch and eye contact is struck out as lacking scientific validity"
    >
      <text x={0} y={22} fill={C.ink3} style={LS}>
        competency-based questions
      </text>
      {COMPETENCIES.map((c, i) => (
        <g key={c}>
          <Box x={0} y={qy[i] - 18} w={190} h={36} tone={C.ink} />
          <text x={12} y={qy[i] + 5} fill={C.ink} style={L}>
            {`Q${i + 1}  ${c}`}
          </text>
        </g>
      ))}

      <text x={300} y={22} textAnchor="middle" fill={C.ink3} style={LS}>
        every candidate
      </text>
      {cy.map((y, i) => (
        <g key={i}>
          <Icon as={User} x={300} y={y} size={34} tone={C.ink} />
          <text x={326} y={y + 5} fill={C.ink3} style={LS}>
            {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}
      {qy.map((y1) =>
        cy.map((y2, j) => (
          <line key={`${y1}-${j}`} x1={196} y1={y1} x2={276} y2={y2} stroke={C.rule} strokeWidth={1.2} />
        )),
      )}

      <Arrow x1={346} y1={112} x2={414} y2={112} tone={C.ink3} />
      <Icon as={Microphone} x={446} y={96} size={30} tone={C.ink2} />
      <Icon as={FileText} x={476} y={110} size={34} tone={C.ink2} />
      <text x={460} y={156} textAnchor="middle" fill={C.ink3} style={LS}>
        transcribed
      </text>
      <Arrow x1={510} y1={112} x2={600} y2={112} tone={C.ink3} />
      <text x={555} y={100} textAnchor="middle" fill={C.ink3} style={LS}>
        by criterion
      </text>

      {/* rubric */}
      <text x={tx} y={22} fill={C.accent} style={label(13, 600)}>
        behavioral rubric, scored 1 to 5
      </text>
      {["A", "B", "C"].map((c, j) => (
        <text key={c} x={tx + 150 + j * 60} y={50} textAnchor="middle" fill={C.ink3} style={LS}>
          {c}
        </text>
      ))}
      {COMPETENCIES.map((c, i) => (
        <g key={c}>
          <text x={tx} y={88 + i * 44} fill={C.ink} style={L}>
            {c}
          </text>
          {SCORES[i].map((s, j) => (
            <g key={j}>
              <rect x={tx + 128 + j * 60} y={66 + i * 44} width={44} height={34} rx={3} fill={C.tint} stroke={C.accent} strokeWidth={1} />
              <text x={tx + 150 + j * 60} y={88 + i * 44} textAnchor="middle" fill={C.accent} style={label(14, 600)}>
                {s}
              </text>
            </g>
          ))}
        </g>
      ))}

      {/* the struck lane */}
      <line x1={0} y1={226} x2={960} y2={226} stroke={C.rule} />
      <Icon as={VideoCamera} x={22} y={276} size={32} tone={C.ink3} />
      <text x={50} y={272} fill={C.ink3} style={L}>
        facial expression, vocal pitch, eye contact
      </text>
      <text x={50} y={290} fill={C.ink3} style={LS}>
        automated video interview score
      </text>
      <Arrow x1={350} y1={276} x2={420} y2={276} tone={C.ink3} dash="4 3" />
      <rect x={430} y={256} width={130} height={40} rx={3} fill={C.paper} stroke={C.ink3} strokeDasharray="4 3" />
      <text x={495} y={281} textAnchor="middle" fill={C.ink3} style={L}>
        score 72
      </text>
      <line x1={422} y1={300} x2={568} y2={252} stroke={C.ink} strokeWidth={1.8} />
      <text x={590} y={272} fill={C.ink} style={label(13, 600)}>
        no scientific validity
      </text>
      <text x={590} y={290} fill={C.ink3} style={LS}>
        penalizes disability, speech differences, non-native accents
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Predicting Voluntary Attrition and Regrettable Turnover
   -------------------------------------------------------------------------- */

const TEAMS = [
  { name: "Engineering", regret: 7, pay: "−12%", months: 31, managers: 3 },
  { name: "Sales", regret: 2, pay: "−2%", months: 14, managers: 1 },
  { name: "Finance", regret: 1, pay: "−4%", months: 18, managers: 0 },
  { name: "Support", regret: 2, pay: "−3%", months: 22, managers: 2 },
];

export function AttritionDrivers() {
  const cols = [600, 710, 820, 920];
  const rowY = [112, 156, 200, 244];
  return (
    <Plate
      w={960}
      h={290}
      title="Forty voluntary exits this year: 12 regrettable, 28 routine. Aggregated by team, Engineering has 7 regrettable exits, pay 12 percent below market, 31 months since the last promotion and 3 manager changes, far above Sales, Finance and Support"
    >
      <text x={0} y={22} fill={C.ink} style={LB}>
        voluntary exits this year
      </text>
      {Array.from({ length: 40 }, (_, k) => {
        const x = 14 + (k % 8) * 30;
        const y = 64 + Math.floor(k / 8) * 32;
        const regret = k < 12;
        return (
          <circle key={k} cx={x} cy={y} r={10} fill={regret ? C.accent : C.paper} stroke={regret ? C.accent : C.ink3} strokeWidth={1.4} />
        );
      })}
      <text x={0} y={244} fill={C.accent} style={label(13, 600)}>
        12 regrettable turnover
      </text>
      <text x={0} y={264} fill={C.ink3} style={L}>
        28 routine exits
      </text>

      <Arrow x1={262} y1={140} x2={340} y2={140} tone={C.ink3} />
      <text x={300} y={128} textAnchor="middle" fill={C.ink3} style={LS}>
        by team
      </text>

      <Lines x={cols[0]} y={50} lines={["regrettable", "exits"]} anchor="middle" fill={C.ink3} style={LS} dy={15} />
      <Lines x={cols[1]} y={50} lines={["pay vs", "market"]} anchor="middle" fill={C.ink3} style={LS} dy={15} />
      <Lines x={cols[2]} y={50} lines={["months since", "promotion"]} anchor="middle" fill={C.ink3} style={LS} dy={15} />
      <Lines x={cols[3]} y={50} lines={["manager", "changes"]} anchor="middle" fill={C.ink3} style={LS} dy={15} />
      <line x1={360} y1={86} x2={960} y2={86} stroke={C.ink} />
      {TEAMS.map((t, i) => {
        const lit = i === 0;
        const y = rowY[i];
        const tone = lit ? C.accent : C.ink;
        const st = label(14, lit ? 600 : 500);
        return (
          <g key={t.name}>
            {lit && <rect x={360} y={y - 21} width={600} height={34} fill={C.tint} />}
            <text x={372} y={y} fill={tone} style={st}>
              {t.name}
            </text>
            <text x={cols[0]} y={y} textAnchor="middle" fill={tone} style={st}>
              {t.regret}
            </text>
            <text x={cols[1]} y={y} textAnchor="middle" fill={tone} style={st}>
              {t.pay}
            </text>
            <text x={cols[2]} y={y} textAnchor="middle" fill={tone} style={st}>
              {t.months}
            </text>
            <text x={cols[3]} y={y} textAnchor="middle" fill={tone} style={st}>
              {t.managers}
            </text>
            <line x1={360} y1={y + 13} x2={960} y2={y + 13} stroke={C.rule} />
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Internal Talent Marketplaces and Skill Adjacency
   -------------------------------------------------------------------------- */

const SKILLS = ["product knowledge", "SQL", "ticket triage", "customer communication"];
const ROLES = [
  { name: "junior business analyst", adj: 0.78, uses: [0, 1, 2] },
  { name: "product operations", adj: 0.72, uses: [0, 2, 3] },
  { name: "software engineer", adj: 0.3, uses: [1] },
];

export function SkillBridge() {
  const sy = [92, 142, 192, 242];
  const ry = [104, 174, 244];
  const rx = 420;
  return (
    <Plate
      w={960}
      h={270}
      title="A customer support specialist's skills, product knowledge, SQL, ticket triage and customer communication, link to three internal roles. Skill adjacency is 78 percent for junior business analyst, 72 percent for product operations and 30 percent for software engineer. The gap to junior business analyst is two training modules: statistics fundamentals and dashboard design"
    >
      <Icon as={User} x={18} y={30} size={32} tone={C.ink} />
      <text x={40} y={28} fill={C.ink} style={LB}>
        customer support specialist
      </text>
      <text x={40} y={45} fill={C.ink3} style={LS}>
        current capabilities
      </text>
      {SKILLS.map((s, i) => (
        <g key={s}>
          <Box x={0} y={sy[i] - 17} w={200} h={34} tone={C.ink3} />
          <text x={12} y={sy[i] + 5} fill={C.ink} style={L}>
            {s}
          </text>
        </g>
      ))}

      {ROLES.map((r, k) =>
        r.uses.map((u) => (
          <line
            key={`${k}-${u}`}
            x1={202}
            y1={sy[u]}
            x2={rx - 4}
            y2={ry[k]}
            stroke={k === 0 ? C.accent : C.rule}
            strokeWidth={k === 0 ? 1.6 : 1.2}
          />
        )),
      )}

      <text x={rx} y={45} fill={C.ink3} style={LS}>
        skill adjacency
      </text>
      {ROLES.map((r, k) => {
        const lit = k === 0;
        return (
          <g key={r.name}>
            <text x={rx} y={ry[k] - 6} fill={lit ? C.accent : C.ink} style={label(13, lit ? 600 : 500)}>
              {r.name}
            </text>
            <rect x={rx} y={ry[k] + 3} width={180} height={10} fill={C.grey} />
            <rect x={rx} y={ry[k] + 3} width={r2(180 * r.adj)} height={10} fill={lit ? C.accent : C.ink3} />
            <text x={rx + 190} y={ry[k] + 12} fill={lit ? C.accent : C.ink} style={label(13, lit ? 600 : 500)}>
              {Math.round(r.adj * 100)}%
            </text>
          </g>
        );
      })}

      <Arrow x1={650} y1={104} x2={700} y2={104} tone={C.accent} />
      <text x={712} y={45} fill={C.ink3} style={LS}>
        the gap training must bridge
      </text>
      {["statistics fundamentals", "dashboard design"].map((m, i) => (
        <g key={m}>
          <Box x={712} y={74 + i * 52} w={240} h={40} tone={C.accent} />
          <Icon as={GraduationCap} x={734} y={94 + i * 52} size={24} tone={C.accent} />
          <text x={754} y={99 + i * 52} fill={C.accent} style={label(13, 600)}>
            {m}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Organizational Network Analysis and Collaboration Patterns
   -------------------------------------------------------------------------- */

type Pt = [number, number];
const NODES: { id: string; formal: Pt; info: Pt; r: number }[] = [
  { id: "d", formal: [450, 94], info: [300, 300], r: 12 },
  { id: "fa", formal: [170, 190], info: [130, 92], r: 12 },
  { id: "f1", formal: [80, 300], info: [230, 74], r: 12 },
  { id: "f2", formal: [170, 300], info: [100, 182], r: 12 },
  { id: "f3", formal: [260, 300], info: [214, 184], r: 12 },
  { id: "oa", formal: [450, 190], info: [380, 350], r: 12 },
  { id: "o1", formal: [360, 300], info: [470, 378], r: 12 },
  { id: "o2", formal: [450, 300], info: [450, 200], r: 26 },
  { id: "o3", formal: [540, 300], info: [560, 340], r: 12 },
  { id: "sa", formal: [730, 190], info: [680, 86], r: 12 },
  { id: "s1", formal: [640, 300], info: [790, 80], r: 12 },
  { id: "s2", formal: [730, 300], info: [720, 186], r: 12 },
  { id: "s3", formal: [820, 300], info: [850, 330], r: 9 },
];
const FORMAL_EDGES = [
  ["d", "fa"], ["d", "oa"], ["d", "sa"],
  ["fa", "f1"], ["fa", "f2"], ["fa", "f3"],
  ["oa", "o1"], ["oa", "o2"], ["oa", "o3"],
  ["sa", "s1"], ["sa", "s2"], ["sa", "s3"],
];
const INFO_EDGES = [
  ["fa", "f1"], ["fa", "f2"], ["f1", "f3"], ["f2", "f3"], ["f1", "f2"],
  ["sa", "s1"], ["sa", "s2"], ["s1", "s2"],
  ["oa", "o1"], ["oa", "o3"], ["o1", "o3"],
  ["o2", "fa"], ["o2", "f1"], ["o2", "f3"],
  ["o2", "sa"], ["o2", "s1"], ["o2", "s2"],
  ["o2", "oa"], ["o2", "o1"], ["o2", "o3"],
  ["s3", "s2"], ["d", "fa"], ["d", "oa"],
];

export function OnaToggle() {
  const [view, setView] = useState<"formal" | "info">("formal");
  const info = view === "info";
  const pos = Object.fromEntries(NODES.map((n) => [n.id, info ? n.info : n.formal]));
  const edges = info ? INFO_EDGES : FORMAL_EDGES;
  const teams = info
    ? [
        { t: "finance", x: 180, y: 44 },
        { t: "sales", x: 735, y: 44 },
        { t: "operations", x: 470, y: 414 },
      ]
    : [
        { t: "finance", x: 170, y: 340 },
        { t: "operations", x: 450, y: 340 },
        { t: "sales", x: 730, y: 340 },
      ];
  return (
    <div>
      <Plate
        w={900}
        h={420}
        title={
          info
            ? "Interactive, informal collaboration network: the same thirteen people. One operations employee sits at the centre and connects to finance, sales and operations, fielding most questions, while a new sales hire hangs at the edge with a single tie"
            : "Interactive, formal reporting chart: a director over three managers, finance, operations and sales, each with three reports"
        }
      >
        {edges.map(([a, b]) => {
          const hub = info && (a === "o2" || b === "o2");
          return (
            <line
              key={`${a}-${b}`}
              x1={pos[a][0]}
              y1={pos[a][1]}
              x2={pos[b][0]}
              y2={pos[b][1]}
              stroke={hub ? C.accent : C.ink3}
              strokeWidth={hub ? 1.6 : 1.3}
              strokeOpacity={hub ? 0.7 : 1}
            />
          );
        })}
        {NODES.map((n) => {
          const hub = info && n.id === "o2";
          const r = info ? n.r : n.id === "d" ? 14 : 12;
          return (
            <circle
              key={n.id}
              cx={pos[n.id][0]}
              cy={pos[n.id][1]}
              r={r}
              fill={hub ? C.accent : C.paper}
              stroke={hub ? C.accent : C.ink}
              strokeWidth={1.6}
            />
          );
        })}
        {teams.map((t) => (
          <text key={t.t} x={t.x} y={t.y} textAnchor="middle" fill={C.ink3} style={L}>
            {t.t}
          </text>
        ))}
        {info && (
          <g>
            <text x={505} y={244} fill={C.accent} style={label(13, 600)}>
              central connector
            </text>
            <text x={505} y={261} fill={C.accent} style={LS}>
              fields 38% of all questions
            </text>
            <text x={850} y={364} textAnchor="middle" fill={C.ink3} style={L}>
              peripheral
            </text>
          </g>
        )}
      </Plate>
      <Choice
        name="Which picture of the organization"
        value={view}
        onChange={setView}
        options={[
          { id: "formal", label: "Formal reporting chart" },
          { id: "info", label: "Informal collaboration network" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Unbundling Jobs into Tasks: Automation Versus Augmentation
   -------------------------------------------------------------------------- */

const TASKS: { t: string; j: number; c: number; above?: boolean }[] = [
  { t: "transcribe meeting audio", j: 0.06, c: 0.1 },
  { t: "categorize expense receipts", j: 0.12, c: 0.3 },
  { t: "format routine reports", j: 0.3, c: 0.17 },
  { t: "draft a financial plan", j: 0.42, c: 0.58 },
  { t: "model retirement scenarios", j: 0.58, c: 0.42 },
  { t: "discuss client goals", j: 0.9, c: 0.66, above: true },
  { t: "recommend final allocation", j: 0.8, c: 0.86, above: true },
];

export function TaskUnbundle() {
  const x0 = 70;
  const x1 = 610;
  const yb = 350;
  const yt = 40;
  const X = (j: number) => r2(x0 + j * (x1 - x0));
  const Y = (c: number) => r2(yb - c * (yb - yt));
  const a = 0.75;
  const b = 1.4;
  const augZone = `M${X(0)} ${Y(a)}L${X(a)} ${Y(0)}L${X(1)} ${Y(0)}L${X(1)} ${Y(b - 1)}L${X(b - 1)} ${Y(1)}L${X(0)} ${Y(1)}Z`;
  const hum = `M${X(b - 1)} ${Y(1)}L${X(1)} ${Y(b - 1)}L${X(1)} ${Y(1)}Z`;
  const bars = [
    { t: "before", seg: [12, 18, 10] },
    { t: "after redesign", seg: [2, 13, 25] },
  ];
  const segTone = [C.paper, C.tint, C.grey];
  const segStroke = [C.ink3, C.accent, C.ink3];
  const segName = ["routine", "augmented", "client and strategic"];
  const H = 6.5;
  const by = 350;
  return (
    <Plate
      w={1000}
      h={400}
      title="A financial planner's job unbundled into seven tasks, placed by required human judgment and error consequences. Transcribing meeting audio, categorizing expense receipts and formatting routine reports fall in the automation zone. Drafting a financial plan and modeling retirement scenarios fall in augmentation. Discussing client goals and recommending the final allocation stay human-led. After redesign, weekly hours move from 12 routine, 18 augmented and 10 client and strategic to 2, 13 and 25"
    >
      <path d={augZone} fill={C.tint} />
      <path d={hum} fill={C.grey} />
      <line x1={X(0)} y1={Y(a)} x2={X(a)} y2={Y(0)} stroke={C.accent} strokeDasharray="4 3" />
      <line x1={X(b - 1)} y1={Y(1)} x2={X(1)} y2={Y(b - 1)} stroke={C.ink} strokeDasharray="4 3" />
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} />
      <line x1={x0} y1={yt} x2={x0} y2={yb} stroke={C.ink} />
      <text x={x1} y={yb + 22} textAnchor="end" fill={C.ink3} style={LS}>
        required human judgment →
      </text>
      <text x={x0 - 14} y={yb} transform={`rotate(-90 ${x0 - 14} ${yb})`} fill={C.ink3} style={LS}>
        error consequences →
      </text>

      <text x={X(0.03)} y={Y(0.6)} fill={C.ink3} style={label(13, 600)}>
        automation
      </text>
      <text x={X(0.04)} y={Y(0.93)} fill={C.accent} style={label(13, 600)}>
        augmentation
      </text>
      <text x={X(0.98)} y={Y(0.96)} textAnchor="end" fill={C.ink} style={label(13, 600)}>
        human-led
      </text>

      {TASKS.map((k) => (
        <g key={k.t}>
          <circle cx={X(k.j)} cy={Y(k.c)} r={5} fill={C.ink} />
          <text
            x={k.above ? X(k.j) : X(k.j) + 10}
            y={k.above ? Y(k.c) - 12 : Y(k.c) + 4}
            textAnchor={k.above ? "middle" : undefined}
            fill={C.ink}
            style={L}
          >
            {k.t}
          </text>
        </g>
      ))}

      {/* hours per week */}
      <text x={690} y={22} fill={C.ink} style={L}>
        hours per week
      </text>
      {bars.map((bar, i) => {
        const x = 690 + i * 100;
        let y = by;
        return (
          <g key={bar.t}>
            {bar.seg.map((h, s) => {
              y -= h * H;
              return (
                <g key={s}>
                  <rect x={x} y={r2(y)} width={70} height={r2(h * H)} fill={segTone[s]} stroke={segStroke[s]} strokeWidth={1} />
                  {h >= 4 && (
                    <text x={x + 35} y={r2(y + (h * H) / 2 + 4)} textAnchor="middle" fill={C.ink} style={L}>
                      {h}
                    </text>
                  )}
                </g>
              );
            })}
            <text x={x + 35} y={by + 22} textAnchor="middle" fill={C.ink3} style={LS}>
              {bar.t}
            </text>
          </g>
        );
      })}
      {bars[1].seg.map((h, s) => {
        const below = bars[1].seg.slice(0, s).reduce((p, q) => p + q, 0);
        const mid = by - (below + h / 2) * H;
        return (
          <text key={s} x={872} y={r2(mid + (s === 0 ? -2 : 4))} fill={s === 1 ? C.accent : C.ink} style={LS}>
            {s === 0 ? `${segName[s]} ${h}` : segName[s]}
          </text>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Productivity Leveling Effect of Generative AI
   Brynjolfsson, Li and Raymond (2025), QJE: resolutions per hour with an AI
   assistant, lowest skill quintile +36%, all agents +15%, highest quintile
   no gain. Dell'Acqua et al. (2023), HBS working paper 24-013: quality gain
   +43% below-average and +17% above-average performers inside the frontier,
   19 points fewer correct solutions on a task outside it.
   -------------------------------------------------------------------------- */

export function LevelingEvidence() {
  const zx = 150;
  const S = 4.4;
  const left = [
    { t: "lowest skill fifth", v: 36, lit: true },
    { t: "all agents", v: 15 },
    { t: "highest skill fifth", v: 0 },
  ];
  const zx2 = 690;
  const right = [
    { t: "below-average performers", v: 43, lit: true },
    { t: "above-average performers", v: 17 },
  ];
  return (
    <Plate
      w={960}
      h={300}
      title="Real study results. Customer support agents given an AI assistant resolved 36 percent more chats per hour in the lowest skill fifth, 15 percent more on average and no more in the highest skill fifth (Brynjolfsson, Li and Raymond 2025). Consultants using GPT-4 raised output quality 43 percent if below-average and 17 percent if above-average, but on a task outside the frontier they were 19 percentage points less likely to be correct (Dell'Acqua and colleagues 2023)"
    >
      <text x={0} y={20} fill={C.ink} style={LB}>
        customer support agents
      </text>
      <text x={0} y={38} fill={C.ink3} style={LS}>
        change in chats resolved per hour with an AI assistant
      </text>
      {left.map((d, i) => {
        const y = 82 + i * 50;
        return (
          <g key={d.t}>
            <text x={zx - 10} y={y + 5} textAnchor="end" fill={d.lit ? C.accent : C.ink} style={label(13, d.lit ? 600 : 500)}>
              {d.t}
            </text>
            <rect x={zx} y={y - 12} width={Math.max(r2(d.v * S), 1.5)} height={24} fill={d.lit ? C.accent : C.ink3} />
            <text x={zx + d.v * S + 8} y={y + 5} fill={d.lit ? C.accent : C.ink} style={label(14, 600)}>
              {d.v === 0 ? "no gain" : `+${d.v}%`}
            </text>
          </g>
        );
      })}
      <line x1={zx} y1={60} x2={zx} y2={204} stroke={C.ink} />
      <text x={0} y={240} fill={C.ink3} style={LS}>
        Brynjolfsson, Li and Raymond (2025)
      </text>

      <line x1={470} y1={0} x2={470} y2={320} stroke={C.rule} />

      <text x={500} y={20} fill={C.ink} style={LB}>
        management consultants using GPT-4
      </text>
      <text x={500} y={38} fill={C.ink3} style={LS}>
        tasks inside the frontier: change in quality
      </text>
      {right.map((d, i) => {
        const y = 82 + i * 50;
        return (
          <g key={d.t}>
            <text x={zx2 - 10} y={y + 5} textAnchor="end" fill={d.lit ? C.accent : C.ink} style={label(13, d.lit ? 600 : 500)}>
              {d.t}
            </text>
            <rect x={zx2} y={y - 12} width={r2(d.v * S)} height={24} fill={d.lit ? C.accent : C.ink3} />
            <text x={zx2 + d.v * S + 8} y={y + 5} fill={d.lit ? C.accent : C.ink} style={label(14, 600)}>
              +{d.v}%
            </text>
          </g>
        );
      })}
      <line x1={zx2} y1={60} x2={zx2} y2={154} stroke={C.ink} />

      <text x={500} y={196} fill={C.ink3} style={LS}>
        task outside the frontier: correct solutions, AI users vs no AI
      </text>
      <rect x={r2(zx2 - 19 * S)} y={214} width={r2(19 * S)} height={24} fill={C.ink} />
      <line x1={zx2} y1={204} x2={zx2} y2={248} stroke={C.ink} />
      <text x={zx2 + 10} y={231} fill={C.ink} style={label(14, 600)}>
        −19 percentage points
      </text>
      <text x={500} y={290} fill={C.ink3} style={LS}>
        Dell&apos;Acqua and colleagues (2023)
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   How Historical Bias Enters Hiring Models
   -------------------------------------------------------------------------- */

export function BiasLoop() {
  const bw = 250;
  const bh = 96;
  const PROXIES = ["zip code", "university attended", "extracurricular organizations", "career break for caregiving"];
  return (
    <Plate
      w={960}
      h={320}
      title="A feedback loop. Ten years of past engineering hires, mostly men, train a resume model. The model downgrades a resume line such as captain, women's chess club. Fewer women advance, and those decisions become the next training data. On the right, the gender field is removed, but zip code, university attended, extracurricular organizations and career breaks for caregiving still reconstruct group membership"
    >
      {/* 1 past hires */}
      <Box x={0} y={20} w={bw} h={bh} tone={C.ink3} />
      <text x={14} y={44} fill={C.ink} style={L}>
        ten years of past hires
      </text>
      <rect x={14} y={60} width={r2(222 * 0.85)} height={18} fill={C.ink2} />
      <rect x={r2(14 + 222 * 0.85)} y={60} width={r2(222 * 0.15)} height={18} fill={C.paper} stroke={C.ink2} />
      <text x={14} y={98} fill={C.ink3} style={LS}>
        men 85%
      </text>
      <text x={236} y={98} textAnchor="end" fill={C.ink3} style={LS}>
        women 15%
      </text>

      {/* 2 model */}
      <Box x={340} y={20} w={bw} h={bh} tone={C.ink3} />
      <Icon as={Robot} x={370} y={68} size={34} tone={C.ink2} />
      <Lines x={398} y={56} lines={["learns: a good resume", "looks like past hires"]} />

      {/* 3 resume */}
      <Box x={340} y={196} w={bw} h={bh} tone={C.accent} />
      <text x={354} y={226} fill={C.ink3} style={LS}>
        resume line
      </text>
      <text x={354} y={250} fill={C.ink} style={MONO}>
        Captain,{" "}
        <tspan fill={C.accent} fontWeight={700} textDecoration="underline">
          women&apos;s
        </tspan>{" "}
        chess club
      </text>
      <text x={354} y={276} fill={C.accent} style={label(13, 600)}>
        score lowered
      </text>

      {/* 4 outcome */}
      <Box x={0} y={196} w={bw} h={bh} tone={C.ink3} />
      <Lines x={14} y={234} lines={["fewer women advance", "to interview"]} />
      <text x={14} y={276} fill={C.ink3} style={LS}>
        becomes next year&apos;s training data
      </text>

      <Arrow x1={bw + 8} y1={68} x2={332} y2={68} tone={C.ink} />
      <Arrow x1={465} y1={bh + 28} x2={465} y2={188} tone={C.ink} />
      <Arrow x1={332} y1={244} x2={bw + 8} y2={244} tone={C.ink} />
      <Arrow x1={125} y1={188} x2={125} y2={bh + 28} tone={C.ink} />

      {/* proxies */}
      <line x1={640} y1={10} x2={640} y2={310} stroke={C.rule} />
      <text x={670} y={34} fill={C.ink3} style={MONO}>
        <tspan textDecoration="line-through">gender</tspan> field removed
      </text>
      {PROXIES.map((p, i) => (
        <g key={p}>
          <text x={670} y={84 + i * 40} fill={C.ink} style={L}>
            {p}
          </text>
          <line x1={670} y1={92 + i * 40} x2={870} y2={92 + i * 40} stroke={C.rule} />
        </g>
      ))}
      <text x={670} y={256} fill={C.accent} style={label(13, 600)}>
        together reconstruct
      </text>
      <text x={670} y={274} fill={C.accent} style={label(13, 600)}>
        group membership
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Adverse Impact and the Four-Fifths Rule
   -------------------------------------------------------------------------- */

export function FourFifthsLab() {
  const [men, setMen] = useState(40);
  const [women, setWomen] = useState(25);
  const hi = Math.max(men, women);
  const line = r2(0.8 * hi);
  const ratio = hi === 0 ? 1 : Math.min(men, women) / hi;
  const flag = ratio < 0.8;
  const yb = 290;
  const yt = 40;
  const Y = (p: number) => r2(yb - (p / 100) * (yb - yt));
  const groups = [
    { t: "men", v: men, x: 110 },
    { t: "women", v: women, x: 270 },
  ];
  return (
    <Plate
      w={760}
      h={420}
      title={`Interactive: drag the pass rates. Men pass ${men} percent and women ${women} percent. The four-fifths line sits at ${line} percent, the impact ratio is ${ratio.toFixed(2)}, and adverse impact is ${flag ? "indicated" : "not indicated"}`}
    >
      <text x={0} y={18} fill={C.ink} style={L}>
        selection rate, of 100 applicants each
      </text>
      <line x1={60} y1={yb} x2={420} y2={yb} stroke={C.ink} />
      {[0, 50, 100].map((v) => (
        <text key={v} x={50} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v}%
        </text>
      ))}
      <line x1={70} y1={Y(line)} x2={410} y2={Y(line)} stroke={C.ink} strokeWidth={1.4} strokeDasharray="6 4" />
      {groups.map((g) => {
        const low = g.v < line;
        const top = g.v === hi;
        return (
          <g key={g.t}>
            <rect
              x={g.x}
              y={Y(g.v)}
              width={90}
              height={r2(yb - Y(g.v))}
              fill={low ? C.accent : top ? C.ink2 : C.ink3}
            />
            <text
              x={g.x + 45}
              y={Y(g.v) - 8}
              textAnchor="middle"
              fill={low ? C.accent : C.ink}
              stroke={C.paper}
              strokeWidth={5}
              paintOrder="stroke"
              style={LB}
            >
              {g.v}%
            </text>
            <text x={g.x + 45} y={yb + 20} textAnchor="middle" fill={C.ink} style={L}>
              {g.t}
            </text>
          </g>
        );
      })}
      <text x={418} y={Y(line) + 4} fill={C.ink} style={label(12, 600)}>
        {`four-fifths line ${line % 1 === 0 ? line : line.toFixed(1)}%`}
      </text>

      {/* readout */}
      <text x={560} y={70} fill={C.ink3} style={LS}>
        impact ratio
      </text>
      <text x={560} y={112} fill={flag ? C.accent : C.ink} style={label(40, 700)}>
        {ratio.toFixed(2)}
      </text>
      <text x={560} y={138} fill={C.ink3} style={LS}>
        {`${Math.min(men, women)}% ÷ ${hi}%`}
      </text>
      <text x={560} y={180} fill={flag ? C.accent : C.ink} style={label(14, 600)}>
        {flag ? "below 0.80:" : "at or above 0.80:"}
      </text>
      <text x={560} y={198} fill={flag ? C.accent : C.ink} style={label(14, 600)}>
        {flag ? "adverse impact indicated" : "no adverse impact flag"}
      </text>

      <text x={0} y={350} fill={C.ink} style={L}>
        men pass
      </text>
      <Knob x={110} y={345} len={300} value={men} min={0} max={100} onChange={setMen} label="Pass rate for men" />
      <text x={0} y={396} fill={C.ink} style={L}>
        women pass
      </text>
      <Knob x={110} y={391} len={300} value={women} min={0} max={100} onChange={setWomen} label="Pass rate for women" />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Algorithmic Management and Workplace Surveillance Boundaries
   -------------------------------------------------------------------------- */

const TELEMETRY = [
  { icon: Timer, t: ["team cycle", "time"] },
  { icon: Queue, t: ["wait between", "handoffs"] },
  { icon: ChartBar, t: ["backlog by", "process stage"] },
];
const SURVEIL = [
  { icon: Keyboard, t: ["keystroke", "logging"] },
  { icon: Mouse, t: ["mouse-movement", "tracking"] },
  { icon: Webcam, t: ["webcam", "snapshots"] },
  { icon: ChatCircleDots, t: ["private message", "scanning"] },
];

export function SurveillanceSpectrum() {
  const ay = 128;
  const bx = 462;
  return (
    <Plate
      w={960}
      h={222}
      title="A spectrum of workplace data collection. Left of the governance boundary, aggregated anonymized workflow telemetry, team cycle time, wait between handoffs and backlog by process stage, removes process bottlenecks. Right of it, invasive individual surveillance, keystroke logging, mouse-movement tracking, webcam snapshots and private message scanning, erodes trust and increases turnover"
    >
      <line x1={20} y1={ay} x2={940} y2={ay} stroke={C.ink3} strokeWidth={1.4} />
      <text x={20} y={ay - 46} fill={C.accent} style={LB}>
        aggregated, anonymized telemetry
      </text>
      <text x={20} y={ay - 28} fill={C.ink3} style={LS}>
        removes process bottlenecks
      </text>
      <text x={940} y={ay - 46} textAnchor="end" fill={C.ink} style={LB}>
        invasive individual surveillance
      </text>
      <text x={940} y={ay - 28} textAnchor="end" fill={C.ink3} style={LS}>
        erodes trust, increases turnover
      </text>

      {TELEMETRY.map((k, i) => {
        const x = 70 + i * 140;
        return (
          <g key={i}>
            <circle cx={x} cy={ay} r={22} fill={C.tint} stroke={C.accent} strokeWidth={1.4} />
            <Icon as={k.icon} x={x} y={ay} size={26} tone={C.accent} />
            <Lines x={x} y={ay + 44} lines={k.t} anchor="middle" />
          </g>
        );
      })}
      {SURVEIL.map((k, i) => {
        const x = 540 + i * 118;
        return (
          <g key={i}>
            <circle cx={x} cy={ay} r={22} fill={C.paper} stroke={C.ink3} strokeWidth={1.4} />
            <Icon as={k.icon} x={x} y={ay} size={26} tone={C.ink2} />
            <Lines x={x} y={ay + 44} lines={k.t} anchor="middle" />
          </g>
        );
      })}

      <line x1={bx} y1={22} x2={bx} y2={218} stroke={C.ink} strokeWidth={1.6} strokeDasharray="6 4" />
      <text x={bx} y={14} textAnchor="middle" fill={C.ink} style={label(12, 600)}>
        governance boundary
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Change Management and Participatory AI Adoption
   -------------------------------------------------------------------------- */

const PHASES = [
  {
    icon: UsersThree,
    icon2: Flask,
    title: "frontline co-design",
    sub: "and pilot sandboxes",
    items: ["select target tasks", "test real edge cases", "define human override"],
  },
  {
    icon: GraduationCap,
    title: "role-specific training",
    sub: "",
    items: ["prompt formulation", "output verification", "error reporting"],
  },
  {
    icon: Coins,
    title: "shared productivity",
    sub: "incentives",
    items: ["reduced drudgery", "skill development", "career progression"],
  },
];

export function AdoptionRoadmap() {
  const w = 280;
  const gap = 60;
  return (
    <Plate
      w={960}
      h={250}
      title="Three-phase participatory adoption roadmap. Phase 1, frontline co-design and pilot sandboxes: select target tasks, test real edge cases, define human override. Phase 2, role-specific training: prompt formulation, output verification, error reporting. Phase 3, shared productivity incentives: reduced drudgery, skill development, career progression"
    >
      {PHASES.map((p, i) => {
        const x = i * (w + gap);
        const lit = i === 2;
        const tone = lit ? C.accent : C.ink;
        return (
          <g key={p.title}>
            <text x={x} y={18} fill={C.ink3} style={LS}>
              {`phase ${i + 1}`}
            </text>
            <Box x={x} y={28} w={w} h={212} tone={lit ? C.accent : C.ink3} />
            <Icon as={p.icon} x={x + 34} y={66} size={36} tone={tone} />
            {p.icon2 && <Icon as={p.icon2} x={x + 72} y={66} size={30} tone={tone} />}
            <text x={x + 16} y={112} fill={tone} style={label(14, 600)}>
              {p.title}
            </text>
            {p.sub && (
              <text x={x + 16} y={130} fill={tone} style={label(14, 600)}>
                {p.sub}
              </text>
            )}
            {p.items.map((t, k) => (
              <g key={t}>
                <circle cx={x + 20} cy={164 + k * 24} r={2.5} fill={C.ink3} />
                <text x={x + 30} y={168 + k * 24} fill={C.ink2} style={L}>
                  {t}
                </text>
              </g>
            ))}
            {i < 2 && <Arrow x1={x + w + 10} y1={134} x2={x + w + gap - 10} y2={134} tone={C.ink} />}
          </g>
        );
      })}
    </Plate>
  );
}
