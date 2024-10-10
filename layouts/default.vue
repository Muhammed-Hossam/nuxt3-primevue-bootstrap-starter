<template>
  <div>
    <LayoutHeader />
    <Toast />
    <main>
      <AuthLoginDialog />
      <AuthVerficationCodeDialog />
      <AuthLogoutDialog />
      <AppLoadingScreen v-if="globalStore.loadingScreenVisible" />

      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>


<script setup>
const globalStore = useGlobalStore();

import { useToast } from "primevue/usetoast";
const toast = useToast();

const isToastVisible = toRef(globalStore, "toastVisible");


watch(isToastVisible, (newValue) => {
  if (newValue) {
    toast.add(
      { 
        severity: globalStore.toastMsg.type, 
        summary: globalStore.toastMsg.summary, 
        detail: globalStore.toastMsg.message, 
        life: globalStore.toastMsg.time 
      }
  );
  }
})

</script>


<style lang="scss" scoped>
main {
  padding-top: 32px;
}
</style>