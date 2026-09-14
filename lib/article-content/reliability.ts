import type { Article } from "@/lib/articles"

export const reliabilityEn: Article = {
  "slug": "retries-without-duplicate-actions",
  "number": "09",
  "topic": "Architecture · Reliability",
  "date": "September 2026",
  "readTime": "5 min read",
  "diagram": "harness",
  "diagramTitle": "One intent, several attempts",
  "diagramCaption": "Conceptual request lifecycle.",
  "title": "Retrying is easy. Avoiding duplicate actions is harder.",
  "subtitle": "A timeout tells you that the reply did not arrive. It does not tell you whether the action happened. That distinction should shape every workflow that writes to an external service.",
  "dek": "Consider a workflow that creates a support ticket. The service saves the ticket, but the connection drops before the caller receives its identifier. This design note follows that illustrative failure through recovery, concurrency and testing.",
  "takeaway": "Give each intended action a durable identity. Reuse it across attempts, bound retries, and reconcile uncertain outcomes before creating a new action.",
  "sections": [
    {
      "heading": "The missing reply is an unknown outcome",
      "blocks": [
        {
          "type": "p",
          "text": "The tempting recovery is to run the same create call again. If the first request already committed, that produces a second ticket. If it never arrived, a retry may be exactly what is needed. The caller sees the same timeout in both cases."
        },
        {
          "type": "schema",
          "visual": {
            "layout": "compare",
            "title": "Two histories, one timeout",
            "caption": "A transport failure does not identify which history occurred.",
            "nodes": [
              {
                "title": "Never committed",
                "summary": "Request lost → no ticket",
                "detail": "The request never reached a successful commit. A new attempt may complete the original intent."
              },
              {
                "title": "Committed, reply lost",
                "summary": "Ticket exists → caller uncertain",
                "detail": "The service created the ticket. Repeating an unprotected create operation can add another one."
              }
            ]
          }
        },
        {
          "type": "p",
          "text": "Keep “unknown” distinct from “failed” in the interface and stored state. A useful message is “Checking whether the ticket was created”, accompanied by an operation reference. A success message without a confirmed result would conceal the very uncertainty the recovery process must resolve."
        }
      ]
    },
    {
      "heading": "Name the intent before making the request",
      "blocks": [
        {
          "type": "p",
          "text": "For this proposed design, create an operation record before dispatch. It contains a caller scope, operation key, request fingerprint and state. A second attempt for the same intent reuses that record. A person deliberately creating another ticket gets a new key, even when the text is identical."
        },
        {
          "type": "schema",
          "visual": {
            "layout": "flow",
            "title": "One operation survives multiple attempts",
            "caption": "Proposed lifecycle. The remote service’s contract determines the actual duplicate protection.",
            "nodes": [
              {
                "title": "Persist intent",
                "summary": "operation key + payload",
                "detail": "Save the identity before sending. Recovery after a process restart must find the same key."
              },
              {
                "title": "Dispatch",
                "summary": "reuse the operation key",
                "detail": "Pass the key through the service’s supported idempotency mechanism. A local identifier alone cannot protect a remote write."
              },
              {
                "title": "Resolve",
                "summary": "result or reconciliation",
                "detail": "Store the returned ticket ID, or keep the operation unresolved until the service can establish its outcome."
              }
            ]
          }
        },
        {
          "type": "p",
          "text": "Idempotency makes repeated attempts represent the same operation within a defined contract. AWS describes client request identifiers for this purpose; Stripe documents a concrete API implementation. Check the service’s scope, retention and parameter-matching rules before relying on its guarantee."
        },
        {
          "type": "references",
          "items": [
            {
              "title": "AWS Builders’ Library — Making retries safe with idempotent APIs",
              "url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/"
            },
            {
              "title": "Stripe — Idempotent requests",
              "url": "https://docs.stripe.com/api/idempotent_requests"
            }
          ]
        }
      ]
    },
    {
      "heading": "Design the collision and crash paths",
      "blocks": [
        {
          "type": "p",
          "text": "In a service you own, enforce uniqueness on the caller scope and operation key. Compare the stored request fingerprint before replaying a result. The same key with different parameters is a conflict to surface, not permission to overwrite the original intent."
        },
        {
          "type": "p",
          "text": "Two workers can receive the same operation at once. Reserve ownership atomically and define how an in-progress response behaves. Saving “complete” after the write leaves a crash window; saving it before the write can claim a result that does not exist. When both records live in one database, a transaction can tie the business write to its operation result."
        },
        {
          "type": "p",
          "text": "A local database transaction cannot atomically commit an unrelated external API call. If the remote system offers neither idempotency nor a reliable lookup by operation reference, automatic recovery cannot promise duplicate prevention. Keep the operation unresolved and route it to reconciliation. Reconciliation must establish what happened, not merely wait and assume failure."
        }
      ]
    },
    {
      "heading": "Spend a retry budget deliberately",
      "blocks": [
        {
          "type": "p",
          "text": "Retry only failures the service contract considers recoverable. Use bounded backoff with jitter so clients do not all retry together. AWS’s guidance explains why retries can increase load on an already struggling dependency."
        },
        {
          "type": "references",
          "items": [
            {
              "title": "AWS — Retry with backoff pattern",
              "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html"
            },
            {
              "title": "AWS Architecture Blog — Exponential Backoff And Jitter",
              "url": "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/"
            }
          ]
        },
        {
          "type": "p",
          "text": "Choose one layer to own the retry budget. If three layers each allow three total attempts, a single top-level request can cause up to 27 downstream attempts. Count SDK retries as well as application retries. Set an overall deadline that includes waiting and execution; do not start another attempt after the remaining time is insufficient."
        },
        {
          "type": "table",
          "head": [
            "Observed state",
            "Next action",
            "Keep visible"
          ],
          "rows": [
            [
              "Confirmed success",
              "Return the saved result",
              "Original resource ID"
            ],
            [
              "Recoverable rejection",
              "Retry within the contract and budget",
              "Attempt count and next check"
            ],
            [
              "Invalid request",
              "Correct the input",
              "Specific validation error"
            ],
            [
              "Timeout after dispatch",
              "Reconcile or retry with duplicate protection",
              "Unknown outcome"
            ],
            [
              "Protection window expired",
              "Establish the original outcome first",
              "Manual review if unresolved"
            ]
          ]
        }
      ]
    },
    {
      "heading": "Test the response you never received",
      "blocks": [
        {
          "type": "p",
          "text": "A useful fault-injection test commits the ticket and then drops the response. Restart the worker and replay the operation with its original key. The assertion is one business resource and a consistent recovered identifier, not merely a successful HTTP response."
        },
        {
          "type": "list",
          "items": [
            "Send the same key concurrently from two workers; verify one intended effect.",
            "Reuse a key with a changed payload; expect a conflict.",
            "Crash before dispatch and after remote commit; check both recovery paths.",
            "Exhaust the deadline; verify that no new attempt starts afterward.",
            "Simulate expired duplicate protection; verify reconciliation rather than a blind create."
          ]
        },
        {
          "type": "p",
          "text": "Track unresolved operation age, duplicate effects and attempts per completed intent. A high eventual-success rate can hide a growing queue of uncertain writes. The recovery path is complete only when the system can explain which action happened and connect it to the original request."
        }
      ]
    }
  ]
}

