import { useState } from 'react';

import { AxiosError } from 'axios';
import FadeIn from 'react-fade-in';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

import {
  AlternateLoader,
  Button,
  ButtonAction,
  ButtonSize,
  Logo,
  NotificationMessage,
  NotificationMessageType,
} from '@/components';
import { ActivationEmailResendResponseDto, resendActivationEmail } from '@/api';
import styles from './PostRegistration.module.scss';

export const PostRegistration = (): JSX.Element => {
  const [notification, setNotification] = useState<string>('');

  const { mutate, isLoading } = useMutation(
    () => resendActivationEmail(Number(window.location.search.split('=')[1])),
    {
      onSuccess: () => {
        setNotification('');
        toast.success('Activation email resent!', {
          style: {
            fontSize: 13,
            color: 'var(--bg-main)',
          },
          iconTheme: {
            primary: 'var(--success)',
            secondary: '#FFFAEE',
          },
        });
      },
      onError: (err: AxiosError) => {
        const message = (err.response?.data as ActivationEmailResendResponseDto)
          .message!;
        setNotification(message);
      },
    },
  );

  const handleResendActivationEmail = () => {
    mutate();
  };

  return (
    <div className={styles.root}>
      <FadeIn className={styles.root__wrapper}>
        <Logo />
        <div className={styles.root__contentContainer}>
          <span className={styles.root__title}>Thank you</span>
          <span className={styles.root__text}>
            Great! Thank you for registering on{' '}
            <span className={styles.root__logo}>raven</span>!
          </span>
          <span className={styles.root__text}>
            We've reserved your space and sent you an activation link to your
            email address. Be sure to check it out!
          </span>
          <div className={styles.root__separator} />
          <span className={styles.root__text}>Didn't get the email?</span>
          <NotificationMessage
            active={Boolean(notification)}
            message={notification}
            type={NotificationMessageType.error}
          />
          <Button
            size={ButtonSize.small}
            action={ButtonAction.primary}
            onClick={handleResendActivationEmail}
            Icon={ArrowRepeat}
            disabled={isLoading}
          >
            <div className={styles.root__submitContainer}>
              <span>Resend email</span>
              <AlternateLoader isLoading={isLoading} />
            </div>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};
