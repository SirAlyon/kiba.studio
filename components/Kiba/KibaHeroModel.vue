<template>
  <!--
    KibaHeroModel.vue
    Componente Three.js con scroll-linked interactions

    Features:
    - Caricamento asincrono del modello GLB
    - Rotazioni progressive legate allo scroll (max 25°)
    - Variazioni morbide della camera
    - Easing cubic-bezier professionale
    - Ottimizzazione performance per mobile
    - Fallback statico in caso di errore
  -->
  <div ref="containerRef" class="kiba-model-container">
    <!-- Canvas Three.js viene montato qui -->
    <div v-if="isLoading" class="kiba-model-loading">
      <div class="kiba-model-spinner"></div>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <!-- Fallback in caso di errore -->
    <div v-if="hasError" class="kiba-model-fallback">
      <div class="kiba-model-fallback-icon">
        <i class="fas fa-shield-alt"></i>
      </div>
      <p>Kiba.Studio</p>
      <span class="kiba-model-fallback-subtitle">{{ $t('footer.description') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Refs
const containerRef = ref(null);
const isLoading = ref(true);
const hasError = ref(false);

// Three.js instances
let scene, camera, renderer, model, animationId;

// Scroll tracking
let currentScrollY = 0;
let targetRotationY = 0;
let targetRotationX = 0;
let targetCameraZ = 5;
let isMobile = false;

// Easing helper - cubic bezier approx
const lerp = (start, end, factor) => start + (end - start) * factor;

onMounted(async () => {
  // Detect mobile per ottimizzazioni
  isMobile = window.innerWidth < 992 || /Android|iPhone|iPad/i.test(navigator.userAgent);

  try {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

    initThreeScene(THREE, GLTFLoader);
  } catch (error) {
    console.error('Errore nel caricamento di Three.js:', error);
    hasError.value = true;
    isLoading.value = false;
  }
});

/**
 * Inizializza la scena Three.js con ottimizzazioni per performance
 */
function initThreeScene(THREE, GLTFLoader) {
  if (!containerRef.value) return;

  const container = containerRef.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  // === SCENA ===
  scene = new THREE.Scene();
  scene.background = null;

  // === CAMERA ===
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // === RENDERER con ottimizzazioni ===
  renderer = new THREE.WebGLRenderer({
    antialias: !isMobile, // Disabilita antialias su mobile per performance
    alpha: true,
    powerPreference: isMobile ? 'low-power' : 'high-performance'
  });

  renderer.setSize(width, height);
  // Limita pixel ratio per performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Disabilita shadow map su mobile
  if (!isMobile) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  container.appendChild(renderer.domElement);

  // === ILLUMINAZIONE ottimizzata ===
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(5, 5, 5);
  if (!isMobile) directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Luce accent con colore brand
  const accentLight = new THREE.DirectionalLight(0xc94c4c, 0.4);
  accentLight.position.set(-3, 2, -3);
  scene.add(accentLight);

  // Luce crema dal basso
  const warmLight = new THREE.DirectionalLight(0xf5e6d3, 0.25);
  warmLight.position.set(0, -3, 2);
  scene.add(warmLight);

  // === CARICAMENTO MODELLO ===
  const loader = new GLTFLoader();

  loader.load(
    '/models/model.glb',
    (gltf) => {
      model = gltf.scene;

      // Centra e scala il modello
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      model.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      model.scale.setScalar(scale);

      // Abilita ombre solo su desktop
      if (!isMobile) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      }

      scene.add(model);
      isLoading.value = false;

      // Avvia animazione
      animate();
    },
    undefined,
    (error) => {
      console.error('Errore caricamento modello:', error);
      hasError.value = true;
      isLoading.value = false;
    }
  );

  // === EVENT LISTENERS ===
  window.addEventListener('resize', onWindowResize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * Gestisce scroll per animazioni linked
 * Rotazioni max 25° come richiesto
 */
function onScroll() {
  currentScrollY = window.scrollY;
  const maxScroll = window.innerHeight * 0.8; // Prima sezione

  // Calcola progresso scroll (0-1)
  const scrollProgress = Math.min(currentScrollY / maxScroll, 1);

  // Target rotazioni (max 25° = 0.436 radianti)
  // Easing: cubic-bezier come scrollProgress^2 per smoothness
  const easedProgress = scrollProgress * scrollProgress;

  targetRotationY = easedProgress * 0.436; // 25° su Y
  targetRotationX = easedProgress * 0.174; // 10° su X (più sottile)

  // Camera zoom out leggero
  targetCameraZ = 5 + (easedProgress * 1.5);
}

/**
 * Loop di animazione con interpolazione fluida
 */
function animate() {
  animationId = requestAnimationFrame(animate);

  if (model) {
    // Interpolazione fluida per rotazioni (easing)
    const lerpFactor = 0.08; // Più basso = più smooth

    // Rotazione base + scroll-linked
    model.rotation.y = lerp(model.rotation.y, targetRotationY, lerpFactor);
    model.rotation.x = lerp(model.rotation.x, targetRotationX, lerpFactor);

    // Aggiunge rotazione automatica molto leggera
    model.rotation.y += 0.002;
  }

  if (camera) {
    // Camera zoom fluido
    camera.position.z = lerp(camera.position.z, targetCameraZ, 0.05);
  }

  renderer.render(scene, camera);
}

/**
 * Gestisce resize della finestra
 */
function onWindowResize() {
  if (!containerRef.value || !camera || !renderer) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

  // Re-check mobile status
  isMobile = window.innerWidth < 992;
}

// Cleanup completo
onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('scroll', onScroll);

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
});
</script>

<style scoped>
.kiba-model-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kiba-model-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.kiba-model-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--kiba-text-secondary);
}

.kiba-model-spinner {
  width: 40px;
  height: 40px;
  border: 2px solid var(--kiba-bg-elevated);
  border-top-color: var(--kiba-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.kiba-model-fallback {
  text-align: center;
  color: var(--kiba-text-muted);
  padding: 40px;
}

.kiba-model-fallback-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  color: var(--kiba-primary);
  animation: kibaPulse 3s ease-in-out infinite;
}

@keyframes kibaPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

.kiba-model-fallback p {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--kiba-text-main);
  margin: 0;
}

.kiba-model-fallback-subtitle {
  font-size: 0.875rem;
  color: var(--kiba-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 8px;
  display: block;
}

/* Riduce animazioni su dispositivi che preferiscono meno movimento */
@media (prefers-reduced-motion: reduce) {
  .kiba-model-spinner {
    animation: none;
    border-top-color: var(--kiba-primary);
  }

  .kiba-model-fallback-icon {
    animation: none;
  }
}
</style>
