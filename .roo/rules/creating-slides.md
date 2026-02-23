# Creating Slides

This guide explains how to build cinematic, 1:1 pixel-perfect slides for the "Applications of AI in Business" course. We use the custom React components provided in `src/components/SlideComponents.tsx`.

## Philosophy
*   **Mobile-First:** Design for mobile devices first. Components like `Grid` handle responsive layout automatically (stacking on mobile, side-by-side on desktop).
*   **Cinematic Feel:** Every animation and spacing choice is intentional. Use the components provided, as they have built-in GSAP stagger animations (`gsap-reveal`).
*   **Avoid Generic Content:** Keep text concise, professional, and visually engaging. Utilize the card and media components to structure information effectively.

---

## 1. Overall Structure
A slide deck is wrapped in a `<SlideDeck>` component. Individual slides are wrapped in a `<Slide>` component, representing one full screen.

```tsx
import { SlideDeck, Slide, Title, Subtitle } from "@/components/SlideComponents";
import { ParticleNetworkBackground } from "@/components/Backgrounds";

export default function Presentation() {
  return (
    <SlideDeck background={<ParticleNetworkBackground />}>
      {/* Slide 1 */}
      <Slide>
        <Title>AI in Business</Title>
        <Subtitle>Course Introduction</Subtitle>
      </Slide>

      {/* Slide 2 */}
      <Slide>
        {/* Slide Content */}
      </Slide>
    </SlideDeck>
  );
}
```

---

## 2. Layouts

Use `Grid` and `Column` to align items side-by-side on large screens and stack them on mobile.

```tsx
<Grid gap="large" items="center">
  <Column spanRatio="1/2">
    <Heading>Left Side Content</Heading>
  </Column>
  <Column spanRatio="1/2">
    <ContentText>Right Side Content</ContentText>
  </Column>
</Grid>
```

Remember that Column takes spanRatio (default "1/2") as an optional argument to detect what proportion of the screen width to allocate to the column. 

---

## 3. Typography Components

Components automatically hook into GSAP entrance animations.

*   **`Title`**: The main presentation title (`<h1>`). Usually on the hero slide.
*   **`Heading`**: Section headings (`<h2>`). Use at the top of a slide.
*   **`Subtitle`**: Underneath a Title or Heading. Use `variant="hero"` or `variant="section"`.
*   **`Highlight`**: Gradients to emphasize key terms. Use `block` to push it to a new line.
*   **`Tag`**: Small floating uppercase text at the top of the screen to indicate the category.
*   **`ContentText`**: Body text. Use `layout="prose"` for larger paragraphs/lists or `layout="base"` for left-bordered callout text.

```tsx
<Slide>
  <Tag>Introduction</Tag>
  <Heading>
    Understanding <Highlight>Deep Learning</Highlight>
  </Heading>
  <Subtitle variant="section">How neural networks map the real world.</Subtitle>
</Slide>
```

---

## 4. Cards & Interactive Elements

*   Use **`Card`**, **`ContentTitle`**, and **`ContentCard`** as follows:
<Card>
  <ContentTitle>The title</ContentTitle>
  <ContentDescription>
    The description  
  </ContentDescription>
</Card>

*   **`DiscussionCard`**: Interactive card designed for class discussion questions. It reveals the `children` content when hovered or clicked.

```tsx
<Grid gap="medium">
  <Column>
    <Card>
      <ContentTitle>The title</ContentTitle>
      <ContentDescription>
        The description  
      </ContentDescription>
    </Card>
  </Column>
  <Column>
    <DiscussionCard title="Group Activity">
      How would your company leverage this?
    </DiscussionCard>
  </Column>
</Grid>
```

---

## 5. Media & Data Displays

*   **`MediaBlock`**: A shadow-boxed image container with an optional italicized `caption`.
*   **`Quote`**: A stylized blockquote requiring an `author` and optionally a `role`.
*   **`Metric`**: Displays a large stat with a label (e.g., `value="45%"` and `label="Increase in ROI"`).
*   **`Callout`**: A key takeaway box (`variant="primary"` or `variant="secondary"`).

```tsx
<Grid>
  <Column>
    <Metric value="10x" label="Performance Gain" />
  </Column>
  <Column>
    <Quote author="John Doe" role="Chief AI Officer">
      AI isn't the future, it is the present.
    </Quote>
  </Column>
</Grid>
```

---

## 6. Lists

*   **`AnimatedList`**: Wrapper for lists.
*   **`ListItem`**: Items inside the list, featuring a custom animated checkmark.

```tsx
<AnimatedList>
  <ListItem>Identify the problem</ListItem>
  <ListItem>Gather data</ListItem>
  <ListItem>Train the model</ListItem>
</AnimatedList>
```
