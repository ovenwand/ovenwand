import type { GetSession } from '@sveltejs/kit';

export const getSession: GetSession = async ({ headers }) => {
    const { referer } = headers;
    return { referer };
}
