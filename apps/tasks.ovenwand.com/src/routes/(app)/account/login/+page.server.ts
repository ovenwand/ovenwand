import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import { createSessionToken } from '@ovenwand/auth/node';
import { env } from '$env/dynamic/private';
import { mutate } from '$lib/database';
import { Login } from '$lib/database/queries';

const isProduction = env.VERCEL_ENV === 'production';

export const actions = {
	async default({ cookies, locals, request }: RequestEvent) {
		const body = await request.formData();

		const credentials = {
			email: body.get('email'),
			password: body.get('password')
		};

		const { data, errors = null } = await mutate({
			mutation: Login,
			variables: { data: credentials }
		});

		if (errors) {
			return invalid(
				401,
				errors.reduce(
					(errors, error) => {
						errors.form += error.message;
						return errors;
					},
					{ form: '' }
				)
			);
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
