import React, { useState, useCallback, useEffect } from "react";

import { useLocalforage } from "./use-localforage";

const View = () => {
  const { data, set, remove, clear } = useLocalforage<string>("input");

  const [value, setValue] = useState("");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      set(value);
      setValue(value);
    },
    [set]
  );

  const handleRemove = useCallback(() => {
    remove();
  }, [remove]);

  const handleClear = useCallback(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    setValue(data || "");
  }, [data]);

  return (
    <div>
      <input type="text" value={value} onChange={(e) => onChange(e)} />
      <button onClick={() => handleRemove()}>delete</button>
      <button onClick={() => handleClear()}>clear</button>
    </div>
  );
};

export default View;
