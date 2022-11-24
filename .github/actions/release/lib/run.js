const path = require('path');
const {
	getChangelogEntry,
	execWithOutput,
	getChangedPackages,
	sortTheThings,
	getVersionsByDirectory
} = require('./utils.js');
const gitUtils = require('./gitUtils.js');
const readChangesetState = require('./readChangesetState.js');
const github = require('@actions/github');
const { exec } = require('@actions/exec');
const fs = require('fs-extra');
const { getPackages } = require('@manypkg/get-packages');

// GitHub Issues/PRs messages have a max size limit on the
// message body payload.
// `body is too long (maximum is 65536 characters)`.
// To avoid that, we ensure to cap the message to 60k chars.
const MAX_CHARACTERS_PER_MESSAGE = 60000;

const createRelease = async (octokit, { pkg, tagName }) => {
	try {
		let changelogFileName = path.join(pkg.dir, 'CHANGELOG.md');

		let changelog = await fs.readFile(changelogFileName, 'utf8');

		let changelogEntry = getChangelogEntry(changelog, pkg.packageJson.version);
		if (!changelogEntry) {
			// we can find a changelog but not the entry for this version
			// if this is true, something has probably gone wrong
			throw new Error(
				`Could not find changelog entry for ${pkg.packageJson.name}@${pkg.packageJson.version}`
			);
		}

		await octokit.repos.createRelease({
			name: tagName,
			tag_name: tagName,
			body: changelogEntry.content,
			prerelease: pkg.packageJson.version.includes('-'),
			...github.context.repo
		});
	} catch (err) {
		// if we can't find a changelog, the user has probably disabled changelogs
		if (err.code !== 'ENOENT') {
			throw err;
		}
	}
};

module.exports.runPublish = async function runPublish({
	script,
	githubToken,
	createGithubReleases,
	cwd = process.cwd()
}) {
	let octokit = github.getOctokit(githubToken);
	let [publishCommand, ...publishArgs] = script.split(/\s+/);

	let changesetPublishOutput = await execWithOutput(publishCommand, publishArgs, { cwd });

	await gitUtils.pushTags();

	let { packages, tool } = await getPackages(cwd);
	let releasedPackages = [];

	if (tool !== 'root') {
		let newTagRegex = /New tag:\s+(@[^/]+\/[^@]+|[^/]+)@([^\s]+)/;
		let packagesByName = new Map(packages.map((x) => [x.packageJson.name, x]));

		for (let line of changesetPublishOutput.stdout.split('\n')) {
			let match = line.match(newTagRegex);
			if (match === null) {
				continue;
			}
			let pkgName = match[1];
			let pkg = packagesByName.get(pkgName);
			if (pkg === undefined) {
				throw new Error(
					`Package "${pkgName}" not found.` +
						'This is probably a bug in the action, please open an issue'
				);
			}
			releasedPackages.push(pkg);
		}

		if (createGithubReleases) {
			await Promise.all(
				releasedPackages.map((pkg) =>
					createRelease(octokit, {
						pkg,
						tagName: `${pkg.packageJson.name}@${pkg.packageJson.version}`
					})
				)
			);
		}
	} else {
		if (packages.length === 0) {
			throw new Error(
				`No package found.` + 'This is probably a bug in the action, please open an issue'
			);
		}
		let pkg = packages[0];
		let newTagRegex = /New tag:/;

		for (let line of changesetPublishOutput.stdout.split('\n')) {
			let match = line.match(newTagRegex);

			if (match) {
				releasedPackages.push(pkg);
				if (createGithubReleases) {
					await createRelease(octokit, {
						pkg,
						tagName: `v${pkg.packageJson.version}`
					});
				}
				break;
			}
		}
	}

	if (releasedPackages.length) {
		return {
			published: true,
			publishedPackages: releasedPackages.map((pkg) => ({
				name: pkg.packageJson.name,
				version: pkg.packageJson.version
			}))
		};
	}

	return { published: false };
};

