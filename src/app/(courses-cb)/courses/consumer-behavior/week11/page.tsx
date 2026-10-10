"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import {
  createExerciseLookup,
  type ExerciseInput,
} from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 11 — CULTURE, SUBCULTURES, AND SOCIAL CLASS
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's fixed cast: the consumer (one Person look), the
// wrapped gift, the brand badge and the AI assistant.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive plates (students act on the drawing itself), both on real data:
//   · Hofstede's dimensions: pick two countries and compare them on five
//     rails (Hofstede's published scores).
//   · Ethnocentrism in AI models: pick a model and see its CETSCALE scores
//     for statements about four countries, or only the country-pairing shift
//     (Wadi, Ghodrat & Philp, 2026).
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise, of the type that fits
// it, testing that slide and the ones before it.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** Content slides trim the deck's outer padding so each topic fits one screen. */
const TIGHT = "md:!py-16";

type Tone = "signal" | "counter" | "ink";

const BORDER: Record<Tone, string> = {
  signal: "border-[var(--signal)]",
  counter: "border-[var(--counter)]",
  ink: "border-[var(--ink)]",
};

const TEXT: Record<Tone, string> = {
  signal: "text-[var(--signal)]",
  counter: "text-[var(--counter)]",
  ink: "text-[var(--ink)]",
};

/** One verbatim line at reading size. */
function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-body max-w-[var(--measure)]", className)}>
      {children}
    </p>
  );
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-h2 !font-normal", className)}>{children}</p>;
}

/** Coloured term inside a line. */
function Term({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>
  );
}

