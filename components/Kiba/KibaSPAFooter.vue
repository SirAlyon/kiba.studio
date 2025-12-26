<template>
  <!--
    KibaSPAFooter.vue
    Footer finale con logo, contatti e copyright
  -->
  <div class="kiba-footer-spa">
    <div class="container">
      <!-- Logo e Payoff -->
      <div class="kiba-footer-brand">
        <div class="kiba-footer-logo">
          <KibaIcon :size="48" variant="default" :animated="false" />
        </div>
        <h3 class="kiba-footer-name">Kiba.Studio</h3>
        <p class="kiba-footer-payoff">
          {{ $t('footer.description') }}
        </p>
      </div>

      <!-- Links e Contatti -->
      <div class="kiba-footer-content">
        <div class="row">
          <!-- Colonna Servizi -->
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <h4 class="kiba-footer-title">{{ $t('nav.services') }}</h4>
            <ul class="kiba-footer-links">
              <li><a href="#servizi">Web Development</a></li>
              <li><a href="#servizi">App Mobile</a></li>
              <li><a href="#servizi">API & Backend</a></li>
              <li><a href="#servizi">{{ $t('services.consulting_title') }}</a></li>
            </ul>
          </div>

          <!-- Colonna Azienda -->
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <h4 class="kiba-footer-title">{{ $t('footer.quick_links_title') }}</h4>
            <ul class="kiba-footer-links">
              <li><a href="#manifesto">{{ $t('nav.about') }}</a></li>
              <li><a href="#processo">{{ $t('nav.process') }}</a></li>
              <li><a href="#stack">{{ $t('nav.stack') }}</a></li>
              <li><a href="#portfolio">{{ $t('nav.portfolio') }}</a></li>
            </ul>
          </div>

          <!-- Colonna Privacy -->
          <div class="col-md-3 col-6">
            <h4 class="kiba-footer-title">Privacy First</h4>
            <ul class="kiba-footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR Compliance</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>

          <!-- Colonna Contatti -->
          <div class="col-md-3 col-6">
            <h4 class="kiba-footer-title">{{ $t('footer.contact_title') }}</h4>
            <div class="kiba-footer-contact">
              <a href="mailto:info@kiba.studio" class="kiba-footer-email">
                <i class="fas fa-envelope"></i>
                info@kiba.studio
              </a>
              <div class="kiba-footer-social">
                <a href="#" aria-label="GitHub">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="kiba-footer-divider"></div>

      <!-- Copyright e Legal -->
      <div class="kiba-footer-bottom">
        <p class="kiba-footer-copyright">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
        <p class="kiba-footer-legal">
          P.IVA 00000000000 | {{ $t('footer.made_with') }}
          <span class="kiba-footer-heart">♥</span> e rispetto per la privacy
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import KibaIcon from './KibaIcon.vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.kiba-footer-spa {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: var(--kiba-bg-dark, #1a1a1a);
  position: relative;
  padding: 60px 0;
}

.kiba-footer-spa::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--kiba-primary, #c94c4c),
    transparent
  );
  opacity: 0.3;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

/* Brand Section */
.kiba-footer-brand {
  text-align: center;
  margin-bottom: 60px;
}

.kiba-footer-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 50%;
  margin-bottom: 20px;
}

.kiba-footer-name {
  font-size: 2rem;
  font-weight: 800;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.kiba-footer-payoff {
  font-size: 1.125rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 400px;
  margin: 0 auto;
}

/* Content Section */
.kiba-footer-content {
  margin-bottom: 60px;
}

.kiba-footer-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-primary, #c94c4c);
  margin-bottom: 20px;
}

.kiba-footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.kiba-footer-links li {
  margin-bottom: 12px;
}

.kiba-footer-links a {
  color: var(--kiba-text-secondary, #b0b0b0);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.3s ease;
}

.kiba-footer-links a:hover {
  color: var(--kiba-text-main, #f0f0f0);
}

/* Contact Section */
.kiba-footer-email {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--kiba-text-main, #f0f0f0);
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 16px;
  transition: color 0.3s ease;
}

.kiba-footer-email:hover {
  color: var(--kiba-primary, #c94c4c);
}

.kiba-footer-social {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.kiba-footer-social a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 1.125rem;
  transition: all 0.3s ease;
}

.kiba-footer-social a:hover {
  background: rgba(201, 76, 76, 0.2);
  color: var(--kiba-primary, #c94c4c);
  transform: translateY(-3px);
}

/* Divider */
.kiba-footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 40px 0;
}

/* Bottom Section */
.kiba-footer-bottom {
  text-align: center;
}

.kiba-footer-copyright {
  font-size: 0.875rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 8px;
}

.kiba-footer-legal {
  font-size: 0.8125rem;
  color: var(--kiba-text-muted, #888);
}

.kiba-footer-heart {
  color: var(--kiba-primary, #c94c4c);
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 991px) {
  .kiba-footer-spa {
    padding: 70px 0 60px;
  }

  .kiba-footer-name {
    font-size: 1.75rem;
  }

  .kiba-footer-payoff {
    font-size: 1.0625rem;
  }
}

@media (max-width: 767px) {
  .kiba-footer-spa {
    /* RESET mobile - no flexbox centering */
    display: block;
    padding: 60px 0 40px;
    min-height: auto;
  }

  .kiba-footer-brand {
    margin-bottom: 40px;
  }

  .kiba-footer-name {
    font-size: 1.5rem;
  }

  .kiba-footer-payoff {
    font-size: 1rem;
    line-height: 1.6;
  }

  .kiba-footer-content {
    text-align: center;
    margin-bottom: 40px;
  }

  .kiba-footer-title {
    margin-top: 20px;
    font-size: 0.8125rem;
  }

  .kiba-footer-links a {
    font-size: 0.875rem;
  }

  .kiba-footer-social {
    justify-content: center;
  }

  .kiba-footer-email {
    font-size: 0.9375rem;
  }
}
</style>