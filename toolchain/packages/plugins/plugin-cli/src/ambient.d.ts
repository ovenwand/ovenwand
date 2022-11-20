declare namespace Toolchain {
	import { ToolchainCliApi } from './create-cli';

	interface Context {
		cli: ToolchainCliApi;
	}

	interface Config {
		cli: { enabled: boolean };
	}

	interface Hooks {
		run(): unknown | Promise<unknown>;
	}
}
