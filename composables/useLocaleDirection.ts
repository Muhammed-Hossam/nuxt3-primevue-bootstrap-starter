
export const useLocaleDirection = () => {
  const { locale } = useI18n();

  const localeDir = computed(() => {
    return locale.value === 'ar' ? 'rtl' : 'ltr';
  });

  return { localeDir };
}