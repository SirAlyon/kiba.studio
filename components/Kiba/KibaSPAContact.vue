<template>
  <!--
    KibaSPAContact.vue
    Sezione Contatti della home: form condiviso (KibaContactForm) + info column.
  -->
  <div class="kiba-contact-spa">
    <div class="container">
      <div class="text-center mb-5">
        <div class="kiba-section-label gsap-animate">{{ $t('contact.label') }}</div>
        <h2 class="kiba-section-title gsap-animate">
          {{ $t('contact.title') }}
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <div class="row">
        <!-- Contact Form (condiviso) -->
        <div class="col-lg-7 mb-4 mb-lg-0">
          <div class="kiba-contact-form-wrapper gsap-animate">
            <KibaContactForm />
          </div>
        </div>

        <!-- Info column -->
        <div class="col-lg-5">
          <div class="kiba-contact-info gsap-animate">
            <div class="kiba-contact-info-item">
              <div class="kiba-contact-info-icon">
                <i class="fas fa-envelope" aria-hidden="true"></i>
              </div>
              <div class="kiba-contact-info-content">
                <h4>Email</h4>
                <a href="mailto:hello@kiba.studio">hello@kiba.studio</a>
              </div>
            </div>

            <div class="kiba-contact-info-item">
              <div class="kiba-contact-info-icon">
                <i class="fas fa-clock" aria-hidden="true"></i>
              </div>
              <div class="kiba-contact-info-content">
                <h4>{{ $t('contact.info_response_time') }}</h4>
                <p>{{ $t('contact.info_consultation') }}</p>
              </div>
            </div>

            <div class="kiba-contact-info-item">
              <div class="kiba-contact-info-icon">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
              </div>
              <div class="kiba-contact-info-content">
                <h4>Location</h4>
                <p>{{ $t('contact.info_location') }}</p>
              </div>
            </div>

            <div class="kiba-contact-values">
              <h4>{{ $t('contact.values_title') }}</h4>
              <div class="kiba-contact-value">
                <i class="fas fa-shield-alt" aria-hidden="true"></i>
                <span>{{ $t('contact.value_privacy') }}</span>
              </div>
              <div class="kiba-contact-value">
                <i class="fas fa-handshake" aria-hidden="true"></i>
                <span>{{ $t('contact.info_consultation') }}</span>
              </div>
              <div class="kiba-contact-value">
                <i class="fas fa-file-contract" aria-hidden="true"></i>
                <span>{{ $t('contact.value_transparent') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import KibaContactForm from './KibaContactForm.vue';
</script>

<style scoped>
.kiba-contact-spa {
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 40px 0;
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
  line-height: 1.3;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.kiba-section-subtitle {
  font-size: 1.125rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 600px;
  margin: 0 auto;
}

.kiba-contact-form-wrapper {
  background: var(--kiba-bg-dark, #1a1a1a);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-contact-info {
  background: var(--kiba-bg-dark, #1a1a1a);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
}

.kiba-contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.kiba-contact-info-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 12px;
  color: var(--kiba-primary, #c94c4c);
  font-size: 1.125rem;
  flex-shrink: 0;
}

.kiba-contact-info-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0 0 4px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.kiba-contact-info-content a,
.kiba-contact-info-content p {
  font-size: 0.9375rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0;
  text-decoration: none;
}

.kiba-contact-info-content a:hover {
  color: var(--kiba-primary, #c94c4c);
}

.kiba-contact-values {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-contact-values h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 16px;
}

.kiba-contact-value {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.kiba-contact-value i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 1rem;
}

@media (max-width: 991px) {
  .kiba-contact-spa {
    padding: 60px 0 40px;
  }

  .kiba-section-title {
    font-size: 2.25rem;
  }
}

@media (max-width: 767px) {
  .kiba-contact-spa {
    display: block;
    height: auto;
    min-height: auto;
    padding: 30px 0;
    overflow: visible;
  }

  .kiba-section-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .kiba-section-subtitle {
    font-size: 0.9375rem;
  }

  .kiba-contact-form-wrapper,
  .kiba-contact-info {
    padding: 20px;
  }

  .kiba-contact-info-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .kiba-contact-info-content h4 {
    font-size: 0.9375rem;
  }

  .kiba-contact-info-content a,
  .kiba-contact-info-content p {
    font-size: 0.875rem;
  }

  .kiba-contact-values h4 {
    font-size: 0.9375rem;
  }

  .kiba-contact-value {
    font-size: 0.8125rem;
  }
}
</style>
