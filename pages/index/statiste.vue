<template>
	<view class="content">
		<view class="computes">
			<view class="person-item tjs">
				<view>今日下井</view>
				<text>{{turnoverCount.intoCount}}人</text>
				<view></view>
			</view>	
			<view class="person-item tjs">
				<view style="color: #0f0;">今日出井</view>
				<text>{{turnoverCount.outCount}}人</text>
				<view></view>
			</view>
			<view class="person-item tjs">
				<view style="color: #E50000;">井下现有</view>
				<text>{{turnoverCount.residueCount}}人</text>
				<view></view>
			</view>
		</view>
		<view class="person-item personNum" v-for="(item,i) in companyList" :key="i">
			<view>{{item.companyName}}</view>
			<view>
				<text>下井：{{item.turnoverCount.intoCount}}人</text>
				<text>出井：{{item.turnoverCount.outCount}}人</text>
				<text>井下现有：{{item.turnoverCount.residueCount}}人</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				turnoverCount:{},
				companyList:[],
			}
		},
		onLoad() {
			this.getStatistes();
		},
		methods: {
			getStatistes(){
				let api = '/mine/staff/count';
				let data = {userId:uni.getStorageSync('userInfo').userId};
				this.http(api,"GET",data).then(res=>{
					console.log(res)
					if(res.code==200){
						this.turnoverCount = res.data.turnoverCount;
						this.companyList = res.data.companyList						
					}
				})
			},
		}
	}
</script>

<style scoped>
	.personNum>view{
		color: #fff;
	}
	.personNum>view:first-child{
		font-size: 32rpx;
	}
	.personNum>view:last-child{
		font-size: 28rpx;
		display: flex;
		align-items: center;
		margin-top: 20rpx; 
		justify-content: space-between;
	}
	.personNum{
		padding: 31rpx 15rpx;
		box-sizing: border-box;
	}
	.computes{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 730rpx;
	}
	.computes .tjs{
		width: 226rpx;
		height: 168rpx;
		text-align: center;
	}
	.tjs view{
		font-size: 36rpx;
		color: #00FFFF;
		margin-top: 40rpx;	 
	}
	.tjs text{
		font-size: 28rpx;
		color: #FFFFFF;
	}
</style>
