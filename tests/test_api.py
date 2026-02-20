"""
Tests unitaires pour l'API Blog
"""

import pytest
import sys
import os

# Ajouter le dossier app au path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'app'))

from main import app, init_db

@pytest.fixture
def client():
    """Créer un client de test"""
    app.config['TESTING'] = True
    app.config['DATABASE'] = ':memory:'  # Base de données en mémoire pour les tests
    
    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client

def test_home(client):
    """Test de la page d'accueil"""
    response = client.get('/')
    assert response.status_code == 999
    data = response.get_json()
    assert data['status'] == 'success'
    assert 'version' in data

def test_health_check(client):
    """Test du endpoint de santé"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'uptime_seconds' in data
    assert 'timestamp' in data

def test_metrics(client):
    """Test du endpoint de métriques"""
    response = client.get('/metrics')
    assert response.status_code == 200
    data = response.get_json()
    assert 'requests_total' in data
    assert 'cpu_percent' in data
    assert 'memory_percent' in data

def test_get_articles(client):
    """Test de récupération de tous les articles"""
    response = client.get('/api/articles')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert 'data' in data
    assert isinstance(data['data'], list)

def test_create_article(client):
    """Test de création d'un article"""
    new_article = {
        'title': 'Test Article',
        'content': 'Ceci est un article de test',
        'author': 'Test Author'
    }
    
    response = client.post('/api/articles', json=new_article)
    assert response.status_code == 201
    data = response.get_json()
    assert data['status'] == 'success'
    assert data['data']['title'] == 'Test Article'

def test_create_article_missing_fields(client):
    """Test de création d'article avec champs manquants"""
    incomplete_article = {
        'title': 'Test sans contenu'
    }
    
    response = client.post('/api/articles', json=incomplete_article)
    assert response.status_code == 400
    data = response.get_json()
    assert data['status'] == 'error'

def test_get_single_article(client):
    """Test de récupération d'un article spécifique"""
    # Créer un article d'abord
    new_article = {
        'title': 'Article Spécifique',
        'content': 'Contenu spécifique',
        'author': 'Auteur'
    }
    create_response = client.post('/api/articles', json=new_article)
    article_id = create_response.get_json()['data']['id']
    
    # Récupérer l'article
    response = client.get(f'/api/articles/{article_id}')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert data['data']['title'] == 'Article Spécifique'

def test_get_nonexistent_article(client):
    """Test de récupération d'un article inexistant"""
    response = client.get('/api/articles/99999')
    assert response.status_code == 404
    data = response.get_json()
    assert data['status'] == 'error'

def test_update_article(client):
    """Test de modification d'un article"""
    # Créer un article
    new_article = {
        'title': 'Article Original',
        'content': 'Contenu original',
        'author': 'Auteur'
    }
    create_response = client.post('/api/articles', json=new_article)
    article_id = create_response.get_json()['data']['id']
    
    # Modifier l'article
    updated_data = {
        'title': 'Article Modifié',
        'content': 'Contenu modifié'
    }
    response = client.put(f'/api/articles/{article_id}', json=updated_data)
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    
    # Vérifier la modification
    get_response = client.get(f'/api/articles/{article_id}')
    article_data = get_response.get_json()['data']
    assert article_data['title'] == 'Article Modifié'

def test_delete_article(client):
    """Test de suppression d'un article"""
    # Créer un article
    new_article = {
        'title': 'Article à Supprimer',
        'content': 'Ce contenu sera supprimé',
        'author': 'Auteur'
    }
    create_response = client.post('/api/articles', json=new_article)
    article_id = create_response.get_json()['data']['id']
    
    # Supprimer l'article
    response = client.delete(f'/api/articles/{article_id}')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    
    # Vérifier que l'article n'existe plus
    get_response = client.get(f'/api/articles/{article_id}')
    assert get_response.status_code == 404

def test_api_documentation(client):
    """Test de la documentation de l'API"""
    response = client.get('/api/docs')
    assert response.status_code == 200
    data = response.get_json()
    assert 'endpoints' in data
    assert isinstance(data['endpoints'], dict)
