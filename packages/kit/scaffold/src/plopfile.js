import { generators } from '@ovenwand/kit.scaffold';

export default (plop) => {
	plop.setHelper('equals', (a, b, options) => {
		if (a === b) {
			return options.fn(this);
		}

		return options.inverse(this);
	});

	plop.setHelper('not', (a, b, options) => {
		if (a !== b) {
			return options.fn(this);
		}

		return options.inverse(this);
	});

	for (const generator of Object.values(generators)) {
		plop.setGenerator(generator.name, generator.config);
	}
};
