/* ==========================================================================
   Week 4: Business-to-Business (B2B) Marketing, figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates for the five [figure: ...] tags in week4/content.md:
     1. MarketSplitLane: B2B vs B2C market structure and upstream derived demand
     2. BuyingSituations: continuum from straight rebuy to modified rebuy to new task
     3. RadiatingRoles: five roles within the organizational buying center
     4. KamProgression: Pareto concentration and KAM progression across three stages
     5. AiBuyingCenter: AI agent roles (buyer, gatekeeper, influencer) vs human decider
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
  INK2,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  r2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import { Chip2, Company1, Factory1, Pack1, Person2 } from "../_visuals/objects";
import {
  CalendarCheck,
  Funnel,
  Handshake,
  Package,
  PencilRuler,
  PencilSimple,
  SealCheck,
  Signature,
  Sun,
  Wrench,
} from "@phosphor-icons/react";

/* ==========================================================================
   1. SPLIT LANE & UPSTREAM CASCADE: B2B vs B2C structure and derived demand
   ========================================================================== */

export function MarketSplitLane() {
  const suppliers = [
    { cx: 348, title: "SILICON WAFERS", sub: "Raw material" },
    { cx: 508, title: "MOUNTING RACKS", sub: "Aluminum frame" },
    { cx: 668, title: "INVERTER MICROCHIPS", sub: "Power component" },
  ];
  return (
    <Frame
      height={280}
      label="Comparison of B2B and B2C market structure. On the left, the B2C lane holds a crowd of small household buyers while the B2B lane holds three large organizational buyers. On the right, household retail demand for residential solar panels sends derived demand upstream into three B2B component suppliers: silicon wafers, mounting racks, and inverter microchips."
    >
      <rect x={0} y={146} width={800} height={126} fill={PAPER2} />
      <line x1={0} y1={146} x2={800} y2={146} stroke={RULE} strokeWidth={1.5} />
      <line x1={256} y1={18} x2={256} y2={272} stroke={RULE2} strokeWidth={1.25} />

      {/* Left column: B2C crowd vs B2B industrial cluster */}
      <Display x={18} y={48} fill={COUNTER} size={20}>
        B2C
      </Display>
      <Key x={70} y={44} fill={COUNTER} size={10.5}>
        MANY HOUSEHOLD BUYERS
      </Key>
      {Array.from({ length: 14 }, (_, i) => (
        <Person2
          key={i}
          x={38 + (i % 7) * 31}
          y={94 + Math.floor(i / 7) * 38}
          k={0.58}
          stroke={COUNTER}
          width={1.2}
        />
      ))}

      <Display x={18} y={180} fill={SIGNAL} size={20}>
        B2B
      </Display>
      <Key x={70} y={176} fill={SIGNAL} size={10.5}>
        FEWER, LARGER BUYERS
      </Key>
      <Company1 cx={64} base={256} w={44} h={44} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Company1 cx={132} base={256} w={54} h={56} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Company1 cx={200} base={256} w={42} h={38} tone={SIGNAL} fill={SIGNAL_TINT} />

      {/* Right section: Downstream consumer demand to upstream B2B demand */}
      <rect x={336} y={22} width={344} height={74} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <Person2 x={372} y={84} k={0.95} stroke={COUNTER} />
      <Sun x={402} y={38} size={32} weight="duotone" color={COUNTER} />
      <Key x={448} y={50} fill={COUNTER} size={10.5}>
        HOUSEHOLD RETAIL PURCHASES
      </Key>
      <Note x={448} y={72} fill={INK2} size={12}>
        Residential solar panels downstream
      </Note>

      {/* Upstream derived demand connector */}
      <line x1={508} y1={96} x2={508} y2={156} stroke={SIGNAL} strokeWidth={1.75} />
      <line x1={348} y1={156} x2={668} y2={156} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={520} y={128} fill={SIGNAL} size={10.5}>
        DERIVED DEMAND FLOWS UPSTREAM
      </Key>

      {suppliers.map((s) => (
        <g key={s.title}>
          <line x1={s.cx} y1={156} x2={s.cx} y2={178} stroke={SIGNAL} strokeWidth={1.75} />
          <path d={head2.down(s.cx, 180)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
          <rect
            x={s.cx - 74}
            y={182}
            width={148}
            height={78}
            fill={PAPER}
            stroke={SIGNAL}
            strokeWidth={1.5}
          />
          <Factory1 x={s.cx - 48} y={236} w={32} h={22} stroke={SIGNAL} fill={SIGNAL_TINT} />
          <Key x={s.cx - 22} y={214} anchor="start" fill={INK} size={9.5}>
            {s.title}
          </Key>
          <Note x={s.cx - 22} y={234} anchor="start" fill={INK3} size={11}>
            {s.sub}
          </Note>
        </g>
      ))}
    </Frame>
  );
}

/* ==========================================================================
   2. CONTINUUM OF BUYING SITUATIONS: Straight Rebuy, Modified Rebuy, New Task
   ========================================================================== */

export function BuyingSituations() {
  return (
    <Frame
      height={244}
      label="Continuum of business buying situations across decision complexity and participant involvement: straight rebuy with one buyer reordering routinely, modified rebuy with three participants modifying specifications between in and out suppliers, and new task with a large buying committee purchasing a turnkey system."
    >
      {/* 1. Straight Rebuy */}
      <rect x={24} y={14} width={232} height={166} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <Key x={140} y={36} anchor="middle" fill={INK} size={11}>
        1. Straight rebuy
      </Key>
      <Note x={140} y={55} anchor="middle" fill={INK3} size={11.5}>
        Routine reorder, no modifications
      </Note>
      <Person2 x={82} y={134} k={1.08} stroke={INK} />
      <Factory1 x={194} y={134} w={48} h={30} stroke={INK} />
      <path d="M104 100 Q140 72 164 102" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={headAlong1(165, 104, 16, 22)} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d="M168 138 Q140 160 104 138" fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={headAlong1(102, 136, -20, -14)} fill="none" stroke={INK} strokeWidth={1.5} />
      <Key x={140} y={168} anchor="middle" fill={INK3} size={10}>
        Approved supplier list
      </Key>

      {/* 2. Modified Rebuy */}
      <rect x={284} y={14} width={232} height={166} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={400} y={36} anchor="middle" fill={COUNTER} size={11}>
        2. Modified rebuy
      </Key>
      <Note x={400} y={55} anchor="middle" fill={INK2} size={11.5}>
        Modified specs, prices, or terms
      </Note>
      {[312, 338, 364].map((x) => (
        <Person2 key={x} x={x} y={134} k={0.88} stroke={COUNTER} fill={COUNTER_TINT} />
      ))}
      <PencilSimple x={390} y={84} size={24} weight="duotone" color={COUNTER} />
      <line x1={382} y1={118} x2={430} y2={118} stroke={COUNTER} strokeWidth={1.5} />
      <path d={head2.right(432, 118)} fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <Factory1 x={468} y={134} w={48} h={30} stroke={COUNTER} fill={COUNTER_TINT} />
      <Key x={400} y={168} anchor="middle" fill={COUNTER} size={10}>
        In vs out suppliers
      </Key>

      {/* 3. New Task */}
      <rect x={544} y={14} width={232} height={166} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={660} y={36} anchor="middle" fill={SIGNAL} size={11}>
        3. New task
      </Key>
      <Note x={660} y={55} anchor="middle" fill={INK2} size={11.5}>
        First-time buy, extensive search
      </Note>
      {[566, 588, 610, 632, 654].map((x) => (
        <Person2 key={x} x={x} y={134} k={0.8} stroke={SIGNAL} fill={PAPER} />
      ))}
      <line x1={668} y1={118} x2={698} y2={118} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(700, 118)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={704} y={92} width={54} height={44} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <Package x={717} y={100} size={28} weight="duotone" color={SIGNAL} />
      <Key x={660} y={168} anchor="middle" fill={SIGNAL} size={10}>
        Systems selling turnkey package
      </Key>

      {/* Continuum scale */}
      <rect x={24} y={192} width={752} height={42} fill={PAPER2} stroke={RULE2} strokeWidth={1.25} />
      <Key x={44} y={210} fill={INK3} size={10}>
        Low complexity and risk
      </Key>
      <Key x={400} y={210} anchor="middle" fill={INK} size={10.5}>
        Decision complexity and participant involvement
      </Key>
      <Key x={756} y={210} anchor="end" fill={SIGNAL} size={10}>
        High complexity and risk
      </Key>
      <line x1={44} y1={223} x2={752} y2={223} stroke={SIGNAL} strokeWidth={1.75} />
      <path d={head2.right(754, 223)} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
    </Frame>
  );
}

/* ==========================================================================
   3. RADIATING ROLES: Five roles within the organizational buying center
   ========================================================================== */

type RoleIcon = "user" | "influencer" | "buyer" | "decider" | "gatekeeper";

function RoleGlyph({
  icon,
  x,
  y,
  tone,
  size = 28,
}: {
  icon: RoleIcon;
  x: number;
  y: number;
  tone: string;
  size?: number;
}) {
  const Icon = {
    user: Wrench,
    influencer: PencilRuler,
    buyer: Signature,
    decider: SealCheck,
    gatekeeper: Funnel,
  }[icon];
  return <Icon x={r2(x - size / 2)} y={r2(y - size / 2)} size={size} weight="duotone" color={tone} />;
}

export function RadiatingRoles() {
  const cx = 400;
  const cy = 244;
  const roles: {
    a: number;
    name: string;
    sub: string;
    icon: RoleIcon;
    primary: boolean;
  }[] = [
    { a: 180, name: "USERS", sub: "Use product, initiate proposal", icon: "user", primary: true },
    { a: 135, name: "INFLUENCERS", sub: "Define technical specifications", icon: "influencer", primary: true },
    { a: 90, name: "BUYERS", sub: "Select supplier and terms", icon: "buyer", primary: true },
    { a: 45, name: "DECIDERS", sub: "Approve final supplier", icon: "decider", primary: false },
    { a: 0, name: "GATEKEEPERS", sub: "Control information flow", icon: "gatekeeper", primary: false },
  ];
  return (
    <Frame
      height={292}
      label="Five roles radiating from the organizational buying center hub: users, influencers, buyers, deciders, and gatekeepers."
    >
      {roles.map((r) => {
        const t = (r.a * Math.PI) / 180;
        const x = r2(cx + 205 * Math.cos(t));
        const y = r2(cy - 160 * Math.sin(t));
        const tone = r.primary ? SIGNAL : COUNTER;
        const fill = r.primary ? SIGNAL_TINT : COUNTER_TINT;
        const len = Math.hypot(x - cx, y - cy);
        const ux = (x - cx) / len;
        const uy = (y - cy) / len;
        const labelPos =
          r.a === 90
            ? { x, y: y - 48, subY: y - 31, anchor: "middle" as const }
            : r.a > 90
              ? { x: x - 36, y: y - 4, subY: y + 14, anchor: "end" as const }
              : { x: x + 36, y: y - 4, subY: y + 14, anchor: "start" as const };
        return (
          <g key={r.name}>
            <line
              x1={r2(cx + ux * 40)}
              y1={r2(cy + uy * 40)}
              x2={r2(x - ux * 28)}
              y2={r2(y - uy * 28)}
              stroke={tone}
              strokeWidth={1.75}
            />
            <circle cx={x} cy={y} r={26} fill={fill} stroke={tone} strokeWidth={1.75} />
            <RoleGlyph icon={r.icon} x={x} y={y} tone={tone} />
            <Key x={labelPos.x} y={labelPos.y} anchor={labelPos.anchor} fill={tone} size={11}>
              {r.name}
            </Key>
            <Note x={labelPos.x} y={labelPos.subY} anchor={labelPos.anchor} fill={INK2} size={11.5}>
              {r.sub}
            </Note>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={38} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <Key x={cx} y={cy - 3} anchor="middle" fill={INK} size={10}>
        BUYING
      </Key>
      <Key x={cx} y={cy + 12} anchor="middle" fill={INK} size={10}>
        CENTER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   4. KEY ACCOUNT MANAGEMENT PROGRESSION: Vendor to Strategic Partner
   ========================================================================== */

export function KamProgression() {
  return (
    <Frame
      height={276}
      label="Key account management progression. On the left, the Pareto pattern shows 20 percent of accounts generating 80 percent of revenue. On the right, supplier relationships progress across three stages: transactional vendor, preferred supplier, and integrated strategic partner with a dedicated cross-functional team."
    >
      {/* Left panel: Pareto concentration */}
      <rect x={20} y={20} width={196} height={238} fill={PAPER2} stroke={RULE2} strokeWidth={1.25} />
      <Key x={118} y={44} anchor="middle" fill={INK} size={11}>
        Pareto pattern
      </Key>
      <Key x={36} y={76} fill={INK3} size={10}>
        20% of accounts
      </Key>
      <rect x={36} y={84} width={164} height={24} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <rect x={36} y={84} width={33} height={24} fill={SIGNAL} />
      <line x1={69} y1={108} x2={167} y2={164} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="3 4" />
      <Key x={36} y={154} fill={SIGNAL} size={10}>
        80% of revenue
      </Key>
      <rect x={36} y={164} width={164} height={24} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <rect x={36} y={164} width={131} height={24} fill={SIGNAL} />
      <Note x={118} y={226} anchor="middle" fill={INK2} size={11.5}>
        Key accounts drive profit
      </Note>

      {/* Stage 1: Transactional Vendor */}
      <rect x={244} y={64} width={158} height={194} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <Key x={323} y={88} anchor="middle" fill={INK3} size={10.5}>
        1. Transactional
      </Key>
      <Key x={323} y={103} anchor="middle" fill={INK3} size={10.5}>
        vendor
      </Key>
      <Company1 cx={282} base={196} w={36} h={32} tone={INK3} />
      <Pack1 x={323} y={188} w={22} h={20} tone={INK3} />
      <Company1 cx={364} base={196} w={36} h={32} tone={INK3} />
      <Note x={323} y={232} anchor="middle" fill={INK3} size={11}>
        Catalog orders
      </Note>

      <line x1={404} y1={154} x2={422} y2={154} stroke={INK3} strokeWidth={1.5} />
      <path d={head2.right(424, 154)} fill="none" stroke={INK3} strokeWidth={1.5} />

      {/* Stage 2: Preferred Supplier */}
      <rect x={428} y={42} width={158} height={216} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={507} y={66} anchor="middle" fill={COUNTER} size={10.5}>
        2. Preferred
      </Key>
      <Key x={507} y={81} anchor="middle" fill={COUNTER} size={10.5}>
        supplier
      </Key>
      <CalendarCheck x={492} y={100} size={30} weight="duotone" color={COUNTER} />
      <Company1 cx={475} base={196} w={42} h={40} tone={COUNTER} fill={COUNTER_TINT} />
      <Company1 cx={539} base={196} w={42} h={40} tone={COUNTER} fill={COUNTER_TINT} />
      <Note x={507} y={232} anchor="middle" fill={INK2} size={11}>
        Aligned supply schedule
      </Note>

      <line x1={588} y1={154} x2={606} y2={154} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head2.right(608, 154)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      {/* Stage 3: Integrated Strategic Partner */}
      <rect x={612} y={20} width={168} height={238} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={696} y={44} anchor="middle" fill={SIGNAL} size={10.5}>
        3. Strategic
      </Key>
      <Key x={696} y={59} anchor="middle" fill={SIGNAL} size={10.5}>
        partner (KAM)
      </Key>
      <Handshake x={679} y={72} size={34} weight="duotone" color={SIGNAL} />
      {[668, 696, 724].map((x) => (
        <Person2 key={x} x={x} y={138} k={0.76} stroke={SIGNAL} fill={PAPER} />
      ))}
      <Company1 cx={664} base={202} w={46} h={36} tone={SIGNAL} fill={PAPER} />
      <Company1 cx={728} base={202} w={46} h={36} tone={COUNTER} fill={PAPER} />
      <Note x={696} y={232} anchor="middle" fill={INK} size={11}>
        Dedicated team, co-design
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   5. AI ROLES IN THE BUYING CENTER: AI Buyer, Gatekeeper, Influencer vs Human Decider
   ========================================================================== */

export function AiBuyingCenter() {
  const aiCols = [
    {
      cx: 110,
      role: "AI agent: buyer",
      situation: "Straight rebuy",
      icon: Signature,
      line1: "Monitors inventory and",
      line2: "reorders automatically",
    },
    {
      cx: 300,
      role: "AI agent: gatekeeper",
      situation: "Supplier screening",
      icon: Funnel,
      line1: "Parses vendor catalogs",
      line2: "for compliant shortlist",
    },
    {
      cx: 490,
      role: "AI agent: influencer",
      situation: "Specification comparison",
      icon: PencilRuler,
      line1: "Scores technical specs",
      line2: "and total lifecycle cost",
    },
  ];
  return (
    <Frame
      height={252}
      label="Organizational buying center showing AI agents acting as buyer in straight rebuys, gatekeeper in supplier screening, and influencer in specification comparison, while human executives remain deciders in high-risk purchases."
    >
      {/* Top hub */}
      <rect x={220} y={12} width={360} height={34} fill={PAPER2} stroke={INK} strokeWidth={1.5} />
      <Key x={400} y={33} anchor="middle" fill={INK} size={11.5}>
        Organizational buying center
      </Key>

      {/* Branching connector lines */}
      <line x1={400} y1={46} x2={400} y2={60} stroke={INK3} strokeWidth={1.5} />
      <line x1={110} y1={60} x2={686} y2={60} stroke={INK3} strokeWidth={1.5} />
      {[110, 300, 490, 686].map((x, idx) => (
        <g key={x}>
          <line x1={x} y1={60} x2={x} y2={74} stroke={idx === 3 ? SIGNAL : COUNTER} strokeWidth={1.5} />
          <path d={head2.down(x, 76)} fill="none" stroke={idx === 3 ? SIGNAL : COUNTER} strokeWidth={1.5} />
        </g>
      ))}

      {/* Three AI Agent role columns */}
      {aiCols.map((c) => {
        const Icon = c.icon;
        return (
          <g key={c.role}>
            <rect
              x={c.cx - 90}
              y={78}
              width={180}
              height={162}
              fill={PAPER}
              stroke={COUNTER}
              strokeWidth={1.5}
            />
            <Key x={c.cx} y={100} anchor="middle" fill={COUNTER} size={10.5}>
              {c.role}
            </Key>
            <Note x={c.cx} y={118} anchor="middle" fill={INK3} size={11}>
              {c.situation}
            </Note>
            <Chip2 x={c.cx - 22} y={158} s={34} tone={COUNTER} fill={COUNTER_TINT} />
            <Icon x={c.cx + 10} y={143} size={30} weight="duotone" color={COUNTER} />
            <Note x={c.cx} y={206} anchor="middle" fill={INK2} size={11}>
              {c.line1}
            </Note>
            <Note x={c.cx} y={224} anchor="middle" fill={INK3} size={11}>
              {c.line2}
            </Note>
          </g>
        );
      })}

      {/* Human Executive Decider column */}
      <rect x={592} y={78} width={188} height={162} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={686} y={100} anchor="middle" fill={SIGNAL} size={10.5}>
        Human: decider
      </Key>
      <Note x={686} y={118} anchor="middle" fill={INK2} size={11}>
        High-risk rebuys and new tasks
      </Note>
      <Person2 x={652} y={176} k={0.96} stroke={SIGNAL} fill={PAPER} />
      <Person2 x={680} y={176} k={0.96} stroke={SIGNAL} fill={PAPER} />
      <SealCheck x={702} y={142} size={32} weight="duotone" color={SIGNAL} />
      <Note x={686} y={206} anchor="middle" fill={INK} size={11}>
        Final vendor approval and
      </Note>
      <Note x={686} y={224} anchor="middle" fill={INK2} size={11}>
        strategic accountability
      </Note>
    </Frame>
  );
}
