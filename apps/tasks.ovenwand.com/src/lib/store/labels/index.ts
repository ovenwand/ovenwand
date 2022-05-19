import type { Readable } from 'svelte/store';
import { type ILabel, labels } from './state';
import { addOrUpdateLabel } from './mutations';

const { subscribe, update } = labels;

export type { ILabel } from './state';

export interface ILabelStore<State extends ILabel[] = ILabel[]> {
	labels: Readable<State>;
}

export function useLabels(labels: ILabel[] = []): ILabelStore {
	for (const label of labels) {
		update(addOrUpdateLabel(label));
	}

	return {
		labels: { subscribe }
	};
}
