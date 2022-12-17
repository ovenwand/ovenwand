import { useSocket } from './socket';

const channels = new Map();

export function useChannel(name: string) {
	if (!channels.has(name)) {
		const { subscribe } = useSocket();

		const channel = subscribe(name);

		channels.set(name, {
			channel,
			on: channel.bind.bind(channel)
		});
	}

	return channels.get(name);
}
