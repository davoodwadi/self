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

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week9() {
  return (
    <SlideDeck label="Week 9">
      {/* ================================================================
          1. Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 9
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Post-Purchase Behavior, Satisfaction, and Loyalty
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Postpurchase evaluation, dissonance reduction, product
              disposition, review writing, and repeat patronage determine{" "}
              <Tint>
                whether a single transaction develops into durable brand loyalty
              </Tint>
              .
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          2. The Strategic Value of the Postpurchase Stage
          ================================================================ */}
      <Slide className={TIGHT} id="strategic-value-postpurchase" border>
        <SlideHeading>
          The Strategic Value of the Postpurchase Stage
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              <Term>Postpurchase behavior</Term> encompasses all{" "}
              <Tint>psychological evaluations and overt actions</Tint> a
              consumer undertakes after acquiring a product or service.
            </Statement>
            <Ruled>
              <P>
                These activities include assembling and using the item, judging
                its performance against expectations, communicating word of
                mouth, requesting service, and eventually disposing of the good.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.ProductLife />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Postpurchase evaluation closes the feedback loop of the
              consumption process by updating the brand attitudes stored in
              long-term memory.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A positive postpurchase experience strengthens the probability
              that the brand enters the consideration set automatically on the
              next purchase occasion.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, unresolved postpurchase disappointment triggers brand
              switching and negative online reviews.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          3. Postpurchase Evaluation and Customer Retention Economics
          ================================================================ */}
      <Slide className={TIGHT} id="retention-economics" border>
        <SlideHeading>
          Postpurchase Evaluation and Customer Retention Economics
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Acquiring a new customer through advertising and promotional
              discounting typically{" "}
              <Tint>
                costs several times more than retaining an existing buyer
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                Retained customers purchase more frequently, are less sensitive
                to small competitor price cuts, and cost less to serve over
                time.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Customer lifetime value</Term> rises sharply when small
                improvements in postpurchase satisfaction reduce annual
                defection rates (Reichheld &amp; Sasser, 1990).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.KeepVsWin />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Marketing managers therefore monitor postpurchase metrics,
              including Net Promoter Scores, repeat purchase rates, return
              reasons, and warranty claims, alongside initial sales volume.
            </P>
          </Ruled>
          <Ruled>
            <Big className="">
              Treating the checkout receipt as the end of the marketing funnel
              sacrifices the most profitable phase of the customer relationship.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          4. Part 1: Customer Satisfaction, Equity, and Attribution
          ================================================================ */}
      <Slide id="part-1-satisfaction" border>
        <PartHead n={1} title="Customer Satisfaction, Equity, and Attribution" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Customer satisfaction is not determined by{" "}
            <Tint>objective product performance in isolation</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Instead, consumers evaluate postpurchase outcomes through three
              complementary psychological frameworks: expectancy
              disconfirmation, equity theory, and causal attribution.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          5. The Expectancy Disconfirmation Model of Satisfaction
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="expectancy-disconfirmation"
        border
        exercise={exercise["expectancy-disconfirmation"]}
      >
        <SlideHeading>
          The Expectancy Disconfirmation Model of Satisfaction
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Formulated by Richard Oliver (1980), the{" "}
              <Term>expectancy disconfirmation model</Term> states that customer
              satisfaction results from{" "}
              <Tint>
                comparing perceived product performance against prepurchase
                expectations
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                Prepurchase expectations are formed from prior brand experience,
                word of mouth, price level, and advertising claims.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.Disconfirmation />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Positive disconfirmation</Term> occurs when perceived
              performance exceeds prepurchase expectations, producing high
              satisfaction or customer delight.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Simple confirmation</Term> occurs when perceived performance
              matches expectations, producing baseline satisfaction and neutral
              stability.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Negative disconfirmation</Term> occurs when perceived
              performance falls short of expectations, producing
              dissatisfaction, regret, and potential complaint behavior.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          6. Equity Theory and Perceived Exchange Fairness
          ================================================================ */}
      <Slide className={TIGHT} id="equity-theory" border>
        <SlideHeading>
          Equity Theory and Perceived Exchange Fairness
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              <Term>Equity theory</Term> proposes that consumers evaluate
              satisfaction by{" "}
              <Tint>comparing the ratio of their own outcomes to inputs</Tint>{" "}
              against the perceived ratio of the seller or another customer
              (Adams, 1965, and Oliver &amp; Swan, 1989).
            </Statement>
            <Ruled>
              <P>
                <Term>Consumer inputs</Term> include the price paid, shopping
                time, waiting effort, and courtesy extended during the
                transaction.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Consumer outcomes</Term> include product quality, service
                responsiveness, status, and warranty support.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.EquityScale />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Perceived inequity arises when a buyer discovers that another
              passenger in the same airline row paid half the fare or received a
              complimentary upgrade without clear justification.
            </P>
          </Ruled>
          <Ruled>
            <Big className="">
              Even when functional product performance meets expectations,
              perceived procedural or distributive unfairness produces strong
              dissatisfaction.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          7. Attribution Theory in Product and Service Failures
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="attribution-theory"
        border
        exercise={exercise["attribution-theory"]}
      >
        <SlideHeading>
          Attribution Theory in Product and Service Failures
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              When a product fails or a service is delayed, consumers engage in{" "}
              <Term>causal attribution</Term> to explain why the failure
              occurred (Folkes, 1984, and Weiner, 2000).
            </Lead>
            <Ruled>
              <P>
                <Term>Locus of causality</Term> asks who is responsible: an
                internal attribution blames the consumer&apos;s own misuse,
                whereas an external attribution blames the manufacturer,
                retailer, or environment.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Stability</Term> asks whether the cause is temporary and
                unusual (an isolated shipping storm) or permanent and systemic
                (chronic understaffing at a call center).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.BlameCompany />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term>Controllability</Term> asks whether the firm had the power
              to foresee and prevent the failure or whether the event was
              genuinely beyond human control.
            </P>
          </Ruled>
          <Ruled>
            <Big className="">
              Dissatisfaction, anger, and desire for retaliation are highest
              when the consumer attributes a failure to an{" "}
              <Tint>external, stable, and firm-controllable cause</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          8. Part 2: Postpurchase Cognitive Dissonance and Dissatisfaction Responses
          ================================================================ */}
      <Slide id="part-2-dissonance" border>
        <PartHead
          n={2}
          title="Postpurchase Cognitive Dissonance and Dissatisfaction Responses"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Even when a product functions properly, buyers frequently experience{" "}
            <Tint>
              psychological tension immediately after making a high-stakes
              commitment
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Understanding postpurchase cognitive dissonance and complaint
              pathways allows firms to reassure anxious buyers and recover
              dissatisfied customers.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          9. Cognitive Dissonance and Buyer's Regret
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cognitive-dissonance"
        border
        exercise={exercise["cognitive-dissonance"]}
      >
        <SlideHeading>Cognitive Dissonance and Buyer&apos;s Regret</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Derived from Leon Festinger&apos;s (1957) theory of cognitive
              dissonance, <Term>postpurchase dissonance</Term> is the state of{" "}
              <Tint>
                psychological discomfort a buyer feels when holding inconsistent
                cognitions after a decision
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                Choosing Brand A requires giving up the attractive, unique
                features offered by rejected Brands B and C, creating doubt
                about whether the choice was optimal.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Postpurchase dissonance is magnified when the purchase is
                expensive, irrevocable, and high in social or psychological
                involvement.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SecondThoughts />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Dissonance also increases as the number of attractive rejected
              alternatives grows and when those alternatives differed on
              qualitatively distinct attributes.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Left unresolved, severe postpurchase dissonance leads to product
              returns, order cancellations, or durable dissatisfaction.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          10. Consumer and Marketer Strategies for Reducing Dissonance
          ================================================================ */}
      <Slide className={TIGHT} id="reducing-dissonance" border>
        <SlideHeading>
          Consumer and Marketer Strategies for Reducing Dissonance
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              To restore cognitive consistency after a purchase, consumers{" "}
              <Tint>
                actively seek information that confirms the wisdom of their
                choice
              </Tint>{" "}
              and avoid advertisements for rejected brands.
            </Lead>
            <Ruled>
              <P>
                Recent automobile buyers, for example, read advertisements for
                the car they just purchased more attentively than prospective
                buyers who have not yet decided (Ehrlich et al., 1957).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Consumers also re-evaluate alternatives defensively by inflating
                the importance of the chosen brand&apos;s strengths and
                discounting the features of rejected options.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SupportingInfo />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Marketers assist dissonance reduction through postpurchase
              onboarding emails, congratulatory owner communications, clear
              instructional guides, and visible community testimonials.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Liberal return policies and comprehensive warranties also reduce
              the perceived irrevocability of the commitment before and after
              checkout.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          11. Voice, Private, and Third-Party Responses to Dissatisfaction
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dissatisfaction-responses"
        border
        exercise={exercise["dissatisfaction-responses"]}
      >
        <SlideHeading>
          Voice, Private, and Third-Party Responses to Dissatisfaction
        </SlideHeading>
        <Lead className="!mb-4 !max-w-none">
          Jagdip Singh (1988) classified consumer behavioral responses to
          dissatisfaction into three distinct pathways: voice, private, and
          third-party actions.
        </Lead>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Voice responses</Term> direct complaint behavior toward the
              seller itself, seeking redress through a refund, replacement,
              repair, or apology.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Private responses</Term> involve quietly exiting the
              relationship (switching brands) and warning friends, family, and
              colleagues through negative interpersonal word of mouth.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Third-party responses</Term> escalate the dispute to
              external institutions, including consumer protection agencies,
              legal action, or public review platforms and social media.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.9fr] lg:gap-10">
          <Ruled>
            <P>
              Because the majority of dissatisfied buyers simply defect
              privately without contacting the firm,{" "}
              <Tint>
                accessible complaint channels and empowered front-line recovery
                turn voice responses into retention opportunities
              </Tint>
              .
            </P>
          </Ruled>
          <Plate wide>
            <V.SilentMajority />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          12. Discussion: Turning a Service Failure into Customer Recovery
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-service-recovery" border>
        <SlideHeading kicker="Discussion:">
          Turning a Service Failure into Customer Recovery
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:gap-10">
          <Prompt>
            A direct-to-consumer meal delivery service ships a holiday dinner
            box that arrives 36 hours late with spoiled ingredients because the
            firm&apos;s warehouse software misrouted the courier batch. Using
            expectancy disconfirmation, equity theory, attribution theory
            (locus, stability, controllability), and Singh&apos;s (1988)
            dissatisfaction taxonomy, explain how customers will interpret this
            failure and design a service-recovery protocol that prevents private
            exit and third-party escalation.
          </Prompt>
          <Plate>
            <V.QuickReply />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          13. Part 3: Product Disposal and Secondary Markets
          ================================================================ */}
      <Slide id="part-3-disposal" border>
        <PartHead n={3} title="Product Disposal and Secondary Markets" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Consumption does not end with product use. Every physical good
            eventually reaches a{" "}
            <Tint>
              disposition stage in which the owner decides whether to retain,
              repurpose, or part with the item
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Disposition behavior shapes environmental waste streams,
              peer-to-peer resale platforms, and primary brand demand.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          14. The Taxonomy of Product Disposition Options
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="disposition-taxonomy"
        border
        exercise={exercise["disposition-taxonomy"]}
      >
        <SlideHeading>The Taxonomy of Product Disposition Options</SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Jacoby, Berning, and Dietvorst (1977) organized consumer product
              disposition into three primary branches:{" "}
              <Tint>
                keep the product, temporarily dispose of it, or permanently
                dispose of it
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                The chosen path depends on the item&apos;s residual economic
                value, physical condition, storage cost, and emotional
                attachment.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.DisposalPaths />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Keeping the product</Term> includes continuing to use it for
              its original function, converting it to a new secondary function,
              or storing it unused in closets and garages.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Temporary disposition</Term> includes lending the item to
              peers or renting it out through sharing platforms.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Permanent disposition</Term> includes throwing the item away
              (trashing or recycling), giving it away to charity or family,
              trading it in, or selling it directly to another buyer.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          15. Lateral Cycling, Resale Platforms, and Circular Business Models
          ================================================================ */}
      <Slide className={TIGHT} id="lateral-cycling" border>
        <SlideHeading>
          Lateral Cycling, Resale Platforms, and Circular Business Models
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              <Term>Lateral cycling</Term> occurs when an already-purchased
              object is{" "}
              <Tint>
                exchanged from one consumer to another so that its useful
                consumption life continues without new manufacturing
              </Tint>{" "}
              (Sherry, 1990).
            </Statement>
            <Ruled>
              <P>
                Digital peer-to-peer marketplaces, consignment apps, and
                brand-operated trade-in programs have sharply lowered the
                transaction costs of lateral cycling for apparel, electronics,
                and furniture.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.LateralCycling />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              A liquid secondary market can increase consumers&apos; willingness
              to pay for a new primary product because buyers anticipate
              recovering part of the purchase price at resale.
            </P>
          </Ruled>
          <Ruled>
            <P>
              At the same time, high-quality pre-owned inventory competes
              directly with a brand&apos;s entry-level new merchandise.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Many manufacturers now operate certified refurbished programs to
              capture secondary-market margin and control brand presentation.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          16. Psychological Barriers to Disposing of Possessions
          ================================================================ */}
      <Slide className={TIGHT} id="barriers-to-disposal" border>
        <SlideHeading>
          Psychological Barriers to Disposing of Possessions
        </SlideHeading>
        <Statement className="">
          Consumers frequently retain possessions long after their functional
          utility has ended because{" "}
          <Tint>the objects remain incorporated into the extended self</Tint>.
        </Statement>
        <div className="mt-8 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Disposing of an object linked to a past life stage, a deceased
              relative, or a hard-won achievement feels like erasing the memory
              or identity attached to the item.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In a study of cherished possessions, consumers were much more
              willing to part with meaningful items when they first took a
              photograph of the object to preserve its memory trace (Winterich,
              Reczek, &amp; Irwin, 2017).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers also resist throwing away functional items out of
              perceived wastefulness or creative reuse intentions (&quot;unused
              utility&quot;), even when the item sits untouched for years (Haws
              et al., 2012).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Trade-in and donation programs overcome disposition guilt by
              assuring the owner that the item will be valued and used by
              another person.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          17. Part 4: Online Review Writing as Postpurchase Behavior
          ================================================================ */}
      <Slide id="part-4-reviews" border>
        <PartHead
          n={4}
          title="Online Review Writing as Postpurchase Behavior"
        />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Writing an online product review is a consequential postpurchase
            action that{" "}
            <Tint>
              converts private consumption experience into public market
              information
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              How firms solicit and incentivize reviews alters both who
              participates and what they write.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          18. Motives for Writing Online Product Reviews
          ================================================================ */}
      <Slide className={TIGHT} id="motives-for-reviews" border>
        <SlideHeading>Motives for Writing Online Product Reviews</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Consumers expend time and effort writing online reviews for
              several{" "}
              <Tint>distinct psychological motives</Tint> (Hennig-Thurau et al.,
              2004).
            </Lead>
            <Ruled>
              <P>
                <Term>Altruistic concern for other consumers</Term> motivates
                reviewers to warn peers against defective goods or highlight
                exceptional value.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Helping the company</Term> motivates satisfied buyers to
                reciprocate a positive purchase experience by supporting a
                favored seller.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.UnwrittenReview />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term>Self-enhancement and social status</Term> motivate
              contributors to earn &quot;top reviewer&quot; badges and community
              recognition, while venting negative feelings provides emotional
              release after dissatisfaction.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because unprompted reviews often over-represent extreme
              satisfaction or extreme anger, retailers send postpurchase
              solicitation emails to gather a broader sample of feedback.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          19. Social Exchange Versus Reciprocal Exchange in Review Solicitation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-vs-reciprocal-exchange"
        border
        exercise={exercise["social-vs-reciprocal-exchange"]}
      >
        <SlideHeading>
          Social Exchange Versus Reciprocal Exchange in Review Solicitation
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Social exchange theory</Term> distinguishes generalized
              social exchanges directed toward the broader community from direct
              reciprocal exchanges between the customer and the firm.
            </Lead>
            <Ruled>
              <P>
                A solicitation message asking buyers to &quot;help other
                shoppers make informed decisions&quot; activates a{" "}
                <Term>generalized social-exchange norm</Term>, whereas asking
                buyers to &quot;help our company improve&quot; activates a{" "}
                <Term>firm-directed reciprocal norm</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.HelpWhom />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              In a field experiment and follow-up studies with online retail
              buyers, asking customers to help other shoppers produced{" "}
              <Tint>
                higher review submission rates than asking them to help the
                company
              </Tint>{" "}
              (Wadi et al., 2026a).
            </P>
          </Ruled>
          <Ruled>
            <P>
              When the firm added a financial incentive (such as a 10-dollar
              credit), pairing the reward with &quot;help other shoppers&quot;
              outperformed pairing the same reward with &quot;help the
              company&quot; (Wadi et al., 2026a).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Framing a review request as a reciprocal exchange with the company
              caused the minority who did respond to write longer reviews, but
              lowered overall participation (Wadi et al., 2026b).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          20. Conditional Helpfulness Incentives and Dual Review Audiences
          ================================================================ */}
      <Slide className={TIGHT} id="conditional-incentives-dual-audiences" border>
        <SlideHeading>
          Conditional Helpfulness Incentives and Dual Review Audiences
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              To encourage informative reviews rather than brief one-line
              comments, platforms sometimes offer{" "}
              <Term>conditional incentives</Term> paid only if a review receives
              a &quot;helpful&quot; vote from subsequent readers.
            </P>
            <Ruled>
              <P>
                Research demonstrates that conditional helpfulness rewards
                interact with the consumer&apos;s prior reviewing experience
                (Wadi et al., 2026b).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.ReviewRequests />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              For <Term>first-time reviewers</Term> who have not yet established
              an intrinsic reviewing habit, a conditional helpfulness reward{" "}
              <Tint>
                significantly increased both review incidence and review length
              </Tint>{" "}
              (Wadi et al., 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              For <Term>experienced reviewers</Term>, the same conditional
              incentive yielded much smaller gains over their existing baseline
              behavior (Wadi et al., 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Today, the resulting corpus of online reviews serves two audiences
              simultaneously: human shoppers reading product pages and AI
              shopping agents parsing review text to evaluate candidate brands.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          21. Part 5: Brand Loyalty and Delegated Repurchase
          ================================================================ */}
      <Slide id="part-5-loyalty" border>
        <PartHead n={5} title="Brand Loyalty and Delegated Repurchase" />
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="">
            True brand loyalty requires{" "}
            <Tint>
              more than observing a customer buy the same package twice in a row
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              As consumers delegate routine reordering to AI shopping agents,
              the distinction between attitudinal loyalty and habitual
              convenience determines which brands survive.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          22. Attitude and Repeat Purchase: The Four Loyalty Quadrants
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="four-loyalty-quadrants"
        border
        exercise={exercise["four-loyalty-quadrants"]}
      >
        <SlideHeading kicker="Attitude and Repeat Purchase:">
          The Four Loyalty Quadrants
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Alan Dick and Kunal Basu (1994) demonstrated that defining loyalty
              solely by repeat purchase frequency{" "}
              <Tint>confounds commitment with convenience</Tint>.
            </Statement>
            <Ruled>
              <P>
                Crossing relative attitude strength (high versus low) with
                repeat patronage (high versus low) yields four distinct loyalty
                conditions.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TrueLoyalty />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>True loyalty</Term> combines a strong, favorable relative
              attitude with high repeat patronage, insulating the brand against
              competitor promotions.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Spurious loyalty</Term> combines high repeat patronage with
              a weak relative attitude: the buyer repurchases out of shelf
              habit, low involvement, or lack of alternatives.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Latent loyalty</Term> combines a strong favorable attitude
              with low repeat purchase (often due to high price or limited
              distribution), while <Term>no loyalty</Term> combines weak
              attitude and low repeat buying.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          23. Loyalty to the Brand Versus Reliance on the AI Agent
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-loyalty-vs-agent-reliance"
        border
        exercise={exercise["brand-loyalty-vs-agent-reliance"]}
      >
        <SlideHeading>
          Loyalty to the Brand Versus Reliance on the AI Agent
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.88fr_1.95fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              When a consumer delegates routine replenishment (such as
              detergent, coffee, or pet food) to an AI shopping agent, repeat
              buying splits into{" "}
              <Tint>two distinct behavioral pathways</Tint>.
            </Lead>
            <Ruled>
              <P>
                The first pathway is <Term>brand-directed delegation</Term>: the
                consumer holds true attitudinal loyalty and explicitly names the
                brand in the prompt, such as &quot;reorder my usual 12-ounce bag
                of Brand X coffee.&quot;
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.UsualOrBest />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              The second pathway is <Term>agent-reliant delegation</Term>: the
              consumer delegates brand selection to the agent by stating only a
              category goal, such as &quot;order instant coffee at the best
              value.&quot;
            </P>
          </Ruled>
          <Ruled>
            <P>
              Under agent-reliant delegation, the consumer&apos;s prior purchase
              habit does not constrain the agent unless past preference is
              explicitly provided as a rule.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Instead, the agent evaluates available listings from scratch based
              on the stated goal and the product attributes it acquires in the
              storefront (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          24. Vulnerability of Spurious Loyalty Under AI Replenishment
          ================================================================ */}
      <Slide className={TIGHT} id="spurious-loyalty-ai-vulnerability" border>
        <SlideHeading>
          Vulnerability of Spurious Loyalty Under AI Replenishment
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="">
              Delegated repurchase poses a severe strategic threat to incumbent
              brands whose market share rests on{" "}
              <Tint>spurious loyalty and human System 1 inertia</Tint>.
            </Statement>
            <Ruled>
              <P>
                A human shopper walking down an aisle often grabs the familiar
                box to save five seconds of mental effort, even when a competing
                package offers a better unit price.
              </P>
            </Ruled>
            <Ruled>
              <P>
                An AI agent instructed to optimize price per unit or rating has
                no visual attachment to familiar shelf colors and will
                immediately switch away from an overpriced incumbent (Wadi &amp;
                Ma, 2026b).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SpuriousLoyalty />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Conversely, a brand that has cultivated true attitudinal loyalty
              is protected when the consumer specifies the brand by name in the
              delegation instruction.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Competing in automated replenishment therefore requires either
              building strong enough brand equity to be named in the user&apos;s
              prompt or offering demonstrably superior objective value in
              machine-readable catalog data.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          25. Discussion: Defending a Consumer Packaged Goods Brand in Automated Replenishment
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-cpg-replenishment" border>
        <SlideHeading kicker="Discussion:">
          Defending a Consumer Packaged Goods Brand in Automated Replenishment
        </SlideHeading>
        <Prompt>
          A leading national dish-detergent brand commands a 35 percent
          supermarket share largely through prominent eye-level shelf placement
          and habitual repeat buying, while charging a 15 percent unit-price
          premium over comparable store brands. As households shift toward
          smart-home replenishment and AI shopping assistants, use Dick and
          Basu&apos;s (1994) loyalty matrix and the findings of Wadi and Ma
          (2026b) to diagnose the brand&apos;s vulnerability and recommend how
          management should adapt its brand-building, packaging data, and
          loyalty program strategy.
        </Prompt>
      </Slide>

      {/* ================================================================
          26. Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {[
            "Postpurchase evaluation updates brand attitudes in memory and drives customer retention, which is substantially more profitable than continuous customer acquisition.",
            "Customer satisfaction is explained by the expectancy disconfirmation model (performance relative to expectations), equity theory (perceived input-outcome fairness), and causal attribution (locus, stability, and controllability of failures).",
            "High-stakes decisions generate postpurchase cognitive dissonance, and dissatisfied consumers respond through voice complaints to the seller, private exit and word of mouth, or third-party escalation.",
            "Product disposition branches into keeping, temporary disposal, and permanent disposal, with lateral cycling and resale platforms creating circular secondary markets.",
            "In postpurchase online review solicitation, community-focused appeals (\"help other shoppers\") outperform company-focused appeals, especially when paired with financial incentives, and conditional helpfulness rewards are most effective among first-time reviewers.",
            "Dick and Basu's matrix separates true loyalty from spurious, latent, and no loyalty, showing why brands dependent on habitual spurious loyalty risk losing share when consumers delegate replenishment to AI agents without naming a specific brand.",
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
