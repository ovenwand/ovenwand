import { derived, get, writable } from 'svelte/store';
import type { Save } from '$modules/chi/engine';
import { objects } from '$modules/chi/store/player/objects';

const bank = writable(0);

const total = writable(0);

const level = derived([bank, total], () => {
	return .9;
});

const perSecond = derived(objects, ($objects) => {
	return $objects.reduce((chiPerSecond, object) => {
		return chiPerSecond + get(object.chiPerSecond);
	}, 0);
});

const perClick = derived(objects, ($objects) => {
	return $objects.reduce((chiPerClick, object) => {
		return chiPerClick + get(object.chiPerClick);
	}, 1);
});

const chiStore = derived(
	[bank, total, level, perSecond, perClick],
	([$bank, $total, $level, $perSecond, $perClick]) => ({
		bank: $bank,
		total: $total,
		level: $level,
		perSecond: $perSecond,
		perClick: $perClick
	})
);

export const chi = {
	subscribe: chiStore.subscribe,

	total,

	perSecond,

	perClick,

	load(data: Save['chi']): void {
		bank.set(data.bank);
		total.set(data.total);
	},

	save(): Save['chi'] {
		return {
			bank: get(bank),
			total: get(total),
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
