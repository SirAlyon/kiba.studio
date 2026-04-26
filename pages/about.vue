<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.about.hero_eyebrow')"
      :title="$t('pages.about.hero_title')"
      :subtitle="$t('pages.about.hero_subtitle')"
    />

    <KibaPageSection>
      <div class="about-intro">
        <h2>{{ $t('pages.about.intro_title') }}</h2>
        <p>{{ $t('pages.about.intro_p1') }}</p>
        <p>{{ $t('pages.about.intro_p2') }}</p>
      </div>
    </KibaPageSection>

    <KibaPageSection muted>
      <div class="team-block">
        <h2>{{ $t('pages.about.team_title') }}</h2>
        <p class="team-intro">{{ $t('pages.about.team_intro') }}</p>

        <div class="team-grid">
          <article
            v-for="member in team"
            :key="member.slug"
            class="team-card"
            :class="{
              'is-placeholder': member.isPlaceholder,
              'is-mascot': member.isMascot
            }"
          >
            <span v-if="member.isMascot" class="team-card-badge">
              <i class="fas fa-paw"></i>
              {{ $t('pages.about.mascot_badge') }}
            </span>

            <div class="team-card-photo">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="$t('pages.about.team_photo_alt', { name: $t(member.nameKey) })"
                loading="lazy"
                width="160"
                height="160"
              />
              <div v-else class="team-card-photo-placeholder" aria-hidden="true">
                <i :class="member.placeholderIcon || 'fas fa-user-plus'"></i>
              </div>
              <div class="team-card-photo-ring" aria-hidden="true"></div>
            </div>

            <div class="team-card-body">
              <h3>{{ $t(member.nameKey) }}</h3>
              <p class="team-card-role">{{ $t(member.roleKey) }}</p>
              <p class="team-card-bio">{{ $t(member.bioKey) }}</p>

              <ul v-if="member.skills && member.skills.length" class="team-card-skills">
                <li v-for="skill in member.skills" :key="skill">{{ skill }}</li>
              </ul>
              <ul v-else-if="member.skillsI18n && member.skillsI18n.length" class="team-card-skills">
                <li v-for="skillKey in member.skillsI18n" :key="skillKey">{{ $t(skillKey) }}</li>
              </ul>

              <div v-if="member.links && member.links.length" class="team-card-links">
                <a
                  v-for="link in member.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="$t('pages.about.team_member_link', { name: $t(member.nameKey), platform: link.label })"
                >
                  <i :class="link.icon"></i>
                </a>
              </div>
            </div>
          </article>
        </div>

        <p class="team-note">{{ $t('pages.about.team_note') }}</p>
      </div>
    </KibaPageSection>

    <KibaPageSection>
      <div class="values-block">
        <h2>{{ $t('pages.about.principles_title') }}</h2>
        <div class="values-grid">
          <div class="value-item">
            <div class="value-icon"><i class="fas fa-shield-halved"></i></div>
            <h3>{{ $t('pages.about.principles.privacy_title') }}</h3>
            <p>{{ $t('pages.about.principles.privacy_description') }}</p>
          </div>
          <div class="value-item">
            <div class="value-icon"><i class="fas fa-code"></i></div>
            <h3>{{ $t('pages.about.principles.code_title') }}</h3>
            <p>{{ $t('pages.about.principles.code_description') }}</p>
          </div>
          <div class="value-item">
            <div class="value-icon"><i class="fas fa-handshake"></i></div>
            <h3>{{ $t('pages.about.principles.honesty_title') }}</h3>
            <p>{{ $t('pages.about.principles.honesty_description') }}</p>
          </div>
          <div class="value-item">
            <div class="value-icon"><i class="fas fa-eye"></i></div>
            <h3>{{ $t('pages.about.principles.transparency_title') }}</h3>
            <p>{{ $t('pages.about.principles.transparency_description') }}</p>
          </div>
        </div>
      </div>
    </KibaPageSection>

    <KibaPageSection muted>
      <div class="cta-block">
        <h2>{{ $t('pages.about.cta_title') }}</h2>
        <p>{{ $t('pages.about.cta_subtitle') }}</p>
        <NuxtLink to="/contatti" class="kiba-page-cta">
          {{ $t('pages.about.cta_button') }}
          <i class="fas fa-arrow-right"></i>
        </NuxtLink>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const { t } = useI18n();

