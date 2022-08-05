import { createCommand } from '../utils/index.js';
import { turbo } from "../utils/turbo.js";

export const build = createCommand(async (app, options, { paths }) => {
	const command = options.env ? 'build:env' : 'build';

	await turbo(['run', command], {
		filter: app ? `@ovenwand/${app}` : false,
		force: options.force,
		paths,
	});
});
