import { writable, type Writable } from 'svelte/store';
import type { Identifiable } from '@ovenwand/services.faunadb';
import type { IProject, IProjectData } from '../projects';

export type EventType = string;

export interface IEvent extends Identifiable {
	type: EventType;
	timestamp: string; // TODO transform to date?
	uri: string;
	details: IEventDetails;
	project: Pick<IProject, '_id'>;
}

export interface IEventData extends Identifiable {
	type: EventType;
	timestamp: string;
	uri: string;
	details: IEventDetails;
	project: Pick<IProjectData, '_id'>;
	[key: string]: unknown;
}

export interface IEventDetails {
	speed: string;
}

export const createEvent = (event: Partial<IEvent>): IEvent => ({
	_id: null,
	type: 'unknown',
	details: { speed: null },
	...event
});

export const copyEvent = (event: Partial<IEvent>) =>
	createEvent({
		...event
	});

export const events: Writable<IEvent[]> = writable([]);
export const projectId: Writable<string | null> = writable(null);
