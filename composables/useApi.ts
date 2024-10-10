import axios from "axios";

export const useApi = () => {
  const baseURL = useRuntimeConfig().public.api_base_url;
  const { locale } = useI18n();

  if (process.client) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.lang = locale.value;
  }

  const token = useCookie("token").value || "";
  console.log()

  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}