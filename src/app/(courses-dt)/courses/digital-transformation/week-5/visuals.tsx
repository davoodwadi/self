"use client";

/* ==========================================================================
   Week 5 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Fixed cast for the week, built on ../_visuals/kit and ../_visuals/objects:
     · Server   — a physical server rack (on-premise hardware)
     · Cloud    — the cloud, always on a framed screen (Phosphor Cloud)
     · Router   — a fog node (router or gateway)
     · Chip     — processing done on the spot (Phosphor Cpu)
     · Machine  — a gear sending sensor data (a factory machine)
     · Person, Shop — people, the business
   SIGNAL marks the one thing each plate is about; COUNTER marks the
   contrast. Every coordinate is a literal or rounded with r2(), so server
   and client render identical markup.
   ========================================================================== */

import React from "react";
import {
  Cloud,
  Watch,
  Car,
  TrafficSignal,
  Warning,
  Database,
  AppWindow,
  Cpu,
  Code,
  IdentificationCard,
  FirstAid,
  ShoppingCart,
  Bank,
  GraduationCap,
  GlobeHemisphereWest,
  Play,
  Hourglass,
  BellRinging,
  Lightning,
  WifiSlash,
  Package,
  Snowflake,
  Lightbulb,
  SecurityCamera,
  Gauge,
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
  Pointer,
  Knob,
} from "../_visuals/kit";
import { Person, Shop } from "../_visuals/objects";

const HEAD = { fontFamily: "var(--font-heading)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-body)", fontWeight: 600 } as const;

/* -- cast: Server (a rack of three units; 60 × 66, origin top-left) -------- */

export function Server({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={0} y={i * 23} width={60} height={20} rx={2} fill={tone} />
          <circle cx={10} cy={i * 23 + 10} r={3} fill={CREAM} />
          <rect x={22} y={i * 23 + 8} width={30} height={4} fill={CREAM} />
        </g>
      ))}
    </g>
  );
}

/* -- cast: Router (a fog node; 80 × 50, origin top-left) ----------------- */

export function Router({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <rect x={14} y={0} width={5} height={26} fill={tone} />
      <rect x={61} y={0} width={5} height={26} fill={tone} />
      <rect x={0} y={24} width={80} height={26} rx={4} fill={tone} />
      {[18, 32, 46].map((cx) => (
        <circle key={cx} cx={cx} cy={37} r={3.2} fill={CREAM} />
      ))}
      <rect x={56} y={35} width={14} height={4} fill={CREAM} />
    </g>
  );
}

/* A cloud on a framed screen: the cloud is always digital, so it sits on a screen. */
export function CloudScreen({
  x,
  y,
  w = 128,
  h = 84,
  tone = INK,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
}) {
  const s = r2(Math.min(w, h) * 0.74);
  return (
    <Monitor x={x} y={y} w={w} h={h}>
      <Cloud x={r2(x + w / 2 - s / 2)} y={r2(y + h / 2 - s / 2)} size={s} weight="fill" color={tone} />
    </Monitor>
  );
}

/* ==========================================================================
   Hero — Edge devices send data up to a fog router, and the router up to
   the cloud on a screen
   ========================================================================== */

export function HeroTiers() {
  const devices = [
    { cx: 170, Icon: Watch },
    { cx: 250, Icon: Car },
    { cx: 330, Icon: TrafficSignal },
  ];
  return (
    <Plate
      h={372}
      title="Three tiers of computing: at the bottom, edge devices (a smartwatch, a car and a traffic light) send data up to a fog router in the middle, which sends it up to the cloud on a framed screen at the top"
    >
      <CloudScreen x={186} y={18} />
      <text x={36} y={68} {...HEAD} fontSize={24} fill={INK}>
        Cloud
      </text>

      <Pointer x1={250} y1={196} x2={250} y2={142} w={4} />

      <Router x={210} y={202} />
      <text x={36} y={238} {...HEAD} fontSize={24} fill={INK}>
        Fog
      </text>

      {devices.map(({ cx, Icon }) => (
        <g key={cx}>
          <Pointer x1={cx} y1={304} x2={r2(250 + (cx - 250) * 0.3)} y2={262} w={4} head={16} />
          <Icon x={cx - 26} y={310} size={52} weight="fill" color={INK} />
        </g>
      ))}
      <text x={36} y={344} {...HEAD} fontSize={24} fill={INK}>
        Edge
      </text>
    </Plate>
  );
}

/* ==========================================================================
   FreshBake — ten stores all lean on one aging on-premise server
   ========================================================================== */

export function TenStoresOneServer() {
  const cx = 200;
  const cy = 210;
  const R = 166;
  const k = 0.25;
  const stores = Array.from({ length: 10 }, (_, i) => {
    const a = Math.PI * (1 - (i + 0.5) / 10);
    return { x: r2(cx + R * Math.cos(a)), y: r2(cy - R * Math.sin(a)), a };
  });
  return (
    <Plate
      h={274}
      title="Ten bakery stores in an arc, each linked by a line to one aging on-premise server rack in the middle, which shows a red warning sign"
    >
      {stores.map((st, i) => (
        <g key={i}>
          <path
            d={`M ${r2(cx + (R - 30) * Math.cos(st.a))} ${r2(cy - (R - 30) * Math.sin(st.a))} L ${r2(cx + 62 * Math.cos(st.a))} ${r2(cy - 62 * Math.sin(st.a))}`}
            stroke={INK}
            strokeWidth={2.5}
          />
          <Shop x={r2(st.x - 80 * k)} y={r2(st.y - 75 * k)} k={k} />
        </g>
      ))}
      <Server x={170} y={162} />
      <text x={cx - 16} y={260} textAnchor="middle" {...HEAD} fontSize={18} fill={INK}>
        On-premise
      </text>
      <Warning x={244} y={238} size={28} weight="fill" color={SIGNAL} />
    </Plate>
  );
}

