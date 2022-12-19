import { mutate, query, type ITask } from '$lib/database';
import { AllTasks, CurrentTask, TaskById, TasksByDueDate, TasksByStatus } from './queries';
import { CreateTask, DeleteTask, PartialUpdateTask } from './mutations';

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
			return await mutate(CreateTask, {
				variables: {
					data: task
				}
			});
		},

		async update(id: string, task: Partial<Omit<ITask, '_id'>>) {
			return await mutate(PartialUpdateTask, {
				variables: { id, data: task }
			});
		},

		async delete(task: Pick<ITask, '_id'> & Partial<ITask>) {
			return await mutate(DeleteTask, {
				variables: { id: task._id }
			});
		}
	}
};
