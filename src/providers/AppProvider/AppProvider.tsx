import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import { Error, Loader } from '@/components';
import { AuthProvider } from '@/api/auth/auth';
import { UploadProvider } from '@/context';
import { queryClient } from '@/lib/initializers/react-query';
import styles from './AppProvider.module.scss';

interface IAppProviderProps {
  children: React.ReactNode;
}

const APPLICATION_ERROR_TITLE = 'Application error';
const APPLICATION_ERROR =
  "We're sorry this error happened.\nTry reloading the page or going back to the homepage.";

const Fallback = (props: FallbackProps) => {
  return (
    <Error
      {...props}
      title={APPLICATION_ERROR_TITLE}
      text={APPLICATION_ERROR}
      className={styles.error}
    />
  );
};

export const AppProvider = ({ children }: IAppProviderProps) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={Fallback} key="global-error-boundary">
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <UploadProvider>{children}</UploadProvider>
              <Toaster position="bottom-left" />
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
