// import { base } from '$app/paths';

let currentUrl: URL;

export function setCurrentUrl(url: URL) {
	currentUrl = url;
}

export function getCurrentUrl(): URL {
	return currentUrl;
}

// export function getBaseUrl(): URL {
// 	return new URL(base, getCurrentUrl());
// }

export function replaceRouteParams(
	id: `/${string}`,
	params: Record<string, string | number>
): `/${string}` {
	return id
		.split('/')
		.map((segment) => {
			if (segment.startsWith('[')) {
				const param = segment.replace(/(^\[)|(]$)/g, '');
				return params[param];
			}

			return segment;
		})
		.join('/') as `/${string}`;
}

// export function route(id: string, params?: Record<string, string>): URL {
// 	if (!params) {
// 		return new URL(id, getBaseUrl());
// 	}
//
// 	const path = replaceRouteParams(id, params);
//
// 	return new URL(path, getBaseUrl());
// }

export function route(id: `/${string}`, params?: Record<string, string | number>): `/${string}` {
	if (params) {
		return replaceRouteParams(id, params);
	}

	return id;
}
