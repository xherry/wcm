<template>
	<view>
		<swiper :autoplay='autoplay' :interval="interval" @change="changes" :indicator-dots="true" indicator-color="#fff"
		 indicator-active-color="#7de25e">
			<swiper-item v-for="(item,i) in guide" :key='i'>
				<view class="swiper-item">
					<image :src="base_url+'/img'+item.picUrl" @tap="toWV(item.redirectUrl)" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="times===''"></view>
		<view class="myCanvas" :style="{top:_height*2+'rpx'}" @tap="jumps" v-else>
			<text class="fillText">跳过</text>
			<text class="fillText" style="display: inline-block;margin-left: 6rpx;">{{times}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoplay: true,
				guide: [],
				rings: '',
				times: '',
				interval: 2000,
				_height: '',
				timers: '', //定时器
				timer: '', //倒计时
			}
		},
		beforeCreate() {
			this._height = plus.navigator.getStatusbarHeight(); //状态栏高度 
			let api = '/sys/app/guide';
			this.http(api, "GET", {}).then(res => {
				console.log(res, '引导页')
				if (res.code == 200) {
					this.guide = res.data.guide;
					this.times = res.data.time
					let timeOut = res.data.time * 1000
					this.interval = (res.data.time / res.data.guide.length) * 1000
					this.toIndex(timeOut);
					this.seinterval()
				} else {
					this.toIndex(0);
				}
			}).catch(err => {
				this.toIndex(0);
			})
		},
		created() {},
		onLoad(e) {

		},
		onReady() {},
		methods: {
			//前往链接页面
			toWV(n) {
				if (n) {
					uni.navigateTo({
						url: './wvs?redirectUrl=' + n
					})
				}
			},
			// 倒计时
			seinterval() {
				this.timers = setInterval(() => {
					this.times -= 1
					if (this.times < 0) {
						clearInterval(this.timers);
					}
				}, 1000)
			},
			// 跳过
			jumps() {
				clearTimeout(this.timer);
				clearInterval(this.timers);
				let token = uni.getStorageSync('token');
				if (token) {
					// 判断token是否过期
					let userInfo = uni.getStorageSync('userInfo');
					console.log(userInfo)
					let expTime = userInfo.expTime;
					let nowTime = parseInt(new Date().getTime());
					console.log(nowTime)
					if (expTime <= nowTime) {
						uni.reLaunch({
							url: '/pages/login'
						})
						uni.showToast({
							title: '登录失效，请重新登陆',
							icon: 'none'
						})
					} else {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				} else {
					uni.reLaunch({
						url: './login'
					})
				}
			},
			// 获取广告图片
			getGuid() {
				let api = '/sys/app/guide';
				this.http(api, "GET", {}).then(res => {
					console.log(res, '引导页')
					if (res.code == 200) {
						this.guide = res.data.guide;
						this.times = res.data.time
						let timeOut = res.data.time * 1000
						this.interval = (res.data.time / res.data.guide.length) * 1000
						this.toIndex(timeOut);
						this.seinterval()
					} else {
						this.toIndex(0);
					}
				}).catch(err => {
					this.toIndex(0);
				})
			},
			// 下标移动
			changes(e) {
				let current = e.detail.current;
				if (current == this.guide.length - 1) {
					this.autoplay = false
				}
			},
			// 
			toIndex(time) {
				let token = uni.getStorageSync('token');
				this.timer = setTimeout(() => {
					clearTimeout(this.timer)
					if (token) {
						// 判断token是否过期
						let userInfo = uni.getStorageSync('userInfo');
						console.log(userInfo)
						let expTime = userInfo.expTime;
						let nowTime = parseInt(new Date().getTime());
						console.log(nowTime)
						if (expTime <= nowTime) {
							uni.reLaunch({
								url: '/pages/login'
							})
							uni.showToast({
								title: '登录失效，请重新登陆',
								icon: 'none'
							})
						} else {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					} else {
						uni.reLaunch({
							url: './login'
						})
					}
				}, time)
			},
		}
	}
</script>

<style scoped>
	.fillText {
		font-size: 28rpx;
		color: #333;
	}

	.myCanvas {
		width: 120rpx;
		height: 50rpx;
		position: fixed;
		right: 34rpx;
		top: 70rpx;
		/* background: #999999; */
		z-index: 999;
		border-radius: 12rpx;
		background: #F8F8F8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	swiper {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.swiper-item,
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
</style>
