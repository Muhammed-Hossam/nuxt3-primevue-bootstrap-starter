// middleware/auth.global.ts

import { useGlobalStore } from '@/stores/global'; // Adjust the path to your Pinia store

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const localePath = useLocalePath();


  if (import.meta.client) {
    if (authStore.isAuth) {
      return navigateTo(localePath('/'));
    }
  }


});
