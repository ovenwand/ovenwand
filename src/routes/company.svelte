<script>
    import { Address, UnderConstruction } from '@/components';
    import { Col, Container, Page, Row } from '@/core/components';
    import { action, fluid, BRAND } from '@/store/header';

    fluid.set(false);
    action.set(BRAND);
</script>

<style lang="scss">
    @import "../core/components/layout/mixins.scss";

    :global(.page-company) {
        :global(.aside) {
            @include screen-xs {
                margin-top: 6.4rem;
            }
        }

        :global(.aside section:not(:last-child)) {
            margin-bottom: 5.2rem;
        }
    }
</style>

<Page title="Company" background="/images/background.png" lightText>
    <Row relative paddingXs>
        <Col sm={6} paddingXs>
            <span class="display-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
        </Col>

        <Col sm={3} paddingXs/>

        <Col class="aside" sm={3} paddingXs>
            <section id="development" class="text-align-right">
                <b><span>Development</span> <span>&mdash;</span></b>
                <br/>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
            </section>

            <section id="design" class="text-align-right">
                <b><span>Design</span> <span>&mdash;</span></b>
                <br/>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
            </section>

            <section id="consultancy" class="text-align-right">
                <b><span>Consultancy</span> <span>&mdash;</span></b>
                <br/>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
            </section>
        </Col>

        <UnderConstruction/>
    </Row>

    <Row paddingXs>
        <Col sm={6} paddingXs>
            <Address/>
            ETC
        </Col>
    </Row>
</Page>
