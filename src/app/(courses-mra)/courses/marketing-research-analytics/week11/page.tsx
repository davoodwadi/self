"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Plate,
  P,
  Statement,
  Term,
  Ruled,
  SlideHeading,
  Numbered,
  PartHead,
  Discussion,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  CustomerLedger,
  ProfitStream,
  ObservedEnd,
  RetentionLever,
  RfmRanking,
  RfmProfiles,
  ChurnRanking,
  FirstSplit,
  ForestAverage,
  DataSplits,
  LeakageCheck,
  ThresholdMatrix,
  GainsChart,
  UpliftTargeting,
  Recommender,
  FeedbackLoop,
  FairnessThresholds,
  ExplainOffer,
  CountryPairing,
  OrderRandomization,
} from "./visuals";

// ============================================================================
// WEEK 11: CUSTOMER ANALYTICS AND PREDICTIVE MODELING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx. The interactive ones are built around one action
// each: move retention, re-rank customers, choose a split, grow a forest,
// add a leaked variable, move a threshold, target deeper, change the
// targeting rule, pick a customer, retrain, shift a group's threshold, raise
// a balance, remove baselines, randomize the order.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.15rem,1.8vw,1.5rem)]";

/** A body sentence inside a ruled cell. */
const CELL = "!max-w-none !leading-snug";

/** One numbered step of a procedure, under a hairline. */
function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <Numbered n={n}>
      <Ruled>
        <P className={CELL}>{children}</P>
      </Ruled>
    </Numbered>
  );
}

/** A thin ruled cell holding one body sentence. */
function Cell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Ruled className={className}>
      <P className={CELL}>{children}</P>
    </Ruled>
  );
}

