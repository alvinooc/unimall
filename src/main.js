import Vue from 'vue'
import App from './App'

import * as http from './service/api'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$http = http

const msg = (title, duration=1500, mask=false, icon='none') => {
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.prototype.$toast = msg

const app = new Vue({
  ...App,
  store
})
app.$mount()
