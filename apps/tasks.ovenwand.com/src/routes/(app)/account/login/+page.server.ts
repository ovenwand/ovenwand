import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { createSessionToken } from '@ovenwand/auth/node';
import { env } from '$env/dynamic/private';
import { useUsers } from '$lib/database';

const isProduction = env.VERCEL_ENV === 'production';

export const actions = {
	async default({ cookies, locals, request }: RequestEvent) {
		const users = useUsers();
		const body = await request.formData();

		const credentials = {
			email: body.get('email'),
			password: body.get('password')
		};

		const { errors, data } = await users.mutate.login(credentials);

		if (errors) {
			return fail(400, {
				errors: errors.map((error) => error.message)
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
