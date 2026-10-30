---
topic: "AI in Business Strategy"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week8"
---

## Title Slide
- Week 8
- Sustainable competitive advantage from artificial intelligence comes not from renting public model APIs, but from proprietary data loops, workflow integration, rigorous ROI experimentation, and organizational execution.

## Operational Effectiveness Versus Strategic Differentiation [exercise]
[figure: strategic frontier diagram contrasting operational effectiveness improvements from off-the-shelf AI tools against strategic differentiation built on proprietary workflows and data]
- In corporate strategy, operational effectiveness means performing the same business activities faster, cheaper, or with fewer defects than before.
- Strategic differentiation means configuring activities and proprietary assets in a distinctive way that delivers unique value competitors cannot easily copy.
- When every firm in an industry licenses the same commercial AI copilot to summarize meetings or draft emails, the entire industry's productivity baseline rises together.
- Adopting off-the-shelf AI tools is necessary to maintain parity, but it does not confer a lasting competitive advantage if rivals can purchase the exact same capability tomorrow.
- Durable strategic advantage requires embedding AI into proprietary datasets, specialized domain workflows, and complementary assets that competitors cannot replicate from a public API.

## Value Creation Versus Value Capture in Technological Shifts [no-exercise]
- Economic history shows that technologies that create massive value for society do not automatically generate superior profits for the firms that adopt them.
- Value creation is the total economic benefit a product or process generates by lowering costs or improving quality for customers.
- Value capture is the portion of that total benefit that a firm retains as operating profit rather than competing away in price cuts or paying out to infrastructure suppliers.
- When textile mills electrified factories or retailers launched standard e-commerce websites, cost savings were quickly passed on to consumers through lower market prices while profit margins remained flat.
- A sound AI strategy asks not only whether a model improves a workflow, but also what prevents competitors from copying the deployment and competing the margin away.

## Part 1: Where Value Accrues in the AI Stack [no-exercise]
- The modern artificial intelligence ecosystem is organized as a vertical technology stack spanning physical hardware, foundation models, data infrastructure, and end-user applications.
- Analyzing the market structure and switching costs of each layer clarifies where profit margins concentrate and where capabilities become commoditized.

## The Four Layers of the Enterprise AI Stack [exercise]
[figure: four-layer enterprise AI stack progressing upward from semiconductor hardware and cloud compute to foundation models, enterprise data infrastructure, and vertical application workflows]
- The enterprise AI stack consists of four interdependent layers, each governed by different economic forces and capital requirements.
- At the base sits the hardware and compute layer, comprising specialized semiconductor accelerators, networking fabric, energy generation, and hyperscale data centers.
- Above compute sits the foundation model layer, where proprietary labs and open-weight consortia train large language, vision, and multimodal models.
- The third layer is enterprise data and orchestration infrastructure, including vector databases, feature stores, retrieval pipelines, security guardrails, and observability tools.
- At the top sits the application workflow layer, where models are embedded inside specific business processes such as clinical triage, tax preparation, or supply chain planning.

## Commoditization Pressure at the Foundation Model Layer [no-exercise]
[figure: benchmark capability convergence and per-token inference price decline comparing frontier proprietary models and open-weight alternatives over time]
- Training a frontier foundation model requires hundreds of millions or billions of dollars in compute capital, yet standalone model APIs face intense commoditization pressure.
- Multiple commercial providers and open-weight releases repeatedly converge in accuracy on standard language, coding, and reasoning benchmarks within months of each new release.
- Because developers interact with language models through standardized text and JSON interfaces, the switching cost of swapping one general-purpose model API for another is low.
- Over the past several years, the price per million tokens for a fixed level of model capability has fallen by more than 80 percent annually as hardware and smaller distilled models improve.
- Consequently, startups and enterprise initiatives built as thin user-interface wrappers around a public prompt lack a defensible moat against both rival wrappers and the model providers themselves.

## Complementary Assets and Workflow Integration [no-exercise]
- When the core algorithmic engine is widely accessible through APIs or open weights, value capture shifts toward complementary assets.
- Complementary assets are the non-algorithmic capabilities required to turn a prediction into a commercial outcome, including regulatory approvals, brand trust, distribution channels, and physical fulfillment networks.
- In enterprise software, the strongest complementary asset is deep workflow integration with the system of record where employees already make decisions and store audited transactions.
- A standalone model that flags supply chain delays has low switching costs, whereas a model embedded directly into a firm's ERP purchase-order approval rules and supplier contracts is hard to displace.
- Incumbent firms that modernize their core workflows around AI can often defend their market position against algorithm-only entrants that lack distribution and institutional trust.

