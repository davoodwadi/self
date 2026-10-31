/* ==========================================================================
   Week 9: figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea. The week is about movement,
   so most plates read left to right along a chain: a factory at one end, a
   buyer at the other, and whatever sits between them as the subject of the
   slide. Where the idea is not a chain the grammar changes on purpose: a
   bridge over a gap, a hub with spokes, nested rings of goals, two crossed
   lines for control against complexity, a sorting table for assortments, a
   balance for service against cost.

   Conventions carried over from earlier weeks:
     - viewBox width 800 (400 for column plates), flat fills, hairline rules,
       no shadows or gradients
     - INK carries the neutral case, SIGNAL the operative one, COUNTER the
       contrast or the outward-looking state
     - every label reuses words from the slide the plate sits on
     - integer coordinates only, so server and client render the same markup
   ========================================================================== */

import React from "react";
import {
  COUNTER,
  COUNTER_TINT,
  Frame,
  headAlong1,
  INK,
  INK3,
  Key,
  Note,
  PAPER,
  PAPER2,
  RULE,
  RULE2,
  SIGNAL,
  SIGNAL_TINT,
} from "../_visuals/kit";
import {
  Arrow2,
  Chip2,
  Factory3,
  Pack4,
  Person3,
  Store2,
  Truck2,
  TwoWay1,
  Warehouse,
} from "../_visuals/objects";

/* -- geometry helpers ------------------------------------------------------ */

/* -- the cast of the week -------------------------------------------------- */
/* The same five glyphs stand for the same five parties on every plate: a
   factory is the producer, a warehouse the wholesaler, a crate the jobber's
   broken bulk, a shopfront the retailer, a person the final consumer. */

/** A clash: two short strokes meeting at a struck point. */
export function Clash({ x, y, k = 1, tone = SIGNAL }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <path
      d={`M${x - 14 * k} ${y - 14 * k} L${x + 14 * k} ${y + 14 * k} M${x + 14 * k} ${y - 14 * k} L${x - 14 * k} ${y + 14 * k} M${x} ${y - 19 * k} V${y + 19 * k} M${x - 19 * k} ${y} H${x + 19 * k}`}
      stroke={tone}
      strokeWidth={2}
      strokeLinecap="round"
    />
  );
}

/* ==========================================================================
   SYNCED PLATES FOR WEEK 9 CONTENT.MD
   ========================================================================== */

export function NineVsSixTransactions() {
  const ys = [86, 154, 222];
  return (
    <Frame
      height={284}
      label="Comparison of nine producer-to-customer transactions without an intermediary against six transactions routed through a shared distributor."
    >
      {/* Left panel: Without an intermediary (3 x 3 = 9 transactions) */}
      <Key x={196} y={26} anchor="middle" fill={INK} size={11}>
        Without an intermediary
      </Key>
      <Key x={64} y={48} anchor="middle" fill={INK3} size={10}>
        Producers
      </Key>
      <Key x={328} y={48} anchor="middle" fill={INK3} size={10}>
        Customers
      </Key>
      {ys.map((py) =>
        ys.map((cy) => (
          <line
            key={`${py}-${cy}`}
            x1={92}
            y1={py}
            x2={304}
            y2={cy}
            stroke={INK3}
            strokeWidth={1.2}
          />
        )),
      )}
      {ys.map((y, i) => (
        <g key={`left-p-${i}`}>
          <Factory3 x={64} y={y + 16} k={0.62} />
          <Person3 x={328} y={y + 16} k={0.92} />
        </g>
      ))}
      <Key x={196} y={266} anchor="middle" fill={INK} size={11}>
        3 × 3 = 9 transactions
      </Key>

      {/* Center divider */}
      <line
        x1={400}
        y1={18}
        x2={400}
        y2={272}
        stroke={RULE2}
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Right panel: With a shared distributor (3 + 3 = 6 transactions) */}
      <Key x={604} y={26} anchor="middle" fill={SIGNAL} size={11}>
        With a shared distributor
      </Key>
      <Key x={464} y={48} anchor="middle" fill={INK3} size={10}>
        Producers
      </Key>
      <Key x={604} y={48} anchor="middle" fill={SIGNAL} size={10}>
        Distributor
      </Key>
      <Key x={744} y={48} anchor="middle" fill={INK3} size={10}>
        Customers
      </Key>
      {ys.map((y, i) => {
        const dy = 138 + (i - 1) * 16;
        return (
          <g key={`right-lines-${i}`}>
            <line
              x1={492}
              y1={y}
              x2={556}
              y2={dy}
              stroke={SIGNAL}
              strokeWidth={1.6}
            />
            <line
              x1={652}
              y1={dy}
              x2={720}
              y2={y}
              stroke={SIGNAL}
              strokeWidth={1.6}
            />
          </g>
        );
      })}
      <rect
        x={558}
        y={112}
        width={92}
        height={84}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.75}
      />
      <Warehouse x={604} y={176} k={0.78} tone={SIGNAL} fill={PAPER} />
      {ys.map((y, i) => (
        <g key={`right-p-${i}`}>
          <Factory3 x={464} y={y + 16} k={0.62} />
          <Person3 x={744} y={y + 16} k={0.92} stroke={SIGNAL} />
        </g>
      ))}
      <Key x={604} y={266} anchor="middle" fill={SIGNAL} size={11}>
        3 + 3 = 6 transactions
      </Key>
    </Frame>
  );
}

