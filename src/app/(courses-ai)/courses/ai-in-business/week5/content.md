---
topic: "AI in Human Resources"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week5"
---

## Title Slide
- Week 5
- Artificial intelligence in human resources can improve talent matching and augment worker productivity, but requires careful job redesign, bias auditing, and clear boundaries on employee monitoring.

## People Analytics and High-Stakes Employment Decisions [no-exercise]
- Human resources decisions, including hiring, promotion, compensation, and retention, directly determine an organization's capabilities and an individual's livelihood.
- People analytics applies statistical and machine learning models to workforce data to improve talent decisions and organizational design.
- Modeling employee behavior is harder than modeling consumer clicks or payment transactions because sample sizes inside a single firm are much smaller.
- Employment outcomes also take months or years to observe, and performance outcomes are missing entirely for job applicants who were rejected.
- Because hiring and evaluation decisions carry high legal and ethical stakes, algorithms in human resources require strict human oversight and validation.

## Construct Validity and Target Labels in HR Modeling [exercise]
[figure: gap between the true managerial construct of employee effectiveness and noisy historical proxy labels such as supervisor ratings, tenure, or past hiring choices]
- Construct validity measures how accurately an observed data label captures the underlying concept that management actually cares about, such as job performance.
- In many roles, true contribution includes team mentorship, problem prevention, and client trust, which are not fully captured by a single numerical metric.
- When data scientists train a model using annual supervisor ratings or past hiring decisions as the target label, the model learns to predict subjective human judgments.
- If historical promotions favored employees who worked in the headquarters office or belonged to a majority demographic, a supervised model will treat those traits as predictors of merit.
- Every people-analytics project must therefore audit the target variable for measurement bias before evaluating predictive accuracy.

## Part 1: Automated Talent Acquisition and Candidate Matching [no-exercise]
- Large employers frequently receive hundreds or thousands of applications for a single job posting, far exceeding what human recruiters can read line by line.
- Natural language processing and semantic embeddings help recruiting teams match candidate capabilities to job requirements while avoiding brittle keyword filters.

## From Keyword Filters to Semantic Skill Matching [exercise]
[figure: comparison of brittle boolean keyword filtering in an applicant tracking system versus embedding-based skill taxonomy matching between resumes and job requirements]
- Early applicant tracking systems relied on exact keyword matching, automatically rejecting qualified candidates whose resumes used different terminology than the job posting.
- Semantic skill matching uses text embeddings and a structured skills taxonomy to represent how roles, tools, and competencies relate to one another.
- A skills taxonomy is a structured knowledge graph that connects job titles, tasks, and adjacent skills, recognizing that experience in financial auditing transfers to compliance analysis.
- Language models extract structured work history, verified credentials, and demonstrated project outcomes from varied resume formats into a common schema.
- Well-designed screening systems use semantic matching to surface overlooked candidates for human review rather than automatically issuing final rejections.

## Structured Interview Analysis and Assessment Tools [no-exercise]
[figure: structured interview evaluation workflow where standardized rubric questions are transcribed and scored against job-specific competencies]
- Decades of organizational psychology research show that unstructured interviews, where each interviewer asks improvised questions, are poor predictors of future job performance.
- A structured interview asks every candidate the same job-related questions and scores responses against a predefined behavioral rubric.
- Language models support structured interviewing by generating competency-based questions from job analyses, transcribing conversations, and organizing candidate answers by rubric criterion.
- By contrast, automated video interview tools that score candidates on facial expressions, vocal pitch, or eye contact lack scientific validity and should not be used.
- Emotion-recognition and vocal-tone algorithms penalize candidates with disabilities, speech differences, or non-native accents while measuring traits unrelated to job capability.

## Generative AI on Both Sides of the Hiring Funnel [no-exercise]
- Generative AI operates on both sides of the labor market: employers use models to screen applications, while candidates use models to tailor resumes and cover letters.
- Because applicants can generate customized applications in seconds, the average number of applications submitted per open role has risen sharply across industries.
- This two-sided automation reduces the diagnostic signal of polished cover letters, generic take-home essays, and unproctored online questionnaires.
- When screening algorithms evaluate machine-generated resumes, the hiring funnel risks degenerating into a filter comparing one language model's output against another's prompt.
- Employers increasingly restore signal quality by emphasizing verified credentials, live problem-solving simulations, and structured discussions of past work.

