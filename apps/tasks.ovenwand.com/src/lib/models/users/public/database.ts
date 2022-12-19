import { mutate } from '$lib/database';
import { Login, Logout } from './queries';

export const users = {
	mutate: {
		async login(credentials: { email: string; password: string }) {
			return mutate(Login, {
				variables: { data: credentials }
			});
		},

		async logout({ all = false }: { all?: boolean } = {}) {
			return mutate(Logout, {
				variables: { all }
			});
		}
	}
};
