import React, { FC, useMemo, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch } from '@/store';
import { setRoles } from '@/store/slice/app';
import { RouteProps } from '../routes';

import Loading from './Loading';

interface Props {
  children: React.ReactNode;
  route: RouteProps;
  token?: string;
  roles?: string[];
}

const AuthRoute: FC<Props> = (props) => {
  const { route, token, roles, children } = props;

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const Element = useMemo(() => {
    // handle login
    if (route.path === '/login') {
      if (token) {
        return <Navigate to={'/'} replace />;
      }
      return children;
    } else {
      if (loading) {
        return <Loading />;
      }
      if (!token) {
        return <Navigate to={'/login'} replace />;
      } else {
        return children;
      }
    }
  }, [children, loading, route.path, token]);

  useEffect(() => {
    if (token && !roles?.length && !loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(setRoles(['admin']));
      }, 3000);
    }
    
  }, [dispatch, loading, roles?.length, token]);

  return <>{Element}</>;
};

export default AuthRoute;