export function ChannelLevelsDiagram() {
  return (
    <Frame
      height={296}
      label="Direct and indirect marketing channel structures showing zero-level, one-level, and two-level consumer and business channels."
    >
      {/* Column headers */}
      <Key x={190} y={22} anchor="middle" fill={INK3} size={10}>
        Producer
      </Key>
      <Key x={452} y={22} anchor="middle" fill={INK3} size={10}>
        Intermediary levels (channel length)
      </Key>
      <Key x={700} y={22} anchor="middle" fill={INK3} size={10}>
        Final buyer
      </Key>
      <line x1={24} y1={32} x2={776} y2={32} stroke={RULE} strokeWidth={1} />

      {/* Row 1: Zero-level (direct) channel */}
      <Key x={24} y={64} fill={SIGNAL} size={10.5}>
        Zero-level
      </Key>
      <Note x={24} y={80} fill={INK3} size={11}>
        Direct channel
      </Note>
      <Factory3 x={190} y={88} k={0.62} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Arrow2 x1={222} y1={70} x2={668} y2={70} tone={SIGNAL} width={1.75} />
      <Key x={445} y={58} anchor="middle" fill={SIGNAL} size={10}>
        No intermediary levels
      </Key>
      <Person3 x={700} y={88} k={0.95} stroke={SIGNAL} />
      <Key x={776} y={74} anchor="end" fill={SIGNAL} size={10.5}>
        0 levels
      </Key>

      <line
        x1={24}
        y1={108}
        x2={776}
        y2={108}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Row 2: One-level indirect channel */}
      <Key x={24} y={154} fill={INK} size={10.5}>
        One-level
      </Key>
      <Note x={24} y={170} fill={INK3} size={11}>
        Indirect channel
      </Note>
      <Factory3 x={190} y={178} k={0.62} />
      <Arrow2 x1={222} y1={160} x2={372} y2={160} tone={INK} width={1.5} />
      <rect
        x={380}
        y={132}
        width={144}
        height={54}
        fill={PAPER2}
        stroke={INK}
        strokeWidth={1.5}
      />
      <Store2 x={412} y={176} k={0.5} />
      <Key x={442} y={154} fill={INK} size={10}>
        Retailer
      </Key>
      <Note x={442} y={170} fill={INK3} size={10.5}>
        or distributor
      </Note>
      <Arrow2 x1={532} y1={160} x2={668} y2={160} tone={INK} width={1.5} />
      <Person3 x={700} y={178} k={0.95} />
      <Key x={776} y={164} anchor="end" fill={INK} size={10.5}>
        1 level
      </Key>

      <line
        x1={24}
        y1={202}
        x2={776}
        y2={202}
        stroke={RULE}
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Row 3: Two-level indirect channel */}
      <Key x={24} y={248} fill={COUNTER} size={10.5}>
        Two-level
      </Key>
      <Note x={24} y={264} fill={INK3} size={11}>
        Indirect channel
      </Note>
      <Factory3 x={190} y={272} k={0.62} />
      <Arrow2 x1={222} y1={254} x2={288} y2={254} tone={COUNTER} width={1.5} />
      <rect
        x={296}
        y={226}
        width={132}
        height={54}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Warehouse x={326} y={270} k={0.48} tone={COUNTER} fill={PAPER} />
      <Key x={352} y={257} fill={COUNTER} size={10}>
        Wholesaler
      </Key>
      <Arrow2 x1={434} y1={254} x2={468} y2={254} tone={COUNTER} width={1.5} />
      <rect
        x={476}
        y={226}
        width={132}
        height={54}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Store2 x={506} y={270} k={0.48} tone={COUNTER} fill={PAPER} />
      <Key x={534} y={248} fill={COUNTER} size={10}>
        Retailer
      </Key>
      <Note x={534} y={264} fill={COUNTER} size={10.5}>
        or dealer
      </Note>
      <Arrow2 x1={614} y1={254} x2={668} y2={254} tone={COUNTER} width={1.5} />
      <Person3 x={700} y={272} k={0.95} stroke={COUNTER} />
      <Key x={776} y={258} anchor="end" fill={COUNTER} size={10.5}>
        2 levels
      </Key>
    </Frame>
  );
}

