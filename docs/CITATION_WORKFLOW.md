# Course Citation Extraction Workflow

## Overview

This workflow uses a centralized citation system where all sources are extracted from `deepResearch.md` and converted to a structured TypeScript file for use throughout the course generation pipeline.

## Workflow Steps

### 1. Extract Citations from DeepResearch

After your `deepResearch.md` is complete, run the extraction script:

```bash
node scripts/extractCitations.js ./deepResearch.md ./deepResearchCitations.ts
```

**Output:**
- `deepResearchCitations.ts` - Auto-generated file with all citations from the Sources section

### 2. Generate Content.md

The `course-content-generation` skill uses the extracted citations:
- Reference citation IDs using `[cite: 1, 2, 3]` in your markdown
- All IDs map to entries in `deepResearchCitations.ts`
- Include a final `## Sources` or `## References` slide listing all citations

### 3. Generate Page.tsx

The `course-page-generation` skill uses the citations for React components:

```tsx
import {
	CitationProvider,
	Citation,
} from "@/app/(courses)/_components/SlideComponents";
import {
	getCitation,
	getCitations,
	getCitationUrls,
} from "./deepResearchCitations";

// Wrap your page once so all <Citation ids={...} /> calls resolve locally:
<CitationProvider value={{ getCitation, getCitations, getCitationUrls }}>
	<SlideDeck>
		<Citation ids={[1, 2, 5]} />
	</SlideDeck>
</CitationProvider>
```

This keeps citation data course-local and avoids relying on any global citation file.

## File Structure

After generation, your course folder contains:

```
08-sustainability/
├── deepResearch.md                  # Source research document
├── deepResearchCitations.ts         # Auto-generated (run extraction script)
├── content.md                       # Generated from deepResearch.md
└── page.tsx                         # Generated from content.md + citations
```

## Citation File Format

The `deepResearchCitations.ts` file provides multiple utilities:

```typescript
// Get full Citation objects
getCitations([1, 2, 3]) 
// Returns: { id, title, url }[]

// Get just URLs (for Citation component)
getCitationUrls([1, 2, 3])
// Returns: string[]

// Get a single citation
getCitation(1)
// Returns: { id, title, url } | undefined
```

## DeepResearch.md Source Format

The script expects this format in your `deepResearch.md`:

```markdown
**Sources:**
1. [arxiv.org](https://example.com/paper1)
2. [nature.com](https://example.com/article2)
3. [google.com](https://example.com/report3)
```

The script extracts:
- Citation ID (sequential number)
- Title (text in brackets)
- URL (text in parentheses)

## Example Usage in Content.md

```markdown
## The Hidden Costs of Compute

While training receives attention, inference constitutes the majority of lifecycle emissions [cite: 1, 2]. Massive disparities exist in energy efficiency [cite: 1].
```

Maps to citations 1 and 2 from the Sources section.

## Regenerating Citations

If you update your `deepResearch.md` sources, simply re-run:

```bash
node scripts/extractCitations.js ./deepResearch.md ./deepResearchCitations.ts
```

The new file will overwrite the old one with updated citations.

## Best Practices

1. **Always extract first**: Before generating content.md, extract citations to have the complete citation map
2. **Use IDs, not URLs**: In content.md and page.tsx, always reference citations by ID (1, 2, 3), not URLs
3. **Keep deepResearch.md up to date**: The extraction script reads from the true source of record
4. **Verify citations**: After extraction, verify that all citations are present in deepResearchCitations.ts
