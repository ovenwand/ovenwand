import { Component, Inject, Vue } from 'vue-property-decorator';
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
  static DEFAULT_CONFIG = {
    avatar: false,
    back: false,
    background: null,
    darkText:false,
    title: null,
  };

  @Inject('page') page;

  created() {
    if (this.$options.page) {
      this.$options.page.name = this.$options.page.name || this.$options.name;
      Object.assign(this.page, Page.DEFAULT_CONFIG, this.$options.page);
    }
  }
}
