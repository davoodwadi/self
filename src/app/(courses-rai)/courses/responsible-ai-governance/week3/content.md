---
topic: Cultural Bias and Representation in Language Models
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week3
---

## Title Slide
- Week 3
- Foundation models inherit the linguistic, cultural, and geopolitical asymmetries of their training corpora and post-training alignment, shaping how global brands and consumers are represented.

## Culture Inside Foundation Models [no-exercise]
[figure: one foundation model projecting the same Western dinner setting into generated content for Japan, India, and Ethiopia]
- Large language models and multimodal generators are often deployed as universal interfaces across dozens of countries and languages.
- Yet no foundation model is culturally neutral: every model learns associations, values, and social norms from a specific mixture of texts, images, and human preference ratings.
- When a model generates advertising copy, summarizes consumer reviews, or recommends products across borders, it projects the cultural defaults encoded in its weights.
- Governing global AI deployments therefore requires measuring whose cultural norms a model treats as the default and whose norms it marginalizes, stereotypes, or penalizes.

## Why Cultural Alignment Matters for Global Marketing [no-exercise]
[figure: global standardization from headquarters, local adaptation by local teams, and cultural adaptation delegated to a foundation model whose default replaces local judgment]
- International marketing has long balanced global standardization against local adaptation to national values, rituals, and communication styles.
- When firms delegate content creation, localization, or customer assistance to a foundation model, they implicitly delegate cultural adaptation to that model's internal representations.
- A model that defaults to one culture's norms can produce campaigns that feel alien or offensive in another market, or recommend domestic brands over superior foreign alternatives.
- Cultural bias in AI is therefore both an ethical issue of fair representation and a strategic issue of market access and brand equity.

