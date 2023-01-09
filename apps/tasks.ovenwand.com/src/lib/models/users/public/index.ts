import { users as db } from './database';

export * from './model';

export const users = {
	mutate: {
		async login(credentials: { email: string; password: string }) {
			return db.mutate.login(credentials);
		},
		async logout({ all = false }: { all?: boolean } = {}) {
			return db.mutate.logout({ all });
		}
	}
};
