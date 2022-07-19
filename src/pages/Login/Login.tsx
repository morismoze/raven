import { useState } from 'react';

import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  LoginForm,
  LoginFormValues,
} from '@/components';
import { useAuth } from '@/api';
import styles from './Login.module.scss';

export const Login = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const { login, isLoggingIn } = useAuth();

  const handleLogin = async (values: LoginFormValues) => {
    const response = await login(values);
    if (response === 403) {
      setError(true);
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
