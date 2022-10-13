import { env } from '$env/dynamic/private';

function createRobotsTxt(disallow: string) {
	return `
User-agent: *
Disallow: ${disallow}
	`.trim();
}

export async function GET(): Promise<Response> {
	const body = createRobotsTxt(env.VERCEL_ENV === 'production' ? '' : '/');

	const headers = new Headers({
		'Content-Type': 'text/plain'
	});

	return new Response(body, { headers });
}