## Part 2: Workforce Analytics, Attrition, and Internal Mobility [no-exercise]
- Once employees join an organization, people analytics shifts toward retaining key talent, identifying skill gaps, and supporting internal career mobility.
- Predictive models and network analysis help leadership diagnose structural causes of turnover and burnout before valuable teams dissolve.

## Predicting Voluntary Attrition and Regrettable Turnover [no-exercise]
[figure: attrition risk analysis separating voluntary regrettable turnover from routine exits and linking risk drivers to pay equity, promotion lag, and manager changes]
- Voluntary attrition occurs when an employee chooses to leave the firm, whereas regrettable turnover refers specifically to the loss of high-performing or critical-skill workers.
- Replacing a skilled professional typically costs between 50 percent and 200 percent of their annual salary in recruiting fees, onboarding time, and lost institutional knowledge.
- Supervised attrition models estimate turnover probability from features such as time since last promotion, pay relative to market benchmarks, commute distance, and manager turnover.
- Predictive attrition scores are most effective when aggregated at the team or department level to fix systemic issues such as uncompetitive pay bands or chronic overtime.
- Using individual flight-risk scores to withhold training or promotions from flagged employees is unethical and creates a self-fulfilling prophecy that accelerates their departure.

## Internal Talent Marketplaces and Skill Adjacency [exercise]
[figure: internal skill graph mapping an employee's current capabilities to adjacent target roles and the specific training modules needed to bridge the gap]
- External hiring is slow and expensive, yet large organizations often lay off workers in one division while recruiting externally for similar skills in another.
- An internal talent marketplace is an AI-enabled platform that matches current employees to open internal roles, cross-functional projects, and training pathways.
- Skill adjacency measures how closely a worker's existing capabilities align with the requirements of a new role, identifying the specific gap that training must bridge.
- For example, a customer support specialist with strong product knowledge and SQL familiarity is closely adjacent to a junior product operations or business analyst role.
- Internal mobility systems improve retention by giving employees transparent career progression while lowering the firm's external recruitment and onboarding costs.

## Organizational Network Analysis and Collaboration Patterns [no-exercise]
[figure: organizational communication graph contrasting the formal reporting hierarchy with the informal collaboration network where an overloaded central node bridges three teams]
- An organization's formal reporting chart rarely reflects how information, advice, and coordination actually flow across departments in daily work.
- Organizational network analysis (ONA) maps informal collaboration patterns using aggregated, privacy-preserving metadata from calendars, project repositories, and team communication channels.
- Network graphs identify central connectors who bridge separate business units, peripheral employees who may be isolated during remote onboarding, and siloed teams that rarely coordinate.
- In many firms, a small fraction of employees field the majority of technical and operational questions, placing them at high risk of exhaustion and burnout.
- Leaders use ONA to redistribute mentoring loads, redesign cross-functional workflows, and preserve key institutional relationships during reorganizations.

## Part 3: Job Redesign: Task Automation Versus Skill Augmentation [no-exercise]
- Evaluating how artificial intelligence affects the workforce requires looking inside occupations rather than treating a job title as a single indivisible unit.
- Separating routine task automation from human skill augmentation allows managers to redesign roles for higher productivity without hollowing out organizational expertise.

## Unbundling Jobs into Tasks: Automation Versus Augmentation [exercise]
[figure: task-level decomposition of a professional role sorting subtasks by required human judgment and error consequences into automation, augmentation, and human-led work]
- In labor economics, every occupation is a bundle of distinct tasks that vary in their reliance on codifiable rules, interpersonal empathy, and contextual judgment.
- Task automation occurs when software replaces human labor on a specific subtask, such as transcribing meeting audio, categorizing expense receipts, or formatting routine reports.
- Skill augmentation occurs when AI serves as a collaborative tool that raises the speed or quality of a human worker performing a complex task, such as financial planning or clinical triage.
- Most enterprise AI deployments automate a subset of routine tasks within a role while augmenting the remaining analytical and interpersonal responsibilities.
- Capturing the value of task automation requires actively redesigning workflows so freed employee hours are reallocated to higher-value client, creative, or strategic work.

## The Productivity Leveling Effect of Generative AI [exercise]
[figure: worker productivity distribution before and after AI assistant adoption showing large speed and quality gains for novices and smaller gains for top-decile experts]
- Field experiments across customer service, business writing, consulting, and software development reveal a consistent distributional pattern when workers adopt generative AI assistants.
- Less-experienced and lower-performing workers achieve the largest percentage gains in speed and output quality, narrowing the performance gap with senior peers.
- This leveling effect occurs because the language model has absorbed the phrasing, structure, and troubleshooting patterns of high-performing workers from historical data.
- However, researchers also observe a jagged capability frontier: tasks that appear similar in difficulty can fall on opposite sides of what a language model can solve reliably.
- On tasks outside the model's competence, workers who uncritically accept AI outputs perform worse than workers who use no AI at all, making human domain judgment essential.

## Protecting the Apprenticeship Ladder and Tacit Knowledge [no-exercise]
- Tacit knowledge is the deep practical judgment acquired through hands-on experience, error correction, and mentorship that cannot be reduced to written instructions.
- Professional fields such as law, accounting, engineering, and management consulting have historically trained novices by assigning them routine drafting, research, and verification tasks.
- If a firm automates 80 percent of entry-level analytical work and sharply cuts junior hiring, it risks severing the apprenticeship ladder that produces future senior leaders.
- Junior employees who only review polished AI drafts without ever building a financial model or contract from scratch struggle to detect subtle errors when the model fails.
- Sustainable workforce design preserves structured deliberate practice, simulation exercises, and code or document walkthroughs so early-career workers still build foundational expertise.

## Discussion: Redesigning the Junior Analyst Role at an Accounting Firm
- Discussion: A mid-sized accounting and advisory firm deploys a generative AI system that extracts figures from client financial statements and drafts initial audit memos, reducing junior associate hours on these tasks by 60 percent. Senior partners propose cutting entry-level campus hiring by half next year to boost short-term profit per partner. What risks does this proposal pose to the firm's senior talent pipeline over a five-year horizon, and how should the firm redesign junior associate responsibilities, training, and client engagement instead?

## Part 4: Auditing HR Algorithms for Disparate Impact [no-exercise]
- Because employment algorithms influence who is interviewed, hired, and promoted, they are subject to civil rights statutes and emerging algorithmic accountability laws.
- Human resources leaders must understand how historical inequities enter training data and how to audit selection tools quantitatively before and after deployment.

## How Historical Bias Enters Hiring Models [no-exercise]
[figure: biased feedback loop showing how under-representation in historical engineering hires causes a resume model to penalize women's colleges and professional associations]
- A supervised hiring algorithm learns patterns from whatever historical dataset it is given, treating past organizational decisions as the definition of a good candidate.
- In a widely studied industry case, a large technology company trained an experimental resume-scoring model on ten years of resumes submitted to the firm.
- Because the historical applicant pool in technical roles was predominantly male, the model learned to downgrade resumes that included the word "women's" or listed all-women colleges.
- Removing explicit demographic fields such as gender, race, or age from the input table does not prevent bias when correlated proxy variables remain in the text.
- Extracurricular organizations, zip codes, universities attended, and career breaks for caregiving can all reconstruct protected group membership inside a high-dimensional model.

## Adverse Impact and the Four-Fifths Rule [exercise]
[figure: bar chart comparing applicant selection rates across demographic groups against the 80 percent four-fifths adverse-impact threshold]
- Employment regulators evaluate whether a screening test or algorithm produces disparate impact by comparing selection rates across demographic groups.
- The selection rate (or pass-through rate) for a group is the number of applicants selected divided by the total number of applicants from that group who were evaluated.
- Under the Uniform Guidelines on Employee Selection Procedures in the United States, a widely used benchmark for detecting adverse impact is the four-fifths (80 percent) rule.
- Adverse impact is indicated if the selection rate for any protected race, sex, or ethnic group is less than 80 percent (four-fifths) of the rate for the group with the highest selection rate.
- For example, if an automated assessment passes 40 percent of male applicants ($40 / 100$), the four-fifths threshold is $0.80 \times 40\% = 32\%$, so a 25 percent pass rate for female applicants triggers a legal and statistical audit.

## Job Relatedness, Validation, and Municipal AI Audit Laws [no-exercise]
- When a selection procedure violates the four-fifths rule or shows statistically significant disparities, it is unlawful unless the employer proves it is job-related and consistent with business necessity.
- Even if a test is job-related, the employer must adopt an alternative selection method with less adverse impact if a comparably valid alternative is available.
- Jurisdictions have begun enacting mandatory transparency and audit statutes specifically targeting automated employment decision tools (AEDTs).
- New York City Local Law 144 requires employers using automated hiring or promotion tools to commission an independent annual bias audit, publish summary selection ratios publicly, and notify candidates in advance.
- Under the European Union AI Act, AI systems used for recruitment, application filtering, task allocation, and performance evaluation are classified as high-risk systems subject to strict conformity, documentation, and human-oversight obligations.

## Part 5: Employee Surveillance, Trust, and Change Management [no-exercise]
- Technical accuracy and legal compliance are necessary but not sufficient for successful AI adoption inside an organization.
- How management governs workplace data collection, psychological safety, and employee participation determines whether AI tools are trusted and used effectively.

## Algorithmic Management and Workplace Surveillance Boundaries [exercise]
[figure: spectrum of workplace data collection contrasting aggregate workflow telemetry for process improvement with invasive individual surveillance such as keystroke and webcam monitoring]
- Algorithmic management refers to the use of software algorithms to allocate tasks, pace workflows, monitor worker activity, and evaluate performance with minimal human intermediation.
- While common in gig-economy dispatch and warehouse fulfillment, algorithmic monitoring has expanded into remote and office knowledge work through productivity-tracking software.
- Invasive individual surveillance, such as keystroke logging, mouse-movement tracking, continuous webcam snapshots, and private message scanning, erodes employee trust and increases turnover.
- Such monitoring also fails as a productivity measure because of Goodhart's Law: when a narrow activity proxy becomes a performance target, it ceases to be a valid measure of actual output.
- Effective people analytics establishes clear governance boundaries: collecting aggregated, anonymized workflow telemetry to remove process bottlenecks while prohibiting covert individual surveillance.

## Psychological Safety and the Threat of Shadow AI [no-exercise]
- When employees believe that adopting an AI tool will be used to justify layoffs or punitive quota increases, they either resist the tool or conceal how they use it.
- Shadow AI occurs when workers bypass corporate IT controls and paste company documents, client records, or source code into unauthorized consumer AI accounts.
- Surveys across industries consistently find that a large share of workplace AI usage occurs on personal accounts without enterprise data-privacy protections, creating severe confidentiality and compliance leaks.
- Banning generative AI outright rarely stops shadow usage, and instead drives experimentation underground where security teams cannot audit or guide it.
- Organizations reduce shadow AI by providing approved enterprise tools with contractual zero-data-retention guarantees and by assuring workers that efficiency gains will not be punished.

## Change Management and Participatory AI Adoption [no-exercise]
[figure: three-phase participatory AI adoption roadmap progressing from frontline task co-design and pilot sandboxes to role-specific training and shared productivity incentives]
- Many enterprise AI initiatives succeed in technical proof-of-concept testing but fail to generate return on investment because employees abandon the tools in daily work.
- Top-down rollouts often fail because executives select tools without understanding where frontline workers actually experience friction or where noisy AI drafts create extra editing burden.
- Participatory AI adoption involves frontline workers early in selecting target tasks, testing pilot tools against real edge cases, and defining human override procedures.
- Successful deployment pairs tool access with hands-on training in prompt formulation, output verification, and error reporting.
- When organizations share the gains of automation through reduced drudgery, skill development, and career progression, employees become active partners in continuous workflow improvement.

## Discussion: Governing an AI Productivity and Promotion Dashboard
- Discussion: A professional services firm proposes deploying an AI workforce platform that ingests employee email response times, calendar hours, internal chat sentiment, and document edits to compute a monthly "Contribution and Flight-Risk Score" for every staff member. Executive leadership wants HR to use this score to select the bottom 5 percent of employees for annual layoffs and to allocate retention bonuses. Evaluate this proposal across construct validity, legal and ethical surveillance boundaries, and Goodhart's Law, and propose a responsible alternative design.

## Key Takeaways
- People analytics operates on small samples, long time horizons, and subjective performance labels, requiring careful attention to construct validity before training predictive models.
- In talent acquisition, semantic skill taxonomies and structured interview rubrics improve candidate matching, whereas automated facial or vocal emotion scoring lacks validity and introduces bias.
- Workforce analytics creates value when attrition predictions, internal talent marketplaces, and organizational network analysis are used to improve retention, reskilling, and workload balance rather than to penalize individuals.
- Jobs are bundles of tasks: automating routine subtasks frees capacity while augmenting complex tasks narrows the productivity gap between novices and experts, provided firms protect the junior apprenticeship ladder.
- Hiring and promotion algorithms trained on historical decisions can replicate demographic inequities through proxy variables, requiring regular adverse-impact audits under the four-fifths rule and municipal AI laws.
- Sustainable AI adoption requires clear boundaries against invasive employee surveillance, approved enterprise tools that prevent shadow AI data leaks, and participatory change management that builds worker trust.
