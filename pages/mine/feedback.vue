<template>
	<view class="content">
		<view class="person-item textareas">
			<textarea v-model="suggess" maxlength="-1" placeholder="请输入意见或建议" placeholder-style="color:#f8f8f8;font-size:26rpx" />
			<view></view>
		</view>
		<view class="person-item addPic">
			<view class="addTit">添加图片说明</view>
			<view class="zadds">
				<view class="adds" @tap='addPic'>
					<view></view>
					<view></view>
				</view>
				<view class="showPic" v-for="(item,index) in images" :key='index'>
					<image :src="item" mode=""></image>
				</view>				
			</view>
			<view></view>
		</view>
		<button class="submits" @tap='addAdvices'>确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				suggess:'',
				images :[],
			}
		},
		methods: {
			// 上传图片
			addPic(){
				uni.chooseImage({
					count:4,
					sizeType:['album'],
					success:res=>{
						console.log(res)
						if(res.errMsg=='chooseImage:ok'){
							this.images = res.tempFilePaths;
						}
					}
				})
			},
			// 提交建议
			addAdvices(){
				try{
					if(!this.suggess) throw '请填写建议';
					if(this.images.length===0) throw '请上传相关图片';
				}catch(message){
					uni.showToast({
						title:message,
						icon:'none'
					})
					return
				}
				
				// 弹出确认弹框
				uni.showModal({
					title:'确认操作',
					content:'是否提交信息',
					success:res=>{
						// 点击确认下一步
						if(res.confirm){
							uni.showLoading({
								title:'提交中'
							})
							let uploadImages = [];
							// 上传图片，一次传一张，调用循环
							this.images.forEach((item,i)=>{
								uni.uploadFile({
									url:this.base_url + `/sys/upload/feed`,
									filePath: item,
									name:'file',
									header:{
										Authorization:uni.getStorageSync('token'), 
									},
									success:res=>{
										console.log(res)
										// JSON转换
										let result = JSON.parse(res.data);
										console.log(result)
										// 上传成功保存数组
										if(result.code==200){
											uploadImages.push(result.data.path)
										}else{
											uni.showToast({
												title: '图片上传失败',
												icon:'none'
											}); 
											return
										}
										console.log(uploadImages)
										// 上传完毕提交信息
										if(uploadImages.length == this.images.length){
											let api = '/sys/feed';
											let data = {
												content:this.suggess,
												picList:uploadImages,
												userId:uni.getStorageSync("userInfo").userId
											}
											// 调用接口
											this.http(api,"POST",data).then(res=>{
												uni.hideLoading()
												console.log(res,'提交信息')
												// 成功调用
												if(res.code==200){
													uni.showToast({
														title:'提交成功',
														icon:'none'
													})
													// 清理数据
													this.suggess = '';
													this.images = [];
												}
											})
										}
									},
									fail:err=>{
										console.log(err)
										uni.showToast({
											title:'上传图片失败',
											icon:'none'
										})
									}
								})					
							})
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.submits{
		width:562rpx;
		height:78rpx;
		background:#0F439B;
		border-radius:39rpx;
		font-size: 28rpx;
		line-height: 78rpx;
		color: #FFFFFF;
		margin-top:210rpx;
		margin-bottom: 30rpx;
	}
	.submits:active{
		background:#1150b5; 
	}
	.zadds{
		display: flex;
		align-items: center;
		padding: 24rpx 48rpx;
		box-sizing: border-box;
		width: 100%;
		flex-wrap: wrap;
	}
	.showPic{
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 12rpx;
		margin-right: 20rpx;
	}
	.showPic image{
		width: 120rpx;
		height: 120rpx;
	}
	.addTit{
		font-size: 28rpx;
	}
	.adds{
		width: 120rpx;
		height: 120rpx;
		background: #0F439B;
		position: relative;
		margin-bottom: 12rpx;
		margin-right: 20rpx;
	}
	.adds view{
		background-color: #FFFFFF;
		position: absolute;
		transform: translate(-50%,-50%);
		left: 50%;
		top: 50%;
	}
	.adds view:first-child{
		width: 5rpx;
		height: 60rpx;
	}
	.adds view:last-child{
		height: 5rpx;
		width: 60rpx;
	}
	.addPic{
		padding: 39rpx 26rpx;
		box-sizing: border-box;
	}
	.textareas{
		height: 363rpx;
	}
	.textareas textarea{
		width: 100%;
		height: 100%;
		padding: 38rpx 25rpx 25rpx 25rpx; 
		box-sizing: border-box;
		color: #fff;
		font-size: 26rpx;
	}
	.addPic{
		margin-top: 12rpx;
	}
</style>
