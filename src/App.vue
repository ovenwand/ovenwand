<template>
    <div id="app" :class="pageClasses" :style="pageStyles">
        <Header :avatar="page.avatar" :back="page.back"/>

        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>

        <Footer/>
    </div>
</template>

<script>
import { Component, Provide, Vue, Watch } from 'vue-property-decorator';
import Col from './components/Col';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import Row from './components/Row';
import Page from './mixins/Page';

@Component({
  components: {
    Col,
    Container,
    Footer,
    Header,
    Row,
  },
})
export default class App extends Vue
{
  @Provide('page') page = { name: 'default', ...Page.DEFAULT_CONFIG };

  _titleElement = null;

  get pageClasses() {
    return {
      'page': true,
      [`page-${this.page.name.toLowerCase()}`]: true,
      'page-background': !!this.page.background,
      'page-dark-text': !!this.page.darkText,
    };
  }

  get pageStyles() {
    const pageStyles = {};

    if (this.page.background) {
      pageStyles.backgroundImage = `url(${this.page.background})`;
    }

    return pageStyles;
  }

  @Watch('page.title', { immediate: true })
  onPageTitleChange(title) {
    this.setTitle(title);
  }

  beforeCreate() {
    this._titleElement = document.head.querySelector('title');
  }

  setTitle(title) {
    if (this._titleElement && title) {
      this._titleElement.textContent = 'Ovenwand - ' + title;
    }
  }
}
</script>

<style lang="scss" src="./scss/index.scss"></style>

<style lang="scss">
    @import "scss/variables.scss";

    :root {
        --black: #{$black};
        --white: #{$white};
    }

    #app {
        position: relative;
    }
    .page {
        min-height: 100vh;
        padding-bottom: 48px;

        #header {
            pointer-events: none;
        }
    }
</style>
