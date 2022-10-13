import { parse, serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { IUserData } from '../routes/(app)/auth/login/+page.server';

const isProduction = env.VERCEL_ENV === 'production';

export function createSessionCookie(user: IUserData, token: string): string {
	const session = { id: user._id, token: token };
	const sessionId = jwt.sign(session, env.SECRET);
	return serialize('session_id', sessionId, {
		path: '/',
		httpOnly: true,
		secure: isProduction,
		maxAge: 60 * 60 * 24 // 1 day
	});
}

export function readSessionCookie({ request }: RequestEvent): App.Session | undefined {
	const cookie = request.headers.get('cookie');

	if (cookie) {
		const { session_id } = parse(cookie);

		if (session_id) {
			return jwt.decode(session_id, { json: true }) as App.Session;
		}
	}
}

export function deleteSessionCookie() {
	return serialize('session_id', '', {
		path: '/',
		expires: new Date(0)
	});
}
