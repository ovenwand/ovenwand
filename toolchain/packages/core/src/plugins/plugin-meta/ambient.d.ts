declare namespace Toolchain {
	import { ToolchainPackageManager } from '../../utils';

	interface MetaLocation {
		path: string;
		manifest: any;
	}

	interface Meta {
		cwd: string;
		packageManager: ToolchainPackageManager;
		package: null | MetaLocation;
		workspace: null | MetaLocation;
	}

	interface Context {
		meta: Meta;
	}

	interface Hooks {

	}
}
