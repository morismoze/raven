import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from '@/api/auth';
import { queryClient } from '@/lib/react-query';

const Loader = (): JSX.Element => {
  return <div>custom spinner</div>;
};

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

interface AppProviderProps {
  children: React.ReactNode;
}
console.log('test');
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
