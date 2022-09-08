import React from 'react';
import { PathRouteProps } from 'react-router-dom';

import Lazy from './Lazy';

export interface RouteProps extends Omit<PathRouteProps, 'children'> {
  meta: {
    title: string;
  };
  children?: RouteProps[];
}

// public routes
const routes: RouteProps[] = [
  {
    path: '/',
    element: <Lazy render={React.lazy(() => import('@/pages/index'))} />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/admin',
    element: <Lazy render={React.lazy(() => import('@/pages/admin'))} />,
    meta: {
      title: '管理员'
    }
  },
  {
    path: '/backend',
    element: <Lazy render={React.lazy(() => import('@/pages/backend'))} />,
    meta: {
      title: '后台'
    }
  },
  {
    path: '/404',
    element: <Lazy render={React.lazy(() => import('@/pages/404'))} />,
    meta: {
      title: '404错误'
    }
  }
];

export default routes;
