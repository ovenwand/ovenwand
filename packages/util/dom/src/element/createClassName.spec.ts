import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createClassName } from './createClassName';

describe('@ovenwand/util/element', () => {
	describe('createClassName', () => {
		const classNames: string[] = ['test1', 'test2'];
		const expectedClassName: string = classNames.join(' ').trim();

		const options: Record<string, unknown> = {};

		for (const className of classNames) {
			options[className] = true;
		}

		it('always returns a string', () => {
			const emptyClassName: string = createClassName({});
			expect(typeof emptyClassName).to.equal('string');
			const className: string = createClassName(options);
			expect(typeof className).to.equal('string');
		});

		it('adds spaces between classNames', () => {
			const className: string = createClassName(options);
			expect(className).to.equal(expectedClassName);
		});

		it('trims leading and trailing spaces', () => {
			const className: string = createClassName({
				[' test']: true,
				['test ']: true
			});
			expect(className.startsWith(' ')).to.equal(false);
			expect(className.endsWith(' ')).to.equal(false);
		});
	});
});
