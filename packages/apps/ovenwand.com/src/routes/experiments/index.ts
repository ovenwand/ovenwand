export function get() {
	return {
		status: 301,

		headers: {
			location: '/experiments/game-of-life'
		}
	};
}
