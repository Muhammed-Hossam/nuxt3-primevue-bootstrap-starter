<template>
  <div class="loading-screen">
    <img src="@/assets/imgs/tabok-logo-xl.png" class="logo" alt="loading" />
  </div>
</template>

<script  setup>

</script>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  background-color: #fff;

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>