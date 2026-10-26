"use client";

import React, { useState } from "react";
import {
  Arrow,
  CAT,
  CatKey,
  Frame,
  HalftoneDefs,
  LINE,
  Numeral,
  Price,
  Segmented,
  Slider,
  Tile,
  Toggles,
  head,
  headAlong,
  ht,
  r2,
} from "../_visuals/kit";
import {
  Agent,
  Coin,
  Cursor,
  Envelope,
  Mug,
  OrderForm,
  Parcel,
  Person,
  Receipt,
  Shop,
  Sneaker,
  Stopwatch,
  Warehouse,
} from "../_visuals/objects";

const ink = { stroke: CAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: CAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

function NameLines({ x, y, w, gap = 5 }: { x: number; y: number; w: number; gap?: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={r2(x + w)} y2={y} {...hair} />
      <line x1={x} y1={r2(y + gap)} x2={r2(x + w * 0.72)} y2={r2(y + gap)} {...hair} />
    </g>
  );
}

/** A printed bid slip, with a catalogue key and a monetary offer. */
function BidSlip({ x, y, price, winner = false }: { x: number; y: number; price: string; winner?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={116} height={55} fill={winner ? CAT.amber : CAT.tile} {...ink} />
      <rect x={x + 3} y={y + 3} width={110} height={49} fill="none" {...hair} />
      <CatKey x={x + 11} y={y + 18} size={8}>BID</CatKey>
      <Price x={x + 104} y={y + 41} size={22} anchor="end">{price}</Price>
    </g>
  );
}

/** Three sealed offers converge on one impression, resolved inside a 100 ms auction watch. */
export function TitleAuction() {
  const id = "w5-title";
  return (
    <Frame
      width={800}
      height={205}
      label="Three printed bid slips travel from advertisers toward a catalogue impression. A large auction watch reads 100 milliseconds; the winning bid is picked out in amber beside the engraved product listing."
      svgProps={{ "data-plate": "title-auction" }}
    >
      <HalftoneDefs id={id} />
      <BidSlip x={22} y={18} price="$1.20" />
      <BidSlip x={22} y={81} price="$3.40" winner />
      <BidSlip x={22} y={144} price="$0.80" />
      <path d="M138 45H210L250 78M138 108H250M138 171H210L250 137" fill="none" {...ink} />
      <path d="M250 77H272M250 108H272M250 138H272" fill="none" {...ink} />
      <g transform="translate(360 103)">
        <rect x={-6} y={-81} width={12} height={9} fill={CAT.tile} {...ink} />
        <line x1={0} y1={-82} x2={0} y2={-88} {...ink} />
        <circle r={67} fill={CAT.tile} {...ink} />
        <circle r={61} fill="none" {...hair} />
        {Array.from({ length: 12 }, (_, k) => {
          const a = (k * Math.PI) / 6;
          return <line key={k} x1={r2(50 * Math.sin(a))} y1={r2(-50 * Math.cos(a))} x2={r2(56 * Math.sin(a))} y2={r2(-56 * Math.cos(a))} {...ink} />;
        })}
        <path d="M0 7L-30 -30" fill="none" stroke={CAT.ink} strokeWidth={3} strokeLinecap="round" />
        <circle r={5} fill={CAT.amber} {...ink} />
        <Price x={0} y={38} size={24} anchor="middle">100 ms</Price>
      </g>
      <path d="M435 108H530" fill="none" {...ink} />
      <path d={head.right(530, 108, 8)} fill="none" {...ink} />
      <Tile x={548} y={20} w={230} h={165} />
      <Numeral x={565} y={43}>1</Numeral>
      <CatKey x={760} y={41} size={8} anchor="end">ONE IMPRESSION</CatKey>
      <Sneaker id={id} cx={663} cy={96} s={1.35} />
      <NameLines x={580} y={139} w={166} />
      <Price x={580} y={169} size={17}>$24.00</Price>
      <Price x={750} y={169} size={15} anchor="end" fill={CAT.amberText}>SOLD</Price>
    </Frame>
  );
}

/** A single parcel-sized impression bought beside an insertion order for a whole month's banner slot. */
export function ManualToMoment() {
  const id = "w5-manual";
  return (
    <Frame
      width={800}
      height={266}
      label="A human-negotiated insertion order reserves a newspaper banner for a whole month. Beside it, one auction stamp selects one impression for one visitor at one moment, highlighted in amber."
      svgProps={{ "data-plate": "manual-to-moment" }}
    >
      <HalftoneDefs id={id} />
      <g transform="rotate(-3 164 132)">
        <OrderForm x={30} y={26} w={268} h={208} />
        <CatKey x={48} y={42} size={12} fill={CAT.tile}>INSERTION ORDER</CatKey>
        <CatKey x={48} y={76} size={9}>ONE MONTH</CatKey>
        <Price x={280} y={205} size={16} anchor="end">SIGNED</Price>
      </g>
      <rect x={312} y={48} width={104} height={154} fill={CAT.tile} {...ink} />
      <rect x={320} y={58} width={88} height={16} fill={ht(id, "light")} {...hair} />
      <rect x={320} y={85} width={88} height={72} fill={CAT.tile} {...ink} />
      <NameLines x={325} y={169} w={77} />
      <NameLines x={325} y={184} w={65} />
      <CatKey x={364} y={115} size={10} anchor="middle">FIXED</CatKey>
      <CatKey x={364} y={135} size={10} anchor="middle">BANNER</CatKey>
      <g transform="rotate(-9 481 130)">
        <circle cx={481} cy={130} r={48} fill={CAT.tile} stroke={CAT.amber} strokeWidth={4} />
        <circle cx={481} cy={130} r={42} fill="none" {...ink} />
        <CatKey x={481} y={125} size={11} anchor="middle" fill={CAT.amberText}>ONE</CatKey>
        <CatKey x={481} y={145} size={9} anchor="middle">IMPRESSION</CatKey>
      </g>
      <path d="M536 130H576" fill="none" {...ink} />
      <path d={head.right(576, 130, 7)} fill="none" {...ink} />
      <Person id={id} cx={646} cy={117} s={1.55} />
      <Tile x={596} y={183} w={172} h={52} />
      <CatKey x={609} y={202} size={8}>SPECIFIC USER</CatKey>
      <Price x={609} y={222} size={12}>SPECIFIC MOMENT</Price>
    </Frame>
  );
}

/** Buy-side offers and sell-side inventory meet at one exchange before the page finishes rendering. */
export function BuySellDeadline() {
  const id = "w5-sides";
  return (
    <Frame
      width={800}
      height={224}
      label="Buy-side bid slips on the left and sell-side catalogue inventory on the right meet at an ad exchange. A 100 millisecond deadline sits above the exchange, highlighted in amber."
      svgProps={{ "data-plate": "buy-sell-deadline" }}
    >
      <HalftoneDefs id={id} />
      <Tile x={30} y={58} w={214} h={134} />
      <Numeral x={44} y={80}>1</Numeral>
      <CatKey x={225} y={79} size={10} anchor="end">BUY SIDE</CatKey>
      <g>
        <rect x={49} y={97} width={175} height={34} fill={CAT.tile} {...ink} />
        <CatKey x={60} y={119} size={9}>BID</CatKey>
        <Price x={211} y={120} size={20} anchor="end">$2.80</Price>
        <rect x={49} y={143} width={175} height={34} fill={CAT.tile} {...ink} />
        <CatKey x={60} y={165} size={9}>BID</CatKey>
        <Price x={211} y={166} size={20} anchor="end">$3.10</Price>
      </g>
      <Tile x={556} y={58} w={214} h={134} />
      <Numeral x={570} y={80}>2</Numeral>
      <CatKey x={751} y={79} size={10} anchor="end">SELL SIDE</CatKey>
      <rect x={578} y={98} width={72} height={72} fill={CAT.tile} {...ink} />
      <Sneaker id={id} cx={614} cy={126} s={0.62} />
      <NameLines x={587} y={151} w={54} />
      <rect x={674} y={98} width={72} height={72} fill={CAT.tile} {...ink} />
      <Mug id={id} cx={710} cy={126} scale={0.85} />
      <NameLines x={683} y={151} w={54} />
      <path d="M244 124H327M473 124H556" fill="none" {...ink} />
      <path d={head.right(327, 124, 7)} fill="none" {...ink} />
      <path d={head.left(473, 124, 7)} fill="none" {...ink} />
      <rect x={327} y={91} width={146} height={66} fill={CAT.tile} {...ink} />
      <rect x={330} y={94} width={140} height={60} fill="none" {...hair} />
      <CatKey x={400} y={118} size={10} anchor="middle">AD</CatKey>
      <CatKey x={400} y={139} size={10} anchor="middle">EXCHANGE</CatKey>
      <Stopwatch cx={400} cy={52} r={30} t={0.1} />
      <rect x={365} y={7} width={70} height={22} fill={CAT.tile} />
      <Price x={400} y={23} size={17} anchor="middle" fill={CAT.amberText}>100 ms</Price>
    </Frame>
  );
}

const RTB_STAGES = [
  { name: "Ad request", note: "Context + user identifiers" },
  { name: "Bid request", note: "OpenRTB broadcast" },
  { name: "Valuation + bids", note: "Buy-side responses" },
  { name: "Clear + serve", note: "Winning markup + pixels" },
];

/** A scrubbable 100 ms auction clock; every hop is visible, while the current hop is amber. */
export function AuctionClock() {
  const [ms, setMs] = useState(0);
  const id = "w5-clock";
  const stage = Math.min(3, Math.floor(ms / 25));
  const stroke = (on: boolean) => ({ stroke: on ? CAT.amber : CAT.ink, strokeWidth: on ? 3 : 1, fill: "none", strokeLinejoin: "round" as const, strokeLinecap: "round" as const });
  return (
    <div>
      <Frame
        width={800}
        height={316}
        label={`Real-time bidding at ${ms} milliseconds. Stage ${stage + 1}: ${RTB_STAGES[stage].name}. The browser connects to the publisher SSP, which broadcasts through an ad exchange to two DSPs. The DSPs return monetary bids, and the exchange serves the winning sneaker ad to the browser.`}
        svgProps={{ "data-plate": "auction-clock" }}
      >
        <HalftoneDefs id={id} />
        {RTB_STAGES.map((s, k) => (
          <g key={s.name}>
            <Price x={35 + k * 197} y={28} size={14} fill={k === stage ? CAT.amberText : CAT.ink}>{`0${k + 1}`}</Price>
            <CatKey x={61 + k * 197} y={27} size={10} fill={k === stage ? CAT.amberText : CAT.ink}>{s.name.toUpperCase()}</CatKey>
            <line x1={35 + k * 197} y1={38} x2={212 + k * 197} y2={38} stroke={k === stage ? CAT.amber : CAT.ink} strokeWidth={k === stage ? 2.5 : 0.5} />
          </g>
        ))}
        <Person id={id} cx={64} cy={142} s={1.25} />
        <rect x={130} y={112} width={100} height={70} fill={CAT.tile} {...ink} />
        <rect x={133} y={115} width={94} height={64} fill="none" {...hair} />
        <CatKey x={180} y={153} size={17} anchor="middle">SSP</CatKey>
        <rect x={320} y={112} width={145} height={70} fill={CAT.tile} {...ink} />
        <rect x={323} y={115} width={139} height={64} fill="none" {...hair} />
        <CatKey x={392.5} y={143} size={10} anchor="middle">AD</CatKey>
        <CatKey x={392.5} y={162} size={10} anchor="middle">EXCHANGE</CatKey>
        <Tile x={570} y={63} w={160} h={57} />
        <CatKey x={586} y={88} size={13}>DSP</CatKey>
        {stage >= 2 ? <Price x={714} y={105} size={18} anchor="end">$3.40</Price> : null}
        <Tile x={570} y={177} w={160} h={57} />
        <CatKey x={586} y={202} size={13}>DSP</CatKey>
        {stage >= 2 ? <Price x={714} y={219} size={18} anchor="end">$1.20</Price> : null}
        <path d="M98 147H130" {...stroke(stage === 0)} />
        <path d={head.right(130, 147, 6)} {...stroke(stage === 0)} />
        <path d="M230 147H275V91H570M275 147V205H570" {...stroke(stage === 1)} />
        <path d={head.right(570, 91, 6)} {...stroke(stage === 1)} />
        <path d={head.right(570, 205, 6)} {...stroke(stage === 1)} />
        <path d="M570 104H525V131H465M570 190H535V164H465" {...stroke(stage === 2)} />
        <path d={head.left(465, 131, 6)} {...stroke(stage === 2)} />
        <path d={head.left(465, 164, 6)} {...stroke(stage === 2)} />
        <path d="M393 182V260H64V181" {...stroke(stage === 3)} />
        <path d={head.up(64, 181, 6)} {...stroke(stage === 3)} />
        {stage === 3 ? (
          <g>
            <path d="M285 260H325" fill="none" {...ink} />
            <Tile x={325} y={213} w={102} h={84} />
            <Sneaker id={id} cx={376} cy={247} s={0.7} />
            <CatKey x={376} y={281} size={8} anchor="middle" fill={CAT.amberText}>WINNER</CatKey>
          </g>
        ) : null}
        <line x1={30} y1={296} x2={770} y2={296} {...hair} />
        <line x1={30 + ms * 7.4} y1={290} x2={30 + ms * 7.4} y2={302} stroke={CAT.ink} strokeWidth={2} />
        <Price x={770} y={311} size={12} anchor="end">100 ms</Price>
      </Frame>
      <Slider label="Auction clock" min={0} max={100} step={1} value={ms} onChange={setMs} formatValue={(v) => `${v} ms`} />
    </div>
  );
}

type Deal = "open" | "pmp" | "preferred" | "guaranteed";
const DEALS: Record<Deal, { access: number; action: string; price: string }> = {
  open: { access: 5, action: "OPEN AUCTION", price: "$2.40" },
  pmp: { access: 2, action: "DEAL ID · CLOSED AUCTION", price: "$4.80" },
  preferred: { access: 1, action: "FIRST LOOK · NO AUCTION", price: "$5.00 FIXED" },
  guaranteed: { access: 1, action: "FIXED VOLUME · NO AUCTION", price: "$6.00 FIXED" },
};

/** Four buying arrangements drawn as access to one publisher's catalogue slot. */
export function DealAccess() {
  const [deal, setDeal] = useState<Deal>("pmp");
  const id = "w5-deals";
  const d = DEALS[deal];
  return (
    <div>
      <Frame
        width={800}
        height={228}
        label={`${d.action.toLowerCase()}: ${d.access} of five advertiser bids reach the publisher's premium catalogue impression. ${deal === "open" || deal === "pmp" ? `The winning offer is ${d.price}.` : `The offer is ${d.price.toLowerCase()}, without an auction.`}`}
        svgProps={{ "data-plate": "deal-access" }}
      >
        <HalftoneDefs id={id} />
        {[0, 1, 2, 3, 4].map((k) => {
          const on = k < d.access;
          const y = 22 + k * 39;
          return (
            <g key={k}>
              <rect x={34} y={y} width={164} height={29} fill={on && k === 0 ? CAT.amber : CAT.tile} {...ink} />
              <CatKey x={46} y={y + 19} size={8}>ADVERTISER {k + 1}</CatKey>
              {on ? <Price x={187} y={y + 20} size={13} anchor="end">{deal === "guaranteed" ? "10,000 IMP." : k === 0 ? d.price.replace(" FIXED", "") : `$${(Number(d.price.slice(1, 4)) - k * 0.3).toFixed(2)}`}</Price> : null}
              <path d={`M198 ${y + 14.5}H${on ? 292 : 235}`} fill="none" stroke={CAT.ink} strokeWidth={on ? 1.1 : 0.5} strokeDasharray={on ? undefined : "2 3"} />
              {on ? <path d={head.right(292, y + 14.5, 5)} fill="none" {...ink} /> : null}
            </g>
          );
        })}
        <rect x={292} y={20} width={172} height={188} fill={CAT.tile} {...ink} />
        <rect x={295} y={23} width={166} height={182} fill="none" {...hair} />
        {deal === "pmp" ? (
          <g>
            <rect x={312} y={41} width={132} height={35} fill={CAT.tile} {...ink} />
            <CatKey x={378} y={63} size={11} anchor="middle">DEAL ID 024</CatKey>
          </g>
        ) : null}
        <CatKey x={378} y={deal === "pmp" ? 105 : 78} size={11} anchor="middle">{deal === "guaranteed" ? "AUTOMATED" : deal === "preferred" ? "FIRST LOOK" : "AUCTION"}</CatKey>
        <CatKey x={378} y={deal === "pmp" ? 125 : 98} size={11} anchor="middle">{deal === "guaranteed" ? "DIRECT" : deal === "preferred" ? "DECISION" : deal === "pmp" ? "INVITED" : "OPEN"}</CatKey>
        <Price x={378} y={167} size={22} anchor="middle" fill={CAT.amberText}>{d.access} / 5</Price>
        <path d="M464 114H552" fill="none" {...ink} />
        <path d={head.right(552, 114, 7)} fill="none" {...ink} />
        <Tile x={552} y={38} w={216} h={152} />
        <Numeral x={568} y={61}>1</Numeral>
        <CatKey x={750} y={59} size={9} anchor="end">PUBLISHER</CatKey>
        <Sneaker id={id} cx={660} cy={104} s={1.2} />
        <NameLines x={584} y={142} w={152} />
        <Price x={584} y={173} size={16}>{d.price}</Price>
      </Frame>
      <Segmented<Deal>
        label="Buying arrangement"
        value={deal}
        onChange={setDeal}
        options={[
          { id: "open", label: "Open exchange" },
          { id: "pmp", label: "Private marketplace" },
          { id: "preferred", label: "Preferred deal" },
          { id: "guaranteed", label: "Programmatic guaranteed" },
        ]}
      />
    </div>
  );
}

/** One viewer and one impression, appraised differently at three advertisers' desks. */
export function SameSlotDifferentValue() {
  const id = "w5-value";
  const bids = ["$0.40", "$3.80", "$1.10"];
  return (
    <Frame
      width={800}
      height={258}
      label="The same shopper and the same blank ad slot connect to three advertiser valuation desks. Their offers differ: 40 cents, 3 dollars 80 highlighted in amber, and 1 dollar 10."
      svgProps={{ "data-plate": "same-slot-different-value" }}
    >
      <HalftoneDefs id={id} />
      <Person id={id} cx={118} cy={104} s={1.8} />
      <Tile x={54} y={178} w={128} h={54} />
      <CatKey x={118} y={199} size={9} anchor="middle">ONE VIEWER</CatKey>
      <Price x={118} y={221} size={13} anchor="middle">ONE IMPRESSION</Price>
      {[0, 1, 2].map((k) => {
        const y = 27 + k * 88;
        return (
          <g key={k}>
            <path d={`M181 127H250V${y + 33}H370`} fill="none" {...ink} />
            <path d={head.right(370, y + 33, 6)} fill="none" {...ink} />
            <BidSlip x={370} y={y} price={bids[k]} winner={k === 1} />
            <OrderForm x={558} y={y} w={70} h={55} />
            <Price x={698} y={y + 35} size={18}>{bids[k]}</Price>
          </g>
        );
      })}
    </Frame>
  );
}

type Provenance = "first" | "second" | "third";
const DATA_TRAILS: Record<Provenance, { name: string; path: string; detail: string }> = {
  first: { name: "Own customers → marketer", path: "DIRECT + CONSENTED", detail: "DETERMINISTIC" },
  second: { name: "Partner's customers → partner → marketer", path: "TRUSTED HANDOFF", detail: "PARTNER'S 1P" },
  third: { name: "Many sources → broker → marketer", path: "AGGREGATED FOR SALE", detail: "OPAQUE SOURCES" },
};

/** Provenance as a document trail, rather than an abstract quality score. */
export function DataProvenance() {
  const [kind, setKind] = useState<Provenance>("first");
  const id = "w5-provenance";
  const d = DATA_TRAILS[kind];
  return (
    <div>
      <Frame
        width={800}
        height={226}
        label={`${d.name}. ${d.path.toLowerCase()}, with ${kind === "third" ? "stale inferences and opaque sources" : "a visible chain of custody"}. The active document trail is amber.`}
        svgProps={{ "data-plate": "data-provenance" }}
      >
        <HalftoneDefs id={id} />
        {kind === "first" ? (
          <g>
            {[0, 1, 2].map((k) => <Person key={k} id={id} cx={67 + k * 60} cy={100} s={0.95} />)}
            <Arrow x1={207} y1={105} x2={325} y2={105} color={CAT.amber} w={3} />
            <Receipt x={355} y={46} w={92} h={118} />
            <CatKey x={401} y={85} size={9} anchor="middle">OWN CRM</CatKey>
            <NameLines x={369} y={105} w={64} />
            <Price x={401} y={144} size={12} anchor="middle">CONSENTED</Price>
            <Arrow x1={463} y1={105} x2={570} y2={105} color={CAT.amber} w={3} />
            <Shop id={id} x={592} y={55} w={146} h={105} />
          </g>
        ) : kind === "second" ? (
          <g>
            <Shop id={id} x={45} y={65} w={122} h={91} />
            <CatKey x={106} y={185} size={10} anchor="middle">PARTNER</CatKey>
            <Arrow x1={184} y1={105} x2={326} y2={105} color={CAT.amber} w={3} />
            <Envelope id={id} x={342} y={62} w={134} h={86} />
            <CatKey x={409} y={177} size={10} anchor="middle">SHARED DIRECTLY</CatKey>
            <Arrow x1={492} y1={105} x2={586} y2={105} color={CAT.amber} w={3} />
            <Shop id={id} x={608} y={65} w={122} h={91} />
          </g>
        ) : (
          <g>
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <OrderForm x={32 + k * 72} y={45 + k * 20} w={56} h={82} />
                <path d={`M${61 + k * 72} 151V170H294V119H335`} fill="none" {...ink} />
              </g>
            ))}
            <path d={head.right(335, 119, 6)} fill="none" {...ink} />
            <rect x={335} y={57} width={144} height={117} fill={CAT.amber} {...ink} />
            <rect x={338} y={60} width={138} height={111} fill="none" {...hair} />
            <CatKey x={407} y={92} size={11} anchor="middle">DATA</CatKey>
            <CatKey x={407} y={112} size={11} anchor="middle">BROKER</CatKey>
            <Price x={407} y={146} size={16} anchor="middle">SEGMENTS</Price>
            <Arrow x1={494} y1={115} x2={587} y2={115} color={CAT.amber} w={3} />
            <Shop id={id} x={608} y={65} w={122} h={91} />
          </g>
        )}
        <line x1={32} y1={205} x2={768} y2={205} {...hair} />
        <CatKey x={32} y={221} size={9} fill={CAT.amberText}>{d.path}</CatKey>
        <CatKey x={768} y={221} size={9} anchor="end">{d.detail}</CatKey>
      </Frame>
      <Segmented<Provenance>
        label="Data trail"
        value={kind}
        onChange={setKind}
        options={[
          { id: "first", label: "First-party" },
          { id: "second", label: "Second-party" },
          { id: "third", label: "Third-party" },
        ]}
      />
    </div>
  );
}

