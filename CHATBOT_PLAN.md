# Portfolio assistant — local completion, 2026-09-15

## Delivered behavior

Bilingual “Ask about Cédric” dialog with portfolio retrieval, streamed AI answers,
source links, and eight predefined Q&A topics: profile, employment, technologies,
OfflineLingo, AI projects, education, writing, and contact/languages.

The visitor sees remaining AI requests, availability/exhaustion, and the next
reset date at 00:00 UTC. Defaults are 5 AI attempts per visitor per day, 40 for the
whole site per day, 8 per visitor per 10-minute window and 8 site-wide per UTC minute bucket.
An attempt is reserved before dispatch and counts even if the provider fails.
Quota reads and predefined questions never consume AI allowance. Clearing chat
retains the visitor cookie and does not reset the quota. The UI refreshes status
on open, after inference, on window focus, and every 30 seconds while idle/open.

Classic Q&A can be selected at any time. After daily exhaustion, an unavailable
provider, or rejected citation references, predefined answers replace AI output.
Clicking a classic question is entirely local: no API request at all. Typed
questions in classic mode use deterministic keyword matching; unknown or sensitive
personal questions receive an explicit absence-of-answer message and contact link.
The history retains at most 50 turns; there is no daily limit on classic Q&A.

## Zero-cost inference controls

- Only `openrouter/free` is accepted. Other model IDs, including `openrouter/auto`
  and `openrouter/auto:free`, are rejected before a generation call.
- Provider prompt/completion price caps are zero. No paid fallback, paid plugin,
  external web search, automatic retry or model-selected tool execution exists.
- Provider data collection is denied. If no compatible free endpoint is available,
  use classic Q&A; never loosen privacy or price constraints automatically.
- API credentials are server-side only. `.env.local` and `.chat-state/` are ignored
  by Git. The configured key was never printed in tool output or client code.

## Local configuration

The prepared `.env.local` contains the user's key and a generated signing secret.
`OPENROUTER_MODEL` must be `openrouter/free` (or unset). `CHAT_VISITOR_DAILY_LIMIT`
defaults to 5 and `CHAT_DAILY_LIMIT` to 40. Restart the dev server after editing.
Preview: `npm run dev -- --port 3003` → http://localhost:3003.

Development counters persist in `.chat-state/budget.json` across process restarts;
updates are serialized within one development server. Do not run several dev
servers against the same state file. The signed cookie preserves visitor identity
across refreshes. This is anonymous browser identity, not person identification:
a cleared cookie or another browser can acquire another allowance, while the
site-wide budget still bounds total inference. Public hosting should apply its
own IP/bot controls if stronger visitor enforcement is required.

Production inference fails closed unless a stable CHAT_COOKIE_SECRET (32+ chars)
and CHAT_REDIS_REST_URL/TOKEN are configured. Redis reads and reservations use a
single atomic Lua script shared across instances, with UTC expiry. Only anonymous
quota counters are stored. No Redis service was provisioned; live production
storage integration remains a release prerequisite. Classic Q&A works regardless.

## Grounding, security and limits

Public portfolio copy is shared with the main page without changing its text.
Source categories distinguish employment, projects, stated skills and writing.
No private documents are indexed. Citation validation checks reference IDs, not
semantic entailment: AI answers can still be wrong. Lexical retrieval can miss
paraphrases; the test set is not a claim of universal accuracy.

POST validates same-origin, strict JSON shape and byte/character/history bounds.
Generation has a 25-second timeout, bounded output, abort support and safe errors.
The server does not store or log conversations. The interface discloses that
questions for AI are sent to OpenRouter and a model provider. Clear removes local
history; source links are application-owned, never generated executable markup.

## Verification

- 16 test groups cover bilingual retrieval, source categories, free-router
  enforcement, signed cookies, daily reset, concurrent reservations, last permitted
  request, subsequent non-AI fallback, read-only status, unknown facts, invalid
  input/origin, incomplete streams, and hidden upstream errors.
- One direct live free-router check selected `inclusionai/ling-3.0-flash-vl:free`,
  returned a supported answer, reported cost 0, and account usage remained 0.
- One live request through the actual chatbot answered OfflineLingo's technology
  question with citations and changed the allowance from 5/5 to 4/5.
- Browser checks cover EN/FR at 375, 768 and 1280 px, exhausted/renewed quotas,
  classic click and typed questions with zero POST calls, clear preserving usage,
  Escape/focus restoration, and document/dialog overflow. No browser exceptions.
- Reviewed desktop light and mobile dark screenshots. Restarted a stale dev
  preview so its CSS matched the files and explicitly checked computed quota styles.
- TypeScript, production build and whitespace checks are run before handoff.

No commits, pushes, deployments, credit purchases or infrastructure provisioning.

References:
- https://openrouter.ai/docs/guides/routing/routers/free-router
- https://openrouter.ai/docs/guides/routing/provider-selection
- https://openrouter.ai/docs/api/api-reference/chat/send-chat-completion-request
- https://upstash.com/docs/redis/features/restapi

## Security and cost audit — 2026-09-15

Audit the shared quota under 100 concurrent visitors, lock configuration to a
maximum of 40 site-wide and 5 visitor requests/day, and reduce each UTC minute
bucket to 8 (at most 16 requests straddling a minute boundary). Retain zero-price
routing and fail-closed production requirements. Scan tracked files and browser
build assets for configured secret values without displaying those values.


Audit outcome: 100 simulated visitors made 500 attempts across five minutes;
only 40 were admitted. A subsequent new visitor was rejected by the shared daily
cap. Adjacent-minute bursts admitted at most 16 requests across both buckets,
below OpenRouter's published 20/minute free-model limit. Environment settings
cannot raise the daily site maximum above 40 or the visitor maximum above 5.
Quota-store failure returned Q&A without calling OpenRouter. Quota credentials
require HTTPS, and credential-bearing fetches refuse redirects. Corrupt local
counter records fail closed. Production still requires shared Redis and was not
deployed. Configured secret values were scanned in memory against tracked files,
current app/source/test/docs files and production browser assets; none were found.
`node tests/secret-audit.cjs` prints only counts or affected paths/secret names.

Scope of cost assurance: the app permits only the free router with zero-price
provider caps and no paid fallback. Its 40/day ceiling leaves headroom under the
published basic free allowance of 50/day. Other applications on the same
OpenRouter account can consume that shared provider allowance; this app cannot
control their usage. Provider quota errors fall back to Q&A, never paid inference.
Use a dedicated portfolio key and keep account billing/auto-top-up disabled if
zero account spending is required. Hosting/Redis charges are separate from model
inference; no such services were provisioned or billing settings changed here.
No complete-system security guarantee is implied by these focused checks.

Published limits checked: https://openrouter.zendesk.com/hc/en-us/articles/39501163636379-OpenRouter-Rate-Limits-What-You-Need-to-Know

## Voice update

Changed the EN/FR title, suggested questions, predefined answers and contact
labels to first-person portfolio wording (“Ask about me”, “my articles”, “Contact
me”). Suggested questions address the author as “you” / “tu”. The model prompt
uses the same authorised first-person voice while retaining visible AI labelling
and prohibiting invented facts, private access or claims of a live human reply.
All 16 test groups and TypeScript passed. No model requests or pushes were made.

## Push preparation

User authorized pushing the completed chatbot. Added a 60-request/minute local
load-shedding guard ahead of API work, 5-second body timeout and browser security
headers. Configurations that cannot run inference avoid quota I/O and retrieval.
See CHATBOT_SECURITY.md for enforced protections versus hosting-account controls.
17 test groups passed. No claim is made that DDoS attacks are impossible.
