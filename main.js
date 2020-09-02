import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入请求方法
import http from './utils/http.js';
// Vue.prototype.base_url = 'https://192.168.1.12:8231';
Vue.prototype.base_url = 'https://lsjyy0527.com:8231';


// let main = plus.android.runtimeMainActivity();
// //为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
// plus.runtime.quit = function() {
// 	main.moveTaskToBack(false);
// };
// //重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
// plus.nativeUI.toast = (function(str) {
//     if (str =='再次返回退出应用') {
//         plus.runtime.quit();
//     } else {
//         uni.showToast({
//             title: '再次返回退出应用',
//             icon: 'none'
//         })
//     }
// });



App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
