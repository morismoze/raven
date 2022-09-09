import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  StyledField,
  ButtonSize,
  ButtonAction,
  AlternateLoader,
} from '@/components';
import { INPUT_CHARACTER_LIMITS } from '@/constants';
import styles from './PasswordResetForm.module.scss';

const PasswordResetSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must be at least eight characters, one uppercase, one lowercase, one number and one special character',
    )
    .max(
      INPUT_CHARACTER_LIMITS.PASSWORD,
      `Password must be at most ${INPUT_CHARACTER_LIMITS.PASSWORD} characters`,
    )
    .trim()
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .max(
      INPUT_CHARACTER_LIMITS.PASSWORD,
      `Password must be at most ${INPUT_CHARACTER_LIMITS.PASSWORD} characters`,
    )
    .trim()
    .required('Password confirmation is required'),
});

export interface IPasswordResetFormValues {
  password: string;
  passwordConfirmation: string;
}

interface IPasswordResetFormProps {
  onAuth: (
    values: Omit<IPasswordResetFormValues, 'passwordConfirmation'>,
  ) => void;
  isAuthenticating: boolean;
}

export const PasswordResetForm = ({
  onAuth,
  isAuthenticating,
}: IPasswordResetFormProps): JSX.Element => {
  const initialValues: IPasswordResetFormValues = {
    password: '',
    passwordConfirmation: '',
  };

  const handlePasswordSubmit = (values: IPasswordResetFormValues) => {
    const { password } = values;
    onAuth({ password });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PasswordResetSchema}
        onSubmit={handlePasswordSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.root}>
            <StyledField
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
              value={values.password}
              maxLength={INPUT_CHARACTER_LIMITS.PASSWORD + 1}
            />
            <StyledField
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm password"
              error={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              value={values.passwordConfirmation}
              maxLength={INPUT_CHARACTER_LIMITS.PASSWORD + 1}
            />
            <Button
              size={ButtonSize.small}
              action={ButtonAction.primary}
              type="submit"
              disabled={isAuthenticating}
            >
              <div className={styles.root__submitContainer}>
                <span>Reset password</span>
                <AlternateLoader isLoading={isAuthenticating} />
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
