import type { Save } from '../save';

export type Hook = (...args: unknown[]) => unknown;
export type Loader = (data: Save, delta: number) => unknown;
export type Tick = (delta: number) => unknown;
