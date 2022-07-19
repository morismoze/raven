import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  StyledField,
  ButtonSize,
  ButtonAction,
  AlternateLoader,
} from '@/components';
import styles from './LoginForm.module.scss';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormProps {
  onAuth: (values: LoginFormValues) => void;
  isAuthenticating: boolean;
}

export const LoginForm = ({
  onAuth,
  isAuthenticating,
}: LoginFormProps): JSX.Element => {
  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const handleLocalAuthSubmit = (values: LoginFormValues) => {
    const { username, password } = values;
    onAuth({ username, password });
  };

  return (
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
          />
          <StyledField
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
            touched={touched.password}
            value={values.password}
          />
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
  );
};
