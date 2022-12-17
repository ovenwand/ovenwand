import { useChannel } from '../channel';

const channel = useChannel('tasks');

export function useTasksChannel() {
	return channel;
}
