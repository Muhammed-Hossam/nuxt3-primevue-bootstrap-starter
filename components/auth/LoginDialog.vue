<template>
  <div>
    <Dialog v-model:visible="globalStore.loginDialogVisible" modal dismissable-mask :closable="false" pt:content:style="padding: 0 64px;" :style="dialogStyle">
      <template #default>
        <div class="dialog-content d-flex flex-column align-items-center">
          <img src="@/assets/imgs/footer-logo.png" alt="tabouk-logo" />
          <div class="heading-wrapper d-flex flex-column align-items-center gap-1">
            <h1 class="login-heading">{{ $t('auth.login') }}</h1>
            <p class="subheading">{{ $t('auth.welcome_back') }}</p>
          </div>
          <Form v-slot="{ meta }" @submit="submitLogin" class="login-form w-100">
            <FormInput 
              v-model:modelValue="form.phone" 
              name="phone" 
              type="text"
              :label="$t('auth.phone_label')" 
              :placeholder="$t('auth.phone_label')" 
              :icon="mobileIcon"
              :validation-schema="phoneNumber"
            />

            <FormButton 
              type="button" 
              :text="$t('auth.login')" 
              :loading="loading" 
              :disabled="loading || !meta.valid"
              style="margin-top: 24px;" 
              @triggerClick="submitLogin"
            />
          </Form>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
/************************ Imports ************************ */
import mobileIcon from "@/assets/imgs/icons/noun_mobile-icon.png";

/************************ Composables ************************ */
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const { validate } = useForm();
const { phoneNumber } = useValidationSchema();
const { locale } = useI18n();

/************************ Data ************************ */


const form = useForm({
  phone: ''
})

const loading = ref(false);
const isValid = ref(false);


/************************ Computed ************************ */

const dialogStyle = computed(() => {
  return {
    maxWidth: '718px',
    width: '100%',
    height: '729px',
    boxShadow: '0px 4px 40px 0px #00000014',
  }
})

/************************ Methods ************************ */


const submitLogin = async (values) => {
  // TODO: Add login logic
  loading.value = true;

  const formData = new FormData();
  formData.append('country_code', authStore.countryCode);
  formData.append('phone', form.phone);
  formData.append('device_id', authStore.device_id);
  formData.append('device_type', 'web');
  formData.append('lang', locale.value);

  authStore.phoneNumber = form.phone;

  try {
    await authStore.login(formData);
  }catch (error) {
    console.log(error);
  }finally {
    loading.value = false;
  }

}


</script>

<style lang="scss" scoped>
.dialog-content {
  margin-top: 84px;

  .heading-wrapper {
    margin-top: 48px;

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
}

</style>