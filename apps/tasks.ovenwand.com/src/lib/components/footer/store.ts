import { writable } from 'svelte/store';

export interface Link {
	label: string;
	columns?: number;
	anchor: { href: string } & Record<string, string>;
}

const linkStore = writable<Link[]>([]);

export const footer = {
	links: { subscribe: linkStore.subscribe },

	setLinks(links: Link[]) {
		linkStore.set(links);
	},
};
