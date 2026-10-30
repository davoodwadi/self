"use client";

import React, { useState } from "react";
import {
  AppWindow,
  Calculator,
  CheckCircle,
  CreditCard,
  Database,
  Envelope,
  FileText,
  Robot,
  Truck,
  User,
  UserCheck,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 2 PLATES
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
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  rx?: number;
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
}: {
  as: React.ElementType;
  x: number;
  y: number;
  size?: number;
  tone?: string;
}) {
  return React.createElement(as, {
    x: x - size / 2,
    y: y - size / 2,
    size,
    weight: "duotone",
    color: tone,
  });
}

/* --------------------------------------------------------------------------
   Capabilities and Failure Modes: what the model can do alone, and what it
   needs from outside
   -------------------------------------------------------------------------- */

export function Capabilities() {
  const cols = [
    {
      icon: Robot,
      head: "unassisted language model",
      why: "everything needed is in the input",
      tasks: [
        ["Summarize a 40-page", "meeting transcript"],
        ["Translate a product", "description into French"],
      ],
    },
    {
      icon: Database,
      head: "external data retrieval",
      why: "private firm records",
      tasks: [
        ["What discount did we give", "Client 118 last year?"],
        ["Which clauses changed in our", "2026 supplier contract?"],
      ],
    },
    {
      icon: Calculator,
      head: "software tools",
      why: "exact arithmetic, live lookups",
      tasks: [
        ["Total the 1,284 invoices", "billed in the third quarter"],
        ["How many units of SKU 2207", "are in stock right now?"],
      ],
    },
    {
      icon: UserCheck,
      head: "human review",
      why: "strict regulatory rules",
      tasks: [
        ["Approve the wording of a", "prospectus disclosure"],
        ["Confirm a loan denial letter", "meets lending rules"],
      ],
    },
  ];
  const cw = 222;
  const gap = 24;
  return (
    <Plate w={960} h={280} title="Summarizing and translating work with the language model alone. Questions about private records need retrieval, exact totals and live stock need software tools, and regulatory wording needs human review">
      <line x1={cw + gap / 2} y1={4} x2={cw + gap / 2} y2={276} stroke={C.ink} strokeWidth={1.2} />
      {cols.map((c, i) => {
        const x = i * (cw + gap) + (i ? gap / 2 : 0);
        const tone = i === 0 ? C.accent : C.ink;
        return (
          <g key={c.head}>
            <Icon as={c.icon} x={x + 18} y={22} tone={tone} />
            <text x={x} y={66} fill={tone} style={LB}>
              {c.head}
            </text>
            <text x={x} y={84} fill={C.ink3} style={LS}>
              {c.why}
            </text>
            {c.tasks.map((t, j) => (
              <g key={j}>
                <Box x={x} y={100 + j * 90} w={cw - 8} h={72} tone={i === 0 ? C.accent : C.rule} fill={i === 0 ? C.tint : C.paper} />
                <Lines x={x + 12} y={130 + j * 90} lines={t} fill={C.ink} />
              </g>
            ))}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Tokens, Embeddings, and Semantic Representation
   -------------------------------------------------------------------------- */

export function TokenSpace() {
  const toks = ["Invoice", "#", "447", "1", "is", "overdue", "by", "30", "days", "."];
  const xs = toks.reduce<number[]>((a, t) => [...a, a[a.length - 1] + t.length * 7.4 + 18 + 8], [0]);
  const pick = 5;
  const pcx = r2(xs[pick] + (toks[pick].length * 7.4 + 18) / 2);
  const groups = [
    [
      ["past due notice", 568, 132],
      ["invoice overdue", 524, 158],
      ["late payment", 552, 186],
      ["unpaid balance", 506, 214],
    ],
    [
      ["breach of contract", 742, 128],
      ["indemnification", 774, 156],
      ["liability clause", 736, 184],
      ["termination notice", 782, 212],
    ],
    [
      ["team lunch", 606, 270],
      ["holiday party", 524, 298],
      ["office move", 664, 300],
    ],
  ] as const;
  return (
    <Plate w={960} h={330} title="The sentence Invoice 4471 is overdue by 30 days splits into 10 tokens. Each token becomes a list of numbers, and in embedding space invoice overdue sits next to late payment, near other payment terms and away from legal and social terms">
      <text x={0} y={16} fill={C.ink} style={L}>
        Invoice #4471 is overdue by 30 days.
      </text>
      {toks.map((t, i) => (
        <g key={i}>
          <rect
            x={r2(xs[i])}
            y={30}
            width={r2(t.length * 7.4 + 18)}
            height={30}
            rx={4}
            fill={i === pick ? C.tint : i % 2 ? C.grey : C.paper}
            stroke={i === pick ? C.accent : C.ink3}
            strokeWidth={1.1}
          />
          <text x={r2(xs[i] + 9)} y={50} fill={i === pick ? C.accent : C.ink} style={MONO}>
            {t}
          </text>
        </g>
      ))}
      <text x={r2(xs[toks.length] + 16)} y={50} fill={C.ink3} style={L}>
        7 words, 10 tokens
      </text>

      {/* one token becomes a vector */}
      <Arrow x1={pcx} y1={66} x2={pcx} y2={104} tone={C.accent} width={1.4} />
      <text x={0} y={128} fill={C.ink3} style={LS}>
        embedding of “overdue”
      </text>
      <text x={0} y={152} fill={C.accent} style={{ ...MONO, fontSize: 13 }}>
        [0.12, −0.48, 0.91, 0.07, −0.33, …]
      </text>

      {/* embedding space */}
      <rect x={470} y={96} width={488} height={232} rx={6} fill="none" stroke={C.rule} />
      <text x={950} y={116} textAnchor="end" fill={C.ink3} style={LS}>
        embedding space
      </text>
      <line x1={524} y1={158} x2={552} y2={186} stroke={C.accent} strokeWidth={1.4} />
      {groups.flat().map(([t, x, y]) => {
        const lit = t === "invoice overdue" || t === "late payment";
        return (
          <g key={t}>
            <circle cx={x} cy={y} r={4.5} fill={lit ? C.accent : C.ink3} />
            <text x={x + 10} y={y + 4} fill={lit ? C.accent : C.ink} style={label(12.5, lit ? 600 : 400)}>
              {t}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Self-Attention: "it" in a lease clause attends back to its referent
   -------------------------------------------------------------------------- */

export function AttentionArcs() {
  const words = [
    "The", "tenant", "shall", "pay", "the", "security", "deposit", "before", "occupancy.",
    "If", "it", "is", "not", "received", "within", "10", "days,", "a", "penalty", "applies.",
  ];
  const cw = 7.3;
  const xs = words.reduce<number[]>((a, w) => [...a, a[a.length - 1] + w.length * cw + 11], [12]);
  const mid = (i: number) => r2(xs[i] + (words[i].length * cw) / 2);
  const from = 10;
  const base = 200;
  const arcs = [
    { to: 6, w: 0.58 },
    { to: 1, w: 0.21 },
  ];
  return (
    <Plate w={960} h={214} title="In the clause, the word it attends most strongly to deposit, weight 0.58, and less to tenant, 0.21">
      {arcs.map((a) => {
        const x1 = mid(from);
        const x2 = mid(a.to);
        const h = Math.min(Math.abs(x1 - x2) * 0.62, 300);
        const top = r2(base - 22 - h / 2);
        const lit = a.to === 6;
        return (
          <g key={a.to}>
            <path
              d={`M${x1} ${base - 22}Q${r2((x1 + x2) / 2)} ${r2(base - 22 - h)} ${x2} ${base - 22}`}
              fill="none"
              stroke={lit ? C.accent : C.ink3}
              strokeWidth={r2(1 + a.w * 9)}
              strokeLinecap="round"
              opacity={lit ? 1 : 0.8}
            />
            <text x={r2((x1 + x2) / 2)} y={top - 8} textAnchor="middle" fill={lit ? C.accent : C.ink3} style={label(12.5, 600)}>
              {a.w.toFixed(2)}
            </text>
          </g>
        );
      })}
      {words.map((w, i) => {
        const lit = i === from || i === 6 || i === 5;
        return (
          <text
            key={i}
            x={r2(xs[i])}
            y={base}
            fill={lit ? C.accent : i === 1 ? C.ink : C.ink2}
            style={label(14, lit || i === 1 ? 600 : 400)}
          >
            {w}
          </text>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Next-Token Prediction and Sampling Temperature (interactive)
   The same next-token scores, rescaled by temperature, and ten runs drawn
   with the same random numbers so only the temperature changes.
   -------------------------------------------------------------------------- */

const CANDIDATES = [
  ["overdue", 4.2],
  ["late", 3.1],
  ["past", 2.3],
  ["outstanding", 1.9],
  ["behind", 1.2],
  ["unpaid", 0.9],
  ["old", 0.1],
  ["delinquent", -0.3],
] as const;

function probs(t: number) {
  if (t <= 0) return CANDIDATES.map((_, i) => (i === 0 ? 1 : 0));
  const e = CANDIDATES.map(([, s]) => Math.exp(s / t));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / z);
}

const RUNS = Array.from({ length: 10 }, (_, k) => hash(k * 3 + 11));

export function TemperatureLab() {
  const [t, setT] = useState(0.7);
  const p = probs(t);
  const runs = RUNS.map((u) => {
    let acc = 0;
    for (let i = 0; i < p.length; i++) {
      acc += p[i];
      if (u < acc) return i;
    }
    return p.length - 1;
  });
  const X = 104;
  const BW = 300;
  return (
    <Plate w={540} h={452} title="Interactive: move the temperature to see how the probabilities of the next word spread out, and how often ten runs of the same prompt choose a word other than overdue">
      <text x={0} y={18} fill={C.ink} style={label(15, 500)}>
        The client’s payment is now 45 days
      </text>
      <rect x={262} y={2} width={70} height={22} rx={3} fill={C.tint} stroke={C.accent} strokeDasharray="3 3" />
      {CANDIDATES.map(([w], i) => {
        const y = 52 + i * 26;
        const bw = r2(p[i] * BW);
        return (
          <g key={w}>
            <text x={X - 12} y={y + 13} textAnchor="end" fill={i === 0 ? C.ink : C.ink2} style={label(13, i === 0 ? 600 : 400)}>
              {w}
            </text>
            <rect x={X} y={y} width={Math.max(bw, 0.5)} height={18} fill={i === 0 ? C.ink : C.ink3} opacity={i === 0 ? 0.85 : 0.55} />
            <text x={X + bw + 8} y={y + 13} fill={C.ink3} style={LS}>
              {(p[i] * 100).toFixed(p[i] < 0.01 && p[i] > 0 ? 1 : 0)}%
            </text>
          </g>
        );
      })}
      <text x={X - 12} y={302} textAnchor="end" fill={C.ink} style={L}>
        temperature
      </text>
      <Knob x={X} y={298} len={BW} value={t} min={0} max={2} step={0.05} onChange={setT} label="Sampling temperature" />
      <text x={X + BW + 22} y={303} fill={C.accent} style={LB}>
        {t.toFixed(2)}
      </text>
      {[0, 0.5, 1, 1.5, 2].map((v) => (
        <text key={v} x={r2(X + (v / 2) * BW)} y={328} textAnchor="middle" fill={C.ink3} style={LS}>
          {v}
        </text>
      ))}
      <text x={0} y={364} fill={C.ink3} style={LS}>
        ten runs of the same prompt
      </text>
      {runs.map((i, k) => {
        const x = (k % 5) * 108;
        const y = 374 + Math.floor(k / 5) * 38;
        const odd = i !== 0;
        return (
          <g key={k}>
            <rect x={x} y={y} width={100} height={28} rx={4} fill={odd ? C.tint : C.paper} stroke={odd ? C.accent : C.rule} />
            <text x={x + 50} y={y + 19} textAnchor="middle" fill={odd ? C.accent : C.ink} style={label(13, odd ? 600 : 400)}>
              {CANDIDATES[i][0]}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Anatomy of an Enterprise Prompt: four layers, one cached prefix
   -------------------------------------------------------------------------- */

export function PromptLayers() {
  const layers = [
    ["system instructions", "You are a claims assistant for a home insurer.", "Answer only from the policy. Decline legal advice."],
    ["domain context", "Policy 4.2: burst-pipe water damage is covered", "up to $25,000. Policy 4.3: flood damage is not."],
    ["reference examples", "“Basement flooded in a storm” → not covered, 4.3", "“Pipe burst in the attic” → covered, 4.2"],
    ["the specific record", "Claim 88213: “Kitchen pipe split overnight and", "soaked the floor.”"],
  ];
  const W = 410;
  const H = 82;
  const G = 10;
  return (
    <Plate w={560} h={370} title="A claims prompt in four layers: system instructions, domain context and reference examples stay the same on every request and are cached, while the specific claim changes each time">
      {layers.map(([name, a, b], i) => {
        const y = i * (H + G) + (i === 3 ? 6 : 0);
        const last = i === 3;
        return (
          <g key={name}>
            <Box x={0} y={y} w={W} h={H} tone={last ? C.ink : C.ink3} fill={last ? C.paper : C.grey} />
            <text x={12} y={y + 22} fill={C.ink} style={LB}>
              {name}
            </text>
            <Lines x={12} y={y + 46} lines={[a, b]} style={{ ...MONO, fontSize: 11.5 }} fill={C.ink2} dy={18} />
          </g>
        );
      })}
      {/* what repeats and what changes */}
      <path d={`M${W + 10} 2H${W + 18}V${3 * (H + G) - G}H${W + 10}`} fill="none" stroke={C.accent} strokeWidth={1.6} />
      <Lines x={W + 28} y={118} lines={["same on", "every request,", "cached"]} style={label(13, 600)} fill={C.accent} />
      <path d={`M${W + 10} ${3 * (H + G) + 6}H${W + 18}V${3 * (H + G) + 6 + H}H${W + 10}`} fill="none" stroke={C.ink3} strokeWidth={1.4} />
      <Lines x={W + 28} y={3 * (H + G) + 40} lines={["changes with", "each request"]} style={L} fill={C.ink3} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Zero-Shot and Few-Shot Task Specification
   -------------------------------------------------------------------------- */

export function ZeroFewShot() {
  const mono = { ...MONO, fontSize: 12 };
  const instr = "Label the ticket: Billing, Shipping or Defect.";
  const ticket = "Ticket: “Box torn, lamp base cracked.”";
  const examples = [
    ["“Charged twice for order 5521.”", "Billing"],
    ["“Tracking says delivered, nothing came.”", "Shipping"],
    ["“Box crushed and it will not power on.”", "Defect"],
  ];
  const out = 256;
  return (
    <Plate w={960} h={296} title="Zero-shot: the instruction and the ticket alone, and the model answers Shipping. Few-shot: the same instruction with three labeled tickets, including a crushed box that is a defect, and the model answers Defect">
      {/* zero-shot */}
      <text x={0} y={16} fill={C.ink} style={LB}>
        zero-shot
      </text>
      <Box x={0} y={30} w={420} h={86} tone={C.ink3} />
      <text x={14} y={60} fill={C.ink} style={mono}>
        {instr}
      </text>
      <text x={14} y={96} fill={C.ink} style={mono}>
        {ticket}
      </text>
      <Arrow x1={210} y1={122} x2={210} y2={out - 6} tone={C.ink3} />
      <Box x={150} y={out} w={120} h={34} tone={C.ink3} />
      <text x={210} y={out + 22} textAnchor="middle" fill={C.ink3} style={label(14, 600)}>
        Shipping
      </text>

      {/* few-shot */}
      <text x={480} y={16} fill={C.ink} style={LB}>
        few-shot
      </text>
      <Box x={480} y={30} w={480} h={190} tone={C.ink3} />
      <text x={494} y={60} fill={C.ink} style={mono}>
        {instr}
      </text>
      <rect x={490} y={74} width={460} height={88} rx={3} fill={C.tint} />
      {examples.map(([q, a], i) => (
        <g key={a}>
          <text x={500} y={96 + i * 26} fill={C.ink2} style={mono}>
            {q}
          </text>
          <text x={940} y={96 + i * 26} textAnchor="end" fill={C.accent} style={{ ...mono, fontWeight: 700 }}>
            → {a}
          </text>
        </g>
      ))}
      <text x={494} y={198} fill={C.ink} style={mono}>
        {ticket}
      </text>
      <Arrow x1={720} y1={222} x2={720} y2={out - 6} tone={C.accent} />
      <Box x={660} y={out} w={120} h={34} tone={C.accent} />
      <text x={720} y={out + 22} textAnchor="middle" fill={C.accent} style={label(14, 600)}>
        Defect
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Structured Outputs and Schema Validation: invoice email to a typed record
   -------------------------------------------------------------------------- */

export function InvoiceToRecord() {
  const mono = { ...MONO, fontSize: 12 };
  return (
    <Plate w={960} h={300} title="A vendor's invoice email goes into a language model constrained by a four-field schema. It returns a JSON record with vendor, invoice number, amount and due date, which passes validation and is written to the accounting database">
      {/* the email */}
      <Box x={0} y={20} w={282} h={200} tone={C.ink} />
      <Icon as={Envelope} x={22} y={44} size={26} tone={C.ink3} />
      <text x={44} y={48} fill={C.ink} style={label(12, 600)}>
        billing@harborsupply.com
      </text>
      <text x={14} y={78} fill={C.ink} style={label(12.5, 600)}>
        Invoice INV-2291
      </text>
      <line x1={0} y1={90} x2={282} y2={90} stroke={C.rule} />
      <Lines
        x={14}
        y={114}
        lines={["Hi, attached is our invoice for 40", "pallets of packaging film. The total", "is $3,180.00, payable by November 28.", "Thanks, Dana"]}
        style={label(12.5, 400)}
        fill={C.ink2}
        dy={20}
      />

      {/* model under a schema */}
      <Arrow x1={292} y1={110} x2={340} y2={110} tone={C.ink3} />
      <Box x={348} y={74} w={104} h={72} tone={C.ink} rx={8} />
      <Icon as={Robot} x={400} y={110} size={38} />
      <Box x={326} y={182} w={148} h={110} tone={C.ink3} fill={C.grey} />
      <text x={338} y={202} fill={C.ink3} style={label(11.5, 600)}>
        schema
      </text>
      <Lines x={338} y={222} lines={["vendor: text", "invoice_id: text", "amount: number", "due_date: date"]} style={{ ...mono, fontSize: 11.5 }} fill={C.ink} dy={17} />
      <Arrow x1={400} y1={178} x2={400} y2={152} tone={C.ink3} />

      {/* the record */}
      <Arrow x1={460} y1={110} x2={508} y2={110} tone={C.ink3} />
      <Box x={516} y={40} w={232} h={140} tone={C.accent} />
      <Lines
        x={530}
        y={66}
        lines={["{", '  "vendor": "Harbor Supply",', '  "invoice_id": "INV-2291",', '  "amount": 3180.00,', '  "due_date": "2026-11-28"', "}"]}
        style={mono}
        fill={C.ink}
        dy={19}
      />
      <Icon as={CheckCircle} x={538} y={206} size={26} tone={C.accent} />
      <text x={558} y={211} fill={C.accent} style={label(13, 600)}>
        valid
      </text>

      {/* downstream software */}
      <Arrow x1={756} y1={110} x2={812} y2={110} tone={C.ink3} />
      <Icon as={Database} x={872} y={106} size={52} />
      <text x={872} y={156} textAnchor="middle" fill={C.ink} style={L}>
        accounting
      </text>
      <text x={872} y={173} textAnchor="middle" fill={C.ink} style={L}>
        database
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Retrieval-Augmented Generation Pipeline
   -------------------------------------------------------------------------- */

function Vec({ x, y, seed, tone = C.ink3 }: { x: number; y: number; seed: number; tone?: string }) {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const h = r2(4 + hash(seed * 13 + i) * 14);
        return <rect key={i} x={x + i * 6} y={r2(y - h)} width={4} height={h} fill={tone} />;
      })}
    </g>
  );
}

function Step({ n, x, y, t }: { n: number; x: number; y: number; t: string }) {
  return (
    <g>
      <circle cx={x + 11} cy={y - 5} r={11} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
      <text x={x + 11} y={y} textAnchor="middle" fill={C.ink} style={label(12, 600)}>
        {n}
      </text>
      <text x={x + 30} y={y} fill={C.ink} style={LB}>
        {t}
      </text>
    </g>
  );
}

export function RagPipeline() {
  const chunkY = [64, 92, 120];
  return (
    <Plate w={960} h={372} title="Indexing: a policy manual is split into chunks, each chunk becomes an embedding stored in an index. Answering: the question becomes an embedding, the two closest chunks are retrieved, and the model answers from them with a citation">
      {/* indexing lane */}
      <text x={0} y={14} fill={C.ink3} style={LS}>
        indexing, done once per document
      </text>
      <Step n={1} x={0} y={44} t="chunk" />
      <rect x={10} y={56} width={120} height={96} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      {chunkY.map((y, i) => (
        <g key={y}>
          {i > 0 && <line x1={10} y1={y - 2} x2={130} y2={y - 2} stroke={C.ink} strokeDasharray="4 3" />}
          {[0, 1].map((k) => (
            <line key={k} x1={20} y1={y + 8 + k * 9} x2={r2(20 + 70 + hash(i * 5 + k) * 26)} y2={y + 8 + k * 9} stroke={C.ink3} strokeWidth={2.4} strokeLinecap="round" />
          ))}
        </g>
      ))}
      <text x={10} y={170} fill={C.ink3} style={LS}>
        HR policy manual
      </text>

      <Arrow x1={146} y1={104} x2={204} y2={104} tone={C.ink3} />
      <Step n={2} x={212} y={44} t="embed and index" />
      {chunkY.map((y, i) => (
        <g key={y}>
          <rect x={222} y={y} width={54} height={22} rx={2} fill={i === 1 ? C.tint : C.paper} stroke={i === 1 ? C.accent : C.ink3} />
          <text x={249} y={y + 15} textAnchor="middle" fill={i === 1 ? C.accent : C.ink3} style={label(11, 600)}>
            3.{i + 1}
          </text>
          <Vec x={290} y={y + 20} seed={i + 1} tone={i === 1 ? C.accent : C.ink3} />
        </g>
      ))}
      <Arrow x1={336} y1={104} x2={380} y2={104} tone={C.ink3} />
      <Icon as={Database} x={418} y={100} size={56} />
      <Lines x={458} y={96} lines={["text, title, date,", "access rights"]} style={LS} fill={C.ink3} dy={15} />

      <line x1={0} y1={196} x2={960} y2={196} stroke={C.rule} />

      {/* answering lane */}
      <text x={0} y={222} fill={C.ink3} style={LS}>
        answering, done for every question
      </text>
      <Step n={3} x={0} y={252} t="embed the query" />
      <rect x={10} y={266} width={196} height={48} rx={10} fill={C.grey} />
      <Lines x={22} y={286} lines={["Can unused vacation days", "carry over to next year?"]} style={label(12.5, 400)} fill={C.ink} dy={17} />
      <Vec x={88} y={350} seed={9} tone={C.accent} />

      <Step n={4} x={262} y={252} t="retrieve" />
      <Arrow x1={418} y1={136} x2={418} y2={196} tone={C.ink3} />
      <Arrow x1={418} y1={196} x2={344} y2={262} tone={C.ink3} />
      <Arrow x1={136} y1={342} x2={262} y2={300} tone={C.ink3} dash="4 3" />
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={272 + k * 66} y={272} width={56} height={22} rx={2} fill={C.tint} stroke={C.accent} />
          <text x={300 + k * 66} y={287} textAnchor="middle" fill={C.accent} style={label(11, 600)}>
            {["3.2", "3.3"][k]}
          </text>
        </g>
      ))}
      <text x={272} y={318} fill={C.ink3} style={LS}>
        the closest chunks
      </text>

      <Arrow x1={420} y1={283} x2={480} y2={283} tone={C.ink3} />
      <Step n={5} x={490} y={252} t="answer with citations" />
      <rect x={500} y={266} width={180} height={78} rx={4} fill={C.paper} stroke={C.ink3} />
      <text x={510} y={284} fill={C.ink3} style={label(11, 600)}>
        prompt
      </text>
      <text x={510} y={302} fill={C.ink2} style={label(11.5, 400)}>
        question
      </text>
      {[0, 1].map((k) => (
        <rect key={k} x={510 + k * 62} y={312} width={54} height={20} rx={2} fill={C.tint} stroke={C.accent} />
      ))}
      <text x={537} y={326} textAnchor="middle" fill={C.accent} style={label(11, 600)}>
        3.2
      </text>
      <text x={599} y={326} textAnchor="middle" fill={C.accent} style={label(11, 600)}>
        3.3
      </text>
      <Arrow x1={690} y1={305} x2={734} y2={305} tone={C.ink3} />
      <Box x={742} y={266} w={218} h={78} tone={C.accent} />
      <Lines x={754} y={290} lines={["Up to five days carry over", "and expire on March 31."]} style={label(12.5, 400)} fill={C.ink} dy={17} />
      <text x={754} y={332} fill={C.accent} style={label(12, 600)}>
        [HR policy 3.2]
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Prompting, RAG, or Fine-Tuning: the decision matrix
   -------------------------------------------------------------------------- */

export function MethodMatrix() {
  const cols = [
    { x: 0, t: "" },
    { x: 200, t: "knowledge freshness" },
    { x: 470, t: "engineering cost" },
    { x: 650, t: "primary use case" },
  ];
  const rows = [
    {
      m: ["prompt", "engineering"],
      fresh: ["what the model learned in", "pre-training"],
      cost: 1,
      costT: "lowest",
      use: ["clear instructions and examples", "for knowledge the model has"],
    },
    {
      m: ["retrieval-augmented", "generation"],
      fresh: ["current, updated whenever", "the documents change"],
      cost: 2,
      costT: "moderate",
      use: ["private, changing, auditable", "sources with citations"],
    },
    {
      m: ["fine-tuning"],
      fresh: ["fixed when training ends"],
      cost: 3,
      costT: "highest",
      use: ["consistent style or notation,", "a smaller and cheaper model"],
    },
  ];
  const top = 34;
  const rh = 72;
  return (
    <Plate w={960} h={top + rows.length * rh + 4} title="Prompt engineering: what the model already knows, lowest cost, clear instructions and examples. Retrieval-augmented generation: current documents, moderate cost, private auditable sources with citations. Fine-tuning: fixed at training, highest cost, consistent style or a smaller cheaper model">
      {cols.map((c) => (
        <text key={c.t} x={c.x} y={18} fill={C.ink3} style={label(12.5, 600)}>
          {c.t}
        </text>
      ))}
      <line x1={0} y1={top - 6} x2={960} y2={top - 6} stroke={C.ink} strokeWidth={1.4} />
      {rows.map((r, j) => {
        const y = top + j * rh;
        return (
          <g key={r.costT}>
            {j > 0 && <line x1={0} y1={y - 6} x2={960} y2={y - 6} stroke={C.rule} />}
            <Lines x={0} y={y + 22} lines={r.m} style={LB} fill={C.ink} dy={18} />
            <Lines x={200} y={y + 22} lines={r.fresh} style={L} fill={C.ink} dy={18} />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={470 + k * 18} y={y + 10} width={13} height={13} rx={2} fill={k < r.cost ? C.accent : "none"} stroke={k < r.cost ? C.accent : C.rule} />
            ))}
            <text x={470} y={y + 44} fill={C.ink} style={L}>
              {r.costT}
            </text>
            <Lines x={650} y={y + 22} lines={r.use} style={L} fill={C.ink} dy={18} />
          </g>
        );
      })}
      <line x1={0} y1={top + rows.length * rh - 6} x2={960} y2={top + rows.length * rh - 6} stroke={C.ink} strokeWidth={1.4} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Copilots Versus Autonomous Agents
   -------------------------------------------------------------------------- */

export function CopilotAgent() {
  const cx = 730;
  const cy = 176;
  const R = 92;
  const nodes = [
    { t: "plan", a: -90 },
    { t: "act", a: 0 },
    { t: "observe", a: 90 },
    { t: "update", a: 180 },
  ];
  const pt = (a: number, r = R) => [r2(cx + r * Math.cos((a * Math.PI) / 180)), r2(cy + r * Math.sin((a * Math.PI) / 180))];
  return (
    <Plate w={960} h={330} title="Copilot: the person prompts the assistant, reviews its draft and enters the changes into the software. Agent: given a goal, the system loops through plan, act on a tool, observe and update until the task is complete">
      {/* copilot */}
      <text x={0} y={16} fill={C.ink} style={LB}>
        copilot
      </text>
      <circle cx={100} cy={176} r={40} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
      <Icon as={User} x={100} y={176} size={40} tone={C.accent} />
      <rect x={290} y={58} width={84} height={68} rx={8} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <Icon as={Robot} x={332} y={92} size={38} />
      <rect x={290} y={226} width={84} height={68} rx={8} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <Icon as={AppWindow} x={332} y={260} size={38} />
      <text x={332} y={312} textAnchor="middle" fill={C.ink3} style={LS}>
        CRM
      </text>
      <Arrow x1={140} y1={160} x2={284} y2={92} tone={C.ink3} />
      <text x={186} y={110} textAnchor="middle" fill={C.ink} style={L}>
        prompt
      </text>
      <Arrow x1={284} y1={112} x2={144} y2={176} tone={C.ink3} />
      <text x={230} y={168} textAnchor="middle" fill={C.ink} style={L}>
        draft
      </text>
      <Arrow x1={140} y1={196} x2={284} y2={258} tone={C.accent} width={1.8} />
      <Lines x={176} y={256} lines={["reviews and", "enters changes"]} style={label(13, 600)} fill={C.accent} anchor="middle" />

      <line x1={450} y1={10} x2={450} y2={320} stroke={C.rule} />

      {/* agent */}
      <text x={490} y={16} fill={C.ink} style={LB}>
        agent
      </text>
      <Icon as={User} x={510} y={66} size={28} tone={C.ink3} />
      <Arrow x1={530} y1={66} x2={cx - 30} y2={66} tone={C.ink3} />
      <text x={590} y={56} textAnchor="middle" fill={C.ink3} style={L}>
        goal
      </text>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.accent} strokeWidth={1.8} />
      {nodes.map((n) => {
        const [ax, ay] = pt(n.a + 38);
        const [bx, by] = pt(n.a + 52);
        return <Arrow key={`h${n.t}`} x1={ax} y1={ay} x2={bx} y2={by} tone={C.accent} width={1.8} />;
      })}
      {nodes.map((n) => {
        const [x, y] = pt(n.a);
        return (
          <g key={n.t}>
            <rect x={x - 34} y={y - 14} width={68} height={28} rx={14} fill={C.paper} stroke={C.accent} strokeWidth={1.4} />
            <text x={x} y={y + 5} textAnchor="middle" fill={C.accent} style={label(13, 600)}>
              {n.t}
            </text>
          </g>
        );
      })}
      <Icon as={Robot} x={cx} y={cy} size={44} />
      <Arrow x1={cx + R + 36} y1={cy} x2={884} y2={cy} tone={C.ink3} />
      <Icon as={Database} x={914} y={cy} size={36} />
      <Arrow x1={cx + 60} y1={cy + R - 10} x2={880} y2={300} tone={C.ink3} />
      <text x={956} y={318} textAnchor="end" fill={C.ink} style={L}>
        task complete
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Tool Use and Function Calling: a sequence diagram
   -------------------------------------------------------------------------- */

export function ToolCallSequence() {
  const lanes = [
    { x: 70, icon: User, t: "user" },
    { x: 330, icon: Robot, t: "language model" },
    { x: 610, icon: AppWindow, t: "host application" },
    { x: 870, icon: Database, t: "inventory API" },
  ];
  const mono = { ...MONO, fontSize: 12 };
  const msgs = [
    { a: 2, b: 1, t: "tools: check_stock(sku)", s: mono, tone: C.ink3 },
    { a: 0, b: 1, t: "Can we ship 200 units of SKU 2207?", s: L, tone: C.ink },
    { a: 1, b: 2, t: 'check_stock(sku="2207")', s: { ...mono, fontWeight: 700 }, tone: C.accent },
    { a: 2, b: 3, t: "SELECT on_hand WHERE sku=2207", s: mono, tone: C.ink },
    { a: 3, b: 2, t: '{"on_hand": 164}', s: mono, tone: C.ink },
    { a: 2, b: 1, t: '{"on_hand": 164}', s: mono, tone: C.ink },
    { a: 1, b: 0, t: "No. Only 164 are on hand.", s: L, tone: C.ink },
  ];
  const y0 = 112;
  const dy = 44;
  return (
    <Plate w={960} h={y0 + msgs.length * dy - 6} title="The host gives the model a catalog with check_stock. The user asks whether 200 units of SKU 2207 can ship. The model emits check_stock with sku 2207, the host runs the query against the inventory API, gets 164 on hand, passes it back, and the model replies that only 164 are on hand">
      {lanes.map((l) => (
        <g key={l.t}>
          <Icon as={l.icon} x={l.x} y={22} size={34} tone={C.ink} />
          <text x={l.x} y={60} textAnchor="middle" fill={C.ink} style={LB}>
            {l.t}
          </text>
          <line x1={l.x} y1={72} x2={l.x} y2={y0 + msgs.length * dy - 20} stroke={C.rule} strokeWidth={1.4} strokeDasharray="4 4" />
        </g>
      ))}
      {/* the host runs the tool, outside the model */}
      <rect x={604} y={y0 + 2 * dy - 12} width={12} height={3 * dy + 2} fill={C.grey} stroke={C.ink3} />
      {msgs.map((m, i) => {
        const x1 = lanes[m.a].x;
        const x2 = lanes[m.b].x;
        const y = y0 + i * dy;
        const dir = Math.sign(x2 - x1);
        return (
          <g key={i}>
            <text x={r2((x1 + x2) / 2)} y={y - 8} textAnchor="middle" fill={m.tone} style={m.s}>
              {m.t}
            </text>
            <Arrow x1={x1 + dir * 8} y1={y} x2={x2 - dir * 8} y2={y} tone={m.tone === C.accent ? C.accent : C.ink3} width={m.tone === C.accent ? 2 : 1.4} />
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Planning, Memory, and Multi-Agent Workflows
   -------------------------------------------------------------------------- */

export function MultiAgent() {
  const subs = [
    { x: 160, t: "retrieval", task: "find the order record", tool: FileText, toolT: "order history" },
    { x: 480, t: "billing verification", task: "check for a duplicate charge", tool: CreditCard, toolT: "payment ledger" },
    { x: 800, t: "fulfillment", task: "confirm the shipping status", tool: Truck, toolT: "warehouse system" },
  ];
  return (
    <Plate w={960} h={372} title="A coordinator agent splits the issue, order 7710 charged twice and not yet shipped, across a retrieval agent with the order history, a billing verification agent with the payment ledger, and a fulfillment agent with the warehouse system">
      <rect x={300} y={0} width={360} height={38} rx={19} fill={C.grey} />
      <text x={480} y={24} textAnchor="middle" fill={C.ink} style={label(13.5, 500)}>
        Order 7710: charged twice, not yet shipped
      </text>
      <Arrow x1={480} y1={42} x2={480} y2={70} tone={C.ink3} />
      <circle cx={480} cy={104} r={32} fill={C.tint} stroke={C.accent} strokeWidth={1.5} />
      <Icon as={Robot} x={480} y={104} size={38} tone={C.accent} />
      <text x={526} y={109} fill={C.accent} style={LB}>
        coordinator
      </text>
      {subs.map((s) => (
        <g key={s.t}>
          <Arrow x1={r2(480 + (s.x - 480) * 0.12)} y1={140} x2={s.x} y2={172} tone={C.ink3} />
          <circle cx={s.x} cy={204} r={28} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
          <Icon as={Robot} x={s.x} y={204} size={32} />
          <text x={s.x} y={254} textAnchor="middle" fill={C.ink} style={LB}>
            {s.t}
          </text>
          <text x={s.x} y={272} textAnchor="middle" fill={C.ink3} style={LS}>
            {s.task}
          </text>
          <line x1={s.x} y1={282} x2={s.x} y2={304} stroke={C.ink3} />
          <rect x={s.x - 74} y={306} width={148} height={56} rx={6} fill={C.paper} stroke={C.ink3} />
          <Icon as={s.tool} x={s.x - 48} y={334} size={28} tone={C.ink2} />
          <text x={s.x - 28} y={339} fill={C.ink} style={label(12.5, 500)}>
            {s.toolT}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Compounding Error (interactive): end-to-end success = p to the power n
   -------------------------------------------------------------------------- */

export function CompoundLab() {
  const [p, setP] = useState(0.9);
  const [n, setN] = useState(5);
  const X0 = 64;
  const W = 520;
  const T = 96;
  const H = 210;
  const sx = (k: number) => r2(X0 + ((k - 1) / 19) * W);
  const sy = (v: number) => r2(T + H - v * H);
  const pts = Array.from({ length: 20 }, (_, i) => [i + 1, p ** (i + 1)]);
  const end = p ** n;
  return (
    <Plate w={620} h={474} title="Interactive: set the accuracy of each step and the number of steps to see end-to-end success. At 0.90 per step, five steps succeed 59 percent of the time">
      {/* the chain of steps */}
      {Array.from({ length: n }, (_, i) => {
        const x = r2(X0 + 10 + i * Math.min(48, (W - 20) / Math.max(n - 1, 1)));
        return (
          <g key={i}>
            {i > 0 && <line x1={r2(x - Math.min(48, (W - 20) / Math.max(n - 1, 1)) + 10)} y1={26} x2={x - 10} y2={26} stroke={C.ink3} />}
            <circle cx={x} cy={26} r={10} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
            <text x={x} y={30} textAnchor="middle" fill={C.ink} style={label(10.5, 600)}>
              {i + 1}
            </text>
          </g>
        );
      })}
      <text x={X0} y={66} fill={C.ink} style={L}>
        {p.toFixed(2)} per step, {n} {n === 1 ? "step" : "steps"}
      </text>
      <text x={X0 + W} y={66} textAnchor="end" fill={C.accent} style={label(15, 700)}>
        {p.toFixed(2)}
        <tspan dy={-7} style={{ fontSize: 10 }}>
          {n}
        </tspan>
        <tspan dy={7}> = {Math.round(end * 100)}% end to end</tspan>
      </text>

      {/* success across chain length */}
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}>
          <line x1={X0} y1={sy(v)} x2={X0 + W} y2={sy(v)} stroke={C.rule} />
          <text x={X0 - 8} y={sy(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {v * 100}%
          </text>
        </g>
      ))}
      {[1, 5, 10, 15, 20].map((k) => (
        <text key={k} x={sx(k)} y={T + H + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {k}
        </text>
      ))}
      <text x={X0 + W / 2} y={T + H + 36} textAnchor="middle" fill={C.ink3} style={LS}>
        number of sequential steps
      </text>
      <path d={pts.map(([k, v], i) => `${i ? "L" : "M"}${sx(k)} ${sy(v)}`).join("")} fill="none" stroke={C.ink} strokeWidth={1.6} />
      {pts.map(([k, v]) => (
        <circle key={k} cx={sx(k)} cy={sy(v)} r={k === n ? 6 : 2.6} fill={k === n ? C.accent : C.ink} />
      ))}
      <line x1={sx(n)} y1={sy(end) + 6} x2={sx(n)} y2={T + H} stroke={C.accent} strokeDasharray="3 3" />

      {/* controls */}
      <text x={X0} y={392} fill={C.ink} style={L}>
        accuracy per step
      </text>
      <Knob x={236} y={387} len={280} value={p} min={0.8} max={0.99} step={0.01} onChange={(v) => setP(r2(v))} label="Accuracy per step" />
      <text x={X0 + W} y={392} textAnchor="end" fill={C.ink} style={LB}>
        {p.toFixed(2)}
      </text>
      <text x={X0} y={442} fill={C.ink} style={L}>
        steps
      </text>
      <Knob x={236} y={437} len={280} value={n} min={1} max={20} onChange={setN} label="Number of steps" tone={C.ink} />
      <text x={X0 + W} y={442} textAnchor="end" fill={C.ink} style={LB}>
        {n}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Human-in-the-Loop Checkpoints: impact by reversibility
   -------------------------------------------------------------------------- */

export function ActionMatrix() {
  const X = 70;
  const Y = 8;
  const CW = 236;
  const CH = 184;
  const cells = [
    { c: 0, r: 1, auto: true, items: ["retrieve account records", "draft an internal note", "route a ticket to a queue"] },
    { c: 1, r: 1, auto: false, items: ["send a customer an", "apology email"] },
    { c: 0, r: 0, auto: false, items: ["pause a $50,000", "ad campaign"] },
    { c: 1, r: 0, auto: false, items: ["issue a large refund", "execute a wire transfer", "send a binding contract", "to a supplier"] },
  ];
  return (
    <Plate w={560} h={446} title="Actions that are low cost and reversible, such as retrieving records, run autonomously. Every action that is high cost or irreversible, such as a wire transfer, needs human approval">
      {cells.map((k) => {
        const x = X + k.c * CW;
        const y = Y + k.r * CH;
        return (
          <g key={`${k.c}${k.r}`}>
            <rect x={x} y={y} width={CW} height={CH} fill={k.auto ? C.paper : C.tint} stroke={C.paper} strokeWidth={3} />
            <Icon as={k.auto ? Robot : UserCheck} x={x + 30} y={y + 32} size={30} tone={k.auto ? C.ink : C.accent} />
            <Lines x={x + 18} y={y + 78} lines={k.items} style={label(13, 400)} fill={C.ink} dy={20} />
          </g>
        );
      })}
      <text x={X + CW - 14} y={Y + CH + 32} textAnchor="end" fill={C.ink} style={LB}>
        autonomous
      </text>
      <text x={X + 2 * CW - 14} y={Y + 32} textAnchor="end" fill={C.accent} style={LB}>
        human approval
      </text>
      <rect x={X} y={Y} width={2 * CW} height={2 * CH} fill="none" stroke={C.ink} strokeWidth={1.2} />
      {/* axes */}
      <text x={X + CW / 2} y={Y + 2 * CH + 22} textAnchor="middle" fill={C.ink} style={L}>
        reversible
      </text>
      <text x={X + CW * 1.5} y={Y + 2 * CH + 22} textAnchor="middle" fill={C.ink} style={L}>
        irreversible
      </text>
      <text x={X + CW} y={Y + 2 * CH + 46} textAnchor="middle" fill={C.ink3} style={LS}>
        can the action be undone?
      </text>
      <text x={X - 10} y={Y + CH / 2 + 4} textAnchor="end" fill={C.ink} style={L}>
        high
      </text>
      <text x={X - 10} y={Y + CH * 1.5 + 4} textAnchor="end" fill={C.ink} style={L}>
        low
      </text>
      <text transform={`translate(16 ${Y + CH}) rotate(-90)`} textAnchor="middle" fill={C.ink3} style={LS}>
        cost of an error
      </text>
    </Plate>
  );
}
