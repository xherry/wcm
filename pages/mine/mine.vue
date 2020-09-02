<template>
	<view class="content">
		<view class="tops">
			<!--  -->
			<image :src="headUrl===''||headUrl==null?'../../static/mine/heads.png':base_url+'/img'+headUrl" mode=""></image> 
			<view class="uname">{{userName}}</view>
			<view class="uphone">{{phone}}</view>
		</view>
		<view class="person-item">
			<view class=" myType" @tap="tosetUser">
				<view>个人设置</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
			<view class=" myType" @tap="toCompany">
				<view>企业管理</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
			<view class=" myType" @tap="toHelp">
				<view>帮助中心</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>	
			<view class=" myType" @tap="toFeedBack">
				<view>信息反馈</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
			<view class=" myType" @tap="toOurs">
				<view>关于我们</view>
				<image class="tos" src="../../static/mine/tos.png" mode=""></image>
			</view>
			<view class=" myType">
				<view>联系我们</view>
				<view>{{mphone}}</view>
			</view>
		</view>
		<button class="goOut" @tap='goOut'>退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				userName:'',
				userId:'',
				headUrl:'',
				identityType:'',
				mphone:''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getUserInfo();
			this.getPhones();
		},
		methods:{
			// 获取联系电话
			getPhones(){
				let api = '/sys/concat';
				this.http(api,"GET",{}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.mphone = res.data.phone;
					}
				})
			},
			// 前往帮助页面
			toHelp(){
				uni.navigateTo({
					url:'./helps'
				})
			},
			// 前往反馈页面
			toFeedBack(){
				uni.navigateTo({
					url:'./feedback'
				})
			},
			// 前往关于我们页面
			toOurs(){
				uni.navigateTo({
					url:'./forOurs'
				})
			},
			// 前往管理页面
			toCompany(){
				if(this.identityType===1){
					uni.navigateTo({
						url:'../index/enterprise'
					})					
				}else{
					uni.navigateTo({
						url:'../index/enterprise/cinform'
					})
				}
			},
			tosetUser(){
				uni.navigateTo({
					url:'./setUser/setUser'
				})
			},
			// 退出登录
			goOut(){
				uni.showModal({
					title:'确认操作',
					content:'点击确定退出登录',
					success: (res) => {
						if(res.confirm){
							let userId = uni.getStorageSync('userInfo').userId		
							let clientId = plus.push.getClientInfo().clientid;
							let api = '/user/logout';
							let data = {
								 clientId,userId
							}
							this.http(api,"POST",data).then(res=>{
								if(res.code==200){
									uni.removeStorageSync('token')
									uni.removeStorageSync('userInfo')
									uni.reLaunch({
										url:'/pages/login'
									})
								}
							})
						}
					}
				})
			},
			// 获取用户信息
			getUserInfo(){
				let api = '/user/info';
				let data = { userId:uni.getStorageSync('userInfo').userId }
				this.http(api,'GET',data).then(res=>{
					console.log(res);
					if(res.code==200){
						this.phone = res.data.phone;
						this.userName = res.data.userName;
						this.userId = res.data.userId;
						if(this.headUrl !== res.data.headUrl){
							this.headUrl = res.data.headUrl;
						}
						this.identityType = res.data.identityType
					}
				})
			},
		}
	}
</script>

<style scoped>
	.goOut{
		width: 562rpx;
		height: 78rpx;
		line-height: 78rpx;
		border:1rpx solid rgba(15,67,155,1);
		border-radius:39rpx;
		margin-top: 38rpx;
		font-size: 28rpx;
		background: transparent;
		color: #fff;
		margin-bottom: 50rpx;
	}
	.goOut:active{
		background-color:#033163;  
	}
	.person-item{
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.myType{
		height: 106rpx;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 10rpx;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 2rpx solid #FFFFFF;
	}
	.myType:last-child{
		border-bottom:0
	}
	.myType view{
		font-size: 28rpx;
	}
	.myType>.tos{
		width: 18rpx;
		height: 32rpx;
	}
	.tops{
		width: 100%;
		height: 362rpx;
		background: url(../../static/mine/005.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		overflow: hidden;
	}
	.tops>image{
		width: 132rpx;
		height: 132rpx;
		margin-top: 44rpx;
		border-radius: 50%;
	}
	.uname{
		font-size: 36rpx;
	}
	.uphone{
		font-size: 28rpx;
	}
</style>