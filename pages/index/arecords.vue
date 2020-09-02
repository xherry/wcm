<template>
	<view class="content">
		<view class="serched">
			<input  type="text" v-model="companyName" @input='serchCompany' @focus="closeHolder" :focus="focus" />
			<view v-if="isPlace" @tap="changeFocus">  
				<image src="../../static/home/030.png" mode=""></image>
				<text>搜索企业</text>
			</view>
		</view>
		<view class="person-item" v-for="(s,i) in companys" @tap="toAreDetails(s.companyId,s.companyName)" :key="'s'+i">
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
				companys:[],//公司列表
				companyName:'',//默认搜索公司名字
				isPlace:true
			}
		},
		onLoad() {
			this.getOutHis()
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
				this.getOutHis();
			},
			toAreDetails(n,m){
				uni.navigateTo({
					url:'./arecord/arecordTabBar?companyId='+n+'&companyName='+m
				})
			},
			// 获取出入记录
			async getOutHis(){
				let api = '/company/into/item';   
				let data = {
					companyName:this.companyName,
					userId:uni.getStorageSync('userInfo').userId
				}
				let res = await this.http(api,"GET",data);
				console.log(res)
				if(res.code==200){
					this.companys = res.data;
				}
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
	input{
		padding-left: 40rpx;
		box-sizing: border-box;
	}
</style>
