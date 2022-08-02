import { Redirect, Route, RouteProps, useLocation } from 'wouter';

import { useAuth } from '@/api';

export const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const [location] = useLocation();

  const { user } = useAuth();

  if (!user?.data) {
    localStorage.setItem('prevPath', location);
    return <Redirect to="/signin" />;
  }

  return <Route {...props} />;
};
