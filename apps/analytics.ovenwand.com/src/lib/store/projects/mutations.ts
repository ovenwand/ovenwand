import { createStore } from '@ovenwand/util';
import { createProject, copyProject, type IProject } from './state';

const { mutations } = createStore<IProject>((a, b) => a._id === b._id, createProject, copyProject);

export function addProject(project: Partial<IProject>) {
	return mutations.add(project);
}

export function updateProject(project: Partial<IProject>) {
	return mutations.update(project);
}

export function addOrUpdateProject(project: Partial<IProject>) {
	return mutations.addOrUpdate(project);
}
