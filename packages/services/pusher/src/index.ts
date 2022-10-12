import Pusher, { type Options } from 'pusher-js';

export type { default as Pusher } from 'pusher-js';

export function createPusher(app: string, options: Options = {}): Pusher {
	return new Pusher(app, {
		cluster: 'eu',
		...options
	});
}

export function createChannel(channel: string, pusher: Pusher) {
	return pusher.subscribe(channel);
}
