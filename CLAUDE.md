# CLAUDE.md — Kiba.Studio

Riferimento di lavoro per il sito **kiba.studio**. Leggi questo file a inizio di ogni sessione.

## Cos'è

Sito vetrina di **Kiba.Studio**, software house boutique etica e privacy-first con sede a Milano. Fondatore unico (Alessio Sada) + network di collaboratori esterni. Online su https://kiba.studio.

Posizionamento: software house professionale (NON freelancer), piccola ma strutturata. Pochi clienti per anno, qualità artigianale, privacy by design, codice di proprietà del cliente. Il nome "Kiba" = "zanna" in giapponese, dall'Akita del fondatore.

## Stack tecnico

- **Nuxt 3** (Vue 3, `<script setup>`), SSG/prerender.
- **TailwindCSS 3** + CSS scoped nei componenti (variabili `--kiba-*`).
- **GSAP** per animazioni (classi `gsap-animate`).
- **i18n** (`@nuxtjs/i18n`): IT (default) + EN. Tutti i testi vivono in `i18n/locales/{it,en}.json`. **Mai hardcodare testo nei template** — usare `$t()`.
- Font Awesome per le icone.

## Struttura

- `pages/` — Home (`index.vue`, SPA single-page con sezioni), e pagine secondarie: `about`, `servizi`, `contatti`, `case-study/`, `journal/`, `privacy`, `cookie`, `termini`, `transparency`.
- `components/Kiba/` — `KibaSPA*` = sezioni della homepage; `KibaPage*` = layout pagine secondarie; legal/nav/loader.
- `docs/` — contesto e analisi: `CONTEXT.md` (brand/founder), `ANALYSIS.md` + `DIRECTION.md` (copy Hero/Manifesto), `AUDIT.md` (audit pagine + roadmap rifacimento).

## Tono di voce (vincoli copy)

Professionale ma umano, diretto, concreto. **Show don't tell**. Frasi brevi, verbi attivi.

VIETATO: "qualità senza compromessi", "serietà giapponese", "soluzioni digitali complete", liste di buzzword, tono predicatorio, claim gonfiati/inventati. Dettagli in `docs/ANALYSIS.md` e `docs/DIRECTION.md`.

## Principio guida non negoziabile

Il brand si fonda su **onestà e trasparenza**. Ogni contenuto del sito deve essere veritiero: niente numeri inventati, progetti fittizi o competenze sovradichiarate. Se un dato non è reale o non è condivisibile (NDA), va omesso o etichettato come tale — non fabbricato.

## Stato e priorità di rifacimento

Vedi `docs/AUDIT.md` per l'audit completo e la roadmap. In sintesi le aree deboli: Portfolio homepage (progetti inventati), incoerenza Portfolio↔Case Study, Journal vuoto, team placeholder in About, link Privacy Policy rotto nel form contatti.

## Convenzioni di lavoro

- Modifiche ai testi → aggiornare **sempre** sia `it.json` che `en.json` (stesso messaggio, non traduzione letterale).
- Mantenere coerenza tra Home, Servizi, About, Case Study (stessi progetti, stessi numeri).
- Verificare lunghezza testi nei componenti (mobile incluso) dopo ogni modifica copy.
