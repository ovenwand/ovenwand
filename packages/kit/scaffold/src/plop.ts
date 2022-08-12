import { resolve } from 'node:path';

export async function plop(options) {
	const { paths } = options;

	cleanProcessArgv(process.argv, options);

	const { Plop, run } = await import('plop');

	Plop.prepare(
		{
			cwd: paths.workspace,
			configPath: options.config
			// preload: argv.preload || [],
			// completion: argv.completion
		},
		(env) =>
			Plop.execute(env, (env) => {
				const options = {
					...env,
					dest: resolve()
				};

				return run(options, undefined, true);
			})
	);
}

function cleanProcessArgv(argv, { args }) {
	const start = 2;
	const deleteCount = argv.slice(start).length - args.length;
	argv.splice(start, deleteCount);
}
