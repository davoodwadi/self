/* ==========================================================================
   Week 04 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: a forked flow of what
   organizations do with what they buy, a split lane that demand crosses, a
   sign-off sheet, a decision tree, a checklist with a stamp, interlocking
   rings, a descending supply-chain cascade, an org chart with a buying
   center pulled across it, a radiating fan of roles, a many-to-one role map,
   three purchase loops, a podium, a rope thickening over a foundation,
   bars under a lifetime bracket, merging circles, a magnifying lens, a core
   process loop, share bars, and three small benefit plates.

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 or 360 for column plates), flat fills,
       hairline rules, no shadows or gradients
     · INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or outward-looking state
     · every label reuses words from the slide the plate sits on
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  glyphProps,
  head2,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Coins2, Company1, Factory1, Pack1, Person2 } from "../_visuals/objects";
import {
  BatteryVerticalFull,
  CalendarCheck,
  Car,
  Desktop,
  Funnel,
  Handshake,
  Lightbulb,
  Package,
  PencilRuler,
  PencilSimple,
  Printer,
  SealCheck,
  Signature,
  Wrench,
} from "@phosphor-icons/react";

/* ==========================================================================
   1 · FORKED FLOW — what organizations do with what they buy
   ========================================================================== */

export function TwoUses() {
  return (
    <Frame height={260} label="A selling company ships a package of products and services to another organization, lit. From there one path leads to a factory turning out three packed goods, labelled produce other goods; the other leads to an office desk with a computer and printer, labelled own operations.">
      {/* the seller */}
      <Company1 cx={80} base={170} w={84} h={64} tone={INK} />
      <line x1={132} y1={140} x2={250} y2={140} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(252, 140)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Package x={172} y={100} size={38} weight="duotone" color={INK} />
      <Note x={191} y={166} anchor="middle" size={12} italic>
        products and services
      </Note>

      {/* the buying organization */}
      <Company1 cx={318} base={170} w={100} h={76} tone={SIGNAL} fill={SIGNAL_TINT} />

      {/* produce other goods */}
      <path d="M374 118 C430 118 440 70 500 70" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(502, 70)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Factory1 x={556} y={92} w={84} h={40} />
      <line x1={606} y1={72} x2={640} y2={72} stroke={INK} strokeWidth={1.5} />
      <path d={head2.right(642, 72)} fill="none" stroke={INK} strokeWidth={1.5} />
      {[666, 706, 746].map((x) => (
        <Pack1 key={x} x={x} y={88} w={32} h={34} />
      ))}
      <Key x={556} y={124} anchor="middle" fill={INK} size={10.5}>
        PRODUCE OTHER GOODS
      </Key>

      {/* own operations */}
      <path d="M374 150 C430 150 440 200 500 200" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(502, 200)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <line x1={520} y1={222} x2={668} y2={222} stroke={COUNTER} strokeWidth={2} />
      <line x1={532} y1={222} x2={532} y2={242} stroke={COUNTER} strokeWidth={1.5} />
      <line x1={656} y1={222} x2={656} y2={242} stroke={COUNTER} strokeWidth={1.5} />
      <Desktop x={534} y={174} size={48} weight="duotone" color={COUNTER} />
      <Printer x={606} y={184} size={38} weight="duotone" color={COUNTER} />
      <Key x={700} y={206} fill={COUNTER} size={10.5}>
        OWN
      </Key>
      <Key x={700} y={221} fill={COUNTER} size={10.5}>
        OPERATIONS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   2 · SPLIT LANE — B2B vs B2C market characteristics
   ========================================================================== */

export function MarketSplitLane() {
  const calm = [0, -5, -2, -6, -1, -4, -3, -6, -2, -5, -3];
  const swing = [0, -24, 12, -26, 16, -10, 22, -24, 8, -18, 12];
  const spark = (base: number, ds: number[]) =>
    `M${ds.map((d, i) => `${572 + i * 18} ${base + d}`).join("L")}`;
  return (
    <Frame height={250} label="A split lane in three columns. Buyers: the B2C lane holds a crowd of small people, the B2B lane three large company buildings. Source of demand: a consumer in the B2C lane, with an arrow down into a B2B company, labelled derived demand. Demand over time: a gently wavering B2C line above a sharply zigzagging B2B line that fluctuates more rapidly.">
      <rect x={0} y={134} width={800} height={112} fill={SIGNAL_TINT} />
      <line x1={0} y1={134} x2={800} y2={134} stroke={RULE} strokeWidth={1.5} />
      <line x1={266} y1={28} x2={266} y2={240} stroke={RULE} strokeWidth={1} />
      <line x1={533} y1={28} x2={533} y2={240} stroke={RULE} strokeWidth={1} />

      <Display x={16} y={90} fill={COUNTER} size={22}>
        B2C
      </Display>
      <Display x={16} y={198} fill={SIGNAL} size={22}>
        B2B
      </Display>

      {/* buyers: a crowd of small ones, a few large ones */}
      {Array.from({ length: 21 }, (_, i) => (
        <Person2
          key={i}
          x={98 + (i % 7) * 22}
          y={58 + Math.floor(i / 7) * 30}
          k={0.5}
          stroke={COUNTER}
          width={1.1}
        />
      ))}
      <Company1 cx={100} base={228} w={42} h={48} tone={SIGNAL} />
      <Company1 cx={163} base={228} w={54} h={62} tone={SIGNAL} />
      <Company1 cx={224} base={228} w={38} h={40} tone={SIGNAL} />

      {/* source of demand */}
      <Key x={400} y={46} anchor="middle" fill={COUNTER} size={10}>
        CONSUMER DEMAND
      </Key>
      <Person2 x={400} y={110} k={1.2} stroke={COUNTER} />
      <line x1={400} y1={116} x2={400} y2={160} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.down(400, 162)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Company1 cx={400} base={214} w={56} h={40} tone={SIGNAL} />
      <Key x={400} y={236} anchor="middle" fill={SIGNAL} size={10}>
        DERIVED DEMAND
      </Key>

      {/* demand over time */}
      <path d={spark(92, calm)} fill="none" stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
      <path d={spark(192, swing)} fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <Note x={662} y={238} anchor="middle" size={12} italic>
        fluctuates more rapidly
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   3 · SIGN-OFF SHEET — more participants, a formal purchasing effort
   ========================================================================== */

export function SignOffSheet() {
  const rows = [110, 142, 174, 206, 238];
  return (
    <Frame height={286} label="Left, under B2C purchase: one person alone. Right, under B2B purchase: a purchase order with five people listed, four of them already signed and ticked, one still to sign.">
      <Key x={170} y={36} anchor="middle" fill={INK3} size={12}>
        B2C PURCHASE
      </Key>
      <line x1={100} y1={250} x2={240} y2={250} stroke={RULE} strokeWidth={1} />
      <Person2 x={170} y={250} k={2.6} />

      <line x1={340} y1={30} x2={340} y2={280} stroke={RULE} strokeWidth={1} />

      <Key x={560} y={36} anchor="middle" fill={SIGNAL} size={12}>
        B2B PURCHASE
      </Key>
      <rect x={400} y={50} width={320} height={220} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={400.75} y={50.75} width={318.5} height={33} fill={SIGNAL_TINT} />
      <line x1={400} y1={84} x2={720} y2={84} stroke={SIGNAL} strokeWidth={1} />
      <Key x={560} y={72} anchor="middle" fill={SIGNAL} size={12}>
        PURCHASE ORDER
      </Key>
      {rows.map((r, i) => {
        const signed = i < 4;
        return (
          <g key={r}>
            <Person2 x={428} y={r + 10} k={0.6} stroke={INK3} width={1.25} />
            <line x1={450} y1={r + 8} x2={620} y2={r + 8} stroke={RULE2} strokeWidth={1.25} />
            {signed ? (
              <path d={`M458 ${r + 4} c 10 -12 16 10 26 -2 s 14 8 24 -4 s 12 6 30 0`} fill="none" stroke={INK} strokeWidth={1.25} />
            ) : null}
            <rect x={648} y={r - 7} width={18} height={18} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
            {signed ? (
              <path d={`M651 ${r + 2} L656 ${r + 7} L664 ${r - 4}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   4a · DECISION TREE — more complex purchasing decisions (360 wide)
   ========================================================================== */

export function DecisionTree() {
  const l1 = [60, 160];
  const l2 = [35, 85, 135, 185];
  const l3 = [22, 48, 72, 98, 122, 148, 172, 198];
  const path = [60, 85, 98];
  const on = (a: number, b: number) =>
    (a === 110 && b === path[0]) || (a === path[0] && b === path[1]) || (a === path[1] && b === path[2]);
  const edges: [number, number, number, number][] = [];
  l1.forEach((y) => edges.push([40, 110, 130, y]));
  l2.forEach((y, i) => edges.push([130, l1[Math.floor(i / 2)], 220, y]));
  l3.forEach((y, i) => edges.push([220, l2[Math.floor(i / 2)], 310, y]));
  return (
    <Frame width={360} height={220} label="A branching decision tree with many possible paths, one of them traced through to a decision.">
      {edges.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1}-${y1}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={on(y1, y2) && x1 < 310 ? SIGNAL : RULE2}
          strokeWidth={on(y1, y2) ? 2 : 1.25}
        />
      ))}
      <circle cx={40} cy={110} r={6} fill={SIGNAL} />
      {l1.map((y) => (
        <circle key={`a${y}`} cx={130} cy={y} r={4.5} fill={y === path[0] ? SIGNAL : PAPER} stroke={y === path[0] ? SIGNAL : INK3} strokeWidth={1.25} />
      ))}
      {l2.map((y) => (
        <circle key={`b${y}`} cx={220} cy={y} r={4.5} fill={y === path[1] ? SIGNAL : PAPER} stroke={y === path[1] ? SIGNAL : INK3} strokeWidth={1.25} />
      ))}
      {l3.map((y) => (
        <circle key={`c${y}`} cx={310} cy={y} r={y === path[2] ? 7 : 4} fill={y === path[2] ? SIGNAL : PAPER} stroke={y === path[2] ? SIGNAL : INK3} strokeWidth={1.25} />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   4b · CHECKLIST AND STAMP — a highly formalized process (360 wide)
   ========================================================================== */

export function FormalChecklist() {
  const rows = [
    { y: 76, len: 110 },
    { y: 116, len: 90 },
    { y: 156, len: 44 },
  ];
  return (
    <Frame width={360} height={226} label="A clipboard checklist with every step ticked and an approved stamp.">
      <rect x={90} y={30} width={180} height={184} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={150} y={22} width={60} height={18} fill={INK} />
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={110} y={r.y - 8} width={16} height={16} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
          <path d={`M113 ${r.y} L117 ${r.y + 4} L124 ${r.y - 5}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
          <line x1={140} y1={r.y} x2={140 + r.len} y2={r.y} stroke={RULE2} strokeWidth={3} />
        </g>
      ))}
      <g transform="rotate(-14 230 172)">
        <circle cx={230} cy={172} r={34} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
        <circle cx={230} cy={172} r={28} fill="none" stroke={SIGNAL} strokeWidth={1} />
        <Key x={231} y={175} anchor="middle" fill={SIGNAL} size={8}>
          APPROVED
        </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   4c · INTERLOCKING RINGS — buyers and sellers depend on each other (360)
   ========================================================================== */

export function Interlock() {
  return (
    <Frame width={360} height={196} label="Two interlocking rings, one labelled buyer and one labelled seller, linked so they cannot be pulled apart.">
      <circle cx={140} cy={104} r={60} fill="none" stroke={COUNTER} strokeWidth={8} />
      <circle cx={220} cy={104} r={60} fill="none" stroke={SIGNAL} strokeWidth={8} />
      <path d="M165.4 49.6 A60 60 0 0 1 192 74" fill="none" stroke={PAPER} strokeWidth={14} />
      <path d="M165.4 49.6 A60 60 0 0 1 192 74" fill="none" stroke={COUNTER} strokeWidth={8} />
      <Key x={112} y={108} anchor="middle" fill={COUNTER} size={11.5}>
        BUYER
      </Key>
      <Key x={248} y={108} anchor="middle" fill={SIGNAL} size={11.5}>
        SELLER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   5 · CASCADE — a drop in consumer demand steps down the supply chain
   ========================================================================== */

export function EvCascade() {
  const x0 = [16, 100, 184, 268];
  const tread = [86, 170, 254, 338];
  const cx = x0.map((x) => x + 60);
  const hx = cx[3] + 14;
  const stairs = `M16 ${tread[0]}${x0
    .map((x, i) => (i < 3 ? `H${x + 104}V${tread[i + 1]}` : `H${x + 114}`))
    .join("")}`;
  return (
    <Frame width={400} height={360} label="A staircase stepping down to the right. On the top step, a consumer with a falling-demand badge, labelled consumer demand for electric vehicles. The drop runs down the stairs to an electric car, then to a battery, labelled battery manufacturers, then to a heap of raw material rocks, labelled raw material suppliers. The last two carry question marks.">
      <path d={stairs} fill="none" stroke={INK3} strokeWidth={1.5} strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1={x0[i] + 104} y1={tread[i] + 4} x2={x0[i] + 104} y2={tread[i + 1] - 4} stroke={SIGNAL} strokeWidth={2.5} />
          <path d={head2.down(x0[i] + 104, tread[i + 1] - 2)} fill="none" stroke={SIGNAL} strokeWidth={2} />
        </g>
      ))}

      {/* consumer demand drops */}
      <Person2 x={cx[0]} y={tread[0]} k={1.4} stroke={COUNTER} fill={COUNTER_TINT} />
      <circle cx={cx[0] + 26} cy={tread[0] - 44} r={11} fill={SIGNAL} />
      <path d={`M${cx[0] + 26} ${tread[0] - 50}V${tread[0] - 38}M${cx[0] + 21} ${tread[0] - 43}L${cx[0] + 26} ${tread[0] - 38}L${cx[0] + 31} ${tread[0] - 43}`} fill="none" stroke={PAPER} strokeWidth={2} />
      <Key x={132} y={34} fill={COUNTER} size={10}>
        CONSUMER DEMAND
      </Key>
      <Note x={132} y={52} size={12} italic>
        for electric vehicles
      </Note>

      {/* the car */}
      <Car x={cx[1] - 28} y={tread[1] - 54} size={56} weight="duotone" color={INK} />

      {/* battery manufacturers */}
      <BatteryVerticalFull x={cx[2] - 26} y={tread[2] - 56} size={52} weight="duotone" color={INK} />
      <Key x={172} y={222} anchor="end" fill={INK} size={10}>
        BATTERY
      </Key>
      <Key x={172} y={237} anchor="end" fill={INK} size={10}>
        MANUFACTURERS
      </Key>

      {/* raw material suppliers */}
      <path d={`M${hx - 34} ${tread[3]}L${hx - 20} ${tread[3] - 20}L${hx - 8} ${tread[3] - 30}L${hx + 4} ${tread[3] - 26}L${hx + 20} ${tread[3] - 14}L${hx + 34} ${tread[3]}Z`} fill="var(--paper-3)" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      {[
        [-16, -10, 6],
        [2, -13, 6],
        [-5, -22, 5],
        [16, -6, 5],
      ].map(([dx, dy, r]) => (
        <path
          key={`${dx}${dy}`}
          d={`M${hx + dx - r} ${tread[3] + dy + 2}L${hx + dx - 1} ${tread[3] + dy - r}L${hx + dx + r} ${tread[3] + dy - 1}L${hx + dx + 2} ${tread[3] + dy + r - 1}Z`}
          fill={INK3}
        />
      ))}
      <Key x={256} y={306} anchor="end" fill={INK} size={10}>
        RAW MATERIAL
      </Key>
      <Key x={256} y={321} anchor="end" fill={INK} size={10}>
        SUPPLIERS
      </Key>

      {/* open questions */}
      {[2, 3].map((i) => (
        <g key={i}>
          <circle cx={cx[i] + 30} cy={tread[i] - 58} r={12} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
          <Display x={cx[i] + 30} y={tread[i] - 52} anchor="middle" fill={SIGNAL} size={16}>
            ?
          </Display>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   6 · ORG CHART — a buying center pulled across departments
   ========================================================================== */

export function BuyingCenterOrg() {
  const depts = [
    { c: 180, name: "FINANCE" },
    { c: 400, name: "OPERATIONS" },
    { c: 620, name: "IT" },
  ];
  const lit = new Set(["180:40", "400:-40", "400:40", "620:-40"]);
  const offsets = [-40, 0, 40];
  return (
    <Frame height={296} label="An organization chart: a company building at the top over three departments, finance, operations and IT, each with three people. People from different departments are pulled together into the buying center, which cuts across the formal structure.">
      <Company1 cx={400} base={58} w={50} h={38} tone={INK} />
      <path d="M400 58 V76 M180 76 H620 M180 76 V96 M400 76 V96 M620 76 V96" fill="none" stroke={INK3} strokeWidth={1.25} />

      {depts.map((d) => (
        <g key={d.name}>
          <rect x={d.c - 70} y={96} width={140} height={28} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
          <Key x={d.c} y={114} anchor="middle" fill={INK3} size={10}>
            {d.name}
          </Key>
          {offsets.map((o) => {
            const on = lit.has(`${d.c}:${o}`);
            return (
              <g key={o}>
                <line x1={d.c} y1={124} x2={d.c + o} y2={170} stroke={RULE2} strokeWidth={1} />
                <Person2 x={d.c + o} y={206} k={0.9} stroke={on ? SIGNAL : INK3} fill={on ? SIGNAL_TINT : PAPER} />
                {on ? (
                  <line
                    x1={d.c + o}
                    y1={212}
                    x2={400 + (d.c + o - 400) * 0.3}
                    y2={246}
                    stroke={SIGNAL}
                    strokeWidth={1.25}
                    strokeDasharray="4 4"
                  />
                ) : null}
              </g>
            );
          })}
        </g>
      ))}

      <ellipse cx={400} cy={262} rx={96} ry={18} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={400} y={266} anchor="middle" fill={SIGNAL} size={10.5}>
        BUYING CENTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   7 · RADIATING — roles within the buying center
   ========================================================================== */

type RoleIcon = "user" | "influencer" | "buyer" | "decider" | "gatekeeper";

/** The week's role icons, one noun per buying-center role, centred on (x, y). */
function RoleGlyph({ icon, x, y, tone, size = 30 }: { icon: RoleIcon; x: number; y: number; tone: string; size?: number }) {
  const Icon = { user: Wrench, influencer: PencilRuler, buyer: Signature, decider: SealCheck, gatekeeper: Funnel }[icon];
  return <Icon x={r2(x - size / 2)} y={r2(y - size / 2)} size={size} weight="duotone" color={tone} />;
}

export function RadiatingRoles({ phase }: { phase: "first" | "second" }) {
  const cx = 400;
  const cy = 250;
  const roles: { a: number; name: string; icon: RoleIcon }[] = [
    { a: 180, name: "USERS", icon: "user" },
    { a: 135, name: "INFLUENCERS", icon: "influencer" },
    { a: 90, name: "BUYERS", icon: "buyer" },
    { a: 45, name: "DECIDERS", icon: "decider" },
    { a: 0, name: "GATEKEEPERS", icon: "gatekeeper" },
  ];
  const label =
    phase === "first"
      ? "Five spokes radiate from the buying center. Three are lit, each a circle with its icon: users (a wrench), influencers (a pencil and ruler) and buyers (a signature). Two more circles on the right are empty and dashed, still to come."
      : "Five spokes radiate from the buying center. Users (a wrench), influencers (a pencil and ruler) and buyers (a signature) are drawn in grey; deciders (a seal with a check) and gatekeepers (a funnel) are lit.";
  return (
    <Frame height={300} label={label}>
      {roles.map((r, i) => {
        const t = (r.a * Math.PI) / 180;
        const x = r2(cx + 260 * Math.cos(t));
        const y = r2(cy - 180 * Math.sin(t));
        const state = phase === "first" ? (i < 3 ? "lit" : "future") : i < 3 ? "known" : "lit";
        const tone = state === "lit" ? SIGNAL : state === "known" ? INK3 : RULE2;
        const len = Math.hypot(x - cx, y - cy);
        const ux = (x - cx) / len;
        const uy = (y - cy) / len;
        const keyProps =
          r.a === 90
            ? { x, y: y - 36, anchor: "middle" as const }
            : r.a > 90
              ? { x: x - 36, y: y + 4, anchor: "end" as const }
              : { x: x + 36, y: y + 4, anchor: "start" as const };
        return (
          <g key={r.name}>
            <line
              x1={r2(cx + ux * 38)}
              y1={r2(cy + uy * 38)}
              x2={r2(x - ux * 30)}
              y2={r2(y - uy * 30)}
              stroke={tone}
              strokeWidth={state === "lit" ? 1.75 : 1}
              strokeDasharray={state === "future" ? "4 5" : undefined}
            />
            <circle
              cx={x}
              cy={y}
              r={26}
              fill={state === "lit" ? SIGNAL_TINT : PAPER}
              stroke={tone}
              strokeWidth={state === "lit" ? 1.75 : 1.25}
              strokeDasharray={state === "future" ? "4 4" : undefined}
            />
            {state !== "future" ? (
              <>
                <RoleGlyph icon={r.icon} x={x} y={y} tone={tone} />
                <Key {...keyProps} fill={state === "lit" ? SIGNAL : INK3} size={10.5}>
                  {r.name}
                </Key>
              </>
            ) : null}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={36} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Key x={cx} y={cy - 2} anchor="middle" fill={INK} size={9.5}>
        BUYING
      </Key>
      <Key x={cx} y={cy + 13} anchor="middle" fill={INK} size={9.5}>
        CENTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   8 · ROLE MAP — one person, many roles; many people, one role
   ========================================================================== */

/** A role on the role map: its circle and icon, with the role's name beside it. */
function RoleNode({ x, y, icon, name, tone, fill }: { x: number; y: number; icon: RoleIcon; name: string; tone: string; fill: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={24} fill={fill} stroke={tone} strokeWidth={1.75} />
      <RoleGlyph icon={icon} x={x} y={y} tone={tone} size={28} />
      <Key x={x + 34} y={y + 4} fill={tone} size={10.5}>
        {name}
      </Key>
    </g>
  );
}

/** A tie from (x1, y1) to the rim of the role circle at (x2, y2). */
function Tie({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const k = (len - 28) / len;
  return <line x1={x1} y1={y1} x2={r2(x1 + (x2 - x1) * k)} y2={r2(y1 + (y2 - y1) * k)} stroke={INK3} strokeWidth={1.5} />;
}

export function RoleMapping() {
  return (
    <Frame width={400} height={320} label="Top: one person tied to two roles, decider (a seal with a check) and buyer (a signature). Bottom: three people tied to the same role, influencer (a pencil and ruler).">
      {/* one person, two roles */}
      <Person2 x={84} y={132} k={1.8} />
      <Tie x1={106} y1={94} x2={236} y2={48} />
      <Tie x1={106} y1={100} x2={236} y2={118} />
      <RoleNode x={236} y={48} icon="decider" name="DECIDER" tone={SIGNAL} fill={SIGNAL_TINT} />
      <RoleNode x={236} y={118} icon="buyer" name="BUYER" tone={SIGNAL} fill={SIGNAL_TINT} />

      <line x1={20} y1={164} x2={380} y2={164} stroke={RULE} strokeWidth={1} />

      {/* three people, one role */}
      {[216, 260, 304].map((feet) => (
        <g key={feet}>
          <Person2 x={84} y={feet} k={1} />
          <Tie x1={100} y1={feet - 16} x2={236} y2={244} />
        </g>
      ))}
      <RoleNode x={236} y={244} icon="influencer" name="INFLUENCER" tone={COUNTER} fill={COUNTER_TINT} />
    </Frame>
  );
}

/* ==========================================================================
   9 · THREE LOOPS — straight rebuy, modified rebuy, new task
   ========================================================================== */

export function BuyingSituations() {
  const panels = [
    { cx: 133, tone: INK },
    { cx: 400, tone: COUNTER },
    { cx: 667, tone: SIGNAL },
  ];
  return (
    <Frame height={170} label="Three panels in columns. Straight rebuy: a buyer and a supplier's factory joined by an order loop that goes round unchanged. Modified rebuy: the same loop with a pencil on it, editing the order. New task: a buyer's single first arrow to a dashed, unknown supplier marked with a question mark.">
      <line x1={266} y1={16} x2={266} y2={154} stroke={RULE} strokeWidth={1} />
      <line x1={533} y1={16} x2={533} y2={154} stroke={RULE} strokeWidth={1} />
      {panels.map((p, i) => {
        const { cx, tone } = p;
        return (
          <g key={cx}>
            <Person2 x={cx - 70} y={116} k={1.3} stroke={tone} fill={i === 2 ? SIGNAL_TINT : PAPER} />
            {i < 2 ? (
              <>
                <Factory1 x={cx + 56} y={114} stroke={tone} />
                <path d={`M${cx - 50} 70 Q${cx - 12} 26 ${cx + 18} 82`} fill="none" stroke={tone} strokeWidth={1.5} />
                <path d={headAlong1(cx + 19, 84, 16, 34)} fill="none" stroke={tone} strokeWidth={1.5} />
                <path d={`M${cx + 40} 124 Q${cx} 162 ${cx - 48} 126`} fill="none" stroke={tone} strokeWidth={1.5} />
                <path d={headAlong1(cx - 50, 124, -30, -16)} fill="none" stroke={tone} strokeWidth={1.5} />
              </>
            ) : (
              <>
                <line x1={cx - 44} y1={98} x2={cx + 14} y2={98} stroke={tone} strokeWidth={1.5} />
                <path d={head2.right(cx + 16, 98)} fill="none" stroke={tone} strokeWidth={1.5} />
                <rect x={cx + 24} y={74} width={60} height={46} fill={SIGNAL_TINT} stroke={tone} strokeWidth={1.5} strokeDasharray="4 4" />
                <Display x={cx + 54} y={106} anchor="middle" fill={tone} size={24}>
                  ?
                </Display>
              </>
            )}
            {i === 1 ? (
              <PencilSimple x={cx - 16} y={16} size={32} weight="duotone" color={tone} />
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   10 · PODIUM — which role wields the most actual power?
   ========================================================================== */

export function PowerPodium() {
  const roles: { name: string; icon: RoleIcon }[] = [
    { name: "USERS", icon: "user" },
    { name: "INFLUENCERS", icon: "influencer" },
    { name: "BUYERS", icon: "buyer" },
    { name: "DECIDERS", icon: "decider" },
    { name: "GATEKEEPERS", icon: "gatekeeper" },
  ];
  return (
    <Frame height={250} label="An empty three-step podium with a question mark over each step, and the five buying-center roles waiting in a row below, each a circle with its icon: users, influencers, buyers, deciders and gatekeepers.">
      <rect x={350} y={62} width={100} height={80} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={250} y={92} width={100} height={50} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={450} y={112} width={100} height={30} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Display x={400} y={114} anchor="middle" fill={SIGNAL} size={30}>
        1
      </Display>
      <Display x={300} y={128} anchor="middle" fill={INK3} size={22}>
        2
      </Display>
      <Display x={500} y={135} anchor="middle" fill={INK3} size={18}>
        3
      </Display>
      <Display x={400} y={50} anchor="middle" fill={SIGNAL} size={28}>
        ?
      </Display>
      <Display x={300} y={82} anchor="middle" fill={INK3} size={22}>
        ?
      </Display>
      <Display x={500} y={102} anchor="middle" fill={INK3} size={20}>
        ?
      </Display>
      <line x1={200} y1={142} x2={600} y2={142} stroke={RULE} strokeWidth={1} />
      {roles.map((r, i) => {
        const x = 100 + i * 150;
        return (
          <g key={r.name}>
            <circle cx={x} cy={188} r={22} fill={PAPER} stroke={INK3} strokeWidth={1.5} />
            <RoleGlyph icon={r.icon} x={x} y={188} tone={INK} size={26} />
            <Key x={x} y={236} anchor="middle" fill={INK} size={10}>
              {r.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   11 · ROPE ON A FOUNDATION — a transaction thickens into a partnership
   ========================================================================== */

export function RelationshipRope() {
  const strands = Array.from({ length: 6 }, (_, i) => {
    const x0 = 80 + i * 95;
    const y = (x: number) => 118 + 9 * Math.sin(x / 32 + i * 1.05);
    const pts: string[] = [];
    for (let x = x0; x <= 740; x += 6) pts.push(`${x} ${y(x).toFixed(1)}`);
    return { i, x0, y0: r2(y(x0)), d: `M${pts.join("L")}` };
  });
  return (
    <Frame height={176} label="A single thread starting at the first transaction gains strands with each new transaction until it becomes a thick long term partnership, resting on a foundation of trust and mutual benefit.">
      <g transform="translate(0 -54)">
      {[270, 440, 610].map((x) => (
        <line key={x} x1={x} y1={134} x2={x} y2={184} stroke={RULE2} strokeWidth={1} />
      ))}
      {strands.map((s) => (
        <path key={s.i} d={s.d} fill="none" stroke={s.i === 0 ? INK : SIGNAL} strokeWidth={1.5} />
      ))}
      <path d={head2.right(750, 118)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      {strands.map((s) => (
        <circle key={`d${s.i}`} cx={s.x0} cy={s.y0} r={4.5} fill={s.i === 0 ? INK : PAPER} stroke={s.i === 0 ? INK : SIGNAL} strokeWidth={1.5} />
      ))}
      <Key x={64} y={160} fill={INK} size={10}>
        FIRST TRANSACTION
      </Key>
      <Key x={740} y={80} anchor="end" fill={SIGNAL} size={11}>
        LONG TERM PARTNERSHIP
      </Key>

      <rect x={60} y={184} width={338} height={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <rect x={402} y={184} width={338} height={36} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={229} y={207} anchor="middle" fill={COUNTER} size={11}>
        TRUST
      </Key>
      <Key x={571} y={207} anchor="middle" fill={COUNTER} size={11}>
        MUTUAL BENEFIT
      </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   12 · BARS UNDER A BRACKET — one transaction, or lifetime value
   ========================================================================== */

export function LifetimeBracket() {
  const hs = [60, 52, 70, 64, 78, 72, 86, 80, 92, 88, 98, 104];
  const base = 190;
  return (
    <Frame height={230} label="A row of purchases over time. One bar alone is a single transaction; a bracket over all of them is customer lifetime value.">
      <line x1={80} y1={56} x2={726} y2={56} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={80} y1={56} x2={80} y2={66} stroke={SIGNAL} strokeWidth={1.5} />
      <line x1={726} y1={56} x2={726} y2={66} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={403} y={44} anchor="middle" fill={SIGNAL} size={11}>
        CUSTOMER LIFETIME VALUE
      </Key>
      {hs.map((h, i) => (
        <rect
          key={i}
          x={80 + i * 56}
          y={base - h}
          width={30}
          height={h}
          fill={i === 0 ? PAPER : SIGNAL_TINT}
          stroke={i === 0 ? INK : SIGNAL}
          strokeWidth={1.5}
        />
      ))}
      <Key x={80} y={112} fill={INK} size={10}>
        SINGLE TRANSACTION
      </Key>
      <line x1={60} y1={base} x2={756} y2={base} stroke={INK3} strokeWidth={1.25} />
      <path d={head2.right(758, base)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={756} y={212} anchor="end" fill={INK3} size={10}>
        TIME
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   13 · MERGING CIRCLES — from seller to strategic partner (400 wide)
   ========================================================================== */

export function StrategicPartners() {
  return (
    <Frame width={400} height={240} label="Top: a seller's building and a customer's building far apart, joined by a single one-way arrow. An arrow leads down to the same two buildings standing side by side, lit, under a handshake, labelled strategic partners.">
      {/* before: a seller and a customer kept apart */}
      <Company1 cx={90} base={72} w={52} h={38} tone={INK3} />
      <Company1 cx={310} base={72} w={52} h={38} tone={INK3} />
      <line x1={126} y1={52} x2={272} y2={52} stroke={INK3} strokeWidth={1.5} />
      <path d={head2.right(274, 52)} fill="none" stroke={INK3} strokeWidth={1.5} />
      <line x1={200} y1={78} x2={200} y2={88} stroke={INK3} strokeWidth={1.5} />
      <path d={head2.down(200, 90)} fill="none" stroke={INK3} strokeWidth={1.5} />

      {/* after: strategic partners */}
      <Handshake x={177} y={96} size={46} weight="duotone" color={SIGNAL} />
      <Company1 cx={152} base={212} w={70} h={52} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Company1 cx={248} base={212} w={70} h={52} tone={COUNTER} fill={COUNTER_TINT} />
      <Key x={200} y={234} anchor="middle" fill={SIGNAL} size={12}>
        STRATEGIC PARTNERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   14 · LENS — deep understanding of the customer's business (400 wide)
   ========================================================================== */

export function DeepUnderstanding() {
  const lx = 238;
  const ly = 156;
  return (
    <Frame width={400} height={220} label="A box labelled industry holding a row of small grey company buildings and, in the middle, the larger customer's business. A magnifying lens held over the customer's building shows a bar chart of what is inside.">
      <rect x={24} y={20} width={352} height={186} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={40} y={44} fill={INK3} size={12}>
        INDUSTRY
      </Key>
      <line x1={40} y1={188} x2={360} y2={188} stroke={RULE2} strokeWidth={1} />
      {[
        [66, 34, 28],
        [112, 30, 22],
        [304, 32, 30],
        [348, 26, 20],
      ].map(([cx, w, h]) => (
        <Company1 key={cx} cx={cx} base={188} w={w} h={h} tone={INK3} />
      ))}
      <Company1 cx={200} base={188} w={92} h={70} tone={COUNTER} fill={COUNTER_TINT} />
      <Key x={200} y={96} anchor="middle" fill={COUNTER} size={12}>
        CUSTOMER&apos;S BUSINESS
      </Key>
      <line x1={260} y1={178} x2={282} y2={198} stroke={SIGNAL} strokeWidth={5} strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={30} fill={PAPER} stroke={SIGNAL} strokeWidth={2.5} />
      {[
        [224, 14],
        [236, 24],
        [248, 10],
      ].map(([x, h]) => (
        <rect key={x} x={x - 4} y={170 - h} width={8} height={h} fill={SIGNAL} />
      ))}
    </Frame>
  );
}

/* ==========================================================================
   15 · CORE PROCESS — the Key Account Management process
   ========================================================================== */

export function KamCore() {
  const cx = 400;
  const cy = 165;
  const rx = 250;
  const ry = 118;
  const stages = [
    { t: -90, name: "DEDICATED TEAM" },
    { t: 0, name: "CUSTOMIZED SOLUTIONS" },
    { t: 90, name: "EXCEPTIONAL SERVICE" },
    { t: 180, name: "LONG TERM RELATIONSHIP" },
  ];
  const pw = 212;
  const ph = 34;
  return (
    <Frame height={316} label="The Key Account Management process as a loop around a core of the most valuable customers: dedicated team, customized solutions, exceptional service, and long term relationship, repeating.">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={INK3} strokeWidth={1.5} />
      {[-45, 45, 135, 225].map((deg) => {
        const t = (deg * Math.PI) / 180;
        const x = r2(cx + rx * Math.cos(t));
        const y = r2(cy + ry * Math.sin(t));
        return <path key={deg} d={headAlong1(x, y, -rx * Math.sin(t), ry * Math.cos(t), 10)} fill="none" stroke={INK3} strokeWidth={1.75} />;
      })}
      {[
        [cx, cy - 60, cx, cy - ry + ph / 2],
        [cx + 60, cy, cx + rx - pw / 2, cy],
        [cx, cy + 60, cx, cy + ry - ph / 2],
        [cx - 60, cy, cx - rx + pw / 2, cy],
      ].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={SIGNAL} strokeWidth={1} strokeDasharray="3 4" />
      ))}
      <circle cx={cx} cy={cy} r={60} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      {["MOST", "VALUABLE", "CUSTOMERS"].map((w, i) => (
        <Key key={w} x={cx} y={cy - 10 + i * 16} anchor="middle" fill={SIGNAL} size={11}>
          {w}
        </Key>
      ))}
      {stages.map((s) => {
        const t = (s.t * Math.PI) / 180;
        const x = r2(cx + rx * Math.cos(t));
        const y = r2(cy + ry * Math.sin(t));
        return (
          <g key={s.name}>
            <rect x={x - pw / 2} y={y - ph / 2} width={pw} height={ph} rx={16} fill={PAPER} stroke={INK} strokeWidth={1.5} />
            <Key x={x} y={y + 4} anchor="middle" fill={INK} size={11}>
              {s.name}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   16 · SHARE BARS — key accounts contribute disproportionately (400 wide)
   ========================================================================== */

export function KeyAccountShare() {
  return (
    <Frame width={400} height={176} label="Two bars. Key accounts fill a small share of the customers bar but a large share of the revenue and profit bar, labelled key accounts, with a dashed line joining the two shares.">
      <Key x={20} y={40} fill={INK} size={12}>
        CUSTOMERS
      </Key>
      <rect x={20} y={50} width={360} height={26} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <rect x={20} y={50} width={50} height={26} fill={SIGNAL} />
      <Key x={20} y={130} fill={INK} size={12}>
        REVENUE AND PROFIT
      </Key>
      <rect x={20} y={140} width={360} height={28} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <rect x={20} y={140} width={260} height={28} fill={SIGNAL} />
      <Key x={32} y={159} fill={PAPER} size={11}>
        KEY ACCOUNTS
      </Key>
      <line x1={70} y1={76} x2={280} y2={140} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="3 4" />
    </Frame>
  );
}

/* ==========================================================================
   17 · BENEFIT PLATES — retention, barriers, joint innovation (400 wide)
   ========================================================================== */

/**
 * The week's supplier and business customer in a strong relationship: the
 * seller's building (lit) beside the customer's, a handshake above them.
 * Centred on cx, standing on base; about 150 wide and 106 tall.
 */
function Partners({ cx, base }: { cx: number; base: number }) {
  return (
    <g>
      <Company1 cx={cx - 38} base={base} w={58} h={46} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Company1 cx={cx + 38} base={base} w={58} h={46} tone={COUNTER} fill={COUNTER_TINT} />
      <Handshake x={cx - 19} y={base - 104} size={38} weight="duotone" color={SIGNAL} />
    </g>
  );
}

export function RetentionLoop() {
  const days = [224, 262, 300, 338, 376];
  return (
    <Frame width={400} height={168} label="A supplier and its business customer side by side under a handshake. A time line runs from them to the right, with a ticked calendar page for each period, the customer staying on every one.">
      <Partners cx={96} base={140} />
      <line x1={180} y1={140} x2={386} y2={140} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(388, 140)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      {days.map((x) => (
        <CalendarCheck key={x} x={x - 15} y={100} size={30} weight="duotone" color={COUNTER} />
      ))}
    </Frame>
  );
}

export function BarrierWall() {
  const bricks: [number, number, number][] = [];
  for (let r = 0; r < 7; r++) {
    const y = 26 + r * 16;
    if (r % 2 === 0) bricks.push([200, y, 24]);
    else {
      bricks.push([200, y, 12]);
      bricks.push([212, y, 12]);
    }
  }
  return (
    <Frame width={400} height={168} label="A supplier and its business customer under a handshake on the left, behind a brick wall. On the right, two grey competitor buildings send arrows that stop at the wall.">
      <g transform="translate(0 12)">
      <Partners cx={92} base={138} />
      {bricks.map(([x, y, w]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={16} fill="var(--paper-3)" stroke={INK} strokeWidth={1.25} />
      ))}
      <Company1 cx={350} base={66} w={46} h={34} tone={INK3} />
      <Company1 cx={350} base={138} w={46} h={34} tone={INK3} />
      {[52, 118].map((y) => (
        <g key={y}>
          <line x1={320} y1={y} x2={234} y2={y} stroke={INK3} strokeWidth={1.5} />
          <path d={head2.left(232, y)} fill="none" stroke={INK3} strokeWidth={1.5} />
        </g>
      ))}
      </g>
    </Frame>
  );
}

export function JointInnovation() {
  return (
    <Frame width={400} height={168} label="A supplier and its business customer side by side, with a lit lightbulb over their handshake. On the right, three stacks of coins get shorter step by step, with an arrow pointing down.">
      <Partners cx={96} base={160} />
      <Lightbulb x={77} y={8} size={38} weight="duotone" color={SIGNAL} />
      <line x1={196} y1={160} x2={380} y2={160} stroke={RULE2} strokeWidth={1} />
      {[
        [236, 8],
        [294, 5],
        [352, 2],
      ].map(([x, n]) => (
        <Coins2 key={x} x={x} y={160} n={n} w={44} tone={COUNTER} />
      ))}
      <path d="M232 80 L346 120" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d={headAlong1(348, 121, 114, 40)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
    </Frame>
  );
}

/* ==========================================================================
   18 · PILLARS — resting on one key account
   ========================================================================== */

export function DependenceRisk() {
  return (
    <Frame height={256} label="Left: a supplier's building on a tilting plank that rests on one tall, cracked customer building, labelled single key account. Right: the same supplier on a level plank over four dashed, undecided supports with a question mark between them, labelled how to mitigate these risks?">
      {/* too dependent on a single key account */}
      <line x1={80} y1={220} x2={320} y2={220} stroke={RULE} strokeWidth={1} />
      <Company1 cx={200} base={220} w={52} h={96} tone={COUNTER} fill={COUNTER_TINT} />
      <path d="M180 146 L190 156 L184 166 L198 174 L192 184 L218 192" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <g transform="rotate(-6 200 110)">
        <rect x={100} y={104} width={200} height={10} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <Company1 cx={200} base={104} w={104} h={52} tone={INK} />
      </g>
      <Key x={200} y={246} anchor="middle" fill={COUNTER} size={11}>
        SINGLE KEY ACCOUNT
      </Key>

      <line x1={400} y1={36} x2={400} y2={236} stroke={RULE} strokeWidth={1} />

      {/* how to mitigate */}
      <line x1={480} y1={220} x2={720} y2={220} stroke={RULE} strokeWidth={1} />
      {[524, 562, 638, 676].map((x) => (
        <rect key={x} x={x - 12} y={114} width={24} height={106} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="4 4" />
      ))}
      <rect x={500} y={104} width={200} height={10} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Company1 cx={600} base={104} w={104} h={52} tone={INK} />
      <circle cx={600} cy={166} r={20} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Display x={600} y={176} anchor="middle" fill={SIGNAL} size={26}>
        ?
      </Display>
      <Key x={600} y={246} anchor="middle" fill={SIGNAL} size={11}>
        HOW TO MITIGATE THESE RISKS?
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   Conclusion glyphs — each echoes a plate already seen
   ========================================================================== */

export function GlyphSplitLane() {
  return (
    <svg {...glyphProps}>
      <line x1="4" y1="12" x2="60" y2="12" stroke="var(--counter)" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="60" y2="20" stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M4 30 L14 24 L22 34 L32 22 L42 34 L50 26 L60 30" stroke="var(--signal)" strokeWidth="1.5" />
    </svg>
  );
}

export function GlyphRadiate() {
  const pts = [180, 135, 90, 45, 0].map((d) => {
    const t = (d * Math.PI) / 180;
    return [+(32 + 24 * Math.cos(t)).toFixed(2), +(34 - 26 * Math.sin(t)).toFixed(2)];
  });
  return (
    <svg {...glyphProps}>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <line x1="32" y1="34" x2={x} y2={y} stroke="var(--ink-3)" strokeWidth="1.25" />
          <circle cx={x} cy={y} r="3.5" fill="var(--paper)" stroke="var(--signal)" strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="32" cy="34" r="5" fill="var(--ink)" />
    </svg>
  );
}

export function GlyphCore() {
  return (
    <svg {...glyphProps}>
      <ellipse cx="32" cy="20" rx="26" ry="15" stroke="var(--ink-3)" strokeWidth="1.25" />
      <circle cx="32" cy="20" r="6" fill="rgba(178, 58, 21, 0.09)" stroke="var(--signal)" strokeWidth="1.5" />
      {[
        [32, 5],
        [58, 20],
        [32, 35],
        [6, 20],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
    </svg>
  );
}
