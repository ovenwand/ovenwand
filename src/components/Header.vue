<template>
    <div class="header">
        <a v-if="avatar" class="header-avatar" href="/">
            <img src="/images/avatar.png"/>
        </a>
        <a v-else class="header-brand" href="/" v-html="logo"></a>

        <div class="navigation">
            <ul class="navigation-list">
                <li class="navigation-item">
                    <router-link to="portfolio" title="Portfolio">
                        Portfolio
                    </router-link>
                </li>
                <li class="navigation-item">
                    <router-link to="profile" title="Profile">
                        Profile
                    </router-link>
                </li>
                <li class="navigation-item">
                    <router-link to="company" title="Company">
                        Company
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import logo from '../../static/images/logo.svg';

@Component
export default class Header extends Vue
{
  @Prop(Boolean) avatar;

  logo = logo;
}
</script>

<style lang="scss">
    @import "../scss/variables";

    .header {
        align-items: center;
        justify-content: space-between;
        display: flex;
        padding: 12px;
    }

    .header-brand svg {
        fill: $white;
        height: 52px;
        width: auto;
    }

    .header-avatar {
        border-radius: 50%;
        overflow: hidden;

        img {
            height: 52px;
            width: auto;
        }
    }

    .navigation-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .navigation-item {
        + .navigation-item {
            margin-left: 52px;
        }
    }
</style>
