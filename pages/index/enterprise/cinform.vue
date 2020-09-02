<template>
	<view class="content">
		<view class="person-item compents">
			<view class="compents-item">
				<view>企业名称：</view>
				<view>{{companyInfo.companyName}}</view>
			</view>
			<view class="compents-item">
				<view>地址：</view>
				<view>{{companyInfo.address}}</view>
			</view>
			<view class="compents-item">
				<view>安全许可证：</view>
				<view>截止-{{companyInfo.licence}}日</view>
			</view>
			<view class="compents-item">
				<view>类别：</view>
				<view>{{companyInfo.type==1?'露天矿场':'地下矿场'}}</view>
			</view>
			
			<view class="compents-item">
				<view>产能：</view>
				<view>{{companyInfo.capacity}}万吨</view>
			</view>
			<view class="compents-item">
				<view>主要负责人：</view>
				<view>{{companyInfo.barmaster}}</view>
			</view>
			<view class="compents-item">
				<view>安全员：</view>
				<view>{{companyInfo.safetyOfficer}}</view>
			</view>
			<view class="compents-item">
				<view>矿长：</view>
				<view>{{companyInfo.barmaster}}</view>
			</view>
			<view class="compents-item">
				<view>总工程师：</view>
				<view>{{companyInfo.engineer}}</view>
			</view>
			<view class="compents-item">
				<view>联系电话：</view>
				<view>{{companyInfo.concatPhone}}</view>
			</view>
			<view class="compents-item">
				<view>生产经营情况：</view>
				<view>{{companyInfo.manageStatus==0?'正常经营':(companyInfo.manageStatus==1?'暂停营业':'企业倒闭')}}</view>
			</view>
			<view class="compents-item">
				<view>职业危害因素：</view>
				<view>{{companyInfo.hazard}}</view>
			</view>
			<view class="compents-item">
				<view>风险名称：</view>
				<view>{{companyInfo.riskName}}</view>
			</view>
			<view class="compents-item">
				<view>风险等级：</view>
				<view>{{companyInfo.riskLevel<=1?'低级':(companyInfo.riskLevel<=2?'中级':'高级')}}</view>
			</view>
			<view class="compents-item">
				<view>防火等级：</view>
				<view>{{companyInfo.fireLevel<=1?'低级':(companyInfo.fireLevel<=2?'中级':'高级')}}</view>
			</view>
			<view class="compents-item">
				<view>安全标准化及企业描述：</view>
				<view style="opacity: 0;width:40%;">123465</view>
				<view style="opacity: 0;">1456798</view>
				<view>{{companyInfo.companyDirection}}</view>
			</view>
			<view class="compents-pics">
				<view>矿山照片：</view>
				<view  >
					<image @tap='previewImage(index)'  v-for='(p,index) in companyInfo.mediaList' :key='"p"+index' :src="base_url+'/img'+p" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyInfo:{},//公司信息
				userInfo:{}
			}
		},
		onLoad(e){
			this.userInfo = uni.getStorageSync('userInfo');
			if(this.userInfo.identityType==1){
				this.getCompanyInfo(e.companyId)
			}else{
				this. getUserCompany()
			}
		},
		methods: {
			// 查看图片
			previewImage(index){
				//获取当前页面的轮播图数据
				let mediaList= this.companyInfo.mediaList.map((item,i)=>{
					return this.base_url+'/img'+item
				}); 
				//uniapp预览轮播图
				uni.previewImage({
					current:index, //预览图片的下标
					urls:mediaList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			// 管理员获取企业信息
			async getCompanyInfo(companyId){
				let api = '/company/info';
				let data = { companyId };
				let res = await this.http(api,"GET",data);
				console.log(res)
				if(res.code==200){
					this.companyInfo = res.data;
				}
			},
			// 普通用户获取企业信息
			async getUserCompany(){
				let api = '/company/info/user';
				let data = {
					userId: this.userInfo.userId
				}
				let res = await this.http(api,"GET",data);
				if(res.code==200){
					this.companyInfo = res.data;
				}
			},
		}
	}
</script>

<style scoped>
	.content{
		padding-bottom: 30rpx;
	}
	.compents-pics>view{
		font-size: 28rpx;
	}
	.compents-pics>view:last-child{
		display: flex;
		align-items: center;
		margin-top: 24rpx;
		flex-wrap: wrap;
	}
	.compents-pics>view image{
		width: 196rpx;
		height: 134rpx;
		border-radius: 6rpx;
		margin-right: 6rpx;
		margin-bottom: 10rpx;
	}
	.compents-item{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 40rpx;
		padding-bottom: 30rpx;
		border-bottom: 0.5rpx solid #fff;
	}
	.compents-item>view:last-child{
		width: 60%;
	}
	.compents-item view{
		font-size: 28rpx;
	}
	.compents{
		padding: 50rpx 42rpx 55rpx 59rpx;
		box-sizing: border-box;
	}
</style>
