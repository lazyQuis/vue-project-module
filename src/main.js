import Vue from 'vue';

import 'normalize.css/normalize.css';// A modern alternative to CSS resets

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';

import i18n from './lang'; // Internationalization
import './icons'; // icon
import './errorLog';// error log
import './permission'; // permission control
import './mock'; // simulation data

import * as filters from './filters'; // global filters

// custom ubiix
import config from './config';
import mixins from './mixins';
import module from './modules';

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype.$cfg = {
  name: config.name,
};

module.init(config, Vue, (data) => {
  if (data.type !== 'ready') {
    return;
  }
  const vueIns = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    mixins,
    render: h => h(App),
  });
  window._vue = vueIns;
});
