<template>
  <div>
    <Dialog v-model:visible="globalStore.verficationDialogVisible" modal dismissable-mask :closable="false" pt:content:style="padding: 0 64px;" :style="dialogStyle">
      <template #default>
        <div class="dialog-content d-flex flex-column align-items-center">
          <img src="@/assets/imgs/footer-logo.png" alt="tabouk-logo" />
          <div class="heading-wrapper d-flex flex-column align-items-center gap-1">
            <h1 class="login-heading">{{ $t('auth.verfication_code') }}</h1>
            <p class="subheading">{{ $t('auth.enter_verfication_code') }}</p>
          </div>
          <Form v-slot="{ meta }" @submit="submitOtp" class="login-form w-100">
            <Field
              v-model="otpCode"
              name="otp"
              type="text"
              :rules="otpValidationSchema"
              validate-on-input
              v-slot="{ field, errorMessage }"
            >
            <InputOtp v-model="otpCode" ref="otpInput" class="justify-content-between" pt:root:style="direction: ltr !important;" />

            <span v-if="errorMessage" class="error-message text-danger">{{ errorMessage }}</span>

            <FormButton 
              type="submit" 
              :text="$t('auth.verify')" 
              :loading="submitOtpLoading" 
              :disabled="submitOtpLoading || !meta.valid"
              style="margin-top: 24px;" 
              @triggerClick="submitOtp"
            />

            <div class="resend-btn__wrapper d-flex justify-content-center">
              <Button 
                text 
                class="resend-otp__btn" 
                @click="resendOtp" 
                :loading="loading"
                :disabled="isDisabled"
                style="--p-primary-color: #46BFB8 !important; --p-button-text-primary-color: #46BFB8 !important;"
              >
                <span class="resend-text">{{ $t('auth.resend') }}</span>
                <span class="time" v-if="isDisabled">{{ countdown < 60 ? `00:${countdown}` : `01:00` }}</span>
              </Button>
            </div>

          </Field>

          </Form>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
/***************** Plugins Or Composables ******************/ 
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const { locale } = useI18n();
const { otpCode: otpValidationSchema } = useValidationSchema();
const { fetchAPI, data, status, msg, loading } = useFetchAPI();


/***************** Data ******************/
const otpCode = ref();
const submitOtpLoading = ref(false);
const otpInput = ref();

const countdown = ref(60); // Countdown starts from 60 seconds
const isDisabled = ref(false); // Disable button initially set to false
let timer;

/***************** Computed ******************/
const dialogStyle = computed(() => {
  return {
    maxWidth: '718px',
    width: '100%',
    height: '729px',
    boxShadow: '0px 4px 40px 0px #00000014',
  }
})

/***************** Methods ******************/
const resendOtp = async () => {
  await fetchAPI(`resend-code?country_code=${authStore.countryCode}&phone=${authStore.phoneNumber}`);

  if (status.value === 'success') {
    globalStore.showToast('success', 'Success', msg.value, 3000);
    startCountdown();
  }

  if (status.value === 'fail') {
    globalStore.showToast('error', 'Error', msg.value, 3000);
  }
}

const submitOtp = async () => {
  submitOtpLoading.value = true;

  const formData = new FormData();
  formData.append('code', otpCode.value);
  formData.append('country_code', '00966');
  formData.append('phone', authStore.phoneNumber);
  formData.append('device_id', '11111111111');
  formData.append('device_type', 'web');
  // formData.append('lang', locale.value);

  try {
    await authStore.activate(formData);
  }catch (error) {
    console.error(error);
  }finally {
    submitOtpLoading.value = false;
  }
}

// Function to start countdown
const startCountdown = () => {
  isDisabled.value = true;
  countdown.value = 60; // Reset the countdown to 60 seconds

  timer = setInterval(() => {
    countdown.value--;

    if (countdown.value <= 0) {
      clearInterval(timer);
      isDisabled.value = false;
    }
  }, 1000);
};

watch(otpInput, (newValue) => {
  if (newValue) {
    otpInput.value.$el.children[0].focus();
  }
})

onUnmounted(() => {
  clearInterval(timer);
})
</script>

<style lang="scss" scoped>
.dialog-content {
  margin-top: 84px;
  margin-bottom: 96px;

  .heading-wrapper {
    margin-top: 48px;
    margin-bottom: 48px;

    .login-heading {
      font-size: 24px;
      font-weight: 700;
      color: #1E1E1E;
    }

    .subheading {
      font-size: 14px;
      font-weight: 400;
      color: #828282;
    }
  }

  .resend-btn__wrapper {
    margin-top: 48px;

    .resend-text {
      font-size: 18px;
      font-weight: 700;
      color: #46BFB8;
    }

    .time {
      font-size: 16px;
      font-weight: 600;
      color: #46BFB8;
    }
  }
}
</style>