## Part 2: Data Moats, Feedback Loops, and Network Effects [no-exercise]
- Executives frequently claim that their company's historical database is a competitive moat, yet most corporate data reserves confer no strategic advantage at all.
- Distinguishing commodity data from proprietary outcome feedback loops is essential for deciding where to invest engineering capital.

## What Makes a Data Asset a True Competitive Moat? [exercise]
[figure: strategic evaluation matrix scoring enterprise datasets across uniqueness, verified outcome labeling, temporal decay rate, and competitor imitability]
- Under the resource-based view of strategy, an asset creates sustained competitive advantage only if it is valuable, rare, costly to imitate, and non-substitutable.
- Raw data volume rarely meets this standard: terabytes of public web text, generic customer chat logs, or third-party demographic tables can be purchased or synthetically generated by any competitor.
- A genuine data moat requires proprietary records generated as an exclusive byproduct of the firm's operations that cannot be bought on the open market.
- Most importantly, a strategic dataset must capture closed-loop outcomes: not merely what inputs entered a workflow, but which specific action was taken and whether that action succeeded or failed in the real world.
- Ten years of proprietary loan underwriting decisions paired with verified repayment outcomes, or millions of industrial machine sensor traces paired with verified mechanical failures, constitute durable data moats.

## Data Flywheels and Diminishing Returns to Scale [no-exercise]
[figure: data flywheel feedback loop alongside an empirical learning curve showing steep initial accuracy gains from early outcome data followed by diminishing marginal returns]
- A data flywheel is a self-reinforcing loop in which a superior product attracts more users, user interactions generate more labeled training data, and those data further improve the model.
- While data flywheels are powerful in theory, statistical learning curves exhibit diminishing marginal returns as sample size grows.
- Moving from 1,000 labeled examples to 100,000 examples often produces a dramatic jump in model accuracy, whereas moving from 10 million to 100 million static examples often yields negligible gains.
- If the underlying task is static, a competitor with 5 percent of the market leader's data volume may still reach 99 percent of the leader's model accuracy, neutralizing the scale advantage.
- A data flywheel creates a lasting moat primarily in non-stationary environments, such as real-time road traffic, payment fraud, or fast-moving retail trends, where yesterday's data decay rapidly and continuous daily feedback is required.

## Protecting Proprietary Knowledge When Using External Models [no-exercise]
- Relying on external AI vendors introduces a strategic leakage risk if a firm's proprietary domain knowledge is absorbed into a shared public model.
- Consumer-tier AI terms of service typically allow the model provider to log user prompts, uploaded documents, and human corrections to train future versions of their general model.
- If a pharmaceutical firm or investment bank allows its proprietary research workflows to train a vendor's shared model, it effectively transfers its institutional know-how to every competitor licensing that vendor.
- Enterprise AI procurement therefore requires strict contractual data isolation: zero-data-retention API agreements, virtual private cloud hosting, or self-hosted open-weight models.
- Firms preserve their competitive edge by keeping their proprietary retrieval indexes, verified outcome labels, and fine-tuned model weights inside their own security boundary.

## Part 3: Build, Fine-Tune, or Buy Decisions [no-exercise]
- Every enterprise AI initiative requires an architectural and economic choice among buying turnkey vendor software, composing workflows on commercial APIs, customizing open-weight models, or training proprietary models.
- Matching the procurement approach to the strategic importance and unit economics of the task prevents both overspending on commodity tools and outsourcing core differentiation.

## The Four Procurement Archetypes for Enterprise AI [exercise]
[figure: decision spectrum comparing turnkey SaaS purchase, commercial API composition with RAG, fine-tuned open-weight hosting, and training proprietary models from scratch]
- Enterprise AI initiatives fall into four architectural archetypes along a spectrum of customization and control.
- First, buying turnkey software-as-a-service (SaaS) embeds pre-built AI features into existing workplace tools, such as automated meeting transcription or standard accounts-payable invoice scanning.
- Second, composing with commercial APIs and retrieval-augmented generation (RAG) combines rented frontier models with the firm's private document indexes and custom workflow logic.
- Third, customizing and hosting open-weight models allows an enterprise to fine-tune compact models on its own cloud infrastructure for strict data residency and low-latency, high-volume tasks.
- Fourth, training a proprietary model from scratch is reserved for core domain problems, such as quantitative credit scoring, supply chain optimization, or biological sequence design, where the algorithm itself is the firm's primary source of differentiation.

