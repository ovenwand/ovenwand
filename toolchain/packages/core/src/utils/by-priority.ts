export function byPriority(a, b) {
	const order = a.priority - b.priority;

	if (order === 0) {
		if ((a.enforce === 'pre' && b.enforce !== 'pre') || (b.enforce === 'post' && a.enforce !== 'post')) {
			return -1;
		} else if ((a.enforce === 'post' &&  b.enforce !== 'post') || (b.enforce === 'pre' && a.enforce !== 'pre')) {
			return 1;
		}
	}

	return order;
}
