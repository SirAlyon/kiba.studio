<template>
  <!--
    KibaSPAStack.vue
    Sezione Stack — niente badge "expert/advanced", niente buzzword cloud.
    Per ogni tech: come la usiamo (use case), non quanto siamo bravi.
  -->
  <div class="kiba-stack-spa">
    <div class="container">
      <div class="kiba-stack-intro">
        <div class="kiba-section-label gsap-animate">{{ $t('stack.label') }}</div>
        <h2 class="kiba-section-title gsap-animate">
          {{ $t('stack.title') }}
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          {{ $t('stack.subtitle') }}
        </p>
      </div>

      <!-- Categorie stack -->
      <div class="kiba-stack-groups">
        <article
          v-for="category in techStack"
          :key="category.id"
          class="kiba-stack-group gsap-animate"
        >
          <header class="kiba-stack-group-header">
            <div class="kiba-stack-group-icon">
              <i :class="category.icon"></i>
            </div>
            <div>
              <h3 class="kiba-stack-group-title">{{ category.title }}</h3>
              <p class="kiba-stack-group-intro">{{ category.intro }}</p>
            </div>
          </header>

          <ul class="kiba-stack-tech-list">
            <li
              v-for="tech in category.technologies"
              :key="tech.name"
              class="kiba-stack-tech-item"
            >
              <span class="kiba-stack-tech-icon" aria-hidden="true">
                <i :class="tech.icon"></i>
              </span>
              <span class="kiba-stack-tech-body">
                <span class="kiba-stack-tech-name">{{ tech.name }}</span>
                <span class="kiba-stack-tech-use">{{ tech.use }}</span>
              </span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Principi: come scegliamo lo stack -->
      <section class="kiba-stack-principles gsap-animate" aria-labelledby="stack-principles-title">
        <h3 id="stack-principles-title" class="kiba-stack-principles-title">
          {{ $t('stack.principles_title') }}
        </h3>
        <div class="kiba-stack-principles-grid">
          <div
            v-for="principle in principles"
            :key="principle.key"
            class="kiba-stack-principle"
          >
            <h4 class="kiba-stack-principle-title">{{ principle.title }}</h4>
            <p class="kiba-stack-principle-description">{{ principle.description }}</p>
          </div>
        </div>
      </section>

      <p class="kiba-stack-footnote gsap-animate">{{ $t('stack.footnote') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const techStack = computed(() => [
  {
    id: 'frontend',
    icon: 'fas fa-display',
    title: t('stack.category_frontend_title'),
    intro: t('stack.category_frontend_intro'),
    technologies: [
      { name: 'Vue 3 / Nuxt 3', icon: 'fab fa-vuejs', use: t('stack.tech.nuxt_use') },
      { name: 'React', icon: 'fab fa-react', use: t('stack.tech.react_use') },
      { name: 'TailwindCSS', icon: 'fas fa-wind', use: t('stack.tech.tailwind_use') },
      { name: 'GSAP', icon: 'fas fa-wand-magic-sparkles', use: t('stack.tech.gsap_use') }
    ]
  },
  {
    id: 'backend',
    icon: 'fas fa-server',
    title: t('stack.category_backend_title'),
    intro: t('stack.category_backend_intro'),
    technologies: [
      { name: 'Laravel + Filament', icon: 'fab fa-laravel', use: t('stack.tech.laravel_use') },
      { name: 'Node.js', icon: 'fab fa-node-js', use: t('stack.tech.node_use') },
      { name: 'Python', icon: 'fab fa-python', use: t('stack.tech.python_use') },
      { name: 'REST APIs', icon: 'fas fa-code-branch', use: t('stack.tech.rest_use') }
    ]
  },
  {
    id: 'infra',
    icon: 'fas fa-database',
    title: t('stack.category_infra_title'),
    intro: t('stack.category_infra_intro'),
    technologies: [
      { name: 'PostgreSQL', icon: 'fas fa-database', use: t('stack.tech.postgres_use') },
      { name: 'MySQL', icon: 'fas fa-database', use: t('stack.tech.mysql_use') },
      { name: 'Redis', icon: 'fas fa-memory', use: t('stack.tech.redis_use') },
      { name: 'Docker', icon: 'fab fa-docker', use: t('stack.tech.docker_use') },
      { name: 'Linux (EU)', icon: 'fab fa-ubuntu', use: t('stack.tech.linux_use') }
    ]
  }
]);

const principles = computed(() => [
  {
    key: 'maturity',
    title: t('stack.principles.maturity_title'),
    description: t('stack.principles.maturity_description')
  },
  {
    key: 'ecosystem',
    title: t('stack.principles.ecosystem_title'),
    description: t('stack.principles.ecosystem_description')
  },
  {
    key: 'portable',
    title: t('stack.principles.portable_title'),
    description: t('stack.principles.portable_description')
  }
]);
</script>

<style scoped>
.kiba-stack-spa {
  width: 100%;
  padding: 40px 0;
}

.kiba-stack-intro {
  max-width: 760px;
  margin: 0 auto 56px;
  text-align: center;
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
  letter-spacing: -0.01em;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 18px;
}

.kiba-section-subtitle {
  font-size: 1.0625rem;
  line-height: 1.65;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 640px;
  margin: 0 auto;
}

/* Categorie */
.kiba-stack-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 64px;
}

.kiba-stack-group {
  background: var(--kiba-bg-dark, #1a1a1a);
  border-radius: 18px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.kiba-stack-group::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(201, 76, 76, 0.4) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.kiba-stack-group:hover {
  border-color: rgba(201, 76, 76, 0.25);
}

.kiba-stack-group:hover::before {
  opacity: 1;
}

.kiba-stack-group-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-stack-group-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.kiba-stack-group-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0 0 6px;
  line-height: 1.3;
}

.kiba-stack-group-intro {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #999);
  margin: 0;
  line-height: 1.55;
}

.kiba-stack-tech-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.kiba-stack-tech-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.kiba-stack-tech-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 9px;
  font-size: 1rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  flex-shrink: 0;
  transition: background 0.25s ease, color 0.25s ease;
}

.kiba-stack-tech-item:hover .kiba-stack-tech-icon {
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
}

.kiba-stack-tech-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.kiba-stack-tech-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  line-height: 1.3;
}

