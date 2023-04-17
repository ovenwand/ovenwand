import { byPriority } from '../../utils/index.js';

export interface ToolchainHook<Name extends keyof Toolchain.Hooks = keyof Toolchain.Hooks> {
	name: Name;
	priority: number;
	enforce?: 'pre' | 'post';
	handle<T extends Toolchain.Hooks[Name]>(hook: T, context: Toolchain.Context): ReturnType<T>;
	hooks: Toolchain.Hooks[Name][];
}

export interface ToolchainHookOptions<Name extends keyof Toolchain.Hooks = keyof Toolchain.Hooks> {
	priority?: number;
	handle<T extends Toolchain.Hooks[Name]>(hook: T, context: Toolchain.Context): ReturnType<T>;
}

export interface ToolchainHooksApi<Name extends keyof Toolchain.Hooks = keyof Toolchain.Hooks> {
	hooks: ToolchainHook<Name>[];
	create<T extends Name>(name: T, options?: ToolchainHookOptions<T>): void;
	add<T extends Name>(name: T, hook: ToolchainHook<T>): void;
	has<T extends Name>(name: T): boolean;
	call<T extends Name>(name: T, context: Toolchain.Context): ReturnType<Toolchain.Hooks[Name]>[];
}

export function createHooks(): ToolchainHooksApi {
	const hooksByName = new Map<keyof Toolchain.Hooks, ToolchainHook>();

	function create<Name extends keyof Toolchain.Hooks>(
		name: Name,
		options: Pick<ToolchainHook<Name>, 'priority' | 'handle'>
	): void {
		const {
			priority = 0,
			handle = (
				hook: (context: Toolchain.Context) => Toolchain.Context,
				context: Toolchain.Context
			) => hook(context)
		} = options;
		hooksByName.set(name, { name, priority, handle, hooks: [] });
	}

	function add(name, hook?) {
		const { hooks } = hooksByName.get(name);

		if (hook) {
			hooks.push(hook);
		}
	}

	function has(name) {
		return hooksByName.has(name);
	}

	function call<T extends keyof Toolchain.Hooks>(
		name: T,
		context: Toolchain.Context
	): ReturnType<Toolchain.Hooks[T]>[] {
		const { handle, hooks } = hooksByName.get(name);

		const result: ReturnType<Toolchain.Hooks[T]>[] = [];

		for (const hook of hooks) {
			result.push(handle(hook, context));
		}

		return result;
	}

	return {
		get hooks() {
			return Array.from(hooksByName.values()).sort(byPriority);
		},
		create,
		add,
		has,
		call
	};
}
