import type { Readable } from 'svelte/store';
import { projects, type IProject } from './state';
import { addOrUpdateProject } from './mutations';
import { saveProject } from './actions';

const { subscribe, update } = projects;

export type { IProject, IProjectData } from './state';

export interface IProjectStore {
	projects: Readable<IProject[]>;
	save: typeof saveProject;
}

export function useProjects(data: IProject[] = []): IProjectStore {
	for (const project of data) {
		update(addOrUpdateProject(project));
	}

	return {
		projects: { subscribe },
		save: saveProject
	};
}
