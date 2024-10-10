<template>
  <div class="form-group">
    <label :for="name" class="mb-2" :style="{ color: labelColor }">{{ label }}</label>
    <span v-if="subLabel" class="sub-label ms-1" :style="{ color: subLabelColor }">{{ subLabel }}</span>
    <div class="input-wrapper position-relative">

      <template v-if="readonly">
        <input 
          :value="value"
          :type="type" 
          :name="name"
          readonly
          class="form-input form-control w-100"
          :style="inputStyle" 
        />
      </template>

      <template v-else>
        <Field
          v-model="modelValue"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          :rules="validationSchema"
          validate-on-input
          v-slot="{ field, errorMessage }"
        >
          <input 
            v-bind="field"
            :type="type" 
            :name="name" 
            :placeholder="placeholder" 
            class="form-input form-control w-100"
            :class="{ 'is-invalid': errorMessage }"
            :style="inputStyle" 
          />
    
          <!-- Display validation error message -->
          <span v-if="errorMessage" class="error-message position-absolute text-danger" :class="localeDir">{{ errorMessage }}</span>
        </Field>
      </template>

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
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  subLabel: {
    type: String,
    required: false
  },
  labelColor: {
    type: String,
    required: false
  },
  subLabelColor: {
    type: String,
    required: false,
    default: '#AEAEAE'
  },
  placeholder: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  inputHeight: {
    type: String,
    default: '64px'
  },
  borderRadius: {
    type: String,
    default: '32px'
  },
  inputFontSize: {
    type: String,
    required: false
  },
  inputColor: {
    type: String,
    required: false
  },
  borderColor: {
    type: String,
    required: false
  },
  inputFontWeight: {
    type: String,
    required: false
  },
  inputBgColor: {
    type: String,
    default: '#F0F0F0'
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  value: {
    type: String,
    required: false
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

const inputStyle = computed(() => {
  return {
    'height': props.inputHeight, 
    'borderRadius': props.borderRadius, 
    'backgroundColor': props.inputBgColor,
    'fontSize': props.inputFontSize,
    'color': props.inputColor,
    'fontWeight': props.inputFontWeight,
    'borderColor': props.borderColor,
    'padding-inline-start': props.icon ? '57px' : '28px',
  }
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

  .sub-label {
    font-size: 14px;
    font-weight: 400;
  }

  .input-wrapper {
    input {
      // padding-inline-start: 57px;

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