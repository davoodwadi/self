"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { GraphReach, CohortLadder, CreativeFatigue, CreatorBudget, ContractPayout, CheckoutRoutes, EndorserGrid } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week6Page() {
  return (
    <SlideDeck label="Week 6">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 6: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">Social Media Marketing, Creator Economies, and Social Commerce</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Social platforms blend algorithmic entertainment feeds, creator trust, and native checkout to turn passive discovery into immediate purchase.
        </p>
      </Slide>

      <Slide id="from-social-networks-to-algorithmic-discovery-engines" border className="!py-8">
        <SlideHeading>From Social Networks to Algorithmic Discovery Engines</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2 [&_p]:!text-[1.2rem]">
          <Ruled><P>Early social media platforms functioned primarily as digital address books where users viewed chronological updates from friends, family, and accounts they explicitly chose to follow.</P></Ruled>
          <Ruled><P>Modern social platforms operate as <Term>algorithmic discovery and entertainment engines</Term> that curate every post and short-form video according to predicted engagement.</P></Ruled>
          <Ruled><P>Unlike search engines, where a user arrives with an explicit product query in mind, social media <Term>captures latent demand</Term> by surfacing products to users who did not know they were shopping.</P></Ruled>
          <Ruled><P>For e-commerce brands, social platforms now span the entire marketing funnel, from top-of-funnel cultural awareness and creator endorsement to native in-app checkout.</P></Ruled>
        </div>
      </Slide>

      <Slide id="paid-owned-and-earned-media-on-social-platforms" border className="!py-8" exercise={exercise["paid-owned-and-earned-media-on-social-platforms"]}>
        <SlideHeading>Paid, Owned, and Earned Media on Social Platforms</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-3 [&_p]:!text-[1.1rem]">
          <Ruled><P><Term>Owned social media</Term> consists of content published on the brand&apos;s own profile pages, community groups, and broadcast channels, reaching followers at zero media cost but subject to organic algorithm throttling.</P></Ruled>
          <Ruled><P><Term>Paid social media</Term> consists of sponsored in-feed posts, vertical video ads, and dynamic catalog carousels bought through the platform&apos;s self-serve auction manager to reach targeted non-followers at scale.</P></Ruled>
          <Ruled><P><Term>Earned social media</Term> consists of voluntary organic mentions, uncompensated customer unboxing videos, shares, and community discussions that carry high peer credibility precisely because they cannot be bought directly.</P></Ruled>
        </div>
        <Ruled className="mt-8 w-full"><p className={BIG}>Effective social strategy uses owned content to nurture loyal buyers, paid social to scale proven creative hooks to new audiences, and earned social proof to lower skepticism.</p></Ruled>
      </Slide>

      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Social Graphs, Interest Graphs, and Feed Ranking" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Why a brand post reaches two hundred people on one day and two million people on the next depends on the underlying <Term>network architecture and ranking objective</Term> of the platform.</p></Ruled>
          <Ruled><p className={BIG}>Information systems researchers distinguish platforms anchored in social graphs from platforms anchored in interest graphs.</p></Ruled>
        </div>
      </Slide>

      <Slide id="social-graphs-versus-interest-graphs" border className="!py-8" exercise={exercise["social-graphs-versus-interest-graphs"]}>
        <SlideHeading>Social Graphs Versus Interest Graphs</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P>A <Term>social graph</Term> maps explicit interpersonal connections (who knows or follows whom), so feed distribution depends primarily on the size of an account&apos;s follower base and shares among connected peers.</P></Ruled>
            <Ruled><P>An <Term>interest graph</Term> maps behavioral affinity between users and content items based on watch time, replays, shares, and comments, independent of whether the viewer follows the creator.</P></Ruled>
            <Ruled><P>In an interest-graph feed (pioneered at scale by short-form vertical video platforms), <Term>an account with zero followers can achieve massive organic distribution</Term> if its video holds viewer attention in early test cohorts.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><GraphReach /></Plate>
            <Ruled><P>Conversely, having a large legacy follower count provides little guaranteed reach on an interest-graph platform if a new post fails early engagement thresholds.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="how-algorithmic-feeds-score-and-distribute-content" border className="!py-8">
        <SlideHeading>How Algorithmic Feeds Score and Distribute Content</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P>Feed ranking algorithms evaluate candidate posts using a <Term>weighted multi-objective formula</Term> that predicts the probability of distinct user actions, including completion rate, watch duration, shares via direct message, saves, comments, and likes.</P></Ruled>
            <Ruled><P>Passive signals such as percentage of video watched and three-second thumb-stop rate carry heavy weight because users cannot easily fake time spent watching.</P></Ruled>
            <Ruled><P>High-effort active signals, such as sending a post to a friend in a private message or bookmarking a product tutorial, indicate stronger value than a low-effort double-tap like.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CohortLadder /></Plate>
            <Ruled><P>Short-form video platforms distribute posts through <Term>staged cohort testing</Term>, showing a new video to an initial test batch of a few hundred matched viewers and promoting it to larger pools only if retention and share metrics beat category baselines.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Paid Social Advertising and Creative Testing" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>As algorithmic targeting becomes increasingly automated across social ad platforms, <Term>the advertisement&apos;s creative execution itself acts as the primary targeting filter</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Who stops scrolling to watch the first three seconds of an ad trains the platform&apos;s delivery algorithm on which audience segment to pursue next.</p></Ruled>
        </div>
      </Slide>

      <Slide id="full-funnel-paid-social-and-creative-led-targeting" border className="!py-8" exercise={exercise["full-funnel-paid-social-and-creative-led-targeting"]}>
        <SlideHeading>Full-Funnel Paid Social and Creative-Led Targeting</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="grid content-start gap-2">
            <Numbered n={1}><Ruled><P><Term>Top-of-funnel prospecting campaigns</Term> use broad targeting and narrative video hooks to introduce the problem the product solves to cold audiences who have never visited the storefront.</P></Ruled></Numbered>
            <Numbered n={2}><Ruled><P><Term>Mid-funnel consideration campaigns</Term> serve product demonstrations, customer testimonials, and comparison carousels to users who watched a prospecting video or engaged with the brand&apos;s social profile.</P></Ruled></Numbered>
            <Numbered n={3}><Ruled><P><Term>Bottom-of-funnel conversion and dynamic product ad (DPA) campaigns</Term> pull directly from the merchant&apos;s product catalog feed to show personalized SKUs, prices, and promotions to high-intent site visitors and cart abandoners.</P></Ruled></Numbered>
          </ol>
          <div className="grid content-start gap-4">
            <Plate><CreativeFatigue /></Plate>
            <Ruled><P>Because social feeds refresh rapidly, paid social ads suffer from <Term>rapid creative fatigue</Term> as target audiences see the same asset repeatedly, requiring continuous structured testing of new hooks, visual angles, and value propositions.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="The Creator Economy and Influencer Marketing" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Consumers frequently tune out polished corporate advertisements while trusting recommendations from individual creators whose expertise, taste, or daily lives they follow over months and years.</p></Ruled>
          <Ruled><p className={BIG}>Influencer marketing formalizes this <Term>parasocial trust</Term> into a scalable customer acquisition and content production channel.</p></Ruled>
        </div>
      </Slide>

      <Slide id="creator-tiers-parasocial-trust-and-partner-selection" border className="!py-6" exercise={exercise["creator-tiers-parasocial-trust-and-partner-selection"]}>
        <SlideHeading className="!mb-5">Creator Tiers, Parasocial Trust, and Partner Selection</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Mega- and macro-influencers</Term> (hundreds of thousands to millions of followers) deliver broad top-of-funnel reach and cultural signaling, but command high flat fees and lower average engagement rates.</P></Ruled>
            <Ruled><P><Term>Micro- and nano-influencers</Term> (roughly one thousand to one hundred thousand followers) operate within tight niche communities (e.g., ultralight backpacking, specialty baking, or mechanical keyboards), typically generating higher engagement rates and stronger conversion per dollar spent.</P></Ruled>
            <Ruled><P>Creators build persuasive power through <Term>parasocial interaction</Term>, the one-sided sense of familiarity and friendship that audience members develop when watching a creator talk directly to the camera over time.</P></Ruled>
          </div>
          <div className="grid content-start gap-3">
            <Plate><CreatorBudget /></Plate>
            <div className="grid gap-4 md:grid-cols-2">
              <Ruled><P>Selecting creator partners by follower count alone is a classic digital marketing error, because follower totals can be inflated by inactive accounts or bots. Marketers instead audit audience demographic fit, comment quality, average view-to-follower ratios, and past conversion performance.</P></Ruled>
              <Ruled><P>In <Term>creator licensing (or whitelisting)</Term>, a brand pays to run paid social ads directly through the creator&apos;s handle rather than the brand&apos;s corporate handle, combining the credibility of a creator&apos;s voice with the targeting control of paid media.</P></Ruled>
            </div>
          </div>
        </div>
      </Slide>

      <Slide id="contracting-compensation-and-disclosure-compliance" border className="!py-8">
        <SlideHeading>Contracting, Compensation, and Disclosure Compliance</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Flat-fee sponsorship contracts</Term> pay the creator a fixed sum for delivering agreed content deliverables, placing the conversion risk on the brand.</P></Ruled>
            <Ruled><P><Term>Affiliate and performance-contingent contracts</Term> pay the creator a commission percentage of attributed sales tracked via unique promo codes or UTM links, aligning incentives around conversion.</P></Ruled>
            <Ruled><P><Term>Hybrid contracts</Term> combine a modest base production fee with a performance bonus or revenue share, balancing creator compensation with merchant acquisition cost targets.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><ContractPayout /></Plate>
            <Ruled><P>Consumer protection agencies (including the FTC in the United States, the Competition Bureau and Ad Standards in Canada, and EU authorities) mandate that any material connection between a brand and a creator, including free gifted products, affiliate links, or cash payments, must be disclosed clearly and conspicuously <Term>at the start of the post</Term> (e.g., &quot;#ad&quot; or &quot;Paid partnership&quot;), not buried below a &quot;more&quot; fold.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Social Commerce and Livestream Shopping" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Traditional social media marketing required clicking an external link that opened a slow in-app web browser, forcing the shopper to leave the social feed and re-enter shipping and payment details on an unfamiliar website.</p></Ruled>
          <Ruled><p className={BIG}>Social commerce eliminates that handoff by <Term>embedding the product catalog, shopping cart, and payment processor natively inside the social platform</Term>.</p></Ruled>
        </div>
      </Slide>

      <Slide id="native-in-app-checkout-and-livestream-shopping" border className="!py-8" exercise={exercise["native-in-app-checkout-and-livestream-shopping"]}>
        <SlideHeading>Native In-App Checkout and Livestream Shopping</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P>In <Term>native social commerce storefronts</Term> (such as TikTok Shop, Instagram Shop, and Pinterest Shopping), the merchant syncs its Product Information Management (PIM) and Order Management System (OMS) via API so inventory, pricing, and checkout execute entirely within the social app.</P></Ruled>
            <Ruled><P><Term>Shoppable tags</Term> on videos and photos allow a viewer to tap a tagged garment, select a size, and pay in two taps using credentials already stored in the social platform.</P></Ruled>
            <Ruled><P><Term>Livestream shopping</Term> combines live video broadcasting, real-time audience chat, live product demonstrations, and time-limited flash coupons to create an interactive, high-urgency buying environment.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CheckoutRoutes /></Plate>
            <Ruled><P>While native social checkout dramatically increases impulse conversion rates by removing redirect friction, the social platform <Term>retains control of the checkout screen, charges transaction commissions, and restricts the first-party customer data</Term> passed back to the merchant.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-owning-the-customer-versus-renting-the-feed" border className="!py-8">
        <SlideHeading>Discussion: Owning the Customer Versus Renting the Feed</SlideHeading>
        <Discussion
          scenario={"A fast-growing cosmetics brand generates 60 percent of its monthly unit sales through a native social commerce shop where creators tag products in short videos and customers check out without ever leaving the social app. While order volume is booming, the brand's email list growth has stalled and repeat purchase rates are half those of customers who buy on the brand's own Direct-to-Consumer website."}
          question={"Evaluate the strategic risks of relying on native social commerce and propose how the brand can convert rented social shoppers into long-term first-party customers."}
        />
      </Slide>

      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Virtual Influencers and AI-Generated Social Content" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Advances in generative image, video, and voice synthesis now allow brands and agencies to create synthetic social media assets and computer-generated virtual influencers.</p></Ruled>
          <Ruled><p className={BIG}>Deploying synthetic personas in social channels introduces distinct trade-offs between <Term>operational control and consumer authenticity</Term>.</p></Ruled>
        </div>
      </Slide>

      <Slide id="virtual-influencers-synthetic-content-and-consumer-reactance" border className="!py-8" exercise={exercise["virtual-influencers-synthetic-content-and-consumer-reactance"]}>
        <SlideHeading>Virtual Influencers, Synthetic Content, and Consumer Reactance</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Virtual influencers</Term> are computer-generated characters with scripted personalities and social media profiles that partner with brands to model apparel, endorse products, and interact with followers.</P></Ruled>
            <Ruled><P>For brand managers, virtual influencers offer complete scheduling reliability, zero risk of personal off-platform scandals, and instant adaptation across global languages and campaigns.</P></Ruled>
            <Ruled><P>However, behavioral consumer research shows that virtual influencers <Term>lack genuine lived experience</Term>, meaning an AI persona cannot authentically claim that a skincare serum healed its skin or that a running shoe relieved its joint pain.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><EndorserGrid /></Plate>
            <Ruled><P>Consequently, virtual influencers perform more effectively for <Term>symbolic, hedonic, or fashion-oriented products</Term> than for experience or credence goods that rely on physical sensory trust, and undisclosed synthetic endorsements trigger severe consumer backlash when discovered.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-when-an-ai-creator-endorses-an-experience-good" border className="!py-8">
        <SlideHeading>Discussion: When an AI Creator Endorses an Experience Good</SlideHeading>
        <Discussion
          scenario={"A nutritional supplement company creates a photorealistic AI fitness creator to post daily workout reels and endorse its recovery protein powder, without stating in the bio that the creator is computer-generated. After a viral post reveals the persona is synthetic, thousands of commenters accuse the brand of deception."}
          question={"Why does consumer backlash differ between a clearly labeled stylized virtual mascot and an undisclosed photorealistic AI influencer endorsing a health product, and what disclosure policy should govern AI-generated social marketing?"}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Modern social platforms have shifted from chronological social graphs (who you follow) to algorithmic interest graphs (what holds your attention), enabling discovery-based commerce for latent demand.",
            "Social feed algorithms rank content using weighted predictions of watch completion, shares via direct messages, saves, comments, and likes across staged audience test cohorts.",
            "Paid social strategy pairs full-funnel campaign structures (prospecting, consideration, and dynamic catalog retargeting) with continuous creative testing to combat rapid ad fatigue.",
            "Influencer marketing relies on parasocial trust across creator tiers, requiring rigorous vetting of audience engagement quality, balanced base-plus-affiliate contracts, and strict regulatory disclosure of material connections.",
            "Social commerce and livestream shopping collapse discovery and purchase into native in-app checkouts, raising impulse conversion while creating platform dependence and first-party data trade-offs.",
            "Virtual influencers and AI-generated social content offer brand control and scale, but require transparent disclosure and careful matching to product categories that do not depend on human physical experience.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
