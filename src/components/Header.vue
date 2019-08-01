<template>
    <Container id="header">
        <Row>
            <Col>
                <div class="header">
                    <div class="header-action">
                        <transition name="morph">
                            <template v-if="avatar">
                                <a class="header-avatar" href="/" key="avatar">
                                    <img src="/images/avatar.png"/>
                                </a>
                            </template>

                            <template v-else-if="back">
                                <a class="header-back" :href="backUrl" @click.prevent="onBackClick" key="back" v-html="backIcon">
                                    Back
                                </a>
                            </template>

                            <template v-else>
                                <a class="header-brand" href="/" v-html="logo" key="brand"></a>
                            </template>
                        </transition>
                    </div>

                    <div class="navigation">
                        <ul class="navigation-list">
                            <li class="navigation-item">
                                <router-link to="/portfolio" title="Portfolio">
                                    Portfolio
                                </router-link>
                            </li>
                            <li class="navigation-item">
                                <router-link to="/profile" title="Profile">
                                    Profile
                                </router-link>
                            </li>
                            <li class="navigation-item">
                                <router-link to="/company" title="Company">
                                    Company
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
</template>

<script>
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import logo from '../../static/images/logo.svg';
import backIcon from '../../static/images/back.svg';
import Col from './Col';
import Container from './Container';
import Row from './Row';

@Component({
  components: { Col, Container, Row },
})
export default class Header extends Vue
{
  @Inject('page') page;

  @Prop(Boolean) avatar;
  @Prop(Boolean) back;

  logo = logo;
  backIcon = backIcon;

  get backUrl() {
    return document.referrer;
  }

  onBackClick() {
    history.back();
  }
}
</script>

<style lang="scss">
    @import "../scss/mixins";
    @import "../scss/variables";

    .header {
        align-items: center;
        justify-content: space-between;
        display: flex;
        padding: 12px;
        pointer-events: none;
    }

    .header-action {
        pointer-events: all;

        a {
            display: block;
            transform-origin: center;
        }

        img, svg {
            height: 64px;
            width: auto;
        }

        .header-back svg {
            height: 44px;
            margin: 10px;
        }
    }

    .header-action svg {
        fill: $white;
    }

    .header-avatar {
        border-radius: 50%;
        overflow: hidden;
    }

    .navigation-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .navigation-item {
        pointer-events: all;

        a {
            transition: font-weight .2s ease;
        }

        + .navigation-item {
            margin-left: 24px;

            @include screen-sm {
                margin-left: 52px;
            }
        }
    }
</style>
