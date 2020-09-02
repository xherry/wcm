<template>
	<view class="content">
		<view v-if='tabActived==1'>
			<aredetails ref='aredetail' :companyId='companyId'></aredetails>
		</view>
		<view v-else>
			<figures ref='figures' :companyId='companyId'></figures>
		</view>
		
		<!-- tabBars -->
		<view class="tabBars">
			<view @tap="switchTbrs(1)">
				<image v-show="tabActived==1" src="../../../static/home/018.png" mode=""></image>
				<image v-show="tabActived==2" src="../../../static/home/021.png" mode=""></image>
				<view :style="{color:tabActived==1?' #fff':'#446695'}">明细</view>
			</view> 
			<view @tap="switchTbrs(2)">
				<image v-show="tabActived==1" src="../../../static/home/019.png" mode=""></image>
				<image v-show="tabActived==2" src="../../../static/home/022.png" mode=""></image>
				<view :style="{color:tabActived==2?' #fff':'#446695'}">统计</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import aredetails from './areDetails.vue';
	import figures from './figure.vue';
	export default {
		components:{
			aredetails,figures
		},
		data() {
			return {
				tabActived:1
			}
		},
		onLoad(e){
			uni.setNavigationBarTitle({
			  title: e.companyName
			});
			this.companyId = e.companyId;
		},
		methods: {
			switchTbrs(n){
				this.tabActived = n
			}
		}
	}
</script>

<style scoped>
	.tabBars image:first-of-type{
		width: 40rpx;
		height: 40rpx;
	}
	.tabBars image:last-of-type{
		width: 38rpx;
		height: 36rpx;
	}
	.tabBars{
		display: flex;
		align-items: center;
		background: #021e3d;
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 0;
		z-index: 99;
	}
	.tabBars>view{
		width: 50%;
		text-align: center;
	}
	.tabBars>view>view{
		font-size: 26rpx;
	}
</style>
