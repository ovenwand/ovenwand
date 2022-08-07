const { execWithOutput } = require('./utils.js');
const { exec } = require('@actions/exec');

module.exports.setupUser = async () => {
	await exec('git', ['config', 'user.name', `"github-actions[bot]"`]);
	await exec('git', ['config', 'user.email', `"github-actions[bot]@users.noreply.github.com"`]);
};

module.exports.pullBranch = async (branch) => {
	await exec('git', ['pull', 'origin', branch]);
};

module.exports.push = async (branch, { force } = {}) => {
	await exec('git', ['push', 'origin', `HEAD:${branch}`, force && '--force'].filter(Boolean));
};

module.exports.pushTags = async () => {
	await exec('git', ['push', 'origin', '--tags']);
};

module.exports.switchToMaybeExistingBranch = async (branch) => {
	let { stderr } = await execWithOutput('git', ['checkout', branch], {
		ignoreReturnCode: true
	});
	let isCreatingBranch = !stderr.toString().includes(`Switched to a new branch '${branch}'`);
	if (isCreatingBranch) {
		await exec('git', ['checkout', '-b', branch]);
	}
};

module.exports.reset = async (pathSpec, mode = 'hard') => {
	await exec('git', ['reset', `--${mode}`, pathSpec]);
};

module.exports.commitAll = async (message) => {
	await exec('git', ['add', '.']);
	await exec('git', ['commit', '-m', message]);
};

module.exports.checkIfClean = async () => {
	const { stdout } = await execWithOutput('git', ['status', '--porcelain']);
	return !stdout.length;
};
