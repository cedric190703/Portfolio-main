import { articleVisuals } from "@/lib/article-visuals"
import type { Article } from "@/lib/articles"
import { retrievalEn } from "@/lib/article-content/retrieval"

export const articlesEn: Article[] = [
  retrievalEn,
  {
    slug: "agentic-ai-beyond-the-demo",
    number: "01",
    topic: "Agentic AI",
    date: "September 2026",
    readTime: "9 min read",
    title: "Building agentic AI beyond the demo",
    subtitle: "The demo of my newsletter agent worked the first evening. What broke over the following week had nothing to do with the model, and everything to do with what travelled between the steps.",
    dek: "Notes from building Good News Agent, a LangGraph workflow that researches, qualifies and writes a personalised newsletter—and from the failures that only appeared once it ran on real sources every day.",
    takeaway: "Decide what each handoff carries before deciding which model runs it. A typed state, an evidence log and a review packet fix more production failures than a better prompt.",
    diagram: "agent",
    diagramTitle: "Who holds the evidence at each step",
    diagramCaption: "A swimlane view of one issue of the newsletter. The evidence log is written to before the person ever sees a draft, so review happens on sources and reasons rather than on a fluent paragraph.",
    sections: [
      {
        heading: "The demo worked on a Tuesday",
        blocks: [
          { type: "p", text: "Good News Agent is a LangGraph graph with five nodes: plan the topics, collect candidate articles, qualify the sources, verify the claims that will be quoted, write the issue. On the first evening the demo produced a convincing newsletter from a handful of feeds. I was pleased with it for about a week." },
          { type: "p", text: "Then it ran daily. The qualification node scored a paywalled stub as a strong source because the two visible sentences were well written. The same wire story appeared twice under different headlines and both copies were selected. A link resolved during collection and was dead by the time the writer node cited it. None of these are model failures in the usual sense—the model did exactly what a fluent reader would do with the information it had. They are workflow failures: the wrong information was crossing the boundary between nodes." },
          { type: "p", text: "That reframing changed how I spent the rest of the project. Instead of tuning prompts, I spent the time on what each handoff was allowed to contain." },
        ],
      },
      {
        heading: "What a handoff should carry",
        blocks: [
          { type: "schema", visual: articleVisuals.evidence.en },
          { type: "p", text: "The state object between nodes started as a list of URLs and free-text summaries. It ended as a typed record where every field exists because a specific failure needed it:" },
          { type: "code", lang: "python", caption: "The candidate record that travels between graph nodes.", code: `class Candidate(TypedDict):
    url: str
    fetched_at: str          # the writer cites this snapshot, not "the page"
    content_hash: str        # dedup key — the title is useless for this
    excerpt: str             # the exact text a claim rests on (≤ 600 chars)
    source_score: float
    reasons: list[str]       # why the qualifier scored it; shown to the reviewer
    status: Literal["candidate", "qualified", "verified", "rejected"]` },
          { type: "p", text: "Three of those fields did most of the work. `content_hash` is computed on the normalised body text, so two headlines for one wire story collapse into one candidate. `excerpt` forces the verification node to point at a sentence rather than assert that a page \"supports\" a claim. `reasons` is a list of short strings the qualifier must fill in, which turned out to be the cheapest way to see when its scoring was wrong: when a paywall stub scored highly, the reasons said `well-structured argument` about two sentences, and that was enough to add a length floor." },
          { type: "p", text: "The rule I ended up with is simple: a node that cannot fill a required field returns the record with `status = rejected` and a reason. It never writes a paragraph explaining that it could not find something. Prose at a boundary is where debugging goes to die." },
        ],
      },
      {
        heading: "Where the person actually belongs",
        blocks: [
          { type: "p", text: "The first version put a person at the end, reading the finished newsletter. That is the worst place for review: the draft is polished, the sources are three steps back, and the only available action is to reject the whole thing." },
          { type: "p", text: "The version that worked put the review between qualification and writing. The reviewer sees a packet of five to eight candidates, each with its excerpt, its source score and its reasons. Accepting or dropping a candidate takes a few seconds because the evidence is already beside it. Every decision is written back into the run's trace with the reviewer's label, which is how the regression set grew without anyone sitting down to write test cases." },
          { type: "figure" },
          { type: "p", text: "One consequence I did not anticipate: once the review moved earlier, the writer node stopped needing a large model. It receives verified excerpts and a structure; it is doing composition, not judgment. The expensive calls are in qualification and verification, where being wrong is costly." },
        ],
      },
      {
        heading: "Evaluate the trajectory, not the newsletter",
        blocks: [
          { type: "schema", visual: articleVisuals.agentLoop.en },
          { type: "p", text: "A rubric score on the final text told me almost nothing. Two issues could read equally well while one had cited a dead link and dropped the best source. The measurements that actually moved decisions were all about the path:" },
          { type: "table", head: ["Metric", "What it caught"], rows: [
            ["Duplicates per issue (by `content_hash`)", "The wire-story problem; measure exact duplicates separately from near-duplicates"],
            ["Excerpt coverage — % of cited claims with a verified excerpt", "The writer inventing a bridging sentence between two sources"],
            ["Reviewer drop rate on qualified candidates", "The paywall-stub scoring; investigate changes in source mix and reviewer agreement before adjusting thresholds"],
            ["Dead links at write time", "Keep the evidence snapshot and check the public link separately"],
            ["Cost per issue by node", "Compare spend with errors prevented; no node has a universal target share"],
          ] },
          { type: "p", text: "This is also why I later built flightrec, a small recorder and replayer for agent runs. Recording every model call, tool call and state transition as events means a run can be replayed against a new prompt or model and the two trajectories diffed. \"Did the new prompt change which sources got qualified?\" becomes a question with an answer instead of an impression." },
        ],
      },
      {
        heading: "What I would do from the start next time",
        blocks: [
          { type: "list", items: [
            "Write the state type before the first node. If a field cannot be named, the handoff is not understood yet.",
            "Put the review packet where the evidence is freshest, not where the output is prettiest.",
            "Log reasons as short strings, not explanations. They are for grep, not for reading.",
            "Cite snapshots. The web changes between collection and writing, even within one run.",
            "Measure the path from day one; the final-text score is the last metric to add, not the first.",
          ] },
        ],
      },
      {"heading": "A hash is not an evidence archive", "blocks": [{"type": "p", "text": "A hash identifies an exact normalised body; it does not detect edited or syndicated near-duplicates. Keep a stable source identifier and compare similar passages separately. A timestamp also does not preserve a page: store the retrieved text and its provenance, subject to access and retention rules. Recheck public citation links before publication, and run a final claim-to-excerpt review after writing. Early source approval cannot catch a new claim introduced by the writer."}, {"type": "references", "items": [{"title": "Technical reference · LangGraph — Persistence", "url": "https://docs.langchain.com/oss/python/langgraph/persistence"}]}]},
    ],
  },

  {
    slug: "ai-without-a-network",
    number: "02",
    topic: "Edge AI",
    date: "September 2026",
    readTime: "8 min read",
    title: "Designing AI that works without a network",
    subtitle: "Two Android projects taught me that on-device AI is mostly a budgeting problem. The model is chosen last, after memory, load time and the cost of being wrong have been written down.",
    dek: "OfflineLingo runs whisper.cpp and llama.cpp on a phone with no network permission at all. Gemmory runs Gemma 4 through LiteRT-LM with every note and answer kept in a local Room database. The lessons overlap almost completely.",
    takeaway: "Write the budget first—RAM, storage, first-response time, battery—then choose a model that meets the quality target with margin. Then design what happens when the margin disappears.",
    diagram: "offline",
    diagramTitle: "A latency budget on one timeline",
    diagramCaption: "Targets for one spoken phrase on a mid-range Android phone. The longest bar sets the pace of the whole interaction, which is why the language model, not the speech model, dictates the design.",
    sections: [
      {
        heading: "The budget comes before the model",
        blocks: [
          { type: "schema", visual: articleVisuals.memory.en },
          { type: "p", text: "The first question is what the target phone can sustain. Android does not promise an app a fixed share of physical RAM: heap limits, native allocations, other processes and system memory pressure all matter. Model downloads also compete with the user’s remaining storage. Set a budget on named devices, then measure the complete app against it." },
          { type: "table", head: ["Constraint", "Question I wrote down", "What it ruled out"], rows: [
            ["Resident RAM", "Can both models stay loaded between phrases?", "whisper `small` (≈ 466 MB f16) plus a 3B language model"],
            ["First response", "How long until the person sees text?", "Any pipeline that waits for the full translation before rendering"],
            ["Storage", "What is the install-plus-models footprint?", "Shipping several language pairs as separate models"],
            ["Battery / thermal", "Can it run for a 20-minute conversation?", "Running the language model at full context on every phrase"],
          ] },
          { type: "p", text: "For OfflineLingo the answer became whisper.cpp with a quantised `base` model (about 60 MB) and llama.cpp with a 4-bit Qwen 2.5 instruct model of roughly 1 GB. Neither is the best model available. Together they are the largest pair that leaves enough headroom for the app not to be killed while the user is mid-sentence." },
        ],
      },
      {
        heading: "Loading is the feature nobody demos",
        blocks: [
          { type: "p", text: "A local model has a lifecycle that a cloud API hides: it must be downloaded, verified, mapped into memory and kept warm. Every one of those steps fails in a way the user can see." },
          { type: "p", text: "Gemmory verifies the model file's size and SHA-256 before loading it, because a partial download that loads and then crashes on the first token is far worse than a clear \"model incomplete, resume download\" state. The check costs a couple of seconds once and removes an entire class of impossible-to-reproduce crashes." },
          { type: "code", lang: "kotlin", caption: "Verify before load. A model that half-loads is a crash the user cannot explain.", code: `suspend fun ensureModel(spec: ModelSpec): ModelState {
    val file = File(context.filesDir, spec.fileName)
    if (!file.exists() || file.length() != spec.sizeBytes) return ModelState.Missing
    val digest = withContext(Dispatchers.IO) { sha256(file) }
    if (digest != spec.sha256) { file.delete(); return ModelState.Corrupt }
    return ModelState.Ready(file)
}` },
          { type: "p", text: "Keeping models warm matters just as much. Loading a 1 GB model takes several seconds even with `mmap`; doing that per phrase would make the app unusable. Both models are loaded once, held in a foreground service, and released only under memory pressure—at which point the UI says so instead of silently getting slower." },
          { type: "figure" },
        ],
      },
      {
        heading: "Degrade in one direction only",
        blocks: [
          { type: "schema", visual: articleVisuals.lifecycle.en },
          { type: "p", text: "When the budget is exceeded, the app has to give something up, and it has to give up the same thing every time. On OfflineLingo the order is fixed: shorten the audio window first (12 s → 8 s), then drop whisper from `base` to `tiny`, then refuse new recordings until memory is back. The order never goes the other way and never involves a network—there is no network. The user sees a small mode indicator change; they never see a translation that silently came from a smaller model without a hint that it did." },
          { type: "p", text: "Gemmory's version of the same rule is cancellable generation. A long answer streaming token by token can be stopped at any point, and the partial answer is kept as a note draft rather than discarded. The person is never waiting on something they cannot interrupt." },
        ],
      },
      {
        heading: "Privacy you can point at",
        blocks: [
          { type: "p", text: "A privacy policy is a claim. A missing permission is a fact. OfflineLingo's manifest does not declare `android.permission.INTERNET`, which means the operating system will refuse any socket the app tries to open. The strongest privacy statement in the project is one line that is not there." },
          { type: "p", text: "Airplane mode is a useful functional test: it demonstrates that the installed models can support the interaction without connectivity. It does not prove that an app never transmits data when a network returns. Inspect the merged manifest, backup settings, exported components and any delegated actions separately. Also test a fresh installation with models imported locally; a cached-model demo does not cover setup." },
        ],
      },
      {
        heading: "What offline taught me about online products",
        blocks: [
          { type: "p", text: "The habits forced by having no network are the same habits that make connected products calm: state is explicit, every wait has a visible cause, every failure has a fixed next step, and nothing important is lost when a call does not return. I now write the degraded path for cloud-backed features the same way I did for OfflineLingo, and the interfaces are better for it even when the network is fine." },
        ],
      },
      {"heading": "Measure a session, not a model file", "blocks": [{"type": "p", "text": "File size is not resident memory. Measure peak process memory during loading and generation, including the KV cache, audio buffers and temporary allocations. Record the device, OS, runtime revision, model checksum, quantisation and context limit. Compare cold start, warm response and a sustained conversation; report the slow tail as well as the median. Choose the smallest model that meets the task-quality target with enough headroom for those conditions."}, {"type": "references", "items": [{"title": "Technical reference · Android — Memory management", "url": "https://developer.android.com/topic/performance/memory-overview"}]}]},
    ],
  },

  {
    slug: "making-ai-uncertainty-visible",
    number: "03",
    topic: "Human-AI interaction",
    date: "September 2026",
    readTime: "8 min read",
    title: "Making AI uncertainty visible",
    subtitle: "A confidence of 0.61 on the word “two” in “give him two tablets” and a 0.61 on an “uh” should produce opposite interface behaviour. Most products show them the same way, or not at all.",
    dek: "Speech recognition models give you several uncertainty signals for free. The design work is deciding which of them should change what a person sees, and making the correction cheaper than the doubt.",
    takeaway: "Route uncertainty by consequence, not by score. A cue is only worth showing when it changes the next action, and the action it triggers must cost less than ignoring the cue would.",
    diagram: "uncertainty",
    diagramTitle: "Consequence × confidence, not confidence alone",
    diagramCaption: "The same probability lands in different cells depending on what kind of token it is. The row—what happens if this word is wrong—decides the interface response; the column only tunes it.",
    sections: [
      {
        heading: "A 0.61 is not a 0.61",
        blocks: [
          { type: "schema", visual: articleVisuals.signals.en },
          { type: "p", text: "The example that fixed this for me came from testing OfflineLingo with medical phrases. The transcript read “give him two tablets” and whisper's per-token probability on “two” was about 0.6, with “to” as the runner-up. A few words later an “uh” had the same probability. Showing both in the same shade of yellow would have been technically honest and practically useless: one is noise, the other could change a dose." },
          { type: "p", text: "So the design question is not “how do we show confidence” but “what is the cost of this specific token being wrong, and what is the cheapest way for the person to check it”. Confidence is one input to that decision. Token type is the other, and it matters more." },
        ],
      },
      {
        heading: "Four signals worth distinguishing",
        blocks: [
          { type: "p", text: "The Whisper ecosystem offers several diagnostic signals, but bindings do not expose identical fields. The Python implementation uses the segment diagnostics below; in whisper.cpp, check the pinned API and compute missing diagnostics explicitly. Alternatives also require decoder support; a token score alone does not provide an n-best word list." },
          { type: "table", head: ["Signal", "What it usually means", "Reasonable response"], rows: [
            ["Token probability (per subword)", "This word is ambiguous or the decoded token has limited support", "Underline; offer the n-best alternatives on tap"],
            ["`avg_logprob` (per segment)", "The whole segment is shaky—noise, accent, crosstalk", "Mark the sentence, offer replay of the segment"],
            ["`no_speech_prob`", "The model doubts there was speech at all", "Combine with segment confidence; offer re-recording"],
            ["`compression_ratio`", "Repetitive output—the classic hallucination loop", "Flag repetition; check audio before discarding"],
          ] },
          { type: "p", text: "Silence and repetition are warning signals, not proof that a transcript is false. Genuine speech can repeat, and noise can confuse speech detection. Combine diagnostics, preserve the audio for review and offer re-recording when the segment cannot be trusted. Do not silently delete speech on the strength of one threshold." },
          { type: "figure" },
        ],
      },
      {
        heading: "The consequence axis",
        blocks: [
          { type: "p", text: "Classifying tokens by consequence sounds like it needs a model. It mostly needs a regular expression and a short list. Numbers, negations (`not`, `no`, `never`, `ne … pas`), units, and capitalised tokens that are not sentence-initial are a starting heuristic, not a complete account of meaning. Written-out numbers and phrases need additional rules, and unclassified words may still be consequential." },
          { type: "code", lang: "kotlin", caption: "Cheap consequence classification. The model gives probability; this gives the row.", code: `fun consequence(token: Token, index: Int): Consequence = when {
    token.text.any { it.isDigit() }                     -> Consequence.HIGH   // doses, counts, times
    token.text.lowercase() in NEGATIONS                  -> Consequence.HIGH   // "not allergic" vs "allergic"
    token.text.lowercase() in UNITS                      -> Consequence.HIGH   // mg, ml, km
    index > 0 && token.text.firstOrNull()?.isUpperCase() == true        -> Consequence.MEDIUM // names, places
    else                                                 -> Consequence.LOW
}` },
          { type: "p", text: "With that in place, the interface needs exactly four behaviours: show, underline, ask to confirm, block-and-replay. A low-consequence token never triggers more than an underline, whatever its score. A high-consequence token below the threshold blocks the sentence from being marked as final until the person has replayed it or edited it. Thresholds must be validated on representative recordings; the example policy does not establish a safe operating point." },
        ],
      },
      {
        heading: "Correction has to cost less than distrust",
        blocks: [
          { type: "schema", visual: articleVisuals.correction.en },
          { type: "p", text: "A cue that leads nowhere trains people to ignore cues. Every marked token in OfflineLingo is tappable: the tap shows the n-best alternatives whisper considered, and a second control replays 1.5 seconds of audio centred on the word. Choosing an alternative or retyping the word updates the translation; the rest of the sentence is not re-run. That last part matters—if fixing one word meant waiting for the whole pipeline again, nobody would fix words." },
          { type: "p", text: "I also removed the percentage. An early build showed `61 %` next to the word and testers spent time reasoning about the number. The underline plus alternatives conveyed the same doubt and led directly to the action. A number invites interpretation; an underline invites a tap." },
        ],
      },
      {
        heading: "What I would measure next",
        blocks: [
          { type: "list", items: [
            "Edit rate on flagged versus unflagged high-consequence tokens. If people edit unflagged ones as often, the flags are miscalibrated.",
            "Time from flag to correction. Above a few seconds, the correction path is too heavy.",
            "Flag fatigue: how many flags per sentence before people stop tapping. My guess is three; I would rather know.",
            "How often `compression_ratio` catches a hallucinated segment in real noise. If it is frequent, that check deserves a visible state of its own.",
          ] },
        ],
      },
      {"heading": "A score needs a calibration set", "blocks": [{"type": "p", "text": "A token probability is conditional on the audio and previously decoded tokens; it is not a calibrated probability that a word is correct. A word may contain several tokens. Validate any aggregation and thresholds on labelled recordings from the intended languages and acoustic conditions. Measure missed consequential errors and unnecessary interruptions separately. A simple token classifier also misses written-out numbers, multiword negations and names without capitals: unknown cases need review, not an automatic low-risk label."}, {"type": "references", "items": [{"title": "Technical reference · Whisper — Transcription and fallback logic", "url": "https://github.com/openai/whisper/blob/main/whisper/transcribe.py"}]}]},
    ],
  },

  {
    slug: "the-ai-harness",
    number: "04",
    topic: "AI systems",
    date: "September 2026",
    readTime: "9 min read",
    title: "The AI harness: the system around the model",
    subtitle: "During the Mistral hackathon we ran the same model through two versions of the Vibe CLI. One version completed tasks reliably; the other wandered. The difference was entirely in what surrounded the model.",
    dek: "A harness is everything that decides what the model can see, do, remember and be checked against. It is where an agent stops being a prompt and becomes an engineering system with contracts, permissions and a replayable history.",
    takeaway: "Treat the layers around the model as independent, versioned contracts. When a run goes wrong, the fix is almost always in a ring, not in the core.",
    diagram: "harness",
    diagramTitle: "Five rings, one model",
    diagramCaption: "Each ring only talks to its neighbours. The model sees selected context and typed tools; permissions and tracing wrap those without the model being aware of them. Swapping the core does not touch the outer rings.",
    sections: [
      {
        heading: "Same model, two behaviours",
        blocks: [
          { type: "p", text: "Our Mistral Vibe extension added three things to the CLI: reusable agent skills (a skill being a scoped instruction set plus the tools it is allowed to use), browser automation as a typed tool, and a router that sends a task to a local model or a cloud model depending on the task class. The model weights did not change. The completion rate on our test tasks changed a lot." },
          { type: "p", text: "The unmodified CLI gave the model a broad shell and a long system prompt. With skills, the same model got a narrow tool surface per task and a shorter, specific instruction. It stopped exploring, because there was less to explore. That was the whole trick, and it is the trick behind every reliable agent I have seen: reduce the degrees of freedom until the remaining ones are the task." },
          { type: "figure" },
        ],
      },
      {
        heading: "The five rings",
        blocks: [
          { type: "schema", visual: articleVisuals.toolContract.en },
          { type: "p", text: "I think of the harness as five concentric layers. The order matters because each layer is allowed to know about the one inside it and nothing else." },
          { type: "list", ordered: true, items: [
            "**Model.** Weights, sampling settings, reasoning mode. The part everyone talks about and the part that changes least often in a working system.",
            "**Context.** Which files, documents or records the model is shown, chosen by a rule with a token budget. In a coding task this is the diff plus the files it touches, not the repository.",
            "**Typed tools.** Each tool has a JSON schema for its arguments and—more importantly—for its result. `run_tests` returns `{passed, failed, first_failure}`, not a wall of stdout.",
            "**Permissions.** An allowlist of commands, a sandbox for anything that writes, and an approval gate for anything outside the working directory. The model does not know this ring exists; it just sees some calls refused with a reason.",
            "**Trace and evaluation.** Every call in and out becomes a span. A set of recorded runs becomes the regression suite that the next change is measured against.",
          ] },
          { type: "code", lang: "json", caption: "A tool whose result is typed. The harness validates both directions; the model never parses stdout.", code: `{
  "name": "run_tests",
  "input_schema": { "type": "object", "properties": { "path": { "type": "string" } }, "required": ["path"] },
  "result_schema": {
    "type": "object",
    "properties": {
      "passed": { "type": "integer" },
      "failed": { "type": "integer" },
      "first_failure": { "type": ["string", "null"], "maxLength": 1200 }
    },
    "required": ["passed", "failed"]
  }
}` },
          { type: "p", text: "The `result_schema` is the part most tool definitions skip. Without it, the model receives whatever the tool printed and has to infer structure from prose, which is exactly the fragile step the harness exists to remove. Truncating `first_failure` to 1 200 characters is deliberate: a 40 KB stack trace is not information, it is context pollution." },
        ],
      },
      {
        heading: "Routing is a harness decision, not a model decision",
        blocks: [
          { type: "p", text: "The router in our Vibe extension chose between a local model and a cloud model by task class, never by \"how hard does this look\". Rewriting a docstring, renaming a symbol and summarising a diff went local. Anything that required planning across files or generating tests went to the cloud. The classification was a short lookup, not another model call." },
          { type: "table", head: ["Task class", "Route", "Why"], rows: [
            ["Single-file edit, explicit instruction", "Local", "Latency matters more than reasoning; failure is cheap and visible"],
            ["Multi-file change, tests required", "Cloud", "Planning quality dominates; a wrong plan costs minutes"],
            ["Browser automation step", "Cloud + typed tool", "The tool constrains the action; the model only fills arguments"],
            ["Anything touching secrets or CI config", "Refused → approval", "Not a model question at all"],
          ] },
          { type: "p", text: "Putting routing in the harness means it can be changed, tested and audited without touching prompts. It also means the cheap path stays cheap: the local model never sees the long context the cloud path needs." },
        ],
      },
      {
        heading: "Traces are the API to your own past",
        blocks: [
          { type: "schema", visual: articleVisuals.replay.en },
          { type: "p", text: "flightrec exists because I kept asking \"what did it do last time\" and having no answer. It records a run as a sequence of events—model call, tool call, tool result, state change, approval—and can replay that sequence against a new configuration. The replay does not re-execute side effects; it feeds the recorded tool results back and lets the new model choose its next step, so the two trajectories can be diffed." },
          { type: "p", text: "The questions that become cheap to answer: did the new prompt change which files got read? Did the model upgrade add tool calls, or remove them? Did the permission change block something a run used to rely on? Each of those used to be a guess. A diff of two event logs is not." },
        ],
      },
      {
        heading: "Start with one task and five recorded runs",
        blocks: [
          { type: "p", text: "None of this needs a platform. One task, three typed tools, an allowlist, a trace file and five recorded runs is enough to find out whether a failure lives in context, tools, permissions or the model—and that diagnosis is what the harness is for. Models will keep changing. The rings around them are the part a team actually owns." },
        ],
      },
      {"heading": "Replay stops being comparable when the inputs diverge", "blocks": [{"type": "p", "text": "A recorded tool result is valid only for the tool name, arguments and state that produced it. If a new model requests another file or changes a query, replay must flag that mismatch rather than return the next result in the log. Use matched fixtures for controlled comparisons and a separate sandbox run to evaluate new trajectories. For retries of real writes, record an operation identifier and check whether the effect already happened before executing it again."}, {"type": "references", "items": [{"title": "Technical reference · LangGraph — Persistence and replay", "url": "https://docs.langchain.com/oss/python/langgraph/persistence"}]}]},
    ],
  },

  {
    slug: "offlinelingo-designing-for-the-last-mile",
    number: "05",
    topic: "Project note · OfflineLingo",
    date: "September 2026",
    readTime: "8 min read",
    title: "OfflineLingo: designing for the last mile of communication",
    subtitle: "Built over a weekend at the European Defense Tech Hackathon in Berlin: an Android app that turns a spoken phrase into a checkable translation with the network permission removed from the manifest.",
    dek: "This is a project note rather than an essay—what we built, the decisions I would defend, the ones I would revisit, and the state machine that ended up mattering more than either model.",
    takeaway: "In a field tool the deliverable is a recoverable interaction, not a translation. Every state where a person is waiting needs two exits, and the app must never end a phrase without one.",
    diagram: "project",
    diagramTitle: "The app as a state machine",
    diagramCaption: "Seven states, with the timeouts and thresholds that move between them. Dashed transitions are the ones triggered by uncertainty or failure; solid ones are the happy path and the person's own actions.",
    sections: [
      {
        heading: "The brief",
        blocks: [
          { type: "p", text: "The scenario given to us was cross-border emergency response: a responder needs to exchange short, high-stakes phrases with someone who does not share a language, in a place where the network may be gone. Not degraded—gone. That single constraint removed every cloud translation API from the design in the first hour and set the actual problem: fit speech recognition and translation onto a phone, and make the result something a stressed person can trust or correct in seconds." },
        ],
      },
      {
        heading: "What we shipped",
        blocks: [
          { type: "schema", visual: articleVisuals.translation.en },
          { type: "list", items: [
            "A Kotlin Android app with a single press-and-hold record control; releasing, or 1.5 seconds of silence, ends the phrase.",
            "whisper.cpp through JNI with a quantised `base` model for on-device speech recognition, streaming 16 kHz PCM from the microphone.",
            "llama.cpp with a 4-bit Qwen 2.5 instruct model for translation, kept loaded in a foreground service between phrases.",
            "Per-word confidence from whisper's token probabilities, rendered as underlines with tap-to-see-alternatives and a replay of the surrounding audio.",
            "A large-type output screen designed to be turned toward the other person, with the language pair visible at all times.",
            "No `INTERNET` permission in the manifest. The OS enforces the promise, not the code.",
          ] },
        ],
      },
      {
        heading: "The prompt is a contract too",
        blocks: [
          { type: "p", text: "Small instruct models like to be helpful. The first translation prompt returned things like “Here is the translation: …” or a translation followed by a note about ambiguity. In a large-type screen turned toward a stranger, that framing is noise at best and confusing at worst. The fix was to treat the prompt output like a tool result: constrain it, then validate it." },
          { type: "code", lang: "text", caption: "The translation prompt after three iterations. Short, and enforced by stop tokens and a post-check.", code: `<|im_start|>system
You translate {src} to {dst} for emergency responders.
Output only the translated sentence. No preamble, no notes, no quotes.
Keep numbers, units and names exactly as given.
<|im_end|>
<|im_start|>user
{sentence}
<|im_end|>
<|im_start|>assistant` },
          { type: "p", text: "Generation stops at the first newline or end-of-turn token. A post-check compares digits and units in the input and output; if a number is missing on one side, the translation is shown with the number underlined in the same way a low-confidence word would be, because from the user's point of view it is the same problem. The line “keep numbers … exactly as given” helped, but the check is what made it dependable." },
          { type: "figure" },
        ],
      },
      {
        heading: "The state machine mattered more than the models",
        blocks: [
          { type: "p", text: "Halfway through the second day the pipeline worked and the app still felt unusable, because it could get stuck. Recording with no end, a transcription that returned nothing, a translation that took eleven seconds because the phone had throttled—each of these left the person looking at a screen with no obvious next move." },
          { type: "p", text: "Drawing the app as a state machine fixed that faster than any model change. Every state where a person is waiting got two exits: a success transition and a bounded failure transition (a timeout or a threshold) that leads somewhere with a clear action. Recording ends at 12 seconds no matter what. Transcription or translation that exceeds 8 seconds returns to idle with a “try a shorter phrase” message rather than a spinner. A low-confidence key word routes to review with the word marked, instead of to the output screen. The diagram above is the version we shipped; the useful part of it is that no state can end without a transition out." },
        ],
      },
      {
        heading: "Decisions I would defend, decisions I would revisit",
        blocks: [
          { type: "p", text: "Defend:" },
          { type: "list", items: [
            "Removing the network permission rather than adding an offline mode. A mode can be toggled; a missing permission cannot.",
            "Press-and-hold recording. Tap-to-start/tap-to-stop produced long recordings with background chatter that whisper transcribed enthusiastically.",
            "Marking numbers by consequence rather than by confidence alone; this caught more real errors in testing than the probability threshold did.",
          ] },
          { type: "p", text: "Revisit:" },
          { type: "list", items: [
            "The `base` whisper model. `small` was noticeably better on accented speech, but the memory margin made me nervous. On a device with 6 GB or more I would use it.",
            "One translation direction per screen. Responders need both directions in one conversation; the swap control was one tap too many.",
            "A general-purpose instruct model for translation. A dedicated small translation model, or a fine-tune on emergency phrases, would likely be both faster and more literal.",
          ] },
        ],
      },
      {
        heading: "What I would test next",
        blocks: [
          { type: "schema", visual: articleVisuals.recovery.en },
          { type: "p", text: "The prototype was tested by us, in a quiet hall, in languages we speak. The next test is the one that counts: outdoor noise, an accent the model has not seen, a phrase containing a dosage and a negation, on a phone that has been in a pocket for an hour, held by someone who has not seen the app before. If the state machine holds and the underlines land on the right words in those conditions, the project is worth taking further. If not, the diagram tells us exactly which transition to fix." },
        ],
      },
      {"heading": "Turn the next test into a protocol", "blocks": [{"type": "p", "text": "Use the same phrase set across devices and record the original audio, expected meaning, corrected transcript and final translation. Include numbers written as words, negations, interruptions and silence. Ask bilingual reviewers to score meaning preservation without seeing the model configuration. Report errors separately from completion time and abandonment. Replaying a word confirms what was heard; it does not validate a translation. This remains a prototype evaluation, not evidence of suitability for emergency use."}, {"type": "references", "items": [{"title": "Technical reference · whisper.cpp — Models and memory requirements", "url": "https://github.com/ggml-org/whisper.cpp"}]}]},
    ],
  },

  {
    slug: "robotics-a-camera-that-knows-where-to-look",
    number: "06",
    topic: "Robotics · Project note",
    date: "September 2026",
    readTime: "9 min read",
    title: "Robotics is a chain of decisions, not a single model",
    subtitle: "At the AMD Open Robotics Hackathon our team, CRC, built a voice-controlled arm that picks up a camera, frames a person or object and keeps them in the shot as they move. The detector was the easy part.",
    dek: "Notes on the seams: how a bounding box becomes a pose, why the control loop runs at the speed of the slowest honest signal, and what the ROCm training pipeline was actually for.",
    takeaway: "A robot earns autonomy at the interfaces between perception, calibration, planning and verification. Each of those needs a contract and a failure state, and the loop must re-check the world before every move.",
    diagram: "robotics",
    diagramTitle: "One loop, three exits",
    diagramCaption: "The control loop runs at roughly 10 Hz with a fresh observation on every turn. The dashed exits are states of their own: the arm waits there until a new, valid observation arrives, rather than finishing an old plan.",
    sections: [
      {
        heading: "Camera, target, hold",
        blocks: [
          { type: "schema", visual: articleVisuals.coordinates.en },
          { type: "p", text: "The brief we set ourselves: a creator recording alone says “follow me” or “film the cup”, the arm picks up a small camera from a rest position, points it at the target and keeps the target framed as it moves. Success is judged instantly by anyone watching—is the camera held, is the subject in frame, is the shot steady—which made it a good hackathon task: no metric to argue about." },
          { type: "p", text: "The stack was a LeRobot-compatible arm, a wrist camera and a scene camera, YOLO for detection over the COCO classes (so “person”, “cup”, “bottle” and friends work out of the box), a small voice-command parser, and a grasp policy trained with imitation learning on episodes we recorded during the event. AMD provided the ROCm GPUs; the training pipeline ran there." },
        ],
      },
      {
        heading: "A bounding box is not a pose",
        blocks: [
          { type: "p", text: "YOLO gives pixel coordinates in the scene camera's frame. The arm needs a target in its own workspace frame, in metres, with a reachability check. Between the two sits calibration, and the mistake we nearly made was treating it as a setup step done once on the first morning." },
          { type: "p", text: "Instead we built a small calibration tool that computes the scene-camera-to-arm-base transform from a few taught points and writes the result to a JSON file. The file is loaded at startup and its checksum is logged with every run. When the scene camera was knocked on the second day—which it was—the fix was re-running the tool, not re-tuning anything downstream." },
          { type: "code", lang: "json", caption: "calibration.json. Boring on purpose: a transform, its provenance, and the workspace limits that gate every planned pose.", code: `{
  "scene_cam_to_base": { "R": [[0.998, -0.052, 0.031], [0.051, 0.998, 0.019], [-0.032, -0.017, 0.999]],
                          "t": [0.412, -0.088, 0.297] },
  "calibrated_at": "2025-12-06T10:41:03Z",
  "residual_mm": 4.2,
  "workspace": { "x": [0.12, 0.48], "y": [-0.30, 0.30], "z": [0.02, 0.35] },
  "camera_grasp_pose": { "approach_offset_m": 0.06, "gripper_close": 0.72 }
}` },
          { type: "p", text: "`residual_mm` is the one field I would insist on keeping. The residual helps detect a poor fit, but acceptable error depends on the task, geometry and held-out calibration checks. The example values are illustrative, not general acceptance thresholds." },
          { type: "figure" },
        ],
      },
      {
        heading: "The loop runs at the speed of the slowest honest signal",
        blocks: [
          { type: "p", text: "The control loop is simple to state: listen, resolve the target, map it into the workspace, plan a bounded motion, execute one step, verify the target is still where it should be in the frame, repeat. What made it work was refusing to let any stage run ahead of the others. Detection ran at around 10 Hz on the hardware we had; the loop ran at 10 Hz, and one motion step never used a target estimate older than the previous turn." },
          { type: "p", text: "Three transitions leave the loop, and each is a state rather than an error. No detection for one second: hold position, say so, keep listening. Target outside the workspace box: do not plan, ask the person to move closer. Target drifting more than roughly 15 % of the frame from centre: re-plan from the current observation rather than continuing the previous motion. The temptation in a hackathon is to make the arm keep moving because a moving arm looks impressive. A paused arm that explains why is safer and, in the demo, more convincing." },
        ],
      },
      {
        heading: "What the ROCm pipeline was for",
        blocks: [
          { type: "schema", visual: articleVisuals.robotLearning.en },
          { type: "p", text: "The grasp itself—approach the camera on its rest, close the gripper, lift to a carrying pose—was learned rather than scripted, from a few dozen teleoperated episodes recorded in LeRobot's dataset format. The training pipeline on ROCm handled the loop of record, train, evaluate on held-out episodes, publish. We released the dataset and the model artefacts so the result could be reproduced by someone with the same arm." },
          { type: "p", text: "The point of a pipeline in a two-day event is not scale; it is that when the calibration changed or an episode turned out to be bad, retraining was a command rather than a notebook session. Reproducibility bought us the second day." },
        ],
      },
      {
        heading: "What broke, concretely",
        blocks: [
          { type: "list", items: [
            "“Film the cup” with two cups in view. The parser picked the class; nothing picked the instance. We added a “the closer one” rule and would add pointing next time.",
            "The wrist camera was occluded by the gripper for the last 3 cm of the approach. The grasp policy had learned this; the verification step had not, and briefly flagged a lost target on every grasp.",
            "Framing drift after a successful grasp: the camera's own weight shifted the wrist estimate by a couple of degrees. Fixed with a re-calibration of the carrying pose after grasp, not before.",
            "A voice command during motion. We had no rule; the arm finished the step and then obeyed. That was the right behaviour by luck, and it should have been by design.",
          ] },
          { type: "p", text: "None of these were model failures. They were all at seams—between a class and an instance, between a policy and a verifier, between a pose before and after load. That is where the next iteration would spend its time." },
        ],
      },
      {"heading": "Separate perception timing from motion control", "blocks": [{"type": "p", "text": "The roughly 10 Hz loop described here is a task-level perception and planning loop. It should not set the frequency of a motor controller or its safety checks. A 2D bounding box also supplies no metric depth: mapping a target into the arm frame needs depth, known geometry or a stated plane assumption, as well as calibration. Evaluate grasp success, tracking error and lost-target response separately. Calibration residuals describe a fit; they do not by themselves bound collision risk or end-effector error."}, {"type": "references", "items": [{"title": "Technical reference · OpenCV — Camera calibration and 3D reconstruction", "url": "https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html"}]}]},
    ],
  },

  {
    slug: "brain-computer-interfaces-time-series-models",
    number: "07",
    topic: "Neurotechnology · Time series",
    date: "September 2026",
    readTime: "12 min read",
    title: "Brain–computer interfaces are time-series systems before they are AI demos",
    subtitle: "An EEG electrode sees a few microvolts of summed cortical activity through skull and skin. Turning that into a reliable command is a signal-processing and evaluation problem long before it is a model problem.",
    dek: "I came to BCI through time-series work rather than neuroscience, and the failure modes looked familiar: leaky splits, preprocessing that erases the signal it was meant to expose, and scores that do not survive the next recording session.",
    takeaway: "Protect the signal's context, split by session and participant, and make abstaining a first-class output. A stronger decoder cannot recover what the pipeline threw away.",
    diagram: "bci",
    diagramTitle: "Windows, markers, and a split that respects time",
    diagramCaption: "Top: one filtered channel with a cue marker and overlapping 2-second windows. Bottom: two ways to split the same recordings. Only the second one measures what a person will experience next Friday.",
    sections: [
      {
        heading: "What the electrode actually sees",
        blocks: [
          { type: "p", text: "A scalp EEG channel at C3 records a voltage on the order of 10–100 µV: the summed activity of a large population of neurons under the electrode, attenuated by bone and tissue, plus the electrical signature of every muscle nearby. A blink is around 100 µV. The mains supply contributes a 50 Hz line (60 Hz in North America) that is often larger than the brain signal. The useful pattern for a motor-imagery task—a drop in 8–13 Hz mu and 13–30 Hz beta power over the motor cortex when a person imagines moving a hand—is a small change on top of all of that." },
          { type: "p", text: "That is the engineering reality behind the phrase “brain–computer interface”: a low signal-to-noise, non-stationary time series with events of known timing, and a question that is much narrower than “reading thoughts”. Can a 2-second window after a cue be classified as left-hand versus right-hand imagery well enough to move a cursor? Framed that way, the problem is recognisable to anyone who has worked with sensor data." },
        ],
      },
      {
        heading: "Windows are a modelling decision",
        blocks: [
          { type: "p", text: "A recording is not a table of independent rows. Its meaning depends on sampling rate (250 Hz is typical for consumer and research headsets), channel identity and montage, the reference used, the event markers, and the exact preprocessing applied. A model input is a window cut from that stream, and the cut is a choice with consequences." },
          { type: "p", text: "For motor imagery a 2-second window starting 0.5 s after the cue is a common default; the response takes a few hundred milliseconds to develop and fades after a couple of seconds. A 0.5-second stride gives the interface responsiveness. It also means every sample belongs to four windows, and that is where evaluations go wrong: if windows are shuffled and split, the test set contains near-copies of the training set, and the score is a measurement of memory, not of decoding." },
          { type: "figure" },
          { type: "p", text: "The rule is the same as for any time series: split by the unit that will be new at inference time. For a BCI that is the session, and beyond that the participant. A held-out Friday session contains the electrode that shifted slightly and the fatigue of the end of the week. A shuffled split contains neither, and reports a number nobody will see in practice." },
        ],
      },
      {
        heading: "The preprocessing you did not log is the one that fooled you",
        blocks: [
          { type: "schema", visual: articleVisuals.eegPipeline.en },
          { type: "p", text: "Before a decoder sees a feature the signal is typically notch-filtered at line frequency, band-passed to the range of interest, re-referenced (common average is a frequent choice), and checked for bad channels and artifacts. Each step has parameters, and each parameter can quietly help or hurt. A band-pass that starts at 8 Hz is right for mu but throws away the slow potentials another paradigm depends on. An aggressive artifact rejection can remove exactly the trials where the participant was concentrating hardest." },
          { type: "code", lang: "python", caption: "A pipeline whose settings are data. The dict is saved beside every derived file; the raw file is never modified.", code: `PREPROC = {
    "version": "2026.09.1",
    "notch_hz": 50.0,
    "bandpass_hz": (8.0, 30.0),
    "reference": "average",
    "epoch_s": (0.5, 2.5),          # relative to cue
    "reject_uv": 150.0,             # peak-to-peak, after filtering
}

raw = mne.io.read_raw_fif(path, preload=True)          # immutable source
raw.notch_filter(PREPROC["notch_hz"]).filter(*PREPROC["bandpass_hz"])
raw.set_eeg_reference(PREPROC["reference"])
epochs = mne.Epochs(raw, events, tmin=PREPROC["epoch_s"][0], tmax=PREPROC["epoch_s"][1],
                    baseline=None, reject=dict(eeg=PREPROC["reject_uv"] * 1e-6), preload=True)
epochs.info["description"] = json.dumps(PREPROC)` },
          { type: "p", text: "The habit that matters is that the settings travel with the data. When a result changes between two runs, the first question is whether the preprocessing changed, and that question should be answerable by diffing two small dictionaries rather than by reading a notebook's history." },
        ],
      },
      {
        heading: "Earn the deep model",
        blocks: [
          { type: "p", text: "A useful baseline in motor imagery is decades old: common spatial patterns to find the channel combinations that separate the two classes, log-variance of the filtered signal as features, and a linear discriminant classifier. It trains in seconds on a few dozen trials, is interpretable (the spatial filters should look like motor cortex), and is hard to beat on small per-participant datasets." },
          { type: "table", head: ["Approach", "Data needed", "Strength", "Failure to watch"], rows: [
            ["Band power / CSP + LDA", "Tens of trials per class", "Fast, interpretable, robust when calibrated per session", "Degrades as electrodes shift; needs recalibration"],
            ["Riemannian (covariance + tangent space)", "Similar", "Less sensitive to scaling and small shifts", "Harder to explain to a clinician"],
            ["Compact CNN (EEGNet-style)", "Hundreds of trials or transfer", "Learns spatial-spectral filters jointly; cross-subject transfer", "Overfits gloriously on a leaky split"],
            ["Sequence / attention models", "Thousands of trials", "Longer dependencies, multi-paradigm", "Rarely justified by the data available per person"],
          ] },
          { type: "p", text: "The comparison that should decide is not aggregate accuracy on a benchmark. It is accuracy per participant on a held-out session, calibration time before the interface is usable, latency per decision, and the cost of a wrong command. A deep model that wins by three points on a pooled benchmark and loses per participant has not won." },
        ],
      },
      {
        heading: "Abstain is a class",
        blocks: [
          { type: "schema", visual: articleVisuals.abstain.en },
          { type: "p", text: "A decoder that must output left or right on every window will output nonsense during the windows where the person sneezed, looked away or simply did not try. The safer design treats “no decision” as an output with its own rules: a posterior below a threshold, disagreement between the last three overlapping windows, or a signal-quality flag on the relevant channels all route to abstain. An assistive cursor can afford a low threshold and reversible moves; anything that triggers a consequential action should demand agreement across windows and an explicit confirmation." },
          { type: "p", text: "Abstaining also gives the interface something honest to show. A quality indicator and a “recalibrate” control are not admissions of weakness; they are the parts of the system the person can act on." },
        ],
      },
      {
        heading: "Session three is the benchmark",
        blocks: [
          { type: "p", text: "The result that matters in BCI work is not a high score inside one controlled recording. It is a system that is still useful when the person comes back on another day, with the cap seated a little differently, more tired, in a noisier room. Report held-out-session and held-out-participant results separately, show the class balance, inspect the confusion matrix per person, and keep the raw recordings immutable so the evaluation can be re-run when the pipeline changes." },
          { type: "p", text: "Everything upstream of the model—acquisition, context, windows, splits, abstention—decides whether the number at the end means anything. The model is the last thing to improve, not the first." },
        ],
      },
      {"heading": "An offline pipeline is not an online decoder", "blocks": [{"type": "p", "text": "The snippet illustrates offline epoch construction: mark bad channels explicitly before re-referencing and keep the original recording on disk. With epochs starting at 0.5 seconds, use baseline=None unless you deliberately include a baseline interval. Zero-phase filtering can use future samples, so online claims require a causal or buffered pipeline with its delay measured. Fit CSP, scaling and other learned transforms inside each training fold. Agreement between overlapping windows is correlated evidence, not three independent confirmations."}, {"type": "references", "items": [{"title": "Technical reference · MNE — Epochs and baseline correction", "url": "https://mne.tools/stable/generated/mne.Epochs.html"}]}]},
    ],
  },
]
