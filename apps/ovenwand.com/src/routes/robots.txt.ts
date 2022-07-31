const robotsTxt = (disallow: string) =>
	`
User-agent: *
Disallow: ${disallow}
`.trim();

export async function GET() {
	const body = robotsTxt(import.meta.env.VITE_VERCEL_ENV === 'production' ? '' : '/');

	return {
		body,
		headers: {
			'Content-Type': 'text/plain'
		}
	};
}
