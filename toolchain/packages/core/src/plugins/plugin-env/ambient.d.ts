declare namespace Toolchain {
	interface Context {
		env: Record<string, string>;
	}

	interface Hooks {
		environment(env: Partial<Context['env']>): Context['env'] | Promise<Context['env']>;
	}
}
