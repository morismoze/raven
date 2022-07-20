import { Google } from 'react-bootstrap-icons';

import {
  Button,
  ButtonSize,
  ButtonAction,
  ToS,
  AuthNotificationMessage,
  AuthNotificationMessageType,
} from '@/components';
import styles from './AuthCard.module.scss';

interface AuthCardLayoutProps {
  form: React.ElementType;
  onAuth: (values: any) => void;
  isAuthenticating: boolean;
  notificationMessage?: string;
  notificationType?: AuthNotificationMessageType;
}

export const AuthCard = ({
  form: Form,
  onAuth,
  isAuthenticating,
  notificationMessage,
  notificationType,
}: AuthCardLayoutProps): JSX.Element => {
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
        Continue with Google
      </Button>
      <span className={styles.root__alternativeBinder}>Or continue with</span>
      {notificationMessage && notificationType && (
        <AuthNotificationMessage
          message={notificationMessage}
          type={notificationType}
        />
      )}
      <Form onAuth={onAuth} isAuthenticating={isAuthenticating} />
      <ToS />
    </div>
  );
};
