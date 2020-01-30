import { cubicOut } from 'svelte/easing';
import { isFunction } from '@/core/util';

export function crossfade({ fallback, ...defaults }) {
    const to_receive = new Map();
    const to_send = new Map();

    function crossfade(fromNode, node, params) {
        const {
            delay = 0,
            duration = (d) => Math.sqrt(d) * 30,
            easing = cubicOut,
        } = Object.assign(Object.assign({}, defaults), params);

        const from = fromNode.getBoundingClientRect();
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);

        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;

        return {
            delay,
            duration: isFunction(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1-t) * dw}, ${t + (1-t) * dh});
			`
        };
    }

    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, { node });

            return () => {
                if (counterparts.has(params.key)) {
                    const fromNode = counterparts.get(params.key).node;
                    counterparts.delete(params.key);

                    return crossfade(fromNode, node, params);
                }

                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }

    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}
