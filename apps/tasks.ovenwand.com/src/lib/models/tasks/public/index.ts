import type { ITask } from './model';
import { tasks as db } from './database';
import { tasks as state, getters, addOrUpdateTask, addOrUpdateTasks, removeTask } from './store';

export * from './model';

export const tasks = {
	subscribe: state.subscribe,

	load(data: ITask | ITask[]) {
		if (!data) {
			return;
		}

		if (Array.isArray(data)) {
			state.update(addOrUpdateTasks(data));
		} else {
			state.update(addOrUpdateTask(data));
		}
	},

	open: getters.open,
	current: getters.current,
	today: getters.today,

	query: {
		async all() {
			const result = await db.query.all();

			if (result?.data?.tasks?.data) {
				state.update(addOrUpdateTasks(result.data.tasks.data));
			}

			return result;
		},

		async open() {
			const result = await db.query.open();

			if (result?.data?.tasksByStatus) {
				state.update(addOrUpdateTasks(result.data.tasksByStatus));
			}

			return result;
		},

		async current() {
			const result = await db.query.current();

			if (result?.data?.currentTask) {
				state.update(addOrUpdateTask(result.data.currentTask));
			}

			return result;
		},

		async byId(id: string) {
			const result = await db.query.byId(id);

			if (result.data?.findTaskByID) {
				state.update(addOrUpdateTask(result.data.findTaskByID));
			}

			return result;
		},

		async byDueDate(fromDate: string, toDate: string) {
			const result = await db.query.byDueDate(fromDate, toDate);

			if (result?.data?.tasksByDueDate) {
				state.update(addOrUpdateTasks(result.data.tasksByDueDate));
			}

			return result;
		}
	},

	mutate: {
		async create(task: Partial<ITask>) {
			const result = await db.mutate.create(task);

			if (!result.error) {
				state.update(addOrUpdateTask(task));
			}

			return result;
		},

		async update(id: string, task: Partial<Omit<ITask, '_id'>>) {
			const result = await db.mutate.update(id, task);

			if (!result.error) {
				state.update(addOrUpdateTask(result.data.partialUpdateTask));
			}

			return result;
		},

		async delete(task: Pick<ITask, '_id'> & Partial<ITask>) {
			const result = await db.mutate.delete(task);

			if (!result.error) {
				state.update(removeTask(result.data.deleteTask));
			}

			return result;
		}
	}
};
