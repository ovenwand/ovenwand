export const equals = {
	name: 'equals',
	handle: (a, b, options) => {
		if (a === b) {
			return options.fn(this);
		}

		return options.inverse(this);
	}
};

export const not = {
	name: 'not',
	handle: (a, b, options) => {
		if (a !== b) {
			return options.fn(this);
		}

		return options.inverse(this);
	}
};
