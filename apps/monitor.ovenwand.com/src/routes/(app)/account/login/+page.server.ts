import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import type { Identifiable } from '@ovenwand/services.faunadb';
import { createSessionToken } from '@ovenwand/auth/node';
import { env } from '$env/dynamic/private';
import { gql } from '$lib/database';

const isProduction = env.VERCEL_ENV === 'production';

export interface IUserData extends Identifiable {
	role: 'admin' | 'anonymous';
}

export interface ILoginData {
	instance: IUserData;
	secret: string;
}

export interface FaunaError {
	message: string;
	extensions: { code: string };
}

export const actions = {
	async default({ cookies, locals, request }: RequestEvent) {
		const body = await request.formData();

		const { data, errors } = await gql<{ login: ILoginData }, FaunaError[]>(
			`mutation Login($data: LoginInput!) {
      login(data: $data) {
        instance {
          _id
          role
        }
        secret
      }
    }`,
			{
				data: {
					email: body.get('email'),
					password: body.get('password')
				}
			}
		);

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
