import type { RequestEvent } from '@sveltejs/kit';
import type { Identifiable } from '@ovenwand/services.faunadb';
import { gql } from '$lib/database';
import { createSessionCookie } from '$lib/session';

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

export async function POST({ request }: RequestEvent) {
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
		return {
			status: 401,
			body: {
				errors: errors.reduce(
					(errors, error) => {
						errors.form += error.message;
						return errors;
					},
					{ form: '' }
				)
			}
		};
	}

	const { instance, secret } = data.login;

	return {
		status: 302,
		headers: {
			Location: '/',
			'Set-Cookie': createSessionCookie(instance, secret)
		},
		body: {
			data: data?.login
		}
	};
}
