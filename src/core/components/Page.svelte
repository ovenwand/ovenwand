<script>
    export let title = '';
    export let background = null;
    export let lightText = false;

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

<svelte:head>
    <title>{title}</title>
    {@html style}
</svelte:head>

<slot/>
