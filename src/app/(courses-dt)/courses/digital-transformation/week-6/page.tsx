import React from "react"
import {
  ProgressBar,
  FloatingNav,
  Hero,
  ChapterHeader,
  ZigzagContent,
  ConceptCardsZigzag,
  CinematicQuote,
  Conclusion,
  DataBlock
} from "@/components/presentation"

import aiImage from "./what-is-ai-artificial-intelligence.png"
import riseOfMlImage from "./0_cscvSwrKTCIJcnuO.png"
import decisionTreeImage from "./decision-tree-example.png"
import linearRegressionImage from "./Linear-regression-model.png"
import logisticRegressionImage from "./46-4-e1715636469361.png"
import ensembleImage from "./image-10.png"
import randomForestImage from "./vz1f8191.Ensemble-of-decision-trees.png"
import Image from "next/image"

const SECTIONS = [
  { id: "hero", label: "Introduction" }, 
  { id: "ch1", label: "Artificial Intelligence" },
  { id: "ch2", label: "Machine Learning" },
  { id: "ch3", label: "ML Algorithms" },
  { id: "ch4", label: "Learning Paradigms" },
  { id: "conclusion", label: "Summary" }
]

export default function DigitalTransformationWeek6() {
  return (
    <main className="theme-midnight-sapphire relative w-full overflow-x-hidden bg-background min-h-screen font-body text-text-primary">
      <ProgressBar />
      <FloatingNav sections={SECTIONS} />

      <Hero
        category="WEEK 06 — DIGITAL TRANSFORMATION"
        title="AI & Machine Learning"
        subtitle="Understanding Intelligence, ML Algorithms, and Learning Paradigms"
        author="Dr. Davood Wadi"
        date="Spring 2025"
        institution="Digital Transformation"
      />

      {/* CHAPTER 1 */}
      <ChapterHeader
        id="ch1"
        number="01"
        title="Artificial Intelligence"
        description="Introduction to Artificial Intelligence and how it differs from human and animal intelligence."
        altBg={true}
      />

      <ZigzagContent
        label="CORE PRINCIPLE"
        title="What is Intelligence?"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Artificial Intelligence refers to intelligence shown by machines. While animal intelligence focuses on instinctual survival and human intelligence involves critical thinking and emotional understanding, artificial intelligence excels at pattern recognition, language translation, and object detection.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: aiImage
          },
          {
            type: "insight",
            label: "REFLECTION QUESTION",
            content: "Think of a time you interacted with AI today without realizing it. What makes a 'smart' app like ChatGPT different from a basic calculator?"
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={true}
        cards={[
          { number: "01", title: "Rules-Based Engine", description: "A computer chess game playing against humans that uses predefined rules-based algorithms to decide its next move." },
          { number: "02", title: "Recommendation Systems", description: "A machine uses your historical music listening habits to recommend a new song that you might like." },
          { number: "03", title: "Natural Language Processing", description: "Advanced models like ChatGPT or tools like ElevenLabs that can turn text into highly realistic speech." }
        ]}
        altBg={true}
      />

      <CinematicQuote
        quote="If you trained an AI using only your social media posts, what might it 'learn' about your behavior?"
        author="Class Discussion"
        altBg={false}
      />

      {/* CHAPTER 2 */}
      <ChapterHeader
        id="ch2"
        number="02"
        title="Machine Learning"
        description="The definition of Machine Learning and the forces driving its rapid rise in the 21st century."
        altBg={true}
      />

      <ZigzagContent
        label="THEORETICAL FRAMEWORK"
        title="Learning from Data"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Contrasted with traditional rules-based expert systems, Machine Learning is a technique that uses data and performance metrics to automatically figure out how to solve a task.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: riseOfMlImage
          },
          {
            type: "text",
            content: (
              <p>
                The rise of Machine Learning in the 21st century is primarily driven by an exponential increase in compute power, the explosion of Big Data, and a dramatic decrease in storage costs.
              </p>
            )
          }
        ]}
      />

      {/* CHAPTER 3 */}
      <ChapterHeader
        id="ch3"
        number="03"
        title="ML Algorithms"
        description="Exploring key algorithms that power machine learning models, from simple decision trees to complex random forests."
        altBg={false}
      />

      <ZigzagContent
        label="METHODOLOGY"
        title="Decision Trees & Regression"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Imagine you are deciding whether to go outside to play tennis. To make your decision, you subconsciously use a mentally formed Decision Tree based on weather conditions.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: decisionTreeImage
          },
          {
            type: "text",
            content: (
              <p>
                Linear Regression is used when you wish to predict continuous outcomes. For example, predicting the sales of retail items based on their historical prices.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: linearRegressionImage
          },
          {
            type: "text",
            content: (
              <p>
                Logistic Regression is ideal for predicting binary outcomes. For instance, predicting whether a given customer will click on a product based on historical click data.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: logisticRegressionImage
          }
        ]}
      />

      <ZigzagContent
        label="ADVANCED TECHNIQUES"
        title="Ensemble Learning & Random Forests"
        startRight={false}
        altBg={true}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Ensemble learning combines multiple models to improve prediction accuracy. The idea is that the collective "wisdom" of diverse models reduces individual errors, much like seeking advice from several experts.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: ensembleImage
          },
          {
            type: "insight",
            label: "ENSEMBLE EXAMPLE",
            content: "If you want to predict rain, you might check three weather apps. If two say 'rain' and one says 'no rain', the ensemble majority vote concludes it will rain."
          },
          {
            type: "text",
            content: (
              <p>
                Random Forest is a popular ensemble method that builds a "forest" of decision trees, each trained independently on a random subset of data. This diverse approach reduces overfitting and creates a highly robust model.
              </p>
            )
          },
          {
            type: "image",
            imageUrl: randomForestImage
          }
        ]}
      />

      {/* CHAPTER 4 */}
      <ChapterHeader
        id="ch4"
        number="04"
        title="Supervised vs. Unsupervised"
        description="A fundamental distinction in machine learning paradigms based on the presence or absence of labeled data."
        altBg={false}
      />

      <ZigzagContent
        label="KEY CONCEPT"
        title="Learning Paradigms"
        startRight={true}
        altBg={false}
        segments={[
          {
            type: "text",
            content: (
              <p>
                Supervised Learning algorithms learn from labeled data, where each input example is paired with a corresponding output target. The goal is to map inputs to outputs for prediction or classification.
              </p>
            )
          },
          {
            type: "text",
            content: (
              <p>
                Unsupervised Learning algorithms analyze unlabeled data to discover hidden patterns, groupings, or structures without any predefined outcomes or correct answers.
              </p>
            )
          },
          {
            type: "insight",
            label: "TRADEOFFS",
            content: "Supervised learning requires high-quality, often costly labeled data but offers clear evaluation metrics. Unsupervised learning requires no labels but its results can be subjective and harder to validate."
          }
        ]}
      />

      <ConceptCardsZigzag
        startRight={false}
        cards={[
          { number: "01", title: "Customer Churn Prediction", description: "Using historical data showing which customers left to predict future churn. (Supervised Learning)" },
          { number: "02", title: "Disease Subtype Discovery", description: "Grouping patients by gene expression without prior labels to find new subtypes. (Unsupervised Learning)" },
          { number: "03", title: "Movie Recommendations", description: "Using past user ratings as training data to predict how users will rate unseen films. (Supervised Learning)" },
          { number: "04", title: "Purchase Associations", description: "Analyzing purchase histories to find products frequently bought together. (Unsupervised Learning)" }
        ]}
        altBg={true}
      />

      {/* CONCLUSION */}
      <Conclusion
        id="conclusion"
        title="Summary"
        summary="Machine Learning has transformed how we approach complex tasks by learning directly from data rather than relying on explicit programming. Understanding the nuances between different algorithms and learning paradigms is essential for implementing effective AI solutions."
        takeaways={[
          "AI encompasses a range of machine intelligence, from simple rules to advanced pattern recognition.",
          "Machine learning's rise is fueled by better compute, big data, and cheaper storage.",
          "Algorithms range from single Decision Trees to complex Ensembles like Random Forests.",
          "Supervised learning maps inputs to known outputs; Unsupervised learning discovers hidden patterns."
        ]}
      />
    </main>
  )
}