export const reliabilityFr: Article = {
  "slug": "retries-without-duplicate-actions",
  "number": "09",
  "topic": "Architecture · Fiabilité",
  "date": "Septembre 2026",
  "readTime": "5 min de lecture",
  "diagram": "harness",
  "diagramTitle": "Une intention, plusieurs tentatives",
  "diagramCaption": "Cycle de vie conceptuel d’une requête.",
  "title": "Réessayer est simple. Éviter les actions en double l’est moins.",
  "subtitle": "Un délai dépassé signifie que la réponse n’est pas arrivée. Il ne dit pas si l’action a eu lieu. Cette distinction doit guider tout workflow qui écrit dans un service externe.",
  "dek": "Imaginons un workflow de création de ticket. Le service enregistre le ticket, puis la connexion tombe avant de renvoyer son identifiant. Cette note de conception suit cet échec illustratif à travers la reprise, la concurrence et les tests.",
  "takeaway": "Donnez une identité durable à chaque action voulue. Réutilisez-la entre tentatives, bornez les reprises et vérifiez les résultats incertains avant de créer une nouvelle action.",
  "sections": [
    {
      "heading": "La réponse absente laisse le résultat inconnu",
      "blocks": [
        {
          "type": "p",
          "text": "La reprise tentante consiste à relancer la création. Si la première requête a déjà été validée, un second ticket apparaît. Si elle n’est jamais arrivée, réessayer peut être nécessaire. Dans les deux cas, l’appelant observe le même dépassement de délai."
        },
        {
          "type": "schema",
          "visual": {
            "layout": "compare",
            "title": "Deux histoires, un même délai dépassé",
            "caption": "Une erreur de transport ne permet pas de distinguer ces deux histoires.",
            "nodes": [
              {
                "title": "Aucune création",
                "summary": "Requête perdue → aucun ticket",
                "detail": "La requête n’a pas atteint une validation réussie. Une nouvelle tentative peut accomplir l’intention initiale."
              },
              {
                "title": "Création effectuée",
                "summary": "Ticket présent → réponse perdue",
                "detail": "Le service a créé le ticket. Répéter une création non protégée peut en ajouter un autre."
              }
            ]
          }
        },
        {
          "type": "p",
          "text": "Distinguez « inconnu » de « échoué » dans l’interface et dans l’état enregistré. Un message utile serait « Vérification de la création du ticket », avec une référence d’opération. Afficher un succès sans résultat confirmé masquerait précisément l’incertitude à résoudre."
        }
      ]
    },
    {
      "heading": "Nommer l’intention avant d’envoyer la requête",
      "blocks": [
        {
          "type": "p",
          "text": "Dans cette conception proposée, créez un enregistrement d’opération avant l’envoi : périmètre de l’appelant, clé, empreinte des paramètres et état. Une reprise de la même intention réutilise cet enregistrement. Une personne créant volontairement un autre ticket reçoit une nouvelle clé, même si son texte est identique."
        },
        {
          "type": "schema",
          "visual": {
            "layout": "flow",
            "title": "Une opération, plusieurs tentatives",
            "caption": "Cycle proposé. Le contrat du service distant définit la protection réelle contre les doublons.",
            "nodes": [
              {
                "title": "Enregistrer",
                "summary": "clé + paramètres",
                "detail": "Sauvegardez l’identité avant l’envoi. Une reprise après redémarrage doit retrouver la même clé."
              },
              {
                "title": "Envoyer",
                "summary": "réutiliser la clé",
                "detail": "Transmettez la clé au mécanisme d’idempotence du service. Un identifiant local ne protège pas à lui seul une écriture distante."
              },
              {
                "title": "Résoudre",
                "summary": "résultat ou vérification",
                "detail": "Enregistrez l’identifiant du ticket reçu, ou gardez l’opération indéterminée jusqu’à pouvoir établir son résultat."
              }
            ]
          }
        },
        {
          "type": "p",
          "text": "L’idempotence fait correspondre plusieurs tentatives à une même opération dans un contrat défini. AWS décrit les identifiants de requête client ; Stripe documente une implémentation concrète. Vérifiez le périmètre, la durée de conservation et les règles de correspondance des paramètres."
        },
        {
          "type": "references",
          "items": [
            {
              "title": "AWS Builders’ Library — Making retries safe with idempotent APIs",
              "url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/"
            },
            {
              "title": "Stripe — Idempotent requests",
              "url": "https://docs.stripe.com/api/idempotent_requests"
            }
          ]
        }
      ]
    },
    {
      "heading": "Prévoir les collisions et les interruptions",
      "blocks": [
        {
          "type": "p",
          "text": "Dans votre propre service, imposez l’unicité du couple périmètre et clé d’opération. Comparez l’empreinte enregistrée avant de restituer un résultat. Une même clé avec des paramètres différents constitue un conflit à signaler, pas une autorisation de remplacer l’intention initiale."
        },
        {
          "type": "p",
          "text": "Deux workers peuvent recevoir la même opération simultanément. Réservez son traitement de façon atomique et définissez la réponse pendant l’exécution. Enregistrer « terminé » après l’écriture laisse une fenêtre de crash ; le faire avant peut annoncer un résultat inexistant. Si les deux enregistrements partagent une base, une transaction peut lier l’écriture métier au résultat de l’opération."
        },
        {
          "type": "p",
          "text": "Une transaction locale ne peut pas valider atomiquement un appel vers une API externe indépendante. Si celle-ci ne propose ni idempotence ni recherche fiable par référence d’opération, la reprise automatique ne peut pas promettre l’absence de doublons. Gardez le résultat indéterminé et déclenchez une vérification. Attendre ne suffit pas à prouver un échec."
        }
      ]
    },
    {
      "heading": "Dépenser un budget de reprise explicite",
      "blocks": [
        {
          "type": "p",
          "text": "Ne réessayez que les échecs considérés comme récupérables par le contrat du service. Un délai croissant, borné et aléatoire évite des reprises simultanées. Les recommandations AWS expliquent pourquoi les reprises peuvent surcharger une dépendance déjà en difficulté."
        },
        {
          "type": "references",
          "items": [
            {
              "title": "AWS — Retry with backoff pattern",
              "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html"
            },
            {
              "title": "AWS Architecture Blog — Exponential Backoff And Jitter",
              "url": "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/"
            }
          ]
        },
        {
          "type": "p",
          "text": "Confiez le budget de reprise à une seule couche. Si trois couches autorisent chacune trois tentatives au total, une requête initiale peut déclencher jusqu’à 27 tentatives en aval. Comptez les reprises du SDK et de l’application. Fixez une échéance globale incluant attente et exécution ; ne démarrez pas une tentative sans temps restant suffisant."
        },
        {
          "type": "table",
          "head": [
            "État observé",
            "Action suivante",
            "Information visible"
          ],
          "rows": [
            [
              "Succès confirmé",
              "Restituer le résultat conservé",
              "Identifiant original"
            ],
            [
              "Rejet récupérable",
              "Réessayer dans le budget prévu",
              "Tentatives et prochaine vérification"
            ],
            [
              "Requête invalide",
              "Corriger les paramètres",
              "Erreur précise"
            ],
            [
              "Délai dépassé après envoi",
              "Vérifier ou réessayer avec protection",
              "Résultat inconnu"
            ],
            [
              "Protection expirée",
              "Établir le résultat initial",
              "Revue manuelle si nécessaire"
            ]
          ]
        }
      ]
    },
    {
      "heading": "Tester la réponse jamais reçue",
      "blocks": [
        {
          "type": "p",
          "text": "Un test utile valide la création puis supprime la réponse. Redémarrez le worker et rejouez l’opération avec sa clé initiale. Vérifiez une seule ressource métier et un identifiant récupéré cohérent, pas seulement un statut HTTP réussi."
        },
        {
          "type": "list",
          "items": [
            "Envoyer la même clé depuis deux workers simultanés ; vérifier un seul effet voulu.",
            "Réutiliser une clé avec des paramètres modifiés ; attendre un conflit.",
            "Interrompre avant l’envoi puis après la validation distante ; vérifier les deux reprises.",
            "Épuiser le délai global ; vérifier qu’aucune tentative ne démarre ensuite.",
            "Simuler une protection expirée ; vérifier le contrôle du résultat avant toute nouvelle création."
          ]
        },
        {
          "type": "p",
          "text": "Suivez l’âge des opérations indéterminées, les effets en double et les tentatives par intention accomplie. Un bon taux de succès final peut masquer une file croissante d’écritures incertaines. La reprise est complète lorsque le système explique quelle action a eu lieu et la relie à la demande initiale."
        }
      ]
    }
  ]
}

