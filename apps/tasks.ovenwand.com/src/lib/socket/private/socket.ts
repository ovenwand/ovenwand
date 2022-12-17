import { createPusher } from '@ovenwand/services.pusher/node';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const { PUBLIC_PUSHER_APP, PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } = publicEnv;
const { PUSHER_SECRET } = privateEnv;

const socket = createPusher({
	appId: PUBLIC_PUSHER_APP,
	key: PUBLIC_PUSHER_KEY,
	secret: PUSHER_SECRET,
	cluster: PUBLIC_PUSHER_CLUSTER
});

export function useSocket() {
	return {
		socket,
		trigger: socket.trigger.bind(socket)
	};
}
