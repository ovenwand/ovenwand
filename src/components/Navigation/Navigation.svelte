<script>
    import backIcon from '@/../static/images/icons/chevron-left.svg';

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

    function onButtonClick() {
        console.log('test');
    }
</script>

<style lang="scss">
    @import "./Navigation";
</style>

<div class="navigation">
    <ul class="navigation-list">
        {#each items as item}
            <li class="navigation-item">
                <a class={activeClass(item.url)} rel="prefetch" href={item.url} title={item.label}>
                    {item.label}
                </a>
            </li>
        {/each}
    </ul>
</div>
