import { useState } from 'react';

import { AxiosError } from 'axios';
import { ShieldCheck } from 'react-bootstrap-icons';
import FadeIn from 'react-fade-in';
import { useLocation } from 'wouter';
import { useMutation } from 'react-query';

import {
  AlternateLoader,
  NotificationMessage,
  NotificationMessageType,
  Button,
  ButtonAction,
  ButtonSize,
  SuccessAnimation,
  Logo,
} from '@/components';
import { activateAccount, ActivationResponseDto } from '@/api';
import styles from './AccountActivation.module.scss';

export const AccountActivation = () => {
  const [, setLocation] = useLocation();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [notification, setNotification] = useState<string>('');

  const { mutate, isLoading } = useMutation(
    () => activateAccount(window.location.search.split('=')[1]),
    {
      onSuccess: () => {
        setIsSuccess(true);
        setNotification('');
      },
      onError: (err: AxiosError) => {
        const message = (err.response?.data as ActivationResponseDto).message!;
        setNotification(message);
      },
    },
  );

  const handleActivation = () => {
    mutate();
  };

  const handleSuccessfulActivation = () => {
    setLocation('/signin');
  };

  return (
    <>
      <div className={styles.root}>
        <FadeIn className={styles.root__wrapper}>
          <Logo />
          <div className={styles.root__contentContainer}>
            <span className={styles.root__title}>Email activation</span>
            <div className={styles.root__textContainer}>
              <span className={styles.root__text}>
                Thank you for registering on{' '}
                <span className={styles.root__logo}>raven</span>!
              </span>
              <span className={styles.root__text}>
                To start exploring posts and people of raven activate your
                account by clicking the button below:
              </span>
            </div>
            <NotificationMessage
              active={Boolean(notification)}
              message={notification}
              type={NotificationMessageType.error}
            />
            <Button
              onClick={handleActivation}
              size={ButtonSize.small}
              action={ButtonAction.primary}
              Icon={ShieldCheck}
            >
              <div className={styles.root__submitContainer}>
                <span>Verify email</span>
                <AlternateLoader isLoading={isLoading} />
              </div>
            </Button>
          </div>
        </FadeIn>
      </div>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSuccessfulActivation}
      />
    </>
  );
};
