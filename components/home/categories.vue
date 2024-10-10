<template>
  <div class="home-categories-section">
    <div class="container">
      <h1 class="section-heading">{{ $t('home.categories') }}</h1>

      <div class="categories-list">
        <Carousel :items-to-show="7"  :wrap-around="false" :breakpoints="breakpoints" :dir="localeDir === 'ltr' ? 'rtl' : 'ltr'">

          <!-- If loading, display skeleton loader -->
          <Slide v-if="loading" v-for="n in 7" :key="n">
            <div class="category-item category-skeleton d-flex flex-column align-items-center justify-content-center gap-3">
              <Skeleton shape="rectangle" width="80px" height="80px" />
              <Skeleton width="100px" height="12px" />
            </div>
          </Slide>

          <template v-else>
            <Slide v-for="category in categories" :key="category.id" >
              <NuxtLink :to="localePath(`/category/${category.id}`)" class="category-item d-flex flex-column align-items-center justify-content-center gap-3">
                <img :src="category.image" width="80px" height="80px" alt="category-img" />
                <span class="category-name">{{ category.name }}</span>
              </NuxtLink>
            </Slide>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
const { localeDir } = useLocaleDirection();

const localePath = useLocalePath();

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false
  }
})




const breakpoints = {
  300: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  700: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 5,
    snapAlign: 'center',
  },
  1400: {
    itemsToShow: 7,
    snapAlign: 'center',
  },
}
</script>

<style lang="scss" scoped>
.home-categories-section {
  .section-heading {
    font-size: 24px;
    font-weight: 700;
    color: #000000;
  }

  .categories-list {
    margin-top: 18px;

    .category-item {
      width: 164px;
      height: 164px;
      border-radius: 12px;
      background-color: $sec-color;
      // margin: 0 11px;

      img {
        object-fit: cover;
        // border-radius: 12px;
      }

      .category-name {
        font-size: 16px;
        font-weight: 700;
        color: #FFFFFF;
      }
    }

    .category-skeleton {
      width: 164px;
      height: 164px !important;
      border-radius: 12px;
      margin: 0 11px;
    }
  }
}
</style>