<template>
  <!--
    KibaAbout.vue
    Sezione "Chi è Kiba.Studio"

    Valori integrati:
    - Privacy first
    - Codice come strumento di libertà
    - Serietà giapponese + cura artigianale
    - Tecnologia per emancipazione
  -->
  <section id="chi-siamo" class="kiba-section kiba-section-surface kiba-snap-section">
    <div class="container">
      <div class="row align-items-center">
        <!-- Colonna Visual -->
        <div class="col-lg-5 mb-5 mb-lg-0">
          <div class="kiba-about-visual kiba-observe" style="--delay: 0.2s">
            <div class="kiba-about-box">
              <div class="kiba-about-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3 class="kiba-heading-sm mt-20">Kiba</h3>
              <p class="kiba-body mt-10">
                "Kiba" in giapponese significa zanna. Come l'Akita, razza nota
                per lealtà e protezione incrollabile, noi proteggiamo i tuoi
                dati e il tuo business digitale con rigore e dedizione.
              </p>
              <div class="kiba-divider kiba-divider-center mt-20"></div>

              <!-- Valori chiave -->
              <div class="kiba-about-values mt-20">
                <div class="kiba-value-item">
                  <i class="fas fa-lock"></i>
                  <span>Privacy First</span>
                </div>
                <div class="kiba-value-item">
                  <i class="fas fa-code"></i>
                  <span>Codice Etico</span>
                </div>
                <div class="kiba-value-item">
                  <i class="fas fa-infinity"></i>
                  <span>Soluzioni Durature</span>
                </div>
              </div>

              <div class="kiba-about-stat mt-25">
                <span class="kiba-stat-number">6+</span>
                <span class="kiba-stat-label">Anni di esperienza</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonna Testo -->
        <div class="col-lg-7">
          <div class="kiba-about-content">
            <div class="kiba-label kiba-observe kiba-stagger-1">La Nostra Filosofia</div>
            <h2 class="kiba-heading-lg mt-15 kiba-observe kiba-stagger-2">
              Software etico, fatto per durare
            </h2>
            <div class="kiba-divider kiba-observe kiba-stagger-3"></div>

            <p class="kiba-body mt-20 kiba-observe kiba-stagger-4">
              <strong>Kiba.Studio</strong> nasce come laboratorio etico di software.
              Fondata da un fullstack developer con oltre 6 anni di esperienza su
              <strong>Laravel, Vue.js, Node e Python</strong>, l'agenzia mette
              al centro i valori che altri trascurano: <strong>privacy,
              trasparenza e qualità senza compromessi</strong>.
            </p>

            <p class="kiba-body mt-15 kiba-observe kiba-stagger-5">
              Non siamo una factory che produce siti in serie. Siamo una
              <strong>boutique tecnica</strong> che crede nel codice come
              strumento di <strong>libertà</strong>, non di dipendenza. I tuoi
              dati sono una responsabilità che prendiamo sul serio, non merce
              da monetizzare. Ogni soluzione che costruiamo è pensata per
              <strong>emancipare</strong> il tuo business, non per vincolarlo.
            </p>

            <p class="kiba-body mt-15 kiba-observe kiba-stagger-6">
              Lavoriamo con la <strong>serietà giapponese</strong>: ordine,
              pulizia, struttura, rigore. Il nostro codice parla per noi: testato,
              documentato, manutenibile. Niente scorciatoie, niente debito tecnico
              nascosto. Solo soluzioni scalabili, sicure e durature.
            </p>

            <!-- Feature box con valori -->
            <div class="row mt-30">
              <div class="col-md-6 kiba-observe kiba-stagger-1">
                <div class="kiba-about-feature">
                  <i class="fas fa-user-shield kiba-text-primary"></i>
                  <h4 class="kiba-heading-sm mt-10">Privacy First</h4>
                  <p class="kiba-small mt-5">
                    I dati dei tuoi utenti sono una responsabilità sacra.
                    Zero tracking invasivo, zero vendita dati.
                  </p>
                </div>
              </div>
              <div class="col-md-6 kiba-observe kiba-stagger-2">
                <div class="kiba-about-feature">
                  <i class="fas fa-hand-holding-heart kiba-text-primary"></i>
                  <h4 class="kiba-heading-sm mt-10">Tecnologia Etica</h4>
                  <p class="kiba-small mt-5">
                    Software come strumento di emancipazione. Niente dark
                    patterns, niente dipendenza forzata.
                  </p>
                </div>
              </div>
            </div>

            <!-- Clienti ideali -->
            <div class="kiba-ideal-clients mt-30 kiba-observe">
              <h4 class="kiba-small">
                <strong>Clienti ideali:</strong> Start-up, PMI e professionisti
                che cercano qualità, sicurezza e affidabilità — non progetti
                "veloci e low-cost".
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Nessuna logica specifica richiesta
</script>

<style scoped>
.kiba-about-visual {
  position: relative;
}

.kiba-about-box {
  background: var(--kiba-bg-dark);
  padding: 40px;
  border-radius: var(--kiba-radius-lg);
  text-align: center;
  border: 1px solid rgba(201, 76, 76, 0.2);
}

.kiba-about-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--kiba-gradient);
  border-radius: 50%;
  margin: 0 auto;
  font-size: 2rem;
  color: #ffffff;
}

.kiba-about-values {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kiba-value-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--kiba-text-secondary);
  font-size: 0.9375rem;
}

.kiba-value-item i {
  color: var(--kiba-primary);
  font-size: 1rem;
}

.kiba-about-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kiba-stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--kiba-primary);
  line-height: 1;
}

.kiba-stat-label {
  font-size: 0.875rem;
  color: var(--kiba-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 8px;
}

.kiba-about-feature {
  padding: 20px;
  background: var(--kiba-bg-dark);
  border-radius: var(--kiba-radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-about-feature i {
  font-size: 1.5rem;
}

.kiba-ideal-clients {
  background: rgba(201, 76, 76, 0.08);
  padding: 16px 20px;
  border-radius: var(--kiba-radius-md);
  border-left: 3px solid var(--kiba-primary);
}

.kiba-ideal-clients h4 {
  margin: 0;
  color: var(--kiba-text-secondary);
}

@media (max-width: 991px) {
  .kiba-about-content {
    text-align: center;
  }

  .kiba-divider {
    margin-left: auto;
    margin-right: auto;
  }

  .kiba-about-feature {
    text-align: center;
    margin-bottom: 16px;
  }

  .kiba-ideal-clients {
    text-align: left;
  }
}
</style>
