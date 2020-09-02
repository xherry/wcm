<template>
	<view class="content">
		<view class="serched">
			<input  type="text" v-model="companyName" @input="serchCompany" @focus="closeHolder" :focus="focus" />
			<view v-if="isPlace" @tap="changeFocus">
				<image src="../../static/home/030.png" mode=""></image>
				<text>搜索企业</text>
			</view>
		</view>
		<view class="person-item" @tap="toCinfom(s.companyId)" v-for="(s,i) in companys" :key="'s'+i">
			<view class="firmName">
				<view class="qyinfrom">
					<view>{{s.companyName}}</view>
					<view>{{s.address}}</view>
					<view>{{s.principal}}</view>
				</view>
				<image src="../../static/mine/tos.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus:false,
				companys:[],//公司信息列表
				pages:1,//初始页码
				pageNum:1,
				companyName:'',
				isPlace:true
			}
		},
		onLoad() {
			this.getEnters()
		},
		methods: {
			// 激活foucs
			changeFocus(){
				this.focus = true
				this.isPlace = false
			},
			// 关闭搜索文字
			closeHolder(){
				this.isPlace = false
			},
			// 搜索企业
			serchCompany(e){
				this.getEnters();
			},
			toCinfom(n){
				uni.navigateTo({
					url:'./enterprise/cinform?companyId='+n
				})
			},
			// 获取企业列表
			async getEnters(){
				let api = '/company/manage/item';
				let data = {
					companyName:this.companyName,
					userId:uni.getStorageSync('userInfo').userId
				}
				let res = await this.http(api,"GET",data);
				console.log(res);
				if(res.code==200){
					this.companys = res.data;			
				}
			},
		}
	}
</script>

<style scoped>
	.person-item{
		padding: 30rpx 15rpx;
		box-sizing: border-box;
	}
	.firmName{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.qyinfrom view{
		color: #fff;
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.firmName .qyinfrom view:first-child{
		font-size: 34rpx
	} 
	.firmName image{
		width: 18rpx;
		height: 32rpx;
	}
</style>
