<template>
  <div class="rate-dialog">
    <Dialog v-model:visible="globalStore.rateDialog" modal dismissable-mask :closable="false" pt:content:style="padding: 0 16px; text-align: center;" :style="dialogStyle">
      <template #header>
        <div class="d-flex flex-column w-100">
          <h1 class="rate-heading w-100 text-center">{{ $t('providers.the_rate') }}</h1>
          <hr style="border-color: #AEAEAE;" />
        </div>
      </template>

      <template #default>
        <div class="rate-wrapper d-flex align-items-center justify-content-center">
          <Rating v-model="rate" pt:root:style="gap: 30px;"  />
        </div>

        <div class="rate-textarea__wrapper d-flex flex-column mt-4" style="margin-bottom: 32px;">
          <label for="rate" class="text-end mb-2">{{ $t('providers.rate') }}</label>
          <textarea v-model="rateComment" class="form-control" name="rate" id="rate" rows="5"></textarea>
        </div>

        <FormButton class="rate-btn" :loading="loading" :disabled="isBtnDisabled || loading" @triggerClick="rateProvider" :text="$t('providers.rate')" />
      </template>

    </Dialog>
  </div>
</template>

<script setup>
/***************** Plugins Or Composables ******************* */ 
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const { fetchAPI, data, status, msg, loading } = useFetchAPI();
const route = useRoute();
const { t } = useI18n();

/***************** Data *******************/
const rate = ref(0);
const rateComment = ref('');

/***************** Computed *******************/
const dialogStyle = computed(() => {
  return {
    maxWidth: '580px',
    width: '100%',
    height: '514px',
    boxShadow: '0px 4px 40px 0px #00000014',
  }
})

const isBtnDisabled = computed(() => {
  return !rate.value;
})


/***************** Methods *******************/
const rateProvider = async () => {

  if (!authStore.isAuth) {
    globalStore.showToast('error', 'Error', t('providers.login_to_rate_provider'), 3000);
    return;
  }

  const formData = new FormData();

  formData.append('provider_id', route.params.id);
  formData.append('rate', rate.value);
  formData.append('comment', rateComment.value);


  await fetchAPI('rate-provider', 'POST', {
    body: formData
  })

  if (status.value === 'success') {
    globalStore.showToast('success', 'Success', msg.value, 3000);
    globalStore.setRateDialogVisible(false);
  }

  if (status.value === 'fail') {
    globalStore.showToast('error', 'Error', msg.value, 3000);
  }

}



</script>

<style lang="scss" scoped>
.rate-heading {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.rate-wrapper {
  height: 103.85px;
  border-radius: 12px;
  background-color: #F5F5F5;
}
</style>