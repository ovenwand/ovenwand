import { useTasksChannel } from '$lib/socket/private';
import { tasks as db } from '../public/database';
import type { ITask } from '../public/model';

export const tasks = {
	...db.query,

	async create(task: Partial<ITask>) {
		const result = await db.mutate.create(task);

		if (!result.error) {
			useTasksChannel().trigger('add', result.data.createTask);
		}

		return result;
	},

	async update(id: string, task: Partial<Omit<ITask, '_id'>>) {
		const result = await db.mutate.update(id, task);

		if (!result.error) {
			useTasksChannel().trigger('update', result.data.partialUpdateTask);
		}

		return result;
	},

	async delete(task: Pick<ITask, '_id'> & Partial<ITask>) {
		const result = await db.mutate.delete(task);

		if (!result.error) {
			useTasksChannel().trigger('delete', result.data.deleteTask);
		}

		return result;
	}
};
