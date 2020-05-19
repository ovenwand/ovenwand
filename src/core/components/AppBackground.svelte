<script>
    import { background } from '@/store/page';

    let style;

    background.subscribe((background) => {
        if (!background) {
            style = null;
            return;
        }

        const { primary, secondary } = background;

        style = `
            --app-bg-pr: ${primary.r}deg;
            --app-bg-px: ${primary.x}%;
            --app-bg-py: ${primary.y}%;
            --app-bg-sr: ${secondary.r}deg;
            --app-bg-sx: ${secondary.x}%;
            --app-bg-sy: ${secondary.y}%;
        `
    });
</script>

<style lang="scss">
    #app-background {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
        pointer-events: none;

        &,
        &:before,
        &:after {
            transition: transform .5s ease;
        }

        &:before,
        &:after {
            content: '';
            display: block;
            height: 200%;
            position: absolute;
            width: 200%;
        }

        &:before {
            transform:
                translate3d(var(--app-bg-px, 0), var(--app-bg-py, 0), 0)
                rotate(var(--app-bg-pr, 0));
            z-index: 2;
        }

        &:after {
            transform:
                translate3d(var(--app-bg-sx, 0), var(--app-bg-sy, 0), 0)
                rotate(var(--app-bg-sr, 0));
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
