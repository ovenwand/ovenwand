import { base } from '$app/paths';

let currentUrl: URL;

export function setCurrentUrl(url: URL) {
	currentUrl = url;
}

export function getCurrentUrl(): URL {
	return currentUrl;
}

export function getBaseUrl(): URL {
	return new URL(base, getCurrentUrl());
}

export function route(id: string, params?: Record<string, string>): URL {
	if (!params) {
		return new URL(id, getBaseUrl());
	}

	const path = id
		.split('/')
		.map((segment) => {
			if (segment.startsWith('[')) {
				const param = segment.replace(/(^\[)|(]$)/g, '');
				return params[param];
			}

			return segment;
		})
		.join('/');

	return new URL(path, getBaseUrl());
}
