<template>
    <Container id="content" class="company clearfix">
        <Row id="intro" padding-xs>
            <Col sm="6" padding-xs>
                <span class="heading-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
            </Col>
            <Col sm="3" padding-xs></Col>
            <Col sm="3" class="aside" padding-xs>
                <section>
                    <b><span>Development</span> <span>&mdash;</span></b><br/>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                </section>
                <section>
                    <b><span>Design</span> <span>&mdash;</span></b><br/>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                </section>
                <section>
                    <b><span>Consultancy</span> <span>&mdash;</span></b><br/>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                </section>
            </Col>
        </Row>
        <Row id="contact" padding-xs>
            <Col sm="6" padding-xs>
                <Address/>
                <br/>
                <div>
                    <a href="mailto:info@ovenwand.com">info@ovenwand.com</a><br/>
                    <br/>
                    KvK: 75344890<br/>
                    BTW: NL219654797B01<br/>
                    <br/>
                    <a href="https://www.linkedin.com/in/sibbe-heijne/" title="LinkedIn">
                        LinkedIn
                    </a><br/>
                    <a href="https://github.com/sheijne" title="Github">
                        Github
                    </a>
                </div>
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import Address from '../components/Address';
import Page from '../mixins/Page';

@Component({
  components: { Address },
  page: {
    title: 'Company',
    background: '/images/background.png',
  },
})
export default class Company extends Mixins(Page)
{
}
</script>

<style lang="scss">
    @import "../scss/mixins";

    .page-company {
        #content {
            margin-bottom: 80px;
            margin-top: 92px;

            @include screen-sm-and-up {
                margin-bottom: 120px;
                margin-top: 140px;
            }

            > .row#intro {
                @include screen-sm-and-up {
                    margin-bottom: 120px;
                }
            }

            > .row:not(:last-child) {
                @include screen-xs {
                    margin-bottom: 64px;
                }
            }

            .aside {
                margin-top: 80px;
                margin-bottom: 28px;
                text-align: right;

                section:not(:last-child) {
                    margin-bottom: 52px;
                }

                @include screen-md-and-up {
                    margin-top: 0;
                }
            }
        }
    }
</style>