type Target = "context" | "retarget" | "lookalike";

/** Three everyday scenes, one for each targeting mechanism. */
export function TargetingScenes() {
  const [mode, setMode] = useState<Target>("context");
  const id = "w5-targeting";
  return (
    <div>
      <Frame
        width={800}
        height={248}
        label={mode === "context" ? "A marathon training article sits beside a running-shoe advertisement; the page topic supplies the match, without a user history." : mode === "retarget" ? "A sneaker left in a shopping cart is followed by an advertisement for exactly the same sneaker." : "A seed group of first-party customers trains a platform classifier to select new people with similar behavioural profiles; the new prospects are amber."}
        svgProps={{ "data-plate": "targeting-scenes" }}
      >
        <HalftoneDefs id={id} />
        {mode === "context" ? (
          <g>
            <rect x={42} y={26} width={326} height={190} fill={CAT.tile} {...ink} />
            <rect x={47} y={31} width={316} height={180} fill="none" {...hair} />
            <CatKey x={66} y={57} size={12}>MARATHON TRAINING</CatKey>
            <path d="M70 174C95 153 107 176 130 147S174 151 190 125S235 140 260 102S310 119 335 79" fill="none" {...ink} />
            {[0, 1, 2].map((k) => <line key={k} x1={70} y1={83 + k * 15} x2={180 + k * 35} y2={83 + k * 15} {...hair} />)}
            <Tile x={424} y={26} w={334} h={190} />
            <CatKey x={448} y={55} size={10}>CURRENT PAGE TOPIC</CatKey>
            <Sneaker id={id} cx={590} cy={127} s={2.2} />
            <NameLines x={479} y={177} w={221} />
            <Price x={479} y={201} size={15}>$84.00</Price>
          </g>
        ) : mode === "retarget" ? (
          <g>
            <Tile x={35} y={35} w={205} h={177} />
            <Sneaker id={id} cx={137} cy={103} s={1.4} />
            <path d="M72 154H189L180 188H83Z" fill="none" {...ink} />
            <path d="M72 154L62 134H48" fill="none" {...ink} />
            <circle cx={97} cy={198} r={5} fill={CAT.tile} {...ink} />
            <circle cx={165} cy={198} r={5} fill={CAT.tile} {...ink} />
            <CatKey x={137} y={51} size={9} anchor="middle">LEFT BEHIND</CatKey>
            <path d="M253 126C300 50 425 49 481 110" fill="none" {...ink} />
            <path d={headAlong(481, 110, 1, 1, 7)} fill="none" {...ink} />
            <Tile x={494} y={35} w={270} h={177} />
            <rect x={497} y={38} width={264} height={171} fill={CAT.amber} stroke="none" opacity={0.16} />
            <Sneaker id={id} cx={629} cy={118} s={2.05} />
            <NameLines x={539} y={174} w={180} />
            <Price x={539} y={198} size={14}>EXACT SKU</Price>
          </g>
        ) : (
          <g>
            <Tile x={34} y={39} w={220} h={169} />
            <CatKey x={144} y={64} size={10} anchor="middle">SEED CUSTOMERS</CatKey>
            {[0, 1, 2, 3].map((k) => <Person key={k} id={id} cx={72 + (k % 2) * 107} cy={104 + Math.floor(k / 2) * 65} s={0.72} />)}
            <path d="M254 123H350" fill="none" {...ink} />
            <path d={head.right(350, 123, 7)} fill="none" {...ink} />
            <Agent id={id} cx={408} cy={116} s={1.65} />
            <path d="M465 123H531" fill="none" {...ink} />
            <path d={head.right(531, 123, 7)} fill="none" {...ink} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
              const x = 570 + (k % 4) * 52;
              const y = 83 + Math.floor(k / 4) * 104;
              const on = [0, 2, 5, 7].includes(k);
              return on ? <g key={k}><circle cx={x} cy={y - 10} r={29} fill="none" stroke={CAT.ink} strokeWidth={4} /><circle cx={x} cy={y - 10} r={29} fill="none" stroke={CAT.amber} strokeWidth={2.2} /><Person id={id} cx={x} cy={y} s={0.75} /></g> : <Person key={k} id={id} cx={x} cy={y} s={0.75} />;
            })}
          </g>
        )}
      </Frame>
      <Segmented<Target>
        label="Targeting mechanism"
        value={mode}
        onChange={setMode}
        options={[
          { id: "context", label: "Contextual" },
          { id: "retarget", label: "Retargeting" },
          { id: "lookalike", label: "Lookalike" },
        ]}
      />
    </div>
  );
}

