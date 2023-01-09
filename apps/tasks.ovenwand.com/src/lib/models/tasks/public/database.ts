import { mutate, query } from '$lib/database';
import { AllTasks, CurrentTask, TaskById, TasksByDueDate, TasksByStatus } from './queries';
import { CreateTask, DeleteTask, PartialUpdateTask } from './mutations';
import type { ITask } from './model';

export const tasks = {
	query: {
		async all() {
			return await query(AllTasks);
		},

		async open() {
			return await query(TasksByStatus, {
				variables: { status: 'open' }
			});
		},

		async current() {
			return await query(CurrentTask);
		},

		async byId(id: string) {
			return await query(TaskById, {
				variables: { id }
			});
		},

		async byDueDate(fromDate: string, toDate: string) {
			return await query(TasksByDueDate, {
				variables: {
					fromDate,
					toDate
				}
			});
		}
	},

	mutate: {
		async create(task: Partial<ITask>) {
			const data = { ...task };

			if (task.owner) {
				data.owner = { connect: task.owner._id };
			}

			return await mutate(CreateTask, {
				variables: { data }
			});
		},

		async update(id: string, task: Partial<Omit<ITask, '_id'>>) {
			const data = { ...task };

			delete data.owner;

			return await mutate(PartialUpdateTask, {
				variables: { id, data }
			});
		},

		async delete(task: Pick<ITask, '_id'> & Partial<ITask>) {
			return await mutate(DeleteTask, {
				variables: { id: task._id }
			});
		}
	}
};
