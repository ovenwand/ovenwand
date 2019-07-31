<template>
    <div class="company clearfix" :class="pageClasses" :style="pageStyles">
        <Container id="header">
            <Row>
                <Col>
                    <Header/>
                </Col>
            </Row>
        </Container>

        <Container id="content">
            <Row id="intro">
                <Col sm="6">
                    <span class="heading-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                </Col>
                <Col sm="2"></Col>
                <Col sm="4" class="aside">
                    <section>
                        <b><span>&mdash;</span> <span>Development</span></b><br/>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                    </section>
                    <section>
                        <b><span>&mdash;</span> <span>Design</span></b><br/>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                    </section>
                    <section>
                        <b><span>&mdash;</span> <span>Consultancy</span></b><br/>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non velit nec velit mattis dictum vitae ut tellus. Maecenas dignissim sed lectus vitae auctor. Morbi laoreet posuere erat, nec finibus dolor tincidunt eget.</span>
                    </section>
                </Col>
            </Row>
            <Row id="contact">
                <Col sm="6">
                    <Address/>
                    <br/>
                    Phone: <a href="tel:+31624217363">+31624217363</a>
                    Email: <a href="mailto:info@ovenwand.com">info@ovenwand.com</a>
                    <br/>
                    <a href="https://www.linkedin.com/in/sibbe-heijne/" title="LinkedIn">
                        LinkedIn
                    </a>
                    <a href="https://github.com/sheijne" title="Github">
                        Github
                    </a>
                </Col>
            </Row>
        </Container>

        <Footer/>
    </div>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import Address from '../components/Address';
import Page from '../mixins/Page';

@Component({
  components: { Address },
})
export default class Company extends Mixins(Page)
{
  title = 'Company';
  background = '/images/background.png';
}
</script>

<style lang="scss">
    .page-company {
        #content {
            margin-bottom: 120px;
            margin-top: 140px;

            > .row#intro {
                margin-bottom: 120px;
            }

            .aside {
                text-align: right;

                section:not(:last-child) {
                    margin-bottom: 52px;
                }
            }
        }
    }
</style>
