import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import './plugins/vee-validate'
import DatetimePicker from 'vuetify-datetime-picker'

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(DatetimePicker)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
