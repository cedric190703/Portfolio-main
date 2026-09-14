# Portfolio chatbot security and deployment

## Enforced in this repository

- AI model locked to openrouter/free; zero prompt/completion price caps, no paid
  fallback or generation retries. API keys are server-only.
- Hard maximum 40 site-wide AI attempts/day and 5/visitor/day; 8/minute bucket.
  Shared Redis reservations are atomic in production. Missing/broken quota
  configuration disables AI. Unlimited predefined Q&A remains available locally.
- Cheap ingress ceiling: 60 chat requests/minute per server process, before
  parsing and quota calls; excess requests receive 429 with Retry-After.
  This limits local work but does not enforce a distributed firewall limit.
- Request bodies capped at 12 KB, with a 5-second read deadline; strict input
  shape and bounded question/history. Model calls time out after 25 seconds.
- Same-origin POST, signed HttpOnly/SameSite visitor cookie, HTTPS-only quota
  credentials, no credential-bearing redirects, no conversation logging.
- Deny framing and object embedding, restrict base URI, disable unused camera,
  microphone and geolocation permissions, nosniff, restricted referrer policy.
  The CSP intentionally does not claim complete script-injection protection.
- Secrets/local counters are ignored by Git. Re-run `node tests/secret-audit.cjs`
  after building to check configured values against source and browser assets.

## Hosting controls — required before enabling public AI

No public app can guarantee that DDoS attacks are impossible. Attack traffic can
reach hosting infrastructure before application throttles execute. The following
are hosting-account settings, not protections this Git push can activate:

1. Confirm the host's edge DDoS protection is enabled. If using Vercel, automatic
   DDoS mitigation is documented at https://vercel.com/docs/vercel-firewall/ddos-mitigation.
2. Configure host/WAF limits for /api/chat, including GET requests, and use bot
   challenges where available. A suggested starting point is 10 requests/minute
   per trusted client IP, adjusted for shared networks. Reject oversized bodies
   at the edge. Check whether those controls require a paid plan before enabling.
3. Use host spending/usage controls and disable automatic overage purchases where
   supported. Model cost being zero does not guarantee hosting or Redis cost is
   zero. No paid protection or infrastructure was enabled in this task.
4. Configure shared Redis counters and the stable signing secret before enabling
   production AI. All replicas and deployments using the same OpenRouter account
   should share the budget store; other apps/account usage is outside this cap.
5. Keep the OpenRouter key dedicated to the portfolio, disable automatic credit
   top-ups, and review account-level limits. Never expose it through NEXT_PUBLIC.
6. For incidents, remove OPENROUTER_API_KEY from hosting configuration and redeploy
   to disable inference; keep classic Q&A. Rotate a suspected leaked key in
   OpenRouter and replace the hosting secret. Review host traffic/cost metrics.

Anonymous visitor limits can be bypassed by clearing cookies or changing browsers,
but doing so does not reset the shared global AI allowance. Development counters
are only designed for one local process; production requires shared storage.

## Verification for this change

17 automated test groups passed: request validation, slow-body timeout, ingress
shedding, daily reset, 100 visitors/500 attempts capped at 40 calls, minute-boundary
bursts, quota failure, free-model restrictions, safe fallback and stream errors.
TypeScript/build and configured-secret scan are checked before pushing. Earlier
bilingual browser checks covered layout, keyboard access, daily status and Q&A.
Hosting firewall, billing settings, and a live multi-instance Redis deployment
have not been configured or independently verified by this work.
