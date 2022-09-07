import React, { useMemo, useState } from 'react';

import { TransferBridgeOptionsType } from './Transfer';

interface ListProps {
  className?: string;
  data: TransferBridgeOptionsType[];
  onSelect: (checked: boolean, id: string) => void;
  onSelectAll?: (checked: boolean) => void;
}

const List: React.FC<ListProps> = ({ data, className, onSelect, onSelectAll }) => {
  const [selectAll] = useState(false);

  const isCheckAll = useMemo(() => (!!data.length && data.every((v) => v.checked)) || selectAll, [data, selectAll]);

  // useEffect(() => {
  //   if (data.length && data.every((v) => v.checked)) {
  //     setSelectAll(true);
  //   }
  // }, [data]);

  const handleCheck = (e: React.ChangeEvent, item: TransferBridgeOptionsType) => {
    onSelect(!item.checked, item.id);
  };

  return (
    <ul className={className}>
      {!!onSelectAll && (
        <li>
          <input type="checkbox" checked={isCheckAll} onChange={(e) => onSelectAll(e.target.checked)} />
          all
        </li>
      )}
      {data.map((v, index) => (
        <li key={v.id}>
          <input type="checkbox" checked={v.checked} onChange={(e) => handleCheck(e, v)} />
          {v.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
