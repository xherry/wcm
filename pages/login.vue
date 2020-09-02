<template>
	<view class="content">
		<image class="icons" src="../static/login.png" mode=""></image>

		<view class="person-item inputWord">
			<view>账号</view>
			<input v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" placeholder-style="color:#c6c6c6;font-size:26rpx" />
			<view></view>
		</view>
		<view class="person-item inputWord">
			<view>密码</view>
			<input v-model="pwd" type="password" placeholder="请输入密码" placeholder-style="color:#c6c6c6;font-size:26rpx" />
			<view></view>
		</view>

		<button @tap='toLogin'>登录</button>

		<view class="toforget" @tap="toforget">忘记密码？</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				pwd: ''
			}
		},
		methods: {
			//前往忘记密码页面
			toforget() {
				uni.navigateTo({
					url: './forgetPwd'
				})
			},
			// 确认登录
			async toLogin() {
				let phone = this.phone;
				let pwd = this.pwd;
				try {
					if (!phone) throw '用户名不能为空';
					if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) throw '手机号格式有误';
					if (!pwd) throw "密码不能为空";
				} catch (err) {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					})
					return
				}
				let data = {
					loginName: phone,
					password: pwd,
					clientId:plus.push.getClientInfo().clientid,
				}
				let api = '/user/login'
				let result = await this.http(api, "POST", data);
				console.log(result);
				if (result.code == 200) {
					let userInfo = {
						phone: result.data.phone,
						userId: result.data.userId,
						identityType: result.data.identityType,
						expTime: result.data.token.expTime
					}
					uni.setStorageSync('userInfo', userInfo);
					uni.setStorageSync('token', result.data.token.accessToken);
					uni.reLaunch({
						url: './index/index' 
					})
					this.phone = '';
					this.pwd = '';
					uni.showToast({
						title: '登录成功',
						icon: 'none',
						duration: 1500,
						position: 'top'
					})
				}
			},
		}
	}
</script>

<style scoped>
	.toforget {
		width: 100%;
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		margin-top: 122rpx;
	}

	button {
		width: 610rpx;
		height: 78rpx;
		margin-top: 100rpx;
		line-height: 78rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #0F439B;
	}

	button:active {
		background: #0b377e;
	}

	.inputWord {
		width: 610rpx;
		margin-left: 70rpx;
		height: 82rpx;
		display: flex;
		align-items: center;
		margin-bottom: 41rpx;
	}

	.inputWord view:first-child {
		width: 20%;
		text-align: center;
		font-size: 28rpx;
	}

	.inputWord input {
		width: 80%;
		font-size: 28rpx;
	}

	.icons {
		width: 214rpx;
		height: 205rpx;
		margin-top: 100rpx;
		margin-left: 268rpx;
		margin-bottom: 150rpx;
	}
</style>
