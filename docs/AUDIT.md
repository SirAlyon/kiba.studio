# AUDIT PAGINE — Kiba.Studio

_Audit della professionalità del sito online, eseguito su codice + sito live (giugno 2026)._

> **Stato (aggiornato giugno 2026).** Completati: Portfolio homepage con progetti reali e i18n IT/EN (P0 #1, #2); pagina Case Study allineata ai progetti reali — Autoimporta, Kiba.Finance, Kiba.Fetch (P1 #5); form di contatto reale e sicuro via `/api/contact` su Vercel (P2 #6 incluso, link Privacy corretto); email del sito standardizzata a `hello@kiba.studio`. Ancora aperti: **Journal vuoto** (P1 #3) e **team placeholder in About** (P1 #4).

## Sintesi

Il sito è tecnicamente solido e la maggior parte del copy delle **pagine secondarie** (Servizi, About, Case Study, Transparency) è già di buona qualità e in linea con il tono "show don't tell". I problemi di professionalità residui sono concentrati in pochi punti, e i più gravi riguardano la **credibilità/onestà** dei contenuti — paradossale per un brand che fa dell'onestà il suo principio cardine.

Le pagine sono ordinate per priorità di intervento.

---

## P0 — Credibilità e coerenza (urgente)

### 1. Portfolio della homepage: progetti inventati con claim gonfiati
`components/Kiba/KibaSPAPortfolio.vue` (+ `KibaProjectModal.vue`)

I 6 progetti in homepage sono fittizi e descritti con numeri e tecnologie inventate e sopra le righe:
- "marketplace B2B con oltre 500 venditori", "transazioni per oltre 10M€/anno", "10.000 richieste/minuto"
- "audit log immutabile con **blockchain privata**" (claim tecnico poco credibile/da buzzword)
- crittografia E2E, multi-tenancy, Kubernetes, RabbitMQ, Elasticsearch...

**Problema:** sono contenuti generati da AcI, non veri, e contraddicono apertamente il principio "onestà nei tempi, nei costi e nelle competenze". Per un visitatore tecnico suonano falsi; eticamente sono incoerenti col manifesto.

**Direzione:** sostituire con i progetti reali (vedi punto 2) oppure, se servono esempi anonimi, riscriverli senza numeri inventati e senza tech "da vetrina". Eliminare claim come la blockchain privata.

### 2. Incoerenza Portfolio (home) ↔ Case Study
`KibaSPAPortfolio.vue` vs `pages/case-study/`

La home mostra 6 progetti enterprise fittizi; la pagina Case Study mostra 3 progetti reali/modesti (Autoimporta, Kiba.Finance, Sample OCR). Due narrazioni diverse e inconciliabili sullo stesso sito minano la fiducia.

**Direzione:** un'unica fonte di verità. Allineare la sezione Portfolio della home ai case study reali (rimando a `/case-study`), eliminando il set fittizio.

---

## P1 — Pagine incomplete / "in costruzione"

### 3. Journal completamente vuoto
`pages/journal/index.vue`

La pagina mostra solo un empty-state con una lista di "argomenti futuri". È linkata dal footer: un visitatore ci clicca e trova una sezione vuota → segnale "sito non finito".

**Direzione (scegliere una):**
- (a) Nascondere il link Journal da nav/footer finché non c'è almeno 1 articolo;
- (b) Pubblicare 1–2 articoli brevi e veri (es. una scelta tecnica motivata) per dare sostanza.

### 4. Team con segnaposto in About
`pages/about.vue` — `about.team.placeholder_*`

Le card team includono segnaposto espliciti: "In conferma", "Posto riservato per il prossimo collaboratore". Mostrare slot vuoti comunica una struttura non ancora reale — l'opposto dell'obiettivo "software house, non freelancer".

**Direzione:** mostrare solo profili reali (Alessio + la mascotte Kiba) finché i collaboratori non sono confermati pubblicamente. Meglio 2 card vere che 4 di cui 2 vuote.

### 5. Case Study fragile
`pages/case-study/` + i18n `case_study`

Solo 1 progetto cliente reale (Autoimporta); Kiba.Finance è interno e "Sample OCR" si chiama letteralmente "Sample" (suona da placeholder).

**Direzione:** rinominare "Sample OCR" con un nome reale o incorniciarlo chiaramente come progetto lab/interno; valorizzare Kiba.Finance come showcase tecnico. Obiettivo: nessun titolo che sembri un segnaposto.

---

## P2 — Rifiniture

### 6. Link "Privacy Policy" rotto nel form contatti
`components/Kiba/KibaSPAContact.vue:93` → `<a href="#">Privacy Policy</a>`

Il checkbox di consenso rimanda a `#` invece che a `/privacy`. È un bug e un problema di compliance (consenso GDPR che punta a una policy non raggiungibile). **Fix rapido.**

### 7. Possibile sovradichiarazione di competenze
`KibaSPAStack.vue` / sezione Stack — badge "Expert" su molte tecnologie (incl. Kubernetes, Three.js) per uno studio a fondatore unico. Da rivedere per realismo, coerente col principio di onestà. Priorità bassa.

---

## Punto di partenza consigliato

Iniziare da **P0 #1 + #2** (Portfolio home): è l'intervento a maggior impatto sulla credibilità e sblocca la coerenza con i case study. Il fix #6 (link privacy) si può fare contestualmente in pochi minuti.
