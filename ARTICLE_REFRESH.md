# Article refresh

Scope: improve all seven existing English/French articles with technical corrections,
clearer limits and actionable evaluation guidance; add a bilingual article on RAG
retrieval evaluation. Preserve existing routes and visual design.

Implementation: keep the block content format, add a typed reference block and its
reader rendering, derive archive count from content. No dependencies or deployment.

Validation: TypeScript, production build, content parity and generated-route checks.
Existing unrelated working-tree changes are outside this edit.

Completed: technical corrections and new evaluation sections in all seven existing
articles, primary references, bilingual RAG article featured first, dynamic count.

Verification:
- `npx tsc --noEmit`: passed.
- `npm run build`: passed (network access required for existing Google Fonts).
- Browser: all 8 routes in EN/FR, references, section navigation, widths 1280/768/375,
  unknown-route 404 and no page errors passed.
- `git diff --check`: passed.
- Local production preview: http://localhost:3000/articles.

No commit, push or deployment performed. Existing first-person project accounts
were retained; source references support technical guidance, not independent
verification of the author's historical project observations.

## Visual expansion

Add 17 bilingual interactive schemas to the existing 7 diagrams, yielding three
figures per article. Use typed content blocks and responsive native HTML/CSS for
flows, layer stacks, comparisons and feedback cycles. Preserve prose and routes.
Each node has a visible summary and selectable explanatory detail. Include figure
anchors and an article visual index. No dependencies or external services needed.
Validate figure counts, EN/FR parity, every node interaction, keyboard focus,
mobile overflow, dark/light rendering, type checking and production build.

Visual expansion completed:
- 24 figures across 8 articles (17 new interactive schemas), in EN and FR.
- Four visual layouts; numbered anchors and a collapsible visual index.
- Native buttons, selected-state announcements, keyboard focus and reduced motion.
- Layout switches by container width, including narrow desktop/tablet columns.
- Updated older memory-budget and confidence-threshold annotations.

Validation: production build and TypeScript passed; 110 bilingual node interactions,
24 figure anchors, 32 theme/language/layout screenshots, and no browser page errors.
A final responsive check passed for all 17 new schemas at 375, 768 and 1280 px
(51 layout checks). Representative desktop, mobile, dark and French renders were
visually inspected. Preview: http://localhost:3001/articles.
