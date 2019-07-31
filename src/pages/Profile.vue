<template>
    <div class="profile clearfix" :class="pageClasses" :style="pageStyles">
        <Container id="header">
            <Row>
                <Col>
                    <Header avatar/>
                </Col>
            </Row>
        </Container>

        <Container id="content">
            <Row id="greeting">
                <Col>
                    <div class="heading-3">
                        <span>&mdash;</span> <span>Hi, my name is Sibbe Heijne</span>
                    </div>
                </Col>
            </Row>

            <Row id="intro">
                <Col sm="7">
                    <span class="heading-1">
                        I'm a Frontend Developer located in Amsterdam specializing in web and mobile design and development, a dumbass and such...
                    </span>
                </Col>
                <Col sm="2"></Col>
                <Col sm="3">
                    <a href="mailto:info@ovenwand.com" title="info@ovenwand.com">
                        Contact me
                    </a>
                    <a href="https://www.linkedin.com/in/sibbe-heijne/" title="LinkedIn">
                        LinkedIn
                    </a>
                    <a href="https://github.com/sheijne" title="Github">
                        Github
                    </a>
                    <a href="" title="Instagram">
                        Instagram
                    </a>
                </Col>
            </Row>

            <Row id="commercial-experience">
                <Col sm="2">
                    <b>
                        <span>&mdash;</span>
                        <span>Commercial work</span>
                    </b>
                </Col>

                <Col sm="4">
                    <b>Project Name, Client Name</b>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in iaculis sapien, imperdiet viverra leo. Proin arcu mi, vulputate tristique sodales at, convallis a nisl. Praesent eleifend sem orci, sed faucibus nulla semper eu. Phasellus magna tellus, iaculis vitae urna ac, consequat gravida tellus.</span>
                </Col>
            </Row>

            <Row>
                <Col sm="2"></Col>
                <Col sm="4">
                    <b>Project Name, Client Name</b>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in iaculis sapien, imperdiet viverra leo. Proin arcu mi, vulputate tristique sodales at, convallis a nisl. Praesent eleifend sem orci, sed faucibus nulla semper eu. Phasellus magna tellus, iaculis vitae urna ac, consequat gravida tellus.</span>
                </Col>
            </Row>

            <Row id="non-commercial-experience">
                <Col sm="2">
                    <b>
                        <span>&mdash;</span>
                        <span>Non-Commercial work</span>
                    </b>
                </Col>

                <Col sm="4">
                    <b>Project Name, Client Name</b>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in iaculis sapien, imperdiet viverra leo. Proin arcu mi, vulputate tristique sodales at, convallis a nisl. Praesent eleifend sem orci, sed faucibus nulla semper eu. Phasellus magna tellus, iaculis vitae urna ac, consequat gravida tellus.</span>
                </Col>
            </Row>

            <Row>
                <Col sm="2"></Col>
                <Col sm="4">
                    <b>Project Name, Client Name</b>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in iaculis sapien, imperdiet viverra leo. Proin arcu mi, vulputate tristique sodales at, convallis a nisl. Praesent eleifend sem orci, sed faucibus nulla semper eu. Phasellus magna tellus, iaculis vitae urna ac, consequat gravida tellus.</span>
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
export default class Profile extends Mixins(Page)
{
  title = 'Profile';
  background = '/images/background.png';
}
</script>

<style lang="scss">
    .page-profile {
        #content {
            margin-bottom: 120px;
            margin-top: 140px;

            > .row#intro {
                margin-bottom: 120px;
            }
            > .row:not(:last-child) {
                margin-bottom: 52px;
            }
        }
    }
</style>
