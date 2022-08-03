import { StrictMode } from "react";
import { setup } from "../setup";
import { ref } from "../ref";
// import { customRef } from "../customRef";
// import { reactive } from "../reactive";
import { Child } from "./Child";

// function debounce<Type>(value: Type, delay = 200) {
//   return customRef<Type>(value, (track, trigger) => {
//     let timeout;
//
//     return {
//       get() {
//         track(value);
//         return value;
//       },
//       set(newValue) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//           value = newValue;
//           trigger(value);
//         }, delay);
//       }
//     };
//   });
// }

export function ReactApp(props: { count?: number }) {
  console.log("========================================\nrender ReactApp");

  const state = setup(() => ({
    primitive: ref(props.count || 0),
    child: ref(props.count || 0),
  }));

  // console.log(state);

  // const primitive = ref(props.count || 0);
  // const child = ref(props.count || 0);

  function onClick() {
    // primitive.current++;
    state.primitive.current++;
  }

  return (
      <>
        <h1>Test</h1>

        <div>
          <a href="/experiments/react/home">Home</a>
          <a href="/experiments/react/not-home">Not home</a>
        </div>

        <button onClick={onClick}>
          Click me
        </button>

        {/*<div>primitive: {primitive.current}</div>*/}
        <div>primitive: {state.primitive.current}</div>

        {/*<Child count={child} />*/}
        <Child count={state.child} />
      </>
  );
}
