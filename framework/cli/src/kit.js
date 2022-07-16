import { program } from 'commander';
import pkg from '../package.json' assert { type: 'json' };
import { getApps } from './utils.js';
import { build, commit, dev, preview, setup } from './commands/index.js';

const kit = createKitCLI();

kit.then((run) => run(process.argv));

async function createKitCLI() {
	const apps = await getApps();
	const appNames = apps.map((app) => app.name.replace('@ovenwand/', ''));

	program.name('kit').version(pkg.version);

	program.command('setup').action(setup);

	program
		.command('dev')
		.argument('[app]', `app to run: ${appNames.join(', ')}`)
		.option('-e, --env', 'use doppler env')
		.option('-f, --force', 'ignore existing turbo cache')
		.action(dev);

	program
		.command('build')
		.argument('[app]', `app to build: ${appNames.join(', ')}`)
		.option('-e, --env', 'use doppler env')
		.option('-f, --force', 'ignore existing turbo cache')
		.action(build);

	program
		.command('preview')
		.argument('[app]', `app to preview: ${appNames.join(', ')}`)
		.option('-e, --env', 'use doppler env')
		.option('-f, --force', 'ignore existing turbo cache')
		.action(preview);

	program.command('commit').action(commit);

	return (argv) => program.parse(argv);
}
