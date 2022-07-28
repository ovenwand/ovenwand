import { component, ref, reactive } from './lib';
import './App.css'
import { useCallback } from "react";

export default component(
  () => {
    const text = ref('Hello');

    const subtext = reactive({
      content: "To bold or not to bold, that's the question.",
      bold: true,
    });

    const toggle = useCallback(function toggle() {
      text.current = text.current === 'Hello' ? 'world' : 'Hello';
      subtext.bold = !subtext.bold;
    }, [text, subtext]);

    return {
      text,
      subtext,
      toggle,
    };
  },
  ({ text, subtext, toggle }) => (
    <>
      <h1>{text}</h1>

      <h2 style={{ fontWeight: subtext.bold ? 'bold' : 'normal' }}>
        {subtext.content}
      </h2>

      <button onClick={toggle}>Click me!</button>
    </>
  )
);
