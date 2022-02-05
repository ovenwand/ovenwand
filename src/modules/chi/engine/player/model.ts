import type { Readable } from 'svelte/store';
import type { ObjectStore } from '$modules/chi/util';
import type { GameObject, GameObjectInstance, Save } from '$modules/chi/engine';
import type { ChiStore } from '$modules/chi/engine/player/store';

type PlayerEvent = 'collect' | 'buy' | 'sell';

export interface Player
	extends Readable<{
		chi: ChiStore;
		objects: GameObjectInstance[];
		buildings: GameObjectInstance[];
	}> {
	chi: ChiStore;
	objects: ObjectStore<unknown>;
	buildings: ObjectStore<unknown>;
	inventory: Readable<Record<string, number>>;

	load(data: Save): void;

	save(): Save;

	tick(delta: number): void;

	collect(): void;

	buy(object: GameObject): boolean;

	sell(object: GameObject): boolean;

	on(event: PlayerEvent, handler: (...args: unknown[]) => void): void;
}
