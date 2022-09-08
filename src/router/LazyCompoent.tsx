import React, { Suspense } from 'react';

interface Props {
  render: ReturnType<typeof React.lazy>;
}

const LazyComponent: React.FC<Props> = (props) => {
  const Content = props.render;
  return (
    <Suspense fallback={<h2>loading.......</h2>}>
      <Content />
    </Suspense>
  );
};

export default LazyComponent;
