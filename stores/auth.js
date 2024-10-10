export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    phoneNumber: null,
    countryCode: '00966',
    token: useCookie("token").value || null,
    device_id: '11111111111',
    user: null,
    lat: null,
    lng: null,
    // for change phone cycle
    changePhone: {
      oldOTP: null,
      newPhone: null
    }
  }),
  getters: {
    isAuth: (state) => !!state.token
  },
  actions: {
    async login(formData) {
      const { fetchAPI, data, status, msg, loading } = useFetchAPI();

      const globalStore = useGlobalStore();

      await fetchAPI('sign-in?count_notifications', 'POST', {
        body: formData
      })

      if (status.value === 'success') {
        useCookie("token").value = data.value.token;
        this.token = data.value.token;
        this.user = data.value.user;
        globalStore.showToast('sucess', 'success', msg.value, 3000);
        localStorage.setItem("token", data.value.token);
        globalStore.setLoginDialogVisible(false);
      }else if (status.value === "needActive") {
        // this.user = data.user;
        globalStore.showToast('info', 'Info', msg.value, 3000);

        globalStore.setLoginDialogVisible(false);
        globalStore.setVerficationDialogVisible(true);
      }

    },

    async activate(formData) {
      const globalStore = useGlobalStore();
      const router = useRouter();
      const localePath = useLocalePath();

      const { fetchAPI, data, status, msg, loading } = useFetchAPI();

      await fetchAPI('activate?_method=patch', 'POST', {
        body: formData
      });

      if (status.value === 'need_complete_info') {
        this.user = data.value;
        useCookie("token").value = data.value.token;
        this.token = data.value.token;
        globalStore.showToast('sucess', 'Complete Info', msg.value, 3000);
        globalStore.setVerficationDialogVisible(false);
        router.push(localePath('/register'));
      }

      if (status.value === 'success') {
        this.user = data.value;
        useCookie("token").value = data.value.token;
        this.token = data.value.token;

        globalStore.showToast('success', 'Success', msg.value, 3000);

        
        globalStore.setVerficationDialogVisible(false);
        router.push(localePath('/'));
      }

      if (status.value === 'fail') {
        globalStore.showToast('error', 'Error', msg.value, 3000);
      }
    },

    async completeAccount(formData) {
      const router = useRouter();
      const localePath = useLocalePath();
      const globalStore = useGlobalStore();

      const { fetchAPI, data, status, msg, loading } = useFetchAPI();

      await fetchAPI('complete-account', 'POST', {
        body: formData
      })

      if (status.value === 'success') {
        this.getUserData();
        router.push(localePath('/'));
        globalStore.showToast('success', 'Success', msg.value, 3000);
      }

      if (status.value === 'fail') {
        globalStore.showToast('error', 'Error', msg.value, 3000);
      }

    },

    async getUserData() {

      const { fetchAPI, data, status, msg, loading } = useFetchAPI();

      await fetchAPI('profile', 'GET', {
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`
        }
      });

      if (status.value === 'success') {
        this.user = data.value;
        this.token = data.value.token;
        useCookie("token").value = data.value.token;
      }

    },

    async logout() {
      const globalStore = useGlobalStore();

      const { fetchAPI, data, status, msg, loading } = useFetchAPI();

      await fetchAPI(`/sign-out?device_id=${this.device_id}`, 'DELETE', {
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`
        }
      })

      if (status.value === 'success') {
        useCookie("token").value = null;
        this.token = null;
        this.user = null;
        globalStore.showToast('success', 'Success', msg.value, 3000);
        globalStore.setLogoutDialogVisible(false);
        // globalStore.setLoadingScreenVisible(true);

        // setTimeout(() => {
        //   globalStore.setLoadingScreenVisible(false);
        // }, 2000);
      }
    },

    async deleteAccount() {
      const globalStore = useGlobalStore();
      const router = useRouter();
      const localePath = useLocalePath();
      const { fetchAPI, data, status, msg, loading } = useFetchAPI();

      const formData = new FormData();
      formData.append('device_id', this.device_id);

      await fetchAPI('delete-account', 'POST', {
        body: formData,
      });

      if (status.value === 'success') {
        useCookie("token").value = null;
        this.token = null;
        this.user = null;
        globalStore.showToast('success', 'Success', msg.value, 3000);
        globalStore.setDeleteAccountDialogVisible(false);

        setTimeout(() => {
          router.push(localePath('/'));
        }, 200)
      }

      if (status.value === 'fail') {
        globalStore.showToast('error', 'Error', msg.value, 3000);
      }

    },

    // for change phone cycle
    setOldPhoneOTP(otp) {
      this.changePhone.oldOTP = otp;
    },
    setNewPhone(phone) {
      this.changePhone.newPhone = phone;
    },
    async switchNotifying() {
      const { fetchAPI, data, status, msg, loading } = useFetchAPI();
      const globalStore = useGlobalStore();

      await fetchAPI('switch-notify', 'PATCH');

      if (status.value === 'success') {
        await this.getUserData();
        globalStore.showToast('success', 'Success', msg.value, 3000);
      }

      if (status.value === 'fail') {
        globalStore.showToast('error', 'Error', msg.value, 3000);
      }

    }
  },
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      sameSite: 'strict'
    })
  }
});