export default function Week11() {
  return (
    <SlideDeck label="Week 11">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 11: Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">
          Customer Analytics and Predictive Modeling
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[46ch] !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Customer analytics estimates the value and predicts the behavior of{" "}
          individual customers, to inform decisions on
          acquisition, retention, and personalization.
        </p>
      </Slide>

      {/* ================================================================
          Customer Analytics
          ================================================================ */}
      <Slide id="customer-analytics" border className="!py-8">
        <SlideHeading>Customer Analytics</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          <Term>Customer analytics</Term> is the analysis of customer-level data, such as
          transactions, interactions, and service records, to guide marketing decisions about
          individual customers.
        </Statement>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              It treats <Term>the customer</Term>, rather than the product or the campaign, as the
              unit of analysis.
            </Cell>
            <Cell>
              Its principal questions are which customers are most valuable, which are likely to
              leave, which are likely to respond to an offer, and which products or messages each
              customer should receive.
            </Cell>
            <Cell>
              It is based mainly on the predictive models introduced in Week 9, evaluated on their
              accuracy for new customers.
            </Cell>
          </div>
          <Plate>
            <CustomerLedger />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Customer Value
          ================================================================ */}
      <Slide id="part-1-customer-value" border className="!py-8">
        <PartHead n={1} title="Customer Value" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Customers differ substantially in <Term>the profit they generate</Term> over the
              course of their relationship with the firm.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Customer lifetime value and RFM analysis are two methods of estimating and ranking
              that value.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              They inform how much the firm can spend to acquire a customer and which customers to
              prioritize for retention.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customer Lifetime Value
          ================================================================ */}
      <Slide id="customer-lifetime-value" border className="!py-8">
        <SlideHeading>Customer Lifetime Value</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.4rem)]">
              <Term>Customer lifetime value</Term>, CLV, is the present value of the
              future profits expected from a customer over the duration of the relationship.
            </Statement>
            <Cell>
              In its simplest form, with a constant annual margin m, an annual retention rate r, and
              a discount rate d, CLV equals <strong className="font-semibold text-[var(--ink)]">m × r / (1 + d − r)</strong>.
            </Cell>
            <Cell>
              For example, a customer who generates an annual margin of 100 dollars, with a retention
              rate of 80 percent and a discount rate of 10 percent, has a CLV of 100 × 0.8 / 0.3, or{" "}
              <Term>approximately 267 dollars</Term>.
            </Cell>
            <Cell>
              CLV sets an upper limit on the amount the firm can profitably spend to acquire a
              customer.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <ProfitStream />
            </Plate>
            <Cell>
              In contractual settings, such as subscriptions, the end of a relationship is observed.
              In noncontractual settings, such as retail purchases, it is not, and the probability
              that a customer is still active must be estimated from the pattern of purchases.
            </Cell>
            <Plate>
              <ObservedEnd />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Drivers of Customer Lifetime Value
          ================================================================ */}
      <Slide
        id="drivers-of-customer-lifetime-value"
        border
        className="!py-8"
        exercise={exercise["drivers-of-customer-lifetime-value"]}
      >
        <SlideHeading>Drivers of Customer Lifetime Value</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
            CLV increases with the margin per customer, with the retention rate, and with a lower
            discount rate.
          </Statement>
          <Ruled>
            <P className={`${CELL} !text-[1.08em]`}>
              CLV is <Term>particularly sensitive to the retention rate</Term>. In the previous
              example, an increase in retention from 80 to 90 percent raises CLV from approximately
              267 to 450 dollars.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-12">
          <Plate>
            <RetentionLever />
          </Plate>
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The firm can therefore increase customer value by improving retention as well as by
              increasing margins.
            </Cell>
            <Cell>
              The simple formula assumes that margins and retention rates are constant over time.
              Models used in practice allow both to vary across customers and over the course of the
              relationship.
            </Cell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          RFM Analysis
          ================================================================ */}
      <Slide id="rfm-analysis" border className="!py-8">
        <SlideHeading>RFM Analysis</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>RFM analysis ranks customers on three measures of past purchasing behavior.</Cell>
            <Cell>
              <Term>Recency</Term> is the time since the customer&rsquo;s most recent
              purchase. <Term>Frequency</Term> is the number of purchases within a given
              period. <Term>Monetary value</Term> is the amount the customer has spent
              within that period.
            </Cell>
            <Cell>
              Customers are typically scored from 1 to 5 on each measure, according to the quintile
              in which they fall, with 5 representing the most recent, most frequent, or highest
              spending customers.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Cell>
              Customers with high scores on all three measures are the most likely to respond to
              future offers. <Term>Recency is typically the strongest single predictor</Term> of
              response.
            </Cell>
            <Plate>
              <RfmRanking />
            </Plate>
            <Cell>
              RFM analysis is simple to compute from transaction data, but it describes past
              behavior only and does not consider the margin generated by each customer.
            </Cell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Interpreting RFM Profiles
          ================================================================ */}
      <Slide id="interpreting-rfm-profiles" border className="!py-8" exercise={exercise["interpreting-rfm-profiles"]}>
        <SlideHeading>Interpreting RFM Profiles</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              Customers with high recency, frequency, and monetary scores are the firm&rsquo;s most
              valuable active customers.
            </Cell>
            <Cell>
              Customers with a low recency score but high frequency and monetary scores were once
              valuable but have not purchased recently, and are at risk of being lost.
            </Cell>
            <Cell>
              Customers with a high recency score but a low frequency score are recent new
              customers, whose future value is not yet established.
            </Cell>
            <Cell>
              Customers with low scores on all three measures have lapsed, and the cost of
              attempting to reactivate them may exceed the expected return.
            </Cell>
          </div>
          <Plate>
            <RfmProfiles />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t border-[var(--rule-2)] pt-4`}>
          Each profile calls for a different action:
          rewarding the most valuable customers, contacting those at risk, developing new customers,
          and limiting spending on lapsed customers.
        </p>
      </Slide>

      {/* ================================================================
          Part 2: Predicting Customer Behavior
          ================================================================ */}
      <Slide id="part-2-predicting-customer-behavior" border className="!py-8">
        <PartHead n={2} title="Predicting Customer Behavior" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Predictive models estimate, for each customer, the{" "}
          probability of a future behavior.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              The most common applications are the prediction of churn and the prediction of
              response to an offer.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Logistic regression, introduced in Week 9, is the standard baseline model. Decision
              trees and ensemble models frequently predict more accurately.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Churn and Response Models
          ================================================================ */}
      <Slide id="churn-and-response-models" border className="!py-8">
        <SlideHeading>Churn and Response Models</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Cell>
            <Term>Churn</Term> is the termination of a customer&rsquo;s relationship with
            the firm, such as the cancellation of a subscription or the closure of an account.
          </Cell>
          <Cell>
            A <Term>churn model</Term> estimates each customer&rsquo;s probability of
            churning within a specified period, on the basis of variables such as usage, recent
            changes in usage, complaints, and contract type.
          </Cell>
          <Cell>
            A <Term>response model</Term> estimates each customer&rsquo;s probability of
            responding to an offer, such as a promotion or an upgrade.
          </Cell>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.4rem)]">
            The predicted probabilities are used to rank customers,
            so that retention efforts and offers are directed to those with the highest scores.
          </Statement>
          <Plate>
            <ChurnRanking />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Decision Trees
          ================================================================ */}
      <Slide id="decision-trees" border className="!py-8">
        <SlideHeading>Decision Trees</SlideHeading>
        <Cell className="w-full">
          A <Term>decision tree</Term> divides the customers repeatedly into subgroups, at
          each step using <Term>the variable and the split that best separate</Term> customers who
          churn from those who do not.
        </Cell>
        <div className="mt-5 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-12">
          <Plate>
            <FirstSplit />
          </Plate>
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The result can be expressed as a set of rules, such as: customers on a monthly
              contract who have not used the service in 30 days have a churn probability of 45
              percent.
            </Cell>
            <Cell>Decision trees are easy to interpret and to communicate to managers.</Cell>
            <Cell>
              A large tree reproduces the random variation in the data used to estimate it, the
              overfitting introduced in Week 9. Trees are therefore limited in size, or pruned, and
              evaluated on holdout data.
            </Cell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Ensemble Models
          ================================================================ */}
      <Slide id="ensemble-models" border className="!py-8">
        <SlideHeading>Ensemble Models</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          An <Term>ensemble model</Term> combines the predictions of many models to
          produce a single, more accurate prediction.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              A <Term>random forest</Term> estimates many decision trees, each on a random
              sample of customers and variables, and <Term>averages their predictions</Term>.
            </Cell>
            <Cell>
              <Term>Gradient boosting</Term> estimates trees in sequence, with each tree
              designed to correct the errors of the trees before it.
            </Cell>
            <Cell>
              Ensemble models are among the most accurate methods for predicting customer behavior
              from structured data.
            </Cell>
            <Cell>
              Their predictions cannot be expressed as a simple set of rules, which makes the reasons
              for an individual prediction more difficult to establish.
            </Cell>
          </div>
          <Plate>
            <ForestAverage />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: Evaluating Predictive Models
          ================================================================ */}
      <Slide id="part-3-evaluating-predictive-models" border className="!py-8">
        <PartHead n={3} title="Evaluating Predictive Models" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              A predictive model is evaluated by the accuracy of its predictions for{" "}
              <Term>customers whose outcomes were not used to estimate it</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>The appropriate measure of accuracy depends on how the predictions will be used.</p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              A model that predicts accurately may still fail to improve decisions, for reasons
              examined at the end of this part.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Training and Holdout Data
          ================================================================ */}
      <Slide id="training-and-holdout-data" border className="!py-8">
        <SlideHeading>Training and Holdout Data</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The data are divided into a <Term>training sample</Term>, used to estimate
              the model, and a <Term>holdout sample</Term>, used to evaluate it.
            </Cell>
            <Cell>
              <Term>Cross-validation</Term> repeats this division several times and
              averages the results, which provides a more stable estimate of accuracy.
            </Cell>
            <Cell>
              For behavior that unfolds over time, such as churn, the model is estimated on an
              earlier period and evaluated on a later period, which reflects the conditions under
              which it will be used.
            </Cell>
            <Plate>
              <DataSplits />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Cell>
              <Term>Data leakage</Term> occurs when the model uses information that would
              not be available at the time of prediction, such as a record that the customer has
              requested a cancellation form. Leakage produces{" "}
              <Term>an accuracy on holdout data that cannot be achieved in practice</Term>.
            </Cell>
            <Plate>
              <LeakageCheck />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Confusion Matrix
          ================================================================ */}
      <Slide id="the-confusion-matrix" border className="!py-8" exercise={exercise["the-confusion-matrix"]}>
        <SlideHeading>The Confusion Matrix</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Cell>
              A <Term>confusion matrix</Term> compares the predicted outcomes with the
              actual outcomes for the holdout sample.
            </Cell>
            <Cell>
              <Term>True positives</Term> are churners correctly predicted to churn.{" "}
              <Term>False positives</Term> are customers predicted to churn who did not.{" "}
              <Term>False negatives</Term> are churners whom the model did not identify.{" "}
              <Term>True negatives</Term> are customers correctly predicted to stay.
            </Cell>
            <Cell>
              <Term>Precision</Term> is the proportion of customers predicted to churn who
              actually churned. <Term>Recall</Term> is the proportion of actual churners
              whom the model identified.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              For example, among 1,000 customers of whom 100 churn, a model identifies 150 customers
              as likely to churn, and 60 of them do churn. Its precision is{" "}
              <Term>40 percent</Term> and its recall is <Term>60 percent</Term>.
            </Cell>
            <Plate>
              <ThresholdMatrix />
            </Plate>
            <div className="grid gap-6 md:grid-cols-2">
              <Cell>
                Accuracy, the proportion of correct predictions, is misleading when one outcome is
                rare. A model that predicts that no customer will churn is correct for 90 percent of
                these customers, yet identifies no churner.
              </Cell>
              <Cell>
                The probability threshold above which a customer is classified as a churner is set
                according to the relative costs of false positives and false negatives.
              </Cell>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Lift
          ================================================================ */}
      <Slide id="lift" border className="!py-8">
        <SlideHeading>Lift</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              Customers are ranked by their predicted probability and divided into ten groups of
              equal size, called <Term>deciles</Term>.
            </Cell>
            <Cell>
              <Term>Lift</Term> is the rate of the outcome in a decile divided by the rate
              in the customer base as a whole.
            </Cell>
            <Cell>
              For example, if 35 percent of all churners are found in the top 10 percent of
              customers ranked by the model, the lift of the top decile is 3.5.
            </Cell>
            <Cell>
              A <Term>gains chart</Term> displays the cumulative percentage of churners
              captured as successive deciles are targeted.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Cell>
              Lift informs how many customers to target: contact continues through successive
              deciles <Term>as long as the expected benefit exceeds the cost</Term>.
            </Cell>
            <Plate>
              <GainsChart />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Predicting Churn and Preventing Churn
          ================================================================ */}
      <Slide
        id="predicting-churn-and-preventing-churn"
        border
        className="!py-8"
        exercise={exercise["predicting-churn-and-preventing-churn"]}
      >
        <SlideHeading>Predicting Churn and Preventing Churn</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          A churn model identifies the customers most likely to leave, not the customers{" "}
          whose decision an intervention would change.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Cell>
              <Term>Persuadables</Term> are customers who would leave without an
              intervention and stay with it.
            </Cell>
            <Cell>
              <Term>Sure things</Term> are customers who would stay regardless, so that an
              intervention produces a cost without a benefit.
            </Cell>
            <Cell>
              <Term>Lost causes</Term> are customers who would leave regardless of the
              intervention.
            </Cell>
            <Cell>
              <Term>Sleeping dogs</Term> are customers who would stay without contact but
              are prompted to leave by it, for example by a reminder of their contract terms.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <UpliftTargeting />
            </Plate>
            <Cell>
              <Term>Uplift modeling</Term> estimates the effect of the intervention on
              each customer, using data from a randomized experiment of the kind introduced in Week
              8, and directs the intervention to the persuadables.
            </Cell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Personalization and Recommendation
          ================================================================ */}
      <Slide id="part-4-personalization-and-recommendation" border className="!py-8">
        <PartHead n={4} title="Personalization and Recommendation" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              <Term>Personalization</Term> is the tailoring of content, offers, prices, or
              products to the individual customer.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              It depends on <Term>predictions of what each customer is likely to value</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Recommendation systems are the most widespread form of personalization in digital
              channels.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Recommendation Systems
          ================================================================ */}
      <Slide id="recommendation-systems" border className="!py-8" exercise={exercise["recommendation-systems"]}>
        <SlideHeading>Recommendation Systems</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Cell>
            <Term>Content-based recommendation</Term> suggests items similar to those the
            customer has previously purchased or rated highly, on the basis of the items&rsquo;
            attributes.
          </Cell>
          <Cell>
            <Term>Collaborative filtering</Term> suggests items purchased or rated highly
            by customers whose past behavior is similar to that of the customer, as in
            &ldquo;customers who bought this item also bought.&rdquo;
          </Cell>
        </div>
        <div className="mt-5 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-12">
          <Plate>
            <Recommender />
          </Plate>
          <div className="flex min-w-0 flex-col gap-2.5">
            <Cell>
              Hybrid systems combine both approaches, and many current systems use deep learning
              models trained on sequences of customer behavior.
            </Cell>
            <Cell>
              The <Term>cold-start problem</Term> arises when a new customer or a new product has too
              little history for collaborative filtering to produce recommendations.
            </Cell>
            <Cell>
              <Term>Popularity bias</Term> arises when recommendations concentrate on items
              that are already popular, which reduces exposure for new or specialized items and
              narrows the range of products customers encounter.
            </Cell>
            <Cell>
              Recommendation systems are evaluated on holdout data for their predictive accuracy, and
              through A/B tests for their effect on business outcomes such as sales and retention.
            </Cell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Bias, Fairness, and Explanation
          ================================================================ */}
      <Slide id="part-5-bias-fairness-and-explanation" border className="!py-8">
        <PartHead n={5} title="Bias, Fairness, and Explanation" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Predictive models increasingly determine which customers receive offers, prices,
              credit, and service.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Such models can treat groups of customers systematically differently, including groups
              protected by anti-discrimination law.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Firms are therefore expected to <Term>assess their models for bias</Term>, and to
              explain the decisions the models inform.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Algorithmic Bias
          ================================================================ */}
      <Slide id="algorithmic-bias" border className="!py-8">
        <SlideHeading>Algorithmic Bias</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          <Term>Algorithmic bias</Term> is a systematic difference in a model&rsquo;s
          predictions or errors across groups of customers that is not justified by the purpose of the
          model.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Cell>
              <Term>Historical bias</Term> arises when the training data reflect past
              discrimination, so that the model reproduces it.
            </Cell>
            <Cell>
              <Term>Representation bias</Term> arises when some groups are underrepresented
              in the training data, so that predictions for them are less accurate.
            </Cell>
            <Cell>
              <Term>Proxy variables</Term> can reproduce the effect of a protected
              characteristic that is excluded from the model, as when a postal code is correlated
              with ethnicity.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Cell>
              <Term>Feedback loops</Term> arise when the model&rsquo;s decisions determine
              the data on which it is later retrained, as when customers who never receive an offer{" "}
              <Term>never generate evidence that they would have responded to it</Term>.
            </Cell>
            <Plate>
              <FeedbackLoop />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Fairness Criteria
          ================================================================ */}
      <Slide id="fairness-criteria" border className="!py-8">
        <SlideHeading>Fairness Criteria</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Cell>
            <Term>Demographic parity</Term> requires that the rate of a favorable outcome,
            such as receiving an offer, is equal across groups.
          </Cell>
          <Cell>
            <Term>Equal opportunity</Term> requires that, among customers who would
            qualify for the favorable outcome, the rate at which the model correctly identifies them
            is equal across groups.
          </Cell>
          <Cell>
            <Term>Calibration</Term> requires that customers who receive the same
            predicted probability have the same actual rate of the outcome, regardless of group.
          </Cell>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              When the underlying rates of the outcome differ across groups,{" "}
              <Term>these criteria cannot all be satisfied at once</Term>.
            </Cell>
            <Cell>
              The choice of fairness criterion is therefore a value judgment and a legal question, as
              well as a technical one, and is made explicitly and documented.
            </Cell>
          </div>
          <Plate>
            <FairnessThresholds />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Explaining Model Decisions
          ================================================================ */}
      <Slide id="explaining-model-decisions" border className="!py-8">
        <SlideHeading>Explaining Model Decisions</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Cell>
              <Term>Global explanations</Term> describe how a model uses its variables
              across all customers, such as measures of variable importance.
            </Cell>
            <Cell>
              <Term>Local explanations</Term> describe why the model produced a particular
              prediction for a particular customer. SHAP values, for example, estimate the
              contribution of each variable to an individual prediction.
            </Cell>
            <Cell>
              <Term>Counterfactual explanations</Term> state{" "}
              <Term>the smallest change</Term> in a customer&rsquo;s characteristics that would have
              changed the prediction, such as a higher account balance that would have qualified the
              customer for an offer.
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <ExplainOffer />
            </Plate>
            <div className="grid gap-6 md:grid-cols-2">
              <Cell>
                Explanations describe the behavior of the model, not the causal effect of the
                variables on the customer&rsquo;s behavior, as introduced in Week 9.
              </Cell>
              <Cell>
                Regulation in several jurisdictions grants individuals rights concerning automated
                decisions that significantly affect them, including information about the logic
                involved.
              </Cell>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Auditing a Predictive Model
          ================================================================ */}
      <Slide
        id="auditing-a-predictive-model"
        border
        className="!py-8"
        exercise={exercise["auditing-a-predictive-model"]}
      >
        <SlideHeading>Auditing a Predictive Model</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1}>
            The analyst first defines the groups to be compared and the fairness criterion
            appropriate to the decision.
          </Step>
          <Step n={2}>
            The analyst then compares the model&rsquo;s predictions and error rates across the groups
            on holdout data.
          </Step>
          <Step n={3}>
            The analyst then examines the model&rsquo;s variables for proxies of protected
            characteristics.
          </Step>
          <Step n={4}>
            The analyst then uses local and global explanations to identify the variables responsible
            for differences across groups.
          </Step>
          <Step n={5}>
            The analyst then revises the model, the data, or the decision rule, and repeats the
            comparison.
          </Step>
          <Step n={6}>
            Finally, the analyst documents the audit and{" "}
            <Term>monitors the model&rsquo;s outcomes across groups after deployment</Term>.
          </Step>
        </div>
      </Slide>

      {/* ================================================================
          Behavioral Evaluation Beyond Benchmarks
          ================================================================ */}
      <Slide id="behavioral-evaluation-beyond-benchmarks" border className="!py-8">
        <SlideHeading>Behavioral Evaluation Beyond Benchmarks</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Cell>
            Language models and AI agents inform decisions about which products consumers see and
            buy, and they are audited for bias in the same way as predictive models.
          </Cell>
          <Cell>
            Benchmarks measure general capabilities and do not reveal systematic biases in specific
            marketing tasks.
          </Cell>
        </div>
        <div className="mt-5 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Cell>
              <Term>Position bias</Term> is the tendency to select an alternative because
              of its place in a list (Wadi &amp; Ma, 2026a).
            </Cell>
            <Cell>
              <Term>Sponsorship bias</Term> arises when the party an agent is told it
              serves changes the penalty it applies to paid listings (Wadi &amp; Ma, 2026c).
            </Cell>
            <Cell>
              <Term>Country-of-origin bias</Term> arises when a model&rsquo;s evaluations
              shift for particular pairings of the model&rsquo;s country of development and the
              country being evaluated. A fully crossed factorial design{" "}
              <Term>separates this interaction from each model&rsquo;s baseline tendency</Term>{" "}
              (Wadi, Ghodrat, &amp; Philp, 2026).
            </Cell>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <CountryPairing />
            </Plate>
            <Cell>
              Bias varies across models, so that an audit applies to the specific model and version
              that is deployed.
            </Cell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Auditing an AI Agent
          ================================================================ */}
      <Slide id="auditing-an-ai-agent" border className="!py-8" exercise={exercise["auditing-an-ai-agent"]}>
        <SlideHeading>Auditing an AI Agent</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2.5">
            <Step n={1}>
              The analyst first defines the task, the population of queries, and the normative
              standard against which the agent&rsquo;s behavior is judged.
            </Step>
            <Step n={2}>
              The analyst then designs controlled variations of the prompts and the alternatives,
              with <Term>positions and orders randomized</Term>.
            </Step>
            <Step n={3}>
              The analyst then collects a sufficient number of responses for each condition from the
              model version to be deployed.
            </Step>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <OrderRandomization />
            </Plate>
          </div>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Step n={4}>
            The analyst then compares the agent&rsquo;s choices with the normative standard and
            across conditions, with effect sizes and corrections for multiple comparisons.
          </Step>
          <Step n={5}>
            The analyst then revises the system prompt, the information provided to the agent, or
            the choice of model, and repeats the comparison.
          </Step>
          <Step n={6}>
            Finally, the analyst documents the audit and repeats it whenever the provider updates the
            model.
          </Step>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: A Discount Model
          ================================================================ */}
      <Slide id="discussion-a-discount-model" border className="!py-8">
        <SlideHeading>Discussion: A Discount Model</SlideHeading>
        <Discussion
          scenario={"A retailer's model directs its largest discounts to the customers predicted to be most price-sensitive. An audit reveals that customers in lower-income postal codes receive smaller discounts on average than customers in higher-income postal codes."}
          question={"Which sources of bias could explain this result, which fairness criterion is relevant, and what should the retailer do?"}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Customer lifetime value estimates the present value of future profits from a customer, and is particularly sensitive to the retention rate.",
            "RFM analysis ranks customers by recency, frequency, and monetary value, and different RFM profiles call for different actions.",
            "Churn and response models, including decision trees and ensemble models, are evaluated on holdout data with confusion matrices, precision, recall, and lift.",
            "Predicting which customers will churn is not the same as identifying those whom an intervention would retain. Uplift modeling addresses the second question.",
            "Recommendation systems personalize offers through content-based and collaborative methods, and are evaluated through A/B tests of business outcomes.",
            "Predictive models can be biased against groups of customers, and firms assess them against explicit fairness criteria, explain their decisions, and monitor them after deployment.",
            "Language models and AI agents are audited for position, sponsorship, and country-of-origin biases with controlled designs, and each audit applies to the specific model version deployed.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
