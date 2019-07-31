<template>
    <div class="portfolio" :class="pageClasses" :style="pageStyles">
        <Container id="header">
            <Row>
                <Col>
                    <Header/>
                </Col>
            </Row>
        </Container>

        <Container id="content" fluid>
            <Row fill>
                <Col sm="6">
                    <Teaser
                        color="#29ABE2"
                        logo="/images/portfolio/TalentChannel_Logo.png"
                        image="/images/portfolio/TalentChannel_Frontstage.png"
                        size="250x281"
                    />
                </Col>
                <Col sm="6">
                    <Teaser
                        color="#C7B299"
                        logo="/images/portfolio/MediaLab_Logo.png"
                        image="/images/portfolio/MediaLab_Website.png"
                    />
                </Col>
            </Row>
        </Container>

        <Footer id="footer"/>
    </div>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator';
import Teaser from '../components/Teaser';
import Page from '../mixins/Page';

@Component({
  components: { Teaser },
})
export default class Portfolio extends Mixins(Page)
{
  title = 'Portfolio';
}
</script>

<style lang="scss">
    .page-portfolio {
        #header {
            position: relative;
        }

        #header, #footer {
            z-index: 1
        }

        #content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            z-index: 0;

            > .row > .col {
                overflow: hidden;
            }
        }
    }
</style>
