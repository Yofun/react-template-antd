import React, { useCallback } from 'react';
import { Route } from 'react-router-dom';

import { useAppSelector } from '@/store';
import { RouteProps } from './routes';
import AuthRoute from './components/AuthRoute';

export function useAppRouterHook() {
  const { token, roles } = useAppSelector((state) => state.app);

  const renderRoutes = useCallback(
    (routes: RouteProps[], parent: string = '') => {
      return routes.map((v) => {
        const hasPre = /^\//.test(v.path);
        const key = `${parent}${hasPre ? v.path : '/' + v.path}`;
        return (
          <Route
            key={key}
            path={v.path}
            element={
              <AuthRoute token={token} route={v} roles={roles}>
                {v.element}
              </AuthRoute>
            }
          >
            {!!v.children && renderRoutes(v.children, key)}
          </Route>
        );
      });
    },
    [roles, token]
  );

  return {
    renderRoutes
  };
}
