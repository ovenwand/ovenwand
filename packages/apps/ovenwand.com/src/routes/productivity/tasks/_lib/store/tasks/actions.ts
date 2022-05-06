import { addOrUpdateTask, updateTask } from './mutations';
import { tasks, type ITask } from './state';

const { update } = tasks;

export function saveTask(task: Partial<ITask>): void {
	update(addOrUpdateTask(task));
}

export function moveTask(task: ITask, fromLabel: string, toLabel: string): void {
	if (fromLabel === toLabel || toLabel === null) {
		return;
	}

	const labels = [...task.labels.filter((l) => l !== fromLabel), toLabel];

	update(updateTask({ ...task, labels }));
}
