import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  StyledField,
  ButtonSize,
  ButtonAction,
  AlternateLoader,
} from '@/components';
import { FieldError } from '@/api';
import styles from './RegistrationForm.module.scss';

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, 'First name must be at most 30 characters')
    .trim()
    .required('First name is required'),
  lastName: Yup.string()
    .max(30, 'Last name must be at most 30 characters')
    .trim()
    .required('Last name is required'),
  email: Yup.string()
    .max(255, 'Email must be at most 255 characters')
    .trim()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/,
      'Email is not of valid type',
    )
    .required('Email is required'),
  username: Yup.string()
    .max(255, 'Username must be at most 255 characters')
    .trim()
    .required('Username is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must be at least eight characters, one uppercase, one lowercase, one number and one special character',
    )
    .max(60, 'Password must be at most 60 characters')
    .trim()
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .max(60, 'Password must be at most 60 characters')
    .trim()
    .required('Password confirmation is required'),
});

export interface IRegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface IRegistrationFormProps {
  onAuth: (
    values: Omit<IRegistrationFormValues, 'passwordConfirmation'>,
  ) => Promise<FieldError[] | null>;
  isAuthenticating: boolean;
}

export const RegistrationForm = ({
  onAuth,
  isAuthenticating,
}: IRegistrationFormProps): JSX.Element => {
  const initialValues: IRegistrationFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const handleLocalAuthSubmit = async (values: any, { setFieldError }: any) => {
    const { firstName, lastName, email, username, password } = values;

    const fieldErrors = await onAuth({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    if (fieldErrors) {
      fieldErrors.forEach((e) => {
        setFieldError(e.field, e.error);
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      validateOnChange
      onSubmit={handleLocalAuthSubmit}
    >
      {({ errors, touched, values }) => (
        <Form className={styles.root}>
          <StyledField
            name="firstName"
            type="text"
            placeholder="First name"
            error={errors.firstName}
            touched={touched.firstName}
            value={values.firstName}
          />
          <StyledField
            name="lastName"
            type="text"
            placeholder="Last name"
            error={errors.lastName}
            touched={touched.lastName}
            value={values.lastName}
          />
          <StyledField
            name="email"
            type="email"
            placeholder="Email"
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />
          <StyledField
            name="username"
            type="text"
            placeholder="Username"
            error={errors.username}
            touched={touched.username}
            value={values.username}
          />
          <StyledField
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
            touched={touched.password}
            value={values.password}
          />
          <StyledField
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm password"
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            value={values.passwordConfirmation}
          />
          <Button
            size={ButtonSize.small}
            action={ButtonAction.secondary}
            type="submit"
            disabled={isAuthenticating}
          >
            <div className={styles.root__submitContainer}>
              <span>Sign up</span>
              <AlternateLoader isLoading={isAuthenticating} />
            </div>
          </Button>
        </Form>
      )}
    </Formik>
  );
};
