import { createRequire } from 'node:module';
import { program } from 'commander';
import { getApps } from './utils';
import {
	build,
	commit,
	dev,
	env,
	feature,
	install,
	preview,
	release,
	run,
	scaffold,
	setup
} from './commands';

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
		.action(await commit);

	program
		.command('release')
		.argument('<action>', '')
		.action(await release);

	program.addCommand(await env());
	program.addCommand(await feature());
	program.addCommand(await scaffold());

	return (argv) => program.parse(argv);
}
