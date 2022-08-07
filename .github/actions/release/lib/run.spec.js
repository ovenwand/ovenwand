const path = require('path');
const fs = require('fs-extra');
const writeChangeset = require('@changesets/write');
const fixturez = require('fixturez');

jest.mock('@actions/github', () => ({
	context: {
		repo: {
			owner: 'changesets',
			repo: 'action'
		},
		ref: 'refs/heads/some-branch',
		sha: 'xeac7'
	},
	getOctokit: jest.fn()
}));

jest.mock('./gitUtils.js');

const github = require('@actions/github');
const { runVersion } = require('./run.js');

let mockedGithubMethods = {
	search: {
		issuesAndPullRequests: jest.fn()
	},
	pulls: {
		create: jest.fn()
	},
	repos: {
		createRelease: jest.fn()
	}
};

github.getOctokit.mockImplementation(() => mockedGithubMethods);

let f = fixturez(__dirname);

const linkNodeModules = async (cwd) => {
	await fs.symlink(path.join(__dirname, '..', 'node_modules'), path.join(cwd, 'node_modules'));
};

const writeChangesets = (changesets, cwd) => {
	return Promise.all(changesets.map((commit) => writeChangeset.default(commit, cwd)));
};

beforeEach(() => {
	jest.clearAllMocks();
});

