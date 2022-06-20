import { PathRouteProps } from "react-router-dom";

// routes
import Index from "../pages";
import Lesson001 from "../pages/lesson001";

export interface RouteProps extends PathRouteProps {
  title: string;
}

const routes: RouteProps[] = [
  {
    path: "/",
    element: <Index />,
    title: 'index'
  },
  {
    path: "/lesson001",
    element: <Lesson001 />,
    title: 'lesson001: transfer demo'
  },
];

export default routes;
