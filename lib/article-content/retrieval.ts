import { articleVisuals } from "@/lib/article-visuals"
import type { Article } from "@/lib/articles"

export const retrievalEn: Article = {
  slug: "rag-evaluate-the-evidence-before-the-answer",
  number: "08",
  topic: "Retrieval · Evaluation",
  date: "September 2026",
  readTime: "6 min read",
  title: "RAG: evaluate the evidence before the answer",
  subtitle: "A fluent answer with three citations can still use the wrong document. To improve a retrieval system, first find out whether the failure happened before or after the model saw the evidence.",
  dek: "Retrieval-augmented generation connects a language model to a searchable collection of documents. The useful engineering question is how to tell whether that connection is working. This is a proposed evaluation method, with an illustrative example—not a report of measured project results.",
  takeaway: "Evaluate evidence retrieval, claim support and abstention separately. Keep document versions and access rules in the test case so a higher answer score cannot hide a worse evidence pipeline.",
  diagram: "agent",
  diagramTitle: "From question to evidence to answer",
  diagramCaption: "Retrieval and generation need separate checks.",
  sections: [
    {"heading": "Work through one retrieval score", "blocks": [{"type": "p", "text": "Suppose a question requires passages A and B, and the first three results are A, C and D. Recall@3 is 1/2, while hit rate for this question is 1: at least one relevant passage was found. The answer still lacks B. Now supply A and B directly to the generator. If the answer becomes complete, investigate retrieval; if it still omits B, inspect context use and answer construction. Keep this two-passage case separate from questions that need only one supporting passage."}]},
    {
      heading: "The answer can be right for the wrong version",
      blocks: [
        { type: "schema", visual: articleVisuals.ragVersion.en },
        { type: "p", text: "Imagine an internal documentation assistant asked: ‘How long do we retain service logs?’ Its index contains a retired guide saying 30 days and an active guide saying 14 days. The assistant retrieves the retired guide, answers ‘30 days’ and attaches a perfectly functioning citation. The sentence is supported by the retrieved passage, but it does not answer the current question correctly." },
        { type: "p", text: "That example separates three decisions: which documents were eligible, which passages were retrieved, and what the model concluded from them. Rewriting the generation prompt cannot reliably fix a missing active document. Increasing retrieval depth cannot settle which policy is authoritative unless version and status are available." },
        { type: "note", label: "Illustrative values", text: "The retention periods in this example are invented to explain version conflicts. They are not retention recommendations." },
      ],
    },
    {
      heading: "Build the test set around evidence",
      blocks: [
        { type: "p", text: "Start with a small reviewed set of real question types. For each case, record the question, the caller’s permitted scope, the relevant document version, the supporting passage and the expected behaviour. An expected answer alone is insufficient: a system could reproduce it from model memory while failing to retrieve any evidence." },
        { type: "table", head: ["Case", "Evidence condition", "Expected behaviour"], rows: [
          ["Direct lookup", "One active passage answers the question", "Answer and cite that passage"],
          ["Version conflict", "Current and retired guides disagree", "Use the active version; explain the distinction if relevant"],
          ["Two-document question", "Each document supplies part of the answer", "Retrieve both and support each claim"],
          ["Missing answer", "No permitted passage contains the fact", "State the gap and ask a useful follow-up"],
          ["Restricted source", "The answer exists outside the caller’s scope", "Do not reveal the restricted content or metadata"],
        ] },
        { type: "p", text: "Separate development cases from a held-out set. Keep paraphrases of one question in the same split, or tuning on one phrasing can leak into the test through another. Version the corpus snapshot as well as the questions: otherwise a score change might come from new documents rather than a better retrieval configuration." },
      ],
    },
    {
      heading: "Measure retrieval without the writer",
      blocks: [
        { type: "schema", visual: articleVisuals.ragFlow.en },
        { type: "p", text: "Run retrieval alone and inspect the passages delivered to generation, after filtering and reranking. Recall@k asks what fraction of the labelled relevant items appeared in the first k results. Hit rate asks whether at least one appeared. They answer different questions: one good passage can satisfy a direct lookup while leaving a two-document question incomplete." },
        { type: "code", lang: "python", caption: "A minimal recall calculation over labelled passage IDs; this does not score the answer.", code: `def recall_at_k(retrieved_ids, relevant_ids, k):
    if k <= 0:
        raise ValueError("k must be positive")
    relevant = set(relevant_ids)
    if not relevant:
        return None  # evaluate unanswerable cases separately
    found = set(retrieved_ids[:k]) & relevant
    return len(found) / len(relevant)` },
        { type: "p", text: "Freeze the passage IDs for a comparison. If chunking changes, remap labels to stable source spans; otherwise the metric penalises new identifiers rather than missing evidence. Inspect cases where a useful sentence loses its heading, table columns or effective date at a chunk boundary. More chunks do not help if they strip away the context that makes a passage interpretable." },
        { type: "p", text: "Compare a lexical baseline with vector retrieval and a hybrid candidate under the same corpus, permissions and context budget. Exact error codes and product identifiers are useful test cases. Treat the choice as an experiment on your questions, not a universal ranking of retrieval methods." },
      ],
    },
    {
      heading: "Then test what the writer does with evidence",
      blocks: [
        { type: "schema", visual: articleVisuals.ragDiagnosis.en },
        { type: "p", text: "Give the generator the reviewed supporting passages directly. If it still fails, inspect the instructions and answer construction. If it succeeds with those passages but fails with retrieved context, investigate retrieval, ranking or truncation. This controlled comparison narrows the problem without changing several components at once." },
        { type: "p", text: "Review each factual claim against its cited passage. A citation’s presence is not evidence of support, and support is not evidence that the source is current. Track answer correctness, claim support and citation coverage independently. Automated evaluators can help triage failures, but their judgements need checks against human labels, especially for partial support and contradictory sources." },
        { type: "references", items: [
          { title: "Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401" },
          { title: "Es et al. — Ragas: Automated Evaluation of Retrieval Augmented Generation", url: "https://arxiv.org/abs/2309.15217" },
        ] },
      ],
    },
    {
      heading: "Abstention is useful only if it is measured",
      blocks: [
        { type: "p", text: "A system that always declines produces few unsupported claims and little value. Report both unsupported answers on unanswerable questions and unnecessary refusals on answerable questions. Keep access-denied cases separate from genuinely missing evidence. The user-facing response should explain the available next step without revealing the existence or title of a restricted document." },
        { type: "p", text: "Enforce access rules before content reaches the model, and include identity and scope in cache isolation. Retrieved documents remain data: text inside them cannot authorise tool calls or change application permissions. Add test documents containing instruction-like text to check this boundary." },
      ],
    },
    {
      heading: "Make the next change diagnosable",
      blocks: [
        { type: "list", ordered: true, items: [
          "Freeze the questions, source snapshot and access scopes; review the evidence labels.",
          "Save retrieved passage IDs, ranks, source versions and the exact context supplied to generation.",
          "Change one component, such as chunking or reranking, and compare failures by question type.",
          "Report retrieval recall, answer correctness, unsupported claims and unnecessary refusals alongside latency and cost.",
          "Inspect newly broken cases before accepting a better average; keep confirmed failures as regression cases.",
        ] },
        { type: "p", text: "The release decision is whether the system answers more of the intended questions with the right evidence, within its operating budget. A polished paragraph is the visible result. The test case should make the evidence behind it equally visible." },
      ],
    },
  ],
}