export function ConventionalVsVms() {
  const leftNodes = [
    { x: 80, label: "Producer", g: "factory" },
    { x: 200, label: "Wholesaler", g: "warehouse" },
    { x: 320, label: "Retailer", g: "store" },
  ];
  const rightNodes = [
    { x: 492, label: "Producer", g: "factory" },
    { x: 600, label: "Wholesaler", g: "warehouse" },
    { x: 708, label: "Retailer", g: "store" },
  ];
  return (
    <Frame
      height={252}
      label="Comparison of a fragmented conventional marketing channel with a unified Vertical Marketing System (corporate, contractual, or administered)."
    >
      {/* Left panel: Conventional marketing channel */}
      <Key x={200} y={22} anchor="middle" fill={INK} size={11}>
        Conventional marketing channel
      </Key>
      <Note x={200} y={40} anchor="middle" fill={INK3} size={11}>
        Fragmented: each firm maximizes its own profit
      </Note>

      {leftNodes.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x - 44}
            y={56}
            width={88}
            height={102}
            fill={PAPER2}
            stroke={INK}
            strokeWidth={1.5}
          />
          <Key x={n.x - 4} y={73} anchor="middle" fill={INK3} size={8.5}>
            Own profit
          </Key>
          <Arrow2
            x1={n.x + 28}
            y1={124}
            x2={n.x + 28}
            y2={68}
            tone={INK3}
            width={1.3}
            size={5}
          />
          {n.g === "factory" ? <Factory3 x={n.x - 10} y={126} k={0.54} /> : null}
          {n.g === "warehouse" ? <Warehouse x={n.x - 10} y={126} k={0.52} /> : null}
          {n.g === "store" ? <Store2 x={n.x - 10} y={126} k={0.52} /> : null}
          <Key x={n.x} y={148} anchor="middle" fill={INK} size={9.5}>
            {n.label}
          </Key>
        </g>
      ))}
      {/* Broken links between independent firms */}
      <line
        x1={124}
        y1={109}
        x2={156}
        y2={109}
        stroke={RULE2}
        strokeWidth={1.5}
        strokeDasharray="3 3"
      />
      <Clash x={140} y={109} k={0.34} tone={INK3} />
      <line
        x1={244}
        y1={109}
        x2={276}
        y2={109}
        stroke={RULE2}
        strokeWidth={1.5}
        strokeDasharray="3 3"
      />
      <Clash x={260} y={109} k={0.34} tone={INK3} />

      <path
        d="M320 158 V182 H200 V198"
        fill="none"
        stroke={INK3}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      <path d={headAlong1(200, 200, 0, 1, 6)} fill="none" stroke={INK3} strokeWidth={1.5} />
      <Person3 x={200} y={238} k={0.86} />
      <Key x={228} y={230} fill={INK3} size={10}>
        Consumer
      </Key>

      {/* Center divider */}
      <line
        x1={400}
        y1={16}
        x2={400}
        y2={240}
        stroke={RULE2}
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Right panel: Vertical Marketing System (VMS) */}
      <Key x={600} y={22} anchor="middle" fill={SIGNAL} size={11}>
        Vertical Marketing System (VMS)
      </Key>
      <Note x={600} y={40} anchor="middle" fill={SIGNAL} size={11}>
        Unified: corporate, contractual, or administered
      </Note>

      <rect
        x={432}
        y={54}
        width={336}
        height={112}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <Key x={600} y={71} anchor="middle" fill={SIGNAL} size={9.5}>
        Acting as one unified system
      </Key>

      {rightNodes.map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x - 40}
            y={80}
            width={80}
            height={74}
            fill={PAPER}
            stroke={SIGNAL}
            strokeWidth={1.5}
          />
          {n.g === "factory" ? (
            <Factory3 x={n.x} y={128} k={0.52} tone={SIGNAL} />
          ) : null}
          {n.g === "warehouse" ? (
            <Warehouse x={n.x} y={128} k={0.5} tone={SIGNAL} />
          ) : null}
          {n.g === "store" ? (
            <Store2 x={n.x} y={128} k={0.5} tone={SIGNAL} />
          ) : null}
          <Key x={n.x} y={146} anchor="middle" fill={INK} size={9.5}>
            {n.label}
          </Key>
          {i < rightNodes.length - 1 ? (
            <Arrow2
              x1={n.x + 42}
              y1={117}
              x2={n.x + 66}
              y2={117}
              tone={SIGNAL}
              width={1.5}
              size={6}
            />
          ) : null}
        </g>
      ))}

      <Arrow2
        x1={600}
        y1={168}
        x2={600}
        y2={196}
        tone={SIGNAL}
        width={1.75}
        size={6}
      />
      <Person3 x={600} y={236} k={0.86} stroke={SIGNAL} />
      <Key x={628} y={228} fill={SIGNAL} size={10}>
        Consumer
      </Key>
    </Frame>
  );
}

