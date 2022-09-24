import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import '../public/assets/fonts/source sans pro/sourcesanspro.css'

Vue.config.productionTip = false
new Vue({
  router: router,
  store: store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
//# sourceMappingURL=main.js.map
