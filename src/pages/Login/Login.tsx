import { useState } from 'react';

import { useLocation } from 'wouter';
import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  AuthNotificationMessageType,
  LoginForm,
  ILoginFormValues,
  SuccessAnimation,
} from '@/components';
import { AuthUser, useAuth } from '@/api';
import styles from './Login.module.scss';

const LOGIN_ERROR_MESSAGE =
  'There was a problem during logging in. Try again later.';

const INCORRECT_CREDENTIALS = 'Incorrect username or password';

export const Login = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const { login, isLoggingIn } = useAuth();

  const [notification, setNotification] = useState<string>('');

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleLogin = async (values: ILoginFormValues) => {
    const response: AuthUser = await login(values);

    if (response?.hasErrors) {
      if (response?.fieldErrors.length > 0) {
        return response.fieldErrors;
      } else if (response.message === '401') {
        setNotification(INCORRECT_CREDENTIALS);
      } else {
        setNotification(LOGIN_ERROR_MESSAGE);
      }
    } else {
      // resetting notification so the previous error message dissapears
      setNotification('');
      setIsSuccess(true);
      return null;
    }
  };

  const handleSuccessfulLogin = () => {
    const prevPath = localStorage.getItem('prevPath');
    location.replace(prevPath || '/');
  };

  return (
    <div className={styles.root}>
      <FadeIn className={styles.root__wrapper}>
        <AuthCard
          form={LoginForm}
          onAuth={handleLogin}
          isAuthenticating={isLoggingIn}
          notificationMessage={notification}
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
