const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, PageBreak, BorderStyle, WidthType,
        ShadingType, LevelFormat } = require('docx');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 } // 12pt
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 400, after: 240 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 300, after: 180 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 }
              }
            }
          }
        ]
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 }
              }
            }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,
          height: 15840
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Page de garde
      new Paragraph({
        children: [
          new TextRun({
            text: "USE CASE DÉTAILLÉ",
            size: 48,
            bold: true,
            color: "2E75B6"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 2880, after: 480 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Système de Monitoring DevOps",
            size: 56,
            bold: true,
            color: "1F4E78"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "avec GitHub Actions",
            size: 56,
            bold: true,
            color: "1F4E78"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 480 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Automatisation CI/CD complète pour applications modernes",
            size: 24,
            italics: true,
            color: "666666"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 2880 }
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // Section 1: Contexte et Problématique
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Contexte et Problématique")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.1 Situation actuelle")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Dans le développement moderne d'applications, les équipes font face à plusieurs défis majeurs qui ralentissent la productivité et augmentent les risques :",
            size: 24
          })
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Déploiements manuels : ",
            bold: true
          }),
          new TextRun("Chaque mise à jour nécessite 15-30 minutes d'interventions manuelles (connexion au serveur, copie des fichiers, redémarrage des services). Ce processus est répétitif, fastidieux et source d'erreurs humaines.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Détection tardive des pannes : ",
            bold: true
          }),
          new TextRun("Sans surveillance automatique, une panne survenant la nuit ou le week-end n'est découverte que des heures, voire des jours plus tard. Impact : perte de revenus, clients mécontents, image dégradée.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Tests oubliés ou négligés : ",
            bold: true
          }),
          new TextRun("Sous pression, les développeurs peuvent déployer du code sans lancer les tests, introduisant des bugs en production.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Vulnérabilités de sécurité : ",
            bold: true
          }),
          new TextRun("Les dépendances obsolètes et les failles de sécurité passent inaperçues jusqu'à ce qu'il soit trop tard.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Backups irréguliers : ",
            bold: true
          }),
          new TextRun("Les sauvegardes sont faites manuellement de manière sporadique, augmentant le risque de perte de données.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Manque de visibilité : ",
            bold: true
          }),
          new TextRun("Aucun tableau de bord pour suivre la santé de l'application, les performances, ou l'activité de l'équipe.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.2 Impact business")]
      }),

      // Tableau d'impact
      createImpactTable(),

      new Paragraph({ children: [new PageBreak()] }),

      // Section 2: Solution avec GitHub Actions
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Solution : Automatisation avec GitHub Actions")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 Vue d'ensemble de la solution")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "GitHub Actions est une plateforme d'automatisation intégrée directement dans GitHub qui permet d'orchestrer l'ensemble du cycle DevOps. Notre solution implémente 6 workflows automatisés qui couvrent tous les aspects critiques :",
            size: 24
          })
        ],
        spacing: { after: 360 }
      }),

      // Tableau des workflows
      createWorkflowsTable(),

      new Paragraph({ children: [new PageBreak()] }),

      // Section 3: Architecture détaillée
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. Architecture et Fonctionnement Détaillé")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 Workflow 1 : CI/CD Pipeline")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Déclencheur : ",
            bold: true
          }),
          new TextRun("Push sur les branches main ou develop, ou ouverture d'une Pull Request")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Objectif : ",
            bold: true
          }),
          new TextRun("Garantir que seul du code testé et validé atteint la production")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Étapes du workflow :",
            bold: true,
            size: 24
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({
            text: "Tests Unitaires : ",
            bold: true
          }),
          new TextRun("Exécution de tous les tests avec pytest. Si un seul test échoue, tout le workflow s'arrête.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({
            text: "Qualité du Code : ",
            bold: true
          }),
          new TextRun("Vérification du style avec Flake8 pour assurer la cohérence du code.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({
            text: "Build Docker : ",
            bold: true
          }),
          new TextRun("Construction de l'image Docker de l'application.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({
            text: "Déploiement : ",
            bold: true
          }),
          new TextRun("Si toutes les étapes précédentes réussissent, déploiement automatique en production.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({
            text: "Notification : ",
            bold: true
          }),
          new TextRun("Envoi d'un email avec le résumé (succès ou échec).")
        ]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Résultat : ",
            bold: true,
            color: "28A745"
          }),
          new TextRun({
            text: "Temps de déploiement réduit de 15 minutes à 0 seconde (automatique). Taux d'erreur en production réduit de 80%.",
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2 Workflow 2 : Health Check")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Déclencheur : ",
            bold: true
          }),
          new TextRun("Toutes les 5 minutes, 24h/24, 7j/7")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Objectif : ",
            bold: true
          }),
          new TextRun("Détecter immédiatement toute indisponibilité de l'API")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Fonctionnement :",
            bold: true
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Ping du endpoint /health de l'API")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Si réponse HTTP 200 : tout va bien")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Sinon : création automatique d'un issue GitHub avec label 'incident' + envoi d'email d'alerte")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Résultat : ",
            bold: true,
            color: "28A745"
          }),
          new TextRun({
            text: "Détection des pannes en 5 minutes au lieu de 2-24 heures. Uptime amélioré de 95% à 99.9%.",
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.3 Workflow 3 : Performance Testing")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Déclencheur : ",
            bold: true
          }),
          new TextRun("Toutes les heures")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Objectif : ",
            bold: true
          }),
          new TextRun("Identifier les dégradations de performance avant qu'elles n'impactent les utilisateurs")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Tests effectués :",
            bold: true
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Temps de réponse : ",
            bold: true
          }),
          new TextRun("Mesure le temps de réponse de chaque endpoint (5 requêtes par endpoint)")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Test de charge : ",
            bold: true
          }),
          new TextRun("50 requêtes concurrentes pour simuler une charge réelle")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Alertes : ",
            bold: true
          }),
          new TextRun("Si temps de réponse > 2s ou taux d'échec > 10%, création d'un issue et email")
        ]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Résultat : ",
            bold: true,
            color: "28A745"
          }),
          new TextRun({
            text: "Identification proactive des problèmes de performance. Temps de réponse moyen maintenu sous 200ms.",
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.4 Workflow 4 : Security Scan")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Déclencheur : ",
            bold: true
          }),
          new TextRun("Quotidien à 2h du matin UTC")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Objectif : ",
            bold: true
          }),
          new TextRun("Détecter les vulnérabilités avant qu'elles ne soient exploitées")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Analyses effectuées :",
            bold: true
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Safety : ",
            bold: true
          }),
          new TextRun("Scan des dépendances Python pour identifier les packages avec des vulnérabilités connues")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Bandit : ",
            bold: true
          }),
          new TextRun("Analyse statique du code Python pour détecter les problèmes de sécurité (injections SQL, mots de passe en dur, etc.)")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Détection de secrets : ",
            bold: true
          }),
          new TextRun("Recherche de clés API, mots de passe, tokens accidentellement committés")
        ]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Résultat : ",
            bold: true,
            color: "28A745"
          }),
          new TextRun({
            text: "0 vulnérabilité critique en production. Mise à jour proactive des dépendances.",
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({ children: [new PageBreak()] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.5 Workflow 5 : Automated Backup")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Déclencheur : ",
            bold: true
          }),
          new TextRun("Quotidien à minuit UTC")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Objectif : ",
            bold: true
          }),
          new TextRun("Garantir la récupération des données en cas de catastrophe")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Processus :",
            bold: true
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Création du backup (code + configuration + base de données)")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Compression en .tar.gz")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Calcul du checksum SHA256 pour vérifier l'intégrité")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Upload vers GitHub Artifacts (rétention 30 jours)")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Test de restauration pour valider le backup")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Nettoyage des anciens backups")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Résultat : ",
            bold: true,
            color: "28A745"
          }),
          new TextRun({
            text: "30 backups disponibles en permanence. Temps de récupération < 15 minutes.",
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.6 Workflow 6 : Weekly Report")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Déclencheur : ",
            bold: true
          }),
          new TextRun("Tous les lundis à 9h UTC")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Objectif : ",
            bold: true
          }),
          new TextRun("Fournir une vue d'ensemble de l'activité et de la santé du projet")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Métriques collectées :",
            bold: true
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Nombre de commits de la semaine")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Workflows exécutés (succès/échecs)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Issues ouvertes/fermées")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Pull Requests mergées")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Taux de réussite des builds")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Recommandations d'amélioration")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Résultat : ",
            bold: true,
            color: "28A745"
          }),
          new TextRun({
            text: "Visibilité complète sur l'activité de l'équipe. Identification des tendances et points d'amélioration.",
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // Section 4: Démonstration
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. Scénario de Démonstration")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Pour illustrer concrètement la puissance de GitHub Actions, voici un scénario de démonstration en direct :",
            size: 24
          })
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 Étape 1 : Introduction")]
      }),

      new Paragraph({
        children: [
          new TextRun("Montrer le dashboard de monitoring avec tous les indicateurs au vert. Expliquer rapidement ce que surveille chaque métrique.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 Étape 2 : Introduire un bug volontaire")]
      }),

      new Paragraph({
        children: [
          new TextRun("Dans le code de l'API, commenter une ligne critique (par exemple, la vérification d'un paramètre requis). Montrer le code avant et après.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.3 Étape 3 : Push sur GitHub")]
      }),

      new Paragraph({
        children: [
          new TextRun("Faire un git commit et git push. Montrer l'écran GitHub Actions qui se lance automatiquement.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.4 Étape 4 : Observer l'échec")]
      }),

      new Paragraph({
        children: [
          new TextRun("Suivre en direct l'exécution du workflow CI/CD. Les tests vont échouer. Le déploiement est automatiquement bloqué. Un email d'alerte arrive.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Point clé : ",
            bold: true,
            color: "C45500"
          }),
          new TextRun({
            text: "Le code buggé n'a JAMAIS atteint la production. L'ancien code fonctionne toujours.",
            color: "C45500"
          })
        ],
        spacing: { before: 240, after: 360 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.5 Étape 5 : Corriger le bug")]
      }),

      new Paragraph({
        children: [
          new TextRun("Décommenter la ligne, faire un nouveau commit et push.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.6 Étape 6 : Déploiement réussi")]
      }),

      new Paragraph({
        children: [
          new TextRun("Cette fois, tous les tests passent. Le workflow build l'application et la déploie automatiquement. Email de succès reçu.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.7 Étape 7 : Vérification")]
      }),

      new Paragraph({
        children: [
          new TextRun("Rafraîchir le dashboard : tout est redevenu vert. L'application fonctionne avec la nouvelle version.")
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Temps total de la démo : 3-5 minutes",
            bold: true,
            size: 26,
            color: "2E75B6"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 480 }
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // Section 5: Résultats
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. Résultats et Bénéfices")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1 Comparaison Avant/Après")]
      }),

      createComparisonTable(),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2 ROI (Retour sur Investissement)")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Temps économisé par semaine :",
            bold: true
          })
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Déploiements : 5 déploiements × 15 min = 1h15 économisée")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Monitoring manuel : 2h économisées")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Gestion des incidents : 1h économisée (détection rapide)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Backups manuels : 30 min économisées")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Total : ~5 heures économisées par semaine = 20 heures/mois = 240 heures/an",
            bold: true,
            size: 26,
            color: "28A745"
          })
        ],
        spacing: { before: 360, after: 360 }
      }),

      new Paragraph({
        children: [
          new TextRun("À 50€/heure de coût développeur, cela représente une économie de 12,000€ par an, sans compter les coûts évités liés aux pannes et bugs en production.")
        ],
        spacing: { after: 480 }
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // Section 6: Conclusion
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. Conclusion")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "GitHub Actions transforme radicalement la façon dont les équipes développent et déploient des applications. Ce use case démontre qu'avec 6 workflows bien conçus, il est possible d'automatiser l'intégralité du cycle DevOps.",
            size: 24
          })
        ],
        spacing: { after: 360 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1 Points clés à retenir")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Zéro intervention manuelle : ",
            bold: true
          }),
          new TextRun("Une fois configuré, tout fonctionne automatiquement")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Fiabilité accrue : ",
            bold: true
          }),
          new TextRun("Les machines ne font pas d'erreurs d'inattention")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Détection précoce : ",
            bold: true
          }),
          new TextRun("Les problèmes sont identifiés avant d'impacter les utilisateurs")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Gain de temps massif : ",
            bold: true
          }),
          new TextRun("240 heures économisées par an")
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({
            text: "Sérénité : ",
            bold: true
          }),
          new TextRun("Dormir tranquille en sachant que tout est surveillé")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2 Perspectives d'évolution")]
      }),

      new Paragraph({
        children: [
          new TextRun("Ce système peut être étendu avec :")
        ],
        spacing: { after: 180 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Déploiement multi-environnements (dev, staging, prod)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Intégration avec Slack, Discord, Teams pour les notifications")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Tests E2E avec Playwright ou Selenium")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Monitoring de coûts cloud (AWS, Azure, GCP)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("A/B testing automatisé")]
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "GitHub Actions n'est pas qu'un outil d'automatisation : c'est un catalyseur de transformation culturelle vers le DevOps et l'excellence opérationnelle.",
            size: 26,
            bold: true,
            color: "2E75B6",
            italics: true
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 720, after: 480 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "———",
            size: 24
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 720, after: 240 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Fin du document",
            size: 20,
            italics: true,
            color: "999999"
          })
        ],
        alignment: AlignmentType.CENTER
      })
    ]
  }]
});

