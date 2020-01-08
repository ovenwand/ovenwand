<script>
    import { onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { quadIn } from 'svelte/easing';
    import { Container } from './layout/Container';
    import icon from '@/../static/images/back.svg';

    export let segment;

    let scrollY;

    let scrollProgress = tweened(0, {
        duration: 100,
        ease: quadIn,
    });

    onDestroy(scrollProgress.subscribe((y) => {
        if (typeof document !== 'undefined') {
            // Should be `scrollY` but it has performance issues
            // scrollY = y;
            document.documentElement.scrollTop = y;
        }
    }));

    function onButtonClick() {
        scrollProgress.set(scrollY, { duration: 0 });
        scrollProgress.set(0);
    }
</script>

<style lang="sass">
    @import "../theme/mixins.scss";

    :global(#back-to-top) {
        background: none;
        bottom: 5.4rem;
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        text-align: right;
        pointer-events: none;

        button {
            @include button-clean;
            pointer-events: all;
        }

        :global(svg) {
            height: 4.4rem;
            margin: 1rem;
            transform: rotate(90deg);
        }
    }
</style>

<svelte:window bind:scrollY={scrollY}/>

<div id="app" class="page-{segment}">
    <slot/>

    {#if scrollY > 250}
    <Container id="back-to-top">
        <button on:click={onButtonClick}>
            {@html icon}
        </button>
    </Container>
    {/if}
</div>
