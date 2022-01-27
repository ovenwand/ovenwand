import type { Readable } from 'svelte/store';

export interface GameObject<S = unknown, T extends GameObjectInstance<S> = GameObjectInstance<S>> {
	id: string;
	name: string;
	description: string;
	icon: string;
	price(amount: number): number;
	stock(amount: number): number;
	createInstance(state?: S): T;
}

export interface GameObjectInstance<S = unknown> extends Readable<{ chiPerClick: number, chiPerSecond: number }> {
	type: GameObject<S>;
	chiPerSecond: Readable<number>;
	chiPerClick: Readable<number>;
	save(): S;
	tick?(delta: number): void;
	generate(delta: number): number;
	collect(): number;
}
