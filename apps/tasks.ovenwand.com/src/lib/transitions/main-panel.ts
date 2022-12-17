import { crossfade, fade } from 'svelte/transition';

export const panelTransitionDuration = 100;
export const contentTransitionDuration = 50;
export const key = 'main-panel';

export const [send, receive] = crossfade({
	delay: contentTransitionDuration,
	duration: panelTransitionDuration,
	fallback: fade
});

const contentInOptions = {
	delay: panelTransitionDuration + contentTransitionDuration,
	duration: contentTransitionDuration
};

const contentOutOptions = {
	duration: contentTransitionDuration
};

const contentTransitions = {
	in: { func: fade, options: contentInOptions },
	out: { func: fade, options: contentOutOptions }
};

export const panelTransitions = {
	header: contentTransitions,
	content: contentTransitions,
	footer: contentTransitions
};
