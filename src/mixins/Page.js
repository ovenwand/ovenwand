import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Row from '../components/Row';
import Col from '../components/Col';

@Component({
  components: {
    Header,
    Footer,
    Container,
    Row,
    Col,
  },
})
export default class Page extends Vue
{
  title = null;
  background = null;
  _titleElement = null;

  get pageClasses() {
    const pageClasses = ['page'];

    if (this.title) {
      pageClasses.push(`page-${this.title.toLowerCase()}`);
    }

    return pageClasses;
  }

  get pageStyles() {
    const pageStyles = {};

    if (this.background) {
      pageStyles.backgroundImage = `url(${this.background})`;
      pageStyles.backgroundPosition = 'center';
      pageStyles.backgroundSize = 'cover';
      pageStyles.backgroundRepeat = 'no-repeat';
    }

    return pageStyles;
  }

  @Watch('title', { immediate: true })
  onTitleChange(title) {
    this.setTitle(title);
  }

    beforeCreate() {
    this._titleElement = document.head.querySelector('title');
  }

  setTitle(title) {
    if (this._titleElement) {
      this._titleElement.textContent = title;
    }
  }
}
