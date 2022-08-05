import type { RequestHandlerOutput } from '@sveltejs/kit';

export function GET(): RequestHandlerOutput {
	return {
		status: 301,

		headers: {
			location: '/experiments/game-of-life'
		}
	};
}
