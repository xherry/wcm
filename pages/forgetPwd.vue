<template>
	<view class="content">
		<view class="person-item forgets">
			<view class="inputWord">
				<view>手机号</view>
				<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号码" placeholder-style="color:#c6c6c6;font-size:26rpx" />
			</view>
			<view class="inputWord">
				<view>验证码</view>
				<input type="number" maxlength="6" v-model="code" placeholder="请输入验证码" placeholder-style="color:#c6c6c6;font-size:26rpx" />
				<view style="color: yellow;" v-if="isCode">{{count}}s后重新获取</view>
				<view v-else @tap="getCode">获取验证码</view>
			</view>
			<view class="inputWord">
				<view>密码</view>
				<input type="password" v-model="newPwd" placeholder="请输入新密码" placeholder-style="color:#c6c6c6;font-size:26rpx" />
			</view>
			<view class="inputWord">
				<view>确认密码</view>
				<input type="password" v-model="twoNewPwd" placeholder="请重复输入密码" placeholder-style="color:#c6c6c6;font-size:26rpx" />
			</view>
		</view>
		<button @tap='submit'>确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCode: false,
				phone: '', //手机号
				code: '', //验证码
				newPwd: '', //新密码
				twoNewPwd: '', //重复新密码
				count: 60, //默认倒计时
				t: '', //定时器
			}
		},
		methods: {
			submit() {
				let phone = this.phone;
				let code = this.code;
				let newPwd = this.newPwd;
				let twoNewPwd = this.twoNewPwd;
				try {
					if (!phone) throw '手机号不能为空';
					if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) throw "手机号格式有误";
					if (!code) throw '请输入验证码';
					if (!newPwd) throw '请输入新密码';
					if (newPwd != twoNewPwd) throw '两次密码输入不一致';
				} catch (err) {
					uni.showToast({
						title: err,
						icon: 'none'
					});
					return
				}

				let api = '/user/forget';
				let data = {
					code,
					password: newPwd,
					phone
				}
				uni.showModal({
					title: '确认操作',
					content: '点击确认修改密码',
					success: res => {
						if (res.confirm) {
							this.http(api, "POST", data).then(res => {
								console.log(res, '修改密码')
								if (res.code == 200) {
									uni.showToast({
										title: '修改成功',
										icon: 'none',
										duration: 2000
									})
									setTimeout(()=>{
										uni.navigateBack()
									},800)
								}
							})
						}
					}
				})
			},
			// 倒计时
			timeout() {
				this.t = setInterval(() => {
					this.count -= 1
					if (this.count <= 0) {
						clearInterval(this.t);
						this.count = 60;
						this.isCode = false;
					}
				}, 1000)
			},
			// 获取验证码
			async getCode() {
				if (!this.phone) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: '手机号格式有误',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.isCode = true;
				this.timeout();
				let api = '/sms/code';
				let data = {
					phone: this.phone
				}
				let result = await this.http(api, "POST", data);
				console.log(result)
				if (result == 200) {
					uni.showToast({
						title: '发送成功',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style scoped>
	button {
		width: 562rpx;
		height: 78rpx;
		margin-top: 325rpx;
		line-height: 78rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #0F439B;
		border-radius: 39rpx;
	}

	button:active {
		background: #0b377e;
	}

	.forgets {
		padding: 0 14rpx;
		box-sizing: border-box;
	}

	.inputWord {
		display: flex;
		align-items: center;
		height: 92rpx;
		border-bottom: 1rpx solid #fff;
		width: 100%;
		padding-left: 13rpx;
		box-sizing: border-box;
	}

	.inputWord:last-child {
		border-bottom: 0;
	}

	.inputWord view:first-child {
		font-size: 28rpx;
		width: 25%;
	}

	.inputWord input {
		width: 75%;
		font-size: 28rpx;
	}

	.forgets .inputWord:nth-child(2) input {
		width: 45%;
	}

	.forgets .inputWord:nth-child(2) view:last-child {
		width: 30%;
		font-size: 28rpx;
	}
</style>
