import path from 'path';
import config from '@ovenwand/config/svelte';

config.kit.vite.resolve.alias = {
	$lib: path.resolve('src/lib'),
	$database: path.resolve('src/database'),
};

export default config;
