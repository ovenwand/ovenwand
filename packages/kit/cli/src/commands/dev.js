import { createCommand } from '../utils/index.js';
import { turbo } from '../utils/turbo.js';

export const dev = createCommand(async (app, options, { command, paths }) => {
	const arg = options.env ? 'dev:env' : 'dev';

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
