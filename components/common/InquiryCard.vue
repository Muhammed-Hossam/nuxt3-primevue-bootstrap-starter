<template>
  <div class="inquiry-card d-flex flex-column flex-column-reverse flex-lg-row">
    <div class="form-wrapper d-flex justify-content-center align-items-center py-4 py-lg-0 w-100 w-lg-50">
      <slot></slot>
    </div>
    <div class="logo-wrapper d-flex justify-content-center align-items-center w-100 w-lg-50 my-auto my-lg-none">
      <img src="@/assets/imgs/tabok-logo-xl.png" class="d-none d-lg-block" width="299px" height="183.53px" alt="logo" />
      <img src="@/assets/imgs/tabok-logo-xl.png" class="d-lg-none" width="100px" height="100px" alt="logo" />
    </div>
  </div>
</template>

<script  setup>

</script>

<style lang="scss" scoped>
.inquiry-card {
  max-width: 1064px;
  min-height: 725px;
  border-radius: 12px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;

  .form-wrapper {
    border-radius: 12px;
    background-color: #46BFB8;
    box-shadow: 0px 4px 40px 0px #00000014;
    padding-inline: 20px;
  }

}
</style>