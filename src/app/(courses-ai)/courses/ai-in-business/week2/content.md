---
topic: "Large Language Models, Prompting, and Agentic AI"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week2"
---

## Title Slide
- Week 2
- Large language models become reliable enterprise systems when paired with structured prompting, external data retrieval, tool execution, and human oversight.

## From Narrow Models to Foundation Models [no-exercise]
- Traditional machine learning systems are narrow models trained for a single task, such as predicting customer churn or scoring credit applications.
- Building a narrow model for a new task requires collecting a dedicated labeled dataset and training a separate model from scratch.
- A foundation model is a large neural network pre-trained on vast collections of text, code, or media that can be adapted to many downstream tasks.
- Large language models (LLMs) are foundation models trained on text to represent and generate human language and computer code.
- For enterprises, a single foundation model can support customer service, contract review, and software development without training a separate network for each workflow.

## Capabilities and Failure Modes of Language Models [exercise]
[figure: comparison of business tasks suited to an unassisted language model versus tasks requiring external retrieval, deterministic tools, or human verification]
- Unassisted language models excel at tasks where all necessary information is supplied in the input, including summarization, rewriting, translation, and draft generation.
- Unassisted language models fail when a task requires private firm records that were not present in the pre-training data.
- They also fail when a task requires exact arithmetic, live database lookups, or guaranteed adherence to strict regulatory rules.
- Because a language model generates responses by predicting plausible word sequences, it can state false facts in confident prose.
- Deploying language models in business therefore requires surrounding the model with structured prompts, external data retrieval, software tools, and human review.

## Part 1: How Large Language Models Process and Generate Text [no-exercise]
- A large language model does not store facts in a database or reason through explicit logical formulas.
- Understanding how the model represents text as numerical vectors and predicts one token at a time explains both its capabilities and its errors.

## Tokens, Embeddings, and Semantic Representation [no-exercise]
[figure: business sentence split into subword tokens and mapped into a vector embedding space where semantically related financial and legal terms cluster together]
- Before processing text, a language model divides the input string into tokens, which are words, subword fragments, or punctuation marks.
- In English text, one token corresponds on average to about three-quarters of a word, and commercial API providers price model usage per million tokens.
- Each token is converted into an embedding, a high-dimensional list of numbers learned during training that represents how that token is used across contexts.
- In embedding space, words and phrases that appear in similar contexts sit close to one another geometrically.
- This numerical representation allows the model to recognize that phrases such as "invoice overdue" and "late payment" express closely related business concepts.

## Self-Attention and Context Windows [no-exercise]
[figure: self-attention weights connecting words in a commercial contract clause to earlier nouns and obligations across the sentence]
- Modern large language models are built on the Transformer architecture, which processes token embeddings using a mechanism called self-attention.
- Self-attention computes how strongly each token in a sequence relates to every other token, allowing the model to resolve meaning from surrounding context.
- In a commercial lease, self-attention connects a pronoun such as "it" in a penalty clause back to "the tenant" or "the security deposit" several sentences earlier.
- The context window is the maximum number of tokens a model can process in a single request, combining the input prompt and the generated response.
- Larger context windows allow a model to read longer documents in one pass, but increase inference cost and response latency as input length grows.

## Next-Token Prediction and Sampling Temperature [exercise]
[figure: interactive next-token probability distribution showing how temperature rescales candidate token probabilities from deterministic selection to high-variance sampling]
- A large language model generates text autoregressively by predicting the probability of every possible next token given the sequence of tokens so far.
- Once one token is selected, it is appended to the input sequence, and the model repeats the calculation to predict the following token.
- Temperature is a sampling parameter that controls how much randomness is introduced when selecting the next token from that probability distribution.
- A temperature near zero makes generation nearly deterministic by consistently selecting the highest-probability token, which suits data extraction and classification.
- A higher temperature flattens the probability distribution so less likely tokens are chosen more often, which increases variety in creative drafting and brainstorming.

