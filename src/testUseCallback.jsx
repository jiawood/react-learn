import { useCallback, useMemo, useState } from "react";

const Child = () => {
  console.log(23)
  return <div onClick={() => console.log(12)}>child</div>;
};

const funccount = new Set()

const Parent = () => {
  const [title, setTitle] = useState(false);
  const [count, setCount] = useState(0);
  const click = useCallback(() => setTitle(!title),[title])
  funccount.add(click)
  alert(funccount.size)
  return (
    <div>
      <div>
        <span>{title ? 'true' : 'false'}</span>
        <Child></Child>
      </div>
      <button onClick={click}>change</button>
      <div>{count}</div>
      <button onClick={() => setCount(count+1)}>count</button>
    </div>
  );
};

export default Parent;
