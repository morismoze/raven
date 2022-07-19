import FadeIn from 'react-fade-in';

import {
  AccountExistence,
  AuthCard,
  RegistrationForm,
  RegistrationFormValues,
} from '@/components';
import { useAuth } from '@/api';
import styles from './Registration.module.scss';

export const Registration = (): JSX.Element => {
  const { register, isRegistering } = useAuth();

  const handleRegistration = async (values: RegistrationFormValues) => {
    const response = await register(values);

    if (response?.hasErrors) {
      return response.fieldErrors;
    }

    return null;
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
    </div>
  );
};
