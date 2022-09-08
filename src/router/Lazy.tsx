import React, { Suspense } from 'react';

interface Props {
  render: ReturnType<typeof React.lazy>;
}

export default function Lazy({ render: Content }: Props) {
  return (
    <Suspense fallback={<h2>loading.......</h2>}>
      <Content />
    </Suspense>
  );
}
