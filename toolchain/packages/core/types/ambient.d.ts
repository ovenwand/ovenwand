declare namespace Toolchain {
	import { ToolchainLoggerApi, ToolchainPlugin } from '../src';

	interface Context {
		logger: ToolchainLoggerApi;
		plugins: ToolchainPlugin[];
	}

	/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
	interface Hooks {}
}
