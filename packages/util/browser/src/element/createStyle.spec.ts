/// <reference types="cypress" />

import { createStyle } from './createStyle';

describe('@ovenwand/util.browser', () => {
	describe('createStyle', () => {
		it('always returns a string', () => {
			const emptyStyle: string = createStyle({});
			expect(typeof emptyStyle).to.equal('string');
			const style: string = createStyle({ display: 'none' });
			expect(typeof style).to.equal('string');
		});

		it('trims leading and trailing spaces', () => {
			const style: string = createStyle({
				[' test']: ' 0 ',
				['test ']: ' 0 '
			});
			expect(style.startsWith(' ')).to.equal(false);
			expect(style.endsWith(' ')).to.equal(false);
		});
	});
});
