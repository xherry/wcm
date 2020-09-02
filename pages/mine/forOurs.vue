<template>
	<view class="content">
		<view class="status">
			<image src="../../static/login.png" mode=""></image>
			<view>智慧云矿山</view>
			<view>{{version}} 版本</view>
		</view>
		<view class="person-item forOurs">
			<view class="myType" @tap='toIntroduce'>
				<view>公司介绍</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
			<view class="myType" @tap="toPrivacy">
				<view>隐私政策</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
			<view class="myType" @tap="versied">
				<view>版本更新</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: '1.0.0'
			}
		},
		onLoad() {
			if (plus) {
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					this.version = wgtinfo.version
				})
			}
		},
		methods: {
			// 前往公司介绍
			toIntroduce() {
				uni.navigateTo({
					url: './introduce'
				})
			},
			// 前往隐私政策
			toPrivacy() {
				uni.navigateTo({
					url: './privacy'
				})
			},
			// 版本更新
			versied() {
				if (plus) {
					if (plus.os.name == "Android") {
						let appurl = "market://details?id=io.dcloud.wcm"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
						plus.runtime.openURL(appurl, err => {
							console.log(err)
						});
					}
					if(plus.os.name == "iOS"){
						let appleId='uni.UNIE8F5369' //'uni.UNIE8F5369' //app的appleId
						plus.runtime.launchApplication({
							action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`,
							
						}, function(e) {
							console.log('Open system default browser failed: ' + e.message);
						});
					}
				}
			},
		}
	}
</script>

<style scoped>
	.forOurs {
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: 126rpx;
	}

	.myType {
		height: 106rpx;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 10rpx;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 2rpx solid #FFFFFF;
	}

	.myType:last-child {
		border-bottom: 0
	}

	.myType view {
		font-size: 28rpx;
	}

	.myType>.tos {
		width: 18rpx;
		height: 32rpx;
	}

	.status {
		width: 214rpx;
		margin: 136rpx auto 0;
		text-align: center;
	}

	.status image {
		width: 100%;
		height: 205rpx;
		margin-bottom: 36rpx;
	}

	.status view:first-of-type {
		font-size: 32rpx;
	}

	.status view:last-of-type {
		font-size: 26rpx;
	}
</style>
