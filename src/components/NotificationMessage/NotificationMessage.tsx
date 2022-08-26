import FadeIn from 'react-fade-in';
import classNames from 'classnames';

import styles from './NotificationMessage.module.scss';

export enum NotificationMessageType {
  success = 'success',
  info = 'info',
  error = 'error',
}

interface INotificationMessageProps {
  message: string;
  type: NotificationMessageType;
}

export const NotificationMessage = ({
  message,
  type,
}: INotificationMessageProps): JSX.Element => {
  return (
    <FadeIn>
      <div
        className={classNames(
          styles.root,
          { [styles.success]: type === NotificationMessageType.success },
          { [styles.info]: type === NotificationMessageType.info },
          { [styles.error]: type === NotificationMessageType.error },
        )}
      >
        <span className={styles.root__message}>{message}</span>
      </div>
    </FadeIn>
  );
};
