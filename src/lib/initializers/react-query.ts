import { QueryClient, DefaultOptions } from 'react-query';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