const team = [
  {
    slug: 'alessio-sada',
    nameKey: 'pages.about.team.alessio.name',
    roleKey: 'pages.about.team.alessio.role',
    bioKey: 'pages.about.team.alessio.bio',
    photo: '/team/alessio-sada.jpg',
    skills: ['Laravel', 'Vue / Nuxt', 'Node', 'Python', 'DevOps'],
    links: [
      { url: 'https://github.com/SirAlyon/', label: 'GitHub', icon: 'fab fa-github' },
      { url: 'https://www.linkedin.com/in/alessio-sada-a380a822a/', label: 'LinkedIn', icon: 'fab fa-linkedin' }
    ]
  },
  {
    slug: 'placeholder-1',
    nameKey: 'pages.about.team.placeholder_name',
    roleKey: 'pages.about.team.placeholder_role',
    bioKey: 'pages.about.team.placeholder_1_bio',
    photo: null,
    placeholderIcon: 'fas fa-user-plus',
    isPlaceholder: true
  },
  {
    slug: 'kiba',
    nameKey: 'pages.about.team.kiba.name',
    roleKey: 'pages.about.team.kiba.role',
    bioKey: 'pages.about.team.kiba.bio',
    photo: '/team/kiba.jpg',
    skillsI18n: [
      'pages.about.team.kiba.skill_1',
      'pages.about.team.kiba.skill_2',
      'pages.about.team.kiba.skill_3',
      'pages.about.team.kiba.skill_4'
    ],
    isMascot: true
  }
];

const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/about`;

useHead(() => ({
  title: `${t('pages.about.hero_eyebrow')} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t('pages.about.meta_description') },
    { hid: 'og:title', property: 'og:title', content: `${t('pages.about.hero_eyebrow')} — Kiba.Studio` },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>

<style scoped>
.about-intro {
  max-width: 760px;
}

.about-intro h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 20px;
}

.about-intro p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 18px;
}

.team-block h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.team-intro {
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 32px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 28px;
}

.team-card {
  padding: 32px 28px 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  text-align: center;
  transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
}

.team-card:hover:not(.is-placeholder) {
  border-color: rgba(201, 76, 76, 0.3);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.04);
}

.team-card.is-placeholder {
  border-style: dashed;
  border-color: rgba(255, 255, 255, 0.1);
  background: transparent;
}

/* Mascotte: card con vibrazione "calda", badge in alto a destra */
.team-card.is-mascot {
  position: relative;
  background:
    radial-gradient(ellipse at top, rgba(245, 230, 211, 0.04), transparent 60%),
    rgba(255, 255, 255, 0.03);
  border-color: rgba(245, 230, 211, 0.15);
}

.team-card.is-mascot:hover {
  border-color: rgba(245, 230, 211, 0.35);
}

.team-card.is-mascot .team-card-photo {
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.4), rgba(201, 76, 76, 0.2));
}

.team-card.is-mascot .team-card-role {
  color: var(--kiba-secondary, #f5e6d3);
}

.team-card-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(245, 230, 211, 0.12);
  border: 1px solid rgba(245, 230, 211, 0.25);
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-secondary, #f5e6d3);
}

.team-card-badge i {
  font-size: 0.625rem;
}

/* Standard foto Kiba.Studio: cerchio con ring brand-color */
.team-card-photo {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 24px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, rgba(201, 76, 76, 0.4), rgba(224, 102, 102, 0.15));
}

.team-card.is-placeholder .team-card-photo {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
}

.team-card-photo img,
.team-card-photo-placeholder {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--kiba-bg-dark, #1a1a1a);
}

.team-card-photo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--kiba-text-muted, #666);
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
}

.team-card-photo-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px dashed rgba(201, 76, 76, 0.25);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.team-card:hover:not(.is-placeholder) .team-card-photo-ring {
  opacity: 1;
  transform: rotate(45deg);
}

.team-card-body h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--kiba-text-main, #e8e8e8);
}

.team-card-role {
  font-size: 0.875rem;
  color: var(--kiba-primary, #c94c4c);
  margin: 0 0 14px;
  font-weight: 500;
}

.team-card-bio {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 20px;
}

.team-card-skills {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.team-card-skills li {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.team-card-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.team-card-links a {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: var(--kiba-text-secondary, #b0b0b0);
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.team-card-links a:hover {
  background: rgba(201, 76, 76, 0.18);
  color: var(--kiba-primary, #c94c4c);
}

.team-note {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  font-style: italic;
  margin: 24px 0 0;
}

.values-block h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 32px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.value-item {
  padding: 28px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
}

.value-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  margin-bottom: 14px;
}

.value-item h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--kiba-text-main, #e8e8e8);
}

.value-item p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0;
}

.cta-block {
  text-align: center;
  max-width: 620px;
  margin: 0 auto;
}

.cta-block h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.cta-block p {
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 24px;
}

.kiba-page-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
}
</style>
