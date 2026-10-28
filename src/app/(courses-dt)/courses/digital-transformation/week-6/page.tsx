"use client";

import React, { useState } from "react";
import { ProgressBar } from "@/components/presentation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import exercisesData from "./exercises.json";

import {
  DECK_THEME,
  DeckNav,
  PosterHero,
  ChapterBand,
  Slide,
  Row,
  PlateWell,
  DiscussionList,
  Summary,
} from "../_visuals/kit";
import { Conversation } from "../_visuals/objects";
import {
  HeroAiLayers,
  IntelligenceTypesInteractive,
  IntelligenceTypesTall,
  WhichOneIsAiInteractive,
  WhichOneIsAiTall,
  RulesVsMlInteractive,
  RiseOfMlInteractive,
  DecisionTreeInteractive,
  LinearRegressionInteractive,
  LogisticRegressionInteractive,
  EnsembleWeatherInteractive,
  RandomForestInteractive,
  RandomForestTall,
  SupervisedVsUnsupervisedInteractive,
  SupervisedVsUnsupervisedTall,
  ParadigmLensInteractive,
  ParadigmLensTall,
  ComparisonAspectPlate,
  CaseStudiesInteractive,
  CaseStudiesTall,
} from "./visuals";

const SECTIONS = [
  { id: "hero", label: "Introduction" },
  { id: "ch1", label: "Artificial Intelligence" },
  { id: "ch2", label: "Machine Learning" },
  { id: "ch3", label: "ML Algorithms" },
  { id: "ch4", label: "Supervised vs. Unsupervised" },
  { id: "conclusion", label: "Conclusion" },
];

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/* Body copy: the reading serif. Terms set bold in the display serif. */
const BODY_BASE = "font-body leading-[1.6] [&_strong]:font-heading [&_strong]:font-bold";
const BODY = `${BODY_BASE} text-base md:text-[1.08rem]`;
const LIST =
  "list-none flex flex-col gap-1.5 [&>li]:flex [&>li]:gap-3 [&>li]:before:content-[''] [&>li]:before:mt-[0.6em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:rotate-45 [&>li]:before:shrink-0 [&>li]:before:bg-[var(--dt-ink)]";
const SUBLIST =
  "list-none flex flex-col gap-1 mt-1.5 pl-4 [&>li]:flex [&>li]:gap-2.5 [&>li]:before:content-['-'] [&>li]:before:shrink-0";

