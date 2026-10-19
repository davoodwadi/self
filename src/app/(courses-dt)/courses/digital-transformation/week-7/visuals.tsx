"use client";

/* ==========================================================================
   Week 7 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     · Person                — every human (bust in profile)
     · Shop                  — the business / supplier / merchant
     · Doc                   — paper record, deed, contract, or documentation
     · Coins                 — payment / funds / loan disbursement / royalties
     · Monitor / MiniScreen  — anything digital (blockchain node, smart contract)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React from "react";
import {
  LockKey,
  ShieldCheck,
  Eye,
  Bank,
  Cloud,
  CheckCircle,
  Gear,
  FileCode,
  Globe,
  Lightning,
  House,
  Gavel,
  CheckSquareOffset,
  Lightbulb,
  UsersThree,
  GraduationCap,
  Truck,
  Package,
  Broadcast,
  ArrowsClockwise,
  Crown,
  Certificate,
  Clock,
  Warning,
  IdentificationCard,
  CurrencyBtc,
  FirstAid,
  Handshake,
  Scales,
} from "@phosphor-icons/react";
import {
  CREAM,
  INK,
  SIGNAL,
  COUNTER,
  COUNTER_FILL,
  r2,
  Plate,
  Monitor,
  MiniScreen,
  Arrow,
  Pointer,
  Knob,
} from "../_visuals/kit";
import { Person, Shop, Doc, Coins } from "../_visuals/objects";

const HEAD = { fontFamily: "var(--font-heading)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-body)", fontWeight: 600 } as const;

/* ==========================================================================
   1 · Hero — Peer-to-peer digital transaction recorded on a framed screen
   holding a chain of cryptographically linked blocks
   ========================================================================== */

export function HeroBlockchainLedger() {
  return (
    <Plate
      w={520}
      h={340}
      title="Two people in profile exchange a transaction document on the left; a red arrow points into a framed screen holding three chained blocks (Block 1, Block 2, and a red verified Block 3)"
    >
      {/* Two transacting parties and their transaction record on the left */}
      <Person x={52} y={16} k={0.72} hair="bob" />
      <Doc x={32} y={110} k={0.46} />
      <Person x={52} y={188} k={0.72} hair="crop" flip />

      <Arrow x1={98} x2={154} y={148} color={SIGNAL} />

      {/* Framed digital screen holding the blockchain */}
      <Monitor x={164} y={18} w={338} h={268}>
        <text x={333} y={54} textAnchor="middle" {...HEAD} fontSize={19} fill={INK}>
          Blockchain Ledger
        </text>

        {/* Block 1 */}
        <rect x={188} y={80} width={72} height={116} fill={INK} />
        <text x={224} y={108} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
          Block 1
        </text>
        <LockKey x={208} y={122} size={32} weight="fill" color={CREAM} />
        <rect x={202} y={166} width={44} height={6} fill={CREAM} />
        <rect x={202} y={178} width={30} height={6} fill={CREAM} />

        {/* Chain link 1 -> 2 */}
        <Pointer x1={263} y1={138} x2={294} y2={138} w={3.5} head={10} color={INK} />

        {/* Block 2 */}
        <rect x={297} y={80} width={72} height={116} fill={INK} />
        <text x={333} y={108} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
          Block 2
        </text>
        <LockKey x={317} y={122} size={32} weight="fill" color={CREAM} />
        <rect x={311} y={166} width={44} height={6} fill={CREAM} />
        <rect x={311} y={178} width={30} height={6} fill={CREAM} />

        {/* Chain link 2 -> 3 */}
        <Pointer x1={372} y1={138} x2={403} y2={138} w={3.5} head={10} color={SIGNAL} />

        {/* Block 3 (newly validated & immutable, SIGNAL red) */}
        <rect x={406} y={80} width={72} height={116} fill={SIGNAL} />
        <text x={442} y={108} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
          Block 3
        </text>
        <ShieldCheck x={426} y={122} size={32} weight="fill" color={CREAM} />
        <rect x={420} y={166} width={44} height={6} fill={CREAM} />
        <rect x={420} y={178} width={30} height={6} fill={CREAM} />

        {/* Footer caption inside monitor */}
        <text x={333} y={238} textAnchor="middle" {...BODY} fontSize={15} fill={INK}>
          Secure · Transparent · Immutable
        </text>
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   2 · Blockchain and Why It Matters — Three selectable pillars:
   1. Security (securely), 2. Transparency (transparently),
   3. Efficiency (difficult to alter / no intermediaries)
   ========================================================================== */

const PILLAR_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, label: "1. Security" },
  { idx: 1, x0: 280, x1: 520, cx: 400, label: "2. Transparency" },
  { idx: 2, x0: 540, x1: 780, cx: 660, label: "3. Efficiency" },
];

