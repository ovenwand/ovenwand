<!-- Derp -->
<!--<script lang="ts">-->
<!--    import { page } from '$app/stores';-->
<!--    import { Column, Grid } from '$lib/components/layout';-->
<!--    import { Icon } from '$lib/components/icon';-->
<!--    import Footer from '$modules/app/components/footer';-->
<!--    import { Game } from '$modules/chi/components';-->

<!--    import treehouse from '$modules/chi/static/treehouse.svg?raw';-->
<!--    import shop from '$modules/chi/static/shop.svg?raw';-->
<!--    import skills from '$modules/chi/static/skills.svg?raw';-->
<!--    import achievement from '$modules/chi/static/achievement.svg?raw';-->
<!--    import settings from '$modules/chi/static/settings-knobs.svg?raw';-->

<!--    $: view = $page.url.pathname !== '/play/chi' && $page.url.pathname;-->

<!--    const views = [-->
<!--        {-->
<!--            icon: treehouse,-->
<!--            label: 'Buildings',-->
<!--            href: '/play/chi/buildings'-->
<!--        },-->
<!--        {-->
<!--            icon: shop,-->
<!--            label: 'Store',-->
<!--            href: '/play/chi/store'-->
<!--        },-->
<!--        {-->
<!--            icon: skills,-->
<!--            label: 'Talents',-->
<!--            href: '/play/chi/talents'-->
<!--        },-->
<!--        {-->
<!--            icon: achievement,-->
<!--            label: 'Stats',-->
<!--            href: '/play/chi/stats'-->
<!--        },-->
<!--        {-->
<!--            icon: settings,-->
<!--            label: 'Settings',-->
<!--            href: '/play/chi/settings'-->
<!--        }-->
<!--    ];-->
<!--</script>-->

<!--<Game {view}>-->
<!--    <svelte:fragment slot="navigation">-->
<!--        {#each views as { icon, label, href }}-->
<!--            <a-->
<!--                    class="flex flex-column justify-center align-center p-1"-->
<!--                    href={view !== href ? href : '/play/chi'}-->
<!--            >-->
<!--                <Icon>{@html icon}</Icon>-->
<!--                <span>{label}</span>-->
<!--            </a>-->
<!--        {/each}-->
<!--    </svelte:fragment>-->

<!--    <svelte:fragment slot="view">-->
<!--        <Grid class="h-min-full" relative style={{ 'grid-template-rows': '1fr auto' }}>-->
<!--            <Column>-->
<!--                <slot />-->
<!--            </Column>-->
<!--            <Column>-->
<!--                <Footer let:copyright>-->
<!--                    <span>{@html copyright}</span>-->
<!--                </Footer>-->
<!--            </Column>-->
<!--        </Grid>-->
<!--    </svelte:fragment>-->
<!--</Game>-->

<!--&lt;!&ndash; DerpDerp &ndash;&gt;-->
<!--<script lang="ts">-->
<!--    import { save, Save } from '$modules/chi/engine';-->
<!--    import { player } from '$modules/chi/engine/player';-->
<!--    import { lifecycle } from '$modules/chi/engine/lifecycle/store';-->
<!--    import { Sidebar } from '$modules/chi/components/sidebar';-->
<!--    import { Viewport } from '$modules/chi/components/viewport';-->
<!--    import Engine from './Engine.svelte';-->
<!--    import Map from './Map.svelte';-->

<!--    export let view: string | false = false;-->

<!--    function onLoad({ detail: { data, delta } }) {-->
<!--        player.load(data);-->
<!--        player.tick(delta);-->

<!--        player.on('collect', () => {-->
<!--            console.log('onPlayerCollect');-->
<!--            save.persist(player.save());-->
<!--        });-->

<!--        player.on('buy', () => {-->
<!--            save.persist(player.save());-->
<!--        });-->

<!--        player.on('sell', () => {-->
<!--            save.persist(player.save());-->
<!--        });-->

<!--        save.onWipe((data: Save) => {-->
<!--            player.load(data);-->
<!--        });-->
<!--    }-->

<!--    function onTick({ detail: { delta } }) {-->
<!--        player.tick(delta);-->
<!--        save.autosave(delta, player.save);-->
<!--    }-->
<!--</script>-->

<!--<Engine on:load={onLoad} on:tick={onTick}>-->
<!--    <div class="game grid h-screen w-max-screen o-hidden">-->
<!--        <Viewport>-->
<!--            {#if ['idle', 'loading'].includes($lifecycle)}-->
<!--                Loading...-->
<!--            {:else}-->
<!--                <Map />-->
<!--            {/if}-->
<!--        </Viewport>-->

<!--        <Sidebar active={!!view}>-->
<!--            <slot name="navigation" />-->

<!--            <svelte:fragment slot="expand">-->
<!--                {#if ['idle', 'loading'].includes($lifecycle)}-->
<!--                    Loading...-->
<!--                {:else}-->
<!--                    <slot name="view" />-->
<!--                {/if}-->
<!--            </svelte:fragment>-->
<!--        </Sidebar>-->
<!--    </div>-->
<!--</Engine>-->

<!--<style lang="postcss">-->
<!--    @media screen and (orientation: landscape) {-->
<!--        .game {-->
<!--            grid-template-columns: 1fr auto;-->
<!--        }-->
<!--    }-->

<!--    @media screen and (orientation: portrait) {-->
<!--        .game {-->
<!--            grid-template-rows: 1fr auto;-->
<!--        }-->
<!--    }-->
<!--</style>-->
