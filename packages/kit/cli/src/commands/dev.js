import { createCommand } from '../utils/index.js';
import { turbo } from '../utils/turbo.js';

export const dev = createCommand(async (app, options, { paths }) => {
	const command = options.env ? 'dev:env' : 'dev';

	await turbo(['run', command], {
		filter: app ? `@ovenwand/${app}` : false,
		force: options.force,
		paths
	});
});
