import type { Identifiable } from '@ovenwand/services.faunadb';

export interface IUser extends Identifiable {
	email: string;
	role: 'owner' | 'user' | 'anonymous';
}
