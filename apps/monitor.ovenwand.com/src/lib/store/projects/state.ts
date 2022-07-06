import { writable } from 'svelte/store';
import type { Data, Identifiable } from '@ovenwand/services.faunadb';
import type { IEvent, IEventData } from '../events';

export interface IProject extends Identifiable {
	name: string;
	events: IEvent[];
}

export interface IProjectData extends Identifiable {
	name: string;
	events: Data<IEventData[]>;
}

export const createProject = (project: Partial<IProject>): IProject => ({
	_id: null,
	name: 'Default name',
	...project
});

export const copyProject = (project: Partial<IProject>): IProject =>
	createProject({
		...project
	});

export const projects = writable<IProject[]>([]);
