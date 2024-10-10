<template>
  <div>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4268 6V10" :stroke="isActive ? secActiveColor : inActiveColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M7.91699 19C8.5734 20.7478 10.3446 22 12.4265 22C12.6715 22 12.9122 21.9827 13.1472 21.9492M16.936 19C16.6683 19.7126 16.2154 20.3428 15.6317 20.8393" :stroke="isActive ? activeColor : inActiveColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M9.52805 2.67414C10.4066 2.24187 11.3894 2 12.4267 2C16.162 2 19.1901 5.13623 19.1901 9.00497V9.70957C19.1901 10.5552 19.4317 11.3818 19.8846 12.0854L20.9944 13.8095C22.008 15.3843 21.2342 17.5249 19.4712 18.0229C14.8591 19.3257 9.99432 19.3257 5.38223 18.0229C3.61921 17.5249 2.84536 15.3843 3.85902 13.8095L4.9688 12.0854C5.42167 11.3818 5.66333 10.5552 5.66333 9.70957V9.00497C5.66333 7.93058 5.89686 6.91269 6.31422 6.00277" :stroke="isActive ? activeColor : inActiveColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
    isActive: {
      type: Boolean,
      default: false
    }
})

const activeColor = '#613592';
const secActiveColor = '#46BFB8';
const inActiveColor = '#C3C3C3';
</script>

<style>

</style>