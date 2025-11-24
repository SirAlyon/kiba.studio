<template>
  <!--
    KibaTechStack.vue
    Sezione stack tecnologico di Kiba.Studio
    Mostra le tecnologie principali utilizzate
  -->
  <section id="tecnologie" class="kiba-section kiba-section-dark">
    <div class="container">
      <!-- Titolo sezione -->
      <div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s">
        <div class="kiba-label">{{ $t('stack.label') }}</div>
        <h2 class="kiba-heading-lg">
          {{ $t('stack.title') }}
        </h2>
        <p class="kiba-subtitle">
          {{ $t('stack.subtitle') }}
        </p>
      </div>

      <!-- Categorie di tecnologie -->
      <div class="row">
        <!-- Frontend -->
        <div class="col-lg-4 mb-4">
          <div class="kiba-tech-category wow fadeInUp" data-wow-delay=".2s">
            <h3 class="kiba-heading-sm mb-20">
              <i class="fas fa-palette kiba-text-primary me-2"></i>
              {{ $t('stack.category_frontend') }}
            </h3>
            <div class="kiba-tech-tags">
              <span
                v-for="tech in frontendTech"
                :key="tech"
                class="kiba-tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="col-lg-4 mb-4">
          <div class="kiba-tech-category wow fadeInUp" data-wow-delay=".3s">
            <h3 class="kiba-heading-sm mb-20">
              <i class="fas fa-database kiba-text-primary me-2"></i>
              {{ $t('stack.category_backend') }}
            </h3>
            <div class="kiba-tech-tags">
              <span
                v-for="tech in backendTech"
                :key="tech"
                class="kiba-tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- DevOps / Infra -->
        <div class="col-lg-4 mb-4">
          <div class="kiba-tech-category wow fadeInUp" data-wow-delay=".4s">
            <h3 class="kiba-heading-sm mb-20">
              <i class="fas fa-cogs kiba-text-primary me-2"></i>
              {{ $t('stack.category_database') }}
            </h3>
            <div class="kiba-tech-tags">
              <span
                v-for="tech in devopsTech"
                :key="tech"
                class="kiba-tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Nota -->
      <div class="text-center mt-40 wow fadeInUp" data-wow-delay=".5s">
        <p class="kiba-body">
          <i class="fas fa-graduation-cap kiba-text-primary me-2"></i>
          <strong>Apprendimento continuo:</strong> il mondo tech evolve
          rapidamente. Investiamo costantemente nel miglioramento delle nostre
          competenze per offrirti sempre le soluzioni più moderne e affidabili.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Liste di tecnologie (facilmente aggiornabili)
const frontendTech = ref([
  'Vue.js',
  'Nuxt',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'HTML5',
  'CSS3',
  'SCSS',
  'Tailwind CSS',
  'Three.js',
  'PWA'
]);

const backendTech = ref([
  'Node.js',
  'Express',
  'NestJS',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  'Prisma',
  'TypeORM'
]);

const devopsTech = ref([
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'GitLab CI',
  'Nginx',
  'Linux',
  'AWS',
  'DigitalOcean',
  'Vercel',
  'Cloudflare',
  'Prometheus',
  'Grafana'
]);
</script>

<style scoped>
.kiba-tech-category {
  background: var(--kiba-bg-surface);
  padding: 30px;
  border-radius: var(--kiba-radius-lg);
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
