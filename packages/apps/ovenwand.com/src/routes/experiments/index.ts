import type { RequestHandlerOutput } from '@sveltejs/kit';

export function get(): RequestHandlerOutput {
	return {
		status: 301,

		headers: {
			location: '/experiments/game-of-life'
		}
	};
}
