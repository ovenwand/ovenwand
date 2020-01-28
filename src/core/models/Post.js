import { slug } from '@/core/util';

const defaults = (data, key, fallback) => {
    if (data.hasOwnProperty(key)) {
        return data[key];
    }

    return fallback;
};

export default class Post {
    constructor(data) {
        this.title = defaults(data, 'title', '');
        this.slug = defaults(data, 'slug', slug(this.title));
        this.author = defaults(data, 'author', null);
        this.content = defaults(data, 'content', '');
        this.tags = defaults(data, 'tags', null);
        this.private = defaults(data, 'private', false);
        this.created_at = defaults(data, 'created_at', null);
        this.updated_at = defaults(data, 'updated_at', this.created_at);
    }
}