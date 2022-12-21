import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { route } from '$lib/route';
import { users } from '$lib/models';

const isProduction = env.VERCEL_ENV === 'production';

export const actions = {
	async default({ cookies }: RequestEvent) {
		const { error } = await users.mutate.logout();

		if (error) {
			return fail(400, { errors: [error.message] });
		}

		cookies.delete('session_id', {
			path: '/',
			httpOnly: true,
			secure: isProduction
		});

		throw redirect(303, route('/'));
	}
};
