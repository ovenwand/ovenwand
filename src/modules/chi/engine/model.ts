import type { Readable } from 'svelte/store';
import type { Player } from './player';

export interface GameObject<S = unknown, T extends GameObjectInstance<S> = GameObjectInstance<S>> {
	id: string;
	name: string;
	description: string;
	icon: string;
	price(player: Player, amount: number): number;
	stock(player: Player, amount: number): number;
	createInstance(player: Player, state?: S): T;
}

export interface GameObjectInstance<S = unknown>
	extends Readable<{ chiPerClick: number; chiPerSecond: number }> {
	type: GameObject<S>;
	chiPerSecond: Readable<number>;
	chiPerClick: Readable<number>;

	save(): S;

	tick?(delta: number): void;

	generate(delta: number): number;

	collect(): number;
}

export interface GameObjectLifecycle<Data = unknown> {
	load?(player: Player, data: Data): void;
	save?(): Data;
	tick?(delta: number): void;
	generate?(delta: number): number;
	collect?(): number;
}
