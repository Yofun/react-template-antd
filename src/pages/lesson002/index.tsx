import { FC } from "react";

function asyncPool<T, R>(
  limit = 1,
  list: T[],
  createPromiseFn: (item: T, index?: number, list?: T[]) => Promise<R>
) {
  let index = 0;
  let tem: Promise<void>[] = [];
  let all: Promise<R>[] = [];

  function create(): Promise<R | void> {
    if (index >= list.length) {
      return Promise.resolve();
    }
    const item = list[index];
    let p = Promise.resolve().then(() => createPromiseFn(item, index++, list));
    all.push(p);
    let e = p.then(() => {
      tem.splice(tem.indexOf(e), 1);
    });
    tem.push(e);
    let t = Promise.resolve();
    if (tem.length >= limit) {
      t = Promise.race(tem);
    }
    return t.then(() => create());
  }

  return create().then(() => Promise.all<R>(all));
}

interface ViewProps {}

const View: FC<ViewProps> = () => {
  const onClick = async () => {
    const result = await asyncPool(2, [1, 2, 3, 4, 5, 6, 7], (item) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(item);
          resolve(item);
        }, 2000);
      });
    });
    // eslint-disable-next-line no-console
    console.log(result);
  };

  return (
    <>
      <button onClick={onClick}>start</button>
    </>
  );
};

export default View;
