<template>
  <!--
    KibaProcess.vue
    Sezione processo di lavoro di Kiba.Studio
    5 step visuali: Analisi → Progettazione → Sviluppo → QA → Delivery
  -->
  <section id="processo" class="kiba-section kiba-section-surface">
    <div class="container">
      <!-- Titolo sezione -->
      <div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s">
        <div class="kiba-label">{{ $t('process.label') }}</div>
        <h2 class="kiba-heading-lg">
          {{ $t('process.title') }}
        </h2>
        <p class="kiba-subtitle">
          Un processo strutturato garantisce risultati prevedibili e di qualità.
          Ecco le fasi che seguiamo per ogni progetto.
        </p>
      </div>

      <!-- Steps del processo -->
      <div class="row">
        <!-- Step 1: Analisi -->
        <div class="col-lg col-md-4 col-sm-6 mb-4">
          <div class="kiba-process-step wow fadeInUp" data-wow-delay=".2s">
            <div class="kiba-process-number">1</div>
            <div class="kiba-process-connector d-none d-lg-block"></div>
            <h4 class="kiba-heading-sm">{{ $t('process.step_1_title') }}</h4>
            <p class="kiba-small mt-10">
              {{ $t('process.step_1_description') }}
            </p>
          </div>
        </div>

        <!-- Step 2: Progettazione -->
        <div class="col-lg col-md-4 col-sm-6 mb-4">
          <div class="kiba-process-step wow fadeInUp" data-wow-delay=".3s">
            <div class="kiba-process-number">2</div>
            <div class="kiba-process-connector d-none d-lg-block"></div>
            <h4 class="kiba-heading-sm">{{ $t('process.step_2_title') }}</h4>
            <p class="kiba-small mt-10">
              {{ $t('process.step_2_description') }}
            </p>
          </div>
        </div>

        <!-- Step 3: Sviluppo -->
        <div class="col-lg col-md-4 col-sm-6 mb-4">
          <div class="kiba-process-step wow fadeInUp" data-wow-delay=".4s">
            <div class="kiba-process-number">3</div>
            <div class="kiba-process-connector d-none d-lg-block"></div>
            <h4 class="kiba-heading-sm">{{ $t('process.step_3_title') }}</h4>
            <p class="kiba-small mt-10">
              {{ $t('process.step_3_description') }}
            </p>
          </div>
        </div>

        <!-- Step 4: Testing -->
        <div class="col-lg col-md-6 col-sm-6 mb-4">
          <div class="kiba-process-step wow fadeInUp" data-wow-delay=".5s">
            <div class="kiba-process-number">4</div>
            <div class="kiba-process-connector d-none d-lg-block"></div>
            <h4 class="kiba-heading-sm">{{ $t('process.step_4_title') }}</h4>
            <p class="kiba-small mt-10">
              {{ $t('process.step_4_description') }}
            </p>
          </div>
        </div>

        <!-- Step 5: Delivery -->
        <div class="col-lg col-md-6 col-sm-12 mb-4">
          <div class="kiba-process-step wow fadeInUp" data-wow-delay=".6s">
            <div class="kiba-process-number">5</div>
            <h4 class="kiba-heading-sm">{{ $t('process.step_5_title') }}</h4>
            <p class="kiba-small mt-10">
              {{ $t('process.step_5_description') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Nota aggiuntiva -->
      <div class="text-center mt-40 wow fadeInUp" data-wow-delay=".7s">
        <p class="kiba-body">
          <i class="fas fa-sync-alt kiba-text-primary me-2"></i>
          <strong>Approccio iterativo:</strong> lavoriamo in sprint brevi con
          feedback costante, così puoi vedere i progressi e correggere la rotta
          in tempo reale.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Nessuna logica specifica richiesta
</script>

<style scoped>
/* Stili aggiuntivi per gli step del processo */
.kiba-process-step {
  position: relative;
}

@media (min-width: 992px) {
  .kiba-process-connector {
    position: absolute;
    top: 30px;
    left: calc(50% + 30px);
    width: calc(100% - 60px);
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--kiba-primary) 0%,
      rgba(201, 76, 76, 0.3) 100%
    );
  }

  .kiba-process-step:last-child .kiba-process-connector {
    display: none;
  }
}
</style>
