import { derived } from 'svelte/store';
import { mutate, query } from '../../query';
import { AllTasks, CurrentTask, TaskById, TasksByDueDate, TasksByStatus } from './queries';
import { CreateTask, DeleteTask, PartialUpdateTask } from './mutations';
import type { ITask } from './model';
import { tasks, addOrUpdateTask, removeTask } from './store';

export * from './model';

export function useTasks(data: ITask[] = []) {
	for (const task of data) {
		tasks.update(addOrUpdateTask(task));
	}

	const store = {
		subscribe: tasks.subscribe,

		open: derived(tasks, ($tasks) => $tasks.filter((task) => task.status === 'open')),

		current: derived(tasks, ($tasks) => $tasks.filter((task) => task.status === 'open')[0]),

		today: derived(tasks, ($tasks) => $tasks),

		query: {
			async all() {
				const result = await query(AllTasks);

				if (result.data?.tasks) {
					tasks.set(result.data.tasks.data);
				}

				return result;
			},

			async open() {
				const result = await query(TasksByStatus, {
					variables: { status: 'open' }
				});

				if (result.data?.tasksByStatus) {
					for (const task of result.data.tasksByStatus) {
						tasks.update(addOrUpdateTask(task));
					}
				}

				return result;
			},

			async current() {
				const result = await query(CurrentTask);

				if (result.data?.currentTask) {
					tasks.update(addOrUpdateTask(result.data.currentTask));
				}

				return result;
			},

			async byId(id: string) {
				const result = await query(TaskById, {
					variables: { id }
				});

				if (result.data?.findTaskByID) {
					tasks.update(addOrUpdateTask(result.data.findTaskByID));
				}

				return result;
			},

			async byDueDate(fromDate: string, toDate: string) {
				const result = await query(TasksByDueDate, {
					variables: {
						fromDate,
						toDate
					}
				});

				if (result.data?.tasksByDueDate) {
					for (const task of result.data.tasksByDueDate) {
						tasks.update(addOrUpdateTask(task));
					}
				}

				return result;
			}
		},

		mutate: {
			async create(task: Partial<ITask>) {
				const result = await mutate(CreateTask, {
					variables: {
						data: task
					}
				});

				if (data) {
					tasks.update(addOrUpdateTask(result.data.createTask));
				}

				return result;
			},

			async update(id: string, task: Partial<Omit<ITask, '_id'>>) {
				const result = await mutate(PartialUpdateTask, {
					variables: { id, data: task }
				});

				if (result.data?.partialUpdateTask) {
					tasks.update(addOrUpdateTask(result.data.partialUpdateTask));
				}

				return result;
			},

			async delete(task: Pick<ITask, '_id'> & Partial<ITask>) {
				const result = await mutate(DeleteTask, {
					variables: { id: task._id }
				});

				if (!result.error) {
					tasks.update(removeTask(task));
				}

				return result;
			}
		}
	};

	return { ...store, tasks: store };
}
