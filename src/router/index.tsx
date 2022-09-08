import React from 'react';
import { useAppSelector } from '@/store';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Lazy from './Lazy';

import routes from './routes';

export { routes };

const AppRouter = () => {
  const { token } = useAppSelector((state) => state.app);

  return (
    <Router>
      <Switch>
        <Route path="/login" element={<Lazy render={React.lazy(() => import('@/pages/login'))} />} />
        {routes.map((v) => {
          return <Route key={v.path} path={v.path} element={!!token ? v.element : <Navigate to={'/login'} />} />;
        })}
        <Route path="*" element={<Navigate to={'/404'} />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
