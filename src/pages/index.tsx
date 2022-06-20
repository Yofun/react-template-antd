import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import { default as list } from "../router/routes";

const Index = () => {
  const routes = useMemo(() => {
    return list.filter((v) => v.path !== "/");
  }, []);

  return (
    <>
      <h3>I am a home page</h3>
      <ul>
        {routes.map((v) => (
          <li key={v.path}>
            <NavLink to={v.path}>{v.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Index;
