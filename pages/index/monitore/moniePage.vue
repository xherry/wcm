<template>
	<view class="content">
		<view class="videos">
			<view class="video-item" v-for="(v,i) in deviceList" :key='"v"+i'>
				<view class="person-item">
					<video id="myVideo" :src="v.rtmpHd?v.rtmpHd:v.hlsHd" :autoplay="false"></video>
					<view></view>
				</view>
				<view class="annotate">{{v.remark?v.remark:'暂无备注'}}</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyId: '',
				deviceList: [],
				videoContext: '', //视频实例
				touchStartTime: 0, //初始点击时间
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.companyName
			});
			this.companyId = e.companyId;
			this.getDevices()
		},
		onReady() {

		},
		methods: {
			// 获取企业监控列表
			getDevices() {
				let api = '/monitor/company/device';
				let data = {
					companyId: this.companyId
				};
				this.http(api, "GET", data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.deviceList = res.data;
					}
				})
			},
		}
	}
</script>

<style scoped>
	.video-item {
		margin-bottom: 20rpx;
	}

	.annotate {
		font-size: 28rpx;
		text-align: center;
		width: 100%;
		background-color: rgba(0, 160, 233, .3);
		width: 348rpx;
		padding: 8rpx 3rpx;
		overflow: hidden; //隐藏文字
		text-overflow: ellipsis; //显示 ...
		white-space: nowrap; //不换行
		box-sizing: border-box;
	}

	.videos {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		padding-left: 16rpx;
		box-sizing: border-box;
	}

	.person-item {
		width: 348rpx;
		height: 240rpx;
		margin-right: 16rpx;
		margin-left: 0;
		box-sizing: border-box;
	}

	.videos .person-item video {
		width: 322rpx;
		height: 216rpx;
		margin: 12rpx 0 0 12rpx;
	}
</style>
