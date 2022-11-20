export function getEslintArgs(config) {
	const args = [];

	if (config.config) {
		args.push('--config', config.config);
	}

	if (config.ignorePath) {
		args.push('--ignore-path', config.ignorePath);
	}

	if (config.pattern) {
		args.push(config.pattern);
	}

	return args;
}

export function getPrettierArgs(config) {
	const args = [];

	if (config.config) {
		args.push('--config', config.config);
	}

	if (config.ignorePath) {
		args.push('--ignore-path', config.ignorePath);
	}

	if (config.pattern) {
		args.push(config.pattern);
	}

	return args;
}