function Bullets({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`${LIST} ${className}`}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Dashes({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={SUBLIST}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DigitalTransformationWeek6() {
  const [activeIntel, setActiveIntel] = useState(0);
  const [activeCandidate, setActiveCandidate] = useState(0);
  const [activeDriver, setActiveDriver] = useState(0);
  const [activeRf, setActiveRf] = useState(0);
  const [activeParadigm, setActiveParadigm] = useState(0);
  const [activeLens, setActiveLens] = useState(0);
  const [activeAspect, setActiveAspect] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  return (
    <main className="relative w-full overflow-x-hidden min-h-screen font-body" style={DECK_THEME}>
      <ProgressBar />
      <DeckNav sections={SECTIONS} />
      <Link
        href="/courses/digital-transformation"
        className="fixed top-3 left-3 z-50 flex items-center justify-center w-10 h-10 text-[var(--ink-3)] hover:text-[var(--dt-signal)] transition-colors duration-300"
        aria-label="Back to Course Hub"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <PosterHero
        category="WEEK 6: DIGITAL TRANSFORMATION"
        title="Week 6: AI/ML/DL"
        author="Dr. Davood Wadi"
        institution="Digital Transformation"
        agenda={[
          "Review last week's material",
          "Introduce AI",
          "Different types of AI",
          "Machine learning",
          "ML algorithms",
          "Different paradigms of learning",
          "Conclusion",
          "Q&A",
        ]}
        plate={<HeroAiLayers />}
      />

      {/* ================================================================
          CHAPTER 1: ARTIFICIAL INTELLIGENCE
          ================================================================ */}
      <ChapterBand id="ch1" number="01" title="Artificial Intelligence" />

      <DiscussionList
        id="discussion-1"
        questions={[
          "When you hear ‘Artificial Intelligence,’ what’s the first example that comes to mind?",
          "Have you interacted with AI today without realizing it? Let’s brainstorm hidden AI in daily life.",
          "How is a ‘smart’ app like ChatGPT different from a basic calculator? What makes it ‘AI’?",
        ]}
        plate={<Conversation left={2} right={5} />}
      />

      <DiscussionList
        id="discussion-2"
        questions={[
          "If you asked ChatGPT for advice, would you trust it more than a human? Why or why not?",
          "What kind of topics do you post on your social media?",
          "If you trained an AI using only your social media posts, what might it ‘learn’ about people?",
        ]}
        plate={<Conversation left={6} right={3} />}
      />

      <Slide id="artificial-intelligence" label="CORE CONCEPT" title="Artificial Intelligence">
        <div className={`${BODY} text-lg border-l-[5px] border-[var(--dt-ink)] pl-4`}>
          <p>
            <strong>Artificial Intelligence</strong>: Intelligence shown by machines.
          </p>
        </div>
        <PlateWell>
          <div className="hidden sm:block">
            <IntelligenceTypesInteractive active={activeIntel} onSelect={setActiveIntel} />
          </div>
          <div className="sm:hidden">
            <IntelligenceTypesTall active={activeIntel} onSelect={setActiveIntel} />
          </div>
        </PlateWell>
        <div className={BODY}>
          <p className="font-heading font-bold text-xl mb-3">
            <strong>Intelligence</strong>:
          </p>
          <div className="grid">
            {[
              {
                name: "Animal",
                content: <>Animal: Instinctual survival behaviors (e.g., birds migrating, bees building hives).</>,
              },
              {
                name: "Human",
                content: (
                  <>
                    Human: Critical thinking, creativity, emotional understanding (e.g., solving complex equations,
                    composing music).
                  </>
                ),
              },
              {
                name: "Artificial",
                content: (
                  <>
                    <span>Artificial:</span>
                    <Dashes
                      items={[
                        <>Pattern recognition (e.g., spam filters, recommendation engines).</>,
                        <>Language translation, sentiment analysis (e.g., ChatGPT).</>,
                        <>Object detection (e.g., self-driving cars, medical imaging).</>,
                      ]}
                    />
                  </>
                ),
              },
            ].map((item, i) => {
              const isLit = i === activeIntel;
              return (
                <div
                  key={item.name}
                  aria-hidden={!isLit}
                  className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 text-lg transition-opacity duration-200 ${
                    isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                  }`}
                >
                  {item.content}
                </div>
              );
            })}
          </div>
        </div>
      </Slide>

      <Slide
        id="artificial-intelligence-which-one-is-ai"
        label="ARTIFICIAL INTELLIGENCE"
        title="Artificial Intelligence: Which One Is AI?"
        exercise={exercise["artificial-intelligence-which-one-is-ai"]}
      >
        <p className="font-heading font-bold text-2xl">Which one is AI?</p>
        <PlateWell>
          <div className="hidden sm:block">
            <WhichOneIsAiInteractive active={activeCandidate} onSelect={setActiveCandidate} />
          </div>
          <div className="sm:hidden">
            <WhichOneIsAiTall active={activeCandidate} onSelect={setActiveCandidate} />
          </div>
        </PlateWell>
        <ol className={`${BODY} grid`}>
          {[
            <>
              A computer chess game playing against humans beats a human player. It uses rules-based algorithms to
              decide its next move.
            </>,
            <>A machine uses historical music listened by you to recommend a new song that you might like.</>,
            <>Microsoft Word gives you recommendations on potential spelling errors based on a dictionary.</>,
            <>ElevenLabs turns your text into realistic speech.</>,
          ].map((item, i) => {
            const isLit = i === activeCandidate;
            return (
              <li
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 flex items-baseline gap-4 text-xl transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <span className="font-heading font-bold text-2xl shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            );
          })}
        </ol>
      </Slide>

      {/* ================================================================
          CHAPTER 2: MACHINE LEARNING
          ================================================================ */}
      <ChapterBand id="ch2" number="02" title="Machine Learning" />

      <Slide id="machine-learning" label="DEFINITION" title="Machine Learning">
        <div className={`${BODY} text-lg grid md:grid-cols-3 gap-6`}>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            A technique that uses Data and Performance Metric to automatically find how to solve a Task.
          </p>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">Contrasted with Rules-Based Expert Systems.</p>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">Gained popularity in the 21st century.</p>
        </div>
        <PlateWell>
          <RulesVsMlInteractive />
        </PlateWell>
      </Slide>

      <Slide
        id="rise-of-machine-learning"
        label="DRIVERS"
        title="Rise of Machine Learning"
        exercise={exercise["rise-of-machine-learning"]}
      >
        <ol className={`${BODY} grid md:grid-cols-3 gap-6`}>
          {[<>Increase in Compute Power</>, <>Increase in Data (Big Data)</>, <>Decrease in Storage Costs</>].map(
            (item, i) => {
              const isLit = i === activeDriver;
              return (
                <li
                  key={i}
                  onClick={() => setActiveDriver(i)}
                  className={`cursor-pointer border-t-[4px] pt-4 flex items-baseline gap-3 font-heading font-bold text-xl transition-colors ${
                    isLit ? "border-[var(--dt-signal)]" : "border-[var(--dt-ink)]"
                  }`}
                >
                  <span className="font-accent text-base">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              );
            },
          )}
        </ol>
        <PlateWell>
          <RiseOfMlInteractive active={activeDriver} onSelect={setActiveDriver} />
        </PlateWell>
      </Slide>

      {/* ================================================================
          CHAPTER 3: MACHINE LEARNING ALGORITHMS
          ================================================================ */}
      <ChapterBand id="ch3" number="03" title="Machine Learning Algorithms" />

      <Slide id="decision-trees" label="ML ALGORITHMS" title="Decision Trees">
        <div className={`${BODY} text-lg grid md:grid-cols-2 gap-6 md:gap-10`}>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            Imagine you are decision whether to go outside to play tennis.
          </p>
          <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
            To make your decision you use a mentally formed Decision Tree.
          </p>
        </div>
        <PlateWell>
          <DecisionTreeInteractive />
        </PlateWell>
      </Slide>

      <Slide id="linear-regression" label="ML ALGORITHMS" title="Linear Regression">
        <Row cols="lg:grid-cols-[1.15fr_1fr]">
          <div className={`${BODY_BASE} text-lg md:text-[1.35rem] flex flex-col gap-5`}>
            <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
              Imagine you have recorded transaction data for a retail store.
            </p>
            <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
              You have the price of the items and their sales.
            </p>
            <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
              You wish to predict sales based on the prices.
            </p>
          </div>
          <PlateWell>
            <LinearRegressionInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="logistic-regression"
        label="ML ALGORITHMS"
        title="Logistic Regression"
        exercise={exercise["logistic-regression"]}
      >
        <Row cols="lg:grid-cols-[1fr_1.15fr]">
          <PlateWell>
            <LogisticRegressionInteractive />
          </PlateWell>
          <div className={`${BODY_BASE} text-lg md:text-[1.35rem] flex flex-col gap-5`}>
            <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
              Imagine you have recorded historical click data for a retail website.
            </p>
            <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
              You have product and customer characteristics in a database.
            </p>
            <p className="border-t-[4px] border-[var(--dt-ink)] pt-4">
              You wish to predict whether a given customer will click on the product.
            </p>
          </div>
        </Row>
      </Slide>

      <Slide id="ensemble-learning" label="ML ALGORITHMS" title="Ensemble Learning">
        <div className={`${BODY} grid md:grid-cols-3 gap-5 border-b-[3px] border-[var(--dt-ink)] pb-5`}>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            Ensemble learning combines multiple models to improve prediction accuracy,
          </p>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            Much like seeking advice from several experts to make a better decision.
          </p>
          <p className="border-t-[3px] border-[var(--dt-ink)] pt-3">
            The idea is that the collective &ldquo;wisdom&rdquo; of diverse models reduces individual errors.
          </p>
        </div>
        <Row cols="lg:grid-cols-[1.15fr_1fr]">
          <div className={`${BODY} flex flex-col gap-4`}>
            <p className="font-heading font-bold text-xl">
              <em>Scenario</em>: You want to predict if it will rain tomorrow.
            </p>
            <div className="border-l-[4px] border-[var(--dt-ink)] pl-4">
              <p className="font-heading font-bold">Single Model (Apple Weather):</p>
              <Dashes
                items={[
                  <>Apple Whether predicts rain with 70% accuracy.</>,
                  <>If it says &ldquo;rain,&rdquo; you’re 70% confident.</>,
                ]}
              />
            </div>
            <div className="border-l-[4px] border-[var(--dt-ink)] pl-4">
              <p className="font-heading font-bold">
                Ensemble Approach (Apple Weather, AccuWeather, Google Weather):
              </p>
              <Dashes
                items={[
                  <>Three apps, each with 70% accuracy, make independent predictions.</>,
                  <>
                    Possible outcomes:
                    <Dashes
                      items={[
                        <>All three say &ldquo;rain&rdquo; → Ensemble says &ldquo;rain.&rdquo;</>,
                        <>
                          Two say &ldquo;rain,&rdquo; one says &ldquo;no rain&rdquo; → Majority vote →
                          &ldquo;rain.&rdquo;
                        </>,
                        <>If only one says &ldquo;rain,&rdquo; ensemble says &ldquo;no rain.&rdquo;</>,
                      ]}
                    />
                  </>,
                ]}
              />
            </div>
          </div>
          <PlateWell>
            <EnsembleWeatherInteractive />
          </PlateWell>
        </Row>
      </Slide>

      <Slide id="random-forest" label="ENSEMBLE ALGORITHM" title="Random Forest" exercise={exercise["random-forest"]}>
        <p className={`${BODY} text-lg border-l-[5px] border-[var(--dt-ink)] pl-4`}>
          Random Forest is an ensemble learning algorithm that combines multiple decision trees to improve predictive
          accuracy and control overfitting. It is widely used for both classification and regression tasks.
        </p>
        <PlateWell>
          <div className="hidden sm:block">
            <RandomForestInteractive active={activeRf} onSelect={setActiveRf} />
          </div>
          <div className="sm:hidden">
            <RandomForestTall active={activeRf} onSelect={setActiveRf} />
          </div>
        </PlateWell>
        <div className={`${BODY} text-lg grid`}>
          {[
            <>
              <strong>Ensemble Method</strong>: Builds a &ldquo;forest&rdquo; of decision trees, each trained on a
              random subset of the data and features.
            </>,
            <>
              <strong>Diversity</strong>: Each tree is trained independently, leading to diverse models that capture
              different patterns in the data.
            </>,
            <>
              <strong>Voting/Averaging</strong>: For classification, the most common predicted class from the trees is
              chosen. For regression, the average prediction is taken.
            </>,
            <>
              <strong>Robustness</strong>: Reduces overfitting by averaging multiple trees, providing a more generalized
              model.
            </>,
            <>
              <strong>Advantages:</strong>
              <Dashes
                items={[
                  <>High accuracy and performance.</>,
                  <>Handles large datasets with higher dimensionality well.</>,
                  <>Provides feature importance scores, aiding interpretability.</>,
                ]}
              />
            </>,
          ].map((item, i) => {
            const isLit = i === activeRf;
            return (
              <div
                key={i}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </Slide>

      {/* ================================================================
          CHAPTER 4: SUPERVISED VS. UNSUPERVISED LEARNING
          ================================================================ */}
      <ChapterBand id="ch4" number="04" title="Supervised vs. Unsupervised Learning" />

      <Slide id="supervised-vs-unsupervised-learning" label="LEARNING PARADIGMS" title="Supervised vs. Unsupervised Learning">
        <PlateWell>
          <div className="hidden sm:block">
            <SupervisedVsUnsupervisedInteractive active={activeParadigm} onSelect={setActiveParadigm} />
          </div>
          <div className="sm:hidden">
            <SupervisedVsUnsupervisedTall active={activeParadigm} onSelect={setActiveParadigm} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              key: "supervised",
              def: (
                <>
                  <strong>Supervised Learning</strong>: Algorithms learn from <strong>labeled data</strong>, where each
                  input example is paired with a corresponding output (target). The model aims to map inputs to outputs
                  for prediction or classification.
                </>
              ),
              ex: <>Example: Customer classification into hedonic vs. utility consumers</>,
              head: "Supervised",
              items: [
                <>Predicting house prices (regression).</>,
                <>Classifying emails as spam vs. not spam.</>,
                <>Medical diagnosis (e.g., identifying diseases from symptoms).</>,
              ],
            },
            {
              key: "unsupervised",
              def: (
                <>
                  <strong>Unsupervised Learning</strong>: Algorithms analyze <strong>unlabeled data</strong> to discover
                  hidden patterns, groupings, or structures without predefined outcomes.
                </>
              ),
              ex: <>Example: Customer segmentation without having any labels</>,
              head: "Unsupervised",
              items: [
                <>Customer segmentation (clustering).</>,
                <>Topic modeling in text data (e.g., LDA).</>,
                <>Reducing features in a dataset (PCA for visualization).</>,
              ],
            },
          ].map((p, i) => {
            const isLit = i === activeParadigm;
            return (
              <div
                key={p.key}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-10 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <p className="text-lg">{p.def}</p>
                  <Dashes items={[p.ex]} />
                </div>
                <div className="md:border-l-[3px] md:border-[var(--dt-ink)] md:pl-6">
                  <p className="font-heading font-bold text-xl mb-2">
                    <strong>{p.head}</strong>:
                  </p>
                  <Dashes items={p.items} />
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="popular-algorithms-when-to-use-and-challenges"
        label="LEARNING PARADIGMS"
        title="Popular Algorithms, When to Use, and Challenges"
      >
        <PlateWell>
          <div className="hidden sm:block">
            <ParadigmLensInteractive active={activeLens} onSelect={setActiveLens} />
          </div>
          <div className="sm:hidden">
            <ParadigmLensTall active={activeLens} onSelect={setActiveLens} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              title: "Popular Algorithms",
              sup: <>Linear Regression, Decision Trees, Support Vector Machines (SVM), Neural Networks.</>,
              unsup: <>K-Means Clustering, Hierarchical Clustering, Principal Component Analysis (PCA), Autoencoders.</>,
            },
            {
              title: "When to Use",
              sup: <>When you have labeled data and a clear prediction goal (e.g., forecasting sales).</>,
              unsup: (
                <>
                  For exploratory analysis, anomaly detection, or preprocessing data (e.g., grouping genes by
                  expression).
                </>
              ),
            },
            {
              title: "Challenges",
              sup: <>Requires high-quality labeled data (time-consuming/costly to acquire). Risk of overfitting.</>,
              unsup: <>Results can be subjective. Harder to evaluate without ground truth.</>,
            },
          ].map((item, i) => {
            const isLit = i === activeLens;
            return (
              <div
                key={item.title}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <p className="font-heading font-bold text-2xl mb-3">
                  <strong>{item.title}</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 text-lg">
                  <div className="border-l-[4px] border-[var(--dt-signal)] pl-4">
                    <p>
                      <strong>Supervised</strong>: {item.sup}
                    </p>
                  </div>
                  <div className="border-l-[4px] border-[var(--counter)] pl-4">
                    <p>
                      <strong>Unsupervised</strong>: {item.unsup}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide
        id="supervised-vs-unsupervised-learning-comparison"
        label="COMPARISON"
        title="Supervised vs. Unsupervised Learning: Comparison"
        exercise={exercise["supervised-vs-unsupervised-learning-comparison"]}
      >
        <Row cols="lg:grid-cols-[1.35fr_1fr]">
          <div className={BODY}>
            <table className="w-full border-collapse border-[3px] border-[var(--dt-ink)]">
              <thead>
                <tr className="bg-[var(--dt-ink)] text-[var(--dt-cream)] text-left">
                  <th className="p-3 font-heading font-bold">
                    <strong>Aspect</strong>
                  </th>
                  <th className="p-3 font-heading font-bold">
                    <strong>Supervised Learning</strong>
                  </th>
                  <th className="p-3 font-heading font-bold">
                    <strong>Unsupervised Learning</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    aspect: "Data",
                    sup: "Labeled (inputs + known outputs)",
                    unsup: "Unlabeled (inputs only)",
                  },
                  {
                    aspect: "Goal",
                    sup: "Predict outcomes or classify new data",
                    unsup: "Explore data structure, find patterns",
                  },
                  {
                    aspect: "Feedback",
                    sup: "Direct feedback (errors are corrected via labels)",
                    unsup: "No feedback. Model infers patterns autonomously",
                  },
                  {
                    aspect: "Common Tasks",
                    sup: "Regression, Classification",
                    unsup: "Clustering, Dimensionality Reduction",
                  },
                  {
                    aspect: "Evaluation Metrics",
                    sup: "Accuracy, Precision, Recall, F1-Score, RMSE",
                    unsup: "Silhouette Score, Elbow Method, Reconstruction Error",
                  },
                ].map((r, i) => {
                  const isLit = i === activeAspect;
                  return (
                    <tr
                      key={r.aspect}
                      onClick={() => setActiveAspect(i)}
                      className={`border-t-2 border-[var(--dt-ink)] cursor-pointer transition-colors ${
                        isLit ? "bg-[var(--paper-2)]" : ""
                      }`}
                    >
                      <td className="p-3 font-heading font-bold">
                        <strong>{r.aspect}</strong>
                      </td>
                      <td className="p-3">{r.sup}</td>
                      <td className="p-3">{r.unsup}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <PlateWell>
            <ComparisonAspectPlate active={activeAspect} onSelect={setActiveAspect} />
          </PlateWell>
        </Row>
      </Slide>

      <Slide
        id="case-studies-supervised-vs-unsupervised-learning"
        label="CASE STUDIES"
        title="Case Studies: Supervised vs. Unsupervised Learning"
        exercise={exercise["case-studies-supervised-vs-unsupervised-learning"]}
      >
        <p className={`${BODY} text-lg`}>
          Test your understanding by classifying these scenarios into Supervised vs. Unsupervised Learning
        </p>
        <PlateWell>
          <div className="hidden sm:block">
            <CaseStudiesInteractive active={activeCase} onSelect={setActiveCase} />
          </div>
          <div className="sm:hidden">
            <CaseStudiesTall active={activeCase} onSelect={setActiveCase} />
          </div>
        </PlateWell>
        <div className={`${BODY} grid`}>
          {[
            {
              n: 1,
              scenario: (
                <em>
                  A company wants to predict customer churn (whether a customer will stop using their service) based on
                  usage patterns and demographics. They have historical data showing which customers churned in the
                  past.
                </em>
              ),
              answer: "Supervised Learning",
              why: "The model uses labeled data (past churn outcomes) to learn patterns and predict future churn.",
            },
            {
              n: 2,
              scenario: (
                <em>
                  A biologist has gene expression data from 1,000 patients but no prior labels. They want to group
                  patients into clusters to identify potential subtypes of a disease.
                </em>
              ),
              answer: "Unsupervised Learning",
              why: "No predefined labels exist. The goal is to discover hidden patterns (disease subtypes) in the data.",
            },
            {
              n: 3,
              scenario: (
                <em>
                  A streaming service uses viewing history to recommend movies by predicting how users will rate films
                  they haven’t seen yet. They use past user ratings as training data.
                </em>
              ),
              answer: "Supervised Learning",
              why: "The model learns from labeled data (user ratings) to predict future ratings.",
            },
            {
              n: 4,
              scenario: (
                <em>
                  A retail store analyzes purchase histories to find products frequently bought together (e.g.,
                  &ldquo;customers who bought X also bought Y&rdquo;).
                </em>
              ),
              answer: "Unsupervised Learning",
              why: "The goal is to discover associations in unlabeled transaction data (no predefined rules or labels).",
            },
            {
              n: 5,
              scenario: (
                <em>
                  A weather app predicts tomorrow’s temperature using historical data on temperature, humidity, and wind
                  speed.
                </em>
              ),
              answer: "Supervised Learning",
              why: "The model uses labeled data (historical temperatures) to predict a continuous output (regression).",
            },
            {
              n: 6,
              scenario: (
                <em>
                  A photographer uses an algorithm to organize 10,000 unlabeled images into groups of similar landscapes
                  (e.g., beaches, forests, mountains).
                </em>
              ),
              answer: "Unsupervised Learning",
              why: "No labels are provided. The algorithm identifies visual patterns to cluster images.",
            },
            {
              n: 7,
              scenario: (
                <em>
                  A bank trains a model to approve or reject loan applications using historical data on applicant
                  income, credit score, and past loan defaults.
                </em>
              ),
              answer: "Supervised Learning",
              why: "The model learns from labeled outcomes (approved/rejected loans) to make decisions.",
            },
            {
              n: 8,
              scenario: (
                <em>
                  A researcher reduces a 50-dimensional dataset into 2 dimensions to visualize relationships between
                  data points.
                </em>
              ),
              answer: "Unsupervised Learning",
              why: "Dimensionality reduction (e.g., PCA) uncovers structure in unlabeled data for visualization.",
            },
            {
              n: 9,
              scenario: (
                <em>
                  A hospital uses patient data (symptoms, age, medical history) to diagnose whether a patient has
                  diabetes, using records of past diagnoses.
                </em>
              ),
              answer: "Supervised Learning",
              why: "The model is trained on labeled data (past diagnoses) to classify new cases.",
            },
            {
              n: 10,
              scenario: (
                <em>
                  A social media platform groups users into communities based on shared interests, without predefined
                  categories.
                </em>
              ),
              answer: "Unsupervised Learning",
              why: "The algorithm identifies natural groupings in unlabeled user behavior data.",
            },
          ].map((c, i) => {
            const isLit = i === activeCase;
            return (
              <div
                key={c.n}
                aria-hidden={!isLit}
                className={`col-start-1 row-start-1 border-t-[4px] border-[var(--dt-ink)] pt-4 grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-10 transition-opacity duration-200 ${
                  isLit ? "opacity-100" : "opacity-0 pointer-events-none select-none"
                }`}
              >
                <div>
                  <p className="font-heading font-bold text-2xl mb-2">
                    <strong>Case {c.n}</strong>
                  </p>
                  <p className="text-lg">{c.scenario}</p>
                </div>
                <div className="md:border-l-[3px] md:border-[var(--dt-ink)] md:pl-6 flex flex-col gap-2">
                  <p className="text-lg">
                    <strong>Answer</strong>: {c.answer}
                  </p>
                  <p>
                    <strong>Why?</strong> {c.why}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Slide>

      <Summary
        id="conclusion"
        title="Conclusion"
        takeaways={[
          "Artificial Intelligence definition",
          "Rules-based AI vs ML",
          "Decision Trees",
          "Linear Regression",
          "Logistic Regression",
          "Ensemble Learning",
          "Random Forest",
          "Supervised vs. Unsupervised learning",
        ]}
      />
    </main>
  );
}

