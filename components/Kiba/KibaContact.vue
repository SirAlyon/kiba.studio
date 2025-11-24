<template>
  <!--
    KibaContact.vue
    Sezione CTA finale e form di contatto
    Invita a contattare Kiba.Studio per consulenze o progetti
  -->
  <section id="contatti" class="kiba-section kiba-section-dark">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Box contatto principale -->
          <div class="kiba-contact-box wow fadeInUp" data-wow-delay=".2s">
            <!-- Titolo -->
            <div class="kiba-label mb-15">{{ $t('contact.label') }}</div>
            <h2 class="kiba-heading-lg">
              {{ $t('contact.title') }}
            </h2>
            <div class="kiba-divider kiba-divider-center"></div>

            <p class="kiba-subtitle mt-20">
              {{ $t('contact.subtitle') }}
            </p>

            <!-- Form di contatto -->
            <form
              class="kiba-contact-form mt-40"
              @submit.prevent="handleSubmit"
            >
              <div class="row">
                <div class="col-md-6 mb-20">
                  <input
                    v-model="form.name"
                    type="text"
                    class="kiba-input"
                    :placeholder="$t('contact.form_name_placeholder')"
                    required
                  />
                </div>
                <div class="col-md-6 mb-20">
                  <input
                    v-model="form.email"
                    type="email"
                    class="kiba-input"
                    :placeholder="$t('contact.form_email_placeholder')"
                    required
                  />
                </div>
              </div>

              <div class="mb-20">
                <input
                  v-model="form.subject"
                  type="text"
                  class="kiba-input"
                  :placeholder="$t('contact.form_company_placeholder')"
                />
              </div>

              <div class="mb-20">
                <textarea
                  v-model="form.message"
                  class="kiba-input"
                  :placeholder="$t('contact.form_message_placeholder')"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="kiba-btn kiba-btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">
                  <i class="fas fa-paper-plane me-2"></i>
                  {{ $t('contact.form_submit_button') }}
                </span>
                <span v-else>
                  <i class="fas fa-spinner fa-spin me-2"></i>
                  {{ $t('contact.form_submitting') }}
                </span>
              </button>
            </form>

            <!-- Messaggio di successo -->
            <div v-if="submitSuccess" class="kiba-success-message mt-20">
              <i class="fas fa-check-circle me-2"></i>
              {{ $t('contact.form_success') }}
            </div>

            <!-- Info aggiuntive -->
            <div class="kiba-contact-info mt-40">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <div class="kiba-contact-info-item">
                    <i class="fas fa-envelope kiba-text-primary"></i>
                    <span>info@kiba.studio</span>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="kiba-contact-info-item">
                    <i class="fas fa-clock kiba-text-primary"></i>
                    <span>{{ $t('contact.info_response_time') }}</span>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="kiba-contact-info-item">
                    <i class="fas fa-handshake kiba-text-primary"></i>
                    <span>{{ $t('contact.info_consultation') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Nota per piccoli progetti -->
            <p class="kiba-small mt-30">
              <i class="fas fa-lightbulb kiba-text-primary me-2"></i>
              <strong>Anche per piccoli progetti:</strong> non esitare a
              contattarci anche per progetti pilota o consulenze brevi. Ogni
              collaborazione inizia con una conversazione.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Form state
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);

/**
 * Gestisce l'invio del form
 * TODO: Implementare invio reale via API o servizio email
 */
const handleSubmit = async () => {
  isSubmitting.value = true;

  // Simula invio (da sostituire con logica reale)
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';

    submitSuccess.value = true;

    // Nascondi messaggio dopo 5 secondi
    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error('Errore invio form:', error);
    // TODO: Gestire errore con messaggio utente
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.kiba-contact-form {
  text-align: left;
}

.kiba-contact-info {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
}

.kiba-contact-info-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--kiba-text-secondary);
}

.kiba-contact-info-item i {
  font-size: 1.25rem;
  margin-right: 10px;
}

.kiba-success-message {
  background: rgba(40, 167, 69, 0.1);
  border: 1px solid rgba(40, 167, 69, 0.3);
  padding: 15px;
  border-radius: var(--kiba-radius-md);
  color: #28a745;
  text-align: center;
}

@media (max-width: 767px) {
  .kiba-contact-info-item {
    font-size: 0.875rem;
  }
}
</style>