export function LogisticsFlows() {
  return (
    <Frame
      height={268}
      label="Supply chain logistics flows showing upstream inbound distribution from suppliers, outbound distribution through resellers to customers, and reverse distribution for returns and recycling."
    >
      {/* Top directional banners */}
      <Key x={200} y={26} anchor="middle" fill={COUNTER} size={11}>
        Inbound logistics
      </Key>
      <Note x={200} y={44} anchor="middle" fill={INK3} size={10.5}>
        Upstream materials from suppliers
      </Note>
      <line x1={80} y1={56} x2={320} y2={56} stroke={COUNTER} strokeWidth={1.5} />

      <Key x={536} y={26} anchor="middle" fill={SIGNAL} size={11}>
        Outbound logistics
      </Key>
      <Note x={536} y={44} anchor="middle" fill={INK3} size={10.5}>
        Downstream final goods to resellers and customers
      </Note>
      <line x1={356} y1={56} x2={720} y2={56} stroke={SIGNAL} strokeWidth={1.5} />

      {/* Stage 1: Suppliers */}
      <rect
        x={36}
        y={78}
        width={120}
        height={92}
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      <Pack4 x={96} y={136} w={36} h={30} tone={COUNTER} fill={PAPER} />
      <Key x={96} y={158} anchor="middle" fill={COUNTER} size={10}>
        Suppliers
      </Key>

      {/* Inbound arrow */}
      <Arrow2 x1={160} y1={124} x2={232} y2={124} tone={COUNTER} width={2} />

      {/* Stage 2: Factory */}
      <rect
        x={236}
        y={78}
        width={136}
        height={92}
        fill={PAPER2}
        stroke={INK}
        strokeWidth={1.75}
      />
      <Factory3 x={304} y={136} k={0.66} />
      <Key x={304} y={158} anchor="middle" fill={INK} size={10}>
        Factory (company)
      </Key>

      {/* Outbound arrow 1 */}
      <Arrow2 x1={376} y1={124} x2={444} y2={124} tone={SIGNAL} width={2} />

      {/* Stage 3: Resellers */}
      <rect
        x={448}
        y={78}
        width={128}
        height={92}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Store2 x={512} y={136} k={0.6} tone={SIGNAL} fill={PAPER} />
      <Key x={512} y={158} anchor="middle" fill={SIGNAL} size={10}>
        Resellers
      </Key>

      {/* Outbound arrow 2 */}
      <Arrow2 x1={580} y1={124} x2={644} y2={124} tone={SIGNAL} width={2} />

      {/* Stage 4: Customers */}
      <rect
        x={648}
        y={78}
        width={116}
        height={92}
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Person3 x={706} y={136} k={0.92} stroke={SIGNAL} />
      <Key x={706} y={158} anchor="middle" fill={SIGNAL} size={10}>
        Customers
      </Key>

      {/* Reverse logistics loop below */}
      <path
        d="M706 172 V216 H304 V178"
        fill="none"
        stroke={INK}
        strokeWidth={1.6}
        strokeDasharray="6 4"
      />
      <path
        d="M512 172 V216"
        fill="none"
        stroke={INK}
        strokeWidth={1.6}
        strokeDasharray="6 4"
      />
      <path d={headAlong1(304, 174, 0, -1, 7)} fill="none" stroke={INK} strokeWidth={1.6} />
      <Key x={505} y={238} anchor="middle" fill={INK} size={10.5}>
        Reverse logistics
      </Key>
      <Note x={505} y={255} anchor="middle" fill={INK3} size={10.5}>
        Returns, reuse, refurbishment, and recycling
      </Note>
    </Frame>
  );
}

