import { useState } from 'react';

import FadeIn from 'react-fade-in';
import { useLocation } from 'wouter';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

import {
  PasswordResetForm,
  IPasswordResetFormValues,
  NotificationMessageType,
  SuccessAnimation,
  NotificationMessage,
} from '@/components';
import {
  PasswordResetRequestDto,
  PasswordResetResponseDto,
  resetPassword,
} from '@/api';
import styles from './PasswordReset.module.scss';

export const PasswordReset = (): JSX.Element => {
  const [notification, setNotification] = useState<string>('');

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [, setLocation] = useLocation();

  const { mutate, isLoading } = useMutation<
    PasswordResetResponseDto,
    AxiosError,
    PasswordResetRequestDto
  >((data) => resetPassword(window.location.search.split('=')[1], data), {
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err) => {
      setNotification(
        (err.response?.data as PasswordResetResponseDto).message!,
      );
    },
  });

  const handleResetPassword = (
    values: Omit<IPasswordResetFormValues, 'passwordConfirmation'>,
  ) => {
    mutate(values);
  };

  const handleSUccessfulPasswordReset = () => {
    setLocation('/signin');
  };

  return (
    <>
      <div className={styles.root}>
        <FadeIn className={styles.root__wrapper}>
          <div className={styles.root__formContainer}>
            {notification && (
              <NotificationMessage
                message={notification}
                type={NotificationMessageType.error}
              />
            )}
            <span className={styles.root__title}>Password reset</span>
            <span className={styles.root__text}>
              Enter your new password below.
            </span>
            <PasswordResetForm
              onAuth={handleResetPassword}
              isAuthenticating={isLoading}
            />
          </div>
        </FadeIn>
      </div>
      <SuccessAnimation
        show={isSuccess}
        onAnimationFinish={handleSUccessfulPasswordReset}
      />
    </>
  );
};