export const retrievalFr: Article = {
  slug: retrievalEn.slug,
  number: "08",
  topic: "Recherche documentaire · Évaluation",
  date: "Septembre 2026",
  readTime: "7 min de lecture",
  title: "RAG : évaluer les preuves avant la réponse",
  subtitle: "Une réponse fluide avec trois citations peut s’appuyer sur le mauvais document. Pour améliorer un système de recherche, il faut d’abord situer l’erreur avant ou après l’arrivée des preuves dans le modèle.",
  dek: "La génération augmentée par recherche documentaire relie un modèle de langue à un ensemble de documents interrogeable. La question d’ingénierie est de vérifier si ce lien fonctionne. Voici une méthode d’évaluation proposée et un exemple illustratif, sans résultats de projet présentés comme mesurés.",
  takeaway: "Évaluez séparément la recherche de preuves, le soutien des affirmations et l’abstention. Conservez versions et droits d’accès dans les cas de test pour qu’un meilleur score de réponse ne masque pas une recherche moins fiable.",
  diagram: "agent",
  diagramTitle: "De la question aux preuves, puis à la réponse",
  diagramCaption: "La recherche et la génération exigent des vérifications distinctes.",
  sections: [
    {"heading": "Calculer un score de recherche", "blocks": [{"type": "p", "text": "Supposons qu’une question exige les passages A et B et que les trois premiers résultats soient A, C et D. Le rappel à 3 vaut 1/2 ; le taux de succès de cette question vaut 1, car au moins un passage pertinent est présent. B manque toujours. Fournissez ensuite A et B directement au générateur. Si la réponse devient complète, examinez la recherche ; sinon, l’usage du contexte et la rédaction. Distinguez ce cas des questions nécessitant un seul passage."}]},
    {
      heading: "Une réponse peut être exacte pour la mauvaise version",
      blocks: [
        { type: "schema", visual: articleVisuals.ragVersion.fr },
        { type: "p", text: "Imaginons un assistant documentaire interne auquel on demande : « Combien de temps conserve-t-on les journaux du service ? » Son index contient un ancien guide indiquant 30 jours et un guide actif indiquant 14 jours. L’assistant retrouve l’ancien guide, répond « 30 jours » et fournit un lien fonctionnel. Le passage soutient bien la phrase, mais celle-ci ne répond pas correctement à la question actuelle." },
        { type: "p", text: "Cet exemple distingue trois décisions : les documents admissibles, les passages retrouvés et la conclusion du modèle. Réécrire le prompt de génération ne corrige pas de façon fiable l’absence du document actif. Augmenter le nombre de résultats ne détermine pas quelle règle fait autorité si la version et le statut manquent." },
        { type: "note", label: "Valeurs illustratives", text: "Les durées de cet exemple sont inventées pour expliquer un conflit de versions. Ce ne sont pas des recommandations de conservation." },
      ],
    },
    {
      heading: "Construire le jeu de test autour des preuves",
      blocks: [
        { type: "p", text: "Commencez par un petit ensemble relu de types de questions réelles. Pour chaque cas, consignez la question, le périmètre autorisé de la personne, la version documentaire pertinente, le passage justificatif et le comportement attendu. Une réponse de référence ne suffit pas : le modèle pourrait la reproduire de mémoire sans retrouver la moindre preuve." },
        { type: "table", head: ["Cas", "État des preuves", "Comportement attendu"], rows: [
          ["Recherche directe", "Un passage actif répond à la question", "Répondre en citant ce passage"],
          ["Conflit de versions", "Les guides actif et retiré se contredisent", "Utiliser la version active ; expliquer la distinction si utile"],
          ["Question sur deux documents", "Chaque document apporte une partie de la réponse", "Retrouver les deux et justifier chaque affirmation"],
          ["Réponse absente", "Aucun passage autorisé ne contient le fait", "Expliquer le manque et poser une question utile"],
          ["Source restreinte", "La réponse existe hors du périmètre autorisé", "Ne révéler ni contenu ni métadonnées restreints"],
        ] },
        { type: "p", text: "Séparez les cas de développement du jeu tenu à l’écart. Gardez les paraphrases d’une même question dans le même groupe, sinon un réglage sur une formulation peut contaminer le test sur une autre. Versionnez aussi l’instantané du corpus : une variation de score pourrait venir de nouveaux documents plutôt que d’une meilleure recherche." },
      ],
    },
    {
      heading: "Mesurer la recherche sans le rédacteur",
      blocks: [
        { type: "schema", visual: articleVisuals.ragFlow.fr },
        { type: "p", text: "Exécutez la recherche seule et inspectez les passages transmis à la génération après filtrage et reclassement. Le rappel à k mesure la proportion d’éléments pertinents annotés présents dans les k premiers résultats. Le taux de succès indique si au moins un y apparaît. Ces mesures répondent à des questions différentes : un passage peut suffire à une recherche directe mais laisser incomplète une question sur deux documents." },
        { type: "code", lang: "python", caption: "Rappel minimal sur des identifiants de passages annotés ; ce calcul n’évalue pas la réponse.", code: `def recall_at_k(retrieved_ids, relevant_ids, k):
    if k <= 0:
        raise ValueError("k must be positive")
    relevant = set(relevant_ids)
    if not relevant:
        return None  # évaluer séparément les questions sans réponse
    found = set(retrieved_ids[:k]) & relevant
    return len(found) / len(relevant)` },
        { type: "p", text: "Figez les identifiants de passages pendant une comparaison. Si le découpage change, rattachez les annotations à des portions stables de la source ; sinon la mesure pénalise de nouveaux identifiants plutôt qu’un manque de preuves. Inspectez les phrases séparées de leur titre, des colonnes d’un tableau ou de leur date d’effet. Davantage de fragments ne sert à rien si le contexte nécessaire à leur interprétation disparaît." },
        { type: "p", text: "Comparez une référence lexicale à une recherche vectorielle et à une variante hybride, avec le même corpus, les mêmes permissions et le même budget de contexte. Les codes d’erreur exacts et identifiants de produit constituent de bons cas de test. Ce choix est une expérience sur vos questions, pas un classement universel des méthodes." },
      ],
    },
    {
      heading: "Tester ensuite ce que le rédacteur fait des preuves",
      blocks: [
        { type: "schema", visual: articleVisuals.ragDiagnosis.fr },
        { type: "p", text: "Donnez directement au générateur les passages justificatifs relus. S’il échoue encore, inspectez les instructions et la construction de la réponse. S’il réussit avec ces passages mais échoue avec le contexte retrouvé, examinez la recherche, le classement ou la troncature. Cette comparaison contrôlée localise le problème sans modifier plusieurs composants à la fois." },
        { type: "p", text: "Confrontez chaque affirmation factuelle au passage cité. La présence d’une citation ne prouve pas qu’elle soutient l’affirmation ; ce soutien ne prouve pas que la source est actuelle. Mesurez séparément justesse de réponse, soutien des affirmations et couverture des citations. Les évaluateurs automatiques peuvent aider à trier les erreurs, mais leurs jugements doivent être comparés à des annotations humaines, surtout face aux preuves partielles et aux contradictions." },
        { type: "references", items: [
          { title: "Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401" },
          { title: "Es et al. — Ragas: Automated Evaluation of Retrieval Augmented Generation", url: "https://arxiv.org/abs/2309.15217" },
        ] },
      ],
    },
    {
      heading: "L’abstention n’est utile que si elle est mesurée",
      blocks: [
        { type: "p", text: "Un système qui refuse toujours produit peu d’affirmations non étayées et peu de valeur. Rapportez à la fois les réponses sans preuve aux questions impossibles et les refus inutiles aux questions auxquelles on pouvait répondre. Distinguez accès refusé et preuve réellement absente. La réponse visible doit proposer une suite utile sans révéler l’existence ou le titre d’un document restreint." },
        { type: "p", text: "Appliquez les droits avant que le contenu atteigne le modèle et isolez le cache selon l’identité et le périmètre. Les documents retrouvés restent des données : leur texte ne peut autoriser des appels d’outils ni modifier les permissions de l’application. Ajoutez des documents contenant de fausses instructions pour tester cette frontière." },
      ],
    },
    {
      heading: "Rendre la prochaine modification explicable",
      blocks: [
        { type: "list", ordered: true, items: [
          "Figer questions, instantané des sources et périmètres d’accès ; relire les annotations de preuves.",
          "Enregistrer identifiants, rangs, versions des sources et contexte exact fourni au générateur.",
          "Modifier un seul composant, comme le découpage ou le reclassement, puis comparer les erreurs par type de question.",
          "Rapporter rappel, justesse, affirmations sans preuve et refus inutiles avec la latence et le coût.",
          "Examiner les nouvelles régressions avant d’accepter une meilleure moyenne ; conserver les erreurs confirmées comme cas de test.",
        ] },
        { type: "p", text: "La décision de mise en service dépend de la capacité à répondre à davantage de questions visées avec les bonnes preuves, dans le budget prévu. Le paragraphe soigné est le résultat visible. Le cas de test doit rendre tout aussi visibles les preuves qui le soutiennent." },
      ],
    },
  ],
}
