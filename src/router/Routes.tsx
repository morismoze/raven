import { Route, Switch } from 'wouter';

import { PrivateRoute } from './PrivateRoute';
import { lazyImport } from '@/utils';

const { Auth } = lazyImport(() => import('@/pages'), 'Auth');
const { Home } = lazyImport(() => import('@/pages'), 'Home');
const { UserProfile } = lazyImport(() => import('@/pages'), 'UserProfile');
const { FourZeroFour } = lazyImport(() => import('@/pages'), 'FourZeroFour');

export const Routes = () => {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <PrivateRoute path="/user/:id" component={UserProfile} />
      <Route component={FourZeroFour} />
    </Switch>
  );
};
