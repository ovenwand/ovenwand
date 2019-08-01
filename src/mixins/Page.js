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
  @Inject('page') page;

  created() {
    this.page.reset();

    this.page.name = this.$options.name;

    if (this.$options.page) {
      Object.assign(this.page, this.$options.page);
    }
  }
}
