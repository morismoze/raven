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
import styles from './ForgotPasswordForm.module.scss';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .max(
      INPUT_CHARACTER_LIMITS.EMAIL,
      `Email must be at most ${INPUT_CHARACTER_LIMITS.EMAIL} characters`,
    )
    .trim()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/,
      'Email is not of valid type',
    )
    .required('Email is required'),
});

export interface IForgotPasswordFormValues {
  email: string;
}

interface IForgotPasswordFormProps {
  onAuth: (values: IForgotPasswordFormValues) => void;
  isAuthenticating: boolean;
}

export const ForgotPasswordForm = ({
  onAuth,
  isAuthenticating,
}: IForgotPasswordFormProps): JSX.Element => {
  const initialValues: IForgotPasswordFormValues = {
    email: '',
  };

  const handleEmailSubmit = (values: IForgotPasswordFormValues) => {
    onAuth(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleEmailSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.root}>
            <StyledField
              name="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              touched={touched.email}
              value={values.email}
              maxLength={INPUT_CHARACTER_LIMITS.EMAIL + 1}
            />
            <Button
              size={ButtonSize.small}
              action={ButtonAction.primary}
              type="submit"
              disabled={isAuthenticating}
            >
              <div className={styles.root__submitContainer}>
                <span>Submit password reset email</span>
                <AlternateLoader isLoading={isAuthenticating} />
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
