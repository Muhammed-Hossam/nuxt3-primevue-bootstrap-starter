<template>
  <div class="home-page">
    <HomeSlider  :sliders="sliders" :loading="loading" />
    
  </div>
</template>

<script setup>
/************************ Composables ************************** */
const { fetchAPI, data, status, msg, loading } = useFetchAPI();


/************************ Data ************************** */
const sliders = ref([]);
const categories = ref([]);
const providers = ref([]);

const mapDialog = ref(false);


/************************ Computed ************************** */
const dialogStyle = computed(() => {
  return {
    maxWidth: '902px',
    width: '100%',
    'min-height': '604px',
    boxShadow: '0px 4px 40px 0px #00000014',
  }
})

/************************ Methods ************************** */
const getHomeData = async () => {

  await fetchAPI('home?paginate=4')

  console.log('loadingState ==> ', loading.value)

  if (status.value === 'success') {
    sliders.value = data.value.sliders;
    categories.value = data.value.categories;
    providers.value = data.value.providers.data;
  }

}


onMounted(() => {
  const { set, clear, finish } = useLoadingIndicator({
    duration: 200,
    throttle: 200
  })
  set()

  setTimeout(() => {
    finish();
    clear();
  }, 800)

  getHomeData()
})
</script>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 68px;

  .select-location__wrapper {
    .select-location__text {
      font-size: 24px;
      font-weight: 700;
      color: #1E1E1E;
    }
  }

}

.map-heading {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.close-btn {
  width: 26.67px;
  height: 26.67px;
  background-color: #E51010;
  color: #FFFFFF;
}
</style>