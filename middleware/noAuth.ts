// middleware/auth.global.ts

import { useGlobalStore } from '@/stores/global'; // Adjust the path to your Pinia store

export default defineNuxtRouteMiddleware((to, from) => {
  const globalStore = useGlobalStore();
  const authStore = useAuthStore();
  const localePath = useLocalePath();
  
  // Check if the user is trying to access restricted routes
  // and the user is not authenticated
  if (!authStore.isAuth) {
    // Show login dialog instead of allowing access
    globalStore.setLoginDialogVisible(true);

    // Optionally redirect the user to a different page (e.g., homepage)
    return navigateTo(localePath('/'));
  }

});
