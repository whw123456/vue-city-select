import Vue from 'vue'
import App from './App.vue'
import CitySelect from './lib/index'
Vue.use(CitySelect)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
