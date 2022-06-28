import { projectId } from './state';
import { setProjectId } from './mutations';

const { update } = projectId;

export async function setProject(projectId: string) {
	update(setProjectId(projectId));
}
