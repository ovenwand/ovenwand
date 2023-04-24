import { env } from 'node:process';
import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

const adapterOptions = {
	split: env.SPLIT === '1'
};

if (env.EDGE === '1') {
	adapterOptions.runtime = 'edge';
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: vercel(adapterOptions)
	}
};

export default config;
