// 引入vue实例
import Vue from 'vue';
// 
// 
// 封装请求函数
const http = (api, method, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url:'https://lsjyy0527.com:8231'+api, 
			// url: 'https://192.168.1.12:8231' + api,
			method: method,
			header: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization: uni.getStorageSync('token'),
			},
			data: data,
			success: res => {
				resolve(res.data)
				if (res.data.code !== 200) {
					console.log(res)
					uni.showToast({
						title: res.data.msg=='token无效'?'登录过期':res.data.msg,
						icon: 'none'
					})
					if(res.data.msg=='token无效'){
						uni.reLaunch({
							url:'/pages/login.vue'
						})
					}
				}
			},
			fail: err => {
				reject(err)
				uni.showToast({
					title: '网络异常',
					icon: 'none'
				})
			}
		})
	})
}
// 将http注册vue实例
Vue.prototype.http = http;


//处理时间
function add0(m) {
	return m < 10 ? '0' + m : m
}
const format = function(shijianchuo) {
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d)
}
Vue.prototype.$format = format;
