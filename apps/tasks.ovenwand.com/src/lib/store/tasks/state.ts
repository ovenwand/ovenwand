import { writable, type Writable } from 'svelte/store';
import type { Identifiable } from '@ovenwand/services.faunadb';
import type { ILabel, ILabelData } from '../labels';

export interface ITaskData extends Identifiable {
	title: string;
	description: string;
	priority: number;
	businessValue: number;
	size: number;
	dueDate: string;
	done: boolean;
	labels: { data: ILabelData[] };
}

export interface ITask extends Identifiable {
	title: string;
	description: string;

	priority: number;
	businessValue: number;
	size: number;
	dueDate: string;

	done: boolean;
	labels: ILabel['_id'][];
	[key: string]: unknown;
}

export const tasks: Writable<ITask[]> = writable([]);

export const labels: Writable<ILabel[]> = writable([]);
