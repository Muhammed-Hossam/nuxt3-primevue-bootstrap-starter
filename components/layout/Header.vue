<template>
  <header class="d-flex align-items-center">
      <div class="container h-100">
          <div class="header-content d-flex align-items-center justify-content-between h-100" :style="headerContentStyleInRegisterPage">
              <div class="tabok-logo">
                <NuxtLink :to="localePath('/')">
                  <img class="logo" src="@/assets/imgs/tabok-header-logo.png" alt="tabok-logo" />
                </NuxtLink>
              </div>
              <nav class="navbar d-none d-lg-flex align-items-center py-0 h-100">
                  <NuxtLink :to="localePath('/')" class="nav-link d-flex align-items-center gap-2 h-100">
                      <SVGNavHome :isActive="path === '/' || path === '/en' ? true : false" />
                      {{ $t('nav.home') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/favorite')" class="nav-link d-flex align-items-center gap-2 h-100">
                      <SVGNavFavorite :isActive="path.includes('/favorite') ? true : false" />
                      {{ $t('nav.favorite') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/notifications')" class="nav-link d-flex align-items-center gap-2 h-100">
                      <SVGNavBell :isActive="path.includes('/notifications') ? true : false" />
                      {{ $t('nav.notifications') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/about')" class="nav-link d-flex align-items-center gap-2 h-100">
                      <SVGNavAbout :isActive="path.includes('/about') ? true : false" />
                      {{ $t('nav.about') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/contact')" class="nav-link d-flex align-items-center gap-2 h-100">
                      <SVGNavContact :isActive="path.includes('/contact') ? true : false" />
                      {{ $t('nav.contact') }}
                  </NuxtLink>
              </nav>
              <div v-if="!isInRegisterPage" class="header-btns d-flex align-items-center gap-3">
                  <Button class="join-charity__btn btn rounded-pill d-none d-lg-block" @click="$router.push(localePath('/subscribe'))">{{ $t('nav.join_charity') }}</Button>
                  <Button v-if="!authStore.isAuth" class="login-btn btn rounded-pill d-none d-lg-block" outlined @click="globalStore.setLoginDialogVisible(true)" style="--p-button-outlined-primary-border-color: #46BFB8; --p-button-outlined-primary-color: #46BFB8;">{{ $t('nav.login') }}</Button>

                  <div class="user-dropdown dropdown">
                    <a class="btn dropdown-toggle border-0 d-flex align-items-center gap-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="@/assets/imgs/icons/arrow-down-icon.svg" alt="arrow-down" />
                      <img v-if="profileImg" :src="profileImg" width="50px" height="50px" class="rounded-circle" alt="" />
                    </a>

                    <ul class="dropdown-menu" :class="localeDir">
                      <template v-for="item in menuItems">
                        <li v-if="item.show">
                          <NuxtLink :to="item.to" class="dropdown-item d-flex align-items-center justify-content-between rounded" :class="localeDir">
                            <div class="d-flex align-items-center gap-2">
                              <img :src="item.icon" :alt="item.label" />
                              <span class="dropdown-item__label">{{ item.label }}</span>
                            </div>
                            <img src="@/assets/imgs/icons/arrow-circle-left.svg" class="circle-arrow__icon" :class="localeDir" alt="arrow-circle" />
                          </NuxtLink>
                          <hr class="my-1" />
                        </li>
                      </template>

                      <button v-if="!authStore.isAuth" class="dropdown-login__btn btn w-100 mt-1" @click="globalStore.setLoginDialogVisible(true)">{{ $t('nav.login') }}</button>

                      <button v-if="authStore.isAuth" class="dropdown-logout__btn btn w-100 d-flex align-items-start gap-2 mt-1" @click="globalStore.setLogoutDialogVisible(true)">
                        <img src="@/assets/imgs/icons/logout-icon.png" alt="logout-icon" />
                        {{ $t('nav.logout') }}
                      </button>
                    </ul>
                  </div>

                  <button class="mobile-menu btn d-flex justify-content-center align-items-center text-white d-lg-none" @click="toggleDrawer">
                    <i class="pi pi-bars"></i>
                  </button>
              </div>
          </div>
      </div>
      <LayoutDrawer :active="drawerActive" @closeDrawer="drawerActive = false" />
  </header>
</template>

<script setup>
/******************* Imports ******************/ 
import profileIcon from "@/assets/imgs/icons/user-profile-icon.svg";
import settingsIcon from "@/assets/imgs/icons/settings-icon.svg"
import walletIcon from "@/assets/imgs/icons/wallet-icon.svg"
import packageIcon from "@/assets/imgs/icons/package-icon.svg"
import cardIcon from "@/assets/imgs/icons/card-icon.svg"
import privacyIcon from "@/assets/imgs/icons/privacy-icon.svg"
import complaintsIcon from "@/assets/imgs/icons/complaints-icon.svg"
import termsIcon from "@/assets/imgs/icons/terms-icon.svg"

/******************* Plugins Or Composables *******************/
const localePath = useLocalePath();
const route = useRoute();
const { t, locale } = useI18n();
const globalStore = useGlobalStore();
const authStore = useAuthStore();

/*************** DATA *****************/


const drawerActive = ref(false);

/*************** Computed *****************/
const path = computed(() => route.path);

const localeDir = computed(() => {
  return locale.value === 'ar' ? 'rtl' : 'ltr';
})

const isInRegisterPage = computed(() => {
  return path.value === localePath('/register');
})

const headerContentStyleInRegisterPage = computed(() => {
  if (isInRegisterPage.value) {
    return {
      'justify-content': 'start !important',
      'gap': '6rem !important'
    }
  }

  return {};
})

const profileImg = computed(() => {
  if (!authStore.isAuth && !authStore.user?.image) return null;
  return authStore.user?.image;
})

const isAuth = computed(() => {
  return authStore.isAuth;
})

const menuItems = computed(() => [
  {
    label: t('nav.userMenu.profile'),
    icon: profileIcon,
    to: localePath('/profile'),
    show: isAuth.value
  },
  {
    label: t('nav.userMenu.settings'),
    icon: settingsIcon,
    to: localePath('/settings'),
    show: true
  },
  {
    label: t('nav.userMenu.wallet'),
    icon: walletIcon,
    to: localePath('/wallet'),
    show: isAuth.value
  },
  {
    label: t('nav.userMenu.my_package'),
    icon: packageIcon,
    to: localePath('/my-package'),
    show: isAuth.value
  },
  {
    label: t('nav.userMenu.the_card'),
    icon: cardIcon,
    to: localePath('/card'),
    show: isAuth.value
  },
  {
    label: t('nav.userMenu.privacy'),
    icon: privacyIcon,
    to: localePath('/privacy'),
    show: true
  },
  {
    label: t('nav.userMenu.complaints'),
    icon: complaintsIcon,
    to: localePath('/complaints'),
    show: true
  },
  {
    label: t('nav.userMenu.terms'),
    icon: termsIcon,
    to: localePath('/terms'),
    show: true
  }
])

/*************** Methods *****************/

const toggleDrawer = () => {
  drawerActive.value = !drawerActive.value;
}
/*************** Mounted *****************/

</script>

<style lang="scss" scoped>
header {
  height: 120px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;

  .navbar {
      gap: 40px;

      @media screen and (min-width: 992.5px) and (max-width: 1220px) {
        gap: 10px;
      }

      .nav-link {
          font-size: 16px;
          font-weight: 600;
          color: #AEAEAE;
          position: relative;

          &:before {
              content: '';
              position: absolute;
              width: 45.11px;
              height: 2px;
              bottom: 0;
          }
          
          &.router-link-active {
              color: #1E1E1E;
              
              &:before {
                  background-color: #613592;
              }
          }
      }
  }

  .header-btns {
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

    .user-dropdown {
      .dropdown-toggle {
        &::after {
          display: none !important;
        }
      }

      .dropdown-menu {
        width: 265px;
        min-height: 302px;
        border-radius: 8px;
        padding: 20px 16px;
        background-color: #FFFFFF;
        border-color: transparent;
        // top: 30px !important;
        top: 8px !important;
        box-shadow: $main-shadow;

        .dropdown-item {
          height: 46px;
          transition: all 0.3s ease-in-out;

          .circle-arrow__icon {
            &.ltr {
              transform: rotate(180deg);
            }
          }

          &.rtl:hover {
            margin-right: 4px;
          }

          &.ltr:hover {
            margin-left: 4px;
          }

          .dropdown-item__label {
            transition: all 0.3s ease-in-out;

            &:hover {
              color: $main
            }
          }
          
          .dropdown-item__label {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
          }

          &:active {
            background-color: unset !important;
          }
        }

        .dropdown-login__btn {
          font-size: 16px;
          font-weight: 600;
          color: $main
        }

        .dropdown-logout__btn {
          font-size: 16px;
          font-weight: 600;
          color: #ED1313;
        }

      }
    }

    .mobile-menu {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background-color: $main;
    }
  }
}
</style>