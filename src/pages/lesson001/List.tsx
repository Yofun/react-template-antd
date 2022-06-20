import React from "react";

import { TransferBridgeOptionsType } from "./Transfer";

interface ListProps {
  className?: string;
  data: TransferBridgeOptionsType[];
  onSelect: (checked: boolean, id: string) => void;
}

const List: React.FC<ListProps> = ({ data, className, onSelect }) => {
  const handleCheck = (
    e: React.ChangeEvent,
    item: TransferBridgeOptionsType
  ) => {
    onSelect(!item.checked, item.id);
  };

  return (
    <ul className={className}>
      {data.map((v, index) => (
        <li key={v.id}>
          <input
            type="checkbox"
            checked={v.checked}
            onChange={(e) => handleCheck(e, v)}
          />
          {v.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
