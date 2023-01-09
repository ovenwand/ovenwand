import type { Identifiable } from '@ovenwand/services.faunadb';
import type { IUser } from '../../users';

export interface ITask extends Identifiable {
	title: string;
	description: string;
	dueDate: string;
	order: number;
	status: 'open' | 'closed';
	owner: IUser;
	[key: string]: unknown;
}
