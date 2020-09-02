<template>
	<view class="content">
		<view v-if="tabActived==1">
			<leaves ref='leaves'></leaves>
		</view>
		<view v-else>
			<askLeave ref='askLeave'></askLeave>
		</view>
		
		<!-- tabBars -->
		<view class="tabBars">
			<view @tap="switchTbrs(1)">
				<image v-show="tabActived==1" src="../../../static/home/023.png" mode=""></image>
				<image v-show="tabActived==2" src="../../../static/home/025.png" mode=""></image>
				<view :style="{color:tabActived==1?'#fff':'#446695'}">请假列表</view>
			</view> 
			<view @tap="switchTbrs(2)">
				<image v-show="tabActived==1" src="../../../static/home/024.png" mode=""></image>
				<image v-show="tabActived==2" src="../../../static/home/026.png" mode=""></image> 
				<view :style="{color:tabActived==2?'#fff':'#446695'}">同意记录</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import leaves from './leavesList.vue';
	import askLeave from '../leaveAsk.vue';
	export default {
		components:{ leaves,askLeave },
		data() {
			return {
				tabActived:1
			}
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
		width: 35rpx;
		height: 40rpx;
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
