<script>
    import { Container } from './layout';

    export let title = '';
    export let background = null;
    export let lightText = false;
    export let fluid = false;

    const style = `
        <style>
            #app {
                background-image: ${background ? `url(${background})` : 'none'};
                background-attachment: fixed;
            }

            #app,
            a {
                color: var(--${lightText ? 'white' : 'black'});
            }
            svg {
                fill: var(--${lightText ? 'white' : 'black'});
            }
        </style>
    `;
</script>

<style lang="scss">
    @import "./layout/Container/variables";

    #page {
        height: 100%;
    }

    #page + #page {
        position: absolute;
        top: 0;
        width: 100%;
    }
</style>

<svelte:head>
    <title>{title}</title>
    {@html style}
</svelte:head>

<div id="page">
    <Container id="content-container" {fluid}>
        <slot/>
    </Container>
</div>
