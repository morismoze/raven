import { Redirect, Route, RouteProps } from 'wouter';

import { useAuth } from '@/api/auth';
import { User } from '@/api';

export const PrivateRoute = (routeProps: RouteProps) => {
  const { user } = useAuth();

  if (!(user?.data as User).id) {
    return <Redirect to="/login" />;
  }

  return <Route {...routeProps} />;
};
