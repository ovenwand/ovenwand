import { onDestroy } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { isClient } from '@ovenwand/util.browser';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type Orientation = 'portrait' | 'landscape';

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536
};

const breakpoint: UseMedia['breakpoint'] = writable(findBreakpoint());
const orientation: UseMedia['orientation'] = writable(findOrientation());
const xs: UseMedia['xs'] = derived(breakpoint, matchBreakpoint('xs'));
const sm: UseMedia['sm'] = derived(breakpoint, matchBreakpoint('sm'));
const md: UseMedia['md'] = derived(breakpoint, matchBreakpoint('md'));
const lg: UseMedia['lg'] = derived(breakpoint, matchBreakpoint('lg'));
const xl: UseMedia['xl'] = derived(breakpoint, matchBreakpoint('xl'));
const xxl: UseMedia['xxl'] = derived(breakpoint, matchBreakpoint('xxl'));
const portrait: UseMedia['portrait'] = derived(orientation, matchOrientation('portrait'));
const landscape: UseMedia['landscape'] = derived(orientation, matchOrientation('landscape'));

function matchBreakpoint(name: Breakpoint) {
	const BREAKPOINTS: Record<Breakpoint, number> = {
		xs: 0,
		sm: 1,
		md: 2,
		lg: 3,
		xl: 4,
		xxl: 5
	};

	return (breakpoint: Breakpoint) => BREAKPOINTS[breakpoint] >= BREAKPOINTS[name];
}

function matchOrientation(name: Orientation) {
	return (orientation: Orientation) => orientation === name;
}

function findBreakpoint(): Breakpoint {
	if (!isClient) {
		return 'xs';
	}

	const { clientWidth } = document.documentElement;

	let $breakpoint: Breakpoint;

	if (clientWidth < breakpoints.sm) {
		$breakpoint = 'xs';
	} else if (clientWidth < breakpoints.md) {
		$breakpoint = 'sm';
	} else if (clientWidth < breakpoints.lg) {
		$breakpoint = 'md';
	} else if (clientWidth < breakpoints.xl) {
		$breakpoint = 'lg';
	} else if (clientWidth < breakpoints.xxl) {
		$breakpoint = 'xl';
	} else {
		$breakpoint = 'xxl';
	}

	return $breakpoint;
}

function findOrientation(): Orientation {
	if (!isClient) {
		return 'portrait';
	}

	const { clientHeight, clientWidth } = document.documentElement;

	return clientWidth > clientHeight ? 'landscape' : 'portrait';
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
	xxl: Readable<boolean>;
	breakpoint: Writable<Breakpoint>;
	portrait: Readable<boolean>;
	landscape: Readable<boolean>;
	orientation: Writable<Orientation>;
}

export function useMedia(): UseMedia {
	if (isClient) {
		window.addEventListener('resize', setBreakpoint);
		window.addEventListener('resize', setOrientation);

		onDestroy(() => {
			window.removeEventListener('resize', setBreakpoint);
			window.removeEventListener('resize', setOrientation);
		});

		setBreakpoint();
		setOrientation();
	}

	return {
		xs,
		sm,
		md,
		lg,
		xl,
		xxl,
		breakpoint,
		portrait,
		landscape,
		orientation
	};
}
