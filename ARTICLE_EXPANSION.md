# Article expansion — September 2026

Outcome: add article 09 on retries and duplicate actions in English and French;
make all eight existing articles more actionable with worked diagnostic cases.
Use the existing Next.js/React block model, with no new dependencies or services.

Diagrams: distinguish architecture from sequence, provide keyboard traversal and
an expandable full explanation, improve narrow-screen readability, and correct
the latency diagram's additive timing explanation.

Acceptance: nine matching bilingual slugs, valid figure and section links,
keyboard-accessible diagrams, no mobile overflow, passing TypeScript and build.
Verification: production build, content integrity and browser interaction checks.
Changes remain local; no source-control publishing or deployment is requested.
Rollback: revert only this article expansion's files, preserving unrelated work.

## Completed and verified

- Added article 09, “Retrying is easy. Avoiding duplicate actions is harder.”,
  with a complete French version, two interactive diagrams, a decision table,
  failure-injection checklist, and primary AWS/Stripe references.
- Added a specific diagnostic example to every existing article in both languages.
- Architecture diagrams now use a grouping rail instead of sequence arrows;
  shared diagrams support arrow keys, Home/End, and expanded explanations.
- Improved diagram typography and intermediate-width flow layouts. Corrected
  the offline timeline caption to distinguish total and post-capture duration.
- `npx tsc --noEmit`, `npm run build`, and `git diff --check`: passed.
  The build required network access for the existing Google Fonts dependency.
- Production browser checks: 9 articles × 2 languages × 3 widths (375, 768,
  1280), 54 passing combinations, no page exceptions or horizontal overflow.
  Checked section anchors, keyboard selection and expanded explanation visibility.
- Reviewed screenshots of the new comparison diagram at mobile and desktop sizes.
- Existing first-person project accounts remain author-provided; the added
  scenarios are explicitly illustrative rather than claimed project measurements.
