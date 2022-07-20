import { useState } from 'react';

import { useLocation } from 'wouter';
import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  AuthNotificationMessageType,
  LoginForm,
  LoginFormValues,
  SuccessAnimation,
} from '@/components';
import { AuthUser, useAuth } from '@/api';
import styles from './Login.module.scss';

export const Login = (): JSX.Element => {
  const [location, setLocation] = useLocation();

  const { login, isLoggingIn } = useAuth();

  const [notification, setNotification] = useState<string>('');

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleLogin = async (values: LoginFormValues) => {
    const response: AuthUser = await login(values);

    if (response.data === 401) {
      setNotification('Incorrect username or password');
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
  };

  const handleSuccessfulLogin = () => {
    setLocation('/');
  };

  return (
    <div className={styles.root}>
      <FadeIn className={styles.root__wrapper}>
        <AuthCard
          form={LoginForm}
          onAuth={handleLogin}
          isAuthenticating={isLoggingIn}
          notificationMessage={!isSuccess ? notification : undefined}
          notificationType={AuthNotificationMessageType.error}
        />
        <AccountExistence
          preText="Don't have an account?"
          linkText="Sign up"
          link="/signup"
        />
      </FadeIn>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSuccessfulLogin}
      />
    </div>
  );
};
