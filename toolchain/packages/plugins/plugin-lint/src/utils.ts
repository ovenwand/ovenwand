export function getEslintArgs(config, command) {
	const args = [];

	if (config.config) {
		args.push('--config', config.config);
	}

	if (config.ignorePath) {
		args.push('--ignore-path', config.ignorePath);
	}

	if (command.args.length) {
		args.push(...command.args);
	} else if (config.pattern) {
		args.push(config.pattern);
	}

	return args;
}

export function getPrettierArgs(config, command) {
	const args = [];

	if (config.config) {
		args.push('--config', config.config);
	}

	if (config.ignorePath) {
		args.push('--ignore-path', config.ignorePath);
	}

	if (command.args.length) {
		args.push(...command.args);
	} else if (config.pattern) {
		args.push(config.pattern);
	}

	return args;
}
