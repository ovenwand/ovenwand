import { useId } from 'react';

export function Deep({ state }) {
  console.log('render Deep', useId());

  return (
    <h2 onClick={() => state.deep++}>Deep: {state.deep}</h2>
  );
}