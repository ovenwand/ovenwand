import { browser } from '$app/environment';
import { mutate, query } from '../../query';
import { AllTasks, CurrentTask, TaskById, TasksByDueDate, TasksByStatus } from './queries';
import { CreateTask, DeleteTask, PartialUpdateTask } from './mutations';
import type { ITask } from './model';
import { tasks, addTask, addOrUpdateTask, removeTask, updateTask, getters } from './store';

export * from './model';

function triggerSocketFromServer(event: string, data: unknown) {
	if (browser) {
		return;
	}

	return import('$lib/socket/private').then(({ useTasksChannel }) => {
		useTasksChannel().trigger(event, data);
	});
}

function listenToSocketFromClient() {
	if (!browser) {
		return;
	}

	return import('$lib/socket').then(({ useTasksChannel }) => {
		const channel = useTasksChannel();
		channel.on('add', (data) => tasks.update(addTask(data)));
		channel.on('update', (data) => tasks.update(updateTask(data)));
		channel.on('delete', (data) => tasks.update(removeTask(data)));
	});
}

export function useTasks(data?: ITask | ITask[]) {
	if (data) {
		data = Array.isArray(data) ? data : [data];

		for (const task of data) {
			tasks.update(addOrUpdateTask(task));
		}
	}

	listenToSocketFromClient();

	const store = {
		subscribe: tasks.subscribe,

		...getters,

		query: {
			async all() {
				const result = await query(AllTasks);

				if (result?.data?.tasks) {
					tasks.set(result.data.tasks.data);
				}

				return result;
			},

			async open() {
				const result = await query(TasksByStatus, {
					variables: { status: 'open' }
				});

				if (result?.data?.tasksByStatus) {
					for (const task of result.data.tasksByStatus) {
						tasks.update(addOrUpdateTask(task));
					}
				}

				return result;
			},

			async current() {
				const result = await query(CurrentTask);

				if (result?.data?.currentTask) {
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

				if (result?.data?.tasksByDueDate) {
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

				if (!result.error) {
					triggerSocketFromServer('add', result.data.createTask);
					tasks.update(addOrUpdateTask(result.data.createTask));
				}

				return result;
			},

			async update(id: string, task: Partial<Omit<ITask, '_id'>>) {
				const result = await mutate(PartialUpdateTask, {
					variables: { id, data: task }
				});

				if (!result.error) {
					triggerSocketFromServer('update', result.data.partialUpdateTask);
					tasks.update(addOrUpdateTask(result.data.partialUpdateTask));
				}

				return result;
			},

			async delete(task: Pick<ITask, '_id'> & Partial<ITask>) {
				const result = await mutate(DeleteTask, {
					variables: { id: task._id }
				});

				if (!result.error) {
					triggerSocketFromServer('delete', result.data.deleteTask);
					tasks.update(removeTask(result.data.deleteTask));
				}

				return result;
			}
		}
	};

	return { ...store, tasks: store };
}
