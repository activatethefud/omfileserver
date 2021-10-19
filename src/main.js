import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMeta from 'vue-meta'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMeta);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  metaInfo: {
    title: "OMFileServer"
  }
}).$mount('#app')
