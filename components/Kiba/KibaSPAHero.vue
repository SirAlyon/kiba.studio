<template>
  <!--
    KibaSPAHero.vue
    Hero section per SPA con Three.js integrato
    Animazioni GSAP per testo e integrazione scroll-linked per modello 3D
  -->
  <div class="kiba-hero-spa">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <!-- Colonna Testo -->
        <div class="col-lg-6">
          <div class="kiba-hero-content">
            <div class="kiba-hero-label gsap-animate">Web Agency Etica</div>
            <h1 class="kiba-hero-title gsap-animate">
              Software che<br />
              <span class="kiba-text-gradient">protegge</span> il tuo business
            </h1>
            <p class="kiba-hero-subtitle gsap-animate">
              Sviluppiamo soluzioni digitali con la serietà giapponese e la
              protezione di un Akita. Privacy first, codice etico, qualità
              senza compromessi.
            </p>

            <div class="kiba-hero-cta gsap-animate">
              <button class="kiba-btn kiba-btn-primary" @click="scrollToContact">
                Inizia il progetto
                <i class="fas fa-arrow-right ms-2"></i>
              </button>
              <button class="kiba-btn kiba-btn-outline" @click="scrollToManifesto">
                Scopri di più
              </button>
            </div>

            <!-- Stats rapide -->
            <div class="kiba-hero-stats gsap-animate">
              <div class="kiba-stat">
                <span class="kiba-stat-value">6+</span>
                <span class="kiba-stat-label">Anni esperienza</span>
              </div>
              <div class="kiba-stat">
                <span class="kiba-stat-value">100%</span>
                <span class="kiba-stat-label">Privacy First</span>
              </div>
              <div class="kiba-stat">
                <span class="kiba-stat-value">0</span>
                <span class="kiba-stat-label">Dark Patterns</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonna 3D Model -->
        <div class="col-lg-6 d-none d-lg-block">
          <div ref="modelContainerRef" class="kiba-hero-model">
            <!-- Three.js canvas montato qui -->
            <div v-if="isModelLoading" class="kiba-model-loader">
              <div class="kiba-model-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="kiba-hero-scroll gsap-animate">
      <span>Scorri</span>
      <i class="fas fa-chevron-down"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGSAP } from '@/composables/useGSAP';

const emit = defineEmits(['navigate']);

// Refs
const modelContainerRef = ref(null);
const isModelLoading = ref(true);

// Three.js instances
let scene, camera, renderer, model, animationId;
let gsapInstance = null;
let ScrollTriggerInstance = null;

// GSAP composable
const { loadGSAP } = useGSAP();

onMounted(async () => {
  // Carica GSAP
  const gsapModules = await loadGSAP();
  if (gsapModules) {
    gsapInstance = gsapModules.gsap;
    ScrollTriggerInstance = gsapModules.ScrollTrigger;
  }

  // Carica Three.js solo su desktop
  if (window.innerWidth >= 992) {
    await initThreeJS();
  } else {
    isModelLoading.value = false;
  }
});

onBeforeUnmount(() => {
  cleanupThreeJS();
});

/**
 * Inizializza Three.js con GSAP scroll integration
 */
const initThreeJS = async () => {
  try {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

    if (!modelContainerRef.value) return;

    const container = modelContainerRef.value;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    scene = new THREE.Scene();
    scene.background = null;

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const accentLight = new THREE.DirectionalLight(0xc94c4c, 0.4);
    accentLight.position.set(-3, 2, -3);
    scene.add(accentLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      '/models/model.glb',
      (gltf) => {
        model = gltf.scene;

        // Center and scale
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.setScalar(scale);

        // Enable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
        isModelLoading.value = false;

        // Setup GSAP scroll animation
        if (gsapInstance && ScrollTriggerInstance) {
          setupScrollAnimation();
        }

        // Start render loop
        animate();
      },
      undefined,
      (error) => {
        console.error('Errore caricamento modello:', error);
        isModelLoading.value = false;
      }
    );

    // Resize handler
    window.addEventListener('resize', onResize, { passive: true });
  } catch (error) {
    console.error('Errore inizializzazione Three.js:', error);
    isModelLoading.value = false;
  }
};