const getVersionPrBody = (module.exports.getVersionPrBody = async function getVersionPrBody({
	hasPublishScript,
	preState,
	changedPackagesInfo,
	prBodyMaxCharacters,
	branch
}) {
	let messageHeader = `This PR was opened by the [Changesets release](https://github.com/changesets/action) GitHub action. When you're ready to do a release, you can merge this and ${
		hasPublishScript
			? `the packages will be published to npm automatically`
			: `publish to npm yourself or [setup this action to publish automatically](https://github.com/changesets/action#with-publishing)`
	}. If you're not ready to do a release yet, that's fine, whenever you add more changesets to ${branch}, this PR will be updated.
`;
	let messagePrestate = !!preState
		? `⚠️⚠️⚠️⚠️⚠️⚠️

\`${branch}\` is currently in **pre mode** so this branch has prereleases rather than normal releases. If you want to exit prereleases, run \`changeset pre exit\` on \`${branch}\`.

⚠️⚠️⚠️⚠️⚠️⚠️
`
		: '';
	let messageReleasesHeading = `# Releases`;

	let fullMessage = [
		messageHeader,
		messagePrestate,
		messageReleasesHeading,
		...changedPackagesInfo.map((info) => `${info.header}\n\n${info.content}`)
	].join('\n');

	// Check that the message does not exceed the size limit.
	// If not, omit the changelog entries of each package.
	if (fullMessage.length > prBodyMaxCharacters) {
		fullMessage = [
			messageHeader,
			messagePrestate,
			messageReleasesHeading,
			`\n> The changelog information of each package has been omitted from this message, as the content exceeds the size limit.\n`,
			...changedPackagesInfo.map((info) => `${info.header}\n\n`)
		].join('\n');
	}

	// Check (again) that the message is within the size limit.
	// If not, omit all release content this time.
	if (fullMessage.length > prBodyMaxCharacters) {
		fullMessage = [
			messageHeader,
			messagePrestate,
			messageReleasesHeading,
			`\n> All release information have been omitted from this message, as the content exceeds the size limit.`
		].join('\n');
	}

	return fullMessage;
});

module.exports.runVersion = async function runVersion({
	script,
	githubToken,
	cwd = process.cwd(),
	prTitle = 'Version Packages',
	commitMessage = 'Version Packages',
	hasPublishScript = false,
	prBodyMaxCharacters = MAX_CHARACTERS_PER_MESSAGE
}) {
	let repo = `${github.context.repo.owner}/${github.context.repo.repo}`;
	let branch = github.context.ref.replace('refs/heads/', '');
	let versionBranch = `changeset-release/${branch}`;
	let octokit = github.getOctokit(githubToken);
	let { preState } = await readChangesetState(cwd);

	await gitUtils.switchToMaybeExistingBranch(versionBranch);
	await gitUtils.reset(github.context.sha);

	let versionsByDirectory = await getVersionsByDirectory(cwd);

	if (script) {
		let [versionCommand, ...versionArgs] = script.split(/\s+/);
		await exec(versionCommand, versionArgs, { cwd });
	} else {
		await exec('pnpm', ['exec', 'changeset', 'version'], {
			cwd
		});

		await exec('pnpm', ['install'], {
			cwd
		});
	}

	let searchQuery = `repo:${repo}+state:open+head:${versionBranch}+base:${branch}`;
	let searchResultPromise = octokit.search.issuesAndPullRequests({
		q: searchQuery
	});
	let changedPackages = await getChangedPackages(cwd, versionsByDirectory);
	let changedPackagesInfoPromises = Promise.all(
		changedPackages.map(async (pkg) => {
			let changelogContents = await fs.readFile(path.join(pkg.dir, 'CHANGELOG.md'), 'utf8');

			let entry = getChangelogEntry(changelogContents, pkg.packageJson.version);
			return {
				highestLevel: entry.highestLevel,
				private: !!pkg.packageJson.private,
				content: entry.content,
				header: `## ${pkg.packageJson.name}@${pkg.packageJson.version}`
			};
		})
	);

	const finalPrTitle = `${prTitle}${!!preState ? ` (${preState.tag})` : ''}`;

	// project with `commit: true` setting could have already committed files
	if (!(await gitUtils.checkIfClean())) {
		const finalCommitMessage = `${commitMessage}${!!preState ? ` (${preState.tag})` : ''}`;
		await gitUtils.commitAll(finalCommitMessage);
	}

	await gitUtils.push(versionBranch, { force: true });

	let searchResult = await searchResultPromise;

	const changedPackagesInfo = (await changedPackagesInfoPromises)
		.filter((x) => x)
		.sort(sortTheThings);

	let prBody = await getVersionPrBody({
		hasPublishScript,
		preState,
		branch,
		changedPackagesInfo,
		prBodyMaxCharacters
	});

	if (searchResult.data.items.length === 0) {
		console.log('creating pull request');
		const { data: newPullRequest } = await octokit.pulls.create({
			base: branch,
			head: versionBranch,
			title: finalPrTitle,
			body: prBody,
			...github.context.repo
		});

		return {
			pullRequestNumber: newPullRequest.number
		};
	} else {
		const [pullRequest] = searchResult.data.items;

		console.log(`updating found pull request #${pullRequest.number}`);
		await octokit.pulls.update({
			pull_number: pullRequest.number,
			title: finalPrTitle,
			body: prBody,
			...github.context.repo
		});

		return {
			pullRequestNumber: pullRequest.number
		};
	}
};
