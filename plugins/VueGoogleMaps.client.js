import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA",
      libraries: 'places', // Add necessary libraries
      language: 'ar', // Set language to Arabic
      // libraries: "places", 
    },
    autobindAllEvents: true,
  });
});
