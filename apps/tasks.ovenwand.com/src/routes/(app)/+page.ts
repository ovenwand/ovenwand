export async function load({ fetch }: import('./$types').PageLoadEvent) {
	const currentTaskResponse = await fetch('/api/focus/current', {
		headers: { 'content-type': 'application/json' }
	});
	const currentTask = await currentTaskResponse.json();

	return {
		tasks: [currentTask.data]
	};
}
