<template>
  <div class="page-heading__wrapper">
    <div class="container h-100">
      <div class="row h-100">
        <div class="d-flex justify-content-between align-items-center h-100">
          <p class="page-heading">{{ heading }}</p>
  
          <slot name="pageHeadingContent"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.page-heading__wrapper {
  height: 109px;
  background-color: #EEFBFA;
  margin-bottom: 32px;

  .page-heading {
    font-size: 24px;
    font-weight: 700;
    color: $sec-color;
  }
}
</style>