import React from 'react';
import { PathRouteProps } from 'react-router-dom';

import LazyComponent from './LazyCompoent';

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
    element: <LazyComponent render={React.lazy(() => import('@/pages/index'))} />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/admin',
    element: <LazyComponent render={React.lazy(() => import('@/pages/admin'))} />,
    meta: {
      title: '管理员'
    }
  },
  {
    path: '/backend',
    element: <LazyComponent render={React.lazy(() => import('@/pages/backend'))} />,
    meta: {
      title: '后台'
    }
  },
  {
    path: '/404',
    element: <LazyComponent render={React.lazy(() => import('@/pages/404'))} />,
    meta: {
      title: '404错误'
    }
  }
];

export default routes;
