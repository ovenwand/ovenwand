import type { Save } from '../save';

export type Hook = (...args: unknown[]) => unknown;
export type Initializer = (delta: number) => unknown;
export type Loader = (data: Save) => unknown;
export type Tick = (delta: number) => unknown;
