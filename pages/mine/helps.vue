<template>
	<view class="contrain">
		<view class="person-item" v-for="(item,index) in helps" :key="index">
			<view class="myType" @tap="toHelpDetails(item.answer,item.question)">
				<view>{{item.question}}</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helps:[]
			}
		},
		onLoad() {
			this.getHelps()
		},
		methods: {
			toHelpDetails(n,m){
				uni.navigateTo({
					url:'./helpDetail?answer='+n+'&question='+m
				})
			},
			// 获取帮助中心
			getHelps(){
				let api = '/sys/help';
				this.http(api,"GET",{}).then(res=>{
					console.log(res)
					if(res.code==200){
						this.helps = res.data
					}
				})
			},
		}
	}
</script>

<style scoped>
	.myType{
		height: 106rpx;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 16rpx;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.myType view{
		font-size: 28rpx;
	}
	.myType>.tos{
		width: 18rpx;
		height: 32rpx;
	}
</style>