export function BlockchainPillarsInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const t0 = active === 0 ? SIGNAL : INK;
  const t1 = active === 1 ? SIGNAL : INK;
  const t2 = active === 2 ? SIGNAL : INK;
  const activeName = PILLAR_ZONES[active]?.label ?? "1. Security";

  return (
    <Plate
      w={800}
      h={252}
      title={`Three selectable panels showing why blockchain matters: 1. Security (a transaction document entering a framed screen guarded by a cryptographic shield and lock), 2. Transparency (two participants viewing the same shared ledger screen), and 3. Efficiency (two participants transacting directly on a locked ledger while bypassing a crossed-out intermediary bank); ${activeName} is selected in red`}
    >
      <path d="M 270 18 V 192 M 530 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Panel 1: Security — transaction document -> framed screen with shield & lock */}
      <Doc x={38} y={56} k={0.52} tone={t0} />
      <Pointer x1={94} y1={86} x2={132} y2={86} w={3.5} head={10} color={t0} />
      <Monitor x={138} y={36} w={112} h={84}>
        <ShieldCheck x={156} y={60} size={36} weight="fill" color={t0} />
        <LockKey x={198} y={60} size={34} weight="fill" color={t0} />
      </Monitor>
      <text x={140} y={178} textAnchor="middle" {...BODY} fontSize={14.5} fill={t0}>
        Records securely
      </text>

      {/* Panel 2: Transparency — two participants viewing the same shared screen */}
      <Person x={308} y={56} k={0.72} hair="bob" />
      <MiniScreen x={358} y={44}>
        <Eye x={383} y={55} size={34} weight="fill" color={t1} />
      </MiniScreen>
      <Person x={492} y={56} k={0.72} hair="crop" flip />
      <text x={400} y={178} textAnchor="middle" {...BODY} fontSize={14.5} fill={t1}>
        Records transparently
      </text>

      {/* Panel 3: Efficiency — direct peer-to-peer transfer bypassing intermediary */}
      <Bank x={642} y={24} size={36} weight="fill" color={COUNTER} />
      <path d="M 636 22 L 684 62" stroke={SIGNAL} strokeWidth={4} />
      <Person x={574} y={62} k={0.72} hair="bun" />
      <Pointer x1={612} y1={104} x2={708} y2={104} w={4} head={12} color={t2} />
      <Person x={746} y={62} k={0.72} hair="crop" flip />
      <text x={660} y={178} textAnchor="middle" {...BODY} fontSize={14.5} fill={t2}>
        Difficult to alter · No middleman
      </text>

      {/* Interactive selector tabs at bottom */}
      {PILLAR_ZONES.map((z) => {
        const isLit = z.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={z.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.label}
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
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={18} fill={CREAM}>
              {z.label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function BlockchainPillarsTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const rows = [
    { idx: 0, y0: 14, label: "1. Security", sub: "Records securely" },
    { idx: 1, y0: 112, label: "2. Transparency", sub: "Records transparently" },
    { idx: 2, y0: 210, label: "3. Efficiency", sub: "Difficult to alter" },
  ];
  return (
    <Plate
      w={400}
      h={308}
      title={`Three stacked selectable rows for 1. Security, 2. Transparency, and 3. Efficiency; ${rows[active]?.label ?? "1. Security"} is selected in red`}
    >
      {rows.map((r) => {
        const isLit = r.idx === active;
        const tone = isLit ? SIGNAL : INK;
        return (
          <g
            key={r.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={r.label}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(r.idx) : undefined}
          >
            <rect x={16} y={r.y0} width={368} height={84} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={r.y0} width={172} height={84} fill={tone} />
            <text x={102} y={r.y0 + 38} textAnchor="middle" {...HEAD} fontSize={17} fill={CREAM}>
              {r.label}
            </text>
            <text x={102} y={r.y0 + 60} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              {r.sub}
            </text>
            {r.idx === 0 && <ShieldCheck x={262} y={r.y0 + 22} size={40} weight="fill" color={tone} />}
            {r.idx === 1 && <Eye x={262} y={r.y0 + 22} size={40} weight="fill" color={tone} />}
            {r.idx === 2 && <LockKey x={262} y={r.y0 + 22} size={40} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   3 · Features of Blockchain — Four selectable features:
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
      title={`Four selectable panels for Features of Blockchain: 1. Decentralized (a blue centralized cloud hub contrasted with a peer-to-peer mesh of four nodes), 2. Immutable (chained blocks locked inside a framed screen), 3. Consensus (three network nodes with check marks agreeing on a transaction block), and 4. Programmable (a framed screen executing coded conditions); ${current.tab} is selected in red`}
    >
      <path d="M 205 18 V 198 M 400 18 V 198 M 595 18 V 198" stroke={INK} strokeWidth={1.8} strokeDasharray="4 5" />

      {/* 1. Decentralized: Cloud hub (blue contrast) vs P2P mesh */}
      <Cloud x={44} y={34} size={32} weight="fill" color={COUNTER} />
      <path d="M 52 68 L 40 94 M 68 68 L 80 94" stroke={COUNTER} strokeWidth={2.5} />
      <circle cx={40} cy={98} r={5.5} fill={COUNTER} />
      <circle cx={80} cy={98} r={5.5} fill={COUNTER} />
      <text x={60} y={124} textAnchor="middle" {...BODY} fontSize={12.5} fill={COUNTER}>
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
        <rect key={i} x={nx - 8} y={ny - 8} width={16} height={16} fill={toneOf(0)} stroke={CREAM} strokeWidth={2} />
      ))}
      <text x={145} y={124} textAnchor="middle" {...BODY} fontSize={12.5} fill={toneOf(0)}>
        P2P Nodes
      </text>

      {/* 2. Immutable: Chained blocks locked in a Monitor */}
      <Monitor x={237} y={24} w={131} h={96}>
        <rect x={251} y={48} width={32} height={44} fill={toneOf(1)} />
        <LockKey x={256} y={59} size={22} weight="fill" color={CREAM} />
        <Pointer x1={286} y1={70} x2={318} y2={70} w={3} head={8} color={toneOf(1)} />
        <rect x={321} y={48} width={32} height={44} fill={toneOf(1)} />
        <LockKey x={326} y={59} size={22} weight="fill" color={CREAM} />
      </Monitor>

      {/* 3. Consensus: Three nodes agreeing on a validated block */}
      {[448, 497.5, 547].map((cx) => (
        <g key={cx}>
          <CheckCircle x={r2(cx - 15)} y={26} size={30} weight="fill" color={toneOf(2)} />
          <Pointer x1={cx} y1={60} x2={cx} y2={102} w={3} head={9} color={toneOf(2)} />
        </g>
      ))}
      <rect x={432} y={106} width={131} height={36} fill={toneOf(2)} />
      <text x={497.5} y={129} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
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
            <text x={z.cx} y={182} textAnchor="middle" {...BODY} fontSize={14.5} fill={tone}>
              {z.sub}
            </text>
            <rect x={z.x0} y={210} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={235} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
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
      title={`Four stacked selectable rows for Features of Blockchain: 1. Decentralized, 2. Immutable, 3. Consensus, and 4. Programmable; ${FEATURE_ZONES[active]?.tab ?? "1. Decentralized"} is selected`}
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
            <rect x={16} y={y0} width={172} height={84} fill={tone} />
            <text x={102} y={y0 + 38} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
              {z.tab}
            </text>
            <text x={102} y={y0 + 60} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
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
   4 · Smart Contracts — Interactive 3-stage pipeline:
   1. Agreement in Code, 2. Stored & Replicated (Ethereum, Solana),
   3. Self-Executing Program
   ========================================================================== */

const SC_STAGE_ZONES = [
  { idx: 0, x0: 20, x1: 256, cx: 138, tab: "1. Terms in Code", sub: "Agreement → Code" },
  { idx: 1, x0: 282, x1: 518, cx: 400, tab: "2. On Blockchain", sub: "Solana · Ethereum" },
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
      title={`Three selectable stages of a Smart Contract: 1. Terms in Code (a written agreement translated into lines of code), 2. On Blockchain (replicated across nodes on networks such as Solana and Ethereum), and 3. Self-Executing (automatically executing payment when conditions are met); ${cur.tab} is selected in red`}
    >
      <path d="M 269 18 V 192 M 531 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Stage 1: Agreement written directly into lines of code */}
      <Doc x={42} y={42} k={0.56} tone={toneOf(0)} />
      <Pointer x1={104} y1={76} x2={142} y2={76} w={3.5} head={10} color={toneOf(0)} />
      <MiniScreen x={148} y={42}>
        <FileCode x={173} y={53} size={34} weight="fill" color={toneOf(0)} />
      </MiniScreen>
      <text x={138} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={toneOf(0)}>
        {SC_STAGE_ZONES[0].sub}
      </text>

      {/* Stage 2: Stored and replicated on a blockchain (Solana, Ethereum) */}
      <Monitor x={306} y={24} w={188} h={108}>
        <rect x={326} y={46} width={66} height={34} fill={toneOf(1)} />
        <text x={359} y={68} textAnchor="middle" {...BODY} fontSize={12.5} fill={CREAM}>
          Ethereum
        </text>
        <rect x={408} y={46} width={66} height={34} fill={toneOf(1)} />
        <text x={441} y={68} textAnchor="middle" {...BODY} fontSize={12.5} fill={CREAM}>
          Solana
        </text>
        <text x={400} y={104} textAnchor="middle" {...BODY} fontSize={13} fill={toneOf(1)}>
          Replicated Nodes
        </text>
      </Monitor>
      <text x={400} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={toneOf(1)}>
        {SC_STAGE_ZONES[1].sub}
      </text>

      {/* Stage 3: Self-executing program when conditions are met */}
      <MiniScreen x={560} y={42}>
        <CheckCircle x={574} y={55} size={28} weight="fill" color={toneOf(2)} />
        <Gear x={604} y={55} size={28} weight="fill" color={toneOf(2)} />
      </MiniScreen>
      <Pointer x1={652} y1={72} x2={696} y2={72} w={4} head={11} color={toneOf(2)} />
      <Coins x={732} y={114} n={4} />
      <text x={662} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={toneOf(2)}>
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
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={17.5} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   5 · Question: Use Cases for Immutability and Programmability of Smart
   Contracts — Interactive 7-domain explorer
   ========================================================================== */

const USE_CASES_META = [
  { idx: 0, tab: "1. Deed", name: "Deed management", code: "Auto Title Transfer", out: "Verified Deed", Icon: House },
  { idx: 1, tab: "2. Legal", name: "Legal contracts", code: "Coded Terms Met", out: "Enforced Agreement", Icon: Gavel },
  { idx: 2, tab: "3. Voting", name: "Voting Systems", code: "Eligible & Tallied", out: "Tamper-Proof Count", Icon: CheckSquareOffset },
  { idx: 3, tab: "4. IP", name: "Intellectual Property", code: "Timestamp & License", out: "Automated Royalties", Icon: Lightbulb },
  { idx: 4, tab: "5. Crowdfund", name: "Crowdfunding", code: "Milestone Reached", out: "Funds Released", Icon: UsersThree },
  { idx: 5, tab: "6. Insurance", name: "Insurance", code: "Claim Verified", out: "Instant Payout", Icon: ShieldCheck },
  { idx: 6, tab: "7. Education", name: "Education", code: "Course Completed", out: "Issued Certificate", Icon: GraduationCap },
];

export function SmartContractUseCasesInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cur = USE_CASES_META[active] ?? USE_CASES_META[0];
  const Icon = cur.Icon;

  return (
    <Plate
      w={800}
      h={246}
      title={`Interactive 7-domain explorer for the immutability and programmability of smart contracts: ${cur.name} uses a programmable smart contract (${cur.code}) to produce ${cur.out}`}
    >
      {/* Top row: 7 clickable domain buttons */}
      {USE_CASES_META.map((u, i) => {
        const bx = r2(20 + i * 109.5);
        const isLit = i === active;
        return (
          <g
            key={u.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={u.name}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
          >
            <rect x={bx} y={14} width={103} height={38} fill={isLit ? SIGNAL : INK} />
            <text x={r2(bx + 51.5)} y={38} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
              {u.tab}
            </text>
          </g>
        );
      })}

      {/* Left: Domain icon and name */}
      <Icon x={92} y={96} size={60} weight="fill" color={SIGNAL} />
      <text x={122} y={188} textAnchor="middle" {...HEAD} fontSize={16} fill={INK}>
        {cur.name}
      </text>

      <Pointer x1={196} y1={132} x2={266} y2={132} w={4} head={12} color={SIGNAL} />

      {/* Center: Framed Smart Contract Monitor */}
      <Monitor x={276} y={70} w={232} h={118}>
        <text x={392} y={104} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
          Immutable · Programmable
        </text>
        <rect x={304} y={118} width={176} height={38} fill={SIGNAL} />
        <text x={392} y={142} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
          {cur.code}
        </text>
      </Monitor>

      <Pointer x1={520} y1={132} x2={578} y2={132} w={4} head={12} color={SIGNAL} />

      {/* Right: Automated outcome box */}
      <rect x={588} y={88} width={192} height={84} fill={INK} />
      <text x={684} y={122} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
        Automated Outcome
      </text>
      <text x={684} y={148} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
        {cur.out}
      </text>
    </Plate>
  );
}

export function SmartContractUseCasesTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const cur = USE_CASES_META[active] ?? USE_CASES_META[0];
  return (
    <Plate
      w={400}
      h={232}
      title={`Interactive 7-domain selector for smart contract use cases; ${cur.name} is selected`}
    >
      {USE_CASES_META.map((u, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const bx = 18 + col * 92;
        const by = 14 + row * 46;
        const isLit = i === active;
        return (
          <g
            key={u.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={u.name}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={bx} y={by} width={86} height={38} fill={isLit ? SIGNAL : INK} />
            <text x={bx + 43} y={by + 24} textAnchor="middle" {...HEAD} fontSize={13} fill={CREAM}>
              {u.tab}
            </text>
          </g>
        );
      })}
      <rect x={18} y={120} width={364} height={92} fill={SIGNAL} />
      <text x={200} y={156} textAnchor="middle" {...HEAD} fontSize={18} fill={CREAM}>
        {cur.name}
      </text>
      <text x={200} y={186} textAnchor="middle" {...BODY} fontSize={15} fill={CREAM}>
        {cur.code} → {cur.out}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   6 · Smart Contracts in Supply Chain Management — Three selectable columns
   contrasting Traditional Issues (blue) with Smart Contract Solutions (red):
   1. Automation (vs. Manual delays), 2. Transparency (vs. Tracking gaps),
   3. Trust (vs. Mistrust)
   ========================================================================== */

const SC_SUPPLY_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, tab: "1. Automation", issue: "Manual Delays" },
  { idx: 1, x0: 280, x1: 520, cx: 400, tab: "2. Transparency", issue: "Tracking Gaps" },
  { idx: 2, x0: 540, x1: 780, cx: 660, tab: "3. Trust", issue: "Mistrust" },
];

export function SupplyChainComparisonInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = SC_SUPPLY_ZONES[active] ?? SC_SUPPLY_ZONES[0];

  return (
    <Plate
      w={800}
      h={258}
      title={`Three selectable columns contrasting Traditional Supply Chain Issues (top, in blue) with Smart Contract Solutions (bottom): 1. Automation (replacing manual payment delays with automated delivery payout), 2. Transparency (replacing tracking inefficiencies with real-time sensor monitoring), and 3. Trust (replacing supplier-buyer mistrust with direct verified terms); ${cur.tab} is selected in red`}
    >
      <path d="M 270 18 V 196 M 530 18 V 196" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Column 1: Manual Delays -> Automation */}
      <Doc x={48} y={22} k={0.42} tone={COUNTER} />
      <Clock x={96} y={28} size={34} weight="fill" color={COUNTER} />
      <text x={190} y={50} textAnchor="middle" {...BODY} fontSize={13.5} fill={COUNTER}>
        Manual Delays
      </text>
      <Pointer x1={140} y1={74} x2={140} y2={104} w={3.5} head={9} color={toneOf(0)} />
      <MiniScreen x={98} y={110}>
        <Package x={112} y={124} size={28} weight="fill" color={toneOf(0)} />
        <Lightning x={142} y={124} size={28} weight="fill" color={toneOf(0)} />
      </MiniScreen>
      <Coins x={218} y={166} n={3} />

      {/* Column 2: Tracking Inefficiencies -> Real-Time Transparency */}
      <Truck x={312} y={26} size={38} weight="fill" color={COUNTER} />
      <Warning x={358} y={28} size={34} weight="fill" color={COUNTER} />
      <text x={448} y={50} textAnchor="middle" {...BODY} fontSize={13.5} fill={COUNTER}>
        Tracking Gaps
      </text>
      <Pointer x1={400} y1={74} x2={400} y2={104} w={3.5} head={9} color={toneOf(1)} />
      <MiniScreen x={358} y={110}>
        <Broadcast x={372} y={124} size={28} weight="fill" color={toneOf(1)} />
        <Truck x={402} y={124} size={28} weight="fill" color={toneOf(1)} />
      </MiniScreen>

      {/* Column 3: Mistrust -> Direct Verified Trust */}
      <Shop x={558} y={24} k={0.28} tone={COUNTER} />
      <Warning x={616} y={28} size={34} weight="fill" color={COUNTER} />
      <text x={710} y={50} textAnchor="middle" {...BODY} fontSize={13.5} fill={COUNTER}>
        Mistrust
      </text>
      <Pointer x1={660} y1={74} x2={660} y2={104} w={3.5} head={9} color={toneOf(2)} />
      <MiniScreen x={618} y={110}>
        <Handshake x={645} y={123} size={30} weight="fill" color={toneOf(2)} />
      </MiniScreen>

      {/* Bottom selector buttons */}
      {SC_SUPPLY_ZONES.map((z) => {
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
            <rect x={z.x0} y={206} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={230} textAnchor="middle" {...HEAD} fontSize={17.5} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function SupplyChainComparisonTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={296}
      title={`Three stacked selectable rows for Supply Chain Smart Contracts: 1. Automation, 2. Transparency, and 3. Trust; ${SC_SUPPLY_ZONES[active]?.tab ?? "1. Automation"} is selected`}
    >
      {SC_SUPPLY_ZONES.map((z, i) => {
        const y0 = 14 + i * 92;
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
            <rect x={16} y={y0} width={368} height={80} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={186} height={80} fill={tone} />
            <text x={109} y={y0 + 36} textAnchor="middle" {...HEAD} fontSize={17} fill={CREAM}>
              {z.tab}
            </text>
            <text x={109} y={y0 + 58} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              Fixes: {z.issue}
            </text>
            {i === 0 && <Package x={274} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 1 && <Broadcast x={274} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 2 && <Handshake x={274} y={y0 + 20} size={40} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   7 · Case Study: Amazon — Five selectable process stages integrating Smart
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
      title={`Five selectable stages of Amazon's supply chain smart contract process: 1. Order Placement (buyer triggers smart contract), 2. Shipment Tracking (IoT sensors monitor truck and update blockchain), 3. Delivery Confirmation (smart contract releases payment to supplier), 4. Documentation (immutable ledger record), and 5. Post-purchase Services (support and returns); ${cur.tab} is selected in red`}
    >
      {/* 1. Order Placement */}
      <Person x={88} y={20} k={0.62} hair="bob" />
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
            <rect x={z.x0} y={204} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={228} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
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
      title={`Five stacked selectable rows for Amazon's supply chain smart contract process; ${AMAZON_STEPS[active]?.tab ?? "1. Order"} is selected`}
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
            <rect x={16} y={y0} width={160} height={52} fill={tone} />
            <text x={96} y={y0 + 32} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
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
   8 · NFTs (Non-Fungible Tokens) — Three selectable rows:
   1. 2021 Surge & Celebrity Adoption, 2. Status Signaling,
   3. Verifiable Certificate of Ownership
   ========================================================================== */

const NFT_ROWS = [
  { idx: 0, y0: 14, label: "1. 2021 Surge", sub: "Celebrity Adoption" },
  { idx: 1, y0: 120, label: "2. Status Signaling", sub: "Digital Identity" },
  { idx: 2, y0: 226, label: "3. Ownership", sub: "Verified Certificate" },
];

export function NftOverviewInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);

  return (
    <Plate
      w={400}
      h={334}
      title={`Three selectable rows illustrating Non-Fungible Tokens (NFTs): 1. 2021 Surge (rising adoption bars on a screen with celebrity adoption), 2. Status Signaling (a crown badge on a screen linked to a person), and 3. Ownership (a digital certificate on a screen verifying asset ownership); ${NFT_ROWS[active]?.label ?? "1. 2021 Surge"} is selected in red`}
    >
      {NFT_ROWS.map((r, i) => {
        const isLit = i === active;
        const tone = toneOf(i);
        return (
          <g
            key={r.label}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={`${r.label}: ${r.sub}`}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
          >
            <rect x={14} y={r.y0} width={372} height={94} fill="none" stroke={tone} strokeWidth={isLit ? 3.5 : 1.8} />

            {/* Left: Framed MiniScreen */}
            <MiniScreen x={26} y={r.y0 + 12}>
              {i === 0 && (
                <>
                  <rect x={44} y={r.y0 + 44} width={10} height={14} fill={tone} />
                  <rect x={60} y={r.y0 + 36} width={10} height={22} fill={tone} />
                  <rect x={76} y={r.y0 + 24} width={12} height={34} fill={tone} />
                </>
              )}
              {i === 1 && <Crown x={53} y={r.y0 + 25} size={30} weight="fill" color={tone} />}
              {i === 2 && <Certificate x={53} y={r.y0 + 25} size={30} weight="fill" color={tone} />}
            </MiniScreen>

            <Pointer x1={116} y1={r.y0 + 46} x2={150} y2={r.y0 + 46} w={3.5} head={9} color={tone} />

            {/* Middle: Physical/human counterpart */}
            {i === 0 && <Person x={182} y={r.y0 + 16} k={0.62} hair="bob" />}
            {i === 1 && <Person x={182} y={r.y0 + 16} k={0.62} hair="crop" />}
            {i === 2 && <House x={163} y={r.y0 + 27} size={38} weight="fill" color={tone} />}

            {/* Right: Label badge */}
            <rect x={224} y={r.y0 + 18} width={150} height={58} fill={tone} />
            <text x={299} y={r.y0 + 44} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
              {r.label}
            </text>
            <text x={299} y={r.y0 + 63} textAnchor="middle" {...BODY} fontSize={12.5} fill={CREAM}>
              {r.sub}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   9 · Smart Contracts in Real Estate — Companion plate for the 7-feature
   comparison table (Execution, Trust Requirement, Involvement of
   Intermediaries, Timeframe for Transactions, Cost, Dispute Resolution,
   Data Security)
   ========================================================================== */

const RE_FEATURES = [
  "Execution",
  "Trust Requirement",
  "Intermediaries",
  "Timeframe",
  "Cost",
  "Dispute Resolution",
  "Data Security",
] as const;

export function RealEstateComparisonPlate({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const feat = RE_FEATURES[active] ?? "Execution";

  return (
    <Plate
      w={400}
      h={314}
      title={`Visual comparison of Traditional Contracts (top, in blue) and Smart Contracts (bottom, in red) in Real Estate for feature ${active + 1}: ${feat}`}
    >
      {/* Feature header bar */}
      <rect x={18} y={14} width={364} height={34} fill={INK} />
      <text x={200} y={37} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
        {active + 1}. {feat}
      </text>

      {/* TOP HALF: Traditional Contracts (COUNTER blue) */}
      <text x={22} y={96} {...HEAD} fontSize={16.5} fill={COUNTER}>
        Traditional
      </text>
      {active === 0 && <Doc x={166} y={58} k={0.52} tone={COUNTER} />}
      {active === 1 && <Person x={190} y={56} k={0.64} hair="crop" />}
      {active === 2 && (
        <>
          <Person x={172} y={58} k={0.58} hair="bob" />
          <Person x={212} y={58} k={0.58} hair="crop" gap />
        </>
      )}
      {active === 3 && <Clock x={168} y={66} size={46} weight="fill" color={COUNTER} />}
      {active === 4 && (
        <>
          <rect x={168} y={66} width={44} height={12} rx={5} fill={COUNTER} />
          <rect x={168} y={81} width={44} height={12} rx={5} fill={COUNTER} />
          <rect x={168} y={96} width={44} height={12} rx={5} fill={COUNTER} />
          <rect x={168} y={111} width={44} height={12} rx={5} fill={COUNTER} />
        </>
      )}
      {active === 5 && <Gavel x={168} y={66} size={46} weight="fill" color={COUNTER} />}
      {active === 6 && <Warning x={168} y={66} size={46} weight="fill" color={COUNTER} />}

      <text x={252} y={96} {...BODY} fontSize={13.5} fill={COUNTER}>
        {active === 0 && "Manual · Paper"}
        {active === 1 && "Brokers · Lawyers"}
        {active === 2 && "Multiple Parties"}
        {active === 3 && "Weeks to Months"}
        {active === 4 && "High 3rd-Party Fees"}
        {active === 5 && "Court · Mediation"}
        {active === 6 && "Forgery Risk"}
      </text>

      <path d="M 18 144 H 382" stroke={INK} strokeWidth={1.8} strokeDasharray="4 4" />

      {/* BOTTOM HALF: Smart Contracts (SIGNAL red) */}
      <text x={22} y={196} {...HEAD} fontSize={16.5} fill={SIGNAL}>
        Smart Contract
      </text>
      <MiniScreen x={148} y={156}>
        {active === 0 && <Gear x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
        {active === 1 && <ShieldCheck x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
        {active === 2 && <Lightning x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
        {active === 3 && <Clock x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
        {active === 4 && <CheckCircle x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
        {active === 5 && <FileCode x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
        {active === 6 && <LockKey x={175} y={169} size={30} weight="fill" color={SIGNAL} />}
      </MiniScreen>

      <text x={252} y={196} {...BODY} fontSize={13.5} fill={SIGNAL}>
        {active === 0 && "Auto-Executed"}
        {active === 1 && "Blockchain Trust"}
        {active === 2 && "No Middlemen"}
        {active === 3 && "Minutes to Hours"}
        {active === 4 && "Low Fees"}
        {active === 5 && "Built-In Rules"}
        {active === 6 && "Immutable Record"}
      </text>

      {/* 7 selector buttons along the bottom */}
      {RE_FEATURES.map((name, i) => {
        const bx = r2(18 + i * 52.5);
        const isLit = i === active;
        return (
          <g
            key={name}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={`${i + 1}. ${name}`}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <rect x={bx} y={258} width={47} height={38} fill={isLit ? SIGNAL : INK} />
            <text x={r2(bx + 23.5)} y={282} textAnchor="middle" {...HEAD} fontSize={14.5} fill={CREAM}>
              {i + 1}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   10 · Smart Contracts in Financial Services — Three selectable panels:
   1. Issues of Traditional Systems, 2. Automate Loans & Claims,
   3. Enhance Transparency
   ========================================================================== */

const FIN_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, tab: "1. Traditional Issues", sub: "Costly · Lengthy" },
  { idx: 1, x0: 280, x1: 520, cx: 400, tab: "2. Auto-Disbursement", sub: "Loans & Claims" },
  { idx: 2, x0: 540, x1: 780, cx: 660, tab: "3. Transparency", sub: "Reduces Disputes" },
];

export function FinancialServicesInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const tone0 = active === 0 ? COUNTER : INK;
  const tone1 = active === 1 ? SIGNAL : INK;
  const tone2 = active === 2 ? SIGNAL : INK;
  const cur = FIN_ZONES[active] ?? FIN_ZONES[0];

  return (
    <Plate
      w={800}
      h={256}
      title={`Three selectable panels for Smart Contracts in Financial Services: 1. Traditional Issues (costly manual paperwork and lengthy processing times), 2. Auto-Disbursement (credit score and claim verification triggering automated payout on a framed screen), and 3. Transparency (customer and bank viewing the same shared ledger screen to reduce disputes); ${cur.tab} is selected`}
    >
      <path d="M 270 18 V 192 M 530 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* 1. Issues of Traditional Systems (COUNTER blue contrast) */}
      <Doc x={42} y={42} k={0.5} tone={tone0} />
      <Clock x={108} y={52} size={38} weight="fill" color={tone0} />
      <Person x={200} y={38} k={0.72} hair="crop" flip />
      <text x={140} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={tone0}>
        {FIN_ZONES[0].sub}
      </text>

      {/* 2. Automate Loan Disbursements & Insurance Claims */}
      <IdentificationCard x={286} y={38} size={32} weight="fill" color={tone1} />
      <ShieldCheck x={286} y={84} size={32} weight="fill" color={tone1} />
      <Pointer x1={322} y1={76} x2={346} y2={76} w={3.5} head={8} color={tone1} />
      <MiniScreen x={350} y={42}>
        <Gear x={377} y={55} size={30} weight="fill" color={tone1} />
      </MiniScreen>
      <Pointer x1={438} y1={76} x2={462} y2={76} w={3.5} head={8} color={tone1} />
      <Coins x={490} y={108} n={3} />
      <text x={400} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={tone1}>
        {FIN_ZONES[1].sub}
      </text>

      {/* 3. Enhance Transparency */}
      <Person x={572} y={44} k={0.68} hair="bob" />
      <MiniScreen x={618} y={42}>
        <Eye x={645} y={55} size={30} weight="fill" color={tone2} />
      </MiniScreen>
      <Bank x={720} y={52} size={42} weight="fill" color={tone2} />
      <text x={660} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={tone2}>
        {FIN_ZONES[2].sub}
      </text>

      {/* Bottom selector buttons */}
      {FIN_ZONES.map((z, i) => {
        const isLit = i === active;
        const btnTone = isLit ? (i === 0 ? COUNTER : SIGNAL) : INK;
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={btnTone} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function FinancialServicesTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={296}
      title={`Three stacked selectable rows for Smart Contracts in Financial Services; ${FIN_ZONES[active]?.tab ?? "1. Traditional Issues"} is selected`}
    >
      {FIN_ZONES.map((z, i) => {
        const y0 = 14 + i * 92;
        const isLit = i === active;
        const tone = isLit ? (i === 0 ? COUNTER : SIGNAL) : INK;
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
            <rect x={16} y={y0} width={368} height={80} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={206} height={80} fill={tone} />
            <text x={119} y={y0 + 36} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
              {z.tab}
            </text>
            <text x={119} y={y0 + 58} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              {z.sub}
            </text>
            {i === 0 && <Clock x={284} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 1 && <Gear x={284} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 2 && <Eye x={284} y={y0 + 20} size={40} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   11 · Bank Loan Approval Process — Interactive Credit Score & Smart Contract
   Loan Disbursement Simulator (SIMULATED)
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
      title={`SIMULATED. Interactive Bank Loan Smart Contract: applicant submits loan application on the left, smart contract on the center screen checks identity and credit score (${score} vs 680 threshold), resulting in ${approved ? "automatic loan disbursement in minutes" : "application hold below threshold"}`}
    >
      {/* Status readout badge */}
      <rect x={18} y={12} width={246} height={32} fill={activeTone} />
      <text x={141} y={33} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
        {approved ? `Score ${score} ≥ 680 → Auto-Disbursed` : `Score ${score} < 680 → Conditions Unmet`}
      </text>
      <text x={382} y={32} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        SIMULATED
      </text>

      {/* Step 1: Customer submits loan application */}
      <Person x={48} y={56} k={0.64} hair="bob" />
      <Doc x={30} y={132} k={0.38} />
      <text x={48} y={212} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
        1. Apply
      </text>

      <Pointer x1={84} y1={108} x2={120} y2={108} w={3.5} head={9} color={activeTone} />

      {/* Step 2: Smart contract verifies identity, credit score, and conditions */}
      <Monitor x={126} y={52} w={148} h={104}>
        <text x={200} y={78} textAnchor="middle" {...BODY} fontSize={12.5} fill={INK}>
          ID &amp; Docs: Verified
        </text>
        <rect x={148} y={90} width={104} height={14} fill={CREAM} stroke={INK} strokeWidth={1.8} />
        <rect x={148} y={90} width={barW} height={14} fill={activeTone} />
        <path d={`M ${threshX} 86 V 108`} stroke={INK} strokeWidth={2.5} />
        <text x={200} y={126} textAnchor="middle" {...HEAD} fontSize={13.5} fill={activeTone}>
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
        <rect x={324} y={84} width={56} height={48} fill={COUNTER} />
      )}
      {!approved && (
        <text x={352} y={113} textAnchor="middle" {...HEAD} fontSize={14} fill={CREAM}>
          Hold
        </text>
      )}
      <text x={352} y={212} textAnchor="middle" {...BODY} fontSize={12.5} fill={activeTone}>
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
   12 · Smart Contracts in Legal Contracts — Three selectable columns pairing
   Traditional Legal Issues (top, in blue) with Smart Contract Enforcement
   (bottom):
   1. Complexity & Length -> Automated Transactions,
   2. Need for Legal Intervention -> Examples of Conditions,
   3. Disputes & Misinterpretations -> Built-in Mechanisms
   ========================================================================== */

const LEGAL_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, tab: "1. Auto Execution", issue: "Lengthy & Convoluted" },
  { idx: 1, x0: 280, x1: 520, cx: 400, tab: "2. Coded Conditions", issue: "Court Costs & Delays" },
  { idx: 2, x0: 540, x1: 780, cx: 660, tab: "3. Built-In Rules", issue: "Ambiguity & Disputes" },
];

export function LegalContractsInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = LEGAL_ZONES[active] ?? LEGAL_ZONES[0];

  return (
    <Plate
      w={800}
      h={258}
      title={`Three selectable columns contrasting Traditional Legal Contracts (top, in blue) with Smart Contracts (bottom): 1. Auto Execution (replacing lengthy convoluted paper terms with automated execution), 2. Coded Conditions (replacing costly court intervention with verified payment and delivery milestones), and 3. Built-In Rules (replacing ambiguous disputes with algorithmic dispute resolution); ${cur.tab} is selected in red`}
    >
      <path d="M 270 18 V 196 M 530 18 V 196" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* Column 1: Complexity & Length -> Automated Transactions */}
      <Doc x={42} y={20} k={0.4} tone={COUNTER} />
      <Doc x={84} y={20} k={0.4} tone={COUNTER} />
      <text x={190} y={48} textAnchor="middle" {...BODY} fontSize={13} fill={COUNTER}>
        Convoluted Terms
      </text>
      <Pointer x1={140} y1={74} x2={140} y2={104} w={3.5} head={9} color={toneOf(0)} />
      <MiniScreen x={98} y={110}>
        <FileCode x={112} y={124} size={28} weight="fill" color={toneOf(0)} />
        <Gear x={142} y={124} size={28} weight="fill" color={toneOf(0)} />
      </MiniScreen>

      {/* Column 2: Need for Legal Intervention -> Predefined Conditions */}
      <Gavel x={306} y={26} size={36} weight="fill" color={COUNTER} />
      <Clock x={350} y={28} size={34} weight="fill" color={COUNTER} />
      <text x={450} y={48} textAnchor="middle" {...BODY} fontSize={13} fill={COUNTER}>
        Court Delays
      </text>
      <Pointer x1={400} y1={74} x2={400} y2={104} w={3.5} head={9} color={toneOf(1)} />
      <MiniScreen x={358} y={110}>
        <CheckCircle x={372} y={124} size={28} weight="fill" color={toneOf(1)} />
        <Package x={402} y={124} size={28} weight="fill" color={toneOf(1)} />
      </MiniScreen>

      {/* Column 3: Disputes & Misinterpretations -> Built-in Mechanisms */}
      <Warning x={576} y={26} size={36} weight="fill" color={COUNTER} />
      <text x={690} y={48} textAnchor="middle" {...BODY} fontSize={13} fill={COUNTER}>
        Ambiguity
      </text>
      <Pointer x1={660} y1={74} x2={660} y2={104} w={3.5} head={9} color={toneOf(2)} />
      <MiniScreen x={618} y={110}>
        <Scales x={645} y={123} size={30} weight="fill" color={toneOf(2)} />
      </MiniScreen>

      {/* Bottom selector buttons */}
      {LEGAL_ZONES.map((z) => {
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
            <rect x={z.x0} y={206} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={230} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function LegalContractsTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={296}
      title={`Three stacked selectable rows for Smart Contracts in Legal Contracts; ${LEGAL_ZONES[active]?.tab ?? "1. Auto Execution"} is selected`}
    >
      {LEGAL_ZONES.map((z, i) => {
        const y0 = 14 + i * 92;
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
            <rect x={16} y={y0} width={368} height={80} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={206} height={80} fill={tone} />
            <text x={119} y={y0 + 36} textAnchor="middle" {...HEAD} fontSize={16.5} fill={CREAM}>
              {z.tab}
            </text>
            <text x={119} y={y0 + 58} textAnchor="middle" {...BODY} fontSize={13} fill={CREAM}>
              Fixes: {z.issue}
            </text>
            {i === 0 && <FileCode x={284} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 1 && <CheckCircle x={284} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 2 && <Scales x={284} y={y0 + 20} size={40} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   13 · Smart Contracts in Voting Systems — Five selectable mechanisms:
   1. Immutable Ledger, 2. Decentralization, 3. Automated Vote Counting,
   4. Transparent Validation, 5. Condition-Based Execution
   ========================================================================== */

const VOTING_ZONES = [
  { idx: 0, x0: 16, x1: 160, cx: 88, tab: "1. Immutable", sub: "Tamper-Proof" },
  { idx: 1, x0: 172, x1: 316, cx: 244, tab: "2. Decentralized", sub: "Multi-Node" },
  { idx: 2, x0: 328, x1: 472, cx: 400, tab: "3. Auto Tally", sub: "Real-Time Count" },
  { idx: 3, x0: 484, x1: 628, cx: 556, tab: "4. Transparent", sub: "Verified Votes" },
  { idx: 4, x0: 640, x1: 784, cx: 712, tab: "5. Conditions", sub: "Eligibility Check" },
];

export function VotingSystemsInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = VOTING_ZONES[active] ?? VOTING_ZONES[0];

  return (
    <Plate
      w={800}
      h={258}
      title={`Five selectable panels for Smart Contracts in Voting Systems: 1. Immutable Ledger (ballots locked on a screen), 2. Decentralization (distributed across multiple nodes), 3. Automated Vote Counting (real-time smart contract tally), 4. Transparent Validation (stakeholders verifying the count), and 5. Condition-Based Execution (voter eligibility verification); ${cur.tab} is selected in red`}
    >
      <path
        d="M 166 18 V 194 M 322 18 V 194 M 478 18 V 194 M 634 18 V 194"
        stroke={INK}
        strokeWidth={1.6}
        strokeDasharray="4 5"
      />

      {/* 1. Immutable Ledger */}
      <CheckSquareOffset x={70} y={24} size={36} weight="fill" color={toneOf(0)} />
      <MiniScreen x={46} y={76}>
        <LockKey x={73} y={89} size={30} weight="fill" color={toneOf(0)} />
      </MiniScreen>

      {/* 2. Decentralization */}
      <Globe x={226} y={24} size={36} weight="fill" color={toneOf(1)} />
      <MiniScreen x={202} y={76}>
        <rect x={222} y={92} width={14} height={14} fill={toneOf(1)} />
        <rect x={252} y={92} width={14} height={14} fill={toneOf(1)} />
        <path d="M 236 99 H 252" stroke={toneOf(1)} strokeWidth={3} />
      </MiniScreen>

      {/* 3. Automated Vote Counting */}
      <Lightning x={382} y={24} size={36} weight="fill" color={toneOf(2)} />
      <MiniScreen x={358} y={76}>
        <rect x={378} y={104} width={10} height={16} fill={toneOf(2)} />
        <rect x={395} y={92} width={10} height={28} fill={toneOf(2)} />
        <rect x={412} y={98} width={10} height={22} fill={toneOf(2)} />
      </MiniScreen>

      {/* 4. Transparent Validation */}
      <Person x={556} y={14} k={0.54} hair="bob" />
      <MiniScreen x={514} y={76}>
        <Eye x={541} y={89} size={30} weight="fill" color={toneOf(3)} />
      </MiniScreen>

      {/* 5. Condition-Based Execution */}
      <IdentificationCard x={694} y={24} size={36} weight="fill" color={toneOf(4)} />
      <MiniScreen x={670} y={76}>
        <ShieldCheck x={697} y={89} size={30} weight="fill" color={toneOf(4)} />
      </MiniScreen>

      {/* Sub-labels & Bottom selector buttons */}
      {VOTING_ZONES.map((z) => {
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
            <text x={z.cx} y={180} textAnchor="middle" {...BODY} fontSize={13.5} fill={tone}>
              {z.sub}
            </text>
            <rect x={z.x0} y={204} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={228} textAnchor="middle" {...HEAD} fontSize={15} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function VotingSystemsTall({
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
      title={`Five stacked selectable rows for Smart Contracts in Voting Systems; ${VOTING_ZONES[active]?.tab ?? "1. Immutable"} is selected`}
    >
      {VOTING_ZONES.map((z, i) => {
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
            <rect x={16} y={y0} width={176} height={52} fill={tone} />
            <text x={104} y={y0 + 32} textAnchor="middle" {...HEAD} fontSize={16} fill={CREAM}>
              {z.tab}
            </text>
            {i === 0 && <LockKey x={274} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 1 && <Globe x={274} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 2 && <Lightning x={274} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 3 && <Eye x={274} y={y0 + 10} size={32} weight="fill" color={tone} />}
            {i === 4 && <IdentificationCard x={274} y={y0 + 10} size={32} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   14 · Smart Contracts in Intellectual Property Management — Four selectable
   panels: 1. Traditional IP Challenges, 2. Self-Executing Terms,
   3. Immutable First-Creator Record, 4. Automated Licensing & Royalties
   ========================================================================== */

const IP_ZONES = [
  { idx: 0, x0: 20, x1: 195, cx: 107.5, tab: "1. IP Barriers", sub: "Infringement & Delays" },
  { idx: 1, x0: 215, x1: 390, cx: 302.5, tab: "2. Coded Terms", sub: "Self-Executing" },
  { idx: 2, x0: 410, x1: 585, cx: 497.5, tab: "3. Created First", sub: "Immutable Ownership" },
  { idx: 3, x0: 605, x1: 780, cx: 692.5, tab: "4. Auto Royalties", sub: "Licensing Enforced" },
];

export function IpManagementInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const tone0 = active === 0 ? COUNTER : INK;
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = IP_ZONES[active] ?? IP_ZONES[0];

  return (
    <Plate
      w={800}
      h={258}
      title={`Four selectable panels for Smart Contracts in Intellectual Property Management: 1. IP Barriers (complex contracts, infringement risks, and slow legal enforcement), 2. Coded Terms (invention coded into a self-executing smart contract), 3. Created First (immutable timestamp proving who created the IP-protected content first), and 4. Auto Royalties (automated licensing and royalty payouts); ${cur.tab} is selected`}
    >
      <path d="M 205 18 V 196 M 400 18 V 196 M 595 18 V 196" stroke={INK} strokeWidth={1.8} strokeDasharray="4 5" />

      {/* 1. Traditional IP Barriers */}
      <Doc x={34} y={36} k={0.44} tone={tone0} />
      <Warning x={90} y={44} size={36} weight="fill" color={tone0} />
      <Clock x={138} y={44} size={36} weight="fill" color={tone0} />

      {/* 2. Self-Executing Coded Terms */}
      <Lightbulb x={228} y={42} size={38} weight="fill" color={toneOf(1)} />
      <Pointer x1={270} y1={62} x2={292} y2={62} w={3.5} head={8} color={toneOf(1)} />
      <MiniScreen x={296} y={34}>
        <FileCode x={323} y={47} size={30} weight="fill" color={toneOf(1)} />
      </MiniScreen>

      {/* 3. Immutable Records: Who Created It First */}
      <Person x={438} y={24} k={0.62} hair="bob" />
      <MiniScreen x={492} y={34}>
        <LockKey x={519} y={47} size={30} weight="fill" color={toneOf(2)} />
      </MiniScreen>

      {/* 4. Automated Licensing & Royalties */}
      <MiniScreen x={608} y={34}>
        <Gear x={635} y={47} size={30} weight="fill" color={toneOf(3)} />
      </MiniScreen>
      <Pointer x1={696} y1={62} x2={718} y2={62} w={3.5} head={8} color={toneOf(3)} />
      <Coins x={746} y={96} n={3} />

      {/* Sub-labels & Bottom selector buttons */}
      {IP_ZONES.map((z, i) => {
        const isLit = i === active;
        const tone = i === 0 ? tone0 : toneOf(i);
        const btnTone = isLit ? (i === 0 ? COUNTER : SIGNAL) : INK;
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={232} fill="transparent" />
            <text x={z.cx} y={178} textAnchor="middle" {...BODY} fontSize={13.5} fill={tone}>
              {z.sub}
            </text>
            <rect x={z.x0} y={204} width={z.x1 - z.x0} height={38} fill={btnTone} />
            <text x={z.cx} y={228} textAnchor="middle" {...HEAD} fontSize={15.5} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function IpManagementTall({
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
      title={`Four stacked selectable rows for Smart Contracts in Intellectual Property Management; ${IP_ZONES[active]?.tab ?? "1. IP Barriers"} is selected`}
    >
      {IP_ZONES.map((z, i) => {
        const y0 = 14 + i * 80;
        const isLit = i === active;
        const tone = isLit ? (i === 0 ? COUNTER : SIGNAL) : INK;
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
            <rect x={16} y={y0} width={368} height={68} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={186} height={68} fill={tone} />
            <text x={109} y={y0 + 30} textAnchor="middle" {...HEAD} fontSize={16} fill={CREAM}>
              {z.tab}
            </text>
            <text x={109} y={y0 + 50} textAnchor="middle" {...BODY} fontSize={13} fill={CREAM}>
              {z.sub}
            </text>
            {i === 0 && <Warning x={274} y={y0 + 16} size={36} weight="fill" color={tone} />}
            {i === 1 && <Lightbulb x={274} y={y0 + 16} size={36} weight="fill" color={tone} />}
            {i === 2 && <LockKey x={274} y={y0 + 16} size={36} weight="fill" color={tone} />}
            {i === 3 && <Gear x={274} y={y0 + 16} size={36} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   15 · Other Use Cases of Smart Contracts — Three selectable panels:
   1. Crowdfunding (milestone fund release),
   2. Donations and Charity (Bitcoin disaster relief purchase tracking),
   3. Education (automatic certificate issuance upon course completion)
   ========================================================================== */

const OTHER_ZONES = [
  { idx: 0, x0: 20, x1: 260, cx: 140, tab: "1. Crowdfunding", sub: "Milestone Release" },
  { idx: 1, x0: 280, x1: 520, cx: 400, tab: "2. Charity", sub: "Bitcoin Tracking" },
  { idx: 2, x0: 540, x1: 780, cx: 660, tab: "3. Education", sub: "Auto Certificates" },
];

export function OtherUseCasesInteractive({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const toneOf = (i: number) => (i === active ? SIGNAL : INK);
  const cur = OTHER_ZONES[active] ?? OTHER_ZONES[0];

  return (
    <Plate
      w={800}
      h={256}
      title={`Three selectable panels for Other Use Cases of Smart Contracts: 1. Crowdfunding (backers funding a milestone on a framed screen that releases coins), 2. Donations and Charity (Bitcoin sent through a transparent blockchain screen to track disaster relief supplies), and 3. Education (a student completing a course and receiving an automatically issued certificate on a framed screen); ${cur.tab} is selected in red`}
    >
      <path d="M 270 18 V 192 M 530 18 V 192" stroke={INK} strokeWidth={2} strokeDasharray="5 5" />

      {/* 1. Crowdfunding */}
      <UsersThree x={34} y={46} size={38} weight="fill" color={toneOf(0)} />
      <MiniScreen x={86} y={36}>
        <CheckCircle x={113} y={49} size={30} weight="fill" color={toneOf(0)} />
      </MiniScreen>
      <Pointer x1={174} y1={64} x2={198} y2={64} w={3.5} head={8} color={toneOf(0)} />
      <Coins x={228} y={98} n={3} />
      <text x={140} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={toneOf(0)}>
        {OTHER_ZONES[0].sub}
      </text>

      {/* 2. Donations and Charity (Disaster Management) */}
      <CurrencyBtc x={292} y={46} size={38} weight="fill" color={toneOf(1)} />
      <Pointer x1={332} y1={64} x2={354} y2={64} w={3.5} head={8} color={toneOf(1)} />
      <MiniScreen x={358} y={36}>
        <Eye x={385} y={49} size={30} weight="fill" color={toneOf(1)} />
      </MiniScreen>
      <Pointer x1={446} y1={64} x2={468} y2={64} w={3.5} head={8} color={toneOf(1)} />
      <FirstAid x={472} y={46} size={38} weight="fill" color={toneOf(1)} />
      <text x={400} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={toneOf(1)}>
        {OTHER_ZONES[1].sub}
      </text>

      {/* 3. Education */}
      <Person x={578} y={32} k={0.68} hair="bob" />
      <Pointer x1={614} y1={64} x2={646} y2={64} w={3.5} head={8} color={toneOf(2)} />
      <MiniScreen x={650} y={36}>
        <GraduationCap x={664} y={50} size={26} weight="fill" color={toneOf(2)} />
        <Certificate x={694} y={50} size={26} weight="fill" color={toneOf(2)} />
      </MiniScreen>
      <text x={660} y={176} textAnchor="middle" {...BODY} fontSize={14.5} fill={toneOf(2)}>
        {OTHER_ZONES[2].sub}
      </text>

      {/* Bottom selector buttons */}
      {OTHER_ZONES.map((z, i) => {
        const isLit = i === active;
        const tone = toneOf(i);
        return (
          <g
            key={z.tab}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-pressed={onSelect ? isLit : undefined}
            aria-label={z.tab}
            style={onSelect ? { cursor: "pointer" } : undefined}
            onClick={onSelect ? () => onSelect(i) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(i);
                    }
                  }
                : undefined
            }
          >
            <rect x={z.x0} y={14} width={z.x1 - z.x0} height={228} fill="transparent" />
            <rect x={z.x0} y={202} width={z.x1 - z.x0} height={38} fill={tone} />
            <text x={z.cx} y={226} textAnchor="middle" {...HEAD} fontSize={17} fill={CREAM}>
              {z.tab}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function OtherUseCasesTall({
  active = 0,
  onSelect,
}: {
  active?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <Plate
      w={400}
      h={296}
      title={`Three stacked selectable rows for Other Use Cases of Smart Contracts: 1. Crowdfunding, 2. Charity, and 3. Education; ${OTHER_ZONES[active]?.tab ?? "1. Crowdfunding"} is selected`}
    >
      {OTHER_ZONES.map((z, i) => {
        const y0 = 14 + i * 92;
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
            <rect x={16} y={y0} width={368} height={80} fill="none" stroke={tone} strokeWidth={isLit ? 4 : 2} />
            <rect x={16} y={y0} width={196} height={80} fill={tone} />
            <text x={114} y={y0 + 36} textAnchor="middle" {...HEAD} fontSize={17} fill={CREAM}>
              {z.tab}
            </text>
            <text x={114} y={y0 + 58} textAnchor="middle" {...BODY} fontSize={13.5} fill={CREAM}>
              {z.sub}
            </text>
            {i === 0 && <UsersThree x={280} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 1 && <CurrencyBtc x={280} y={y0 + 20} size={40} weight="fill" color={tone} />}
            {i === 2 && <GraduationCap x={280} y={y0 + 20} size={40} weight="fill" color={tone} />}
          </g>
        );
      })}
    </Plate>
  );
}














