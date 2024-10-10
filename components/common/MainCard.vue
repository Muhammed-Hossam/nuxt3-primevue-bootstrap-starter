<template>
  <div class="main-card">
    <div class="logo d-flex justify-content-center">
      <img src="@/assets/imgs/footer-logo.png" alt="tabouk-logo" />
    </div>

    <div class="heading-wrapper d-flex flex-column align-items-center gap-1">
      <h1 class="heading">{{ heading }}</h1>
      <p class="subheading">{{ subheading }}</p>
    </div>

    <slot></slot>

  </div>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: String,
    default: '',
    required: false
  },
  subheading: {
    type: String,
    default: '',
    required: false
  }

})
</script>

<style lang="scss" scoped>
.main-card {
  padding-inline: 64px;
  padding-top: 95px;
  padding-bottom: 64px;
  max-width: 718px;
  min-height: 694px;
  border-radius: 12px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;

  @media screen and (max-width: $screen-lg) {
    padding-inline: 32px;
  }

  .heading-wrapper {
      margin-top: 48px;

      .heading {
        font-size: 24px;
        font-weight: 700;
        color: #1E1E1E;
      }

      .subheading {
        margin-top: 4px;
        font-size: 14px;
        font-weight: 400;
        color: #828282;
      }
    }

}
</style>