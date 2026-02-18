FROM python:3.11-slim

WORKDIR /app

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copier les requirements
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier l'application
COPY app/ ./app/

# Exposer le port
EXPOSE 5000

# Variable d'environnement
ENV FLASK_APP=app/main.py
ENV PORT=5000

# Lancer l'application
CMD ["python", "app/main.py"]
