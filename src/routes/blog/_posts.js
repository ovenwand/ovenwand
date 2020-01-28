import fs from 'fs';
import path from 'path';
import marked from 'marked';
import Post from '../../core/models/Post';
// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import post from './_posts/2020/01/25/IndexedDB.md';

const getPostPath = (...paths) => path.resolve('./src/routes/blog/_posts', ...paths);

const getPostHeader = (headerText) => {
	const header = {};

	const entries = headerText.split('\n').filter((v) => v).map((v) => {
		v = v.split(': ');
		return [v[0], v[1]];
	});

	for (const entry of entries) {
		header[entry[0]] = entry[1];
	}

	if (header.hasOwnProperty('private')) {
		header.private = header.private === 'true';
	}

	return header;
};

const getPostContent = (contentText) => contentText ? marked(contentText) : '';

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
				const post = require(`@/routes/blog/_posts/${year}/${month}/${day}/${fileName}`).default;

				if (post && !post.private) {
					posts.push(post);
				}
			}
		}
	}
}

export default posts.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
