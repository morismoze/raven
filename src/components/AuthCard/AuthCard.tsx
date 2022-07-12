import { Google } from 'react-bootstrap-icons';

import { Button, ButtonSize, ButtonAction, ToS, AuthForm } from '@/components';
import styles from './AuthCard.module.scss';

export const AuthCard = (): JSX.Element => {
  const handleGoogleAuth = () => {
    // google auth
  };

  return (
    <div className={styles.root}>
      <Button
        onClick={handleGoogleAuth}
        size={ButtonSize.large}
        action={ButtonAction.primary}
        Icon={Google}
      >
        Sign in with Google
      </Button>
      <span className={styles.root__alternativeBinder}>Or continue with</span>
      <div className={styles.root__alternativeContainer}>
        <AuthForm />
      </div>
      <ToS />
    </div>
  );
};
