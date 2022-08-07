const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkStringify = require('remark-stringify');
const mdastToString = require('mdast-util-to-string');
const { exec } = require('@actions/exec');
const { getPackages } = require('@manypkg/get-packages');

const BumpLevels = (module.exports.BumpLevels = {
	dep: 0,
	patch: 1,
	minor: 2,
	major: 3
});

module.exports.getVersionsByDirectory = async function getVersionsByDirectory(cwd) {
	let { packages } = await getPackages(cwd);
	return new Map(packages.map((x) => [x.dir, x.packageJson.version]));
};

module.exports.getChangedPackages = async function getChangedPackages(cwd, previousVersions) {
	let { packages } = await getPackages(cwd);
	let changedPackages = new Set();

	for (let pkg of packages) {
		const previousVersion = previousVersions.get(pkg.dir);
		if (previousVersion !== pkg.packageJson.version) {
			changedPackages.add(pkg);
		}
	}

	return [...changedPackages];
};

module.exports.getChangelogEntry = function getChangelogEntry(changelog, version) {
	let ast = unified().use(remarkParse).parse(changelog);

	let highestLevel = BumpLevels.dep;

	let nodes = ast.children;
	let headingStartInfo;
	let endIndex;

	for (let i = 0; i < nodes.length; i++) {
		let node = nodes[i];
		if (node.type === 'heading') {
			let stringified = mdastToString(node);
			let match = stringified.toLowerCase().match(/(major|minor|patch)/);
			if (match !== null) {
				let level = module.exports.BumpLevels[match[0]];
				highestLevel = Math.max(level, highestLevel);
			}
			if (headingStartInfo === undefined && stringified === version) {
				headingStartInfo = {
					index: i,
					depth: node.depth
				};
				continue;
			}
			if (
				endIndex === undefined &&
				headingStartInfo !== undefined &&
				headingStartInfo.depth === node.depth
			) {
				endIndex = i;
				break;
			}
		}
	}
	if (headingStartInfo) {
		ast.children = ast.children.slice(headingStartInfo.index + 1, endIndex);
	}
	return {
		content: unified().use(remarkStringify).stringify(ast),
		highestLevel: highestLevel
	};
};

module.exports.execWithOutput = async function execWithOutput(command, args, options) {
	let myOutput = '';
	let myError = '';

	return {
		code: await exec(command, args, {
			listeners: {
				stdout: (data) => {
					myOutput += data.toString();
				},
				stderr: (data) => {
					myError += data.toString();
				}
			},

			...options
		}),
		stdout: myOutput,
		stderr: myError
	};
};

module.exports.sortTheThings = function sortTheThings(a, b) {
	if (a.private === b.private) {
		return b.highestLevel - a.highestLevel;
	}
	if (a.private) {
		return 1;
	}
	return -1;
};
