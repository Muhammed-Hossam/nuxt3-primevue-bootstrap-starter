<template>
  <div class="home-providers-section">
    <div class="container">
      <h3 class="section-heading">{{ $t('home.service_providers_heading') }}</h3>
      <div class="providers-wrapper mt-4">
        <div class="row" style="--bs-gutter-y: 1.5rem">
          <template v-if="!loading">
            <div v-for="provider in providers" :key="provider.id" class="col-12 col-md-6 col-lg-4 col-xl-3">
              <ProviderCard :provider="provider" class="mx-auto" @toggle-favorite="toggleFavorites($event, provider)" />
            </div>
          </template>

          <template v-else>
            <div v-for="item in 8" :key="item" class="col-12 col-md-6 col-lg-3">
              <SkeletonProviderLoader class="mx-auto" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['toggle-favorite'])

const props = defineProps({
  providers: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    required: true
  }
})


const toggleFavorites = (isFav, provider) => {
  provider.is_fav = isFav;
}
</script>

<style lang="scss" scoped>
.home-providers-section {
  margin-top: 50px;

  .section-heading {
    font-size: 24px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 20px;
  }
}
</style>