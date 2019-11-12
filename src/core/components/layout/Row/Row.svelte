<script>
    import { fade } from 'svelte/transition';
    import { createClassName } from '../../../util';

    export let relative = false;
    export let fill = false;

    export let padding = null;
    export let paddingXs = null;
    export let paddingSm = null;
    export let paddingMd = null;
    export let paddingLg = null;
    export let paddingXl = null;

    let className = '';
    export { className as class };

    $: rowClasses = createClassName({
        'row': true,
        'relative': relative,
        'fill': fill,
        'padding': typeof padding === 'string' ? false : padding,
        'padding-xs': paddingXs,
        'padding-sm': paddingSm,
        'padding-md': paddingMd,
        'padding-lg': paddingLg,
        'padding-xl': paddingXl,
        [className]: className,
    });
</script>

<style lang="sass">
    @import "Row.scss";
</style>

<div class={rowClasses} in:fade={{ duration: 300 }}>
    <slot/>
</div>