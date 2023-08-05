<script>
    // TODO does this really need to be a component?
    
    export let tag = 'article';

    let className = '';
    export { className as class };
</script>

<svelte:element this={tag} class="ow-prose {className}">
    <slot />
</svelte:element>
