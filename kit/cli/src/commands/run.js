import { resolve } from 'path';
import { createCommand, exec } from '../utils/index.js';

export const run = createCommand(async (script, options, command, { paths }) => {
	const result = await exec(resolve(paths.kit, 'scripts', script), command.args.slice(1));
	process.exit(result.code);
});
