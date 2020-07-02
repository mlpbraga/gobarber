import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AppProvider from '../context';

const Routes: React.FC = () => (
  <AppProvider>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/singup" component={SignUp} />
    </Switch>
  </AppProvider>
);

export default Routes;
