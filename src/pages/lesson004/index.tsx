import React, { useState, useEffect } from "react";

import { useLocalforage } from "./use-localforage";

interface User {
  name?: string;
  age?: string;
}

const View = () => {
  const {
    data: userDraft,
    set: setUserDraft,
    remove: removeUserDraft,
  } = useLocalforage<User>("username");

  const [user, setUser] = useState<User>(userDraft || {});
  const onUserChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "name" | "age"
  ) => {
    const value = e.target.value;
    const u = { ...user, [type]: value };
    setUser(u);
    setUserDraft(u);
  };

  useEffect(() => {
    setUser(userDraft || {});
  }, [userDraft]);

  return (
    <div>
      <h3>固定key: usename</h3>
      <input
        key={"name"}
        type="text"
        value={user.name || ""}
        onChange={(e) => onUserChange(e, "name")}
      />
      <br />
      <input
        key={"age"}
        type="text"
        value={user.age || ""}
        onChange={(e) => onUserChange(e, "age")}
      />
      <br />
      <button onClick={() => removeUserDraft()}>delete</button>
    </div>
  );
};

export default View;
