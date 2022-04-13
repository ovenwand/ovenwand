import path from 'path';
import config from '@ovenwand/config/svelte';

config.kit.vite.resolve.alias = {
	$lib: path.resolve('src/lib'),
	$modules: path.resolve('src/modules')
};

export default config;
