import { createCommand } from '../utils/index.js';
import { turbo } from '../utils/turbo.js';

export const preview = createCommand(async (app, options, { paths }) => {
	const command = options.env ? 'preview:env' : 'preview';

	await turbo(['run', command], {
		filter: app ? `@ovenwand/${app}` : false,
		force: options.force,
		paths
	});
});
