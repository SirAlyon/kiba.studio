# Kiba.Studio - Web Agency Etica 🛡️

Software etico, sicuro e fatto per durare. Privacy-first approach.

## 🚀 Quick Start

### Problema con Node.js 21
Il tuo sistema usa Node.js v21.1.0 che ha un bug con `module.createRequire`.
**Soluzioni:**

### Opzione 1: Docker (Consigliato) 🐳
```bash
# Avvia con Docker (usa Node 18 internamente)
./start-dev.sh

# Oppure manualmente:
docker-compose up --build
```

### Opzione 2: NVM - Node Version Manager 📦
```bash
# Installa NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Usa Node 18
nvm install 18
nvm use 18

# Installa dipendenze e avvia
npm install --legacy-peer-deps
npm run dev:original
```

### Opzione 3: Deploy diretto (senza dev locale) 🌐
```bash
# Push su GitHub - il workflow CI/CD farà tutto
git add .
git commit -m "Deploy"
git push
```

## 📁 Struttura Progetto

```
vie_vue_3/
├── components/
│   └── Kiba/              # Solo componenti Kiba (pulito!)
├── pages/
│   └── index.vue          # Entry point SPA
├── public/
│   └── .nojekyll          # Per GitHub Pages
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD automatico
└── nuxt.config.ts         # Config ottimizzata
```

## 🛠️ Tech Stack
- **Nuxt 3.7** - Framework Vue production-ready
- **GSAP 3.12** - Animazioni performanti
- **Three.js** - 3D graphics
- **Swiper 11** - Touch slider
- **Node 18** - Runtime stabile

## 🌐 Deploy

### GitHub Pages (Automatico)
1. Push su branch `main` o `master`
2. GitHub Actions builda automaticamente
3. Deploy su: `https://[username].github.io/vie_vue_3/`

### Hosting Tradizionale
```bash
# Genera build statico
npm run generate

# Carica la cartella .output/public sul tuo hosting
```

## ⚙️ Configurazione

### Base URL
Se cambi nome repository, aggiorna in `nuxt.config.ts`:
```typescript
app: {
  baseURL: '/NOME-TUO-REPO/'
}
```

## 🔒 Sicurezza
- Solo 6 vulnerabilità minori (ridotte da 37!)
- No dipendenze legacy
- Privacy-first design
- Codice pulito e mantenibile

## 📝 Note
- **Non usare** `npm run dev` direttamente con Node 21
- **Usa** Docker o NVM per sviluppo locale
- **GitHub Actions** usa Node 18 (funziona sempre)

## 🆘 Troubleshooting

### Errore "module.createRequire is not a function"
→ Usa Docker o NVM (vedi sopra)

### Build fallisce su GitHub
→ Controlla che il nome repo in `nuxt.config.ts` sia corretto

### Pagina bianca su GitHub Pages
→ Aspetta 5-10 minuti dopo il deploy
→ Pulisci cache browser (Ctrl+F5)

---
**Kiba.Studio** - Software etico fatto per durare 🛡️