<template>
  <div class="app-drawer__wrapper d-lg-none">
    <div class="overlay" :class="{ active: active }" @click="closeDrawer"></div>
    <div class="drawer d-flex flex-column align-items-center" :class="{ active: active }">
      <div class="tabok-logo w-100 d-flex justify-content-center">
        <NuxtLink :to="localePath('/')">
          <img class="logo" src="@/assets/imgs/tabok-header-logo.png" alt="tabok-logo" />
        </NuxtLink>  
      </div>

      <div class="drawer-links d-flex flex-column w-100 gap-4 mt-5">
        <NuxtLink :to="localePath('/')" class="drawer-link d-flex align-items-center gap-2 py-3 px-2">
          <SVGNavHome :isActive="path === '/' || path === '/en' ? true : false" />
          {{ $t('nav.home') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/favorite')" class="drawer-link d-flex align-items-center gap-2 py-3 px-2">
          <SVGNavFavorite :isActive="path.includes('/favorite') ? true : false" />
          {{ $t('nav.favorite') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/notifications')" class="drawer-link d-flex align-items-center gap-2 py-3 px-2">
          <SVGNavBell :isActive="path.includes('/notifications') ? true : false" />
          {{ $t('nav.notifications') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/about')" class="drawer-link d-flex align-items-center gap-2 py-3 px-2">
          <SVGNavAbout :isActive="path.includes('/about') ? true : false" />
          {{ $t('nav.about') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="drawer-link d-flex align-items-center gap-2 py-3 px-2">
          <SVGNavContact :isActive="path.includes('/contact') ? true : false" />
          {{ $t('nav.contact') }}
        </NuxtLink>
      </div>
      <div class="drawer-btns w-100 d-flex flex-column gap-3">
        <Button class="join-charity__btn btn rounded-pill" @click="$router.push(localePath('/subscribe'))">{{ $t('nav.join_charity') }}</Button>
        <Button v-if="!authStore.isAuth" class="login-btn btn rounded-pill" outlined @click="globalStore.setLoginDialogVisible(true)" style="--p-button-outlined-primary-border-color: #46BFB8; --p-button-outlined-primary-color: #46BFB8;">{{ $t('nav.login') }}</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
/******************* Plugins Or Composables *******************/
const localePath = useLocalePath();
const route = useRoute();
const globalStore = useGlobalStore();
const authStore = useAuthStore();

/*************** DATA *****************/
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['closeDrawer']);

/*************** Methods *****************/
const closeDrawer = () => {
  emit('closeDrawer');
}

/*************** Computed *****************/
const path = computed(() => route.path);

/*************** Hooks *****************/
watch(() => path.value, (newValue) => {
  if (newValue) {
    closeDrawer();
  }
})
</script>

<style lang="scss" scoped>
.app-drawer__wrapper {
  
  .overlay {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 333;
    background-color: rgba($color: #000000, $alpha: 0.5);
    transition: 0.7s;
    @include dir-right(0);
    @include translate(100%);
  
    &.active {
      @include translate(0);
    }
  
    @media screen and (min-width: $screen-lg) {
      display: none;
    }
  }

  .drawer {
    display: flex;
    align-items: center;
    transition: all 0.8s cubic-bezier(0.68, -0.3, 0.265, 1.3);

    @media screen and (max-width: $screen-lg) {
      position: fixed;
      top: 0;
      @include dir-left(0);
      height: 100vh;
      width: 280px;
      flex-direction: column;
      align-items: flex-start;
      background-color: $white;
      box-shadow: $nav-shadow;
      z-index: 2000;
      padding: 30px 20px;
      gap: 8px;
      #{$ltr} & {
        transform: translateX(-150%);
      }
      #{$rtl} & {
        transform: translateX(150%);
      }

      &.active {
        transform: translateX(0) !important;
      }

      overflow-y: auto;
      overflow-x: clip;

      &::-webkit-scrollbar {
        width: 3px;
      }
    }

    &-links {
      
      .drawer-link {
        font-size: 18px;
        font-weight: 700;
        color: #AEAEAE;

        &.router-link-active {
          color: $main;
          background-color: var(--bs-tertiary-bg);
          border-radius: 5px;
        }
      }
    }

    .drawer-btns {

      .join-charity__btn {
        width: 166px;
        height: 48px;
        background-color: #46BFB8;
        color: #FFFFFF;
      }
  
      .login-btn {
        width: 166px;
        height: 48px;
      }
    }

  }
}
</style>