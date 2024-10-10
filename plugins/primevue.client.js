// plugins/primevue.client.ts
import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'; // Ensure ToastService is imported
import Toast from 'primevue/toast'; // Import the Toast component

export default defineNuxtPlugin((nuxtApp) => {
  // Use PrimeVue and ToastService
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.use(ToastService);

  // Register the Toast component globally
  nuxtApp.vueApp.component('Toast', Toast);
});
