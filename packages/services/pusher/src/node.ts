import Pusher, { type Options } from 'pusher';

export type { default as Pusher } from 'pusher';

export function createPusher(options: Options): Pusher {
	return new Pusher({ ...options });
}
