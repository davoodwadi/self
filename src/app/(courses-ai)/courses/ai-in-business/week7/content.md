---
topic: "AI in Product Development and Software Engineering"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week7"
---

## Title Slide
- Week 7
- Artificial intelligence compresses the time and cost required to turn an idea into working software, shifting the bottleneck from typing code to problem specification, verification, and security governance.

## The Economics of Product Discovery and Software Creation [no-exercise]
- Developing digital products and enterprise software historically required slow, sequential handoffs among business stakeholders, product managers, user-experience designers, and software engineers.
- Because custom software engineering was scarce and expensive, organizations built only a small fraction of the internal tools and product experiments they conceived.
- Software engineering became one of the earliest high-impact domains for large language models because programming languages have explicit syntax and abundant training repositories.
- Unlike open-ended prose, software code can be executed against compilers, type checkers, and automated test suites that provide objective verification feedback.
- Lowering the marginal cost of writing code changes how products are discovered, prototyped, tested, and governed across the enterprise.

## Shifting the Bottleneck from Code Generation to Specification and Verification [exercise]
[figure: software development lifecycle comparison before and after generative AI showing implementation time shrinking while problem specification, testing, and security review expand in relative importance]
- When a language model can generate hundreds of lines of working code in seconds, writing initial syntax is no longer the primary bottleneck in software delivery.
- The binding constraint shifts upstream to problem specification: defining which customer problem is worth solving, what rules apply, and how edge cases should behave.
- The constraint also shifts downstream to verification: proving that the generated software is factually accurate, secure against attacks, and maintainable over time.
- Generating the wrong feature ten times faster destroys organizational value by cluttering the product and creating maintenance burden.
- Product and engineering leaders must therefore reallocate human effort toward clear specification before generation and rigorous verification after generation.

## Part 1: AI-Assisted Product Discovery and Concept Generation [no-exercise]
- Before a team writes production software, it must discover what users actually need and which product concepts are viable for the business.
- Language models and semantic embeddings accelerate product discovery by synthesizing unstructured user feedback and generating testable design alternatives.

## Synthesizing Unstructured User Research and Support Logs [no-exercise]
[figure: product discovery pipeline aggregating user interview transcripts, support tickets, and session feedback into clustered pain points linked to account revenue]
- Product discovery is the iterative process of identifying real customer problems and validating whether a proposed solution creates value before committing full engineering resources.
- Organizations accumulate thousands of hours of unstructured product feedback across customer support tickets, sales call recordings, app-store reviews, and user interviews.
- Language models and embedding clusters synthesize this unstructured text into recurring friction themes, linking each theme to customer segments and renewal risk.
- Effective discovery pipelines preserve full traceability, so every summarized theme links directly to verbatim customer quotes and original session recordings.
- Grounding synthesis in linked source records prevents product teams from acting on hallucinated summaries or vocal-minority complaints.

## Divergent Concept Generation and Specification Drafting [no-exercise]
[figure: double-diamond product design workflow showing generative AI expanding divergent concept options followed by human convergent evaluation against business constraints]
- Product design alternates between divergent exploration (generating many alternative ways to solve a problem) and convergent selection (narrowing options against technical and economic constraints).
- During divergent exploration, product teams use generative models to brainstorm alternative user flows, interface layouts, and onboarding sequences from a problem statement.
- During specification drafting, language models help translate rough design notes into structured Product Requirements Documents (PRDs), user stories, and edge-case checklists.
- A common failure mode is specification bloat: using a language model to expand three vague bullet points into a twenty-page document that nobody reads carefully.
- High-quality AI-assisted specifications remain concise, focusing on explicit acceptance criteria, data schemas, and measurable success metrics.

## Validating Product Hypotheses Before Full Engineering Build [exercise]
[figure: four-part product risk matrix mapping value, usability, feasibility, and viability risks to rapid AI-assisted validation experiments]
- Product management frameworks evaluate every proposed feature across four distinct risks: value risk, usability risk, feasibility risk, and business viability risk.
- Value risk asks whether customers truly want the capability, while usability risk asks whether users can understand and navigate the interface without confusion.
- Feasibility risk asks whether the system can be built reliably within technical constraints, and viability risk asks whether it complies with legal, financial, and brand rules.
- Generative tools dramatically lower the cost of testing usability and technical feasibility by allowing teams to build interactive prototypes in hours rather than weeks.
- However, fast prototyping does not eliminate value or viability risk: only real user behavior and unit-economics analysis can confirm whether a product should be scaled.

