<template>
  <div class="no-data-wrapper d-flex flex-column align-items-center gap-5 mt-5">
    <img v-if="!hideImg" src="@/assets/imgs/no-data-img.svg" class="no-data__img w-100" alt="no-data" />
    <h1 class="no-data__heading w-100 text-center">{{ text }}</h1>
  </div>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  hideImg: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.no-data__heading {
  font-size: 32px;
  font-weight: 700;
  color: #AEAEAE;
}

.no-data__img {
  max-width: 470px;
  height: 478px;
}
</style>