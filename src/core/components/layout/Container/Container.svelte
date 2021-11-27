<script>
    import { createClassName } from '../../../util';

    export let id = null;
    export let fluid = false;
    export let relative = false;

    let className = '';
    export { className as class };

    $: containerClasses = createClassName({
        'container': true,
        'fluid': fluid,
        'relative': relative,
        [className]: !!className,
    });
</script>

<style lang="scss">
    @import "Container.scss";
</style>

<div {id} class={containerClasses}>
    <slot/>
</div>
