import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';

import { Loader } from '@/components';
import { AuthProvider } from '@/api/auth';
import { UploadProvider } from '@/context';
import { queryClient } from '@/lib/react-query';

const ErrorFallback = (): JSX.Element => {
  return (
    <div>
      <h2>Ooops, something went wrong</h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

interface IAppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <UploadProvider>{children}</UploadProvider>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
