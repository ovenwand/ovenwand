import { createSSRApp as createVueSSRApp, type Component } from 'vue';
import { useContext } from './store/context';

function createBaseApp(component, props, context) {
	const app = createVueSSRApp(component, props);

	const [setContext] = useContext();

	for (const key of Object.keys(context)) {
		app.provide(key, setContext(key, context[key]));
	}

	return app;
}

export function createServerApp(component, props = null, context = {}) {
	const app = createBaseApp(component, props, context);

	return { app };
}

export function createClientApp(component, props = null, context = {}) {
	const app = createBaseApp(component, props, context);

	let instance: Component | null = null;

	return {
		app,

		mount(container: HTMLElement, isHydrate: boolean = true) {
			if (!container) {
				// TODO warn/throw if no container if provided?
				return;
			}
			// TODO investigate need of garbage collection and such?
			instance = app.mount(container, isHydrate);
		},
		destroy() {
			if (instance) {
				app.unmount();
				instance = null;
			}
		}
	};
}