/* ==========================================================================
   What is cloud computing — instead of owning a server, the business rents
   storage, software and processing power over the internet
   ========================================================================== */

export function OwnVsRent() {
  const screens = [
    { x: 24, Icon: Database },
    { x: 150, Icon: AppWindow },
    { x: 276, Icon: Cpu },
  ];
  return (
    <Plate
      h={392}
      title="Top: a business owns a physical server, drawn in blue. Bottom: the same business links in red to three screens holding storage, software and processing power, rented over the internet"
    >
      <text x={20} y={70} {...HEAD} fontSize={22} fill={COUNTER}>
        Own
      </text>
      <Shop x={130} y={22} k={0.5} />
      <Server x={244} y={31} tone={COUNTER} />

      <path d="M 20 122 H 380" stroke={INK} strokeWidth={1.5} />

      <text x={20} y={190} {...HEAD} fontSize={22} fill={SIGNAL}>
        Rent
      </text>
      <Shop x={160} y={144} k={0.5} />
      {screens.map(({ x, Icon }) => (
        <g key={x}>
          <Pointer
            x1={200}
            y1={230}
            x2={r2(x + 50 + (200 - x - 50) * 0.12)}
            y2={274}
            w={3.5}
            color={SIGNAL}
            head={14}
          />
          <Monitor x={x} y={282} w={100} h={70}>
            <Icon x={x + 50 - 21} y={282 + 35 - 21} size={42} weight="fill" color={INK} />
          </Monitor>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   Key characteristics — INTERACTIVE. A year of weekly demand for an online
   store (SIMULATED). On-premise: drag one fixed server capacity; any week
   above it crashes, any room below it is paid for and idle. Cloud: capacity
   scales up and down with demand, so both shrink at once.
   ========================================================================== */

const WEEKS = 52;
/* SIMULATED weekly demand, 0–100: a quiet year with a summer bump and a
   holiday-sale spike in late November and December. */
const DEMAND = Array.from({ length: WEEKS }, (_, w) => {
  const base = 30 + 5 * Math.sin((2 * Math.PI * (w - 8)) / WEEKS);
  const summer = 14 * Math.exp(-(((w - 28) / 3) ** 2));
  const holiday = 58 * Math.exp(-(((w - 48) / 2.3) ** 2));
  const jitter = 3 * Math.sin(w * 2.7) + 2 * Math.cos(w * 1.3);
  return r2(Math.min(97, base + summer + holiday + jitter));
});
/* Cloud capacity steps up and down a little ahead of demand. */
const CLOUD_CAP = DEMAND.map((d) => Math.min(100, Math.ceil((d + 4) / 6) * 6));
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Tab({
  x,
  y,
  w,
  label,
  on,
  onClick,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={label}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <rect x={x} y={y} width={w} height={34} fill={on ? INK : CREAM} stroke={INK} strokeWidth={2.5} />
      <text x={r2(x + w / 2)} y={y + 23} textAnchor="middle" {...BODY} fontSize={16} fill={on ? CREAM : INK}>
        {label}
      </text>
    </g>
  );
}

export function CapacityPlanner() {
  const [mode, setMode] = React.useState<"onprem" | "cloud">("onprem");
  const [cap, setCap] = React.useState(50);

  const X0 = 112;
  const X1 = 712;
  const Y0 = 250; // value 0
  const H = 184; // value 100 at Y0 - H
  const bw = (X1 - X0) / WEEKS;
  const yOf = (v: number) => r2(Y0 - (v / 100) * H);

  const capAt = (w: number) => (mode === "cloud" ? CLOUD_CAP[w] : cap);
  const crashWeeks = DEMAND.filter((d, w) => d > capAt(w)).length;
  const paid = DEMAND.reduce((s, _, w) => s + capAt(w), 0);
  const idle = DEMAND.reduce((s, d, w) => s + Math.max(0, capAt(w) - d), 0);
  const idlePct = Math.round((idle / paid) * 100);

  /* the capacity line: flat for on-premise, a step line for cloud */
  const capPath =
    mode === "cloud"
      ? CLOUD_CAP.map((c, w) => `${w === 0 ? "M" : "L"} ${r2(X0 + w * bw)} ${yOf(c)} H ${r2(X0 + (w + 1) * bw)}`).join(
          " ",
        )
      : `M ${X0} ${yOf(cap)} H ${X1 + 30}`;

  const peak = DEMAND.indexOf(Math.max(...DEMAND));

  return (
    <Plate
      w={800}
      h={302}
      title={`SIMULATED. A year of weekly demand for an online store, with a spike at the holiday sales. ${
        mode === "cloud"
          ? "Cloud: capacity scales up and down with demand"
          : `On-premise: one fixed server capacity at ${cap} of 100`
      }. The site crashes in ${crashWeeks} weeks, and ${idlePct}% of the capacity paid for sits idle.`}
    >
      <Tab x={X0} y={10} w={132} label="On-premise" on={mode === "onprem"} onClick={() => setMode("onprem")} />
      <Tab x={X0 + 140} y={10} w={100} label="Cloud" on={mode === "cloud"} onClick={() => setMode("cloud")} />

      {/* readouts */}
      <text x={520} y={20} textAnchor="end" {...BODY} fontSize={14} fill={INK}>
        Weeks the site crashes
      </text>
      <text x={520} y={50} textAnchor="end" {...HEAD} fontSize={24} fill={crashWeeks ? SIGNAL : INK}>
        {crashWeeks}
      </text>
      <text x={712} y={20} textAnchor="end" {...BODY} fontSize={14} fill={INK}>
        Paid for, unused
      </text>
      <text x={712} y={50} textAnchor="end" {...HEAD} fontSize={24} fill={COUNTER}>
        {`${idlePct}%`}
      </text>
      <text x={786} y={294} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        SIMULATED
      </text>

      {/* idle capacity: paid-for room above each week's demand */}
      {DEMAND.map((d, w) => {
        const c = capAt(w);
        return c > d ? (
          <rect
            key={`i${w}`}
            x={r2(X0 + w * bw)}
            y={yOf(c)}
            width={r2(bw)}
            height={r2(yOf(d) - yOf(c))}
            fill={COUNTER_FILL}
          />
        ) : null;
      })}

      {/* weekly demand: served part in ink, the part above capacity in red (the crash) */}
      {DEMAND.map((d, w) => {
        const c = capAt(w);
        const x = r2(X0 + w * bw + 1.5);
        const bwi = r2(bw - 3);
        return (
          <g key={`d${w}`}>
            <rect x={x} y={yOf(Math.min(d, c))} width={bwi} height={r2(Y0 - yOf(Math.min(d, c)))} fill={INK} />
            {d > c && <rect x={x} y={yOf(d)} width={bwi} height={r2(yOf(c) - yOf(d))} fill={SIGNAL} />}
          </g>
        );
      })}

      {/* capacity */}
      <path d={capPath} fill="none" stroke={COUNTER} strokeWidth={4} />
      <text
        x={X1 + 8}
        y={r2((mode === "cloud" ? yOf(CLOUD_CAP[WEEKS - 1]) : yOf(cap)) - 20)}
        {...HEAD}
        fontSize={16}
        fill={COUNTER}
      >
        Capacity
      </text>
      {mode === "onprem" && (
        <Knob
          x={X1 + 30}
          y={yOf(20)}
          len={r2(yOf(20) - yOf(100))}
          axis="y"
          value={cap}
          min={20}
          max={100}
          step={4}
          onChange={setCap}
          tone={COUNTER}
          label="On-premise server capacity"
        />
      )}

      {/* crash label beside the holiday spike, when there is one */}
      {DEMAND[peak] > capAt(peak) && (
        <text
          x={r2(X0 + peak * bw - 12)}
          y={yOf(DEMAND[peak]) + 6}
          textAnchor="end"
          {...HEAD}
          fontSize={16}
          fill={SIGNAL}
        >
          Crashes
        </text>
      )}

      {/* baseline and months */}
      <path d={`M ${X0} ${Y0} H ${X1}`} stroke={INK} strokeWidth={2} />
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={r2(X0 + ((i + 0.5) * (X1 - X0)) / 12)}
          y={Y0 + 22}
          textAnchor="middle"
          {...BODY}
          fontSize={14}
          fill={INK}
        >
          {m}
        </text>
      ))}
      <text x={X0 - 12} y={yOf(DEMAND[2]) - 8} textAnchor="end" {...HEAD} fontSize={16} fill={INK}>
        Demand
      </text>
    </Plate>
  );
}

/* ==========================================================================
   Airbnb — server capacity rented month by month: a steady base, and extra
   servers added only in the peak travel seasons
   ========================================================================== */

const TRAVEL = [3, 3, 3, 4, 4, 6, 8, 8, 5, 3, 3, 6]; // servers per month (illustrative)

export function SeasonalServers() {
  const base = 3;
  const colW = 30;
  const X0 = 22;
  const Yb = 236;
  const uh = 14;
  return (
    <Plate
      h={268}
      title="Twelve monthly stacks of server units: three base units every month in black, and extra units in red added only in the summer and December peak travel seasons"
    >
      <text x={200} y={26} textAnchor="middle" {...HEAD} fontSize={18} fill={SIGNAL}>
        Peak travel seasons
      </text>
      <Pointer x1={170} y1={38} x2={r2(X0 + 6.5 * colW)} y2={r2(Yb - 8 * uh - 10)} w={3} color={SIGNAL} head={11} />
      <Pointer
        x1={262}
        y1={38}
        x2={r2(X0 + 11.5 * colW - 6)}
        y2={r2(Yb - 6 * uh - 10)}
        w={3}
        color={SIGNAL}
        head={11}
      />
      {TRAVEL.map((n, m) => (
        <g key={m}>
          {Array.from({ length: n }, (_, i) => {
            const x = X0 + m * colW + 3;
            const y = Yb - (i + 1) * uh;
            const tone = i < base ? INK : SIGNAL;
            return (
              <g key={i}>
                <rect x={x} y={y} width={24} height={11} rx={1.5} fill={tone} />
                <circle cx={x + 5} cy={y + 5.5} r={1.6} fill={CREAM} />
                <rect x={x + 10} y={y + 4.5} width={10} height={2} fill={CREAM} />
              </g>
            );
          })}
          <text x={X0 + m * colW + 15} y={Yb + 20} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
            {MONTHS[m][0]}
          </text>
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   Cloud service models — who runs each layer. One row per model, built up
   across the three slides: On-premise, then IaaS, PaaS and SaaS. Red blocks
   are rented from the provider; ink blocks the business runs itself.
   ========================================================================== */

const LAYERS = [["Servers,", "storage"], ["Tools and", "platforms"], ["Applications"]];
const MODELS = [
  { name: "On-premise", rented: 0 },
  { name: "IaaS", rented: 1 },
  { name: "PaaS", rented: 2 },
  { name: "SaaS", rented: 3 },
];

export function ServiceStack({ upTo = 3 }: { upTo?: 1 | 2 | 3 }) {
  const X0 = 124;
  const sw = 86;
  const gap = 4;
  const Y0 = 62;
  const rh = 48;
  const rows = MODELS.slice(0, upTo + 1);
  const h = Y0 + rows.length * (rh + 10) + 8;
  return (
    <Plate
      h={h}
      title={`Who runs each layer, by service model: ${rows
        .map((m) =>
          m.rented === 0
            ? `${m.name}: the business runs servers and storage, tools and platforms, and applications itself`
            : `${m.name}: the provider supplies the bottom ${m.rented === 3 ? "three layers" : m.rented === 1 ? "layer" : "two layers"}`,
        )
        .join("; ")}. Red blocks are rented from the provider; black blocks the business runs itself.`}
    >
      {LAYERS.map((lines, j) => (
        <text
          key={j}
          x={r2(X0 + j * (sw + gap) + sw / 2)}
          y={lines.length === 1 ? 42 : 26}
          textAnchor="middle"
          {...BODY}
          fontSize={14}
          fill={INK}
        >
          {lines.map((l, k) => (
            <tspan key={l} x={r2(X0 + j * (sw + gap) + sw / 2)} dy={k ? 18 : 0}>
              {l}
            </tspan>
          ))}
        </text>
      ))}
      {rows.map((m, i) => {
        const y = Y0 + i * (rh + 10);
        const current = i === upTo;
        return (
          <g key={m.name}>
            <text x={X0 - 14} y={y + rh / 2 + 7} textAnchor="end" {...HEAD} fontSize={18} fill={INK}>
              {m.name}
            </text>
            {current && (
              <rect
                x={X0 - 5}
                y={y - 5}
                width={3 * sw + 2 * gap + 10}
                height={rh + 10}
                fill="none"
                stroke={INK}
                strokeWidth={2.5}
              />
            )}
            {LAYERS.map((_, j) => {
              const rented = j < m.rented;
              const x = X0 + j * (sw + gap);
              return (
                <g key={j}>
                  <rect x={x} y={y} width={sw} height={rh} fill={rented ? SIGNAL : INK} />
                  <text x={r2(x + sw / 2)} y={y + rh / 2 + 5} textAnchor="middle" {...BODY} fontSize={14} fill={CREAM}>
                    {rented ? "Provider" : "You"}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Plate>
  );
}

export function ServiceStackIaaS() {
  return <ServiceStack upTo={1} />;
}
export function ServiceStackPaaS() {
  return <ServiceStack upTo={2} />;
}

/* ==========================================================================
   Snapchat — the engineer faces the app code and turns their back on the
   servers, which the platform runs for them
   ========================================================================== */

export function FocusOnApp() {
  return (
    <Plate
      h={196}
      title="An engineer in profile faces a screen of app code in red, with their back turned to two blue server racks behind them"
    >
      <Server x={14} y={114} k={1} tone={COUNTER} />
      <Server x={84} y={132.5} k={0.72} tone={COUNTER} />
      <Person x={196} y={40} k={1.4} hair="bun" />
      <Monitor x={268} y={22} w={118} h={92}>
        <Code x={327 - 30} y={68 - 30} size={60} weight="bold" color={SIGNAL} />
      </Monitor>
    </Plate>
  );
}

/* -- devices: a phone and a laptop, framed like every screen -------------- */

function Phone({ x, y, children }: { x: number; y: number; children?: React.ReactNode }) {
  // 64 × 112, origin top-left
  return (
    <g>
      <rect x={x} y={y} width={64} height={112} rx={10} fill="none" stroke={INK} strokeWidth={7} />
      <rect x={x + 9} y={y + 14} width={46} height={80} fill="none" stroke={INK} strokeWidth={1.5} />
      <rect x={x + 24} y={y + 100} width={16} height={4} rx={2} fill={INK} />
      {children}
    </g>
  );
}

function Laptop({ x, y, children }: { x: number; y: number; children?: React.ReactNode }) {
  // 150 × 96, origin top-left
  return (
    <g>
      <rect x={x + 12} y={y} width={126} height={80} fill="none" stroke={INK} strokeWidth={7} />
      <rect x={x + 21} y={y + 9} width={108} height={62} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d={`M ${x} ${y + 86} H ${x + 150} L ${x + 144} ${y + 96} H ${x + 6} Z`} fill={INK} />
      {children}
    </g>
  );
}

/* ==========================================================================
   Coca-Cola — one customer record in the cloud, open in real time on a
   phone, a laptop and a desktop screen
   ========================================================================== */

export function AnyDevice() {
  const card = (cx: number, cy: number, s = 40) => (
    <IdentificationCard x={r2(cx - s / 2)} y={r2(cy - s / 2)} size={s} weight="fill" color={SIGNAL} />
  );
  return (
    <Plate
      h={300}
      title="A cloud on a screen at the top links to a phone, a laptop and a desktop screen below, each showing the same customer record in red"
    >
      <CloudScreen x={146} y={10} w={108} h={70} />
      <Pointer x1={170} y1={124} x2={64} y2={168} w={3.5} />
      <Pointer x1={200} y1={124} x2={200} y2={180} w={3.5} />
      <Pointer x1={230} y1={124} x2={334} y2={168} w={3.5} />

      <Phone x={32} y={176}>
        {card(64, 230)}
      </Phone>
      <Laptop x={125} y={190}>
        {card(200, 230)}
      </Laptop>
      <Monitor x={290} y={180} w={92} h={74}>
        {card(336, 217)}
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   IaaS discussion — an on-premise server moves to the cloud; four industries
   ========================================================================== */

export function MigrateIndustries() {
  const icons = [FirstAid, ShoppingCart, Bank, GraduationCap];
  return (
    <Plate
      h={262}
      title="An on-premise server rack moves along a red arrow to the cloud on a screen; below, four industry badges: healthcare, e-commerce, government and education"
    >
      <Server x={56} y={30} />
      <Pointer x1={136} y1={63} x2={232} y2={63} w={5} color={SIGNAL} />
      <CloudScreen x={246} y={14} w={110} h={72} />
      {icons.map((Icon, i) => {
        const cx = 62 + i * 92;
        return (
          <g key={i}>
            <circle cx={cx} cy={204} r={38} fill={INK} />
            <Icon x={cx - 23} y={204 - 23} size={46} weight="fill" color={CREAM} />
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   Netflix discussion — one streaming service, played on screens around the
   world
   ========================================================================== */

export function GlobalStreaming() {
  const screens = [
    { x: 8, y: 30 },
    { x: 308, y: 30 },
    { x: 8, y: 168 },
    { x: 308, y: 168 },
  ];
  return (
    <Plate h={246} title="A globe in the middle, with four screens around it, each playing a video">
      <GlobeHemisphereWest x={105} y={28} size={190} weight="fill" color={INK} />
      {screens.map(({ x, y }) => (
        <MiniScreen key={`${x}-${y}`} x={x} y={y}>
          <Play x={x + 42 - 15} y={y + 28 - 15} size={30} weight="fill" color={SIGNAL} />
        </MiniScreen>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   HealthGuard — a patient's wearable sends every reading on the long trip to
   the cloud, and the alert reaches the doctor late
   ========================================================================== */

export function LateAlert() {
  return (
    <Plate
      h={262}
      title="A patient with a smartwatch on the left sends data on a long arrow up to the cloud on a screen; the alert travels back down to a doctor on the right, marked by a red hourglass for the delay"
    >
      <CloudScreen x={150} y={12} w={100} h={66} />
      <Person x={58} y={150} k={1.05} hair="crop" />
      <Watch x={104} y={170} size={50} weight="fill" color={INK} />
      <Person x={342} y={150} k={1.05} hair="bob" flip />
      <FirstAid x={342 - 13} y={222} size={26} weight="fill" color={CREAM} />
      <Pointer x1={132} y1={164} x2={174} y2={122} w={3.5} />
      <Pointer x1={226} y1={122} x2={300} y2={172} w={3.5} color={SIGNAL} />
      <Hourglass x={292} y={66} size={46} weight="fill" color={SIGNAL} />
    </Plate>
  );
}

/* ==========================================================================
   What is edge computing — INTERACTIVE. Drag the network traffic from quiet
   to peak hours. The cloud lane's alert waits behind more and more data on
   the network, and its delay climbs ever faster; the edge lane decides on
   the spot and barely moves. (SIMULATED delays.)
   ========================================================================== */

const cloudDelay = (u: number) => 0.5 + 0.25 / (1 - 0.95 * u);
const edgeDelay = (u: number) => 0.05 + 0.02 * u;
const fmtS = (d: number) => `${d < 1 ? d.toFixed(2) : d.toFixed(1)} s`;

export function AlertDelay() {
  const [traffic, setTraffic] = React.useState(30);
  const u = traffic / 100;
  const dc = cloudDelay(u);
  const de = edgeDelay(u);
  const BX = 96;
  const BW = 600; // 6 seconds
  const sx = (d: number) => r2((Math.min(d, 6) / 6) * BW);
  const packets = Math.round(2 + u * 26);

  return (
    <Plate
      w={800}
      h={306}
      title={`SIMULATED. Network traffic at ${traffic}% of peak hours. Cloud lane: a smartwatch sends every reading over the network to the cloud before the alert sounds, a delay of ${fmtS(
        dc,
      )}. Edge lane: a chip beside the smartwatch decides on the spot, a delay of ${fmtS(de)}.`}
    >
      {/* the one input: network traffic */}
      <text x={20} y={40} {...HEAD} fontSize={18} fill={INK}>
        Network traffic
      </text>
      <rect x={200} y={26} width={300} height={16} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={200} y={26} width={r2(3 * traffic)} height={16} fill={INK} />
      <Knob
        x={200}
        y={34}
        len={300}
        value={traffic}
        min={0}
        max={100}
        onChange={setTraffic}
        label="Network traffic, from quiet to peak hours"
      />
      <text x={200} y={66} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Quiet
      </text>
      <text x={500} y={66} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Peak hours
      </text>
      <text x={786} y={40} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        SIMULATED
      </text>

      {/* cloud lane: every reading travels to a distant data centre */}
      <text x={20} y={127} {...HEAD} fontSize={20} fill={COUNTER}>
        Cloud
      </text>
      <Watch x={BX} y={100} size={40} weight="fill" color={INK} />
      <path d="M 144 120 H 462" stroke={INK} strokeWidth={2.5} />
      {Array.from({ length: packets }, (_, i) => (
        <rect key={i} x={r2(452 - i * 11)} y={113} width={7} height={14} fill={INK} />
      ))}
      <MiniScreen x={470} y={92}>
        <Cloud x={492} y={100} size={40} weight="fill" color={INK} />
      </MiniScreen>
      <Pointer x1={562} y1={120} x2={604} y2={120} w={3} head={11} />
      <BellRinging x={610} y={100} size={40} weight="fill" color={COUNTER} />
      <rect x={BX} y={170} width={sx(dc)} height={16} fill={COUNTER} />
      <text x={BX + sx(dc) + 10} y={184} {...HEAD} fontSize={18} fill={COUNTER}>
        {fmtS(dc)}
      </text>

      <path d="M 20 210 H 780" stroke={INK} strokeWidth={1} />

      {/* edge lane: a chip right beside the device decides on the spot */}
      <text x={20} y={257} {...HEAD} fontSize={20} fill={SIGNAL}>
        Edge
      </text>
      <Watch x={BX} y={230} size={40} weight="fill" color={INK} />
      <Pointer x1={140} y1={250} x2={168} y2={250} w={3} head={10} />
      <Cpu x={172} y={230} size={40} weight="fill" color={SIGNAL} />
      <Pointer x1={216} y1={250} x2={244} y2={250} w={3} head={10} />
      <BellRinging x={248} y={230} size={40} weight="fill" color={SIGNAL} />
      <rect x={BX} y={280} width={Math.max(2, sx(de))} height={16} fill={SIGNAL} />
      <text x={BX + Math.max(2, sx(de)) + 10} y={294} {...HEAD} fontSize={18} fill={SIGNAL}>
        {fmtS(de)}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   Edge computing, four characteristics — one scene for all four: a car (the
   data source), a chip right beside it (the edge) and the cloud far off.
   Each plate lights the part its characteristic is about.
   ========================================================================== */

type EdgeTrait = "proximity" | "latency" | "bandwidth" | "reliability";

function EdgeScene({ trait }: { trait: EdgeTrait }) {
  const chipTone = trait === "proximity" || trait === "reliability" ? SIGNAL : INK;
  const titles: Record<EdgeTrait, string> = {
    proximity: "A car with a red processing chip right beside it; the cloud on a screen sits far off and unused",
    latency:
      "A car sends data a short way to a chip beside it, marked by a red lightning bolt for speed; the cloud sits far off",
    bandwidth:
      "Many data packets go from a car into the chip beside it, and only one red packet goes on up to the cloud",
    reliability:
      "A blue no-signal sign stands between the chip and the cloud, and the car keeps sending data to its red chip",
  };
  return (
    <Plate h={210} title={titles[trait]}>
      <CloudScreen x={262} y={12} w={116} h={76} />
      <Car x={14} y={104} size={96} weight="fill" color={INK} />

      {trait === "bandwidth" ? (
        Array.from({ length: 5 }, (_, i) => <rect key={i} x={112 + i * 9} y={145} width={6} height={14} fill={INK} />)
      ) : (
        <Pointer x1={112} y1={152} x2={156} y2={152} w={4} color={trait === "latency" ? SIGNAL : INK} head={13} />
      )}
      {trait === "latency" && <Lightning x={116} y={98} size={40} weight="fill" color={SIGNAL} />}

      <Cpu x={160} y={122} size={60} weight="fill" color={chipTone} />

      {trait === "bandwidth" && (
        <>
          <rect x={226} y={131} width={7} height={14} fill={SIGNAL} />
          <Pointer x1={240} y1={132} x2={256} y2={92} w={3.5} color={SIGNAL} head={12} />
        </>
      )}
      {trait === "reliability" && (
        <>
          <WifiSlash x={232} y={104} size={40} weight="fill" color={COUNTER} />
        </>
      )}
    </Plate>
  );
}

export function EdgeProximity() {
  return <EdgeScene trait="proximity" />;
}
export function EdgeLatency() {
  return <EdgeScene trait="latency" />;
}
export function EdgeBandwidth() {
  return <EdgeScene trait="bandwidth" />;
}
export function EdgeReliability() {
  return <EdgeScene trait="reliability" />;
}

/* ==========================================================================
   Walmart — inside the store, one edge chip handles the shelves' inventory,
   the refrigeration and lighting, and the shopper's data, all on site
   ========================================================================== */

export function StoreEdge() {
  const cx = 200;
  const cy = 188;
  const leaves = [
    { x: 56, y: 132, el: <Package x={56 - 24} y={132 - 24} size={48} weight="fill" color={INK} /> },
    { x: 66, y: 236, el: <Snowflake x={66 - 24} y={236 - 24} size={48} weight="fill" color={INK} /> },
    { x: 334, y: 236, el: <Lightbulb x={334 - 24} y={236 - 24} size={48} weight="fill" color={INK} /> },
    { x: 344, y: 132, el: <Person x={344} y={100} k={0.62} hair="bun" /> },
  ];
  return (
    <Plate
      h={274}
      title="A store at the top; beneath it a red processing chip in the store links to the shelves' packages, a snowflake for refrigeration, a light bulb for lighting and a shopper"
    >
      <Shop x={152} y={8} k={0.6} />
      <path d={`M ${cx} 102 V ${cy - 34}`} stroke={INK} strokeWidth={3} />
      {leaves.map(({ x, y, el }, i) => {
        const a = Math.atan2(y - cy, x - cx);
        return (
          <g key={i}>
            <path
              d={`M ${r2(cx + 40 * Math.cos(a))} ${r2(cy + 40 * Math.sin(a))} L ${r2(x - 40 * Math.cos(a))} ${r2(y - 40 * Math.sin(a))}`}
              stroke={INK}
              strokeWidth={3}
            />
            {el}
          </g>
        );
      })}
      <Cpu x={cx - 32} y={cy - 32} size={64} weight="fill" color={SIGNAL} />
    </Plate>
  );
}

/* ==========================================================================
   Running a factory — dozens of machines, each sending out its own sensor
   data at the same time
   ========================================================================== */

/* A machine sending sensor data: a gear with two signal arcs at its top right. */
function Machine({
  cx,
  cy,
  s = 46,
  tone = INK,
  signal = true,
}: {
  cx: number;
  cy: number;
  s?: number;
  tone?: string;
  /** draw the two signal arcs (left off where machines are packed tight) */
  signal?: boolean;
}) {
  const ax = r2(cx + s * 0.5);
  const ay = r2(cy - s * 0.5);
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x={r2(cx - s * 0.1)}
          y={r2(cy - s * 0.5)}
          width={r2(s * 0.2)}
          height={r2(s * 0.24)}
          fill={tone}
          transform={`rotate(${i * 45} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r2(s * 0.36)} fill={tone} />
      <circle cx={cx} cy={cy} r={r2(s * 0.14)} fill={CREAM} />
      {signal && (
        <>
          <path
            d={`M ${ax} ${r2(ay - 6)} A 6 6 0 0 1 ${r2(ax + 6)} ${ay}`}
            fill="none"
            stroke={tone}
            strokeWidth={2.2}
          />
          <path
            d={`M ${ax} ${r2(ay - 12)} A 12 12 0 0 1 ${r2(ax + 12)} ${ay}`}
            fill="none"
            stroke={tone}
            strokeWidth={2.2}
          />
        </>
      )}
    </g>
  );
}

export function FactoryFloor() {
  const cols = 5;
  const rows = 4;
  return (
    <Plate
      h={292}
      title="A factory floor of twenty machines in four rows, each a gear sending out its own sensor signal"
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return <Machine key={i} cx={52 + c * 72} cy={50 + r * 66} />;
      })}
    </Plate>
  );
}

/* ==========================================================================
   Fog computing — a bridge: localized edge machines on the left, fog nodes
   in the middle, the centralized cloud on the right
   ========================================================================== */

export function FogBridge() {
  const machines = [56, 124, 192];
  const routers = [84, 164];
  return (
    <Plate
      h={300}
      title="Three machines at the edge on the left link to two red fog routers in the middle, and the routers link to the cloud on a screen on the right"
    >
      {machines.map((cy, i) => (
        <g key={cy}>
          <Machine cx={50} cy={cy} />
          <Pointer x1={86} y1={cy} x2={142} y2={routers[i < 2 ? 0 : 1] + (i === 1 ? 6 : 0) + 4} w={3} head={11} />
        </g>
      ))}
      {routers.map((ry) => (
        <g key={ry}>
          <Router x={150} y={ry - 30} k={0.8} tone={SIGNAL} />
          <Pointer x1={222} y1={ry + 2} x2={268} y2={r2(ry + (124 - ry) * 0.5)} w={3} head={11} />
        </g>
      ))}
      <CloudScreen x={276} y={84} w={108} h={72} />

      {[
        { x: 50, t: "Edge", sub: "(localized)" },
        { x: 182, t: "Fog", sub: "" },
        { x: 330, t: "Cloud", sub: "(centralized)" },
      ].map(({ x, t, sub }) => (
        <g key={t}>
          <text x={x} y={258} textAnchor="middle" {...HEAD} fontSize={20} fill={t === "Fog" ? SIGNAL : INK}>
            {t}
          </text>
          {sub && (
            <text x={x} y={282} textAnchor="middle" {...BODY} fontSize={14} fill={INK}>
              {sub}
            </text>
          )}
        </g>
      ))}
    </Plate>
  );
}

/* ==========================================================================
   Key characteristics of fog — INTERACTIVE. Drag the number of IoT devices.
   Every twelve machines share one fog node, which sends only summaries on
   to the cloud. Raw data sent straight to the cloud grows with every device
   and passes the cloud's capacity; data through fog nodes barely grows.
   (SIMULATED loads.)
   ========================================================================== */

const CLOUD_LIMIT = 40; // units of data the cloud can take in at once
const PER_NODE = 12;

export function FogLoad() {
  const [n, setN] = React.useState(24);
  const nodes = Math.ceil(n / PER_NODE);
  const raw = n; // one unit per device
  const viaFog = r2(n * 0.08 + nodes * 0.5);
  const BX = 400;
  const unit = 5; // 60 units = 300
  const over = raw > CLOUD_LIMIT;

  return (
    <Plate
      w={800}
      h={290}
      title={`SIMULATED. ${n} IoT devices share ${nodes} fog node${nodes > 1 ? "s" : ""}. Sent straight to the cloud, their raw data is ${raw} units against a cloud capacity of ${CLOUD_LIMIT}${
        over ? ", overwhelming the cloud" : ""
      }; through the fog nodes, only ${viaFog} units reach the cloud.`}
    >
      {/* the one input: how many devices */}
      <text x={20} y={40} {...HEAD} fontSize={18} fill={INK}>
        IoT devices
      </text>
      <rect x={140} y={26} width={300} height={16} fill={COUNTER_FILL} stroke={INK} strokeWidth={2} />
      <rect x={140} y={26} width={r2(((n - 6) / 54) * 300)} height={16} fill={INK} />
      <Knob
        x={140}
        y={34}
        len={300}
        value={n}
        min={6}
        max={60}
        step={6}
        onChange={(v) => setN(Math.max(6, Math.round(v / 6) * 6))}
        label="Number of IoT devices"
      />
      <text x={462} y={42} {...HEAD} fontSize={22} fill={INK}>
        {n}
      </text>
      <text x={786} y={24} textAnchor="end" {...BODY} fontSize={12} fill={INK}>
        SIMULATED
      </text>

      {/* machines, twelve to a fog node, and the nodes' shared line to the cloud */}
      {nodes > 0 && <Pointer x1={r2(20 + 28)} y1={86} x2={392} y2={86} w={3} head={12} />}
      {Array.from({ length: 5 }, (_, g) => {
        const gx = 20 + g * 68;
        const inGroup = Math.max(0, Math.min(PER_NODE, n - g * PER_NODE));
        if (!inGroup) return null;
        return (
          <g key={g}>
            <path d={`M ${gx + 28} 86 V 102`} stroke={INK} strokeWidth={3} />
            <Router x={gx + 6} y={102} k={0.55} tone={SIGNAL} />
            <path d={`M ${gx + 28} 132 V 142`} stroke={INK} strokeWidth={2} />
            {Array.from({ length: inGroup }, (_, i) => {
              const c = i % 2;
              const r = Math.floor(i / 2);
              return <Machine key={i} cx={gx + 15 + c * 26} cy={154 + r * 23} s={19} signal={false} />;
            })}
          </g>
        );
      })}
      <CloudScreen x={398} y={52} w={104} h={68} />

      {/* what reaches the cloud */}
      <text x={BX + CLOUD_LIMIT * unit} y={156} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        Cloud capacity
      </text>
      <text x={BX} y={186} {...HEAD} fontSize={15} fill={COUNTER}>
        Straight to the cloud
      </text>
      <rect x={BX} y={194} width={raw * unit} height={18} fill={COUNTER} />
      <text x={BX} y={240} {...HEAD} fontSize={15} fill={SIGNAL}>
        Through fog nodes
      </text>
      <rect x={BX} y={248} width={Math.max(2, r2(viaFog * unit))} height={18} fill={SIGNAL} />
      <path d={`M ${BX + CLOUD_LIMIT * unit} 164 V 280`} stroke={INK} strokeWidth={2.5} />
      {over && (
        <text x={BX + CLOUD_LIMIT * unit + 10} y={186} {...HEAD} fontSize={15} fill={COUNTER}>
          Overwhelming the cloud
        </text>
      )}
    </Plate>
  );
}

/* ==========================================================================
   Cisco smart city — a traffic light, a surveillance camera and a utility
   meter send their data to one fog node on the street, which passes on only
   what the cloud needs
   ========================================================================== */

export function CityFog() {
  const devices = [
    { cx: 66, Icon: TrafficSignal },
    { cx: 200, Icon: SecurityCamera },
    { cx: 334, Icon: Gauge },
  ];
  return (
    <Plate
      h={318}
      title="A traffic light, a surveillance camera and a utility meter each send data down to one red fog router, which links on down to the cloud on a screen"
    >
      {devices.map(({ cx, Icon }) => (
        <g key={cx}>
          <Icon x={cx - 32} y={12} size={64} weight="fill" color={INK} />
          <Pointer
            x1={cx === 200 ? 200 : r2(cx + (200 - cx) * 0.18)}
            y1={88}
            x2={cx === 200 ? 200 : r2(cx + (200 - cx) * 0.62)}
            y2={130}
            w={3.5}
            head={12}
          />
        </g>
      ))}
      <Router x={156} y={128} k={1.1} tone={SIGNAL} />
      <Pointer x1={200} y1={190} x2={200} y2={214} w={3.5} head={11} />
      <CloudScreen x={154} y={218} w={92} h={60} />
    </Plate>
  );
}
