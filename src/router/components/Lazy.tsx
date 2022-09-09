import React, { Suspense } from 'react';
import Loading from './Loading';

interface Props {
  render: ReturnType<typeof React.lazy>;
}

export default function Lazy({ render: Content }: Props) {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Content />
    </Suspense>
  );
}
