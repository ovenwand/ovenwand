import { noop } from '@ovenwand/util';

type TransitionDescription = { func: (...args: unknown[]) => unknown; options?: unknown };
type TransitionsDescription = { in?: TransitionDescription; out?: TransitionDescription };

export function useTransition<T extends TransitionsDescription>(transition?: T) {
	return {
		inTransition: transition?.in?.func ?? noop,
		inOptions: transition?.in?.options ?? { duration: 0 },
		outTransition: transition?.out?.func ?? noop,
		outOptions: transition?.out?.options ?? { duration: 0 }
	};
}
