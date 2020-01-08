<script>
    export let segment;

    $: activeClass = (url) => ~url.indexOf(segment) ? 'active' : '';
</script>

<style lang="sass">
    @import "Navigation.scss";
</style>

<ul class="navigation-list">
    <li class="navigation-item">
        <a class={activeClass('portfolio')} rel="prefetch" href="portfolio" title="Portfolio">
            Portfolio
        </a>
    </li>
    <li class="navigation-item">
        <a class={activeClass('profile')} rel="prefetch" href="profile" title="Profile">
            Profile
        </a>
    </li>
    <li class="navigation-item">
        <a class={activeClass('company')} rel="prefetch" href="company" title="Company">
            Company
        </a>
    </li>
</ul>
