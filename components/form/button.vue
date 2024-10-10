<template>
<div class="form-button w-100"> 
  <Button :type="type" :icon="icon" :loading="loading" :outlined="outlined" loading-icon="pi-spinner" :disabled="disabled" class="w-100" @click.prevent="$emit('triggerClick')" :style="buttonStyle">
    <span v-if="!loading">{{ text }}</span>
    <span v-else class="loader"></span>
  </Button>
</div>
</template>


<script setup>
import Button from 'primevue/button';

const emit = defineEmits(['triggerClick']);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'button'
  },
  icon: {
    type: String,
    required: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: '64px'
  },
  borderRadius: {
    type: String,
    default: '32px'
  },
  bgColor: {
    type: String,
    default: '#46BFB8'
  },
  color: {
    type: String,
    default: '#FCFCFC'
  },
  outlined: {
    type: Boolean,
    default: false
  }
})

const buttonStyle = computed(() => {
  return {
    height: props.height,
    borderRadius: props.borderRadius,
    backgroundColor: props.bgColor,
    borderColor: props.bgColor,
    fontSize: '16px',
    fontWeight: 700,
    color: props.color
  }
})
</script>


<style lang="scss" scoped>

.loader {
  width: 24px;
  height: 24px;
  border: 4px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>