export const useFetchAPI = () => {
  const authStore = useAuthStore();
  // const { locale } = useI18n();
  const { $axios, $i18n } = useNuxtApp();
  
  const data = ref();
  const status = ref();
  const msg = ref();
  const loading = ref(false);
  
  const fetchAPI = async (url: string, method: string = 'GET', options: any = {}) => {
    loading.value = true;

    try {
      // const baseURL = useRuntimeConfig().public.api_base_url;

      // Axios request configuration
      const axiosOptions = {
        // baseURL,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          Accept: 'application/json',
          lang: options.lang || $i18n.locale.value,
          ...options.headers, // Allow overriding headers if passed in options
        },
        ...options, // Spread any other options such as data, params, etc.
      };

      // Dynamically select Axios method based on the `method` argument
      let response;
      if (method === 'GET') {
        response = await $axios.get(url, axiosOptions);
      } else if (method === 'POST') {
        response = await $axios.post(url, options.body, axiosOptions);
      } else if (method === 'PUT') {
        response = await $axios.put(url, options.body, axiosOptions);
      } else if (method === 'DELETE') {
        response = await $axios.delete(url, axiosOptions);
      } else if (method === 'PATCH') {
        response = await $axios.patch(url, options.body, axiosOptions);
      } else {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }

      // Handle success response
      data.value = response.data.data;
      status.value = response.data.key;
      msg.value = response.data.msg;
    } catch (error) {
      // Handle error response
      msg.value = error.response?.data?.message || 'Request failed';
      status.value = error.response?.status || 500;
      console.error(`API ${url} error:`, error);
    } finally {
      loading.value = false;
    }
  };
  
  return {
    fetchAPI,
    data,
    status,
    msg,
    loading
  };
};