## Part 2: Prompt Engineering and Structured Outputs [no-exercise]
- Because a pre-trained language model can follow natural-language instructions, managers and analysts can specify tasks through prompts rather than retraining model weights.
- Turning model responses into reliable inputs for enterprise software requires explicit prompt structure and strict output schemas.

## Anatomy of an Enterprise Prompt [no-exercise]
[figure: four-layer enterprise prompt architecture separating system instructions, reference context, few-shot examples, and the current user input]
- A prompt is the complete text input supplied to a language model to define the task, provide context, and request an output.
- In-context learning is the ability of a pre-trained language model to perform a new task from instructions and examples inside the prompt without updating its weights.
- A production enterprise prompt typically separates four components: system instructions, domain context, reference examples, and the specific record to process.
- System instructions establish the role, behavioral boundaries, and refusal rules the model must follow across all user requests.
- Separating unchanging instructions from variable user inputs improves consistency and allows API platforms to cache the repeated prefix at lower cost.

## Zero-Shot and Few-Shot Task Specification [exercise]
[figure: side-by-side comparison of zero-shot prompting (instructions only) and few-shot prompting (instructions plus three labeled customer support examples)]
- Zero-shot prompting specifies a task using instructions alone, without providing completed examples of inputs and outputs in the prompt.
- Zero-shot prompting is effective for standard language tasks such as summarizing a meeting transcript or translating a product description.
- Few-shot prompting includes a small number of labeled input-output pairs in the prompt to demonstrate the exact judgment criteria and output format required.
- When a retailer classifies support tickets into an internal taxonomy, three to five representative examples clarify borderline cases that prose rules leave ambiguous.
- The examples selected for a few-shot prompt should cover typical cases as well as common edge cases that the model might otherwise misclassify.

## Structured Outputs and Schema Validation [no-exercise]
[figure: unstructured vendor invoice email transformed by a schema-constrained language model into a validated JSON object for an accounting database]
- Enterprise software systems such as customer relationship management (CRM) platforms and accounting databases require typed fields rather than conversational paragraphs.
- A structured output constrains the language model to return data that conform to a predefined schema, such as a JSON object with specified field names and data types.
- For an incoming customer complaint, a schema can require four fields: product identifier, issue category from an approved list, urgency score from 1 to 5, and a one-sentence summary.
- Schema validation checks that every required field is present and matches its declared type before the record is passed to downstream software.
- Constraining generation to a valid schema turns a language model from a chat interface into a data-processing component inside an automated pipeline.

## Part 3: Grounding Models with Retrieval-Augmented Generation [no-exercise]
- A pre-trained language model knows nothing about an organization's private contracts, internal policies, or events that occurred after its training cutoff date.
- Retrieval-augmented generation connects the model to an external knowledge base so its answers are grounded in current, verifiable firm documents.

## The Retrieval-Augmented Generation Pipeline [exercise]
[figure: five-stage retrieval-augmented generation pipeline from document chunking and vector indexing to query retrieval and cited response generation]
- Retrieval-augmented generation (RAG) is an architecture that retrieves relevant passages from an external document store and inserts them into the prompt before the model generates an answer.
- During indexing, firm documents such as policy manuals and product specifications are split into manageable passages called chunks and converted into vector embeddings.
- Those embeddings are stored in a searchable index alongside the original text and metadata such as document title, effective date, and access permissions.
- When a user submits a question, the system converts the query into an embedding, retrieves the chunks most relevant to that query, and places them into the model's context window.
- The prompt instructs the model to answer the question using only the supplied passages and to cite the source document for each claim.

## Failure Modes in Retrieval Systems [no-exercise]
- Retrieval-augmented generation reduces hallucination, but errors can still occur in either the retrieval stage or the generation stage.
- Retrieval failure occurs when the search step fails to return the passage needed to answer the question, or returns an outdated document version.
- Context faithlessness occurs when the relevant passage is retrieved, but the model ignores it or blends it with incorrect assumptions from pre-training.
- Evaluating a RAG system therefore requires measuring two separate quantities: retrieval quality (whether the correct source chunks were found) and answer faithfulness (whether every claim in the answer is supported by those chunks).
- Maintaining a reliable RAG system also requires document hygiene, so superseded policies and expired price lists are archived or removed from the active index.

