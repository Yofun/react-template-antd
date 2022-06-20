import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import routes from "./routes";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        {routes.map((v) => (
          <Route key={v.path} path={v.path} element={v.element}/>
        ))}
      </Switch>
    </Router>
  );
};

export default AppRouter;
