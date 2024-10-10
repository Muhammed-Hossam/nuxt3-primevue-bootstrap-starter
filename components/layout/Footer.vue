<template>
  <footer class="d-flex align-items-center py-5">
    <div class="container">
      <div class="row gap-4 gap-lg-0">
        <div class="col-12 col-lg-4">
          <div class="d-flex flex-column align-items-center gap-4">
            <!-- <img src="@/assets/imgs/footer-logo.png" width="188.21px" height="130px" alt="" lazy /> -->
            <img :src="logo" width="188.21px" height="130px" alt="" lazy />
            <p class="footer-text text-center">
              {{ footer.footer_desc }}
            </p>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="links-wrapper d-flex flex-column flex-lg-row justify-content-between gap-4 gap-lg-0">
            <div class="fast-links">
              <h5 class="footer-heading">{{ $t('footer.fast_links') }}</h5>

              <div class="d-flex flex-row flex-lg-column flex-wrap gap-4 mt-4">
                <NuxtLink :to="localePath('/')" class="footer-link d-flex align-items-center gap-2">
                  <SVGNavHome :isActive="true" />
                  {{ $t('nav.home') }}
                </NuxtLink>

                <NuxtLink :to="localePath('/favorite')" class="footer-link d-flex align-items-center gap-2">
                  <SVGNavFavorite :isActive="true" />
                  {{ $t('nav.favorite') }}
                </NuxtLink>

                <NuxtLink to="/notifications" class="footer-link d-flex align-items-center gap-2">
                  <SVGNavBell :isActive="true" />
                  {{ $t('nav.notifications') }}
                </NuxtLink>

                <NuxtLink to="/about" class="footer-link d-flex align-items-center gap-2">
                  <SVGNavAbout :isActive="true" />
                  {{ $t('nav.about') }}
                </NuxtLink>

                <NuxtLink to="/contact" class="footer-link d-flex align-items-center gap-2">
                  <SVGNavContact :isActive="true" />
                  {{ $t('nav.contact') }}
                </NuxtLink>
              </div>
            </div>

            <div class="categories">
              <h5 class="footer-heading">{{ $t('footer.categories') }}</h5>
              <div class="categories-links d-flex  flex-row flex-lg-column flex-wrap gap-4 mt-4">
                <NuxtLink v-for="(category, i) in categories" :key="i" :to="localePath(`/category/${category.id}`)" class="footer-link">{{ category.name }}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="contact-info d-flex flex-column align-items-start mx-0 mx-lg-auto">
            <h5 class="footer-heading w-100">{{ $t('footer.contact_info') }}</h5>

            <div class="contact-info__wrapper d-flex flex-column gap-3 mt-4 w-100">
              <div class="info-item d-flex align-items-center gap-2">
                <img src="@/assets/imgs/icons/call-calling.png" alt="call-calling" />
                <span style="direction: ltr;">{{ footer.site_phone }}</span>
              </div>

              <a :href="`mailto:${footer.site_email}`" class="info-item d-flex align-items-center gap-2">
                <img src="@/assets/imgs/icons/message-text.png" alt="message-text" />
                <span>{{ footer.site_email }}</span>
              </a>

              <div class="info-item d-flex align-items-center gap-2">
                <img src="@/assets/imgs/icons/location.png" alt="location" />
                <span>{{ footer.site_address }}</span>
              </div>
            </div>

            <div class="socials d-flex gap-3">
              <a v-for="(social, i) in socials" :key="i" :href="social.link" target="_blank" class="social-icon d-flex justify-content-center align-items-center">
                <img :src="social.icon" :alt="social.name" />
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { fetchAPI, data, status, msg, loading } = useFetchAPI();
const localePath = useLocalePath();

const socials = ref([]);
const footer = ref({});
const categories = ref([]);
const logo = ref("");

const getFooterData = async () => {

  await fetchAPI('footer');

  if (status.value === 'success') {
    socials.value = data.value.social;
    footer.value = data.value.footer;
    categories.value = data.value.categories;
    logo.value = data.value.logo;
  }

}

onMounted(() => {
  getFooterData();
})
</script>

<style lang="scss" scoped>
footer {
  min-height: 393px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;

  .footer-text {
    max-width: 307px;
  }

  .footer-heading {
    font-size: 24px;
    font-weight: 700;
    color: $sec-color;
  }

  .footer-link {
    font-size: 16px;
    font-weight: 600;
    color: #1E1E1E;
  }

  .contact-info {

    .info-item {
      font-size: 18px;
      font-weight: 700;
      color: #272727;
    }

    .socials {
      margin-top: 25px;
      
      .social-icon {
        width: 38.12px;
        height: 37px;
        border-radius: 7px;
        background-color: #FAFAFA;
        border: 1px solid #E6E6E6;
      }
    }
  }
}

@media screen and (min-width: $screen-lg) {
  .contact-info {
    // max-width: 296.08px;
    max-width: 300px;
    width: 100%;
  }
}
</style>