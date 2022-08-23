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

interface IAuthCardLayoutProps {
  form: React.ElementType;
  onAuth: (values: any) => void;
  isAuthenticating: boolean;
  notificationMessage?: string;
  notificationType?: AuthNotificationMessageType;
}

const ACTIVATION_MESSAGE =
  'A verification link has been sent to your email address';

export const AuthCard = ({
  form: Form,
  onAuth,
  isAuthenticating,
  notificationMessage,
  notificationType,
}: IAuthCardLayoutProps): JSX.Element => {
  const handleGoogleAuth = () => {
    // google auth
  };

  const activation = localStorage.getItem('activation');

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
      {activation && (
        <AuthNotificationMessage
          message={ACTIVATION_MESSAGE}
          type={AuthNotificationMessageType.info}
        />
      )}
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
