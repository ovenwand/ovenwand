export function createCommands(program) {
	const commands = new Map();

	return {
		get(name: string) {
			return commands.get(name);
		},
		add(command, options?) {
			program.addCommand(command, options);
			commands.set(command.name(), command);
		}
	};
}