## Prompting, RAG, or Fine-Tuning [exercise]
[figure: decision matrix comparing prompting, retrieval-augmented generation, and fine-tuning across knowledge freshness, engineering cost, and primary use case]
- Managers adapting a language model to a business workflow can choose among three methods: prompt engineering, retrieval-augmented generation, and fine-tuning.
- Fine-tuning is the process of taking a pre-trained model and training it further on thousands of curated input-output examples to update its internal weights.
- Prompt engineering is the fastest and lowest-cost starting point when the model already possesses the required knowledge and only needs clear instructions and examples.
- Retrieval-augmented generation is the appropriate choice when responses must reflect private, frequently updated, or auditable source documents with explicit citations.
- Fine-tuning is reserved for teaching a consistent domain style, specialized notation, or compact task behavior so a smaller, cheaper model can match the accuracy of a larger one.

## Discussion: Internal Policy Assistant at a Commercial Bank
- Discussion: A commercial bank wants to deploy an internal assistant to help lending officers answer policy questions across 4,000 pages of credit underwriting manuals that are revised every month. Should the bank build this system primarily with few-shot prompting, retrieval-augmented generation, or fine-tuning? What specific safeguards should management require so lending officers do not approve loans based on outdated clauses or fabricated policy rules?

## Part 4: From Conversational Copilots to Autonomous Agents [no-exercise]
- Early enterprise deployments of language models focused on conversational assistants that answer questions or draft text while a human performs every action.
- Agentic AI extends language models from passive text generators into systems that plan sequences of steps, call external software tools, and execute workflows.

## Copilots Versus Autonomous Agents [exercise]
[figure: comparison between a human-driven copilot workflow and an autonomous agent loop that plans steps, calls external tools, and observes results]
- A copilot is an interactive assistant that generates drafts, summaries, or recommendations in response to a user's prompt while the human user controls each step.
- In a copilot workflow, the human reviews the output, decides what to do next, and manually enters any changes into enterprise software.
- An AI agent is a system that uses a language model to decompose a goal into steps, invoke external software tools, inspect the results, and continue until the task is complete.
- Rather than returning a single text reply, an agent operates in a loop of planning, acting in an environment, observing feedback, and updating its next step.
- Moving from a copilot to an agent shifts the locus of execution from the human operator to the software system, raising both productivity potential and operational risk.

## Tool Use and Function Calling [no-exercise]
[figure: sequence diagram of a language model emitting a structured function call to an enterprise inventory API and incorporating the returned data into its final response]
- Tool use, also called function calling, is the ability of a language model to emit a structured request that invokes an external software program or application programming interface (API).
- Developers provide the model with a catalog of available tools, including each tool's name, purpose, and required input parameters.
- When a user asks a question that requires live data or exact calculation, the model outputs a structured call specifying which tool to run and with what arguments.
- The host application executes the tool outside the language model, such as running a SQL query or a financial calculator, and returns the exact output to the model's context window.
- Tool use allows an enterprise system to combine the language understanding of a neural network with the exactness of deterministic software and live databases.

## Planning, Memory, and Multi-Agent Workflows [no-exercise]
[figure: coordinator agent decomposing a customer order issue across specialized retrieval, billing-verification, and fulfillment sub-agents]
- Complex business workflows require an agent to perform task decomposition, breaking a broad objective into an ordered sequence of smaller, verifiable subtasks.
- Effective agents also rely on memory: short-term working memory inside the context window tracks the current task state, while external storage retains customer history and past actions across sessions.
- When a workflow spans several distinct domains, organizations often deploy a multi-agent system rather than a single monolithic agent with access to every tool.
- In a multi-agent architecture, each specialized agent is given focused instructions and permission to call only the tools required for its role, such as one agent reading invoices and a second checking contract terms.
- Dividing responsibilities across specialized agents simplifies testing, narrows security permissions, and creates a clearer audit trail at each handoff.