## Unit Economics: Fixed Training Costs Versus Variable Inference Costs [no-exercise]
[figure: total cost of ownership break-even chart comparing variable per-token commercial API fees against fixed GPU hosting costs across monthly query volume]
- Traditional enterprise software has high upfront development costs but near-zero marginal cost for each additional click or database query.
- Generative AI reintroduces significant variable cost of goods sold (COGS) because every prompt and generated response consumes GPU compute and memory bandwidth.
- At low to moderate query volumes, paying per million tokens to a commercial API provider is far cheaper than renting dedicated GPU servers that sit idle overnight.
- However, once an automated workflow scales to tens of millions of daily transactions, variable API token bills can exceed the fixed cost of hosting a fine-tuned, smaller open-weight model.
- Mature engineering teams optimize unit economics through model routing: directing 80 percent of routine requests to fast, inexpensive small models and escalating only complex queries to large frontier models.

## Managing Vendor Lock-In and Model Obsolescence [no-exercise]
- Because the relative performance and pricing of foundation models shift every few months, committing an enterprise architecture permanently to a single model vendor creates technical lock-in.
- Vendor lock-in occurs when application logic, prompt templates, embedding vectors, and tool-calling formats are written so specifically for one provider that switching requires a complete rewrite.
- If that vendor raises API prices, deprecates a model version, or suffers a service outage, a locked-in enterprise cannot easily redirect traffic to an alternative provider.
- Resilient enterprise architecture insulates business applications behind an internal model gateway that standardizes authentication, logging, and tool schemas across multiple model providers.
- Maintaining an automated internal evaluation benchmark allows the firm to test any newly released commercial or open-weight model against its own business cases in hours and switch when economics warrant.

## Discussion: Build-Versus-Buy Strategy at a Regional Healthcare Network
- Discussion: A regional healthcare network plans to deploy two AI systems this year: (1) an ambient clinical documentation assistant that transcribes physician-patient consultations into standard electronic health record notes, and (2) a post-operative risk scoring system that predicts ICU readmission using twelve years of the network's proprietary lab, vitals, and surgical outcome records. For each system, recommend whether the hospital should buy a turnkey vendor product, compose on a commercial API with RAG, or train and host a proprietary model, justifying your choice across strategic differentiation, data privacy, and unit economics.

## Part 4: Measuring AI Tool Quality and Business ROI [no-exercise]
- A model that achieves impressive scores on a data science benchmark can still lose money when deployed inside a real organization.
- Evaluating AI investments requires connecting offline technical metrics to causal field experiments and full lifecycle cost accounting.

## Separating Model Metrics from Business Outcomes [exercise]
[figure: causal value chain linking offline model accuracy metrics to worker adoption behavior, operational throughput, and net financial return on investment]
- Data science teams evaluate models using offline technical metrics, such as classification area under the curve (AUC), forecast root mean squared error, or RAG citation faithfulness.
- Executive leadership evaluates investments using online business outcomes, such as net customer retention, claims processing cost per file, or gross margin per order.
- High offline model accuracy frequently fails to translate into business return on investment because three organizational links break between prediction and value.
- First, frontline workers may distrust or ignore the model's recommendations, leaving actual human decisions unchanged.
- Second, even if workers use the tool, downstream capacity bottlenecks or added human verification time can offset the speed gains of initial draft or score generation.

## Designing Controlled Experiments and A/B Tests for AI Systems [exercise]
[figure: randomized controlled trial architecture comparing a treatment group using an AI workflow against a control group across speed, quality, and downstream rework]
- The gold standard for measuring whether an AI system creates real business value is a randomized controlled experiment, commonly called an A/B test.
- In a controlled experiment, customers, transactions, or employees are randomly assigned to either a treatment group (with the AI system) or a control group (using the existing baseline workflow).
- Simple before-and-after comparisons without a concurrent control group are unreliable because seasonal demand shifts, price changes, or macroeconomic trends confound the result.
- Designing valid AI experiments requires guarding against novelty effects (where users click or engage more during the first week out of curiosity) and interference (where treatment and control groups compete for the same limited inventory).
- Crucially, experiments must track both primary productivity metrics and guardrail metrics, ensuring that faster task completion does not come at the expense of higher downstream error rework or customer complaints.

## Risk-Adjusted ROI and Hidden Cost Accounting [no-exercise]
[figure: complete AI investment ledger comparing gross productivity and revenue gains against ongoing inference fees, data pipeline maintenance, human review labor, and error liability]
- Many enterprise AI business cases overestimate return on investment by counting gross labor time saved while omitting ongoing operational and verification costs.
- If an AI copilot saves an employee twenty minutes of drafting twice a week, those fragmented forty minutes rarely translate into immediate headcount reductions unless workflows are consolidated.
- On the cost side, initial model development typically represents less than a third of total lifecycle expenditure.
- Complete ROI accounting includes recurring token and compute costs, data pipeline maintenance, retrieval index updates, continuous drift monitoring, and the labor cost of human-in-the-loop review.
- Financial analysts must also deduct the expected cost of residual model failures, such as customer refunds, SLA penalties, or compliance remediation, to calculate risk-adjusted net return.

