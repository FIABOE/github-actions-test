"""
Blog API - Application de démonstration pour GitHub Actions
Une API REST simple pour gérer des articles de blog
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import sqlite3
import os
import psutil
import time

app = Flask(__name__)
CORS(app)

# Configuration
DATABASE = 'blog.db'
app.config['DATABASE'] = DATABASE

# Métriques globales
start_time = time.time()
request_count = 0

# ==================== BASE DE DONNÉES ====================

def get_db():
    """Connexion à la base de données"""
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    """Initialiser la base de données"""
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Ajouter quelques articles de démo si la table est vide
    count = db.execute('SELECT COUNT(*) FROM articles').fetchone()[0]
    if count == 0:
        demo_articles = [
            ('Introduction à GitHub Actions', 'GitHub Actions est une plateforme d\'automatisation...', 'Admin'),
            ('Pourquoi le CI/CD est important', 'Le CI/CD permet de déployer plus rapidement...', 'DevOps Team'),
            ('Guide du débutant Python', 'Python est un langage de programmation puissant...', 'Tech Writer')
        ]
        db.executemany('INSERT INTO articles (title, content, author) VALUES (?, ?, ?)', demo_articles)
    
    db.commit()
    db.close()

# Initialiser la DB au démarrage
init_db()

# ==================== MIDDLEWARE ====================

@app.before_request
def before_request():
    """Compter les requêtes"""
    global request_count
    request_count += 1

# ==================== ROUTES - HEALTH & MONITORING ====================

@app.route('/')
def home():
    """Page d'accueil"""
    return jsonify({
        'status': 'success',
        'message': 'Bienvenue sur l\'API Blog! ',
        'version': '1.0.0',
        'documentation': '/api/docs'
    })

@app.route('/health')
def health():
    """Endpoint de santé pour le monitoring"""
    uptime = time.time() - start_time
    
    return jsonify({
        'status': 'healthy',
        'uptime_seconds': round(uptime, 2),
        'timestamp': datetime.now().isoformat(),
        'database': 'connected'
    }), 200

@app.route('/metrics')
def metrics():
    """Métriques système pour le monitoring"""
    uptime = time.time() - start_time
    
    return jsonify({
        'requests_total': request_count,
        'uptime_seconds': round(uptime, 2),
        'cpu_percent': psutil.cpu_percent(interval=0.1),
        'memory_percent': psutil.virtual_memory().percent,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/docs')
def api_docs():
    """Documentation de l'API"""
    return jsonify({
        'endpoints': {
            'GET /': 'Page d\'accueil',
            'GET /health': 'Vérification de santé',
            'GET /metrics': 'Métriques système',
            'GET /api/articles': 'Liste tous les articles',
            'GET /api/articles/<id>': 'Récupère un article',
            'POST /api/articles': 'Crée un article',
            'PUT /api/articles/<id>': 'Modifie un article',
            'DELETE /api/articles/<id>': 'Supprime un article'
        }
    })

# ==================== ROUTES - ARTICLES ====================

@app.route('/api/articles', methods=['GET'])
def get_articles():
    """Récupérer tous les articles"""
    try:
        db = get_db()
        articles = db.execute('SELECT * FROM articles ORDER BY created_at DESC').fetchall()
        db.close()
        
        return jsonify({
            'status': 'success',
            'count': len(articles),
            'data': [dict(article) for article in articles]
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    """Récupérer un article spécifique"""
    try:
        db = get_db()
        article = db.execute('SELECT * FROM articles WHERE id = ?', (article_id,)).fetchone()
        db.close()
        
        if article is None:
            return jsonify({
                'status': 'error',
                'message': 'Article non trouvé'
            }), 404
        
        return jsonify({
            'status': 'success',
            'data': dict(article)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/articles', methods=['POST'])
def create_article():
    """Créer un nouvel article"""
    try:
        data = request.get_json()
        
        # Validation
        if not data or 'title' not in data or 'content' not in data:
            return jsonify({
                'status': 'error',
                'message': 'Title et content sont requis'
            }), 400
        
        title = data['title']
        content = data['content']
        author = data.get('author', 'Anonymous')
        
        db = get_db()
        cursor = db.execute(
            'INSERT INTO articles (title, content, author) VALUES (?, ?, ?)',
            (title, content, author)
        )
        article_id = cursor.lastrowid
        db.commit()
        db.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Article créé avec succès',
            'data': {
                'id': article_id,
                'title': title,
                'author': author
            }
        }), 201
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    """Modifier un article"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'Données requises'
            }), 400
        
        db = get_db()
        
        # Vérifier que l'article existe
        article = db.execute('SELECT * FROM articles WHERE id = ?', (article_id,)).fetchone()
        if article is None:
            db.close()
            return jsonify({
                'status': 'error',
                'message': 'Article non trouvé'
            }), 404
        
        # Mettre à jour
        title = data.get('title', article['title'])
        content = data.get('content', article['content'])
        
        db.execute(
            'UPDATE articles SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            (title, content, article_id)
        )
        db.commit()
        db.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Article mis à jour'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/articles/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    """Supprimer un article"""
    try:
        db = get_db()
        
        # Vérifier que l'article existe
        article = db.execute('SELECT * FROM articles WHERE id = ?', (article_id,)).fetchone()
        if article is None:
            db.close()
            return jsonify({
                'status': 'error',
                'message': 'Article non trouvé'
            }), 404
        
        db.execute('DELETE FROM articles WHERE id = ?', (article_id,))
        db.commit()
        db.close()
        
        return jsonify({
            'status': 'success',
            'message': 'Article supprimé'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# ==================== GESTION D'ERREURS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'status': 'error',
        'message': 'Endpoint non trouvé'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'status': 'error',
        'message': 'Erreur serveur interne'
    }), 500

# ==================== LANCEMENT ====================

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
