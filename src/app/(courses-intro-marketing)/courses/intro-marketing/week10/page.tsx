"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Big,
  Lead,
  Numbered,
  P,
  PartHead,
  Plate,
  Prompt,
  Ruled,
  SlideHeading,
  Statement,
  Term,
  TIGHT,
  Tint,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  CommunicationProcessModel,
  GenerativeAiPipeline,
  MessageHub,
  PushVersusPull,
  ReadinessStairs,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 10: INTEGRATED MARKETING COMMUNICATIONS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week10() {
  return (
    <SlideDeck label="Week 10">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">
            Week 10
          </p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Integrated Marketing Communications (The Fourth P)
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              <Term>Integrated Marketing Communications (IMC)</Term> coordinates
              the five tools of the promotion mix to deliver a clear,
              consistent, and persuasive brand message across traditional,
              digital, and generative AI channels.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Promotion Mix and Customer Communication
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-promotion-mix-and-customer-communication"
        border
      >
        <SlideHeading>
          The Promotion Mix and Customer Communication
        </SlideHeading>
        <Lead>
          Modern marketing calls for more than developing a good product,
          pricing it attractively, and making it accessible to target customers:
          companies must also communicate their <Term>value propositions</Term>{" "}
          clearly and persuasively.
        </Lead>
        <div className="mt-8 grid w-full gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <Ruled>
            <Statement>
              A company&apos;s <Term>total promotion mix</Term> (also called its{" "}
              <Term>marketing communications mix</Term>) consists of the
              specific blend of advertising, public relations, personal selling,
              sales promotion, and direct and digital marketing tools that the
              company uses to persuasively communicate customer value and build
              customer relationships.
            </Statement>
          </Ruled>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                Beyond these planned promotional tools, every element of the{" "}
                <Term>marketing mix</Term> communicates something to the buyer:
                the product&apos;s styling, its price, the shape and color of
                its package, and the stores that sell it all send brand signals.
              </P>
            </Ruled>
            <Ruled>
              <Big>
                To achieve maximum communication impact, the entire marketing
                mix must be coordinated so every customer contact reinforces the
                same <Term>core message</Term>.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Why Media Fragmentation Demands Integrated Marketing Communications
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="why-media-fragmentation-demands-integrated-marketing-communications"
        border
      >
        <SlideHeading>
          Why Media Fragmentation Demands Integrated Marketing Communications
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                Over the past several decades, mass-market broadcasting has
                given way to a <Term>fragmented landscape</Term> of hundreds of
                streaming services, social feeds, podcasts, search engines,
                mobile apps, and AI assistants.
              </P>
            </Ruled>
            <Ruled>
              <P>
                In this fragmented environment, consumers are bombarded by
                commercial messages from many organizational departments: an
                advertising agency creates television and video spots, a public
                relations firm handles press releases, a sales promotion
                specialist designs digital coupons, and an e-commerce team
                manages website banners.
              </P>
            </Ruled>
            <Ruled>
              <P>
                When these functional specialists operate in silos,{" "}
                <Term>conflicting messages</Term> can result in confused company
                images, inconsistent brand positions, and wasted promotional
                spending.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <MessageHub />
          </Plate>
        </div>
        <Ruled className="mt-8 w-full">
          <Statement>
            <Term>Integrated Marketing Communications (IMC)</Term> solves this
            problem by carefully integrating and coordinating the company&apos;s
            many communications channels to deliver a{" "}
            <Tint>clear, consistent, and compelling message</Tint> about the
            organization and its products.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 1: The Five Tools of the Promotion Mix
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-five-tools-of-the-promotion-mix"
        border
      >
        <PartHead n={1} title="The Five Tools of the Promotion Mix" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Each of the five major <Term>promotion tools</Term> has unique
            characteristics, reach profiles, and cost structures.
          </Statement>
          <Ruled>
            <Lead>
              Marketers must understand the{" "}
              <Tint>strengths and limitations</Tint> of each tool in order to
              blend them effectively for a given product and target market.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Advertising and Public Relations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="advertising-and-public-relations"
        border
        exercise={exercise["advertising-and-public-relations"]}
      >
        <SlideHeading>Advertising and Public Relations</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <Lead>
                <Term>Advertising</Term> is any paid form of nonpersonal
                presentation and promotion of ideas, goods, or services by an
                identified sponsor, using broadcast, print, online, mobile, or
                outdoor media.
              </Lead>
            </Ruled>
            <Ruled>
              <P>
                Advertising can reach masses of geographically dispersed buyers
                at a <Term>low cost per exposure</Term>, and it enables the
                seller to repeat a message many times while signaling brand
                scale and legitimacy, though it is impersonal and cannot
                persuade as directly as a company salesperson.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <Lead>
                <Term>Public relations (PR)</Term> involves building good
                relations with the company&apos;s various publics by obtaining
                favorable publicity, building up a good corporate image, and
                handling or heading off unfavorable rumors, stories, and events.
              </Lead>
            </Ruled>
            <Ruled>
              <P>
                Public relations is <Term>highly believable</Term> because news
                stories, features, sponsorships, and events seem more authentic
                and credible to readers than paid advertisements, and PR can
                reach prospects who actively avoid salespeople and ads.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Personal Selling and Sales Promotion
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="personal-selling-and-sales-promotion"
        border
        exercise={exercise["personal-selling-and-sales-promotion"]}
      >
        <SlideHeading>Personal Selling and Sales Promotion</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <Lead>
                <Term>Personal selling</Term> is the personal presentation by
                the firm&apos;s sales force for the purpose of engaging
                customers, making sales, and building customer relationships.
              </Lead>
            </Ruled>
            <Ruled>
              <P>
                It is the most effective tool at certain stages of the buying
                process, particularly in building up buyers&apos;{" "}
                <Term>preferences, convictions, and actions</Term> in complex
                B2B or high-ticket consumer purchases, though a sales force
                requires a longer-term financial commitment than advertising.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <Lead>
                <Term>Sales promotion</Term> consists of short-term incentives
                to encourage the purchase or sale of a product or service,
                including <Term>consumer promotions</Term> (coupons, cash
                rebates, cents-off deals, contests, and point-of-purchase
                displays) and <Term>trade promotions</Term> (discounts and
                allowances to retailers).
              </Lead>
            </Ruled>
            <Ruled>
              <P>
                Whereas advertising says &ldquo;buy our product,&rdquo; sales
                promotion says &ldquo;buy it now&rdquo;: it attracts immediate
                attention and rewards <Term>quick buyer response</Term>, but its
                effects are often short-lived and less effective than
                advertising or personal selling in building long-run brand
                preference.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Direct and Digital Marketing and Push Versus Pull Strategies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="direct-and-digital-marketing-and-push-versus-pull-strategies"
        border
        exercise={
          exercise[
            "direct-and-digital-marketing-and-push-versus-pull-strategies"
          ]
        }
      >
        <SlideHeading>
          Direct and Digital Marketing and Push Versus Pull Strategies
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Direct and digital marketing</Term> involves engaging
              directly with carefully targeted individual consumers and customer
              communities to both obtain an immediate response and build lasting
              customer relationships, using email, social media, search ads,
              mobile apps, and catalogs.
            </P>
          </Ruled>
          <Ruled>
            <P>
              It is more targeted, immediate, and personalized than mass media,
              and it is <Term>interactive</Term>, allowing a two-way dialogue
              between the marketing team and the customer.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              Across all five tools, marketers can choose between two basic
              promotion mix strategies: a <Term>push strategy</Term> or a{" "}
              <Term>pull strategy</Term>.
            </Statement>
            <Ruled>
              <P>
                A <Term>push strategy</Term> involves &ldquo;pushing&rdquo; the
                product through marketing channels to final consumers using the
                sales force and trade promotions to induce channel members to
                carry and promote the product, whereas a{" "}
                <Term>pull strategy</Term> spends heavily on consumer
                advertising and promotion to induce final consumers to ask
                retailers for the product, pulling it through the channel.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <PushVersusPull />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: How Communication Works and Steps in Developing IMC
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-how-communication-works-and-steps-in-developing-imc"
        border
      >
        <PartHead
          n={2}
          title="How Communication Works and Steps in Developing IMC"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Effective marketing communications rest on a clear model of how
            messages travel from a <Term>sender</Term> to a{" "}
            <Term>receiver</Term> and how <Term>noise</Term> can distort
            decoding.
          </Statement>
          <Ruled>
            <Lead>
              Building an IMC campaign follows a{" "}
              <Tint>six-step sequence</Tint> from identifying the target
              audience to collecting feedback.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Communication Process Model
          ================================================================ */}
      <Slide className={TIGHT} id="the-communication-process-model" border>
        <SlideHeading>The Communication Process Model</SlideHeading>
        <Lead>
          <Term>Integrated marketing communications</Term> involves identifying
          the target audience and shaping a well-coordinated promotional program
          to obtain the desired audience response, analyzed through the{" "}
          <Term>nine elements</Term> of the communication process.
        </Lead>
        <Plate wide className="mt-6">
          <CommunicationProcessModel />
        </Plate>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Two elements represent the major parties in a communication (the{" "}
              <Term>sender</Term> and the <Term>receiver</Term>), and two
              represent the major communication tools (the{" "}
              <Term>message</Term> and the <Term>media</Term>).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Four elements represent major communication functions:{" "}
              <Term>encoding</Term> (putting thought into symbolic form),{" "}
              <Term>decoding</Term> (the process by which the receiver assigns
              meaning to the symbols encoded by the sender),{" "}
              <Term>response</Term> (the reactions of the receiver after being
              exposed to the message), and <Term>feedback</Term> (the part of
              the receiver&apos;s response communicated back to the sender).
            </P>
          </Ruled>
          <Ruled>
            <P>
              The final element is <Term>noise</Term>, the unplanned static or
              distortion during the communication process that results in the
              receiver getting a different message than the one the sender sent,
              requiring senders to encode messages in symbols that match the
              receiver&apos;s <Term>field of experience</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Identifying the Target Audience and Buyer-Readiness Stages
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="identifying-the-target-audience-and-buyer-readiness-stages"
        border
        exercise={
          exercise[
            "identifying-the-target-audience-and-buyer-readiness-stages"
          ]
        }
      >
        <SlideHeading>
          Identifying the Target Audience and Buyer-Readiness Stages
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                A marketing communicator starts with a clear{" "}
                <Term>target audience</Term> in mind, whether potential buyers
                or current users, those who make the buying decision or those
                who influence it, and individuals or specific groups.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Once the target audience has been defined, the marketer
                determines the desired <Term>communication objectives</Term>,
                which in most cases seek a purchase response that results from a
                long consumer decision-making process.
              </P>
            </Ruled>
            <Ruled>
              <P>
                The marketing communicator needs to know where the target
                audience now stands and to what stage it needs to be moved
                across six <Term>buyer-readiness stages</Term>: awareness,
                knowledge, liking, preference, conviction, and purchase.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ReadinessStairs />
          </Plate>
        </div>
        <Ruled className="mt-8 w-full">
          <Big>
            Consistent with the <Term>AIDA framework</Term>, the message must
            get Attention, hold Interest, arouse Desire, and obtain Action:
            awareness and knowledge advertising cannot by itself close sales if
            target buyers lack conviction or face friction at checkout.
          </Big>
        </Ruled>
      </Slide>

      {/* ================================================================
          Designing the Message: Content, Structure, Format, and Source
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="designing-the-message-content-structure-format-and-source"
        border
        exercise={
          exercise[
            "designing-the-message-content-structure-format-and-source"
          ]
        }
      >
        <SlideHeading>
          Designing the Message: Content, Structure, Format, and Source
        </SlideHeading>
        <Lead>
          Having defined the desired audience response, the communicator turns
          to developing an effective message by resolving three message problems
          (<Term>message content</Term>, <Term>message structure</Term>, and{" "}
          <Term>message format</Term>) and selecting a credible{" "}
          <Term>message source</Term>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Message content</Term> requires figuring out an appeal or
              theme that will produce the desired response across three types of
              appeals: <Term>rational appeals</Term> (relating to the
              audience&apos;s self-interest in quality, economy, value, or
              performance), <Term>emotional appeals</Term> (stirring up negative
              or positive emotions that motivate a purchase), and{" "}
              <Term>moral appeals</Term> (directed to the audience&apos;s sense
              of what is right and proper).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Message structure</Term> decisions address three issues:
              whether to draw a definite conclusion or leave it to the audience,
              whether to present a <Term>one-sided argument</Term> (mentioning
              only strengths) or a <Term>two-sided argument</Term> (touting
              strengths while also admitting a minor shortcoming), and whether
              to present the strongest arguments first or last.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Message format</Term> requires a strong layout, headline,
              illustration, color, voice, and body language, while the{" "}
              <Term>message source</Term>&apos;s impact depends on the
              communicator&apos;s expertise and trustworthiness.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing a Push-and-Pull Promotion Mix for a Medical Device vs. a Consumer App
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-push-and-pull-promotion-mix-for-a-medical-device-vs-a-consumer-app"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Push-and-Pull Promotion Mix for a Medical Device vs. a
          Consumer App
        </SlideHeading>
        <Prompt>
          A health-technology company is launching two products simultaneously:
          a 15,000-dollar clinical rehabilitation device sold to physical
          therapy clinics and a 9-dollar-per-month consumer posture-coaching
          mobile app. Using the five promotion mix tools, push versus pull
          strategy, and the six buyer-readiness stages, compare how the company
          should allocate its promotional effort for each product and explain
          which message appeals (rational, emotional, or moral) fit each
          audience.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Selecting Media Channels
          ================================================================ */}
      <Slide className={TIGHT} id="part-3-selecting-media-channels" border>
        <PartHead n={3} title="Selecting Media Channels" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            The communicator must now select the{" "}
            <Term>channels of communication</Term> through which the message
            will reach the target audience.
          </Statement>
          <Ruled>
            <Lead>
              Media channels divide broadly into <Term>personal</Term> and{" "}
              <Term>nonpersonal</Term> communication channels, requiring media
              planners to balance reach, frequency, impact, and engagement.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Personal Communication Channels and Word-of-Mouth Influence
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="personal-communication-channels-and-word-of-mouth-influence"
        border
      >
        <SlideHeading>
          Personal Communication Channels and Word-of-Mouth Influence
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              In <Term>personal communication channels</Term>, two or more
              people communicate directly with each other, whether face to face,
              on the phone, via mail or email, or through an internet chat or
              video call.
            </Statement>
            <Ruled>
              <P>
                Personal influence carries great weight, especially for products
                that are expensive, risky, or highly visible, because{" "}
                <Tint>buyers trust peers</Tint> more than paid commercial
                claims.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                Some personal communication channels are controlled directly by
                the company (such as company salespeople contacting business
                buyers), whereas others reach buyers through independent
                neighbors, friends, family members, associates, or online
                reviewers talking to target buyers, known as{" "}
                <Term>word-of-mouth influence</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Companies use <Term>buzz marketing</Term> and{" "}
                <Term>opinion-leader outreach</Term> by cultivating industry
                experts, community leaders, and credible creators to experience
                the product and share authentic word of mouth with their
                networks.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Nonpersonal Communication Channels and Media Planning
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="nonpersonal-communication-channels-and-media-planning"
        border
      >
        <SlideHeading>
          Nonpersonal Communication Channels and Media Planning
        </SlideHeading>
        <Ruled>
          <P>
            <Term>Nonpersonal communication channels</Term> are media that carry
            messages without personal contact or feedback, including{" "}
            <Term>major media</Term> (print, broadcast, display, and online
            media), <Term>atmospheres</Term> (designed environments that create
            or reinforce the buyer&apos;s leaning toward buying a product, such
            as a bank lobby or luxury boutique), and <Term>events</Term> (staged
            occurrences that communicate messages to target audiences, such as
            press conferences or grand openings).
          </P>
        </Ruled>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <Lead>
              Selecting specific media for advertising requires deciding on the{" "}
              <Term>reach</Term>, <Term>frequency</Term>, and{" "}
              <Term>impact</Term> needed to achieve the campaign&apos;s
              objectives.
            </Lead>
          </Ruled>
          <Ruled>
            <P>
              <Term>Reach</Term> is a measure of the percentage of people in the
              target market who are exposed to the ad campaign during a given
              period of time, <Term>frequency</Term> is a measure of how many
              times the average person in the target market is exposed to the
              message, and <Term>media impact</Term> is the qualitative value of
              a message exposure through a given medium.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Media planners also choose among <Term>major media types</Term>{" "}
              based on target audience media habits, nature of the product,
              types of messages, and cost per thousand exposures, and schedule
              ads continuously or in pulses over the year.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Collecting Feedback and Evaluating Communication Effects
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="collecting-feedback-and-evaluating-communication-effects"
        border
      >
        <SlideHeading>
          Collecting Feedback and Evaluating Communication Effects
        </SlideHeading>
        <Statement>
          After sending the message, the communicator must research its effect
          on the target audience to close the <Term>feedback loop</Term> of the
          communication process.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              This involves asking target audience members whether they{" "}
              <Term>remember the message</Term>, how many times they saw it,
              what points they recall, how they felt about the message, and
              their past and present attitudes toward the product and company.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The communicator would also like to <Term>measure behavior</Term>{" "}
              resulting from the message, such as how many people bought the
              product, talked to others about it, or visited the store or
              website.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Feedback on marketing communications may suggest changes in the{" "}
              <Term>promotion program</Term> or in the{" "}
              <Term>product offer</Term> itself: if awareness is high but trial
              is low, the product&apos;s price or distribution rather than the
              ad may need adjustment.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Setting the Promotional Budget and Measuring ROI
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-setting-the-promotional-budget-and-measuring-roi"
        border
      >
        <PartHead
          n={4}
          title="Setting the Promotional Budget and Measuring ROI"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            One of the hardest marketing decisions facing a company is{" "}
            <Tint>how much to spend on promotion</Tint>, with spending ratios
            varying widely from a few percent of sales in industrial commodities
            to 30 percent or more in cosmetics and beverages.
          </Statement>
          <Ruled>
            <Lead>
              Companies use <Term>four common methods</Term> to set the total
              budget for advertising and promotion, and evaluate campaigns
              through communication and sales returns.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Four Methods for Setting the Total Promotion Budget
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="four-methods-for-setting-the-total-promotion-budget"
        border
        exercise={
          exercise["four-methods-for-setting-the-total-promotion-budget"]
        }
      >
        <SlideHeading>
          Four Methods for Setting the Total Promotion Budget
        </SlideHeading>
        <Lead>
          Industries and companies use four common methods to set the total
          budget for promotion: the <Term>affordable method</Term>, the{" "}
          <Term>percentage-of-sales method</Term>, the{" "}
          <Term>competitive-parity method</Term>, and the{" "}
          <Term>objective-and-task method</Term>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The <Term>affordable method</Term> sets the promotion budget at
              the level management thinks the company can afford, which
              completely ignores the effects of promotion on sales and leads to
              an uncertain annual promotion budget that makes long-range
              planning difficult.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The <Term>percentage-of-sales method</Term> sets the promotion
              budget at a certain percentage of current or forecasted sales (or
              a percentage of the unit sales price), which is simple to
              calculate but wrongly views sales as the cause of promotion rather
              than as the result, leading firms to cut promotion precisely when
              sales drop and support is needed most.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The <Term>competitive-parity method</Term> sets the promotion
              budget to match competitors&apos; outlays, whereas the most
              logical budget-setting method is the{" "}
              <Term>objective-and-task method</Term>, whereby the company sets
              its promotion budget based on what it wants to accomplish with
              promotion by (1) defining specific promotion objectives, (2)
              determining the tasks needed to achieve these objectives, and (3)
              estimating the costs of performing these tasks.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Measuring Promotional Effectiveness and Return on Investment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="measuring-promotional-effectiveness-and-return-on-investment"
        border
      >
        <SlideHeading>
          Measuring Promotional Effectiveness and Return on Investment
        </SlideHeading>
        <Statement>
          Marketing management must continually evaluate the{" "}
          <Term>return on promotion investment</Term> by measuring both the
          communication effects and the sales and profit effects of the
          campaign.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Measuring <Term>communication effects</Term> (or{" "}
              <Term>copy testing</Term>) can be done before or after an ad is
              printed, broadcast, or posted online: before the ad is placed, the
              advertiser can show it to consumers, ask how they like it, and
              measure message recall or attitude changes, and after the ad is
              run, the advertiser can measure how the ad affected consumer
              recall or product awareness, knowledge, and preference.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Sales and profit effects</Term> of promotion are often
              harder to measure than communication effects because sales are
              influenced by many factors besides promotion, such as product
              features, price, availability, macroeconomic shifts, and
              competitor actions.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Researchers isolate the sales impact of promotion either by
              comparing past sales with past promotion expenditures through{" "}
              <Term>statistical modeling</Term> or by running{" "}
              <Term>controlled field experiments</Term> that vary promotional
              spending across matched geographic markets or digital user groups.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Socially Responsible Marketing Communications
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="socially-responsible-marketing-communications"
        border
      >
        <SlideHeading>
          Socially Responsible Marketing Communications
        </SlideHeading>
        <Lead>
          In shaping its promotion mix, a company must be aware of the large
          body of <Term>legal and ethical issues</Term> surrounding marketing
          communications.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In advertising and sales promotion, companies must avoid{" "}
              <Term>false or deceptive advertising</Term>, must not make claims
              that cannot be substantiated by objective evidence, and must not
              use <Term>bait-and-switch advertising</Term> that attracts buyers
              under false pretenses.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Trade promotions</Term> are also regulated so sellers do not
              offer promotional allowances or services to favored large
              retailers without making them available on{" "}
              <Term>proportionally equal terms</Term> to competing resellers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In personal selling, salespeople must follow the{" "}
              <Term>rules of fair competition</Term>: they may not lie to
              consumers or mislead them about the advantages of buying a
              product, nor may they disparage competitors&apos; products with
              false statements or offer bribes to purchasing agents.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Generative AI in Marketing Communications
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-generative-ai-in-marketing-communications"
        border
      >
        <PartHead
          n={5}
          title="Generative AI in Marketing Communications"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            <Term>Generative artificial intelligence</Term> now drafts
            advertising copy, product photography, localized translations, and
            video storyboards in minutes.
          </Statement>
          <Ruled>
            <Lead>
              Examining generative AI through the <Term>IMC framework</Term>{" "}
              reveals why low production cost makes central brand coordination,
              factual verification, and audience disclosure more important than
              ever.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Scaling Creative Production and the Risk of Brand Fragmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="scaling-creative-production-and-the-risk-of-brand-fragmentation"
        border
        exercise={
          exercise[
            "scaling-creative-production-and-the-risk-of-brand-fragmentation"
          ]
        }
      >
        <SlideHeading>
          Scaling Creative Production and the Risk of Brand Fragmentation
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Generative AI models</Term> reduce the marginal cost and
              time required to produce text copy, visual graphics, voiceovers,
              and video variations by orders of magnitude.
            </P>
          </Ruled>
          <Ruled>
            <P>
              This capability allows marketers to create dozens of{" "}
              <Term>tailored versions</Term> of a campaign message, adapting
              imagery, tone, and examples to specific demographic segments,
              local markets, or stages of buyer readiness.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                However, multiplying the number of message variations across
                channels dramatically increases the core risk that IMC was
                created to prevent: <Term>brand fragmentation</Term> and
                contradictory messaging.
              </P>
            </Ruled>
            <Ruled>
              <P>
                If different regional teams or automated ad tools prompt
                generative models independently without a{" "}
                <Term>unified creative brief</Term> and{" "}
                <Term>brand style guardrails</Term>, customers encounter
                disjointed brand voices and conflicting value claims across
                touchpoints.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <GenerativeAiPipeline />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Factual Verification, Disclosure, and Audience Trust in AI Messages
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="factual-verification-disclosure-and-audience-trust-in-ai-messages"
        border
      >
        <SlideHeading>
          Factual Verification, Disclosure, and Audience Trust in AI Messages
        </SlideHeading>
        <Statement>
          Beyond brand consistency, generative AI introduces two critical
          governance requirements in marketing communications:{" "}
          <Term>factual substantiation</Term> and{" "}
          <Term>synthetic-media disclosure</Term>.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              Because language and image models generate outputs{" "}
              <Term>probabilistically</Term> rather than verifying facts against
              engineering databases, an unreviewed AI-drafted advertisement can
              invent product capabilities, misstate warranty terms, or depict
              product performance that the actual item cannot deliver.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Under <Term>truth-in-advertising laws</Term>, the sponsoring
              company is fully liable for every deceptive claim in its
              promotions, regardless of whether a human copywriter or a
              generative model wrote the text.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Furthermore, audiences increasingly expect, and regulations such
              as the <Term>European Union&apos;s AI Act</Term> and platform
              policies increasingly require, clear disclosure when realistic
              images, audio, or video imitate real people or events, since
              undisclosed synthetic endorsements can trigger severe{" "}
              <Term>source discounting</Term> and brand backlash when
              discovered.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Governing Generative AI in a Global Product Launch Campaign
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-governing-generative-ai-in-a-global-product-launch-campaign"
        border
      >
        <SlideHeading kicker="Discussion:">
          Governing Generative AI in a Global Product Launch Campaign
        </SlideHeading>
        <Prompt>
          A global skincare brand plans to use generative AI to produce 200
          localized social-video ads across 15 countries, including
          AI-generated virtual presenters describing the clinical results of a
          new anti-aging serum. Using the IMC framework, the objective-and-task
          budget method, source credibility, and AI disclosure regulations,
          identify the communication and legal risks of this plan and design a
          review and disclosure protocol before any ad goes live.
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "The promotion mix comprises five primary tools (advertising, public relations, personal selling, sales promotion, and direct and digital marketing) that Integrated Marketing Communications (IMC) coordinates to deliver a clear, consistent brand message across touchpoints.",
            "Marketers blend push strategies (using sales forces and trade promotions to push products through channels) and pull strategies (using consumer advertising and promotions to build end-user demand).",
            "The communication process operates through sender, encoding, message, media, decoding, receiver, response, feedback, and noise, requiring marketers to move target audiences through six buyer-readiness stages (awareness, knowledge, liking, preference, conviction, and purchase).",
            "Message design combines rational, emotional, or moral content appeals with one-sided or two-sided message structures, strong visual and verbal formats, and credible sources across personal and nonpersonal media channels.",
            "Among the four promotional budgeting methods (affordable, percentage-of-sales, competitive-parity, and objective-and-task), the objective-and-task method is the most logical because it ties spending directly to specific communication objectives and tasks.",
            "Generative AI enables rapid, low-cost personalization of marketing messages at scale, which increases the need for strict IMC brand coordination, human factual verification against deceptive claims, and transparent disclosure of synthetic media.",
          ].map((text, i) => (
            <Numbered key={i} n={i + 1}>
              <P>{text}</P>
            </Numbered>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
