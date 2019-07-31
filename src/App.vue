<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue
{
}
</script>

<style lang="scss">
    @import "scss/variables.scss";

    /**
     * Variables
     */
    :root {
        --black: #{$black};
        --white: #{$white};
    }

    /**
     * Reset
     */
    html, body {
        margin: 0;
        padding: 0;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    /**
     * Typography
     */
    /* latin-ext */
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Lato Regular'), local('Lato-Regular'), url(/fonts/Lato/Lato-Regular.ttf) format('truetype');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Lato Regular'), local('Lato-Regular'), url(/fonts/Lato/Lato-Regular.ttf) format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* cyrillic-ext */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('truetype');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
    /* greek-ext */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('woff2');
        unicode-range: U+1F00-1FFF;
    }
    /* greek */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('woff2');
        unicode-range: U+0370-03FF;
    }
    /* vietnamese */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
    }
    /* latin-ext */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(/fonts/Open_Sans/OpenSans_Regular.ttf) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    html {
        font-family: $default-font;
        font-size: $root-font-size;
    }

    body {
        font-size: $font-size;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: $header-font;
    }

    .heading-1 {
        font-size: 5rem;
    }

    .heading-2 {
        font-size: 3.5rem;
    }

    .heading-3 {
        font-size: 2rem;
    }

    /**
     * Layout
     */
    #app {
        position: relative;
    }
    .page {
        min-height: 100vh;
        padding-bottom: 48px;
    }

    /**
     * Theme
     */
    html {
        background-color: $white;
        // color: $black;
        color: $white;
    }

    a {
        // color: $black;
        color: $white;
        text-decoration: none;
    }
    a.router-link-active {
        font-weight: bold;
    }

    /**
     * Util
     */
    .clearfix:after {
        clear: both;
        content: '';
        display: table-cell;
    }
    .primary {
        color: $primary;
    }
</style>
