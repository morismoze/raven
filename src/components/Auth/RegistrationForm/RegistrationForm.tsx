import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  StyledField,
  ButtonSize,
  ButtonAction,
  AlternateLoader,
} from '@/components';
import styles from './RegistrationForm.module.scss';

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, 'First name must be at most 30 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .max(30, 'Last name must be at most 30 characters')
    .required('Last name is required'),
  email: Yup.string()
    .max(255, 'Email must be at most 255 characters')
    .email('Email is invalid')
    .required('Email is required')
    .test('Unique email', 'Email is already in use', () => {
      // API check if email is taken and return true if not, false otherwise
      return true;
    }),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must be atleast 8 characters, one uppercase, one lowercase, one number and one special character',
    )
    .max(60, 'Password must be at most 60 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .max(60, 'Password must be at most 60 characters')
    .required('Password confirmation is required'),
});

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface RegistrationFormProps {
  onAuth: (
    values: Omit<RegistrationFormValues, 'passwordConfirmation'>,
  ) => void;
  isAuthenticating: boolean;
}

export const RegistrationForm = ({
  onAuth,
  isAuthenticating,
}: RegistrationFormProps): JSX.Element => {
  const initialValues: RegistrationFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const handleLocalAuthSubmit = (values: any) => {
    let { firstName, lastName, email, username, password } = values;
    username = email;
    onAuth({ firstName, lastName, email, username, password });
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
            type="firstName"
            placeholder="First name"
            error={errors.firstName}
            touched={touched.firstName}
            value={values.firstName}
          />
          <StyledField
            name="lastName"
            type="lastName"
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
