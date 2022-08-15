import { generators, helpers } from '@ovenwand/kit.scaffold';

export default (plop) => {
	for (const helper of Object.values(helpers)) {
		plop.setHelper(helper.name, helper.handle);
	}

	for (const generator of Object.values(generators)) {
		plop.setGenerator(generator.name, generator.config);
	}
};
