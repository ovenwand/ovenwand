import { argv, program, type Command, type CommandOptions } from '@ovenwand/toolchain.cli';
import { createCommands } from './create-commands.js';

export interface ToolchainCliCommandsApi {
	get(name: string): Command | undefined;
	add(command: Command, options?: CommandOptions): void;
}

export interface ToolchainCliApi {
	commands: ToolchainCliCommandsApi;
	program: Command;
	argv: string[];
}

export function createCli(): ToolchainCliApi {
	return {
		commands: createCommands(program),
		program,
		argv,
	};
}
