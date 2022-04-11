import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { isClient } from '@ovenwand/util.browser';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Orientation = 'portrait' | 'landscape';

export const breakpoints = {
	sm: 420,
	md: 1024,
	lg: 1440,
	xl: 1920
};

const breakpoint: UseMedia['breakpoint'] = writable(findBreakpoint());
const orientation: UseMedia['orientation'] = writable(findOrientation());
const xs: UseMedia['xs'] = derived(breakpoint, matchBreakpoint('xs'));
const sm: UseMedia['sm'] = derived(breakpoint, matchBreakpoint('sm'));
const md: UseMedia['md'] = derived(breakpoint, matchBreakpoint('md'));
const lg: UseMedia['lg'] = derived(breakpoint, matchBreakpoint('lg'));
const xl: UseMedia['xl'] = derived(breakpoint, matchBreakpoint('xl'));

function matchBreakpoint(name: string) {
	return (breakpoint: string) => breakpoint === name;
}

function findBreakpoint(): Breakpoint {
	if (!isClient) {
		return 'xs';
	}

	// const viewportWidth = screen.availWidth;
	const viewportWidth = document.documentElement.clientWidth;
	let $breakpoint: ReturnType<typeof findBreakpoint> = 'xs';

	if (viewportWidth < breakpoints.sm) {
		$breakpoint = 'xs';
	} else if (viewportWidth < breakpoints.md) {
		$breakpoint = 'sm';
	} else if (viewportWidth < breakpoints.lg) {
		$breakpoint = 'md';
	} else if (viewportWidth < breakpoints.xl) {
		$breakpoint = 'lg';
	} else {
		$breakpoint = 'xl';
	}

	return $breakpoint;
}

function findOrientation(): Orientation {
	if (!isClient) {
		return 'portrait';
	}

	let $orientation: ReturnType<typeof findOrientation> = 'portrait';

	if ('orientation' in screen) {
		const angle = Math.abs(screen.orientation.angle);
		$orientation = angle === 90 ? 'landscape' : 'portrait';
	} else {
		$orientation = screen.width > screen.height ? 'landscape' : 'portrait';
	}

	return $orientation;
}

function setBreakpoint() {
	breakpoint.set(findBreakpoint());
}

function setOrientation() {
	orientation.set(findOrientation());
}

export interface UseMedia {
	xs: Readable<boolean>;
	sm: Readable<boolean>;
	md: Readable<boolean>;
	lg: Readable<boolean>;
	xl: Readable<boolean>;
	breakpoint: Writable<Breakpoint>;
	orientation: Writable<Orientation>;
}

export function useMedia(): UseMedia {
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', setBreakpoint);

		if ('orientation' in screen) {
			screen.orientation.addEventListener('change', setOrientation);
		} else {
			window.addEventListener('orientationchange', setOrientation);
		}

		setBreakpoint();
		setOrientation();
	}

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
