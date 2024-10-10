<template>
  <div class="info-card d-flex flex-column align-items-center">
    <img src="@/assets/imgs/footer-logo.png" width="155.12px" height="106px" alt="footer-logo" />

    <div v-html="cardText" class="info-card__text text-center"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardText: {
    type: String,
    default: '',
    required: true
  }
})
</script>

<style class="scss" scoped>
.info-card {
  max-width: 956px;
  min-height: 622px;
  border-radius: 12px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;
  padding: 38px 67px;
  gap: 24px;

  @media screen and (max-width: 992px) {
    padding: 38px 32px !important;
  }

  .info-card__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 26.24px;
    color: #141414;
  }
}
</style>