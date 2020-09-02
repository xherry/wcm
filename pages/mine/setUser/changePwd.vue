<template>
	<view class="content">
		<view class="person-item userinfom">
			<view>
				<text>原密码</text>
				<input type="text" v-model="oldPwd" placeholder="请输入原密码" placeholder-style="color:#f8f8f8;font-size:26rpx" />
			</view>
			<view>
				<text>新密码</text>
				<input type="password" v-model="newPwd" value="" placeholder="请输入新密码" placeholder-style="color:#f8f8f8;font-size:26rpx" />
			</view>
			<view>
				<text>确认密码</text>
				<input type="password" v-model="newPwdto" placeholder="请重复确认密码" placeholder-style="color:#f8f8f8;font-size:26rpx" />
			</view>
		</view>
		<button @tap="trueChange">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd: '',
				newPwd: '',
				newPwdto: ''
			}
		},
		methods: {
			// 是否修改密码
			trueChange() {
				try {
					if (!this.oldPwd) throw '请输入旧密码';
					if (!this.newPwd) throw '请输入新密码';
					if (this.oldPwd != this.newPwdto) throw '两次密码不一致';
				} catch (err) {
					uni.showToast({
						title: err,
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '确认操作',
					content: '点击确认修改',
					success: res => {
						if (res.confirm) {
							this.changePwd();
						}
					}
				})
			},
			// 修改密码
			async changePwd() {
				let api = '/user/pass/revamp';
				let data = {
					newPass: this.newPwd,
					oldPass: this.oldPwd,
					userId: uni.getStorageSync('userInfo').userId
				}
				let res = await this.http(api, "POST", data);
				console.log(res)
				if (res.code == 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(() => {
						uni.navigateBack({})
					}, 800)
					this.newPwd = '';
					this.oldPwd = '';
					this.newPwdto = '';
				}
			},
		},
	}
</script>

<style scoped>
	button {
		width: 562rpx;
		height: 78rpx;
		color: #fff;
		background: #0F439B;
		font-size: 28rpx;
		margin-top: 328rpx;
		line-height: 78rpx;
		border-radius: 39rpx;
	}

	button:active {
		background: #0a2f6b;
	}

	.userinfom {
		padding: 0 14rpx;
		box-sizing: border-box;
	}

	.userinfom>view {
		display: flex;
		width: 100%;
		height: 92rpx;
		padding-left: 13rpx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #fff;
	}

	.userinfom>view:last-child {
		border-bottom: 0
	}

	.userinfom>view text {
		font-size: 28rpx;
	}

	.userinfom input {
		height: 100%;
		width: 75%;
		color: #fff;
		font-size: 28rpx;
	}
</style>
