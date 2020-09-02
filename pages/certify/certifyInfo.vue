<template>
	<view class="content">
			<view class="vtitles">
				{{infos.subject}}
			</view>
			<view class="vtimes">
				{{infos.times}}
			</view>
			<view class="helpWords">
				{{infos.content?infos.content:infos.msg}}
			</view>
			<view class="tits" style="margin-top: 60rpx;">
				 <text style="color: #00ffff;">{{infos.newsSource}}</text> <text>新闻来源：</text>
			</view>
	</view>
</template>

<script>
	import date from '../../utils/date.js'
	export default {
		data() {
			return {
				infos:{},
			}
		},
		onLoad(e) {
			// console.log(e)
			// console.log(JSON.parse(e.infos))
			// this.infos = JSON.parse(e.infos)
			// this.content = e.content;
			// this.newsSource = e.newsSource
			this.getCerify(e.id)
		},
		methods: {
			getCerify(id){
				let api = '/message/info/0';
				let data = { id };
				this.http(api,"GET",data).then(res=>{
					console.log(res)
					if(res.code==200){
						res.data.times = date.toDate(res.data.createTime)
						this.infos = res.data
					}
				})
			},
		}
	}
</script>

<style scoped>
	.vtimes{
		font-size: 26rpx;
		color: #999999;
		margin-top: 10rpx;
	}
	.vtitles{
		width: 100%;
		font-size: 34rpx;
		color: #00ffff;
	}
	.content{
		padding: 30rpx;
		box-sizing: border-box;
	}
	.helpWords{
		font-size: 30rpx;
		margin-top: 30rpx;
		text-indent: 60rpx;
		line-height: 45rpx;
	}
	.tits{
		font-size: 28rpx;
		color: #fff;
		display: flex;
		flex-direction:row-reverse;
		margin-top: 20rpx;
	}
</style>
