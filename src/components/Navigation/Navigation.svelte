<script>
    export let segment;

    const items = [
        {
            url: 'portfolio',
            label: 'Portfolio',
        },
        {
            url: 'profile',
            label: 'Profile',
        },
        {
            url: 'company',
            label: 'Company',
        },
        {
            url: 'blog',
            label: 'Blog',
        },
    ];

    $: activeClass = (url) => ~url.indexOf(segment) ? 'active' : '';
</script>

<style lang="sass">
    @import "./Navigation.scss";
</style>

<ul class="navigation-list">
    {#each items as item}
        <li class="navigation-item">
            <a class={activeClass(item.url)} rel="prefetch" href={item.url} title={item.label}>
                {item.label}
            </a>
        </li>
    {/each}
</ul>
