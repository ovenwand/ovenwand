import { users as db } from '../public/database';

export const users = {
	async login(credentials: { email: string; password: string }) {
		return db.mutate.login(credentials);
	},
	async logout({ all = false }: { all?: boolean } = {}) {
		return db.mutate.logout({ all });
	}
};
