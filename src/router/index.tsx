import React from 'react';
import { useAppSelector } from '@/store';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';

import routes from './routes';

export { routes };

const AppRouter = () => {
  const { token } = useAppSelector((state) => state.app);

  return (
    <Router>
      <Switch>
        <Route index element={<Navigate to={token ? '/' : '/login'} replace />} />
        {routes.map((v) => {
          return <Route key={v.path} path={v.path} element={v.element} />;
        })}
        <Route path="*" element={<Navigate to={'/404'} />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