## Part 1: Training Corpora and Cultural Hegemony in Foundation Models [no-exercise]
[figure: the same dinner prompt written in English and in Japanese producing the same Western place setting, showing that translation does not change the model's culture]
- Cultural bias in foundation models originates in three structural stages: the composition of pre-training web corpora, the design of tokenizers, and the demographics of post-training alignment annotators.
- Understanding these three stages explains why translating a prompt into another language does not automatically make a model reflect the culture of that language.

## How Pre-Training Corpora Shape Default Worldviews [no-exercise]
[figure: interactive comparison of the share of web text written in English and other high-resource languages with the share of the world's population who speak those languages natively]
- Foundation models are pre-trained on trillions of tokens scraped from web pages, digitized books, news archives, and online forums.
- English and a small set of high-resource languages account for the vast majority of indexed web text, even though native speakers of those languages represent a minority of the world's population.
- Even within non-English corpora, a large fraction of web text consists of translations from English or content produced by urban, affluent, and digitally connected populations.
- As a result, the statistical co-occurrences learned during pre-training disproportionately reflect the institutions, consumption habits, and brand ecosystems of high-resource digital economies.

## WEIRD Alignment and Value Homogenization [no-exercise]
[figure: interactive distributions of a cultural value dimension for the global population and for a post-trained model, narrowing toward the WEIRD position as more annotators come from a single cultural group]
- Cross-cultural psychology documents that populations in Western, educated, industrialized, rich, and democratic (WEIRD) societies hold values that are statistical outliers relative to the global population, particularly on individualism and analytical reasoning.
- When administered cross-cultural value surveys such as the World Values Survey or Hofstede's cultural dimensions, major language models consistently align most closely with North American and Northern European response profiles.
- Post-training alignment through reinforcement learning from human feedback (RLHF) and constitutional instruction tuning can further narrow this value distribution when annotation rubrics are authored by a single cultural group.
- Value homogenization occurs when a model imposes the same individualist, low-context communication style across markets that rely on collectivist norms or high-context relationship building.

## Tokenization and Multilingual Disparities [no-exercise]
[figure: interactive tokenization of one sentence in English, Swahili, and Amharic, showing how many more tokens the lower-resource languages consume within a fixed context window]
- Before a language model processes text, a tokenizer segments characters and words into subword units drawn from a fixed vocabulary.
- Because vocabulary allocation is optimized on corpus frequency, dominant languages such as English are represented with compact, whole-word tokens, whereas lower-resource languages and non-Latin scripts are fragmented into many short byte or character tokens.
- A sentence in a lower-resource language can require two to four times as many tokens as the equivalent sentence in English.
- This tokenization disparity imposes three direct penalties on underrepresented linguistic markets: higher API inference costs, shorter effective context windows, and degraded reasoning accuracy.

## Tracing Cultural Bias to the Model Lifecycle [exercise]
- Pre-training corpus skew arises when web scrapes over-represent dominant languages and digitally affluent populations, starving the model of authentic local knowledge and idioms.
- Tokenization disparity arises when the subword vocabulary fragments non-dominant scripts into excessive token counts, increasing latency and inference cost per customer interaction.
- Post-training alignment bias arises when safety and helpfulness raters apply a single culture's politeness, directness, or moral norms as the universal standard for model responses.
- Deployment localization bias arises when a firm translates an English system prompt word-for-word without adapting the cultural framing or validating model behavior in the target market.

## Part 2: Representational Harms in Generative Text and Imagery [no-exercise]
- Week 2 focused on allocative harms, in which an algorithm withholds a tangible economic opportunity such as credit, employment, or a price discount.
- Generative AI systems also produce representational harms, which occur when a system demeans, stereotypes, or erases social and cultural groups in the text, audio, or images it generates.

## Allocative Versus Representational Harms [exercise]
[figure: repeated demeaning portrayals of a group in generated images feeding over time into a decision that denies that group an opportunity]
- An allocative harm occurs when an automated system distributes resources, prices, or eligibility unequally across groups, such as denying a mortgage or hiding a job advertisement.
- A representational harm occurs when a system reinforces derogatory stereotypes, subordinates a cultural identity, or renders a group invisible in cultural and commercial depictions, even if no immediate transaction is denied.
- In marketing, representational harms shape brand associations and social norms over time, and they frequently feed back into allocative harms when biased representations influence hiring, lending, or purchasing decisions.

## Stereotyping, Erasure, and Markedness [no-exercise]
[figure: generated images that cast one group as executives and another as service workers, that replace local dishes with a single default, and that treat a culture as unmarked unless named in the prompt]
- Stereotyping occurs when a generative model associates occupations, income levels, or consumption roles with specific genders, ethnicities, or nationalities, such as depicting executives as men from Western countries and service workers as women from developing economies.
- Cultural erasure occurs when a model omits entire subcultures, dialects, religious practices, or regional traditions from its generated depictions of everyday life.
- Markedness occurs when a model treats one demographic identity as the unstated, normal default while treating all other identities as exceptions that must be explicitly specified in the prompt.
- For example, when prompted to generate an image of "a family eating dinner" or "a bride at a wedding," an unguided image generator routinely defaults to Western attire, architecture, and cuisine unless regional qualifiers are added.

## Sentiment and Portrayal Disparities in Generative Marketing Content [exercise]
- Occupational and status association disparity occurs when prompts naming different demographic groups yield systematically different socioeconomic settings, product tiers, or authority roles.
- Sentiment and tone disparity occurs when descriptions generated for minority dialects, accents, or cultural groups carry more negative sentiment or lower warmth and competence ratings than descriptions for majority groups.
- Exoticization and caricature occur when adding a cultural or national qualifier to a prompt causes the model to replace modern everyday settings with stereotypical historical or folkloric tropes.
- Brand-persona mismatch occurs when an AI copywriting tool flattens distinct subcultural voices into a uniform corporate register that alienates the community the campaign intends to reach.

## Discussion: The Global Campaign Generator
- A multinational beverage brand uses a text-to-image and copywriting model to localize a holiday campaign across twenty countries by inserting each country's name into a standard prompt template. In several markets, local teams report that the generated visuals depict outdated folkloric stereotypes while the copy uses individualist slogans that clash with local family holiday rituals.
- Which mechanisms in the model lifecycle explain this outcome, and how should the brand redesign its localization workflow?

## Part 3: Consumer Ethnocentrism and In-Group Bias in Large Language Models [no-exercise]
- Beyond visual and linguistic stereotypes, foundation models encode latent attitudes toward nations and their products that directly affect cross-border commerce.
- To govern AI in international markets, researchers draw on the consumer behavior construct of consumer ethnocentrism and measure it systematically in language models.

## Country-of-Origin Effects and Consumer Ethnocentrism [no-exercise]
[figure: a consumer choosing a domestic product over a better-rated and cheaper imported one, beside the 17-item CETSCALE questionnaire on a 1-to-7 scale]
- The country-of-origin effect is the influence that a product's country of manufacture or brand origin exerts on a buyer's perception of quality, trust, and willingness to pay.
- Consumer ethnocentrism, introduced by Shimp and Sharma (1987), is the normative belief that purchasing domestic products is morally right and patriotic, whereas purchasing foreign-made products harms the domestic economy and is wrong.
- Highly ethnocentric consumers evaluate domestic goods favorably and reject imported alternatives even when the imports offer superior objective quality or lower prices.
- In human consumer research, ethnocentrism is measured with the 17-item CETSCALE, which asks respondents to rate their agreement on a 1-to-7 Likert scale with statements about buying domestic versus foreign goods.

## Measuring LLM Ethnocentrism With the CETSCALE [no-exercise]
[figure: interactive comparison of a model's exact next-token probability distribution over the 1-to-7 scale for one CETSCALE item with a handful of sampled single completions]
- As foundation models are developed in different geopolitical jurisdictions, including the United States, China, Canada, and the European Union, enterprises and regulators ask whether models exhibit national in-group favoritism.
- Evaluating this question through isolated anecdotal prompts cannot separate a model's baseline tendency on rating scales from its specific attitude toward a given target country.
- Wadi, Ghodrat, and Philp (2026) administered the 17-item CETSCALE across a fully crossed factorial experiment crossing foundation models from the United States, China, Canada, and France against each of those four target countries.
- Rather than relying on single text completions, the study extracted the exact next-token probability distributions over the 1-to-7 scale options to quantify task adherence, ordinal consensus, and factor effect sizes without sampling error.

## Baseline Ethnocentrism and Asymmetric In-Group Favoritism in LLMs [exercise]
[figure: interactive chart of five language models' expected CETSCALE scores by target country against the range of recorded human populations (Wadi, Ghodrat, & Philp, 2026)]
- Calibrated against large-scale human survey benchmarks, most evaluated language models score near the extreme ethnocentric end of recorded human populations rather than at a neutral midpoint (Wadi, Ghodrat, & Philp, 2026).
- Models differ substantially in their overall main effect: some models, such as Aya Expanse 32B, exhibit high baseline ethnocentrism across all conditions, whereas others, such as Qwen3 80B, score near the least ethnocentric human populations.
- Across all evaluated models, a strong target-country main effect emerges: models express the lowest ethnocentrism (lowest protectionist endorsement) when the target country is China and significantly higher ethnocentrism when the target country is the United States or Canada.
- The interaction between model country of origin and target country is asymmetric: North American models exhibit pronounced in-group favoritism toward North American target countries and aversion toward China, whereas the Chinese model does not display a reciprocal in-group bias of comparable magnitude.

## Part 4: Country-of-Origin Bias in AI Product Recommendations [no-exercise]
- Latent national attitudes inside a language model become an operational governance risk when the model acts as a conversational search engine, procurement assistant, or consumer shopping agent.
- Separating the statistical sources of country-of-origin bias is essential for diagnosing why a brand is favored or penalized in AI-generated recommendations.

## Separating Model Main Effects, Target Effects, and Origin Interactions [exercise]
[figure: interactive two-factor decomposition of each model and target country cell into the grand mean, the model main effect, the target-country main effect, and the interaction (Wadi, Ghodrat, & Philp, 2026)]
- In a fully crossed two-factor audit of model origin and target country, the grand mean captures the overall baseline level of the attitude across all models and target countries combined.
- The model main effect captures how much a specific model's average score across all target countries deviates from the grand mean, reflecting the model's general disposition or scale calibration.
- The target-country main effect captures how much a specific country is favored or penalized on average across all models, reflecting shared patterns in global pre-training corpora.
- The interaction effect isolates true country-of-origin bias: the additional shift that occurs for a specific pairing of model origin and target country beyond what the model main effect and target-country main effect predict alone.

## How Origin Bias Distorts AI-Mediated Brand Consideration Sets [no-exercise]
[figure: interactive shortlist of laptop brands from six countries with identical ratings, where the three brands an assistant shortlists change with the region in which the assistant's model was developed]
- When a consumer asks an AI assistant for a product shortlist, the assistant constructs a consideration set from its internal brand associations and retrieved catalog data.
- Corpus-wide target-country effects can cause models from multiple providers to systematically under-recommend brands associated with penalized countries of origin, even when objective specifications and ratings are matched.
- Model-by-country interaction effects mean that a multinational brand's visibility and sentiment can shift depending on whether the consumer uses a North American, European, or Asian foundation model.
- Unlike human consumers who are aware of their own national preferences, consumers who delegate search to an AI assistant rarely suspect that the assistant is applying an unstated country-of-origin filter on their behalf.

## Implicit Origin Cues in Brand Names and Storefronts [no-exercise]
[figure: interactive supplier listing with no country label, where adding the brand name, founder name, domain, currency, and headquarters raises the probability that the model infers the supplier's country of origin]
- A model does not require an explicit "Made in [Country]" attribute label to activate country-of-origin biases during product evaluation.
- Phonetic and orthographic cues in brand names, founder names, domain extensions, currency symbols, and headquarters locations allow language models to infer national origin directly from unstructured product descriptions.
- In B2B procurement and marketplace ranking, implicit origin cues can trigger lower quality inferences or heightened risk warnings for suppliers from underrepresented or geopolitically rival regions.

## Part 5: Auditing and Mitigating Cultural Bias in Global Deployments [no-exercise]
- Because cultural and country-of-origin biases are embedded in pre-training weights and post-training alignment, simple disclaimers or ad-hoc prompt edits rarely resolve them completely.
- Organizations deploying AI across global markets combine multi-layer mitigation with factorial distributional audits.

## Why Surface Prompting Fails to Eliminate Latent Cultural Bias [no-exercise]
[figure: interactive guardrails showing that a neutrality instruction removes explicit statements of bias while a latent preference still decides tie-breaks, and an aggressive safety filter refuses benign culturally specific requests]
- Instructing a model in the system prompt to "be culturally neutral" or "treat all countries equally" addresses only explicit surface expressions of bias.
- Under realistic decision tasks, where the model must rank competing products or allocate scarce slots in a shortlist, latent probability shifts continue to govern which alternative wins the tie-break.
- Moreover, overly aggressive safety filters trained to suppress mentions of nationality or ethnicity can backfire by causing cultural erasure, refusing benign requests that name minority communities or non-Western traditions.

## Mitigation Strategies Across the Deployment Stack [exercise]
- Corpus and multilingual curation balances pre-training and fine-tuning data with authentic, locally authored texts across target languages and cultural regions rather than relying on machine-translated English text.
- Cross-cultural alignment and pluralistic RLHF recruit diverse annotator pools and replace a single cultural rubric with pluralistic alignment that adapts to the norms of the user's jurisdiction.
- Attribute blinding and counterfactual prompt normalization strip non-essential national or demographic cues from structured comparison tables when an enterprise procurement agent evaluates supplier bids.
- Post-deployment distributional calibration measures the model's baseline target-country main effects and interaction shifts on validated scales so downstream ranking pipelines can correct for known origin penalties.

## Auditing Global Brand Visibility Across Multilingual Models [exercise]
- Step 1 is constructing a fully crossed factorial grid that pairs the foundation models used in the target markets with the relevant target countries, languages, and product categories.
- Step 2 is administering validated cross-cultural instruments, such as adapted CETSCALE items and controlled product-comparison vignettes with randomized origin labels.
- Step 3 is checking the constraint and consensus layers first, verifying that each model adheres to the task format and exhibits stable internal agreement rather than random noise.
- Step 4 is decomposing the resulting score distributions into grand mean, model main effects, target-country main effects, and model-by-country interactions to isolate where bias originates.
- Step 5 is testing mitigation interventions, such as origin-blinded attribute tables or localized fine-tuning, and re-running the factorial audit before market launch.

## Discussion: Cross-Border Shopping Assistants
- An electronics manufacturer based in South Korea discovers that when North American shoppers ask a leading US-developed conversational assistant for laptop recommendations under 1,200 dollars, its laptops are recommended 40 percent less often than US-branded laptops with identical specifications and user ratings.
- How would you design a factorial audit to determine whether this gap is driven by brand awareness, a corpus-wide target-country effect, or an in-group interaction bias in the assistant, and what remedies could the manufacturer or platform pursue?

## Key Takeaways
- Foundation models are not culturally neutral. Pre-training web scrapes, subword tokenizers, and post-training RLHF raters embed dominant linguistic and WEIRD cultural defaults.
- Tokenization fragmentation penalizes non-dominant languages and scripts with higher inference costs, shorter effective context windows, and lower task accuracy.
- Generative AI systems produce representational harms through stereotyping, cultural erasure, markedness defaults, and sentiment disparities across demographic groups.
- Administering the CETSCALE via exact token-level probability distributions reveals that most language models score near the extreme ethnocentric end of human benchmarks (Wadi, Ghodrat, & Philp, 2026).
- Decomposing cultural bias requires a fully crossed factorial design that separates the grand mean, the model main effect, the target-country main effect, and the model-by-country interaction.
- Empirical audits show strong target-country disparities and asymmetric in-group favoritism, which can silently distort the consideration sets that AI shopping agents assemble for global consumers.
- Governing global AI deployments requires validating constraint adherence and ordinal consensus, auditing across multiple regional models, and combining pluralistic alignment with counterfactual origin testing.
