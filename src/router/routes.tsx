import React, { lazy } from 'react';
import { PathRouteProps, Navigate } from 'react-router-dom';

import Lazy from './components/Lazy';

export interface RouteProps extends Omit<PathRouteProps, 'children'> {
  meta: {
    title: string;
    auth?: string[];
    hidden?: true;
  };
  children?: RouteProps[];
}

// public routes
const routes: RouteProps[] = [
  {
    path: '/',
    element: <Lazy render={lazy(() => import('@/pages/index'))} />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    element: <Lazy render={lazy(() => import('@/pages/login'))} />,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/admin',
    element: <Lazy render={lazy(() => import('@/pages/admin'))} />,
    meta: {
      title: '管理员'
    }
  },
  {
    path: '/backend',
    element: <Lazy render={lazy(() => import('@/pages/backend'))} />,
    meta: {
      title: '后台'
    }
  },
  {
    path: '/404',
    element: <Lazy render={lazy(() => import('@/pages/404'))} />,
    meta: {
      title: '404错误'
    }
  },
  {
    path: '*',
    element: <Navigate to={'/404'} replace />,
    meta: {
      title: '*',
      hidden: true
    }
  }
];

export default routes;
