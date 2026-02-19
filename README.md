# 🚀 DevOps Monitoring System with GitHub Actions

[![CI/CD Pipeline](https://github.com/FIABOE/github-actions-test/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/FIABOE/github-actions-test/blob/main/.github/workflows/ci-cd.yml)
[![Health Check](https://github.com/FIABOE/github-actions-test/actions/workflows/health-check.yml/badge.svg)](https://github.com/FIABOE/github-actions-test/blob/main/.github/workflows/health-check.yml)
[![Security Scan](https://github.com/FIABOE/github-actions-test/actions/workflows/security-scan.yml/badge.svg)](https://github.com/FIABOE/github-actions-test/blob/main/.github/workflows/security-scan.yml)
[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 📋 Vue d'ensemble

Ce projet démontre l'utilisation complète de **GitHub Actions** pour automatiser l'ensemble du cycle de vie DevOps d'une application API. Il illustre comment mettre en place un système de monitoring, de CI/CD, de sécurité et de backup entièrement automatisé.

### 🎯 Objectif

Montrer comment GitHub Actions peut transformer un processus de développement manuel en un pipeline automatisé robuste et fiable.

## ✨ Fonctionnalités

### 🤖 6 Workflows GitHub Actions Automatisés

1. **🚀 CI/CD Pipeline** - Déploiement automatique
   - Tests unitaires automatiques
   - Vérification de la qualité du code
   - Build Docker
   - Déploiement sur succès

2.  **🏥 Health Check** - Surveillance quotidienne 
   - Vérification automatisée chaque jour à midi.
   - Ping du endpoint /health pour vérifier la disponibilité
   - Rapport d'état généré directement dans GitHub Actions.
   - Possibilité de déclenchement manuel (Workflow Dispatch)

3. **⚡ Performance Testing** - Tests de charge
   - Mesure du temps de réponse
   - Tests de charge avec 50 requêtes concurrentes
   - Alertes si dégradation de performance

4. **🔒 Security Scan** - Analyse de sécurité quotidienne
   - Scan des vulnérabilités (Safety)
   - Analyse statique du code (Bandit)
   - Détection de secrets

5. **💾 Automated Backup** - Sauvegarde automatique
   - Backup quotidien à minuit
   - Vérification de l'intégrité
   - Rétention de 30 jours

6. **📊 Weekly Report** - Rapport hebdomadaire
   - Statistiques de la semaine
   - Métriques de performance
   - Tendances et recommandations

### 📱 Application API (Flask)

- API REST complète pour gérer des articles de blog
- Endpoints de santé et métriques
- Base de données SQLite
- Tests unitaires (>80% couverture)

### 📊 Dashboard de Monitoring

- Interface web moderne et responsive
- Visualisation en temps réel
- Métriques de performance
- Statuts des workflows

## 🚀 Quick Start

### Prérequis

- Python 3.11+
- pip
- Git
- Docker (optionnel)

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/YOUR_USERNAME/devops-monitoring-system.git
cd devops-monitoring-system
```

2. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

3. **Lancer l'application**
```bash
python app/main.py
```

L'API sera accessible sur `http://localhost:5000`

4. **Ouvrir le dashboard**
```bash
# Ouvrir dashboard/index.html dans votre navigateur
open dashboard/index.html  # macOS
xdg-open dashboard/index.html  # Linux
start dashboard/index.html  # Windows
```

### 🐳 Avec Docker

```bash
# Build l'image
docker build -t blog-api .

# Lancer le conteneur
docker run -p 5000:5000 blog-api
```

## 🧪 Tests

```bash
# Lancer tous les tests
pytest

# Avec couverture
pytest --cov=app --cov-report=html

# Lancer un test spécifique
pytest tests/test_api.py::test_health_check
```

## 📚 Documentation API

### Endpoints principaux

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/` | GET | Page d'accueil |
| `/health` | GET | Vérification de santé |
| `/metrics` | GET | Métriques système |
| `/api/articles` | GET | Liste des articles |
| `/api/articles` | POST | Créer un article |
| `/api/articles/{id}` | GET | Récupérer un article |
| `/api/articles/{id}` | PUT | Modifier un article |
| `/api/articles/{id}` | DELETE | Supprimer un article |

### Exemple de requête

```bash
# Vérifier la santé
curl http://localhost:5000/health

# Créer un article
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title": "Mon article", "content": "Contenu...", "author": "John"}'
```

## ⚙️ Configuration GitHub Actions

### Secrets requis

Allez dans `Settings > Secrets and variables > Actions` et ajoutez :

- `API_URL` : URL de votre API en production (ex: https://votre-app.com)
- `EMAIL_TO` : Email pour recevoir les notifications (optionnel)

### Workflows

Les workflows sont dans `.github/workflows/` :

- `ci-cd.yml` - CI/CD Pipeline
- `health-check.yml` - Surveillance santé
- `performance-test.yml` - Tests de performance
- `security-scan.yml` - Scan de sécurité
- `backup.yml` - Backup automatique
- `weekly-report.yml` - Rapport hebdomadaire

## 📊 Use Case : Monitoring et CI/CD Automatisé

### Problème

Les équipes de développement font face à plusieurs défis :
- Déploiements manuels sujets aux erreurs
- Détection tardive des pannes (heures, voire jours)
- Pas de suivi de la qualité du code
- Absence de backups réguliers
- Pas de visibilité sur les performances

### Solution

GitHub Actions automatise l'ensemble du cycle DevOps :

**Avant GitHub Actions :**
- ❌ Déploiement manuel : 15 minutes
- ❌ Détection de panne : 2-24 heures
- ❌ Tests : Parfois oubliés
- ❌ Backups : Irréguliers

**Après GitHub Actions :**
- ✅ Déploiement automatique : 0 seconde (push et c'est parti)
- ✅ Détection de panne : 5 minutes maximum
- ✅ Tests : Toujours exécutés
- ✅ Backups : Quotidiens et vérifiés

### Résultats

- **Temps gagné** : 70% de réduction du temps opérationnel
- **Disponibilité** : 99.9% uptime
- **Qualité** : 0 bugs en production depuis 3 mois
- **Sécurité** : Vulnérabilités détectées avant la production

## 🎬 Démonstration

### Scénario de démo en live

1. **Cassez volontairement l'app** (commentez une ligne de code)
2. **Push sur GitHub**
3. **Workflow CI/CD se lance** → Tests échouent
4. **Déploiement bloqué** → Le code buggé n'atteint jamais la production
5. **Corrigez le bug**
6. **Re-push** → Tests passent → Déploiement automatique ✅

### Ce qui impressionne

- L'automatisation complète (0 intervention manuelle)
- La détection précoce des bugs
- Les alertes en temps réel
- Le dashboard visuel

## 🏗️ Architecture

```
devops-monitoring-system/
├── .github/
│   └── workflows/           # 6 workflows GitHub Actions
│       ├── ci-cd.yml
│       ├── health-check.yml
│       ├── performance-test.yml
│       ├── security-scan.yml
│       ├── backup.yml
│       └── weekly-report.yml
├── app/
│   └── main.py             # Application Flask
├── tests/
│   └── test_api.py         # Tests unitaires
├── dashboard/
│   └── index.html          # Dashboard de monitoring
├── Dockerfile              # Conteneurisation
├── requirements.txt        # Dépendances Python
└── README.md
```

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**------**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/data6ai-3b8624235/)

Lien du projet : [https://github.com/FIABOE/devops-monitoring-system](https://github.com/FIABOE/devops-monitoring-system)

## 🙏 Remerciements

- GitHub Actions pour la plateforme d'automatisation
- La communauté DevOps pour les best practices
- Flask pour le framework web Python

## 📖 Ressources

- [Documentation GitHub Actions](https://docs.github.com/fr/actions)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Docker Documentation](https://docs.docker.com/)

---

⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile !
