// const axios = useApi();

export const useGlobalStore = defineStore('global', {
  state: () => ({
    loginDialogVisible: false,
    verficationDialogVisible: false,
    logoutDialogVisible: false,
    deleteAccountDialogVisible: false,
    loadingScreenVisible: false,
    rateDialog: false,
    toastMsg: {
      type: 'error',
      summary: 'Error',
      message: 'Error Message',
      time: 3000
    },
    toastVisible: false
  }),

  actions: {
    setLoginDialogVisible(value) {
      this.loginDialogVisible = value;
    },
    setVerficationDialogVisible(value) {
      this.verficationDialogVisible = value;
    },
    setLogoutDialogVisible(value) {
      this.logoutDialogVisible = value;
    },
    setRateDialogVisible(value) {
      this.rateDialog = value;
    },
    setDeleteAccountDialogVisible(value) {
      this.deleteAccountDialogVisible = value;
    },
    setLoadingScreenVisible(value) {
      this.loadingScreenVisible = value;
    },
    showToast(type, summary, message, time) {
      this.toastVisible = true;
      this.toastMsg.type = type;
      this.toastMsg.summary = summary;
      this.toastMsg.message = message;
      this.toastMsg.time = time;
      setTimeout(() => {
        this.toastVisible = false;
      }, time);
    }
  }
})