export function AgenticCommerceChannel() {
  return (
    <Frame
      height={284}
      label="Agentic commerce channel placing the consumer's AI shopping agent as an intermediary layer between the consumer and producers or retail platforms."
    >
      {/* Left column: Producers and Retail platforms */}
      <rect
        x={28}
        y={36}
        width={176}
        height={78}
        fill={PAPER2}
        stroke={INK}
        strokeWidth={1.5}
      />
      <Factory3 x={66} y={92} k={0.56} />
      <Key x={100} y={68} fill={INK} size={10}>
        Producers
      </Key>
      <Note x={100} y={86} fill={INK3} size={10}>
        Direct catalog APIs
      </Note>

      <rect
        x={28}
        y={130}
        width={176}
        height={78}
        fill={PAPER2}
        stroke={INK}
        strokeWidth={1.5}
      />
      <Store2 x={66} y={186} k={0.54} />
      <Key x={100} y={162} fill={INK} size={10}>
        Retail platforms
      </Key>
      <Note x={100} y={180} fill={INK3} size={10}>
        Storefront listings
      </Note>

      {/* Two-way connections between sellers and AI agent */}
      <TwoWay1 x1={208} y1={75} x2={276} y2={98} tone={SIGNAL} width={1.6} />
      <TwoWay1 x1={208} y1={169} x2={276} y2={146} tone={SIGNAL} width={1.6} />

      {/* Center: AI shopping agent intermediary layer */}
      <rect
        x={280}
        y={28}
        width={244}
        height={186}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={2}
      />
      <Key x={402} y={50} anchor="middle" fill={SIGNAL} size={11}>
        AI shopping agent
      </Key>
      <Note x={402} y={66} anchor="middle" fill={SIGNAL} size={10.5}>
        Software intermediary layer
      </Note>

      <Chip2 x={324} y={136} s={38} tone={SIGNAL} fill={PAPER} />

      <rect
        x={362}
        y={80}
        width={148}
        height={120}
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth={1.25}
      />
      <Key x={374} y={102} fill={INK} size={9.5}>
        1. Information (specs)
      </Key>
      <Key x={374} y={125} fill={INK} size={9.5}>
        2. Contact (APIs)
      </Key>
      <Key x={374} y={148} fill={INK} size={9.5}>
        3. Matching (ranking)
      </Key>
      <Key x={374} y={171} fill={SIGNAL} size={9.5}>
        4. Checkout execution
      </Key>

      {/* Connections between AI agent and Consumer */}
      <Arrow2 x1={614} y1={96} x2={528} y2={96} tone={INK} width={1.5} size={6} />
      <Key x={571} y={84} anchor="middle" fill={INK} size={9.5}>
        Stated goal
      </Key>

      <Arrow2 x1={528} y1={152} x2={614} y2={152} tone={SIGNAL} width={1.75} size={6} />
      <Key x={571} y={170} anchor="middle" fill={SIGNAL} size={9.5}>
        Best match
      </Key>

      {/* Right column: Consumer */}
      <rect
        x={618}
        y={64}
        width={154}
        height={118}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.5}
      />
      <Person3 x={695} y={138} k={1} stroke={INK} />
      <Key x={695} y={164} anchor="middle" fill={INK} size={10.5}>
        Consumer
      </Key>

      {/* Bottom: Physical fulfillment network */}
      <path
        d="M116 210 V248 H356"
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      <Truck2 x={402} y={254} k={0.78} tone={COUNTER} />
      <path
        d="M446 248 H695 V188"
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      <path d={headAlong1(695, 184, 0, -1, 7)} fill="none" stroke={COUNTER} strokeWidth={1.6} />
      <Key x={402} y={274} anchor="middle" fill={COUNTER} size={10}>
        Physical distribution, warehousing, and reverse logistics (fulfillment networks)
      </Key>
    </Frame>
  );
}
