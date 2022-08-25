import throttle from "lodash/throttle";

export function createThrottlePool() {
  const cache: { [name: string]: () => void } = {};
  return function (hash: string, handler: () => void) {
    if (!cache[hash]) {
      cache[hash] = () => {
        handler();
        setTimeout(() => {
          delete cache[hash];
        }, 5000);
      };
      cache[hash]();
    }
  };
}

const pool = createThrottlePool();

const View = () => {
  return (
    <>
      <button
        onClick={() => {
          pool("test", () => {
            console.log(2222);
          });
        }}
      >
        开始
      </button>
    </>
  );
};

export default View;
