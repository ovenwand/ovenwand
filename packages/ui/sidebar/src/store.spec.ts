/// <reference types="cypress" />

import type { SidebarState, SidebarStore } from './store';
import { store } from './store';

describe('@ovenwand/ui.sidebar', () => {
	describe('store', () => {
		const globalId = 'test-id';
		let expanded = false;

		const source: SidebarState = { expand: expanded };
		const sidebar: SidebarStore = store.add(globalId, source);

		sidebar.subscribe((state) => {
			expanded = state.expand;
		});

		it('creates stores', () => {
			const testId = 'create';
			expect(typeof store.get(testId)).to.equal('undefined');
			store.add(testId);
			expect(typeof store.get(testId)).to.not.equal('undefined');
		});

		it('destroys stores', () => {
			const testId = 'delete';
			store.add(testId);
			expect(typeof store.get(testId)).to.not.equal('undefined');
			store.remove(testId);
			expect(typeof store.get(testId)).to.equal('undefined');
		});

		it('expands sidebars', () => {
			expect(expanded).to.equal(false);
			store.expand(globalId);
			expect(expanded).to.equal(true);
		});

		it('contracts sidebars', () => {
			expect(expanded).to.equal(true);
			store.contract(globalId);
			expect(expanded).to.equal(false);
		});
	});
});
