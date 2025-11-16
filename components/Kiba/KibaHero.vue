<template>
  <!--
    KibaHero.vue
    Hero section principale di Kiba.Studio

    Valori integrati:
    - Privacy first
    - Codice etico e artigianale
    - Tecnologia come strumento di libertà
  -->
  <section class="kiba-hero kiba-snap-section">
    <div class="container">
      <div class="row align-items-center">
        <!-- Colonna Testo (Sinistra) -->
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="kiba-hero-content">
            <!-- Label superiore -->
            <div class="kiba-label kiba-animate-fade-up" style="--delay: 0.1s">
              Boutique Software House
            </div>

            <!-- Titolo principale -->
            <h1 class="kiba-heading-xl mt-20 kiba-animate-fade-up" style="--delay: 0.2s">
              Kiba<span class="kiba-text-primary">.</span>Studio
            </h1>

            <!-- Sottotitolo con slogan etico -->
            <h2 class="kiba-heading-md mt-10 kiba-animate-fade-up" style="--delay: 0.3s">
              Software etico, fatto per durare
            </h2>

            <!-- Descrizione con valori -->
            <p class="kiba-subtitle mt-20 kiba-animate-fade-up" style="--delay: 0.4s">
              Siamo una boutique tecnica che mette <strong>privacy</strong> e
              <strong>qualità</strong> al primo posto. Il nostro codice è uno
              strumento di <strong>libertà</strong>, non di dipendenza.
              Come un Akita fedele, proteggiamo il tuo business digitale con
              rigore e cura artigianale.
            </p>

            <!-- Bullets con valori etici -->
            <ul class="kiba-hero-bullets kiba-animate-fade-up" style="--delay: 0.5s">
              <li>
                <strong>Privacy first</strong> — I tuoi dati sono una responsabilità, non merce
              </li>
              <li>
                <strong>Codice artigianale</strong> — Laravel, Vue.js, Node, Python
              </li>
              <li>
                <strong>Infrastruttura sicura</strong> — Docker, DevOps, cloud su misura
              </li>
              <li>
                <strong>Soluzioni durature</strong> — Scalabili, manutenibili, etiche
              </li>
            </ul>

            <!-- Call to Action - Senza animazioni bugganti -->
            <div class="kiba-hero-cta mt-30 kiba-animate-fade-up" style="--delay: 0.6s">
              <a href="#contatti" class="kiba-btn kiba-btn-primary me-3 mb-3">
                Richiedi consulenza
              </a>
              <a href="#servizi" class="kiba-btn kiba-btn-secondary mb-3">
                Scopri i servizi
              </a>
            </div>
          </div>
        </div>

        <!-- Colonna Modello 3D (Destra) -->
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="kiba-hero-model kiba-animate-fade-in" style="--delay: 0.3s">
            <KibaHeroModel ref="modelRef" />
          </div>
        </div>
      </div>
    </div>

    <!-- Indicatore scroll -->
    <div class="kiba-scroll-indicator">
      <span>Scorri</span>
      <div class="kiba-scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import KibaHeroModel from './KibaHeroModel.vue';

const modelRef = ref(null);

onMounted(() => {
  // Attiva animazioni dopo mount
  const animatedElements = document.querySelectorAll('.kiba-animate-fade-up, .kiba-animate-fade-in');
  animatedElements.forEach(el => {
    el.classList.add('kiba-animated');
  });
});
</script>

<style scoped>
.kiba-hero-content {
  padding-right: 40px;
}

/* Animazioni fluide senza librerie esterne */
.kiba-animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.kiba-animate-fade-in {
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.kiba-animated.kiba-animate-fade-up {
  opacity: 1;
  transform: translateY(0);
}

.kiba-animated.kiba-animate-fade-in {
  opacity: 1;
}

/* Scroll indicator */
.kiba-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kiba-text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0;
  animation: kibaBounceIn 1s ease-out 1.5s forwards;
}

.kiba-scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid var(--kiba-primary);
  border-bottom: 2px solid var(--kiba-primary);
  transform: rotate(45deg);
  margin-top: 8px;
  animation: kibaScrollBounce 2s ease-in-out infinite;
}

@keyframes kibaBounceIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes kibaScrollBounce {
  0%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(45deg) translateY(6px);
  }
}

@media (max-width: 991px) {
  .kiba-hero-content {
    padding-right: 0;
    text-align: center;
  }

  .kiba-hero-bullets {
    display: inline-block;
    text-align: left;
  }

  .kiba-hero-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .kiba-hero-cta .kiba-btn {
    width: 100%;
    max-width: 300px;
  }

  .kiba-scroll-indicator {
    bottom: 20px;
  }
}
</style>
