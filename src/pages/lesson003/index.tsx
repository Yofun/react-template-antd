import { FC, useRef } from "react";
import axios, { CancelTokenSource } from "axios";
import http from "./http";

interface Props {}

const AxiosTest: FC<Props> = () => {
  const cancelTokenRef = useRef<CancelTokenSource>();

  const handleClick = async () => {
    try {
      cancelTokenRef.current?.cancel("CancelPrevRequestKey");
      cancelTokenRef.current = axios.CancelToken.source();
      await Promise.all([
        http.get("https://www.baidu.com", {
          ignoreError: true,
          cancelToken: cancelTokenRef.current.token,
        }),
        // http.get("https://www.github.com"),
      ]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>start</button>
    </>
  );
};

export default AxiosTest;