describe('version', () => {
	it('creates simple PR', async () => {
		let cwd = f.copy('simple-project');
		linkNodeModules(cwd);

		mockedGithubMethods.search.issuesAndPullRequests.mockImplementationOnce(() => ({
			data: { items: [] }
		}));

		mockedGithubMethods.pulls.create.mockImplementationOnce(() => ({
			data: { number: 123 }
		}));

		await writeChangesets(
			[
				{
					releases: [
						{
							name: 'simple-project-pkg-a',
							type: 'minor'
						},
						{
							name: 'simple-project-pkg-b',
							type: 'minor'
						}
					],
					summary: 'Awesome feature'
				}
			],
			cwd
		);

		await runVersion({
			githubToken: '@@GITHUB_TOKEN',
			cwd
		});

		expect(mockedGithubMethods.pulls.create.mock.calls[0]).toMatchSnapshot();
	});

	it('only includes bumped packages in the PR body', async () => {
		let cwd = f.copy('simple-project');
		linkNodeModules(cwd);

		mockedGithubMethods.search.issuesAndPullRequests.mockImplementationOnce(() => ({
			data: { items: [] }
		}));

		mockedGithubMethods.pulls.create.mockImplementationOnce(() => ({
			data: { number: 123 }
		}));

		await writeChangesets(
			[
				{
					releases: [
						{
							name: 'simple-project-pkg-a',
							type: 'minor'
						}
					],
					summary: 'Awesome feature'
				}
			],
			cwd
		);

		await runVersion({
			githubToken: '@@GITHUB_TOKEN',
			cwd
		});

		expect(mockedGithubMethods.pulls.create.mock.calls[0]).toMatchSnapshot();
	});

	it("doesn't include ignored package that got a dependency update in the PR body", async () => {
		let cwd = f.copy('ignored-package');
		linkNodeModules(cwd);

		mockedGithubMethods.search.issuesAndPullRequests.mockImplementationOnce(() => ({
			data: { items: [] }
		}));

		mockedGithubMethods.pulls.create.mockImplementationOnce(() => ({
			data: { number: 123 }
		}));

		await writeChangesets(
			[
				{
					releases: [
						{
							name: 'ignored-package-pkg-b',
							type: 'minor'
						}
					],
					summary: 'Awesome feature'
				}
			],
			cwd
		);

		await runVersion({
			githubToken: '@@GITHUB_TOKEN',
			cwd
		});

		expect(mockedGithubMethods.pulls.create.mock.calls[0]).toMatchSnapshot();
	});

	it('does not include changelog entries if full message exceeds size limit', async () => {
		let cwd = f.copy('simple-project');
		linkNodeModules(cwd);

		mockedGithubMethods.search.issuesAndPullRequests.mockImplementationOnce(() => ({
			data: { items: [] }
		}));

		mockedGithubMethods.pulls.create.mockImplementationOnce(() => ({
			data: { number: 123 }
		}));

		await writeChangesets(
			[
				{
					releases: [
						{
							name: 'simple-project-pkg-a',
							type: 'minor'
						}
					],
					summary: `# Non manus superum

## Nec cornibus aequa numinis multo onerosior adde

Lorem markdownum undas consumpserat malas, nec est lupus; memorant gentisque ab
limine auctore. Eatque et promptu deficit, quam videtur aequa est **faciat**,
locus. Potentia deus habebat pia quam qui coniuge frater, tibi habent fertque
viribus. E et cognoscere arcus, lacus aut sic pro crimina fuit tum **auxilium**
dictis, qua, in.

In modo. Nomen illa membra.

> Corpora gratissima parens montibus tum coeperat qua remulus caelum Helenamque?
> Non poenae modulatur Amathunta in concita superi, procerum pariter rapto cornu
> munera. Perrhaebum parvo manus contingere, morari, spes per totiens ut
> dividite proculcat facit, visa.

Adspicit sequitur diffamatamque superi Phoebo qua quin lammina utque: per? Exit
decus aut hac inpia, seducta mirantia extremo. Vidi pedes vetus. Saturnius
fluminis divesque vulnere aquis parce lapsis rabie si visa fulmineis.
`
				}
			],
			cwd
		);

		await runVersion({
			githubToken: '@@GITHUB_TOKEN',
			cwd,
			prBodyMaxCharacters: 1000
		});

		expect(mockedGithubMethods.pulls.create.mock.calls[0]).toMatchSnapshot();
		expect(mockedGithubMethods.pulls.create.mock.calls[0][0].body).toMatch(
			/The changelog information of each package has been omitted from this message/
		);
	});

	it('does not include any release information if a message with simplified release info exceeds size limit', async () => {
		let cwd = f.copy('simple-project');
		linkNodeModules(cwd);

		mockedGithubMethods.search.issuesAndPullRequests.mockImplementationOnce(() => ({
			data: { items: [] }
		}));

		mockedGithubMethods.pulls.create.mockImplementationOnce(() => ({
			data: { number: 123 }
		}));

		await writeChangesets(
			[
				{
					releases: [
						{
							name: 'simple-project-pkg-a',
							type: 'minor'
						}
					],
					summary: `# Non manus superum

## Nec cornibus aequa numinis multo onerosior adde

Lorem markdownum undas consumpserat malas, nec est lupus; memorant gentisque ab
limine auctore. Eatque et promptu deficit, quam videtur aequa est **faciat**,
locus. Potentia deus habebat pia quam qui coniuge frater, tibi habent fertque
viribus. E et cognoscere arcus, lacus aut sic pro crimina fuit tum **auxilium**
dictis, qua, in.

In modo. Nomen illa membra.

> Corpora gratissima parens montibus tum coeperat qua remulus caelum Helenamque?
> Non poenae modulatur Amathunta in concita superi, procerum pariter rapto cornu
> munera. Perrhaebum parvo manus contingere, morari, spes per totiens ut
> dividite proculcat facit, visa.

Adspicit sequitur diffamatamque superi Phoebo qua quin lammina utque: per? Exit
decus aut hac inpia, seducta mirantia extremo. Vidi pedes vetus. Saturnius
fluminis divesque vulnere aquis parce lapsis rabie si visa fulmineis.
`
				}
			],
			cwd
		);

		await runVersion({
			githubToken: '@@GITHUB_TOKEN',
			cwd,
			prBodyMaxCharacters: 500
		});

		expect(mockedGithubMethods.pulls.create.mock.calls[0]).toMatchSnapshot();
		expect(mockedGithubMethods.pulls.create.mock.calls[0][0].body).toMatch(
			/All release information have been omitted from this message, as the content exceeds the size limit/
		);
	});
});