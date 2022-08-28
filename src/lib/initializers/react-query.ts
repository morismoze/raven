import { QueryClient, DefaultOptions, setLogger } from 'react-query';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },
};

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
