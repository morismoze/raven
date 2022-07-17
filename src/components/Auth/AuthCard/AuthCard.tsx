import { Google } from 'react-bootstrap-icons';

import { Button, ButtonSize, ButtonAction, ToS } from '@/components';
import styles from './AuthCard.module.scss';

interface AuthCardLayoutProps {
  form: React.ElementType;
  onAuth: (values: any) => void;
  isAuthenticating: boolean;
}

export const AuthCard = ({
  form: Form,
  onAuth,
  isAuthenticating,
}: AuthCardLayoutProps): JSX.Element => {
  const handleGoogleAuth = () => {};

  return (
    <div className={styles.root}>
      <Button
        onClick={handleGoogleAuth}
        size={ButtonSize.large}
        action={ButtonAction.primary}
        Icon={Google}
      >
        Continue with Google
      </Button>
      <span className={styles.root__alternativeBinder}>Or continue with</span>
      <Form onAuth={onAuth} isAuthenticating={isAuthenticating} />
      <ToS />
    </div>
  );
};
