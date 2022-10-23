import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { mutate } from '$lib/database';
import { Logout } from '$lib/database/queries';

const isProduction = env.VERCEL_ENV === 'production';

export const actions = {
	async default({ cookies }: RequestEvent) {
		const { errors = null } = await mutate({
			mutation: Logout,
			variables: {
				all: false
			}
		});

		if (errors) {
			return invalid(400, { errors });
		}

		cookies.delete('session_id', {
			path: '/',
			httpOnly: true,
			secure: isProduction
		});

		throw redirect(303, '/');
	}
};
