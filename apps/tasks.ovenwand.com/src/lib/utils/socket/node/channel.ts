import { useSocket } from './socket';

const channels = new Map();

export function useChannel(name: string) {
	if (!channels.has(name)) {
		const { trigger } = useSocket();

		channels.set(name, {
			trigger: (...args) => trigger(name, ...args)
		});
	}

	return channels.get(name);
}
