declare namespace Toolchain {
	import { ToolchainHooksApi } from './create-hooks.js';

	interface Context {
		hooks: ToolchainHooksApi;
	}

	/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
	interface Hooks {}
}
