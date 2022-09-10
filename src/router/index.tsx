import React from 'react';
import { BrowserRouter as Router, Routes as Switch } from 'react-router-dom';

import routes from './routes';
import { useAppRouterHook } from './hooks';

export { routes };

const AppRouter = () => {
  const { renderRoutes } = useAppRouterHook();
  return (
    <Router>
      <Switch>
        <React.Fragment>{renderRoutes(routes)}</React.Fragment>
      </Switch>
    </Router>
  );
};

export default AppRouter;