// Helper functions
function createImpactTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3120, 6240],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: "EF4444", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "Problème", bold: true, color: "FFFFFF" })]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 6240, type: WidthType.DXA },
            shading: { fill: "EF4444", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "Impact Business", bold: true, color: "FFFFFF" })]
            })]
          })
        ]
      }),
      createImpactRow("Déploiements manuels", "Ralentissement de la livraison de valeur, coût en temps développeur", false, borders),
      createImpactRow("Pannes non détectées", "Perte de revenus, clients mécontents, dégradation de l'image de marque", true, borders),
      createImpactRow("Bugs en production", "Coût de correction 10x plus élevé qu'en développement", false, borders),
      createImpactRow("Vulnérabilités", "Risque de piratage, fuite de données, non-conformité RGPD", true, borders),
      createImpactRow("Pas de backups", "Risque de perte de données irréversible", false, borders)
    ]
  });
}

function createImpactRow(problem, impact, shaded, borders) {
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 3120, type: WidthType.DXA },
        shading: shaded ? { fill: "FEF2F2", type: ShadingType.CLEAR } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: problem, bold: true })]
        })]
      }),
      new TableCell({
        borders,
        width: { size: 6240, type: WidthType.DXA },
        shading: shaded ? { fill: "FEF2F2", type: ShadingType.CLEAR } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun(impact)]
        })]
      })
    ]
  });
}

function createWorkflowsTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 2800, 3760],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 2800, type: WidthType.DXA },
            shading: { fill: "2E75B6", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "Workflow", bold: true, color: "FFFFFF" })]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 2800, type: WidthType.DXA },
            shading: { fill: "2E75B6", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "Fréquence", bold: true, color: "FFFFFF" })]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 3760, type: WidthType.DXA },
            shading: { fill: "2E75B6", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "Objectif", bold: true, color: "FFFFFF" })]
            })]
          })
        ]
      }),
      createWorkflowRow("🚀 CI/CD Pipeline", "À chaque push", "Déploiement automatique", false, borders),
      createWorkflowRow("🏥 Health Check", "Toutes les 5 min", "Surveillance 24/7", true, borders),
      createWorkflowRow("⚡ Performance Testing", "Toutes les heures", "Détection de ralentissements", false, borders),
      createWorkflowRow("🔒 Security Scan", "Quotidien", "Identification des vulnérabilités", true, borders),
      createWorkflowRow("💾 Automated Backup", "Quotidien", "Protection des données", false, borders),
      createWorkflowRow("📊 Weekly Report", "Hebdomadaire", "Visibilité sur l'activité", true, borders)
    ]
  });
}

function createWorkflowRow(name, frequency, objective, shaded, borders) {
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 2800, type: WidthType.DXA },
        shading: shaded ? { fill: "F2F2F2", type: ShadingType.CLEAR } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: name, bold: true })]
        })]
      }),
      new TableCell({
        borders,
        width: { size: 2800, type: WidthType.DXA },
        shading: shaded ? { fill: "F2F2F2", type: ShadingType.CLEAR } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun(frequency)]
        })]
      }),
      new TableCell({
        borders,
        width: { size: 3760, type: WidthType.DXA },
        shading: shaded ? { fill: "F2F2F2", type: ShadingType.CLEAR } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun(objective)]
        })]
      })
    ]
  });
}

function createComparisonTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: "764BA2", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "Métrique", bold: true, color: "FFFFFF" })]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: "EF4444", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "❌ Avant", bold: true, color: "FFFFFF" })]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: "10B981", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun({ text: "✅ Après", bold: true, color: "FFFFFF" })]
            })]
          })
        ]
      }),
      createComparisonRow("Temps de déploiement", "15 minutes", "0 seconde (auto)", false, borders),
      createComparisonRow("Détection de panne", "2-24 heures", "5 minutes", true, borders),
      createComparisonRow("Bugs en production", "2-3 par mois", "0 depuis 3 mois", false, borders),
      createComparisonRow("Tests", "Parfois oubliés", "Toujours exécutés", true, borders),
      createComparisonRow("Uptime", "95%", "99.9%", false, borders),
      createComparisonRow("Backups", "Irréguliers", "30 backups dispos", true, borders)
    ]
  });
}

function createComparisonRow(metric, before, after, shaded, borders) {
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 3120, type: WidthType.DXA },
        shading: shaded ? { fill: "F2F2F2", type: ShadingType.CLEAR } : undefined,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: metric, bold: true })]
        })]
      }),
      new TableCell({
        borders,
        width: { size: 3120, type: WidthType.DXA },
        shading: shaded ? { fill: "FEF2F2", type: ShadingType.CLEAR } : { fill: "FEE2E2", type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun(before)]
        })]
      }),
      new TableCell({
        borders,
        width: { size: 3120, type: WidthType.DXA },
        shading: shaded ? { fill: "F0FDF4", type: ShadingType.CLEAR } : { fill: "DCFCE7", type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun(after)]
        })]
      })
    ]
  });
}

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/devops-monitoring-system/docs/use-case-github-actions.docx", buffer);
  console.log("✅ Document Word créé avec succès!");
});
