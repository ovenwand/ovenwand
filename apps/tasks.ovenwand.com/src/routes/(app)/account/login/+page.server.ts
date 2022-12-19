import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { createSessionToken } from '@ovenwand/auth/node';
import { env } from '$env/dynamic/private';
import { users } from '$lib/models';

const isProduction = env.VERCEL_ENV === 'production';

export const actions = {
	async default({ cookies, locals, request }: RequestEvent) {
		const body = await request.formData();

		const credentials = {
			email: body.get('email'),
			password: body.get('password')
		};

		const { error, data } = await users.mutate.login(credentials);

		if (error) {
			return fail(400, {
				errors: [error.message]
			});
		}

		const { instance: user, secret: token } = data.login;

		cookies.set(
			'session_id',
			createSessionToken({
				user,
				token,
				secret: env.SECRET
			}),
			{
				path: '/',
				httpOnly: true,
				secure: isProduction,
				maxAge: 60 * 60 * 24 // 1 day
			}
		);

		throw redirect(303, locals.referrer.toString());
	}
};
