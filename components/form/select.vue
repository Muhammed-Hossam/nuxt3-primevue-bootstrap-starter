<template>
  <div class="form-group">
    <label :for="name" class="mb-2">{{ label }}</label>
    <div class="input-wrapper position-relative">


      <Select 
        v-model="modelValue"
        :name="name"
        :options="options"
        :optionLabel="optionLabel"
        :placeholder="placeholder" 
        class="form-select form-control w-100"
        :invalid="isInvalid"
        :style="{ height: inputHeight, borderRadius: borderRadius, backgroundColor: inputBgColor }" 
        @change="$emit('selectOption', modelValue)"
      />

      <img v-if="icon" :src="icon" alt="icon" class="input-icon position-absolute top-50" :class="localeDir" />
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup';
import Select from 'primevue/select';


const props = defineProps({
  // type: {
  //   type: String,
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  label: {
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
  inputHeight: {
    type: String,
    default: '64px'
  },
  borderRadius: {
    type: String,
    default: '32px'
  },
  inputBgColor: {
    type: String,
    default: '#F0F0F0'
  },
  validationSchema: {
    type: Object,
    required: false,
  },
  options: {
    type: Array,
    required: true
  },
  optionLabel: {
    type: String,
    required: true
  },
  activeOption: {
    type: Object,
    required: false,
  },
  isInvalid: {
    type: Boolean,
    required: false,
    default: false
  }
})

const { locale } = useI18n();

const localeDir = computed(() => {
  return locale.value === 'en' ? 'ltr' : 'rtl';
})

// const modelValue = defineModel('modelValue')
const modelValue = ref(null)

watch(() => props.activeOption, (newValue) => {
  if (newValue) {
    modelValue.value = newValue;
  }
})
</script>

<style lang="scss" scoped>
.form-group {
  width: 100%;

  label {
    font-size: 14px;
    font-weight: 400;
    color: #1E1E1E;
  }

  .input-wrapper {
    input {
      padding-inline-start: 57px;
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