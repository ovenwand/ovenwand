import { renderToString } from 'react-dom/server';
import { App } from './.lib/app';

export async function GET() {
	const props = { count: 0 };
	const html = renderToString(App(props));

	return {
		body: { html, props }
	};
}
