/* ==========================================================================
   Week 07 — Product & Brand figures
   --------------------------------------------------------------------------
   Hand-drawn SVG conforming to the course style and palette:
     - viewBox width 800
     - flat fills, hairline rules, clear hierarchy
     - CSS variables: INK, INK2, INK3, RULE, SIGNAL, COUNTER, PAPER, PAPER2
     - typography: LABEL (font-label) and BODY (font-body)
   ========================================================================== */

import React from "react";

const INK = "var(--ink)";
const INK2 = "var(--ink-2)";
const INK3 = "var(--ink-3)";
const RULE = "var(--rule)";
const SIGNAL = "var(--signal)";
const COUNTER = "var(--counter)";
const PAPER = "var(--paper)";
const PAPER2 = "var(--paper-2)";

const LABEL = "var(--font-label)";
const BODY = "var(--font-body)";

function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 10,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={LABEL}
      fontSize={size}
      letterSpacing="0.12em"
      fill={fill}
    >
      {children}
    </text>
  );
}

function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 13,
  weight = "normal",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
  weight?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={BODY}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
    >
      {children}
    </text>
  );
}

function Frame({
  height,
  label,
  children,
}: {
  height: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/* ==========================================================================
   1 · ProductLayers — Three concentric product levels
   Core Customer Value -> Actual Product -> Augmented Product
   ========================================================================== */
export function ProductLayers() {
  return (
    <Frame height={340} label="Three levels of product">
      {/* Augmented outer layer */}
      <circle
        cx={400}
        cy={170}
        r={150}
        fill={PAPER2}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      {/* Actual product middle layer */}
      <circle
        cx={400}
        cy={170}
        r={102}
        fill={PAPER}
        stroke={INK3}
        strokeWidth={1.5}
      />
      {/* Core customer value centre */}
      <circle cx={400} cy={170} r={54} fill={SIGNAL} opacity={0.15} />
      <circle
        cx={400}
        cy={170}
        r={54}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
      />

      {/* Centre text */}
      <Key x={400} y={158} anchor="middle" fill={SIGNAL} size={10}>
        LEVEL 1
      </Key>
      <Note x={400} y={174} anchor="middle" fill={INK} weight="600" size={13}>
        Core Customer Value
      </Note>
      <Note x={400} y={190} anchor="middle" fill={INK3} size={11}>
        Need solved · Basic benefit
      </Note>

      {/* Middle ring labels */}
      <Key x={400} y={92} anchor="middle" fill={INK2} size={10}>
        LEVEL 2 · ACTUAL PRODUCT
      </Key>
      <Note x={400} y={108} anchor="middle" fill={INK3} size={11}>
        Brand Name · Features · Design · Packaging · Quality Level
      </Note>

      {/* Outer ring labels */}
      <Key x={400} y={38} anchor="middle" fill={INK3} size={10}>
        LEVEL 3 · AUGMENTED PRODUCT
      </Key>
      <Note x={400} y={54} anchor="middle" fill={INK2} size={11}>
        Warranty · Delivery &amp; Credit · Customer Care · Installation ·
        Support
      </Note>

      {/* Bottom callout note */}
      <Note x={400} y={328} anchor="middle" fill={INK3} size={11}>
        Competition shifts outward: as actual products converge, augmented
        services win the customer.
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   2 · ProductMixMatrix — Product Mix Width vs Line Depth
   ========================================================================== */
export function ProductMixMatrix() {
  const lines = [
    { title: "Smartphones", items: ["Pro Max", "Pro", "Standard", "Mini"] },
    { title: "Tablets", items: ['Pro 13"', "Air", "Standard", "Mini"] },
    {
      title: "Computers",
      items: ["Studio", "Book Pro", "Book Air", "Desktop"],
    },
    { title: "Wearables", items: ["Ultra", "Series 10", "SE", "Bands"] },
  ];

  return (
    <Frame height={290} label="Product mix width and depth">
      {/* Width bracket across top */}
      <line
        x1={80}
        y1={40}
        x2={720}
        y2={40}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <line x1={80} y1={35} x2={80} y2={45} stroke={SIGNAL} strokeWidth={1.5} />
      <line
        x1={720}
        y1={35}
        x2={720}
        y2={45}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={400} y={30} anchor="middle" fill={SIGNAL} size={11}>
        PRODUCT MIX WIDTH (NUMBER OF PRODUCT LINES)
      </Key>

      {/* Depth bracket along left */}
      <line x1={50} y1={70} x2={50} y2={230} stroke={INK3} strokeWidth={1.5} />
      <line x1={45} y1={70} x2={55} y2={70} stroke={INK3} strokeWidth={1.5} />
      <line x1={45} y1={230} x2={55} y2={230} stroke={INK3} strokeWidth={1.5} />
      <text
        x={35}
        y={150}
        textAnchor="middle"
        fontFamily={LABEL}
        fontSize={10}
        letterSpacing="0.12em"
        fill={INK3}
        transform="rotate(-90 35 150)"
      >
        PRODUCT LINE DEPTH
      </text>

      {/* Grid columns */}
      {lines.map((line, colIdx) => {
        const x = 90 + colIdx * 160;
        return (
          <g key={line.title}>
            <rect
              x={x}
              y={60}
              width={140}
              height={32}
              fill={PAPER2}
              stroke={RULE}
              strokeWidth={1}
            />
            <Note
              x={x + 70}
              y={81}
              anchor="middle"
              fill={INK}
              weight="600"
              size={12}
            >
              Line {colIdx + 1}: {line.title}
            </Note>

            {line.items.map((item, rowIdx) => {
              const y = 100 + rowIdx * 34;
              return (
                <g key={item}>
                  <rect
                    x={x}
                    y={y}
                    width={140}
                    height={28}
                    fill={PAPER}
                    stroke={RULE}
                    strokeWidth={0.75}
                  />
                  <Note
                    x={x + 70}
                    y={y + 18}
                    anchor="middle"
                    fill={INK2}
                    size={11}
                  >
                    {item}
                  </Note>
                </g>
              );
            })}
          </g>
        );
      })}

      <Note x={400} y={272} anchor="middle" fill={INK3} size={11}>
        Width expands by adding lines; depth expands by adding variants within
        existing lines.
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   3 · NpdFunnel — Eight-Stage New Product Development Funnel
   ========================================================================== */
export function NpdFunnel() {
  const steps = [
    { num: "1", title: "Idea Generation", count: "100 ideas" },
    { num: "2", title: "Idea Screening", count: "25 concepts" },
    { num: "3", title: "Concept Testing", count: "10 validated" },
    { num: "4", title: "Marketing Strategy", count: "6 plans" },
    { num: "5", title: "Business Analysis", count: "4 business cases" },
    { num: "6", title: "Product Dev", count: "2 working prototypes" },
    { num: "7", title: "Test Marketing", count: "1 pilot launch" },
    { num: "8", title: "Commercialization", count: "1 Market Success" },
  ];

  return (
    <Frame height={290} label="New product development process">
      <Key x={40} y={25} fill={INK3} size={10}>
        EIGHT-STEP DEVELOPMENT FUNNEL · RISK AND CAPITAL COMMITMENT INCREASE AT
        EACH STEP
      </Key>

      {steps.map((step, idx) => {
        const x = 40 + idx * 88;
        const topY = 45 + idx * 7;
        const bottomY = 220 - idx * 7;
        const h = bottomY - topY;
        const isSuccess = idx === 7;

        return (
          <g key={step.title}>
            <rect
              x={x}
              y={topY}
              width={78}
              height={h}
              fill={isSuccess ? SIGNAL : PAPER2}
              opacity={isSuccess ? 0.2 : 0.85}
              stroke={isSuccess ? SIGNAL : RULE}
              strokeWidth={isSuccess ? 1.5 : 1}
              rx={2}
            />
            <Key
              x={x + 39}
              y={topY + 22}
              anchor="middle"
              fill={isSuccess ? SIGNAL : INK3}
              size={9}
            >
              STEP {step.num}
            </Key>
            <Note
              x={x + 39}
              y={topY + 44}
              anchor="middle"
              fill={INK}
              weight={isSuccess ? "600" : "500"}
              size={10}
            >
              {step.title.split(" ")[0]}
            </Note>
            {step.title.split(" ")[1] && (
              <Note
                x={x + 39}
                y={topY + 58}
                anchor="middle"
                fill={INK}
                weight={isSuccess ? "600" : "500"}
                size={10}
              >
                {step.title.split(" ")[1]}
              </Note>
            )}

            <Note
              x={x + 39}
              y={bottomY - 14}
              anchor="middle"
              fill={isSuccess ? SIGNAL : INK3}
              weight={isSuccess ? "600" : "normal"}
              size={9}
            >
              {step.count}
            </Note>
          </g>
        );
      })}

      <line x1={40} y1={245} x2={740} y2={245} stroke={RULE} strokeWidth={1} />
      <polygon points="744,245 736,241 736,249" fill={INK3} />
      <Note x={40} y={265} fill={INK3} size={11}>
        Low cost of elimination (screening concepts is cheap)
      </Note>
      <Note x={740} y={265} anchor="end" fill={SIGNAL} size={11}>
        High cost of failure (tooling, inventory &amp; national media)
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   4 · PlcCurves — The Product Life Cycle: Sales & Profit curves
   ========================================================================== */
export function PlcCurves() {
  return (
    <Frame height={320} label="Product life cycle curves">
      {/* Stage divisions */}
      <line
        x1={110}
        y1={40}
        x2={110}
        y2={250}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line
        x1={290}
        y1={40}
        x2={290}
        y2={250}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line
        x1={510}
        y1={40}
        x2={510}
        y2={250}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line
        x1={720}
        y1={40}
        x2={720}
        y2={250}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* Stage headers */}
      <Key x={200} y={32} anchor="middle" fill={INK3} size={10}>
        1. INTRODUCTION
      </Key>
      <Key x={400} y={32} anchor="middle" fill={INK3} size={10}>
        2. GROWTH
      </Key>
      <Key x={615} y={32} anchor="middle" fill={INK3} size={10}>
        3. MATURITY
      </Key>
      <Key x={750} y={32} anchor="middle" fill={INK3} size={10}>
        4. DECLINE
      </Key>

      {/* Axes */}
      <line x1={80} y1={200} x2={780} y2={200} stroke={INK3} strokeWidth={1} />
      <Note x={70} y={204} anchor="end" fill={INK3} size={10}>
        $0
      </Note>
      <line x1={80} y1={40} x2={80} y2={250} stroke={INK3} strokeWidth={1} />
      <Key x={80} y={25} fill={INK3} size={10}>
        SALES &amp; PROFIT ($)
      </Key>

      {/* Sales curve (SIGNAL - orange/coral) */}
      {/* starts at x=110 y=200, rises through growth, peaks in maturity, drops in decline */}
      <path
        d="M 110 200 C 180 195, 230 180, 290 130 C 360 70, 450 60, 510 60 C 580 60, 650 90, 720 150 C 740 168, 760 185, 780 195"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.5}
      />
      <Note x={515} y={52} fill={SIGNAL} weight="600" size={12}>
        Sales Volume
      </Note>

      {/* Profit curve (INK2 - dark charcoal / counter) */}
      {/* dips negative during introduction due to R&D/launch, crosses 0 near growth, peaks before sales peak, drops */}
      <path
        d="M 110 215 C 160 228, 210 220, 250 200 C 310 160, 390 100, 460 95 C 510 95, 570 120, 620 150 C 670 180, 720 205, 780 220"
        fill="none"
        stroke={INK}
        strokeWidth={2}
        strokeDasharray="5 3"
      />
      <Note x={465} y={85} fill={INK} weight="600" size={12}>
        Profit
      </Note>

      {/* Bottom notes per stage */}
      <Note x={200} y={275} anchor="middle" fill={INK3} size={11}>
        High costs · negative profit
      </Note>
      <Note x={400} y={275} anchor="middle" fill={INK3} size={11}>
        Rapid adoption · peak profit
      </Note>
      <Note x={615} y={275} anchor="middle" fill={INK3} size={11}>
        Peak sales · price pressure
      </Note>
      <Note x={750} y={275} anchor="middle" fill={INK3} size={11}>
        Drop or harvest
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   5 · BrandEquityHouse — The Four Pillars of Brand Equity
   ========================================================================== */
export function BrandEquityHouse() {
  const pillars = [
    {
      name: "Brand Awareness",
      detail: "Recall & Recognition",
      role: "Customer knows the brand and considers it in decisions",
    },
    {
      name: "Perceived Quality",
      detail: "Consistency & Excellence",
      role: "Customer trusts performance and accepts premium pricing",
    },
    {
      name: "Brand Associations",
      detail: "Meaning & Attributes",
      role: "Feelings, symbols, values, and lifestyle links in memory",
    },
    {
      name: "Brand Loyalty",
      detail: "Repeat & Advocacy",
      role: "Repeat buying, resistance to discounts, active recommendation",
    },
  ];

  return (
    <Frame height={290} label="The four pillars of brand equity">
      {/* Roof / Top Banner */}
      <rect
        x={60}
        y={20}
        width={680}
        height={45}
        fill={SIGNAL}
        opacity={0.15}
        stroke={SIGNAL}
        strokeWidth={1.5}
        rx={2}
      />
      <Key x={400} y={38} anchor="middle" fill={SIGNAL} size={10}>
        OVERALL BRAND EQUITY
      </Key>
      <Note x={400} y={55} anchor="middle" fill={INK} weight="600" size={13}>
        Commercial Value Derived From Consumer Perception &amp; Preference
      </Note>

      {/* Four Pillars */}
      {pillars.map((pillar, i) => {
        const x = 60 + i * 175;
        return (
          <g key={pillar.name}>
            <rect
              x={x}
              y={75}
              width={155}
              height={140}
              fill={PAPER2}
              stroke={RULE}
              strokeWidth={1}
              rx={2}
            />
            <Key x={x + 12} y={96} fill={INK3} size={9}>
              PILLAR 0{i + 1}
            </Key>
            <Note x={x + 12} y={116} fill={INK} weight="600" size={12}>
              {pillar.name}
            </Note>
            <Note x={x + 12} y={134} fill={SIGNAL} weight="500" size={10}>
              {pillar.detail}
            </Note>
            <text
              x={x + 12}
              y={160}
              fontFamily={BODY}
              fontSize={10}
              fill={INK2}
              width={130}
            >
              <tspan x={x + 12} dy="0">
                {pillar.role.slice(0, 22)}
              </tspan>
              <tspan x={x + 12} dy="14">
                {pillar.role.slice(22, 45)}
              </tspan>
              <tspan x={x + 12} dy="14">
                {pillar.role.slice(45)}
              </tspan>
            </text>
          </g>
        );
      })}

      {/* Foundation */}
      <rect
        x={60}
        y={225}
        width={680}
        height={32}
        fill={PAPER}
        stroke={INK3}
        strokeWidth={1}
      />
      <Note x={400} y={245} anchor="middle" fill={INK2} size={11}>
        Foundation: Delivered Product Experience, Consistency, and Ethical
        Behaviour
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   6 · BrandGrowthGrid — 2x2 Matrix of Brand Development
   Existing / New Product Category vs Existing / New Brand Name
   ========================================================================== */
export function BrandGrowthGrid() {
  return (
    <Frame height={300} label="Brand development strategies grid">
      {/* Column labels: Product Category */}
      <Key x={260} y={30} anchor="middle" fill={INK2} size={11}>
        EXISTING CATEGORY
      </Key>
      <Key x={560} y={30} anchor="middle" fill={INK2} size={11}>
        NEW CATEGORY
      </Key>

      {/* Row labels: Brand Name */}
      <text
        x={50}
        y={105}
        textAnchor="middle"
        fontFamily={LABEL}
        fontSize={10}
        letterSpacing="0.12em"
        fill={INK2}
        transform="rotate(-90 50 105)"
      >
        EXISTING BRAND
      </text>
      <text
        x={50}
        y={215}
        textAnchor="middle"
        fontFamily={LABEL}
        fontSize={10}
        letterSpacing="0.12em"
        fill={INK2}
        transform="rotate(-90 50 215)"
      >
        NEW BRAND
      </text>

      {/* Quad 1: Line Extension */}
      <rect
        x={120}
        y={50}
        width={270}
        height={105}
        fill={PAPER2}
        stroke={RULE}
        strokeWidth={1}
      />
      <Key x={140} y={75} fill={SIGNAL} size={10}>
        STRATEGY 1
      </Key>
      <Note x={140} y={96} fill={INK} weight="600" size={14}>
        Line Extension
      </Note>
      <Note x={140} y={116} fill={INK2} size={11}>
        New flavour, colour, size or formula
      </Note>
      <Note x={140} y={134} fill={INK3} size={10}>
        e.g., Diet Coke, Cheerios Oat Crunch
      </Note>

      {/* Quad 2: Brand Extension */}
      <rect
        x={410}
        y={50}
        width={270}
        height={105}
        fill={PAPER2}
        stroke={RULE}
        strokeWidth={1}
      />
      <Key x={430} y={75} fill={SIGNAL} size={10}>
        STRATEGY 2
      </Key>
      <Note x={430} y={96} fill={INK} weight="600" size={14}>
        Brand Extension
      </Note>
      <Note x={430} y={116} fill={INK2} size={11}>
        Existing brand into a new product category
      </Note>
      <Note x={430} y={134} fill={INK3} size={10}>
        e.g., Apple Watch, Dyson Hair Dryer
      </Note>

      {/* Quad 3: Multibrands */}
      <rect
        x={120}
        y={165}
        width={270}
        height={105}
        fill={PAPER2}
        stroke={RULE}
        strokeWidth={1}
      />
      <Key x={140} y={190} fill={INK3} size={10}>
        STRATEGY 3
      </Key>
      <Note x={140} y={211} fill={INK} weight="600" size={14}>
        Multibrands
      </Note>
      <Note x={140} y={231} fill={INK2} size={11}>
        Multiple brands in the same category
      </Note>
      <Note x={140} y={249} fill={INK3} size={10}>
        e.g., Tide &amp; Gain (P&amp;G laundry detergents)
      </Note>

      {/* Quad 4: New Brands */}
      <rect
        x={410}
        y={165}
        width={270}
        height={105}
        fill={PAPER2}
        stroke={RULE}
        strokeWidth={1}
      />
      <Key x={430} y={190} fill={INK3} size={10}>
        STRATEGY 4
      </Key>
      <Note x={430} y={211} fill={INK} weight="600" size={14}>
        New Brands
      </Note>
      <Note x={430} y={231} fill={INK2} size={11}>
        New name for an entirely new category
      </Note>
      <Note x={430} y={249} fill={INK3} size={10}>
        e.g., Toyota creating Lexus for luxury cars
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   7 · ServiceDimensions — The 4 Unique Characteristics of Services
   Intangibility, Inseparability, Variability, Perishability
   ========================================================================== */
export function ServiceDimensions() {
  const dims = [
    {
      title: "Intangibility",
      core: "Cannot be held or inspected prior to purchase",
      management:
        "Provide tangible cues, certifications, client reviews & clean physical evidence.",
    },
    {
      title: "Inseparability",
      core: "Produced and consumed at the exact same moment",
      management:
        "Train provider-customer interactions; empower frontline staff who represent the brand.",
    },
    {
      title: "Variability",
      core: "Quality depends on who, when, and where it is delivered",
      management:
        "Standardize service blueprints, train staff systematically, and monitor feedback.",
    },
    {
      title: "Perishability",
      core: "Unused capacity cannot be stored in inventory",
      management:
        "Dynamic pricing, off-peak promotions, and reservations to balance demand with capacity.",
    },
  ];

  return (
    <Frame height={290} label="Four unique characteristics of services">
      <Key x={40} y={25} fill={INK3} size={10}>
        THE NATURE OF SERVICES · CHALLENGE AND MARKETING RESPONSE
      </Key>

      {dims.map((dim, i) => {
        const x = 40 + i * 180;
        return (
          <g key={dim.title}>
            <rect
              x={x}
              y={45}
              width={168}
              height={205}
              fill={PAPER2}
              stroke={RULE}
              strokeWidth={1}
              rx={2}
            />
            <circle cx={x + 22} cy={68} r={12} fill={SIGNAL} opacity={0.15} />
            <Note
              x={x + 22}
              y={72}
              anchor="middle"
              fill={SIGNAL}
              weight="700"
              size={11}
            >
              {i + 1}
            </Note>
            <Note x={x + 42} y={72} fill={INK} weight="600" size={13}>
              {dim.title}
            </Note>

            <Key x={x + 16} y={105} fill={INK3} size={9}>
              THE REALITY
            </Key>
            <text
              x={x + 16}
              y={122}
              fontFamily={BODY}
              fontSize={11}
              fill={INK2}
            >
              <tspan x={x + 16} dy="0">
                {dim.core.slice(0, 22)}
              </tspan>
              <tspan x={x + 16} dy="15">
                {dim.core.slice(22, 44)}
              </tspan>
              <tspan x={x + 16} dy="15">
                {dim.core.slice(44)}
              </tspan>
            </text>

            <Key x={x + 16} y={170} fill={SIGNAL} size={9}>
              HOW TO MANAGE IT
            </Key>
            <text
              x={x + 16}
              y={185}
              fontFamily={BODY}
              fontSize={10}
              fill={INK3}
            >
              <tspan x={x + 16} dy="0">
                {dim.management.slice(0, 24)}
              </tspan>
              <tspan x={x + 16} dy="14">
                {dim.management.slice(24, 48)}
              </tspan>
              <tspan x={x + 16} dy="14">
                {dim.management.slice(48)}
              </tspan>
            </text>
          </g>
        );
      })}

      <Note x={400} y={272} anchor="middle" fill={INK3} size={11}>
        Services differ from goods on all four dimensions and require distinct
        management systems.
      </Note>
    </Frame>
  );
}