/** An empty reader's chair beside a receipt paid for an ad stack nobody could see. */
export function PaidWithoutViewer() {
  const id = "w5-unseen";
  return (
    <Frame
      width={800}
      height={216}
      label="An empty reader's chair faces a stack of concealed advertisements. Coins buy a receipt for one million impressions, but no person is present to see them; the receipt is amber."
      svgProps={{ "data-plate": "paid-without-viewer" }}
    >
      <HalftoneDefs id={id} />
      <g transform="translate(84 111)">
        <path d="M-48 20V-36Q-48 -49 -35 -49H35Q48 -49 48 -36V20M-48 5H48M-36 20V47M36 20V47" fill={ht(id, "light")} {...ink} />
        <rect x={-33} y={-34} width={66} height={25} fill={CAT.tile} {...hair} />
      </g>
      <rect x={244} y={48} width={174} height={128} fill={CAT.tile} {...ink} />
      <rect x={257} y={34} width={174} height={128} fill={CAT.tile} {...ink} />
      <rect x={270} y={20} width={174} height={128} fill={CAT.tile} {...ink} />
      <rect x={273} y={23} width={168} height={122} fill="none" {...hair} />
      <rect x={285} y={35} width={10} height={10} fill={CAT.ink} />
      <CatKey x={357} y={122} size={10} anchor="middle">1 × 1</CatKey>
      <path d="M454 112H529" fill="none" {...ink} />
      <path d={head.right(529, 112, 7)} fill="none" {...ink} />
      <Receipt x={546} y={26} w={118} h={168} />
      <CatKey x={605} y={63} size={9} anchor="middle">1,000,000</CatKey>
      <Price x={605} y={88} size={12} anchor="middle">IMPRESSIONS</Price>
      <NameLines x={562} y={108} w={86} />
      <Price x={605} y={158} size={24} anchor="middle" fill={CAT.amberText}>PAID</Price>
      {[0, 1, 2].map((k) => <Coin key={k} id={id} cx={730} cy={129 - k * 10} rx={30} ry={7} t={7} />)}
    </Frame>
  );
}

