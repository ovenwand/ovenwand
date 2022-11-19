declare namespace Toolchain {
	interface MetaLocation {
		path: string;
		manifest: any;
	}

	interface Meta {
		cwd: string;
		package: null | MetaLocation;
		workspace: null | MetaLocation;
	}

	interface Context {
		meta: Meta;
	}

	interface Hooks {

	}
}
