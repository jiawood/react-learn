import React from "react";
import ReactDOM from "react-dom";
import TextRef from "./testRef";
import TextAsync from './testAsync'
import TextUseCallback from './testUseCallback'

let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    if(newState instanceof Function){
      memoizedState[currentCursor] = newState(memoizedState[currentCursor])
    }else{
      memoizedState[currentCursor] = newState;
    }
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("fan");
  const [flag, setFlag] = useState(false);
  const flagRef = React.useRef(flag)
  flagRef.current = flag 
  let timer;

  function handleTimerClick() {
    setFlag(!flagRef.current);
    setFlag(!flagRef.current)
    timer = setTimeout(() => {
      setFlag(!flagRef.current);
    }, 2000);
  }

  // useEffect(() => {
  //   console.log(count);
  // }, [count]);
  // useEffect(() => {
  //   console.log(username);
  // }, [username]);
  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击
      </button>
      <div>{username}</div>
      <button
        onClick={() => {
          setUsername(username + " hello");
        }}
      >
        点击
      </button>
      <button onClick={handleTimerClick}>{flag ? 'true' : 'false'}</button>
      <br></br>
      {/* <TextAsync></TextAsync> */}
      <TextUseCallback></TextUseCallback>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  cursor = 0;
  ReactDOM.render(<App />, rootElement);
}
render();
