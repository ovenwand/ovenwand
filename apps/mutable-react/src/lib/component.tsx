import React from "react";
import { unwrapAll, type MaybeRef, type UnwrapRef } from "./ref";

export type ComponentSetup<Props extends Record<string, unknown>, State extends Record<string, MaybeRef>> = (props: Props) => State;
export type ComponentRender<State extends Record<string, MaybeRef>> = React.FC<UnwrapRef<State>>;

export function component<
  Props extends Record<string, unknown>,
  State extends Record<string, MaybeRef>,
>(setup: ComponentSetup<Props, State>, render: ComponentRender<State>): React.FC<Props> {
  const Component = React.memo(render);

  return (props) => {
    const state = unwrapAll(setup(props));
    return <Component {...state} />;
  };
}
