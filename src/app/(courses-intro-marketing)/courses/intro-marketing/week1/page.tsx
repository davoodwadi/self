"use client";

import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  ContentText,
  Row,
  Column,
  Card,
  ContentTitle,
  ContentDescription,
  DiscussionCard,
  Quote,
  AnimatedList,
  ListItem,
  Callout,
  Metric,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import {
  NeedWantDemand,
  BombardierDivergence,
  ValueWaterfall,
  SatisfactionWedge,
  PhilosophyMatrix,
  KodakSchematic,
  LifetimeScale,
  ProcessCycle,
} from "./visuals";

export default function Week1() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 01"
      background={<BackgroundManager type="marketing" />}
    >
      {/* ================================================================
          Opening
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 01 · Introduction to Marketing</Subtitle>
        <Title className="mt-6">What Marketing Actually Is</Title>
        <p className="type-lead max-w-[40ch] mt-4">
          Most people think this course is about advertising. It is about
          something harder.
        </p>
      </Slide>

      {/* ================================================================
          I. The definition
          ================================================================ */}
      <Slide id="marketing-is-not-the-ads" border>
        <Tag>The misconception</Tag>
        <Heading>
          You have been looking at the <Highlight>last</Highlight> five percent
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Ask a hundred people what marketing is and about ninety will
                describe advertising. The confusion is fair enough. Ads are the
                only part of the discipline built to be looked at.
              </p>
              <p>
                But by the time an ad exists, every decision that determines
                whether it can possibly work has already been taken: who the
                product is for, what it does, what it costs, where you can buy
                it. The ad inherits all of that. It cannot repair any of it.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="Peter Drucker" role="Management, 1973">
              The aim of marketing is to make selling superfluous.
            </Quote>
            <ContentText layout="base">
              A usable test. The better the earlier decisions were, the less
              persuasion the last step has to do.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="so-what-is-it"
        border
        quizData={quizBySlideId["so-what-is-it"]}
      >
        <Tag>Definition</Tag>
        <Heading>
          So what <Highlight>is</Highlight> it?
        </Heading>
        <ContentText className="mb-2">
          <p>
            Marketing is the process of <strong>creating value</strong> for a
            defined group of customers and{" "}
            <strong>capturing part of that value</strong> in return. Both verbs
            carry weight. Drop either one and you get something with a name.
          </p>
        </ContentText>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/2">
            <Card title="Create, capture nothing">
              <ContentDescription>
                You have built a charity. Admirable, and it will not survive its
                second budget cycle.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Capture, having created nothing">
              <ContentDescription>
                You have built a scam with a letterhead. It works exactly once
                per customer.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText layout="base">
          Every topic in this course sits under one of those two verbs.
          Understanding customers, choosing which of them to serve, building the
          offer, keeping the relationship — that is the creating. Getting paid
          is the capturing.
        </ContentText>
      </Slide>

      {/* ================================================================
          II. Needs, wants, demands
          ================================================================ */}
      <Slide id="needs-wants-and-demands" border>
        <Tag>Foundation</Tag>
        <Heading>
          Needs, wants, and <Highlight>demands</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            In ordinary speech these three words are interchangeable. In
            marketing they name three different things, and mixing them up is
            expensive.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Read it from the outside in. The outer ring is human nature; the inner one is your addressable market."
        >
          <NeedWantDemand />
        </Figure>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Every demand is a want that somebody can fund. Every want is a
              need that a particular culture has dressed in particular clothes.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Marketers are regularly accused of creating needs. The honest
              version of that charge is narrower and sharper, and we get to it
              in three slides.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide id="valcourt-1934" border>
        <Tag>Case</Tag>
        <Heading>
          Valcourt, Québec, <Highlight>1934</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                In January 1934, Joseph-Armand Bombardier&apos;s two-year-old
                son fell critically ill. Valcourt had no plowed road to the
                hospital. The boy died.
              </p>
              <p>
                The need in that room was ancient and had nothing to do with
                commerce: <strong>cross deep snow, quickly.</strong>
              </p>
              <p>
                Bombardier patented a tracked snow vehicle in 1937 and sold it
                to the people whose work did not stop for winter — doctors,
                priests, ambulance crews, mail carriers. In 1959 the same firm
                launched the Ski-Doo. The machine that had carried a doctor to a
                farmhouse now carried a teenager across a frozen lake for the
                pleasure of it, and an industry appeared where none had been.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5" justify="center">
            <Callout title="Watch the flat line">
              Sixty years of invention, two entirely different buyers, one
              industry created from scratch — and underneath all of it, the need
              never moved an inch.
            </Callout>
          </Column>
        </Row>
        <Figure
          height="auto"
          caption="Same need, two wants. The branch is the part a firm can compete over."
        >
          <BombardierDivergence />
        </Figure>
      </Slide>

      <Slide id="needs" border>
        <Tag>Needs</Tag>
        <Heading>
          What the market does <Highlight>not</Highlight> decide
        </Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3">
            <Card title="Physical">
              <ContentDescription>
                Food, warmth, shelter, safety. Older than commerce and entirely
                indifferent to it.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Social">
              <ContentDescription>
                Belonging, affection, standing. The ones firms work hardest to
                attach themselves to.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Individual">
              <ContentDescription>
                Knowledge, competence, self-expression. Slow to form and hard to
                counterfeit.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText layout="base" className="mt-4">
          These predate every firm that has ever tried to serve them, and no
          campaign has manufactured one from nothing. That is the strongest
          thing marketing can say in its own defence. Hold on to it for one more
          slide, because it is also the narrowest.
        </ContentText>
      </Slide>

      <Slide id="wants" border>
        <Tag>Wants</Tag>
        <Heading>
          Where <Highlight>culture</Highlight> does the work
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                A want is a need after it has passed through a culture, a life
                stage, an income, and a personality.
              </ListItem>
              <ListItem>
                Hunger at two in the morning produces a want for poutine in
                Montréal and a want for ramen in Osaka. Same deprivation, same
                urgency, unrecognisably different object.
              </ListItem>
              <ListItem>
                This is where the discipline actually lives. Firms compete to be
                the thing you picture the moment the need arrives.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Callout variant="secondary" title="The narrower charge">
              So &ldquo;we only shape wants&rdquo; is a thinner defence than it
              first sounds. Deciding what a hundred million people picture when
              they get hungry is a considerable power, whatever we agree to call
              it.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="demands" border>
        <Tag>Demands</Tag>
        <Heading>
          Wants with a <Highlight>wallet</Highlight> behind them
        </Heading>
        <ContentText className="mb-2">
          <p>
            A want becomes a demand the moment somebody can pay for it. Until
            then it is a wish, and wishes do not appear in a revenue forecast.
          </p>
        </ContentText>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3">
            <Metric value="1980" label="First store, Laval, Québec" />
          </Column>
          <Column spanRatio="1/3">
            <Metric
              value="≈17,000"
              label="Stores today, as Couche-Tard and Circle K"
            />
          </Column>
          <Column spanRatio="1/3" justify="center">
            <ContentText layout="base">
              The milk there is expensive. Everyone buying it knows the milk is
              expensive.
            </ContentText>
          </Column>
        </Row>
        <ContentText>
          <p>
            They buy it anyway, because it is eleven at night and the store is
            four hundred metres away. Alimentation Couche-Tard built a business
            on the gap between wanting milk and being able to get milk.{" "}
            <strong>Convenience was the product.</strong> The milk was
            inventory.
          </p>
        </ContentText>
      </Slide>

      <Slide id="discussion-the-watch" border>
        <Tag>Over to you</Tag>
        <Heading>
          The <Highlight>watch</Highlight>
        </Heading>
        <DiscussionCard title="Discussion">
          A mechanical watch keeps worse time than the phone already in your
          pocket and costs a hundred times more. What need is the buyer actually
          satisfying — and who decided this object was the right form for it?
        </DiscussionCard>
      </Slide>

      {/* ================================================================
          III. Value and satisfaction
          ================================================================ */}
      <Slide id="customer-value" border>
        <Tag>Value</Tag>
        <Heading>
          Value is a <Highlight>subtraction</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Customer value is everything the buyer believes they are getting,
            less everything they believe it will cost them to get it.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Money is the first deduction and usually the largest. It gets all the attention for that reason alone."
        >
          <ValueWaterfall />
        </Figure>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              The rest of that column is where deals quietly die: the afternoon
              spent installing it, the risk that it turns out to be wrong, the
              conversation with whoever told you not to buy it.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Both columns are beliefs. Two people can face an identical price
              tag, run the same subtraction, and reach opposite answers with
              neither of them making an error.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide id="satisfaction" border>
        <Tag>Satisfaction</Tag>
        <Heading>
          The distance between two <Highlight>lines</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Satisfaction is a comparison. The customer measures what arrived
            against what they were led to expect — and marketing is what set the
            expectation.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The promise is the lever that wins the sale. It is also the bar the product has to clear afterwards."
        >
          <SatisfactionWedge />
        </Figure>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Raise the promise and you raise the bar with it. Competent firms
              walk into this every quarter, one reasonable decision at a time.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="The gap that matters">
              <ContentTitle>Highly satisfied</ContentTitle>
              <ContentDescription>
                Buy again, buy more, and tell other people.
              </ContentDescription>
              <div className="h-px w-full bg-[var(--rule)] my-5" />
              <ContentTitle>Merely satisfied</ContentTitle>
              <ContentDescription>
                Leave the moment something marginally better shows up.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText layout="base">
          The discipline is to promise slightly under what you can deliver and
          let the product close the gap. It costs sales in the short run. It is
          how the teal wedge gets built.
        </ContentText>
      </Slide>

      {/* ================================================================
          IV. Five philosophies
          ================================================================ */}
      <Slide id="five-ideas" border>
        <Tag>Section II</Tag>
        <Heading>
          Five ideas about what a business is <Highlight>for</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Firms answer the question &ldquo;what are we here to do?&rdquo; in
            roughly five ways. Textbooks lay them out as a timeline running from
            the Industrial Revolution to the present, which is flattering to the
            present.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Plotted by attention and horizon instead of by date, the eras turn back into positions."
        >
          <PhilosophyMatrix />
        </Figure>
        <ContentText layout="base">
          All five are occupied this morning, sometimes by different floors of
          the same building. The question worth asking about any employer is
          which position it actually holds — a figure you read off the budget,
          not the mission statement.
        </ContentText>
      </Slide>

      <Slide id="production-concept" border>
        <Tag>Philosophy 01</Tag>
        <Heading>The production concept</Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3">
            <Card title="Premise">
              <ContentDescription>
                Customers favour whatever is available and affordable. So make
                more of it, and make it for less.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Where it earns its keep">
              <ContentDescription>
                Demand running ahead of supply, and categories where price
                genuinely decides — commodities, generics, most of
                manufacturing&apos;s first century.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Failure mode">
              <ContentDescription>
                A magnificently efficient factory, producing something that no
                longer has buyers.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="product-concept"
        border
        quizData={quizBySlideId["product-concept"]}
      >
        <Tag>Philosophy 02</Tag>
        <Heading>
          The product concept, and the <Highlight>trap</Highlight> inside it
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                The premise: customers reward the best-made thing, so the work
                is relentless improvement.
              </p>
              <p>
                Theodore Levitt named the failure mode in{" "}
                <em>Harvard Business Review</em> in 1960 and called it{" "}
                <strong>marketing myopia</strong> — defining the business by
                what it makes instead of by the job the customer needs done. His
                example was the American railroads, beaten by the aeroplane and
                the car because they had decided they were in the railroad
                business rather than the transportation business.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5" justify="center">
            <Card title="Kodak, with a lab notebook">
              <ContentDescription>
                Steven Sasson built the first digital camera there in 1975.
                Kodak patented it, looked at a business that made its money on
                film, and put it away. Chapter 11 followed in January 2012.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <Figure
          height="auto"
          caption="The company held the patent on its own replacement for thirty-seven years."
        >
          <KodakSchematic />
        </Figure>
        <ContentText layout="base">
          It kept making excellent film the whole way down. Excellence was never
          the problem.
        </ContentText>
      </Slide>

      <Slide id="selling-concept" border>
        <Tag>Philosophy 03</Tag>
        <Heading>The selling concept</Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                The premise: left alone, customers will not buy enough, so the
                answer is volume and pressure.
              </ListItem>
              <ListItem>
                It is the natural home of unsought goods — life insurance,
                prepaid funerals, extended warranties, blood donation. Nobody
                wakes up wanting these.
              </ListItem>
              <ListItem>
                It optimises for the close; whatever happens afterwards belongs
                to a different department. Strong quarters, weak cohorts.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Callout title="A diagnostic you can run on your own employer">
              If growth depends on finding new customers faster than the old
              ones leave, this is the concept in the building — whatever the
              values poster in reception says.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="marketing-concept"
        border
        quizData={quizBySlideId["marketing-concept"]}
      >
        <Tag>Philosophy 04</Tag>
        <Heading>
          The <Highlight>marketing</Highlight> concept
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="2/5" justify="center">
            <Quote>Sense and respond, rather than make and sell.</Quote>
          </Column>
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                In 1984 a troupe of stilt-walkers and fire-breathers from
                Baie-Saint-Paul won a Québec government contract for the 450th
                anniversary of Jacques Cartier&apos;s landing. They used it to
                start <strong>Cirque du Soleil</strong>.
              </p>
              <p>
                They began from a question about the audience rather than a
                question about circuses: what would an adult pay real money for
                on a night out? The answers took them away from animals and
                three rings, and towards a score, a narrative, and a single
                stage.
              </p>
              <p>
                Then they priced it against theatre and opera. The circus
                category was dying. They left through the customer.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide id="societal-concept" border>
        <Tag>Philosophy 05</Tag>
        <Heading>
          The <Highlight>societal</Highlight> marketing concept
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText>
              <p>
                The premise: serving what a customer wants today can quietly
                damage what that customer — or everyone standing near them —
                will need later.
              </p>
              <p>
                On Black Friday 2011, Patagonia bought a full page of the{" "}
                <em>New York Times</em> to run an advertisement headed{" "}
                <strong>&ldquo;Don&apos;t Buy This Jacket.&rdquo;</strong>
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Callout variant="secondary" title="Sit with this one">
              Sales went up. That result is genuinely ambiguous: either proof
              that the concept works commercially, or proof that it makes
              unusually good advertising. In 2022 the founder transferred
              ownership to a trust directing profits to climate work, which is a
              much harder thing to stage.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="discussion-pivot" border>
        <Tag>Over to you</Tag>
        <Heading>
          Pivoting without losing the <Highlight>base</Highlight>
        </Heading>
        <DiscussionCard title="Discussion">
          A fast-food chain wants to move from the selling concept to the
          societal one. Its customers chose it for price and speed. What can it
          change without breaking the reason those customers came?
        </DiscussionCard>
      </Slide>

      {/* ================================================================
          V. The process
          ================================================================ */}
      <Slide id="from-idea-to-practice" border>
        <Tag>Section III</Tag>
        <Heading>
          From idea to <Highlight>practice</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            The five philosophies are positions a firm holds. This is the work
            it does.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Four steps spend money on the customer. The fifth collects, and what it collects funds the next turn."
        >
          <ProcessCycle />
        </Figure>
        <ContentText layout="base">
          The order is doing real work. A large share of expensive marketing
          mistakes are one step performed before the step that was supposed to
          inform it — a campaign built before anyone asked who it was for, a
          price set before anyone checked what the alternative costs.
        </ContentText>
      </Slide>

      <Slide id="step-one" border>
        <Tag>Step 01</Tag>
        <Heading>
          Understand the <Highlight>market</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Before deciding anything, establish what is actually true about
                customers, competitors, and the ground you are standing on.
              </ListItem>
              <ListItem>
                This is the step firms skip, and for three good reasons: it is
                slow, it costs money, and it has a habit of returning the answer
                management did not want.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Callout variant="secondary" title="Locally">
              In Québec that ground includes the Charter of the French Language,
              which governs how you may name, label, package and advertise a
              product here. Firms that treat it as a translation task at the end
              of the process have already made it expensive.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="step-two" border quizData={quizBySlideId["step-two"]}>
        <Tag>Step 02</Tag>
        <Heading>
          Decide <Highlight>who</Highlight>, and decide how
        </Heading>
        <ContentText className="mb-2">
          <p>
            Strategy here is two questions. The first is uncomfortable enough
            that firms routinely answer the second instead.
          </p>
        </ContentText>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/2">
            <Card title="Question one">
              <ContentTitle>Which customers will we serve?</ContentTitle>
              <ContentDescription>
                Segmentation and targeting. Answering it honestly means naming
                the customers you are prepared to lose.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Question two">
              <ContentTitle>How will we serve them better?</ContentTitle>
              <ContentDescription>
                Differentiation and positioning — measured against the
                alternatives the customer is actually weighing, which are rarely
                the ones you benchmark against.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText layout="base">
          A firm that cannot name the customers it is prepared to lose has not
          answered question one.
        </ContentText>
      </Slide>

      <Slide id="step-three" border>
        <Tag>Step 03</Tag>
        <Heading>
          Build the <Highlight>offer</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                The marketing mix is the set of levers a firm genuinely
                controls: product, price, place, promotion.
              </ListItem>
              <ListItem>
                Four Ps is a checklist. Its value is diagnostic — line the four
                up beside each other and contradictions between them become
                impossible to miss.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Quote>
              A premium product at a discount price in a discount channel does
              not read as a bargain. It reads as a fake.
            </Quote>
          </Column>
        </Row>
      </Slide>

      <Slide id="step-four" border>
        <Tag>Step 04</Tag>
        <Heading>
          Build the <Highlight>relationship</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText>
              <p>
                Customer relationship management is the work of keeping
                profitable customers. The software sold under that name is a
                filing cabinet for the work.
              </p>
              <p>
                Tim Hortons has run Roll Up the Rim since 1986, and the prizes
                are close to beside the point. What the contest buys is a reason
                to come back tomorrow morning — and tomorrow morning is worth
                more than any single quarter.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Callout title="The asset being built">
              Customer equity: the combined lifetime value of every customer the
              firm currently has. It appears on no balance sheet, and it is most
              of what the firm is worth.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="step-five" border>
        <Tag>Step 05</Tag>
        <Heading>
          Capture the <Highlight>value</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            The first four steps spend. This is where the firm gets paid — in
            sales, in share, and in profit. Work the arithmetic on a coffee
            habit, then put a four-dollar refund next to it.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The decision a shift manager actually has in front of them when an order goes wrong."
        >
          <LifetimeScale />
        </Figure>
        <ContentText layout="base">
          Firms that measure lifetime value hand back the four dollars without a
          conversation. Firms that measure the transaction argue about it. Over
          a few hundred thousand such moments, those two firms end up in
          different businesses.
        </ContentText>
      </Slide>

      <Slide id="discussion-loyalty" border>
        <Tag>Over to you</Tag>
        <Heading>
          What else are you <Highlight>giving</Highlight> them?
        </Heading>
        <DiscussionCard title="Discussion">
          Name a brand you are loyal to. Beyond your money, what else does it
          capture from you — and what would it have to do to lose it?
        </DiscussionCard>
      </Slide>

      {/* ================================================================
          Close
          ================================================================ */}
      <Slide id="takeaways" border>
        <Tag>Week 01</Tag>
        <Heading>
          What to <Highlight>take away</Highlight>
        </Heading>
        <AnimatedList className="max-w-none">
          <ListItem>
            Marketing creates value and captures part of it back. Any activity
            doing neither is decoration with a budget line.
          </ListItem>
          <ListItem>
            Needs are given. Wants are shaped, demands are funded, and the
            difference decides where a firm is able to compete at all.
          </ListItem>
          <ListItem>
            All five philosophies of the firm are in use today. To find out
            which one you work for, read the budget.
          </ListItem>
          <ListItem>
            The five steps are sequenced on purpose. Value gets captured last
            because it has to exist first.
          </ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
