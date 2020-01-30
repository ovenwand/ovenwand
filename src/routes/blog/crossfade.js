import { fade } from 'svelte/transition';
import { crossfade } from '@/core/transition';

export const duration = 300;
export const delay = 100;

export const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * duration),
    fallback: (node, params) => fade(node, { ...params, duration: delay }),
});

export default { send, receive };