type Verification = "viewable" | "fraud" | "safety" | "frequency";

/** The MRC threshold is a two-part instrument; verification modes expose four different failures and controls. */
export function VerificationLab() {
  const [mode, setMode] = useState<Verification>("viewable");
  const [pixels, setPixels] = useState(40);
  const [seconds, setSeconds] = useState(0.8);
  const [video, setVideo] = useState(false);
  const [cap, setCap] = useState(3);
  const id = "w5-verification";
  const required = video ? 2 : 1;
  const pass = pixels >= 50 && seconds >= required;
  const visibleH = r2(96 * pixels / 100);
  return (
    <div>
      <Frame
        width={800}
        height={290}
        label={mode === "viewable" ? `${pixels} percent of a ${video ? "video" : "display"} ad is visible for ${seconds.toFixed(1)} continuous seconds. ${pass ? "It meets" : "It does not meet"} the MRC threshold of at least 50 percent for at least ${required} continuous ${required === 2 ? "seconds" : "second"}.` : mode === "fraud" ? "Non-human bot clicks, stacked advertisements and a hidden 1 by 1 pixel generate invalid traffic." : mode === "safety" ? "An airline advertisement is separated from unsuitable news by a brand-safety exclusion rule." : `A frequency cap of ${cap} impressions stops the same sneaker advertisement after ${cap} showings; further attempts are blocked.`}
        svgProps={{ "data-plate": "verification-lab" }}
      >
        <HalftoneDefs id={id} />
        {mode === "viewable" ? (
          <g>
            <rect x={35} y={25} width={210} height={226} fill={CAT.tile} {...ink} />
            <rect x={46} y={38} width={188} height={164} fill={CAT.tile} stroke={CAT.amber} strokeWidth={3} />
            <rect x={46} y={202 - visibleH} width={188} height={visibleH} fill={ht(id, "light")} stroke="none" />
            <line x1={46} y1={202 - visibleH} x2={234} y2={202 - visibleH} {...ink} />
            <Sneaker id={id} cx={140} cy={112} s={1.5} />
            <NameLines x={66} y={169} w={148} />
            <line x1={55} y1={113} x2={235} y2={113} stroke={CAT.ink} strokeWidth={1} strokeDasharray="3 3" />
            <CatKey x={140} y={224} size={10} anchor="middle">50% PIXELS</CatKey>
            <Price x={140} y={247} size={16} anchor="middle" fill={pixels >= 50 ? CAT.amberText : CAT.ink}>{pixels}%</Price>
            <Stopwatch cx={369} cy={105} r={60} t={Math.min(7.99, seconds)} />
            <Price x={369} y={198} size={26} anchor="middle">{seconds.toFixed(1)} s</Price>
            <CatKey x={369} y={222} size={10} anchor="middle">CONTINUOUS</CatKey>
            <Price x={369} y={244} size={14} anchor="middle">{required} s REQUIRED</Price>
            <rect x={522} y={65} width={240} height={108} fill={pass ? CAT.amber : CAT.tile} {...ink} />
            <rect x={525} y={68} width={234} height={102} fill="none" {...hair} />
            <CatKey x={642} y={100} size={12} anchor="middle">{video ? "MRC VIDEO TEST" : "MRC DISPLAY TEST"}</CatKey>
            <Price x={642} y={143} size={28} anchor="middle">{pass ? "VIEWABLE" : "NOT YET"}</Price>
            <CatKey x={642} y={206} size={10} anchor="middle">50% OR MORE</CatKey>
            <CatKey x={642} y={227} size={10} anchor="middle">{video ? "FOR 2 SECONDS" : "FOR 1 SECOND"}</CatKey>
          </g>
        ) : mode === "fraud" ? (
          <g>
            <Agent id={id} cx={115} cy={113} s={1.8} />
            {[0, 1, 2, 3].map((k) => <Cursor key={k} x={61 + k * 32} y={195 - (k % 2) * 22} scale={1.4} />)}
            <path d="M197 126H309" fill="none" {...ink} />
            <path d={head.right(309, 126, 7)} fill="none" {...ink} />
            {[0, 1, 2].map((k) => <rect key={k} x={326 + k * 17} y={38 + k * 17} width={168} height={123} fill={CAT.tile} {...ink} />)}
            <rect x={377} y={87} width={11} height={11} fill={CAT.ink} />
            <Price x={410} y={229} size={14} anchor="middle">1 × 1 PIXEL</Price>
            <Arrow x1={528} y1={126} x2={594} y2={126} color={CAT.amber} w={3} />
            <Price x={688} y={120} size={33} anchor="middle" fill={CAT.amberText}>FAKE</Price>
            <CatKey x={688} y={146} size={9} anchor="middle">FAKE CLICKS</CatKey>
          </g>
        ) : mode === "safety" ? (
          <g>
            <rect x={35} y={31} width={328} height={218} fill={CAT.tile} {...ink} />
            <CatKey x={56} y={60} size={11}>AVIATION ACCIDENT</CatKey>
            <path d="M68 156L169 119L230 131L163 144L131 181L112 181L127 147L77 166Z" fill={ht(id, "dense")} {...ink} />
            <path d="M64 90H288M64 100H250M64 211H288M64 221H260" {...hair} />
            <rect x={457} y={31} width={308} height={218} fill={CAT.tile} {...ink} />
            <CatKey x={479} y={60} size={11}>AIRLINE OFFER</CatKey>
            <path d="M500 156L596 119L661 131L592 144L560 181L541 181L557 147L506 166Z" fill={ht(id, "light")} {...ink} />
            <path d="M407 82V134" stroke={CAT.ink} strokeWidth={5} />
            <path d="M407 82V134" stroke={CAT.amber} strokeWidth={3} />
            <rect x={387} y={169} width={40} height={40} fill={CAT.tile} stroke={CAT.ink} strokeWidth={1.6} />
            <rect x={391} y={173} width={32} height={32} fill="none" {...hair} />
            <CatKey x={407} y={192} size={7.5} anchor="middle">STOP</CatKey>
            <path d="M394 196L420 182" fill="none" {...ink} />
            <CatKey x={400} y={231} size={8} anchor="middle">EXCLUDE</CatKey>
          </g>
        ) : (
          <g>
            {Array.from({ length: 6 }, (_, k) => {
              const x = 32 + k * 126;
              const on = k < cap;
              return (
                <g key={k}>
                  <Tile x={x} y={42} w={108} h={148} />
                  <Sneaker id={id} cx={x + 54} cy={100} s={0.8} />
                  <NameLines x={x + 16} y={143} w={76} />
                  <Price x={x + 16} y={173} size={13}>{on ? k + 1 : "—"}</Price>
                  {!on ? <g><path d={`M${x + 10} 180L${x + 98} 52`} stroke={CAT.tile} strokeWidth={12} /><path d={`M${x + 10} 180L${x + 98} 52`} stroke={CAT.ink} strokeWidth={2} /></g> : null}
                </g>
              );
            })}
            <path d={`M31 215H${r2(31 + cap * 126 - 18)}`} stroke={CAT.ink} strokeWidth={5} />
            <path d={`M31 215H${r2(31 + cap * 126 - 18)}`} stroke={CAT.amber} strokeWidth={3} />
            <CatKey x={31} y={250} size={11} fill={CAT.amberText}>{cap} ALLOWED</CatKey>
            <CatKey x={769} y={250} size={11} anchor="end">SAME INDIVIDUAL</CatKey>
          </g>
        )}
      </Frame>
      <Segmented<Verification>
        label="Verification"
        value={mode}
        onChange={setMode}
        options={[{ id: "viewable", label: "Viewability" }, { id: "fraud", label: "Invalid traffic" }, { id: "safety", label: "Brand safety" }, { id: "frequency", label: "Frequency cap" }]}
      />
      {mode === "viewable" ? (
        <>
          <Segmented<"display" | "video"> label="Creative" value={video ? "video" : "display"} onChange={(v) => setVideo(v === "video")} options={[{ id: "display", label: "Display" }, { id: "video", label: "Video" }]} />
          <Slider label="Visible pixels" min={0} max={100} step={5} value={pixels} onChange={setPixels} formatValue={(v) => `${v}%`} />
          <Slider label="Continuous time" min={0} max={3} step={0.1} value={seconds} onChange={setSeconds} formatValue={(v) => `${v.toFixed(1)} s`} />
        </>
      ) : mode === "frequency" ? <Slider label="Frequency cap" min={1} max={6} step={1} value={cap} onChange={setCap} formatValue={(v) => `${v} ads`} /> : null}
    </div>
  );
}

