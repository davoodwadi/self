"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { LemonsMarket, ThreeGoods, RatingRange, RatingShapes, SolicitJ, AskWhom, PayForWhat, FakeSchemes, ReviewSummary } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";
const SPLIT = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12";

export default function Week8Page() {
  return (
    <SlideDeck label="Week 8">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 8: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">Online Reviews, Reputation Management, and User-Generated Content</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Online reviews resolve quality uncertainty in digital markets, making the solicitation, incentive design, and governance of user-generated content a core lever of conversion.
        </p>
      </Slide>

      <Slide id="why-online-reviews-anchor-e-commerce-trust" border className="!py-8">
        <SlideHeading>Why Online Reviews Anchor E-Commerce Trust</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>In a physical store, a buyer can weigh a cast-iron skillet in their hand, inspect the stitching on a jacket, or test a keyboard&apos;s switches before walking to the register.</P></Ruled>
            <Ruled><P>In e-commerce, <Term>information asymmetry</Term> separates the seller, who knows the true quality of the item, from the distant buyer, who sees only marketing claims and studio photographs.</P></Ruled>
            <Ruled><P>Without a credible reputation mechanism, online marketplaces risk degenerating into Akerlof&apos;s <Term>&ldquo;market for lemons,&rdquo;</Term> in which high-quality sellers are driven out by low-quality imitators making identical promises.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><LemonsMarket /></Plate>
            <Ruled><P>Customer reviews and <Term>User-Generated Content (UGC)</Term> solve this trust deficit by supplying peer evaluations from verified buyers who have already experienced the product.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="search-experience-and-credence-goods-in-online-reviews" border className="!py-6" exercise={exercise["search-experience-and-credence-goods-in-online-reviews"]}>
        <SlideHeading className="!mb-5">Search, Experience, and Credence Goods in Online Reviews</SlideHeading>
        <div className="grid w-full gap-5">
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-3">
            <Ruled><P><Term>Search attributes</Term> are product qualities that can be verified objectively prior to purchase from a specification table, such as laptop screen resolution, hard-drive capacity, or cable length.</P></Ruled>
            <Ruled><P><Term>Experience attributes</Term> can be evaluated accurately only after purchasing and using the product, such as the comfort of a mattress, the flavor of coffee beans, or the durability of a backpack zipper.</P></Ruled>
            <Ruled><P><Term>Credence attributes</Term> cannot be easily verified by the consumer even after consumption, such as whether a vitamin capsule contains the exact milligrams printed on the label or whether a garment was sewn in a fair-labor facility.</P></Ruled>
          </div>
          <Plate className="mx-auto w-full max-w-[880px]"><ThreeGoods /></Plate>
          <Ruled><P className="!max-w-none">Online reviews exert their strongest influence on conversion for experience goods, whereas search goods rely heavily on structured specifications and credence goods require third-party certifications and regulatory audits.</P></Ruled>
        </div>
      </Slide>

      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="The Economics of Electronic Word-of-Mouth (eWOM)" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}><Term>Electronic word-of-mouth (eWOM)</Term> differs from traditional face-to-face word-of-mouth because it is persistent, searchable, quantifiable at scale, and visible to strangers worldwide.</p></Ruled>
          <Ruled><p className={BIG}>Shoppers and marketplace algorithms evaluate a product&apos;s review profile across four distinct statistical dimensions.</p></Ruled>
        </div>
      </Slide>

      <Slide id="volume-valence-variance-and-recency-of-reviews" border className="!py-6" exercise={exercise["volume-valence-variance-and-recency-of-reviews"]}>
        <SlideHeading className="!mb-5">Volume, Valence, Variance, and Recency of Reviews</SlideHeading>
        <div className="grid w-full gap-5">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
            <div className="grid content-start gap-3">
              <Ruled><P><Term>Review volume</Term> is the total count of posted reviews, which serves as a cue for product popularity and statistical reliability. A 4.7 average rating across 800 reviews carries far more persuasive weight than a 5.0 average across two reviews.</P></Ruled>
              <Ruled><P><Term>Review valence</Term> is the average numerical star rating or overall sentiment polarity (positive versus negative) expressed across reviews.</P></Ruled>
            </div>
            <Plate><RatingRange /></Plate>
          </div>
          <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
            <Plate><RatingShapes /></Plate>
            <div className="grid content-start gap-3">
              <Ruled><P><Term>Review variance</Term> (or dispersion) measures how spread out individual ratings are around the average. A 3.5 star average formed by bimodal 5-star and 1-star ratings signals a polarizing niche product that fits some buyers well and others poorly, whereas unimodal 3.5-star ratings signal mediocre quality for everyone.</P></Ruled>
              <Ruled><P><Term>Review recency</Term> tracks how fresh the latest reviews are, alerting buyers when a once-reliable product has suffered a recent manufacturing change or software bug.</P></Ruled>
            </div>
          </div>
          <Ruled><P className="!max-w-none">Paradoxically, products with a 4.6 to 4.8 star average and a few constructive critical reviews often convert better than products with a spotless 5.0 average across dozens of reviews, because shoppers suspect that a flawless profile has been censored or fabricated.</P></Ruled>
        </div>
      </Slide>

      <Slide id="the-under-provision-and-j-shaped-distribution-of-online-reviews" border className="!py-8">
        <SlideHeading>The Under-Provision and J-Shaped Distribution of Online Reviews</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Writing a thoughtful product review is a classic <Term>public good</Term>, because the reviewer expends private time and effort while future strangers capture the benefit for free.</P></Ruled>
            <Ruled><P>Because most satisfied customers move on with their lives without writing a review, organic review rates in e-commerce are typically very low, often below 1 to 3 percent of completed orders.</P></Ruled>
            <Ruled><P>Moreover, unprompted organic reviews tend to follow a bimodal <Term>J-shaped distribution</Term>, in which the vast majority of reviews are 5-star ratings from delighted fans, a secondary spike appears at 1 star from angry buyers with shipping or defect grievances, and moderate 3-star experiences go largely unreported.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><SolicitJ /></Plate>
            <Ruled><P>Proactively soliciting post-purchase reviews from all verified buyers both increases total review volume and pulls moderate, representative buyers into the sample.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Soliciting Reviews and the Interplay of Altruism and Incentives" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>To overcome low organic review rates, e-commerce firms send automated <Term>post-purchase solicitation emails</Term> asking buyers to share their experience.</p></Ruled>
          <Ruled><p className={BIG}>Designing these solicitation campaigns requires understanding why consumers contribute reviews and how financial rewards interact with intrinsic motivation.</p></Ruled>
        </div>
      </Slide>

      <Slide id="intrinsic-altruism-versus-extrinsic-financial-incentives" border className="!py-6" exercise={exercise["intrinsic-altruism-versus-extrinsic-financial-incentives"]}>
        <SlideHeading className="!mb-5">Intrinsic Altruism Versus Extrinsic Financial Incentives</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P>Consumers write online reviews for two broad sets of motives, namely <Term>intrinsic social motives</Term> (altruism, helping fellow shoppers make good choices, and supporting a deserving brand) and <Term>extrinsic economic motives</Term> (loyalty points, gift cards, discounts, or sweepstakes entries).</P></Ruled>
            <Ruled><P>Behavioral theory warns of <Term>motivation crowding out</Term>, in which introducing an explicit financial payment transforms a pro-social helping act into a low-paid commercial transaction, dampening intrinsic altruistic motivation.</P></Ruled>
            <Ruled><P>Field and experimental evidence demonstrates that the effectiveness of review solicitation depends on the interplay between altruistic messaging appeals and financial incentives rather than treating each lever in isolation (Wadi, Legoux, Fredette, &amp; Sénécal, 2026).</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><AskWhom /></Plate>
            <Ruled><P>When a solicitation message frames review writing around helping other shoppers, it activates intrinsic pro-social norms, whereas pairing mismatched financial framing with altruistic appeals can dull the marginal lift of both levers.</P></Ruled>
            <Ruled><P>Timing also governs solicitation success, because requesting a review before the parcel arrives or before an experience good has been used frustrates the buyer, whereas waiting weeks allows memory of the purchase to fade.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="The Pitfalls of Performance-Contingent Review Incentives" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Beyond offering a flat thank-you reward simply for submitting a review, some platforms and merchants experiment with <Term>performance-contingent incentives</Term> that reward reviewers more when their review is longer, includes photos, or receives &ldquo;helpful&rdquo; votes from other shoppers.</p></Ruled>
          <Ruled><p className={BIG}>While managers assume that paying for performance will raise review quality, empirical research reveals significant unintended consequences (Wadi, Fredette, Sénécal, &amp; Legoux, 2026).</p></Ruled>
        </div>
      </Slide>

      <Slide id="how-contingent-incentives-distort-review-effort-sentiment-and-credibility" border className="!py-6" exercise={exercise["how-contingent-incentives-distort-review-effort-sentiment-and-credibility"]}>
        <SlideHeading className="!mb-5">How Contingent Incentives Distort Review Effort, Sentiment, and Credibility</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Flat (non-contingent) incentives</Term> offer a modest reward merely for completing an honest review regardless of its rating or popularity, primarily increasing submission participation rates.</P></Ruled>
            <Ruled><P><Term>Performance-contingent incentives</Term> tie the payout to downstream metrics of review performance, such as word count, media attachments, or helpfulness votes cast by readers (Wadi, Fredette, Sénécal, &amp; Legoux, 2026).</P></Ruled>
            <Ruled><P>Empirical analysis shows that performance-contingent incentives alter how reviewers construct their text, encouraging <Term>strategic effort inflation</Term> (e.g., padding length or adopting exaggerated stylistic tropes designed to win votes) and shifting expressed sentiment compared with unincentivized organic reviews.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><PayForWhat /></Plate>
            <Ruled><P>Furthermore, never condition an incentive on the review being positive (e.g., offering a rebate only for a 5-star rating). <Term>Conditioned-positivity incentives</Term> severely bias rating valence and are explicitly illegal under FTC, Canadian Competition Bureau, and EU consumer protection rules.</P></Ruled>
            <Ruled><P>Even when an unconditional incentive is offered, ethics and advertising law require disclosing inside the review that the reviewer received an incentive in exchange for their post.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-designing-a-post-purchase-review-program" border className="!py-8">
        <SlideHeading>Discussion: Designing a Post-Purchase Review Program</SlideHeading>
        <Discussion
          scenario={"A Direct-to-Consumer cookware brand launches a new stainless-steel pan line and needs to build review volume quickly before the holiday season. The growth manager proposes emailing buyers three days after delivery with two offers, namely a 5 dollar store credit for any submitted review, plus an extra 20 dollar bonus if the review exceeds 200 words and lands in the top 10 percent of \"helpful\" votes."}
          question={"Drawing on research on altruism, motivation crowding out, and performance-contingent incentives, critique this proposal and design an alternative solicitation experiment."}
        />
      </Slide>

      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Platform Reputation Systems, Fake Reviews, and Seller Responses" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Because a single star increase in average rating can shift conversion rates by 10 to 30 percent, bad actors face strong financial temptations to <Term>manipulate reputation systems</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Platforms and brands must actively defend the integrity of their review ecosystems.</p></Ruled>
        </div>
      </Slide>

      <Slide id="fake-reviews-brushing-scams-and-reputation-governance" border className="!py-6" exercise={exercise["fake-reviews-brushing-scams-and-reputation-governance"]}>
        <SlideHeading className="!mb-5">Fake Reviews, Brushing Scams, and Reputation Governance</SlideHeading>
        <div className="grid w-full gap-5">
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-2">
            <Ruled><P><Term>Astroturfing</Term> and fake positive reviews occur when sellers purchase fabricated 5-star reviews from click farms, review brokers, or social media groups that reimburse reviewers via off-platform payment apps.</P></Ruled>
            <Ruled><P><Term>Review hijacking</Term> (or catalog variation abuse) occurs when a seller takes an old product page with thousands of genuine 5-star reviews (e.g., for phone charging cables) and swaps the variation attributes to list an unrelated new item (e.g., a space heater) so the new item inherits the old rating count.</P></Ruled>
          </div>
          <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
            <Plate><FakeSchemes /></Plate>
            <Ruled><P><Term>Brushing scams</Term> occur when a dishonest merchant ships an inexpensive empty or trinket parcel to a real residential address using a fake buyer account just to generate a &ldquo;Verified Purchase&rdquo; tracking record, and then posts a glowing 5-star review under that account.</P></Ruled>
          </div>
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-2">
            <Ruled><P><Term>Negative review bombing</Term> occurs when a competitor or coordinated group floods a rival&apos;s listing with 1-star ratings to sink its organic search rank.</P></Ruled>
            <Ruled><P>Platforms combat manipulation through verified-purchase cryptographic checks, behavioral graph anomaly detection (flagging bursts of reviews from overlapping IP subnets or account clusters), and strict legal enforcement against fake review brokers.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="managing-negative-reviews-and-public-seller-responses" border className="!py-8">
        <SlideHeading>Managing Negative Reviews and Public Seller Responses</SlideHeading>
        <ol className="grid w-full max-w-[72rem] gap-x-12 gap-y-6 md:grid-cols-3 [&_p]:!text-[1.2rem]">
          <li className="min-w-0"><Numbered n={1}><Ruled><P>Censoring or deleting legitimate negative reviews destroys shopper trust and violates consumer review fairness statutes.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={2}><Ruled><P>Constructive negative reviews provide <Term>free diagnostic product research</Term>, revealing sizing inaccuracies, packaging damage during transit, or confusing manual instructions that the firm can fix at the source.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={3}><Ruled><P>Publicly replying to negative reviews with a calm, specific, and non-defensive resolution helps convert future prospective buyers who read 1-star reviews specifically to see how the merchant treats customers when something goes wrong.</P></Ruled></Numbered></li>
        </ol>
      </Slide>

      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="AI Review Summaries and Reviews in Agentic Shopping" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>When a popular product accumulates four thousand individual text reviews, no human shopper reads every review from top to bottom.</p></Ruled>
          <Ruled><p className={BIG}>Both human shoppers and autonomous AI shopping agents now rely on <Term>natural-language processing</Term> to compress thousands of peer opinions into actionable signals.</p></Ruled>
        </div>
      </Slide>

      <Slide id="ai-generated-review-summaries-and-agent-evaluation-of-ewom" border className="!py-8" exercise={exercise["ai-generated-review-summaries-and-agent-evaluation-of-ewom"]}>
        <SlideHeading>AI-Generated Review Summaries and Agent Evaluation of eWOM</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Major marketplaces now display <Term>AI-generated review summaries</Term> at the top of the review section, using large language models to synthesize recurring pros and cons (e.g., &ldquo;Customers praise the battery life and quiet motor, but several mention the lid latch feels fragile&rdquo;) with clickable attribute chips.</P></Ruled>
            <Ruled><P>These summaries shift shopper attention from the raw star average toward specific recurring attribute themes mentioned in the text body.</P></Ruled>
            <Ruled><P>At the same time, bad actors attempt to use generative AI to write fluent, varied fake reviews at near-zero cost, forcing platform detection models to look beyond text fluency toward verified transaction graphs and reviewer histories.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><ReviewSummary /></Plate>
            <Ruled><P>When consumers delegate shopping to an AI agent, the agent evaluates both the structured <code className="rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]">AggregateRating</code> schema and sample review passages. However, under <Term>bounded algorithmic rationality</Term>, agents can over-weight salient summary statistics or vivid extreme reviews unless prompted to evaluate rating distributions and verified sample sizes systematically (Wadi &amp; Ma, 2026a).</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-when-the-ai-summary-highlights-a-flaw" border className="!py-8">
        <SlideHeading>Discussion: When the AI Summary Highlights a Flaw</SlideHeading>
        <Discussion
          scenario={"A travel backpack brand maintains a strong 4.6-star average across 1,400 reviews on a major marketplace. However, after the marketplace introduces an LLM-generated review summary paragraph above the reviews, the summary's final sentence states, \"Several customers note that the water-bottle pocket is too tight for 32-ounce bottles,\" and conversion drops by 14 percent."}
          question={"How should the brand respond across product engineering, PDP expectation setting, and review management without violating platform manipulation rules?"}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Online reviews overcome information asymmetry in digital markets, especially for experience goods whose quality cannot be verified from a specification table alone.",
            "A product's eWOM profile is governed by four dimensions, namely volume (popularity and statistical reliability), valence (average rating), variance (polarizing niche versus uniform consensus), and recency.",
            "Because unprompted reviews are under-provided and skew toward extreme J-shaped ratings, proactive post-purchase solicitation is essential, and solicitation messages must carefully balance intrinsic altruistic appeals with extrinsic incentives (Wadi et al., 2026).",
            "Performance-contingent incentives that reward review length or helpfulness votes can unintentionally distort reviewer effort and sentiment, while conditioning rewards on positive ratings is both deceptive and illegal (Wadi et al., 2026).",
            "Platforms defend reputation integrity against fake review brokers, brushing scams, and catalog variation hijacking using verified-purchase validation and behavioral graph detection.",
            "AI-generated review summaries and autonomous shopping agents elevate specific text themes alongside star ratings, making authentic review text and structured rating schemas central to both human and agentic conversion.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
