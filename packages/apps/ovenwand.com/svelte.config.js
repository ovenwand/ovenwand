import config from '@ovenwand/config/svelte';
import path from 'path';

config.kit.vite.resolve.alias = {
	$lib: path.resolve('src/lib'),
	$modules: path.resolve('src/modules')
};

export default config;
