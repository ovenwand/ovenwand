<template>
    <div id="app" :class="pageClasses" :style="pageStyles">
        <Header :avatar="page.avatar" :back="page.back"/>

        <router-view/>

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
  @Provide('page') page = {
    avatar: false,
    back: false,
    background: null,
    darkText:false,
    name: 'default',
    reset: () => this.resetPage(),
    title: null,
  };

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

  resetPage() {
    this.page.avatar = false;
    this.page.back = false;
    this.page.background = null;
    this.page.darkText = false;
    this.page.name = 'default';
    this.page.title = null;
  }

  setTitle(title) {
    if (this._titleElement) {
      this._titleElement.textContent = title;
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
