import type { Identifiable } from '@ovenwand/services.faunadb';

export interface ITask extends Identifiable {
	title: string;
	description: string;
	dueDate: string;
	order: number;
	status: 'open' | 'closed';
	[key: string]: unknown;
}
