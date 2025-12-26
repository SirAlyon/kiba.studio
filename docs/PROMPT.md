# PROMPT OTTIMIZZATO - Generazione Testi Kiba.Studio

## Istruzioni d'Uso

1. Apri una nuova conversazione con Claude
2. Copia l'intero contenuto della sezione "PROMPT DA UTILIZZARE" qui sotto
3. Allega i file di contesto o incollane il contenuto
4. Invia e attendi le proposte

---

## PROMPT DA UTILIZZARE

```
Sei un copywriter senior specializzato in branding per aziende tech. Devi riscrivere i testi della homepage (sezione Hero) e della pagina Manifesto per Kiba.Studio, una web agency italiana.

## CONTESTO

Ho allegato/fornisco i seguenti documenti:
- CONTEXT.md: profilo completo dell'agenzia e del fondatore
- ANALYSIS.md: analisi critica dei testi attuali con problemi identificati
- DIRECTION.md: strategie e direzioni creative proposte

Leggi attentamente tutti i documenti prima di procedere.

## OBIETTIVO

Trasformare i testi da "bozza AI generica" a "voce distintiva e professionale di un'agenzia boutique".

L'agenzia deve essere percepita come:
- Una software house professionale (non un freelancer)
- Piccola ma strutturata
- Etica senza essere predicatoria
- Tecnica ma accessibile
- Distintiva nel mercato italiano

## REQUISITI TECNICI

### Sezione Hero
Devi fornire per ITALIANO e INGLESE:
- label: etichetta sopra il titolo (max 3-4 parole)
- title: headline principale (max 6-7 parole)
- subtitle: descrizione (max 30 parole, 2 righe desktop)

### Sezione Manifesto
Devi fornire per ITALIANO e INGLESE:
- kiba_meaning: spiegazione del nome (max 2 frasi)
- paragraph_1: chi siamo / origine (max 3 frasi)
- paragraph_2: filosofia / in cosa crediamo (max 3 frasi)
- paragraph_3: come lavoriamo / impegno (max 3 frasi)
- feature_privacy_description: (max 2 frasi)
- feature_tech_description: (max 2 frasi)

## VINCOLI STILISTICI

OBBLIGATORIO:
- Tono professionale ma non freddo
- Frasi brevi e dirette
- Verbi attivi (no forme passive)
- Concretezza (show don't tell)
- Coerenza tra IT e EN (stesso messaggio, non traduzione letterale)

VIETATO:
- "Qualità senza compromessi" (cliché)
- "Serietà giapponese" (stereotipo)
- "Soluzioni digitali complete" (generico)
- Ripetizioni eccessive degli stessi concetti
- Liste di buzzword
- Tono predicatorio o accusatorio verso la concorrenza
- Promesse irrealistiche

RACCOMANDATO:
- Metafora Akita/protezione (sviluppata con intelligenza)
- Riferimenti giapponesi sottili (valori, non stereotipi)
- Un tocco di personalità/ironia sottile
- Claim verificabili e concreti

## OUTPUT RICHIESTO

Fornisci 2-3 VARIANTI per ogni sezione, così strutturate:

### VARIANTE A: [Nome descrittivo - es. "Focus Protezione"]

**Hero IT:**
```json
{
  "label": "...",
  "title": "...",
  "subtitle": "..."
}
```

**Hero EN:**
```json
{
  "label": "...",
  "title": "...",
  "subtitle": "..."
}
```

**Manifesto IT:**
```json
{
  "kiba_meaning": "...",
  "paragraph_1": "...",
  "paragraph_2": "...",
  "paragraph_3": "...",
  "feature_privacy_description": "...",
  "feature_tech_description": "..."
}
```

**Manifesto EN:**
```json
{
  "kiba_meaning": "...",
  "paragraph_1": "...",
  "paragraph_2": "...",
  "paragraph_3": "...",
  "feature_privacy_description": "...",
  "feature_tech_description": "..."
}
```

**Rationale:** [Breve spiegazione delle scelte creative]

---

[Ripeti per VARIANTE B, VARIANTE C...]

## DOPO LE VARIANTI

Una volta fornite le varianti:
1. Indica quale consigli e perché
2. Evidenzia pro/contro di ciascuna
3. Proponi eventuali mix tra varianti

Attendo conferma che hai letto i documenti prima di procedere con le proposte.
```

---

## DOCUMENTI DA ALLEGARE

Quando usi il prompt, allega o incolla il contenuto di:

1. `docs/CONTEXT.md` - Contesto completo
2. `docs/ANALYSIS.md` - Analisi testi attuali
3. `docs/DIRECTION.md` - Direzioni strategiche

---

## VARIANTE PROMPT BREVE

Se preferisci un prompt più conciso:

```
Sei un copywriter per branding tech. Riscrivi Hero e Manifesto per Kiba.Studio (web agency italiana etica).

DOCUMENTI ALLEGATI: CONTEXT.md, ANALYSIS.md, DIRECTION.md

REQUISITI:
- Hero: label, title, subtitle (IT + EN)
- Manifesto: kiba_meaning, 3 paragrafi, 2 feature descriptions (IT + EN)

STILE: Professionale, diretto, concreto. No cliché, no stereotipi, no liste di buzzword.

OUTPUT: 2-3 varianti in formato JSON per ogni sezione, con rationale.
```

---

## PROMPT PER ITERAZIONI SUCCESSIVE

Dopo aver scelto una variante base, usa questo prompt per raffinare:

```
Basandoti sulla VARIANTE [X] scelta, apporta queste modifiche:

1. [Modifica specifica 1]
2. [Modifica specifica 2]
...

Mantieni il tono e la struttura, applica solo le correzioni richieste.
Fornisci la versione finale in formato JSON pronta per essere inserita nei file di traduzione.
```

---

## NOTE FINALI

### Per Risultati Ottimali
- Usa Claude 3.5 Sonnet o superiore
- Fornisci tutti e 3 i documenti di contesto
- Non abbreviare i documenti
- Chiedi chiarimenti se necessario prima di procedere

### Dopo la Generazione
- Rivedi sempre manualmente i testi
- Verifica che IT e EN siano coerenti (stesso messaggio)
- Controlla lunghezza effettiva nei componenti Vue
- Testa su mobile (subtitle può andare a capo)

### Integrazione nei File
I testi finali vanno inseriti in:
- `i18n/locales/it.json` → sezioni "hero" e "manifesto"
- `i18n/locales/en.json` → sezioni "hero" e "manifesto"
