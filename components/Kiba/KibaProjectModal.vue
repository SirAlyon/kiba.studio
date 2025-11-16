<template>
  <!--
    KibaProjectModal.vue
    Modale per dettagli progetto con privacy-first approach
  -->
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" class="kiba-modal-overlay" @click.self="close">
        <div class="kiba-modal-content" ref="modalRef">
          <!-- Close button -->
          <button
            class="kiba-modal-close"
            @click="close"
            aria-label="Chiudi modale"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Modal header -->
          <div class="kiba-modal-header">
            <div class="kiba-modal-type">{{ project.type }}</div>
            <h2 class="kiba-modal-title">{{ project.title }}</h2>
            <p class="kiba-modal-subtitle">{{ project.subtitle }}</p>

            <!-- Privacy notice -->
            <div class="kiba-modal-privacy">
              <i class="fas fa-shield-alt"></i>
              <span>Dettagli anonimizzati per tutelare la privacy del cliente</span>
            </div>
          </div>

          <!-- Modal body -->
          <div class="kiba-modal-body">
            <!-- Extended description -->
            <div class="kiba-modal-section">
              <h3>Panoramica del Progetto</h3>
              <p>{{ project.fullDescription }}</p>
            </div>

            <!-- Key challenges solved -->
            <div class="kiba-modal-section">
              <h3>Sfide e Soluzioni</h3>
              <div class="kiba-modal-challenges">
                <div
                  v-for="(challenge, index) in project.challenges"
                  :key="index"
                  class="kiba-modal-challenge"
                >
                  <i class="fas fa-check-circle"></i>
                  <div>
                    <strong>{{ challenge.title }}</strong>
                    <p>{{ challenge.solution }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tech stack used -->
            <div class="kiba-modal-section">
              <h3>Stack Tecnologico</h3>
              <div class="kiba-modal-tags">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="kiba-modal-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Privacy features -->
            <div class="kiba-modal-section">
              <h3>Focus su Privacy & Sicurezza</h3>
              <ul class="kiba-modal-features">
                <li v-for="feature in project.privacyFeatures" :key="feature">
                  <i class="fas fa-lock"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Placeholder images -->
            <div class="kiba-modal-section">
              <h3>Preview</h3>
              <div class="kiba-modal-images">
                <div class="kiba-modal-image-placeholder">
                  <i class="fas fa-image"></i>
                  <span>Screenshot anonimizzato</span>
                </div>
                <div class="kiba-modal-image-placeholder">
                  <i class="fas fa-mobile-alt"></i>
                  <span>Vista mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useGSAP } from '@/composables/useGSAP';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const modalRef = ref(null);
const { loadGSAP } = useGSAP();
let gsap = null;

onMounted(async () => {
  const gsapModules = await loadGSAP();
  if (gsapModules) {
    gsap = gsapModules.gsap;
  }
});

// Animazione apertura modale
watch(() => props.isOpen, (newVal) => {
  if (newVal && gsap && modalRef.value) {
    // Blocca scroll body
    document.body.style.overflow = 'hidden';

    // Anima entrata modale
    gsap.fromTo(modalRef.value,
      {
        scale: 0.9,
        opacity: 0,
        y: 50
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.4)'
      }
    );
  } else if (!newVal) {
    // Ripristina scroll body
    document.body.style.overflow = '';
  }
});

const close = () => {
  if (gsap && modalRef.value) {
    gsap.to(modalRef.value, {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        emit('close');
      }
    });
  } else {
    emit('close');
  }
};

// Chiudi con ESC
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    close();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  return () => window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.kiba-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.kiba-modal-content {
  background: var(--kiba-bg-surface, #2d2d2d);
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.kiba-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: var(--kiba-text-main, #f0f0f0);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
}

.kiba-modal-close:hover {
  background: var(--kiba-primary, #c94c4c);
  transform: rotate(90deg);
}

.kiba-modal-header {
  padding: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.kiba-modal-type {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-primary, #c94c4c);
  margin-bottom: 12px;
}

.kiba-modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 8px;
}

.kiba-modal-subtitle {
  font-size: 1.125rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 20px;
}

.kiba-modal-privacy {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 30px;
  font-size: 0.875rem;
  color: var(--kiba-primary, #c94c4c);
}

.kiba-modal-body {
  padding: 40px;
}

.kiba-modal-section {
  margin-bottom: 40px;
}

.kiba-modal-section:last-child {
  margin-bottom: 0;
}

.kiba-modal-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 16px;
}

.kiba-modal-section p {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.7;
}

.kiba-modal-challenges {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.kiba-modal-challenge {
  display: flex;
  gap: 16px;
}

.kiba-modal-challenge i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.kiba-modal-challenge strong {
  display: block;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 4px;
}

.kiba-modal-challenge p {
  font-size: 0.9375rem;
  margin: 0;
}

.kiba-modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kiba-modal-tag {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.kiba-modal-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.kiba-modal-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.kiba-modal-features i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 0.875rem;
  flex-shrink: 0;
}

.kiba-modal-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.kiba-modal-image-placeholder {
  aspect-ratio: 16/10;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--kiba-text-muted, #888);
}

.kiba-modal-image-placeholder i {
  font-size: 2rem;
  opacity: 0.5;
}

.kiba-modal-image-placeholder span {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 767px) {
  .kiba-modal-content {
    max-height: 100vh;
    border-radius: 0;
  }

  .kiba-modal-header,
  .kiba-modal-body {
    padding: 30px 20px;
  }

  .kiba-modal-title {
    font-size: 1.5rem;
  }
}
</style>