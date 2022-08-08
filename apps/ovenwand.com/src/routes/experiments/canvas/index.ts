import type { RequestHandlerOutput } from '@sveltejs/kit';

export function GET(): RequestHandlerOutput {
	return {
		status: 301,

		headers: {
			location: '/experiments/canvas/game-of-life'
		}
	};
}
