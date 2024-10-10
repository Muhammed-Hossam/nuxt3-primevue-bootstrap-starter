<template>
  <div>
    <Dialog v-model:visible="globalStore.deleteAccountDialogVisible" modal dismissable-mask :closable="false" pt:content:style="padding: 0 64px; text-align: center;" :style="dialogStyle">
      <!-- header -->
      <template #header>
        <div class="d-flex flex-column w-100">
          <h1 class="logout-heading w-100 text-center">{{ $t('settings.want_to_delete_account') }}</h1>
          <hr style="border-color: #AEAEAE;" />
        </div>
      </template>

      <template #default>
        <img src="@/assets/imgs/exit-image.png" class="exit-image w-100 mx-auto" alt="exit-image" />
      </template>

      <template #footer>
        <div class="action-btns w-100 d-flex gap-3" style="margin-top: 40px;">
          <FormButton type="button" :text="$t('auth.back')" @triggerClick="globalStore.setDeleteAccountDialogVisible(false)" style="max-width: 266px; width: 100%;" />
          <Button class="confirm-exit__btn w-100 btn rounded-pill" outlined @click="deleteAccount" :style="confirmExitBtnStyle">{{ $t('settings.delete_account') }}</Button>
        </div>
      </template>

    </Dialog>
  </div>
</template>

<script  setup>
const { fetchAPI, data, status, msg, loading } = useFetchAPI();
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const router = useRouter();


const dialogStyle = computed(() => {
  return {
    maxWidth: '580px',
    width: '100%',
    height: '514px',
    boxShadow: '0px 4px 40px 0px #00000014',
  }
})

const confirmExitBtnStyle = computed(() => {
  return {
    '--p-button-outlined-primary-border-color': '#D80027',
    '--p-button-outlined-primary-color': '#D80027',
    '--p-button-outlined-primary-hover-background': 'rgba(216, 0, 39, 0.1)',
    '--p-button-outlined-primary-active-background': 'rgba(216, 0, 39, 0.2)',
    'font-size': '18px',
    'font-weight': 700,
    'max-width': '266px',
  }
})


/******************** Methods ********************** */

const deleteAccount = async () => {
  await authStore.deleteAccount();
}

</script>

<style lang="scss" scoped>
.logout-heading {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.exit-image {
  max-width: 308px;
  height: 265px;
  object-fit: contain;
}
</style>