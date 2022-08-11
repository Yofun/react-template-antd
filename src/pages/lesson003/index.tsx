import { FC } from "react";
import http from "./http";

interface Props {}

const AxiosTest: FC<Props> = () => {
  const handleClick = async () => {
    try {
      const result = await http.get("https://www.baidu.com");
      console.log("success", result);
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
