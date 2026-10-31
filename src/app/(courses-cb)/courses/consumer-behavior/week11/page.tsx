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
import {
  TIGHT,
  P,
  Lead,
  Statement,
  Big,
  Term,
  Tint,
  Ruled,
  Plate,
  SlideHeading,
  PartHead,
  Numbered,
  Prompt,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 11: CULTURE, SUBCULTURES, AND SOCIAL CLASS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);


export default function Week11() {
  return (
    <SlideDeck label="Week 11">
      {/* ================================================================
          1. Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 11
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Culture, Subcultures, and Social Class
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote !text-[clamp(1.35rem,2.1vw,1.8rem)]">
              Culture, subcultures, and social class provide the{" "}
              <Tint>shared meanings, rituals, and status hierarchies</Tint> that
              govern consumption and shape the cultural representations embedded
              in AI models.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          2. Defining Culture and Cultural Meaning Transfer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="defining-culture-and-cultural-meaning-transfer"
        border
      >
        <SlideHeading>
          Defining Culture and Cultural Meaning Transfer
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!max-w-[34ch] !text-[clamp(1.15rem,1.65vw,1.45rem)]">
              <Term>Culture</Term> is the accumulation of{" "}
              <Tint>shared meanings, rituals, norms, and traditions</Tint> among
              the members of an organization or society (Solomon, 2020).
            </Statement>
            <Ruled>
              <P>
                Culture acts as an interpretive lens that determines which
                products are considered edible, wearable, appropriate for
                gift-giving, or taboo.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SameGiftTwoMeanings />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Grant McCracken (1986) showed that cultural meaning is constantly
              in transit across three locations: the{" "}
              <Term>culturally constituted world</Term>, the{" "}
              <Term>consumer good</Term>, and the{" "}
              <Term>individual consumer</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Advertising and the fashion system transfer symbolic meaning from
              the cultural world into physical consumer goods.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers then extract that meaning from the good into their own
              lives through possession, grooming, exchange, and divestment
              rituals.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          3. Enculturation, Acculturation, and Cultural Norms
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="enculturation-acculturation-and-cultural-norms"
        border
      >
        <SlideHeading>
          Enculturation, Acculturation, and Cultural Norms
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Cultural beliefs are not innate. They are{" "}
              <Tint>learned continuously</Tint> through social interaction,
              family upbringing, education, religious institutions, and media.
            </Lead>
            <Ruled>
              <P>
                <Term>Enculturation</Term> is the process of learning the values
                and behavioral standards of one&apos;s own native culture during
                childhood and adolescence.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Acculturation</Term> is the process of learning and
                adapting to the values and consumption norms of a new host
                culture after migration or international relocation (Peñaloza,
                1994).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TwoTables />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Cultural norms divide into <Term>enacted norms</Term> (explicitly
              codified rules, such as traffic laws or legal drinking ages) and{" "}
              <Term>crescive norms</Term> (subtle, unwritten customs learned
              only by living within the culture).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Crescive norms include <Term>customs</Term> (everyday routines
              such as meal times), <Term>mores</Term> (moral prohibitions
              carrying strong social sanction), and <Term>conventions</Term>{" "}
              (etiquette governing hospitality and dress).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          4. Part 1: Cross-Cultural Dimensions and Global Marketing
          ================================================================ */}
      <Slide
        id="part-1-cross-cultural-dimensions-and-global-marketing"
        border
      >
        <PartHead
          n={1}
          title="Cross-Cultural Dimensions and Global Marketing"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,1.9vw,1.65rem)]">
            National cultures differ systematically in how they structure{" "}
            <Tint>
              relationships between the individual and the group, hierarchy,
              risk, and time
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Cross-cultural frameworks allow global marketers to diagnose when
              a successful domestic campaign will fail abroad.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          5. Hofstede's Dimensions of National Culture
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="hofstedes-dimensions-of-national-culture"
        border
        exercise={exercise["hofstedes-dimensions-of-national-culture"]}
      >
        <SlideHeading>
          Hofstede&apos;s Dimensions of National Culture
        </SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[0.95fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Lead>
              Geert Hofstede (2001) identified{" "}
              <Tint>core dimensions</Tint> along which national value systems
              vary systematically across countries.
            </Lead>
            <Ruled>
              <P>
                <Term>Individualism versus collectivism</Term> measures the
                degree to which people prioritize personal autonomy and
                self-expression versus harmony, duty, and in-group loyalty.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Power distance</Term> measures the extent to which less
                powerful members of a society accept and expect unequal
                distributions of authority and status hierarchy.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Uncertainty avoidance</Term> measures the degree to which
                members of a culture feel threatened by ambiguous or unknown
                situations and seek formal rules, guarantees, and familiar
                brands.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate wide>
              <V.HofstedeCompare />
            </Plate>
            <Ruled>
              <P className="!max-w-none">
                <Term>Masculinity versus femininity</Term> contrasts societies
                emphasizing competition and material achievement against those
                emphasizing care and quality of life, while{" "}
                <Term>long-term orientation</Term> measures emphasis on thrift,
                perseverance, and future rewards.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          6. High-Context Versus Low-Context Communication Styles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="high-context-versus-low-context-communication-styles"
        border
      >
        <SlideHeading>
          High-Context Versus Low-Context Communication Styles
        </SlideHeading>
        <Statement className="!max-w-[54ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          Anthropologist Edward T. Hall (1976) distinguished cultures according
          to{" "}
          <Tint>
            how much meaning is carried by the surrounding social context versus
            the explicit verbal code
          </Tint>
          .
        </Statement>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              In <Term>low-context cultures</Term> (such as the United States,
              Germany, and Canada), communication is direct, literal, and
              explicit, and advertisements rely on clear verbal comparisons and
              stated functional benefits.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In <Term>high-context cultures</Term> (such as Japan, South Korea,
              and Arab countries), much of the message is conveyed implicitly
              through shared background knowledge, non-verbal cues, aesthetics,
              and social harmony.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Aggressive comparative advertisements that directly disparage a
              named rival often perform well in low-context individualist
              markets but are viewed as rude and untrustworthy in high-context
              collectivist markets.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.1rem,1.5vw,1.35rem)]">
              Global brand communications must calibrate both verbal directness
              and visual symbolism to the communication context of the target
              market.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          7. Standardization Versus Adaptation in Global Campaigns
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="standardization-versus-adaptation-in-global-campaigns"
        border
      >
        <SlideHeading>
          Standardization Versus Adaptation in Global Campaigns
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Multinational firms face a strategic trade-off between{" "}
              <Tint>global standardization and local cultural adaptation</Tint>{" "}
              (glocalization).
            </Lead>
            <Ruled>
              <P>
                <Term>Standardization</Term> uses a unified brand identity,
                product formula, and advertising campaign worldwide, capturing
                economies of scale and serving globally mobile segments.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Adaptation</Term> modifies product ingredients, package
                sizes, pricing tiers, or promotional appeals to match local
                cultural values, dietary laws, and retail infrastructure.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TwoAds />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Global restaurant chains, for example, maintain standardized
              operational systems and brand logos while adapting menu offerings
              to local religious norms and flavor profiles.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.1rem,1.5vw,1.35rem)]">
              Successful global strategy standardizes the core value proposition
              where needs are universal and adapts execution where cultural
              meaning diverges.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          8. Part 2: Rituals, Myths, and Sacred Consumption
          ================================================================ */}
      <Slide id="part-2-rituals-myths-and-sacred-consumption" border>
        <PartHead n={2} title="Rituals, Myths, and Sacred Consumption" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,1.9vw,1.65rem)]">
            Within any culture, shared values are enacted through{" "}
            <Tint>recurring behavioral rituals and narrative myths</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Consumers also partition the material world into ordinary profane
              commodities and revered sacred possessions.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          9. Consumer Rituals and Rites of Passage
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-rituals-and-rites-of-passage"
        border
        exercise={exercise["consumer-rituals-and-rites-of-passage"]}
      >
        <SlideHeading>Consumer Rituals and Rites of Passage</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!max-w-[36ch] !text-[clamp(1.15rem,1.65vw,1.45rem)]">
              Dennis Rook (1985) defined a <Term>ritual</Term> as a type of
              expressive, symbolic activity constructed of multiple behaviors
              that{" "}
              <Tint>
                occur in a fixed, episodic sequence and tend to be repeated over
                time
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                Every consumer ritual rests on four tangible elements:{" "}
                <Term>ritual artifacts</Term> (special goods, foods, clothing,
                or gifts required for the event), a <Term>ritual script</Term>{" "}
                (the prescribed sequence of use),{" "}
                <Term>performance roles</Term>, and an <Term>audience</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.RitesOfPassage />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Grooming rituals</Term> (such as morning skincare or
              pre-interview preparation) transition the individual from the
              private self to the public social self.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Gift-giving rituals</Term> unfold across{" "}
              <Term>gestation</Term> (selecting and buying the gift),{" "}
              <Term>presentation</Term> (the exchange ceremony), and{" "}
              <Term>reformulation</Term> (adjusting the relationship bond
              afterward) (Sherry, 1983).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Rites of passage</Term> mark transitions between social
              statuses (graduation, marriage, parenthood, retirement) and
              trigger predictable surges in category spending (van Gennep,
              1960).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          10. Cultural Myths and Archetypes in Brand Storytelling
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cultural-myths-and-archetypes-in-brand-storytelling"
        border
      >
        <SlideHeading>
          Cultural Myths and Archetypes in Brand Storytelling
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              A <Term>myth</Term> is a story containing symbolic elements that
              expresses the shared emotions and ideals of a culture, often{" "}
              <Tint>resolving an underlying tension between opposing forces</Tint>{" "}
              (such as nature versus technology).
            </Lead>
            <Ruled>
              <P>
                <Term>Monomyths</Term> (such as the hero&apos;s journey) recur
                across cultures and provide a familiar narrative structure that
                audiences process effortlessly.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.HeroAd />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Brands embed cultural myths into advertising by casting the
              consumer as the hero and the brand as the enabling mentor or
              talisman that helps overcome an obstacle (Holt, 2004).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Outdoor apparel brands frequently draw on the myth of wilderness
              renewal, while technology brands draw on the myth of creative
              liberation against conformity.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Iconic brands maintain cultural relevance by updating how their
              myth addresses contemporary social anxieties.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          11. Sacred and Profane Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sacred-and-profane-consumption"
        border
        exercise={exercise["sacred-and-profane-consumption"]}
      >
        <SlideHeading>Sacred and Profane Consumption</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Belk, Wallendorf, and Sherry (1989) demonstrated that secular
              consumer behavior frequently exhibits the structure of{" "}
              <Tint>sacred versus profane domains</Tint>.
            </Lead>
            <Ruled>
              <P>
                <Term>Profane consumption</Term> involves ordinary, everyday
                utilitarian objects and routines that carry no special
                reverence.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Sacred consumption</Term> involves objects, places,
                people, or events that are set apart from the ordinary world and
                treated with awe, respect, and emotional protection.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SacredProfane />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term>Sacralization</Term> occurs when an ordinary item becomes
              sacred through contamination (touching a revered person, such as a
              game-worn jersey), collecting, gift-giving, or pilgrimage to a
              landmark place.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Desacralization</Term> occurs when a formerly sacred symbol
              or religious holiday is mass-produced and commercialized into an
              ordinary commodity.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          12. Discussion: Adapting a Ritual Product Across Cultural Contexts
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-adapting-a-ritual-product-across-cultural-contexts"
        border
      >
        <SlideHeading kicker="Discussion:">
          Adapting a Ritual Product Across Cultural Contexts
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:gap-10">
          <Prompt>
            <Term>Discussion:</Term> A premium confectionery brand known in
            North America for Valentine&apos;s Day romantic gift boxes wants to
            expand into East Asian markets where gift-giving rituals center on
            Lunar New Year family visits and reciprocal workplace gifting. Using
            McCracken&apos;s (1986) meaning transfer model, Rook&apos;s (1985)
            ritual components (artifacts, script, roles, audience), and
            Hofstede&apos;s cultural dimensions, how should the brand redesign
            its packaging, assortment structure, and advertising narrative?
          </Prompt>
          <Plate>
            <V.Holidays />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          13. Part 3: Subcultures and Generational Cohorts
          ================================================================ */}
      <Slide id="part-3-subcultures-and-generational-cohorts" border>
        <PartHead n={3} title="Subcultures and Generational Cohorts" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,1.9vw,1.65rem)]">
            No national culture is homogeneous. Within any society, consumers
            belong to{" "}
            <Tint>
              multiple subcultures defined by age, generation, geography,
              ethnicity, and religion
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Subcultural memberships often predict everyday food, media, and
              brand preferences more strongly than national averages.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          14. Defining Subcultures and Microcultures
          ================================================================ */}
      <Slide className={TIGHT} id="defining-subcultures-and-microcultures" border>
        <SlideHeading>Defining Subcultures and Microcultures</SlideHeading>
        <Statement className="!max-w-[54ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          A <Term>subculture</Term> is a distinct group within a larger society
          whose members{" "}
          <Tint>
            share beliefs, values, customs, or historical experiences
          </Tint>{" "}
          that set them apart from the broader population.
        </Statement>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Whereas demographic categories simply classify individuals by a
              statistical label, a subculture involves shared identity,
              communication channels, and behavioral norms.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Microcultures</Term> (or consumption subcultures) form
              voluntarily around shared lifestyle passions, such as marathon
              runners, esports gamers, or vintage car restorers (Schouten &amp;
              McAlexander, 1995).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers simultaneously belong to multiple demographic and
              voluntary subcultures, activating whichever identity is salient in
              a given consumption setting.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.1rem,1.5vw,1.35rem)]">
              Subcultural marketing succeeds when it demonstrates authentic
              understanding of the group&apos;s norms rather than relying on
              superficial stereotypes.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          15. Age and Generational Cohorts in Consumer Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="age-and-generational-cohorts-in-consumer-markets"
        border
        exercise={exercise["age-and-generational-cohorts-in-consumer-markets"]}
      >
        <SlideHeading>
          Age and Generational Cohorts in Consumer Markets
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.95fr_1.75fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              An <Term>age cohort</Term> (or generation) consists of individuals
              born within a similar time span who experienced the same{" "}
              <Tint>
                formative macroeconomic, technological, and historical events
                during youth
              </Tint>
              .
            </Lead>
            <Ruled>
              <P>
                Because formative events occur at a critical developmental
                stage, generational cohorts carry distinct attitudes toward
                debt, digital technology, and brand authority across their
                lifespan (Schewe &amp; Meredith, 2004).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.GenerationScreens />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Marketers commonly segment adult populations across{" "}
              <Term>Baby Boomers</Term>, <Term>Generation X</Term>,{" "}
              <Term>Millennials</Term> (Generation Y), and{" "}
              <Term>Generation Z</Term>, while tracking emerging{" "}
              <Term>Generation Alpha</Term> habits.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Intergenerational influence also flows in both directions within
              households: parents socialize children into staple grocery brands,
              while young adults frequently guide parents&apos; adoption of
              digital apps and electronics.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Effective cohort marketing separates true{" "}
              <Term>generational cohort effects</Term> (lasting values formed in
              youth) from <Term>life-stage effects</Term> (changes caused by
              aging, marriage, or retirement).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          16. Geographic, Ethnic, and Religious Subcultures
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="geographic-ethnic-and-religious-subcultures"
        border
      >
        <SlideHeading>
          Geographic, Ethnic, and Religious Subcultures
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Geographic subcultures</Term> arise from persistent regional
              differences in climate, topography, historical settlement
              patterns, and urban-rural lifestyles.
            </Lead>
            <Ruled>
              <P>
                Even within a single country, regional subcultures exhibit
                pronounced differences in culinary tastes, outdoor recreation,
                vehicle choice, and linguistic idioms.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Ethnic subcultures</Term> maintain distinct heritage
                traditions, family structures, language preferences, and holiday
                calendars alongside participation in the mainstream market.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.DietSeals />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term>Religious subcultures</Term> shape consumption directly
              through dietary laws (such as halal and kosher certification),
              modesty norms in apparel, Sabbath observance, and charitable
              giving rituals.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.1rem,1.5vw,1.35rem)]">
              Inclusive product development and certification allow brands to
              serve ethnic and religious subcultures with{" "}
              <Tint>functional fidelity and cultural respect</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          17. Part 4: Social Class, Status Symbols, and Country of Origin
          ================================================================ */}
      <Slide
        id="part-4-social-class-status-symbols-and-country-of-origin"
        border
      >
        <PartHead
          n={4}
          title="Social Class, Status Symbols, and Country of Origin"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,1.9vw,1.65rem)]">
            Every society stratifies its members into a hierarchy of social
            classes that command{" "}
            <Tint>
              unequal access to economic resources, prestige, and institutional
              power
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Social class and national origin operate as powerful symbolic
              signals in product evaluation.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          18. Social Stratification, Cultural Capital, and Taste
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-stratification-cultural-capital-and-taste"
        border
      >
        <SlideHeading>
          Social Stratification, Cultural Capital, and Taste
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!max-w-[36ch] !text-[clamp(1.15rem,1.65vw,1.45rem)]">
              <Term>Social class</Term> is the relatively permanent and
              homogeneous division of a society into{" "}
              <Tint>
                hierarchical groups sharing similar occupation, education,
                income, values, and lifestyles
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                Income alone does not define social class: a skilled
                tradesperson and a university professor may earn identical
                salaries while exhibiting very different consumption patterns
                and media habits.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.PourOver />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Sociologist Pierre Bourdieu (1984) showed that class position
              rests on three forms of capital: <Term>economic capital</Term>{" "}
              (financial wealth), <Term>social capital</Term> (networks and
              connections), and <Term>cultural capital</Term> (education,
              aesthetic knowledge, and refined taste).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Cultural capital is expressed through tacit knowledge of how to
              appreciate abstract art, specialty gastronomy, or literature,
              functioning as a subtle barrier to entry.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Taste hierarchies therefore serve to reproduce social boundaries
              even in markets where mass manufacturing makes physical goods
              widely affordable.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          19. Conspicuous Consumption, Quiet Luxury, and Status Signaling
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="conspicuous-consumption-quiet-luxury-and-status-signaling"
        border
        exercise={
          exercise["conspicuous-consumption-quiet-luxury-and-status-signaling"]
        }
      >
        <SlideHeading>
          Conspicuous Consumption, Quiet Luxury, and Status Signaling
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Thorstein Veblen (1899) introduced{" "}
              <Term>conspicuous consumption</Term> to describe the acquisition
              and public display of costly goods primarily to{" "}
              <Tint>signal wealth and social dominance</Tint>.
            </Lead>
            <Ruled>
              <P>
                Modern luxury research shows that not all wealthy consumers
                prefer loud, visible brand logos.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Han, Nunes, and Drèze (2010) classified consumers by wealth and
                need for status into four groups that respond differently to{" "}
                <Term>brand prominence</Term> (how visible a logo is).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.LoudQuiet />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term>Parvenus</Term> (high wealth, high need for status) prefer
              loud luxury goods with prominent logos so that observers outside
              their class immediately recognize the price paid.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Patricians</Term> (high wealth, low need for status) pay a
              premium for &quot;quiet luxury&quot;: inconspicuously branded
              items whose subtle craftsmanship is recognized only by fellow
              insiders possessing high cultural capital (Han, Nunes, &amp;
              Drèze, 2010).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          20. Country-of-Origin Effects and Consumer Ethnocentrism
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="country-of-origin-effects-and-consumer-ethnocentrism"
        border
        exercise={
          exercise["country-of-origin-effects-and-consumer-ethnocentrism"]
        }
      >
        <SlideHeading>
          Country-of-Origin Effects and Consumer Ethnocentrism
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.95fr_1.65fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              The <Term>country-of-origin (COO) effect</Term> occurs when
              consumers use the country where a product is designed or
              manufactured as an{" "}
              <Tint>extrinsic cue to infer product quality</Tint> (Bilkey &amp;
              Nes, 1982).
            </Lead>
            <Ruled>
              <P>
                Favorable country-category stereotypes (such as Swiss
                wristwatches, German engineering, Italian leather, or Japanese
                electronics) transfer positive quality expectations to
                unfamiliar brands from those nations.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.MadeIn />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Distinct from cognitive quality inference,{" "}
              <Term>consumer ethnocentrism</Term> is the normative belief held
              by consumers about the appropriateness and morality of purchasing
              foreign-made products (Shimp &amp; Sharma, 1987).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Highly ethnocentric consumers view buying imported goods as
              unpatriotic because they believe it harms the domestic economy and
              causes local job losses.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Shimp and Sharma (1987) developed the 17-item{" "}
              <Term>CETSCALE</Term> (Consumer Ethnocentrism Tendencies Scale) to
              measure this construct across international markets.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          21. Part 5: Cultural and Country-of-Origin Bias in AI Models
          ================================================================ */}
      <Slide
        id="part-5-cultural-and-country-of-origin-bias-in-ai-models"
        border
      >
        <PartHead
          n={5}
          title="Cultural and Country-of-Origin Bias in AI Models"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,1.9vw,1.65rem)]">
            As consumers delegate product search and evaluation to AI assistants
            around the world, a critical question arises:{" "}
            <Tint>
              do large language models carry cultural and country-of-origin
              biases of their own?
            </Tint>
          </Statement>
          <Ruled>
            <Lead>
              Empirical research administering cross-cultural scales to frontier
              AI models reveals systematic differences across developers and
              target countries.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          22. Training Corpus Imbalance and Cultural Representation in LLMs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="training-corpus-imbalance-and-cultural-representation-in-llms"
        border
      >
        <SlideHeading>
          Training Corpus Imbalance and Cultural Representation in LLMs
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Large language models learn cultural norms, values, and brand
              associations from the{" "}
              <Tint>
                statistical patterns of their pre-training text corpora and
                post-training alignment datasets
              </Tint>
              .
            </Lead>
            <Ruled>
              <P>
                Because global internet text is disproportionately written in
                English and a few other major languages, models do not sample
                all human cultures equally.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.CultureShelf />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              When a user asks an AI assistant for advice on gift-giving
              etiquette, dietary norms, or product quality, the model defaults
              toward the cultural norms most prevalent in the language and
              corpus of the query.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In addition, models developed in different geopolitical
              jurisdictions undergo different alignment guidelines and train on
              different domestic versus international text ratios.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consequently, AI assistants cannot be treated as culturally
              neutral arbiters of global consumer markets.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          23. Measuring Consumer Ethnocentrism Across Frontier AI Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="measuring-consumer-ethnocentrism-across-frontier-ai-models"
        border
        exercise={
          exercise["measuring-consumer-ethnocentrism-across-frontier-ai-models"]
        }
      >
        <SlideHeading>
          Measuring Consumer Ethnocentrism Across Frontier AI Models
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_1.45fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <P className="!max-w-none">
              To test whether AI models exhibit country-of-origin and
              ethnocentric biases, Wadi, Ghodrat, and Philp (2026) administered
              the validated <Term>CETSCALE</Term> to frontier AI models
              developed in the United States, China, Canada, and France.
            </P>
            <Ruled>
              <P className="!max-w-none">
                Each model was evaluated across items framed for consumers in
                each of those four countries, using repeated
                probability-weighted scale measurement (Wadi, Ghodrat, &amp;
                Philp, 2026).
              </P>
            </Ruled>
            <Ruled>
              <P className="!max-w-none">
                First, models differed significantly in their overall baseline
                level of consumer ethnocentrism across developers (Wadi,
                Ghodrat, &amp; Philp, 2026).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.ModelEthnocentrism />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P className="!max-w-none">
              Second, across all tested models regardless of developer origin,
              responses were{" "}
              <Tint>
                consistently least ethnocentric when the CETSCALE statements
                referred to China
              </Tint>
              , and significantly more ethnocentric when the statements referred
              to the United States or Canada (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
          </Ruled>
          <Ruled>
            <P className="!max-w-none">
              Thus, the target country named in the prompt systematically shifts
              how strongly an AI model endorses domestic-product preference
              (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          24. Home-Country Interactions and Global Brand Strategy in AI Channels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="home-country-interactions-and-global-brand-strategy-in-ai-channels"
        border
      >
        <SlideHeading>
          Home-Country Interactions and Global Brand Strategy in AI Channels
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Beyond main effects of developer and target country, several AI
              models exhibited{" "}
              <Tint>
                specific interaction biases linking the model developer&apos;s
                home country to the country evaluated in the prompt
              </Tint>{" "}
              (Wadi, Ghodrat, &amp; Philp, 2026).
            </Lead>
            <Ruled>
              <P>
                These interaction patterns indicate that an AI assistant
                developed in one region may evaluate domestic versus imported
                brands differently from an assistant developed in another region
                (Wadi, Ghodrat, &amp; Philp, 2026).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.CultureCart />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              When consumers rely on AI shopping assistants to recommend
              automobiles, electronics, or food products, embedded
              country-of-origin preferences in the model can tilt the
              consideration set toward or away from foreign brands.
            </P>
          </Ruled>
          <Ruled>
            <P>
              International marketing managers must therefore audit how major
              regional and global AI models represent their brand&apos;s country
              of origin across local languages and prompts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Highlighting objective, verifiable quality certifications and
              local economic contributions in machine-readable product data
              helps counter unfavorable country stereotypes in both human and AI
              evaluations.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          25. Discussion: Managing Country-of-Origin Positioning in Human and AI Channels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-managing-country-of-origin-positioning-in-human-and-ai-channels"
        border
      >
        <SlideHeading kicker="Discussion:">
          Managing Country-of-Origin Positioning in Human and AI Channels
        </SlideHeading>
        <Prompt>
          <Term>Discussion:</Term> A Canadian manufacturer of premium winter
          parkas manufactures its garments in Winnipeg and plans to expand sales
          into the United States, France, and China through both flagship retail
          stores and regional AI shopping assistants. Drawing on Han, Nunes, and
          Drèze (2010) on brand prominence, Shimp and Sharma (1987) on the
          CETSCALE, and Wadi, Ghodrat, and Philp (2026) on country-of-origin
          biases in AI models, how should the firm manage logo prominence and
          country-of-origin messaging across these three markets and across
          human versus AI channels?
        </Prompt>
      </Slide>

      {/* ================================================================
          26. Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {[
            "Culture is a society's shared system of meanings, norms, and traditions, and cultural meaning moves from the culturally constituted world into consumer goods via advertising and into consumers' lives via rituals (McCracken, 1986).",
            "Cross-cultural marketing analyzes societies across Hofstede's dimensions (individualism-collectivism, power distance, uncertainty avoidance, masculinity-femininity, long-term orientation) and Hall's high- versus low-context communication styles.",
            "Consumers enact cultural meaning through grooming, gift-giving, holiday, and rite-of-passage rituals, cultural myths, and the separation of sacred from profane consumption.",
            "Within any national culture, generational cohorts, geographic regions, and ethnic or religious subcultures maintain distinct identities and consumption norms.",
            "Social class reflects economic, social, and cultural capital, shaping whether consumers signal status through loud conspicuous logos (parvenus) or quiet understated craftsmanship (patricians), while country-of-origin stereotypes and consumer ethnocentrism (CETSCALE) shape attitudes toward imports.",
            "Frontier AI models exhibit systematic differences in consumer ethnocentrism and country-of-origin bias depending on both the developer's origin and the country named in the prompt (Wadi, Ghodrat, & Philp, 2026), requiring global brands to audit AI recommendations across markets.",
          ].map((item, i) => (
            <Numbered key={i} n={i + 1}>
              <P>{item}</P>
            </Numbered>
          ))}
        </div>
      </Slide>
    </SlideDeck>
  );
}
