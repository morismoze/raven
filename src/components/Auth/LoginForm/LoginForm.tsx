import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  StyledField,
  ButtonSize,
  ButtonAction,
  AlternateLoader,
  TextLink,
} from '@/components';
import styles from './LoginForm.module.scss';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
});

export interface ILoginFormValues {
  username: string;
  password: string;
}

interface ILoginFormProps {
  onAuth: (values: ILoginFormValues) => void;
  isAuthenticating: boolean;
}

export const LoginForm = ({
  onAuth,
  isAuthenticating,
}: ILoginFormProps): JSX.Element => {
  const initialValues: ILoginFormValues = {
    username: '',
    password: '',
  };

  const handleLocalAuthSubmit = (values: ILoginFormValues) => {
    const { username, password } = values;
    onAuth({ username, password });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLocalAuthSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.root}>
            <StyledField
              name="username"
              type="username"
              placeholder="Username"
              error={errors.username}
              touched={touched.username}
              value={values.username}
              showSuccessIcon={false}
            />
            <StyledField
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password}
              touched={touched.password}
              value={values.password}
              showSuccessIcon={false}
            />
            <TextLink
              href="/forgot-password"
              className={styles.root__forgotPassword}
            >
              Forgot password?
            </TextLink>
            <Button
              size={ButtonSize.small}
              action={ButtonAction.secondary}
              type="submit"
              disabled={isAuthenticating}
            >
              <div className={styles.root__submitContainer}>
                <span>Sign in</span>
                <AlternateLoader isLoading={isAuthenticating} />
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
