<template>
  <!--
    KibaSPAManifesto.vue
    Sezione Manifesto - Chi è Kiba.Studio
    Valori etici e filosofia aziendale
  -->
  <div class="kiba-manifesto-spa">
    <div class="container">
      <div class="row align-items-center">
        <!-- Colonna Visual -->
        <div class="col-lg-5 mb-5 mb-lg-0">
          <div class="kiba-manifesto-visual gsap-animate">
            <div class="kiba-manifesto-card">
              <div class="kiba-manifesto-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3 class="kiba-manifesto-brand">Kiba</h3>
              <p class="kiba-manifesto-meaning">
                {{ $t('manifesto.kiba_meaning') }}
              </p>
              <div class="kiba-manifesto-divider"></div>

              <!-- Core values -->
              <div class="kiba-manifesto-values">
                <div class="kiba-value">
                  <i class="fas fa-lock"></i>
                  <span>{{ $t('manifesto.value_privacy') }}</span>
                </div>
                <div class="kiba-value">
                  <i class="fas fa-code"></i>
                  <span>{{ $t('manifesto.value_code') }}</span>
                </div>
                <div class="kiba-value">
                  <i class="fas fa-infinity"></i>
                  <span>{{ $t('manifesto.value_solutions') }}</span>
                </div>
              </div>

              <div class="kiba-manifesto-years">
                <span class="kiba-years-number">{{ $t('manifesto.stat_years') }}</span>
                <span class="kiba-years-label">{{ $t('manifesto.stat_years_label') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonna Testo -->
        <div class="col-lg-7">
          <div class="kiba-manifesto-content">
            <div class="kiba-section-label gsap-animate">{{ $t('manifesto.label') }}</div>
            <h2 class="kiba-section-title gsap-animate">
              {{ $t('manifesto.title') }}
            </h2>
            <div class="kiba-section-divider gsap-animate"></div>

            <div class="kiba-manifesto-text gsap-animate">
              <p>{{ $t('manifesto.paragraph_1') }}</p>
              <p>{{ $t('manifesto.paragraph_2') }}</p>
              <p>{{ $t('manifesto.paragraph_3') }}</p>
            </div>

            <!-- Feature boxes -->
            <div class="row mt-4">
              <div class="col-md-6 gsap-animate">
                <div class="kiba-manifesto-feature">
                  <i class="fas fa-user-shield"></i>
                  <h4>{{ $t('manifesto.feature_privacy_title') }}</h4>
                  <p>{{ $t('manifesto.feature_privacy_description') }}</p>
                </div>
              </div>
              <div class="col-md-6 gsap-animate">
                <div class="kiba-manifesto-feature">
                  <i class="fas fa-hand-holding-heart"></i>
                  <h4>{{ $t('manifesto.feature_tech_title') }}</h4>
                  <p>{{ $t('manifesto.feature_tech_description') }}</p>
                </div>
              </div>
            </div>

            <!-- Target clients - Removed as not in translation keys -->
            <!-- <div class="kiba-manifesto-target gsap-animate">
              <strong>Clienti ideali:</strong> Start-up, PMI e professionisti
              che cercano qualità, sicurezza e affidabilità — non progetti
              "veloci e low-cost".
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No specific logic required
</script>

<style scoped>
.kiba-manifesto-spa {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* flex-start per evitare taglio titoli */
  padding: 40px 0 40px;
}

.kiba-manifesto-visual {
  position: relative;
}

.kiba-manifesto-card {
  background: var(--kiba-bg-dark, #1a1a1a);
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(201, 76, 76, 0.2);
}

.kiba-manifesto-icon {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-radius: 50%;
  margin: 0 auto 20px;
  font-size: 2.5rem;
  color: #ffffff;
}

.kiba-manifesto-brand {
  font-size: 2rem;
  font-weight: 700;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 16px;
}

.kiba-manifesto-meaning {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 20px;
}

.kiba-manifesto-divider {
  width: 60px;
  height: 3px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  margin: 0 auto 20px;
  border-radius: 3px;
}

.kiba-manifesto-values {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.kiba-value {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 0.9375rem;
}

.kiba-value i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 1rem;
}

.kiba-manifesto-years {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kiba-years-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--kiba-primary, #c94c4c);
  line-height: 1;
}

.kiba-years-label {
  font-size: 0.8125rem;
  color: var(--kiba-text-muted, #888);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 8px;
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
  margin-bottom: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.kiba-section-divider {
  width: 80px;
  height: 4px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-radius: 4px;
  margin-bottom: 24px;
}

.kiba-manifesto-text p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 16px;
}

.kiba-manifesto-text strong {
  color: var(--kiba-text-main, #f0f0f0);
}

.kiba-manifesto-feature {
  padding: 24px;
  background: var(--kiba-bg-dark, #1a1a1a);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
}

.kiba-manifesto-feature i {
  font-size: 1.5rem;
  color: var(--kiba-primary, #c94c4c);
  margin-bottom: 12px;
  display: block;
}

.kiba-manifesto-feature h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 8px;
}

.kiba-manifesto-feature p {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--kiba-text-muted, #888);
  margin: 0;
}

.kiba-manifesto-target {
  background: rgba(201, 76, 76, 0.08);
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 3px solid var(--kiba-primary, #c94c4c);
  font-size: 0.9375rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-top: 24px;
}

.kiba-manifesto-target strong {
  color: var(--kiba-text-main, #f0f0f0);
}

@media (max-width: 991px) {
  .kiba-manifesto-spa {
    padding: 60px 0 40px;
  }

  .kiba-manifesto-content {
    text-align: center;
  }

  .kiba-section-title {
    font-size: 2.25rem;
  }

  .kiba-section-divider {
    margin-left: auto;
    margin-right: auto;
  }

  .kiba-manifesto-feature {
    text-align: center;
  }

  .kiba-manifesto-target {
    text-align: left;
  }
}

@media (max-width: 767px) {
  .kiba-manifesto-spa {
    /* RESET mobile - no flexbox centering */
    display: block;
    height: auto;
    min-height: auto;
    padding: 30px 0;
  }

  .kiba-section-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .kiba-manifesto-card {
    padding: 24px;
  }

  .kiba-manifesto-icon {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }

  .kiba-manifesto-brand {
    font-size: 1.5rem;
  }

  .kiba-manifesto-meaning {
    font-size: 0.875rem;
  }

  .kiba-manifesto-text p {
    font-size: 0.9375rem;
  }

  .kiba-manifesto-feature {
    padding: 20px;
  }

  .kiba-manifesto-feature h4 {
    font-size: 1rem;
  }

  .kiba-manifesto-feature p {
    font-size: 0.8125rem;
  }
}
</style>
