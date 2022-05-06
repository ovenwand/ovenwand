import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { isClient } from '@ovenwand/util.browser';

export type Breakpoint = number;
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type Orientation = 'portrait' | 'landscape';

const breakpoints: UseMedia['breakpoints'] = {
	xs: 0,
	sm: 1,
	md: 2,
	lg: 3,
	xl: 4,
	xxl: 5
};

const breakpoint: UseMedia['breakpoint'] = writable(findBreakpoint());
const xs: UseMedia['xs'] = derived(breakpoint, matchBreakpoint('xs'));
const sm: UseMedia['sm'] = derived(breakpoint, matchBreakpoint('sm'));
const md: UseMedia['md'] = derived(breakpoint, matchBreakpoint('md'));
const lg: UseMedia['lg'] = derived(breakpoint, matchBreakpoint('lg'));
const xl: UseMedia['xl'] = derived(breakpoint, matchBreakpoint('xl'));
const xxl: UseMedia['xxl'] = derived(breakpoint, matchBreakpoint('xxl'));

const orientation: UseMedia['orientation'] = writable(findOrientation());
const portrait: UseMedia['portrait'] = derived(orientation, matchOrientation('portrait'));
const landscape: UseMedia['landscape'] = derived(orientation, matchOrientation('landscape'));

let created = false;

function matchBreakpoint(name: BreakpointName) {
	return (breakpoint: Breakpoint) => breakpoint >= breakpoints[name];
}

function matchOrientation(name: Orientation) {
	return (orientation: Orientation) => orientation === name;
}

function findBreakpoint(): Breakpoint {
	if (!isClient) {
		return breakpoints.xs;
	}

	const { clientWidth } = document.documentElement;

	let $breakpoint: Breakpoint;

	if (clientWidth < 640) {
		$breakpoint = breakpoints.xs;
	} else if (clientWidth < 768) {
		$breakpoint = breakpoints.sm;
	} else if (clientWidth < 1024) {
		$breakpoint = breakpoints.md;
	} else if (clientWidth < 1280) {
		$breakpoint = breakpoints.lg;
	} else if (clientWidth < 1536) {
		$breakpoint = breakpoints.xl;
	} else {
		$breakpoint = breakpoints.xxl;
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
	breakpoints: Record<BreakpointName, Breakpoint>;
}

export function useMedia(): UseMedia {
	if (isClient && !created) {
		setBreakpoint();
		setOrientation();

		window.addEventListener('resize', setBreakpoint);
		window.addEventListener('resize', setOrientation);

		created = true;
	}

	return {
		breakpoints,

		breakpoint,
		xs,
		sm,
		md,
		lg,
		xl,
		xxl,

		orientation,
		portrait,
		landscape
	};
}
