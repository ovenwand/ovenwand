import { browser } from '$app/env';
import { ticker } from '$modules/chi/util';
import { save } from '$modules/chi/engine';
import type { Hook, Loader, Tick } from './model';

const hooks = {
	beforeLoad: [],
	onLoad: [],
	beforeTick: [],
	onTick: [],
};

function createHook(event: 'beforeLoad' | 'beforeTick'): (hook: Hook) => void;
function createHook(event: 'onLoad'): (hook: Loader) => void;
function createHook(event: 'onTick'): (hook: Tick) => void;
function createHook(event: keyof typeof hooks): (hook: Hook | Loader | Tick) => void {
	return (hook) => hooks[event].push(hook);
}

function executeHooks(event: keyof typeof hooks, ...params: unknown[]): void {
	hooks[event].forEach((hook) => hook(...params));
}

export const beforeLoad = createHook('beforeLoad');
export const onLoad = createHook('onLoad');
export const beforeTick = createHook('beforeTick');
export const onTick = createHook('onTick');

export function start(): () => void {
	if (!browser) {
		return;
	}

	executeHooks('beforeLoad');
	const data = save.load();
	const delta = Date.now() - data.timestamp;
	executeHooks('onLoad', data, delta);

	executeHooks('beforeTick');
	return ticker((delta) => executeHooks('onTick', delta));
}
