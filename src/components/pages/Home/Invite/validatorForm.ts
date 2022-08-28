import Validator from '@/libs/validator';

export type FormValuesType = {
  name?: HTMLInputElement;
  email?: HTMLInputElement;
  confirmEmail?: HTMLInputElement;
};

const validatorForm = (formValues: FormValuesType) => {
  const validator = new Validator();

  validator.add(formValues.name, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '[name] cannot be empty!',
    },
    {
      strategy: 'minLength:3',
      errorMsg: '[name] cannot be less than 3 characters long!',
    },
  ]);

  validator.add(formValues.email, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '[email] cannot be empty!',
    },
    {
      strategy: 'isEmail',
      errorMsg: '[email] is not a valid email!',
    },
  ]);

  validator.add(formValues.confirmEmail, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '[Confirm email] cannot be empty!',
    },
    {
      strategy: `isEqual:${formValues.email?.value}`,
      errorMsg: '[Confirm email] confirmation is incorrect！',
    },
  ]);

  const errorMsg = validator.start();
  return errorMsg;
};

export default validatorForm;
