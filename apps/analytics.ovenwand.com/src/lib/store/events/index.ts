import type { Readable } from 'svelte/store';
import { type IEvent, events } from './state';
import * as getters from './getters';
import { addOrUpdateEvent } from './mutations';

const { subscribe, update } = events;

export type { IEvent, IEventData } from './state';

export interface IEventStore {
	events: Readable<IEvent[]>;
}

export function useEvents(events: IEvent[] = []): IEventStore {
	for (const event of events) {
		update(addOrUpdateEvent(event));
	}

	return {
		events: { subscribe },
		...getters
	};
}
