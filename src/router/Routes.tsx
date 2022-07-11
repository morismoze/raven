import { Route, Switch } from 'wouter';

import { PrivateRoute } from './PrivateRoute';
import { lazyImport } from '@/utils';

const { Login } = lazyImport(() => import('@/pages'), 'Login');
const { Home } = lazyImport(() => import('@/pages'), 'Home');
const { UserProfile } = lazyImport(() => import('@/pages'), 'UserProfile');
const { FourZeroFour } = lazyImport(() => import('@/pages'), 'FourZeroFour');

export const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <PrivateRoute path="/user/:id" component={UserProfile} />
      <Route component={FourZeroFour} />
    </Switch>
  );
};
