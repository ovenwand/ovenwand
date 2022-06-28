import { writable, type Writable } from 'svelte/store';
import type { Identifiable } from '@ovenwand/services.faunadb';

export type EventType = string;

export interface IEvent extends Identifiable {
	type: EventType;
	timestamp: string; // TODO transform to date?
	uri: string;
}

export interface IEventData extends Identifiable {
	type: EventType;
	timestamp: string;
	uri: string;
	detail: string;
	[key: string]: unknown;
}

export const createEvent = (event: Partial<IEvent>): IEvent => ({
	_id: null,
	type: 'unknown',
	...event
});

export const copyEvent = (event: Partial<IEvent>) =>
	createEvent({
		...event
	});

export const events: Writable<IEvent[]> = writable([]);
