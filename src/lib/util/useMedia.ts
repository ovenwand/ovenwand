import { derived, writable } from 'svelte/store';
import { onMount } from 'svelte';

const breakpoints = {
	sm: 420,
	md: 1024,
	lg: 1440,
	xl: 1920
};

const breakpoint = writable('xs');
const orientation = writable('portrait');
const xs = derived(breakpoint, matchBreakpoint('xs'));
const sm = derived(breakpoint, matchBreakpoint('sm'));
const md = derived(breakpoint, matchBreakpoint('md'));
const lg = derived(breakpoint, matchBreakpoint('lg'));
const xl = derived(breakpoint, matchBreakpoint('xl'));

function matchBreakpoint(name: string) {
	return (breakpoint: string) => breakpoint === name;
}

function setBreakpoint() {
	const viewportWidth = screen.availWidth;

	if (viewportWidth < breakpoints.sm) {
		breakpoint.set('xs');
	} else if (viewportWidth < breakpoints.md) {
		breakpoint.set('sm');
	} else if (viewportWidth < breakpoints.lg) {
		breakpoint.set('md');
	} else if (viewportWidth < breakpoints.xl) {
		breakpoint.set('lg');
	} else {
		breakpoint.set('xl');
	}
}

function setOrientation() {
	if ('orientation' in screen) {
		const angle = Math.abs(screen.orientation.angle);
		orientation.set(angle === 90 ? 'landscape' : 'portrait');
	} else {
		orientation.set(screen.width > screen.height ? 'landscape' : 'portrait');
	}
}

export function useMedia() {
	onMount(() => {
		window.addEventListener('resize', setBreakpoint);

		if ('orientation' in screen) {
			screen.orientation.addEventListener('change', setOrientation);
		} else {
			window.addEventListener('orientationchange', setOrientation);
		}

		setBreakpoint();
		setOrientation();
	});

	return {
		xs,
		sm,
		md,
		lg,
		xl,
		breakpoint,
		orientation
	};
}
