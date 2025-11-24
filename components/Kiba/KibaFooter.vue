<template>
  <!--
    KibaFooter.vue
    Footer personalizzato per Kiba.Studio
    Info aziendali, link rapidi e copyright
  -->
  <footer class="kiba-footer">
    <div class="container">
      <div class="row">
        <!-- Colonna Brand -->
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="kiba-footer-brand">
            <a href="#" class="kiba-logo">
              Kiba<span>.</span>Studio
            </a>
            <p class="kiba-body mt-20">
              {{ $t('footer.description') }}
            </p>
            <div class="kiba-footer-social mt-20">
              <a
                href="https://github.com/kibastudio"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/company/kibastudio"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://twitter.com/kibastudio"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Colonna Link Rapidi -->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div class="kiba-footer-links">
            <h4 class="kiba-heading-sm mb-20">{{ $t('footer.quick_links_title') }}</h4>
            <ul>
              <li><a href="#chi-siamo">{{ $t('nav.about') }}</a></li>
              <li><a href="#servizi">{{ $t('nav.services') }}</a></li>
              <li><a href="#processo">{{ $t('nav.process') }}</a></li>
              <li><a href="#tecnologie">{{ $t('nav.stack') }}</a></li>
              <li><a href="#portfolio">{{ $t('nav.portfolio') }}</a></li>
              <li><a href="#contatti">{{ $t('nav.contact') }}</a></li>
            </ul>
          </div>
        </div>

        <!-- Colonna Contatti -->
        <div class="col-lg-4 col-md-6">
          <div class="kiba-footer-contact">
            <h4 class="kiba-heading-sm mb-20">{{ $t('footer.contact_title') }}</h4>
            <ul>
              <li>
                <i class="fas fa-envelope kiba-text-primary me-2"></i>
                <a href="mailto:info@kiba.studio">info@kiba.studio</a>
              </li>
              <li>
                <i class="fas fa-globe kiba-text-primary me-2"></i>
                <a href="https://kiba.studio" target="_blank">
                  www.kiba.studio
                </a>
              </li>
              <li>
                <i class="fas fa-map-marker-alt kiba-text-primary me-2"></i>
                <span>{{ $t('contact.info_location') }}</span>
              </li>
            </ul>

            <!-- Badge servizi -->
            <div class="kiba-footer-badges mt-20">
              <span class="kiba-badge">
                <i class="fas fa-check-circle me-1"></i>
                P.IVA Attiva
              </span>
              <span class="kiba-badge">
                <i class="fas fa-shield-alt me-1"></i>
                GDPR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="kiba-footer-bottom">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p class="mb-0">
              {{ $t('footer.copyright', { year: currentYear }) }}
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <p class="mb-0">
              {{ $t('footer.made_with') }} <i class="fas fa-heart kiba-text-primary"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.kiba-footer-brand .kiba-logo {
  font-size: 1.75rem;
  display: inline-block;
}

.kiba-footer-social {
  display: flex;
  gap: 12px;
}

.kiba-footer-social a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--kiba-bg-dark);
  border-radius: 50%;
  color: var(--kiba-text-secondary);
  font-size: 1rem;
  transition: var(--kiba-transition);
}

.kiba-footer-social a:hover {
  background: var(--kiba-primary);
  color: #ffffff;
  transform: translateY(-3px);
}

.kiba-footer-links ul,
.kiba-footer-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.kiba-footer-links li,
.kiba-footer-contact li {
  margin-bottom: 10px;
}

.kiba-footer-links a,
.kiba-footer-contact a,
.kiba-footer-contact span {
  color: var(--kiba-text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: var(--kiba-transition);
}

.kiba-footer-links a:hover,
.kiba-footer-contact a:hover {
  color: var(--kiba-primary);
}

.kiba-footer-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.kiba-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: rgba(201, 76, 76, 0.1);
  border: 1px solid rgba(201, 76, 76, 0.2);
  border-radius: var(--kiba-radius-sm);
  font-size: 0.75rem;
  color: var(--kiba-secondary);
}

.kiba-footer-bottom p {
  font-size: 0.875rem;
}

@media (max-width: 767px) {
  .kiba-footer-links,
  .kiba-footer-contact {
    text-align: center;
  }

  .kiba-footer-badges {
    justify-content: center;
  }
}
</style>
