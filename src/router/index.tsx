import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import routes from './routes';

const AppRouter = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Router>
        <Switch>
          {routes.map((v) => (
            <Route key={v.path} path={v.path} element={v.element} />
          ))}
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
