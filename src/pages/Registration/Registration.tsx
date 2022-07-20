import { useState } from 'react';

import { useLocation } from 'wouter';
import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  RegistrationForm,
  RegistrationFormValues,
  SuccessAnimation,
} from '@/components';
import { AuthUser, useAuth } from '@/api';
import styles from './Registration.module.scss';

export const Registration = (): JSX.Element => {
  const [location, setLocation] = useLocation();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { register, isRegistering } = useAuth();

  const handleRegistration = async (values: RegistrationFormValues) => {
    const response: AuthUser = await register(values);

    if (response?.hasErrors) {
      return response.fieldErrors;
    }

    setIsSuccess(true);

    return null;
  };

  const handleSuccessfulRegistration = () => {
    setLocation('/signin');
  };

  return (
    <div className={styles.root}>
      <FadeIn className={styles.root__wrapper}>
        <AuthCard
          form={RegistrationForm}
          onAuth={handleRegistration}
          isAuthenticating={isRegistering}
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
