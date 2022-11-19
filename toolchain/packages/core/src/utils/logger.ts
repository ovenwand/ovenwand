import { env, stdout } from 'node:process';
import { cursorTo, clearScreenDown } from 'node:readline';

export interface ToolchainLoggerApi {
	log(...args): void;
	info(...args): void;
	warn(...args): void;
	error(...args): void;
	debug(...args): void;
	clear(): void;
	clearScreen(): void;
}

export function createLogger(context: Partial<Toolchain.Context>): ToolchainLoggerApi {
	const log = (...args) => console.log(...args);
	const info = (...args) => console.info(...args);
	const warn = (...args) => console.warn(...args);
	const error = (...args) => console.error(...args);
	const clear = () => console.clear();

	const debug = (...args) => {
		if ((context?.env?.DEBUG ?? env.DEBUG) !== '1') { // Not really nice
			return;
		}

		return log(...args);
	};

	function clearScreen() {
		const repeatCount = stdout.rows - 2;
		const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
		console.log(blank);
		cursorTo(stdout, 0, 0);
		clearScreenDown(stdout);
	}

	return {
		log,
		info,
		warn,
		error,
		debug,
		clear,
		clearScreen,
	};
}