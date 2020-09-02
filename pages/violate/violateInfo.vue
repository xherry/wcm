<template>
	<view class="content">
		<view class="vtitles">
			{{infos.companyName}}
		</view>
		<view class="vtimes">
			{{infos.times}}
		</view>
		<view class="helpWords">
			{{infos.illegalMsg?infos.illegalMsg:infos.msg}}
		</view>
<!-- 		<view class="vpics">
			<image :src="base_url+'/img'+infos.picUrl" mode="widthFix"></image>
		</view> -->
		<view class="tits" v-show="infos.userName">
			违规者：{{infos.userName}}
		</view>
	</view>
</template>

<script>
	import date from '../../utils/date.js';
	export default {
		data() {
			return {
				infos:{},
			}
		},
		onLoad(e) {
			this.getViolates(e.id)
		},
		methods: {
			getViolates(id){
				let api = '/message/info/1';
				let data = { id };
				this.http(api,"GET",data).then(res=>{
					console.log(res)
					if(res.code==200){
						res.data.times = date.toDate(res.data.createTime)
						this.infos = res.data
					}
				})
			}
		}
	}
</script>

<style scoped>
	.vtimes{
		font-size: 26rpx;
		color: #999999;
		margin-top: 10rpx;
	}
	.vpics{
		width: 100%;
		margin-top: 20rpx;
	}
	.vtitles{
		width: 100%;
		/* text-align: center; */
		font-size: 32rpx;
	}
	.content{
		padding: 30rpx;
		box-sizing: border-box;
	}
	.helpWords{
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #f00;
	}
	.tits{
		font-size: 28rpx;
		color: #00FFFF;
		display: flex;
		flex-direction:row-reverse;
		margin-top: 50rpx;
	}
</style>
