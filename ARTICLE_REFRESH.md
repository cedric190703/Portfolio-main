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
