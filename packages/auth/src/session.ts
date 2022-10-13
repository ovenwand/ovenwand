import jwt from 'jsonwebtoken';

export function createSessionToken(options) {
	const { user, token, secret } = options;
	const session = { id: user._id, token: token };
	return jwt.sign(session, secret);
}

export function readSessionToken(token) {
	return jwt.decode(token, { json: true });
}
