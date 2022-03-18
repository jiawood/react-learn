import React, { createRef, useEffect } from "react";
import { useRef, useCallback, useState } from "react";

const TestRef = () => {
  const inputElement = useRef();
  window.inputElement = inputElement;
  const [height, setHeight] = useState(0);
  const measureRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const click = () => {
    console.log(inputElement);
    inputElement.current.focus();
  };

  const [index, setIndex] = useState(1);
  const refFromUseRef = useRef();
  const refFromCreatRef = createRef();

  // if(!refFromCreatRef.current){
  //   refFromCreatRef.current = index;
  // }
  // if(!refFromUseRef.current){
  //   refFromUseRef.current = index;
  // }

  useEffect(() => {
    refFromUseRef.current = index 
  },[])

  const refIndex = createRef()
  refIndex.current = index 

  const handleAlert = () => {
    setTimeout(() => {
      alert(refIndex.current)
    },3000)
  }

  return (
    <>
      <input type="text" ref={inputElement}></input>
      <button onClick={click}>focus input</button>
      <h1 ref={measureRef}>hello</h1>
      <h2>the above header {Math.round(height)} px </h2>

      <br></br>
      <h1>useRef:{refFromUseRef.current}</h1>
      <h1>createRef:{refFromCreatRef.current}</h1>
      <button onClick={() => setIndex(index + 1)}>click index {index}</button>
      <br></br>
      <button onClick={handleAlert}>showAlert</button>
    </>
  );
};

export default TestRef;
