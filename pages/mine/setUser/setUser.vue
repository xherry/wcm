<template>
	<view class="content">
		<view class="person-item userinfom">
			<view>
				<text>头像</text>
				<view class="user-right" @tap="uploadImg">
					<image :src="headUrl?base_url+'/img'+headUrl:'../../../static/mine/heads.png'" mode=""></image>
					<image src="../../../static/mine/tos.png" mode=""></image>
				</view>
			</view> 
			<view @click="showCname=true,changeType=0">
				<text>姓名</text>
				<view class="user-right" >
					<text>{{userInfo.userName}}</text>
					<!-- <input type="text" :value="userInfo.userName" /> -->
					<image src="../../../static/mine/tos.png" mode=""></image>
				</view>
			</view>
			<view @tap="toChangePwd">
				<text>修改密码</text>
				<view class="user-right">
					<image src="../../../static/mine/tos.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="person-item userinfom" @click="showCname=true,changeType=1">
			<view>
				<text>紧急电话</text>
				<view class="user-right" >
					<text>{{userInfo.urgencyPhone}}</text>
					<image src="../../../static/mine/tos.png" mode=""></image>
				</view>
			</view>
			<view>
				<text>正常电话</text>
				<view class="user-right">
					<text>{{userInfo.phone}}</text>
					<image src="../../../static/mine/tos.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="changeName" v-if='showCname' @click="showCname=false">
			<view>
				<input type="text" v-model="changeValue" @tap.stop='123' @confirm="confirm" :focus="true" value="" />
				<view @tap.stop="changeName">确定</view>				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				headUrl:'',
				showCname:false,
				changeType:'',
				changeValue:''
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			// 修改姓名或电话
			changenp(value){
				let param;
				if(this.changeType==0){ param = 'name' };
				if(this.changeType==1){ param = 'phone' };
				let api = `/user/revamp/${param}`;
				let data = {
					userId:uni.getStorageSync('userInfo').userId,
					value:value?value:this.changeValue
				}
				this.http(api,"POST",data).then(res=>{
					console.log(res)
					if(res.code==200){
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
						this.changeValue = '';
						this.getUserInfo();
					}
				})
			},
			// 修改名字键盘事件
			confirm(e){
				console.log(e)
				this.showCname = false
				let value = e.detail.value;
				this.changenp(value);
			},
			// 修改名字
			changeName(){
				this.showCname = false;
				this.changenp();
			},
			// 去修改密码
			toChangePwd(){
				uni.navigateTo({
					url:'./changePwd'
				})
			},
			// 获取用户信息
			getUserInfo(){
				let api = '/user/info';
				let data = { userId:uni.getStorageSync('userInfo').userId }
				this.http(api,'GET',data).then(res=>{
					console.log(res);
					if(res.code==200){
						this.userInfo = res.data
						if(this.headUrl !== res.data.headUrl){
							this.headUrl = res.data.headUrl
						}
					}
				})
			},
			// 上传头像
			uploadImg(){
				uni.chooseImage({
					count:1,
					sizeType:['album'],
					success:res=>{
						console.log(res);
						if(res.errMsg=="chooseImage:ok"){
							uni.showLoading({
								title:'上传中'
							})
							let tempFilePaths = res.tempFilePaths;
							console.log(tempFilePaths)
							uni.uploadFile({
								url:this.base_url + `/user/revamp/header/${this.userInfo.userId}`,
								filePath:tempFilePaths[0],
								name:'file',
								header:{
									Authorization:uni.getStorageSync('token'), 
								},
								success:res=>{
									uni.hideLoading()
									console.log(JSON.parse(res.data) ,'上传图片')
									if(JSON.parse(res.data).code==200){
										uni.showToast({
											title:'上传成功',
											icon:'none',
											duration:2000
										})
										this.getUserInfo()
									}else{
										uni.showToast({
											title:'图片上传失败',
											icon:'none'
										})
									}
								},fail:err=>{
									uni.showToast({
										title:'图片上传失败',
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.changeName{
		width:100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,.5);
	}
	.changeName>view{
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}
	.changeName input{
		width: 660rpx;
		height: 80rpx;
		font-size: 28rpx;
		background: #FFFFFF;
		color: #333;
		padding-left: 20rpx;
		box-sizing: border-box;
		border-radius: 12rpx 0 0 12rpx;
	}
	.changeName>view>view{
		width: 90rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		font-size: 26rpx;
		background: #0fb7ff;
		text-align: center;
		border-radius: 0  12rpx  12rpx 0;
	}
	 .userinfom{
		 padding:  0 14rpx;
		 box-sizing: border-box;
	 }
	 .userinfom>view{
		 display: flex;
		 width: 100%;
		 padding: 25rpx 0 25rpx 13rpx;
		 box-sizing: border-box;
		 justify-content: space-between;
		 align-items: center;
		 border-bottom:1rpx solid #fff;
	 }
	 .userinfom>view:last-child{
		 border-bottom:0
	 }
	 .userinfom>view text{
		 font-size: 28rpx;  
	 }
	 .user-right{
		 display: flex;
		 align-items: center;
	 }
	 .user-right>image:nth-last-child(1){
		 width: 16rpx;
		 height: 28rpx;
	 }
	 .user-right>image:nth-last-child(2){
		 width: 80rpx;
		 height: 80rpx;
		 border-radius: 50%;
		 margin-right: 24rpx;
	 }
	 .user-right>text{
		 margin-right: 24rpx;
		 font-size: 28rpx;
	 }
</style>
