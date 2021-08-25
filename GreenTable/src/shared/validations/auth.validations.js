import * as Yup from 'yup';

export const signInValidationRules = Yup.object().shape({
  email: Yup.string().required('validation.emailIsRequired').email('validation.mustBeValidEmail'),
  password: Yup.string().required('validation.passwordIsRequired').min(8, 'validation.passwordMinCharacters'),
});