const SUPPLY_FEES = [
  { id: "agency", label: "Trading desk", fee: 6 },
  { id: "dsp", label: "DSP", fee: 10 },
  { id: "data", label: "Data provider", fee: 5 },
  { id: "verify", label: "Verification", fee: 4 },
  { id: "reseller", label: "Redundant reseller", fee: 10 },
  { id: "exchange", label: "Exchange", fee: 4 },
  { id: "ssp", label: "SSP", fee: 6 },
];

/** Follow one dollar through each fee; removing redundant intermediaries increases the publisher payout. */
export function SupplyPath() {
  const [removed, setRemoved] = useState<string[]>(["reseller"]);
  const id = "w5-supply";
  const kept = SUPPLY_FEES.filter((f) => !removed.includes(f.id));
  const tax = kept.reduce((sum, f) => sum + f.fee, 0);
  const net = 100 - tax;
  return (
    <div>
      <Frame
        width={800}
        height={260}
        label={`A 100-cent advertising dollar passes through ${kept.length} intermediaries. Fees consume ${tax} cents and the publisher receives ${net} cents, highlighted in amber. ${removed.length ? `${removed.length} ${removed.length === 1 ? "intermediary is" : "intermediaries are"} bypassed by supply-path optimization.` : "No intermediaries are bypassed."}`}
        svgProps={{ "data-plate": "supply-path" }}
      >
        <HalftoneDefs id={id} />
        <Price x={56} y={112} size={32} anchor="middle">$1.00</Price>
        {[0, 1, 2].map((k) => <Coin key={k} id={id} cx={56} cy={151 - k * 10} rx={27} ry={6} t={6} />)}
        <path d="M93 129H158" fill="none" {...ink} />
        <path d={head.right(158, 129, 6)} fill="none" {...ink} />
        <rect x={158} y={45} width={140} height={174} fill={CAT.tile} {...ink} />
        <rect x={161} y={48} width={134} height={168} fill="none" {...hair} />
        <CatKey x={228} y={71} size={10} anchor="middle">SUPPLY PATH</CatKey>
        {kept.map((f, k) => (
          <g key={f.id}>
            <line x1={176} y1={94 + k * 16} x2={225} y2={94 + k * 16} {...hair} />
            <Price x={280} y={98 + k * 16} size={11} anchor="end">−{f.fee}¢</Price>
          </g>
        ))}
        <path d="M298 129H411" fill="none" {...ink} />
        <path d={head.right(411, 129, 6)} fill="none" {...ink} />
        <Shop id={id} x={435} y={67} w={136} h={122} />
        <Price x={503} y={217} size={16} anchor="middle">PUBLISHER</Price>
        <rect x={608} y={45} width={152} height={174} fill={CAT.amber} {...ink} />
        <rect x={611} y={48} width={146} height={168} fill="none" {...hair} />
        <CatKey x={684} y={79} size={10} anchor="middle">NET PAYOUT</CatKey>
        <Price x={684} y={145} size={46} anchor="middle">{net}¢</Price>
        <line x1={630} y1={164} x2={738} y2={164} {...ink} />
        <Price x={684} y={193} size={16} anchor="middle">FEES {tax}¢</Price>
        <line x1={24} y1={241} x2={776} y2={241} {...hair} />
        <CatKey x={24} y={255} size={8}>AUDIT + CONSOLIDATE</CatKey>
        <CatKey x={776} y={255} size={8} anchor="end">DIRECT · LOWER FEE</CatKey>
      </Frame>
      <Toggles<string>
        label="Supply path"
        value={removed}
        onChange={setRemoved}
        options={[{ id: "reseller", label: "Bypass redundant reseller −10¢" }]}
      />
    </div>
  );
}

