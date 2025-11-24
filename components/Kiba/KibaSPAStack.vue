<template>
  <!--
    KibaSPAStack.vue
    Sezione Tech Stack - Tecnologie utilizzate
    Grid di tech con hover effects
  -->
  <div class="kiba-stack-spa">
    <div class="container">
      <div class="text-center mb-5">
        <div class="kiba-section-label gsap-animate">{{ $t('stack.label') }}</div>
        <h2 class="kiba-section-title gsap-animate">
          {{ $t('stack.title') }}
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          {{ $t('stack.subtitle') }}
        </p>
      </div>

      <!-- Tech Categories -->
      <div class="row">
        <div
          v-for="category in techStack"
          :key="category.name"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div class="kiba-stack-category gsap-animate">
            <div class="kiba-stack-category-header">
              <i :class="category.icon"></i>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="kiba-stack-tech-list">
              <div
                v-for="tech in category.technologies"
                :key="tech.name"
                class="kiba-stack-tech-item"
              >
                <div class="kiba-stack-tech-icon">
                  <i :class="tech.icon"></i>
                </div>
                <div class="kiba-stack-tech-info">
                  <span class="kiba-stack-tech-name">{{ tech.name }}</span>
                  <span class="kiba-stack-tech-level">{{ tech.level }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Skills -->
      <div class="kiba-stack-additional gsap-animate">
        <h4 class="kiba-stack-additional-title">{{ t('stack.additional_skills_title') || 'Competenze aggiuntive' }}</h4>
        <div class="kiba-stack-tags">
          <span
            v-for="skill in additionalSkills"
            :key="skill"
            class="kiba-stack-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const techStack = computed(() => [
  {
    name: t('stack.category_frontend'),
    icon: 'fas fa-desktop',
    technologies: [
      { name: 'Vue.js 3', icon: 'fab fa-vuejs', level: t('stack.level_expert') },
      { name: 'Nuxt 3', icon: 'fas fa-n', level: t('stack.level_expert') },
      { name: 'React', icon: 'fab fa-react', level: t('stack.level_advanced') },
      { name: 'TailwindCSS', icon: 'fas fa-wind', level: t('stack.level_expert') },
      { name: 'GSAP', icon: 'fas fa-magic', level: t('stack.level_advanced') }
    ]
  },
  {
    name: t('stack.category_backend'),
    icon: 'fas fa-server',
    technologies: [
      { name: 'Laravel', icon: 'fab fa-laravel', level: t('stack.level_expert') },
      { name: 'Node.js', icon: 'fab fa-node-js', level: t('stack.level_advanced') },
      { name: 'Python', icon: 'fab fa-python', level: t('stack.level_advanced') },
      { name: 'PHP', icon: 'fab fa-php', level: t('stack.level_expert') },
      { name: 'REST APIs', icon: 'fas fa-plug', level: t('stack.level_expert') }
    ]
  },
  {
    name: t('stack.category_database'),
    icon: 'fas fa-database',
    technologies: [
      { name: 'PostgreSQL', icon: 'fas fa-database', level: t('stack.level_expert') },
      { name: 'MySQL', icon: 'fas fa-database', level: t('stack.level_expert') },
      { name: 'Redis', icon: 'fas fa-memory', level: t('stack.level_advanced') },
      { name: 'Docker', icon: 'fab fa-docker', level: t('stack.level_advanced') },
      { name: 'Linux/Ubuntu', icon: 'fab fa-ubuntu', level: t('stack.level_expert') }
    ]
  }
]);

const additionalSkills = [
  'Git/GitHub',
  'CI/CD',
  'Nginx',
  'Apache',
  'SSL/TLS',
  'OAuth',
  'JWT',
  'WebSocket',
  'Three.js',
  'PWA',
  'SEO',
  'WCAG',
  'Agile',
  'Clean Code',
  'SOLID',
  'Design Patterns',
  'Security Best Practices',
  'Performance Optimization'
];
</script>

<style scoped>
.kiba-stack-spa {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 60px 0;
  overflow-y: auto;
}

.kiba-section-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--kiba-primary, #c94c4c);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
}

.kiba-section-title {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 16px;
}

.kiba-text-gradient {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.kiba-section-subtitle {
  font-size: 1.125rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 600px;
  margin: 0 auto;
}

.kiba-stack-category {
  background: var(--kiba-bg-dark, #1a1a1a);
  border-radius: 16px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  transition: border-color 0.3s ease;
}

.kiba-stack-category:hover {
  border-color: rgba(201, 76, 76, 0.3);
}

.kiba-stack-category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-stack-category-header i {
  font-size: 1.5rem;
  color: var(--kiba-primary, #c94c4c);
}

.kiba-stack-category-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0;
}

.kiba-stack-tech-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.kiba-stack-tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.kiba-stack-tech-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  font-size: 1.125rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.kiba-stack-tech-item:hover .kiba-stack-tech-icon {
  background: rgba(201, 76, 76, 0.1);
  color: var(--kiba-primary, #c94c4c);
}

.kiba-stack-tech-info {
  display: flex;
  flex-direction: column;
}

.kiba-stack-tech-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--kiba-text-main, #f0f0f0);
}

.kiba-stack-tech-level {
  font-size: 0.75rem;
  color: var(--kiba-text-muted, #888);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kiba-stack-additional {
  margin-top: 40px;
  text-align: center;
}

.kiba-stack-additional-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 20px;
}

.kiba-stack-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.kiba-stack-tag {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--kiba-text-secondary, #b0b0b0);
  transition: all 0.3s ease;
}

.kiba-stack-tag:hover {
  background: rgba(201, 76, 76, 0.1);
  color: var(--kiba-primary, #c94c4c);
}

@media (max-width: 767px) {
  .kiba-section-title {
    font-size: 2rem;
  }

  .kiba-stack-category {
    padding: 24px;
  }
}
</style>
