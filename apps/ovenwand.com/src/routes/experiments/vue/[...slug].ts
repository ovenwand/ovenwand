import type { RequestEvent } from '@sveltejs/kit';
import { renderToString } from 'vue/server-renderer';
import { createServerApp } from './.lib/app';
import App from './.lib/App.vue';

// TODO optimize to skip rendering of the app html when we're just fetching data
export async function GET(event: RequestEvent) {
	const page = {
		routeId: event.routeId,
		status: 200, // TODO
		params: event.params,
		url: event.url,
		stuff: {}, // TODO
		error: null // TODO
	};

	const data = {
		todos: []
	};

	const { app } = createServerApp(App, null, { page, data });
	const html = await renderToString(app);

	return {
		body: {
			data,
			html
		}
	};
}
