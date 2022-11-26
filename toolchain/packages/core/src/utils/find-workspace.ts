import { cwd as _cwd } from 'node:process';
import findWorkspaceDir from '@pnpm/find-workspace-dir';

export async function findWorkspace(cwd = _cwd()) {
	return findWorkspaceDir.default(cwd);
}
