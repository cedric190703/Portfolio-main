# Article completion

Scope: finish the existing seven bilingual articles within the current Next.js,
React and CSS implementation. Preserve the supplied drafts and existing edits.

Acceptance: all seven routes render, unknown slugs return 404, article titles and
descriptions appear in metadata, EN/FR navigation works, and diagrams, code,
tables and lists remain readable on narrow screens and in both themes.

Implementation: retain the block-based content model; separate route metadata
from the interactive reader; repair diagram geometry and article CSS collisions.
No database, external services or deployment changes are required.

Verification: TypeScript, production build, route smoke checks and browser review
of the archive and article layouts. Changes stay local for review; rollback is
reverting only the article completion changes, preserving earlier user edits.

## Completed

- Seven article routes are prerendered with individual title, description and
  social metadata. Unknown slugs return HTTP 404 with archive navigation.
- The bilingual reader retains the supplied prose, code, tables and figures.
  Contact links include the current article title; the reading region declares
  its language, and diagram labels are translated for screen readers.
- Fixed archive/list style collisions, restored bullet and number markers,
  constrained mobile overflow and added keyboard focus to scrollable diagrams.
- Repaired harness geometry, robotics contrast and callouts, the translation
  loop after correction, and the BCI window/time proportions.

## Verification — 2026-09-13

- `npm run build`: passed, including TypeScript and seven static article routes.
- `tsc --noEmit` and `git diff --check`: passed.
- Production browser checks: seven articles × two languages × three widths
  (1280, 768 and 375 px), no document overflow or browser exceptions.
- All 14 translated diagrams have no labels outside their SVG view boxes.
  Captured light/dark figure screenshots and reviewed key repaired diagrams.
- Verified per-article English metadata, language toggling and unknown-slug 404.
- Local preview: http://localhost:3000/articles. No deployment performed.

Editorial limit: the existing first-person project accounts and measurements
were preserved; this completion pass did not independently fact-check them.
