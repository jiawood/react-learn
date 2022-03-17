// import { useState } from "react";
import * as React from "react";
import { render } from "./index";

let state;

function useState(initialValue) {
  state = state || initialValue;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}

let _deps;

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const hasChangeDeps = _deps
    ? !depArray.every((v, i) => v === depArray[i])
    : true;
  if (hasNoDeps || hasChangeDeps) {
    callback();
    _deps = depArray;
  }
}

const Count = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count)
  },[])

  const add = () => {
    setCount(count + 1);
  };

  const minus = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={add}>+</button>
      <button onClick={minus}>-</button>
    </div>
  );
};

export default Count;
