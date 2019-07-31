import 'core-js/stable';

import './plugins';

import VueRouter from 'vue-router';
import routes from './routes';
const router = new VueRouter({
  mode: 'history',
  routes,
});

import App from './App';
export default new App({
  el: '#root',
  router,
});
