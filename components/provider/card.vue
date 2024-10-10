<template>
  <div class="provider-card" @click="goToProvider">
    <div class="card-img__wrapper position-relative">
      <img :src="provider.image" class="card-img" alt="provider-img" />
      <button class="favorite-btn btn text-center d-flex justify-content-center align-items-center p-0 position-absolute rounded-circle" @click.stop="toggleFavorite">
        <span v-if="loading" class="toggle-fav__loader"></span>
        <SVGFavIcon v-else :isFav="provider.is_fav || isFavorited" />
      </button>
    </div>
    <div class="card-info d-flex flex-column p-1">
      <div class="rate d-flex align-items-center gap-1">
        <span class="rate-number">{{ provider?.avg_rate }}</span>
        <img src="@/assets/imgs/icons/star-icon-filled.png" alt="star-icon" />
      </div>

      <p class="card-title">{{ provider?.title }}</p>

      <div class="d-flex justify-content-between" style="gap: 3px;">
        <div class="provider-location d-flex align-items-center">
          <img src="@/assets/imgs/icons/map-marker-black.png" alt="map-marker" />
          <span class="location-text">{{ provider.map_desc }}</span>
        </div>

        <NuxtLink :to="localePath(`/provider/${provider?.id}`)" class="go-btn btn d-flex justify-content-center align-items-center p-0 rounded-circle" :class="localeDir">
          <img src="@/assets/imgs/icons/left-arrow-icon.svg" alt="left-arrow" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
/************************** composables **************************/ 
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const { fetchAPI, data, status, msg, loading } = useFetchAPI();
const { localeDir } = useLocaleDirection();


/************************** Emits & Props **************************/
const emit = defineEmits(['toggleFavorite']);

const props = defineProps({
  provider: {
    type: Object,
    Required: true
  },
  loading: {
    type: Boolean,
    Required: true
  }
})

/************************** Data **************************/
const isFavorited = ref(false);


const goToProvider = () => {
  router.push(localePath(`/provider/${props.provider?.id}`))
}

/************************** Methods **************************/
const toggleFavorite = async () => {

  if (!authStore.isAuth) {
    globalStore.showToast('error', 'Error', t('providers.login_to_fav_provider'), 3000);
    return;
  }

  const formData = new FormData();
  formData.append('provider_id', props.provider.id);

  await fetchAPI('toggle-favorite', 'POST', {
    body: formData
  })

  if (status.value === 'success') {
      globalStore.showToast('success', 'Success', msg.value, 3000);
      isFavorited.value = data.value.is_faved;
      emit('toggleFavorite', data.value.is_faved);
    }

    if (status.value === 'fail') {
      globalStore.showToast('error', 'Error', msg.value, 3000);
    }

}

</script>

<style lang="scss" scoped>
.provider-card {
  width: 305px;
  min-height: 349px;
  height: 100%;
  border-radius: 12px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;
  padding: 8px;
  cursor: pointer;

  .card-img__wrapper, .card-img {
    width: 100%;
    height: 240px;
    border-radius: 12px;
  }

  .card-img__wrapper {

    .favorite-btn {
      width: 40px;
      height: 40px;
      background-color: #FFFFFF;
      top: 12px;
      left: 12px;
    }
  }

  .card-info {
    margin-top: 14px;
    gap: 10px;

    .rate {
      .rate-number {
        font-size: 14px;
        font-weight: 400;
        color: #AEAEAE;
      }
    }

    .card-title {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }

    .provider-location {
      gap: 6px;

      .location-text {
        font-size: 12px;
        font-weight: 400;
        color: #AEAEAE;
      }
    }

    .go-btn {
      width: 24px;
      height: 24px;
      background-color: #46BFB8;
      margin-bottom: 2px;
      flex-shrink: 0;

      &.ltr {
        transform: rotate(180deg);
      }
    }
  }
}

</style>