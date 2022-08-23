import { useState } from 'react';

import { useLocation } from 'wouter';
import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  AuthNotificationMessageType,
  RegistrationForm,
  IRegistrationFormValues,
  SuccessAnimation,
} from '@/components';
import { AuthUser, useAuth } from '@/api';
import styles from './Registration.module.scss';

export const Registration = (): JSX.Element => {
  const [, setLocation] = useLocation();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [notification, setNotification] = useState<string>('');

  const { register, isRegistering } = useAuth();

  const handleRegistration = async (values: IRegistrationFormValues) => {
    const response: AuthUser = await register(values);

    if (response && response.hasErrors) {
      if (response?.fieldErrors.length > 0) {
        return response.fieldErrors;
      } else {
        setNotification(response.message!);
      }
    } else {
      // resetting notification so the previous error message dissapears
      setNotification('');
      setIsSuccess(true);
      return null;
    }
  };

  const handleSuccessfulRegistration = () => {
    localStorage.setItem('activation', JSON.stringify('true'));
    setLocation('/signin');
  };

  return (
    <div className={styles.root}>
      <FadeIn className={styles.root__wrapper}>
        <AuthCard
          form={RegistrationForm}
          onAuth={handleRegistration}
          isAuthenticating={isRegistering}
          notificationMessage={notification}
          notificationType={AuthNotificationMessageType.error}
        />
        <AccountExistence
          preText="Already have an account?"
          linkText="Sign in"
          link="/signin"
        />
      </FadeIn>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSuccessfulRegistration}
      />
    </div>
  );
};
