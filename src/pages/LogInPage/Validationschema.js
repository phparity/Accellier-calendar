import * as Yup from "yup";

export const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .required('Password is required')

  });

  export const forgetPageValidationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    
  });

  