import { exec } from '@ovenwand/toolchain.cli';

export async function getCommitMessage() {
	const result = await exec('git', ['--no-pager', 'show', '-s', '--pretty=format:%s'], {
		stdio: 'pipe'
	});
	return result.output;
}
