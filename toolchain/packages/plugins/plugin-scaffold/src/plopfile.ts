import * as helpers from './helpers/index.js';
import * as generators from './generators/index.js';

export default (plop) => {
	for (const helper of Object.values(helpers)) {
		plop.setHelper(helper.name, helper.handle);
	}

	for (const generator of Object.values(generators)) {
		plop.setGenerator(generator.name, generator.config);
	}
};
