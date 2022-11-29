import { exec } from '@ovenwand/toolchain.cli';

export async function getBranchName() {
	const result = await exec('git', ['branch', '--show-current'], { stdio: 'pipe' });
	return result.output.trim();
}
