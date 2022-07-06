import { useNotifications } from '@ovenwand/ui';
import { projects, type IProject } from './state';
import { addProject, updateProject } from './mutations';

const { update } = projects;

const { loading } = useNotifications();

export async function saveProject(project: Partial<IProject>): Promise<void> {
	const updateNotification = loading({ message: 'Saving project...' }, 3000);

	const body = JSON.stringify({
		_id: project._id,
		name: project.name
	});

	const method = project._id ? 'PATCH' : 'POST';

	let success = true;

	try {
		const response = await fetch('/projects/create', {
			method,
			headers: {
				Accept: 'application/json'
			},
			body
		});

		const { data } = await response.json();

		if (project._id) {
			update(updateProject(data));
		} else {
			update(addProject(data));
		}
	} catch (e) {
		console.error(e);
		success = false;
	}

	if (success) {
		updateNotification({ type: 'success', message: 'Project saved' }, 3000);
	} else {
		updateNotification({ type: 'error', message: 'Failed to save project' }, 3000);
	}
}
