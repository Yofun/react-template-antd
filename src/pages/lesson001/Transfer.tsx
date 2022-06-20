import React, { useState, useMemo } from "react";

import List from "./List";
import styles from "./transfer.module.scss";

export interface TransferOptionsType {
  id: string;
  name: string;
}

export interface TransferBridgeOptionsType extends TransferOptionsType {
  checked: boolean;
  selected: boolean;
}

interface Props {
  value: string[];
  options: TransferOptionsType[];
  onChange: (value: string[]) => void;
}

const Transfer: React.FC<Props> = ({ value, options, onChange }) => {
  const genTempData = () => {
    const temp = JSON.parse(
      JSON.stringify(options)
    ) as TransferBridgeOptionsType[];
    temp.forEach((v) => {
      v.checked = false;
      v.selected = value.includes(v.id);
    });
    return temp;
  };
  const [list, setList] = useState<TransferBridgeOptionsType[]>(genTempData());

  const left = useMemo(() => list.filter((v) => !v.selected), [list]);
  const right = useMemo(() => list.filter((v) => v.selected), [list]);

  const toLeftEnabled = useMemo(() => {
    return !right.filter((v) => v.checked).length;
  }, [right]);

  const toRightEnabled = useMemo(() => {
    return !left.filter((v) => v.checked).length;
  }, [left]);

  const handleSelect = (value: boolean, id: string) => {
    setList((pre) => {
      pre = [...pre];
      const item = pre.find((v) => v.id === id);
      item!.checked = value;
      return pre;
    });
  };

  const handleChange = () => {
    onChange(list.filter((v) => v.selected).map((v) => v.id));
  };

  const handleToRight = () => {
    const selectids = left.filter((v) => v.checked).map((v) => v.id);
    setList((pre) => {
      pre = [...pre];
      pre.forEach((v) => {
        if (selectids.includes(v.id)) {
          v.selected = true;
        }
      });
      return pre;
    });
    setTimeout(() => {
      handleChange();
    });
  };

  const handleToLeft = () => {
    const selectids = right.filter((v) => v.checked).map((v) => v.id);
    setList((pre) => {
      pre = [...pre];
      pre.forEach((v) => {
        if (selectids.includes(v.id)) {
          v.selected = false;
        }
      });
      return pre;
    });
    setTimeout(() => {
      handleChange();
    });
  };

  return (
    <div className={styles.transfer}>
      <List
        data={left}
        className="transfer_pannel transfer_left"
        onSelect={handleSelect}
      />
      <div className="transfer_operation">
        <button
          style={{ marginBottom: "5px" }}
          disabled={toRightEnabled}
          onClick={handleToRight}
        >
          &gt;
        </button>
        <button disabled={toLeftEnabled} onClick={handleToLeft}>
          &lt;
        </button>
      </div>
      <List
        data={right}
        className="transfer_pannel transfer_right"
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Transfer;
