import type { ILabel } from './state';

export function createLabel(label: Partial<ILabel>): ILabel {
	return {
		_id: null,
		name: 'Default name',
		...label
	};
}

export function copyLabel(label: Partial<ILabel>): ILabel {
	return createLabel({
		...label
	});
}
