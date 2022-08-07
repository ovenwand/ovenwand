const { readPreState } = require('@changesets/pre');
const readChangesets = require('@changesets/read');

module.exports = async function readChangesetState(cwd = process.cwd()) {
	let preState = await readPreState(cwd);
	let isInPreMode = preState !== undefined && preState.mode === 'pre';

	let changesets = await readChangesets.default(cwd);

	if (isInPreMode) {
		let changesetsToFilter = new Set(preState.changesets);
		changesets = changesets.filter((x) => !changesetsToFilter.has(x.id));
	}

	return {
		preState: isInPreMode ? preState : undefined,
		changesets
	};
};
