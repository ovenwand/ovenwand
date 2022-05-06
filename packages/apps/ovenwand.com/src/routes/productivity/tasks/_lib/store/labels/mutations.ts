import { copyLabel, createLabel } from './utils';
import type { ILabel } from './state';

export type LabelMutation = ($labels: ILabel[]) => ILabel[];

export function addLabel(label: Partial<ILabel>): LabelMutation {
	return ($labels) => [...$labels, createLabel(label)];
}

export function updateLabel(label: ILabel): LabelMutation {
	return ($labels) => [...$labels.filter((l) => l._id !== label._id), copyLabel(label)];
}

export function addOrUpdateLabel(label: ILabel): LabelMutation {
	return ($labels) =>
		$labels.find((l) => l._id === label._id)
			? updateLabel(label)($labels)
			: addLabel(label)($labels);
}
