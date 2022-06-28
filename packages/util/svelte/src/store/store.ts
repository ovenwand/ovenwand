export type Mutation<State> = ($state: State) => State;

export function createStore<Instance>(
	match: (a: Instance, b: Partial<Instance>) => boolean,
	create: (instance: Partial<Instance>) => Instance,
	copy: (instance: Partial<Instance>) => Instance
) {
	function add(instance: Partial<Instance>): Mutation<Instance[]> {
		return ($state: Instance[]) => [...$state, create(instance)];
	}

	function update(instance: Partial<Instance>): Mutation<Instance[]> {
		return ($state: Instance[]) => [...$state.filter((i) => !match(i, instance)), copy(instance)];
	}

	function addOrUpdate(instance: Partial<Instance>): Mutation<Instance[]> {
		return ($state: Instance[]) =>
			$state.find((i) => match(i, instance)) ? update(instance)($state) : add(instance)($state);
	}

	return {
		mutations: {
			add,
			update,
			addOrUpdate
		}
	};
}
