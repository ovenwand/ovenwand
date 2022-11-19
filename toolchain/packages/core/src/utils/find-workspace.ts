import { cwd } from 'node:process';
import findWorkspaceDir from '@pnpm/find-workspace-dir';

export async function findWorkspace() {
	return findWorkspaceDir.default(cwd());
}
