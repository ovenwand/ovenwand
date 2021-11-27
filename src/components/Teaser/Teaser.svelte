<script>
    export let title;
    export let href;
    export let color;
    export let logo;
    export let image;

    $: teaserBackground = `background-image: url(${image});`;
    $: teaserColor = `background-color: ${color};`;
</script>

<style lang="scss">
    @import "Teaser";
</style>

<a class="teaser" {href}>
    <div class="teaser-background" style={teaserBackground}></div>
    <div class="teaser-color" style={teaserColor}></div>
    <div class="teaser-logo">
        <img src={logo} alt={title}/>
    </div>
</a>