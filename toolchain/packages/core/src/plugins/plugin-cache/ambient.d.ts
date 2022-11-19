declare namespace Toolchain {
	import { ToolchainCacheApi } from './create-cache.js';

	interface Context {
		cache: ToolchainCacheApi;
	}

	interface Hooks {

	}

	interface MetaLocation {
		cache: string;
	}
}