## Part 5: From Pilots to Production: Organizational Leadership [no-exercise]
- Industry surveys consistently report that while a vast majority of large enterprises run AI pilots, only a small fraction successfully scale those pilots into core production workflows.
- Moving from isolated demonstrations to enterprise-wide value is primarily an organizational, data-governance, and leadership challenge rather than an algorithmic one.

## Why Enterprise AI Projects Stall in Pilot Purgatory [no-exercise]
[figure: enterprise AI deployment funnel illustrating where proof-of-concept pilots stall due to unintegrated data pipelines, late compliance review, and unchanged human workflows]
- Pilot purgatory refers to the organizational trap in which a company funds dozens of impressive proof-of-concept AI demonstrations that never transition into live production systems.
- First, many pilots start as technology-first experiments ("let us build a chatbot") without a clearly defined business decision, owner, or economic metric.
- Second, pilots are usually built on clean, static CSV extracts, and fail when engineers discover that live production data are fragmented across legacy databases with inconsistent schemas.
- Third, teams often treat legal, privacy, and security review as a final sign-off step before launch, discovering too late that the pilot violates data-residency or fair-lending rules.
- Fourth, organizations deploy the software tool without changing incentives, standard operating procedures, or training, so employees revert to their familiar manual habits.

## Operating Models: Centralized, Decentralized, and Hub-and-Spoke [exercise]
[figure: organizational chart comparison of a centralized AI lab, fully decentralized business-unit teams, and a federated hub-and-spoke AI operating model]
- Scaling AI across a multi-division enterprise requires choosing an organizational operating model that balances technical standards with domain proximity.
- In a centralized AI lab model, all machine learning engineers and data scientists sit in one corporate group. This avoids duplicated infrastructure but often produces ivory-tower models disconnected from daily business operations.
- In a fully decentralized model, each business unit hires its own analysts and purchases its own vendor tools. This maximizes local speed but creates fragmented data silos, duplicated vendor contracts, and inconsistent security governance.
- Most mature enterprises converge on a federated hub-and-spoke operating model.
- In a hub-and-spoke structure, a central platform hub builds shared data pipelines, model gateways, security guardrails, and evaluation harnesses, while embedded domain teams in marketing, finance, and operations lead problem selection and workflow integration.

## Executive Leadership and Portfolio Prioritization [no-exercise]
[figure: two-by-two AI portfolio matrix plotting candidate initiatives by strategic differentiation and financial impact against data, technical, and governance readiness]
- Effective executive leadership manages enterprise AI as a disciplined capital-allocation portfolio rather than a contest to launch the highest number of demos.
- Leaders evaluate proposed initiatives along two axes: strategic and financial value on one axis, and data, technical, and governance readiness on the other.
- High-readiness, moderate-value internal workflows serve as foundational learning projects that validate the firm's data pipelines and governance processes.
- High-value, differentiating workflows receive concentrated multi-quarter investment across data engineering, domain design, controlled experimentation, and employee change management.
- Equally important is portfolio pruning: executives must establish clear stage-gate criteria to shut down stalled or low-ROI pilots early and reallocate talent to proven production workflows.

## Discussion: Auditing a Stalled Enterprise AI Portfolio
- Discussion: The Chief Executive Officer of a mid-sized property and casualty insurance company spent 6 million dollars over the past eighteen months funding fourteen separate generative AI proof-of-concept pilots across marketing, claims, underwriting, and HR. Today, thirteen of the fourteen pilots remain in demo status while operating expenses have risen due to overlapping software subscriptions. As the incoming Chief AI Officer, how would you audit and prune this portfolio, restructure the teams around a hub-and-spoke operating model, and design a controlled experiment to prove net ROI on the two highest-priority workflows?

## Key Takeaways
- Off-the-shelf AI tools improve operational effectiveness across an entire industry simultaneously, whereas durable strategic advantage requires proprietary data loops, workflow integration, and complementary assets.
- In the four-layer AI stack, general-purpose foundation model APIs face rapid price and capability commoditization, shifting value capture toward scarce compute below and deeply integrated application workflows above.
- Raw data volume is rarely a competitive moat. A defensible data moat requires exclusive operational data paired with verified, closed-loop outcome labels in a non-stationary environment.
- Enterprises should buy turnkey SaaS for routine administrative tasks, compose with commercial APIs or fine-tuned open-weight models for domain workflows, and train proprietary models only where the algorithm is core to competitive differentiation.
- High offline model accuracy does not guarantee financial return. Proving business ROI requires randomized controlled experiments that measure causal lift net of inference, integration, verification, and error costs.
- Escaping pilot purgatory requires early legal and data-pipeline integration, a federated hub-and-spoke operating model, and executive discipline to retire low-value demos and scale high-impact production workflows.
