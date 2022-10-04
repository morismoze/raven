import { useState } from 'react';

import { Helmet } from 'react-helmet-async';
import FadeIn from 'react-fade-in';
import { useLocation } from 'wouter';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

import {
  NotificationMessageType,
  SuccessAnimation,
  NotificationMessage,
  ForgotPasswordForm,
  IForgotPasswordFormValues,
  Logo,
} from '@/components';
import {
  ForgotPasswordResponseDto,
  ForgotPasswordRequestDto,
  sendPasswordResetEmail,
} from '@/api';
import styles from './ForgotPassword.module.scss';

export const ForgotPassword = (): JSX.Element => {
  const [notification, setNotification] = useState<string>('');

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>();

  const [, setLocation] = useLocation();

  const { mutate, isLoading } = useMutation<
    ForgotPasswordResponseDto,
    AxiosError,
    ForgotPasswordRequestDto
  >((data) => sendPasswordResetEmail(data), {
    onSuccess: (data) => {
      setIsSuccess(true);
      setUserId(data.data.id);
      setNotification('');
    },
    onError: (err) => {
      setNotification(
        (err.response?.data as ForgotPasswordResponseDto).message!,
      );
    },
  });

  const handleSugmitEmail = (values: IForgotPasswordFormValues) => {
    mutate(values);
  };

  const handleSUccessfulEmailSubmit = () => {
    setLocation(`/post-password-reset?uid=${userId}`);
  };

  return (
    <>
      <Helmet>
        <title>Raven &bull; Forgot Password</title>
      </Helmet>
      <div className={styles.root}>
        <FadeIn className={styles.root__wrapper}>
          <Logo />
          <div className={styles.root__contentContainer}>
            <span className={styles.root__title}>Password reset</span>
            <span className={styles.root__text}>
              Enter your email address below and we'll send you a link to reset
              your password.
            </span>
            <NotificationMessage
              active={Boolean(notification)}
              message={notification}
              type={NotificationMessageType.error}
            />
            <ForgotPasswordForm
              onAuth={handleSugmitEmail}
              isAuthenticating={isLoading}
            />
          </div>
        </FadeIn>
      </div>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSUccessfulEmailSubmit}
      />
    </>
  );
};
