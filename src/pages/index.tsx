import { Link } from 'react-router-dom';

import { routes } from '@/router';

const Index = () => {
  return (
    <>
      <h3>我是首页</h3>
      {routes
        .filter((v) => v.path !== '/')
        .map((v) => (
          <Link key={v.path} to={v.path}>
            {v.meta.title}
          </Link>
        ))}
    </>
  );
};

export default Index;