## Part 2: Vibe Coding and Natural-Language Prototyping [no-exercise]
- Natural-language coding environments allow users to create working software applications by describing what they want in plain English.
- Understanding both the speed of natural-language prototyping and its structural limits is essential for product managers and business leaders.

## What Is Vibe Coding? [exercise]
[figure: comparison of traditional software engineering (human writes and inspects source code directly) versus vibe coding (creator steers application behavior through natural-language prompts and live preview feedback)]
- Vibe coding is the practice of building functional software by prompting a language model in natural language and evaluating the running application visually, without manually reading or editing the underlying code.
- In a vibe-coding workflow, the creator describes a desired screen or calculation, runs the generated program, pastes any error message back into the model, and iterates until the interface works.
- This approach empowers non-engineers, including product managers, marketers, and financial analysts, to turn abstract ideas into working interactive tools in a single afternoon.
- Vibe coding differs fundamentally from AI-assisted software engineering, in which professional developers use models to speed up typing and refactoring while inspecting and owning every line of source code.
- Treating vibe coding and production software engineering as interchangeable is one of the most common organizational errors in enterprise AI adoption.

## Interactive Prototypes Versus Static Wireframes [no-exercise]
[figure: side-by-side comparison of a static slide mockup and an interactive functional prototype responding to live user inputs and sample records]
- Historically, product managers communicated feature ideas using written documents and static wireframes, which are flat drawings of screens that cannot process real inputs.
- Static wireframes frequently hide interaction problems, awkward multi-step transitions, and edge cases in data formatting until engineers are weeks into construction.
- Natural-language coding tools allow product teams to bring functional prototypes to stakeholder reviews and customer usability sessions instead of static drawings.
- When test users interact with a live prototype populated with realistic sample data, they give concrete feedback on workflow friction that they could never spot on a slide.
- Iterating on a disposable prototype in hours prevents the far greater expense of rewriting production engineering code after launch.

## The Prototype-to-Production Trap [no-exercise]
- A working prototype built in three hours often creates an illusion for executives that the finished enterprise software is 90 percent complete.
- In reality, a prototype demonstrates only the happy path for a single user operating on clean sample data under ideal conditions.
- Production enterprise software requires capabilities that remain invisible in a demo: identity authentication, role-based access control, encryption, audit logging, database concurrency, and automated error recovery.
- A vibe-coded application may appear polished on screen while storing passwords in plain text, exposing customer records across accounts, or crashing when ten users click simultaneously.
- Moving from a validated prototype to a production system requires a deliberate engineering phase that establishes architecture, security boundaries, and automated verification.

## Part 3: Agentic Software Engineering Workflows [no-exercise]
- Inside professional engineering organizations, AI tools have progressed from simple line-by-line code completion to autonomous agents that operate across entire software repositories.
- Agentic software engineering pairs language models with deterministic developer tools, including compilers, linters, and test runners, in a closed verification loop.

## From Autocomplete Copilots to Autonomous Coding Agents [exercise]
[figure: three-stage evolution of AI coding tools from single-line autocomplete to conversational sidebar chat and autonomous repository agents running edit-compile-test loops]
- First-generation coding assistants operated as inline autocomplete tools, predicting the next few tokens or lines inside the single file a developer had open.
- Second-generation assistants added conversational chat, allowing developers to paste an error message or function and receive an explanation or code snippet in reply.
- Third-generation tools operate as autonomous coding agents that can search an entire codebase, plan changes across multiple files, execute terminal commands, and inspect test results.
- When assigned a bug report or feature specification, a coding agent reads the relevant modules, edits the code, runs the test suite, reads any failure output, and iterates until all checks pass.
- Software engineering is uniquely suited to agentic loops because compilers and test suites provide fast, unambiguous ground-truth feedback at every step.

## Automated Testing, Verification Loops, and Continuous Refactoring [no-exercise]
[figure: closed-loop agentic coding pipeline where proposed code edits must pass static type checking, unit tests, integration tests, and human pull-request review]
- An autonomous coding agent is only as trustworthy as the automated verification harness that evaluates its work.
- Unit tests verify that individual functions return the exact expected output for both typical inputs and boundary edge cases, such as zero balances or missing fields.
- Integration tests verify that separate modules, databases, and external APIs communicate properly across a complete user workflow.
- Without strong automated tests, an agent instructed to fix a bug may silence the error message by deleting a required validation check, breaking downstream business logic.
- When backed by a comprehensive test suite, coding agents excel at continuous refactoring: modernizing legacy frameworks, updating API versions, and cleaning up duplicated code across hundreds of files.

