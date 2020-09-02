<script>
	export default {
		onLaunch: function() {
			plus.push.addEventListener('click', (message) => {
				// uni.showModal({
				// 	title:message.title,
				// 	content:message.content,
				// 	showCancel:false
				// }) 
			});
			plus.push.addEventListener('receive', (message) => {
				let token = uni.getStorageSync('token');
				if (token) {
					let payload = JSON.parse(message.payload);
					if (payload) {
						uni.showModal({
							title: message.title,
							content: message.content,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									if (payload.type == '1') {
										let infos = {
											illegalMsg: payload.content,
											times: payload.title
										}
										uni.navigateTo({
											url: '/pages/violate/violateInfo?id=' + payload.id
										})
									}
									if (payload.type == '0') {
										uni.navigateTo({
											url: '/pages/certify/certifyInfo?id=' + payload.id 
										})
									}
								}
							}
						})
					}
				}
			});


			
		},

		onShow: function() {
			console.log('App Show')

		},

		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view,
	text {
		color: #fff;
		font-family: Willcall !important;
	}
	page{backgroud:'#000'}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.person-item {
		width: 710rpx;
		/* height: 152rpx; */
		margin-top: 28rpx;
		margin-left: 20rpx;
		position: relative;
		border-left: 1rpx solid #00A0E9;
		border-right: 1rpx solid #00A0E9;
		border-top: 1rpx solid #0c1c58;
		border-bottom: 1rpx solid #0c1c58;
	}

	.person-item::after {
		content: '';
		width: 12rpx;
		height: 12rpx;
		background: url(static/mine/001.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: -3rpx;
		left: -3rpx;
	}

	.person-item>view:last-child::after {
		content: '';
		width: 12rpx;
		height: 12rpx;
		background: url(static/mine/003.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		bottom: -3rpx;
		left: -3rpx;
	}

	.person-item::before {
		content: '';
		width: 12rpx;
		height: 12rpx;
		background: url(static/mine/002.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: -3rpx;
		right: -3rpx;
	}

	.person-item>view:last-child::before {
		content: '';
		width: 12rpx;
		height: 12rpx;
		background: url(static/mine/004.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		bottom: -3rpx;
		right: -3rpx;
	}

	.content {
		width: 100vw;
		min-height: 100vh;
		background-color: #071032;
		overflow: scroll;
	}

	.contrain {
		width: 100vw;
		min-height: 100vh;
		background: #071032;
		padding: 19rpx 0 49rpx;
		box-sizing: border-box;
	}

	.serched {
		width: 690rpx;
		height: 68rpx;
		position: relative;
		margin: 24rpx 30rpx 0;
	}

	.serched input {
		width: 100%;
		height: 100%;
		border-radius: 34rpx;
		background-color: #022d59;
		padding-left: 40rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #fff;
	}

	/* .serched>image{
		width: 26rpx;
		height: 26rpx;
		position: absolute;
		left: 272rpx;
		top: 22rpx;
	} */
	.serched>view {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
	}

	.serched>view>image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 25rpx;
	}

	.serched>view>text {
		color: #fff;
		font-size: 24rpx;
	}
</style>
