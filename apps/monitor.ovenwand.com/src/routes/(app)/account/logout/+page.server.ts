import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { gql } from '$lib/database';

const isProduction = env.VERCEL_ENV === 'production';

export const actions = {
	async default({ cookies }: RequestEvent) {
		const { errors } = await gql<{ errors?: unknown[] }>(
			`mutation Logout {
      logout(all: false)
    }`
		);

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