/**
 * Setup GSAP ScrollTrigger per animazioni 3D
 */
const setupScrollAnimation = () => {
  if (!model || !gsapInstance) return;

  // Rotazione modello basata su scroll
  ScrollTriggerInstance.create({
    trigger: '.kiba-hero-spa',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
    onUpdate: (self) => {
      if (model) {
        // Max 25° rotation (0.436 rad)
        model.rotation.y = self.progress * 0.436;
        model.rotation.x = self.progress * 0.174;
      }
      if (camera) {
        // Camera zoom out
        camera.position.z = 5 + self.progress * 1.5;
      }
    }
  });
};

/**
 * Animation loop
 */
const animate = () => {
  animationId = requestAnimationFrame(animate);

  if (model) {
    // Rotazione automatica leggera
    model.rotation.y += 0.002;
  }

  renderer.render(scene, camera);
};

/**
 * Resize handler
 */
const onResize = () => {
  if (!modelContainerRef.value || !camera || !renderer) return;

  const width = modelContainerRef.value.clientWidth;
  const height = modelContainerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

/**
 * Cleanup Three.js
 */
const cleanupThreeJS = () => {
  if (animationId) cancelAnimationFrame(animationId);

  window.removeEventListener('resize', onResize);

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
};

/**
 * Navigation helpers
 */
const scrollToContact = () => {
  emit('navigate', { index: 6, sectionId: 'contatti' });
};

const scrollToManifesto = () => {
  emit('navigate', { index: 1, sectionId: 'manifesto' });
};
</script>

<style scoped>
.kiba-hero-spa {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.kiba-hero-content {
  padding-right: 40px;
}

.kiba-hero-label {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(201, 76, 76, 0.15);
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--kiba-primary, #c94c4c);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.kiba-hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 24px;
}

.kiba-text-gradient {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.kiba-hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 32px;
  max-width: 500px;
}

.kiba-hero-cta {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.kiba-btn {
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

/* Focus state for accessibility - no white flash */
.kiba-btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(201, 76, 76, 0.4);
}

.kiba-btn-primary {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(201, 76, 76, 0.3);
}

.kiba-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(201, 76, 76, 0.4);
}

.kiba-btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(201, 76, 76, 0.3);
}

.kiba-btn-outline {
  background: transparent;
  color: var(--kiba-text-main, #f0f0f0);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.kiba-btn-outline:hover {
  border-color: var(--kiba-primary, #c94c4c);
  color: var(--kiba-primary, #c94c4c);
}

.kiba-btn-outline:active {
  background: rgba(201, 76, 76, 0.1);
}

.kiba-btn-outline:focus-visible {
  border-color: var(--kiba-primary, #c94c4c);
  box-shadow: 0 0 0 3px rgba(201, 76, 76, 0.2);
}

.kiba-hero-stats {
  display: flex;
  gap: 40px;
}

.kiba-stat {
  display: flex;
  flex-direction: column;
}

.kiba-stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--kiba-primary, #c94c4c);
}

.kiba-stat-label {
  font-size: 0.8125rem;
  color: var(--kiba-text-muted, #888);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kiba-hero-model {
  width: 100%;
  height: 500px;
  position: relative;
}

.kiba-model-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.kiba-model-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--kiba-primary, #c94c4c);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.kiba-hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--kiba-text-muted, #888);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@media (max-width: 1199px) {
  .kiba-hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 991px) {
  .kiba-hero-content {
    text-align: center;
    padding-right: 0;
  }

  .kiba-hero-title {
    font-size: 2.5rem;
  }

  .kiba-hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .kiba-hero-cta {
    justify-content: center;
  }

  .kiba-hero-stats {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .kiba-hero-title {
    font-size: 2rem;
  }

  .kiba-hero-cta {
    flex-direction: column;
    align-items: center;
  }

  .kiba-hero-stats {
    flex-wrap: wrap;
    gap: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .kiba-hero-scroll {
    animation: none;
  }

  .kiba-model-spinner {
    animation: none;
    border-top-color: var(--kiba-primary, #c94c4c);
  }
}
</style>
