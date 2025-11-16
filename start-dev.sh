#!/bin/bash

# Script per avviare dev server con Docker (Node 18)

echo "🚀 Avviando Kiba.Studio in modalità sviluppo..."
echo "📦 Usando Node.js 18 tramite Docker per evitare problemi di compatibilità"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker non installato. Installalo da: https://docs.docker.com/get-docker/"
    echo ""
    echo "Alternativa senza Docker:"
    echo "1. Installa nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "2. Usa Node 18: nvm install 18 && nvm use 18"
    echo "3. Esegui: npm install --legacy-peer-deps && npm run dev:original"
    exit 1
fi

# Build and run with docker-compose
docker-compose up --build

# Alternativa senza docker-compose:
# docker build -t kiba-studio .
# docker run -p 3000:3000 -v $(pwd):/app kiba-studio