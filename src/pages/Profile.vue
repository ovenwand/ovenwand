<template>
    <Container id="content" class="profile clearfix">
        <Row id="greeting" padding-xs>
            <Col padding-xs>
                <div class="heading-3">
                    <span>&mdash;</span> <span>Hi, my name is Sibbe Heijne</span>
                </div>
            </Col>
        </Row>

        <Row id="intro" padding-xs>
            <Col md="7" padding-xs>
                <span class="heading-1">
                    I'm a Frontend Engineer located in Amsterdam specializing in web and mobile design and development, a dumbass and such...
                </span>
            </Col>
            <Col md="2" padding-xs></Col>
            <Col class="aside" md="3" padding-xs>
                <a href="mailto:info@ovenwand.com" title="info@ovenwand.com">
                    Contact me
                </a>
                <a href="https://www.linkedin.com/in/sibbe-heijne/" title="Go to LinkedIn" target="_blank">
                    LinkedIn
                </a>
                <a href="https://github.com/sheijne" title="Go to Github" target="_blank">
                    Github
                </a>
            </Col>
        </Row>

        <Row id="commercial-experience" padding-xs>
            <Col class="experience-title" sm="4" lg="2" padding-xs>
                <b><span>&mdash;</span> <span>Commercial work</span></b>
            </Col>

            <Col sm="8" lg="5" padding-xs>
                <b><a href="https://www.talentchannel.tv" target="_blank">TalentChannel</a>, TalentChannel B.V.</b>
                <p><a href="https://www.talentchannel.tv" target="_blank">TalentChannel</a> was sprung to life to make the media world accessible to anyone who is producing quality audiovisual entertainment. The platform provides content creators with tools that help them with their productions, from Q&A's to a job market. Viewers are able to look at a live stream and see their favourites on demand.</p>
                <p><a href="https://www.talentchannel.tv" target="_blank">TalentChannel</a> was custom built and reuses parts of the original project which was discontinued.</p>
            </Col>
        </Row>

        <Row id="non-commercial-experience" padding-xs>
            <Col class="experience-title" sm="4" lg="2" padding-xs>
                <b><span>&mdash;</span> <span>Non-Commercial work</span></b>
            </Col>

            <Col sm="8" lg="5" padding-xs>
                <b><a href="https://github.com/ovenwand/truncate.js" target="_blank">truncate.js</a>, Ovenwand</b>
                <p><a href="https://github.com/ovenwand/truncate.js" target="_blank">truncate.js</a> is a simple text truncation library, ported from the widely used <a href="https://dotdotdot.frebsite.nl">jquery.dotdotdot</a>. Quick and dirty, but it works.</p>
            </Col>
        </Row>

        <Row id="private-experience" padding-xs>
            <Col class="experience-title" sm="4" lg="2" padding-xs>
                <b><span>&mdash;</span> <span>Private work</span></b>
            </Col>

            <Col sm="8" lg="5" padding-xs>
                <b>Frontend Web Engineer, <a href="https://medialab.co" target="_blank">MediaLab Online</a> <span class="dim">Mar 2018 - Present</span></b>
            </Col>
        </Row>

        <Row padding-xs>
            <Col sm="4" lg="2" padding-xs></Col>

            <Col sm="8" lg="5" padding-xs>
                <b>Frontend Web Engineer, XS2 Connected Media <span class="dim">Jan 2017 - Apr 2018</span></b>
            </Col>
        </Row>

        <Row padding-xs>
            <Col sm="4" lg="2" padding-xs></Col>

            <Col sm="8" lg="5" padding-xs>
                <b>Lead Web Engineer, <a href="https://itsavirus.com" target="_blank">Itsavirus</a> <span class="dim">Jul 2015 - Dec 2016</span></b>
            </Col>
        </Row>

        <Row padding-xs>
            <Col sm="4" lg="2" padding-xs></Col>

            <Col sm="8" lg="5" padding-xs>
                <b>Web Engineer, <a href="https://itsavirus.com" target="_blank">Itsavirus</a> <span class="dim">Mar 2015 - Jun 2015</span></b>
            </Col>
        </Row>

        <Row padding-xs>
            <Col sm="4" lg="2" padding-xs></Col>

            <Col sm="8" lg="5" padding-xs>
                <b>Web Developer (intern), <a href="https://itsavirus.com" target="_blank">Itsavirus</a> <span class="dim">Sep 2014 - Feb 2015</span></b>
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Component, Inject, Mixins } from 'vue-property-decorator';
import Address from '../components/Address';
import Page from '../mixins/Page';

@Component({
  components: { Address },
  page: {
    title: 'Profile',
    background: '/images/background.png',
    avatar: true,
  },
})
export default class Profile extends Mixins(Page)
{
}
</script>

<style lang="scss">
    @import "../scss/mixins";

    .page-profile {
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
                margin-bottom: 64px;
            }

            .aside {
                margin-top: 52px;

                @include screen-md-and-up {
                    margin-top: 0;
                }
            }

            .experience-title {
                @include screen-xs {
                    font-size: 18px;
                    margin-bottom: 16px;
                }
            }
        }
    }
</style>
