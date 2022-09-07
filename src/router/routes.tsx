import { PathRouteProps } from 'react-router-dom';

// routes
import Index from '../pages';
import Lesson001 from '../pages/lesson001';
import Lesson002 from '../pages/lesson002';
import Lesson003 from '../pages/lesson003';
import Lesson004 from '../pages/lesson004';
import Lesson005 from '../pages/lesson005';
import Lesson006 from '../pages/lesson006';

export interface RouteProps extends PathRouteProps {
  meta: {
    title: string;
  };
}

const routes: RouteProps[] = [
  {
    path: '/',
    element: <Index />,
    meta: {
      title: 'index'
    }
  },
  {
    path: '/lesson001',
    element: <Lesson001 />,
    meta: {
      title: 'lesson001: transfer demo'
    }
  },
  {
    path: '/lesson002',
    element: <Lesson002 />,
    meta: {
      title: 'lesson002: Promise limit'
    }
  },
  {
    path: '/lesson003',
    element: <Lesson003 />,
    meta: {
      title: 'lesson003: axios test'
    }
  },
  {
    path: '/lesson004',
    element: <Lesson004 />,
    meta: {
      title: 'lesson004: localforage'
    }
  },
  {
    path: '/lesson005',
    element: <Lesson005 />,
    meta: {
      title: 'lesson005: throttlePool'
    }
  },
  {
    path: '/lesson006',
    element: <Lesson006 />,
    meta: {
      title: 'lesson006: axios useRequest'
    }
  }
];

export default routes;
