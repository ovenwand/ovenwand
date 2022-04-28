export function preventDefault(event: Event) {
	if (event.cancelable) {
		event.preventDefault();
	}
}
