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
  diagram: "agent" | "offline" | "uncertainty"
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
      readTime: "6 min read",
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
      ],
    },
    {
      slug: "ai-without-a-network",
      number: "02",
      topic: "Edge AI",
      date: "September 2026",
      readTime: "5 min read",
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
      ],
    },
    {
      slug: "making-ai-uncertainty-visible",
      number: "03",
      topic: "Human-AI interaction",
      date: "September 2026",
      readTime: "5 min read",
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
      ],
    },
  ],
  fr: [
    {
      slug: "agentic-ai-beyond-the-demo",
      number: "01",
      topic: "IA agentique",
      date: "Septembre 2026",
      readTime: "6 min de lecture",
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
      ],
    },
    {
      slug: "ai-without-a-network",
      number: "02",
      topic: "IA embarquée",
      date: "Septembre 2026",
      readTime: "5 min de lecture",
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
      ],
    },
    {
      slug: "making-ai-uncertainty-visible",
      number: "03",
      topic: "Interaction humain-IA",
      date: "Septembre 2026",
      readTime: "5 min de lecture",
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
      ],
    },
  ],
}
