<template>
  <!--
    KibaContactForm.vue
    Form di contatto unificato, condiviso fra:
      - KibaSPAContact.vue (sezione home)
      - pages/contatti.vue (pagina dedicata)
    Tutta la copy è in i18n. Invio reale via POST /api/contact con
    honeypot, timing check e validazione client a complemento del server.
  -->
  <form class="kiba-contact-form" @submit.prevent="submitForm" novalidate>
    <!-- Honeypot anti-bot: invisibile agli umani, non focusabile -->
    <div class="kiba-hp" aria-hidden="true">
      <label for="website">{{ $t('contact.form_honeypot_label') }}</label>
      <input
        id="website"
        v-model="form.website"
        type="text"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <div class="kiba-form-row">
      <div class="kiba-form-field">
        <label for="kiba-name" class="kiba-form-label">{{ $t('contact.form_name_label') }}</label>
        <input
          id="kiba-name"
          v-model="form.name"
          type="text"
          class="kiba-form-input"
          required
          autocomplete="name"
          :placeholder="$t('contact.form_name_placeholder')"
        />
      </div>
      <div class="kiba-form-field">
        <label for="kiba-email" class="kiba-form-label">{{ $t('contact.form_email_label') }}</label>
        <input
          id="kiba-email"
          v-model="form.email"
          type="email"
          class="kiba-form-input"
          required
          autocomplete="email"
          :placeholder="$t('contact.form_email_placeholder')"
        />
      </div>
    </div>

    <div class="kiba-form-field">
      <label for="kiba-company" class="kiba-form-label">{{ $t('contact.form_company_label') }}</label>
      <input
        id="kiba-company"
        v-model="form.company"
        type="text"
        class="kiba-form-input"
        autocomplete="organization"
        :placeholder="$t('contact.form_company_placeholder')"
      />
    </div>

    <div class="kiba-form-field">
      <label for="kiba-budget" class="kiba-form-label">{{ $t('contact.form_budget_label') }}</label>
      <select id="kiba-budget" v-model="form.budget" class="kiba-form-select">
        <option value="">{{ $t('contact.form_budget_default') }}</option>
        <option value="5k-10k">€5.000 - €10.000</option>
        <option value="10k-25k">€10.000 - €25.000</option>
        <option value="25k-50k">€25.000 - €50.000</option>
        <option value="50k+">€50.000+</option>
        <option value="discuss">{{ $t('contact.form_budget_discuss') }}</option>
      </select>
    </div>

    <div class="kiba-form-field">
      <label for="kiba-message" class="kiba-form-label">{{ $t('contact.form_message_label') }}</label>
      <textarea
        id="kiba-message"
        v-model="form.message"
        class="kiba-form-textarea"
        required
        rows="5"
        :placeholder="$t('contact.form_message_placeholder')"
      ></textarea>
    </div>

    <div class="kiba-form-privacy">
      <input
        id="kiba-privacy"
        v-model="form.privacy"
        type="checkbox"
        required
        class="kiba-form-checkbox"
      />
      <label for="kiba-privacy">
        {{ $t('contact.form_privacy_consent_prefix') }}<NuxtLink to="/privacy" class="kiba-link">{{ $t('contact.form_privacy_consent_link') }}</NuxtLink>.
      </label>
    </div>

    <button
      type="submit"
      class="kiba-btn kiba-btn-primary kiba-btn-block"
      :disabled="isSubmitting"
    >
      <span v-if="!isSubmitting">
        {{ $t('contact.form_submit_button') }}
        <i class="fas fa-paper-plane" aria-hidden="true"></i>
      </span>
      <span v-else>
        {{ $t('contact.form_submitting') }}
        <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
      </span>
    </button>

    <div
      v-if="submitSuccess"
      class="kiba-form-feedback kiba-form-feedback--success"
      role="status"
    >
      <i class="fas fa-check-circle" aria-hidden="true"></i>
      <span>{{ $t('contact.form_success') }}</span>
    </div>

    <div
      v-if="submitError"
      class="kiba-form-feedback kiba-form-feedback--error"
      role="alert"
    >
      <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
      <span>{{ submitError }}</span>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = reactive({
  name: '',
  email: '',
  company: '',
  budget: '',
  message: '',
  privacy: false,
  website: '' // honeypot
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref('');
const renderedAt = ref(0);

onMounted(() => {
  renderedAt.value = Date.now();
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resetForm = () => {
  Object.assign(form, {
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    privacy: false,
    website: ''
  });
};

const submitForm = async () => {
  submitError.value = '';
  submitSuccess.value = false;

  if (
    form.name.trim().length < 2 ||
    !EMAIL_RE.test(form.email.trim()) ||
    form.message.trim().length < 10 ||
    !form.privacy
  ) {
    submitError.value = t('contact.form_error_validation');
    return;
  }

  isSubmitting.value = true;
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        company: form.company,
        budget: form.budget,
        message: form.message,
        privacy: form.privacy,
        website: form.website,
        _ts: renderedAt.value
      }
    });

    resetForm();
    renderedAt.value = Date.now();
    submitSuccess.value = true;
    setTimeout(() => {
      submitSuccess.value = false;
    }, 6000);
  } catch (err) {
    const status = err?.response?.status || err?.statusCode || err?.status;
    if (status === 422) {
      submitError.value = t('contact.form_error_validation');
    } else if (status === 429) {
      submitError.value = t('contact.form_error_rate');
    } else {
      submitError.value = t('contact.form_error_generic');
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.kiba-contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.kiba-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.kiba-form-field {
  display: flex;
  flex-direction: column;
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
  font-family: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.kiba-form-input:focus,
.kiba-form-select:focus,
.kiba-form-textarea:focus {
  outline: none;
  border-color: var(--kiba-primary, #c94c4c);
  background: rgba(45, 45, 45, 0.8);
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
  min-height: 130px;
}

.kiba-form-privacy {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.5;
}

.kiba-form-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--kiba-primary, #c94c4c);
  flex-shrink: 0;
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
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  transform: none;
}

.kiba-btn-block {
  width: 100%;
  margin-top: 4px;
}

.kiba-form-feedback {
  margin-top: 4px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.9375rem;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.5;
}

.kiba-form-feedback i {
  margin-top: 3px;
  flex-shrink: 0;
}

.kiba-form-feedback--success {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.kiba-form-feedback--error {
  background: rgba(201, 76, 76, 0.12);
  color: #e07a7a;
}

/* Honeypot: fuori dallo schermo, non focusabile */
.kiba-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

@media (max-width: 640px) {
  .kiba-form-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .kiba-form-label {
    font-size: 0.8125rem;
  }

  .kiba-form-input,
  .kiba-form-select,
  .kiba-form-textarea {
    padding: 11px 14px;
    font-size: 0.9rem;
  }

  .kiba-form-textarea {
    min-height: 110px;
  }

  .kiba-form-privacy {
    font-size: 0.8125rem;
  }

  .kiba-btn {
    padding: 12px 20px;
    font-size: 0.9375rem;
  }
}
</style>
