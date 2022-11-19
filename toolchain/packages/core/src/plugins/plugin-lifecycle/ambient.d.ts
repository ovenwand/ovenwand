declare namespace Toolchain {
	interface Context {

	}

	interface Hooks {
		prepare(context: Toolchain.Context): unknown | Promise<unknown>;
		resolve(context: Toolchain.Context): unknown | Promise<unknown>;
	}
}