## Part 5: Governance and Human-in-the-Loop Design [no-exercise]
- When an AI system is granted permission to call tools, send messages, or modify database records, model errors can directly cause financial loss or compliance violations.
- Enterprise agent architecture therefore requires explicit reliability analysis, security boundaries, and human-in-the-loop checkpoints.

## Compounding Error and Security Risks in Agentic Systems [no-exercise]
[figure: multi-step reliability curve illustrating how a 90 percent single-step accuracy rate compounds to 59 percent end-to-end success over five sequential steps]
- In a multi-step agentic workflow, errors compound across steps because each action depends on the output of the preceding step.
- If an agent completes each individual step correctly 90 percent of the time, a five-step workflow succeeds from start to finish only 59 percent of the time ($0.90^5 \approx 0.59$).
- Agentic systems also face security risks when they read untrusted external content such as incoming emails, web pages, or uploaded vendor documents.
- Prompt injection occurs when untrusted data processed by the model contain hidden instructions that override the system prompt and redirect the agent's behavior.
- If an email-reading agent has unrestricted tool access, a malicious message could instruct it to forward confidential records or approve an unauthorized payment.

## Human-in-the-Loop Checkpoints and Action Boundaries [exercise]
[figure: two-by-two governance matrix classifying agent actions by financial impact and reversibility into autonomous execution versus mandatory human approval]
- Human-in-the-loop (HITL) design places explicit checkpoints in an automated workflow where a human must review and approve a proposed action before it is executed.
- Where to place human checkpoints depends on two economic criteria: the financial or reputational cost of an error, and whether the action is reversible.
- Low-risk, reversible actions, such as retrieving account records, drafting an internal note, or routing a ticket to a queue, can execute autonomously.
- High-impact or irreversible actions, such as issuing a large customer refund, executing a wire transfer, or sending a binding contract to a supplier, require human approval.
- This governance structure applies the distinction from Week 1 between prediction and judgment: the agent prepares the information and proposed tool call, and the manager supplies the judgment on high-stakes commitments.

## Evaluating and Monitoring Language and Agentic Systems [no-exercise]
- Unlike a tabular classification model with a single accuracy score, a language or agentic system can fail in multiple ways: bad retrieval, schema violations, wrong tool selection, or unfaithful prose.
- Before deployment, teams evaluate systems against a curated benchmark dataset of representative business scenarios, including adversarial and edge-case inputs.
- Key evaluation metrics include task completion rate, answer faithfulness to retrieved sources, tool-call accuracy, end-to-end latency, and total token and API cost per completed workflow.
- In production, every agent run should record a complete trace of the prompt, retrieved chunks, intermediate reasoning steps, tool arguments, and human approvals.
- Continuous trace logging enables engineering and compliance teams to audit decisions, diagnose failure patterns, and refine prompts or guardrails as business conditions evolve.

## Discussion: Designing an Autonomous Procurement Workflow
- Discussion: A manufacturing company wants to deploy an AI agent to manage routine raw-material reorders. The proposed agent can read warehouse inventory alerts, search supplier catalogs, read incoming supplier emails, generate purchase orders, and transmit orders to vendors. Classify each action by reversibility and risk, specify where mandatory human-in-the-loop checkpoints must be placed, and explain how the system should defend against prompt injection from external vendor emails.

## Key Takeaways
- Foundation models and large language models pre-trained on broad text corpora allow organizations to adapt one model across many language workflows without training separate models from scratch.
- Language models process text as token embeddings using self-attention and generate responses through next-token prediction, which produces fluent prose but does not guarantee factual accuracy.
- Prompt engineering, few-shot examples, and schema-validated structured outputs turn a general-purpose language model into a repeatable component for enterprise software pipelines.
- Retrieval-augmented generation grounds model responses in private, up-to-date firm documents with verifiable citations, whereas fine-tuning updates model weights to learn consistent domain style or task behavior.
- Autonomous agents extend language models beyond conversational copilots by planning multi-step tasks, calling external software tools and APIs, and acting on the returned results.
- Because multi-step agents face compounding error rates and prompt injection risks, production deployments require least-privilege tool permissions, trace logging, and human-in-the-loop approval for high-impact or irreversible actions.