.kiba-stack-tech-use {
  font-size: 0.8125rem;
  color: var(--kiba-text-muted, #999);
  line-height: 1.5;
}

/* Principi */
.kiba-stack-principles {
  background: linear-gradient(180deg, rgba(201, 76, 76, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px 32px;
  margin-bottom: 28px;
}

.kiba-stack-principles-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--kiba-text-main, #f0f0f0);
  text-align: center;
  margin: 0 0 32px;
  letter-spacing: -0.005em;
}

.kiba-stack-principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
}

.kiba-stack-principle {
  position: relative;
  padding-left: 16px;
}

.kiba-stack-principle::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--kiba-primary, #c94c4c);
  border-radius: 2px;
  opacity: 0.6;
}

.kiba-stack-principle-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0 0 8px;
  line-height: 1.3;
}

.kiba-stack-principle-description {
  font-size: 0.9375rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.6;
  margin: 0;
}

.kiba-stack-footnote {
  text-align: center;
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  margin: 0;
  font-style: italic;
}

@media (max-width: 991px) {
  .kiba-stack-spa {
    padding: 60px 0 40px;
  }

  .kiba-section-title {
    font-size: 2.125rem;
  }

  .kiba-stack-intro {
    margin-bottom: 40px;
  }

  .kiba-stack-groups {
    margin-bottom: 48px;
  }
}

@media (max-width: 767px) {
  .kiba-stack-spa {
    padding: 30px 0;
  }

  .kiba-section-title {
    font-size: 1.625rem;
    line-height: 1.25;
  }

  .kiba-section-subtitle {
    font-size: 0.9375rem;
  }

  .kiba-stack-group {
    padding: 22px;
  }

  .kiba-stack-group-header {
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  .kiba-stack-group-icon {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }

  .kiba-stack-group-title {
    font-size: 1.0625rem;
  }

  .kiba-stack-group-intro {
    font-size: 0.8125rem;
  }

  .kiba-stack-tech-list {
    gap: 14px;
  }

  .kiba-stack-tech-icon {
    width: 32px;
    height: 32px;
    font-size: 0.9375rem;
  }

  .kiba-stack-tech-name {
    font-size: 0.9rem;
  }

  .kiba-stack-tech-use {
    font-size: 0.78125rem;
  }

  .kiba-stack-principles {
    padding: 28px 22px;
    border-radius: 16px;
  }

  .kiba-stack-principles-title {
    font-size: 1.1875rem;
    margin-bottom: 24px;
  }

  .kiba-stack-principles-grid {
    gap: 22px;
  }

  .kiba-stack-principle-title {
    font-size: 0.9375rem;
  }

  .kiba-stack-principle-description {
    font-size: 0.875rem;
  }
}
</style>
