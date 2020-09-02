<template>
	<view class="content">
		<view class="serched">
			<input  type="text" v-model="companyName" @input="serchCompany" @focus="closeHolder" :focus="focus" />
			<view v-if="isPlace" @tap="changeFocus">
				<image src="../../static/home/030.png" mode=""></image>
				<text>搜索企业</text>
			</view>
		</view>
		<view class="person-item" @tap="toMonitorePage(s.companyId,s.companyName)" v-for="(s,i) in companys" :key="'s'+i">
			<view class="firmName">
				<text>{{s.companyName}}</text>
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
				isPlace:true,
				companyName:'',//默认名字
				companys:[],//企业列表
			}
		},
		onLoad() {
			this.getCompanys()
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
			toMonitorePage(n,m){
				uni.navigateTo({
					url:'./monitore/moniePage?companyId='+n+'&companyName='+m
				})
			},
			// 搜索企业
			serchCompany(e){
				this.getCompanys()
			},
			// 获取企业列表 
			getCompanys(){
				let api = '/company/manage/item';
				let data = {
					companyName:this.companyName,
					userId:uni.getStorageSync('userInfo').userId
				}
				this.http(api,"GET",data).then(res=>{
					console.log(res)
					if(res.code==200){
						this.companys = res.data
					}
				})
			},
		}
	}
</script>

<style scoped>
	
	.person-item{
		padding: 37rpx 15rpx;
		box-sizing: border-box;
	}
	.firmName{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.firmName text{
		color: #fff;
		font-size: 28rpx;
		white-space: pre-wrap;
	}
	.firmName image{
		width: 18rpx;
		height: 32rpx;
	}
</style>
