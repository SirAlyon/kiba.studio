<template>
  <!--
    KibaSPAContact.vue
    Sezione Contatti con form e informazioni
  -->
  <div class="kiba-contact-spa">
    <div class="container">
      <div class="text-center mb-5">
        <div class="kiba-section-label gsap-animate">Contatti</div>
        <h2 class="kiba-section-title gsap-animate">
          Iniziamo a<br />
          <span class="kiba-text-gradient">parlare</span>
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          Raccontaci il tuo progetto. Nessun impegno, solo una conversazione onesta.
        </p>
      </div>

      <div class="row">
        <!-- Contact Form -->
        <div class="col-lg-7 mb-4 mb-lg-0">
          <div class="kiba-contact-form-wrapper gsap-animate">
            <form @submit.prevent="submitForm" class="kiba-contact-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="kiba-form-label">Nome *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="kiba-form-input"
                    required
                    placeholder="Il tuo nome"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="kiba-form-label">Email *</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="kiba-form-input"
                    required
                    placeholder="email@esempio.com"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="company" class="kiba-form-label">Azienda</label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="kiba-form-input"
                  placeholder="Nome azienda (opzionale)"
                />
              </div>

              <div class="mb-3">
                <label for="budget" class="kiba-form-label">Budget indicativo</label>
                <select id="budget" v-model="form.budget" class="kiba-form-select">
                  <option value="">Seleziona un range</option>
                  <option value="5k-10k">€5.000 - €10.000</option>
                  <option value="10k-25k">€10.000 - €25.000</option>
                  <option value="25k-50k">€25.000 - €50.000</option>
                  <option value="50k+">€50.000+</option>
                  <option value="discuss">Da discutere</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="message" class="kiba-form-label">Messaggio *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="kiba-form-textarea"
                  required
                  rows="5"
                  placeholder="Descrivi il tuo progetto, esigenze, timeline..."
                ></textarea>
              </div>

              <div class="kiba-form-privacy mb-4">
                <input
                  id="privacy"
                  v-model="form.privacy"
                  type="checkbox"
                  required
                  class="kiba-form-checkbox"
                />
                <label for="privacy">
                  Acconsento al trattamento dei dati personali secondo la
                  <a href="#" class="kiba-link">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                class="kiba-btn kiba-btn-primary kiba-btn-block"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">
                  Invia messaggio
                  <i class="fas fa-paper-plane ms-2"></i>
                </span>
                <span v-else>
                  Invio in corso...
                  <i class="fas fa-spinner fa-spin ms-2"></i>
                </span>
              </button>

              <!-- Success message -->
              <div v-if="submitSuccess" class="kiba-form-success">
                <i class="fas fa-check-circle"></i>
                Messaggio inviato! Ti risponderemo entro 24 ore.
              </div>
            </form>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-5">
          <div class="kiba-contact-info gsap-animate">
            <div class="kiba-contact-info-item">
              <div class="kiba-contact-info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="kiba-contact-info-content">
                <h4>Email</h4>
                <a href="mailto:info@kiba.studio">info@kiba.studio</a>
              </div>
            </div>

            <div class="kiba-contact-info-item">
              <div class="kiba-contact-info-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="kiba-contact-info-content">
                <h4>Risposta</h4>
                <p>Entro 24 ore lavorative</p>
              </div>
            </div>

            <div class="kiba-contact-info-item">
              <div class="kiba-contact-info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="kiba-contact-info-content">
                <h4>Location</h4>
                <p>Italia - Lavoriamo in remoto</p>
              </div>
            </div>

            <!-- Values reminder -->
            <div class="kiba-contact-values">
              <h4>I nostri valori</h4>
              <div class="kiba-contact-value">
                <i class="fas fa-shield-alt"></i>
                <span>Privacy dei tuoi dati garantita</span>
              </div>
              <div class="kiba-contact-value">
                <i class="fas fa-handshake"></i>
                <span>Nessun impegno per la consulenza iniziale</span>
              </div>
              <div class="kiba-contact-value">
                <i class="fas fa-file-contract"></i>
                <span>Preventivo dettagliato e trasparente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  company: '',
  budget: '',
  message: '',
  privacy: false
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Reset form
  Object.assign(form, {
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    privacy: false
  });

  isSubmitting.value = false;
  submitSuccess.value = true;

  // Hide success message after 5s
  setTimeout(() => {
    submitSuccess.value = false;
  }, 5000);
};
</script>

<style scoped>
.kiba-contact-spa {
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

.kiba-contact-form-wrapper {
  background: var(--kiba-bg-dark, #1a1a1a);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.kiba-form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 8px;
}

.kiba-form-input,
.kiba-form-select,
.kiba-form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: var(--kiba-bg-surface, #2d2d2d);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--kiba-text-main, #f0f0f0);
  font-size: 0.9375rem;
  transition: border-color 0.3s ease;
}

.kiba-form-input:focus,
.kiba-form-select:focus,
.kiba-form-textarea:focus {
  outline: none;
  border-color: var(--kiba-primary, #c94c4c);
}

.kiba-form-input::placeholder,
.kiba-form-textarea::placeholder {
  color: var(--kiba-text-muted, #888);
}

.kiba-form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  padding-right: 40px;
}

.kiba-form-textarea {
  resize: vertical;
  min-height: 120px;
}

.kiba-form-privacy {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.kiba-form-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--kiba-primary, #c94c4c);
}

.kiba-link {
  color: var(--kiba-primary, #c94c4c);
  text-decoration: none;
}

.kiba-link:hover {
  text-decoration: underline;
}

.kiba-btn {
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}

.kiba-btn-primary {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(201, 76, 76, 0.3);
}

.kiba-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(201, 76, 76, 0.4);
}

.kiba-btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.kiba-btn-block {
  width: 100%;
}

.kiba-form-success {
  margin-top: 16px;
  padding: 12px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  color: #4caf50;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  gap: 10px;
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

@media (max-width: 767px) {
  .kiba-section-title {
    font-size: 2rem;
  }

  .kiba-contact-form-wrapper,
  .kiba-contact-info {
    padding: 24px;
  }
}
</style>
