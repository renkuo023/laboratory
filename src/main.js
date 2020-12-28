// import Vuetify from 'vuetify'
import Vue from 'vue'
import App from './App'
// import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false
App.mpType = 'app'
// Vue.use(Vuetify)
const app = new Vue(App)
app.$mount()