## Spec-Driven Development and Human Code Review [no-exercise]
- As coding agents take over routine implementation, the daily craft of software engineering shifts toward specification-driven development and architectural review.
- Before launching an agent on a task, the engineer writes a precise technical specification defining the target behavior, data structures, module interfaces, and test cases to satisfy.
- Breaking a large project into small, well-specified tasks prevents the agent from drifting across architectural boundaries or making incompatible design assumptions.
- Every pull request generated by an agent still requires human code review before merging into the main production branch.
- Human reviewers focus on high-level concerns that automated syntax checks cannot judge: alignment with business rules, data privacy compliance, and long-term system simplicity.

## Discussion: Evaluating a Vibe-Coded Customer Portal at a Logistics Firm
- Discussion: An operations manager at a regional freight brokerage uses a natural-language coding platform over a weekend to build a web portal where customers can type their account number, view unpaid freight invoices, and submit delivery address changes. Impressed by the live demo on Monday morning, the Vice President of Sales asks the IT department to publish the portal on the company website by Friday. What specific security, data-integrity, and operational risks are hidden behind this working demo, and how should leadership structure the transition from this prototype to a production system?

## Part 4: Managing Technical Debt, Security, and Verification [no-exercise]
- While AI coding tools increase the volume of code produced per developer, uncurated machine generation can rapidly accumulate technical debt and security vulnerabilities.
- Engineering leaders must measure long-term maintenance health and enforce automated security guardrails across the software supply chain.

## Technical Debt and Codebase Comprehension [exercise]
[figure: engineering velocity trajectories comparing disciplined refactored AI development against unreviewed code generation that accumulates technical and comprehension debt]
- Technical debt is the future rework cost and development slowdown incurred when a team chooses a quick, messy software implementation instead of a clean modular design.
- Generative AI changes how technical debt accumulates: because generating new lines of code is nearly effortless, unguided models frequently copy and paste similar blocks of code rather than reusing shared functions.
- Codebase bloat increases maintenance cost because a future change to a business rule, such as a tax calculation, must be found and updated in twelve places instead of one.
- A related hazard is comprehension debt, which arises when a team merges thousands of lines of machine-generated code that no human engineer on the team fully understands.
- When a critical system fails in production, comprehension debt increases outage duration because engineers must decipher unfamiliar machine-written logic under time pressure.

## Security Vulnerabilities in Machine-Generated Code [exercise]
[figure: software security threat diagram illustrating injection vulnerabilities, hardcoded secrets, broken access control, and hallucinated package dependencies in generated code]
- Language models are trained on vast public code repositories that contain decades of insecure coding habits, deprecated cryptography, and unpatched vulnerabilities.
- Unless explicitly constrained, coding models frequently reproduce classic security flaws, including SQL injection (building database queries directly from unvalidated user text) and missing authorization checks.
- Models and novice builders also accidentally embed sensitive API keys or database credentials directly inside client-side code where any web browser user can inspect them.
- A vulnerability unique to generative AI is package hallucination: a model may import a plausible-sounding open-source library name that does not actually exist.
- Attackers exploit this pattern through slopsquatting, registering commonly hallucinated package names on public registries and filling them with malware that runs as soon as a developer installs the suggested dependency.

## Automated Guardrails, Static Analysis, and Sandboxed Execution [no-exercise]
[figure: continuous integration security pipeline gating machine-generated code with static vulnerability scanning, secret detection, dependency allowlists, and sandboxed execution]
- Organizations manage the risks of machine-generated software by embedding deterministic security checks into their continuous integration and continuous deployment (CI/CD) pipelines.
- Static application security testing (SAST) tools automatically scan every proposed code change for insecure patterns, type errors, and hardcoded secret keys before a human even reviews it.
- Software composition analysis and internal package allowlists block developers and agents from installing unverified third-party libraries or hallucinated packages.
- Furthermore, autonomous coding agents that execute shell commands and tests must run inside isolated sandboxes, which are restricted virtual containers with no access to production databases or live customer networks.
- Combining agentic speed with strict, non-negotiable automated gates allows teams to ship faster without lowering enterprise security standards.

