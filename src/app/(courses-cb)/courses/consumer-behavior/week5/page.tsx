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
  Figure,
  AnimatedList,
  ListItem,
  Quote,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import {
  SelfDiscrepancyModel,
  ExtendedSelfRings,
  BrandPersonalityDimensions,
  AioFramework,
} from "./visuals";

export default function Week5() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 05"
      background={<BackgroundManager type="marketing" />}
    >
      {/* ================================================================
          Slide 1: Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 05 · Consumer Behavior</Subtitle>
        <Title className="mt-6">
          Personality, Self-Concept &amp; Lifestyles
        </Title>
        <p className="type-lead max-w-[44ch] mt-4">
          Consumers do not just buy products. They buy symbols that mirror who
          they are and who they hope to become.
        </p>
      </Slide>

      {/* ================================================================
          Slide 2: What Is the Self-Concept?
          ================================================================ */}
      <Slide id="what-is-the-self-concept" border>
        <Tag>Overview</Tag>
        <Heading>
          What is the <Highlight>self-concept</Highlight>?
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Self-concept is the collection of beliefs a person holds about
                their own attributes and qualities.
              </p>
              <p>
                It includes how we judge our own appearance, intellect, skills,
                and character.
              </p>
              <p>
                Self-esteem refers to the positivity of a person&apos;s
                self-concept. People with high self-esteem expect to succeed and
                take more risks when trying new products.
              </p>
              <p>
                People with low self-esteem try to avoid failure and seek
                reassurance through safe, well-known brands.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="Morris Rosenberg" role="Self-Concept Pioneer">
              The self-concept is not merely a cognitive structure; it is an
              affective evaluation of our worth.
            </Quote>
            <ContentText layout="base">
              Marketers build brands that validate consumer identity and protect
              their self-worth.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 3: The Actual Self Versus the Ideal Self [quiz]
          ================================================================ */}
      <Slide
        id="the-actual-self-versus-the-ideal-self"
        border
        quizData={quizBySlideId["the-actual-self-versus-the-ideal-self"]}
      >
        <Tag>Identity Gap</Tag>
        <Heading>
          The <Highlight>actual self</Highlight> versus the ideal self
        </Heading>
        <ContentText className="mb-2">
          <p>
            Consumers constantly compare who they are with who they want to
            become.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Emotional tension between current and aspirational states motivates compensatory buying."
        >
          <SelfDiscrepancyModel />
        </Figure>
        <Row gap="large" items="start" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="Actual Self">
              <ContentDescription>
                A realistic appraisal of the qualities and assets we have right
                now. Products that support the actual self focus on utility,
                comfort, and everyday authenticity.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Ideal Self">
              <ContentDescription>
                Our conception of who we would like to be. Aspirational
                advertising and luxury goods appeal to this imagined identity.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 4: The Extended Self: Possessions as Identity [quiz]
          ================================================================ */}
      <Slide
        id="the-extended-self-possessions-as-identity"
        border
        quizData={quizBySlideId["the-extended-self-possessions-as-identity"]}
      >
        <Tag>Belk&apos;s Theory</Tag>
        <Heading>
          The <Highlight>extended self</Highlight>: possessions as identity
        </Heading>
        <ContentText className="mb-2">
          <p>
            Russell Belk proposed that our possessions become external anchors
            for our identity across four levels.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The extended self spans from personal treasures to broader group loyalties."
        >
          <ExtendedSelfRings />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/4">
            <Card title="Individual">
              <ContentDescription>
                Jewelry, clothing, shoes, cars, and smartphones that define
                personal style.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4">
            <Card title="Family">
              <ContentDescription>
                A home, heirloom furniture, and shared family routines that
                anchor heritage.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4">
            <Card title="Community">
              <ContentDescription>
                Neighborhood landmarks and hometown pride that give a sense of
                belonging.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4">
            <Card title="Group">
              <ContentDescription>
                Sports fan gear, subcultural symbols, and social movements that
                define solidarity.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 5: Personality Traits and Consumer Behavior
          ================================================================ */}
      <Slide id="personality-traits-and-consumer-behavior" border>
        <Tag>Trait Theory</Tag>
        <Heading>
          Personality traits and <Highlight>consumer behavior</Highlight>
        </Heading>
        <ContentText className="mb-4">
          <p>
            Personality refers to a person&apos;s unique psychological makeup
            that consistently influences responses to marketing stimuli.
          </p>
        </ContentText>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>Key Consumer Traits</ContentTitle>
            <AnimatedList>
              <ListItem>
                <strong>Innovativeness:</strong> Degree to which a person likes
                to try new products and ideas first.
              </ListItem>
              <ListItem>
                <strong>Materialism:</strong> Emphasis placed on owning worldly
                goods as markers of success.
              </ListItem>
              <ListItem>
                <strong>Need for Cognition:</strong> Pleasure taken in effortful
                thinking and reading detailed facts.
              </ListItem>
              <ListItem>
                <strong>Frugality:</strong> Habitual resourcefulness and
                restraint in daily spending.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Predicting Behavior">
              <ContentDescription>
                Single traits rarely explain every purchase. But combining
                traits helps marketers predict who adopts early, who reads
                product specifications, and who waits for sales.
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>
                Consumers with a high need for cognition respond best to clear
                data and evidence, while low-cognition buyers respond to visual
                cues.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 6: The Big Five Personality Dimensions [quiz]
          ================================================================ */}
      <Slide
        id="the-big-five-personality-dimensions"
        border
        quizData={quizBySlideId["the-big-five-personality-dimensions"]}
      >
        <Tag>Psychology Dimensions</Tag>
        <Heading>
          The <Highlight>Big Five</Highlight> personality dimensions
        </Heading>
        <ContentText className="mb-4">
          <p>
            Modern psychology identifies five universal dimensions that capture
            human personality variation.
          </p>
        </ContentText>
        <AnimatedList>
          <ListItem>
            <strong>01. Openness to Experience:</strong> Curiosity, creativity,
            and preference for variety and novel ideas.
          </ListItem>
          <ListItem>
            <strong>02. Conscientiousness:</strong> Self-discipline, organized
            habits, and goal-directed dependability.
          </ListItem>
          <ListItem>
            <strong>03. Extraversion:</strong> Sociability, assertiveness,
            energy, and enthusiasm in group settings.
          </ListItem>
          <ListItem>
            <strong>04. Agreeableness:</strong> Compassion, friendliness, trust,
            and cooperative warmth toward others.
          </ListItem>
          <ListItem>
            <strong>05. Neuroticism:</strong> Emotional reactivity,
            susceptibility to stress, anxiety, and mood shifts.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* ================================================================
          Slide 7: Brand Personality: Giving Life to Objects [quiz]
          ================================================================ */}
      <Slide
        id="brand-personality-giving-life-to-objects"
        border
        quizData={quizBySlideId["brand-personality-giving-life-to-objects"]}
      >
        <Tag>Brand Equity</Tag>
        <Heading>
          Brand personality: <Highlight>giving life</Highlight> to objects
        </Heading>
        <ContentText className="mb-2">
          <p>
            Jennifer Aaker showed that people perceive brands as if they were
            people, assigning them distinct personality traits.
          </p>
        </ContentText>
        <BrandPersonalityDimensions />
        <ContentText layout="base" className="mt-4">
          <p>
            A consistent brand personality builds emotional resonance. When
            consumers feel a personality match, brand loyalty deepens.
          </p>
        </ContentText>
      </Slide>

      {/* ================================================================
          Slide 8: Anthropomorphism and Brand Relationships
          ================================================================ */}
      <Slide id="anthropomorphism-and-brand-relationships" border>
        <Tag>Emotional Connections</Tag>
        <Heading>
          Anthropomorphism &amp; <Highlight>brand relationships</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>Humanizing Brands</ContentTitle>
            <ContentText>
              <p>
                Anthropomorphism occurs when consumers assign human qualities,
                faces, or intentions to non-human objects.
              </p>
              <p>
                Beloved mascots turn abstract corporate products into friendly
                companions.
              </p>
              <p>
                When a brand feels like a human partner, brand love develops
                with strong emotional attachment and commitment.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="The Double-Edged Sword">
              <ContentDescription>
                When an anthropomorphized brand fails, consumers do not just
                feel dissatisfied. They feel personally betrayed, as if a friend
                lied to them.
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>
                Humanized brands must communicate product recalls and service
                errors with genuine empathy and transparency.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 9: Psychographics and Lifestyles: Measuring AIOs [quiz]
          ================================================================ */}
      <Slide
        id="psychographics-and-lifestyles-measuring-aios"
        border
        quizData={quizBySlideId["psychographics-and-lifestyles-measuring-aios"]}
      >
        <Tag>Market Segmentation</Tag>
        <Heading>
          Psychographics &amp; lifestyles: <Highlight>measuring AIOs</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Demographics reveal who buys. Psychographics reveal why they buy by
            measuring consumer activities, interests, and opinions.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The AIO framework categorizes everyday lifestyle patterns into actionable market segments."
        >
          <AioFramework />
        </Figure>
      </Slide>

      {/* ================================================================
          Slide 10: The VALS Segmentation System
          ================================================================ */}
      <Slide id="the-vals-segmentation-system" border>
        <Tag>Lifestyle Typology</Tag>
        <Heading>
          The <Highlight>VALS</Highlight> segmentation system
        </Heading>
        <ContentText className="mb-4">
          <p>
            The Values and Lifestyles (VALS) framework classifies adult
            consumers along two key dimensions: primary motivation and
            resources.
          </p>
        </ContentText>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3">
            <Card title="Ideals-Motivated">
              <ContentDescription>
                <strong>Thinkers &amp; Believers:</strong> Guided by knowledge,
                principles, and moral order. They favor durable, functional
                products and established brands.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Achievement-Motivated">
              <ContentDescription>
                <strong>Achievers &amp; Strivers:</strong> Driven by goals,
                career success, and peer approval. They purchase prestige items
                to signal accomplishment.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Self-Expression">
              <ContentDescription>
                <strong>Experiencers &amp; Makers:</strong> Motivated by
                physical activity, risk-taking, and hands-on creativity. They
                seek novelty, excitement, and self-reliance.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 11: Discussion: Your Extended Self
          ================================================================ */}
      <Slide id="discussion-your-extended-self" border>
        <Tag>Class Discussion</Tag>
        <Heading>
          Your <Highlight>extended self</Highlight>
        </Heading>
        <DiscussionCard title="Discussion: Your Extended Self">
          Name one possession you own that feels like part of your identity. If
          someone took it away, how would it change the way you see yourself?
          Does it reflect your actual self or your ideal self?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}
