export type ArticleLanguage = "en" | "fr"

export type Article = {
  slug: string
  number: string
  topic: string
  date: string
  readTime: string
  title: string
  subtitle: string
  dek: string
  takeaway: string
  diagram: "agent" | "offline" | "uncertainty" | "harness" | "project" | "robotics"
  diagramTitle: string
  diagramCaption: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

export const articleContent: Record<ArticleLanguage, Article[]> = {
  en: [
    {
      slug: "agentic-ai-beyond-the-demo",
      number: "01",
      topic: "Agentic AI",
      date: "September 2026",
      readTime: "8 min read",
      title: "Building agentic AI beyond the demo",
      subtitle: "A useful agentic system is not a chain of impressive model calls. It is a workflow with clear responsibility, evidence, and a way back when something goes wrong.",
      dek: "The work starts when a prototype has to meet a real process: ambiguous inputs, review steps, operational constraints and people who need to trust the output.",
      takeaway: "Design the workflow first. The model is one component in a system that must remain inspectable, recoverable and useful.",
      diagram: "agent",
      diagramTitle: "From request to a reviewable result",
      diagramCaption: "A production workflow makes decisions, evidence and human review explicit rather than hiding them inside one opaque prompt.",
      sections: [
        {
          heading: "A demo proves possibility, not reliability",
          paragraphs: [
            "It is easy to make an agent look capable on a carefully chosen example. Give it a tidy document, a narrow question and a few tools, and it can produce something persuasive in minutes. The difficult part begins when the input is incomplete, the language is ambiguous or the user needs to understand why a recommendation was made.",
            "That distinction changes the objective. Instead of asking how many agents can be connected together, start with a practical question: what decision or task should become easier for someone? A good answer creates a bounded workflow with a clear input, a measurable output and an owner who can validate the result.",
          ],
        },
        {
          heading: "Make the handoffs visible",
          paragraphs: [
            "The strongest agentic systems are usually less magical than their demos. They separate retrieval, planning, tool execution and review. Each handoff is an opportunity to store evidence, validate a format or stop an unsafe action. This makes failures local: a poor source can be replaced without rebuilding the entire workflow.",
            "For document-heavy work, this can mean preserving the excerpts behind a finding, recording the source version and exposing the exact fields that were extracted. For a tool-using workflow, it can mean validating arguments before a call and returning a structured result instead of a free-form paragraph. Small controls add up to a system that can be inspected and improved.",
          ],
        },
        {
          heading: "Human review is a product feature",
          paragraphs: [
            "Human-in-the-loop should not mean putting a person at the end of a long, untraceable chain. Review works best when it appears at consequential moments: before a sensitive action, after a low-confidence extraction or when a workflow reaches a business decision. The reviewer needs context, not just a red or green button.",
            "The resulting experience is more honest and more useful. Automation handles repetitive preparation; people retain responsibility for judgment. That balance is what turns an LLM application into a dependable working tool rather than a one-off demonstration.",
          ],
        },
        {
          heading: "Measure the work, not just the final sentence",
          paragraphs: [
            "A final-answer score is rarely enough. A system can sound polished while retrieving the wrong source, choosing the wrong tool or taking too long to complete the task. Useful evaluation checks the trajectory as well as the output: was the relevant evidence found, did the tool call respect the contract, did the review step catch the expected issue, and what did the run cost?",
            "This is why traces matter. A trace turns an isolated failure into something an engineering team can inspect: a sequence of model calls, tool calls, handoffs and guardrails. Once the workflow is visible, teams can create a small, repeatable set of representative tasks and improve one decision at a time instead of guessing which prompt caused a change.",
          ],
        },
      ],
    },
    {
      slug: "ai-without-a-network",
      number: "02",
      topic: "Edge AI",
      date: "September 2026",
      readTime: "7 min read",
      title: "Designing AI that works without a network",
      subtitle: "When connectivity disappears, the architecture and interface have to carry more of the system’s responsibility.",
      dek: "Local-first AI is not simply cloud AI moved onto a device. It is a set of decisions about latency, privacy, model size and how the product behaves when it cannot ask a server for help.",
      takeaway: "Offline capability is an experience promise: state what happens locally, keep failure modes understandable and make the constraints visible in the design.",
      diagram: "offline",
      diagramTitle: "A local translation path",
      diagramCaption: "The complete path stays on the device. That reduces dependency on connectivity and keeps sensitive audio out of a remote service.",
      sections: [
        {
          heading: "Start with the constraint, not the model",
          paragraphs: [
            "An offline setting changes the design brief. A product may be used in an emergency, in a low-bandwidth environment or wherever data cannot leave the device. The goal is no longer only to maximise model quality. It is to provide a useful answer quickly, predictably and privately under limited compute and storage.",
            "That starts with a realistic budget. How long can a user wait? Which languages matter? How much storage can the application occupy? Which operations must work with no account, no network and no fallback? Those questions narrow the model and platform choices before implementation begins.",
          ],
        },
        {
          heading: "A small system can still be intentional",
          paragraphs: [
            "On-device speech recognition and local language models can form a complete pipeline: capture audio, transcribe it, translate it and present the result. The important design work is around the model calls: streaming or chunking the audio, managing memory, handling long pauses and keeping the interface responsive while inference runs.",
            "Local systems also need an explicit recovery path. If recognition is weak, the user should be able to retry, correct text or switch a language without losing their place. A resilient product does not pretend that the model is always certain; it gives the person a practical way forward.",
          ],
        },
        {
          heading: "Privacy becomes a visible property",
          paragraphs: [
            "Keeping processing on the device is technically valuable, but users also need to understand it. A concise explanation of what remains local, what is stored and when data is removed can be more reassuring than a generic privacy statement. In sensitive contexts, that explanation is part of the interface.",
            "The best local-first products make their limits legible. They do not hide a missing network connection or quietly send data elsewhere. They say what the device can do now, show any uncertainty and make the trade-off between speed, quality and privacy clear enough for a user to act on.",
          ],
        },
        {
          heading: "Make the degraded experience graceful",
          paragraphs: [
            "Offline does not mean that every feature has to be permanently available. It means the application is honest about its operating mode. A clear local mode, an obvious queue for work that will require a connection later, and deliberate limits on expensive operations are better than a feature that simply appears broken.",
            "That discipline improves cloud-connected products too. Designing for an unreliable network forces an engineer to define state, retry rules and user feedback precisely. The result is often a calmer interface: one that tells the user what is happening, preserves their work and never treats a network error as a personal failure.",
          ],
        },
      ],
    },
    {
      slug: "making-ai-uncertainty-visible",
      number: "03",
      topic: "Human-AI interaction",
      date: "September 2026",
      readTime: "7 min read",
      title: "Making AI uncertainty visible",
      subtitle: "A confident interface can make a fallible system look more certain than it really is. Good product design gives uncertainty a place to be seen and acted upon.",
      dek: "In transcription, translation and classification, the goal is not to overwhelm people with scores. It is to direct their attention to the moments where judgment matters most.",
      takeaway: "Confidence is useful only when it changes what a person can do next: verify, correct, retry or proceed with appropriate caution.",
      diagram: "uncertainty",
      diagramTitle: "Turning a score into an action",
      diagramCaption: "A raw confidence value is not the end of the interaction. Contextual signals should help a user decide whether to verify, correct or continue.",
      sections: [
        {
          heading: "Numbers alone do not build trust",
          paragraphs: [
            "A model can produce a probability, but that number is not automatically meaningful to the person using the product. A confidence score may reflect the model’s internal calibration, not the importance of an error in the user’s situation. A low score on a name, instruction or number can matter far more than a low score on a filler word.",
            "The interface should therefore connect uncertainty to the task. Highlighting a fragile word in a transcript, showing alternative interpretations or explaining that the audio was unclear gives the user a concrete reason to look more closely. The point is not to expose every model detail; it is to make risk actionable.",
          ],
        },
        {
          heading: "Use layers, not alarms",
          paragraphs: [
            "Too many warnings become background noise. A better pattern is progressive disclosure: keep the main result readable, mark the parts that deserve attention and offer more detail when the user asks for it. This preserves flow while giving careful users the evidence they need.",
            "Visual hierarchy matters here. A small, consistent confidence cue can be easier to use than a dramatic alert. Pair it with a clear action such as replay audio, edit text or compare an alternative. The interface is then helping someone resolve uncertainty rather than merely announcing it.",
          ],
        },
        {
          heading: "Design for correction, not perfection",
          paragraphs: [
            "Every AI-assisted workflow needs a fast correction loop. If it is difficult to amend a transcript, replace a classification or remove a bad suggestion, users will either stop trusting the system or work around it. Good correction paths are small, local and preserve the user’s context.",
            "This approach creates a healthier relationship between automation and judgment. The system can be helpful before it is flawless, provided it is transparent about its limits and respectful of the user’s ability to intervene. That is a much stronger definition of trustworthy AI than a polished answer alone.",
          ],
        },
        {
          heading: "Treat uncertainty as an interaction contract",
          paragraphs: [
            "There is a useful product question behind every confidence signal: what should change when this signal is low? If the answer is nothing, the score should probably not be shown. If the answer is to pause, ask for confirmation or surface the source material, the interaction has a clear purpose and can be tested with users.",
            "This also helps teams avoid false precision. A percentage with two decimal places may look scientific but still fail to guide a decision. A carefully chosen cue, a reason for the uncertainty and one obvious next action are often more trustworthy than a number presented without context.",
          ],
        },
      ],
    },
    {
      slug: "the-ai-harness",
      number: "04",
      topic: "AI systems",
      date: "September 2026",
      readTime: "8 min read",
      title: "The AI harness: the system around the model",
      subtitle: "An agent is not only a prompt and a model. Its harness is the engineering layer that decides what the agent can see, do, remember, verify and safely hand back to a person.",
      dek: "The word “harness” is useful because it moves the conversation away from model magic and toward the practical controls that make an AI system operable.",
      takeaway: "The quality of an agent is a property of the model and its harness together. Improving either in isolation leaves value on the table.",
      diagram: "harness",
      diagramTitle: "The control layer around an agent",
      diagramCaption: "The harness creates boundaries and feedback loops around a model run: a task arrives with context and permissions, then produces a trace that can be reviewed and evaluated.",
      sections: [
        {
          heading: "The model is the engine, not the vehicle",
          paragraphs: [
            "When people talk about an AI agent, they often describe the model first: which provider, how many parameters, which reasoning mode. Those choices matter, but they do not explain how an agent behaves in a real environment. The model does not decide what data it is allowed to read, which tool calls are safe, what a successful result looks like or how a failure is recorded. The surrounding system does.",
            "That surrounding system is what I mean by an AI harness. It is the runtime and product layer that frames a task, selects context, exposes tools, applies permissions, records the execution and creates a route for evaluation. In a coding agent, it can include the repository snapshot, terminal sandbox, test suite and diff review. In a business workflow, it can include source retrieval, role-based actions, approval gates and audit evidence.",
          ],
        },
        {
          heading: "A good harness reduces the degrees of freedom",
          paragraphs: [
            "The wrong way to build an agent is to give it broad access and hope that a careful prompt will keep it on track. A stronger approach starts with deliberate constraints. Provide a narrow tool interface, typed inputs and outputs, a small amount of relevant context and an explicit policy for actions that need human approval. The agent has less room to drift, and its work becomes easier to reason about.",
            "This is not about making an agent less capable. It is about directing capability toward a task. A repository-aware coding agent needs the right files, commands and tests—not every credential on a developer’s machine. A document agent needs the relevant sources and an evidence format—not an unlimited search space. Constraints are how a system earns reliability.",
          ],
        },
        {
          heading: "Tracing and evaluation close the loop",
          paragraphs: [
            "A harness should leave behind enough evidence to answer a simple question after a run: what happened? That means recording useful events such as model calls, tool calls, handoffs, policy checks, latency and cost. The resulting trace is not just operational telemetry. It is the raw material for debugging, review and quality measurement.",
            "Evaluation then tests the full model-harness pair on representative work. Did the agent select the right context? Did it call a tool with valid arguments? Did it respect a permission boundary? Did the final answer meet the rubric? This kind of evaluation is more demanding than checking a single response, but it matches the way users experience the system: as one workflow, not a collection of isolated prompts.",
          ],
        },
        {
          heading: "Build the smallest harness that can teach you something",
          paragraphs: [
            "A harness does not need to begin as a platform. Start with one task, a constrained tool set, a trace and a handful of carefully selected test cases. That is enough to reveal whether the failure is in context, instruction, tool design, model choice or interface. Each learning can become a tighter contract or a better evaluation case.",
            "The advantage of this mindset is that it remains useful as models change. New models may improve speed or reasoning, but they still need context, permissions, verification and observability. The harness is the part of the system that lets a team adapt without losing control of the work.",
          ],
        },
      ],
    },
    {
      slug: "offlinelingo-designing-for-the-last-mile",
      number: "05",
      topic: "Project note · OfflineLingo",
      date: "September 2026",
      readTime: "7 min read",
      title: "OfflineLingo: designing for the last mile of communication",
      subtitle: "A project note on building an offline translation prototype for emergency contexts, where a polished answer matters less than a dependable path from one person to another.",
      dek: "OfflineLingo was developed during the European Defense Tech Hackathon in Berlin. The project explored a simple but demanding idea: a mobile translation flow that still works when connectivity cannot be assumed.",
      takeaway: "In a constrained setting, the best feature is often not more intelligence. It is a clear, recoverable interaction that keeps the person in control.",
      diagram: "project",
      diagramTitle: "From spoken phrase to a checkable translation",
      diagramCaption: "OfflineLingo keeps recognition and translation local, then makes space for the user to review confidence and retry before relying on the result.",
      sections: [
        {
          heading: "The constraint shaped the product",
          paragraphs: [
            "The project began with a scenario rather than a technology choice: emergency responders may need to communicate across languages with no dependable internet connection. That immediately changed the definition of a good prototype. A cloud API could produce an impressive result in a comfortable demo, but it would not answer the actual question if the network disappeared at the moment of use.",
            "The design therefore became local by default. Voice is captured on Android, speech is transcribed on the device and a local language model produces the translation. This creates hard trade-offs around model size, speed and memory, but it also creates a clearer operating promise: the central interaction should not depend on Wi-Fi, mobile data or a remote account.",
          ],
        },
        {
          heading: "The pipeline was only half of the work",
          paragraphs: [
            "The technical path combined whisper.cpp for on-device speech recognition with llama.cpp and a quantized Qwen 2.5 model for local translation. Those components made local inference feasible, but connecting them was not enough. The interface had to make recording, waiting, reading and retrying understandable when a user could be under pressure.",
            "That is where the product decisions mattered: a focused recording control, fast language switching, high contrast, a practical emergency vocabulary and confidence cues that do not interrupt the whole flow. Each choice attempted to remove a small piece of friction from the last mile between a spoken phrase and a usable translation.",
          ],
        },
        {
          heading: "Uncertainty had to be designed, not hidden",
          paragraphs: [
            "Speech recognition can struggle with noise, accents, names and overlapping voices. Pretending otherwise would create a false sense of certainty precisely when a mistake could matter. The prototype therefore treated confidence as part of the interaction: it gives the user a reason to pause, replay or rephrase instead of simply presenting every sentence as final.",
            "That lesson transfers beyond translation. The most responsible AI interface is not the one that looks most certain; it is the one that helps a person notice when the system may need help. In OfflineLingo, confidence cues were not decorative metadata. They were a way to preserve judgment in a workflow designed for speed.",
          ],
        },
        {
          heading: "What I would test next",
          paragraphs: [
            "A hackathon prototype proves an interaction can exist; it does not prove that it is ready for the field. The next useful step would be structured testing across languages, accents, background noise, device performance and domain vocabulary. It would also need user research with people who understand the workflow, because an interface that feels obvious at a desk may fail under stress.",
            "The project remains valuable for the questions it made concrete: what belongs on-device, which failures need a recovery path and how can uncertainty support rather than slow down a user? Those questions are central to many applied AI products, whether they run on a phone, in a browser or inside a larger enterprise workflow.",
          ],
        },
      ],
    },
    {
      slug: "robotics-a-camera-that-knows-where-to-look",
      number: "06",
      topic: "Robotics · Project note",
      date: "September 2026",
      readTime: "9 min read",
      title: "Robotics is a chain of decisions, not a single model",
      subtitle: "Notes from the AMD Open Robotics Hackathon, where our team built a voice-controlled robotic camera assistant that could pick up a camera, frame a target and keep a shot stable as that target moved.",
      dek: "Autonomous manipulation becomes useful only when perception, calibration, planning and the physical action agree on what the world looks like—and on what to do when they do not.",
      takeaway: "A robot earns autonomy through explicit interfaces between perception, motion and verification. The hard part is not one prediction; it is keeping the whole loop safe and observable.",
      diagram: "robotics",
      diagramTitle: "From spoken intent to a stable camera shot",
      diagramCaption: "The CRC Assistant combined voice commands, YOLO target tracking, calibration, a camera-grasp policy and feedback from the scene to operate as one closed loop.",
      sections: [
        {
          heading: "A useful robot begins with a task people recognise",
          paragraphs: [
            "At the AMD Open Robotics Hackathon, our team—CRC—started with a practical brief: help a content creator record without constantly operating a camera or relying on a second person. The resulting assistant had to pick up a camera, point it toward a chosen target, maintain focus and adapt as the target moved. Voice control mattered because it kept the interaction hands-free while the person was in front of the camera.",
            "That scenario was intentionally more demanding than a single pick-and-place demonstration. It linked language, visual perception, geometry and manipulation to an outcome a user could judge immediately: is the camera safely held, is the subject in frame, and does the shot remain usable? Designing from that outcome made the system boundaries much clearer than starting from a list of models or libraries.",
          ],
        },
        {
          heading: "Perception is not yet a command to move",
          paragraphs: [
            "The project used YOLO tracking to identify targets from the COCO label set—people as well as objects such as a cup—and translate the chosen target into a visual reference. But a bounding box is not a robot action. Before the arm can move safely, the system has to connect image coordinates to a calibrated workspace, account for the camera position and decide whether the target is reachable and stable enough to follow.",
            "We therefore treated calibration as a first-class feature rather than an invisible setup step. An automatic calibration tool stored its result in a JSON configuration that could be shared and loaded when the system restarted. That small product decision matters in robotics: repeatable configuration turns a one-off demo arrangement into something that can be re-established, inspected and improved.",
          ],
        },
        {
          heading: "The closed loop is where autonomy becomes credible",
          paragraphs: [
            "A camera assistant cannot make one plan and assume the world stays still. The person may move, the object can shift, tracking can become uncertain or the shot can drift. The useful architecture is therefore a loop: observe the scene, estimate target position, select a constrained motion, execute, then observe again. If the target is lost or the confidence falls, the right action may be to pause, reacquire or ask for a new command—not to continue an old trajectory blindly.",
            "This is also why the interface should express state. Voice commands make the system accessible, but the operator still needs to know whether the robot is listening, tracking, moving, holding position or waiting for recovery. In physical systems, transparency is a safety property: it reduces surprise and makes it possible for a person to intervene before a weak perception signal becomes a bad movement.",
          ],
        },
        {
          heading: "What the hackathon made concrete",
          paragraphs: [
            "The hackathon accelerated a lesson that transfers beyond this specific prototype. Imitation learning and perception models can be powerful components, but the system succeeds at the seams: how data is captured, how models are trained and evaluated, how calibration is carried forward, and how an action is checked in the real world. Our work included a dedicated ROCm training pipeline and a public dataset and model artefacts for the camera-grasp task; those pieces made experimentation more reproducible than an isolated notebook result.",
            "If I extended the project, I would focus on structured failure testing: target occlusion, changing light, targets near the edge of reach, ambiguous voice commands and recovery after an interrupted motion. I would also add explicit motion limits and more systematic shot-quality metrics. Those are not peripheral refinements. They are the path from a compelling autonomous interaction to a dependable robotic product.",
          ],
        },
      ],
    },
  ],
  fr: [
    {
      slug: "agentic-ai-beyond-the-demo",
      number: "01",
      topic: "IA agentique",
      date: "Septembre 2026",
      readTime: "8 min de lecture",
      title: "Concevoir une IA agentique au-delà de la démo",
      subtitle: "Un système agentique utile n’est pas une chaîne d’appels de modèles impressionnants. C’est un workflow avec des responsabilités claires, des preuves et une marche arrière quand quelque chose échoue.",
      dek: "Le vrai travail commence lorsqu’un prototype doit rejoindre un processus réel : entrées ambiguës, étapes de revue, contraintes opérationnelles et utilisateurs qui doivent pouvoir faire confiance au résultat.",
      takeaway: "Concevez d’abord le workflow. Le modèle est un composant d’un système qui doit rester inspectable, réversible et utile.",
      diagram: "agent",
      diagramTitle: "D’une demande à un résultat vérifiable",
      diagramCaption: "Un workflow de production rend explicites les décisions, les preuves et la revue humaine, plutôt que de les cacher dans un prompt opaque.",
      sections: [
        { heading: "Une démo prouve une possibilité, pas la fiabilité", paragraphs: ["Il est facile de rendre un agent convaincant sur un exemple soigneusement choisi. Donnez-lui un document propre, une question étroite et quelques outils : il peut produire quelque chose de persuasif en quelques minutes. La difficulté commence lorsque l’entrée est incomplète, le langage ambigu ou que l’utilisateur doit comprendre pourquoi une recommandation a été produite.", "Cette différence change l’objectif. Plutôt que de demander combien d’agents peuvent être connectés, il faut partir d’une question pratique : quelle décision ou quelle tâche doit devenir plus simple pour quelqu’un ? Une bonne réponse crée un workflow borné, avec une entrée claire, une sortie mesurable et une personne capable de valider le résultat."] },
        { heading: "Rendez les passages de relais visibles", paragraphs: ["Les systèmes agentiques les plus solides sont souvent moins magiques que leurs démos. Ils séparent recherche de contexte, planification, exécution d’outils et revue. Chaque passage de relais permet de conserver une preuve, de valider un format ou d’arrêter une action risquée. Les échecs deviennent locaux : une mauvaise source peut être remplacée sans reconstruire tout le workflow.", "Pour un travail documentaire, cela peut vouloir dire conserver les extraits à l’origine d’un constat, enregistrer la version de la source et exposer les champs extraits. Pour un workflow outillé, cela peut vouloir dire valider les arguments avant un appel et retourner un résultat structuré plutôt qu’un paragraphe libre. Ces petits contrôles rendent le système inspectable et améliorable."] },
        { heading: "La revue humaine est une fonctionnalité produit", paragraphs: ["Human-in-the-loop ne doit pas signifier placer une personne à la fin d’une longue chaîne impossible à retracer. La revue est la plus utile aux moments conséquents : avant une action sensible, après une extraction peu fiable ou lorsqu’un workflow atteint une décision métier. Le relecteur a besoin de contexte, pas seulement d’un bouton rouge ou vert.", "L’expérience devient alors plus honnête et plus utile. L’automatisation prend en charge la préparation répétitive ; les personnes conservent la responsabilité du jugement. C’est cet équilibre qui transforme une application LLM en outil de travail fiable plutôt qu’en démonstration ponctuelle."] },
        { heading: "Mesurer le travail, pas seulement la phrase finale", paragraphs: ["Un score sur la réponse finale suffit rarement. Un système peut sembler très convaincant tout en récupérant une mauvaise source, en choisissant le mauvais outil ou en prenant trop de temps. Une évaluation utile examine aussi la trajectoire : le bon contexte a-t-il été trouvé, l’appel d’outil respecte-t-il son contrat, la revue a-t-elle détecté le problème attendu et quel a été le coût du run ?", "C’est pourquoi les traces sont importantes. Elles transforment un échec isolé en une séquence inspectable d’appels de modèles, d’outils, de handoffs et de garde-fous. Une fois le workflow visible, l’équipe peut construire un petit jeu de cas représentatifs et améliorer une décision à la fois au lieu de deviner quel prompt est responsable."] },
      ],
    },
    {
      slug: "ai-without-a-network",
      number: "02",
      topic: "IA embarquée",
      date: "Septembre 2026",
      readTime: "7 min de lecture",
      title: "Concevoir une IA qui fonctionne sans réseau",
      subtitle: "Lorsque la connectivité disparaît, l’architecture et l’interface doivent porter une plus grande part de la responsabilité du système.",
      dek: "L’IA local-first n’est pas simplement de l’IA cloud déplacée sur un appareil. C’est un ensemble de décisions sur la latence, la confidentialité, la taille du modèle et le comportement du produit lorsqu’il ne peut pas demander d’aide à un serveur.",
      takeaway: "La capacité hors ligne est une promesse d’expérience : dites ce qui se passe localement, rendez les modes de défaillance compréhensibles et montrez les contraintes dans le design.",
      diagram: "offline",
      diagramTitle: "Un parcours de traduction local",
      diagramCaption: "Tout le parcours reste sur l’appareil. La dépendance au réseau diminue et l’audio sensible ne quitte pas le terminal.",
      sections: [
        { heading: "Partir de la contrainte, pas du modèle", paragraphs: ["Un contexte hors ligne change le brief de conception. Un produit peut être utilisé en situation d’urgence, dans un environnement à faible bande passante ou lorsque les données ne peuvent pas quitter l’appareil. L’objectif n’est plus seulement de maximiser la qualité d’un modèle. Il est de fournir une réponse utile, rapide, prévisible et privée avec des ressources limitées.", "Cela commence par un budget réaliste. Combien de temps l’utilisateur peut-il attendre ? Quelles langues sont importantes ? Quel espace de stockage l’application peut-elle occuper ? Quelles opérations doivent fonctionner sans compte, sans réseau et sans solution de repli ? Ces questions réduisent les choix de modèles et de plateformes avant même l’implémentation."] },
        { heading: "Un petit système peut être intentionnel", paragraphs: ["La reconnaissance vocale sur appareil et des modèles de langage locaux peuvent former une chaîne complète : capturer l’audio, le transcrire, le traduire puis présenter le résultat. Le travail de conception essentiel se situe autour des appels de modèles : découper ou diffuser l’audio, gérer la mémoire, traiter les pauses longues et garder l’interface réactive pendant l’inférence.", "Les systèmes locaux ont aussi besoin d’un chemin de récupération explicite. Si la reconnaissance est faible, l’utilisateur doit pouvoir réessayer, corriger le texte ou changer de langue sans perdre son contexte. Un produit résilient ne prétend pas que le modèle est toujours certain ; il donne à la personne une façon concrète d’avancer."] },
        { heading: "La confidentialité devient visible", paragraphs: ["Garder le traitement sur l’appareil est techniquement précieux, mais les utilisateurs doivent aussi le comprendre. Une explication concise de ce qui reste local, de ce qui est conservé et du moment où les données sont supprimées peut rassurer davantage qu’une déclaration de confidentialité générique. Dans un contexte sensible, cette explication fait partie de l’interface.", "Les meilleurs produits local-first rendent leurs limites lisibles. Ils ne cachent pas une absence de réseau et n’envoient pas silencieusement des données ailleurs. Ils indiquent ce que l’appareil peut faire maintenant, montrent les incertitudes et rendent suffisamment clair le compromis entre vitesse, qualité et confidentialité pour permettre à l’utilisateur d’agir."] },
        { heading: "Soigner l’expérience dégradée", paragraphs: ["Hors ligne ne signifie pas que toutes les fonctionnalités doivent être disponibles en permanence. Cela signifie que l’application est honnête sur son mode de fonctionnement. Un mode local explicite, une file visible pour ce qui demandera un réseau plus tard et des limites assumées sur les opérations coûteuses sont bien préférables à une fonctionnalité qui semble simplement cassée.", "Cette discipline améliore aussi les produits connectés. Concevoir pour un réseau instable oblige à définir précisément l’état, les règles de reprise et le retour utilisateur. On obtient souvent une interface plus calme : elle explique ce qui se passe, préserve le travail et ne traite jamais une erreur réseau comme une faute de l’utilisateur."] },
      ],
    },
    {
      slug: "making-ai-uncertainty-visible",
      number: "03",
      topic: "Interaction humain-IA",
      date: "Septembre 2026",
      readTime: "7 min de lecture",
      title: "Rendre l’incertitude de l’IA visible",
      subtitle: "Une interface très assurée peut donner l’impression qu’un système faillible est plus certain qu’il ne l’est. Un bon design donne à l’incertitude une place pour être vue et prise en compte.",
      dek: "En transcription, traduction et classification, l’objectif n’est pas d’inonder les utilisateurs de scores. Il est de diriger leur attention vers les moments où le jugement compte le plus.",
      takeaway: "La confiance n’est utile que si elle change l’action suivante : vérifier, corriger, réessayer ou continuer avec la prudence adaptée.",
      diagram: "uncertainty",
      diagramTitle: "Transformer un score en action",
      diagramCaption: "Une valeur de confiance brute n’est pas la fin de l’interaction. Des signaux contextualisés doivent aider l’utilisateur à vérifier, corriger ou continuer.",
      sections: [
        { heading: "Les chiffres seuls ne créent pas la confiance", paragraphs: ["Un modèle peut produire une probabilité, mais ce nombre n’a pas automatiquement de sens pour la personne qui utilise le produit. Un score de confiance peut refléter l’étalonnage interne du modèle, et non l’importance d’une erreur dans la situation de l’utilisateur. Un faible score sur un nom, une instruction ou un nombre peut compter bien plus que sur un mot de remplissage.", "L’interface doit donc relier l’incertitude à la tâche. Mettre en évidence un mot fragile dans une transcription, proposer des interprétations alternatives ou expliquer que l’audio était peu clair donne à l’utilisateur une raison concrète de regarder de plus près. L’objectif n’est pas d’exposer tous les détails du modèle ; il est de rendre le risque actionnable."] },
        { heading: "Préférer des couches aux alertes", paragraphs: ["Trop d’avertissements deviennent du bruit de fond. Une meilleure approche consiste à révéler l’information progressivement : garder le résultat principal lisible, marquer les parties qui demandent de l’attention et proposer davantage de détail sur demande. Cela préserve le rythme tout en donnant aux utilisateurs attentifs les preuves dont ils ont besoin.", "La hiérarchie visuelle est importante. Un petit repère de confiance, cohérent, peut être plus utile qu’une alerte spectaculaire. Associez-le à une action claire : réécouter l’audio, modifier le texte ou comparer une alternative. L’interface aide alors à résoudre l’incertitude plutôt qu’à simplement l’annoncer."] },
        { heading: "Concevoir la correction, pas la perfection", paragraphs: ["Chaque workflow assisté par IA a besoin d’une boucle de correction rapide. S’il est difficile de modifier une transcription, remplacer une classification ou retirer une mauvaise suggestion, les utilisateurs cesseront de faire confiance au système ou le contourneront. Les bons chemins de correction sont petits, locaux et préservent le contexte de la personne.", "Cette approche crée une relation plus saine entre automatisation et jugement. Le système peut être utile avant d’être parfait, à condition d’être transparent sur ses limites et de respecter la capacité d’intervention de l’utilisateur. C’est une définition bien plus solide d’une IA digne de confiance qu’une réponse polie à elle seule."] },
        { heading: "Faire de l’incertitude un contrat d’interaction", paragraphs: ["Une question produit utile accompagne chaque signal de confiance : qu’est-ce qui doit changer si ce signal est faible ? Si la réponse est rien, le score ne devrait probablement pas être affiché. Si la réponse est d’arrêter, demander une confirmation ou montrer la source, l’interaction a un objectif clair et peut être testée avec des utilisateurs.", "Cette question évite aussi la fausse précision. Un pourcentage à deux décimales peut sembler scientifique tout en n’aidant personne à décider. Un repère choisi avec soin, une raison de l’incertitude et une action suivante évidente sont souvent plus fiables qu’un nombre isolé de son contexte."] },
      ],
    },
    {
      slug: "the-ai-harness",
      number: "04",
      topic: "Systèmes IA",
      date: "Septembre 2026",
      readTime: "8 min de lecture",
      title: "Le harnais IA : le système autour du modèle",
      subtitle: "Un agent n’est pas seulement un prompt et un modèle. Son harnais est la couche d’ingénierie qui décide ce qu’il peut voir, faire, mémoriser, vérifier et rendre à une personne en sécurité.",
      dek: "Le terme de « harnais » est utile parce qu’il déplace la discussion de la magie du modèle vers les contrôles pratiques qui rendent un système IA exploitable.",
      takeaway: "La qualité d’un agent est une propriété conjointe du modèle et de son harnais. Améliorer l’un sans l’autre laisse de la valeur sur la table.",
      diagram: "harness",
      diagramTitle: "La couche de contrôle autour d’un agent",
      diagramCaption: "Le harnais construit des limites et des boucles de retour autour d’un run : une tâche arrive avec du contexte et des permissions, puis produit une trace qui peut être relue et évaluée.",
      sections: [
        { heading: "Le modèle est le moteur, pas le véhicule", paragraphs: ["Lorsqu’on parle d’agent IA, on commence souvent par le modèle : fournisseur, taille, mode de raisonnement. Ces choix comptent, mais ils n’expliquent pas le comportement d’un agent dans un environnement réel. Le modèle ne décide pas quelles données il peut lire, quels appels d’outils sont sûrs, à quoi ressemble un résultat réussi ni comment un échec est enregistré. Le système qui l’entoure le fait.", "C’est ce système que j’appelle le harnais IA. C’est la couche runtime et produit qui cadre une tâche, sélectionne le contexte, expose les outils, applique les permissions, trace l’exécution et rend l’évaluation possible. Pour un agent de code, cela peut inclure le dépôt, un terminal isolé, les tests et la revue du diff. Pour un workflow métier, ce sont les sources, les actions basées sur les rôles, les validations et les preuves d’audit."] },
        { heading: "Un bon harnais réduit les degrés de liberté", paragraphs: ["La mauvaise approche consiste à donner un accès large à l’agent en espérant qu’un prompt prudent suffira. Une approche plus solide part de contraintes assumées : une interface d’outils étroite, des entrées et sorties typées, un petit volume de contexte pertinent et une politique claire pour les actions qui demandent une validation humaine. L’agent a moins de place pour dériver et son travail devient plus facile à comprendre.", "Il ne s’agit pas de rendre l’agent moins capable, mais d’orienter cette capacité vers une tâche. Un agent de code a besoin des bons fichiers, commandes et tests, pas de tous les identifiants d’une machine. Un agent documentaire a besoin des sources pertinentes et d’un format de preuve, pas d’un espace de recherche illimité. Les contraintes sont la manière dont un système gagne en fiabilité."] },
        { heading: "Les traces et l’évaluation ferment la boucle", paragraphs: ["Un harnais doit laisser suffisamment de preuves pour répondre après un run à une question simple : que s’est-il passé ? Cela implique d’enregistrer les événements utiles : appels de modèle, outils, handoffs, vérifications de politique, latence et coût. La trace n’est pas seulement de la télémétrie opérationnelle. C’est la matière première du débogage, de la revue et de la mesure de qualité.", "L’évaluation teste ensuite le couple modèle-harnais sur des tâches représentatives. L’agent a-t-il choisi le bon contexte ? A-t-il appelé un outil avec des arguments valides ? A-t-il respecté une limite de permission ? La réponse finale respecte-t-elle le barème ? Cette évaluation est plus exigeante qu’un contrôle de phrase, mais elle correspond à l’expérience réelle : un workflow complet, pas une collection de prompts isolés."] },
        { heading: "Construire le plus petit harnais qui apprend quelque chose", paragraphs: ["Un harnais n’a pas besoin de commencer comme une plateforme. Une tâche, quelques outils contraints, une trace et un petit jeu de cas choisis suffisent pour révéler si l’échec vient du contexte, de l’instruction, du design d’outil, du modèle ou de l’interface. Chaque apprentissage peut devenir un contrat plus précis ou un meilleur cas d’évaluation.", "Ce raisonnement reste valable lorsque les modèles évoluent. Les nouveaux modèles peuvent améliorer la vitesse ou le raisonnement, mais ils ont toujours besoin de contexte, de permissions, de vérification et d’observabilité. Le harnais est la partie qui permet à une équipe de s’adapter sans perdre le contrôle du travail."] },
      ],
    },
    {
      slug: "offlinelingo-designing-for-the-last-mile",
      number: "05",
      topic: "Note projet · OfflineLingo",
      date: "Septembre 2026",
      readTime: "7 min de lecture",
      title: "OfflineLingo : concevoir le dernier kilomètre de la communication",
      subtitle: "Une note de projet sur un prototype de traduction hors ligne pour des contextes d’urgence, où une réponse élégante compte moins qu’un passage fiable d’une personne à une autre.",
      dek: "OfflineLingo a été développé pendant le European Defense Tech Hackathon à Berlin. Le projet explorait une idée simple mais exigeante : un parcours de traduction mobile qui fonctionne encore lorsqu’on ne peut pas compter sur la connectivité.",
      takeaway: "Dans un contexte contraint, la meilleure fonctionnalité n’est souvent pas plus d’intelligence. C’est une interaction claire et récupérable qui garde la personne aux commandes.",
      diagram: "project",
      diagramTitle: "D’une phrase prononcée à une traduction vérifiable",
      diagramCaption: "OfflineLingo garde la reconnaissance et la traduction en local, puis laisse à l’utilisateur l’espace de relire le niveau de confiance et de réessayer avant de s’appuyer sur le résultat.",
      sections: [
        { heading: "La contrainte a façonné le produit", paragraphs: ["Le projet est parti d’un scénario, pas d’un choix technologique : des équipes d’intervention peuvent devoir communiquer dans plusieurs langues sans connexion fiable. Cela a immédiatement changé la définition d’un bon prototype. Une API cloud peut être impressionnante dans une démo confortable, mais ne répond plus à la question si le réseau disparaît au moment de l’usage.", "Le design est donc devenu local par défaut. La voix est capturée sur Android, la parole est transcrite sur l’appareil et un modèle de langage local produit la traduction. Ce choix impose des compromis sur la taille, la vitesse et la mémoire, mais crée aussi une promesse plus claire : l’interaction centrale ne dépend ni du Wi-Fi, ni de données mobiles, ni d’un compte distant."] },
        { heading: "Le pipeline ne représentait que la moitié du travail", paragraphs: ["Le chemin technique associait whisper.cpp pour la reconnaissance vocale embarquée à llama.cpp et un modèle Qwen 2.5 quantifié pour la traduction locale. Ces composants rendaient l’inférence locale possible, mais les relier ne suffisait pas. L’interface devait rendre l’enregistrement, l’attente, la lecture et la reprise compréhensibles lorsqu’une personne peut être sous pression.", "C’est là que les décisions produit comptaient : un contrôle d’enregistrement ciblé, un changement de langue rapide, un contraste élevé, un vocabulaire d’urgence utile et des repères de confiance qui n’interrompent pas tout le parcours. Chaque choix visait à retirer une friction du dernier kilomètre entre une phrase prononcée et une traduction exploitable."] },
        { heading: "L’incertitude devait être conçue, pas cachée", paragraphs: ["La reconnaissance vocale peut avoir du mal avec le bruit, les accents, les noms et les voix qui se chevauchent. Prétendre le contraire créerait une fausse certitude précisément quand une erreur peut compter. Le prototype traite donc la confiance comme une partie de l’interaction : elle donne une raison de faire une pause, de réécouter ou de reformuler plutôt que de présenter chaque phrase comme définitive.", "Cette leçon va bien au-delà de la traduction. L’interface IA la plus responsable n’est pas celle qui semble la plus sûre ; c’est celle qui aide une personne à remarquer lorsque le système peut avoir besoin d’aide. Dans OfflineLingo, les repères de confiance ne sont pas des métadonnées décoratives. Ils préservent le jugement dans un workflow conçu pour la vitesse."] },
        { heading: "Ce que je testerais ensuite", paragraphs: ["Un prototype de hackathon prouve qu’une interaction peut exister ; il ne prouve pas qu’elle est prête pour le terrain. La prochaine étape utile serait un test structuré sur les langues, les accents, le bruit de fond, les performances de différents appareils et le vocabulaire métier. Il faudrait aussi de la recherche utilisateur avec des personnes qui comprennent ce type de workflow, car une interface évidente à un bureau peut échouer sous stress.", "Le projet reste précieux par les questions qu’il rend concrètes : que faut-il garder sur l’appareil, quels échecs ont besoin d’un chemin de reprise et comment l’incertitude peut-elle aider plutôt que ralentir ? Ces questions sont centrales pour de nombreux produits d’IA appliquée, sur un téléphone, dans un navigateur ou au sein d’un workflow d’entreprise plus large."] },
      ],
    },
    {
      slug: "robotics-a-camera-that-knows-where-to-look",
      number: "06",
      topic: "Robotique · Note projet",
      date: "Septembre 2026",
      readTime: "9 min de lecture",
      title: "En robotique, l’autonomie est une chaîne de décisions",
      subtitle: "Retour sur l’AMD Open Robotics Hackathon, où notre équipe a construit un assistant caméra robotisé, piloté à la voix, capable de saisir une caméra, cadrer une cible et maintenir une prise de vue stable lorsqu’elle se déplace.",
      dek: "Une manipulation autonome ne devient utile que lorsque perception, calibration, planification et action physique s’accordent sur l’état du monde—et sur la réponse à apporter lorsque ce n’est plus le cas.",
      takeaway: "Un robot gagne son autonomie grâce à des interfaces explicites entre perception, mouvement et vérification. La difficulté n’est pas une prédiction isolée, mais la sûreté et l’observabilité de toute la boucle.",
      diagram: "robotics",
      diagramTitle: "D’une intention vocale à une prise de vue stable",
      diagramCaption: "Le CRC Assistant relie commandes vocales, suivi de cible YOLO, calibration, politique de saisie de caméra et retour de scène au sein d’une même boucle fermée.",
      sections: [
        { heading: "Un robot utile part d’une tâche immédiatement compréhensible", paragraphs: ["À l’AMD Open Robotics Hackathon, notre équipe—CRC—est partie d’un besoin concret : aider un créateur de contenu à enregistrer sans manipuler sa caméra en permanence ni dépendre d’un deuxième opérateur. L’assistant devait saisir une caméra, l’orienter vers une cible choisie, conserver le focus et s’adapter quand cette cible se déplace. Le contrôle vocal gardait l’interaction mains libres pendant que la personne se trouvait devant la caméra.", "Le scénario était volontairement plus exigeant qu’une démonstration isolée de pick-and-place. Il reliait langage, perception visuelle, géométrie et manipulation à un résultat qu’un utilisateur peut juger immédiatement : la caméra est-elle tenue en sécurité, le sujet est-il dans le cadre et le plan reste-t-il exploitable ? Partir de ce résultat rend les frontières du système plus claires qu’une simple liste de modèles ou de bibliothèques."] },
        { heading: "Percevoir n’est pas encore une instruction de mouvement", paragraphs: ["Le projet utilisait le suivi YOLO pour identifier des cibles parmi les labels COCO—une personne comme un objet tel qu’une tasse—et transformer la cible choisie en référence visuelle. Mais une bounding box n’est pas une action robotique. Avant que le bras bouge, le système doit relier les coordonnées image à un espace de travail calibré, prendre en compte la position de la caméra et déterminer si la cible est atteignable et suffisamment stable pour être suivie.", "Nous avons donc traité la calibration comme une fonctionnalité à part entière, plutôt que comme une étape de préparation invisible. Un outil de calibration automatique enregistrait son résultat dans une configuration JSON partageable et rechargée au redémarrage. C’est un détail produit important en robotique : une configuration répétable transforme une installation de démonstration ponctuelle en un système que l’on peut rétablir, inspecter et améliorer."] },
        { heading: "La boucle fermée rend l’autonomie crédible", paragraphs: ["Un assistant caméra ne peut pas calculer un plan unique en supposant que le monde restera fixe. La personne peut se déplacer, un objet peut changer de position, le suivi devenir incertain ou le cadrage dériver. L’architecture utile est donc une boucle : observer la scène, estimer la position de la cible, sélectionner un mouvement contraint, exécuter, puis observer à nouveau. Si la cible est perdue ou que la confiance baisse, la bonne action peut être de s’arrêter, de réacquérir ou de demander une nouvelle commande, pas de poursuivre aveuglément une ancienne trajectoire.", "C’est aussi pourquoi l’interface doit exprimer l’état. Les commandes vocales rendent le système accessible, mais l’opérateur doit toujours savoir si le robot écoute, suit, se déplace, tient sa position ou attend une reprise. Dans un système physique, la transparence est une propriété de sûreté : elle réduit la surprise et permet à une personne d’intervenir avant qu’un signal perceptif faible ne devienne un mauvais mouvement."] },
        { heading: "Ce que le hackathon a rendu concret", paragraphs: ["Le hackathon a accéléré une leçon qui dépasse ce prototype. L’apprentissage par imitation et les modèles de perception sont des composants puissants, mais le système réussit à ses jonctions : capture des données, entraînement et évaluation, transmission de la calibration et vérification de l’action dans le monde réel. Notre travail incluait un pipeline d’entraînement ROCm dédié ainsi que des artefacts publics de données et de modèle pour la tâche de saisie de caméra ; cela rend l’expérimentation plus reproductible qu’un résultat isolé dans un notebook.", "Si je prolongeais le projet, je prioriserais des tests d’échec structurés : occultation de cible, changements de lumière, cible près de la limite de portée, commande vocale ambiguë et reprise après un mouvement interrompu. J’ajouterais aussi des limites de mouvement explicites et des métriques de qualité de plan plus systématiques. Ce ne sont pas des raffinements secondaires : c’est le chemin qui transforme une interaction autonome convaincante en produit robotique fiable."] },
      ],
    },
  ],
}
