<script>
    import { background } from '@/store/page';
    import { onMount } from 'svelte';

    let style;

    let ratio = 1;

    background.subscribe((background) => {
        if (!background) {
            style = null;
            return;
        }

        const p = getTransform(background.primary);
        const s = getTransform(background.secondary);

        style = `
            --matrix-p:
                matrix3d(
                    ${p.a1}, ${p.a2}, ${p.a3}, ${p.a4},
                    ${p.b1}, ${p.b2}, ${p.b3}, ${p.b4},
                    ${p.c1}, ${p.c2}, ${p.c3}, ${p.c4},
                    ${p.d1}, ${p.d2}, ${p.d3}, ${p.d4}
                );
            --matrix-s:
                matrix3d(
                    ${s.a1}, ${s.a2}, ${s.a3}, ${s.a4},
                    ${s.b1}, ${s.b2}, ${s.b3}, ${s.b4},
                    ${s.c1}, ${s.c2}, ${s.c3}, ${s.c4},
                    ${s.d1}, ${s.d2}, ${s.d3}, ${s.d4}
                );
        `
    });

    function getTransform(t) {
        let a1 = 1, a2 = 0, a3 = 0, a4 = 0;
        let b1 = 0, b2 = 1, b3 = 0, b4 = 0;
        let c1 = 0, c2 = 0, c3 = 1, c4 = 0;
        let d1 = 0, d2 = 0, d3 = 0, d4 = 1;

        if (t.r) {
            const r = t.r * Math.PI / 180;
            a1 = Math.cos(r);
            a2 = Math.sin(r);
            b1 = -Math.sin(r);
            b2 = Math.cos(r);
        }

        if (t.x) {
            d1 += t.x;
        }

        if (t.y) {
            d2 += t.y;
        }

        return {
            a1, a2, a3, a4,
            b1, b2, b3, b4,
            c1, c2, c3, c4,
            d1, d2, d3, d4,
        }
    }

    onMount(() => {
        const defaultWidth = 1640;
        const currentWidth = window.innerWidth;
        ratio = currentWidth / defaultWidth;
    });
</script>

<style lang="scss">
    #app-background {
        height: 10000px;
        left: 0;
        pointer-events: none;
        top: 0;
        width: 10000px;
        z-index: -1;

        &,
        &:before,
        &:after {
            position: absolute;
            transition: transform .5s ease .2s;
        }

        &:before,
        &:after {
            content: '';
            display: block;
            height: 100%;
            width: 100%;
        }

        &:before {
            transform: var(--matrix-p);
                /*matrix3d(*/
                /*    var(--p-a1), var(--p-a2), var(--p-a3), var(--p-a4),*/
                /*    var(--p-b1), var(--p-b2), var(--p-b3), var(--p-b4),*/
                /*    var(--p-c1), var(--p-c2), var(--p-c3), var(--p-c4),*/
                /*    var(--p-d1), var(--p-d2), var(--p-d3), var(--p-d4)*/
                /*);*/
                /*rotate(var(--app-bg-pr, 0));*/
            z-index: 2;
        }

        &:after {
            transform: var(--matrix-s);
                /*matrix3d(*/
                /*    var(--s-a1), var(--s-a2), var(--s-a3), var(--s-a4),*/
                /*    var(--s-b1), var(--s-b2), var(--s-b3), var(--s-b4),*/
                /*    var(--s-c1), var(--s-c2), var(--s-c3), var(--s-c4),*/
                /*    var(--s-d1), var(--s-d2), var(--s-d3), var(--s-d4)*/
                /*);*/
                /*rotate(var(--app-bg-sr, 0));*/
            z-index: 1;
        }
    }

    #app-background {
        background: var(--secondary);

        &:before {
            background: var(--primary);
        }

        &:after {
            background: var(--secondary-dark);
        }
    }
</style>

{#if style}
    <div id="app-background" {style}>
        <slot/>
    </div>
{/if}
