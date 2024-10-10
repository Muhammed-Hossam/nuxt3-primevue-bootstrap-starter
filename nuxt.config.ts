import { NuxtLink } from './.nuxt/components.d';
import Lara from "@primevue/themes/lara";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  runtimeConfig: {
    public: {
      api_base_url: 'https://backend.ctva.org.sa/api'
    }
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: 'Tabouk',
      htmlAttrs: {
        lang: 'ar'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'fixxel' },
        { name: 'google', content: 'notranslate' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    baseURL: '/',
  },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@vee-validate/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' },
    { src: '~/plugins/VueGoogleMaps.client.js', mode: 'client' },
  ],
  pinia: {
    autoImports: ['defineStore']
  },
  primevue: {
    options: {
      zIndex: {
        modal: 3000
      },
      ripple: true,
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '' // for disable dark mode
        }
      }
    }
  },
  googleFonts: {
    families: {
      Cairo: [400, 500, 600, 700],
    }
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
        dir: 'ltr',
      },
      {
        code: 'ar',
        iso: 'ar-SA',
        file: 'ar.json',
        name: 'العربية',
        dir: 'rtl',
      },
    ],
    langDir: 'locales/',
    lazy: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'ar',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
  css: [
    "bootstrap/dist/css/bootstrap.rtl.css",
    "bootstrap/dist/css/bootstrap.min.css",
    // "primevue/themes/lara-light-green/theme.css",
    "primeicons/primeicons.css",
    // "/node_modules/primeflex/primeflex.css",
    "~/assets/scss/main.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_variables.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
          `,
        }
      }
    }
  },
  experimental: {
    defaults: {
      nuxtLink: {
        componentName: 'NuxtLink',
        activeClass: 'router-link-active',
        exactActiveClass: 'router-link-exact-active',
      }
    }
  }
})