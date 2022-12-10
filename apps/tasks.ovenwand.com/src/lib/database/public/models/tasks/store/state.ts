import { writable, type Writable } from 'svelte/store';
import type { ITask } from '../model';

export const tasks: Writable<ITask[]> = writable([]);
