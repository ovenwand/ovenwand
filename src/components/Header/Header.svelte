<script>
    import { Navigation } from '@/components';
    import { Row, Col } from '@/core/components';
    import { morph } from '@/core/transition';
    import { logo } from '@/store/brand';
    import { brand, AVATAR, BRAND } from '@/store/header';
    import backIcon from '@/../static/images/icons/chevron-left.svg';
    import menuIcon from '@/../static/images/icons/menu.svg';

    export let segment;

    let isNavigationActive = false;

    const backUrl = (typeof document !== 'undefined' && document.referrer) || 'portfolio';

    function onBackClick() {
        history.back();
    }

    function onNavigationClick() {
        isNavigationActive = !isNavigationActive;
    }
</script>

<style lang="scss">
    @import "Header";
</style>

<Row>
    <Col>
        <header id="app-header">
            <div class="app-header-brand">
                {#if $brand === AVATAR}
                    <a class="app-header-avatar" href=".." in:morph out:morph={{ out: true }}>
                        <img src="/images/avatar.png" alt="Sibbe Heijne"/>
                    </a>
                {:else if $brand === BRAND}
                    <a class="app-header-brand" href=".." in:morph out:morph={{ out: true }}>
                        {@html $logo}
                    </a>
                {/if}
            </div>

            <div class="app-header-navigation">
                <a
                    class="app-header-action"
                    rel="noreferrer"
                    href={backUrl}
                    on:click|preventDefault={onBackClick}
                    in:morph
                    out:morph={{ out: true }}
                >
                    {@html backIcon}
                </a>

                <button class="app-header-action" type="button" on:click={onNavigationClick}>
                    {@html menuIcon}
                </button>

                {#if isNavigationActive}
                    <Navigation {segment}/>
                {/if}
            </div>
        </header>
    </Col>
</Row>
