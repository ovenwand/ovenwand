declare namespace Toolchain {
	import { ToolchainCacheApi } from './create-cache.js';

	interface Context {
		cache: ToolchainCacheApi;
	}

	/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
	interface Hooks {}

	interface MetaLocation {
		cache: string;
	}
}
