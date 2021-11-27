import { quadOut } from 'svelte/easing';

const morph = (node, { duration = 150, out = null } ) => ({
    delay: !out ? duration * .25 : 0,
    duration,
    css: (t, u) => {
        const eased = quadOut(t);
        const rotationEased = quadOut(u);
        let rotation = rotationEased * 45;
        rotation *= out ? 1 : -1;

        return `
            position: ${out && 'absolute'};
            opacity: ${eased};
            transform: scale(${eased}) rotate(${rotation}deg);
            transform-origin: center;
        `;
    },
});

export default morph;
export { morph };