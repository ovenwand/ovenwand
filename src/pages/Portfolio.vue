<template>
    <Container id="content" class="portfolio clearfix" fluid>
        <Row fill>
            <Col sm="6">
                <Teaser
                    link="/portfolio/talentchannel"
                    color="#29ABE2"
                    logo="/images/portfolio/TalentChannel_Logo.png"
                    image="/images/portfolio/TalentChannel_Frontstage.png"
                    size="250x281"
                />
            </Col>
            <Col sm="6">
                <Teaser
                    link="/portfolio/medialab"
                    color="#C7B299"
                    logo="/images/portfolio/MediaLab_Logo.png"
                    image="/images/portfolio/MediaLab_Website.png"
                />
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Component, Inject, Mixins } from 'vue-property-decorator';
import Teaser from '../components/Teaser';
import Page from '../mixins/Page';

@Component({
  components: { Teaser },
  page: {
    name: 'portfolio',
    title: 'Portfolio',
  },
})
export default class Portfolio extends Mixins(Page)
{
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
