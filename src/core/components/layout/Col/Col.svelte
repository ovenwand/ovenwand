<script context="module">
    export const COLS = 12;
</script>

<script>
    import { createClassName, createStyle } from '../../../util';

    export let xs = null;
    export let sm = null;
    export let md = null;
    export let lg = null;
    export let xl = null;

    export let padding = false;
    export let paddingXs = false;
    export let paddingSm = false;
    export let paddingMd = false;
    export let paddingLg = false;
    export let paddingXl = false;

    export let align = null;
    export let alignXs = null;
    export let alignSm = null;
    export let alignMd = null;
    export let alignLg = null;
    export let alignXl = null;

    export let justify = null;
    export let justifyXs = null;
    export let justifySm = null;
    export let justifyMd = null;
    export let justifyLg = null;
    export let justifyXl = null;

    let className = '';
    export { className as class };

    let cols = COLS;

    $: colClasses = createClassName({
        'col': true,
        'padding': padding,
        'padding-xs': paddingXs,
        'padding-sm': paddingSm,
        'padding-md': paddingMd,
        'padding-lg': paddingLg,
        'padding-xl': paddingXl,
        [className]: className,
    });

    $: colStyles = createStyle({
        '--col-xs': xs && getPoint(xs),
        '--col-sm': sm && getPoint(sm),
        '--col-md': md && getPoint(md),
        '--col-lg': lg && getPoint(lg),
        '--col-xl': xl && getPoint(xl),
        '--col-align': align,
        '--col-align-xs': alignXs,
        '--col-align-sm': alignSm,
        '--col-align-md': alignMd,
        '--col-align-lg': alignLg,
        '--col-align-xl': alignXl,
        '--col-justify': justify,
        '--col-justify-xs': justifyXs,
        '--col-justify-sm': justifySm,
        '--col-justify-md': justifyMd,
        '--col-justify-lg': justifyLg,
        '--col-justify-xl': justifyXl,
    });

    function getPoint(fraction) {
        return `${(fraction / cols) * 100}%`;
    }
</script>

<style lang="scss">
    @import "Col.scss";
</style>

<div class={colClasses} style={colStyles}>
    <slot/>
</div>