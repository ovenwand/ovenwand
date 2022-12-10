import { mutate } from '../../query';
import { Login, Logout } from './queries';

export function useUsers() {
	const store = {
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

	return { ...store, users: store };
}