## Part 5: Organizational Shifts Between Business Units, Product, and IT [no-exercise]
- When employees outside engineering can generate working scripts, dashboards, and applications in natural language, traditional boundaries between business units and IT change.
- Capturing the speed of decentralized building without creating an ungovernable sprawl of insecure apps requires a tiered organizational model.

## Citizen Development and the Rise of Domain Builders [no-exercise]
[figure: organizational workflow comparing traditional multi-month IT backlog handoffs with domain experts building local tools inside an IT-governed sandbox]
- Citizen development occurs when non-engineering domain experts in finance, marketing, operations, or human resources build software tools and automations to solve local workflow problems.
- In traditional enterprises, requests for small internal utilities, such as a custom commission calculator or a vendor onboarding tracker, waited months or years in central IT backlogs.
- Domain experts possess deep knowledge of business rules and edge cases, whereas central software engineers often spend weeks learning the domain before writing a single line of code.
- Natural-language coding tools allow domain experts to build and refine local utilities directly, eliminating translation errors between business requirements and software implementation.
- However, without clear platform boundaries, decentralized building can produce hundreds of undocumented shadow applications that break when their creator changes roles.

## Tiered Governance: Disposable Tools Versus Core Systems [exercise]
[figure: three-tier enterprise software governance pyramid matching review, security, and engineering rigor to application scope and data sensitivity]
- Enterprise governance fails when it applies the same heavy approval process to a one-off spreadsheet script as it does to the core customer billing system.
- A risk-tiered governance framework classifies software into three distinct tiers based on user scope, data sensitivity, and operational criticality.
- Tier 1 covers personal and small-team utilities operating on non-sensitive or synthetic data, such as a local formatting script or an interactive UI prototype, which domain builders can create freely inside approved sandboxes.
- Tier 2 covers shared departmental tools and internal dashboards, which must run on IT-managed hosting with single sign-on authentication, role-based data permissions, and peer review.
- Tier 3 covers customer-facing products, financial transaction systems, and regulated decision pipelines, which require full professional software engineering, security audits, and formal change control.

## Redefining the Product, Engineering, and IT Partnership [no-exercise]
- Low-barrier software creation causes adjacent roles in product development to overlap more closely while making core engineering expertise even more valuable.
- Product managers and designers increasingly build functional prototypes to validate user workflows directly, reducing reliance on engineering capacity for early experiments.
- Professional software engineers spend less time writing routine form-handling code and more time designing resilient system architectures, shared APIs, automated test harnesses, and data pipelines.
- Central IT evolves from a bottleneck that manually builds every internal form into an enablement platform that provides secure templates, governed data connectors, and sandboxed hosting for business units.
- Explicit graduation rules specify when a successful Tier 1 or Tier 2 business-built tool has become mission-critical and must be refactored and adopted by the professional engineering team.

## Discussion: Governing Decentralized Software Creation at a Wealth Management Firm
- Discussion: At a mid-sized wealth management firm, several financial advisors and operations analysts have used natural-language coding tools to build custom internal web apps that pull client portfolio holdings, compute tax-loss harvesting scenarios, and generate client report PDFs. Central IT discovers these applications only after an advisor accidentally shares a public URL that exposes another client's account balances. Why would an outright ban on AI coding tools backfire, and how should the Chief Information Officer design a three-tier governance framework and sandboxed platform that preserves advisor innovation while protecting client privacy and calculation accuracy?

## Key Takeaways
- Generative AI lowers the cost and time of writing code, shifting the primary bottleneck in software delivery upstream to problem specification and downstream to verification.
- In product discovery, language models synthesize unstructured customer feedback with source citations and accelerate divergent concept exploration and interactive prototyping.
- Vibe coding enables non-engineers to build functional prototypes in hours to test usability, but a working prototype lacks the security, concurrency, and reliability required for production deployment.
- Agentic software engineering pairs language models with compilers, type checkers, and automated unit and integration tests in a closed loop, elevating the engineer's role to architecture and spec-driven review.
- Unchecked machine code generation accelerates code duplication, comprehension debt, security vulnerabilities, and hallucinated package risks, requiring automated static analysis and sandboxed execution.
- Organizations balance speed and safety through a three-tier governance model that empowers domain experts to build local tools in IT-managed sandboxes while reserving core systems for professional engineering rigor.
