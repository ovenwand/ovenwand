import { program } from 'commander';
import { createRequire } from 'module';
import { getApps } from './utils/index.js';
import {
	build,
	commit,
	dev,
	env,
	feature,
	install,
	preview,
	run,
	setup
} from './commands/index.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

export async function createKitCLI() {
	const apps = await getApps();
	const appNames = apps.map((app) => app.name.replace('@ovenwand/', ''));

	program.name('kit').version(pkg.version);

	program.command('install').action(await install);

	program.command('setup').action(await setup);

	program
		.command('dev')
		.argument('[app]', `app to run: ${appNames.join(', ')}`)
		.option('-e, --env', 'use doppler env')
		.option('-f, --force', 'ignore existing turbo cache')
		.action(await dev);

	program
		.command('build')
		.argument('[app]', `app to build: ${appNames.join(', ')}`)
		.option('-e, --env', 'use doppler env')
		.option('-f, --force', 'ignore existing turbo cache')
		.action(await build);

	program
		.command('preview')
		.argument('[app]', `app to preview: ${appNames.join(', ')}`)
		.option('-e, --env', 'use doppler env')
		.option('-f, --force', 'ignore existing turbo cache')
		.action(await preview);

	program
		.command('run')
		.argument('script', 'script to run')
		.action(await run);

	program
		.command('commit')
		.argument('<action>', '')
		// .option('-p, --prepare', 'prepare commit')
		// .option('-l, --lint <path>', 'lint commit message')
		.action(await commit);

	program.addCommand(await env());
	program.addCommand(await feature());

	return (argv) => program.parse(argv);
}