/** A winter boot with a high cuff, engraved vamp and pale tread. */
function WinterBoot({ id, cx, cy, s = 1 }: { id: string; cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} strokeLinejoin="round">
      <path d="M-18 -24H1V-2Q8 2 22 8V14H-18Z" fill={ht(id, "light")} {...ink} />
      <path d="M-18 -24H-10V14H-18Z" fill={ht(id, "dense")} stroke="none" />
      <path d="M-21 14H24V19H-21Z" fill={CAT.tile} {...ink} />
      <path d="M-18 -25H1M-7 -17H0M-7 -11H0M-7 -5H0" fill="none" {...ink} />
      <path d="M-14 15V19M-5 15V19M4 15V19M13 15V19" fill="none" {...hair} />
    </g>
  );
}

/** A frequency tally continues after an offline purchase, exposing the missing suppression signal. */
export function SeventeenImpressions() {
  const id = "w5-seventeen";
  return (
    <Frame
      width={800}
      height={236}
      label="Seventeen identical winter-boot advertisement slips accumulate over forty-eight hours. After fifteen impressions, a parcel bought at a local mall interrupts the sequence. The sixteenth and seventeenth impressions still follow, highlighted in amber."
      svgProps={{ "data-plate": "seventeen-impressions" }}
    >
      <HalftoneDefs id={id} />
      {Array.from({ length: 17 }, (_, k) => {
        const x = 22 + k * 35 + (k >= 15 ? 103 : 0);
        const y = 34 + (k % 3) * 8;
        return (
          <g key={k}>
            <rect x={x} y={y} width={42} height={100} fill={k >= 15 ? CAT.amber : CAT.tile} {...ink} />
            <WinterBoot id={id} cx={x + 21} cy={y + 30} s={0.62} />
            <NameLines x={x + 7} y={y + 61} w={28} gap={4} />
            <Price x={x + 21} y={y + 88} size={12} anchor="middle">{k + 1}</Price>
          </g>
        );
      })}
      <Parcel id={id} x={570} y={69} w={42} h={44} />
      <CatKey x={591} y={133} size={8} anchor="middle">LOCAL MALL</CatKey>
      <path d="M591 151H634" fill="none" {...ink} />
      <path d={head.right(634, 151, 6)} fill="none" {...ink} />
      <line x1={24} y1={184} x2={738} y2={184} {...ink} />
      <CatKey x={26} y={207} size={10}>48 HOURS</CatKey>
      <Price x={738} y={211} size={22} anchor="end" fill={CAT.amberText}>17 ADS</Price>
    </Frame>
  );
}

