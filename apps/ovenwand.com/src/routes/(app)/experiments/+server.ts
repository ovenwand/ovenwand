export function GET() {
	return new Response(null, {
		status: 301,
		headers: new Headers({
			Location: '/experiments/canvas'
		})
	});
}
