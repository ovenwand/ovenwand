<script lang="ts">
	import { hydrateRoot } from 'react-dom/client';
	import { App } from '../.lib/app';

	// Scope the react
	const react = {
		root: null,
		setRoot(root) {
			react.root = root;
		},
		render(element, child) {
			if (react.root) {
				return react.root.render(child);
			}

			return react.setRoot(hydrateRoot(element, child));
		}
	};

	export let data: import('./$types').LoadData;

	let element: HTMLDivElement;

	$: if (element) {
		react.render(element, App(data.props));
	}
</script>

<div bind:this={element} id="react-app">
	{@html data.html}
</div>