/** Once-linked websites lose their shared identifier as browser, OS and privacy restrictions intervene. */
export function BrokenCookieTrail() {
  const id = "w5-cookie";
  return (
    <Frame
      width={800}
      height={236}
      label="A trail of cookie tags and mobile advertising identifiers once connected three websites. Browser restrictions, an opt-in prompt and privacy rules interrupt the trail; the broken link is amber."
      svgProps={{ "data-plate": "broken-cookie-trail" }}
    >
      <HalftoneDefs id={id} />
      {[0, 1, 2].map((k) => {
        const x = 40 + k * 272;
        return (
          <g key={k}>
            <rect x={x} y={72} width={164} height={122} fill={CAT.tile} {...ink} />
            <rect x={x + 5} y={77} width={154} height={112} fill="none" {...hair} />
            <rect x={x + 12} y={86} width={140} height={10} fill={CAT.ink} />
            <NameLines x={x + 23} y={119} w={118} gap={9} />
            <NameLines x={x + 23} y={151} w={93} gap={9} />
            <circle cx={x + 82} cy={42} r={23} fill={ht(id, "dense")} {...ink} />
            <path d={`M${x + 85} 18Q${x + 76} 27 ${x + 86} 34Q${x + 74} 41 ${x + 82} 48Q${x + 71} 56 ${x + 83} 64`} fill={CAT.paper} {...ink} />
            <CatKey x={x + 82} y={219} size={10} anchor="middle">{k === 1 ? "MOBILE ID" : "3P COOKIE"}</CatKey>
          </g>
        );
      })}
      <path d="M205 135H299M477 135H571" fill="none" {...ink} />
      <path d="M246 120L262 150M518 120L534 150" stroke={CAT.ink} strokeWidth={6} />
      <path d="M246 120L262 150M518 120L534 150" stroke={CAT.amber} strokeWidth={3.5} />
      <rect x={330} y={10} width={140} height={41} fill={CAT.tile} {...ink} />
      <CatKey x={400} y={35} size={10} anchor="middle">ALLOW TRACKING?</CatKey>
    </Frame>
  );
}

type PrivacyRoute = "capi" | "cleanroom" | "contextual";

/** Privacy-preserving mechanisms, drawn as documents, secure joins and content frames rather than tracking identifiers. */
export function PrivacyRoutes() {
  const [route, setRoute] = useState<PrivacyRoute>("cleanroom");
  const id = "w5-privacy";
  return (
    <div>
      <Frame
        width={800}
        height={270}
        label={route === "capi" ? "A consented first-party purchase receipt travels directly from the merchant commerce server to the advertising platform server; the browser third-party pixel is bypassed." : route === "cleanroom" ? "The brand and media platform keep their raw first-party ledgers inside separate sides of a locked clean room. Only an aggregate overlap count leaves the room." : "Frame-by-frame article and video content passes through a language and vision model to select a contextually relevant product advertisement, without a cross-site user identifier."}
        svgProps={{ "data-plate": "privacy-routes" }}
      >
        <HalftoneDefs id={id} />
        {route === "capi" ? (
          <g>
            <rect x={45} y={58} width={192} height={130} fill={CAT.tile} {...ink} />
            <rect x={49} y={62} width={184} height={122} fill="none" {...hair} />
            <CatKey x={141} y={88} size={10} anchor="middle">COMMERCE SERVER</CatKey>
            <Receipt x={95} y={104} w={92} h={69} />
            <rect x={563} y={58} width={192} height={130} fill={CAT.tile} {...ink} />
            <rect x={567} y={62} width={184} height={122} fill="none" {...hair} />
            <CatKey x={659} y={88} size={10} anchor="middle">PLATFORM SERVER</CatKey>
            <Agent id={id} cx={659} cy={136} s={1.1} />
            <path d="M253 125H547" fill="none" stroke={CAT.amber} strokeWidth={3} />
            <path d={head.right(547, 125, 7)} fill="none" stroke={CAT.amber} strokeWidth={3} />
            <CatKey x={400} y={108} size={10} anchor="middle" fill={CAT.amberText}>CONSENTED PURCHASE EVENT</CatKey>
            <path d="M282 216H518" stroke={CAT.ink} strokeWidth={0.6} strokeDasharray="2 4" />
            <rect x={366} y={204} width={68} height={24} fill={CAT.tile} {...ink} />
            <CatKey x={400} y={220} size={8} anchor="middle">3P PIXEL</CatKey>
            <path d="M382 231L420 200" fill="none" {...ink} />
          </g>
        ) : route === "cleanroom" ? (
          <g>
            <rect x={128} y={30} width={544} height={208} fill={CAT.tile} {...ink} />
            <rect x={132} y={34} width={536} height={200} fill="none" {...hair} />
            <line x1={400} y1={43} x2={400} y2={224} stroke={CAT.ink} strokeWidth={1} strokeDasharray="3 4" />
            {[0, 1].map((side) => (
              <g key={side}>
                <CatKey x={side ? 536 : 264} y={62} size={10} anchor="middle">{side ? "MEDIA PLATFORM" : "BRAND"}</CatKey>
                {[0, 1, 2, 3].map((k) => <OrderForm key={k} x={side ? 450 : 182} y={80 + k * 24} w={168} h={18} />)}
              </g>
            ))}
            <rect x={378} y={108} width={44} height={38} fill={CAT.amber} {...ink} />
            <path d="M387 108V99A13 13 0 0 1 413 99V108" fill="none" {...ink} />
            <circle cx={400} cy={124} r={4} fill={CAT.ink} />
            <path d="M672 135H747" fill="none" stroke={CAT.amber} strokeWidth={3} />
            <path d={head.right(747, 135, 7)} fill="none" stroke={CAT.amber} strokeWidth={3} />
            <Price x={711} y={111} size={23} anchor="middle" fill={CAT.amberText}>OVERLAP</Price>
            <CatKey x={400} y={258} size={10} anchor="middle">AGGREGATE RESULT · RAW ROWS STAY INSIDE</CatKey>
          </g>
        ) : (
          <g>
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <rect x={30 + k * 108} y={62 + k * 25} width={118} height={145} fill={CAT.tile} {...ink} />
                <rect x={38 + k * 108} y={72 + k * 25} width={102} height={52} fill={ht(id, "light")} {...hair} />
                <NameLines x={43 + k * 108} y={142 + k * 25} w={87} />
              </g>
            ))}
            <Arrow x1={363} y1={137} x2={428} y2={137} color={CAT.amber} w={3} />
            <Agent id={id} cx={493} cy={127} s={1.7} />
            <Arrow x1={557} y1={137} x2={615} y2={137} color={CAT.amber} w={3} />
            <Tile x={615} y={49} w={152} h={178} />
            <Sneaker id={id} cx={691} cy={127} s={1.35} />
            <NameLines x={638} y={178} w={106} />
            <Price x={638} y={210} size={14}>$84.00</Price>
            <CatKey x={195} y={250} size={10} anchor="middle">FRAME MEANING + TONE</CatKey>
            <CatKey x={691} y={250} size={10} anchor="middle" fill={CAT.amberText}>NO USER HISTORY</CatKey>
          </g>
        )}
      </Frame>
      <Segmented<PrivacyRoute>
        label="Privacy-preserving route"
        value={route}
        onChange={setRoute}
        options={[{ id: "capi", label: "Conversion API" }, { id: "cleanroom", label: "Data clean room" }, { id: "contextual", label: "Contextual AI" }]}
      />
    </div>
  );
}

