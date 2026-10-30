"use client";

import React from "react";
import { SlideDeck, Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  BODY,
  COL_RULE,
  DISPLAY,
  Discussion1,
  Head1,
  LEAD,
  MICRO,
  PAIR,
  PartPlate1,
  RULED,
  Verdict,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  ActionMatrix,
  AttentionArcs,
  Capabilities,
  CompoundLab,
  CopilotAgent,
  InvoiceToRecord,
  MethodMatrix,
  MultiAgent,
  PromptLayers,
  RagPipeline,
  TemperatureLab,
  TokenSpace,
  ToolCallSequence,
  ZeroFewShot,
} from "./visuals";

// ============================================================================
// WEEK 2: LARGE LANGUAGE MODELS, PROMPTING, AND AGENTIC AI
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const STACK = "space-y-4";
const SUB = `${BODY} border-t border-[var(--ink)]/10 pt-4`;

export default function Week2Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 2</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            Large Language Models, Prompting, and Agentic AI
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Large language models become reliable enterprise systems when paired with structured
            prompting, external data retrieval, tool execution, and human oversight.
          </p>
        </div>
      </Slide>

      {/* From Narrow Models to Foundation Models */}
      <Slide id="foundation-models" border align="left">
        <Head1>From Narrow Models to Foundation Models</Head1>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Traditional machine learning systems are <span className={T}>narrow models</span> trained
              for a single task, such as predicting customer churn or scoring credit applications.
            </p>
            <p className={BODY}>
              Building a narrow model for a new task requires collecting a dedicated labeled dataset and
              training a separate model from scratch.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              A <span className={T}>foundation model</span> is a large neural network pre-trained on
              vast collections of text, code, or media that can be adapted to many downstream tasks.
            </p>
            <p className={BODY}>
              <span className={T}>Large language models (LLMs)</span> are foundation models trained on
              text to represent and generate human language and computer code.
            </p>
          </div>
        </div>
        <Verdict>
          For enterprises, a single foundation model can support customer service, contract review, and
          software development without training a separate network for each workflow.
        </Verdict>
      </Slide>

      {/* Capabilities and Failure Modes of Language Models */}
      <Slide id="capabilities" border align="left" exercise={exercise["capabilities"]}>
        <Head1>Capabilities and Failure Modes of Language Models</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Unassisted language models excel at tasks where all necessary information is supplied in the
          input, including summarization, rewriting, translation, and draft generation.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <Capabilities />
        </div>
        <div className="mt-8 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            Unassisted language models fail when a task requires private firm records that were not
            present in the pre-training data.
          </p>
          <p className={BODY}>
            They also fail when a task requires exact arithmetic, live database lookups, or guaranteed
            adherence to strict regulatory rules.
          </p>
          <p className={BODY}>
            Because a language model generates responses by predicting plausible word sequences, it can
            state false facts in confident prose.
          </p>
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl border-t border-[var(--ink)]/10 pt-5`}>
          Deploying language models in business therefore requires surrounding the model with structured
          prompts, external data retrieval, software tools, and{" "}
          <span className="text-[var(--accent)]">human review</span>.
        </p>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="How Large Language Models Process and Generate Text"
        lines={[
          "A large language model does not store facts in a database or reason through explicit logical formulas.",
          "Understanding how the model represents text as numerical vectors and predicts one token at a time explains both its capabilities and its errors.",
        ]}
      />

      {/* Tokens, Embeddings, and Semantic Representation */}
      <Slide id="tokens-embeddings" border align="left">
        <Head1>Tokens, Embeddings, and Semantic Representation</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            Before processing text, a language model divides the input string into{" "}
            <span className={T}>tokens</span>, which are words, subword fragments, or punctuation marks.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In English text, one token corresponds on average to about three-quarters of a word, and
            commercial API providers price model usage per million tokens.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <TokenSpace />
        </div>
        <div className="mt-8 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            Each token is converted into an <span className={T}>embedding</span>, a high-dimensional list
            of numbers learned during training that represents how that token is used across contexts.
          </p>
          <p className={BODY}>
            In embedding space, words and phrases that appear in similar contexts sit close to one
            another geometrically.
          </p>
          <p className={BODY}>
            This numerical representation allows the model to recognize that phrases such as
            &quot;invoice overdue&quot; and &quot;late payment&quot; express closely related business
            concepts.
          </p>
        </div>
      </Slide>

      {/* Self-Attention and Context Windows */}
      <Slide id="self-attention" border align="left">
        <Head1>Self-Attention and Context Windows</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            Modern large language models are built on the Transformer architecture, which processes
            token embeddings using a mechanism called <span className={T}>self-attention</span>.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Self-attention computes how strongly each token in a sequence relates to every other token,
            allowing the model to resolve meaning from surrounding context.
          </p>
        </div>
        <div className="mt-10 w-full max-w-5xl">
          <AttentionArcs />
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl`}>
          In a commercial lease, self-attention connects a pronoun such as &quot;it&quot; in a penalty
          clause back to &quot;the tenant&quot; or &quot;the security deposit&quot; several sentences
          earlier.
        </p>
        <div className={`${PAIR} !mt-8`}>
          <p className={BODY}>
            The <span className={T}>context window</span> is the maximum number of tokens a model can
            process in a single request, combining the input prompt and the generated response.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Larger context windows allow a model to read longer documents in one pass, but increase
            inference cost and response latency as input length grows.
          </p>
        </div>
      </Slide>

      {/* Next-Token Prediction and Sampling Temperature */}
      <Slide id="next-token" border align="left" exercise={exercise["next-token"]}>
        <Head1>Next-Token Prediction and Sampling Temperature</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              A large language model generates text <span className={T}>autoregressively</span> by
              predicting the probability of every possible next token given the sequence of tokens so
              far.
            </p>
            <p className={BODY}>
              Once one token is selected, it is appended to the input sequence, and the model repeats the
              calculation to predict the following token.
            </p>
            <p className={SUB}>
              <span className={T}>Temperature</span> is a sampling parameter that controls how much
              randomness is introduced when selecting the next token from that probability distribution.
            </p>
            <p className={BODY}>
              A temperature near zero makes generation nearly deterministic by consistently selecting the
              highest-probability token, which suits data extraction and classification.
            </p>
            <p className={BODY}>
              A higher temperature flattens the probability distribution so less likely tokens are chosen
              more often, which increases variety in creative drafting and brainstorming.
            </p>
          </div>
          <TemperatureLab />
        </div>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Prompt Engineering and Structured Outputs"
        lines={[
          "Because a pre-trained language model can follow natural-language instructions, managers and analysts can specify tasks through prompts rather than retraining model weights.",
          "Turning model responses into reliable inputs for enterprise software requires explicit prompt structure and strict output schemas.",
        ]}
      />

      {/* Anatomy of an Enterprise Prompt */}
      <Slide id="prompt-anatomy" border align="left">
        <Head1>Anatomy of an Enterprise Prompt</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              A <span className={T}>prompt</span> is the complete text input supplied to a language model
              to define the task, provide context, and request an output.
            </p>
            <p className={BODY}>
              <span className={T}>In-context learning</span> is the ability of a pre-trained language
              model to perform a new task from instructions and examples inside the prompt without
              updating its weights.
            </p>
            <p className={SUB}>
              A production enterprise prompt typically separates four components: system instructions,
              domain context, reference examples, and the specific record to process.
            </p>
            <p className={BODY}>
              <span className={T}>System instructions</span> establish the role, behavioral boundaries,
              and refusal rules the model must follow across all user requests.
            </p>
            <p className={BODY}>
              Separating unchanging instructions from variable user inputs improves consistency and
              allows API platforms to{" "}
              <span className="text-[var(--accent)]">cache the repeated prefix</span> at lower cost.
            </p>
          </div>
          <PromptLayers />
        </div>
      </Slide>

      {/* Zero-Shot and Few-Shot Task Specification */}
      <Slide id="zero-few-shot" border align="left" exercise={exercise["zero-few-shot"]}>
        <Head1>Zero-Shot and Few-Shot Task Specification</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Zero-shot prompting</span> specifies a task using instructions alone,
              without providing completed examples of inputs and outputs in the prompt.
            </p>
            <p className={BODY}>
              Zero-shot prompting is effective for standard language tasks such as summarizing a meeting
              transcript or translating a product description.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Few-shot prompting</span> includes a small number of labeled input-output
            pairs in the prompt to demonstrate the exact judgment criteria and output format required.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <ZeroFewShot />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-8 border-t border-[var(--ink)]/10 pt-6 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            When a retailer classifies support tickets into an internal taxonomy, three to five
            representative examples clarify borderline cases that prose rules leave ambiguous.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            The examples selected for a few-shot prompt should cover typical cases as well as common edge
            cases that the model might otherwise misclassify.
          </p>
        </div>
      </Slide>

      {/* Structured Outputs and Schema Validation */}
      <Slide id="structured-outputs" border align="left">
        <Head1>Structured Outputs and Schema Validation</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            Enterprise software systems such as customer relationship management (CRM) platforms and
            accounting databases require typed fields rather than conversational paragraphs.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            A <span className={T}>structured output</span> constrains the language model to return data
            that conform to a predefined schema, such as a JSON object with specified field names and data
            types.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <InvoiceToRecord />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            For an incoming customer complaint, a schema can require four fields: product identifier,
            issue category from an approved list, urgency score from 1 to 5, and a one-sentence summary.
          </p>
          <p className={BODY}>
            <span className={T}>Schema validation</span> checks that every required field is present and
            matches its declared type before the record is passed to downstream software.
          </p>
          <p className={BODY}>
            Constraining generation to a valid schema turns a language model from a chat interface into a
            data-processing component inside an automated pipeline.
          </p>
        </div>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Grounding Models with Retrieval-Augmented Generation"
        lines={[
          "A pre-trained language model knows nothing about an organization's private contracts, internal policies, or events that occurred after its training cutoff date.",
          "Retrieval-augmented generation connects the model to an external knowledge base so its answers are grounded in current, verifiable firm documents.",
        ]}
      />

      {/* The Retrieval-Augmented Generation Pipeline */}
      <Slide id="rag-pipeline" border align="left" exercise={exercise["rag-pipeline"]}>
        <Head1>The Retrieval-Augmented Generation Pipeline</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          <span className={T}>Retrieval-augmented generation (RAG)</span> is an architecture that
          retrieves relevant passages from an external document store and inserts them into the prompt
          before the model generates an answer.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <RagPipeline />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-2 md:gap-x-14">
          <p className={BODY}>
            During indexing, firm documents such as policy manuals and product specifications are split
            into manageable passages called <span className={T}>chunks</span> and converted into vector
            embeddings.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Those embeddings are stored in a searchable index alongside the original text and metadata
            such as document title, effective date, and access permissions.
          </p>
          <p className={BODY}>
            When a user submits a question, the system converts the query into an embedding, retrieves
            the chunks most relevant to that query, and places them into the model&apos;s context window.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            The prompt instructs the model to answer the question using only the supplied passages and to
            cite the source document for each claim.
          </p>
        </div>
      </Slide>

      {/* Failure Modes in Retrieval Systems */}
      <Slide id="rag-failures" border align="left">
        <Head1>Failure Modes in Retrieval Systems</Head1>
        <p className={`${DISPLAY} mt-8 max-w-4xl`}>
          Retrieval-augmented generation reduces hallucination, but errors can still occur in either the
          retrieval stage or the generation stage.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>Retrieval failure</span> occurs when the search step fails to return the
            passage needed to answer the question, or returns an outdated document version.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Context faithlessness</span> occurs when the relevant passage is
            retrieved, but the model ignores it or blends it with incorrect assumptions from
            pre-training.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            Evaluating a RAG system therefore requires measuring two separate quantities:{" "}
            <span className="text-[var(--accent)]">retrieval quality</span> (whether the correct source
            chunks were found) and <span className="text-[var(--accent)]">answer faithfulness</span>{" "}
            (whether every claim in the answer is supported by those chunks).
          </p>
          <p className={BODY}>
            Maintaining a reliable RAG system also requires{" "}
            <span className={T}>document hygiene</span>, so superseded policies and expired price lists
            are archived or removed from the active index.
          </p>
        </div>
      </Slide>

      {/* Prompting, RAG, or Fine-Tuning */}
      <Slide id="prompt-rag-finetune" border align="left" exercise={exercise["prompt-rag-finetune"]}>
        <Head1>Prompting, RAG, or Fine-Tuning</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            Managers adapting a language model to a business workflow can choose among three methods:
            prompt engineering, retrieval-augmented generation, and fine-tuning.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Fine-tuning</span> is the process of taking a pre-trained model and
            training it further on thousands of curated input-output examples to update its internal
            weights.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <MethodMatrix />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            Prompt engineering is the fastest and lowest-cost starting point when the model already
            possesses the required knowledge and only needs clear instructions and examples.
          </p>
          <p className={BODY}>
            Retrieval-augmented generation is the appropriate choice when responses must reflect private,
            frequently updated, or auditable source documents with explicit citations.
          </p>
          <p className={BODY}>
            Fine-tuning is reserved for teaching a consistent domain style, specialized notation, or
            compact task behavior so a smaller, cheaper model can match the accuracy of a larger one.
          </p>
        </div>
      </Slide>

      {/* Discussion: Internal Policy Assistant at a Commercial Bank */}
      <Slide id="discussion-bank" border align="left">
        <Head1>Discussion: Internal Policy Assistant at a Commercial Bank</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A commercial bank wants to deploy an internal
          assistant to help lending officers answer policy questions across 4,000 pages of credit
          underwriting manuals that are revised every month. Should the bank build this system primarily
          with few-shot prompting, retrieval-augmented generation, or fine-tuning? What specific
          safeguards should management require so lending officers do not approve loans based on
          outdated clauses or fabricated policy rules?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="From Conversational Copilots to Autonomous Agents"
        lines={[
          "Early enterprise deployments of language models focused on conversational assistants that answer questions or draft text while a human performs every action.",
          "Agentic AI extends language models from passive text generators into systems that plan sequences of steps, call external software tools, and execute workflows.",
        ]}
      />

      {/* Copilots Versus Autonomous Agents */}
      <Slide id="copilot-agent" border align="left" exercise={exercise["copilot-agent"]}>
        <Head1>Copilots Versus Autonomous Agents</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <div className={STACK}>
            <p className={BODY}>
              A <span className={T}>copilot</span> is an interactive assistant that generates drafts,
              summaries, or recommendations in response to a user&apos;s prompt while the human user
              controls each step.
            </p>
            <p className={BODY}>
              In a copilot workflow, the human reviews the output, decides what to do next, and manually
              enters any changes into enterprise software.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              An <span className={T}>AI agent</span> is a system that uses a language model to decompose a
              goal into steps, invoke external software tools, inspect the results, and continue until
              the task is complete.
            </p>
            <p className={BODY}>
              Rather than returning a single text reply, an agent operates in a loop of planning, acting
              in an environment, observing feedback, and updating its next step.
            </p>
          </div>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CopilotAgent />
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl border-t border-[var(--ink)]/10 pt-5`}>
          Moving from a copilot to an agent shifts the{" "}
          <span className="text-[var(--accent)]">locus of execution</span> from the human operator to the
          software system, raising both productivity potential and operational risk.
        </p>
      </Slide>

      {/* Tool Use and Function Calling */}
      <Slide id="tool-use" border align="left">
        <Head1>Tool Use and Function Calling</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            <span className={T}>Tool use</span>, also called <span className={T}>function calling</span>,
            is the ability of a language model to emit a structured request that invokes an external
            software program or application programming interface (API).
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Developers provide the model with a catalog of available tools, including each tool&apos;s
            name, purpose, and required input parameters.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <ToolCallSequence />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            When a user asks a question that requires live data or exact calculation, the model outputs a
            structured call specifying which tool to run and with what arguments.
          </p>
          <p className={BODY}>
            The host application executes the tool outside the language model, such as running a SQL
            query or a financial calculator, and returns the exact output to the model&apos;s context
            window.
          </p>
          <p className={BODY}>
            Tool use allows an enterprise system to combine the language understanding of a neural network
            with the exactness of deterministic software and live databases.
          </p>
        </div>
      </Slide>

      {/* Planning, Memory, and Multi-Agent Workflows */}
      <Slide id="multi-agent" border align="left">
        <Head1>Planning, Memory, and Multi-Agent Workflows</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            Complex business workflows require an agent to perform{" "}
            <span className={T}>task decomposition</span>, breaking a broad objective into an ordered
            sequence of smaller, verifiable subtasks.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Effective agents also rely on <span className={T}>memory</span>: short-term working memory
            inside the context window tracks the current task state, while external storage retains
            customer history and past actions across sessions.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <MultiAgent />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            When a workflow spans several distinct domains, organizations often deploy a{" "}
            <span className={T}>multi-agent system</span> rather than a single monolithic agent with
            access to every tool.
          </p>
          <p className={BODY}>
            In a multi-agent architecture, each specialized agent is given focused instructions and
            permission to call only the tools required for its role, such as one agent reading invoices
            and a second checking contract terms.
          </p>
          <p className={BODY}>
            Dividing responsibilities across specialized agents simplifies testing, narrows security
            permissions, and creates a clearer audit trail at each handoff.
          </p>
        </div>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Governance and Human-in-the-Loop Design"
        lines={[
          "When an AI system is granted permission to call tools, send messages, or modify database records, model errors can directly cause financial loss or compliance violations.",
          "Enterprise agent architecture therefore requires explicit reliability analysis, security boundaries, and human-in-the-loop checkpoints.",
        ]}
      />

      {/* Compounding Error and Security Risks in Agentic Systems */}
      <Slide id="compounding-error" border align="left">
        <Head1>Compounding Error and Security Risks in Agentic Systems</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              In a multi-step agentic workflow, errors compound across steps because each action depends
              on the output of the preceding step.
            </p>
            <p className={BODY}>
              If an agent completes each individual step correctly 90 percent of the time, a five-step
              workflow succeeds from start to finish only 59 percent of the time (
              <span className="whitespace-nowrap">
                0.90<sup>5</sup> ≈ 0.59
              </span>
              ).
            </p>
            <p className={SUB}>
              Agentic systems also face security risks when they read untrusted external content such as
              incoming emails, web pages, or uploaded vendor documents.
            </p>
            <p className={BODY}>
              <span className={T}>Prompt injection</span> occurs when untrusted data processed by the
              model contain hidden instructions that override the system prompt and redirect the
              agent&apos;s behavior.
            </p>
            <p className={BODY}>
              If an email-reading agent has unrestricted tool access, a malicious message could instruct
              it to forward confidential records or approve an unauthorized payment.
            </p>
          </div>
          <CompoundLab />
        </div>
      </Slide>

      {/* Human-in-the-Loop Checkpoints and Action Boundaries */}
      <Slide id="hitl" border align="left" exercise={exercise["hitl"]}>
        <Head1>Human-in-the-Loop Checkpoints and Action Boundaries</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Human-in-the-loop (HITL)</span> design places explicit checkpoints in an
              automated workflow where a human must review and approve a proposed action before it is
              executed.
            </p>
            <p className={BODY}>
              Where to place human checkpoints depends on two economic criteria: the financial or
              reputational cost of an error, and whether the action is reversible.
            </p>
            <p className={SUB}>
              Low-risk, reversible actions, such as retrieving account records, drafting an internal
              note, or routing a ticket to a queue, can execute autonomously.
            </p>
            <p className={BODY}>
              High-impact or irreversible actions, such as issuing a large customer refund, executing a
              wire transfer, or sending a binding contract to a supplier, require human approval.
            </p>
          </div>
          <ActionMatrix />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          This governance structure applies the distinction from Week 1 between prediction and judgment:
          the agent prepares the information and proposed tool call, and the manager supplies the{" "}
          <span className="text-[var(--accent)]">judgment on high-stakes commitments</span>.
        </p>
      </Slide>

      {/* Evaluating and Monitoring Language and Agentic Systems */}
      <Slide id="evaluation" border align="left">
        <Head1>Evaluating and Monitoring Language and Agentic Systems</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Unlike a tabular classification model with a single accuracy score, a language or agentic system
          can fail in multiple ways: bad retrieval, schema violations, wrong tool selection, or unfaithful
          prose.
        </p>
        <ol className="mt-10 grid w-full max-w-5xl border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            [
              "Before deployment",
              "Before deployment, teams evaluate systems against a curated benchmark dataset of representative business scenarios, including adversarial and edge-case inputs.",
              "Key evaluation metrics include task completion rate, answer faithfulness to retrieved sources, tool-call accuracy, end-to-end latency, and total token and API cost per completed workflow.",
            ],
            [
              "In production",
              "In production, every agent run should record a complete trace of the prompt, retrieved chunks, intermediate reasoning steps, tool arguments, and human approvals.",
              "Continuous trace logging enables engineering and compliance teams to audit decisions, diagnose failure patterns, and refine prompts or guardrails as business conditions evolve.",
            ],
          ].map(([when, a, b], i) => (
            <li
              key={when}
              className={`space-y-4 border-b border-[var(--ink)]/10 py-6 md:border-b-0 ${
                i ? "md:border-l md:pl-10" : "md:pr-10"
              }`}
            >
              <p className={BODY}>{a}</p>
              <p className={BODY}>{b}</p>
            </li>
          ))}
        </ol>
      </Slide>

      {/* Discussion: Designing an Autonomous Procurement Workflow */}
      <Slide id="discussion-procurement" border align="left">
        <Head1>Discussion: Designing an Autonomous Procurement Workflow</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A manufacturing company wants to deploy an AI agent
          to manage routine raw-material reorders. The proposed agent can read warehouse inventory alerts,
          search supplier catalogs, read incoming supplier emails, generate purchase orders, and transmit
          orders to vendors. Classify each action by reversibility and risk, specify where mandatory
          human-in-the-loop checkpoints must be placed, and explain how the system should defend against
          prompt injection from external vendor emails.
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <ol className="mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            "Foundation models and large language models pre-trained on broad text corpora allow organizations to adapt one model across many language workflows without training separate models from scratch.",
            "Language models process text as token embeddings using self-attention and generate responses through next-token prediction, which produces fluent prose but does not guarantee factual accuracy.",
            "Prompt engineering, few-shot examples, and schema-validated structured outputs turn a general-purpose language model into a repeatable component for enterprise software pipelines.",
            "Retrieval-augmented generation grounds model responses in private, up-to-date firm documents with verifiable citations, whereas fine-tuning updates model weights to learn consistent domain style or task behavior.",
            "Autonomous agents extend language models beyond conversational copilots by planning multi-step tasks, calling external software tools and APIs, and acting on the returned results.",
            "Because multi-step agents face compounding error rates and prompt injection risks, production deployments require least-privilege tool permissions, trace logging, and human-in-the-loop approval for high-impact or irreversible actions.",
          ].map((line, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] border-b border-[var(--ink)]/10 py-4">
              <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
                {i + 1}
              </span>
              <p className="font-sans text-base leading-[1.55] text-[var(--ink)] md:text-[1.0625rem]">
                {line}
              </p>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
