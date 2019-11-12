<script>
    import { Col, Page, Row } from '@/core/components';
    import { action, fluid, AVATAR } from '@/store/header';

    fluid.set(false);
    action.set(AVATAR);
</script>

<style lang="sass">
    @import "../core/components/layout/mixins.scss";

    section {
        margin-bottom: 6.4rem;
    }

    :global(.page-profile) {
        :global(.aside) {
            @include screen-xs {
                margin-top: 6.4rem;
            }
        }
    }
</style>

<Page title="Profile" background="/images/background.png" lightText>
    <Row paddingXs>
        <Col paddingXs>
            <section>
                <span class="display-3">
                    <span>&mdash;</span> <span>Hi, my name is Sibbe Heijne</span>
                </span>
            </section>
        </Col>
        <Col md={7} paddingXs>
            <span class="display-1">
                  I'm a Frontend Engineer located in Amsterdam specializing in web and mobile design and development...
            </span>
        </Col>

        <Col md={2} paddingXs/>

        <Col class="aside" md={3} paddingXs>
            <a href="mailto:info@ovenwand.com" title="info@ovenwand.com">
                Contact me
            </a>
            <a rel="noreferrer" href="https://www.linked.com/in/sibbe-heijne/" title="Go to LinkedIn" target="_blank">
                LinkedIn
            </a>
            <a rel="noreferrer" href="https://github.com/ovenwand" title="Go to Github" target="_blank">
                Github
            </a>
        </Col>
    </Row>

    <Row paddingXs>
        <Col sm={4} lg={2} paddingXs>
            <b><span>&mdash;</span> <span>Commercial work</span></b>
        </Col>

        <Col sm={8} lg={5} paddingXs>
            <section>
                <b><a rel="noreferrer" href="https://www.talentchannel.tv" target="_blank">TalentChannel</a>, TalentChannel B.V.</b>
                <p><a rel="noreferrer" href="https://www.talentchannel.tv" target="_blank">TalentChannel</a> was sprung to life to make the media world accessible to anyone who is producing quality audiovisual entertainment. The platform provides content creators with tools that help them with their productions, from Q&A's to a job market. Viewers are able to look at a live stream and see their favourites on demand.</p>
                <p><a rel="noreferrer" href="https://www.talentchannel.tv" target="_blank">TalentChannel</a> was custom built and reuses parts of the original project which was discontinued.</p>
            </section>
        </Col>

        <Col sm={0} lg={5} paddingXs/>

        <Col sm={4} lg={2} paddingXs>
            <b><span>&mdash;</span> <span>Private work</span></b>
        </Col>

        <Col sm={8} lg={5} paddingXs>
            <section>
                <b>Frontend Web Engineer, <a rel="noreferrer" href="https://medialab.co" target="_blank">MediaLab Online</a> <span class="text-dim">Mar 2018 - Present</span></b>
            </section>
            <section>
                <b>Frontend Web Engineer, XS2 Connected Media <span class="text-dim">Jan 2017 - Apr 2018</span></b>
            </section>
            <section>
                <b>Lead Web Engineer, <a rel="noreferrer" href="https://itsavirus.com" target="_blank">Itsavirus</a> <span class="text-dim">Jul 2015 - Dec 2016</span></b>
            </section>
            <section>
                <b>Web Engineer, <a rel="noreferrer" href="https://itsavirus.com" target="_blank">Itsavirus</a> <span class="text-dim">Mar 2015 - Jun 2015</span></b>
            </section>
            <section>
                <b>Web Developer (intern), <a rel="noreferrer" href="https://itsavirus.com" target="_blank">Itsavirus</a> <span class="text-dim">Sep 2014 - Feb 2015</span></b>
            </section>
        </Col>
    </Row>
</Page>
