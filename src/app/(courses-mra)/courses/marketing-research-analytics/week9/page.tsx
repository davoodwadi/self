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
  CorrelationStrength,
  LeastSquares,
  CoefficientUnits,
  AddedVariables,
  ResidualPatterns,
  CollinearEstimates,
  OmittedHoliday,
  LinearProbability,
  LogOddsCurve,
  OddsToProbability,
  MixDecomposition,
  AdstockDecay,
  BudgetSplit,
  AttributionRules,
  BrandSearchHoldout,
  Overfitting,
  TreeVersusLine,
  DiscountImportance,
  CentDollarRatio,
  SkepticismMediation,
} from "./visuals";

// ============================================================================
// WEEK 9: REGRESSION AND MARKETING RESPONSE MODELS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx. The interactive ones are built around one action
// each, so students can move a value and watch an estimate respond.
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

export default function Week9() {
  return (
    <SlideDeck label="Week 9">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 9: Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          Regression and Marketing Response Models
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[44ch] !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Marketing response models estimate how sales and other outcomes{" "}
          respond to the actions of the firm.
        </p>
      </Slide>

      {/* ================================================================
          Marketing Response Models
          ================================================================ */}
      <Slide id="marketing-response-models" border className="!py-8">
        <SlideHeading>Marketing Response Models</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          A <Term>marketing response model</Term> describes the relationship between an outcome,
          such as sales, market share, or conversion, and the variables that influence it, such
          as price, advertising, and promotion.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Response models inform decisions on pricing, on the size of the marketing budget,
              and on its allocation across channels.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>Regression analysis</Term> is the principal method by which response models
              are estimated.
            </p>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-10 border-t border-[var(--rule)] pt-5`}>
          The week proceeds from correlation to linear and logistic regression, and then to their
          application in marketing mix modeling and attribution.
        </p>
      </Slide>

      {/* ================================================================
          Part 1: Correlation
          ================================================================ */}
      <Slide id="part-1-correlation" border className="!py-8">
        <PartHead n={1} title="Correlation" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Tests of group differences, introduced in Week 7, compare outcomes across
              categories.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Correlation and regression examine relationships between{" "}
              <Term>quantitative variables</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The scatter plot, introduced in Week 6, is the first step in examining such a
              relationship.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Correlation
          ================================================================ */}
      <Slide id="correlation" border className="!py-8" exercise={exercise["correlation"]}>
        <SlideHeading>Correlation</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          The <Term>Pearson correlation coefficient</Term>, r, measures the strength
          and direction of the linear relationship between two interval or ratio variables.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                It ranges from −1, a perfect negative relationship, through 0, no linear
                relationship, to +1, a perfect positive relationship.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, a correlation of −0.6 between price and weekly unit sales across
                stores indicates a <Term>moderately strong negative relationship</Term>: stores
                with higher prices tend to sell fewer units.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                A correlation near zero does not exclude a strong nonlinear relationship, such as
                a response that rises and then falls.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                A correlation does not establish causation, for the reasons introduced in Week 8.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CorrelationStrength />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Linear Regression
          ================================================================ */}
      <Slide id="part-2-linear-regression" border className="!py-8">
        <PartHead n={2} title="Linear Regression" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Regression analysis estimates the relationship between a dependent variable and one or
          more independent variables.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Unlike correlation, regression <Term>distinguishes the variable to be explained</Term>{" "}
              from the variables used to explain it.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              It also estimates the expected change in the dependent variable associated with a
              change in each independent variable.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Simple and Multiple Regression
          ================================================================ */}
      <Slide id="simple-and-multiple-regression" border className="!py-8">
        <SlideHeading>Simple and Multiple Regression</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                <Term>Simple linear regression</Term> estimates the relationship
                between a dependent variable and a single independent variable, in the form Y =
                a + bX + e.
              </P>
            </Ruled>
            <Ruled>
              <P className={`${CELL} !text-[0.95em]`}>
                The intercept, a, is the expected value of Y when X is zero. The slope, b, is the
                expected change in Y associated with a one-unit increase in X. The error term, e,
                represents the variation in Y not explained by X.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The coefficients are estimated by <Term>ordinary least squares</Term>, which
                selects the line that minimizes the sum of the squared differences between the
                observed and the predicted values.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LeastSquares />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className={CELL}>
              <Term>Multiple regression</Term> includes two or more independent
              variables, in the form Y = a + b1X1 + b2X2 + … + e.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              Each coefficient in a multiple regression is a <Term>partial coefficient</Term>:
              the expected change in Y associated with a one-unit increase in that variable,
              holding the other independent variables constant.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Interpreting Regression Coefficients
          ================================================================ */}
      <Slide
        id="interpreting-regression-coefficients"
        border
        className="!py-8"
        exercise={exercise["interpreting-regression-coefficients"]}
      >
        <SlideHeading>Interpreting Regression Coefficients</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          A model of weekly unit sales across stores is estimated as: Sales = 12,000 − 800 ×
          Price + 25 × Advertising, where price is measured in dollars and advertising in
          thousands of dollars.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The coefficient of price indicates that a one-dollar increase in price is
                associated with 800 fewer units sold per week, holding advertising constant.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The coefficient of advertising indicates that an additional thousand dollars of
                advertising is associated with 25 additional units sold per week, holding price
                constant.
              </P>
            </Ruled>
            <Ruled>
              <P className={`${CELL} !text-[0.95em]`}>
                Each coefficient is tested against the null hypothesis that its true value is
                zero, with the t-test and p-value procedures introduced in Week 7.
              </P>
            </Ruled>
            <Ruled>
              <P className={`${CELL} !text-[0.95em]`}>
                Nominal independent variables, such as region, are included as{" "}
                <Term>dummy variables</Term> coded 1 or 0, and their coefficients are
                interpreted relative to a reference category.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                <Term>Standardized coefficients</Term> express each effect in standard deviation
                units, which allows the relative importance of variables measured in different
                units to be compared.
              </P>
            </Ruled>
            <Plate>
              <CoefficientUnits />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Model Fit and Diagnostics
          ================================================================ */}
      <Slide id="model-fit-and-diagnostics" border className="!py-8">
        <SlideHeading>Model Fit and Diagnostics</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The <Term>coefficient of determination</Term>, R², is the proportion of
                the variation in the dependent variable explained by the independent variables.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                <Term>Adjusted R²</Term> corrects for the number of independent variables, since
                R² increases whenever a variable is added, even a variable without explanatory
                value.
              </P>
            </Ruled>
            <Plate>
              <AddedVariables />
            </Plate>
            <Ruled>
              <P className={CELL}>
                The <Term>F test</Term> assesses whether the independent variables,
                taken together, explain a significant proportion of the variation in the
                dependent variable.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The <Term>residuals</Term>, which are the differences between observed
                and predicted values, are examined for patterns that indicate a nonlinear
                relationship, unequal variance, or dependence between observations.
              </P>
            </Ruled>
            <Plate>
              <ResidualPatterns />
            </Plate>
            <Ruled>
              <P className={CELL}>
                A high R² does not establish that the model is correctly specified, and a low R²
                does not prevent individual coefficients from being meaningful.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Multicollinearity
          ================================================================ */}
      <Slide id="multicollinearity" border className="!py-8">
        <SlideHeading>Multicollinearity</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
              <Term>Multicollinearity</Term> occurs when two or more independent
              variables are highly correlated with each other.
            </Statement>
            <Ruled>
              <P className={CELL}>
                For example, television and online video expenditure may rise and fall together
                because both are set in the same annual budget.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Under multicollinearity, the effects of the correlated variables{" "}
                <Term>cannot be reliably separated</Term>. Their coefficients have large standard
                errors, may change substantially when variables are added or removed, and may
                take implausible signs.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The <Term>variance inflation factor</Term>, VIF, measures the extent of
                multicollinearity for each variable. Values above 5 or 10 are conventionally
                treated as problematic.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <CollinearEstimates />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Remedies include combining the correlated variables, removing one of them, or
                obtaining data in which they vary independently, for example through an
                experiment.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Omitted Variables and Reverse Causality
          ================================================================ */}
      <Slide
        id="omitted-variables-and-reverse-causality"
        border
        className="!py-8"
        exercise={exercise["omitted-variables-and-reverse-causality"]}
      >
        <SlideHeading>Omitted Variables and Reverse Causality</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Regression coefficients estimated from observational data describe associations, not
          causal effects, unless further conditions are met.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={`${CELL} !text-[0.95em]`}>
                <Term>Omitted variable bias</Term> occurs when a variable that affects the
                dependent variable and is correlated with an independent variable is excluded from
                the model. For example, if advertising increases before holidays, and holidays
                also increase sales, a model without a holiday variable overstates the effect of
                advertising.
              </P>
            </Ruled>
            <Plate>
              <OmittedHoliday />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                <Term>Reverse causality</Term> occurs when the dependent variable
                influences the independent variable. For example, a firm that increases its
                advertising budget in regions where sales are already growing produces a positive
                association that does not reflect the effect of advertising.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Both problems are reduced by including the relevant control variables, by using
                data from experiments, and by applying the quasi-experimental designs introduced
                in Week 8.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: Logistic Regression
          ================================================================ */}
      <Slide id="part-3-logistic-regression" border className="!py-8">
        <PartHead n={3} title="Logistic Regression" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                Many marketing outcomes are binary: a customer purchases or does not, clicks or
                does not, renews or cancels a subscription.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Linear regression is unsuitable for binary outcomes, since it can produce{" "}
                <Term>predicted probabilities below zero or above one</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <LinearProbability />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t border-[var(--rule-2)] pt-4`}>
          Logistic regression is the standard method for modeling binary outcomes.
        </p>
      </Slide>

      {/* ================================================================
          The Logistic Regression Model
          ================================================================ */}
      <Slide id="the-logistic-regression-model" border className="!py-8">
        <SlideHeading>The Logistic Regression Model</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Logistic regression models the probability of an outcome, such as purchase, as a
          function of the independent variables.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The model is linear in the <Term>log odds</Term> of the outcome, where
                the odds are the probability of the outcome divided by the probability of its
                absence.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The predicted probability follows an <Term>S-shaped curve</Term> and always lies
                between zero and one.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The coefficients are estimated by <Term>maximum likelihood</Term>{" "}
                rather than by ordinary least squares.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Model fit is assessed with measures such as pseudo-R² and the accuracy of
                predictions, which are examined further in Week 11.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LogOddsCurve />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Interpreting Logistic Regression
          ================================================================ */}
      <Slide
        id="interpreting-logistic-regression"
        border
        className="!py-8"
        exercise={exercise["interpreting-logistic-regression"]}
      >
        <SlideHeading>Interpreting Logistic Regression</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Each coefficient represents the change in the log odds of the outcome associated
                with a one-unit increase in the independent variable, holding the others
                constant.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The exponentiated coefficient is the <Term>odds ratio</Term>. An odds
                ratio greater than one indicates that the variable increases the odds of the
                outcome, and an odds ratio less than one indicates that it decreases them.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, an odds ratio of 1.5 for receiving a promotional email indicates that
                the odds of purchase are 50 percent higher for customers who received the email,
                holding other variables constant.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                <Term>An increase in the odds is not an equal increase in the probability.</Term>{" "}
                If the probability of purchase without the email is 10 percent, an odds ratio of
                1.5 corresponds to a probability of approximately 14 percent.
              </P>
            </Ruled>
            <Plate>
              <OddsToProbability />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Results are therefore commonly reported as predicted probabilities for
                representative customers, which decision makers interpret more readily than odds
                ratios.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Marketing Mix Modeling and Attribution
          ================================================================ */}
      <Slide id="part-4-marketing-mix-modeling-and-attribution" border className="!py-8">
        <PartHead n={4} title="Marketing Mix Modeling and Attribution" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Firms allocate their marketing budgets across many channels, including television,
          search, social media, and promotions.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Marketing mix modeling and attribution are two approaches to estimating the
              contribution of each channel.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              They differ in the data they use, the level at which they operate, and the
              questions they can answer.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Marketing Mix Modeling
          ================================================================ */}
      <Slide id="marketing-mix-modeling" border className="!py-8">
        <SlideHeading>Marketing Mix Modeling</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                <Term>Marketing mix modeling</Term> is the application of regression to aggregate
                time-series data, such as weekly sales over two or three years.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The independent variables include expenditure in each marketing channel, price,
                promotions, distribution, seasonality, and external factors such as economic
                conditions and competitor activity.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The model estimates the contribution of each channel to sales and its return on
                investment.
              </P>
            </Ruled>
          </div>
          <Plate>
            <MixDecomposition />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className={CELL}>
              Because it uses aggregate data, marketing mix modeling includes offline channels
              such as television and print, and does not depend on tracking individual consumers.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              It requires several years of data with sufficient variation in expenditure, and it
              is subject to the problems of multicollinearity, omitted variables, and reverse
              causality introduced in this week.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Carryover and Diminishing Returns
          ================================================================ */}
      <Slide id="carryover-and-diminishing-returns" border className="!py-8">
        <SlideHeading>Carryover and Diminishing Returns</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Advertising affects sales not only in the period in which it appears but also in
                later periods. This <Term>carryover effect</Term>, often called
                adstock, is modeled with a decay rate.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, a decay rate of 0.5 indicates that half of the effect of this
                week&rsquo;s advertising carries over to the following week.
              </P>
            </Ruled>
            <Plate>
              <AdstockDecay />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Advertising is also subject to <Term>diminishing returns</Term>: each
                additional dollar produces a smaller increase in sales than the previous one.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                Response curves in marketing mix models are therefore nonlinear, rising steeply
                at low levels of expenditure and flattening at high levels.
              </P>
            </Ruled>
            <Plate>
              <BudgetSplit />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Budget allocation depends on the <Term>marginal return</Term> of each channel,
                the return on the next dollar spent, and not on its average return.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Attribution
          ================================================================ */}
      <Slide id="attribution" border className="!py-8">
        <SlideHeading>Attribution</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          <Term>Attribution</Term> assigns credit for a conversion to the touchpoints
          in an individual customer&rsquo;s path to purchase, such as a display advertisement, a
          social media post, and a search advertisement.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                <Term>Last-click attribution</Term> assigns all credit to the final
                touchpoint before conversion. <Term>First-click attribution</Term>{" "}
                assigns all credit to the first.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                <Term>Linear attribution</Term> divides credit equally among all
                touchpoints. <Term>Time-decay attribution</Term> assigns more credit to
                touchpoints closer to the conversion.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                <Term>Data-driven attribution</Term> estimates the credit for each
                touchpoint statistically, by comparing the paths of customers who converted with
                those of customers who did not.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <AttributionRules />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Attribution operates at the level of individual customers and provides results
                quickly, but it <Term>depends on the tracking of individuals</Term> across
                channels.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Marketing Mix Modeling and Attribution Compared
          ================================================================ */}
      <Slide
        id="marketing-mix-modeling-and-attribution-compared"
        border
        className="!py-8"
        exercise={exercise["marketing-mix-modeling-and-attribution-compared"]}
      >
        <SlideHeading>Marketing Mix Modeling and Attribution Compared</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Attribution assigns credit to touchpoints that preceded a conversion, but it does
                not establish whether the conversion would have occurred without them.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                Attribution tends to assign{" "}
                <Term>disproportionate credit to channels close to the purchase</Term>,
                such as search advertisements for the brand&rsquo;s own name, which often reach
                consumers who have already decided to buy.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BrandSearchHoldout />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className={CELL}>
              Attribution cannot observe offline channels, and its coverage has declined with the
              restrictions on third-party data introduced in Week 2.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              Marketing mix modeling covers all channels, including offline channels, but provides
              estimates at an aggregate level and with less frequency.
            </P>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-6 border-t border-[var(--rule-2)] pt-4 !text-[clamp(1.05rem,1.6vw,1.35rem)]`}>
          Neither approach establishes causal effects on its own. Both are validated with{" "}
          incrementality experiments, such as
          holdout tests and geographic experiments, which apply the experimental designs
          introduced in Week 8.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: The Search Budget
          ================================================================ */}
      <Slide id="discussion-the-search-budget" border className="!py-8">
        <SlideHeading>Discussion: The Search Budget</SlideHeading>
        <Discussion
          scenario={"A retailer's last-click attribution report assigns 60 percent of online sales to search advertising, and the chief marketing officer proposes to move the television budget into search."}
          question={"Which limitations of attribution bear on this proposal, and which evidence should be obtained before the budget is reallocated?"}
        />
      </Slide>

      {/* ================================================================
          Part 5: Explanation and Prediction
          ================================================================ */}
      <Slide id="part-5-explanation-and-prediction" border className="!py-8">
        <PartHead n={5} title="Explanation and Prediction" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Regression models serve two distinct purposes: to explain and to predict.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              The purpose determines how a model is built, how it is evaluated, and what it can be
              used for.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Machine learning methods have increased the accuracy of prediction, at a cost to the
              interpretability of the models.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Explanatory and Predictive Models
          ================================================================ */}
      <Slide id="explanatory-and-predictive-models" border className="!py-8">
        <SlideHeading>Explanatory and Predictive Models</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className={CELL}>
              An <Term>explanatory model</Term> estimates the effect of specific
              variables on an outcome, and is evaluated by the validity and precision of its
              coefficients.
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              A <Term>predictive model</Term> forecasts the outcome for new cases, and
              is evaluated by the accuracy of its predictions on data not used to estimate it,
              known as holdout data.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                A model can predict accurately without estimating causal effects correctly. A
                model can also estimate a causal effect correctly while predicting individual
                outcomes poorly.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                <Term>Overfitting</Term> occurs when a model reproduces the random variation in
                the data used to estimate it, so that it performs well on those data and poorly on
                new data.
              </P>
            </Ruled>
          </div>
          <Plate>
            <Overfitting />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Machine Learning Models
          ================================================================ */}
      <Slide id="machine-learning-models" border className="!py-8">
        <SlideHeading>Machine Learning Models</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          <Term>Machine learning models</Term>, such as tree-based ensembles and neural
          networks, estimate the relationship between the independent variables and the outcome
          from the data, without a functional form specified in advance.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P className={CELL}>
                They capture <Term>nonlinear relationships and interactions</Term> among variables
                without these being specified by the analyst.
              </P>
            </Ruled>
            <Plate>
              <TreeVersusLine />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                With large datasets and many independent variables, they frequently predict more
                accurately than linear or logistic regression.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                They do not produce coefficients that express the effect of each variable in
                interpretable units.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                These models are examined further in Week 11, in the context of customer
                analytics.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Limitations of Machine Learning Models
          ================================================================ */}
      <Slide id="limitations-of-machine-learning-models" border className="!py-8">
        <SlideHeading>Limitations of Machine Learning Models</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                Measures of <Term>variable importance</Term> describe the extent to which a
                model&rsquo;s predictions depend on each variable, not the effect that changing
                the variable would have on the outcome.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                A model may achieve accurate predictions through variables that are correlated
                with the outcome but not causally related to it.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                For example, a model may predict that customers who receive discounts are more
                likely to purchase because discounts were previously offered to the most loyal
                customers. The prediction does not establish that offering discounts to other
                customers would increase their purchases.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <DiscountImportance />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Predictive accuracy on historical data does not ensure accuracy when conditions
                change, as when the firm changes its pricing or a new competitor enters the market.
              </P>
            </Ruled>
          </div>
        </div>
        <p className={`${CLOSE} mt-6 border-t border-[var(--rule)] pt-4 !text-[clamp(1.05rem,1.6vw,1.35rem)]`}>
          AI assistants can generate the code for both regression and machine learning models. The
          procedures for verifying AI-assisted analysis introduced in Week 6 apply to that code.
        </p>
      </Slide>

      {/* ================================================================
          Selecting a Modeling Approach
          ================================================================ */}
      <Slide
        id="selecting-a-modeling-approach"
        border
        className="!py-8"
        exercise={exercise["selecting-a-modeling-approach"]}
      >
        <SlideHeading>Selecting a Modeling Approach</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Numbered n={1}>
            <Ruled>
              <p className={BIG}>
                <Term>Linear or logistic regression</Term> is appropriate when the
                decision requires an interpretable estimate of the effect of specific variables,
                such as the effect of price on unit sales.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={2}>
            <Ruled>
              <p className={BIG}>
                A <Term>machine learning model</Term> is appropriate when the decision
                requires accurate predictions for individual cases, such as which customers are
                most likely to cancel a subscription.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={3}>
            <Ruled>
              <p className={BIG}>
                An <Term>experiment or a quasi-experiment</Term> is required when the
                decision depends on the causal effect of an action the firm has not previously
                taken, or has taken only for selected customers.
              </p>
            </Ruled>
          </Numbered>
        </div>
        <p className={`${CLOSE} mt-10 border-t border-[var(--rule-2)] pt-5`}>
          Many decisions combine the approaches: a
          predictive model identifies the customers at risk, and an experiment estimates the
          effect of an intervention on those customers.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: Accuracy or Understanding?
          ================================================================ */}
      <Slide id="discussion-accuracy-or-understanding" border className="!py-8">
        <SlideHeading>Discussion: Accuracy or Understanding?</SlideHeading>
        <Discussion
          scenario={"A data science team presents a machine learning model that predicts weekly sales more accurately than the firm's marketing mix model, and proposes to use it to set next year's advertising budget."}
          question={"What can the new model contribute to the budget decision, and what can it not contribute?"}
        />
      </Slide>

      {/* ================================================================
          Part 6: Choice Models for AI Agents
          ================================================================ */}
      <Slide id="part-6-choice-models-for-ai-agents" border className="!py-8">
        <PartHead n={6} title="Choice Models for AI Agents" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              When AI agents select products, their choices can be analyzed with the models used
              for consumer choice.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Such models estimate how agents weight product attributes and test the mechanisms
              that link a manipulation to a choice.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Estimating How AI Agents Weight Attributes
          ================================================================ */}
      <Slide
        id="estimating-how-ai-agents-weight-attributes"
        border
        className="!py-8"
        exercise={exercise["estimating-how-ai-agents-weight-attributes"]}
      >
        <SlideHeading>Estimating How AI Agents Weight Attributes</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The <Term>conditional logit model</Term> extends logistic regression to
                choices among several alternatives, and estimates a coefficient for each attribute
                of the alternatives.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The researcher presents the agent with many choice sets in which the attributes
                vary, and estimates the coefficients from its choices.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                The estimates are compared with a <Term>normative benchmark</Term>. For
                a packaged good, the normative objective is the lowest price per unit, which
                weights a cent of the price exactly as much as one hundredth of a dollar.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <P className="!max-w-none !leading-snug">
              In one study, separate coefficients for the whole-dollar and the cent components of
              coffee prices were estimated across 1,014 choice sets. The ratio of the two
              coefficients ranged from 0.55 to 1.12 across eight models, and for seven of the
              eight models its confidence interval included the normative value of 1 (Wadi &amp;
              Ma, 2026b).
            </P>
            <Plate>
              <CentDollarRatio />
            </Plate>
            <Ruled>
              <P className={CELL}>
                Under complete information, most agents therefore{" "}
                <Term>did not discount the cents in a price</Term>, in contrast to the left-digit
                effect documented among consumers.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Mediation Analysis
          ================================================================ */}
      <Slide id="mediation-analysis" border className="!py-8" exercise={exercise["mediation-analysis"]}>
        <SlideHeading>Mediation Analysis</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          <Term>Mediation analysis</Term> tests whether the effect of a manipulated
          variable on an outcome passes through an intermediate variable, called the mediator.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className={CELL}>
                The <Term>indirect effect</Term> is the part of the effect transmitted
                through the mediator, and the <Term>direct effect</Term> is the
                remainder.
              </P>
            </Ruled>
            <Ruled>
              <P className={CELL}>
                In a study of sponsored listings, the skepticism an agent expressed in its
                reasoning trace mediated the effect of a sponsorship label on the agent&rsquo;s
                choice, and this indirect effect was{" "}
                <Term>weaker when the agent was told it served the platform</Term> rather than the
                traveler (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
          </div>
          <Plate>
            <SkepticismMediation />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className={CELL}>
              In a study of pricing cues, the cost of acquiring attributes reduced the number of
              diagnostic attributes the agent acquired, which in turn reduced the frequency of
              optimal choices, particularly under a vague goal (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P className={CELL}>
              The mediator is measured rather than manipulated, so that the analysis provides
              evidence consistent with a mechanism rather than proof of it.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Correlation measures the strength and direction of a linear relationship. Regression estimates the expected change in an outcome associated with each independent variable.",
            "Multiple regression coefficients are partial effects, interpreted holding the other variables constant, and are assessed together with model fit and diagnostics.",
            "Multicollinearity, omitted variables, and reverse causality limit the causal interpretation of regression estimated from observational data.",
            "Logistic regression models binary outcomes, and its coefficients are interpreted as odds ratios and predicted probabilities.",
            "Marketing mix modeling estimates channel contributions from aggregate data, attribution assigns credit to individual touchpoints, and both are validated with incrementality experiments.",
            "Machine learning models frequently predict more accurately than regression, but they do not estimate the effect of marketing actions, and prediction does not establish causation.",
            "Conditional logit models estimate how AI agents weight product attributes against a normative benchmark, and mediation analysis tests the mechanism that links a manipulation to an agent’s choice.",
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
