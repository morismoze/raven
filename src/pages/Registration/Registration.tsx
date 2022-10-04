import { useState } from 'react';

import { useLocation } from 'wouter';
import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  NotificationMessageType,
  RegistrationForm,
  IRegistrationFormValues,
  SuccessAnimation,
  Logo,
} from '@/components';
import { AuthUser, useAuth, User } from '@/api';
import styles from './Registration.module.scss';
import { Helmet } from 'react-helmet-async';

export const Registration = (): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>();

  const [notification, setNotification] = useState<string>('');

  const [, setLocation] = useLocation();

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
      setUserId((response.data as User).id);
      setIsSuccess(true);
      return null;
    }
  };

  const handleSuccessfulRegistration = () => {
    setLocation(`/post-registration?uid=${userId}`);
  };

  return (
    <>
      <Helmet>
        <title>Raven &bull; Registration</title>
      </Helmet>
      <div className={styles.root}>
        <FadeIn className={styles.root__wrapper}>
          <Logo />
          <AuthCard
            form={RegistrationForm}
            onAuth={handleRegistration}
            isAuthenticating={isRegistering}
            notificationMessage={notification}
            notificationType={NotificationMessageType.error}
          />
          <AccountExistence
            preText="Already have an account?"
            linkText="Sign in"
            link="/signin"
          />
        </FadeIn>
      </div>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSuccessfulRegistration}
      />
    </>
  );
};
