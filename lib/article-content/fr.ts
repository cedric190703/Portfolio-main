import { articleVisuals } from "@/lib/article-visuals"
import type { Article } from "@/lib/articles"
import { retrievalFr } from "@/lib/article-content/retrieval"

export const articlesFr: Article[] = [
  retrievalFr,
  {
    slug: "agentic-ai-beyond-the-demo",
    number: "01",
    topic: "IA agentique",
    date: "Septembre 2026",
    readTime: "9 min de lecture",
    title: "Concevoir une IA agentique au-delà de la démo",
    subtitle: "La démo de mon agent de newsletter a fonctionné dès le premier soir. Ce qui a cassé la semaine suivante n’avait rien à voir avec le modèle, et tout à voir avec ce qui circulait entre les étapes.",
    dek: "Notes tirées de Good News Agent, un workflow LangGraph qui recherche, qualifie et rédige une newsletter personnalisée — et des pannes qui ne sont apparues qu’une fois le système lancé chaque jour sur de vraies sources.",
    takeaway: "Décidez ce que chaque passage de relais transporte avant de décider quel modèle l’exécute. Un état typé, un journal de preuves et un paquet de revue corrigent plus de pannes de production qu’un meilleur prompt.",
    diagram: "agent",
    diagramTitle: "Qui détient les preuves à chaque étape",
    diagramCaption: "Un numéro de la newsletter vu en couloirs. Le journal de preuves est écrit avant que la personne ne voie un brouillon : la revue porte sur des sources et des raisons, pas sur un paragraphe bien tourné.",
    sections: [
      {
        heading: "La démo a marché un mardi",
        blocks: [
          { type: "p", text: "Good News Agent est un graphe LangGraph à cinq nœuds : planifier les sujets, collecter des articles candidats, qualifier les sources, vérifier les affirmations qui seront citées, rédiger le numéro. Le premier soir, la démo a produit une newsletter convaincante à partir de quelques flux. J’en ai été content pendant environ une semaine." },
          { type: "p", text: "Puis le système a tourné chaque jour. Le nœud de qualification a noté un article derrière paywall comme source solide parce que ses deux phrases visibles étaient bien écrites. La même dépêche est apparue deux fois sous des titres différents, et les deux copies ont été retenues. Un lien valide à la collecte était mort au moment où le rédacteur l’a cité. Rien de tout cela n’est une défaillance du modèle au sens habituel — il a fait exactement ce qu’un lecteur compétent aurait fait avec l’information disponible. Ce sont des défaillances de workflow : la mauvaise information franchissait la frontière entre les nœuds." },
          { type: "p", text: "Ce recadrage a changé la suite du projet. Au lieu d’ajuster les prompts, j’ai passé le temps restant sur ce que chaque passage de relais avait le droit de contenir." },
        ],
      },
      {
        heading: "Ce qu’un passage de relais doit transporter",
        blocks: [
          { type: "schema", visual: articleVisuals.evidence.fr },
          { type: "p", text: "L’objet d’état entre les nœuds a commencé comme une liste d’URL et de résumés libres. Il a fini comme un enregistrement typé où chaque champ existe parce qu’une panne précise l’a exigé :" },
          { type: "code", lang: "python", caption: "L’enregistrement candidat qui circule entre les nœuds du graphe.", code: `class Candidate(TypedDict):
    url: str
    fetched_at: str          # le rédacteur cite cet instantané, pas « la page »
    content_hash: str        # clé de dédoublonnage — le titre ne sert à rien ici
    excerpt: str             # le texte exact sur lequel repose une affirmation (≤ 600 car.)
    source_score: float
    reasons: list[str]       # pourquoi le qualificateur a noté ainsi ; montré au relecteur
    status: Literal["candidate", "qualified", "verified", "rejected"]` },
          { type: "p", text: "Trois de ces champs ont fait l’essentiel du travail. `content_hash` est calculé sur le corps du texte normalisé, si bien que deux titres pour une même dépêche se replient en un seul candidat. `excerpt` oblige le nœud de vérification à désigner une phrase plutôt qu’à affirmer qu’une page « soutient » une affirmation. `reasons` est une liste de chaînes courtes que le qualificateur doit remplir ; c’est devenu le moyen le moins cher de voir quand sa notation était fausse : quand un paywall a obtenu un bon score, les raisons disaient `argumentation bien structurée` à propos de deux phrases, et cela a suffi pour ajouter une longueur minimale." },
          { type: "p", text: "La règle à laquelle je suis arrivé est simple : un nœud qui ne peut pas remplir un champ obligatoire renvoie l’enregistrement avec `status = rejected` et une raison. Il n’écrit jamais un paragraphe pour expliquer qu’il n’a rien trouvé. La prose à une frontière, c’est là que le débogage va mourir." },
        ],
      },
      {
        heading: "Où la personne a réellement sa place",
        blocks: [
          { type: "p", text: "La première version plaçait une personne à la fin, devant la newsletter terminée. C’est le pire endroit pour une revue : le brouillon est poli, les sources sont trois étapes en amont, et la seule action possible est de tout rejeter." },
          { type: "p", text: "La version qui a fonctionné place la revue entre la qualification et la rédaction. Le relecteur voit un paquet de cinq à huit candidats, chacun avec son extrait, son score de source et ses raisons. Accepter ou écarter un candidat prend quelques secondes parce que la preuve est déjà à côté. Chaque décision est réécrite dans la trace du run avec l’étiquette du relecteur — c’est ainsi que le jeu de régression a grandi sans que personne ne s’assoie pour écrire des cas de test." },
          { type: "figure" },
          { type: "p", text: "Une conséquence que je n’avais pas anticipée : une fois la revue déplacée en amont, le nœud de rédaction n’a plus eu besoin d’un grand modèle. Il reçoit des extraits vérifiés et une structure ; il compose, il ne juge pas. Les appels coûteux sont dans la qualification et la vérification, là où se tromper coûte cher." },
        ],
      },
      {
        heading: "Évaluer la trajectoire, pas la newsletter",
        blocks: [
          { type: "schema", visual: articleVisuals.agentLoop.fr },
          { type: "p", text: "Une note de rubrique sur le texte final ne m’apprenait presque rien. Deux numéros pouvaient se lire aussi bien alors que l’un citait un lien mort et avait perdu la meilleure source. Les mesures qui ont réellement fait bouger les décisions portaient toutes sur le chemin :" },
          { type: "table", head: ["Mesure", "Ce qu’elle a attrapé"], rows: [
            ["Doublons par numéro (via `content_hash`)", "Le problème des dépêches ; mesurer séparément les doublons exacts et les quasi-doublons"],
            ["Couverture des extraits — % d’affirmations citées avec extrait vérifié", "Le rédacteur qui invente une phrase de liaison entre deux sources"],
            ["Taux de rejet du relecteur sur les candidats qualifiés", "La notation des paywalls ; examiner les sources et l’accord entre relecteurs avant de modifier les seuils"],
            ["Liens morts au moment de la rédaction", "Conserver l’instantané et vérifier séparément le lien public"],
            ["Coût par numéro et par nœud", "Comparer la dépense aux erreurs évitées ; aucune répartition n’est universelle"],
          ] },
          { type: "p", text: "C’est aussi pour cela que j’ai ensuite construit flightrec, un petit enregistreur-rejoueur de runs d’agents. Enregistrer chaque appel de modèle, appel d’outil et transition d’état comme des événements permet de rejouer un run contre un nouveau prompt ou un nouveau modèle et de comparer les deux trajectoires. « Le nouveau prompt a-t-il changé quelles sources sont qualifiées ? » devient une question avec une réponse plutôt qu’une impression." },
        ],
      },
      {
        heading: "Ce que je ferais dès le départ la prochaine fois",
        blocks: [
          { type: "list", items: [
            "Écrire le type d’état avant le premier nœud. Si un champ ne peut pas être nommé, le passage de relais n’est pas encore compris.",
            "Placer le paquet de revue là où la preuve est la plus fraîche, pas là où la sortie est la plus jolie.",
            "Journaliser des raisons sous forme de chaînes courtes, pas d’explications. Elles servent à grep, pas à lire.",
            "Citer des instantanés. Le web change entre la collecte et la rédaction, même au sein d’un seul run.",
            "Mesurer le chemin dès le premier jour ; la note du texte final est la dernière mesure à ajouter, pas la première.",
          ] },
        ],
      },
      {"heading": "Une empreinte ne constitue pas une archive de preuves", "blocks": [{"type": "p", "text": "Une empreinte identifie un corps normalisé identique ; elle ne détecte pas les dépêches légèrement réécrites. Conservez un identifiant de source stable et comparez séparément les passages similaires. Un horodatage ne conserve pas non plus une page : stockez le texte récupéré et sa provenance selon les règles d’accès et de conservation. Revérifiez les liens publics avant publication, puis confrontez les affirmations du texte final aux extraits. La validation préalable des sources ne détecte pas une affirmation ajoutée pendant la rédaction."}, {"type": "references", "items": [{"title": "Référence technique · LangGraph — Persistence", "url": "https://docs.langchain.com/oss/python/langgraph/persistence"}]}]},
    ],
  },

  {
    slug: "ai-without-a-network",
    number: "02",
    topic: "IA embarquée",
    date: "Septembre 2026",
    readTime: "8 min de lecture",
    title: "Concevoir une IA qui fonctionne sans réseau",
    subtitle: "Deux projets Android m’ont appris que l’IA sur appareil est surtout un problème de budget. Le modèle se choisit en dernier, une fois que la mémoire, le temps de chargement et le coût d’une erreur ont été écrits noir sur blanc.",
    dek: "OfflineLingo exécute whisper.cpp et llama.cpp sur un téléphone sans aucune permission réseau. Gemmory exécute Gemma 4 via LiteRT-LM avec chaque note et chaque réponse conservée dans une base Room locale. Les leçons se recouvrent presque entièrement.",
    takeaway: "Écrivez d’abord le budget — RAM, stockage, temps de première réponse, batterie — puis choisissez un modèle qui atteint la qualité attendue avec de la marge. Ensuite, concevez ce qui se passe quand la marge disparaît.",
    diagram: "offline",
    diagramTitle: "Un budget de latence sur une seule frise",
    diagramCaption: "Cibles pour une phrase parlée sur un Android milieu de gamme. La barre la plus longue impose le rythme de toute l’interaction — c’est pourquoi le modèle de langue, et non le modèle de parole, dicte la conception.",
    sections: [
      {
        heading: "Le budget vient avant le modèle",
        blocks: [
          { type: "schema", visual: articleVisuals.memory.fr },
          { type: "p", text: "La première question est ce que le téléphone cible peut soutenir. Android ne garantit pas à une application une part fixe de la RAM physique : limites du tas, allocations natives, autres processus et pression mémoire du système interviennent. Les téléchargements de modèles consomment aussi le stockage restant. Fixez le budget sur des appareils identifiés, puis mesurez l’application entière." },
          { type: "table", head: ["Contrainte", "Question que j’ai écrite", "Ce qu’elle a exclu"], rows: [
            ["RAM résidente", "Les deux modèles peuvent-ils rester chargés entre deux phrases ?", "whisper `small` (≈ 466 Mo en f16) plus un modèle de langue 3B"],
            ["Première réponse", "Combien de temps avant que la personne voie du texte ?", "Tout pipeline qui attend la traduction complète avant d’afficher"],
            ["Stockage", "Quelle est l’empreinte installation + modèles ?", "Livrer plusieurs paires de langues comme modèles séparés"],
            ["Batterie / thermique", "Peut-il tenir une conversation de 20 minutes ?", "Faire tourner le modèle de langue à pleine fenêtre de contexte à chaque phrase"],
          ] },
          { type: "p", text: "Pour OfflineLingo, la réponse a été whisper.cpp avec un modèle `base` quantifié (environ 60 Mo) et llama.cpp avec un modèle Qwen 2.5 instruct en 4 bits d’environ 1 Go. Aucun des deux n’est le meilleur modèle disponible. Ensemble, ils forment la plus grande paire qui laisse assez de marge pour que l’application ne soit pas tuée pendant que l’utilisateur est au milieu d’une phrase." },
        ],
      },
      {
        heading: "Le chargement est la fonctionnalité que personne ne montre en démo",
        blocks: [
          { type: "p", text: "Un modèle local a un cycle de vie qu’une API cloud cache : il doit être téléchargé, vérifié, mappé en mémoire et gardé chaud. Chacune de ces étapes échoue d’une manière visible pour l’utilisateur." },
          { type: "p", text: "Gemmory vérifie la taille et le SHA-256 du fichier de modèle avant de le charger, parce qu’un téléchargement partiel qui se charge puis plante au premier token est bien pire qu’un état clair « modèle incomplet, reprendre le téléchargement ». La vérification coûte deux secondes une fois et supprime une classe entière de plantages impossibles à reproduire." },
          { type: "code", lang: "kotlin", caption: "Vérifier avant de charger. Un modèle à moitié chargé est un plantage que l’utilisateur ne peut pas expliquer.", code: `suspend fun ensureModel(spec: ModelSpec): ModelState {
    val file = File(context.filesDir, spec.fileName)
    if (!file.exists() || file.length() != spec.sizeBytes) return ModelState.Missing
    val digest = withContext(Dispatchers.IO) { sha256(file) }
    if (digest != spec.sha256) { file.delete(); return ModelState.Corrupt }
    return ModelState.Ready(file)
}` },
          { type: "p", text: "Garder les modèles chauds compte tout autant. Charger un modèle de 1 Go prend plusieurs secondes même avec `mmap` ; le faire à chaque phrase rendrait l’application inutilisable. Les deux modèles sont chargés une fois, tenus dans un service au premier plan, et libérés seulement sous pression mémoire — auquel cas l’interface le dit au lieu de ralentir en silence." },
          { type: "figure" },
        ],
      },
      {
        heading: "Dégrader dans une seule direction",
        blocks: [
          { type: "schema", visual: articleVisuals.lifecycle.fr },
          { type: "p", text: "Quand le budget est dépassé, l’application doit renoncer à quelque chose, et elle doit renoncer à la même chose à chaque fois. Sur OfflineLingo l’ordre est fixe : raccourcir d’abord la fenêtre audio (12 s → 8 s), puis passer whisper de `base` à `tiny`, puis refuser de nouveaux enregistrements jusqu’au retour de la mémoire. L’ordre ne va jamais dans l’autre sens et n’implique jamais un réseau — il n’y a pas de réseau. L’utilisateur voit un petit indicateur de mode changer ; il ne voit jamais une traduction sortie en silence d’un modèle plus petit sans indication." },
          { type: "p", text: "La version de la même règle dans Gemmory, c’est la génération annulable. Une longue réponse diffusée token par token peut être arrêtée à tout moment, et la réponse partielle est conservée comme brouillon de note plutôt que jetée. La personne n’attend jamais quelque chose qu’elle ne peut pas interrompre." },
        ],
      },
      {
        heading: "Une confidentialité qu’on peut montrer du doigt",
        blocks: [
          { type: "p", text: "Une politique de confidentialité est une affirmation. Une permission absente est un fait. Le manifeste d’OfflineLingo ne déclare pas `android.permission.INTERNET`, ce qui signifie que le système refusera tout socket que l’application tenterait d’ouvrir. La déclaration de confidentialité la plus forte du projet est une ligne qui n’existe pas." },
          { type: "p", text: "Le mode avion est un test fonctionnel utile : il montre que les modèles installés permettent l’interaction sans connexion. Il ne prouve pas que l’application ne transmet jamais de données quand le réseau revient. Inspectez séparément le manifeste fusionné, les réglages de sauvegarde, les composants exportés et les actions déléguées. Testez aussi une installation neuve avec import local des modèles ; une démo avec modèles en cache ne couvre pas la mise en route." },
        ],
      },
      {
        heading: "Ce que le hors-ligne m’a appris sur les produits connectés",
        blocks: [
          { type: "p", text: "Les habitudes qu’impose l’absence de réseau sont celles qui rendent les produits connectés sereins : l’état est explicite, chaque attente a une cause visible, chaque échec a une étape suivante fixe, et rien d’important n’est perdu quand un appel ne revient pas. J’écris maintenant le chemin dégradé des fonctionnalités cloud de la même manière que pour OfflineLingo, et les interfaces en sortent meilleures même quand le réseau va bien." },
        ],
      },
      {"heading": "Mesurer une session, pas un fichier de modèle", "blocks": [{"type": "p", "text": "La taille du fichier n’est pas la mémoire résidente. Mesurez le pic mémoire du processus au chargement et pendant la génération, avec le cache KV, les tampons audio et les allocations temporaires. Consignez appareil, système, version du moteur, empreinte du modèle, quantification et limite de contexte. Comparez démarrage à froid, réponse à chaud et conversation prolongée ; rapportez les latences élevées autant que la médiane. Retenez le plus petit modèle qui atteint la qualité attendue avec une marge suffisante dans ces conditions."}, {"type": "references", "items": [{"title": "Référence technique · Android — Memory management", "url": "https://developer.android.com/topic/performance/memory-overview"}]}]},
    ],
  },

  {
    slug: "making-ai-uncertainty-visible",
    number: "03",
    topic: "Interaction humain-IA",
    date: "Septembre 2026",
    readTime: "8 min de lecture",
    title: "Rendre l’incertitude de l’IA visible",
    subtitle: "Une confiance de 0,61 sur le mot « deux » dans « donnez-lui deux comprimés » et une confiance de 0,61 sur un « euh » devraient produire des comportements d’interface opposés. La plupart des produits les affichent pareil, ou pas du tout.",
    dek: "Les modèles de reconnaissance vocale donnent gratuitement plusieurs signaux d’incertitude. Le travail de conception consiste à décider lesquels doivent changer ce qu’une personne voit, et à rendre la correction moins coûteuse que le doute.",
    takeaway: "Routez l’incertitude par conséquence, pas par score. Un repère ne vaut d’être montré que s’il change l’action suivante, et cette action doit coûter moins que d’ignorer le repère.",
    diagram: "uncertainty",
    diagramTitle: "Conséquence × confiance, pas la confiance seule",
    diagramCaption: "La même probabilité tombe dans des cases différentes selon le type de token. La ligne — ce qui se passe si ce mot est faux — décide de la réponse de l’interface ; la colonne ne fait que l’ajuster.",
    sections: [
      {
        heading: "Un 0,61 n’est pas un 0,61",
        blocks: [
          { type: "schema", visual: articleVisuals.signals.fr },
          { type: "p", text: "L’exemple qui a réglé la question pour moi vient des tests d’OfflineLingo avec des phrases médicales. La transcription disait « donnez-lui deux comprimés » et la probabilité de whisper sur « deux » était d’environ 0,6, avec « de » en deuxième position. Quelques mots plus loin, un « euh » avait la même probabilité. Afficher les deux dans le même jaune aurait été techniquement honnête et pratiquement inutile : l’un est du bruit, l’autre peut changer une dose." },
          { type: "p", text: "La question de conception n’est donc pas « comment montrer la confiance » mais « quel est le coût d’une erreur sur ce token précis, et quel est le moyen le moins cher pour la personne de le vérifier ». La confiance est une entrée de cette décision. Le type de token en est l’autre, et il compte davantage." },
        ],
      },
      {
        heading: "Quatre signaux à distinguer",
        blocks: [
          { type: "p", text: "L’écosystème Whisper fournit plusieurs signaux diagnostiques, mais les interfaces n’exposent pas toutes les mêmes champs. L’implémentation Python utilise les diagnostics de segment ci-dessous ; avec whisper.cpp, vérifiez la version de l’API et calculez explicitement les diagnostics manquants. Les alternatives exigent aussi un support du décodeur : un score de token ne fournit pas une liste n-best de mots." },
          { type: "table", head: ["Signal", "Ce qu’il signifie en général", "Réponse raisonnable"], rows: [
            ["Probabilité de token (par sous-mot)", "Ce mot est ambigu ou les alternatives sont proches", "Souligner ; proposer les alternatives n-best au toucher"],
            ["`avg_logprob` (par segment)", "Tout le segment est fragile — bruit, accent, voix superposées", "Marquer la phrase, proposer la réécoute du segment"],
            ["`no_speech_prob`", "Le modèle doute qu’il y ait eu de la parole", "Combiner avec la confiance du segment ; proposer de réenregistrer"],
            ["`compression_ratio`", "Sortie répétitive — la boucle d’hallucination classique", "Signaler la répétition ; vérifier l’audio avant suppression"],
          ] },
          { type: "p", text: "Le silence et la répétition sont des signaux d’alerte, pas la preuve qu’une transcription est fausse. Une vraie parole peut se répéter, et le bruit peut tromper la détection de voix. Combinez les diagnostics, conservez l’audio pour la revue et proposez de réenregistrer un segment douteux. Ne supprimez pas silencieusement de la parole sur la base d’un seul seuil." },
          { type: "figure" },
        ],
      },
      {
        heading: "L’axe de conséquence",
        blocks: [
          { type: "p", text: "Classer les tokens par conséquence semble demander un modèle. Il faut surtout une expression régulière et une courte liste. Les nombres, les négations (`ne … pas`, `jamais`, `not`, `no`), les unités et les tokens capitalisés hors début de phrase forment une première heuristique, pas une analyse complète du sens. Les nombres en lettres et les expressions exigent d’autres règles ; les mots non classés peuvent rester importants." },
          { type: "code", lang: "kotlin", caption: "Classification de conséquence bon marché. Le modèle donne la probabilité ; ceci donne la ligne.", code: `fun consequence(token: Token, index: Int): Consequence = when {
    token.text.any { it.isDigit() }                     -> Consequence.HIGH   // doses, quantités, heures
    token.text.lowercase() in NEGATIONS                  -> Consequence.HIGH   // « pas allergique » vs « allergique »
    token.text.lowercase() in UNITS                      -> Consequence.HIGH   // mg, ml, km
    index > 0 && token.text.firstOrNull()?.isUpperCase() == true        -> Consequence.MEDIUM // noms, lieux
    else                                                 -> Consequence.LOW
}` },
          { type: "p", text: "Avec cela en place, l’interface n’a besoin que de quatre comportements : afficher, souligner, demander confirmation, bloquer et réécouter. Un token à faible conséquence ne déclenche jamais plus qu’un soulignement, quel que soit son score. Un token à forte conséquence sous le seuil empêche la phrase d’être marquée comme finale tant que la personne ne l’a pas réécoutée ou corrigée. Les seuils doivent être validés sur des enregistrements représentatifs ; cet exemple ne démontre pas un réglage sûr." },
        ],
      },
      {
        heading: "La correction doit coûter moins que la méfiance",
        blocks: [
          { type: "schema", visual: articleVisuals.correction.fr },
          { type: "p", text: "Un repère qui ne mène nulle part apprend aux gens à ignorer les repères. Chaque token marqué dans OfflineLingo est touchable : le toucher montre les alternatives n-best que whisper a envisagées, et une seconde commande rejoue 1,5 seconde d’audio centrée sur le mot. Choisir une alternative ou retaper le mot met à jour la traduction ; le reste de la phrase n’est pas relancé. Ce dernier point compte — si corriger un mot signifiait attendre à nouveau tout le pipeline, personne ne corrigerait de mots." },
          { type: "p", text: "J’ai aussi retiré le pourcentage. Une première version affichait `61 %` à côté du mot et les testeurs passaient du temps à raisonner sur le chiffre. Le soulignement plus les alternatives transmettaient le même doute et menaient directement à l’action. Un nombre invite à interpréter ; un soulignement invite à toucher." },
        ],
      },
      {
        heading: "Ce que je mesurerais ensuite",
        blocks: [
          { type: "list", items: [
            "Taux de correction sur les tokens à forte conséquence marqués et non marqués. Si les gens corrigent autant les non marqués, les marques sont mal calibrées.",
            "Temps entre la marque et la correction. Au-delà de quelques secondes, le chemin de correction est trop lourd.",
            "Fatigue des marques : combien de marques par phrase avant que les gens cessent de toucher. Je parie sur trois ; je préférerais le savoir.",
            "À quelle fréquence `compression_ratio` attrape un segment halluciné dans du vrai bruit. Si c’est fréquent, ce contrôle mérite son propre état visible.",
          ] },
        ],
      },
      {"heading": "Un score exige un jeu de calibration", "blocks": [{"type": "p", "text": "Une probabilité de token dépend de l’audio et des tokens déjà décodés ; ce n’est pas une probabilité calibrée qu’un mot soit correct. Un mot peut contenir plusieurs tokens. Validez l’agrégation et les seuils sur des enregistrements annotés dans les langues et conditions acoustiques visées. Mesurez séparément les erreurs importantes manquées et les interruptions inutiles. Un classifieur simple manque aussi les nombres en lettres, les négations composées et les noms sans majuscule : les cas inconnus appellent une revue, pas une étiquette de faible risque automatique."}, {"type": "references", "items": [{"title": "Référence technique · Whisper — Transcription and fallback logic", "url": "https://github.com/openai/whisper/blob/main/whisper/transcribe.py"}]}]},
    ],
  },

  {
    slug: "the-ai-harness",
    number: "04",
    topic: "Systèmes IA",
    date: "Septembre 2026",
    readTime: "9 min de lecture",
    title: "Le harnais IA : le système autour du modèle",
    subtitle: "Pendant le hackathon Mistral, nous avons fait tourner le même modèle dans deux versions du CLI Vibe. L’une terminait les tâches de façon fiable ; l’autre s’égarait. La différence tenait entièrement à ce qui entourait le modèle.",
    dek: "Un harnais, c’est tout ce qui décide ce que le modèle peut voir, faire, retenir et contre quoi il est vérifié. C’est là qu’un agent cesse d’être un prompt et devient un système d’ingénierie avec des contrats, des permissions et un historique rejouable.",
    takeaway: "Traitez les couches autour du modèle comme des contrats indépendants et versionnés. Quand un run tourne mal, la correction est presque toujours dans un anneau, pas dans le cœur.",
    diagram: "harness",
    diagramTitle: "Cinq anneaux, un modèle",
    diagramCaption: "Chaque anneau ne parle qu’à ses voisins. Le modèle voit un contexte sélectionné et des outils typés ; permissions et traçage les enveloppent sans que le modèle en ait conscience. Changer le cœur ne touche pas les anneaux extérieurs.",
    sections: [
      {
        heading: "Même modèle, deux comportements",
        blocks: [
          { type: "p", text: "Notre extension de Mistral Vibe ajoutait trois choses au CLI : des skills d’agent réutilisables (un skill étant un jeu d’instructions cadré plus les outils qu’il a le droit d’utiliser), l’automatisation du navigateur comme outil typé, et un routeur qui envoie une tâche vers un modèle local ou un modèle cloud selon sa classe. Les poids du modèle n’ont pas changé. Le taux de réussite sur nos tâches de test a beaucoup changé." },
          { type: "p", text: "Le CLI non modifié donnait au modèle un shell large et un long prompt système. Avec les skills, le même modèle recevait une surface d’outils étroite par tâche et une instruction plus courte et précise. Il a cessé d’explorer, parce qu’il y avait moins à explorer. C’était toute l’astuce, et c’est l’astuce derrière chaque agent fiable que j’ai vu : réduire les degrés de liberté jusqu’à ce que ceux qui restent soient la tâche." },
          { type: "figure" },
        ],
      },
      {
        heading: "Les cinq anneaux",
        blocks: [
          { type: "schema", visual: articleVisuals.toolContract.fr },
          { type: "p", text: "Je vois le harnais comme cinq couches concentriques. L’ordre compte, parce que chaque couche a le droit de connaître celle qui est à l’intérieur d’elle et rien d’autre." },
          { type: "list", ordered: true, items: [
            "**Modèle.** Poids, réglages d’échantillonnage, mode de raisonnement. La partie dont tout le monde parle et celle qui change le moins souvent dans un système qui marche.",
            "**Contexte.** Quels fichiers, documents ou enregistrements sont montrés au modèle, choisis par une règle avec un budget de tokens. Pour une tâche de code, c’est le diff plus les fichiers qu’il touche, pas le dépôt.",
            "**Outils typés.** Chaque outil a un schéma JSON pour ses arguments et — surtout — pour son résultat. `run_tests` renvoie `{passed, failed, first_failure}`, pas un mur de stdout.",
            "**Permissions.** Une liste d’autorisation de commandes, un sandbox pour tout ce qui écrit, et une porte d’approbation pour tout ce qui sort du répertoire de travail. Le modèle ignore que cet anneau existe ; il voit juste certains appels refusés avec une raison.",
            "**Trace et évaluation.** Chaque appel entrant et sortant devient un span. Un ensemble de runs enregistrés devient la suite de régression contre laquelle le prochain changement est mesuré.",
          ] },
          { type: "code", lang: "json", caption: "Un outil dont le résultat est typé. Le harnais valide dans les deux sens ; le modèle ne lit jamais stdout.", code: `{
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
          { type: "p", text: "Le `result_schema` est la partie que la plupart des définitions d’outils sautent. Sans lui, le modèle reçoit ce que l’outil a imprimé et doit en déduire une structure à partir de prose — précisément l’étape fragile que le harnais existe pour supprimer. Tronquer `first_failure` à 1 200 caractères est délibéré : une stack trace de 40 Ko n’est pas de l’information, c’est de la pollution de contexte." },
        ],
      },
      {
        heading: "Le routage est une décision de harnais, pas de modèle",
        blocks: [
          { type: "p", text: "Le routeur de notre extension Vibe choisissait entre un modèle local et un modèle cloud par classe de tâche, jamais par « ça a l’air difficile ». Réécrire une docstring, renommer un symbole et résumer un diff allaient en local. Tout ce qui demandait de planifier sur plusieurs fichiers ou de générer des tests allait dans le cloud. La classification était une simple table de correspondance, pas un appel de modèle supplémentaire." },
          { type: "table", head: ["Classe de tâche", "Route", "Pourquoi"], rows: [
            ["Édition d’un fichier, instruction explicite", "Local", "La latence compte plus que le raisonnement ; l’échec est bon marché et visible"],
            ["Changement multi-fichiers, tests requis", "Cloud", "La qualité du plan domine ; un mauvais plan coûte des minutes"],
            ["Étape d’automatisation navigateur", "Cloud + outil typé", "L’outil contraint l’action ; le modèle ne fait que remplir les arguments"],
            ["Tout ce qui touche des secrets ou la config CI", "Refusé → approbation", "Ce n’est pas une question de modèle"],
          ] },
          { type: "p", text: "Placer le routage dans le harnais permet de le changer, le tester et l’auditer sans toucher aux prompts. Cela garde aussi le chemin bon marché bon marché : le modèle local ne voit jamais le long contexte dont le chemin cloud a besoin." },
        ],
      },
      {
        heading: "Les traces sont l’API de votre propre passé",
        blocks: [
          { type: "schema", visual: articleVisuals.replay.fr },
          { type: "p", text: "flightrec existe parce que je n’arrêtais pas de demander « qu’est-ce qu’il a fait la dernière fois » sans avoir de réponse. Il enregistre un run comme une séquence d’événements — appel de modèle, appel d’outil, résultat d’outil, changement d’état, approbation — et peut rejouer cette séquence contre une nouvelle configuration. Le rejeu ne ré-exécute pas les effets de bord ; il renvoie les résultats d’outils enregistrés et laisse le nouveau modèle choisir son étape suivante, pour que les deux trajectoires puissent être comparées." },
          { type: "p", text: "Les questions qui deviennent bon marché : le nouveau prompt a-t-il changé quels fichiers ont été lus ? La mise à jour du modèle a-t-elle ajouté des appels d’outils, ou en a-t-elle retiré ? Le changement de permission a-t-il bloqué quelque chose dont un run dépendait ? Chacune était une supposition. Un diff de deux journaux d’événements n’en est pas une." },
        ],
      },
      {
        heading: "Commencer avec une tâche et cinq runs enregistrés",
        blocks: [
          { type: "p", text: "Rien de tout cela ne demande une plateforme. Une tâche, trois outils typés, une liste d’autorisation, un fichier de trace et cinq runs enregistrés suffisent pour savoir si une panne vient du contexte, des outils, des permissions ou du modèle — et ce diagnostic est la raison d’être du harnais. Les modèles continueront de changer. Les anneaux autour d’eux sont la partie qu’une équipe possède vraiment." },
        ],
      },
      {"heading": "Le rejeu perd sa comparabilité quand les entrées divergent", "blocks": [{"type": "p", "text": "Un résultat d’outil enregistré ne vaut que pour le nom, les arguments et l’état qui l’ont produit. Si un nouveau modèle demande un autre fichier ou modifie une requête, le rejeu doit signaler l’écart au lieu de renvoyer le résultat suivant du journal. Utilisez des cas enregistrés correspondants pour les comparaisons contrôlées et une exécution isolée pour les nouvelles trajectoires. Pour répéter une écriture réelle, consignez un identifiant d’opération et vérifiez si son effet a déjà eu lieu avant de la relancer."}, {"type": "references", "items": [{"title": "Référence technique · LangGraph — Persistence and replay", "url": "https://docs.langchain.com/oss/python/langgraph/persistence"}]}]},
    ],
  },

  {
    slug: "offlinelingo-designing-for-the-last-mile",
    number: "05",
    topic: "Note projet · OfflineLingo",
    date: "Septembre 2026",
    readTime: "8 min de lecture",
    title: "OfflineLingo : concevoir le dernier kilomètre de la communication",
    subtitle: "Construit en un week-end à l’European Defense Tech Hackathon de Berlin : une application Android qui transforme une phrase parlée en traduction vérifiable, avec la permission réseau retirée du manifeste.",
    dek: "C’est une note de projet plutôt qu’un essai — ce que nous avons construit, les décisions que je défendrais, celles que je reverrais, et la machine à états qui a fini par compter plus que les deux modèles.",
    takeaway: "Dans un outil de terrain, le livrable est une interaction récupérable, pas une traduction. Chaque état où une personne attend a besoin de deux sorties, et l’application ne doit jamais terminer une phrase sans en avoir une.",
    diagram: "project",
    diagramTitle: "L’application vue comme une machine à états",
    diagramCaption: "Sept états, avec les délais et les seuils qui font passer de l’un à l’autre. Les transitions pointillées sont déclenchées par l’incertitude ou l’échec ; les pleines sont le chemin nominal et les actions de la personne.",
    sections: [
      {
        heading: "Le brief",
        blocks: [
          { type: "p", text: "Le scénario qu’on nous a donné : une intervention d’urgence transfrontalière, où un secouriste doit échanger des phrases courtes et à fort enjeu avec quelqu’un qui ne parle pas sa langue, dans un endroit où le réseau peut avoir disparu. Pas dégradé — disparu. Cette seule contrainte a retiré toutes les API de traduction cloud de la conception dès la première heure et a posé le vrai problème : faire tenir reconnaissance vocale et traduction sur un téléphone, et produire un résultat qu’une personne sous stress peut vérifier ou corriger en quelques secondes." },
        ],
      },
      {
        heading: "Ce que nous avons livré",
        blocks: [
          { type: "schema", visual: articleVisuals.translation.fr },
          { type: "list", items: [
            "Une application Android en Kotlin avec une seule commande d’enregistrement en appui maintenu ; relâcher, ou 1,5 seconde de silence, termine la phrase.",
            "whisper.cpp via JNI avec un modèle `base` quantifié pour la reconnaissance sur appareil, en flux PCM 16 kHz depuis le micro.",
            "llama.cpp avec un modèle Qwen 2.5 instruct en 4 bits pour la traduction, gardé chargé dans un service au premier plan entre les phrases.",
            "Une confiance par mot issue des probabilités de tokens de whisper, rendue en soulignements avec alternatives au toucher et réécoute de l’audio environnant.",
            "Un écran de sortie en grands caractères conçu pour être tourné vers l’autre personne, avec la paire de langues visible en permanence.",
            "Aucune permission `INTERNET` dans le manifeste. C’est le système qui fait respecter la promesse, pas le code.",
          ] },
        ],
      },
      {
        heading: "Le prompt est un contrat, lui aussi",
        blocks: [
          { type: "p", text: "Les petits modèles instruct aiment se rendre utiles. Le premier prompt de traduction renvoyait des choses comme « Voici la traduction : … » ou une traduction suivie d’une remarque sur une ambiguïté. Sur un écran en grands caractères tourné vers un inconnu, cet habillage est au mieux du bruit, au pire une source de confusion. La solution a été de traiter la sortie du prompt comme un résultat d’outil : la contraindre, puis la valider." },
          { type: "code", lang: "text", caption: "Le prompt de traduction après trois itérations. Court, et imposé par des stop tokens et une vérification a posteriori.", code: `<|im_start|>system
You translate {src} to {dst} for emergency responders.
Output only the translated sentence. No preamble, no notes, no quotes.
Keep numbers, units and names exactly as given.
<|im_end|>
<|im_start|>user
{sentence}
<|im_end|>
<|im_start|>assistant` },
          { type: "p", text: "La génération s’arrête au premier saut de ligne ou au token de fin de tour. Une vérification compare les chiffres et unités de l’entrée et de la sortie ; si un nombre manque d’un côté, la traduction est affichée avec le nombre souligné exactement comme un mot à faible confiance, parce que du point de vue de l’utilisateur c’est le même problème. La ligne « keep numbers … exactly as given » a aidé, mais c’est la vérification qui a rendu la chose fiable." },
          { type: "figure" },
        ],
      },
      {
        heading: "La machine à états a compté plus que les modèles",
        blocks: [
          { type: "p", text: "Au milieu du deuxième jour, le pipeline fonctionnait et l’application restait inutilisable, parce qu’elle pouvait se bloquer. Un enregistrement sans fin, une transcription qui ne renvoyait rien, une traduction qui prenait onze secondes parce que le téléphone avait bridé son processeur — chacun de ces cas laissait la personne devant un écran sans geste évident à faire." },
          { type: "p", text: "Dessiner l’application comme une machine à états a réglé cela plus vite que n’importe quel changement de modèle. Chaque état où une personne attend a reçu deux sorties : une transition de succès et une transition d’échec bornée (un délai ou un seuil) qui mène quelque part avec une action claire. L’enregistrement s’arrête à 12 secondes quoi qu’il arrive. Une transcription ou une traduction qui dépasse 8 secondes revient au repos avec un message « essayez une phrase plus courte » plutôt qu’un spinner. Un mot-clé à faible confiance route vers la relecture avec le mot marqué, au lieu de l’écran de sortie. Le schéma ci-dessus est la version livrée ; ce qui en fait l’utilité, c’est qu’aucun état ne peut se terminer sans transition sortante." },
        ],
      },
      {
        heading: "Décisions que je défendrais, décisions que je reverrais",
        blocks: [
          { type: "p", text: "À défendre :" },
          { type: "list", items: [
            "Retirer la permission réseau plutôt qu’ajouter un mode hors ligne. Un mode se bascule ; une permission absente, non.",
            "L’enregistrement en appui maintenu. Le toucher pour démarrer/arrêter produisait de longs enregistrements avec du bavardage de fond que whisper transcrivait avec enthousiasme.",
            "Marquer les nombres par conséquence plutôt que par confiance seule ; cela a attrapé plus de vraies erreurs en test que le seuil de probabilité.",
          ] },
          { type: "p", text: "À revoir :" },
          { type: "list", items: [
            "Le modèle whisper `base`. `small` était nettement meilleur sur la parole accentuée, mais la marge mémoire me rendait nerveux. Sur un appareil à 6 Go ou plus, je l’utiliserais.",
            "Une seule direction de traduction par écran. Les secouristes ont besoin des deux sens dans une même conversation ; la commande d’inversion était un toucher de trop.",
            "Un modèle instruct généraliste pour la traduction. Un petit modèle dédié, ou un fine-tune sur des phrases d’urgence, serait probablement à la fois plus rapide et plus littéral.",
          ] },
        ],
      },
      {
        heading: "Ce que je testerais ensuite",
        blocks: [
          { type: "schema", visual: articleVisuals.recovery.fr },
          { type: "p", text: "Le prototype a été testé par nous, dans un hall calme, dans des langues que nous parlons. Le prochain test est celui qui compte : bruit extérieur, un accent que le modèle n’a pas vu, une phrase contenant une dose et une négation, sur un téléphone resté une heure dans une poche, tenu par quelqu’un qui n’a jamais vu l’application. Si la machine à états tient et que les soulignements tombent sur les bons mots dans ces conditions, le projet mérite d’aller plus loin. Sinon, le schéma dit exactement quelle transition corriger." },
        ],
      },
      {"heading": "Transformer le prochain test en protocole", "blocks": [{"type": "p", "text": "Utilisez le même jeu de phrases sur plusieurs appareils et conservez audio original, sens attendu, transcription corrigée et traduction finale. Incluez nombres en lettres, négations, interruptions et silence. Faites évaluer la préservation du sens par des personnes bilingues sans leur montrer la configuration du modèle. Rapportez les erreurs séparément du temps de réalisation et des abandons. Réécouter un mot confirme ce qui a été entendu ; cela ne valide pas la traduction. Il s’agit toujours d’une évaluation de prototype, pas d’une preuve d’aptitude aux situations d’urgence."}, {"type": "references", "items": [{"title": "Référence technique · whisper.cpp — Models and memory requirements", "url": "https://github.com/ggml-org/whisper.cpp"}]}]},
    ],
  },

  {
    slug: "robotics-a-camera-that-knows-where-to-look",
    number: "06",
    topic: "Robotique · Note projet",
    date: "Septembre 2026",
    readTime: "9 min de lecture",
    title: "En robotique, l’autonomie est une chaîne de décisions",
    subtitle: "À l’AMD Open Robotics Hackathon, notre équipe CRC a construit un bras piloté à la voix qui saisit une caméra, cadre une personne ou un objet et le garde dans le plan pendant qu’il bouge. Le détecteur était la partie facile.",
    dek: "Notes sur les coutures : comment une boîte englobante devient une pose, pourquoi la boucle de contrôle tourne à la vitesse du signal honnête le plus lent, et à quoi servait vraiment le pipeline d’entraînement ROCm.",
    takeaway: "Un robot gagne son autonomie aux interfaces entre perception, calibration, planification et vérification. Chacune a besoin d’un contrat et d’un état d’échec, et la boucle doit revérifier le monde avant chaque mouvement.",
    diagram: "robotics",
    diagramTitle: "Une boucle, trois sorties",
    diagramCaption: "La boucle de contrôle tourne à environ 10 Hz avec une observation fraîche à chaque tour. Les sorties pointillées sont des états à part entière : le bras y attend une nouvelle observation valide plutôt que de finir un ancien plan.",
    sections: [
      {
        heading: "Caméra, cible, maintien",
        blocks: [
          { type: "schema", visual: articleVisuals.coordinates.fr },
          { type: "p", text: "Le brief que nous nous sommes donné : un créateur qui filme seul dit « suis-moi » ou « filme la tasse », le bras saisit une petite caméra sur son support, la pointe vers la cible et garde la cible cadrée pendant qu’elle bouge. Le succès se juge instantanément par n’importe quel spectateur — la caméra est-elle tenue, le sujet est-il dans le cadre, le plan est-il stable — ce qui en faisait une bonne tâche de hackathon : aucune métrique à discuter." },
          { type: "p", text: "La pile : un bras compatible LeRobot, une caméra au poignet et une caméra de scène, YOLO pour la détection sur les classes COCO (« person », « cup », « bottle » et compagnie fonctionnent d’emblée), un petit analyseur de commandes vocales, et une politique de saisie entraînée par imitation sur des épisodes enregistrés pendant l’événement. AMD fournissait les GPU ROCm ; le pipeline d’entraînement tournait dessus." },
        ],
      },
      {
        heading: "Une boîte englobante n’est pas une pose",
        blocks: [
          { type: "p", text: "YOLO donne des coordonnées en pixels dans le repère de la caméra de scène. Le bras a besoin d’une cible dans son propre repère d’espace de travail, en mètres, avec une vérification d’atteignabilité. Entre les deux se trouve la calibration, et l’erreur que nous avons failli commettre était de la traiter comme une étape de mise en place faite une fois le premier matin." },
          { type: "p", text: "Nous avons plutôt construit un petit outil de calibration qui calcule la transformation caméra-de-scène → base du bras à partir de quelques points appris et écrit le résultat dans un fichier JSON. Le fichier est chargé au démarrage et sa somme de contrôle journalisée à chaque run. Quand la caméra de scène a été heurtée le deuxième jour — ce qui est arrivé — la correction a consisté à relancer l’outil, pas à retoucher quoi que ce soit en aval." },
          { type: "code", lang: "json", caption: "calibration.json. Ennuyeux à dessein : une transformation, sa provenance, et les limites d’espace de travail qui filtrent chaque pose planifiée.", code: `{
  "scene_cam_to_base": { "R": [[0.998, -0.052, 0.031], [0.051, 0.998, 0.019], [-0.032, -0.017, 0.999]],
                          "t": [0.412, -0.088, 0.297] },
  "calibrated_at": "2025-12-06T10:41:03Z",
  "residual_mm": 4.2,
  "workspace": { "x": [0.12, 0.48], "y": [-0.30, 0.30], "z": [0.02, 0.35] },
  "camera_grasp_pose": { "approach_offset_m": 0.06, "gripper_close": 0.72 }
}` },
          { type: "p", text: "`residual_mm` est le champ que je tiendrais absolument à garder. Le résidu aide à repérer un mauvais ajustement, mais l’erreur acceptable dépend de la tâche, de la géométrie et de vérifications sur des points tenus à l’écart. Les valeurs de l’exemple sont illustratives, pas des seuils généraux d’acceptation." },
          { type: "figure" },
        ],
      },
      {
        heading: "La boucle tourne à la vitesse du signal honnête le plus lent",
        blocks: [
          { type: "p", text: "La boucle de contrôle s’énonce simplement : écouter, résoudre la cible, la projeter dans l’espace de travail, planifier un mouvement borné, exécuter un pas, vérifier que la cible est toujours là où elle devrait être dans le cadre, recommencer. Ce qui l’a fait fonctionner, c’est de refuser qu’une étape prenne de l’avance sur les autres. La détection tournait autour de 10 Hz sur notre matériel ; la boucle tournait à 10 Hz, et un pas de mouvement n’utilisait jamais une estimation de cible plus vieille que le tour précédent." },
          { type: "p", text: "Trois transitions sortent de la boucle, et chacune est un état plutôt qu’une erreur. Aucune détection pendant une seconde : tenir la position, le dire, continuer d’écouter. Cible hors de la boîte d’espace de travail : ne pas planifier, demander à la personne de s’approcher. Cible qui dérive de plus de 15 % du cadre par rapport au centre : replanifier depuis l’observation courante plutôt que continuer le mouvement précédent. La tentation en hackathon est de faire bouger le bras parce qu’un bras qui bouge impressionne. Un bras en pause qui explique pourquoi est plus sûr et, en démo, plus convaincant." },
        ],
      },
      {
        heading: "À quoi servait le pipeline ROCm",
        blocks: [
          { type: "schema", visual: articleVisuals.robotLearning.fr },
          { type: "p", text: "La saisie elle-même — approcher la caméra sur son support, fermer la pince, la lever en position de transport — était apprise plutôt que scriptée, à partir de quelques dizaines d’épisodes téléopérés enregistrés au format de jeu de données LeRobot. Le pipeline d’entraînement sur ROCm gérait la boucle enregistrer, entraîner, évaluer sur des épisodes tenus à l’écart, publier. Nous avons publié le jeu de données et les artefacts de modèle pour que le résultat soit reproductible par quelqu’un avec le même bras." },
          { type: "p", text: "L’intérêt d’un pipeline sur un événement de deux jours n’est pas l’échelle ; c’est que lorsque la calibration a changé ou qu’un épisode s’est révélé mauvais, réentraîner était une commande plutôt qu’une session de notebook. La reproductibilité nous a acheté le deuxième jour." },
        ],
      },
      {
        heading: "Ce qui a cassé, concrètement",
        blocks: [
          { type: "list", items: [
            "« Filme la tasse » avec deux tasses en vue. L’analyseur choisissait la classe ; rien ne choisissait l’instance. Nous avons ajouté une règle « la plus proche » et ajouterions le pointage la prochaine fois.",
            "La caméra au poignet était occultée par la pince sur les 3 derniers centimètres de l’approche. La politique de saisie l’avait appris ; l’étape de vérification non, et elle signalait brièvement une cible perdue à chaque saisie.",
            "Dérive du cadrage après une saisie réussie : le poids de la caméra décalait l’estimation du poignet de quelques degrés. Corrigé par une recalibration de la pose de transport après la saisie, pas avant.",
            "Une commande vocale pendant un mouvement. Nous n’avions pas de règle ; le bras a fini son pas puis a obéi. C’était le bon comportement par chance, et ça aurait dû l’être par conception.",
          ] },
          { type: "p", text: "Aucun de ces problèmes n’était une défaillance de modèle. Tous étaient sur des coutures — entre une classe et une instance, entre une politique et un vérificateur, entre une pose avant et après charge. C’est là que la prochaine itération passerait son temps." },
        ],
      },
      {"heading": "Séparer le rythme de perception du contrôle moteur", "blocks": [{"type": "p", "text": "La boucle à environ 10 Hz décrite ici concerne la perception et la planification de tâche. Elle ne doit pas déterminer la fréquence du contrôleur moteur ou de ses vérifications de sécurité. Une boîte englobante 2D ne donne pas non plus de profondeur métrique : la projection dans le repère du bras exige une profondeur, une géométrie connue ou une hypothèse de plan explicite, en plus de la calibration. Évaluez séparément réussite de saisie, erreur de suivi et réaction à la perte de cible. Un résidu de calibration décrit un ajustement ; il ne borne pas à lui seul le risque de collision ni l’erreur de l’effecteur."}, {"type": "references", "items": [{"title": "Référence technique · OpenCV — Camera calibration and 3D reconstruction", "url": "https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html"}]}]},
    ],
  },

  {
    slug: "brain-computer-interfaces-time-series-models",
    number: "07",
    topic: "Neurotechnologies · Séries temporelles",
    date: "Septembre 2026",
    readTime: "12 min de lecture",
    title: "Les interfaces cerveau–machine sont d’abord des systèmes de séries temporelles",
    subtitle: "Une électrode EEG voit quelques microvolts d’activité corticale sommée à travers le crâne et la peau. En faire une commande fiable est un problème de traitement du signal et d’évaluation bien avant d’être un problème de modèle.",
    dek: "Je suis arrivé aux ICM par les séries temporelles plutôt que par les neurosciences, et les modes de défaillance m’ont semblé familiers : découpages qui fuient, prétraitement qui efface le signal qu’il devait révéler, et scores qui ne survivent pas à la session suivante.",
    takeaway: "Protégez le contexte du signal, découpez par session et par participant, et faites de l’abstention une sortie à part entière. Un décodeur plus fort ne peut pas récupérer ce que le pipeline a jeté.",
    diagram: "bci",
    diagramTitle: "Fenêtres, marqueurs, et un découpage qui respecte le temps",
    diagramCaption: "En haut : un canal filtré avec un marqueur de cue et des fenêtres de 2 secondes qui se chevauchent. En bas : deux façons de découper les mêmes enregistrements. Seule la seconde mesure ce qu’une personne vivra vendredi prochain.",
    sections: [
      {
        heading: "Ce que l’électrode voit réellement",
        blocks: [
          { type: "p", text: "Un canal EEG de scalp en C3 enregistre une tension de l’ordre de 10 à 100 µV : l’activité sommée d’une large population de neurones sous l’électrode, atténuée par l’os et les tissus, plus la signature électrique de chaque muscle à proximité. Un clignement fait environ 100 µV. Le secteur ajoute une raie à 50 Hz (60 Hz en Amérique du Nord) souvent plus grande que le signal cérébral. Le motif utile pour une tâche d’imagerie motrice — une baisse de puissance mu (8–13 Hz) et bêta (13–30 Hz) sur le cortex moteur quand une personne imagine bouger une main — est un petit changement par-dessus tout cela." },
          { type: "p", text: "C’est la réalité d’ingénierie derrière l’expression « interface cerveau–machine » : une série temporelle non stationnaire à faible rapport signal/bruit, avec des événements à instants connus, et une question bien plus étroite que « lire les pensées ». Une fenêtre de 2 secondes après un cue peut-elle être classée main gauche contre main droite assez bien pour déplacer un curseur ? Posé ainsi, le problème est reconnaissable pour quiconque a travaillé avec des données de capteurs." },
        ],
      },
      {
        heading: "Les fenêtres sont une décision de modélisation",
        blocks: [
          { type: "p", text: "Un enregistrement n’est pas une table de lignes indépendantes. Son sens dépend de la fréquence d’échantillonnage (250 Hz est courant pour les casques grand public et de recherche), de l’identité des canaux et du montage, de la référence utilisée, des marqueurs d’événements et du prétraitement exact appliqué. Une entrée de modèle est une fenêtre découpée dans ce flux, et la découpe est un choix qui a des conséquences." },
          { type: "p", text: "En imagerie motrice, une fenêtre de 2 secondes démarrant 0,5 s après le cue est un défaut courant ; la réponse met quelques centaines de millisecondes à se développer et s’estompe après quelques secondes. Un pas de 0,5 seconde donne de la réactivité à l’interface. Il signifie aussi que chaque échantillon appartient à quatre fenêtres, et c’est là que les évaluations déraillent : si les fenêtres sont mélangées puis découpées, le jeu de test contient des quasi-copies du jeu d’entraînement, et le score mesure de la mémoire, pas du décodage." },
          { type: "figure" },
          { type: "p", text: "La règle est la même que pour toute série temporelle : découper par l’unité qui sera nouvelle au moment de l’inférence. Pour une ICM c’est la session, et au-delà le participant. Une session du vendredi tenue à l’écart contient l’électrode qui a légèrement bougé et la fatigue de fin de semaine. Un découpage mélangé ne contient ni l’un ni l’autre, et rapporte un chiffre que personne ne verra en pratique." },
        ],
      },
      {
        heading: "Le prétraitement que vous n’avez pas journalisé est celui qui vous a trompé",
        blocks: [
          { type: "schema", visual: articleVisuals.eegPipeline.fr },
          { type: "p", text: "Avant qu’un décodeur ne voie une feature, le signal est typiquement filtré en coupe-bande à la fréquence du secteur, filtré passe-bande sur la plage d’intérêt, re-référencé (la moyenne commune est un choix fréquent), et contrôlé pour les mauvais canaux et les artefacts. Chaque étape a des paramètres, et chaque paramètre peut discrètement aider ou nuire. Un passe-bande qui commence à 8 Hz convient pour mu mais jette les potentiels lents dont dépend un autre paradigme. Un rejet d’artefacts agressif peut retirer exactement les essais où le participant se concentrait le plus." },
          { type: "code", lang: "python", caption: "Un pipeline dont les réglages sont des données. Le dictionnaire est sauvegardé à côté de chaque fichier dérivé ; le fichier brut n’est jamais modifié.", code: `PREPROC = {
    "version": "2026.09.1",
    "notch_hz": 50.0,
    "bandpass_hz": (8.0, 30.0),
    "reference": "average",
    "epoch_s": (0.5, 2.5),          # relatif au cue
    "reject_uv": 150.0,             # crête à crête, après filtrage
}

raw = mne.io.read_raw_fif(path, preload=True)          # source immuable
raw.notch_filter(PREPROC["notch_hz"]).filter(*PREPROC["bandpass_hz"])
raw.set_eeg_reference(PREPROC["reference"])
epochs = mne.Epochs(raw, events, tmin=PREPROC["epoch_s"][0], tmax=PREPROC["epoch_s"][1],
                    baseline=None, reject=dict(eeg=PREPROC["reject_uv"] * 1e-6), preload=True)
epochs.info["description"] = json.dumps(PREPROC)` },
          { type: "p", text: "L’habitude qui compte, c’est que les réglages voyagent avec les données. Quand un résultat change entre deux runs, la première question est de savoir si le prétraitement a changé, et cette question doit pouvoir être tranchée en comparant deux petits dictionnaires plutôt qu’en relisant l’historique d’un notebook." },
        ],
      },
      {
        heading: "Mériter le modèle profond",
        blocks: [
          { type: "p", text: "Une référence utile en imagerie motrice a des décennies : des common spatial patterns pour trouver les combinaisons de canaux qui séparent les deux classes, la log-variance du signal filtré comme features, et un classifieur linéaire discriminant. Elle s’entraîne en secondes sur quelques dizaines d’essais, est interprétable (les filtres spatiaux doivent ressembler au cortex moteur), et difficile à battre sur de petits jeux de données par participant." },
          { type: "table", head: ["Approche", "Données nécessaires", "Force", "Échec à surveiller"], rows: [
            ["Puissance par bande / CSP + LDA", "Dizaines d’essais par classe", "Rapide, interprétable, robuste si calibré par session", "Se dégrade quand les électrodes bougent ; demande une recalibration"],
            ["Riemannien (covariance + espace tangent)", "Similaire", "Moins sensible à l’échelle et aux petits décalages", "Plus difficile à expliquer à un clinicien"],
            ["CNN compact (type EEGNet)", "Centaines d’essais ou transfert", "Apprend conjointement filtres spatiaux et spectraux ; transfert inter-sujets", "Sur-apprend glorieusement sur un découpage qui fuit"],
            ["Modèles séquentiels / attention", "Milliers d’essais", "Dépendances longues, multi-paradigme", "Rarement justifié par les données disponibles par personne"],
          ] },
          { type: "p", text: "La comparaison qui doit trancher n’est pas la précision agrégée sur un benchmark. C’est la précision par participant sur une session tenue à l’écart, le temps de calibration avant que l’interface soit utilisable, la latence par décision, et le coût d’une mauvaise commande. Un modèle profond qui gagne trois points sur un benchmark groupé et perd par participant n’a pas gagné." },
        ],
      },
      {
        heading: "L’abstention est une classe",
        blocks: [
          { type: "schema", visual: articleVisuals.abstain.fr },
          { type: "p", text: "Un décodeur obligé de sortir gauche ou droite à chaque fenêtre sortira n’importe quoi pendant les fenêtres où la personne a éternué, détourné le regard ou simplement n’a pas essayé. La conception la plus sûre traite « pas de décision » comme une sortie avec ses propres règles : un postérieur sous un seuil, un désaccord entre les trois dernières fenêtres chevauchantes, ou un drapeau de qualité de signal sur les canaux concernés mènent tous à l’abstention. Un curseur d’assistance peut se permettre un seuil bas et des mouvements réversibles ; tout ce qui déclenche une action conséquente devrait exiger un accord entre fenêtres et une confirmation explicite." },
          { type: "p", text: "L’abstention donne aussi à l’interface quelque chose d’honnête à montrer. Un indicateur de qualité et une commande « recalibrer » ne sont pas des aveux de faiblesse ; ce sont les parties du système sur lesquelles la personne peut agir." },
        ],
      },
      {
        heading: "La session trois est le benchmark",
        blocks: [
          { type: "p", text: "Le résultat qui compte en ICM n’est pas un score élevé au sein d’un enregistrement contrôlé. C’est un système encore utile quand la personne revient un autre jour, avec le casque posé un peu différemment, plus fatiguée, dans une pièce plus bruyante. Rapportez séparément les résultats par session tenue à l’écart et par participant tenu à l’écart, montrez l’équilibre des classes, inspectez la matrice de confusion par personne, et gardez les enregistrements bruts immuables pour que l’évaluation puisse être relancée quand le pipeline change." },
          { type: "p", text: "Tout ce qui est en amont du modèle — acquisition, contexte, fenêtres, découpages, abstention — décide si le chiffre à la fin veut dire quelque chose. Le modèle est la dernière chose à améliorer, pas la première." },
        ],
      },
      {"heading": "Un pipeline hors ligne n’est pas un décodeur en direct", "blocks": [{"type": "p", "text": "L’extrait illustre la construction d’époques hors ligne : marquez explicitement les mauvais canaux avant le changement de référence et conservez l’enregistrement original sur disque. Pour des époques commençant à 0,5 seconde, utilisez baseline=None sauf si vous incluez volontairement un intervalle de référence. Un filtre à phase nulle peut utiliser des échantillons futurs : toute évaluation en direct exige un traitement causal ou avec tampon dont le délai est mesuré. Ajustez CSP, normalisation et autres transformations apprises dans chaque pli d’entraînement. L’accord entre fenêtres chevauchantes apporte des preuves corrélées, pas trois confirmations indépendantes."}, {"type": "references", "items": [{"title": "Référence technique · MNE — Epochs and baseline correction", "url": "https://mne.tools/stable/generated/mne.Epochs.html"}]}]},
    ],
  },
]
