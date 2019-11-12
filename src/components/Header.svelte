<script>
    import { Navigation } from '@/components';
    import { Row, Col } from '@/core/components';
    import { morph } from '@/core/transition';
    import { logo } from '@/store/brand';
    import { action, AVATAR, BACK, BRAND } from '@/store/header';
    import backIcon from '@/../static/images/back.svg';

    export let avatar = false;
    export let back = false;
    export let segment;

    const backUrl = (typeof document !== 'undefined' && document.referrer) || 'portfolio';

    function onBackClick() {
        history.back();
    }
</script>

<style lang="sass">
    @import "Header.scss";
</style>

<Row>
    <Col>
        <header id="app-header">
            <div class="app-header-action">
                {#if $action === AVATAR}
                    <a class="app-header-avatar" href="." in:morph out:morph={{ out: true }}>
                        <img src="/images/avatar.png" alt="Sibbe Heijne"/>
                    </a>
                {:else if $action === BACK}
                    <a class="app-header-back" rel="noreferrer" href={backUrl} on:click|preventDefault={onBackClick} in:morph out:morph={{ out: true }}>
                        {@html backIcon}
                    </a>
                {:else if $action === BRAND}
                    <a class="app-header-brand" href="." in:morph out:morph={{ out: true }}>
                        {@html $logo}
                    </a>
                {/if}
            </div>

            <div class="app-header-navigation">
                <Navigation {segment}/>
            </div>
        </header>
    </Col>
</Row>
