import { browser } from '$app/env';
import { ticker } from '$modules/chi/util';
import { save } from '$modules/chi/engine';
import type { Save } from '$modules/chi/engine';
import type { Hook, Initializer, Loader, Tick } from './model';

function executeHooks(hooks: Hook[], ...params: unknown[]): void {
	hooks.forEach((hook) => hook(...params));
}

const beforeLoadHooks: Hook[] = [];
export function beforeLoad(hook: Hook): void {
	beforeLoadHooks.push(hook);
}

const onLoadHooks: Loader[] = [];
export function onLoad(hook: Loader): void {
	onLoadHooks.push(hook);
}

const beforeInitializeHooks: Hook[] = [];
export function beforeInitialize(hook: Hook): void {
	beforeInitializeHooks.push(hook);
}

const onInitializeHooks: Initializer[] = [];
export function onInitialize(initialize: Initializer): void {
	onInitializeHooks.push(initialize);
}

const beforeTickHooks: Hook[] = [];
export function beforeTick(hook: Hook) {
	beforeTickHooks.push(hook);
}

const onTickHooks: Tick[] = [];
export function onTick(tick: Tick): void {
	onTickHooks.push(tick);
}

function load(): Save {
	const data = save.load();
	return data;
}

function initialize(data: Save): number {
	const delta = Date.now() - data.timestamp;
	return delta;
}

function tick(handler: (delta: number) => unknown): () => void {
	return ticker(handler);
}

export function start(): () => void {
	if (!browser) {
		return;
	}

	// Load
	executeHooks(beforeLoadHooks);
	const data = load();
	executeHooks(onLoadHooks, data);

	// Initialize
	executeHooks(beforeInitializeHooks);
	const delta = initialize(data);
	executeHooks(onInitializeHooks, delta);

	// Start ticker
	executeHooks(beforeTickHooks);
	return tick((delta) => executeHooks(onTickHooks, delta));
}
