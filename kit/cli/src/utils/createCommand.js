import { resolve } from 'path';
import findWorkspaceDir from '@pnpm/find-workspace-dir';

export async function createCommand(command) {
	const workspace = await findWorkspaceDir.default(process.cwd());

	const paths = {
		workspace,
		kit: resolve(workspace, '.kit')
	};

	return (...args) => command(...args, { paths });
}
