import fs from 'fs';
import path from 'path';
// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const getPostPath = (...paths) => path.resolve('./src/routes/blog/_posts', ...paths);

const posts = [];
const years = fs.readdirSync(getPostPath());

// TODO stop trying to be egyptian, solve with recursion.
for (const year of years) {
	const months = fs.readdirSync(getPostPath(year));

	for (const month of months) {
		const days = fs.readdirSync(getPostPath(year, month));

		for (const day of days) {
			const files = fs.readdirSync(getPostPath(year, month, day));

			for (const fileName of files) {
				posts.push(require(`@/routes/blog/_posts/${year}/${month}/${day}/${fileName}`).default);
			}
		}
	}
}

const byDate = (a, b) => new Date(b.created_at) - new Date(a.created_at);

export default posts.sort(byDate);
