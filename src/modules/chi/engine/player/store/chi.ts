import { derived, get, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { Save } from '$modules/chi/engine';
import { objects } from './objects';

export interface ChiState {
	bank: number;
	total: number;
	level: number;
	perSecond: number;
	perClick: number;
}

export interface ChiStore extends Readable<ChiState> {
	bank: Writable<number>;
	total: Writable<number>;
	level: Readable<number>;
	perSecond: Readable<number>;
	perClick: Readable<number>;

	load(data: Save['chi']): void;
	save(): Save['chi'];
	add(amount: number): boolean;
	subtract(amount: number): boolean;
}

const bank: ChiStore['bank'] = writable(0);

const total: ChiStore['total'] = writable(0);

const level: ChiStore['level'] = derived([bank, total], () => {
	return 0.9;
});

const perSecond: ChiStore['perSecond'] = derived(objects, ($objects) => {
	return $objects.reduce((chiPerSecond, object) => {
		return chiPerSecond + get(object.chiPerSecond);
	}, 0);
});

const perClick: ChiStore['perClick'] = derived(objects, ($objects) => {
	return $objects.reduce((chiPerClick, object) => {
		return chiPerClick + get(object.chiPerClick);
	}, 1);
});

const chiStore: Readable<ChiState> = derived(
	[bank, total, level, perSecond, perClick],
	([$bank, $total, $level, $perSecond, $perClick]) => ({
		bank: $bank,
		total: $total,
		level: $level,
		perSecond: $perSecond,
		perClick: $perClick
	})
);

export const chi: ChiStore = {
	subscribe: chiStore.subscribe,

	bank,

	total,

	level,

	perSecond,

	perClick,

	load(data: Save['chi']): void {
		bank.set(data.bank);
		total.set(data.total);
	},

	save(): Save['chi'] {
		return {
			bank: get(bank),
			total: get(total)
		};
	},

	add(amount: number): boolean {
		bank.update(($chi) => $chi + amount);
		total.update(($total) => $total + amount);
		return true;
	},

	subtract(amount: number): boolean {
		let canSubtract = false;

		bank.update(($chi) => {
			const result = $chi - amount;
			canSubtract = result >= 0;
			return canSubtract ? result : $chi;
		});

		return canSubtract;
	}
};
