import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  LoginForm,
  LoginFormValues,
} from '@/components';
import { useAuth } from '@/api';
import styles from './Login.module.scss';
import { useState } from 'react';

export const Login = (): JSX.Element => {
  const [isError, setIsError] = useState<boolean>(false);
  const { login, isLoggingIn } = useAuth();

  const handleLogin = async (values: LoginFormValues) => {
    const response = await login(values);
    if (response.data === 401) {
      setIsError(true);
    } else {
    }
  };

  return (
    <div className={styles.root}>
      <FadeIn className={styles.root__wrapper}>
        <AuthCard
          form={LoginForm}
          onAuth={handleLogin}
          isAuthenticating={isLoggingIn}
        />
        <AccountExistence
          preText="Don't have an account?"
          linkText="Sign up"
          link="/signup"
        />
      </FadeIn>
    </div>
  );
};
