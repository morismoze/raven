import FadeIn from 'react-fade-in';
import classNames from 'classnames';

import styles from './AuthNotificationMessage.module.scss';

export enum AuthNotificationMessageType {
  success = 'success',
  error = 'error',
}

interface AuthNotificationMessageProps {
  message: string;
  type: AuthNotificationMessageType;
}

export const AuthNotificationMessage = ({
  message,
  type,
}: AuthNotificationMessageProps): JSX.Element => {
  return (
    <FadeIn>
      <div
        className={classNames(
          styles.root,
          { [styles.success]: type === AuthNotificationMessageType.success },
          { [styles.error]: type === AuthNotificationMessageType.error },
        )}
      >
        <span className={styles.root__message}>{message}</span>
      </div>
    </FadeIn>
  );
};
