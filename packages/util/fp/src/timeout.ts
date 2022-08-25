export function timeout(timeout: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}
