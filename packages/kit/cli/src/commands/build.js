import { createCommand } from '../utils/index.js';
import { turbo } from '../utils/turbo.js';

export const build = createCommand(async (app, options, { command, paths }) => {
	const arg = options.env ? 'build:env' : 'build';

	// Remove the app arg from the args list
	if (app) {
		command.args.shift();
	}

	await turbo(['run', arg, '--', ...command.args], {
		filter: app ? `@ovenwand/${app}` : false,
		force: options.force,
		paths
	});
});
