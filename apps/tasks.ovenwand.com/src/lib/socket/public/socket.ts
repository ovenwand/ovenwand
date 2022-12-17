import { createPusher } from '@ovenwand/services.pusher';
import { PUBLIC_PUSHER_KEY } from '$env/static/public';

const socket = createPusher(PUBLIC_PUSHER_KEY);

export function useSocket() {
	return {
		socket,
		subscribe: socket.subscribe.bind(socket)
	};
}
