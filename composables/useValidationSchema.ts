import * as yup from 'yup';

export const useValidationSchema = () => {

  const { t } = useI18n();

  // required
  const required = yup
    .string()
    .required(t('validation.required'));

  const phoneNumber = yup
    .string()
    .required(t('validation.required'))
    .matches(/^[0-9]+$/, t('validation.phone_only_digits'))
    .min(9, t('validation.phone_at_least_9'))
    .max(10, t('validation.phone_cannot_be_longer_than_10'))
    .label('Phone');

    // wallet charge amount must be number
    const chargeAmount = yup
    .string()
    .required(t('validation.required'))
    .matches(/^[0-9]+$/, t('validation.charge_amount_only_digits'))
    .label(t('wallet.charge_amount'));


    // OTP Schema 4 numbers
    const otpCode = yup
    .string()
    .required(t('validation.otp_required'))
    .matches(/^\d{4}$/, t('validation.otp_must_be_4_digits'));

    // Full Name Schema
    const fullName = yup
    .string()
    .required(t('validation.required'))
    .min(2, t('validation.min', { min: 2 }))
    .max(50, t('validation.max', { max: 50 }))
    .label(t('auth.full_name'));

    // Email Schema
    const email = yup
    .string()
    .required(t('validation.required'))
    .email(t('validation.email'))
    .label(t('auth.email'));

    // Select Gender Schema
    const gender = yup
    .object()
    .required(t('validation.required'))
    .label(t('auth.gender'));

    // message text
    const message = yup
    .string()
    .required(t('validation.required'))
    .label(t('contact.message_text'));

    // complaint reason text
    const complaintReason = yup
    .string()
    .required(t('validation.required'))
    .max(50, t('validation.max', { max: 50 }))
    .label(t('complaints.complaint_reason'));

    // complaint description text
    const complaintDescription = yup
    .string()
    .required(t('validation.required'))
    .max(500, t('validation.max', { max: 500 }))
    .label(t('complaints.complaint_description'));


  
  return {
    required,
    phoneNumber,
    otpCode,
    fullName,
    email,
    gender,
    message,
    chargeAmount,
    complaintReason,
    complaintDescription
  }
}