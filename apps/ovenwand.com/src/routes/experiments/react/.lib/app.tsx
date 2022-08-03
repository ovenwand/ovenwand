import { StrictMode } from 'react';
import { ReactApp } from "./components/ReactApp";

export function App({ count } = { count: 0 }) {
  return (
    <StrictMode>
      <ReactApp count={count}/>
    </StrictMode>
  );
}