/** Inline colour for a phrase inside a serif line. */
function Tint({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return <span className={TEXT[tone]}>{children}</span>;
}

/** Hairline-topped block. */
function Ruled({
  tone = "ink",
  children,
  className = "",
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/**
 * A plate that lives in a column: a figure well without the 680px floor. A
 * `wide` (800-unit) plate keeps a legible minimum width on phones and scrolls
 * inside its well there, like `Figure`; from lg up the column is wide enough.
 */
function Plate({
  children,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "figure-well w-full min-w-0 p-3",
        wide && "overflow-x-auto",
        className,
      )}
    >
      {wide ? (
        <div className="min-w-[480px] lg:min-w-0">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Slide heading. A "Label:" prefix from the content is set as a small tracked
 * kicker inside the same h2, so the heading text stays exactly as written.
 */
function Heading({
  kicker,
  children,
  tone = "signal",
  className = "",
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
  className?: string;
}) {
  return (
    <div className="mb-6 w-full">
      <h2 className={cn("type-h1 max-w-[32ch]", className)}>
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-4 block !text-[0.8rem]",
                "!text-[var(--ink-3)]",
              )}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-3 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Ruled lines in a grid, each followed by its own plate. */
function Cells({
  cols = 2,
  items,
  className = "",
}: {
  cols?: 2 | 3 | 4 | 5;
  items: {
    key: string;
    tone: Tone;
    plate?: React.ReactNode;
    text: React.ReactNode;
  }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-10 md:grid-cols-2 md:gap-x-8 lg:gap-x-6 lg:gap-y-6",
        {
          2: "md:gap-x-10",
          3: "lg:grid-cols-3",
          4: "lg:grid-cols-4",
          5: "lg:grid-cols-5",
        }[cols],
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-3">
          <div className={cn("border-t-2 pt-3", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          {s.plate ? (
            <div className="figure-well mt-auto w-full min-w-0 p-3">
              {s.plate}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** A ruled line with its plate beside it, for rows of text-and-picture pairs. */
function SideCell({
  plate,
  children,
  plateClass = "",
  className = "",
}: {
  plate: React.ReactNode;
  children: React.ReactNode;
  plateClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-w-0 items-center gap-4 border-t-2 border-[var(--ink)] pt-3 sm:grid-cols-[1fr_1.15fr]",
        className,
      )}
    >
      <p className="type-body min-w-0">{children}</p>
      <div className={cn("figure-well w-full min-w-0 p-2", plateClass)}>
        {plate}
      </div>
    </div>
  );
}


export default function Week11() {
  return (
    <SlideDeck label="Week 11">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 11
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[20ch]">
              Culture, Subcultures, and Social Class
            </Title>
            <div className="mt-8 max-w-[44ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                Culture shapes how consumers see every product. AI models also{" "}
                <Tint>carry cultural patterns</Tint> from the text they learn
                from.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[580px]">
            <V.CultureShelf />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Culture as a Lens
          ================================================================ */}
      <Slide className={TIGHT} id="culture-as-a-lens" border>
        <Heading>Culture as a Lens</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.9fr_2fr] lg:gap-10">
          <Statement className="!max-w-[24ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
            <Term>Culture</Term> is{" "}
            <Tint>the shared meanings, values, rituals, and traditions</Tint>{" "}
            of a society.
          </Statement>
          <SideCell plate={<V.TwoTables />} className="sm:grid-cols-[1fr_1.4fr]">
            Consumers learn culture from family, school, religion, and media,
            usually without noticing.{" "}
            Culture shapes what people eat, wear, celebrate, and consider
            polite or offensive.
          </SideCell>
        </div>
        <div className="mt-6 grid w-full items-center gap-x-10 gap-y-5 lg:grid-cols-[1.7fr_1fr]">
          <SideCell plate={<V.SameGiftTwoMeanings />} className="sm:grid-cols-[1fr_1.5fr]">
            A product that succeeds in one country can fail in another because
            it carries a different meaning there.
          </SideCell>
          <Ruled tone="ink" className="!pt-3">
            <Big className="!text-[clamp(1.1rem,1.5vw,1.3rem)]">
              Marketers who enter a new market study its culture before they
              adapt the product, the message, or the price.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Cultural Values: Hofstede's Dimensions
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cultural-values-hofstedes-dimensions"
        border
        exercise={exercise["cultural-values-hofstedes-dimensions"]}
      >
        <Heading kicker="Cultural Values:">Hofstede&apos;s Dimensions</Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              <Term>Cultural values</Term> are shared beliefs about what is
              good and desirable in a society.
            </P>
            <P>
              Hofstede described several dimensions on which national cultures
              differ (Hofstede, 2001).
            </P>
            <Ruled tone="ink" className="!pt-2">
              <P>
                <Term>Individualism versus collectivism</Term>: whether people
                see themselves mainly as individuals or as members of a group.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-2">
              <P>
                <Term>Power distance</Term>: how much people accept an unequal
                distribution of power and status.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-2">
              <P>
                <Term>Uncertainty avoidance</Term>: how uncomfortable people
                feel with ambiguity and risk.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-2">
              <P>
                <Term>Masculinity versus femininity</Term>: whether a society
                values achievement and competition or care and quality of life.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-2">
              <P>
                <Term>Long-term orientation</Term>: whether people focus on
                future rewards, such as saving, or on the present and the past.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Plate wide>
              <V.HofstedeCompare />
            </Plate>
            <SideCell plate={<V.TwoAds />} className="sm:grid-cols-[1fr_1.1fr]">
              An ad that celebrates standing out from the crowd suits an{" "}
              <Tint>individualist</Tint> culture. An ad that shows a family
              choosing together suits a collectivist culture.
            </SideCell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Rituals, Myths, and Symbols
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="rituals-myths-and-symbols"
        border
        exercise={exercise["rituals-myths-and-symbols"]}
      >
        <Heading>Rituals, Myths, and Symbols</Heading>
        <Statement className="!max-w-[56ch] !text-[clamp(1.3rem,2vw,1.75rem)]">
          A <Term>ritual</Term> is a set of symbolic behaviors that people{" "}
          <Tint>repeat in a fixed order</Tint>.
        </Statement>
        <Cells
          cols={5}
          className="mt-6"
          items={[
            {
              key: "grooming",
              tone: "ink",
              plate: <V.MorningRoutine />,
              text: (
                <>
                  <Term>Grooming rituals</Term>, such as a morning skin-care
                  routine, help people move from their private self to their
                  public self.
                </>
              ),
            },
            {
              key: "gift",
              tone: "ink",
              plate: <V.GiftAndCard />,
              text: (
                <>
                  <Term>Gift-giving rituals</Term>, such as birthdays and
                  holidays, express relationships and obligations.
                </>
              ),
            },
            {
              key: "holiday",
              tone: "ink",
              plate: <V.Holidays />,
              text: (
                <>
                  <Term>Holiday rituals</Term>, such as a Thanksgiving dinner
                  or Lunar New Year, create large seasonal markets.
                </>
              ),
            },
            {
              key: "rites",
              tone: "ink",
              plate: <V.RitesOfPassage />,
              text: (
                <>
                  <Term>Rites of passage</Term>, such as graduations and
                  weddings, mark a change in social status and come with their
                  own products.
                </>
              ),
            },
            {
              key: "myth",
              tone: "ink",
              plate: <V.HeroAd />,
              text: (
                <>
                  A <Term>myth</Term> is a story with symbolic elements that
                  expresses a culture&apos;s shared ideals. Brands borrow myths,
                  such as the hero who overcomes a challenge.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Sacred and Profane Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sacred-and-profane-consumption"
        border
        exercise={exercise["sacred-and-profane-consumption"]}
      >
        <Heading>Sacred and Profane Consumption</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
              <Term>Sacred consumption</Term> involves objects and events that
              people <Tint>set apart and treat with respect or awe</Tint>.
            </Statement>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Profane consumption</Term> involves ordinary, everyday
                objects that have no special status.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SacredProfane />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-8 gap-y-6 md:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              Objects can become sacred through <Term>sacralization</Term>,
              such as a signed jersey, a family heirloom, or a souvenir from a
              special trip.
            </P>
            <Plate className="mx-auto mt-auto lg:max-w-[300px]">
              <V.BecameSacred />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              Objects can lose sacred status through{" "}
              <Term>desacralization</Term>, such as a national symbol printed
              on cheap merchandise.
            </P>
            <Plate className="mx-auto mt-auto lg:max-w-[300px]">
              <V.FlagMerch />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>Consumers often refuse to sell sacred possessions at any price.</P>
            <Plate className="mx-auto mt-auto lg:max-w-[300px]">
              <V.NotForSale />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Subcultures: Shared Identity Within a Culture
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="subcultures-shared-identity-within-a-culture"
        border
        exercise={exercise["subcultures-shared-identity-within-a-culture"]}
      >
        <Heading kicker="Subcultures:">Shared Identity Within a Culture</Heading>
        <Statement className="!max-w-[62ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          A <Term>subculture</Term> is a group whose members share beliefs and
          experiences that set them apart from the wider culture.
        </Statement>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Age subcultures</Term> group consumers by generation,
                such as Baby Boomers, Generation X, Millennials, and Generation
                Z.
              </P>
            </Ruled>
            <P>
              Each generation grew up with different technologies, events, and
              brands, which shape its media habits and preferences.
            </P>
          </div>
          <Plate wide>
            <V.GenerationScreens />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.RegionalMap />} className="sm:grid-cols-[1fr_1fr]">
            <Term>Geographic subcultures</Term> reflect regional differences in
            climate, food, language, and lifestyle.
          </SideCell>
          <SideCell plate={<V.DietSeals />} className="sm:grid-cols-[1fr_1fr]">
            <Term>Ethnic and religious subcultures</Term> share traditions,
            holidays, and sometimes dietary rules, such as halal or kosher
            food.
          </SideCell>
        </div>
        <Big className="mt-5 !max-w-[72ch] !text-[clamp(1.1rem,1.5vw,1.3rem)]">
          Marketers can reach a subculture with products and messages that{" "}
          <Tint>respect its identity</Tint>, rather than with one message for
          everyone.
        </Big>
      </Slide>

      {/* ================================================================
          Social Class and Status Symbols
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-class-and-status-symbols"
        border
        exercise={exercise["social-class-and-status-symbols"]}
      >
        <Heading>Social Class and Status Symbols</Heading>
        <div className="grid w-full gap-x-8 gap-y-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
            <Term>Social class</Term> is a person&apos;s standing in society,
            based on income, education, and occupation.
          </Statement>
          <Ruled tone="ink" className="!pt-3">
            <P>
              Members of a social class tend to share values, tastes, and
              consumption patterns.
            </P>
          </Ruled>
          <Ruled tone="ink" className="!pt-3">
            <P>
              Class shapes taste. It influences which music, food, clothing,
              and leisure activities people consider good.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              <Term>Status symbols</Term> are products that signal a
              person&apos;s position in the social hierarchy, such as luxury
              watches or designer bags.
            </P>
            <Plate className="mt-auto">
              <V.StatusSymbols />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3">
            <P>
              Old money often signals status{" "}
              <Tint>quietly through heritage and understated quality</Tint>.
              New money often signals status through visible brands and logos.
            </P>
            <Plate className="mt-auto">
              <V.OldNewMoney />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Conspicuous Consumption and Income Inequality
          ================================================================ */}
      <Slide className={TIGHT} id="conspicuous-consumption-and-income-inequality" border>
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Conspicuous Consumption and Income Inequality
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
            <Term>Conspicuous consumption</Term> is the purchase of goods
            mainly to display wealth and status (Veblen, 1899).
          </Statement>
          <SideCell plate={<V.LoudQuiet />} className="sm:grid-cols-[1.2fr_1fr]">
            Consumers with a strong need for status prefer luxury goods with
            large, visible logos. Wealthy consumers with no such need often
            prefer <Tint>quiet designs that only other insiders recognize</Tint>{" "}
            (Han, Nunes, &amp; Drèze, 2010).
          </SideCell>
        </div>
        <Cells
          cols={3}
          className="mt-6 lg:!grid-cols-[1.4fr_1fr_1fr]"
          items={[
            {
              key: "inequality",
              tone: "ink",
              plate: <V.ThreeStores />,
              text: (
                <>
                  In many markets, growing income inequality has come with
                  growth at both the luxury end and the discount end, while
                  mid-priced brands lose share.
                </>
              ),
            },
            {
              key: "experiences",
              tone: "ink",
              plate: <V.Experiences />,
              text: (
                <>
                  Some consumers signal status through experiences, such as
                  travel and fine dining, rather than through objects.
                </>
              ),
            },
            {
              key: "knowledge",
              tone: "ink",
              plate: <V.PourOver />,
              text: (
                <>
                  Others signal status through knowledge and taste, such as
                  expertise in coffee or wine, rather than through price.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Consumer Ethnocentrism and Country of Origin
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-ethnocentrism-and-country-of-origin"
        border
        exercise={exercise["consumer-ethnocentrism-and-country-of-origin"]}
      >
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          Consumer Ethnocentrism and Country of Origin
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P>
              The <Term>country-of-origin effect</Term> occurs when consumers
              judge a product by the country where it was made.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Consumers associate some countries with quality in certain
                categories, such as German cars, French perfume, or Swiss
                watches.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.MadeIn />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.HomeJar />} className="sm:grid-cols-[1fr_1fr]">
            <Term>Consumer ethnocentrism</Term> is the belief that buying
            products from one&apos;s own country is right and buying imports is
            wrong (Shimp &amp; Sharma, 1987).{" "}
            Ethnocentric consumers prefer domestic products{" "}
            <Tint>even when imports are better or cheaper</Tint>.
          </SideCell>
          <SideCell plate={<V.ScaleSheet />} className="sm:grid-cols-[1fr_1fr]">
            Researchers measure consumer ethnocentrism with the CETSCALE, a
            set of statements such as &quot;Buy [national]-made products. Keep
            [the nation] working.&quot;
          </SideCell>
        </div>
        <Big className="mt-5 !max-w-[72ch] !text-[clamp(1.1rem,1.5vw,1.3rem)]">
          Marketers emphasize local origin in ethnocentric markets and play
          down foreign origin when it hurts the brand.
        </Big>
      </Slide>

      {/* ================================================================
          Cultural Bias in AI Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cultural-bias-in-ai-models"
        border
        exercise={exercise["cultural-bias-in-ai-models"]}
      >
        <Heading>Cultural Bias in AI Models</Heading>
        <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-2">
          <P className="!max-w-none">
            AI models are trained on large amounts of text, and much of that
            text comes from a small number of languages and countries.
          </P>
          <P className="!max-w-none">
            A model can therefore carry the values of some cultures more
            strongly than others.
          </P>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1.4fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P className="!max-w-none">
                Researchers gave the CETSCALE to AI models developed in the
                United States, China, Canada, and France, and asked each model
                about consumers in each of those countries (Wadi, Ghodrat, &amp;
                Philp, 2026).
              </P>
            </Ruled>
            <P className="!max-w-none">
              The models differed in how ethnocentric their answers were
              overall (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
            <P className="!max-w-none">
              Across all models, answers were{" "}
              <Tint>least ethnocentric when the statements were about China</Tint>
              , and more ethnocentric when they were about the United States or
              Canada (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
            <P className="!max-w-none">
              Several models also showed a country-of-origin bias: their
              answers shifted in a consistent pattern for particular pairings
              of the model&apos;s home country and the country in the question
              (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
          </div>
          <Plate wide>
            <V.ModelEthnocentrism />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 border-t-2 border-[var(--ink)] pt-3 md:grid-cols-2 md:gap-10">
          <P className="!max-w-none">
            An AI assistant that recommends products to consumers around the
            world may carry such preferences into its recommendations.
          </P>
          <P className="!max-w-none">
            Global brands therefore need to check how AI assistants represent
            their country of origin and their culture in each market.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Culture in the Cart
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-culture-in-the-cart" border>
        <Heading kicker="Discussion:" tone="counter">
          Culture in the Cart
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">
              Choose a product you buy regularly. Would a consumer from another
              culture or subculture use it, give it, or display it differently?
              If you asked an AI assistant to recommend the same product, would
              its answer reflect your culture or another one?
            </p>
          </div>
          <Plate className="mx-auto lg:max-w-[440px]">
            <V.CultureCart />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
