import { FC, useRef } from "react";
import axios, { Canceler } from "axios";
import http from "./http";

const CancelToken = axios.CancelToken;

interface Props {}

const AxiosTest: FC<Props> = () => {
  const cancelTokenRef = useRef<Canceler>();

  const handleClick = async () => {
    try {
      if (cancelTokenRef.current) {
        cancelTokenRef.current();
      }
      await Promise.all([
        http.get("https://www.baidu.com", {
          ignoreError: true,
          cancelToken: new CancelToken((c) => {
            cancelTokenRef.current = c;
          }),
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
