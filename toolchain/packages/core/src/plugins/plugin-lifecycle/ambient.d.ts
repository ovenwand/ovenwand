declare namespace Toolchain {
	/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
	interface Context {}

	interface Hooks {
		prepare(context: Toolchain.Context): unknown | Promise<unknown>;
		resolve(context: Toolchain.Context): unknown | Promise<unknown>;
	}
}
