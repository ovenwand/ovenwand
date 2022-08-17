const robotsTxt = (disallow: string) =>
	`
User-agent: *
Disallow: ${disallow}
`.trim();

export async function GET(): Promise<Response> {
	const body = robotsTxt(import.meta.env.VITE_VERCEL_ENV === 'production' ? '' : '/');

	const headers = new Headers({
		'Content-Type': 'text/plain'
	});

	return new Response(body, { headers });
	// return {
	// 	body,
	// 	headers: {
	// 		'Content-Type': 'text/plain'
	// 	}
	// };
}
