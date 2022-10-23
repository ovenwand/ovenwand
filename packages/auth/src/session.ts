import jwt from 'jsonwebtoken';

export function createSessionToken(options) {
	const { user, token, secret } = options;
	const session = { id: user._id, token: token };
	return jwt.sign(session, secret);
}

export function readSessionToken(token) {
	return jwt.decode(token, { json: true });
}

export interface WithSessionEvent {
	cookies: { get: (name: string) => string };
	locals: { id?: string; token: string };
}

export interface WithSessionOptions {
	anonymous?: string;
	cookie?: string;
}

export function withSession(event: WithSessionEvent, options: WithSessionOptions = {}) {
	const { anonymous = null, cookie = 'session_id' } = options;
	const { cookies, locals } = event;
	const session = readSessionToken(cookies.get(cookie));

	if (session) {
		locals.id = session.id;
		locals.token = session.token;
	} else {
		locals.token = anonymous;
	}

	return event;
}
