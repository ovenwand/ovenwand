import { PUBLIC_FAUNA_ANONYMOUS_KEY } from '$env/static/public';

let _session: App.Session = {
	id: undefined,
	token: PUBLIC_FAUNA_ANONYMOUS_KEY
};

export function setSession(session: App.Session) {
	_session = session;
}

export function getSession(): App.Session {
	return _session;
}

export function getSessionID(): App.Session['id'] {
	return _session.id;
}
