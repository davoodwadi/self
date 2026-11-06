"use client";

/* ==========================================================================
   Week 7, plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     - Person, every human (bust in profile)
     - Shop, the business / supplier / merchant
     - Doc, paper record, deed, contract, or documentation
     - Coins, payment / funds / loan disbursement / royalties
     - Monitor / MiniScreen, anything digital (blockchain node, smart contract)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React from "react";
import {
  LockKey,
  ShieldCheck,
  Cloud,
  CheckCircle,
  Gear,
  FileCode,
  Globe,
  Truck,
  Package,
  Broadcast,
  ArrowsClockwise,
  Handshake,
} from "@phosphor-icons/react";
import {
  WHITE,
  INK,
  SIGNAL,
  COUNTER,
  r2,
  Plate,
  Monitor,
  MiniScreen,
  Arrow,
  Pointer,
  Knob,
} from "../_visuals/kit";
import { Person, Shop, Doc, Coins } from "../_visuals/objects";

const HEAD = { fontFamily: "var(--font-sans)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-sans)", fontWeight: 600 } as const;

/* ==========================================================================
   1. Hero: Peer-to-peer digital transaction recorded on a framed screen
   holding a chain of cryptographically linked blocks
   ========================================================================== */

export function HeroBlockchainLedger() {
  return (
    <Plate
      w={520}
      h={340}
      title="A transaction document and coins on the left point via a red arrow into a framed screen holding three chained blocks (Block 1, Block 2, and a red verified Block 3)"
    >
      {/* Transaction record and value on the left */}
      <Doc x={32} y={76} k={0.56} />
      <Coins x={56} y={224} n={4} />

      <Arrow x1={98} x2={154} y={148} color={SIGNAL} />

      {/* Framed digital screen holding the blockchain */}
      <Monitor x={164} y={18} w={338} h={268}>
        <text x={333} y={54} textAnchor="middle" {...HEAD} fontSize={19} fill={INK}>
          Blockchain Ledger
        </text>

        {/* Block 1 */}
        <rect x={188} y={80} width={72} height={116} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={224} y={108} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
          Block 1
        </text>
        <LockKey x={208} y={122} size={32} weight="fill" color={INK} />
        <rect x={202} y={166} width={44} height={6} fill={INK} fillOpacity={0.35} />
        <rect x={202} y={178} width={30} height={6} fill={INK} fillOpacity={0.35} />

        {/* Chain link 1 -> 2 */}
        <Pointer x1={263} y1={138} x2={294} y2={138} w={3.5} head={10} color={INK} />

        {/* Block 2 */}
        <rect x={297} y={80} width={72} height={116} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={333} y={108} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
          Block 2
        </text>
        <LockKey x={317} y={122} size={32} weight="fill" color={INK} />
        <rect x={311} y={166} width={44} height={6} fill={INK} fillOpacity={0.35} />
        <rect x={311} y={178} width={30} height={6} fill={INK} fillOpacity={0.35} />

        {/* Chain link 2 -> 3 */}
        <Pointer x1={372} y1={138} x2={403} y2={138} w={3.5} head={10} color={SIGNAL} />

        {/* Block 3 (newly validated & immutable, SIGNAL red) */}
        <rect x={406} y={80} width={72} height={116} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={442} y={108} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
          Block 3
        </text>
        <ShieldCheck x={426} y={122} size={32} weight="fill" color={SIGNAL} />
        <rect x={420} y={166} width={44} height={6} fill={SIGNAL} fillOpacity={0.35} />
        <rect x={420} y={178} width={30} height={6} fill={SIGNAL} fillOpacity={0.35} />

        {/* Footer caption inside monitor */}
        <text x={333} y={238} textAnchor="middle" {...BODY} fontSize={15} fill={INK}>
          Secure | Transparent | Immutable
        </text>
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   2. Blockchain and Why It Matters: Three selectable pillars:
   1. Security (securely), 2. Transparency (transparently),
   3. Efficiency (difficult to alter / no intermediaries)
   ========================================================================== */


/* ==========================================================================
   3. Features of Blockchain: Four selectable features:
   1. Decentralized (contrasted with cloud computing), 2. Immutable,
   3. Consensus, 4. Programmable
   ========================================================================== */

const FEATURE_ZONES = [
  { idx: 0, x0: 20, x1: 195, cx: 107.5, tab: "1. Decentralized", sub: "P2P vs. Cloud" },
  { idx: 1, x0: 215, x1: 390, cx: 302.5, tab: "2. Immutable", sub: "Permanent Record" },
  { idx: 2, x0: 410, x1: 585, cx: 497.5, tab: "3. Consensus", sub: "All Parties Agree" },
  { idx: 3, x0: 605, x1: 780, cx: 692.5, tab: "4. Programmable", sub: "Smart Contracts" },
];

export function BlockchainFeaturesInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const current = FEATURE_ZONES[active] ?? FEATURE_ZONES[0];

  return (
    <Plate
      w={800}
      h={262}
      title={`Four selectable panels for Features of Blockchain: 1. Decentralized (a blue centralized cloud hub contrasted with a peer-to-peer mesh of four nodes), 2. Immutable (chained blocks locked inside a framed screen), 3. Consensus (three network nodes with check marks agreeing on a transaction block), and 4. Programmable (a framed screen executing coded conditions). ${current.tab} is selected in red`}
    >
      <path d="M 205 18 V 198 M 400 18 V 198 M 595 18 V 198" stroke={INK} strokeWidth={1.8} strokeDasharray="4 5" />

      {/* 1. Decentralized: Cloud hub (blue contrast) vs P2P mesh */}
      <Cloud x={44} y={34} size={32} weight="fill" color={COUNTER} />
      <path d="M 52 68 L 40 94 M 68 68 L 80 94" stroke={COUNTER} strokeWidth={2.5} />
      <circle cx={40} cy={98} r={5.5} fill={COUNTER} />
      <circle cx={80} cy={98} r={5.5} fill={COUNTER} />
      <text x={60} y={124} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        Cloud
      </text>

      {/* P2P 4-node mesh */}
      <path
        d="M 122 46 H 168 V 96 H 122 Z M 122 46 L 168 96 M 168 46 L 122 96"
        fill="none"
        stroke={toneOf(0)}
        strokeWidth={2.5}
      />
      {[
        [122, 46],
        [168, 46],
        [122, 96],
        [168, 96],
      ].map(([nx, ny], i) => (
        <rect key={i} x={nx - 8} y={ny - 8} width={16} height={16} fill={toneOf(0)} stroke={WHITE} strokeWidth={2} />
      ))}
      <text x={145} y={124} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        P2P Nodes
      </text>

      {/* 2. Immutable: Chained blocks locked in a Monitor */}
      <Monitor x={237} y={24} w={131} h={96}>
        <rect x={251} y={48} width={32} height={44} fill={toneOf(1)} />
        <LockKey x={256} y={59} size={22} weight="fill" color={WHITE} />
        <Pointer x1={286} y1={70} x2={318} y2={70} w={3} head={8} color={toneOf(1)} />
        <rect x={321} y={48} width={32} height={44} fill={toneOf(1)} />
        <LockKey x={326} y={59} size={22} weight="fill" color={WHITE} />
      </Monitor>

      {/* 3. Consensus: Three nodes agreeing on a validated block */}
      {[448, 497.5, 547].map((cx) => (
        <g key={cx}>
          <CheckCircle x={r2(cx - 15)} y={26} size={30} weight="fill" color={toneOf(2)} />
          <Pointer x1={cx} y1={60} x2={cx} y2={102} w={3} head={9} color={toneOf(2)} />
        </g>
      ))}
      <rect x={432} y={106} width={131} height={36} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={497.5} y={129} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Valid Block
      </text>

      {/* 4. Programmable: Smart contract executing on a Monitor */}
      <Monitor x={627} y={24} w={131} h={96}>
        <FileCode x={645} y={52} size={36} weight="fill" color={toneOf(3)} />
        <Pointer x1={685} y1={70} x2={707} y2={70} w={3.5} head={9} color={toneOf(3)} />
        <Gear x={709} y={52} size={36} weight="fill" color={toneOf(3)} />
      </Monitor>

      {/* Sub-labels & Bottom selector tabs */}
      {FEATURE_ZONES.map((z) => {
        const isLit = z.idx === active;
        const tone = toneOf(z.idx);
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(z.idx) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(z.idx);
                    }
                  }
                : undefined
            }
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={238} fill="transparent" />
            <text x={z.cx} y={182} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
              {z.sub}
            </text>
            <rect x={z.x0} y={210} width={z.x1 - z.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={z.cx} y={235} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function BlockchainFeaturesTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={384}
      title={`Four stacked selectable rows for Features of Blockchain: 1. Decentralized, 2. Immutable, 3. Consensus, and 4. Programmable. ${FEATURE_ZONES[active]?.tab ?? "1. Decentralized"} is selected`}
    >
      {FEATURE_ZONES.map((z, i) => {
        const y0 = 12 + i * 92;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={16} y={y0} width={368} height={84} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={172} height={84} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={102} y={y0 + 38} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
              {z.tab}
            </text>
            <text x={102} y={y0 + 60} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
              {z.sub}
            </text>
            <MiniScreen x={246} y={y0 + 7}>
              {i === 0 && <Globe x={273} y={y0 + 20} size={30} weight="fill" color={tone} />}
              {i === 1 && <LockKey x={273} y={y0 + 20} size={30} weight="fill" color={tone} />}
              {i === 2 && <CheckCircle x={273} y={y0 + 20} size={30} weight="fill" color={tone} />}
              {i === 3 && <FileCode x={273} y={y0 + 20} size={30} weight="fill" color={tone} />}
            </MiniScreen>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   4. Smart Contracts: Interactive 3-stage pipeline:
   1. Agreement in Code, 2. Stored & Replicated (Ethereum, Solana),
   3. Self-Executing Program
   ========================================================================== */

const SC_STAGE_ZONES = [
  { idx: 0, x0: 20, x1: 256, cx: 138, tab: "1. Terms in Code", sub: "Agreement → Code" },
  { idx: 1, x0: 282, x1: 518, cx: 400, tab: "2. On Blockchain", sub: "Solana | Ethereum" },
  { idx: 2, x0: 544, x1: 780, cx: 662, tab: "3. Self-Executing", sub: "Auto-Executes" },
];

export function SmartContractMechanismInteractive() {
  const [stage, setStage] = React.useState(0);
  const toneOf = (i: number) => (i === stage ? SIGNAL : INK);
  const cur = SC_STAGE_ZONES[stage] ?? SC_STAGE_ZONES[0];

  return (
    <Plate
      w={800}
      h={256}
      title={`Three selectable stages of a Smart Contract: 1. Terms in Code (a written agreement translated into lines of code), 2. On Blockchain (replicated across nodes on networks such as Solana and Ethereum), and 3. Self-Executing (automatically executing payment when conditions are met). ${cur.tab} is selected in red`}
    >
      <path d="M 269 18 V 192 M 531 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Stage 1: Agreement written directly into lines of code */}
      <Doc x={42} y={42} k={0.56} tone={toneOf(0)} />
      <Pointer x1={104} y1={76} x2={142} y2={76} w={3.5} head={10} color={toneOf(0)} />
      <MiniScreen x={148} y={42}>
        <FileCode x={173} y={53} size={34} weight="fill" color={toneOf(0)} />
      </MiniScreen>
      <text x={138} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
        {SC_STAGE_ZONES[0].sub}
      </text>

      {/* Stage 2: Stored and replicated on a blockchain (Solana, Ethereum) */}
      <Monitor x={306} y={24} w={188} h={108}>
        <rect x={326} y={46} width={66} height={34} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={359} y={68} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
          Ethereum
        </text>
        <rect x={408} y={46} width={66} height={34} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={441} y={68} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
          Solana
        </text>
        <text x={400} y={104} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
          Replicated Nodes
        </text>
      </Monitor>
      <text x={400} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
        {SC_STAGE_ZONES[1].sub}
      </text>

      {/* Stage 3: Self-executing program when conditions are met */}
      <MiniScreen x={560} y={42}>
        <CheckCircle x={574} y={55} size={28} weight="fill" color={toneOf(2)} />
        <Gear x={604} y={55} size={28} weight="fill" color={toneOf(2)} />
      </MiniScreen>
      <Pointer x1={652} y1={72} x2={696} y2={72} w={4} head={11} color={toneOf(2)} />
      <Coins x={732} y={114} n={4} />
      <text x={662} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={INK}>
        {SC_STAGE_ZONES[2].sub}
      </text>

      {/* Interactive selector buttons at bottom */}
      {SC_STAGE_ZONES.map((z) => {
        const isLit = z.idx === stage;
        const tone = toneOf(z.idx);
        return (
          <g
            key={z.tab}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={z.tab}
            style={{ cursor: "pointer" }}
            onClick={() => setStage(z.idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setStage(z.idx);
              }
            }}
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={17.5} fill={INK}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   5. Question: Use Cases for Immutability and Programmability of Smart
   Contracts, Interactive 7-domain explorer
   ========================================================================== */


/* ==========================================================================
   6. Smart Contracts in Supply Chain Management, Three selectable columns
   contrasting Traditional Issues (blue) with Smart Contract Solutions (red):
   1. Automation (vs. Manual delays), 2. Transparency (vs. Tracking gaps),
   3. Trust (vs. Mistrust)
   ========================================================================== */


/* ==========================================================================
   7. Case Study: Amazon: Five selectable process stages integrating Smart
   Contracts with IoT sensors:
   1. Order Placement, 2. Shipment Tracking, 3. Delivery Confirmation,
   4. Documentation, 5. Post-purchase Services
   ========================================================================== */

const AMAZON_STEPS = [
  { idx: 0, x0: 16, x1: 160, cx: 88, tab: "1. Order" },
  { idx: 1, x0: 172, x1: 316, cx: 244, tab: "2. Tracking" },
  { idx: 2, x0: 328, x1: 472, cx: 400, tab: "3. Delivery" },
  { idx: 3, x0: 484, x1: 628, cx: 556, tab: "4. Record" },
  { idx: 4, x0: 640, x1: 784, cx: 712, tab: "5. Support" },
];

export function AmazonSupplyChainInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = AMAZON_STEPS[active] ?? AMAZON_STEPS[0];

  return (
    <Plate
      w={800}
      h={258}
      title={`Five selectable stages of Amazon's supply chain smart contract process: 1. Order Placement (buyer triggers smart contract), 2. Shipment Tracking (IoT sensors monitor truck and update blockchain), 3. Delivery Confirmation (smart contract releases payment to supplier), 4. Documentation (immutable ledger record), and 5. Post-purchase Services (support and returns). ${cur.tab} is selected in red`}
    >
      {/* 1. Order Placement */}
      <Package x={70} y={36} size={36} weight="fill" color={toneOf(0)} />
      <MiniScreen x={46} y={102}>
        <FileCode x={73} y={115} size={30} weight="fill" color={toneOf(0)} />
      </MiniScreen>

      {/* 2. Shipment Tracking (IoT sensors + Truck) */}
      <Truck x={206} y={36} size={36} weight="fill" color={toneOf(1)} />
      <Broadcast x={248} y={36} size={34} weight="fill" color={toneOf(1)} />
      <MiniScreen x={202} y={102}>
        <CheckCircle x={229} y={115} size={30} weight="fill" color={toneOf(1)} />
      </MiniScreen>

      {/* 3. Delivery Confirmation (Payment released to supplier) */}
      <Package x={358} y={36} size={36} weight="fill" color={toneOf(2)} />
      <Coins x={426} y={82} n={3} />
      <MiniScreen x={358} y={102}>
        <Handshake x={385} y={115} size={30} weight="fill" color={toneOf(2)} />
      </MiniScreen>

      {/* 4. Documentation (Immutable record on blockchain) */}
      <Doc x={536.2} y={22} k={0.44} tone={toneOf(3)} />
      <MiniScreen x={514} y={102}>
        <LockKey x={541} y={115} size={30} weight="fill" color={toneOf(3)} />
      </MiniScreen>

      {/* 5. Post-purchase Services (Support & returns) */}
      <Shop x={686.4} y={24} k={0.32} tone={toneOf(4)} />
      <MiniScreen x={670} y={102}>
        <ArrowsClockwise x={697} y={115} size={30} weight="fill" color={toneOf(4)} />
      </MiniScreen>

      {/* Stage-to-stage arrows between screens */}
      {[136, 292, 448, 604].map((x, i) => (
        <Pointer
          key={x}
          x1={x}
          y1={130}
          x2={x + 60}
          y2={130}
          w={3.5}
          head={9}
          color={i === active || i + 1 === active ? SIGNAL : INK}
        />
      ))}

      {/* Bottom interactive buttons */}
      {AMAZON_STEPS.map((z) => {
        const isLit = z.idx === active;
        const tone = toneOf(z.idx);
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(z.idx) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(z.idx);
                    }
                  }
                : undefined
            }
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={232} fill="transparent" />
            <rect x={z.x0} y={204} width={z.x1 - z.x0} height={38} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={z.cx} y={228} textAnchor="middle" {...HEAD} fontSize={15.5} fill={INK}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function AmazonSupplyChainTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={340}
      title={`Five stacked selectable rows for Amazon's supply chain smart contract process. ${AMAZON_STEPS[active]?.tab ?? "1. Order"} is selected`}
    >
      {AMAZON_STEPS.map((z, i) => {
        const y0 = 14 + i * 63;
        const isLit = i === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={16} y={y0} width={368} height={52} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={160} height={52} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={96} y={y0 + 32} textAnchor="middle" {...HEAD} fontSize={16.5} fill={INK}>
              {z.tab}
            </text>
            {i === 0 && <FileCode x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 1 && <Broadcast x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 2 && <Package x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 3 && <LockKey x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 4 && <ArrowsClockwise x={264} y={y0 + 10} size={32} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   8. NFTs (Non-Fungible Tokens): Three selectable rows:
   1. 2021 Surge & Celebrity Adoption, 2. Status Signaling,
   3. Verifiable Certificate of Ownership
   ========================================================================== */


/* ==========================================================================
   9. Smart Contracts in Real Estate: Companion plate for the 7-feature
   comparison table (Execution, Trust Requirement, Involvement of
   Intermediaries, Timeframe for Transactions, Cost, Dispute Resolution,
   Data Security)
   ========================================================================== */


export function BankLoanSimulatorInteractive() {
  const [score, setScore] = React.useState(740);
  const approved = score >= 680;
  const activeTone = approved ? SIGNAL : COUNTER;
  const barW = r2(((score - 550) / 300) * 104);
  const threshX = r2(148 + ((680 - 550) / 300) * 104);

  return (
    <Plate
      w={400}
      h={314}
      title={`Interactive Bank Loan Smart Contract: applicant submits loan application on the left, smart contract on the center screen checks identity and credit score (${score} vs 680 threshold), resulting in ${approved ? "automatic loan disbursement in minutes" : "application hold below threshold"}`}
    >
      {/* Status readout badge */}
      <rect x={18} y={12} width={246} height={32} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={141} y={33} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
        {approved ? `Score ${score} ≥ 680 → Auto-Disbursed` : `Score ${score} < 680 → Conditions Unmet`}
      </text>

      {/* Step 1: Loan application submitted */}
      <Doc x={26} y={76} k={0.5} />
      <text x={48} y={212} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        1. Apply
      </text>

      <Pointer x1={84} y1={108} x2={120} y2={108} w={3.5} head={9} color={activeTone} />

      {/* Step 2: Smart contract verifies identity, credit score, and conditions */}
      <Monitor x={126} y={52} w={148} h={104}>
        <text x={200} y={78} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
          ID &amp; Docs: Verified
        </text>
        <rect x={148} y={90} width={104} height={14} fill={WHITE} stroke={INK} strokeWidth={1.8} />
        <rect x={148} y={90} width={barW} height={14} fill={activeTone} />
        <path d={`M ${threshX} 86 V 108`} stroke={INK} strokeWidth={2.5} />
        <text x={200} y={126} textAnchor="middle" {...HEAD} fontSize={13.5} fill={INK}>
          {approved ? "Days → Minutes" : "Score < 680"}
        </text>
      </Monitor>
      <text x={200} y={212} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        2. Smart Contract
      </text>

      <Pointer x1={280} y1={108} x2={316} y2={108} w={3.5} head={9} color={activeTone} />

      {/* Step 3: Automatic loan disbursement upon confirmation */}
      {approved ? (
        <Coins x={352} y={138} n={4} />
      ) : (
        <rect x={324} y={84} width={56} height={48} fill={INK} fillOpacity={0.05} stroke={INK} strokeWidth={1.5} />
      )}
      {!approved && (
        <text x={352} y={113} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
          Hold
        </text>
      )}
      <text x={352} y={212} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        {approved ? "3. Disbursed" : "3. Paused"}
      </text>

      {/* Credit Score slider */}
      <text x={26} y={246} {...BODY} fontSize={14.5} fill={INK}>
        Credit Score: {score} (Threshold: 680)
      </text>
      <path d="M 32 276 H 368" stroke={INK} strokeWidth={4} />
      <Knob
        x={32}
        y={276}
        len={336}
        value={score}
        min={550}
        max={850}
        step={10}
        tone={activeTone}
        label="Applicant credit score"
        onChange={setScore}
      />
    </Plate>
  );
}

/* ==========================================================================
   12. Smart Contracts in Legal Contracts: Three selectable columns pairing
   Traditional Legal Issues (top, in blue) with Smart Contract Enforcement
   (bottom):
   1. Complexity & Length -> Automated Transactions,
   2. Need for Legal Intervention -> Examples of Conditions,
   3. Disputes & Misinterpretations -> Built-in Mechanisms
   ========================================================================== */


/* ==========================================================================
   13. Smart Contracts in Voting Systems: Five selectable mechanisms:
   1. Immutable Ledger, 2. Decentralization, 3. Automated Vote Counting,
   4. Transparent Validation, 5. Condition-Based Execution
   ========================================================================== */


/* ==========================================================================
   14. Smart Contracts in Intellectual Property Management, Four selectable
   panels: 1. Traditional IP Challenges, 2. Self-Executing Terms,
   3. Immutable First-Creator Record, 4. Automated Licensing & Royalties
   ========================================================================== */


/* ==========================================================================
   15. Other Use Cases of Smart Contracts: Three selectable panels:
   1. Crowdfunding (milestone fund release),
   2. Donations and Charity (Bitcoin disaster relief purchase tracking),
   3. Education (automatic certificate issuance upon course completion)
   ========================================================================== */

