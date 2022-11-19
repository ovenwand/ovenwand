declare namespace Toolchain {
	import { ToolchainLoggerApi, ToolchainPlugin } from '../src';

	interface Context {
		logger: ToolchainLoggerApi;
		plugins: ToolchainPlugin[];
	}

	interface Hooks {

	}
}
