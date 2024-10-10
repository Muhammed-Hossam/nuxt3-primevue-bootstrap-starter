<template>
  <NuxtLoadingIndicator color="#46BFB8" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
const { locale, locales, setLocale } = useI18n();
const authStore = useAuthStore();

onMounted(() => {
  authStore.getUserData()

  watchEffect(() => {
    document.documentElement.lang = locale.value;
    console.log('locale ==> ', locale.value);
  })
})

</script>


<style lang="scss">
// for adding a space between the dialog and the body on mobile as a container
@media screen and (max-width: $screen-lg) {
  .p-dialog {
    width: 95% !important;
  }
}
</style>