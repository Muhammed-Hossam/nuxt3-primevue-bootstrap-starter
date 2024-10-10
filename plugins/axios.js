import axios from 'axios'
import { useAuthStore } from '~/stores/auth'  // Import the Pinia store

export default defineNuxtPlugin((nuxtApp) => {
  const { $i18n } = nuxtApp

  const baseURL = useRuntimeConfig().public.api_base_url
  const instance = axios.create({ baseURL })

  // Access the auth store (Pinia)
  const authStore = useAuthStore()

  instance.defaults.headers['lang'] = $i18n.locale.value;

  // Apply the token to Axios headers if it exists in the store
  if (authStore.token) {
    instance.defaults.headers['Authorization'] = `Bearer ${authStore.token}`
  }

  // if ()

  // Axios request interceptor to always use the latest token from the store
  instance.interceptors.request.use((config) => {
    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`
    } else {
      delete config.headers['Authorization'] // Remove token if it doesn't exist
    }
    return config
  })

  // Watch for locale changes to update the 'lang' header reactively
  nuxtApp.hook('i18n:localeChanged', (newLocale) => {
    console.log('locale changed...');
    instance.defaults.headers['lang'] = newLocale;
  })

  return {
    provide: {
      axios: instance,
    },
  }
})
