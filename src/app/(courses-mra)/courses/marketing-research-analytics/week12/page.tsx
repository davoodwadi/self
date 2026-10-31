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
  TextSources,
  ShareOfVoice,
  WhoPosts,
  LexiconReader,
  TopicCount,
  WordingFlips,
  ValidationByLanguage,
  ReIdentification,
  Redaction,
  StoryChart,
  AiDisclosure,
  AgentSearch,
} from "./visuals";

// ============================================================================
// WEEK 12: TEXT ANALYTICS, AI-DRIVEN INSIGHTS, AND REPORTING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx. The interactive ones are built around one action
// each: move a listening window, raise the pull of extreme experiences, pick
// a review for the lexicon, choose the number of topics, reword the
// instructions, split the validation by language, combine characteristics,
// interview more customers, and set the agent's inspection cost and goal.
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

/** A part opener: the numeral and title, then its sentences in ruled columns. */
function PartSlide({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <Slide id={id} border className="!py-8">
      <PartHead n={n} title={title} />
      <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">{children}</div>
    </Slide>
  );
}

export default function Week12() {
  return (
    <SlideDeck label="Week 12">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 12: Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">
          Text Analytics, AI-Driven Insights, and Reporting
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[48ch] !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Research informs decisions only when its findings are valid, obtained lawfully, and
          communicated in a form that{" "}
          decision makers can act upon.
        </p>
      </Slide>

      {/* ================================================================
          Part 1: Text as Research Data
          ================================================================ */}
      <PartSlide id="part-1-text-as-research-data" n={1} title="Text as Research Data">
        <Ruled>
          <p className={BIG}>
            A large proportion of the information available about customers exists as{" "}
            <Term>text rather than numbers</Term>.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            Advances in language models have made the systematic analysis of such text feasible at
            large scale.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            This week examines text as a source of research data, the methods by which it is
            analyzed, the protection of the people who produce it, and the communication of findings.
          </p>
        </Ruled>
      </PartSlide>

      {/* ================================================================
          User-Generated Content
          ================================================================ */}
      <Slide id="user-generated-content" border className="!py-8">
        <SlideHeading>User-Generated Content</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.4rem)]">
              <Term>User-generated content</Term> is material created and published by
              consumers, such as online reviews, social media posts, and forum discussions.
            </Statement>
            <Cell>
              Firms also hold large volumes of text from their own channels, such as customer service
              transcripts, chat logs, and open-ended survey responses.
            </Cell>
          </div>
          <Plate>
            <TextSources />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Cell>
            Such text is <Term>unsolicited, expressed in consumers&rsquo; own language</Term>,
            available in large volumes, and generated continuously.
          </Cell>
          <Cell>
            It extends the netnographic approach introduced in Week 3 from the close reading of a few
            communities to the systematic analysis of many thousands of texts.
          </Cell>
        </div>
      </Slide>

      {/* ================================================================
          Social Listening
          ================================================================ */}
      <Slide id="social-listening" border className="!py-8">
        <SlideHeading>Social Listening</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          <Term>Social listening</Term> is the systematic monitoring and analysis of online
          conversations about a brand, its competitors, and its category.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              <Term>Share of voice</Term> is the proportion of conversations in a category
              that mention a particular brand.
            </Cell>
            <Cell>
              Social listening tracks changes in the volume and sentiment of conversations over time,
              identifies emerging issues, and <Term>provides early warning of potential crises</Term>.
            </Cell>
            <Cell>
              Data are typically collected through the access that platforms provide to their
              content, and the extent of that access varies across platforms and has been restricted
              on several of them.
            </Cell>
          </div>
          <Plate>
            <ShareOfVoice />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Limitations of User-Generated Content
          ================================================================ */}
      <Slide
        id="limitations-of-user-generated-content"
        border
        className="!py-8"
        exercise={exercise["limitations-of-user-generated-content"]}
      >
        <SlideHeading>Limitations of User-Generated Content</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The authors of online content are self-selected. They are not a probability sample of
              customers, and the findings cannot be projected to the customer base with a known
              precision, as introduced in Week 5.
            </Cell>
            <Cell>
              Consumers with extreme experiences are more likely to post than those with moderate
              experiences, so that <Term>ratings are concentrated at the highest and lowest values</Term>.
            </Cell>
            <Cell>
              The users of each platform differ demographically from the population, and from the
              users of other platforms.
            </Cell>
          </div>
          <Plate>
            <WhoPosts />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Cell>
            Fake reviews and automated accounts, including accounts that use language models to
            generate text, distort the content.
          </Cell>
          <Cell>
            The visibility of content is determined by platform algorithms, so that the content
            collected may not represent all the content published.
          </Cell>
        </div>
        <p className={`${CLOSE} mt-6 border-t border-[var(--rule-2)] pt-4`}>
          Findings from user-generated content are therefore compared with evidence from surveys and
          customer records before they inform decisions.
        </p>
      </Slide>

      {/* ================================================================
          Part 2: Methods of Text Analytics
          ================================================================ */}
      <PartSlide id="part-2-methods-of-text-analytics" n={2} title="Methods of Text Analytics">
        <Ruled>
          <p className={BIG}>
            <Term>Text analytics</Term> is the use of computational methods to{" "}
            <Term>extract structured information from unstructured text</Term>.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            Its principal methods are sentiment analysis, topic modeling, and text classification.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            Large language models are now used for all three tasks, frequently without training on
            labeled examples.
          </p>
        </Ruled>
      </PartSlide>

      {/* ================================================================
          Sentiment Analysis
          ================================================================ */}
      <Slide id="sentiment-analysis" border className="!py-8">
        <SlideHeading>Sentiment Analysis</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              <Term>Sentiment analysis</Term> assigns a polarity, positive, negative, or
              neutral, and sometimes an intensity, to a text.
            </Cell>
            <Cell>
              <Term>Lexicon-based methods</Term> score texts according to lists of words
              associated with positive and negative sentiment.
            </Cell>
            <Cell>
              Machine learning methods are trained on texts whose sentiment has been coded by people,
              and large language models can classify sentiment from instructions alone.
            </Cell>
            <Cell>
              <Term>Aspect-based sentiment analysis</Term> identifies the sentiment
              expressed toward each attribute mentioned in a text. A review of a phone may be
              positive about the battery and negative about the camera.
            </Cell>
            <Cell>
              Sentiment analysis is complicated by <Term>sarcasm, negation, and domain-specific
              meaning</Term>. &ldquo;Unpredictable&rdquo; is favorable in a review of a film and
              unfavorable in a review of a car&rsquo;s steering.
            </Cell>
          </div>
          <Plate>
            <LexiconReader />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Topic Modeling
          ================================================================ */}
      <Slide id="topic-modeling" border className="!py-8">
        <SlideHeading>Topic Modeling</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Cell>
            <Term>Topic modeling</Term> identifies the themes present in a large collection
            of texts, without categories specified in advance.
          </Cell>
          <Cell>
            Latent Dirichlet allocation, <Term>LDA</Term>, the most established method,
            represents each text as a mixture of topics and each topic as a distribution over words.
          </Cell>
          <Cell>
            The analyst interprets and labels each topic by examining its most probable words and a
            sample of the texts in which it is prominent.
          </Cell>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              Methods based on the embeddings introduced in Week 10 cluster texts by meaning, and
              frequently produce more coherent topics for short texts such as social media posts.
            </Cell>
            <Cell>
              <Term>The number of topics is chosen by the analyst</Term>, and the interpretation of
              each topic is a judgment that is documented.
            </Cell>
          </div>
          <Plate>
            <TopicCount />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Text Classification With Large Language Models
          ================================================================ */}
      <Slide id="text-classification-with-large-language-models" border className="!py-8">
        <SlideHeading>Text Classification With Large Language Models</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Cell>
            <Term>Text classification</Term> assigns each text to one or more predefined
            categories, such as the type of complaint expressed.
          </Cell>
          <Cell>
            In <Term>zero-shot classification</Term>, categories are assigned by a large
            language model on the basis of written instructions alone. In{" "}
            <Term>few-shot classification</Term>, the instructions include a small number
            of coded examples.
          </Cell>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              Classification with a language model is the application of a codebook, introduced in
              Week 3, to texts at large scale.
            </Cell>
            <Cell>
              Language models can also extract specific information from texts, such as the product
              mentioned, the problem described, and the resolution requested.
            </Cell>
            <Cell>
              The classifications <Term>can vary with the wording of the instructions</Term> and
              between versions of the model, and are therefore validated before use.
            </Cell>
          </div>
          <Plate>
            <WordingFlips />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Selecting a Text Analytics Method
          ================================================================ */}
      <Slide
        id="selecting-a-text-analytics-method"
        border
        className="!py-8"
        exercise={exercise["selecting-a-text-analytics-method"]}
      >
        <SlideHeading>Selecting a Text Analytics Method</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-9 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              <Term>Sentiment analysis</Term> is appropriate when the decision requires the
              overall favorability of the conversation, such as the trend in sentiment toward a brand
              after a campaign.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>Aspect-based sentiment analysis</Term> is appropriate when the decision
              concerns specific product attributes, such as which features of a product generate
              complaints.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>Topic modeling</Term> is appropriate when the relevant themes are not
              known in advance, as in exploratory analysis of reasons for cancellation.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>Text classification</Term> is appropriate when the categories are known
              in advance and each text must be assigned to them, as in the routing of customer service
              messages.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Validating Text Analytics
          ================================================================ */}
      <Slide
        id="validating-text-analytics"
        border
        className="!py-8"
        exercise={exercise["validating-text-analytics"]}
      >
        <SlideHeading>Validating Text Analytics</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Step n={1}>The analyst first draws a random sample of texts from the collection.</Step>
          <Step n={2}>
            Two or more people then code the sample independently, and their agreement is measured,
            as introduced in Week 3.
          </Step>
          <Step n={3}>The automated method then codes the same sample.</Step>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Step n={4}>
              The analyst then compares the automated coding with the human coding, reporting
              precision and recall for each category, as introduced in Week 11.
            </Step>
            <Step n={5}>
              The analyst then examines whether{" "}
              <Term>accuracy differs across products, customer groups, or languages</Term>.
            </Step>
            <Step n={6}>
              Finally, the analyst repeats the validation periodically, since the language of
              consumers and the behavior of the model change over time.
            </Step>
          </div>
          <Plate>
            <ValidationByLanguage />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Ten Thousand Reviews
          ================================================================ */}
      <Slide id="discussion-ten-thousand-reviews" border className="!py-8">
        <SlideHeading>Discussion: Ten Thousand Reviews</SlideHeading>
        <Discussion
          scenario={"A hotel chain holds 10,000 online reviews from the past year and seeks to identify the causes of declining ratings."}
          question={"Which text analytics methods are appropriate, how should their results be validated, and which limitations of review data should qualify the conclusions?"}
        />
      </Slide>

      {/* ================================================================
          Part 3: Privacy and Data Protection
          ================================================================ */}
      <PartSlide id="part-3-privacy-and-data-protection" n={3} title="Privacy and Data Protection">
        <Ruled>
          <p className={BIG}>Every week of this course has involved data that describe people.</p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            <Term>Data protection law</Term> governs the collection, use, and storage of personal
            data in many jurisdictions.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            The obligations to respondents introduced in Week 1 are particularly relevant to text
            data and to AI tools.
          </p>
        </Ruled>
      </PartSlide>

      {/* ================================================================
          Principles of Data Protection
          ================================================================ */}
      <Slide id="principles-of-data-protection" border className="!py-8">
        <SlideHeading>Principles of Data Protection</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Lawfulness", "personal data are processed only on a legal basis, such as the informed consent of the individual."],
            ["Purpose limitation", "data collected for one purpose are not used for an incompatible purpose without a further legal basis."],
            ["Data minimization", "only the personal data necessary for the purpose are collected."],
            ["Storage limitation", "personal data are retained only as long as the purpose requires."],
            ["Security", "personal data are protected against unauthorized access and loss."],
            ["Individual rights", "individuals may access the data held about them, request their correction or deletion, and object to certain uses, including some forms of automated decision-making."],
          ].map(([term, rest], i) => (
            <li key={term} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <p className={BIG}>
                    <Term>{term}:</Term> {rest}
                  </p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Privacy in Text and Social Data
          ================================================================ */}
      <Slide
        id="privacy-in-text-and-social-data"
        border
        className="!py-8"
        exercise={exercise["privacy-in-text-and-social-data"]}
      >
        <SlideHeading>Privacy in Text and Social Data</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Cell>
            Content that is publicly accessible is not necessarily free to use for any purpose. Its
            use is limited by platform terms, by law, and by the reasonable expectations of its
            authors.
          </Cell>
          <Cell>
            Texts frequently contain personal information, such as names, locations, and health
            conditions, that the author did not intend to be analyzed.
          </Cell>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              Removing names does not anonymize a text. A verbatim quotation from a public post can be
              located with a search engine, which identifies its author.
            </Cell>
            <Cell>
              Quotations used in reports are therefore paraphrased or used with permission when their
              authors could be identified.
            </Cell>
            <Cell>
              Combinations of characteristics that are individually harmless, such as postal code,
              age, and occupation, <Term>can identify an individual</Term>.
            </Cell>
          </div>
          <Plate>
            <ReIdentification />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-6 border-t border-[var(--rule-2)] pt-4`}>
          Special categories of data, such as health, religion, and sexual orientation, require
          additional protection.
        </p>
      </Slide>

      {/* ================================================================
          Privacy and AI Tools
          ================================================================ */}
      <Slide id="privacy-and-ai-tools" border className="!py-8">
        <SlideHeading>Privacy and AI Tools</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.9vw,1.55rem)]">
          Submitting data to an external AI service is a form of processing, and in many cases a
          transfer of data to a third party.
        </Statement>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The terms of the service determine whether submitted data are retained, and whether
              they are used to train future models.
            </Cell>
            <Cell>
              Personal data are therefore <Term>removed or replaced before submission</Term> where
              the analysis permits it.
            </Cell>
          </div>
          <Plate>
            <Redaction />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Cell>
            Many organizations provide AI tools under contracts that exclude the retention of data and
            its use for training, or operate models within their own infrastructure.
          </Cell>
          <Cell>
            As introduced in Week 1, the use of respondents&rsquo; data in an AI tool falls within the
            scope of the consent they gave.
          </Cell>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Communicating Findings
          ================================================================ */}
      <PartSlide id="part-4-communicating-findings" n={4} title="Communicating Findings">
        <Ruled>
          <p className={BIG}>
            The value of research is realized only when its findings{" "}
            <Term>inform a decision</Term>.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            The final step of the research process, introduced in Week 1, is the preparation and
            presentation of the report.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            A report is written for the decision maker, and its structure follows the decision rather
            than the sequence of the analysis.
          </p>
        </Ruled>
      </PartSlide>

      {/* ================================================================
          The Research Report
          ================================================================ */}
      <Slide id="the-research-report" border className="!py-8">
        <SlideHeading>The Research Report</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Ruled className="self-start">
            <span className="type-label mb-3 block tabular-nums">1</span>
            <p className="type-quote !max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
              The executive summary states the problem, the principal findings, the conclusions, and
              the recommendations, and is{" "}
              intelligible without the rest of the report.
            </p>
          </Ruled>
          <ol className="grid min-w-0 gap-x-10 gap-y-5 md:grid-cols-2">
            {[
              "The background section restates the management decision problem and the marketing research problem.",
              "The method section describes the research design, the sample, the measures, and the analysis, in sufficient detail for the reader to evaluate the findings.",
              "The findings section presents the results, organized by research question.",
              "The limitations section states the constraints on the conclusions, such as the sample, the response rate, the measures, and the methods of analysis.",
              "The conclusions and recommendations section interprets the findings in relation to the decision and proposes a course of action.",
            ].map((s, i) => (
              <li key={i} className={i === 4 ? "min-w-0 md:col-span-2" : "min-w-0"}>
                <Step n={i + 2}>{s}</Step>
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      {/* ================================================================
          Findings, Conclusions, and Recommendations
          ================================================================ */}
      <Slide
        id="findings-conclusions-and-recommendations"
        border
        className="!py-8"
        exercise={exercise["findings-conclusions-and-recommendations"]}
      >
        <SlideHeading>Findings, Conclusions, and Recommendations</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-5">
          <Ruled>
            <p className={BIG}>
              A <Term>finding</Term> states what the data show: &ldquo;42 percent of
              customers who cancelled cited the price increase as their main reason.&rdquo;
            </p>
          </Ruled>
          <ChainArrow />
          <Ruled>
            <p className={BIG}>
              A <Term>conclusion</Term> interprets the findings in relation to the research
              problem: &ldquo;The price increase is the principal cause of the rise in cancellations
              among long-standing customers.&rdquo;
            </p>
          </Ruled>
          <ChainArrow />
          <Ruled>
            <p className={BIG}>
              A <Term>recommendation</Term> proposes an action on the basis of the
              conclusions: &ldquo;Offer long-standing customers a loyalty rate for twelve months, and
              test its effect on cancellations in a randomized experiment before extending it.&rdquo;
            </p>
          </Ruled>
        </div>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Cell>Each recommendation is supported by conclusions, and each conclusion by findings.</Cell>
          <Cell>
            The report distinguishes the three clearly, so that the decision maker can{" "}
            <Term>assess the strength of the evidence behind each recommendation</Term>.
          </Cell>
        </div>
      </Slide>

      {/* ================================================================
          Data Storytelling
          ================================================================ */}
      <Slide id="data-storytelling" border className="!py-8">
        <SlideHeading>Data Storytelling</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.4rem)]">
          <Term>Data storytelling</Term> is the organization of findings into a coherent
          argument that leads from the decision to the evidence and to the recommended action.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The presentation begins with the answer to the decision maker&rsquo;s question, and then
              presents the evidence that supports it.
            </Cell>
            <Cell>
              Each chart communicates one finding, as introduced in Week 6, and its title states that
              finding.
            </Cell>
            <Cell>
              <Term>Uncertainty is stated explicitly</Term>, for example through confidence intervals,
              as introduced in Week 7.
            </Cell>
          </div>
          <Plate>
            <StoryChart />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Cell>
            Causal language is used only when the research design supports a causal conclusion, as
            introduced in Week 8.
          </Cell>
          <Cell>
            A persuasive presentation remains faithful to the evidence. Findings that do not support
            the recommendation are reported together with those that do.
          </Cell>
        </div>
      </Slide>

      {/* ================================================================
          Reporting the Use of AI
          ================================================================ */}
      <Slide id="reporting-the-use-of-ai" border className="!py-8">
        <SlideHeading>Reporting the Use of AI</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              The report states where AI tools were used in the research, for example in drafting the
              questionnaire, moderating interviews, coding responses, or analyzing data.
            </Cell>
            <Cell>
              It describes <Term>how the output of each tool was verified</Term>, such as the
              agreement between AI coding and human coding.
            </Cell>
            <Cell>
              It states whether any synthetic respondents or simulated subjects were used, and for what
              purpose.
            </Cell>
            <Cell>It states the limitations that the use of AI introduces into the conclusions.</Cell>
          </div>
          <Plate>
            <AiDisclosure />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t border-[var(--rule-2)] pt-4`}>
          Disclosure allows decision makers to evaluate the evidence, and allows other researchers to
          reproduce the work.
        </p>
      </Slide>

      {/* ================================================================
          Part 5: The Insights Function in an AI-Enabled Organization
          ================================================================ */}
      <PartSlide
        id="part-5-the-insights-function-in-an-ai-enabled-organization"
        n={5}
        title="The Insights Function in an AI-Enabled Organization"
      >
        <Ruled>
          <p className={BIG}>
            The <Term>insights function</Term> is the part of the organization responsible
            for marketing research and analytics.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            AI tools have changed <Term>the cost and speed</Term> of nearly every step of the research
            process covered in this course.
          </p>
        </Ruled>
        <Ruled>
          <p className={BIG}>
            The final part of the course considers how the function, and the role of the researcher,
            is changing as a result.
          </p>
        </Ruled>
      </PartSlide>

      {/* ================================================================
          How AI Is Changing the Insights Function
          ================================================================ */}
      <Slide id="how-ai-is-changing-the-insights-function" border className="!py-8">
        <SlideHeading>How AI Is Changing the Insights Function</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2">
          <Cell>
            Tasks that previously required days, such as drafting questionnaires, coding open-ended
            responses, and producing descriptive reports, can now be completed in hours.
          </Cell>
          <Cell>
            Managers increasingly conduct surveys, analyses, and experiments themselves through
            self-service platforms and AI assistants.
          </Cell>
          <Cell>
            Continuous streams of data, such as social listening, customer records, and ongoing
            experiments, supplement discrete research projects.
          </Cell>
          <Cell>
            Synthetic respondents and simulated subjects are offered as alternatives to research with
            real people, with the limitations examined in Weeks 5 and 8.
          </Cell>
        </div>
        <p className={`${CLOSE} mt-9 border-t border-[var(--rule-2)] pt-5 !text-[clamp(1.3rem,2.2vw,1.85rem)]`}>
          As the volume of research output increases,{" "}
          
            the ability to distinguish valid evidence from plausible but unfounded output
          {" "}
          becomes more valuable.
        </p>
      </Slide>

      {/* ================================================================
          The Role of the Researcher
          ================================================================ */}
      <Slide id="the-role-of-the-researcher" border className="!py-8">
        <SlideHeading>The Role of the Researcher</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            "The researcher defines the problem, since no tool can determine which question a decision requires.",
            "The researcher selects the research design and determines at which steps AI is appropriate.",
            "The researcher verifies the output of AI tools against sources, human judgments, and empirical data.",
            "The researcher integrates evidence from surveys, experiments, customer data, and text into a coherent assessment.",
            "The researcher ensures that research is conducted lawfully and ethically, and that the people who provide data are protected.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <p className={BIG}>{s}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
          <li className="min-w-0">
            <Numbered n={6}>
              <Ruled>
                <p className={BIG}>
                  The researcher <Term>remains accountable for every finding</Term> in the report, as
                  introduced in Week 1.
                </p>
              </Ruled>
            </Numbered>
          </li>
        </ol>
      </Slide>

      {/* ================================================================
          Agent-Mediated Markets as a Research Agenda
          ================================================================ */}
      <Slide
        id="agent-mediated-markets-as-a-research-agenda"
        border
        className="!py-8"
        exercise={exercise["agent-mediated-markets-as-a-research-agenda"]}
      >
        <SlideHeading>Agent-Mediated Markets as a Research Agenda</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.15rem,1.7vw,1.4rem)]">
          As AI agents search, evaluate, and purchase on consumers&rsquo; behalf, the insights
          function studies the agents as well as the consumers.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Cell>
              <Term>How agents choose:</Term> which product information agents acquire,
              how they weight attributes, and{" "}
              <Term>how the presentation of information in the storefront affects their choices</Term>{" "}
              (Wadi &amp; Ma, 2026b).
            </Cell>
            <Cell>
              <Term>Whom agents serve:</Term> whether the agent&rsquo;s recommendations
              change with the party it is told it serves, and whether sponsorship disclosures protect
              consumers when the agent rather than the consumer reads them (Wadi &amp; Ma, 2026c).
            </Cell>
            <Cell>
              <Term>How brands appear to agents:</Term> whether the brand is included in the
              alternatives that AI assistants present, in which position, and with which attributes.
            </Cell>
          </div>
          <Plate>
            <AgentSearch />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-6 border-t border-[var(--rule-2)] pt-4`}>
          The methods of this course apply directly: audits describe agent behavior, controlled
          experiments test its causes, and validated measures and adequate samples make the evidence
          reliable.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: The Insights Team of the Future
          ================================================================ */}
      <Slide id="discussion-the-insights-team-of-the-future" border className="!py-8">
        <SlideHeading>Discussion: The Insights Team of the Future</SlideHeading>
        <Discussion
          scenario={"A chief executive proposes to reduce the firm's insights team to two people, and to rely on AI tools and self-service platforms for all other research."}
          question={"Which research activities could such an arrangement perform adequately, which would be at risk, and how should the insights function be organized to use AI tools while maintaining the validity of its evidence?"}
        />
      </Slide>

      {/* ================================================================
          The Course in Review
          ================================================================ */}
      <Slide id="the-course-in-review" border className="!py-8">
        <SlideHeading>The Course in Review</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Marketing research provides evidence that reduces uncertainty in managerial decisions, beginning with the precise definition of the research problem.",
            "The research design determines which conclusions the evidence can support: exploratory research clarifies, descriptive research describes, and causal research tests the effect of an action.",
            "Valid evidence depends on sound measurement, appropriate samples, and careful data preparation.",
            "Statistical analysis, from hypothesis tests to regression and multivariate methods, quantifies the evidence and its uncertainty.",
            "Customer analytics and predictive models inform decisions about individual customers, subject to evaluation, fairness, and explanation.",
            "AI tools accelerate every step of the research process, and the researcher's responsibility to verify their output increases accordingly.",
            "AI models and AI agents are also subjects of research, evaluated with the same standards of measurement, sampling, and experimental design that apply to human respondents.",
          ].map((s, i) => (
            <li key={i} className={i === 6 ? "min-w-0 lg:col-span-2" : "min-w-0"}>
              <Numbered n={i + 1}>
                <Ruled>
                  <P className="!leading-snug">{s.replace("researcher's", "researcher’s")}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "User-generated content provides large volumes of unsolicited evidence, but its authors are self-selected and its findings cannot be projected to the customer base.",
            "Sentiment analysis, topic modeling, and text classification extract structured information from text, and large language models are now used for all three.",
            "Automated text analysis is validated against human coding, with precision and recall reported for each category.",
            "Data protection requires a legal basis, limited purposes, minimal data, and respect for individual rights, including when data are submitted to AI tools.",
            "A research report distinguishes findings, conclusions, and recommendations, states its limitations, and discloses the use of AI.",
            "The researcher's role in an AI-enabled organization centers on problem definition, research design, verification, integration, and accountability.",
            "In agent-mediated markets, the insights function studies how AI agents choose, whom they serve, and how brands appear to them, with the methods of measurement, sampling, and experimentation developed in this course.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <P className="!leading-snug">{s.replace("researcher's", "researcher’s")}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}

/** The step from one kind of statement to the next, between columns. */
function ChainArrow() {
  return (
    <div aria-hidden className="hidden items-center self-center text-[var(--ink-3)] md:flex">
      <svg width="28" height="16" viewBox="0 0 28 16">
        <path d="M2 8H24M18 3L25 8L18 13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
