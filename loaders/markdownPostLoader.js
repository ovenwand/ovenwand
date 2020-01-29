const marked = require('marked');
const kebabCase = require('lodash/kebabCase');

const isDev = process.env.NODE_ENV === 'development';

const slug = (str) => encodeURIComponent(kebabCase(str));

const defaults = (data, key, fallback) => {
    if (data.hasOwnProperty(key)) {
        return data[key];
    }

    return fallback;
};

const defaultImage = (title) => `https://via.placeholder.com/1920x1080?text=${title.replace(/ /g, '+')}`;

const sanitizeHeader = (header, summary, file) => {
    const { stats } = file;
    const sanitized = {};

    sanitized.private = header.private === 'true';
    sanitized.title = defaults(header, 'title', file.name.replace(/\.md$/, ''));
    sanitized.slug = defaults(header, 'slug', slug(sanitized.title));
    sanitized.author = defaults(header, 'author', null);
    sanitized.tags = defaults(header, 'tags', null);
    sanitized.featured_image = defaults(header, 'featured_image', defaultImage(sanitized.title));
    sanitized.created_at = defaults(header, 'created_at', stats.birthtime);
    sanitized.updated_at = defaults(header, 'updated_at', stats.mtime);
    sanitized.summary = defaults(header, 'summary', summary);

    return sanitized;
};

const getPostHeader = (headerText, summary, stats) => {
    const header = {};

    const entries = headerText
        .split('\n')
        .filter(Boolean)
        .map((v) => v.split(': '));

    for (const [key, value] of entries) {
        header[key] = value;
    }

    return sanitizeHeader(header, summary, stats);
};

const getPostContent = (contentText) => {
    if (contentText) {
        const summary = contentText.split('\n\n')[0];
        const content = marked(contentText);
        return [summary, content];
    }

    return ['', ''];
};

module.exports = function markdownPostLoader(source) {
    const { context, fs, resourcePath } = this;

    const file = {
        path: resourcePath,
        name: resourcePath.replace(context, '').replace(/^\//, ''),
        stats: fs.statSync(resourcePath),
    };

    const [__, headerPart, contentPart] = source.split('---\n');

    let post = null;

    if (headerPart && typeof contentPart !== 'undefined') {
        const [summary, content] = getPostContent(contentPart);
        const header = getPostHeader(headerPart, summary, file);

        if (isDev || !header.private) {
            post = { ...header, content };
        }
    }

    this.addDependency(file.path);

    return `export default ${JSON.stringify(post)}`;
};