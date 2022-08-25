<script lang="ts">
	import { ref, snapshot } from '../.lib/reactivity';

	let fromSvelte = 0;

	const fromVue = ref(fromSvelte, (value) => {
		fromSvelte = value;
	});

	let fromSnapshot = snapshot(fromVue);
</script>

<h2>
	<code>
		let fromSvelte = {fromSvelte};
	</code>
</h2>

<h2>
	<code>
		const fromVue = ref(fromSvelte, (value) => {'{'}
		fromSvelte = {fromVue.value};
		{'}'});
	</code>
</h2>

<h2>
	<code>
		let fromSnapshot = snapshot({fromSnapshot});
	</code>
</h2>

<button on:click={() => fromVue.value++}> Update global state </button>

<button on:click={() => fromSnapshot++}> Update local snapshot </button>
