export function preventDefault(event: Event): void {
	if (event.cancelable) {
		event.preventDefault();
	}
}
