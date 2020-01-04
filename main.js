import Vue from 'vue'
import App from './App'
import store from './store/vuex.js'
import cuCustom from './components/cu-custom/cu-custom.vue'

Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

//在手机app里用vuex
Vue.prototype.$store = store

const app = new Vue({
	store,
    ...App
})
app.$mount()
