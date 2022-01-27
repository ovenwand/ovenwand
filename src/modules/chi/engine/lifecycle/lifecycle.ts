import { browser } from '$app/env';
import { ticker } from '$modules/chi/util';
import { save } from '$modules/chi/engine';
import type { Hook, Initializer, Loader, Tick } from './model';

const hooks = {
	beforeLoad: [],
	onLoad: [],
	beforeInitialize: [],
	onInitialize: [],
	beforeTick: [],
	onTick: [],
};

function createHook(event: 'beforeLoad' | 'beforeInitialize' | 'beforeTick'): (hook: Hook) => void;
function createHook(event: 'onLoad'): (hook: Loader) => void;
function createHook(event: 'onInitialize'): (hook: Initializer) => void;
function createHook(event: 'onTick'): (hook: Tick) => void;
function createHook(event: keyof typeof hooks): (hook: Hook | Initializer | Loader | Tick) => void {
	return (hook) => {
		if (!~hooks[event].indexOf(hook)) {
			hooks[event].push(hook);
		}
	};
}

function executeHooks(event: keyof typeof hooks, ...params: unknown[]): void {
	hooks[event].forEach((hook) => hook(...params));
}

export const beforeLoad = createHook('beforeLoad');
export const onLoad = createHook('onLoad');
export const beforeInitialize = createHook('beforeInitialize');
export const onInitialize = createHook('onInitialize');
export const beforeTick = createHook('beforeTick');
export const onTick = createHook('onTick');

export function start(): () => void {
	if (!browser) {
		return;
	}

	// Load
	executeHooks('beforeLoad');
	const data = save.load();
	executeHooks('onLoad', data);

	// Initialize
	executeHooks('beforeInitialize');
	const delta = Date.now() - data.timestamp;
	executeHooks('onInitialize', delta);

	// Start ticker
	executeHooks('beforeTick');
	return ticker((delta) => executeHooks('onTick', delta));
}
