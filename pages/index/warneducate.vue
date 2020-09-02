<template>
	<view class="content">
		<view class="person-item" v-for="(item,index) in videos" :key='index' @tap="videoWeb(item.videoUrl)">
			<view class="videoTit" >
				{{item.videoName}}
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videos:[],
			}
		},
		onLoad() {
			this.getVideos()
		},
		methods: {
			videoWeb(videoUrl){
				uni.navigateTo({
					url:'./videoWeb?videoUrl='+videoUrl
				})
			},
			// 获取警示视频
			getVideos(){
				let api = '/video/list';
				this.http(api,"GET",{}).then(res=>{
					console.log(res)
					if(res.code==200){
						this.videos = res.data;
					}
				})
			},
		}
	}
</script>

<style scoped>   
	.videoTit{
		font-size: 30rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		white-space: pre-wrap;
	}
</style>
