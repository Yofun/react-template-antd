import { PathRouteProps } from "react-router-dom";

// routes
import Index from "../pages";
import Lesson001 from "../pages/lesson001";
import Lesson002 from "../pages/lesson002";
import Lesson003 from "../pages/lesson003";

export interface RouteProps extends PathRouteProps {
  title: string;
}

const routes: RouteProps[] = [
  {
    path: "/",
    element: <Index />,
    title: "index",
  },
  {
    path: "/lesson001",
    element: <Lesson001 />,
    title: "lesson001: transfer demo",
  },
  {
    path: "/lesson002",
    element: <Lesson002 />,
    title: "lesson002: Promise limit",
  },
  {
    path: "/lesson003",
    element: <Lesson003 />,
    title: "lesson003: axios test",
  },
];

export default routes;
