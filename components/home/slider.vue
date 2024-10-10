<template>
  <div class="home-slider__wrapper">
    <div class="container">
      <!--**** Slider ****-->
      <div class="home_slider" v-if="!loading">

          <!--**** Slider Images ****-->
          <div v-if="sliders.length > 0">

              <Carousel ref="homeSlider" :dir="lang" :wrap-around="true" :autoplay="3000" :transition="1500">

                  <Slide v-for="slide in sliders" :key="slide.id">
                      <img :src="slide.image" class="slider_img w-100 h-100" alt="">
                  </Slide>

                  <template #addons>
                      <Pagination />
                  </template>
              </Carousel>
          </div>
      </div>

      <!--**** Skeleton ****-->
      <div class="home_slider" v-if="loading">
          <Carousel ref="homeSlider" :dir="lang" :wrap-around="true" :autoplay="3000" :transition="1500">

              <Slide v-for="i in 3" :key="i">
                  <Skeleton class="slider_img" />
                  <img src="@/assets/imgs/footer-logo.png" alt="" class="slider_logo">
              </Slide>

              <template #addons>
                  <Pagination />
              </template>
          </Carousel>
      </div>

      </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

const { locale } = useI18n();

const props = defineProps({
  sliders: {
    type: Array,
    default: () => [],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const homeSlider = ref(null);

const lang = computed(() => {
    return locale.value === 'ar' ? 'rtl' : 'ltr';
});

</script>

<style lang="scss">
.home_slider {
  position: relative;

  .slider_img {
    width: 100% !important;
    height: 360px !important;
    @include border-radius(10px);
  }

  .slider_logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // max-width: 70px;
    // width="397px" height="271px"

    z-index: 3;
  }

  .carousel__slide {
    padding-inline: 5px;
    position: relative !important;
  }
}

/***** Start carousel next, prev, pagination *****/

.carousel__next,
.carousel__prev {
  right: unset;
  left: unset;
  background-color: $white2 !important;
  @include shape(44px !important, 50%);
  border: 6px solid $gray !important;

  img {
    max-height: 14px;
  }

  @media screen and (max-width: $screen-md) {
    display: none !important;
  }
}

.carousel__next {
  right: -35px !important;
}

.carousel__prev {
  left: -35px !important;
}

.carousel__pagination {
  gap: 6px;
  // margin-top: 15px;

  .carousel__pagination-button {
    padding: 0;

    &::after {
      background-color: $main-accent;
      @include shape(8px, 50%);
      transition: $main-transition;

      @media screen and (max-width: $screen-xs) {
        @include shape(7px !important, 50%);
      }
    }

    &.carousel__pagination-button--active {
      &::after {
        background-color: $sec-color;
        width: 20px;
        @include border-radius(10px);
      }
    }
  }
}
</style>