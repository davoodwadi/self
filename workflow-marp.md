# Presentation Creation Workflow

This workflow outlines the systematic process for generating course presentations for **BUSI 654: Applications of AI in Business**. The goal is to produce high-quality, consistent slide decks suitable for MBA students using Markdown and Marp.

## 1. Preparation Phase
- **Define Topic**: Identify the specific subject for the week (e.g., "Generative AI in Marketing").
- **Set Objectives**: List 3-5 key learning outcomes for the students.
- **Gather Context**: Collect relevant case studies, definitions, and business applications.

## 2. Scaffolding
- **Create Directory**: Create a new directory for the week following the `kebab-case` convention (e.g., `03-gen-ai-marketing`).
- **Initialize File**: Create a `slides.md` file within the directory.
- **Add Header**: Insert the Marp frontmatter configuration.

```markdown
---
marp: true
theme: default
class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---
```

## 3. Content Generation Pipeline
Focus on business value, strategic implications, and high-level technical concepts.

### Step 3.1: Title & Agenda
- **Slide 1**: Course Name, Week Number, Topic Title, Lecturer Name.
- **Slide 2**: Agenda/Roadmap for the session.

### Step 3.2: Conceptual Foundation
- Explain technical concepts using analogies suitable for business students.
- **Action**: Create diagrams using Mermaid.js to visualize workflows or architectures.
  - *Example*: Neural network architecture simplified, Data flow in an AI system.

### Step 3.3: Business Application & Case Studies
- Dedicate slides to real-world examples.
- Structure: **Problem** -> **AI Solution** -> **Business Impact/ROI**.

### Step 3.4: Interactive Elements
- Include discussion questions or small workshop activities.
- Add a "Key Takeaways" summary slide.

## 4. Review & Refine
- **Visual Check**: Ensure diagrams render correctly.
- **Tone Check**: Verify the language is appropriate for MBA students (strategic vs. purely technical).
- **Formatting**: Use Marp directives (e.g., `<!-- _class: lead -->`) to style chapter headers.

## 5. Export
- Convert the Markdown file to PDF or HTML for distribution using the VS Code Marp extension.