/** Creative assets and profit signals enter one automated campaign suite. */
export function CreativeToBlackBox() {
  const id = "w5-blackbox-intro";
  return (
    <Frame
      width={800}
      height={238}
      label="Modular headlines, a product catalogue, creative variations and a margin-adjusted conversion-value receipt feed an automated campaign console. A single amber profit signal enters the black-box system."
      svgProps={{ "data-plate": "creative-to-blackbox" }}
    >
      <HalftoneDefs id={id} />
      <OrderForm x={32} y={42} w={106} h={130} />
      <NameLines x={47} y={87} w={75} />
      <NameLines x={47} y={110} w={62} />
      <Tile x={158} y={42} w={126} h={130} />
      <Mug id={id} cx={221} cy={95} scale={1.45} />
      <NameLines x={177} y={134} w={88} />
      <Price x={177} y={158} size={13}>$18.00</Price>
      <Tile x={310} y={42} w={108} h={130} />
      <CatKey x={364} y={76} size={9} anchor="middle">CONVERSION</CatKey>
      <Price x={364} y={122} size={18} anchor="middle" fill={CAT.amberText}>PROFIT</Price>
      <NameLines x={326} y={140} w={76} />
      <path d="M138 108H158M284 108H310M418 108H485" fill="none" {...ink} />
      <path d={head.right(485, 108, 7)} fill="none" {...ink} />
      <rect x={485} y={42} width={275} height={130} fill={CAT.tile} {...ink} />
      <rect x={489} y={46} width={267} height={122} fill="none" {...hair} />
      <Agent id={id} cx={622.5} cy={100} s={1.55} />
      <CatKey x={622.5} y={149} size={10} anchor="middle">GOAL-BASED OPTIMIZATION</CatKey>
      <path d="M622 172V212H180" fill="none" {...ink} />
      <path d={head.left(180, 212, 6)} fill="none" {...ink} />
      <Price x={495} y={207} size={14} anchor="middle" fill={CAT.amberText}>MARGIN-ADJUSTED VALUE</Price>
    </Frame>
  );
}

type CreativeContext = "commuter" | "runner";
type CreativeFormat = "wide" | "square";

/** A modular product feed is assembled for a viewer and a placement; controls change the actual advertisement. */
export function CreativeAssembler() {
  const [context, setContext] = useState<CreativeContext>("runner");
  const [format, setFormat] = useState<CreativeFormat>("wide");
  const id = "w5-creative";
  const wide = format === "wide";
  return (
    <div>
      <Frame
        width={800}
        height={284}
        label={`A modular headline, engraved sneaker image, price and call to action are assembled into a ${wide ? "wide" : "square"} advertisement for a ${context}. The ${context === "runner" ? "run-ready" : "commuter"} proposition and ${wide ? "landscape" : "portrait crop"} adapt while the product and price remain constant.`}
        svgProps={{ "data-plate": "creative-assembler" }}
      >
        <HalftoneDefs id={id} />
        <Tile x={26} y={34} w={174} h={214} />
        <CatKey x={44} y={59} size={9}>PRODUCT FEED</CatKey>
        <Sneaker id={id} cx={113} cy={103} s={1.05} />
        <NameLines x={48} y={141} w={130} />
        <Price x={48} y={177} size={18}>$84.00</Price>
        <CatKey x={48} y={207} size={9}>{context === "runner" ? "RUN READY" : "CITY COMFORT"}</CatKey>
        <CatKey x={48} y={230} size={9}>SHOP NOW</CatKey>
        <path d="M216 142H296" fill="none" stroke={CAT.amber} strokeWidth={3} />
        <path d={head.right(296, 142, 7)} fill="none" stroke={CAT.amber} strokeWidth={3} />
        {wide ? (
          <g>
            <Tile x={312} y={54} w={460} h={178} />
            <Sneaker id={id} cx={459} cy={139} s={2.05} />
            <line x1={569} y1={78} x2={569} y2={208} {...hair} />
            <Price x={595} y={108} size={22}>{context === "runner" ? "RUN READY" : "CITY COMFORT"}</Price>
            <CatKey x={596} y={143} size={10}>{context === "runner" ? "EVERY MILE, LIGHTER" : "EVERY COMMUTE, EASIER"}</CatKey>
            <Price x={595} y={182} size={20}>$84.00</Price>
            <rect x={674} y={191} width={74} height={23} fill={CAT.amber} {...ink} />
            <CatKey x={711} y={206} size={8} anchor="middle">SHOP NOW</CatKey>
          </g>
        ) : (
          <g>
            <Tile x={414} y={23} w={232} h={250} />
            <Price x={530} y={53} size={17} anchor="middle">{context === "runner" ? "RUN READY" : "CITY COMFORT"}</Price>
            <Sneaker id={id} cx={530} cy={124} s={1.75} />
            <CatKey x={530} y={182} size={8} anchor="middle">{context === "runner" ? "EVERY MILE, LIGHTER" : "EVERY COMMUTE, EASIER"}</CatKey>
            <Price x={449} y={219} size={19}>$84.00</Price>
            <rect x={528} y={229} width={94} height={25} fill={CAT.amber} {...ink} />
            <CatKey x={575} y={245} size={8} anchor="middle">SHOP NOW</CatKey>
          </g>
        )}
      </Frame>
      <Segmented<CreativeContext>
        label="Viewer context"
        value={context}
        onChange={setContext}
        options={[{ id: "runner", label: "Runner" }, { id: "commuter", label: "Commuter" }]}
      />
      <Segmented<CreativeFormat>
        label="Placement"
        value={format}
        onChange={setFormat}
        options={[{ id: "wide", label: "Wide display" }, { id: "square", label: "Square feed" }]}
      />
    </div>
  );
}

/** A doubled platform report sits beside almost-flat warehouse orders and bank revenue. */
export function ReportedVsBank() {
  const id = "w5-reported";
  return (
    <Frame
      width={800}
      height={252}
      label="The platform's conversion report doubles from 100 to 200 and reports acquisition cost down 40 percent. The warehouse dispatch ledger grows only from 100 to 104 orders and bank revenue grows 4 percent. The gap between the two ledgers is amber."
      svgProps={{ "data-plate": "reported-vs-bank" }}
    >
      <HalftoneDefs id={id} />
      <g transform="rotate(-3 188 124)">
        <Tile x={65} y={26} w={246} h={180} />
        <CatKey x={188} y={62} size={11} anchor="middle">PLATFORM REPORT</CatKey>
        <Price x={188} y={109} size={39} anchor="middle">100 → 200</Price>
        <CatKey x={188} y={146} size={10} anchor="middle">CONVERSIONS</CatKey>
        <line x1={97} y1={155} x2={279} y2={155} {...hair} />
        <Price x={188} y={184} size={19} anchor="middle">CPA −40%</Price>
      </g>
      <Warehouse id={id} x={438} y={58} w={198} h={130} />
      {[0, 1, 2, 3].map((k) => <Parcel key={k} id={id} x={660 + k * 27} y={151 - (k % 2) * 8} w={21} h={22} />)}
      <Price x={537} y={223} size={16} anchor="middle">100 → 104 ORDERS</Price>
      <path d="M340 67V217" stroke={CAT.ink} strokeWidth={5} />
      <path d="M340 67V217" stroke={CAT.amber} strokeWidth={3} />
      <Price x={349} y={49} size={25} fill={CAT.amberText}>THE GAP</Price>
      <Price x={710} y={218} size={19} anchor="middle" fill={CAT.amberText}>REVENUE +4%</Price>
    </Frame>
  );
}

/* NEXT PLATE */
