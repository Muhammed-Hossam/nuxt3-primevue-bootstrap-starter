<template>
  <div class="form-group">
    <label :for="name" class="mb-2" :style="{ color: labelColor }">{{ label }}</label>
    <div class="textarea-wrapper position-relative">

      <Field
        v-model="modelValue"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :rules="validationSchema"
        validate-on-input
        v-slot="{ field, errorMessage }"
      >
      <textarea 
        v-bind="field" 
        :name="name" 
        :rows="rows"
        :placeholder="placeholder" 
        class="form-control w-100"
        :class="{ 'is-invalid': errorMessage }"
        :style="{ borderRadius: borderRadius, backgroundColor: inputBgColor }" 
      />

      <!-- Display validation error message -->
      <span v-if="errorMessage" class="error-message position-absolute text-danger" :class="localeDir">{{ errorMessage }}</span>
    </Field>

      <img v-if="icon" :src="icon" alt="icon" class="input-icon position-absolute top-50" :class="localeDir" />
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  rows: {
    type: Number,
    required: false,
    default: 3
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  labelColor: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  borderRadius: {
    type: String,
    default: '8px'
  },
  inputBgColor: {
    type: String,
    default: '#F0F0F0'
  },
  validationSchema: {
    type: Object,
    required: false,
    default: () => yup.string().required('This field is required')
  }
})

const { locale } = useI18n();

const localeDir = computed(() => {
  return locale.value === 'en' ? 'ltr' : 'rtl';
})

const modelValue = defineModel('modelValue')
</script>

<style lang="scss" scoped>
.form-group {
  width: 100%;

  label {
    font-size: 14px;
    font-weight: 400;
    color: #1E1E1E;
  }

  .textarea-wrapper {
    textarea {
      padding-inline-start: 30px;

      &::placeholder {
        font-size: 16px;
        font-weight: 600;
        color: #AEAEAE;
      }
    }

    .input-icon {
      &.rtl {
        right: 1rem;
        transform: translate(-50%,-50%)!important;
      }

      &.ltr {
        left: 1rem;
        transform: translate(50%,-50%)!important;
      }
    }

    .error-message {
      position: absolute;
      bottom: 3px;

      &.rtl {
        left: 22px;
      }

      &.ltr {
        right: 22px;
      }
    }
  }

}
</style>