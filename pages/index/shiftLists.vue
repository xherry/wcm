<template>
	<view class="content">
		<view class="stit">需下井人数：{{intoCount?intoCount:0}}人</view>
		<view class="person-item shiftList">
			<view class="wellTime" v-for="(p,i) in userLists" :key='"w"+i'>
				<view>{{i==0?'今':p.time}}日下井</view>
				<view>{{p.userInfo?p.userInfo.mainUserName:'无'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intoCount:0,//下井人数
				userLists:[],//
			}
		},
		onLoad(){
			this.getWorkList()
		},
		methods: {
			// 获取班次列表
			getWorkList(){
				let api = '/mine/regular';
				let data = {
					userId: uni.getStorageSync('userInfo').userId
				}
				this.http(api,"POST",data).then(res=>{
					console.log(res)
					if(res.code==200){
						this.intoCount = res.data.intoCount;
						if(res.data.userList){
							res.data.userList.forEach((item,i)=>{
								item.time = item.date.split('-')[2]
							})							
							this.userLists = res.data.userList;
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.stit{
		margin-top: 40rpx;
		margin-left: 76rpx;
		font-size: 28rpx;
	}
	.shiftList{
		padding: 50rpx 0 40rpx 59rpx;
		box-sizing: border-box;
		
	}
	.wellTime{
		display: flex;
		width: 100%;
		align-items: center;
		margin-bottom: 38rpx;
	}
	.wellTime:last-child{
		margin-bottom: 0rpx;
	}
	.wellTime>view{
		font-size: 28rpx;
	}
	.wellTime>view:first-child{
		width: 25%;
	}
</style>
