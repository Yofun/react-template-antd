import { useState } from "react";
import Transfer, { TransferOptionsType } from "./Transfer";

const Lesson001 = () => {
  const [value, setValue] = useState<string[]>(["1"]);
  const [options] = useState<TransferOptionsType[]>([
    {
      id: "1",
      name: "0001",
    },
    {
      id: "2",
      name: "0002",
    },
    {
      id: "3",
      name: "0003",
    },
    {
      id: "4",
      name: "0004",
    },
    {
      id: "5",
      name: "0005",
    },
    {
      id: "6",
      name: "0006",
    },
  ]);

  return (
    <div style={{ width: "600px", margin: "20px auto" }}>
      <Transfer
        value={value}
        options={options}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
      ></Transfer>
    </div>
  );
};

export default Lesson001;
